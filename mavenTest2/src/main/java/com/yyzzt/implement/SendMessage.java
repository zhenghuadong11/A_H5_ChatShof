package com.yyzzt.implement;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.yyzzt.HibernateUtil;
import com.yyzzt.implement.socket.FriendMessageSocket;
import com.yyzzt.implement.socket.SocketPushMessageSave;
import com.yyzzt.mode.ZZTMessage;
import com.yyzzt.mode.ZZTUser;
import com.yyzzt.response.ResponseUtil;

import net.sf.json.JSONObject;

public class SendMessage {

	private String token;
	private String user;
	private String toFriendUser;
	private String content;
	private int type;
	private String dateStr;


	public void sendMessage() throws IOException {
		ResponseUtil.crossOrigin();

		if (ResponseUtil.errorNullParamRs(token, user, toFriendUser, content, type, dateStr)) {
			return;
		}
		if (ResponseUtil.modifyTokenErrorRs(user, token)) {
			return;
		}

		while (true) {
			Boolean isBusy = SocketPushMessageSave.friendIsBusy.get(toFriendUser);
			if (isBusy == null || isBusy == false) {
				break;
			}
		}

		Session session = null;

		try {
			SocketPushMessageSave.friendIsBusy.put(toFriendUser, true);
			session = HibernateUtil.getCurrentSession();
			databaseHandle(session);
		} catch (Exception e) {
			ResponseUtil.catchErrorRS(session);

		} finally { 
			SocketPushMessageSave.friendIsBusy.put(toFriendUser, false);
			if (session != null && session.isOpen()) {
				session.close();
			}
		}

	}

	public void databaseHandle(Session session) throws Exception {
		Transaction transaction = session.beginTransaction();

		ZZTMessage message = new ZZTMessage();
		message.setContent(content);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh-mm-ss");// 小写的mm表示的是分钟
		java.util.Date date1 = sdf.parse(dateStr);
		message.setDate(date1);
		message.setFromUser(user);
		message.setIsLook(0);
		message.setToUser(toFriendUser);
		message.setType(type);
		


		Map<String, Object> map = new HashMap<String, Object>();
		map.put("fromUser", user);
		map.put("content", content);
		map.put("type", type);
		map.put("date", dateStr);

		FriendMessageSocket socket = SocketPushMessageSave.user_sockets.get(toFriendUser);
		if (socket != null && socket.isClose == false) {
			socket.session.getBasicRemote().sendText(ResponseUtil.stringFromMap(map));
			message.setIsLook(1);
		}
		
		
		session.save(message);
		ResponseUtil.successRs();
//		Object object = SocketPushMessageSave.friendMessages.get(toFriendUser);
//		if (object instanceof List) {
//			List<Map<String, Object>> list2 = (List<Map<String, Object>>) object;
//			list2.add(map);
//			if (list2.size() >= 100) {
//				SocketPushMessageSave.friendMessages.remove(toFriendUser);
//			}
//		}

		transaction.commit();
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getDateStr() {
		return dateStr;
	}

	public void setDateStr(String dateStr) {
		this.dateStr = dateStr;
	}

	public String getToFriendUser() {
		return toFriendUser;
	}

	public void setToFriendUser(String toFriendUser) {
		this.toFriendUser = toFriendUser;
	}

}
