window.addEventListener('DOMContentLoaded', () => {

	const cardElem = document.querySelector('.card');
	const cardElems = document.querySelectorAll('.card');
	console.log(cardElems);
	console.log(cardElems[1]);

	let cardState = false; // 카드가 회전했는지 회전 안했는지 판별할 변수

	function cardClickHandler() {
		// if (cardState === false) {
		//if (cardState) { // cardState가 true 라면
		if (!cardState) { // cardState가 false 라면
			cardElem.classList.add('active');
			cardState = true;
		} else {
			cardElem.classList.remove('active');
			cardState = false;
		}
	}

	function cardClickHandler2() {
		cardElem.classList.toggle('active');
	}

	// 이벤트 핸들러
	// cardElem.addEventListener('click', cardClickHandler);
	cardElem.addEventListener('click', cardClickHandler2);

});