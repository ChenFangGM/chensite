'use strict';
/*global window: false */
$(function() {
		$('.email').click(function (e) {
			if ($(window).width() > 640) {
				e.preventDefault();
				$('html, body').animate({scrollTop: $(document).height()}, 'slow');
			}
		});

		if ($(window).width() > 640) {
			var headerHeight = $('header').height();
			$(document).scroll(function () {
				var pos = $(document).scrollTop();
				var parallax = parseInt(pos * -0.1) + 'px';
				var rgba = (pos / headerHeight) * 0.4;

				$('.chen').css('margin-top', parallax);
				$('header').css('background', 'rgba(0,0,0,' + rgba);
			});
		}
	}
);
