#JS中的比较
##==与===
```
'1' == 1;
true == 1;
false == 0;
"\n \n \t" == 0;
```
==会进行类型转换，所以结果为true
```
'1' === 1;
true === 1;
false === 0;
"\n \n \t" === 0;
```
`===`会判断内容和类型是否匹配，所以结果为`false`。建议都使用`===`，因为`==`的转换并不好记忆，`===`可以帮助我们确保结果是我们所期望的。
##instanceof
有的时候我们需要判断\n
1. 一个object是否由某个构造函数创建的（是否是某类型）
2. 一个object是否有某个原型（继承了某些方法）
这个需求可以用`instanceof`来完成
###语法
>object instanceof constructor
###参数
**要检测的对象.**
```
object
```
***某个构造函数***
```
constructor
```
###描述
instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。

###举个例子
看一下这段代码，定义了一个People基类，然后
1. 定义Man类的原型是People.prototype。
2. 定义Woman类继承People。
这然对象man和woman都可以访问eat方法，woman还可以访问name属性
```javascript
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
//Object.create() 方法创建一个拥有指定原型和若干个指定属性的对象。
Man.prototype=Object.create(People.prototype); //只是可以访问eat方法
Woman.prototype= new People("Alice");   //继承
var man = new Man("不高","不富","不帅");
var woman = new Woman("不白","不富","不美");
man.eat();//-->undefined要吃饭
woman.eat();//-->Alice要吃饭
```
如果我们要检查一下对象是否有eat方法，那么就可以使用instanceof方法了，看一下下面代码
```javascript
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

function PlaseEat(p){
    if(p instanceof People){
        p.eat();
    }else{
        console.log("没有继承People，所以不能屌用eat方法");
    }
}
```
可以注意到:
1. `man instanceof Man`返回`true`，这是因为`man`的原型是`Man.prototype`，就是原型链的开始，符合`instanceof`的功能定义。
2. `man instanceof People`返回`true`，是因为`Man.prototype`和`People`的原型是同一个对象。`Object.create()` 方法创建一个拥有指定原型和若干个指定属性的对象。
3. `man instanceof Object`返回`true`，是因为`Object.prototype.isPrototypeOf(man)`
4. `PlaseEat`函数利用instanceof判断出对象是否有People中定义的接口，如果有，就可以调用`eat`方法了。

有一个地方比较**奇怪**，大家看看这个
```javascript
var simpleStr = "This is a simple string"; 
simpleStr instanceof String;
```
居然返回false。JS的行为有时候还真奇怪。`var newStr    = new String("String created with constructor");`这样定义就可以返回`true`。感觉JS的语言细节方面不是特别的讲究啊。

![我的微信号](http://images.cnblogs.com/cnblogs_com/xiaohu1986/789491/o_weixin.png)
