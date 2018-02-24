import org.hibernate.Session;
import org.hibernate.Transaction;

public class Test {
public static void main(String[] args) {
	Session session = HibernateUtil.getCurrentSession();
    Transaction transaction = session.beginTransaction();
    Valite valite = (Valite)session.get(Valite.class, 1);
    

    transaction.commit();
    System.out.println(valite);
}
}
