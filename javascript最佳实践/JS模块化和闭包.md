# JS模块化和闭包
js最初作为一个在浏览器中运行的脚本语言，设计的目标是用来给html增加交互行为，早期的网站都是在服务器端生成并返回给浏览器，js也只对单独的一个html进行操作，所以模块化并没有在早期的JS中得到很好的考虑，随着浏览器js引擎越发的快速，现在已经有很多前端框架，并不依赖与服务器生成html，而是自己直接通过js来生成，最典型的例子就是我们常听到的webapp。现在所有的js库都包装的非常好了，我们今天看看一些js模块化的基础知识吧。
## 名称空间namespace
在js中如何实现命名空间，我们来看一个例子。
```html
<!DOCTYPE html>  
<html>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <body>

    <button id="mybtn" onclick="display();">点我加载列表</button>
    <h1>我想要不死族的英雄</h1>
    <ul id="mylist"></ul>   
    
    <script type="text/javascript" src="./namespacejs1.js"></script>    
    <script type="text/javascript" src="./namespacejs2.js"></script>    
    </body>  
</html>

```
我们先定义一个html文件。点击里面的按钮，显示魔兽争霸的军队。响应按钮的代码分别定义在namespacejs1.js和namespacejs2.js两个文件中。
这是namespacejs1.js
```javascript
var list = ['死亡骑士','巫妖','恐惧魔王'];
function display(){
    var mylist = document.getElementById("mylist"), 
    fragment = document.createDocumentFragment(), 
    element; 
    for(var i = 0, x = list.length; i<x; i++){ 
        element = document.createElement("li"); 
        element.appendChild( document.createTextNode( list[i]) ); 
        fragment.appendChild(element); 
    }
    console.log(importGlobalVariable);
    mylist.appendChild(fragment);
}
```
这是namespacejs2.js
```javascript
var list = ['圣骑士','大法师','山丘之王'];
```
当我们点击按钮的时候，会显示什么东东呢。我们期望显示不死族的英雄（namespacejs1.js中的list），但是这里会显示人类的英雄（namespacejs2.js中的list）。显然，我们想要的数据被覆盖了。怎么样才能解决这个问题呢？我们来加上**名称空间**吧。看看改进后的namespacejs1.js。
```javascript
var namespace1 = {
    list : ['死亡骑士','巫妖','恐惧魔王'],
    display : function display(){
        var mylist = document.getElementById("mylist"), 
        fragment = document.createDocumentFragment(), 
        element; 

        for(var i = 0, x = list.length; i<x; i++){ 
            element = document.createElement("li"); 
            element.appendChild( document.createTextNode( this.list[i]) ); 
            fragment.appendChild(element); 
        }

        mylist.appendChild(fragment);
    }
};
```
这时候点击按钮会没有用，需要稍微改动一下
```html
<button id="mybtn" onclick="namespace1.display();">点我加载列表</button>
```
可以看到display在namespace1的名称空间下面了。问题已经圆满解决。但是如果我们想扩展namespace1的功能怎么办呢，难道只能修改namespace1.js的源文件吗，还有list很不安全啊，谁都可以改动它，如何把它变成私有变量呢？

## js的封装
在js中并没有私有公有的直接支持，但是不代表js语言不能完成这个。我们看一下如何隐藏list。
```javascript
var namespace1 = (function(){
    
    var importGlobalVariable = gv;
    var list = ['死亡骑士','巫妖','恐惧魔王'];

    function display(){
        var mylist = document.getElementById("mylist"), 
        fragment = document.createDocumentFragment(), 
        element; 
        for(var i = 0, x = list.length; i<x; i++){ 
            element = document.createElement("li"); 
            element.appendChild( document.createTextNode( list[i]) ); 
            fragment.appendChild(element); 
        }
        mylist.appendChild(fragment);
    }
    return {
        display:display
    };
})();
```
这段代码返回了一个对象，在这个对象中我们只能访问display方法,是不是很牛逼呢，这样就解决隐藏问题。

## js模块的扩展
我们知道js的继承是用原型链来实现的，但是这里要讨论的是模块的扩展，所以这边不会说道继承的问题。如何扩展namespace1的功能呢。我么看一下下面的代码。
```javascript
var namespace1 = (function(n1){
    
    var listArmy = ['4个蜘蛛','2个食尸鬼','2个冰龙']

    n1.displayArmy = function(){
        n1.display();
        var mylist = document.getElementById("mylist"), 
            fragment = document.createDocumentFragment(), 
            element; 
        for(var i = 0, x = listArmy.length; i<x; i++){ 
            element = document.createElement("li"); 
            element.appendChild( document.createTextNode( listArmy[i]) ); 
            fragment.appendChild(element); 
        }
        mylist.appendChild(fragment);
    }

    return n1;
})(namespace1);
```
这段代码我们用来增加一个displayArmy的方法，用来显示不死族军队，也就是listArmy的数据吧。
我们看到上面的代码把namespace1作为参数传入到一个**立刻调用函数**中，这样在里面给它增加一个函数。有没有感觉js很强大啊。

## 闭包（Closures）
如果已经习惯了C，C++，C#或者Java，那么上面的实现简直匪夷所思，感觉变量的作用域和生命周期都很奇怪。那么我们说说js中的一个重要概念闭包吧。

### 定义
> Closures are functions that refer to independent (free) variables.
这里就不翻译了，因为翻译过来实在是很奇怪，比如，闭包是那些引用了独立变量的函数。那么按照定义是否可以认为函数就是闭包呢，为了搞清楚闭包的概念，我们需要了解函数对象，变量生命周期，和嵌套的作用域三个概念。

