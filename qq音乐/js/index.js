/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 18:21:28
 * @LastEditTime: 2019-08-13 09:37:06
 * @LastEditors: Please set LastEditors
 */
let music = $("#music");// 音乐的audio
let musicBtn = $("#musicBtn");
let main = $(".main")
let wrapper = $(".wrapper")
let header = $(".header")
let footer = $(".footer")
let lineBg = $(".lineBg")
let line = $(".line")
// let end = $("#end");
let timer;
// 1. 让当前页面的main自适应；
//  1) : 获取屏幕的可视窗口的总高度；
//  2) ： 总高度-header的高度-footer的高度
function computedMain() {
    // px;
    // console.log(main)
    let winH= document.documentElement.clientHeight;
    let headerH = header[0].offsetHeight;
    let footerH = footer[0].offsetHeight;
    console.log(headerH,footerH);
    let val = parseFloat(document.documentElement.style.fontSize);// 转数字；
    let curH = (winH-headerH-footerH)/val-0.6+"rem";
    main.css("height",curH);
    // console.log(main)
}
computedMain();
// 当页面的窗口大小发生改变时，会触发这个方法；
window.addEventListener("resize",computedMain);

// 2. 请求数据；
// $.ajax({
//     url:"json/lyric.json",
//     type:"get",
//     async:false,
//     success:function (data) {
//         bindHtml(data.lyric)
//         // console.log(data.lyric)
//     }
// })
let data;
let xhr = new XMLHttpRequest;
xhr.open('get','../json/lyric.json',false);
xhr.onreadystatechange = function(){
    data = JSON.parse(xhr.responseText)
    // console.log(data)
}
xhr.send()
bindHtml(data.lyric)
 // 3.绑定数据
function bindHtml(data) {
    // console.log(data.lyric)
    data = data.replace(/&#(\d+);/g,function (res,a) {
        //console.log(res);
        // 第一个参数： 代表大正则捕获的内容；
        // 第二个参数： 代表小正则捕获的内容；
        //console.log(a);
        switch (a){
            case "32":
                return " ";
            case "40":
                return "(";
            case "41":
                return ")";
            case "45":
                return "-"
        }
        return res;// 如果a不是特殊的值；直接返回捕获的内容即可；
    });
    let ary =[];// 把获取到的值统一放到数组中；
    data.replace(/\[(\d+)&#58;(\d+)&#46;(?:\d+)\]([^&#]+)(?:&#10;)?/g,function(res,min,sec,val){
        // 将捕获的数据（分钟，秒，歌词）
       ary.push({
           min:min,
           sec:sec,
           val:val
       });
    });
    // 循环拼接数据；
    let  str = ``;
    for(let i=0;i<ary.length;i++){
        let cur = ary[i];
        str+=`<p data-min="${cur.min}" data-sec="${cur.sec}" >${cur.val}</p>`;
    }
    wrapper.html(str);
    // 播放音乐
    // console.log(wrapper)
    music[0].play();
    musicBtn.addClass("select");
    
    let zongtime = (parseInt(ary[ary.length-1].min * 60) + parseInt(ary[ary.length-1].sec))*1000
    console.log()
    musicBtn.tap(zongtime)
    end.innerHTML = `${ary[ary.length-1].min}:${ary[ary.length-1].sec}`
    let s = 0;
    let m = 0;
    timer = setInterval(function(){
        // console.log(1)
        m++
        m>=10?m:m = '0'+m
        m>=60?s++:s  
        m>=60?m = 0:m   
        start.innerHTML = `0${s}:${m}`
        let lingtime = (s * 60 + m)*1000
        let baitime = lingtime/zongtime
        let bigaaa = line[0].offsetWidth
        // console.log(line[0].offsetWidth)
        lineBg.css('width',baitime * bigaaa)
    },1000)
}
// 点击btn可以暂停音乐
// tap : zepto的绑定点击事件的方法；
musicBtn.tap(function (tims) {
    console.log(tims)
    // 如果音乐暂停，执行播放；
    if(music[0].paused){
        music[0].play();
        musicBtn.addClass("select");
        // let timer = setInterval()
        return;
    }
    // 暂停音乐；
    music[0].pause();
    musicBtn.removeClass("select");
    clearInterval(timer);
});

// musicBtn.onclick = function(){
//     console.log(1)
//     if(music[0].paused){
//         music[0].play();
//         musicBtn.addClass("select");
//         // timer = setInterval(function(){
//         //     start.innerHTML = ``
//         // },1000)
//         return;
//     }
//     // 暂停音乐；
//     music[0].pause();
//     musicBtn.removeClass("select");
//     clearInterval(timer);
// }

console.log(line[0].offsetWidth)





