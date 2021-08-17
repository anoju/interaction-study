const worldElem = document.querySelector('.world');
const handElem = document.querySelector('.hand');

function clickHandler(e) {
	const targetElem = e.target;
	// targetElem.setAttribute('data-flip', 'true');

	if (targetElem.classList.contains('world')) {
		return;
	}

	if (targetElem.dataset.flip === 'false') {
		// data-flip="false"라면
		targetElem.dataset.flip = 'true';
	} else {
		// data-flip="true"라면
		targetElem.dataset.flip = 'false';
	}
}

function moveHandler(e) {
	console.log(e.clientX, e.clientY);
	handElem.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
}

function touchHandler(e) {
	console.log(e.touches[0].clientX, e.touches[0].clientY);
	handElem.style.transform = `translate(${e.touches[0].clientX}px, ${e.touches[0].clientY}px)`;
}

worldElem.addEventListener('click', clickHandler);
window.addEventListener('mousemove', moveHandler);
window.addEventListener('mousedown', () => {
	document.body.classList.add('mousedown');
});
window.addEventListener('mouseup', () => {
	document.body.classList.remove('mousedown');
});

// touchstart, touchend
window.addEventListener('touchmove', touchHandler);