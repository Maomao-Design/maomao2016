DM(document).ready(function() {
	var revapi;

	DM(".fullwidthbanner ul , .fullscreenbanner ul").removeClass('hide');

	if(DM(".fullwidthbanner").length > 0) {

		// Default Thumbs [small]
		var thumbWidth 			= 100,
			thumbHeight 		= 50,
			hideThumbs			= 200,
			navigationType		= "bullet",
			navigationArrows	= "solo",
			navigationVOffset	= 10;

		// Shadow
		_shadow = DM(".fullwidthbanner").attr('data-shadow') || 0;

		// Small Thumbnails
		if(DM(".fullwidthbanner").hasClass('thumb-small')) {
			var navigationType 		= "thumb";
		}
		
		// Large Thumbnails
		if(DM(".fullwidthbanner").hasClass('thumb-large')) {
			var navigationType 		= "thumb";
				thumbWidth 			= 195,
				thumbHeight 		= 95,
				hideThumbs			= 0,
				navigationArrows	= "solo",
				navigationVOffset	= -94;

				// Hide thumbs on mobile - Avoid gaps
				/**
				if(DM(window).width() < 800) {
					setTimeout(function() {
						var navigationVOffset = 10;
						DM("div.tp-thumbs").addClass('hidden');
					}, 100);
				}
				**/
		}

		// Init Revolution Slider
		revapi = DM('.fullwidthbanner').revolution({
			dottedOverlay:"none",
			delay:9000,
			startwidth:1170,
			startheight: DM(".fullwidthbanner").attr('data-height') || 500,
			hideThumbs:hideThumbs,

			thumbWidth:thumbWidth,
			thumbHeight:thumbHeight,
			thumbAmount: parseInt(DM(".fullwidthbanner ul li").length) || 2,

			navigationType:navigationType,
			navigationArrows:navigationArrows,
			navigationStyle:DM('.fullwidthbanner').attr('data-navigationStyle') || "round", // round,square,navbar,round-old,square-old,navbar-old (see docu - choose between 50+ different item)

			touchenabled:"on",
			onHoverStop:"on",

			navigationHAlign:"right",
			navigationVAlign:"bottom",
			navigationHOffset:0,
			navigationVOffset:navigationVOffset,

			soloArrowLeftHalign:"left",
			soloArrowLeftValign:"center",
			soloArrowLeftHOffset:20,
			soloArrowLeftVOffset:0,

			soloArrowRightHalign:"right",
			soloArrowRightValign:"center",
			soloArrowRightHOffset:20,
			soloArrowRightVOffset:0,

			parallax:"mouse",
			parallaxBgFreeze:"on",
			parallaxLevels:[7,4,3,2,5,4,3,2,1,0],

			shadow: parseInt(_shadow),
			fullWidth:"on",
			fullScreen:"off",

			stopLoop:"off",
			stopAfterLoops:-1,
			stopAtSlide:-1,

			spinner:"spinner0",
			shuffle:"off",

			autoHeight:"off",
			forceFullWidth:"off",

			hideThumbsOnMobile:"off",
			hideBulletsOnMobile:"on",
			hideArrowsOnMobile:"on",
			hideThumbsUnderResolution:0,

			hideSliderAtLimit:0,
			hideCaptionAtLimit:768,
			hideAllCaptionAtLilmit:0,
			startWithSlide:0,
			fullScreenOffsetContainer: ""
		});

	}

});	