 function imgBoxZhibao(){
    var   ImgBox = D(".fuwu-pic-wrap"),
	      ImgSpan =ImgBox.find("span"),
	      ImgDiv = D(".fuwu-pic-wrap div"),	  
		  speed = 600,//设置动画的运动时间
		  Tick = 4000+speed,//设置定时器的间隔时间
		  n=1,//设置张数计数器
		  whichCl ,//设置判断点击了哪一个按钮  
		  z=0;//设置当前动画计数器
		 
		  function Slider(){//动画函数
			  if(whichCl=="nextCl"){
				      n++; if(n>ImgDiv.length){n=1;}
			          z--; if(z<0){z=ImgDiv.length-1;}
				 }
			  if(whichCl=="prevCl"){ n--; if(n<1){n=ImgDiv.length;}}  
			 
			  ImgDiv.eq(z).stop().animate(
			       {right:-(1.1*ImgDiv.width())}, speed,
			        function(){
			                     if(whichCl=="nextCl"){ImgSpan.after(D(this));}
			                     if(whichCl=="prevCl"){ImgBox.append(D(this));}
			                     D(this).stop().animate({right:0}, speed);
			                   }) 
			  if(whichCl=="prevCl"){ z++; if(z>ImgDiv.length-1){z=0;}} 
			  ImgBox.stop().animate({right:100},speed,function(){D(this).stop().animate({right:0}, speed)})
			  ImgSpan.stop().animate({left:395},speed,function(){D(this).stop().animate({left:295},speed)})
			  }   
		   next_cl = function(){whichCl="nextCl";Slider();};//向右点击事件启动动画函数
		//   BtnPrve.click(prev_cl = function(){whichCl="prevCl";Slider();});//向左点击事件启动动画函数	
		//   Btn.hover(function(){clearTimeout(autoTime)},function(){autoTime = setInterval(next_cl,Tick);})//当鼠标进入点击按钮时对定时器进行控制		
		  autoTime = setInterval(next_cl,Tick);	//模拟向右点击事件定时启动动画函数，也可以使用  prev_cl向左启动动画函数  
     
 }
 
 // 打字特效
 function  typewriter(d){
     if(d.length > 0){
				var c = d.html(),
				b = 0;
			d.html("");
			var e = setInterval(function() {
				var f = c.substr(b, 1);
				if (f == "<") {
					b = c.indexOf(">", b) + 1
				} else {
					b++
				}
				d.html(c.substring(0, b) + (b & 1 ? "_" : ""));
				if (b >= c.length) {
					clearInterval(e);
                    Log(d.html())
				}
			}, 175)
            
            }
 }

// 获取模块数控
function getIdDate(md,mo,id,call){
    var query = 'list action=module module='+ mo +' id='+ id;
     getDataCom(md,query,function(data){
        call(data);
    });

}

function getCatIdList(md,mo,catid,call){
    var query = 'list action=module module='+ mo +' catid='+ catid +' order=updatetime num=50';
    getDataCom(md,query,function(data){
        call(data);
    });
}

function getDataCom(md,query,call){
    
    var _url = siteUrl+'index.php?c=api&m=data2&format=jsonp&auth='+md+'&param='+ query;

    D.ajax(
        {
            type:'get',
            url : _url,
            dataType : 'jsonp',
            success  : function(data) {
                 call(data);
            },
            error : function(data) {
                call(false);
            }
        }
    );
}

function  loaderHtml(ele){
        
        var str = '<div class="loader">'+
            '<div class="loader-inner ball-clip-rotate-multiple">'+
            '<div></div>'+
            '<div></div>'+
            '</div>'+
        '</div>';
        
        ele.html(str);
        
}



/**
 * cai狗
 * 
 */
function caigouNavOn(){
	
	var san = D("#caigou-tab-sanjiao");
	if(san.length < 1){
		return;
	}
	san.show();
	var	box = D(".caigou-top-tab"),
		onDiv = D(".caigou-tab-nav-on"),
		onDivW = onDiv.attr("data-w"),
		boxW = box.width();
	
	san.css({
		left: (boxW*onDivW/4)-30
	});
}

