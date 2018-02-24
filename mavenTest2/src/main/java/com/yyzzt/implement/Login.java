package com.yyzzt.implement;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;
import com.yyzzt.HibernateUtil;
import com.yyzzt.SuccessModels.LoginSuccess;
import com.yyzzt.implement.socket.SocketPushMessageSave;
import com.yyzzt.mode.ZZTMessage;
import com.yyzzt.mode.ZZTUser;
import com.yyzzt.response.ResponseUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class Login extends ActionSupport {
	private String user;
	private String password;

	public void login() throws IOException {
		ResponseUtil.crossOrigin();

		if (ResponseUtil.errorNullParamRs(password, user)) {
			return;
		}

		Session session = null;
		try {
			session = HibernateUtil.getCurrentSession();
			databaseHandle(session);
		} catch (Exception e) {
			System.out.println(e);
			ResponseUtil.catchErrorRS(session);

		} finally {
			if (session != null && session.isOpen()) {
				session.close();
			}
		}

	}

	public void databaseHandle(Session session) throws IOException {
		Transaction transaction = session.beginTransaction();
		String sql = "SELECT u from ZZTUser u where u.user = ?";
		Query query = session.createQuery(sql);
		query.setParameter(0, user);

		List<ZZTUser> users = query.list();

		if (users.size() <= 0) {
			ResponseUtil.errorRs("401", "用户名不存在");
		} else if (users.size() == 1) {
			ZZTUser userModel = users.get(0);

			if (userModel.getPassword() == password) {
				ResponseUtil.errorRs("401", "密码错误了");

			} else {
				LoginSuccess loginSuccess = new LoginSuccess();
				String token = ResponseUtil.UUID();
				loginSuccess.setToken(token);
				loginSuccess.setName(users.get(0).getName());
				loginSuccess.setUser(user);
//				ResponseUtil.ObjectRs(loginSuccess);
				userModel.setToken(token);
				session.update(userModel);

				SocketPushMessageSave.user_tokens.put(user, token);
				
				String sql1 = "select um from ZZTMessage um where um.toUser = ? and um.isLook = 0";
				Query query2 = session.createQuery(sql1);
				query2.setParameter(0, user);
				
				
				JSONArray jsonArray = new JSONArray();
			    List<ZZTMessage> messages = query2.list();
			    
			    String updateSql = "update ZZTMessage um set um.isLook = 1  where um.toUser = ?";
			    Query query3 = session.createQuery(updateSql);
			    query3.setParameter(0, user);
			    query3.executeUpdate();
			    
			    
			    
			    
			    
			    for (ZZTMessage zztMessage : messages) {
					JSONObject jsonObject = new JSONObject();
					jsonObject.put("fromUser", zztMessage.getFromUser());
					jsonObject.put("content", zztMessage.getContent());
					jsonObject.put("date", zztMessage.getDate().toLocaleString());
					jsonObject.put("type", zztMessage.getType());
					jsonArray.add(jsonObject);
				}
			    JSONObject jsonObject1 = JSONObject.fromObject(loginSuccess);
			    jsonObject1.put("messages", jsonArray.toString());
			    jsonObject1.remove("password");
				
			    ResponseUtil.stringRs(jsonObject1.toString());
//				ZZTMessage aMessage;
//				aMessage.getFromUser();
//				aMessage.getToUser();
				
			}

		} else {
			ResponseUtil.errorRs("401", "天啊，两个一样的用户，不给进入");
		}
		transaction.commit();
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
