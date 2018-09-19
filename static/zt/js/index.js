$(function(){
    /*轮播图*/
    (function(){
      //判断图片是否需要轮播
      var len=$("#content .banner li").length;
      if( len > 1 ){
        //获取子元素的宽度
        var itemWidth
        //首尾各添加一个元素用于无缝轮播
        var $footItem=$("#content .banner ul li").eq(len-1).clone(true);
        var $headerItem=$("#content .banner ul li").eq(0).clone(true);
        $("#content .banner ul").append($headerItem);
        $("#content .banner ul").prepend($footItem);
        window.onresize=function (){      //设置rem尺寸
          itemWidth=$("#content .banner li").width();
          $("#content .banner ul")[0].style.transform = `translate(${itemWidth * -1}px,0)`;
        };
        window.onresize();
        //参数初始化
        var x=0;  //初始x的位置
        var dir=""; //判断滚动的方向
        var page=1;
        var $box=$("#content .banner ul")[0];
        //翻页
        function fnscroll (page) {
            x = itemWidth * -1 * page;
            $box.style.transform = `translate(${x}px,0)`;
        }
        $box.addEventListener("touchstart",function(ev){
          ev.preventDefault(); //阻止默认事件
          //清空动画
          $box.style.transition = "none";
          //复位位置
          fnscroll(page);
          var dir="";//方向
          var startX=ev.targetTouches[0].clientX;//点击初始的坐标
          var startY=ev.targetTouches[0].clientY;
          var disX=ev.targetTouches[0].clientX-x;//鼠标初次点击的位置距离原点的距离
          var clientDisX = 0;//从按下到松手的距离
          function fnMove(ev){  //手势移动函数
            //松手距离
            clientDisX = ev.targetTouches[0].clientX - startX;
            //判断方向锁定
            if(dir==""){
              if(Math.abs(clientDisX)>=5){
                  dir='x';
              }else if(Math.abs(ev.targetTouches[0].clientY-startY)>=5){
                  dir='y';
              }
            }else{
              if(dir=="x"){
                  ev.preventDefault();
                  x=ev.targetTouches[0].clientX-disX;
              }
              $box.style.transform=`translate(${x}px,0px)`;
            }
          }
          function fnEnd(ev){
            if (dir == "x") {
                if ( clientDisX > ( itemWidth / 5 ) ) {
                    page--;
                    console.log(page);
                    $box.style.transition = `0.5s all ease`;
                    fnscroll(page);
                } else if ( clientDisX < ( itemWidth / -5 ) ) {
                    page++;
                    console.log(page);
                    $box.style.transition = `0.5s all ease`;
                    fnscroll(page);
                } else {
                    $box.style.transition = `0.5s all ease`;
                    fnscroll(page);
                }
            }
            if (page == 0) {
                page = len;
            } else if (page == len+1 ) {
                page = 1;
            }
            $box.removeEventListener('touchmove',fnMove,false);
            $box.removeEventListener('touchend',fnEnd,false);
          }
          $box.addEventListener('touchmove',fnMove,false);
          $box.addEventListener('touchend',fnEnd,false);
        },false);
      }
    })();
    /*轮播图end*/
})
