// DOM (Document Object Model)

// console.log(document.body);

function init() {
	// console.log('문서 로드 완료!');
	// console.log(document.body);
	const titleElem = document.querySelector('.site-name');
	titleElem.style.backgroundColor = 'cyan';
	titleElem.classList.add('active');
	titleElem.classList.remove('site-name');
}

// window 전역 객체
// load 이벤트: 문서의 모든 리소스(이미지 등)가 전부 로드가 끝나면 발생
// window.addEventListener('load', init);
// DOMContentLoaded 이벤트: 문서의 DOM 구조가 로드되면 발생
window.addEventListener('DOMContentLoaded', init);
// window.onload = init;

// window.addEventListener('DOMContentLoaded', function () {
// 	console.log('function!');
// });

// window.addEventListener('DOMContentLoaded', () => {
// 	console.log('() =>');
// });
