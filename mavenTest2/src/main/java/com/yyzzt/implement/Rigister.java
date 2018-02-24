package com.yyzzt.implement;

import java.io.Console;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
import com.yyzzt.mode.ZZTUser;
import com.yyzzt.normalModel.ErrorModel;
import com.yyzzt.normalModel.SuccessModel;
import com.yyzzt.response.ResponseUtil;

import net.sf.json.JSONObject;
import com.yyzzt.HibernateUtil;

public class Rigister extends ActionSupport implements ModelDriven<ZZTUser> {

	private ZZTUser user = new ZZTUser();

	public void rigister() throws IOException {

		ResponseUtil.crossOrigin();
		if (user.isEmpty() != null) {
			ResponseUtil.errorRs("406", user.isEmpty());
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

	public void databaseHandle(Session session) throws IOException {

		Transaction transaction = session.beginTransaction();

		String sql = "select u From ZZTUser u Where u.user = ? or u.name = ?";
		Query query = session.createQuery(sql);
		query.setParameter(0, user.getUser());
		query.setParameter(1, user.getName());

		java.util.List<ZZTUser> us = (query).list();
		if (us.size() > 0) {
			String userP = us.get(0).getUser();
			String nameP = us.get(0).getName();

			if (userP != null && userP.equals(user.getUser())) {
				ResponseUtil.errorRs("401", "账号已注册");
			}
			if (nameP != null && nameP.equals(user.getName())) {
				ResponseUtil.errorRs("401", "昵称已注册");
			}
			transaction.commit();
		} else {
			session.save(user);
			transaction.commit();
			ResponseUtil.successRs();
		}
		
	}

	public ZZTUser getModel() {
		// TODO Auto-generated method stub
		return user;
	}

}
