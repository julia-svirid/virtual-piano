const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");

/* Switch notes / letters */
const btnContainer = document.querySelector(".btn-container");
const buttons = document.querySelectorAll(".btn");
btnContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn")) {
    buttons.forEach((e) => {
      e.classList.remove("btn-active");
    });
    event.target.classList.add("btn-active");
  }
  if (event.target.classList.contains("btn-letters")) {
    pianoKeys.forEach((e) => {
      e.classList.add("piano-key-letter");
    });
  }
  if (event.target.classList.contains("btn-notes")) {
    pianoKeys.forEach((e) => {
      e.classList.remove("piano-key-letter");
    });
  }
});

const playAudio = (src) => {
  const audio = new Audio();
  audio.src = `./assets/audio/${src}.mp3`;
  audio.play();
};

function playSound(ev) {
  const note = ev.target.dataset.note;
  playAudio(note);
  addActiveClass(ev);
}

const addActiveClass = (event) => {
  event.target.classList.add("piano-key-active", "piano-key-active-pseudo");
};
const removeActiveClass = (event) => {
  event.target.classList.remove("piano-key-active", "piano-key-active-pseudo");
};

const hoverPlay = () => {
  pianoKeys.forEach((el) => {
    el.addEventListener("mouseover", playSound);
  });
};
const removeHoverPlay = () => {
  pianoKeys.forEach((el) => {
    el.removeEventListener("mouseover", playSound);
  });
};

/* Mouse press */

piano.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("piano-key")) {
    playSound(event);
    hoverPlay();
    addActiveClass(event);
  }
});

window.addEventListener("mouseup", (event) => {
  if (event.target.classList.contains("piano-key")) {
    removeActiveClass(event);
    removeHoverPlay();
  }
  removeHoverPlay();
});

window.addEventListener("mouseout", (event) => {
  if (event.target.classList.contains("piano-key")) {
    event.target.classList.remove(
      "piano-key-active",
      "piano-key-active-pseudo"
    );
  }
});

/* Keyboard */
const addActiveClassKey = (event) => {
  pianoKeys.forEach((el) => {
    if (el.dataset.letter !== undefined) {
      elem = el.dataset.letter;
    }
    if (elem === event.code.slice(3)) {
      el.classList.add("piano-key-active");
    }
  });
};
const removeActiveClassKey = (event) => {
  pianoKeys.forEach((el) => {
    if (el.dataset.letter !== undefined) {
      elem = el.dataset.letter;
    }
    if (elem === event.code.slice(3)) {
      el.classList.remove("piano-key-active");
    }
  });
};

window.addEventListener("keydown", (event) => {
  const letters = [];
  const notes = [];
  pianoKeys.forEach((el) => {
    if (el.dataset.note !== undefined) {
      letters.push(el.dataset.letter);
      notes.push(el.dataset.note);
    }
  });
  if (letters.includes(event.code.slice(3))) {
    let i = letters.indexOf(event.code.slice(3));
    let note = notes[i];
    if (event.repeat) return;
    playAudio(note);
    addActiveClassKey(event);
  }
});

window.addEventListener("keyup", (event) => {
  removeActiveClassKey(event);
});

/*Fullscreen */
const fullScreen = document.querySelector(".fullscreen");
fullScreen.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});

const gitLink = document.querySelector(".github");
gitLink.href = "https://github.com/julia-svirid";
