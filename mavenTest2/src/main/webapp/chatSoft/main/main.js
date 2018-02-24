var token = "";
var user = "";
var isClose = true;
var friendList = new Array();

var webSocket;

window.onload = function() {

	token = getValue(chatSoft_toekn);
	user = getValue(chatSoft_user);
	setTilte();
	getFriends();
	messageFromLogin();

}
function backReflesh(){
	getFriends();
}

function messageFromLogin() {
	var messages = JSON.parse(getValue(chatSoft_LoginMessages));
	for(var index = 0; index < messages.length; index += 1) {

		messagePush(messages[index], false);

	}

}

function setTilte() {

	var head_titleELe = document.getElementById("head_title");
	head_titleELe.innerHTML = user + "的好友及消息";
}

function getFriends() {
	var params = {
		"token": token,
		"user": user
	}

	requestUrlWithPostInLocation("/friendlist", params, function(data) {
		if(data.data == null) {
			return;
		}
		friendList = data.data;
		refreshEle();
	})
}

function refreshEle() {
	var friend_itemsELe = document.getElementById("friend_items");

	var innerHtml = "";
	for(var index = 0; index < friendList.length; index += 1) {

		var lastMessage;
		if(getLastMessageWithUser(friendList[index].user) == null || getLastMessageWithUser(friendList[index].user).content == null) {
			lastMessage = "";
		} else {
			lastMessage = getLastMessageWithUser(friendList[index].user).content;
		}
        var num = getUnreadMessage(user,friendList[index].user);
         
         if(num ==0 || num == null){
         	innerHtml += "<div class='friend_item' mysign='button' onclick='friendItemCLick(" + index + ")'><div class='friend_item_num' style='opacity:0'></div><div class='name'>" + friendList[index].name + "</div><div class='lastWord'>" + lastMessage + "</div></div>"
         }else{
         	innerHtml += "<div class='friend_item' mysign='button' onclick='friendItemCLick(" + index + ")'><div class='friend_item_num'>"+num+"</div><div class='name'>" + friendList[index].name + "</div><div class='lastWord'>" + lastMessage + "</div></div>"
         }
         
		

	}

	friend_itemsELe.innerHTML = innerHtml;

	setMysign();
}

function friendItemCLick(index) {
	//friendList[index]
	save(chatSoft_NowChatFriend, JSON.stringify(friendList[index]));
	
	document.getElementsByClassName("friend_item_num")[index].innerHTML = "";
	document.getElementsByClassName("friend_item_num")[index].style.opacity = 0;
	nextPageWithURL("sendMessage/sendMessage.html");
}

function headRightClick() {
	var rightClickShowELe = document.getElementById("rightClickShow");
	if(isClose) {
		special_animation(rightClickShowELe, "webkitTransform", "scale", 0, 1, 0.1);
	} else {
		special_animation(rightClickShowELe, "webkitTransform", "scale", 1, 0, 0.1);
	}
	isClose = !isClose;

	//	if(isStyleValid("webkitTransform")) {
	//		alert("有效");
	//	}
}

function toAddFriend(index) {
	if(index == 1) {
		nextPageWithURL("addFriend/addFriend.html");
		//		self.location = ;
	} else {
		//		self.location = ;
		nextPageWithURL("applyFriend/applyFriendList.html");
	}

}

function logout() {
	console.log(new Date().getTime());
	confirm("确定要退出登陆吗", function(isSure) {
		if(isSure == false) {
			return;
		}
		deleteValue(chatSoft_name);
		deleteValue(chatSoft_toekn);
		deleteValue(chatSoft_user);
		HDL_CloseSocket();
		back();

	});
}

function MainSocketPush(event) {
	console.log(event.data)
	var data = JSON.parse(event.data);

	messagePush(data);

}
/*
 * 推送过来的消息
 * */
function messagePush(message, isRefreshView) {
	message.user = message.fromUser;
	saveMessages(message);
	
	
	addOneUnreadMessage(user,message.fromUser);
	
	setNum(user,message.fromUser);
	
	if(isRefreshView == null || isRefreshView == true) {
		messageToGet(message);
	}
}

function setNum(toUser,user){
	for (var index = 0; index < friendList.length; index += 1) {
		if(friendList[index].user == user){
			var num = getUnreadMessage(toUser,friendList[index].user);
			if(num != null && num != 0){
				
				document.getElementsByClassName("friend_item_num")[index].innerHTML = num;
				document.getElementsByClassName("friend_item_num")[index].style.opacity = 1
			}else{
				document.getElementsByClassName("friend_item_num")[index].style.opacity = 0;
			}
			
		}

        
	}
}

/*
function startSocket() {
	HDL_startSocket(function(event) {
		//	    if(event.data == null || isJsonString(event.data)){
		//			return;
		//		}
		console.log(event.data)
		var data = JSON.parse(event.data);

		data.user = data.fromUser;
		saveMessages(data);
		messageToGet(data);
	});

}*/

function messageToGet(message) {
	for(var index = 0; index < friendList.length; index += 1) {
		if(friendList[index].user == message.user) {
			var lastWordELe = document.getElementsByClassName("lastWord")[index];
			if(message.type == 1) {
				lastWordELe.innerHTML = message.content;
			} else if(message.type == 2) {
				lastWordELe.innerHTML = "图片";
			} else {
				lastWordELe.innerHTML = "语音";
			}
			break;
		}
	}

}

