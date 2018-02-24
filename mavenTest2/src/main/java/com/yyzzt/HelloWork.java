package com.yyzzt;

import com.opensymphony.xwork2.ActionSupport;

public class HelloWork extends ActionSupport{
    private String message;
    @Override
    public String execute() throws Exception {
    	// TODO Auto-generated method stub
    	message = "hello world,struts2";
    	
    	
        
    	
    	return SUCCESS;
    }
    
    
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
    
}
