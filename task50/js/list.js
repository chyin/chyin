/*
if(questionnaire.length===0){
	console.log(11111);
	$("#mbody").load("new.html");
}
*/
/*
var questionnaire = new Array();

q1 = [12];
questionnaire = [
	{title:"我的问卷",time:new Date(2016,6,8),state:"1",question:q1}
];
*/

var list = document.getElementById("list");
var allCount = 0;
tableAdd();

// 删除表格内容
function tableDelete(){
	for(var i=0;i<questionnaire.length;i++){
		list.deleteRow(1);
	}
}
// 添加内容
function tableAdd(){
	//console.log(questionnaire[0].state);
	for(var i=0;i<questionnaire.length;i++){
		var tempdata = "";
		tempdata += "<tr class='trShow'><td> <input type='checkbox' name=" + i + " id=" + i + "> </td>";
		questionnaire[i].check = 0;
		tempdata += "<td>" + questionnaire[i].title + "</td>";
		var iTime = getTimeDetail(questionnaire[i].time);
		tempdata += "<td>" + iTime.year + "-" + iTime.month + "-" + iTime.day + "</td>";
		if(questionnaire[i].state===0){
			tempdata += "<td class='underPress'> 未发布 </td>";
			tempdata += "<td> <button>编辑</button> <button>删除</button> <button>查看问卷</button> </td>";
		}else{
			var now = new Date();
			if(now-questionnaire[i].time<0){
				tempdata += "<td> 已发布 </td>";
			}else{
				tempdata += "<td> 已结束 </td>";
			}
			tempdata += "<td> <button>查看数据</button> <button>查看问卷</button> </td>";
		}

		list.innerHTML += tempdata + "</tr>";
	}
	tempdata = "<tr><td><input type='checkbox' name='all' id='all'/></td> <td colspan='4'>  <span class='deleteAll'>全选 <button>删除</button></span> </td></tr>";
	list.innerHTML += tempdata;
	tableShow();
	buttonReady();
}
// 添加样式
function tableShow() {
	// 更改背景颜色
	trShow = getClass('trShow');
	for (var i = trShow.length - 1; i >= 0; i--) {
		trShow[i].onmouseover = function(){
			this.style.background = '#FCF0E5';
		}
		trShow[i].onmouseout = function(){
			this.style.background = '#FFFFFF';
		}
	}
}
function buttonReady() {
	document.getElementById("newButton2").onclick = function(){
		$("#mbody").load("edit.html");
	}
	document.getElementById('all').onclick = function(){
		if(allCount===0){
			for (var i = questionnaire.length - 1; i >= 0; i--) {
				document.getElementById(i).checked = true;
				questionnaire[i].check = 1;
				allCount = 1;
			}
		}else{
			for (var i = questionnaire.length - 1; i >= 0; i--) {
				document.getElementById(i).checked = false;
				questionnaire[i].check = 0;
				allCount = 0;
			}
		}
	}
	for (var checkedQ = questionnaire.length - 1; checkedQ >= 0; checkedQ--) {
		document.getElementById(checkedQ).onclick = function(){
			console.log(checkedQ);
			questionnaire[checkedQ].check = 1 - questionnaire[checkedQ].check;
			totalCount();
		}
	}
}
function totalCount() {
	var tCount = 0;
	for (var i = questionnaire.length - 1; i >= 0; i--) {
		tCount += questionnaire[i];
	}
	if(tCount===questionnaire.length){
		document.getElementById('all').checked = true;
	}else{
		document.getElementById('all').checked = false;
	}
}

// 获取日期
function getTimeDetail(timeX) {
	var year = timeX.getFullYear();
	var month = timeX.getMonth() + 1;
	var day = timeX.getDate();
	console.log(year,month,day);
	return {year,month,day};
}
// getElementByClassName
function getClass(clsName,parent){
	var oParent = parent?document.getElementById(parent):document,
		eles = [];
		elements = oParent.getElementsByTagName('*');

	for(var i=0,l=elements.length;i<l;i++){
		classSplit = elements[i].className.split(new RegExp("\\s"));
		for(var j=0;j<classSplit.length;j++){
			if(classSplit[j]===clsName){
				eles.push(elements[i]);
			}
		}
	}
	return eles;
}