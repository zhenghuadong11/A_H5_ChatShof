var nowChatFriend = null;
var oneFriendMessages = null;
var token = null;
var user = null;
var toFriendUser = null;

window.onload = function() {
	
	token = getValue(chatSoft_toekn);
	user = getValue(chatSoft_user);
	
	
	
	nowChatFriend = JSON.parse(getValue(chatSoft_NowChatFriend));
	toFriendUser = nowChatFriend.user;
	emptyUnreadMessage(user,toFriendUser);
	oneFriendMessages = getMessageWithUser(nowChatFriend.user);
	setNick();
	addMessage();
	
	

}

function setNick() {
	var friendNickEle = document.getElementById("friendNick");
	friendNickEle.innerHTML = nowChatFriend.name;
}

function addMessage() {
	for(var index = 0; index < oneFriendMessages.length; index += 1) {
		var message = {
			"value": oneFriendMessages[index].content
		};
		if(oneFriendMessages[index].isSend == null || oneFriendMessages[index].isSend == false) {
			addMessageELe(message, false, false);
		} else if(oneFriendMessages[index].isSend == true) {
			addMessageELe(message, true, false);
		}

	}
	var contentELe = document.getElementById("content");
	contentELe.scrollTop = contentELe.scrollHeight - contentELe.offsetHeight;
}

function sendMessage() {
	var bottom_inputELe = document.getElementById("bottom_input");

	if(bottom_inputELe.value == null || bottom_inputELe.value == "") {
		return;
	}
	var message = {
		"value": bottom_inputELe.value
	};
	console.log(new Date().Format("yyyy-MM-dd hh-mm-ss"));
	var params = {
		"token": token,
		"user" : user,
		"toFriendUser": nowChatFriend.user,
		"content": bottom_inputELe.value,
		"type": 1,
		"dateStr": new Date().Format("yyyy-MM-dd hh-mm-ss")
	};

	requestUrlWithPostInLocation("/sendMessage", params, function(data) {

		var saveMessage = {
			"content": bottom_inputELe.value,
			"type": 1,
			"isSend": true,
			"user": nowChatFriend.user
		};
		saveMessages(saveMessage);
		oneFriendMessages.push(saveMessage);
		addMessageELe(message, true, true);

	});

}
/*
 * message 是一个字典
 * */
function addMessageELe(message, isSend, isAnimation) {

	var innerHTML = "";
	if(isSend) {
		innerHTML = "<div class='content_chat_item_name_right'>:我</div>" +
			"<div class='content_chat_item_jiao_right'></div>" +
			"<div class='content_chat_item_content_right'>" + message.value + "</div><div style='clear: both;'></div>"
	} else {
		innerHTML = "<div class='content_chat_item'><div class='content_chat_item_name'>对方：</div>" +
			"<div class='content_chat_item_jiao'></div>" +
			"<div class='content_chat_item_content'>" + message.value + "</div></div>";

	}
	var divEle = document.createElement("div");
	divEle.className = "content_chat_item";

	divEle.innerHTML = innerHTML;

	var itemsELe = document.getElementById("content_chat_items");
	itemsELe.appendChild(divEle);

	var contentELe = document.getElementById("content");

	if(isAnimation != null && isAnimation == true) {
		animation_WithUnit(contentELe, "scrollTop", null, contentELe.scrollTop, contentELe.scrollHeight - contentELe.offsetHeight, 0.2);
	}

}


/*
 * main的socket推送方法实现，socket推送入口
 * */
function MainSocketPush(event){
	 	var data = JSON.parse(event.data);
		data.user = data.fromUser;
		saveMessages(data);
		oneFriendMessages.push(data);

		var message = {
			"value": data.content
		}

		addMessageELe(message, false, true);
}

//function startSocket() {
//	HDL_startSocket(function(event) {
//		var data = JSON.parse(event.data);
//		data.user = data.fromUser;
//		saveMessages(data);
//		oneFriendMessages.push(data);
//
//		var message = {
//			"value": data.content
//		}
//
//		addMessageELe(message, false, true);
//	});
//
//}
