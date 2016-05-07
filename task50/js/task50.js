window.onload = function(){
	var questionnaire = new Array();
	q1 = [12];
	questionnaire = [
		//{title:"我的问卷",time:new Date(),state:"1",question:q1}
	];
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
			$("#mbody").load("list.html");
		}
	}
}

/*
$(document).ready(function(){
	$("#mbody").load("list.html");
});
*/