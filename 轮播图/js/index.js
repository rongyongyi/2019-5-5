// 1.请求数据
// 2.绑定数据
// 3.实现自动轮播
// 4.实现焦点切换
// 5.实现焦点点击切换
// 6.实现左右点击切换
let data;
let swiper = document.getElementById("swiper");
let outer = document.getElementById("outer");
let oLis = document.getElementsByTagName("li");
let xhr = new XMLHttpRequest();
xhr.open("get","banner.json",false);
xhr.onreadystatechange = ()=>{// 当实例上readyState发生变化，就会触发这个函数
    if(xhr.readyState===4&&/^2\d{2}/.test(xhr.status)){
        // 默认会接收JSON格式的字符串；
        data=JSON.parse(xhr.responseText)
    }
}
xhr.send();
// 2.绑定数据
let bindHtml=(data)=>{
    let str=``;
    // 循环数据，拼接str;最后放入swiper中；
    for(let i=0;i<data.length;i++){
        str+=`<div><img src="${data[i].img}" alt=""></div>`
    }
    swiper.innerHTML = str;
    // 获取到swiper的第一个子元素，然后深克隆一份，把其添加到swiper的末尾；
    let last = swiper.children[0].cloneNode(true);
    swiper.appendChild(last);
}
bindHtml(data);

// 3. 实现自动轮播
let step = 0;
function autoMove() {
    // 每次执行autoMove ,step++;每一张图片和step都是一一对应的；
    // step值是1，对应的图片是第2张；
    // step =4  显示5张；当图片显示第五张，等待图片图片展示2000ms之后，再次执行autoMove,瞬间让left为0；速度快，看不出切换的效果；
    step++;
    if(step===5){
        utils.css(swiper,"left",0);
        step=1;
    }
    changeTip(step);
    zfAnimate(swiper,{left:-800*step},300);// 动画的时间
}
// 3000ms轮播一张
let timer = setInterval(autoMove,2000);
// 4.鼠标滑入停止轮播，滑出继续轮播
outer.onmouseover=()=>{
    clearInterval(timer);
}
outer.onmouseout =()=>{
    timer = setInterval(autoMove,2000)
}
// 5.实现焦点跟随
// 通过step和li的下标进行对比，相等的加上class;
let changeTip=(n)=>{
    for(let i=0;i<oLis.length;i++){// i 最大值3；
        if(n===i){
            oLis[i].className="select"
        }else{
            oLis[i].className="";
        }
    }
    // 当step=4时，显示第五张，那么让对应的第一个li有select；
    if(n==4){
        oLis[0].className="select";
    }
}
// 6.点击焦点切换轮播
for(let i=0;i<oLis.length;i++){
    oLis[i].onclick = function () {
        // 点击li；根据li的索引，设置swiper的left值；
        zfAnimate(swiper,{left:-800*i},300);
        changeTip(i);
        // 由于点击到对应的第几张，同时需要改变step的值；
        step=i;
    }
}
// 7.点击向右、点击向左；
right.onclick=()=>{
    autoMove();
}
left.onclick=()=>{
    step--;
    // 当显示第一张时，点击向左；需要将图片迅速设置成最后一张；并且让step=3;
    // step===-1时，说明此时是在第一张图片点击的向左；先跳到最后一张，再向第四张实行动画；
    if(step===-1){
        utils.css(swiper,"left",-3200);
        step=3;
    }
    zfAnimate(swiper,{left:-800*step},300);
    changeTip(step);
}