### 函数对象
什么是函数对象呢，在C语言中和C++语言中，可以想函数那样用()去调用，看起来和函数一样的对象就叫函数对象。比如在C语言中：
```c
typedef void (*func_t)(int); //定义函数指针
//定义一个函数
void f(int n){
    printf("node(?)=%d\n",n);
}
int main(){
    func_t pf = f;
    f(1);
}
```
可以看到f很像一个函数吧，但是呢，其实它只是一个函数指针而已。在C++语言中，我们也看一个例子。
```cpp
class Foreach
{
private:
    struct node * myList;

public:
    Foreach(){
    }
    ~Foreach(){}
    void operator()(){
        //做点有意义的事情吧
    }
};
int main(){
    Foreach *foreach = new Foreach();
    (*foreach)();
}
```
可以看到foreach对象也很像函数。
我们在看一下js中的函数对象吧。
```javascript
var f = function(){}；
f();
```
看看，是不是很简单。

### 嵌套的作用域
我们已经看到js的函数对象的定义已经很方便了，那么还有什么和传统语言不一样的地方呢？
我们看一下这个代码。
```javascript
var x = 10;
function f(){
    y=15;
    function g(){
        var z=25;
        alert(x+y+z);
    }
    g();
}
f();//显示50
```
这段代码在C语言中没法实现，原因是C语言的变量无法访问当前作用域外的变量。也就是说函数g里面访问不了y，函数f也访问不了x。但是js却能做到。我们看一下这样有什么强大的地方。
```c
#include <stdio.h>
#include <stdlib.h>

struct node{
    struct node *next;
    int val;
};

// 函数指针，JS中的函数对象
typedef void (*func_t)(int); 

void foreach(struct node *list, func_t func){
    while(list){
        func(list->val);
        list = list->next;
    }
}
void f(int n){
    printf("node(?)=%d\n",n);
}
int main(){
    func_t pf = f;
    f(1);
    
    // bool b = false;
    // b = true;
    // b = "zifuchuan";

    struct node * list = 0, *l;
    int i;

    for(i=0; i<4; i++){
        l = malloc(sizeof(struct node));
        l->val = i;
        l->next = list;
        list = l;
    }

    i=0;l=list;
    //这个循环可以打印出index，也就是i，如下是打印结果
    //node(0) = 3
    //node(1) = 2
    //node(2) = 1
    //node(3) = 0
    while(l){
        printf("node(%d) = %d\n", i++, l->val);
        l = l->next;
    }

    //foreach里面再调用函数f，就不能访问i了，如下是打印结果
    //node(?)=3
    //node(?)=2
    //node(?)=1
    //node(?)=0
    foreach(list,f);
}
```
我们看到C语言的高阶函数（函数调用函数）是没法访问外部变量的。那么js写这段代码怎么弄呢？
```javascript
function foreach(list, func){
    while(list){
        func(list.val);
        list=list.next;
    }
}

var i = 0;
//这里可以使用变量i
foreach(list,function(n){
    console.log("node("+ i +") = " +n);
    i++;
});
```
我们发现js的变量作用域比C语言要牛逼一点吧。

### 生命周期
下面再看看js闭包的更牛逼的地方吧。
```javascript
function extent(){
    var n=0;
    return function (){
        n++;
        console.log("n="+n);
    }
}
f = extent();
f();//=>n=1
f();//=>n=2
```
这里，当extent函数执行完毕后，n变量应该挂了才对，但是，我们通过结果看到，n变量还活的好好的呢。

### 总结
属于外部作用域的局部变量，被函数对象给“封闭”在里面了。闭包（“closure”）这个词原本就是封闭的意思。被封闭起来的变量的寿命，与封闭它的函数对象的寿命相等。也就是说，当封闭这个变量的函数对象不再被访问，被垃圾回收器回收掉时，这个变量才挂。
现在大家明白闭包的定义了吧。在函数对象中，将局部变量封闭起来的结构被叫做闭包。因此，C语言的函数指针并不是闭包，JavaScript中的函数对象才是闭包。另外C++等传统面向对象语言，也加入了对函数式编程的支持，其中一方面就是Lambda表达式，也有闭包的概念。

## 全局变量的导入
现在大家理解闭包的概念了，我们看看全局变量导入的问题。因为闭包中内部变量会一直持有外部变量，所以我们最好把外部变量当做参数传递给我们要使用的内部函数，这样会节省内存和查找变量的时间。因为找到一个外部变量，需要从内部往外部一层层的查找，很费时间（对解析器来说）。另外，一起开发代码的人也会很迷惑这个变量到底在那里定义的，容易出错，我们来看一个例子。
```javascript
var globalVariable = "我是外层变量,从disply函数找到我需要很久很久";

var namespace1 = (function(gv){
    
    var importGlobalVariable = gv;
    var list = ['死亡骑士','巫妖','恐惧魔王'];

    function display(){
        var mylist = document.getElementById("mylist"), 
        fragment = document.createDocumentFragment(), 
        element; 
        for(var i = 0, x = list.length; i<x; i++){ 
            element = document.createElement("li"); 
            element.appendChild( document.createTextNode( list[i]) ); 
            fragment.appendChild(element); 
        }
        console.log(importGlobalVariable);
        mylist.appendChild(fragment);
    }
    return {
        display:display
    };
})(globalVariable);
```
这个例子把globalVariable当成参数传入，这样他就在匿名function函数的作用域里面了。
在看一个图，会更直观
[嵌套作用域的查找](https://raw.githubusercontent.com/benhaben/javascript-best-practice/master/javascript%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/%E5%B5%8C%E5%A5%97%E4%BD%9C%E7%94%A8%E5%9F%9F.png)
