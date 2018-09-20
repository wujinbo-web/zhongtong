$(function(){



  
    /*轮播图*/
    (function(){
      //获取滑动的跟元素
      var loop_time=2500;
      var $box=$("#banner ul")[0];
      var $box2=$("#banner ul");
      var $boxChild=$("#banner li");
      //判断图片长度决定是否需要轮播
      var len=$("#banner li").length;
      if( len > 1 ){
        //获取子元素的宽度
        var itemWidth
        //首尾各添加一个元素用于无缝轮播
        $box2.append($boxChild.eq(0).clone(true));
        $box2.prepend($boxChild.eq(len-1).clone(true));

        //初始化尺寸位置
        function resizeChange(){
          itemWidth=$boxChild.width();
          $box.style.transform = `translate(${itemWidth * -1}px,0)`;
        }
        resizeChange();
        //监控屏幕尺寸是否发生变化
        window.addEventListener("resize",resizeChange);
        //参数初始化
        var x=0;  //初始x的位置
        var dir=""; //判断滚动的方向
        var page=1;
        var timer=null;

        //翻页
        function fnscroll(page) {
            x = itemWidth * -1 * page;
            $box.style.transform = `translate(${x}px,0)`;
        }

        //执行无缝的跳转
        function cricleScroll(page2){
          if (page2 == 0) {
              page = len;
              $box.addEventListener("transitionend",function(){
                $box.style.transition="none";
                fnscroll (page);
              });
          } else if (page2 == len+1 ) {
              page = 1;
              $box.addEventListener("transitionend",function(){
                $box.style.transition="none";
                fnscroll (page);
              });
          }
        }

        //定时器执行函数
        function setTimeScroll(){
          $box.style.transition="none";
          page++;
          $box.style.transition = `0.5s all ease`;
          fnscroll (page);
          cricleScroll(page);
        }

        //加入定时器
        timer=setInterval(setTimeScroll,loop_time);

        $box.addEventListener("touchstart",function(ev){
          clearInterval(timer);
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
                    $box.style.transition = `0.5s all ease`;
                    fnscroll(page);
                } else if ( clientDisX < ( itemWidth / -5 ) ) {
                    page++;
                    $box.style.transition = `0.5s all ease`;
                    fnscroll(page);
                } else {
                    $box.style.transition = `0.5s all ease`;
                    fnscroll(page);
                }
            }
            cricleScroll(page);
            timer=setInterval(setTimeScroll,loop_time);
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
