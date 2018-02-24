/*
 *   提供3个，两个直接可用
 *   1.alert
 *   2.confirm
 * */

var shieldElements = new Array();
var orders = new Array();
window.alert = function(str, order) {

	var shieldDiv = document.createElement("div");
	shieldDiv.style.position = "fixed";
	shieldDiv.style.width = "100vw";
	shieldDiv.style.height = "100vh";
	shieldDiv.style.zIndex = 101 + shieldElements.length;
	shieldDiv.style.backgroundColor = "transparent";

	var orderIndex = -1;
	if(order != null) {
		orderIndex = orders.length;
		orders.push(order);
	}

	var innertHtml = '<div style="width: 100%;height: 100%;background-color: #cccccc;opacity: 0.5"></div><div class="content_fsdfa" style="transform:scale(0,0);position: absolute;color:white;width: 442px;height: 283px; border-radius: 5px;top: 50%;left: 50%;margin-left: -221px;">' +
		'<div style="height: 220px;width: 100%;line-height: 220px;text-align: center;border-radius: 10px 10px 0 0;font-size: 32px;background-color:white"><div style="display: inline-block;width: 100%;line-height: normal;color:#414141">' + str + '</div></div>' +

		'<div onclick = "doOk(' + shieldElements.length + ',' + orderIndex + ')" style="height: 63px;width: 100%;background-color: #CC0001;line-height: 63px;font-size: 28px;border-radius: 0 0 10px 10px;text-align: center;">确认</div>' +
		'</div></div></div>';

	shieldDiv.innerHTML = innertHtml;
	shieldElements.push(shieldDiv);

    
    
    
	if(document.body.firstChild == null) {
		document.body.appendChild(shieldDiv);
	} else {
		document.body.insertBefore(shieldDiv, document.body.firstChild);
	}
	var contentDiv = document.getElementsByClassName("content_fsdfa")[shieldElements.length - 1];
	contentDiv.style.marginTop = -1 * contentDiv.offsetHeight / 2 + "px";
//  special_animation(ele, option, valueSign, oldValue, newValue, time)
    special_animation(contentDiv,"transform","scale",0,1,0.2);
//  contentDiv.webkitTransform

}

function doOk(elementIndex, orderIndex) {
	var shieldDivEle = shieldElements[elementIndex];

	var parentELe = shieldDivEle.parentNode;
	parentELe.removeChild(shieldDivEle);
	shieldElements.splice(elementIndex, 1);
	if(orderIndex != -1) {
		orders[orderIndex]();
		orders.splice(orderIndex, 1);
	}
}
var confirmElements = new Array();
var confirms = new Array();

window.confirm = function(str, confirm) {

	var shieldDiv = document.createElement("div");
	shieldDiv.style.position = "fixed";
	shieldDiv.style.width = "100vw";
	shieldDiv.style.height = "100vh";
	shieldDiv.style.zIndex = 101 + confirmElements.length;

	var confirmIndex = -1;
	if(confirm != null) {
		confirmIndex = confirms.length;
		confirms.push(confirm);
	}
	var eleIndex = confirmElements.length;
	confirmElements.push(shieldDiv);



	var innertHtml = '<div style="width: 100%;height: 100%;background-color: #cccccc;opacity: 0.5;"></div><div class="content_fsdfa1" style="transform:scale(0,0);position: absolute;color:white;width: 442px;height: 283px;color:white; border-radius: 5px;top: 50%;left: 50%;margin-left: -221px;">' +
        	      '<div style="height: 220px;width: 100%;line-height: 220px;text-align: center;border-radius: 10px 10px 0 0;font-size: 32px;background-color:white"><div style="display: inline-block;width: 100%;line-height: normal;color:#414141">' + str + '</div></div>' +
        	      '<div onclick = "doOkComfirm(' + eleIndex + ',' + confirmIndex + ')" style="float:left;height: 63px;width: 50%;background-color: #CC0001;line-height: 63px;font-size: 28px;border-radius: 0 0 0 10px;text-align: center;">确认</div>' +
        	      '<div onclick = "doNoComfirm(' + eleIndex + ',' + confirmIndex + ')" style="float: left;height: 63px;width: 50%;background-color: #343434;line-height: 63px;font-size: 28px;border-radius: 0 0 10px 0;text-align: center;">取消</div></div>';
        	      
        	      
       


	shieldDiv.innerHTML = innertHtml;

	if(document.body.firstChild == null) {
		document.body.appendChild(shieldDiv);
	} else {
		document.body.insertBefore(shieldDiv, document.body.firstChild);
	}

	var contentDiv = document.getElementsByClassName("content_fsdfa1")[confirmElements.length - 1];
	contentDiv.style.marginTop = -1 * contentDiv.offsetHeight / 2 + "px";
    special_animation(contentDiv,"transform","scale",0,1,0.2);
}

function doOkComfirm(index, comfirmIndex) {
	var shieldDivEle = confirmElements[index];
	var parentELe = shieldDivEle.parentNode;
	parentELe.removeChild(shieldDivEle);
	confirmElements.splice(index, 1);
	if(comfirmIndex != -1) {
		confirms[comfirmIndex](true);
		confirms.splice(comfirmIndex, 1);
	}
}

function doNoComfirm(index, comfirmIndex) {
	var shieldDivEle = confirmElements[index];
	var parentELe = shieldDivEle.parentNode;
	parentELe.removeChild(shieldDivEle);
	confirmElements.splice(index, 1);
	if(comfirmIndex != -1) {
		confirms[comfirmIndex](false);
		confirms.splice(comfirmIndex, 1);
	}
}



function showToWindow(message, data, submit, cancel, success) {

	var innerHtml = "<div style='position: absolute;width: 100vw;height: 100vh;'>" +
		"<div style='position: absolute;width: 100vw;height: 100vh;background-color: #cccccc;opacity:0.5'>" +
		"</div>" +
		"<div id='showDiv' style='background-color: white;width: 300px;position: relative;top: 50%;left: 50%;margin-left: -150px;margin-top: -100px;text-align: center;border-radius: 10px'>" +
		"<br />" + message + "<br/>";
	for(var i = 0; i < data.length; i += 1) {
		innerHtml += "<div style = 'margin: 10px'>" + data[i] + "<input class='asdf' /><br /></div>"
	}

	innerHtml += "<button id='cancel.asdf' type='button'>取消</button>&nbsp;&nbsp;&nbsp;&nbsp;<button id='commit.asdf' type='button'>确认</button><br /><br /> </div></div>"

	var divEle = document.createElement("div");
	divEle.innerHTML = innerHtml;
	divEle.style.zIndex = 101;
	divEle.style.position = "fixed";

	document.body.insertBefore(divEle, document.body.firstChild);
	var cancelEle = document.getElementById("cancel.asdf");
	var commitEle = document.getElementById("commit.asdf");

	cancelEle.onclick = function() {
		document.body.removeNode(divEle);
		cancel();
	}
	commitEle.onclick = function() {
		var datasEles = document.getElementsByClassName("asdf");
		var datas = new Array();
		for(var i = 0; i < datasEles.length; i += 1) {
			datas.push(datasEles[i].value);
		}
		document.body.removeChild(divEle);

		success(datas);
	}

}