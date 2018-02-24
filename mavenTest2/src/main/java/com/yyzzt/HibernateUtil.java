package com.yyzzt;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;


public class HibernateUtil {
    private static SessionFactory sFactory = null;
	
	public static Session getCurrentSession(){
		if(sFactory==null) {
				 Configuration configuration =  new Configuration().configure("hibernate.cfg.xml");
				 sFactory = configuration.buildSessionFactory();
		}
		return sFactory.getCurrentSession();
	}
}
