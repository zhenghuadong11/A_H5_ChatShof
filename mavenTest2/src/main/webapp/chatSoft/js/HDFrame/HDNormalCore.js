/*
 * 这里是有关一些常用方法的，其他框架有可能也依赖这里的，所以需要第一个加载
 * */

/*
    为字符串添加方法
 * */
String.prototype.endWith = function(endStr) {
	var d = this.length - endStr.length;
	return(d >= 0 && this.lastIndexOf(endStr) == d)
}
String.prototype.removeSpace = function() {
	return this.replace(/\s/ig, '');
}

/*
 * 测试css的属性以及值是否有效
 * 默认是div节点*/
function isStyleValid(styleName, value, ele) {
	if(styleName == null) {
		return false;
	}
	if(ele == null) {
		ele = document.createElement('div');
	}
	if(styleName in ele.style) {
		if(value == null) {
			return true;
		} else {
			ele.style[styleName] = value;
			console.log(ele.style[styleName]);
			console.log(value);
			return ele.style[styleName].removeSpace() === value.removeSpace();
		}
	}

	return false;

}
/**
 *   日期格式化
 * */
Date.prototype.Format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function dateStr(date) {
	var dateText = "";
	dateText += date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日 ";
	dateText += date.getHours() + ":" + date.getMinutes();
	return date.Format("yyyy年M月d日 hh:mm");
}

/*
 *  对class样式的操作
 * */
function hasClass(elements, cName) {
	return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
};

function addClass(elements, cName) {

	if(!hasClass(elements, cName)) {
		elements.className += " " + cName;
	};
};

function removeClass(elements, cName) {
	if(hasClass(elements, cName)) {
		elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
	};
};

/*判断是否是json字符串*/
function isJsonString(str) {
	try {
		if(typeof JSON.parse(str) == "object") {
			return true;
		}
	} catch(e) {}
	return false;
}