// 测试nowQuestion
if(nowQuestion>=0){
	nowQ = questionnaire[nowQuestion].question;
}else{
	console.log(nowQuestion);
}

var nowD = new Array(nowQ.length);
var color = ["#0DA068","#194E9C","#ED9C13","#ED5713","#057249","#5F91DC","#F88E5D"];

getDate();

showContent();
document.getElementById("returnButton").onclick = function(){
	$("#mbody").load("list.html");
}

// 产生随机数据
function getDate() {
	nowD[0] = nowQ[0];
	for (var i = nowQ.length - 1; i > 0; i--) {
		nowD[i] = nowQ[i];
		nowD[i].answer = [];
		switch(nowD[i].type){
			case "one"  : 
				var temptotal = 100;
				for (var j = nowQ[i].content.length - 1; j > 0; j--) {
					nowD[i].answer[j] = Math.floor(Math.random()*temptotal);
					temptotal -= nowD[i].answer[j];
				}
				nowD[i].answer[0] = temptotal;
				break;
			case "more" :
				for (var j = nowQ[i].content.length - 1; j >= 0; j--) {
					nowD[i].answer[j] = Math.floor(Math.random()*100);
				}
				break;
			case "abc"  :
				nowD[i].answer[0] = Math.floor(Math.random()*100);
				break;
			default : console.log(nowD[i].type);
		}
	}
}

function showContent() {
	document.getElementById("qTitle").innerHTML = nowQ[0].title;
	var questionArea = document.getElementById("question");
	if(nowQ.length === 1){
		questionArea.style.display = "none";
	}else{
		questionArea.style.display = "block";
		for (var i = 1; i < nowQ.length; i++) {
			var temphtml;
			temphtml = "<div class='questionDetail'><div><span>Q"+ i +"</span><span class='spaceBoth'>"+ nowQ[i].title +"</span></div>";
			if(nowQ[i].type === "one"){
				temphtml += "<div id='questionDetail"+ i +"'><table id='chartData"+ i +"' class='chartData'>";
				for (var j = 0 ; j < nowD[i].content.length ; j++) {
					temphtml += "<tr style='color:"+ color[j%color.length] +"'><td class='answerNum' width='10px'>A"+ j +"</td><td>"+ nowD[i].content[j] +"</td><td>"+ nowD[i].answer[j] +"</td></tr>";
				}
				temphtml += "</table>	<canvas id='chart"+ i +"' width='600' height='500' class='chart'></canvas></div>"
	
			}else{
				if(nowQ[i].type === "more"){
					temphtml += "<div id='questionDetail"+ i +"'><table id='chartData"+ i +"' class='chartData'>";
					for (var j = 0 ; j < nowD[i].content.length ; j++) {
						temphtml += "<tr style='color:"+ color[j%color.length] +"'><td class='answerNum' width='10px'>A"+ j +"</td><td>"+ nowD[i].content[j] +"</td><td>"+ nowD[i].answer[j] +"</td></tr>";
					}
					temphtml += "</table></div>"
				}else{
					if(nowQ[i].type === "abc"){
						temphtml += "<div id='questionDetail"+ i +"'><table id='chartData"+ i +"' class='chartData'>";
						temphtml += "<tr style='color:"+ color[j%color.length] +"'><td class='answerNum' width='150px'>本题有效回答为</td><td>"+ nowD[i].answer[0] +"</td></tr>";
						temphtml += "</table></div>"
					}else{
						console.log(nowQ[i].type);
					}
				}
			}
			temphtml += "</div>";
			questionArea.innerHTML += temphtml;
		}
	}
	showChart();
}

function showChart() {
	for (var i = nowD.length - 1; i > 0; i--) {
		if (nowD[i].type==="one") {
			pieChart(i);
			document.getElementById("questionDetail"+i).style.height = "500px";//document.getElementById("chart"+i).style.offsetHeight;
			document.getElementById("questionDetail"+i).style.position = "relative";
		}
	}
}


// 画图

// 按钮

// 题目和选项的空格
