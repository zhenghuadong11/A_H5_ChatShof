package com.yyzzt.mode;

import java.util.Date;;

public class ZZTMessage {
    private int id;
    /*
     * type = 0的时候表示没有看过
     * type = 1的时候表示看过了
     * */
    private int type;
    private String content;
    private String fromUser;
    private String toUser;
    private Date date;
    private int isLook;
    
    
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}


	public String getFromUser() {
		return fromUser;
	}
	public void setFromUser(String fromUser) {
		this.fromUser = fromUser;
	}
	public String getToUser() {
		return toUser;
	}
	public void setToUser(String toUser) {
		this.toUser = toUser;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public int getIsLook() {
		return isLook;
	}
	public void setIsLook(int isLook) {
		this.isLook = isLook;
	}
    
}
