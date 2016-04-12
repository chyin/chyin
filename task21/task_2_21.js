window.onload = function(){
	var inText = new Array();

	document.getElementById("leftin").onclick = function(){
		var textemp = document.getElementById("inText").value;
		spl = "\\s\\,\\.\\，\\/\\、\\\\";
		var reSpace=new RegExp("^["+spl+"]*(.*?)["+spl+"]*$");
		var textem = textemp.replace(reSpace,"$1");
		var spSpace = new RegExp("["+spl+"]+");
		var texte = textem.split(spSpace);
		if(isNull(texte[0])){
			alert("Please input something!");
		}
		else{
			testWord = 0;
			for(var j=0;j<texte.length;j++){
				reg = /^[a-zA-Z0-9\u4E00-\u9FA5]+$/;
				if(!reg.test(texte[j])){
					testWord = testWord + 1;
				}
			}
			if(testWord>0){
				alert("Please input number, English or Chinese!");
			}
			else{
				inText.length = inText.length + texte.length;
				for(var i=inText.length-1;i>texte.length-1;i--){
					inText[i] = inText[i-texte.length];
				}
				for(var i=0;i<texte.length;i++){
					inText[i] = texte[i];
				}
				freshout();
			}
		}
	};
	document.getElementById("rightin").onclick = function(){
		var textemp = document.getElementById("inText").value;
		// spl = "\s+|\,+|\.+|\，+|\\+|\/+|\、+";
		// spl = "\\s+|\\,+|\\.+|\\，+|\\\+|\\/+|\\、+";
		// spl = "[\\s\\,\\.\\，\\/\\、\\\\]";
		spl = "\\s\\,\\.\\，\\/\\、\\\\";
		var reSpace=new RegExp("^["+spl+"]*(.*?)["+spl+"]*$");
		// var reSpace=/^\s*(.*?)\s*$/;
		// var reSpace=/^[\s\.]*(.*?)\s*$/;
		var textem = textemp.replace(reSpace,"$1");
		// /[\s\,\.\，\/\、\\]+/
		var spSpace = new RegExp("["+spl+"]+");
		var texte = textem.split(spSpace);
		if(isNull(texte[0])){
			alert("Please input something!");
		}
		else{
			testWord = 0;
			for(var j=0;j<texte.length;j++){
				reg = /^[a-zA-Z0-9\u4E00-\u9FA5]+$/;
				if(!reg.test(texte[j])){
					testWord = testWord + 1;
				}
			}
			if(testWord>0){
				alert("Please input number, English or Chinese!");
			}
			else{
				for(var i=0;i<texte.length;i++){
					inText[inText.length] = texte[i];
				}
				freshout();
			}
		}
	};
	function isNull(arg1)
	{
	 return !arg1 && arg1!==0 && typeof arg1!=="boolean"?true:false;
	}

	document.getElementById("leftout").onclick = function(){
		for(var i=0;i<inText.length-1;i++){
			inText[i] = inText[i+1];
		}
		inText.length = inText.length - 1;
		freshout();
	};
	document.getElementById("rightout").onclick = function(){
		inText.length = inText.length - 1;
		freshout();
	};

	function freshout(){
		if(inText.length === 0){
			document.getElementById("divarea").style.display = "none";
			document.getElementById("divarea").innerHTML = "";
			document.getElementById("inquiryArea").style.display = "none";
		}
		else{
			document.getElementById("inquiryArea").style.display = "block";
			divarea = document.getElementById("divarea");
			divarea.style.display = "block";
			divarea.innerHTML = "";
			for(var i=0;i<inText.length;i++){
				var temptext;
				temptext = "<div class='blocknormal' name = 'bred' id = "+i+">"+ inText[i] +"</div>";
				divarea.innerHTML = divarea.innerHTML + temptext;
			}
		}
		freshaction();
	}
	function freshaction(){
		var otextemp = document.getElementsByName("bred");
		for(var i=0; i<otextemp.length; i++){
			otextemp[i].onclick = function(){
				var deletId = parseInt(this.id);
				for(var j=deletId;j<inText.length-1;j++){
					inText[j] = inText[j+1];
				}
				inText.length = inText.length - 1;
				freshout();
			}
			otextemp[i].onmouseover = function(){
				this.style.cursor = "pointer";
			}
			otextemp[i].onmouseout = function(){
				this.style.cursor = "default";
			}
		}
	}

	document.getElementById("inquiryButton").onclick = function(){
		var inq = document.getElementById("inquiry").value;
		spl = "\\s\\,\\.\\，\\/\\、\\\\";
		var reSpace=new RegExp("^["+spl+"]*(.*?)["+spl+"]*$");
		var inqux = inq.replace(reSpace,"$1");
		var inqu = new RegExp(inqux);
		divarea = document.getElementById("divarea");
		divarea.innerHTML = "";
		for(var i=0;i<inText.length;i++){
			if(inqu.test(inText[i])){
				inqSplit = inText[i].split(inqu);
				var tempinq="";
				for(var j=0;j<inqSplit.length-1;j++){
					tempinq = tempinq + inqSplit[j] + "<span class='blockblue'>"+ inqux +"</span>";
				}
				tempinq = tempinq + inqSplit[inqSplit.length-1];
				var temptext;
				temptext = "<div class='blocknormal' name = 'bred' id = "+i+">"+ tempinq +"</div>";
				divarea.innerHTML = divarea.innerHTML + temptext;
			}
			else{
				var temptext;
				temptext = "<div class='blocknormal' name = 'bred' id = "+i+">"+ inText[i] +"</div>";
				divarea.innerHTML = divarea.innerHTML + temptext;
			}
		}
		freshaction();
	};

	freshout();
}