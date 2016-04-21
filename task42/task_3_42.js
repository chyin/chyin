window.onload = function(){
	// 初始设定为今天
	var today = new Date();
	// 年月日
	var year = today.getFullYear();
	var month = today.getMonth();
	var day = today.getDate();
	var selectMonth = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
	var calHeight = 0;
	// 获得元素
	var	calTable = document.getElementById("calTable");
	var hidePart = document.getElementById("hidePart");
	var inputMonth = document.getElementById("inputMonth");
	var inputYear = document.getElementById("inputYear");
	hidePart.style.display = "none";
	document.getElementById("dateInput").value = year + "/" + (month<9?"0"+(month+1):month+1) + "/" + (day<9?"0"+day:day);

	hideCalendar();
	function hideCalendar(){
		var hidePart = document.getElementById("hidePart");
		document.getElementById("dateInput").onclick = function(e){
			e = e || window.event;
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble=true;
			}
			if(hidePart.style.display === "none"){
				hidePart.style.display = "block";
				calendar();
			}else{
				hidePart.style.display = "none";
			}
		}
	}

	// 日历
	function calendar(){
		calendarClear();
		var html = "";
		// 该月初始日期是星期几
		var startDay = new Date(year, month, 1).getDay();
		startDay = (startDay===0)?7:startDay;
		// 该月的天数
		var numDay = new Date(year, month+1, 0).getDate();
		// 上月的天数
		var lastnDay = new Date(year, month, 0).getDate();
		//console.log(numDay);
		//console.log(lastnDay);

		//var chooseDay = document.getElementById("chooseDay");
		//chooseDay.innerHTML = selectMonth[month] + "   " + year;
		document.getElementById("cMonth").innerHTML = selectMonth[month];
		document.getElementById("cYear").innerHTML = year;

		calHeight = 1;
		html = "<tr class = 'tableDay'>";
		lastCount = startDay-2;
		for(var i=0;i<startDay-1;i++){
			html += "<td class = 'last point'>" + (lastnDay-lastCount) + "</td>";
			lastCount--;
		}
		numCount = startDay - 1;
		for(var i=1;i<numDay+1;i++){
			if(i===day){
				html += "<td class = 'now point cDay'>" + i + "</td>";
			}else{
				html += "<td class = 'now point'>" + i + "</td>";
			}
			numCount++;
			if(numCount === 7){
				numCount = 0;
				html += "</tr><tr class = 'tableDay'>";
				calHeight++;
			}
		}
		if(numCount>0){
			for(var i=numCount; i<7; i++){
				html += "<td class = 'next point'>" + (i-numCount+1) + "</td>";
			}
		}
		html += "</tr>";
		// console.log(html);
		calTable.innerHTML += html;
		calDom();
	}
	// 清除日历
	function calendarClear(){
		for(var i=0;i<calHeight;i++){
			calTable.deleteRow(2);
		}
	}
	// 日历事件
	function calDom(){
		// 选择年月
		var choMonth = document.getElementById("chooseMonth");
		var choYear = document.getElementById("chooseYear");
		var inputMonth = document.getElementById("inputMonth");
		var inputYear = document.getElementById("inputYear");
		choMonth.onmouseover = function(){
			this.style.cursor = "pointer";
		}
		choMonth.onmouseout = function(){
			this.style.cursor = "default";
		}
		choMonth.onclick = function(e){
			e = e || window.event;
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble=true;
			}
			inputYear.style.display = "none";
			inputMonth.style.display = "block";
			(month<9) ? inputMonth.style.width="12px" : inputMonth.style.width="30px";
			inputMonth.value = month+1;
		}
		inputMonth.onfocus = function(){
			inputMonth.onkeyup = function(event){
				event = event || window.event;
				//console.log(event.keyCode);
				if(event.keyCode===13 || event.keyCode===32){
					month = inputMonth.value - 1;
					inputMonth.style.display = "none";
					calendar();
				}
			}
		}
		choYear.onmouseover = function(){
			this.style.cursor = "pointer";
		}
		choYear.onmouseout = function(){
			this.style.cursor = "default";
		}
		choYear.onclick = function(e){
			e = e || window.event;
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble=true;
			}
			inputMonth.style.display = "none";
			inputYear.style.display = "block";
			inputYear.value = year;
		}
		inputYear.onfocus = function(){
			inputYear.onkeyup = function(event){
				event = event || window.event;
					console.log(event.keyCode);
				if(event.keyCode===13 || event.keyCode===32){
					year = inputYear.value;
					inputYear.style.display = "none";
					calendar();
				}
			}
		}
		calTable.onclick = function(e){
			e = e || window.event;
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble=true;
			}
			inputMonth.style.display = "none";
			inputYear.style.display = "none";
		}
		document.onclick = function(){
			inputMonth.style.display = "none";
			inputYear.style.display = "none";
			hidePart.style.display = "none";
			document.getElementById("dateInput").value = year + "/" + (month<9?"0"+(month+1):month+1) + "/" + (day<9?"0"+day:day);
		}
		// 左右箭头
		var thLeft = document.getElementById("thLeft");
		thLeft.onclick = function(){
			if(month===0){
				month = 11;
				year--;
			}else{
				month--;
			}
			calendar();
		}
		thLeft.onmouseover = function(){
			this.style.cursor = "pointer";
		}
		thLeft.onmouseout = function(){
			this.style.cursor = "default";
		}
		var thRight = document.getElementById("thRight");
		thRight.onclick = function(){
			if(month === 11){
				month = 0;
				year++;
			}else{
				month++;
			}
			calendar();
		}
		thRight.onmouseover = function(){
			this.style.cursor = "pointer";
		}
		thRight.onmouseout = function(){
			this.style.cursor = "default";
		}
		// 选择日期
		var last = getClass("last","calTable");
		var now = getClass("now","calTable");
		var next = getClass("next","calTable");
		for(var i=0;i<last.length;i++){
			last[i].onclick = function(){
				if(month===0){
					month = 11;
					year--;
				}else{
					month--;
				}
				calendar();
			}
			last[i].onmouseover = function(){
				this.style.cursor = "pointer";
			}
			last[i].onmouseout = function(){
				this.style.cursor = "default";
			}
		}
		for(var i=0;i<now.length;i++){
			now[i].i = i+1;
			now[i].onclick = function(){
				day = this.i;
				//calendar();
				hidePart.style.display = "none";
				document.getElementById("dateInput").value = year + "/" + (month<9?"0"+(month+1):month+1) + "/" + (day<9?"0"+day:day);
			}
			now[i].onmouseover = function(){
				this.style.cursor = "pointer";
			}
			now[i].onmouseout = function(){
				this.style.cursor = "default";
			}
		}
		for(var i=0;i<next.length;i++){
			next[i].onclick = function(){
				if(month === 11){
					month = 0;
					year++;
				}else{
					month++;
				}
				calendar();
			}
			next[i].onmouseover = function(){
				this.style.cursor = "pointer";
			}
			next[i].onmouseout = function(){
				this.style.cursor = "default";
			}
		}
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

}