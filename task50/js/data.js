console.log(nowQuestion);
// nowQuestion = 0;
if (nowQuestion===-1) {
	nowQ = qq1;
}else{
	if(nowQuestion>=0){
		nowQ = questionnaire[nowQuestion].question;
	}else{
		console.log(nowQuestion);
	}
	
}
showContent();
document.getElementById("returnButton").onclick = function(){
	$("#mbody").load("list.html");
}

function showContent() {
	document.getElementById("qTitle").innerHTML = nowQ[0].title;
	var questionArea = document.getElementById("question");
	if(nowQ.length === 1){
		questionArea.style.display = "none";
	}else{
		questionArea.style.display = "block";
		for (var i = 1; i < nowQ.length; i++) {
			var temphtml;
			temphtml = "<div class='questionDetail'><div>Q"+ i +"&nbsp&nbsp&nbsp&nbsp "+ nowQ[i].title +"</div>";
			if(nowQ[i].type === "one"){
				for(var j in nowQ[i].content){
					// temphtml += "<div class='questionOption'><input type='radio' name='"+ i +"'/>"+ nowQ[i].content[j] +"</div>";
					temphtml += "danxuan";
				}
			}else{
				if(nowQ[i].type === "more"){
					for(var j in nowQ[i].content){
						// temphtml += "<div class='questionOption'><input type='checkbox' name='"+ i +"'/>"+ nowQ[i].content[j] +"</div>";
						temphtml += "duoxuan";
					}
				}else{
					if(nowQ[i].type === "abc"){
						// temphtml += "<div class='questionOption'><textarea id='"+ i +" cols='100' rows='5'></textarea></div>";
						temphtml += "wenben";
					}else{
						console.log(nowQ[i].type);
					}
				}
			}
			temphtml += "</div>";
			questionArea.innerHTML += temphtml;
		}
	}
}
