window.onload = function(){
	var inText = new Array();
/*
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
		var reSpace=new RegExp("^["+spl+"]*(.*?)["+spl+"]*inText$");
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
*/
	var tagsArray = new Array();
	var hobbyArray = new Array();

	document.onkeyup = function(event){
		event = event || window.event;
		//console.log(event.keyCode);
		if(event.keyCode === 32 || event.keyCode === 13 || event.keyCode === 188){
			if(document.activeElement.id === "tags"){
				var tags = document.getElementById("tags");
				var tagsText = data.trimApart(tags.value);
				if(tagsText[0]===""){
					alert("Please input a valid value!");
				}
				else{
					data.repeatLess10(tagsArray,tagsText);
					var divtags = document.getElementById("divTags");
					data.present(divtags,tagsArray);
					console.log("divtags");
					//data.deleteIt(divtags,tagsArray);
				}
				//data.trimApart();
				tags.value = tags.defaultValue;
			}
		}
	}
	document.getElementById("hobbyButton").onclick = function(){
		var newText = document.getElementById("hobby");
		console.log(newText.value);
		//data.trimApart();
		newText.value = newText.defaultValue;
	}
}

var data = function(){
	var time = 0;
	var _this = this;
	return{
		trimApart: function(nArray){
			var spl = "\\s\\,\\.\\。\\，\\/\\、\\\\";
			var reSpace=new RegExp("^["+spl+"]*(.*?)["+spl+"]*$");
			var textem = nArray.replace(reSpace,"$1");
			var spSpace = new RegExp("["+spl+"]+");
			var text = textem.split(spSpace);
			return text;
		},
		repeatLess10: function(oArray,nArray){
			for(var i=0;i<nArray.length;i++){
				if(oArray.indexOf(nArray[i])<0){
					if(oArray.length<10){
						oArray[oArray.length] = nArray[i];
					}
					else{
						for(var j=0;j<oArray.length;j++){
							oArray[j] = oArray[j+1];
						}
						oArray[oArray.length-1] = nArray[i];
					}
				}
			}
			//return oArray;
		},
		present: function(divZone,oArray,deleteNum){
			console.log(oArray);
			divZone.innerHTML = "";
			for(var i=0;i<oArray.length;i++){
				if(i===deleteNum){
					tempHTML = "<div class='blockDelete'>删除"+ oArray[i] +"</div>";
					divZone.innerHTML = divZone.innerHTML + tempHTML;
				}
				else{
					tempHTML = "<div class='blockNormal'>"+ oArray[i] +"</div>";
					divZone.innerHTML = divZone.innerHTML + tempHTML;
				}
			}
			child = divZone.childNodes;
			for(var k=0;k<child.length;k++){
				child[k].k = k;
				child[k].on = 0;
				child[k].onmouseover = function(){
					this.style.cursor = "pointer";
					console.log(this.k);
					if(this.on === 0){
						this.on = 1;
						_this.present(divZone,oArray,this.k);
					}
				}
				child[k].onmouseout = function(){
					this.style.cursor = "default";
					this.on = 0;
				}
				child[k].onclick = function(){
					console.log(child[k]);
					for(var i=child[k].k;i<oArray.length-1;i++){
						oArray[i] = oArray[i+1];
					}
					oArray.length = oArray.length - 1;
					_this.present(divZone,oArray);
				}
			}
			//return divZone;
		},
		deleteIt: function(divZone,oArray,time){
			child = divZone.childNodes;
			console.log(child);
			for(var k=0;k<child.length;k++){
				console.log(k);
				child[k].k = k;
				child[k].onmouseover = function(){
					this.style.cursor = "pointer";
					console.log(this.k);
					data.present(divZone,oArray,this.k);
					data.deleteIt(divZone,oArray);
				}
				child[k].onmouseout = function(){
					this.style.cursor = "default";
				}
				child[k].onclick = function(){
					console.log(child[k]);
					for(var i=child[k].k;i<oArray.length-1;i++){
						oArray[i] = oArray[i+1];
					}
					oArray.length = oArray.length - 1;
					this.present(divZone,oArray);
				}
			}
			//return divZone;
		},
		getByClass: function(zone,classId){
			node = zone.childNodes;
			var child = new Array();
			var count = 0;
			for(var j=0;j<node.length;j++){
				if(node[j].className===classId){
					child[count] = node[j];
					count = count + 1;
				}
			}
			return child;
		}
	}
}();