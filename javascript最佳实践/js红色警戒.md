# JS红色警戒
JS有很多让人迷惑的地方，一起来看看吧。
## with
with可以扩展作用域链，建议永远不要使用它。我们来看看这些列子。
### 案例1
#### 正常用法
```javascript
function People(name){
    this.name = name;
    this.eat = function(){
        console.log(this.name+"要吃饭");
    }
}
var me = new People("xiaohu");

with(me){
    console.log(name);//可以省略me.
    eat();//可以省略me.
}
```
看起来很方便的样子。
#### with让阅读代码的人很疯狂
看看下面的代码
```javascript
with(me){
    console.log(name);
    eat();
    play=function(){//如果是省略了me.,那么play应该定义在对象me中
        console.log(this.name);
    }
    nickName="xiao" + name;//如果是省略了me.,那么nickName应该定义在对象me中
}
```
我们运行一下就知道，两个变量变成了全局变量。

### 案例2
#### 正常用法
```javascript
function People(name){
    this.name = name;
    this.property={
        wallet:{
            banknote:1000,
            coin:20,
            salary:9
        }
    };
    this.eat = function(){
        console.log(this.name+"要吃饭");
    }
}
var me = new People("xiaohu");
var salary=2000;
with(me.property.wallet){//好像很方便啊
    banknote+=salary;//等等，salary到底是me.property.wallet还是哪儿的啊？
    console.log(banknote);
}
```
#### with让阅读代码的人很疯狂
我们还是用其他方法吧。
```javascript
var salary=2000;
var wallet = me.property.wallet;
wallet.banknote+=salary;
console.log(wallet.banknote);
```
像这样缓存起来就很好`var wallet = me.property.wallet;`

## eval
### eval容易出错
JS的eval可能会使代码不清晰，影响调试和性能，应该避免使用。看看下面这段代码。
```javascript
function Workers(){
    this.assignment=function assignment(who, number){
        eval("this.work" + who + "='finish task:"+number+"'");
    }
}
var workers = new Workers();
for (var i = 0; i < 5; i++) {
    workers.assignment(i,i);
}
```
这段代码给工人分配工作，在对象workers创建很多的属性，eval实际上想执行这样的语句`workers.work1='finin task:1'`。在参数一切正常的情况下是可以很好的工作的，但是这个函数是很容易出错的。
像下面这样传入空格，“'”等字符串的结束标记，都会让eval尝试运行的语句是不合法的，非常容易出错，也不容易调试。
```javascript
workers.assignment("1   1","'");
```
**eval最常见的错误就是像上面这样给对象加很多属性**,其实用数组就可以很好的实现同样的功能。看看下面的代码。
```javascript
function WorkersBetter(){
    this.workers=[];
    this.assignment=function assignment(name, task){
        //TODO: 检查数组越界......
        var obj ={name:name,task:task};
        this.workers.push(obj);
    }
}
var workersBetter = new WorkersBetter();

for (var i = 0; i < 3; i++) {
    workersBetter.assignment(i,"task"+i);
}
```
### 用eval容易被注入代码
看看这段代码，你只想赋值，弹出了对话框
```javascript
workers.assignment("1","';alert('xiaohu');'");
```

在看看用eval解析json字符串的用法。同样这样也会让人注入代码，而且性能不好。
```javascript
var jsonString='{"task":"write better javascript!"}';
var json = eval('('+jsonString+')');
console.log(json);
```
正确的做法应该用专门解析json的函数或者第三方库
```javascript
console.log(JSON.parse(jsonString));
```

## 括号
条件判断应该加括号，并且成对出现，但是就是有人喜欢节省点，这样真实坑死队友啊。看看下面这样的代码
```javascript
var isGoodCoder=false;
var salary=0,vacation=0;
if(isGoodCoder)
    salary=10000;
    vacation=30;
```
上面的`vacation=30;`已经不在if的控制范围里面了，好一些的写法应该这样
```javascript
if(isGoodCoder){
    salary=10000;
    vacation=30;
}else{
    salary=1000;
    vacation=5;
}
```

## 数字问题
### 精度问题
程序并不能精确的保存和运算浮点数（小数）。我们看看JS如何处理这种情况。
```javascript
0.1 + 0.2
=>0.30000000000000004
```
可以看到多出了`0.00000000000000004`，如果我们要用`==`或者和别的数字做运输，就会有问题。使用`toFixed`保存精度。
```javascript
(0.1 + 0.2).toFixed(1);
=>"0.3"
```
虽然`toFixed`处理了精度问题，但是却返回了字符串，还要用`parseFloat`处理一下
```javascript
parseFloat((0.1 + 0.2).toFixed(1));
```
**parseFloat,parseInt**可以从字符串中解析出数字。不过只能解析出以数字开头的字符串。
看一下下面的代码。
```javascript
parseFloat("2.333是xiaohu的零用钱");//=>2.333
parseFloat("xiaohu的零用钱为2.333");//=>NaN
```

### 进制转换

>parseInt(string, radix);

radix
一个2到36之间的整数值，用于指定转换中采用的基数。比如参数"10"表示使用我们通常使用的十进制数值系统。总是指定该参数可以消除阅读该代码时的困惑并且保证转换结果可预测。当忽略该参数时，不同的实现环境可能产生不同的结果。

看看如下代码：
```javascript
parseInt(021);//=>17，八进制2*8^1+1*8^0=17
parseInt(021,10);//=>17，貌似第一个参数指定了进制，第二个参数没啥用处？
parseInt("021");//老得js标志和新的标准不一样，新的标准会返回21
parseInt("021",10);//=>21，这种方式才是最安全。
```
`parseInt("021",10);`是最好的。

### 判断是否是数字
`typeof data === "number"`可以判断一个变量是否是number类型。好像情况已经很简单了。但是JS有一个NaN，表示**不是一个数字**。但是`typeof NaN === "number"`确返回true。所以我们最好使用下面这个代码判断是否是数字
```javascript
function isNumber(data){
    return ( typeof data === "number" 
        && !isNaN(data) ); 
}
```

![我的微信号](http://images.cnblogs.com/cnblogs_com/xiaohu1986/789491/o_weixin.png)
