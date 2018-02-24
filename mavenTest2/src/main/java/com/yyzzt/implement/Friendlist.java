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

public class Friendlist {

	private String token;
	private String user;

	public void a() throws IOException {

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

	private void databaseHandle(Session session) throws IOException {
		//
		Transaction transaction = session.beginTransaction();

		String sql1 = "select u from ZZTUser u , ZZTUserMap up where ((up.user= ? and u.user = up.friendUser) or (up.friendUser= ? and u.user = up.user)) and up.type = 2";

		Query query2 = session.createQuery(sql1);

		query2.setParameter(0, user);
		query2.setParameter(1, user);

		List<ZZTUser> users2 = query2.list();
		ResponseUtil.arraySuccessRs(users2);
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

}
