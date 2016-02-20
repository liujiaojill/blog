#JS条件判断和赋值的一些技巧1

## 为啥用三元操作符（ternary）

> condition ? expr1 : expr2

### 三元操作符用来简化条件判断

这个操作符可以用来代替if else条件判断。但是为什么有这个操作符呢？这里的原因是if else使用两个代码块，确只有一个会执行，在讲究的程序员看来是一种浪费。所以使用三元操作符用一条语句就可以完成功能就很有吸引力了。我们来看看下面的例子
```javascript
var i=0;
var fee;
if(isMember){
	fee="$2.00";
}else{
    fee="$10.00";
}
fee=isMember ? "$2.00" : "$10.00";
```
### 三元操作符用来执行多个操作
三元操作符的结果语句可以执行多个操作，每个操作用逗号分隔就可以
```javascript
var age = 23;
var car,school;
age > 18 ? (
 car = "奇瑞QQ",
 school = "清华第一幼儿园"
    //do someting
) : (
 alert("Sorry, you are much too young!")
);
```
这样也精简了不少代码。

### 三元操作符容易出错的地方
下面这个语句判断如果是会员，费用为2美元，非会员，为10美元。现在设置了非会员，却打印出了2美元，显然出错了。
```javascript
var isMember = false;
console.log("当前费用" + isMember ? "$2.00" : "$10.00");
```
出错的原因是？号的优先级比＋号低，所以实际运行的语句是
```javascript
"当前费用false" ? "$2.00" : "$10.00");
```
在js中，字符串为真，所以打印出$2.00。
不是`false, 0, undefined, NaN, "" or null`，js都认为是`true`