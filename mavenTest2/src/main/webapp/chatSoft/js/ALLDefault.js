
	


var ALLDefaultPass = "";


ALLDefault_includeJS();



/*
 * 主要用来载入其他js 
 * js必须在同一个文件夹或者子文件夹
 * */
function ALLDefault_includeJS(){
	ALLDefault_getALLDefaultPass();
	ALLDefault_inlcue(ALLDefaultPass + "/HDLocation.js");
	ALLDefault_inlcue(ALLDefaultPass + "/HDFrame/HDFrame.js");
}
function ALLDefault_inlcue(jsUrl){
	 var ele = document.createElement("script");
	 ele.type = "application/javascript"
	 ele.src = jsUrl;
	 
	 var head=document.getElementsByTagName("head")[0];
     head.appendChild(ele);
}


function ALLDefault_getALLDefaultPass() {

	ALLDefault_getALLDefaultPassWithEle(document);
    
}


function ALLDefault_getALLDefaultPassWithEle(ele) {

	if(ele.localName === "script") {
		var lastStr = "/ALLDefault.js";
        if(ele.src != null && ALLDefault_stringEnd(ele.src,lastStr)){
 
        	     ALLDefaultPass = ele.src.substring(0,ele.src.length - lastStr.length);
        }
	}


	for(var index = 0; index < ele.children.length; index += 1) {
		ALLDefault_getALLDefaultPassWithEle(ele.children[index]);
	}

}

function ALLDefault_stringEnd(str,endStr){
	  var d=str.length-endStr.length;
      return (d>=0&&str.lastIndexOf(endStr)==d)
}


