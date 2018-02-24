package com.yyzzt.implement.socket;

import java.util.HashMap;
import java.util.Map;

public class SocketPushMessageSave {
  /*
   * 用来存储朋友发送的信息，然后推送
   * */
  public static Map<String, Object> friendMessages = new HashMap<String, Object>();
  
  /*
   *   用来做加锁的 
   */
  public static Map<String, Boolean> friendIsBusy = new HashMap<String, Boolean>();
  
  
  /*
   *   用内存来存朋友请求的
   * */
  public static Map<String, Object> addFriendRequest = new HashMap<String, Object>();
  
  /*
   *   用来缓存token的,一个用户对应一个token，、
   *   在登陆的时候缓存一下，验证的时候在这里找，没有找到就算是没有登陆，不再找数据库，直接返回错误。
   * */
  public static Map<String, String> user_tokens = new HashMap<String, String>();
  /*
   *  用来储存所有的socket，用来推送
   * */
  public static Map<String, FriendMessageSocket> user_sockets = new HashMap<String, FriendMessageSocket>();
}
