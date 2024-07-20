import { DATA } from './data.js';
import { select, create, selectAll } from './helper.js';
//import { gsap } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';

const keyCodes = {
	LEFT: 37,
	RIGHT: 39,
};

const PADDING = 30;
const ELEMENT_ZISE = 350;




window.addEventListener('load', () => {
	const main = select('.main');
	const details = select('.main > .details');
	const mainImage = select('.main > .details > img');

	let activeItem = null;
	let isAnimating = true;

	const generateList = () => {
		const mid = Math.floor(DATA.length / 2);
		let count = 0;

		DATA.forEach((d, index) => {
			const picture = create('div');
			const title = create('div');

			picture.classList.add('picture');
			title.classList.add('title');

			title.textContent = d.title;
			picture.appendChild(title);

			const img = create('img');
			img.src = d.imgUrl;

			gsap.to(picture, { zIndex: 100 });

			if (index === mid) {
				picture.classList.add('active');
				gsap.to(picture, { x: 0 });
			}

			if (index < mid) {
				gsap.to(picture, { x: -((ELEMENT_ZISE + PADDING) * (mid - index)) });
			}

			if (index > mid) {
				count++;
				gsap.to(picture, { x: (ELEMENT_ZISE + PADDING) * count });
			}

			picture.appendChild(img);
			main.appendChild(picture);
		});
	};
	generateList();

	const list = selectAll('.picture');

	list.at(-1).querySelector('img').addEventListener('load', () => {

		gsap.to(list, {
			autoAlpha: 1,
			delay: 0.5,
			duration: 0.4,
			ease: 'power1.inOut',
		}).then(() => (isAnimating = false));
	});

	const animate = (list, direction, clicked = null) => { };

	const showDetails = event => { };

	selectAll('.picture').forEach((a) => a.addEventListener('click',
		() => !isAnimating && showDetails(a)));

	window.addEventListener('keydown', event => {
		const { LEFT, RIGHT } = keyCodes;
		const list = selectAll('.picture');

		if (keyCodes === LEFT && !isAnimating) {
			animate(list, 'right');
		};

		if (keyCodes === RIGHT && !isAnimating) {
			animate(list, 'left');
		};
	});

	window.addEventListener('wheel', event => {
		const list = selectAll('.picture');
		if (event.deltaX < 0 && !isAnimating) {
			animate(list, 'right');
		};

		if (event.deltaX > 0 && !isAnimating) {
			animate(list, 'left');
		};
	});
});

