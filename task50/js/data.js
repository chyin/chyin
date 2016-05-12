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
	nowD = clone(nowQ);
	for (var i = nowQ.length - 1; i > 0; i--) {
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
				if (nowD[i].required) {
					nowD[i].answer[0] = 100;
				}else{
					nowD[i].answer[0] = Math.floor(Math.random()*100);
				}
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
			temphtml = "<div class='questionDetail'><div><span>Q"+ i +"</span><span class='spaceBoth'>"+ nowQ[i].title + ((nowQ[i].type==='abc' && nowQ[i].required)?("（此题必填）"):'') +"</span></div>";
			if(nowQ[i].type === "one"){
				temphtml += "<div id='questionDetail"+ i +"'><table id='chartData"+ i +"' class='chartData' width='300px'>";
				for (var j = 0 ; j < nowD[i].content.length ; j++) {
					temphtml += "<tr style='color:"+ color[j%color.length] +"'><td class='answerNum' width='10px'>A"+ j +"</td><td>"+ nowD[i].content[j] +"</td><td>"+ nowD[i].answer[j] +"</td></tr>";
				}
				temphtml += "</table>	<canvas id='chart"+ i +"' width='600px' height='500px' class='chart'></canvas></div>"
	
			}else{
				if(nowQ[i].type === "more"){
					temphtml += "<div id='questionDetail"+ i +"'><table id='chartData"+ i +"' class='chartData' width='100%'>";
					for (var j = 0 ; j < nowD[i].content.length ; j++) {
						temphtml += "<tr style='color:"+ color[j%color.length] +"'><td class='answerNum' width='10px'>A"+ j +"</td><td width='200px'>"+ nowD[i].content[j] +"</td><td width='60px'>"+ nowD[i].answer[j] +"</td><td><div class='chartBgSpan' width='100%'><div class='chartBgSpan' id='mq"+i+"a"+j+"'></div></div></td></tr>";
					}
					temphtml += "</table></div>"
				}else{
					if(nowQ[i].type === "abc"){
						temphtml += "<div id='questionDetail"+ i +"'><table id='chartData"+ i +"' class='chartData' width='100%'>";
						temphtml += "<tr style='color:#ed5713'><td class='answerNum' width='150px'>本题有效回答为</td><td width='145px'>"+ nowD[i].answer[0] +"</td><td><div class='chartBgSpan' width='100%'><div class='chartBgSpan' id='aq"+i+"'></div></div></td></tr>";
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
		}else{
			if (nowD[i].type==="more") {
				var moreTotal = 0;
				for (var j = nowD[i].answer.length - 1; j >= 0; j--) {
					moreTotal += nowD[i].answer[j];
				}
				for (var j = nowD[i].answer.length - 1; j >= 0; j--) {
					var mqaj = document.getElementById('mq'+i+'a'+j);
					mqaj.style.width = (nowD[i].answer[j]/moreTotal*100)+'%';
					mqaj.style.backgroundColor = color[j%color.length];
					mqaj.style.border = "none";
					mqaj.style.borderRight = "2px solid #333";
				}
			}else{
				if (nowD[i].type==="abc") {
					var aqi = document.getElementById('aq'+i);
					aqi.style.width = nowD[i].answer[0]+'%';
					aqi.style.backgroundColor = "#ed5713";
					aqi.style.border = "none";
					aqi.style.borderRight = "2px solid #333";
				}else{
					console.log(nowD[i].type);
				}
			}
		}
	}
}



// 按钮

