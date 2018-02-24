
package com.yyzzt.implement.socket;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.hibernate.Transaction;

import com.alibaba.fastjson.JSON;
import com.yyzzt.HibernateUtil;
import com.yyzzt.mode.ZZTMessage;
import com.yyzzt.normalModel.ErrorModel;
import com.yyzzt.response.ResponseUtil;

import net.sf.json.JSONObject;

import java.awt.JobAttributes;
import java.io.Console;
import java.io.IOException;
import java.net.Socket;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@ServerEndpoint("/friendMessage.socket")
public class FriendMessageSocket{
	private String _token;
	private String _user;
	static JSONObject _jsonObject = new JSONObject();
	static ErrorModel _errorModel = new ErrorModel();
	
	public Boolean isClose;
	/*用来存储session，可以发送消息*/
	public javax.websocket.Session session;
	public static int onLineUser;
	
	/* 这里接受token */
	@OnMessage
	public void onMessage(String message, Session session) throws IOException, InterruptedException {

		
		Map<String,String> map = (Map<String,String>) JSON.parse(message);
		
		
		System.out.println("有数据了:" + message);
		_token = map.get("token");
        _user = map.get("user");
        if(_token == null || _user == null){
     	   return;
        }
        if(ResponseUtil.modifyTokenErrorRs(_user, _token)){
        	return;
        }
        
        if (SocketPushMessageSave.user_sockets.get(_user) != null) {
        	FriendMessageSocket socket = SocketPushMessageSave.user_sockets.get(_user);
        	//这里socket应该是要关闭的，但是算了，不懂关闭
		}
        this.session = session;
        SocketPushMessageSave.user_sockets.put(_user, this);
        
        

      



	}



	@OnOpen
	public void onOpen() {
		onLineUser += 1;
		isClose = false;
		System.out.println("Client connected");
	}

	@OnClose
	public void onClose() {
		onLineUser -= 1;
		isClose = true;
		System.out.println("Connection closed");
	}
}