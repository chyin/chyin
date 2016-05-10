var questionnaire = new Array();
var nowQuestion;
nowQuestion = 0;

qq1 = [{title:"请添加标题"}]
q1 = [{title:"调查问卷1"},{type:"one",title:"单选题",content:["选项一","选项二"]},{type:"more",title:"多选题",content:["选项一","选项二","选项三"]},{type:"abc",title:"文本题",required:false,content:[]},{type:"one",title:"单选题",content:["选项一","选项二"]},{type:"more",title:"多选题",content:["选项一","选项二","选项三"]},{type:"abc",title:"文本题",required:true,content:[]}];
q2 = [{title:"调查问卷2"},{type:"one",title:"单选题",content:["选项一","选项二"]},{type:"more",title:"多选题",content:["选项一","选项二","选项三"]},{type:"abc",title:"文本题",content:[]}];
q3 = [{title:"调查问卷3"},{type:"one",title:"单选题",content:["选项一","选项二"]},{type:"more",title:"多选题",content:["选项一","选项二","选项三"]},{type:"abc",title:"文本题",content:[]}];
d1 = [21];
d2 = null;
d3 = [4321];
questionnaire = [
	{title:"我的问卷1",time:new Date(2015,8,8),state:1,question:q1,data:d1},
	{title:"我的问卷2",time:new Date(2016,5,8),state:0,question:q2,data:d2},
	{title:"我的问卷3",time:new Date(2016,8,8),state:1,question:q3,data:d3}
];


window.onload = function(){
	//console.log(questionnaire);
	
	//链接事件
	var manage = document.getElementById("manage");
	manage.onclick = function(){
		choose();
	}
	manage.onmouseover = function(){
		manage.style.cursor = "pointer";  // hand 亦可
	}
	var myQuestion = document.getElementById("myQuestion");
	myQuestion.onclick = function(){
		choose();
	}
	myQuestion.onmouseover = function(){
		myQuestion.style.cursor = "pointer";  // hand 亦可
	}
	
	$("#mbody").load("check.html");
	//加载list或new
	//choose();

	function choose(){
		if(questionnaire.length === 0){
			$("#mbody").load("new.html");
		}else{
			if(questionnaire.length > 0){
				$("#mbody").load("list.html");
			}else{
				console.log("Something wrong with questionnaire!");
			}
		}
	}
}

/*
$(document).ready(function(){
	$("#mbody").load("list.html");
});
*/