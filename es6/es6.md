1.var let const的区别：
·var声明变量可以重复声明，let不可以重复声明；
·var是不受限于块级的，let是受限于块级的；
·可以在var声明的变量前面访问，不可以在let声明变量之前访问；
·var会与window相映射（挂一个属性），而let不与window相映射；
·const声明之后必须赋值，且不可重新赋值，否则报错；
·const和let一样不可重复声明，支持块级作用域，在声明变量前面访问变量会报错，且不与window相映射。

2.解构赋值：
·数组解构：

let [a,b,c] = [1,2,3];   //a=1,b=2,c=3;
let [a,[b],c] = [1,[2,3],4]; //嵌套数组解构a=1,b=[2,3],c=4;
let [a,...b] = [1,2,3];   //数组拆分a=1,b=[2,3];
let [a,,b] = [1,2,3];    //不连续解构a=1,b=3;
let [a,b] = [1,2,3];    //不完全解构a=1,b=2;
·对象解构：

let {a,b} = {a:'111',b:'222'};   //a='111',b='2222'

let a;
(a = {a:'1111'});   //以声明变量的方式解构 a='111'

let [a,b,c,d] = 'nice';  //字符串解构 a='n',b='i',c='c',d='e';

let obj = {a:'111',b:{c:'222'}};
let {a,b:{c}} = obj;   //嵌套解构a='111',c='222'
·函数参数的定义：
传参的时候不用在意参数顺序问题，只需要参数名和值设置好即可

function example(name,age,address){
    console.log(name + age + address);
}
example({address:"这里",name:"名字",age:40});
·交换变量：

let [a,b] = [1,2];
[a,b] = [b,a];
console.log(a,b);
·函数参数设置默认值：

function example({name="老王",age=40,address="这里"}={}){
    console.log(name,age,address);
}
example();  //老王 40 这里
3.forEach、for in、for of三者区别：
·forEach更多用来遍历数组；
·for in一般用来遍历数组或者对象和JSON，获得的是对象的key或数组、字符串的下标；
·for of常用于遍历数组、对象，获得的是对象、数组的值；

let a = [1,2,3,4];
for (let i in a){
    console.log(i);   //0,1,2,3  (数组下标)
}

for(let i of a){
    console.log(i);   //1,2,3,4  (数组元素值)
}

a.forEach((item)=>{
    console.log(item);   //1,2,3,4
});
4.箭头函数注意的地方：
<1>用了箭头函数，箭头函数的this为父作用域的this，不是调用时的this

let person= {
    name: "老王",
    callName:function(){  //callName为function
        (()=>{            //function里面包含一个立即执行的箭头函数
            console.log(this.name);   //老王
        })();
    }
};
person.callName();
上面的例子callName为function，他的this为调用它的对象也就是person。而callName内部的箭头函数this指向为父作用域的this，所以this.name能够取得值。
我们再来看下面的例子：

let person= {
    name: "老王",
    callName:()=>{  //callName为function
        (()=>{            //function里面包含一个立即执行的箭头函数
            console.log(this.name);   //undefined
        })();
    }
};
person.callName();
这个例子的callName为箭头函数，所以此时它的this指向了它的父作用域也就是window（本来指向调用它的对象）。然后callName中的箭头函数也指向它的父作用于，也就是window，所以访问不了person的name属性。

<2>箭头函数不能作为构造函数，不能使用new：

var Person = (name)=>{
  this.name =  name; 
};
var p = new Person();  //错误
由上面就可以知道this指向的是父作用域，不是指向调用时的对象，所以使用箭头函数并不能产生对应的实例。（感觉说的不够严谨，大佬有好的说法欢迎评论我改正）

<3>箭头函数没有arguments、call、callee：
箭头函数本身没有arguments，如果箭头函数在一个function内部，它会将外部函数的arguments拿过来使用。箭头函数接收不定参数可以用rest参数：

let B = (b)=>{
  console.log(arguments);
}
B(2,92,32,32);   // Uncaught ReferenceError: arguments is not defined

let C = (...c) => {
  console.log(c);
}
C(3,82,32,11323);  // [3, 82, 32, 11323]
<4>箭头函数不能作为Generator函数，不能使用yield关键字;
<5>箭头函数没有原型属性：

var a = ()=>{
  return 1;
}

function b(){
  return 2;
}

console.log(a.prototype);  // undefined
console.log(b.prototype);   // {constructor: ƒ}