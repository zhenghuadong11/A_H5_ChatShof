var MAIN_FRAME_leftFrameItem = document.getElementsByClassName("mainFrame_item")[1];
var MAIN_FRAME_rightFrameItem = document.getElementsByClassName("mainFrame_item")[0];

var MAIN_FRAME_count = 1;

function move() {

	MAIN_FRAME_rightFrameItem.style.left = window.innerWidth + "px";
	MAIN_FRAME_leftFrameItem.style.zIndex = 10;
	MAIN_FRAME_rightFrameItem.style.zIndex = 100;
	animation(MAIN_FRAME_rightFrameItem, "left", window.innerWidth, 0, 0.15, function() {

		var ele = MAIN_FRAME_leftFrameItem;
		MAIN_FRAME_leftFrameItem = MAIN_FRAME_rightFrameItem;
		MAIN_FRAME_rightFrameItem = ele;

	});

}

function pushPage(url) {

	MAIN_FRAME_count += 1;
	if(url != null) {
		MAIN_FRAME_rightFrameItem.contentWindow.location = url;
	} else {
		MAIN_FRAME_rightFrameItem.contentWindow.history.forward();
	}

	//				window.onpopstate = function() {
	//				console.log("nihaoa");
	//				window.parent.popPage();
	//			}
	//			window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
	//  MAIN_FRAME_rightFrameItem.contentWindow.history.pushState(null, null, '#');
	//  MAIN_FRAME_rightFrameItem.contentWindow.onpopstate =function(){
	//  	        popPage();
	//  }
	//  MAIN_FRAME_rightFrameItem.contentWindow.history.forward(1);

	move();
}

function popPage() {
	if(MAIN_FRAME_count <= 1) {
		return;
	}
	MAIN_FRAME_count -= 1;
	animation(MAIN_FRAME_leftFrameItem, "left", 0, window.innerWidth, 0.15, function() {

		MAIN_FRAME_leftFrameItem.style.left = 0;
		MAIN_FRAME_leftFrameItem.style.zIndex = 10;
		MAIN_FRAME_rightFrameItem.style.zIndex = 100;
		MAIN_FRAME_leftFrameItem.contentWindow.history.go(-1);
		
		if(MAIN_FRAME_rightFrameItem.contentWindow.backReflesh != null){
			MAIN_FRAME_rightFrameItem.contentWindow.backReflesh();
		}
		
		

		var ele = MAIN_FRAME_leftFrameItem;
		MAIN_FRAME_leftFrameItem = MAIN_FRAME_rightFrameItem;
		MAIN_FRAME_rightFrameItem = ele;

	});

}
/*
 *  返回到首页
 * */
function moveToFirstPage() {
	MAIN_FRAME_leftFrameItem.contentWindow.history.go(MAIN_FRAME_leftFrameItem.contentWindow.history.length);
	MAIN_FRAME_rightFrameItem.contentWindow.history.go(MAIN_FRAME_leftFrameItem.contentWindow.history.length);
	MAIN_FRAME_leftFrameItem = document.getElementsByClassName("mainFrame_item")[1];
	MAIN_FRAME_rightFrameItem = document.getElementsByClassName("mainFrame_item")[0];

	MAIN_FRAME_leftFrameItem.style.zIndex = 100;
	MAIN_FRAME_rightFrameItem.style.zIndex = 10;

}

/*
 * 以下是socket部分，不建议怎么使用，因为精确性不好，很容易出错，而且分离的时候不好做
 * */
var HDMain_isStartingSocket = false;
var MAIN_webSocket = null;
/*
 * 开启socket
 * */
function startSocket(user, token) {
	if(HDMain_isStartingSocket == false) {
		HDMain_isStartingSocket = true;
		MAIN_webSocket = new WebSocket('ws://19287r3w35.iask.in/mavenTest2/friendMessage.socket');
		MAIN_webSocket.onerror = function(event) {
			console.log("错误了");
		};

		MAIN_webSocket.onopen = function(event) {
			console.log("打开了");
			var message = {
				"user": user,
				"token": token
			}
			MAIN_webSocket.send(JSON.stringify(message));

		};
		/*
		 * function MainSocketPush(event){}
		 * */
		MAIN_webSocket.onmessage = function(event) {
			if(MAIN_FRAME_leftFrameItem.contentWindow != null && MAIN_FRAME_leftFrameItem.contentWindow.MainSocketPush != null) {
				MAIN_FRAME_leftFrameItem.contentWindow.MainSocketPush(event);
			}
			if(MAIN_FRAME_rightFrameItem.contentWindow != null && MAIN_FRAME_rightFrameItem.contentWindow.MainSocketPush != null) {
				MAIN_FRAME_rightFrameItem.contentWindow.MainSocketPush(event);
			}

		};
		//服务端的服务关闭后调用
		/*
		 *   MainSocketClose(){
		 * 	
		 * }
		 * 
		 * */
		MAIN_webSocket.onclose = function(event) {
			//正常退出
			if(event.code == 4000) {
				if(MAIN_FRAME_leftFrameItem.contentWindow != null && MAIN_FRAME_leftFrameItem.contentWindow.MainSocketClose != null) {
					MAIN_FRAME_leftFrameItem.contentWindow.MainSocketClose(event);
				}
				if(MAIN_FRAME_rightFrameItem.contentWindow != null && MAIN_FRAME_rightFrameItem.contentWindow.MainSocketClose != null) {
					MAIN_FRAME_rightFrameItem.contentWindow.MainSocketClose(event);
				}
			} else {
				HDMain_isStartingSocket = false;
				//重新连接
				//	startSocket();
			}

		}
	}
}

function closeSocket() {
	if(HDMain_isStartingSocket == true) {
		HDMain_isStartingSocket = false;
		//		webSocket.onclose();
		var event = {
			"code": 4000,
			"message": "退出登陆了"
		};
		MAIN_webSocket.close(4000, "退出登陆了");
		//		startSocket();
		//    MAIN_webSocket = null;
		//		var a = MAIN_webSocket.close();
		//4000, "退出登陆了"
		//		console.log(a);
	}
}

//window.onpopstate = function() {
//	popPage();
//
//}
//window.addEventListener("popstate", function(e) {
//	alert("我监听到了浏览器的返回按钮事件啦"); //根据自己的需求实现自己的功能
//}, false);
//window.history.forward(-1);
//