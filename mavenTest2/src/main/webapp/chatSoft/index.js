function loginClick(){
	var user = document.getElementsByClassName("input_item")[0].value;
	var password = document.getElementsByClassName("input_item")[1].value; 
	
	var params = {
		"user":user,
		"password":password
	}
	
	requestUrlWithPostInLocation("/login",params,function(data){
		save(chatSoft_toekn,data.token);
		save(chatSoft_name,data.name);
		save(chatSoft_user,data.user);
		save(chatSoft_LoginMessages,JSON.stringify(data.messages));
		//开启socket
	    HDL_startSocket(data.user,data.token);
		nextPageWithURL("main/main.html");
	});
	
	
}
function register(){
	nextPageWithURL("register/register.html");
//	self.location = "register/register.html";
}
