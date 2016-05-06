var task = 50;
/* myQuestion = [
	{first:"1",second:"2"},
	{first:"11",second:"22",third:"33"}
];
console.log(myQuestion);*/
window.onload = function(){
	q1 = [12];
	questionnaire = [
		{title:"我的问卷",time:new Date(),state:"1",question:q1}
	];
	//console.log(questionnaire);
	if(questionnaire.length === 0){
		$("#mbody").load("new.html");
	}else{
		$("#mbody").load("list.html");
	}
}
/*
		$(document).ready(function(){
			$("#mbody").load("list.html");
		});*/