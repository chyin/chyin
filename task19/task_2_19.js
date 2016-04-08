window.onload = function(){
	var inNum = new Array();
	var bgColor = ["#999","#ccc","#555"];
	var contain = 60;

	document.getElementById("leftin").onclick = function(){
		var num = document.getElementById("number").value;
		if(inNum.length>contain-1){
			alert("Couldn't add any number!")
		}
		else{
			if(isNaN(num)){
				alert("Please input a number!")
			}else{
				if(num>100 || num<10){
					alert("Please input a number whose value is between 10 and 100!")
				}
				else{
					inNum.length = inNum.length + 1;
					for(var i=inNum.length-1;i>0;i--){
						inNum[i] = inNum[i-1];
					}
					inNum[0] = num;
					freshout();
				}
			}
		}
	};
	document.getElementById("rightin").onclick = function(){
		var num = document.getElementById("number").value;
		if(inNum.length>contain-1){
			alert("Couldn't add any number!")
		}
		else{
			if(isNaN(num)){
				alert("Please input a number!")
			}else{
				if(num>100 || num<10){
					alert("Please input a number whose value is between 10 and 100!")
				}
				else{
					inNum[inNum.length] = num;
					freshout();
				}
			}
		}
	};
	document.getElementById("leftout").onclick = function(){
		for(var i=0;i<inNum.length-1;i++){
			inNum[i] = inNum[i+1];
		}
		if(inNum.length>0){
			inNum.length = inNum.length - 1;
		}
		freshout();
	};
	document.getElementById("rightout").onclick = function(){
		if(inNum.length>0){
			inNum.length = inNum.length - 1;
		}
		freshout();
	};

	function freshout(){
		console.log(inNum);
		if(inNum.length === 0){
			document.getElementById("divarea").style.display = "none";
			document.getElementById("divarea").innerHTML = "";
			document.getElementById("divorder").style.display = "none";
		}
		else{
			document.getElementById("divarea").style.display = "block";
			document.getElementById("divorder").style.display = "block";
			divarea = document.getElementById("divarea");
			divarea.innerHTML = "";
			for(var i=0;i<inNum.length;i++){
				var temptext;
				temptext = "<div class='blockred' name = 'bred' id = "+i+"></div>";
				divarea.innerHTML = divarea.innerHTML + temptext;
			}
			for(var i=0;i<inNum.length;i++){
				tempi = document.getElementById(i);
				tempi.style.height = inNum[i]*3 + "px";
				tempi.style.marginLeft = 0.552*(3*i+1) + "%";
				tempi.style.backgroundColor = bgColor[i%3];
				tempi.title = inNum[i];
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

	var count = new Array();
	document.getElementById("order").onclick = function(){
		count = [0,1];
		console.log(count);
		var t = setTimeout("bubbleSort()",1000);
		console.log(count);
	}
	function bubbleSort(){
		if(inNum[count[0]]>inNum[count[1]]){
			var tempjk = inNum[count[0]];
			inNum[count[0]] = inNum[count[1]];
			inNum[count[1]] = tempjk;
		}
		count[1] = count[1] + 1;
		if(count[1]>inNum.length-1){
			count[0] = count[0] + 1;
			count[1] = count[0] + 1;
		}
		freshout();
		if(count[0]<inNum.length-1){
			console.log(count);
			t = setTimeout("bubbleSort()",1000);
			console.log(count);
		}
	}

	freshout();

}