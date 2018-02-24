package com.yyzzt.implement;

import java.io.Console;
import java.io.IOException;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.mysql.jdbc.UpdatableResultSet;
import com.yyzzt.HibernateUtil;
import com.yyzzt.mode.ZZTUser;
import com.yyzzt.mode.ZZTUserMap;
import com.yyzzt.response.ResponseUtil;

public class ComfirmFriend {
	private String token;
	private String friendUser;
	private String user;

	public void comfirmFriend() throws IOException {
		ResponseUtil.crossOrigin();

		if (ResponseUtil.errorNullParamRs(token, user, friendUser)) {
			return;
		}
		if (ResponseUtil.modifyTokenErrorRs(user, token)) {
			return;
		}

		Session session = null;
		try {
			session = HibernateUtil.getCurrentSession();
			dataBaseHandle(session);
		} catch (Exception e) {
			System.out.println(e);
			ResponseUtil.catchErrorRS(session);

		} finally {
			if (session != null && session.isOpen()) {
				session.close();
			}
		}

	}

	private void dataBaseHandle(Session session) throws IOException {
		Transaction transaction = session.beginTransaction();

		if (friendUser.equals(user) == true) {
			ResponseUtil.errorRs("401", "不能添加自己的");

		} else {
			String sql1 = "select up from ZZTUserMap up where up.user = ? and up.friendUser = ?";
			Query query2 = session.createQuery(sql1);
			query2.setParameter(0, friendUser);
			query2.setParameter(1, user);

			List<ZZTUserMap> maps = query2.list();

			if (maps.size() == 1) {
				ZZTUserMap userMap = maps.get(0);
				if (userMap.getType() == (byte) 1) {
					userMap.setType((byte) 2);
					session.update(userMap);

					ResponseUtil.successRs();
				} else {
					ResponseUtil.errorRs("401", "人都不申请，你自恋什么");
				}
			} else {
				ResponseUtil.errorRs("500", "对不起，没有这个申请哦");
			}
		}

		transaction.commit();
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getFriendUser() {
		return friendUser;
	}

	public void setFriendUser(String friendUser) {
		this.friendUser = friendUser;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

}
