

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
    private static SessionFactory sFactory = null;
	static{
	 Configuration configuration =  new Configuration().configure("hibernate.cfg.xml");
	 System.out.println(configuration);
	 sFactory = configuration.buildSessionFactory();
	 }
	public static Session getSession(){
		return sFactory.openSession();
	}
	public static Session getCurrentSession(){
		System.out.println("getCurrentSession");
		return sFactory.getCurrentSession();
	}
}
