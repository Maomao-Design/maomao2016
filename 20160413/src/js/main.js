;(function () {
    D(function() {
        
       
        
        
       
            
       D("#preloader").remove();
            
       
        DM(".nav li").hover(function(){
            DM(this).find(".nav-children").show()
        },
        function(){
            DM(this).find(".nav-children").fadeOut()
        });
       
       
       
       DM(".fullSlide").hover(function(){
            DM(this).find(".prev,.next").stop(true, true).fadeTo("show", 0.5)
        },
        function(){
            DM(this).find(".prev,.next").fadeOut()
        });
        
        DM(".fullSlide").slide({
            titCell: ".hd ul",
            mainCell: ".bd ul",
            effect: "fold",
            autoPlay: true,
            autoPage: true,
            trigger: "click",
            startFun: function(i) {
                var curLi = DM(".fullSlide .bd li").eq(i);
                if ( !! curLi.attr("_src")) {
                    curLi.css("background-image", curLi.attr("_src")).removeAttr("_src")
                }
            }
        });

        
        
        Log(new Date())
    })
})()