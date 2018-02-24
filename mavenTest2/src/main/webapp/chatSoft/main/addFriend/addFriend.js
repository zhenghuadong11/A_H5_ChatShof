var friendsList;
var user;
function searchClick() {
	var token = getValue(chatSoft_toekn);

	var searchValue = document.getElementById("search_input").value;
    user = getValue(chatSoft_user);
	var data = {
		"token": token,
		"user":getValue(chatSoft_user),
		"friendSign": searchValue
	};

	requestUrlWithPostInLocation("/selectFriend", data, function(data) {
		if(data.data != null) {
			friendsList = data.data;
			refreshEle();
		}

	});

}

function refreshEle() {
	var innerHtml = "";
	for(var index = 0; index < friendsList.length; index += 1) {
		var friend = friendsList[index];
		innerHtml += "<div class='friend_item'><div class='friend_item_name'>昵称：" + friend.name + "  用户：" + friend.user +
			"</div><button class='friend_item_add' mysign='button' onclick = 'addFriendClick(" + index + ")'>添加</button></div>";

	}

	var friend_itemsEle = document.getElementById("friend_items");
	friend_itemsEle.innerHTML = innerHtml;
	setMysign();
}

function addFriendClick(index) {
	var token = getValue(chatSoft_toekn);
	var data = {
		"token": token,
		"user":user,
		"friendUser": friendsList[index].user
	};

	requestUrlWithPostInLocation("/addFriend", data, function(data) {
		alert("已经发送了请求");

	});
}