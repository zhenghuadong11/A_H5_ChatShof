




var HDFramePass = "";


HDFramePass_includeJS();



/*
 * 主要用来载入其他js 
 * js必须在同一个文件夹或者子文件夹
 * */
function HDFramePass_includeJS(){
	HDFrame_getHDFramePass();
    HDFrame_inlcue(HDFramePass + "/HDSave.js");
	HDFrame_inlcue(HDFramePass + "/jquery-3.1.1.min.js");
	HDFrame_inlcue(HDFramePass + "/HDAnimation.js");
	HDFrame_inlcue(HDFramePass + "/HDNet.js");
	HDFrame_inlcue(HDFramePass + "/HDNormalCore.js");
	
	HDFrame_inlcue(HDFramePass + "/HDTip.js");
}
function HDFrame_inlcue(jsUrl){

	 var ele = document.createElement("script");
	 ele.type = "application/javascript"
	 ele.src = jsUrl;
	 
	 var head=document.getElementsByTagName("head")[0];
     head.appendChild(ele);

}


function HDFrame_getHDFramePass() {

	HDFrame_getHDFramePassWithEle(document);
    
}


function HDFrame_getHDFramePassWithEle(ele) {

	if(ele.localName === "script") {
		var lastStr = "/HDFrame.js";
        if(ele.src != null && HDFrame_stringEnd(ele.src,lastStr)){
        	     HDFramePass = ele.src.substring(0,ele.src.length - lastStr.length);
        }
	}
//  if(ele.localName == 'style'){
//     ele.textContent = "";
//  	   console.log(ele);
//  }

	for(var index = 0; index < ele.children.length; index += 1) {
		HDFrame_getHDFramePassWithEle(ele.children[index]);
	}

}

function HDFrame_stringEnd(str,endStr){
	  var d=str.length-endStr.length;
      return (d>=0&&str.lastIndexOf(endStr)==d)
}
