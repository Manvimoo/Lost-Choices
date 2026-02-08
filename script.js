
    const scenes = {
  0: {
    text: "LOST CHOICES",
    backgroundImage: "scene-1.jpeg",
    choices: [
      { text: "Play", nextScene: 1 }
    ]
  },
  1: {
    text: "Chibi is lost in the forest. The trees tower above him, and shadows dance around. In front of him are two paths —",
    backgroundImage: "scene-2.jpeg",
    choices: [
      { text: "Next", nextScene: 2 }
    ]
  },
  2: {
    text: "Which path should Chibi take?",
    backgroundImage: "scene-3.jpeg",
    choices: [
      { text: "LEFT", nextScene: 3 },
      { text: "RIGHT", nextScene: 10 }
    ]
  },
  3: {
    text: "Chibi walks cautiously down the left path. A few steps in, he sees a strange, colorful bag lying on the ground.",
    backgroundImage: "scene-4.jpeg",
    choices: [{ text: "Next", nextScene: 4 }]
  },
  4: {
    text: "“Should I open it?” he wonders.",
    backgroundImage: "scene-5.jpeg",
    choices: [
      { text: "Open Bag", nextScene: 5 },
      { text: "Ignore the bag", nextScene: 8 }
    ]
  },
  5: {
    text: "OPEN BAG",
    backgroundImage: "scene-6.jpeg",
    choices: [{ text: "Next", nextScene: 6 }]
  },
  6:{
    text:"Chibi kneels and unties the bag’s string.",
    backgroundImage:"scene-7.jpeg",
    choices:[
      {text:"Next",nextScene:7}
    ]
  },
  7: {
    text: "Curiosity isn't always safe, echoes a distant voice.",
    backgroundImage: "scene-8.jpeg",
    choices: [{ text: "GAME OVER", nextScene: 0 }]
  },
  8: {
    text: "Ignore the bag",
    backgroundImage: "scene-9.jpeg",
    choices: [{ text: "Next", nextScene: 9 }]
  },
  9: {
    text: "You ignore the bag and find your mum.",
    backgroundImage: "scene-10.jpeg",
    choices: [{ text: "Game Over", nextScene: 0 }]
  },
  10: {
    text: "Chibi chooses the right path. A tall stranger appears, holding out a bright red lollipop.",
    backgroundImage: "scene-11.jpeg",
    choices: [{ text: "NEXT", nextScene: 11 }]
  },
  11: {
    text: 'Stranger: “Hey there, kiddo. Want some candy?”',
    backgroundImage: "scene-12.jpeg",
    choices: [{ text: "NEXT", nextScene: 12 }]
  },
  12: {
    text: "Chibi hesitates... should he accept it?",
    backgroundImage: "scene-15.jpeg",
    choices: [
      { text: "TAKE CANDY", nextScene: 13 },
      { text: "IGNORE THE CANDY", nextScene: 14 }
    ]
  },
  13: {
    text: "Not everyone who smiles has good intentions.",
    backgroundImage: "scene-13.jpeg",
    choices: [{ text: "gameover", nextScene: 0 }]
  },
  14: {
    text: "Chibi shakes his head and turns away.",
    backgroundImage: "scene-14.jpeg",
    choices: [{ text: "Next", nextScene: 15 }]
  },
  15: {
    text: "Suddenly, he hears a soft bark behind him. A glowing, angelic dog appears, wagging its tail.",
    backgroundImage: "scene-15.jpeg",
    choices: [{ text: "Next", nextScene: 16 }]
  },
  16: {
    text: "Chibi: “Whoa... are you here to help me?”",
    backgroundImage: "scene-16.jpeg",
    choices:[{text:"Next", nextScene: 17 }]
  },
  17: {
    text: "The dog barks again and starts walking. Chibi follows, and soon —",
    backgroundImage: "scene-17.jpeg",
    choices: [{ text: "Next", nextScene: 18 }]
  },
  18: {
    text: "He sees his MOTHER.",
    backgroundImage: "scene-18.jpeg",
    choices: [{ text: "Game Over", nextScene: 0 }]
  }
};
const textBox = document.getElementById("text-box");
const choicesContainer = document.getElementById("choices");
const blipSound = document.getElementById("blip");

function typeText(text, callback, disableBlip = false) {
  textBox.innerHTML = "";
  choicesContainer.classList.add("hidden");

  let i = 0;
  const totalDuration = 4000;
  const speed = totalDuration / text.length;

  const interval = setInterval(() => {
    if (i < text.length) {
      const char = text[i];
      
     
      if (char === " ") {
        textBox.innerHTML += "&nbsp;";
      } else {
        textBox.innerHTML += char;

        if (!disableBlip) {
          blipSound.currentTime = 0;
          blipSound.play();
        }
      }

      i++;
    } else {
      clearInterval(interval);
      blipSound.pause();
      callback();
    }
  }, speed);
}


function renderScene(id) {
  const scene = scenes[id];
  if (!scene) return;

  document.body.style.backgroundImage = `url('${scene.backgroundImage}')`;

  // Center the text box 
  if (id === 8 || id === 13) {
    textBox.classList.add("center-text");
  } else {
    textBox.classList.remove("center-text");
  }

  const disableBlip = id === 0;

  typeText(scene.text, () => {
    choicesContainer.innerHTML = "";

    scene.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.innerText = choice.text;
      btn.onclick = () => renderScene(choice.nextScene);
      choicesContainer.appendChild(btn);
    });

    choicesContainer.classList.remove("hidden");
  }, disableBlip);
}
renderScene(0);