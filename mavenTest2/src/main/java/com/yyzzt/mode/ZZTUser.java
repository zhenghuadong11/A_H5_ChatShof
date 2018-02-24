package com.yyzzt.mode;

import com.sun.org.apache.xpath.internal.axes.SelfIteratorNoPredicate;
import com.sun.org.apache.xpath.internal.operations.Bool;

public class ZZTUser {
     private int id;
     private String name;
     private String user;
     private String password;
     private String sign;
     private String token;
     
     
     public String isEmpty() {
		if (user == null || user.length()<=0) {
			return "用户名不能为空";
		}
		if (name == null || name.length()<=0) {
			return "昵称不能为空";
		}
		
		return null;
	}
     
     
     
     
     
     
     
     
     
     
     
	@Override
	public String toString() {
		return "ZZTUser [id=" + id + ", name=" + name + ", user=" + user + ", password=" + password + ", sign=" + sign
				+ ", token=" + token + "]";
	}











	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getSign() {
		return sign;
	}
	public void setSign(String sign) {
		this.sign = sign;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
     
     
     
}
