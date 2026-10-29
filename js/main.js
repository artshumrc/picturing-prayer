jQuery(function($) {
	'use strict';

	//#main-slider
	var slideInterval = 3500;
	var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var $carousel = $('.carousel');
	var $pause = $('.carousel-pause');

	$carousel.carousel({
		interval: reduceMotion ? false : slideInterval
	});

	// Pause/play control (WCAG 2.2.2). Setting interval to false keeps the
	// carousel stopped even when Bootstrap's hover handler calls cycle().
	function showPauseState(playing) {
		$pause.find('.fa').toggleClass('fa-pause', playing).toggleClass('fa-play', !playing);
		$pause.find('.carousel-pause-label').text(playing ? 'Pause slideshow' : 'Play slideshow');
	}

	showPauseState(!reduceMotion);

	$pause.on('click', function() {
		var carousel = $carousel.data('bs.carousel');
		var playing = !!carousel.options.interval;
		if (playing) {
			carousel.options.interval = false;
			carousel.pause();
		} else {
			carousel.options.interval = slideInterval;
			carousel.paused = false;
			carousel.cycle();
		}
		showPauseState(!playing);
	});

	// Bootstrap 3 also sets aria-expanded on the collapsing panel itself, where
	// it isn't a valid attribute; only the toggle button should carry it.
	$(document).on('shown.bs.collapse hidden.bs.collapse', function(e) {
		$(e.target).removeAttr('aria-expanded');
	});

	// Fade-in animations, skipped for visitors who prefer reduced motion. The
	// inline script in <head> hides .wow blocks until WOW.js takes over (WOW sets
	// their visibility itself), so the class can be dropped once it has started.
	if (!reduceMotion && window.WOW) {
		new WOW().init();
	}
	$('html').removeClass('wow-pending');
});
