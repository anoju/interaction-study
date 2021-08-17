import { Particle } from './Particle.js';

// 모듈로 사용하지 않을 때, 전역변수 사용을 피하기 위해 함수로 감싸고 바로 호출하는 방법을 이용
// (() => {

	const canvas = document.querySelector('.canvas');
	const context = canvas.getContext('2d');
	const imgElem = new Image();

	let imgX;
	let imgY;
	let imgWidth;
	let imgHeight;
	let imgData;
	let particles;
	let particle;

	imgElem.src = './images/c.png';
	
	function setSize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		imgWidth = canvas.width / 2;
		imgHeight = imgWidth * imgElem.height / imgElem.width;
		imgX = (canvas.width - imgWidth) / 2;
		imgY = imgHeight * 0.3;
	}
	
	function initCanvas() {
		setSize();
		// 이미지의 원래 사이즈
		// console.log(imgElem.width, imgElem.height);
	
		context.drawImage(imgElem, imgX, imgY, imgWidth, imgHeight);
		imgData = context.getImageData(imgX, imgY, imgWidth, imgHeight);
		// console.log(imgData.data);

		particles = [];
		for (let y = 0; y < imgData.height; y++) {
			for (let x = 0; x < imgData.width; x++) {
				if (imgData.data[(x * 4 + y * 4 * imgData.width) + 3] > 128) {
					particle = new Particle({
						color: `rgb(
							${imgData.data[(x * 4 + y * 4 * imgData.width)]},
							${imgData.data[(x * 4 + y * 4 * imgData.width) + 1]},
							${imgData.data[(x * 4 + y * 4 * imgData.width) + 2]})`,
						x: x + imgX,
						y: y + imgY,
						originX: x + imgX,
						originY: y + imgY,
						speed: Math.random() * 3,
						radian: Math.random() * 360 * Math.PI / 180
					});
					particles.push(particle);
				}
			}
		}

		// console.log(particles.length);
	}

	function scrollHandler() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		const scrollRatio = (window.pageYOffset / (document.body.clientHeight - window.innerHeight));

		for (let i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.fillStyle = particle.color;
			particle.x = particle.originX + Math.cos(particle.radian) * window.pageYOffset * scrollRatio * particle.speed;
			particle.y = particle.originY + Math.sin(particle.radian) * window.pageYOffset * scrollRatio * particle.speed;
			context.fillRect(
				particle.x,
				particle.y,
				1,
				1
			);
		}

		if (window.pageYOffset < 10) {
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.drawImage(imgElem, imgX, imgY, imgWidth, imgHeight);
		}
	}
	
	window.addEventListener('load', initCanvas);
	window.addEventListener('resize', setSize);
	window.addEventListener('scroll', scrollHandler);

// })();
