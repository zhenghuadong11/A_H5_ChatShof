/*
 *   这里只提供接口，是指用于本地的，例如：
 *   1.在这个项目的公用变量
 *   2.在这个项目的一些操作
 *  使用时拷贝到上一层去加入内容
 * */

var chatSoft_toekn = "chatSoft_toekn";
var chatSoft_name = "chatSoft_name";
var chatSoft_user = "chatSoft_user";
var chatSoft_NowChatFriend = "chatSoft_NowChatFriend";
var chatSoft_LoginMessages = "chatSoft_LoginMessages";

/*
 *    格式：
 *    {
 *          user：{
 * 	            friend：num
 *    
 *          }，
 *    
 *     }
 * */
var chatSoft_unReadMessages = "chatSoft_unReadMessages";

/*   数据的格式
 *  {
 *     user:[messages]	
 * 
 *   }
 * 每个user保留的数据不多于100条
 * */
var chatSoft_friendMessages = "chatSoft_friendMessages";

var navHeight = 64;
var tabHeight = 144;

var marginPad = 20;

var leftDistan = 100;

var nav_imageWH = 44;

function saveMessages(message) {
	if(message == null || message.user == null) {
		return;
	}
	if(getValue(chatSoft_friendMessages) == null || JSON.parse(getValue(chatSoft_friendMessages)) == null) {
		var friendMessages = {};
		var messages = new Array();
		messages.push(message);

		friendMessages[message.user] = messages;
		save(chatSoft_friendMessages, JSON.stringify(friendMessages));

	} else {
		var friendMessages = JSON.parse(getValue(chatSoft_friendMessages));
		if(friendMessages[message.user] == null) {
			var messages = new Array();
			messages.push(message);
			friendMessages[message.user] = messages;
			save(chatSoft_friendMessages, JSON.stringify(friendMessages));
		} else {
			if(friendMessages[message.user].length >= 100) {
				friendMessages[message.user].splice(0, 1);
			}
			friendMessages[message.user].push(message);
			save(chatSoft_friendMessages, JSON.stringify(friendMessages));
		}

	}

}
//function saveMessagForUser(user,oneMessages){
//	var messages = JSON.parse(getValue(chatSoft_friendMessages));
//	if(messages == null){
//		
//	}
//}

function getMessageWithUser(user) {
	var messages = JSON.parse(getValue(chatSoft_friendMessages));

	if(user == null) {
		return null;
	}
	if(messages == null || messages[user] == null) {
		return new Array();
	}
	return messages[user];

}

function getLastMessageWithUser(user) {
	var messages = getMessageWithUser(user);
	if(messages == null || messages.length == 0) {
		return null;
	} else {
		return messages[messages.length - 1];
	}
}

function getUnreadMessage(user, friend) {
	if(user == null || friend == null) {
		return;
	}
	//chatSoft_unReadMessages
	var unReadMessages = JSON.parse(getValue(chatSoft_unReadMessages));

	if(unReadMessages == null) {
		return null;
	}

	var user = unReadMessages[user];
	if(user == null) {
		return null;
	}

	return user[friend];

}

function emptyUnreadMessage(user, friend) {
	if(user == null || friend == null) {
		return;
	}

	var unReadMessages = JSON.parse(getValue(chatSoft_unReadMessages));
	if(unReadMessages == null) {
		return;
	}

	var user = unReadMessages[user];
	if(user == null) {
		return null;
	}

	user[friend] = 0;

	save(chatSoft_unReadMessages, JSON.stringify(unReadMessages));
}

function addOneUnreadMessage(user, friend) {
	if(user == null || friend == null) {
		return;
	}

	var unReadMessages = JSON.parse(getValue(chatSoft_unReadMessages));
	if(unReadMessages == null) {
		unReadMessages = {};
		var data = {};
		data[friend] = 1;
		unReadMessages[user] = data;

	} else {
		var userOBJ = unReadMessages[user];
		if(userOBJ == null) {
			unReadMessages = {};
			var data = {};
			data[friend] = 1;
			unReadMessages[user] = data;
		} else {
			if(userOBJ[friend] != null) {
				userOBJ[friend] = userOBJ[friend] + 1;
			} else {
				userOBJ[friend] = 1;
			}
		}

	}

	save(chatSoft_unReadMessages, JSON.stringify(unReadMessages));
}

/*这里做了对错误的处理，调用的时候只需要关心成功后的处理即可
 * post请求编码解决了，get要改tomcat的，这个项目统一用post
 * 这里重写了date
 * */
function requestUrlWithPostInLocation(url, data, success, error) {
	var locationSuccess = function(data) {
		if(data.success == false) {
			if(data.code == "4011") {
				alert(data.cause, function() {
					HDL_CloseSocket();
					backToStartLogin();
				});
			} else {
				alert(data.cause);
			}

			return;
		}

		success(data);
	}
	if(error == null) {
		error = function(a, b, c) {
			alert("网络错误");
		}
	}
	data.date = (new Date()).toString();
	requestUrlWithPost(url, data, locationSuccess, error);
}

function HDL_startSocket(user, token) {
	if(window.parent != null || window.parent.startSocket != null) {
		window.parent.startSocket(user, token);
	}
}

function HDL_CloseSocket() {
	if(window.parent != null || window.parent.closeSocket != null) {
		window.parent.closeSocket();
	}
}

/*
 * 这里不调用
 * */
function Location_startSocket(handle) {
	webSocket = new WebSocket('ws://192.168.16.21:8080/mavenTest2/friendMessage.socket');
	webSocket.onerror = function(event) {
		console.log("错误了");
	};

	webSocket.onopen = function(event) {
		console.log("打开了");
		var message = {
			"user": getValue(chatSoft_user),
			"token": getValue(chatSoft_toekn)
		}
		webSocket.send(JSON.stringify(message));

	};

	webSocket.onmessage = function(event) {
		handle(event);

	};
	//服务端的服务关闭后调用
	webSocket.onclose = function(event) {
		alert('socket关闭了');
	}
}

/*
 *  用于封装跳转请求
 * */
function nextPageWithURL(url) {
	if(window.parent == null || window.parent.pushPage == null) {
		self.location = url;
	} else {
		window.parent.pushPage(url);
	}

}

function backToStartLogin() {
	if(window.parent == null || window.parent.moveToFirstPage == null) {

		self.history.go(-(self.history.length - 1));
	} else {
		window.parent.moveToFirstPage();
	}

}

function back() {
	if(window.parent == null || window.parent.pushPage == null) {
		self.history.go(-1);
	} else {
		window.parent.popPage();
	}

	//self.history.go(-1);

}