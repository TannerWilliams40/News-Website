var trigger = document.getElementById("exit").value;
	exit.onclick = function() {
    modal.style.display = "block";
}
function focusfield(x)
{
	x.style.backgroundColor = "LightYellow ";
}
function unfocus(x)
{
	x.style.backgroundColor = "white";
}
$(document).ready(function(){
	$("#confirm").hide();
	$("#popup").hide();

	$.get("http://localhost:8080/getcurrentuser/?", function(data, status){
				document.getElementById("loggedinas").innerHTML = data;
			});
	//$.get("http://localhost:8080/clear/?", function(data, status){return});
	$.get("http://localhost:8080/populate/?" + "t=" + "Rex Tillerson Shoots Mike Pompeo Quick Email Explaining All The Countries" + "&s=" + "WASHINGTON—Jotting down a few thoughts in order to help his replacement hit the ground running, departing Secretary of State Rex Tillerson reportedly shot Mike Pompeo a quick email Tuesday to help get him up to speed on all the countries. “Hey Mike, just wanted to give you a brief rundown on the nations of the Earth before I head out,” read Tillerson’s email, which then proceeded to list, in no particular order, the 206 countries of the world, along with brief, often one-word descriptions for each. “Mexico: Spanish-speaking nation on southern border that doesn’t like walls; Australia: big island with kangaroos and no guns; China: communists, trading partner, we owe them lots of money; Nigeria: hot; Saudi Arabia: fantastic; South Korea: ???” Sources confirmed Tillerson concluded his email by saying there was no need to stress out about remembering everything on the list, as he hadn’t found it necessary to know all that much about the countries and Pompeo probably wouldn’t either." + "&d=" + "2018-3-08" + "&a=" + "Admin", function(data, status){
				document.getElementById("t1").innerHTML = data.title;
				document.getElementById("s1").innerHTML = data.story;
				document.getElementById("d1").innerHTML = data.date;
				document.getElementById("a1").innerHTML = "Submitted by: " + data.submitted_by;
			});
	$.get("http://localhost:8080/populate/?" + "t=" + "Gina Haspel Recalls Having To Torture More Prisoners Than Male Colleagues To Prove Herself" + "&s=" + "WASHINGTON—Acknowledging the gender discrimination she faced in her field before receiving President Trump’s nomination to become the first female director of the CIA, career intelligence officer Gina Haspel recalled Tuesday having to torture many more prisoners than her male colleagues to prove herself. “For a long time, no one would take me seriously even though I was abusing twice as many detainees and employing far crueler methods than most of the men I worked with,” said Haspel, the current CIA deputy director, adding that her work overseeing the “Cat’s Eye” secret prison in Thailand in the early 2000s proved she could run an extralegal black site just as well as any man. “It was really frustrating how I’d have to continually come up with more innovative and brutal ways to torture high-value assets just to receive the slightest bit of recognition from my superiors, whereas the men who held the same position as me could just coast by on the same old sensory-deprivation techniques. I mean, I had to waterboard one suspected al-Qaeda member 83 times in a single month until he lost an eye—you think any of my male coworkers had to work that hard to get ahead? When you’re a woman, they never fully appreciate the things you do for them. It doesn’t matter how many videotapes of illegal torture you help destroy on the CIA’s behalf.” Haspel added that she hoped her promotion would help usher in a new age where there were more women like her in power." + "&d=" + "2018-3-01" + "&a=" + "Admin", function(data, status){
				document.getElementById("t2").innerHTML = data.title;
				document.getElementById("s2").innerHTML = data.story;
				document.getElementById("d2").innerHTML = data.date;
				document.getElementById("a2").innerHTML = "Submitted by: " + data.submitted_by;
			});
	$.get("http://localhost:8080/populate/?" + "t=" + "Betsy DeVos Argues Issue Of Guns In Schools Should Be Fully Left Up To Individual Shooters" + "&s=" + "WASHINGTON—Explaining that there was no one-size-fits-all solution to the problem, Secretary of Education Betsy DeVos reportedly argued Monday that the issue of guns in schools should be fully left up to the individual shooters. “It’s not the role of the federal government to step in and dictate whether firearms in the classroom are the right choice for any one specific shooter,” said DeVos, who told reporters that every shooter is different and that it should be in their hands to decide how much training they need and what sort of weapon they should carry. “It makes sense that a shooter in rural Iowa is going to require a different setup than a shooter in the middle of Atlanta. Instead of trying to solve this with an overly broad and ineffective mandate, we need to be making decisions on a shooter-by-shooter basis.” DeVos added that she believes strongly in this policy, as it has already proven successful with shooters across the country." + "&d=" + "2018-2-10" + "&a=" + "Admin", function(data, status){
				document.getElementById("t3").innerHTML = data.title;
				document.getElementById("s3").innerHTML = data.story;
				document.getElementById("d3").innerHTML = data.date;
				document.getElementById("a3").innerHTML = "Submitted by: " + data.submitted_by;
			$.get("http://localhost:8080/grab/?",function(data,status){
				if (data != "Empty"){
					$( "#addedstories" ).append( "<div class = 't'>" + data.title + "</div>" + "<div class ='s'>" + data.story + "</div>" + "<br>" + "<div class ='d'>" + data.date + "</div>" + "<div class ='a'> Submitted by: " + data.submitted_by + "</div>" );
				}
			});
		});
	$("#sub").click(function(){
		var title = document.getElementById("addtitle").value;
		var words = document.getElementById("addwords").value;
		url = "http://localhost:8080/add/?";
		url += "title=" + title;
		url += "&words=" + words;
		if(title!='' && words!=''){
			$.get(url, function(data, status){
			$( "#addedstories" ).append( "<div class = 't'>" + data.title + "</div>" + "<div class ='s'>" + data.story + "</div>" + "<br>" + "<div class ='d'>" + data.date + "</div>" + "<div class ='a'> Submitted by: " + data.submitted_by + "</div>" );
			});
			$(".form-control").each(function() {
       		$(this).val('');
    		});
		}
		else
			alert("Can't have empty fields");
	});
	$("#exit").click(function(){
		$("#confirm").show();
		$("#popup").show();
		$("#inner").css("filter","blur(2px)")
	});
	$("#yes").click(function(){
		$("#confirm").hide();
		$("#popup").hide();
		$("#inner").css("filter","blur(0px)")
		window.location.href = "login.html";
	});
	$("#no").click(function(){
		$("#confirm").hide();
		$("#popup").hide();
		$("#inner").css("filter","blur(0px)")
	});
});