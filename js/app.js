import { DATA } from './data.js';
import { select, create, selectAll } from './helper.js';
import { gsap } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';

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
				gsap.to(picture, {
					x: (ELEMENT_ZISE - PADDING) * (mid - index),
				});
			}

			if (index > mid) {
				count++;
				gsap.to(picture, {
					x: (ELEMENT_ZISE - PADDING) * count,
				});
			}

			picture.appendChild(img);
			main.appendChild(picture);
		});
	};
	generateList();
});
