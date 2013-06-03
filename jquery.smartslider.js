/*
* smartSlider v2.2 - (c) Ralf Hortt, freely distributable under the terms of the MIT license.
* horttcore.de
*/
jQuery.fn.smartSlider = function( args ) {

	var defaults = {
		closedClass : 'closed',
		closedContainerClass : 'container-closed',
		closedText : false,
		openedClass : 'opened',
		openedContainerClass : 'container-opened',
		openedText : false,
		scrollTo : false,
		scrollSpeed: 'slow',
		speed : 'fast',
		trigger : 'click',
		targetAttribute : 'href'
	};

	var options = jQuery.extend(defaults, args);

	return this.each(function() {
		// Cache the element
		var obj = jQuery(this);

		// Cache target Element
		var target = jQuery(obj.attr(options.targetAttribute));

		// Hide target Element
		if ( !obj.hasClass(options.openedClass) )
		{
			target.hide();
			obj.addClass(options.closedClass);
			target.addClass(options.closedClass);

			if ( false !== options.closedText )
				obj.text( options.closedText );
		}

		// Bind toggle
		obj.bind(options.trigger,function(){

			// Toggle
			target.slideToggle(options.speed);
			target.trigger("slider.toggled");

			// Add CSS Classes for styling 'open'
			if (obj.hasClass(options.openedClass))
			{
				obj.removeClass(options.openedClass);
				obj.addClass(options.closedClass);

				target.removeClass(options.openedContainerClass);
				target.addClass(options.closedContainerClass);

				target.trigger("slider.opened");

				// Set link text closed
				if ( false !== options.closedText )
					obj.text( options.closedText );
			}
			// Add CSS Classes for styling 'closed'
			else
			{
				obj.removeClass(options.closedClass);
				obj.addClass(options.openedClass);

				target.removeClass(options.closedContainerClass);
				target.addClass(options.openedContainerClass);

				if (true === options.scrollTo)
				{
					var offSet = parseInt(target.offset().top, 10);
					jQuery('html').animate({
						scrollTop: offSet
					}, options.scrollSpeed);
				}

				target.trigger("slider.closed");

				// Set link text opened
				if ( false !== options.openedText )
					obj.text( options.openedText );
			}
			return false;
		});

	});
};
