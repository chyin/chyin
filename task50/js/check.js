// 测试 nowQuestion
if(nowQuestion>=0){
	nowQ = questionnaire[nowQuestion].question;
}else{
	console.log(nowQuestion);
}

var nowA = new Array();
nowA = clone(nowQ);
for (var i = nowA.length - 1; i > 0; i--) {
	nowA[i].answer = new Array(nowA[i].content.length);
}
showContent();
console.log(1);
if (questionnaire[nowQuestion].state===1 && questionnaire[nowQuestion].time>=new Date()) {
console.log(2);
	document.getElementById("restartAnswer").onclick = function(){
console.log(3);
		$("#mbody").load("check.html");
	}
	document.getElementById("submitAnswer").onclick = function(){
console.log(4);
		console.log(checkAll());
		if (checkAll()) {
			$("#mbody").load("list.html");
		}else{
			alert("请合理填写问卷！");
		}
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
					temphtml += "<div class='questionOption'><input type='radio' name='"+ i +"' id='q"+ i +"a"+ j +"'/><span class='spaceBoth'>"+ nowQ[i].content[j] +"</span></div>";
				}
			}else{
				if(nowQ[i].type === "more"){
					for(var j in nowQ[i].content){
						temphtml += "<div class='questionOption'><input type='checkbox' name='"+ i +"' id='q"+ i +"a"+ j +"'/><span class='spaceBoth'>"+ nowQ[i].content[j] +"</span></div>";
					}
				}else{
					if(nowQ[i].type === "abc"){
						temphtml += "<div class='questionOption'><textarea id='a"+ i +"' cols='100' rows='5'></textarea></div>";
					}else{
						console.log(nowQ[i].type);
					}
				}
			}
			temphtml += "</div>";
			questionArea.innerHTML += temphtml;
		}
		if (questionnaire[nowQuestion].state===1 && questionnaire[nowQuestion].time>=new Date()) {
			document.getElementById("saveButton").innerHTML = "<button id='restartAnswer' class='spaceBoth'>重置</button><button id='submitAnswer' class='spaceBoth'>提交问卷</button>";
		}else{
			document.getElementById("saveButton").innerHTML = "<button id='back'>返回</button>";
		}
	}
	inputAction();
}

// 收集每题答案
function inputAction() {
	// 每题选项
	var qa = new Array(nowA.length);
	for (var i = nowA.length - 1; i > 0; i--) {
		if (nowA[i].type==="abc") {
			qa[i] = document.getElementById("a"+i);
			qa[i].i = i;
			qa[i].onchange = function(){
				nowA[this.i].content = this.value;
			}
		}else{
			qa[i] = [];
			if (nowA[i].type==="more") {
				for (var j = nowA[i].content.length - 1; j >= 0; j--) {
					console.log("q"+i+"a"+j);
					qa[i][j] = document.getElementById("q"+i+"a"+j);
					qa[i][j].i = i;
					qa[i][j].j = j;
					qa[i][j].onchange = function() {
						nowA[this.i].answer[this.j] = this.checked?1:0;
						console.log(nowA[this.i].answer[this.j]);
					}
				}
			}else{
				for (var j = nowA[i].content.length - 1; j >= 0; j--) {
					console.log("q"+i+"a"+j);
					qa[i][j] = document.getElementById("q"+i+"a"+j);
					qa[i][j].i = i;
					qa[i][j].j = j;
					qa[i][j].onchange = function() {
						nowA[this.i].answer = this.j;
						console.log(nowA[this.i].answer);
					}
				}				
			}
		}
	}
}

// 检查是否全部填写
function checkAll() {
	var checkEvery = 0;
	var qa = new Array(nowA.length);
	for (var i = nowA.length - 1; i > 0; i--) {
		if (nowA[i].type==="abc") {
			checkEvery += 1;
			if (nowA[i].required) {
				var tempcontent = nowA[i].content;
				if (null != tempcontent && "" != tempcontent) {
				console.log(tempcontent);
					var spl = "\\s\\,\\.\\。\\，\\/\\、\\\\";
					var reSpace=new RegExp("^["+spl+"]*(.*?)["+spl+"]*$");
					var textem = tempcontent.replace(reSpace,"$1");
				console.log(textem);
					if (null === textem || "" === textem) {checkEvery -= 1;}
				}else{
					checkEvery -= 1;
				}
			}
		}else{
			if (nowA[i].type==="more") {
				var tempcount = 0;
				for (var j = nowA[i].content.length - 1; j >= 0; j--) {
					if (1===nowA[i].answer[j]) {
						tempcount += 1;
					}
				}
				if (tempcount > 0) {checkEvery += 1;}
			}else{
				if (null != nowA[i].answer) {checkEvery += 1;}
			}
		}
	}
	if (checkEvery===nowA.length-1) {
		return true;
	}else{
		return false;
	}
}