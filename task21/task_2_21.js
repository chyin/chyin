window.onload = function(){
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
		var hobbyText = data.trimApart(newText.value);
		if(hobbyText[0]===""){
			alert("Please input a valid value!");
		}
		else{
			data.repeatLess10(hobbyArray,hobbyText);
			var divhobby = document.getElementById("divHobby");
			data.present(divhobby,hobbyArray);
			//data.deleteIt(divtags,tagsArray);
		}
		newText.value = newText.defaultValue;
	}
}

var data = function(){
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
		present: function(divZone,oArray){
			console.log(oArray);
			divZone.innerHTML = "";
			for(var i=0;i<oArray.length;i++){
				tempHTML = "<div class='blockNormal'><span>点击删除</span>"+ oArray[i] +"</div>";
				divZone.innerHTML = divZone.innerHTML + tempHTML;
			}
			child = divZone.childNodes;
			for(var k=0;k<child.length;k++){
				child[k].k = k;
				child[k].onmouseover = function(){
					this.style.cursor = "pointer";
					this.className = "blockDelete";
				}
				child[k].onmouseout = function(){
					this.style.cursor = "default";
					this.className = "blockNormal";
				}
				child[k].onclick = function(){
					for(var i=this.k;i<oArray.length-1;i++){
						oArray[i] = oArray[i+1];
					}
					oArray.length = oArray.length - 1;
					data.present(divZone,oArray);
				}
			}
		}
	}
}();