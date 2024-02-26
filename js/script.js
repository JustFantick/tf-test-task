const wrapper = document.querySelector('.wrapper');
const contentWrapper = document.querySelector('.main');
const Loader = document.querySelector('#loader').content.cloneNode(true);
const ChoisePopup = document.querySelector('#choise-popup').content.cloneNode(true);

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
		// TODO: add code that inits Prizes layout
	});
}