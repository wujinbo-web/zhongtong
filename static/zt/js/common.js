  //引入 Promise 的 fallback 支持 (部分安卓手机不支持 Promise)
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
    }, false);
  }

  if(!window.Promise) {
    document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
  }
  // //设置跟字体大小
   window.onresize=function (){      //设置rem尺寸
     document.documentElement.style.fontSize=document.documentElement.clientWidth/3.75+'px';
   };
  window.addEventListener("resize",function(){
    document.documentElement.style.fontSize=document.documentElement.clientWidth/3.75+'px';
  });
  window.onresize();
