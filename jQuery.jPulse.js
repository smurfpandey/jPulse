(function ( $ ) {
    $.fn.jPulse = function( options ) {
        var settings = $.extend({
			color: "#993175",
            size: 120,
			speed: 2000,
			interval: 400,
			left: 0,
			top: 0
        }, options );
		var cColor = settings.color;
		var cSize = settings.size;
		var cSpeed = settings.speed;
		var cInterval = settings.interval;
		var cLeft = settings.left;
		var cTop = settings.top;
		var cElement = this;
		var cVisible = "visible";
		setInterval(function() {
			var zIndex = -1;
			console.log(zIndex);
			var elePosition = $(cElement).position();
			var eleHeight = $(cElement).height();
			var eleWidth = $(cElement).width();
			var circleCSS = "position:absolute;top:"+(elePosition.top+(eleHeight/2)+cTop)+"px;left:"+(elePosition.left+(eleWidth/2)+cLeft)+"px;width:0px;height:0px;background:"+cColor+";z-index:"+zIndex+";-webkit-border-radius:1px;-moz-border-radius:1px;border-radius:1px;";
			var circleDOM = $("<div style='"+circleCSS+"'></div>");
			$(cElement).parent().append(circleDOM);
			$(circleDOM).animate({
				opacity: 0.0,
				top: '-='+(cSize/2)+'',
				left: '-='+(cSize/2)+'',
				width: '+='+cSize+'',
				height: '+='+cSize+'',
				borderRadius: '+='+(cSize/2)+''
			}, cSpeed, 'swing', function() {
				$(this).remove();
			});
		}, cInterval);
    };
}(jQuery));