/*
 *   这里是有关网络的
 * 
 * */

var hostUrl = "http://localhost:8080/mavenTest2";

function requestUrlWithPost(url, data, success, error) {
	
	$.ajax({
		type: 'post',
		url: hostUrl + url,
		crossDomain: true,
		cache: false,
		data: data,
		dataType: "json",
		success: success,
		error: error
	});
}

function requestUrlWithDelete(url1, data, success, error) {


	data._method = "delete";
	$.ajax({
		type: 'post',
		url: hostUrl + url1,
		crossDomain: true,
		cache: false,
		data: data,
		dataType: "json",
		success: success,
		error: error
	});
}

function requestUrlWithGet(url1, data, success, error) {
	
	var newUrl = hostUrl + url1;
	$.ajax({
		type: 'get',
		url: newUrl,
		crossDomain: true,
		cache: false,
		data: data,
		dataType: "json",
		success: success,
		error: error
	});
}

function requestUrlWithPut(url1, data, success, error) {
	
	$.ajax({
		type: 'put',
		url: hostUrl + url1,
		crossDomain: true,
		cache: false,
		data: data,
		dataType: "json",
		success: success,
		error: error
	});
}


/**
 * 
 */
  
function encrypt(word) {
	var key = CryptoJS.enc.Utf8.parse("yiyyangtong_2017");
	var iv = CryptoJS.enc.Utf8.parse('1382139203920399');
	var srcs = CryptoJS.enc.Utf8.parse(word);
	var encrypted = CryptoJS.AES.encrypt(srcs, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.ciphertext.toString().toUpperCase();
}

function decrypt(str) {
	var key = CryptoJS.enc.Utf8.parse("yiyyangtong_2017"); // 秘钥
	var iv = CryptoJS.enc.Utf8.parse('1382139203920399'); //向量iv
	var decrypted = CryptoJS.AES.decrypt(str, key, {
		iv: iv,
		padding: CryptoJS.pad.ZeroPadding
	});
	return decrypted.toString(CryptoJS.enc.Utf8);

}

/*
 *  下面一些处理请求的方法
 * */
function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}
/*
     ios-8859-1 to utf-8
 * */
function GetQueryString(name) {
	/*
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);

    if(r!=null)return  new String(r[2].getBytes("iso-8859-1"),"utf-8"); return null;
    */
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

	var result = window.location.search.substr(1).match(reg);

	return result ? decodeURIComponent(result[2]) : null;
}