console.log(nowQuestion);
if (nowQuestion===-1) {
	nowQ = qq1;
}else{
	if(nowQuestion>=0){
		nowQ = questionnaire[nowQuestion].question;
	}else{
		console.log(nowQuestion);
	}
}

//console.log(nowQ);
showContent();

document.getElementById("saveQuestion").onclick = function(){
	if(saveAll(0)){
		$("#mbody").load("list.html");
	}
}
document.getElementById("submitQuestion").onclick = function(){
	if(saveAll(1)){
		$("#mbody").load("list.html");
	}
}

function showContent() {
	//console.log(nowQ);
	document.getElementById("questionType").style.display = "none";
	document.getElementById("inputTitle").value = nowQ[0].title;
	var questionArea = document.getElementById("question");
	questionArea.innerHTML = "";
	if(nowQ.length === 1){
		questionArea.style.display = "none";
	}else{
		questionArea.style.display = "block";
		for (var i = 1; i < nowQ.length; i++) {
			var temphtml;
			temphtml = "<div class='questionDetail question"+ i +"'><div class='questionTitle'>Q"+ i +"&nbsp&nbsp <input type='text' id='q"+ i +"' class='question"+ i +"' value='"+ nowQ[i].title +"'/></div>";
			if(nowQ[i].type === "one"){
				for(var j=0; j<nowQ[i].content.length; j++){
					temphtml += "<div class='questionOption'><span class='questionAnswerDelete' id='deleteq"+i+"a"+j+"'>×</span><input type='radio' name='"+ i +"'/>&nbsp&nbsp<input type='text' id='q"+ i +"a"+ j +"' class='inputLength question"+ i +"' value='"+ nowQ[i].content[j] +"'/></div>";
				}
				temphtml += "<div class='questionUp'><span id='nOption"+ i +"'>新增选项&nbsp&nbsp</span><span id='oFirst"+ i +"'>首字排序&nbsp&nbsp</span></div>";
			}else{
				if(nowQ[i].type === "more"){
					for(var j=0; j<nowQ[i].content.length; j++){
						temphtml += "<div class='questionOption'><span class='questionAnswerDelete' id='deleteq"+i+"a"+j+"'>×</span><input type='checkbox' name='"+ i +"'/>&nbsp&nbsp<input type='text' id='q"+ i +"a"+ j +"' class='inputLength question"+ i +"' value='"+ nowQ[i].content[j] +"'/></div>";
					}
					temphtml += "<div class='questionUp'><span id='nOption"+ i +"'>新增选项&nbsp&nbsp</span><span id='oFirst"+ i +"'>首字排序&nbsp&nbsp</span></div>";
				}else{
					if(nowQ[i].type === "abc"){
						temphtml += "<div class='questionOption'><textarea  id='q"+ i +"a' cols='100' rows='5'></textarea></div>";
						console.log(nowQ[i].required);
						temphtml += "<div class='questionUpRe'><span><input type='checkbox' checked="+ nowQ[i].required +" name='required"+ i +"' id='required"+ i +"'/>&nbsp&nbsp此题是否必填</span></div>";
					}else{
						console.log(nowQ[i].type);
					}
				}
			}
			temphtml += "<div class='questionDown'><span id='up"+ i +"'>上移&nbsp&nbsp</span><span id='down"+ i +"'>下移&nbsp&nbsp</span><span id='copy"+ i +"'>复用&nbsp&nbsp</span><span id='delete"+ i +"'>删除&nbsp&nbsp</span></div>"
			temphtml += "</div>";
			questionArea.innerHTML += temphtml;
		}
	}
	inputAction();
	styleContent();
}
// input change
function inputAction() {
	//console.log("inputAction");
	document.getElementById("inputTitle").onchange = function(){
		nowQ[0].title = this.value;
	}
	// 每题题目
	var qu = new Array(nowQ.length);
	for (var i = nowQ.length - 1; i > 0; i--) {
		qu[i] = document.getElementById("q"+i);
		qu[i].i = i;
		qu[i].onchange = function() {
			nowQ[this.i].title = this.value;
			xx = this.value;
		}
	}
	// 每题选项
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
	}
}
// 加样式和事件
function styleContent() {
	var questionI = new Array();
	for (var i = 1 ; i < nowQ.length; i++) {
		//console.log("question"+i);
		questionI[i-1] = getClass("question"+i);
		for (var k = questionI[i-1].length - 1; k >= 0; k--) {
			//console.log(questionI[i-1][k]);
			questionI[i-1][k].i = i;
			questionI[i-1][k].onmouseover = function(){
				var thisI = this.i;
				for (var kk = questionI[thisI-1].length - 1; kk >= 0; kk--) {
					questionI[thisI-1][kk].style.backgroundColor = "#FDF1E6";
				}
				var questionUp = getClass("questionUp",questionI[thisI-1][0]);
				if(questionUp[0]){
					questionUp[0].style.display = "block";
					newOption(document.getElementById("nOption"+thisI),thisI);
					//orderLength(document.getElementById("oLength"+thisI),thisI);
					orderFirst(document.getElementById("oFirst"+thisI),thisI);
				}
				var questionDown = getClass("questionDown",questionI[thisI-1][0]);
				questionDown[0].style.display = "block";
				var questionAnswerDelete = getClass("questionAnswerDelete",questionI[thisI-1][0]);
				if (questionAnswerDelete[0]) {
					for (var i = questionAnswerDelete.length - 1; i >= 0; i--) {
						questionAnswerDelete[i].style.display = "block";
					}
				}
				if(thisI===1){
					document.getElementById("up"+thisI).style.display = "none";
				}else{
					moveUp(document.getElementById("up"+thisI),thisI);
				}
				if(thisI===questionI.length){
					document.getElementById("down"+thisI).style.display = "none";
				}else{
					moveDown(document.getElementById("down"+thisI),thisI);
				}
				copyIt(document.getElementById("copy"+thisI),thisI);
				deleteIt(document.getElementById("delete"+thisI),thisI);
			}
			questionI[i-1][k].onmouseout = function(){
				var thisI = this.i;
				for (var kk = questionI[thisI-1].length - 1; kk >= 0; kk--) {
					questionI[thisI-1][kk].style.backgroundColor = "#FFFFFF";
				}
				var questionUp = getClass("questionUp",questionI[thisI-1][0]);
				if(questionUp[0]){
					questionUp[0].style.display = "none";
				}
				var questionDown = getClass("questionDown",questionI[thisI-1][0]);
				questionDown[0].style.display = "none";
				var questionAnswerDelete = getClass("questionAnswerDelete",questionI[thisI-1][0]);
				if (questionAnswerDelete[0]) {
					for (var i = questionAnswerDelete.length - 1; i >= 0; i--) {
						questionAnswerDelete[i].style.display = "none";
					}
				}
			}
		}
	}
	var questionAdd = document.getElementById("questionAdd");
	questionAdd.onclick = function() {
		document.getElementById("questionType").style.display = "block";
	}
	overOut(questionAdd);
	var oneChoose = document.getElementById("oneChoose");
	var moreChoose = document.getElementById("moreChoose");
	var textWrite = document.getElementById("textWrite");
	oneChoose.onclick = function() {
		addQuestion("one");
	}
	overOut(oneChoose);
	moreChoose.onclick = function() {
		addQuestion("more");
	}
	overOut(moreChoose);
	textWrite.onclick = function() {
		addQuestion("abc");
	}
	overOut("textWrite");
}

