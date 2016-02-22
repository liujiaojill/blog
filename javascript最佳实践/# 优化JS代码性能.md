# 优化JS代码性能
## 优化循环
我们来看一段段代码
```javascript
function LoopBad(){     
    var footballTeam={
        coach:"xiaohu",
        members:['罗纳尔多','半泽直树','费德勒']
    };

    for (var i = 0; i < footballTeam.members.length; i++) {
        console.log(footballTeam.members[i])
    };
}
```
这段代码循环footballTeam中的members数组，然后打印队员。怎么优化呢？首先footballTeam.members.length可以缓存一下，footballTeam.members[i]也可以缓存一下，看一下下面的代码就知道了。为什么要缓存呢，因为在循环中重复的去寻找属性是没有必要的，这里缓存一下是可以加快速度的。
```javascript
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
```

## html中如何加载js代码
我们在html中引用js一般来说这么写的
```html
<!DOCTYPE html>
<html >
  <head>
    <meta charset="UTF-8">
    <title>Simple Map</title>
    <link rel="stylesheet" href="css/style.css">
    <script type="text/javascript" src="js/index.js"></script>
  </head>
  <body>
  <div>这里有很多内容</div>
  </body>
</html>
```
这时候js加载会影响html的显示，有什么方法可以让非必要的js后加载呢？
```html
<!DOCTYPE html>
<html >
  <head>
    <meta charset="UTF-8">
    <title>Simple Map</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
  <div>这里有很多内容</div>
  <script type="text/javascript" src="js/index.js"></script>
  </body>
</html>
```
上面的代码把js文件放在`</body>`前面，这样html就会先被浏览器引擎渲染了。所以我们看到很多人都把js放在后面，不过放在前面毕竟复合阅读习惯，好在现在有了`async`属性，我们看看下面的代码。
```html
<!DOCTYPE html>
<html >
  <head>
    <meta charset="UTF-8">
    <title>Simple Map</title>
    <link rel="stylesheet" href="css/style.css">
    <script type="text/javascript" src="js/index.js" async></script>
  </head>
  <body>
  <div>这里有很多内容</div>
  </body>
</html>
```
##使用原型节省内存
我们来看看FootballTeam的构造函数怎么定义的。FootballTeam的构造函数有一个play函数，在里面打印一段话。这个构造函数有什么问题呢？问题就是play函数在**每个对象中都会存在**
，浪费内存啊，创建对象也更费时间。
```javascript
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
```
最好移动到**原型**中，节省内存和创建对象的时间。
```javascript
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
```
##有效率的dom操作
我们来看下面一段代码，这段代码增加很多足球队员到`list`中，功能上是没问题的。但是在循环中，每次增加一个`element`到`list`中，都会让浏览器**reflow(重新载入)**DOM树。
```javascript
var list=document.getElementById('mylist');
var members=['罗纳尔多','半泽直树','费德勒'];
for (var i = 0; i < members.length; i++) {
    var element=document.createElement('li');
    element.appendChild(document.createTextNode(members[i]));
    list.appendChild(element);
};
```
如何改进这个代码呢，我们只要缓存一下for循环中频繁创建的`li`元素就可以了，看一下下面代码。
```javascript
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
```
##拼接string
js的字符串拼接直接用＋号就可以了。但是下面的情况有更好的方法。
```javascript
var newPageBuild = [ "<!DOCTYPE html>", "<html>", "<body>", "<h1>", 
                      //***a hundred or more other html elements***, 
                      "</script>", "</body>", "</html>" ];
var page = ""; 
for(var i = 0, x = newPageBuild.length; i < x; i++){ 
    page += newPageBuild[i];  
}
```
上面这段代码可以这样改进
```javascript
page = newPageBuild.join("\n");
```
##如何测试性能
浏览器提供了很多工具测试性能，这里分享一个用代码简单测试性能的方法。
```javascript
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
```
我们看到`SpeedTest`类的构造函数有三个参数，第一个参数是需要测试的函数，第二个参数是被测试函数的参数，第三个是重复的次数。`SpeedTest`原型中定义了一个方法`startTest`,用来测试运行的时间，最后打印出运行总时间和平均时间。我们来看看如何使用它。
```javascript
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
```
使用起来也很方便吧。

![我的微信号](http://images.cnblogs.com/cnblogs_com/xiaohu1986/789491/o_weixin.png)