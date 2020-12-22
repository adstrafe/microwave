class LoopAudio {
	#callback;
	#first;
	#second;
	#isPlaying = false;
	#isUsingFirst = true;

	#onSwap = () => {
		if (!this.#isPlaying) {
			return;
		}

		const audio = this.#isUsingFirst ? this.#second : this.#first;
		audio.currentTime = 0;
		audio.play();

		this.#isUsingFirst = !this.#isUsingFirst;
		this.#callback();
		setTimeout(this.#onSwap, this.#first.duration * 600);
	};

	constructor(path, callback) {
		this.#callback = callback;
		this.#first = new Audio(path);
		this.#second = new Audio(path);
	}

	play() {
		if (!this.#isPlaying) {
			this.#isPlaying = true;
			this.#onSwap();
		}
	}

	stop() {
		this.#isPlaying = false;
	}
}

const Microwave = (() => {
	const audioBeep = new Audio('./assets/beep.wav');
	const audioMmm = new LoopAudio('./assets/mmm.wav', () => {
		const now = Date.now();
		remainingTime = Math.max(remainingTime - (now - timestamp) / 1000, 0);
		timestamp = now;

		updateTime();
		if (remainingTime === 0) {
			reset();
		}
	});

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
		if (isOn || remainingTime === 0) {
			return;
		}

		isOn = true;
		timestamp = Date.now();
		audioMmm.play();
		nodeText.style.visibility = 'visible';
	}

	function reset() {
		if (isOn) {
			nodeText.style.visibility = null;
			audioMmm.stop();
			audioBeep.currentTime = 0;
			audioBeep.play();
			isOn = false;
		}
		remainingTime = 0;
		updateTime();
	}

	return {
		setTime,
		start,
		reset
	};
})();
