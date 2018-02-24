
var token = "";
var user = "";
var applyList = new Array();
window.onload=function(){
   token = getValue(chatSoft_toekn);
   user = getValue(chatSoft_user);
   requestApplyList();
}


function requestApplyList(){
	var data = {
		"token":token,
		"user":user
	}
	requestUrlWithPostInLocation("/applyFriendList",data,function(data){
		if(data.data != null){
			
			applyList = data.data;
			applyFriendList_refleshEle();
		}
		

	});
	
	
	
	
}


function applyFriendList_refleshEle(){
	var content_listEle = document.getElementById("content_list");
	
	var innerHtml = "";
	for (var index = 0; index < applyList.length; index += 1) {
		innerHtml += "<div class='content_item'><div class='content_item_nickName'>"+applyList[index].name+"</div>"+
				"<div class='content_item_refuse' onclick='refuseClcik("+index+")' mysign='button'>拒绝</div>" +
				 "<div class='content_item_sure' onclick='agreeClick("+index+")' mysign='button'>同意</div></div>";
	}
	content_listEle.innerHTML = innerHtml;
	
}


function refuseClcik(index){
    var data ={
    	   "token":token,
		"user":user,
    	   "friendUser":applyList[index].user
    };
    requestUrlWithPostInLocation("/refuse",data,function(data){
    	      applyList.splice(1,1);
    	      applyFriendList_refleshEle();
    });
    
    
}
function agreeClick(index){
	 var data ={
    	   "token":token,
    	   "user":user,
    	   "friendUser":applyList[index].user
    };
    requestUrlWithPostInLocation("/comfirmFriend",data,function(data){
    	      alert("成功添加好友"+applyList[index].name);    	        
    });
}
function back(){
	self.history.go(-1)
}