/**
 * 弹性运动 
 * 
 */

function fiexible(obj,json,way,fn){
   /*** 按坐标运动  ***/
   if(way === true){
      //检测left 与 top 是否都有值
      if(typeof json.left !='undefined' && typeof json.top !='undefined'){
         var x = Math.floor(json.left + json.width/2);  //计算X轴中心点
         var y = Math.floor(json.top + json.height/2);  //计算Y轴中心点
         //设置初始的left 和 top 值 并让元素显示
         obj.style.display = 'block';
         obj.style.left = x-(parseInt(getStyle(obj,'width'))/2) + 'px';  
         obj.style.top = y-(parseInt(getStyle(obj,'height'))/2) + 'px';
         //清除margin
         obj.style.margin = 0 + 'px';
      }
   }
   var newJson = {}
   /*** 往参数中添加位置属性 用于设置元素的运动初始点 ***/
   for(var arg in json){
      newJson[arg] = [json[arg], parseInt(getStyle(obj,arg))]
      //newJson[arg] = [运动目标点,运动初始点];
   }
   var oSite = {};
   /** 添加单独的属性值  **/
   for(var attr in newJson){
      oSite[attr] ={iSpeed:0,curSite:newJson[attr][1],bStop:false};
      //oSite[attr] = {运动初始速度,运动当前值,判断是否完成运动依据};
   }
   /** 运动开始前关闭本身的定时器 **/
   clearInterval(obj.t);
   obj.t = setInterval(function(){
      /*** 循环运动属性  ***/
      for (var attr in newJson) {
         /** 运动状态  **/
         oSite[attr].bStop = false;
         // iCur 更新运动元素当前的属性值
          if(attr=='opacity'){   //对透明度单独处理
              var iCur = parseInt(parseFloat(getStyle(obj, attr))*100);
         }else{             //普通样式
              var iCur = parseInt(getStyle(obj, attr));
         }
         oSite[attr].iSpeed += (newJson[attr][0] - iCur) /5;       //加速   
         oSite[attr].iSpeed *= 0.75;                         //磨擦
         oSite[attr].curSite += oSite[attr].iSpeed;          //更新运动的当前位置
         //运动停止条件 速度绝对值小于1 并且 当前值与目标值的差值的绝对值小于一
         if (Math.abs(oSite[attr].iSpeed) < 1 && Math.abs(iCur - newJson[attr][0]) < 1) {
            
            //设置样式，对透明度单独处理
               if(attr=='opacity'){
                   obj.style.filter='alpha(opacity='+newJson[attr][0]+')';
               obj.style.opacity=newJson[attr][0]/100;
            }else{
               obj.style[attr] = newJson[attr][0] + 'px';  //设置到目标点
            }
            
            oSite[attr].bStop = true;              //设置当前属性运动是否完成
         }
         else {
            //更新运动对象的属性值
            if(attr=='opacity'){
                   obj.style.filter='alpha(opacity='+oSite[attr].curSite+')';
               obj.style.opacity=oSite[attr].curSite/100;
            }else{
               obj.style[attr] = oSite[attr].curSite + 'px';   
            }
         }
      }
      // 校验定时器停止
      if(checkStop(oSite)){
         clearInterval(obj.t);
         if(fn){
            fn.call(obj)
         }
      }
   }, 30);
   /** 校验运动是否完成 **/
   function checkStop(oSite){
      for(var i in oSite){
         if(oSite[i].bStop === false){
            return oSite[i].bStop;
         }
      }
      return true;
   }
}



function aboutSwiper(){
     var swiper = new Swiper('.about-2-banner', {
        pagination: '.swiper-pagination',
        // paginationClickable: true,
        autoplay: 3000,
        spaceBetween: 30,
        effect: 'fade'
    });

    var swiper = new Swiper('.about-3-banner', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay: 3000,
        spaceBetween: 30,
        effect: 'fade'
    });

    var swiper = new Swiper('.about-4-banner', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay: 3000,
        spaceBetween: 30,
        effect: 'fade'
    });
}