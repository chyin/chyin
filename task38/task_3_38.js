window.onload = function(){
	var score = new Array();
	var scoreth = ["姓名","语文","数学","英语","总分"];
	score[0] = ["小明",80,90,70,240];
	score[1] = ["小红",90,60,90,240];
	score[2] = ["小亮",60,100,70,230];
	var divTable = document.getElementById("divTable");

	tableAdd();
	//tableDelete();
	
	//添加新数据
	document.getElementById("confirm").onclick = function(){
		tableDelete();
		var name = document.getElementById("name").value;
		var chinese = parseInt(document.getElementById("chinese").value);
		var math = parseInt(document.getElementById("math").value);
		var english = parseInt(document.getElementById("english").value);
		var total = chinese + math + english;
		score[score.length] = [name,chinese,math,english,total];
		tableAdd();
	}
	// 清除所有数据
	document.getElementById("clear").onclick = function(){
		tableDelete();
		score.length = 0;
		tableAdd();
	}

	// 删除表格内容
	function tableDelete(){
		for(var i=0;i<score.length;i++){
			divTable.deleteRow(1);
		}
	}
	// 添加内容
	function tableAdd(){
		for(var i=0;i<score.length;i++){
			var tempdata = "";
			for(var j=0;j<score[i].length;j++){
				tempdata += "<td>" + score[i][j] + "</td>";
			}
			divTable.innerHTML += tempdata;
		}
		//console.log(score);
		buttonReady();
	}
	// 排序
	function changeOrder(up,num){
		if(up){
			for(var i=0;i<score.length;i++){
				console.log(parseInt(score[i][num]));
				for(var j=i+1;j<score.length;j++){
					if(score[i][num]>score[j][num]){
						var temp = score[i];
						score[i] = score[j];
						score[j] = temp;
					}
				}
			}
		}
		else{
			for(var i=0;i<score.length;i++){
				for(var j=i+1;j<score.length;j++){
					if(score[i][num]<score[j][num]){
						var temp = score[i];
						score[i] = score[j];
						score[j] = temp;
					}
				}
			}
		}
		tableDelete();
		tableAdd();
	}
	// 添加排序按钮功能
	function buttonReady(){
		// Chinese
		var cu = document.getElementById("chineseUp");
		cu.onclick = function(){
			changeOrder(true,1);
		}
		cu.onmouseover = function(){
			this.style.cursor = "pointer";
		}
		cu.onmouseut = function(){
			this.style.cursor = "default";
		}
		var cd = document.getElementById("chineseDown");
		cd.onclick = function(){
			changeOrder(false,1);
		}
		cd.onmouseover = function(){
			this.style.cursor = "pointer";
		}
		cd.onmouseut = function(){
			this.style.cursor = "default";
		}
		// Math
		var mu = document.getElementById("mathUp");
		mu.onclick = function(){
			changeOrder(true,2);
		}
		mu.onmouseover = function(){
			this.style.cursor = "pointer";
		}
		mu.onmouseut = function(){
			this.style.cursor = "default";
		}
		var md = document.getElementById("mathDown");
		md.onclick = function(){
			changeOrder(false,2);
		}
		md.onmouseover = function(){
			this.style.cursor = "pointer";
		}
		md.onmouseut = function(){
			this.style.cursor = "default";
		}
		// English
		var eu = document.getElementById("englishUp");
		eu.onclick = function(){
			changeOrder(true,3);
		}
		eu.onmouseover = function(){
			this.style.cursor = "pointer";
		}
		eu.onmouseut = function(){
			this.style.cursor = "default";
		}
		var ed = document.getElementById("englishDown");
		ed.onclick = function(){
			changeOrder(false,3);
		}
		ed.onmouseover = function(){
			this.style.cursor = "pointer";
		}
		ed.onmouseut = function(){
			this.style.cursor = "default";
		}
		// Total
		var tu = document.getElementById("totalUp");
		tu.onclick = function(){
			changeOrder(true,4);
		}
		tu.onmouseover = function(){
			this.style.cursor = "pointer";
		}
		tu.onmouseut = function(){
			this.style.cursor = "default";
		}
		var td = document.getElementById("totalDown");
		td.onclick = function(){
			changeOrder(false,4);
		}
		td.onmouseover = function(){
			this.style.cursor = "pointer";
		}
		td.onmouseut = function(){
			this.style.cursor = "default";
		}
	}
}