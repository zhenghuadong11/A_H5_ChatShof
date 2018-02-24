package com.yyzzt.implement;

import java.io.IOException;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.yyzzt.HibernateUtil;
import com.yyzzt.mode.ZZTUser;
import com.yyzzt.mode.ZZTUserMap;
import com.yyzzt.response.ResponseUtil;

public class ApplyFriendList {

	private String token;
	private String user;

	public void applyFriendList() throws IOException {
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

	public void databaseHandle(Session session) throws IOException {
		Transaction transaction = session.beginTransaction();

		String sql1 = "select u from ZZTUser u , ZZTUserMap up where up.user = u.user and up.friendUser = ? and up.type = 1";
		Query query1 = session.createQuery(sql1);
		query1.setParameter(0, user);

		List<ZZTUserMap> maps = query1.list();
		ResponseUtil.arraySuccessRs(maps);

		transaction.commit();
	}

}
