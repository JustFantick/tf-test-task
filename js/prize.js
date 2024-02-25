const prizeBoxesArr = document.querySelectorAll('.prize-item');

function closePrizeBoxes() {
	prizeBoxesArr.forEach(prize => {
		prize.classList.remove('open');
	});
};

prizeBoxesArr.forEach(prize => {
	prize.addEventListener('click', () => {
		if (prize.classList.contains('open')) {
			prize.classList.remove('open');
			return;
		}
		closePrizeBoxes();
		prize.classList.add('open');
	})
});