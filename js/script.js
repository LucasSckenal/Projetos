const musica = document.getElementById("musica");
const playStopBtn = document.querySelector(".play-stop");
const voltarBtn = document.querySelector(".voltar");
const avancarBtn = document.querySelector(".avancar");
const ball = document.querySelector(".ball");
const cronometro = document.getElementById("cronometro");

let timerInterval;
let duration = 0;

let animations = {
  0: "falseAlarm",
  1: "euVouFalar",
  2: "cartola",
  3: "sidoka",
};

// ? Começar e Parar a Musica
function togglePlayStop() {
  if (musica.paused) {
    play();
  } else {
    stop();
  }
}

// ? Troca de Ícone
function play() {
  musica.play();
  playStopBtn.setAttribute("name", "pause-outline");
  playStopBtn.classList.add("pause");
  duration = 0;
  timerInterval = setInterval(() => {
    duration++;
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    cronometro.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
    if (duration >= playlist[currentTrackIndex].duration) {
      clearInterval(timerInterval);
      stop();
      nextTrack(); // vai para a próxima música quando a música atual terminar
    }
  }, 1000);
}

// ? Troca de Ícone
function stop() {
  musica.pause();
  playStopBtn.setAttribute("name", "play-outline");
  playStopBtn.classList.remove("pause");
  clearInterval(timerInterval);
}

// ? Voltar
function voltar() {
  musica.currentTime -= 5;
}

// ? Avançar
function avancar() {
  musica.currentTime += 5;
}

playStopBtn.addEventListener("click", togglePlayStop);
voltarBtn.addEventListener("click", voltar);
avancarBtn.addEventListener("click", avancar);

const playlist = [
  {
    src: "music/videoplayback.3gpp",
    img: "img/design-1.png",
    title: "False Alarme",
    artist: "Connor Price, Lucca DL",
    duration: 142,
  },
  {
    src: "music/vou falar que não quero.mp3",
    img: "img/thumb-2.jpg",
    title: "vou falar que não quero",
    artist: "Vitor Fernandes",
    duration: 202,
  },
  {
    src: "music/cartola.mp4",
    img: "img/cartola.jpg",
    title: "ＣＡＲＴＯＬＡ ＰＲＥＣＩＳＯ　ＭＥ　ＥＮＣＯＮＴＲＡＲ",
    artist: "",
    duration: 190,
  },
  {
    src: "music/Sidoka 'e se o mundo cair pra mim,'.mp4",
    img: "img/sidoka.jpg",
    title: "e se o mundo cair pra mim,",
    artist: "Sidoka",
    duration: 190,
  },
];

let currentTrackIndex = 0; // índice da música atualmente em reprodução

function playTrack(trackIndex) {
  const track = playlist[trackIndex];

  // atualiza informações da música
  document.getElementById("music-title").textContent = track.title;
  document.getElementById("artistas").textContent = track.artist;
  document.getElementById("music-img").setAttribute("src", track.img);

  // define a nova fonte do elemento de áudio
  const musica = document.getElementById("musica");
  musica.setAttribute("src", track.src);

  // reinicia o cronômetro
  clearInterval(timerInterval);
  duration = 0;
  cronometro.textContent = "0:00";

  // toca a música
  play();
  currentTrackIndex = trackIndex;

  document
    .getElementById("audio-ball")
    .classList.remove(animationClasses[currentTrackIndex]);
  document.getElementById("audio-ball").classList.add(animations[trackIndex]); // troca a animação da bola de acordo com a música atual
  const audioBall = document.getElementById("audio-ball");
  audioBall.classList.remove(animationClasses[currentTrackIndex]);
  audioBall.classList.add(animations[trackIndex]);
}

// troca para a próxima música na lista
function nextTrack() {
  const nextIndex = (currentTrackIndex + 1) % playlist.length;
  playTrack(nextIndex);
}

// troca para a música anterior na lista
function prevTrack() {
  const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  playTrack(prevIndex);
}

const nextBtn = document.querySelector(".switch.right");
const prevBtn = document.querySelector(".switch.left");

nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
function resetAnimation() {
  ball.classList.remove("falseAlarm", "euVouFalar", "cartola", "sidoka");
}

function changeAnimationClass(trackIndex) {
  const animationClasses = ["falseAlarm", "euVouFalar", "cartola", "sidoka"];
  resetAnimation();
  ball.classList.add(animationClasses[trackIndex]);
}
