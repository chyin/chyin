// 测试 nowQuestion
if(nowQuestion>=0){
	nowQ = questionnaire[nowQuestion].question;
}else{
	console.log(nowQuestion);
}

showContent();
if (questionnaire[nowQuestion].state===1 && questionnaire[nowQuestion].time>=new Date()) {
	document.getElementById("restartAnswer").onclick = function(){
		$("#mbody").load("check.html");
	}
	document.getElementById("submitAnswer").onclick = function(){
		inputAction();
		$("#mbody").load("list.html");
	}
}else{
	document.getElementById("back").onclick = function(){
		$("#mbody").load("list.html");
	}
}

// 加载内容
function showContent() {
	document.getElementById("qTitle").innerHTML = nowQ[0].title;
	var questionArea = document.getElementById("question");
	if(nowQ.length === 1){
		questionArea.style.display = "none";
	}else{
		questionArea.style.display = "block";
		for (var i = 1; i < nowQ.length; i++) {
			var temphtml;
			temphtml = "<div class='questionDetail'><span>Q"+ i +"</span><span class='spaceBoth'>"+ nowQ[i].title +"</span>";
			if(nowQ[i].type === "one"){
				for(var j in nowQ[i].content){
					temphtml += "<div class='questionOption'><input type='radio' name='"+ i +" id='a"+ i +"q"+ j +"'/><span class='spaceBoth'>"+ nowQ[i].content[j] +"</span></div>";
				}
			}else{
				if(nowQ[i].type === "more"){
					for(var j in nowQ[i].content){
						temphtml += "<div class='questionOption'><input type='checkbox' name='"+ i +"' id='a"+ i +"q"+ j +"'/><span class='spaceBoth'>"+ nowQ[i].content[j] +"</span></div>";
					}
				}else{
					if(nowQ[i].type === "abc"){
						temphtml += "<div class='questionOption'><textarea id='a"+ i +" cols='100' rows='5'></textarea></div>";
					}else{
						console.log(nowQ[i].type);
					}
				}
			}
			temphtml += "</div>";
			questionArea.innerHTML += temphtml;
		}
		if (questionnaire[nowQuestion].state===1 && questionnaire[nowQuestion].time>=new Date()) {
			document.getElementById("saveButton").innerHTML = "<button id='restartAnswer spaceBoth'>重置</button><button id='submitAnswer spaceBoth'>提交问卷</button>";
		}else{
			document.getElementById("saveButton").innerHTML = "<button id='back'>返回</button>";
		}
	}
}

// 收集每题答案
function inputAction() {
	// 每题选项
	/*
	var qa = new Array(nowQ.length);
	for (var i = nowQ.length - 1; i > 0; i--) {
		qa[i] = [];
		for (var j = nowQ[i].content.length - 1; j >= 0; j--) {
			qa[i][j] = document.getElementById("q"+i+"a"+j);
			qa[i][j].i = i;
			qa[i][j].j = j;
			qa[i][j].onchange = function() {
				nowQ[this.i].content[this.j] = this.value;
				xx = this.value;
			}
		}
	}
	var qr = new Array(nowQ.length);
	for (var i = nowQ.length - 1; i >= 0; i--) {
		if (nowQ[i].type==="abc") {
			qr[i] = document.getElementById("required"+i);
			qr[i].i = i;
			qr[i].checked = nowQ[i].required;
			qr[i].onchange = function(){
				nowQ[this.i].required = this.checked;
			}
		}
	}*/
}