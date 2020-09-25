window.onload = function () {
	materialInput.init();
	chartsAnimation.init();
}

const materialInput = {
	textInputLabels: function() {
		let textInputs = document.querySelectorAll('input[type="text"], input[type="email"]'),
			textInputParents = [...textInputs].map(el => el.parentNode);

		return [...textInputParents].map(parent => parent.querySelector('label'))
	},

	init: function() {
		let labels = this.textInputLabels();
		labels.forEach(label => {
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
	}
}

const chartsAnimation = {
	chartsWrapper: document.querySelector('#js-stats-wrapper'),
	isElementInViewport: function isElementInViewport (el) {

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
	},
	onVisibilityChange: function (el, callback) {
		var old_visible;
		return function () {
			var visible = chartsAnimation.isElementInViewport(el);
			if (visible != old_visible) {
				old_visible = visible;
				if (typeof callback == 'function') {
					callback();
				}
			}
		}
	},

	init: function() {
		let handler = this.onVisibilityChange(this.chartsWrapper, () => {
			this.chartsWrapper.classList.toggle('animate');
			return;
		})
		window.addEventListener('DOMContentLoaded', handler, false);
		window.addEventListener('load', handler, false);
		window.addEventListener('scroll', handler, false);
		window.addEventListener('resize', handler, false);
		return;
	}
}