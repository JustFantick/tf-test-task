const wrapper = document.querySelector('.wrapper');
const contentWrapper = document.querySelector('.main');
const Loader = document.querySelector('#loader').content.cloneNode(true);
const ChoisePopup = document.querySelector('#choise-popup').content.cloneNode(true);
const Prizes = document.querySelector('#prizes-grid').content.cloneNode(true);
const PrizesItem = document.querySelector('#prize-item').content.cloneNode(true);
const ErrorPopup = document.querySelector('#error-popup').content.cloneNode(true);
const CongratsPopup = document.querySelector('#congrats-popup').content.cloneNode(true);

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function clearContentWrapper() {
	wrapper.classList.add('close-anim');
	await wait(200);

	contentWrapper.innerHTML = '';
	wrapper.classList.remove('close-anim');
}

initHomeLayout();

function initHomeLayout() {
	const miniSwiper = new Swiper('.mini-swiper', {
		direction: 'vertical',
		loop: true,
		slidesPerView: 3,
		spaceBetween: 10,
		slideToClickedSlide: true,
	});

	const fullsizeSwiper = new Swiper('.fullsize-swiper', {
		direction: 'vertical',
		loop: true,
		thumbs: {
			swiper: miniSwiper,
		}
	});

	const Home = document.querySelector('.home');
	const homeButtons = Home.querySelector('.question-section__buttons');

	homeButtons.addEventListener('click', () => {
		wrapper.classList.add('close-anim');

		setTimeout(() => {
			Home.remove();
			wrapper.classList.remove('close-anim');
			initLoader();
		}, 100);
	});
}

async function initLoader() {
	contentWrapper.prepend(Loader);
	await wait(3000);

	await clearContentWrapper();
	initChoisePopup();
}

function initChoisePopup() {
	contentWrapper.prepend(ChoisePopup);
	contentWrapper.querySelector('.button').addEventListener('click', async () => {
		await clearContentWrapper();
		initPrizes();
	});
}

function initPrizes() {
	contentWrapper.prepend(Prizes);
	const prizesContainer = contentWrapper.querySelector('.prizes-grid');

	for (let i = 0; i < 12; i++) {
		let temp = PrizesItem.querySelector('.prize-item').cloneNode(true);
		temp.classList.add('slide-left-anim');
		temp.classList.add('once');
		temp.style = `--anim-order: ${i};`;
		prizesContainer.appendChild(temp);
	}

	let showError = true;
	const prizeBoxesArr = prizesContainer.querySelectorAll('.prize-item');
	const closePrizeBoxes = () => prizeBoxesArr.forEach(prize => prize.classList.remove('open'));
	prizeBoxesArr.forEach(prize => {
		prize.addEventListener('click', () => {
			if (prize.classList.contains('open')) {
				prize.classList.remove('open');
				return;
			}
			closePrizeBoxes();
			prize.classList.add('open');

			if (showError) {
				openErrorPopup();
				showError = false;
			} else {
				openCongratsPopup();
			}
		});
	});

	function openErrorPopup() {
		contentWrapper.append(ErrorPopup.cloneNode(true));
		contentWrapper.querySelector('.error-popup .button').addEventListener(
			'click',
			closeActivePopup,
			{ once: true },
		);
	}

	function openCongratsPopup() {
		contentWrapper.append(CongratsPopup.cloneNode(true));

		contentWrapper.querySelector('.congrats-popup .button').addEventListener(
			'click',
			closeActivePopup,
			{ once: true }
		);
	}

	async function closeActivePopup() {
		wrapper.classList.add('close-anim');
		await wait(200);

		contentWrapper.querySelector('.popup').remove();
		wrapper.classList.remove('close-anim');
	}
}