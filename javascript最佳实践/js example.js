var isMember = false;
console.log("当前费用 " + isMember ? "$2.00" : "$10.00");

var  age = 23;
var car,school;
age > 18 ? (
    car = "奇瑞QQ",
    school = "清华第一幼儿园"
    //do someting
) : (
    alert("Sorry, you are much too young!")
);

var fee;
if(isMember){
	fee="$2.00";
}else{
	fee="$10.00";
}

fee=isMember ? "$2.00" : "$10.00";

////////////////////////////////////////////////
//define members 
//var members;
//var members=[1,2,3];
members = members ? members : [ ];
members = members || [];

a1 = true  && true      // t && t returns true
a2 = true  && false     // t && f returns false
a3 = false && true      // f && t returns false
a4 = false && (3 == 4)  // f && f returns false
a5 = "Cat" && "Dog"     // t && t returns "Dog"
a6 = false && "Cat"     // f && t returns false
a7 = "Cat" && false     // t && f returns false

o1 = true  || true       // t || t returns true
o2 = false || true       // f || t returns true
o3 = true  || false      // t || f returns true
o4 = false || (3 == 4)   // f || f returns false
o5 = "Cat" || "Dog"      // t || t returns "Cat"
o6 = false || "Cat"      // f || t returns "Cat"
o7 = "Cat" || false      // t || f returns "Cat"
//////////////////////////////////////////////////
var tall = true;
var rich = true;
var handsome = true;
tall && rich && handsome && alert("可以学学写程序！");
///////////////////////////////////////////////////
function rankProgrammer(rank){ 
    switch(rank){ 
      case "高级": 
        this.secretary = true;
      case "中级": 
      	this.laptop = true;
      	this.bonus = true;
      case "初级": 
      	this.salary = true;
        this.vacation = true; 
    }
}
var xiaohu=new rankProgrammer("高级");
console.log(xiaohu);
            
///////////////////////////////////////////////////////    
///
var SpeedTest = function(testImplement,testParams,repetitions) {
  this.testImplement = testImplement;
  this.testParams = testParams;
  this.repetitions = repetitions || 10000;
  this.average = 0;
};

SpeedTest.prototype = {
  startTest: function() {
    if (this.testImplement(this.testParams) === false) {
      alert('Test failed with those parameters.');
      return;
    }
    var beginTime, endTime, sumTimes = 0;
    for (var i = 0, x = this.repetitions; i < x; i++) {
      beginTime = +new Date();
      this.testImplement(this.testParams);
      endTime = +new Date();
      sumTimes += endTime - beginTime;
    }
    console.log('SumTimes execution across ' + sumTimes);
    this.average = sumTimes / this.repetitions;
    return console.log('Average execution across ' + this.repetitions 
    	+ ': ' + this.average);
  }
};   

function LoopBad(){     
	var footballTeam={
		coach:"xiaohu",
		members:['罗纳尔多','半泽直树','费德勒']
	};

	for (var i = 0; i < footballTeam.members.length; i++) {
		console.log(footballTeam.members[i])
	};
}
function LoopGood(){     
	var footballTeam={
		coach:"xiaohu",
		members:['罗纳尔多','半泽直树','费德勒']
	};
	var members = footballTeam.members;
	for (var i = 0, Length = footballTeam.members.length; i < Length ; i++) {
		console.log(members[i])
	};
}
var speed = new SpeedTest(LoopGood,null,10000);
speed.startTest();

//////////////////////////////////////////////////// 
function FootballTeam(name){
	this.members=25;
	this.name=name;

	//这个函数在每个对象中都会存在，最好移动到原型中，节省内存和创建对象的时间
	this.play = function(){
		console.log(name+'喜欢张雨绮！');
	}
}
var realMadrid = new FootballTeam('皇家马戏团');
var theBARCELONA = new FootballTeam('拉玛西亚影视学院');
realMadrid.play();
theBARCELONA.play();

function FootballTeamBetter(name){
	this.members=25;
	this.name=name;
}
FootballTeamBetter.prototype = {
	play:function(){
		console.log(this.name+'喜欢张雨绮！');
	}
}
var realMadridBetter = new FootballTeamBetter('皇家马德里');
var theBARCELONABetter = new FootballTeamBetter('巴萨');
realMadridBetter.play();
theBARCELONABetter.play();

////////////////////////////////////////////////
var list=document.getElementById('mylist');
var members=['罗纳尔多','半泽直树','费德勒'];
for (var i = 0; i < members.length; i++) {
	var element=document.createElement('li');
	element.appendChild(document.createTextNode(members[i]));
	list.appendChild(element);
};

var list=document.getElementById('mylist'),
	members=['罗纳尔多','半泽直树','费德勒'],
	fragment = document.createDocumentFragment(),
	element;;
for (var i = 0; i < members.length; i++) {
	element=document.createElement('li');
	element.appendChild(document.createTextNode(members[i]));
	fragment.appendChild(element);
};
list.appendChild(fragment);

