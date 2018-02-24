function loginClick(){
	var user = document.getElementsByClassName("input_item")[0].value;
	var password = document.getElementsByClassName("input_item")[1].value; 
	var name = document.getElementsByClassName("input_item")[2].value; 
	
	var params = {
		"user":user,
		"password":password,
		"name":name
	}
	
	requestUrlWithPostInLocation("/rigister",params,function(data){
		alert("恭喜注册了新账号");
	});
	
	
}


