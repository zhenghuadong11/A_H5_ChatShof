package com.yyzzt.implement;

import java.io.IOException;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;
import com.yyzzt.HibernateUtil;
import com.yyzzt.mode.ZZTUser;
import com.yyzzt.response.ResponseUtil;

import net.sf.json.JSONObject;

public class SelectFriend extends ActionSupport {

	public String token;
	public String friendSign;
	public String user;

	public void selectFriend() throws IOException {
//		ResponseUtil.crossOrigin();
//
//		if (ResponseUtil.errorNullParamRs(token, user)) {
//			return;
//		}
//		if (ResponseUtil.modifyTokenErrorRs(user, token)) {
//			return;
//		}
		ResponseUtil.crossOrigin();

		if (ResponseUtil.errorNullParamRs(token, user)) {
			return;
		}
		if (ResponseUtil.modifyTokenErrorRs(user, token)) {
			return;
		}
	  
		Session session = null;

		try {
			session = HibernateUtil.getCurrentSession();
			databaseHandle(session);
		} catch (Exception e) {
			ResponseUtil.catchErrorRS(session);

		} finally {
			if (session != null && session.isOpen()) {
				session.close();
			}
		}
		
//		Session session = null;
//
//		try {
//			session = HibernateUtil.getCurrentSession();
//			databaseHandle(session);
//		} catch (Exception e) {
//			ResponseUtil.catchErrorRS(session);
//
//		} finally {
//			if (session != null && session.isOpen()) {
//				session.close();
//			}
//		}

	}

	public void databaseHandle(Session session) throws IOException {
		Transaction transaction = session.beginTransaction();

		String sql1 = "select u from ZZTUser u where u.name like ? or u.user like ?";
		Query query2 = session.createQuery(sql1);
		query2.setParameter(0, "%" + friendSign + "%");
		query2.setParameter(1, friendSign + "%");
		List<ZZTUser> list2 = query2.list();

		ResponseUtil.arraySuccessRs(list2);
		transaction.commit();
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getFriendSign() {
		return friendSign;
	}

	public void setFriendSign(String friendSign) {
		this.friendSign = friendSign;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

}
