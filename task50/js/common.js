// getElementByClassName
function getClass1(clsName,parent){
	var oParent = parent?parent:document,
		eles = [];
		elements = oParent.getElementsByTagName('*');

	for(var i=0,l=elements.length;i<l;i++){
		classSplit = elements[i].className.split(new RegExp("\\s"));
		for(var j=0;j<classSplit.length;j++){
			if(classSplit[j]===clsName){
				eles.push(elements[i]);
			}
		}
	}
	return eles;
}
// getElementByClassName
function getClass(clsName,parent){
	var oParent = parent?document.getElementById(parent):document,
		eles = [];
		elements = oParent.getElementsByTagName('*');

	for(var i=0,l=elements.length;i<l;i++){
		classSplit = elements[i].className.split(new RegExp("\\s"));
		for(var j=0;j<classSplit.length;j++){
			if(classSplit[j]===clsName){
				eles.push(elements[i]);
			}
		}
	}
	return eles;
}