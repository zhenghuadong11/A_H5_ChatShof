package com.yyzzt.implement;

import java.io.IOException;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.yyzzt.HibernateUtil;
import com.yyzzt.mode.ZZTUserMap;
import com.yyzzt.response.ResponseUtil;

public class AddFriend {
	private String token;
	private String user;
	private String friendUser;

	public void addFriend() throws IOException {
		ResponseUtil.crossOrigin();

		if (ResponseUtil.errorNullParamRs(token, user, friendUser)) {
			return;
		}

		if (ResponseUtil.modifyTokenErrorRs(user, token)) {
			return;
		}

		Session session = HibernateUtil.getCurrentSession();
		try {
			dataBaseHandle(session);
		} catch (Exception e) {
			ResponseUtil.catchErrorRS(session);
		} finally {
			if (session != null && session.isOpen()) {
				session.close();
			}
		}

	}

	private void dataBaseHandle(Session session) throws IOException {

		Transaction transaction = session.beginTransaction();

		if (friendUser.equals(user)) {
			ResponseUtil.errorRs("401", "不能添加自己");
			return;
		}

		String sql1 = "select up from ZZTUserMap up where (up.user = ? and up.friendUser = ?) or (up.user = ? and up.friendUser = ?)";
		Query query1 = session.createQuery(sql1);
		query1.setParameter(0, user);
		query1.setParameter(1, friendUser);
		query1.setParameter(2, friendUser);
		query1.setParameter(3, user);

		List<ZZTUserMap> maps = query1.list();
		if (maps.size() == 0) {
			ZZTUserMap userMap = new ZZTUserMap();
			userMap.setFriendUser(friendUser);
			userMap.setUser(user);
			userMap.setType((byte) 1);
			session.save(userMap);

			ResponseUtil.successRs();
		} else if (maps.size() == 1) {
			if (maps.get(0).getType() == (byte) 0) {
				maps.get(0).setType((byte) 1);
				maps.get(0).setUser(user);
				maps.get(0).setFriendUser(friendUser);
				session.update(maps.get(0));

				ResponseUtil.successRs();
			} else if (maps.get(0).getType() == (byte) 1) {
				ResponseUtil.errorRs("401", "已经添加过好友了");
			} else {
				ResponseUtil.errorRs("401", "已经是好友了");
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
