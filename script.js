const Microwave = (() => {
	const audioBeep = new Audio('./assets/beep.wav');
	const audioMmm = new Audio('./assets/mmm.wav');

	const nodeText = document.querySelector('.microwave__mmm');
	const nodeTime = document.querySelector('.microwave__time');

	let isOn = false;
	let remainingTime = 0;
	let timestamp = 0;

	function updateTime() {
		const min = Math.trunc(remainingTime / 60);
		const sec = Math.trunc(remainingTime % 60);

		nodeTime.textContent = `${min}:${('' + sec).padStart(2, '0')}`;
	}

	function setTime(seconds, relative = true) {
		remainingTime = Math.min(Math.max((relative ? remainingTime : 0) + seconds, 0), 3599);
		updateTime();
	}
	
	function start() {
		if (isOn) {
			return;
		}

		if (remainingTime === 0) {
			// TODO: play bruh sound effect
			return;
		}

		nodeText.style.visibility = 'visible';
		audioMmm.play();
		timestamp = Date.now();
		isOn = true;
	}

	function reset() {
		if (isOn) {
			nodeText.style.visibility = null;
			audioMmm.pause();
			audioMmm.currentTime = 0;
			audioBeep.play();
			isOn = false;
		}
		remainingTime = 0;
		updateTime();
	}

	audioMmm.loop = true;
	audioMmm.addEventListener('playing', () => {
		const now = Date.now();
		remainingTime = Math.max(remainingTime - (now - timestamp) / 1000, 0);
		timestamp = now;

		updateTime();
		if (remainingTime === 0) {
			reset();
		}
	});

	return {
		setTime,
		start,
		reset
	};
})();
