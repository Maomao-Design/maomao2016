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