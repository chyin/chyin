window.onload = function(){
	document.getElementById("showFloat").onclick = function(){
		document.getElementById("coverLayer").style.display = "block";
		document.getElementById("floatLayer").style.display = "block";
	}
	document.getElementById("certain").onclick = function(){
		document.getElementById("coverLayer").style.display = "none";
		document.getElementById("floatLayer").style.display = "none";
	}
	document.getElementById("cancel").onclick = function(){
		document.getElementById("coverLayer").style.display = "none";
		document.getElementById("floatLayer").style.display = "none";
	}
	document.getElementById("coverLayer").onclick = function(){
		document.getElementById("coverLayer").style.display = "none";
		document.getElementById("floatLayer").style.display = "none";
	}
}