if(questionnaire.length===0){
	console.log(1111);
	$("#mbody").load("new.html");
}
var list = document.getElementById("list");
tableAdd();
document.getElementById("newButton2").onclick = function(){
	$("#mbody").load("edit.html");
}

// 删除表格内容
function tableDelete(){
	for(var i=0;i<questionnaire.length;i++){
		list.deleteRow(1);
	}
}
// 添加内容
function tableAdd(){
	console.log(questionnaire[0].state);
	for(var i=0;i<questionnaire.length;i++){
		var tempdata = "";
		tempdata += "<td> <input type='checkbox' name=i/> </td>";
		tempdata += "<td>" + questionnaire[i].title + "</td>";
		tempdata += "<td>" + questionnaire[i].time + "</td>";
		if(questionnaire[i].state===0){
			tempdata += "<td> 未发布 </td>";
			tempdata += "<td> <button>编辑</button><button>删除</button><button>查看问卷</button> </td>";
		}else{
			var now = new Date();
			if(now-questionnaire[i].time>0){
				tempdata += "<td> 已发布 </td>";
			}else{
				tempdata += "<td> 已结束 </td>";
			}
			tempdata += "<td> <button>查看数据</button><button>查看问卷</button> </td>";
		}

		for(var j=0;j<questionnaire[i].length;j++){
			tempdata += "<td>" + questionnaire[i][j] + "</td>";
		}
		list.innerHTML += tempdata;
	}
	tempdata = "<td colspan='5' align='left'> <input type='checkbox' name=all/> 全选 <button>删除</button> </td>";
	list.innerHTML += tempdata;
	//console.log(questionnaire);
	//buttonReady();
}