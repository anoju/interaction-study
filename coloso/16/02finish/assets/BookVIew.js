import { data } from './data.js';
import { cm } from './cm.js';

export class BookView {
	constructor() {
		this.bodyElem = document.createElement('article');
		this.bodyElem.classList.add('book-detail');
		document.body.appendChild(this.bodyElem);
	}

	show() {
		const currentData = data[cm.currentBookId];
		this.bodyElem.style.display = 'block';

		this.bodyElem.innerHTML = `
			<div class="big-book">
				<div class="page page-cover" data-page="back-cover">
					<div class="page-side" style="background-image: url(${currentData.backCover})"></div>
					<div class="page-side" style="background-image: url(${currentData.backCover})"></div>
				</div>
				<div class="page" data-page="6">
					<div class="page-side"></div>
					<div class="page-side"></div>
				</div>
				<div class="page" data-page="5">
					<div class="page-side"></div>
					<div class="page-side"></div>
				</div>
				<div class="page" data-page="4">
					<div class="page-side">
						<div class="sample-content" style="padding-left: 30px;">
							${currentData.preview2}
						</div>
					</div>
					<div class="page-side"></div>
				</div>
				<div class="page" data-page="3">
					<div class="page-side"></div>
					<div class="page-side">
						${currentData.preview1}
					</div>
				</div>
				<div class="page" data-page="2">
					<div class="page-side"></div>
					<div class="page-side"></div>
				</div>
				<div class="page" data-page="1">
					<div class="page-side"></div>
					<div class="page-side"></div>
				</div>
				<div class="page page-cover" data-page="front-cover">
					<div class="page-side" style="background-image: url(${currentData.frontCover})"></div>
					<div class="page-side" style="background-image: url(${currentData.frontCover})"></div>
				</div>
			</div>
			<div class="order-form">
				<button class="btn btn-add-to-cart">Add to Cart</button>
			</div>
		`;

		const bigBook = this.bodyElem.querySelector('.big-book');
		const targetRect = bigBook.getBoundingClientRect();
		// console.log(targetRect);
		
		const currentBookRect = cm.currentBookElem.getBoundingClientRect();
		// console.log(currentBookRect);

		let xGap = targetRect.x - currentBookRect.x;
		let yGap = targetRect.y - currentBookRect.y;
		xGap = xGap + (targetRect.width - currentBookRect.width)*0.5;
		yGap = yGap + (targetRect.height - currentBookRect.height)*0.5;

		cm.currentBookElem.style.transform = `rotateY(0) translate(${xGap}px, ${yGap}px) scale(2.5)`;
		cm.currentBookElem.classList.add('book-item-selected');

		const timerId = setTimeout(() => {
			document.body.classList.add('book-opened');
			clearTimeout(timerId);
			const timerId2 = setTimeout(() => {
				cm.currentBookElem.style.transform = 'none';
				clearTimeout(timerId2);
			}, 500);
		}, 500);
	}

	hide() {
		document.body.classList.remove('book-opened');
		cm.currentBookElem.classList.remove('book-item-selected');
		const timerId = setTimeout(() => {
			this.bodyElem.style.display = 'none';
			clearTimeout(timerId);
		}, 500);
	}
}
