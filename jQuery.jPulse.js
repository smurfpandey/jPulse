(function ($) {

    var intervalPulsate;
    var $element;
    var defaults = {
        color: "#993175",
        size: 120,
        speed: 2000,
        interval: 400,
        left: 0,
        top: 0
    };

    var cColor;
    var cSize;
    var cSpeed;
    var cInterval;
    var cLeft;
    var cTop;
    var zIndex;
    var cVisible;

    var pulsateElement = function (o) {

    };

    var methods = {
        init: function (options) {

            var settings = $.extend(defaults, options);

            var cColor = settings.color;
            var cSize = settings.size;
            var cSpeed = settings.speed;
            var cInterval = settings.interval;
            var cLeft = settings.left;
            var cTop = settings.top;

            var cVisible = "visible";

            intervalPulsate = setInterval(function () {
                var zIndex = 2;
                var elePosition = $element.position();
                var eleHeight = $element.height();
                var eleWidth = $element.width();
                var circleCSS = "position:absolute;top:"
                    + (elePosition.top + (eleHeight / 2) + cTop)
                    + "px;left:" + (elePosition.left + (eleWidth / 2) + cLeft)
                    + "px;width:0px;height:0px;background:"
                    + cColor + ";z-index:"
                    + zIndex
                    + ";-webkit-border-radius:1px;-moz-border-radius:1px;border-radius:1px;";

                var circleDOM = $("<div style='" + circleCSS + "'></div>");
                $element.parent().append(circleDOM);

                if (zIndex > 0) {
                    //Our pulsating div is on top
                    //Let's propagate click event to actual element
                    circleDOM.off('click').on('click', function (e) {
                        var bottomEvent = new $.Event("click");

                        bottomEvent.pageX = e.pageX;
                        bottomEvent.pageY = e.pageY;

                        $element.trigger(bottomEvent);
                    });
                }

                $(circleDOM).animate({
                    opacity: 0.0,
                    top: '-=' + (cSize / 2) + '',
                    left: '-=' + (cSize / 2) + '',
                    width: '+=' + cSize + '',
                    height: '+=' + cSize + '',
                    borderRadius: '+=' + (cSize / 2) + ''
                }, cSpeed, 'swing', function () {
                    $(this).remove();
                });
            }, cInterval);
        },

        disable: function () {
            clearInterval(intervalPulsate);
        }
,
        enable: function () {
            
        }
    };

    $.fn.jPulse = function (methodOrOptions) {
        $element = $(this);

        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            // Default to "init"
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist in jPulse');
        }
    };
}(jQuery));