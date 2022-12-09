(() => {
	(() => {
		const stepElems = document.querySelectorAll(".step");
		const graphicElems = document.querySelectorAll(".graphic-item");
		let currentItem = graphicElems[0]; //현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정
		let ioIndex;

		const io = new IntersectionObserver((entries, observer) => {
			ioIndex = entries[0].target.dataset.index * 1;
		});

		for (let i = 0; i < stepElems.length; i++) {
			io.observe(stepElems[i]);
			stepElems[i].dataset.index = i; //text
			graphicElems[i].dataset.index = i; // 이미지
		}
		console.log(io.observe(stepElems[0]));
		function activate(action) {
			//활성화
			currentItem.classList.add("visible");
		}

		function inactivate(action) {
			//비활성화
			currentItem.classList.remove("visible");
		}

		window.addEventListener("scroll", () => {
			let step;
			let boundingRect;

			for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
				step = stepElems[i];
				if (!step) continue; //만약에 step 에 값이없으면 다음턴으로가주세요
				boundingRect = step.getBoundingClientRect();

				if (
					boundingRect.top > window.innerHeight * 0.1 &&
					boundingRect.top < window.innerHeight * 0.8
				) {
					if (currentItem) {
						inactivate();
					}
					currentItem = graphicElems[step.dataset.index];
					activate(currentItem.dataset.action); //이름가져오기
				}
			}
		});

		window.addEventListener("load", () => {
			setTimeout(() => scrollTo(0, 0), 100);
		});
		activate();
	})();
})();
