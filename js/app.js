import { DATA } from './data.js';
import { select, create, selectAll } from './helper.js';

gsap.registerPlugin(Flip);

const keyCodes = {
	LEFT: 37,
	RIGHT: 39,
};

const PADDING = 30;
const ELEMENT_ZISE = 350;

window.addEventListener('load', () => {
	const main = select('.main');
	const details = select('.main > .detail');
	const mainImage = select('.main > .detail > img');

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

	const showDetails = e => {
		console.log(e.querySelector('img').src);
		if (activeItem) {
			return hidenDEtails();
		};

		isAnimating = true;

		const onLoad = () => {
			gsap.set(e, { autoAlpha: 0 });

			const text = e.querySelector('.title').textContent;
			const list = selectAll('.picture');
			const index = list.indexOf(e);

			if (index > -1) {
				//animate out item
			};

			const detailsTaitel = details.querySelector('.title');
			detailsTaitel.textContent = text;

			Flip.fit(details, e);
			const state = Flip.getState(details, e);

			gsap.set(main, { clearProps: true });
			gsap.set(details, {
				visibility: "visible",
				overflow: "hidden",
				ease: "power2.inOut",
				position: "absolute",
				width: "350px",
				height: "350px",
				scrollTo: { y: 0, x: 0 },
			});

			Flip.from(state, {
				onComplete: () => gsap.set(details, { overflow: "auto" }),
			}).to(details, {
				duration: 2,
				zIndex: 10000,
				width: '100%',
				height: '100%',
				transform: 'none',
				ease: "power2.inOut",
			}).then(() => (isAnimating = false));

			mainImage.removeEventListener('load', onLoad);
			document.addEventListener('click', () => !isAnimating && showDetails());
		};

		mainImage.src = e.querySelector("img").src;
		mainImage.addEventListener("load", onLoad);
	};

	const hidenDEtails = () => { };

	selectAll('.picture').forEach((a) =>
		a.addEventListener('click', () => !isAnimating && showDetails(a)));

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

