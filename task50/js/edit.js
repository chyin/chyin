console.log(nowQuestion);
if (nowQuestion===-1) {
	nowQ = qq1;
}else{
	if(nowQuestion>=0){
		nowQ = questionnaire[nowQuestion].question;
	}else{
		console.log(nowQuestion);
	}
	
}
console.log(nowQ);
showContent();
document.getElementById("saveQuestion").onclick = function(){
	$("#mbody").load("list.html");
}
document.getElementById("submitQuestion").onclick = function(){
	$("#mbody").load("list.html");
}

function showContent() {
	document.getElementById("inputTitle").value = nowQ[0].title;
	var questionArea = document.getElementById("question");
	if(nowQ.length === 1){
		questionArea.style.display = "none";
	}else{
		questionArea.style.display = "block";
		console.log(nowQ.length);
		for (var i = 1; i < nowQ.length; i++) {
			console.log(i);
			var temphtml;
			temphtml = "<div class='questionDetail'><div>Q"+ i +"&nbsp&nbsp&nbsp&nbsp <input type='text' value='"+ nowQ[i].title +"'/></div>";
			if(nowQ[i].type === "one"){
				for(var j in nowQ[i].content){
					console.log(j);
					temphtml += "<div class='questionOption'><input type='radio' name='"+ i +"'/><input type='text' value='"+ nowQ[i].content[j] +"'/></div>";
				}
				temphtml += "<div class='questionOption'><button>新增选项</button></div>";
			}else{
				if(nowQ[i].type === "more"){
					for(var j in nowQ[i].content){
						console.log(j);
						temphtml += "<div class='questionOption'><input type='checkbox' name='"+ i +"'/><input type='text' value='"+ nowQ[i].content[j] +"'/></div>";
					}
					temphtml += "<div class='questionOption'><button>新增选项</button></div>";
				}else{
					if(nowQ[i].type === "abc"){
						temphtml += "<div class='questionOption'><textarea id='"+ i +" cols='100' rows='5'></textarea></div>";
					}else{
						console.log(nowQ[i].type);
					}
				}
			}
			temphtml += "<div class='questionButton'><button>上移</button><button>下移</button><button>复用</button><button>删除</button></div>"
			temphtml += "</div>";
			console.log(temphtml);
			questionArea.innerHTML += temphtml;
		}
	}
}
