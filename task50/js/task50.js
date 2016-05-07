var questionnaire = new Array();

q1 = [12];
q2 = [123];
q3 = [1234];
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
	
	$("#mbody").load("list.html");
	//加载list或new
	choose();

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