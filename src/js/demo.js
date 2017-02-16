(function($) {
	function init() {

		var options = {
			type: 'standard',
			active_position: 70,
			strip_size : 'full',
			fixed: true,
			// after_class : true,
		};

		$('section').stacked_strips(options);
	}
  $(init);
})(jQuery);