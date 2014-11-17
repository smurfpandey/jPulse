!function ( $ ) {

	var pluginName = "jPulse",
		defaults = {
			color: "#993175",
			size: 120,
			speed: 2000,
			interval: 400,
			left: 0,
			top: 0,
			zIndex: -1
		};

	// The actual plugin constructor
	function jPulse( element, options ) {
		this.element = $( element );

		// jQuery has an extend method that merges the
		// contents of two or more objects, storing the
		// result in the first object. The first object
		// is generally empty because we don't want to alter
		// the default options for future instances of the plugin
		// this.options = $.extend({}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;
		this.intervalPulsate;
		this.enabled = false;

		this.options = $.extend(true, {}, this._defaults, this.options | {}, options);
	}

	jPulse.prototype.enable = function ( options ) {

		if ( this.enabled ) {
			return;
		}

		this.options = $.extend(true, {}, this._defaults, this.options, options);

		// Place initialization logic here
		// You already have access to the DOM element and
		// the options via the instance, e.g. this.element
		// and this.options
		var cColor = this.options.color;
		var cSize = this.options.size;
		var cSpeed = this.options.speed;
		var cInterval = this.options.interval;
		var cLeft = this.options.left;
		var cTop = this.options.top;
		var zIndex = this.options.zIndex;

		var cVisible = "visible";
		var $element = this.element;

		this.intervalPulsate = setInterval(function () {
			var elePosition = $element.position();
			var eleHeight = $element.height();
			var eleWidth = $element.width();
			var circleCSS = "position:absolute;top:"
				+ ( elePosition.top + ( eleHeight / 2 ) + cTop )
				+ "px;left:" + ( elePosition.left + ( eleWidth / 2 ) + cLeft )
				+ "px;width:0px;height:0px;background:"
				+ cColor + ";z-index:"
				+ zIndex
				+ ";-webkit-border-radius:1px;-moz-border-radius:1px;border-radius:1px;";

			var circleDOM = $( "<div style='" + circleCSS + "'></div>" );
			$element.parent().append( circleDOM );

			if ( zIndex > 0 ) {
				//Our pulsating div is on top
				//Let's propagate click event to actual element
				circleDOM.off( "click" ).on( "click", function ( e ) {
					var bottomEvent = new $.Event( "click" );

					bottomEvent.pageX = e.pageX;
					bottomEvent.pageY = e.pageY;

					$element.trigger( bottomEvent );
				});
			}

			$( circleDOM ).animate({
				opacity: 0.0,
				top: "-=" + ( cSize / 2 ) + "",
				left: "-=" + ( cSize / 2 ) + "",
				width: "+=" + cSize + "",
				height: "+=" + cSize + "",
				borderRadius: "+=" + ( cSize / 2 ) + ""
			}, cSpeed, "swing", function () {
				$( this ).remove();
			});
		}, cInterval );

		this.enabled = true;
	};

	jPulse.prototype.disable = function () {
		if ( !this.enabled ) {
			return;
		}

		clearInterval( this.intervalPulsate );

		this.enabled = false;
	};

	$.fn.jPulse = function ( options ) {
		return this.each(function () {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data(
					this,
					"plugin_" + pluginName,
					new jPulse( this )
				);
			}

			var thisPlugin = $.data( this, "plugin_" + pluginName );

			if ( thisPlugin[ options ] ) {
				return thisPlugin[ options ].call( thisPlugin, Array.prototype.slice.call( arguments, 1 ) );
			} else if ( typeof options === "object" || !options ) {
				return thisPlugin[ "enable" ].call( thisPlugin, options );
			} else {
				$.error( "Method " + options + " does not exist in jPulse" );
			}
		});
	};
} ( jQuery );
