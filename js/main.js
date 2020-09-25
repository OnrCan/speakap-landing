window.onload = function () {
	const textInputs = document.querySelectorAll('input[type="text"], input[type="email"]');
	const textInputParents = [...textInputs].map(el => el.parentNode);
	const textInputLabels = [...textInputParents].map(parent => parent.querySelector('label'));

	textInputLabels.forEach(label => {
		if (!label) return;
		let input = label.nextElementSibling;

		input.addEventListener('focus', (event) => {
			label.classList.add('active');
		});

		input.addEventListener('blur', (event) => {
			if (event.target.value !== '') return;
			label.classList.remove('active');
		});

	});

	const chartsWrapper = document.querySelector('#js-stats-wrapper');

	function isElementInViewport (el) {

		// Special bonus for those using jQuery
		if (typeof jQuery === "function" && el instanceof jQuery) {
			el = el[0];
		}
	
		var rect = el.getBoundingClientRect();
	
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
			rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
		);
	}
	
	function onVisibilityChange(el, callback) {
		var old_visible;
		return function () {
			var visible = isElementInViewport(el);
			if (visible != old_visible) {
				old_visible = visible;
				if (typeof callback == 'function') {
					callback();
				}
			}
		}
	}
	
	var handler = onVisibilityChange(chartsWrapper, function() {
		/* Your code go here */
		chartsWrapper.classList.toggle('animate');
	});

	if (window.addEventListener) {
		addEventListener('DOMContentLoaded', handler, false);
		addEventListener('load', handler, false);
		addEventListener('scroll', handler, false);
		addEventListener('resize', handler, false);
	} else if (window.attachEvent)  {
		attachEvent('onDOMContentLoaded', handler); // Internet Explorer 9+ :(
		attachEvent('onload', handler);
		attachEvent('onscroll', handler);
		attachEvent('onresize', handler);
	}
}