////////////////////////////////////////////////////
var newPageBuild = [ "<!DOCTYPE html>", "<html>", "<body>", "<h1>", 
                      //***a hundred or more other html elements***, 
                      "</script>", "</body>", "</html>" ];
var page = ""; 
for(var i = 0, x = newPageBuild.length; i < x; i++){ 
	page += newPageBuild[i];  
}

page = newPageBuild.join("\n");

///////////////////////////////////////////////////////
function People(name){
	this.name = name;
}
People.prototype={
	eat:function(){
		console.log(this.name+"要吃饭");
	}
};
function Man(tall, rich, handsome){
	this.tall = tall;
	this.rich = rich;
	this.handsome = handsome;
}
function Woman(white, rich, pretty){
	this.white=white;
	this.rich=rich;
	this.pretty=pretty;
}
Man.prototype=Object.create(People.prototype); //只是可以访问eat方法
Woman.prototype= new People("Alice");	//继承
var man = new Man("不高","不富","不帅");
var woman = new Woman("不白","不富","不美");
man.eat();//-->undefined要吃饭
woman.eat();//-->Alice要吃饭
//-->true;因为Object.getPrototypeOf(man) === Man.prototype符合定义
console.log(man instanceof Man);
//-->true;People.prototype.isPrototypeOf(man)
console.log(man instanceof People);
//-->true;Object.prototype.isPrototypeOf(man)
console.log(man instanceof Object);

//-->true;因为Object.getPrototypeOf(woman) === Woman.prototype符合定义
console.log(woman instanceof Woman);
//-->true;People.prototype.isPrototypeOf(woman)
console.log(woman instanceof People);
//-->true;Object.prototype.isPrototypeOf(woman)
console.log(woman instanceof Object);

///////////////////////////////////////////////////////////

function errorHandling(list){
	try {
		var members = ["罗纳尔多", "梅西"]; 
		if (list === undefined){  
	       throw new ReferenceError();
	    }
	    if ((list instanceof Array) === false){  
	       throw new TypeError();
	    }
	    list = list.concat(members);
	} catch (error) {
		if (error instanceof ReferenceError){
			alert(error + "\n" + "对象不存在");
			list="我并不存在";
		}
		if (error instanceof TypeError){ 
			alert(error + "\n" );
		}
	}
	finally { 
		console.log(list); 
	}
	return list;
}
errorHandling("ss");
errorHandling(undefined);
errorHandling([]);

var list = ["s"];
var ret = errorHandling(list);
/////////////////////////////////////////////////////////
function People(name){
	this.name = name;
	this.eat = function(){
		console.log(this.name+"要吃饭");
	}
}
var me = new People("xiaohu");

with(me){
	console.log(name);
	eat();
	play=function(){
		console.log(this.name);
	}
	nickName="xiao" + name;
}

function People(name){
	this.name = name;
	this.property={
		wallet:{
			banknote:1000,
			coin:20
		}
	};
	this.eat = function(){
		console.log(this.name+"要吃饭");
	}
}
var me = new People("xiaohu");
var salary=2000;
with(me.property.wallet){
	banknote+=salary;
	console.log(banknote);
}

var salary=2000;
var wallet = me.property.wallet;
wallet.banknote+=salary;
console.log(wallet.banknote);

////////////////////////////////////////
function Workers(){
	this.assignment=function assignment(who, number){
		eval("this.work" + who + "='finish task:"+number+"'");
	}
}

var workers = new Workers();

for (var i = 0; i < 5; i++) {
	workers.assignment(i,i);
}

workers.assignment("1   1","'");
workers.assignment("1","';alert('xiaohu');'");

function WorkersBetter(){
	this.workers=[{task:""},{task:""},{task:""},{task:""}];
	this.assignment=function assignment(who, task){
		//TODO: 检查数组越界......
		this.workers[who].task=task;
	}
}
var workersBetter = new WorkersBetter();

for (var i = 0; i < 3; i++) {
	workersBetter.assignment(i,"task"+i);
}


var jsonString='{"task":"write better javascript!"}';
var json = eval('('+jsonString+')');
console.log(json);
console.log(JSON.parse(jsonString));
///////////////////////////////////////////
var isGoodCoder=false;
var salary=0,vacation=0;
if(isGoodCoder)
	salary=10000;
	vacation=30;

if(isGoodCoder){
	salary=10000;
	vacation=30;
}else{
	salary=1000;
	vacation=5;
}
///////////////////////////////////////////
console.log(0.1 + 0.2);
var num = 0.1 + 0.2; 
console.log(num.toFixed(1));
0.333.toFixed(2);
0.335.toFixed(2);
0.335.toFixed(2) + 2;
parseFloat(0.335.toFixed(2)) + 2;
parseFloat("2.333是xiaohu的零用钱");
parseFloat("xiaohu的零用钱为2.333");

function isNumber(data){
	return ( typeof data === "number" 
		&& !isNaN(data) ); 
}
 