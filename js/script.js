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