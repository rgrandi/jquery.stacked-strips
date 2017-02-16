$.fn.stacked_strips = function (options) {

	var strips = this,
		strips_length = strips.length,
		strip_height,
		window_height = $(window).height(),
		scroll_top = 0;


	// Return appropriate error message is this is less than 2 strips, or if no strips are found.
	if (strips_length === 1) {
		console.error('stacked_strips requires more than 1 item to work. Exiting.');
		return false;
	} else if (strips_length < 1) {
		console.error('stacked_strips did not find any matching elements. Exiting.');
		return false;
	}

	// Function to sanitize options / set default ones.
	function sanitize_options() {
		if (options.type === undefined) {
			options.type = 'standard';
		}

		if (options.active_position === undefined || $.type(options.active_position) !== 'number') {
			options.active_position = 50;
		}

		if (options.strip_size === undefined) {
			options.strip_size = 'full';
		}

		if (options.after_class === undefined) {
			options.after_class = false;
		}

		if (options.fixed === undefined) {
			options.fixed = true;
		}
	}

	// Build function to setup the strips
	function setup_strips() {
		window_height = $(window).height();

		if (options.strip_size === 'full') {
			strip_height = window_height;
		} else if (options.strip_size === 'auto') {
			strip_height = '';
		} else {
			strip_height = options.strip_size;
		}

		// Set the height of the strips as per the options.
		$.each(strips, function(key) {
			
			// If an element is too big to fit, we don't fix its size.
			if (options.strip_size === 'auto') {
				$(this).css({'height': strip_height, 'z-index' : key*10});
			} else if ($(this).height() > strip_height) {
				$(this).css('z-index', key*10);
			} else {
				$(this).css({'height': strip_height, 'z-index' : key*10});
			}
		});
	}

	// Detect our scrolling position
	function detect_scrolling() {
		scroll_top = $(window).scrollTop();
	}

	function set_strip_classes(element, this_offset, index) {
		var el_height = element.outerHeight(),
			$fake_strip = $('<div class="fake-strip"></div>').clone().css('height', el_height),
			prev_strip,
			active_offset = (el_height/100) * options.active_position;

		// Set fixed class on the strip when it reaches the top.
		if (scroll_top >= this_offset && options.fixed === true) {


			// We don't want the last strip to get fixed.
			if (index < strips_length-1) {
			
				// Only fix elements that are standard sized.
				if (el_height === strip_height) {

					// Add a fake strip to preserve the layout.
						if (!element.prev().hasClass('fake-strip')) {
							element.before($fake_strip);
						}
					
						element.addClass('fixed');
						element.removeClass('unfixed');
				}
			}

		} else {

			// Remove the fake strip when we un-stick our element.
			if (element.prev().hasClass('fake-strip')) {
				element.prev().remove();
			}

			element.removeClass('fixed');
			element.addClass('unfixed');
		}


		// Set active class on strip, and also previous class on the last strip (if toggled).
		// --------------------------------------------------------------------------------- //
		// If the active position is 60, we want it to show when we are 60% through the strip.
		// To do this we take the offset of the strip and minus active offset. EG: strip height
		// is 1000px, we want to get 60% of that (600) and take that away from the strip height
		// (which gives us 400). We then subtract the 400 from the offset to the top.

		if (scroll_top >= this_offset - (window_height - active_offset)) {

			// If we want a class to go on the slide after the next one goes active, we handle
			// it here.
			if (options.after_class === true) {
				prev_strip = index-1;
				if (strips[prev_strip] !== undefined) {
					$(strips[prev_strip]).addClass('after');
				}
			}


			element.addClass('active');
		} else {

			// Remove 'after' class when it is about to become active again.
			if (options.after_class === true) {
				prev_strip = index-1;
				if (strips[prev_strip] !== undefined) {
					$(strips[prev_strip]).removeClass('after');
				}
			}

			element.removeClass('active');
		}
	}

	$(window).on('scroll', detect_scrolling);
	$(window).on('resize', setup_strips);


	sanitize_options();
	setup_strips();

	return this.each(function (e) {
		var $this = $(this),
			index = e,
			this_offset = $this.offset().top;

		set_strip_classes($this, this_offset, index);

		$(window).on('scroll', function() {
			set_strip_classes($this, this_offset, index);
		});
		
	});
};