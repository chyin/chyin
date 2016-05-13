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
	var oParent = parent?(document.getElementById(parent)):document,
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

// 复制
function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        var len = obj.length;
        for (var i = 0; i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}