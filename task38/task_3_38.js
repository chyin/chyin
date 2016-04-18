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
		var buttonArray = ["chineseUp","chineseDown","mathUp","mathDown","englishUp","englishDown","totalUp","totalDown"];
		for(var i=0;i<buttonArray.length;i++){
			var bArray = buttonArray[i];
			var barr = [];
			barr[i] = document.getElementById(bArray);
			barr[i].upDown = false;
			barr[i].num = 0;
			//console.log(bArray.charAt(bArray.length-1));
			if(bArray.charAt(bArray.length-1)==="p"){
				barr[i].upDown = true;
			}
			//console.log(barr[i].upDown);
			switch(bArray.charAt(0)){
				case "c": barr[i].num = 1;break;
				case "m": barr[i].num = 2;break;
				case "e": barr[i].num = 3;break;
				case "t": barr[i].num = 4;break;
				default: alert("Wrong");
			}
			barr[i].onclick = function(){
				changeOrder(this.upDown,this.num);
			}
			barr[i].onmouseover = function(){
				this.style.cursor = "pointer";
				if(this.upDown){
					this.style.borderColor = "transparent transparent #aaaaaa transparent";
				}else{
					this.style.borderColor = "#aaaaaa transparent transparent transparent";
				}
			}
			barr[i].onmouseout = function(){
				this.style.cursor = "default";
				if(this.upDown){
					this.style.borderColor = "transparent transparent #ffffff transparent";
				}else{
					this.style.borderColor = "#ffffff transparent transparent transparent";
				}
			}
		}
	}

}