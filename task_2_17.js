window.onload = function(){
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

// 生成随机数据
var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */    
function renderChart() {
  var datWrap = chartData[pageState.nowGraTime][pageState.nowSelectCity];
  // 对class="aqi-chart-wrap"的区域设置样式
  var aqiWrap = document.getElementsByTagName("div")[0];
  aqiWrap.style.border = "2px solid #999";
  aqiWrap.style.margin = "10px 2px";
  aqiWrap.style.padding = "10px 0px";
  aqiWrap.style.height = "600px";
  aqiWrap.style.position = "relative";
  // 在div内添加块
  var oWrap = Object.getOwnPropertyNames(datWrap);
  var strWrap = "";
  var bgColor = ["#999","#ccc","#555"];
  for(var i = 0;i<oWrap.length;i++){
    strWrap = strWrap + "<span id='aqip"+i+"'></span>";
  }
  aqiWrap.innerHTML = strWrap;
  for(var i = 0;i<oWrap.length;i++){
    striWrap = document.getElementById("aqip"+i);
    // 设置绝对定位
    striWrap.style.position = "absolute";
    striWrap.style.bottom = "0";
    // day的数据是对象形式储存，其他两个是array形式，两个的长度不同
    var wlth = pageState.nowGraTime==="day"? (2*oWrap.length+1):(2*oWrap.length-1);
    striWrap.style.left = 100/wlth*(2*i+1) + "%";
    // 设置柱状图的显示柱体，及title
    striWrap.style.width = 100/wlth + "%";
    if(pageState.nowGraTime==="day"){
      var datAqi = new Date("2016-01-01");
      datAqi.setDate(datAqi.getDate() + i);
      var datStrAqi = getDateStr(datAqi);
      striWrap.style.height = datWrap[datStrAqi] + "px";
      striWrap.title = datStrAqi;
    }
    else if(pageState.nowGraTime==="week"){
      striWrap.style.height = datWrap["第"+ (i+1) +"周"] + "px";
      striWrap.title = "第"+ (i+1) +"周";
    }
    else{
      striWrap.style.height = datWrap[(i+1) +"月"] + "px";
      striWrap.title = (i+1) +"月";
    }
    // 设置颜色，共三种颜色
    striWrap.style.backgroundColor = bgColor[i%3]; // "#999";
    // 鼠标移入移出时的变化
    striWrap.onmouseover=function(){
      var obj=document.elementFromPoint(event.clientX,event.clientY);
      obj.style.cursor = "hand";  // pointer 亦可
      obj.style.backgroundColor = "#111";
    }
    striWrap.onmouseout=function(){
      var obj=document.elementFromPoint(event.clientX,event.clientY);
      obj.style.cursor = "default";
    for(var j = 0;j<oWrap.length;j++){
      iWrap = document.getElementById("aqip"+j);
      iWrap.style.backgroundColor = bgColor[j%3]; // "#999";
    }
    }
  }
}
/*
// 通过类得到元素
function getEleByClass(classname, tagname, parentNode){
  var parent =  parentNode || document.body,
      tagname = tagname || '*',
      o = parent.getElementsByTagName(tagname),
      p = [],
      reg = new RegExp('(^|\\s+)' + classname + '(\\s+|$)');
  for (var i = 0; i < o.length; i++) {
    if (o[i].className && reg.test(o[i].className)) {
        p.push(o[i]);  //或p[p.length] = o[i] 简单的字符串数字效率高些;
    }
  }
  return p;
}
 */

/**
 * 日、周、月的radio事件点击时的处理函数
 */
/*
function graTimeChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
  renderChart();
}
*/

/**
 * select发生变化时的处理函数
 */
/*
function citySelectChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
  renderChart();
}
*/

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var oRadio = document.getElementsByName("gra-time");
  for(var i=0;i<oRadio.length;i++){
    oRadio[i].onclick = function(){
      for(var i=0;i<oRadio.length;i++){
        if(oRadio[i].checked){
          nextGraTime = oRadio[i].value;
        }
      }
      if(nextGraTime!=pageState.nowGraTime){
        pageState.nowGraTime = nextGraTime;
        //graTimeChange();
        // 在此函数中已设置变化后的反应，直接调用renderChart即可
        renderChart();
       // console.log(nextGraTime);
      }
    }
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var oSource = Object.getOwnPropertyNames(aqiSourceData);
  var citySelect = document.getElementById("city-select");
  for(var i=0,str="";i<oSource.length;i++){
    str = str + "<option>" + oSource[i] + "</option>";
  }
  citySelect.innerHTML = str;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  oSelect = document.getElementById("city-select");
  oSelect.onclick = function(){
    nextSelectCity = oSelect.value;
    if(nextSelectCity!=pageState.nowSelectCity){
      pageState.nowSelectCity = nextSelectCity;
      //citySelectChange();
      // 在此函数中已设置变化后的反应，直接调用renderChart即可
      renderChart();
     // console.log(nextSelectCity);
    }
  }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var iGraTime,iCtiy,iDay,oCity;
  var chartWeek=new Array(),chartdWeek = new Array();
  var chartMonth=new Array(),chartdMonth = new Array();
  var oSource = Object.getOwnPropertyNames(aqiSourceData);
  // day选项时的数据
  iGraTime = "day";
  chartData[iGraTime] = aqiSourceData;
  //console.log(chartData[iGraTime]);
  // week选项时的数据
  iGraTime = "week";
  for(iCtiy in aqiSourceData){
    var iDay = new Date("2016-01-01");
    var tempDay = 0 , tempCount = 0 , weekCount = 0, daweek;
    for(iDa = 1;iDa<92;iDa++){
      // 算出每周的具体数据
      tempDay = tempDay + aqiSourceData[iCtiy][getDateStr(iDay)];
      tempCount = tempCount + 1;
      if(iDay.getDay()===0){
        weekCount=weekCount+1;
        chartWeek['第'+weekCount+'周'] = Math.ceil(tempDay/tempCount);
        tempDay = 0;
        tempCount=0;
      }
      else if(iDa === 91){
        weekCount=weekCount+1;
        chartWeek['第'+weekCount+'周'] = Math.ceil(tempDay/tempCount);
      }
      iDay.setDate(iDay.getDate() + 1);
    }
    // 赋值
    chartdWeek[iCtiy] = chartWeek;
  }
  chartData[iGraTime] = chartdWeek;
  //console.log(chartData[iGraTime]);
  // month选项时的数据
  iGraTime = "month";
  for(iCtiy in aqiSourceData){
    var iDay = new Date("2016-01-01");
    var tempDay = 0 , tempCount = 0 , monthCount = 0 , damonth;
    for(iDa = 1;iDa<92;iDa++){
      // 算出每月的具体数据
      tempDay = tempDay + aqiSourceData[iCtiy][getDateStr(iDay)];
      tempCount = tempCount + 1;
      if(iDay.getMonth()!=monthCount){
        monthCount=monthCount+1;
        chartMonth[monthCount+'月'] = Math.ceil(tempDay/tempCount);
        tempDay = 0;
        tempCount=0;
      }
      else if(iDa === 91){
        monthCount=monthCount+1;
        chartMonth[monthCount+'月'] = Math.ceil(tempDay/tempCount);
      }
      iDay.setDate(iDay.getDate() + 1);
    }
    //赋值
    chartdMonth[iCtiy] = chartMonth;    
  }
  chartData[iGraTime] = chartdMonth;
  //console.log(chartData[iGraTime]);
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}
init();
}