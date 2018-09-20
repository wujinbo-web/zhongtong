$(function(){





    /*导航滚动*/
    (function(){
      var wrapWidth=$("#top .nav .wrap").innerWidth(); //获取显示区域的宽度
      var ulWidth=0;  //获取导航的宽度
      var len=$("#top .nav ul li").length;
      var x=0;  //初始x的位置
      for(var i=0;i<len;i++){
        ulWidth+=$("#top .nav ul li").eq(i).innerWidth();
      }
      var threshold=wrapWidth-ulWidth;
      if(threshold<0){
        var $box=$("#top .nav ul");
        $box[0].addEventListener("touchstart",function(ev){
          $box.css({"transition":"none"});
          //按下就阻止默认事件
          ev.preventDefault();
          var dir="";
          var startX=ev.targetTouches[0].clientX;
          var startY=ev.targetTouches[0].clientY;
          var disX=ev.targetTouches[0].clientX-x;
          var clientDisX = 0;//从按下到松手的距离
          function fnMove(ev){
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
                if( x>0 ){
                   $box.css("left",x/3+"px");
                }else if( x< threshold ){
                  $box.css("left",((x-threshold)/3+threshold)+"px");
                }
                else{
                   $box.css("left",x+"px");
                }
              }
            }
            function fnEnd(ev){
                if(x>0){
                  x=0;
                }else if(x<threshold){
                  x=threshold;
                }
                $box.css({"transition":"0.3s all ease","left":x+"px"})
                $box[0].removeEventListener('touchmove',fnMove,false);
                $box[0].removeEventListener('touchend',fnEnd,false);
            }
            $box[0].addEventListener('touchmove',fnMove,false);
            $box[0].addEventListener('touchend',fnEnd,false);
        });
      }
    })();


    /*轮播图*/
    (function(){
      //获取滑动的跟元素
      var loop_time=2500;
      var $box=$("#content .banner ul")[0];
      var $box2=$("#content .banner ul");
      var $boxChild=$("#content .banner li");
      //判断图片长度决定是否需要轮播
      var len=$("#content .banner li").length;
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
