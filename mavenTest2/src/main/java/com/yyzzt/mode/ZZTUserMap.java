package com.yyzzt.mode;

public class ZZTUserMap {
 private int id;
 private String user;
 private String friendUser;
 /*
  * 0代表被拒绝了
  * 1代表申请
  * 2代表同意，现在是好友了
  * 
  * 只有单项的数据，如如果有1 2 2，那么1，2就是好友
  * 1 2 1 就是1正在向2申请好友
  * 1 2 0 就是1向2申请的好友被拒绝了
  * */
 private byte  type;
 
 
 
 
 
 
 
 
 
 
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}

public String getUser() {
	return user;
}
public void setUser(String user) {
	this.user = user;
}
public String getFriendUser() {
	return friendUser;
}
public void setFriendUser(String friendUser) {
	this.friendUser = friendUser;
}
public byte getType() {
	return type;
}
public void setType(byte type) {
	this.type = type;
}
 
 
}
