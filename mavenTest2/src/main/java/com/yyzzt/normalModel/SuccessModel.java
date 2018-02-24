package com.yyzzt.normalModel;

import java.util.HashMap;
import java.util.Map;

public class SuccessModel {
   private Boolean success=true;
   
   public Map<String, Object> getMap() {
	   Map<String, Object> map = new HashMap<String, Object>();
	   
	   map.put("success", success);
	   
	   return map;
   }
   
}