// 右侧按键事件
// 上移
function moveUp(obj,up) {
	obj.onclick = function(){
		var tempUp = nowQ[up];
		nowQ[up] = nowQ[up-1];
		nowQ[up-1] = tempUp;
		showContent();
	}
	overOut(obj);
}
// 下移
function moveDown(obj,down) {
	obj.onclick = function(){
		var tempDown = nowQ[down];
		nowQ[down] = nowQ[down+1];
		nowQ[down+1] = tempDown;
		showContent();
	}
	overOut(obj);
}
// 复制
function copyIt(obj,it) {
	obj.onclick = function(){
		if(nowQ.length<=10){
			for (var i = nowQ.length-1; i >= it; i--) {
				nowQ[i+1] = nowQ[i];
			}
		}else{
			alert("问卷的题目总数应不超过10！");
		}
		showContent();
	}
	overOut(obj);
}
// 删除
function deleteIt(obj,it) {
	obj.onclick = function(){
		for (var i = it; i < nowQ.length-1; i++) {
			nowQ[i] = nowQ[i+1];
		}
		nowQ.length -= 1;
		showContent();
	}
	overOut(obj);
}
// 增加选项
function newOption(obj,option) {
	obj.onclick = function(){
		var tempLength = nowQ[option].content.length;
		nowQ[option].content[tempLength] = "这是新选项";
		showContent();
	}
	overOut(obj);
}
// 根据首字排序
function orderFirst(obj,oFirst) {
	obj.onclick = function(){
		var tempOption = nowQ[oFirst].content;
		if(tempOption.length>1){
			nowQ[oFirst].content = changeOrderFirst(tempOption[0]<tempOption[1],tempOption);
			showContent();
		}
	}
	overOut(obj);
}
function changeOrderFirst(maybe,tempX){
	for(var i=0;i<tempX.length;i++){
		for(var j=i+1;j<tempX.length;j++){
			if(tempX[i]>tempX[j]){
				var temp = tempX[i];
				tempX[i] = maybe?tempX[i]:tempX[j];
				tempX[j] = maybe?tempX[j]:temp;
			}else{
				var temp = tempX[j];
				tempX[j] = maybe?tempX[i]:tempX[j];
				tempX[i] = maybe?temp:tempX[i];
			}
		}
	}
	return tempX;
}
/*
// 根据长度排序
function orderLength(obj,oLength) {
	obj.onclick = function(){
		var tempOption = nowQ[oLength].content;
		if(tempOption.length>1){
			nowQ[oLength].content = changeOrderLength(tempOption[0].length>tempOption[1].length,tempOption);
			showContent();
		}
	}
	overOut(obj);
}
function changeOrderLength(maybe,tempX){
	console.log(maybe);
	for(var i=0;i<tempX.length;i++){
		for(var j=i+1;j<tempX.length;j++){
			if(tempX[i].length>tempX[j].length){
				var temp = tempX[i];
				tempX[i] = maybe?tempX[i]:tempX[j];
				tempX[j] = maybe?tempX[j]:temp;
			}else{
				var temp = tempX[j];
				tempX[j] = maybe?tempX[i]:tempX[j];
				tempX[i] = maybe?temp:tempX[i];
			}
		}
	}
	return tempX;
}
*/
// 鼠标移入移出
function overOut(obj){
	obj.onmouseover = function(){
		this.style.cursor = "pointer";
	}
	obj.onmouseout = function(){
		this.style.cursor = "default";
	}
}
// 添加问题
function addQuestion(qType) {
	if(nowQ.length<=10){
		switch(qType){
			case "one" : var qTitle = "单选题", qContent = ["选项一","选项二","选项三","选项四"]; break;
			case "more": var qTitle = "多选题", qContent = ["选项一","选项二","选项三","选项四"]; break;
			case "abc" : var qTitle = "文本题", qContent = [], qRequired = false; break;
			default : console.log(qTitle);
		}
		nowQ[nowQ.length] = {
			type: qType,
			title: qTitle,
			content: qContent
		};
		if(qType==="abc"){
			nowQ[nowQ.length-1].required = qRequired;
		}
		showContent();
	}else{
		alert("问卷的题目总数应不超过10！");
	}
}

// 保存与提交
function saveAll(ss) {
	if(nowQ.length>1){
		if (nowQuestion===-1) {
			qq = questionnaire.length;
		}else{
			qq = nowQuestion;
		}
		questionnaire[qq] = {
			title: nowQ[0].title,
			time:new Date(),
			state:ss,
			question:nowQ,
			data:[]
		};
		return true;
	}else{
		alert("问卷的题目总数应不小于1！");
		return false;
	}
}