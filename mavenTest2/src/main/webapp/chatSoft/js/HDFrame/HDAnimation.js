/*
 *   一些有关动画的放在这里
 * 
 * */
! function() {
	var onloadFun = window.onload;
	window.onload = function() {
		if(onloadFun != null) {
			onloadFun();
		}
        setBodyUnSelect();
		setMysign();
	}
}();

/*
 * 添加了不能选择被选择复制粘贴
 * */
function setBodyUnSelect(){
	document.documentElement.style.webkitUserSelect='none';
//	var bodyELe = document.getElementsByTagName("body")[0];
//	bodyELe.oncontextmenu = function(){
//		return false;
//	};
//	bodyELe.onselectstart = function(){
//		return false;
//	};
}


//为拥有mysign属性的标签添加功能
function setMysign() {
	var bodyELe = document.getElementsByTagName("body")[0];
	var eles = new Array();
	getMysignEle(bodyELe, eles, "mysign");
	for(var i = 0; i < eles.length; i += 1) {
		var ele = eles[i];
		if(getAttributeValue(ele, "mysign") == "button") {
			ele.style.cursor = "pointer";
			ele.addEventListener("mousedown", function(event) {
				event.currentTarget.style.backgroundColor = "gray";
				event.currentTarget.style.opacity = 0.5;
			});
			ele.bColor = ele.style.backgroundColor;
			ele.addEventListener("mouseup", function(event, redColor) {
				event.currentTarget.style.backgroundColor = event.currentTarget.bColor;
				event.currentTarget.style.opacity = 1;
			});
		}

	}
}

//获取属性值
function getAttributeValue(ele, attribute) {
	var attributes = ele.attributes;

	var index;
	for(index = 0; index < attributes.length; index = index + 1) {

		if(attributes[index]["name"] == attribute) {
			return attributes[index].nodeValue;
		}

	}
	return null;

}

//获取superEle或其节点拥有sign属性的节点放到signEles中
function getMysignEle(superEle, signEles, sign) {

	if(getAttributeValue(superEle, sign) != null) {
		signEles.push(superEle);
		return;
	}
	for(var i = 0; i < superEle.children.length; i += 1) {

		getMysignEle(superEle.children[i], signEles, sign);
	}

}

/*帧数是会影响 动画时间的。因为有最小的执行时间，比如说1毫秒。
改进的的话可以根据变化大小和时间自动计算帧
* */
var HDframe_animation_zhen = 50.0;
/*每一次最少需要的运行时间*/
var HDframe_animation_minOnceTime = 0.01;

/*
    单位默认是px
 * */
function animation(ele, option, oldValue, newValue, time,handle) {
	if(time != null && time < HDframe_animation_minOnceTime){
		alert("不接受这么小的时间");
		return;
	}
	
	//20帧
	var zhen = time/HDframe_animation_minOnceTime;
	
	if(time == null) {
		animationHandle(ele, option, oldValue, (newValue - oldValue) / zhen, 0, 1.0-0.06,handle,zhen);
	} else {
		animationHandle(ele, option, oldValue, (newValue - oldValue) / zhen, 0, time - 0.06,handle,zhen);
	}

}

function animationHandle(ele, option, oldValue, changeValue, start, time,handle,zhen) {
	// var args = new Array(ele,option,oldValue,changeValue,start,time);
        
	timer = window.setTimeout(function(ele, option, oldValue, changeValue, start, time,handle,zhen) {
    
		if(start >= zhen) {
			
			handle();
			return;
		}

		ele.style[option] = changeValue + oldValue + "px";

		animationHandle(ele, option, oldValue + changeValue, changeValue, start + 1, time,handle,zhen);

	}, time * 1000 / zhen, ele, option, oldValue, changeValue, start, time,handle,zhen);

}

function special_animation(ele, option, valueSign, oldValue, newValue, time) {
	//20帧
	if(time == null) {
		special_animationHandle(ele, option, valueSign, oldValue, (newValue - oldValue) / HDframe_animation_zhen, 0, 1.0);
	} else {
		special_animationHandle(ele, option, valueSign, oldValue, (newValue - oldValue) / HDframe_animation_zhen, 0, time);
	}

}

function special_animationHandle(ele, option, valueSign, oldValue, changeValue, start, time) {
	// var args = new Array(ele,option,oldValue,changeValue,start,time);

	timer = window.setTimeout(function(ele, option, valueSign, oldValue, changeValue, start, time) {

		if(start >= HDframe_animation_zhen) {
			return;
		}
		if(option.endWith("Transform") || option.endWith("transform")) {
			if(valueSign == "scale") {
				var nowValue = oldValue + changeValue;

				ele.style[option] = "scale(" + nowValue + "," + nowValue + ")"
			}
		}

		special_animationHandle(ele, option, valueSign, oldValue + changeValue, changeValue, start + 1, time);

	}, time * 1000 / HDframe_animation_zhen, ele, option, valueSign, oldValue, changeValue, start, time);

}

/*
    不是样式且带单位的
 * */
function animation_WithUnit(ele, option, unit, oldValue, newValue, time) {
	//20帧
	if(time == null) {
		animationHandle_WithUnit(ele, option, unit, oldValue, (newValue - oldValue) / HDframe_animation_zhen, 0, 1.0);
	} else {
		animationHandle_WithUnit(ele, option, unit, oldValue, (newValue - oldValue) / HDframe_animation_zhen, 0, time);
	}

}

function animationHandle_WithUnit(ele, option, unit, oldValue, changeValue, start, time) {
	// var args = new Array(ele,option,oldValue,changeValue,start,time);

	timer = window.setTimeout(function(ele, option, unit, oldValue, changeValue, start, time) {

		if(start >= HDframe_animation_zhen) {
			return;
		}
		if(unit == null) {
			ele[option] = changeValue + oldValue;
		} else {
			ele[option] = changeValue + oldValue + unit;
		}

		animationHandle_WithUnit(ele, option, unit, oldValue + changeValue, changeValue, start + 1, time);

	}, time * 1000 / HDframe_animation_zhen, ele, option, unit, oldValue, changeValue, start, time);

}