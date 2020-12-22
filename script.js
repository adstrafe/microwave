function timingStart() {
	window.setTimeout(white, i);
	microwave.play();
}

function white() {
	document.getElementById('txt').innerHTML = "<img src='white.png'>";
	i = 0;
}

function start() {
	document.getElementById('txt').innerHTML = "<img src='mmmmm.png'>";
}



function sec() {
	i += 10000;
}

function minute() {
	i += 60000;
}

function tenMinutes(){
	i += 600000;
}


function reset() {
	window.clearTimeout();
	document.getElementById('txt').innerHTML = "<img src='white.png'>";
	microwave.pause();
	microwave.currentTime = 0;
	bruh.play();
	i = 0;
}

let i = 0;

var bruh = new Audio('bruh.mp3');

var microwave = new Audio('microwave.mp3');
microwave.volume = 0.05;
