package com.yyzzt.normalModel;

import java.util.HashMap;
import java.util.Map;

public class ErrorModel {
	private String cause;
	private String code;
	private Boolean success = false;

	public String getCause() {
		return cause;
	}

	public void setCause(String cause) {
		this.cause = cause;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}
   
	public Map<String, Object> getMap() {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("cause", cause);
		map.put("code", code);
		map.put("success", success);
		
		return map;
	}
}
