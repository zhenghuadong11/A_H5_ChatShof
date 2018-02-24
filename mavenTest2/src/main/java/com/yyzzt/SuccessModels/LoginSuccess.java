package com.yyzzt.SuccessModels;

import com.yyzzt.normalModel.SuccessModel;

public class LoginSuccess extends SuccessModel{
     private String token;
     private String name;
     private String user;
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
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
     
     
     
}
