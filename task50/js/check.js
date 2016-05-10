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
if (questionnaire[nowQuestion].state===1 && questionnaire[nowQuestion].time>=new Date()) {
	document.getElementById("restartAnswer").onclick = function(){
		$("#mbody").load("check.html");
	}
	document.getElementById("submitAnswer").onclick = function(){
		$("#mbody").load("list.html");
	}
}else{
	document.getElementById("back").onclick = function(){
		$("#mbody").load("list.html");
	}
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
					temphtml += "<div class='questionOption'><input type='radio' name='"+ i +"'/>&nbsp&nbsp"+ nowQ[i].content[j] +"</div>";
				}
			}else{
				if(nowQ[i].type === "more"){
					for(var j in nowQ[i].content){
						temphtml += "<div class='questionOption'><input type='checkbox' name='"+ i +"'/>&nbsp&nbsp"+ nowQ[i].content[j] +"</div>";
					}
				}else{
					if(nowQ[i].type === "abc"){
						temphtml += "<div class='questionOption'><textarea id='"+ i +" cols='100' rows='5'></textarea></div>";
					}else{
						console.log(nowQ[i].type);
					}
				}
			}
			temphtml += "</div>";
			questionArea.innerHTML += temphtml;
		}
		if (questionnaire[nowQuestion].state===1 && questionnaire[nowQuestion].time>=new Date()) {
			document.getElementById("saveButton").innerHTML = "<button id='restartAnswer'>重置</button>&nbsp&nbsp<button id='submitAnswer'>提交问卷</button>";
		}else{
			document.getElementById("saveButton").innerHTML = "<button id='back'>返回</button>";
		}
	}
}
