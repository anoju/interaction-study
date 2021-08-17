import { cm } from './cm.js';
import { BookView } from './BookView.js';

let loaderElem;
let observerElems;
let bookItemElems;
let shelfElem;
let bookListElem;
let modalCoverElem;

let bookView;

function setElems() {
	loaderElem = document.querySelector('.loader-wrapper');
	shelfElem = document.querySelector('.shelf');
	bookListElem = document.querySelector('.book-list');
	modalCoverElem = document.querySelector('.modal-cover');
	observerElems = document.querySelectorAll('.observer-ready');
	bookItemElems = document.querySelectorAll('.book-item');
}

function setCurrentBook(index) {
	cm.currentBookId = index;
	cm.currentBookElem = bookItemElems[index];
	console.log(cm.currentBookElem);
	console.log(cm.currentBookId);
	bookView.show();
}

window.addEventListener('load', () => {
	setElems();
	loaderElem.addEventListener('transitionend', () => {
		loaderElem.remove();
	});
	document.body.classList.remove('before-load');

	// 각 .book-item들 위치 세팅
	bookItemElems.forEach((book, i) => {
		// .book-item의 width가 196
		book.style.left = `${196 * i}px`;
	});

	bookView = new BookView();

	bookListElem.addEventListener('click', e => {
		// console.log(e.target);
		e.preventDefault(); // 이벤트의 기본 동작 취소
		// console.log(e.target.getAttribute('href'));
		setCurrentBook(e.target.dataset.id);
	});

	modalCoverElem.addEventListener('click', () => {
		bookView.hide();
	});

	// 마우스 위치에 따라 책장 시점 변경
	window.addEventListener('mousemove', e => {
		// console.log(e.clientX, e.clientY);
		// console.log(e.clientY);
		// console.log(e.clientY / window.innerHeight);
		shelfElem.style.transform = `rotateX(${5 * e.clientY / window.innerHeight}deg)`;
	});

	// IntersectionObserver
	const io = new IntersectionObserver((entries, observer) => {
		for (let i = 0; i < entries.length; i++) {
			if (entries[i].isIntersecting) {
				observerElems[ entries[i].target.dataset.index ].classList.add('observer-active');
			}
		}
	});

	observerElems.forEach((item, i) => {
		item.dataset.index = i;
		io.observe(item);
	});
});