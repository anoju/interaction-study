window.addEventListener('DOMContentLoaded', () => {

	const cardElems = document.querySelectorAll('.card');

	function cardClickHandler(e) {
		console.log(this);
		console.log(e.currentTarget);
		// console.log(this === e.currentTarget);
		console.log(e.target);
		this.classList.toggle('active');
	}

	for (let i = 0; i < cardElems.length; i++) {
		cardElems[i].addEventListener('click', cardClickHandler);
	}

});