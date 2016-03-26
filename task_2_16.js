/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = new Array();

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var city = document.getElementById("aqi-city-input").value.replace(/[(^\s+)(\s+$)]/g,"");
  var val = document.getElementById("aqi-value-input").value.replace(/[(^\s+)(\s+$)]/g,"");
  var re=/[^\u4e00-\u9fa5a-zA-Z]/g;
  if(city==="" || val===""){
  	alert("请填写城市名称和空气质量指数！");
  }
  else{
    if(re.test(city)){
      alert("您输入的城市名称中包含非中英文字符!");
    }
    else if(val%1 === 0) {
  	  var countx = aqiData.length;
  	  aqiData[countx] = new Array(2);
  	  aqiData[countx][0] = city;
  	  aqiData[countx][1] = val;
    }
    else {
      alert("您输入的空气质量指数不是整数!");
    }
  }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var aqitable = document.getElementById("aqi-table");
  var tempid;
  var aqitablei;
  if(aqiData.length===0){
  	aqitable.innerHTML="";
  }
  else{
    aqitable.innerHTML = "<tr><th>城市</th><th>空气质量</th><th>操作</td></tr>";
    for(var i=0;i<aqiData.length;i++){
      tempid = "delete" + i;
      aqitablei = "<tr><td>" + aqiData[i][0] + "</td><td>" + aqiData[i][1] + "</td><td><button id=" + tempid + ">删除</button></td></tr>"
  	aqitable.innerHTML = aqitable.innerHTML + aqitablei;
    }
    for(var i=0;i<aqiData.length;i++){
      tempid = "delete" + i;
      document.getElementById(tempid).onclick=function(){
      	var obj=document.elementFromPoint(event.clientX,event.clientY);
      	delBtnHandle(obj.id);
      };
    }
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(deletid) {
  // do sth.
  var delid = document.getElementById(deletid);
  var deli = parseInt(deletid.match(/\d/g));
  var aqide = new Array(aqiData.length-1);
  for(var j=0;j<deli;j++){
  	aqide[j] = [aqiData[j][0],aqiData[j][1]];
  }
  for(var k=deli+1;k<aqiData.length;k++){
  	aqide[k-1] = [aqiData[k][0],aqiData[k][1]];
  }
  aqiData = aqide;
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("add-btn").onclick=function(){
    addBtnHandle();
  };
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  
}

init();