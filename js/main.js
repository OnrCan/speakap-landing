window.onload = function () {
	materialInput.init();
	chartsAnimation.init();
	modal.init();
	initTestimonialsSlider();
}

/**
 * 
 * Initialize sign up modal events
 * 
 */
const modal = {

	// There is something wrong with the Bootstrap modal
	// that's why I created this block, just to finish rapidly
	// 
	// Sign Up Modal for Mobile
	modal: document.querySelector('#signup-form-modal'),
	body: document.querySelector('body'),
	show: function() {
		this.modal.classList.add('active');
		this.body.classList.add('oh');
	},
	close: function() {
		this.modal.classList.remove('active');
		this.body.classList.remove('oh');
	},
	setEventlistener: function() {
		let signupModalButtons = document.querySelectorAll('.mobile-signup-modal-trigger');
		if((window.innerWidth <= 992) && signupModalButtons) {
			[...signupModalButtons].forEach(el => {
				el.onclick = function(event) {
					event.preventDefault();
					event.stopPropagation();
					modal.show();
				}
			});
		}
	},
	init: function() {
		this.setEventlistener();
		
		let modalClose = document.querySelector('.modal-close-button');
		modalClose.addEventListener('click', function() {
			modal.close();
		});
		
		window.addEventListener('resize', this.setEventlistener, false);
	}
}

/**
 * 
 * Material like input events
 * 
 */
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

/**
 * 
 * Chart animations
 * 
 */
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
		return;
	}
}

/**
 * 
 * Initialize testimonials slider events
 * 
 */
function initTestimonialsSlider() {
	let testimonialButtons = document.querySelectorAll('button.testimonial-image'),
		testimonialMessageWrapper = document.querySelector('.testimonial-message'),
		testimonialNameWrapper = document.querySelector('.testimonial-name'),
		testimonialLocationWrapper = document.querySelector('.testimonial-location');
	
	if (testimonialButtons) {
		[...testimonialButtons].forEach(button => {
			let source = button.getAttribute('data-source');
			if (!source) { 
				console.error('missing attr data-source');
				return;
			 }
			button.addEventListener('click', (event) => {
				showTestimonialMessage(event, source);
			});
		});
	}

	const showTestimonialMessage = (event, source) => {
		testimonialButtons.forEach(el => el.classList.remove('active'));
		event.target.classList.add('active');
		let testimonials = {
			'sarah': {
				name: 'Sarah Doe',
				message: 'Tempor sint nostrud incididunt eiusmod consectetur ea id. Labore sunt nisi occaecat aute duis voluptate occaecat non esse. Enim voluptate aliquip eu occaecat laborum non ipsum eu. Cillum cillum commodo elit quis laborum. Tempor do laboris sit qui duis aute et esse duis occaecat exercitation irure.',
				location: 'New York Pizza - Amsterdam'
			},
			'victor': {
				name: 'Victor Delgado',
				message: 'NYP Connect helps us keep our staff, mostly young part-timers, involved in the organisation in a modern and positive way. The combination of several well-known social media in one platform is perfect to connect with the individual employee in a way they feel comfortable with and respond to.',
				location: 'New York Pizza - Heereneveen'
			},
			'john': {
				name: 'John Doe',
				message: 'Velit ex ut reprehenderit aliqua eiusmod. Velit cillum consequat culpa excepteur anim ex sint elit irure pariatur sunt. Consequat enim commodo dolore nostrud quis reprehenderit est nisi culpa commodo officia reprehenderit. Lorem magna magna officia occaecat reprehenderit proident incididunt minim do exercitation.',
				location: 'New York Pizza - Utrecht'
			}
		}

		testimonialMessageWrapper.innerHTML = `“${testimonials[source].message}”`;
		testimonialNameWrapper.innerHTML = `${testimonials[source].name}`;
		testimonialLocationWrapper.innerHTML = `${testimonials[source].location}`;
	}
}