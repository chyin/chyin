window.onload = function(){
	var inNum = new Array();

	document.getElementById("leftin").onclick = function(){
		var num = document.getElementById("number").value;
		if(isNaN(num)){
			alert("Please input a number!")
		}else{
			inNum.length = inNum.length + 1;
			for(var i=inNum.length-1;i>0;i--){
				inNum[i] = inNum[i-1];
			}
			inNum[0] = num;
			freshout();
		}
	};
	document.getElementById("rightin").onclick = function(){
		var num = parseInt(document.getElementById("number").value);
		if(isNaN(num)){
			alert("Please input a number!")
		}else{
			inNum[inNum.length] = num;
			freshout();
		}
	};
	document.getElementById("leftout").onclick = function(){
		for(var i=0;i<inNum.length-1;i++){
			inNum[i] = inNum[i+1];
		}
		inNum.length = inNum.length - 1;
		freshout();
	};
	document.getElementById("rightout").onclick = function(){
		inNum.length = inNum.length - 1;
		freshout();
	};

	function freshout(){
		if(inNum.length === 0){
			document.getElementById("divarea").innerHTML = "";
		}
		else{
			divarea = document.getElementById("divarea");
			divarea.innerHTML = "";
			for(var i=0;i<inNum.length;i++){
				var temptext;
				temptext = "<div class='blockred' name = 'bred' id = "+i+">"+ inNum[i] +"</div>";
				divarea.innerHTML = divarea.innerHTML + temptext;
			}
		}
		var oNum = document.getElementsByName("bred");
		for(var i=0; i<oNum.length; i++){
			oNum[i].onclick = function(){
				console.log(this.id);
				var deletId = parseInt(this.id);
				for(var j=deletId;j<inNum.length-1;j++){
					inNum[j] = inNum[j+1];
				}
				inNum.length = inNum.length - 1;
				freshout();
			}
			oNum[i].onmouseover = function(){
				this.style.cursor = "pointer";
			}
			oNum[i].onmouseout = function(){
				this.style.cursor = "default";
			}
		}
	}
	freshout();
}