/*
 *     这里是解决缓存用的
 * */
var a = 0;
a = 0;
a = 0;
a = 0;
a = 0;
a = 0;
a = 0;
a = 0;

function save(key, value) {
	if(value == null || key == null) {
		return;
	}

	if(typeof(Storage) != "undefined") {

		localStorage.setItem(key, value);
		return true;
	} else {
		alert("浏览器不支持");
		return false;

	}
}

function getValue(key) {
	if(typeof(Storage) != "undefined") {
		if(localStorage.getItem(key) != "undefined") {
			return localStorage.getItem(key);
		}
	} else {
		alert("浏览器不支持");
	}
	return null;
}

function deleteValue(key) {
	if(typeof(Storage) != "undefined") {
		localStorage.removeItem(key);

	} else {
		alert("浏览器不支持");

	}
}