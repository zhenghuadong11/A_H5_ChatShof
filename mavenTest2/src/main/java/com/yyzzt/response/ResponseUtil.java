package com.yyzzt.response;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Session;

import com.yyzzt.implement.socket.SocketPushMessageSave;
import com.yyzzt.normalModel.ErrorModel;
import com.yyzzt.normalModel.SuccessModel;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class ResponseUtil {
	private static JSONObject jsonObject = new JSONObject();
	private static ErrorModel errorModel = new ErrorModel();
	private static SuccessModel successModel = new SuccessModel();
	private static JSONArray jsonArray = new JSONArray();

	public static void crossOrigin() {
		System.out.println(0);
		HttpServletResponse response = ServletActionContext.getResponse();

		System.out.println(1);

		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
		response.setHeader("Access-Control-Max-Age", "3600");
		response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Content-Type", "text/html;charset=UTF-8");
	}

	public static void errorRs(String code, String cause) throws IOException {
		HttpServletResponse response = ServletActionContext.getResponse();
		errorModel.setCause(cause);
		errorModel.setCode(code);
		jsonObject.clear();
		jsonObject.putAll(errorModel.getMap());

		response.getWriter().write(jsonObject.toString());
	}

	public static Boolean errorNullParamRs(Object... param) throws IOException {

		for (Object object : param) {
			if (object == null) {
				HttpServletResponse response = ServletActionContext.getResponse();
				errorModel.setCause("您有必须的参数没有传递哦");
				errorModel.setCode("4010");
				jsonObject.clear();
				jsonObject.putAll(errorModel.getMap());
				response.getWriter().write(jsonObject.toString());

				return true;
			}
		}

		return false;

	}
	
	public static Boolean modifyTokenErrorRs(String user , String token) throws IOException{
		if (SocketPushMessageSave.user_tokens.get(user) == null
				|| !SocketPushMessageSave.user_tokens.get(user).equals(token)) {
			System.out.println(SocketPushMessageSave.user_tokens.get(user));
			System.out.println(token);
			
			ResponseUtil.errorTokenRs();
			return true;
		}
		return false;
	}
	

	public static void errorTokenRs() throws IOException {
		HttpServletResponse response = ServletActionContext.getResponse();
		errorModel.setCause("您的token不存在哦");
		errorModel.setCode("4011");
		jsonObject.clear();
		jsonObject.putAll(errorModel.getMap());

		response.getWriter().write(jsonObject.toString());
	}

	public static void successRs() throws IOException {
		HttpServletResponse response = ServletActionContext.getResponse();

		jsonObject.clear();
		jsonObject.putAll(successModel.getMap());
		response.getWriter().write(jsonObject.toString());
	}

	public static String UUID() {
		return java.util.UUID.randomUUID().toString();

	}

	public static void ObjectRs(Object object) throws IOException {
		HttpServletResponse response = ServletActionContext.getResponse();

		JSONObject jsonObject1 = JSONObject.fromObject(object);

		response.getWriter().write(jsonObject1.toString());
	}

	public static void stringRs(String string) throws IOException {
		HttpServletResponse response = ServletActionContext.getResponse();
		response.getWriter().write(string);
	}

	public static <T> void arraySuccessRs(List<T> list) throws IOException {
		jsonObject.clear();
		jsonArray.clear();
		jsonObject.put("success", true);

		for (T t : list) {
			JSONObject jsonObject1 = JSONObject.fromObject(t);
			jsonObject1.remove("password");
			jsonArray.add(jsonObject1);

			jsonObject.put("data", jsonArray);
		}
		HttpServletResponse response = ServletActionContext.getResponse();
		response.getWriter().write(jsonObject.toString());
	}

	public static void catchErrorRS(Session session) throws IOException {
		if (session != null && session.getTransaction().isActive()) {
			session.getTransaction().rollback();
		}
		errorRs("500", "服务器错误");
	}

	public static void tokenDoubleRs() throws IOException {
		errorRs("401", "天啊，有两个同样的token了，请去寻找工作人员");
	}
	public static String stringFromMap(Map<?, ?> map) {
		jsonObject.clear();
		jsonObject.putAll(map);
		
		return jsonObject.toString();
		
	}
	
}
