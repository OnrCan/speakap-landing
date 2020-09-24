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

	})
}