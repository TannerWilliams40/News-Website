/*function password(event)
{
	
}
function password2(event)
{

}*/
function focusfield(x)
{
	x.style.backgroundColor = "LightYellow ";
}
function unfocus(x)
{
	x.style.backgroundColor = "white";
}
function validate() {
  	var password1 = $("#passwords").val();
  	var password2 = $("#passwordr").val();
 	if (password2 == ""){
    	$("#passwordr").css("borderColor", "transparent"); 
    }
    else if(password1 == password2) {
       	$("#passwordr").css("borderColor", "lightgreen");        
    }
    else{
 		$("#passwordr").css("borderColor", "red");
    }
    
}
$(document).ready(function(){
	$("#log").hide();
	$("#loginfields").hide();
	$("#signupfields").hide();
	$("#loginb").click(function(){
		$("#choose").fadeOut(150);
		$("#log").fadeIn(300);
		$("#loginfields").fadeIn(300);
	});
	$("#signupb").click(function(){
		$("#choose").fadeOut(150);
		$("#log").fadeIn(300);
		$("#signupfields").fadeIn(300);
	});
	//$.get("http://localhost:8080/clearu/?", function(data, status){return});
	$("#exit").click(function(){
		$("#choose").fadeIn(300);
		$("#log").fadeOut(150);
		$("#loginfields").fadeOut(150);
		$('input[type=text]').each(function() {
        $(this).val('');
    	});
		$('input[type=password]').each(function() {
        $(this).val('');
    	});
	});
	$("#exit2").click(function(){
		$("#choose").fadeIn(300);
		$("#log").fadeOut(150);
		$("#signupfields").fadeOut(150);
		$('input[type=text]').each(function() {
        $(this).val('');
    	});
		$('input[type=password]').each(function() {
        $(this).val('');
    	});
    	$("#passwordr").css("borderColor", "transparent");
	});
	$("#passwordl").keyup(function(event) {
    	if (event.keyCode === 13) {
        	$("#submit").click();
    	}
	});
	$("#submit").click(function(){
		var a = false;
		var email = document.getElementById("usernamel").value;
		var pass = document.getElementById("passwordl").value;
		url = "http://localhost:8080/login/?";
		url += "uname=" + email;
		url += "&pass=" + pass;
		if (email && pass){
			for (x = 0; x < email.length; x++) {		
				if (email[x] === '@')
					a = true;
				}
				if (!a)
					alert("Invalid email");
				else
				{
					$.get(url, function(data, status){
					});
					if (data == "Successfully logged in.") {
						alert("test");
						window.location.href = "main.html";}
					else
						alert(data);
				}
		}
		else
			alert("Can't have empty fields");
	});
	$("#passwordr").keyup(function(event) {
    	if (event.keyCode === 13) {
        	$("#submit2").click();
    	}
	});
	$("#submit2").click(function(){
		var a = false;
		var email = document.getElementById("usernames").value;
		var pass = document.getElementById("passwords").value;
		var passr = document.getElementById("passwordr").value;
		url = "http://localhost:8080/create/?";
		url += "uname=" + email;
		url += "&pass=" + pass;
		if (email && pass && passr){
			for (x = 0; x < email.length; x++) {		
				if (email[x] === '@')
					a = true;
				}
				if (!a)
					alert("Invalid email");
				else if (pass != passr)
					alert("Passwords must match");
				else
				{
					$.get(url, function(data, status){
					if (data == "Account successfully created."){
						window.location.href = "main.html";}
					else
						alert(data);
					});
				}
		}
		else
			alert("Can't have empty fields")
	});
  	$("#passwordr").keyup(validate);
	$("#passwords").keyup(validate);
});
