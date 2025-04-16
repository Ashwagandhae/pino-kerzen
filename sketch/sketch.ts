let gameState: State = { tag: "menu" };

// let resources:

let renderer: p5.Renderer;

const imageNames = [
  "background",
  "background_1",
  "background_2",
  "background_3",
  "background_4",
  "balcony",
  "basketball",
  "bird_water",
  "cake_eaten",
  "cake",
  "candle",
  "dog_flipped",
  "dog",
  "grass_stone",
  "grass",
  "midground",
  "stone",
  "table",
  "trampoline",
  "tree_blue",
  "tree_green",
  "sky",
  "people",
  "person",
  "cake_candle",
] as const;

type ImageName = (typeof imageNames)[number];

let images: Partial<Record<ImageName, p5.Image>> = {};

function setup() {
  gameState = { tag: "menu" };
  // gameState = { tag: "finish", frame: 0, lastSwitchTime: millis() };

  renderer = createCanvas(640, 640);
  renderer.style("height", "min(640px, min(100vh, 100vw))");
  renderer.style("width", "min(640px, min(100vh, 100vw))");

  noSmooth();

  for (let name of imageNames) {
    images[name] = loadImage(`./assets/${name}.png`);
  }
}
// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
  if (gameState.tag == "start" || gameState.tag == "finish") {
    gameState = updateStartOrFinish(gameState);
  } else if (gameState.tag == "collect") {
    gameState = updateCollect(gameState);
  }

  push();
  if (gameState.tag == "start") {
    drawStart(gameState);
  } else if (gameState.tag == "menu") {
    drawMenu(gameState);
  } else if (gameState.tag == "collect") {
    drawCollect(gameState);
  } else if (gameState.tag == "finish") {
    drawFinish(gameState);
  }
  pop();
}
const startMessages = [
  "Wir sind in Bad Kreuznach, im Omahaus.",
  "Es ist Gugus 6. Geburtstag!",
  "Pino bereitet den Kuchen vor.",
  "Pino holt erst den Tisch...",
  "Dann holt Pino den Oma-Kuchen...",
  "Und das Wichtigste: die Kerzen!",
  "Oh nein! Die Kerzen fallen in den Garten!",
  "Pino springt hinterher, um sie zu retten.",
  "Hilf Pino, die Kerzen zu sammeln!",
];
function clamp(num: number, low: number, hi: number) {
  return Math.max(low, Math.min(hi, num));
}

function drawBackgroundTiled(imageName: ImageName, offset: number, y: number) {
  image(images[imageName], offset % 640, y, 640, 640);
  image(images[imageName], (offset % 640) + 640, y, 640, 640);
  image(images[imageName], (offset % 640) - 640, y, 640, 640);
}

function drawWindmills(x: number, y: number, w: number, h: number) {
  let currentFrame = Math.round((millis() / 1000) * 1.5) % 4;
  let imageString: ImageName;
  if (currentFrame == 0) {
    imageString = "background_1";
  } else if (currentFrame == 1) {
    imageString = "background_2";
  } else if (currentFrame == 2) {
    imageString = "background_3";
  } else if (currentFrame == 3) {
    imageString = "background_4";
  }
  image(images[imageString], x, y, w, h);
}
function drawStart(gameState: StartState) {
  background(color("#B7DCF5"));
  noSmooth();

  let globalSecs = millis() / 1000;
  let currentSecs = (millis() - gameState.lastSwitchTime) / 1000;

  let secs2 = clamp(currentSecs / 2.0, 0.0, 1.0);
  let secs22 = clamp((currentSecs - 2.0) / 2.0, 0.0, 1.0);
  let secs23 = clamp((currentSecs - 4.0) / 2.0, 0.0, 1.0);

  if (gameState.frame == 0) {
    drawBackgroundTiled("sky", globalSecs * 10, lerp(640, 0, secs2));
    drawWindmills(0, lerp(640, 0, secs2), 640, 640);
  } else if (gameState.frame == 1) {
    drawBackgroundTiled("sky", globalSecs * 10, 0);
    drawWindmills(0, 0, 640, 640);
    image(images["balcony"], 0, lerp(640, 0, secs2), 640, 640);
  } else if (gameState.frame == 2) {
    drawBackgroundTiled("sky", globalSecs * 10, 0);

    drawWindmills(0, 0, 640, 640);
    image(images["balcony"], 0, 0, 640, 640);
    image(images["dog"], lerp(-640, 0, secs2), 0, 640, 640);
  } else if (gameState.frame == 3) {
    drawBackgroundTiled("sky", globalSecs * 10, 0);

    drawWindmills(0, 0, 640, 640);
    image(images["balcony"], 0, 0, 640, 640);
    if (currentSecs < 2) {
      image(images["dog_flipped"], lerp(0, -640, secs2), 0, 640, 640);
    } else {
      image(images["dog"], lerp(-640, 0, secs22) - 220, 200, 640, 640);
      image(images["table"], lerp(-640, 0, secs22), 200, 640, 640);
    }
  } else if (gameState.frame == 4) {
    drawBackgroundTiled("sky", globalSecs * 10, 0);

    drawWindmills(0, 0, 640, 640);
    image(images["balcony"], 0, 0, 640, 640);
    image(images["table"], 0, 200, 640, 640);

    if (currentSecs < 2) {
      image(images["dog"], lerp(0, -640, secs2) - 220, 200, 640, 640);
    } else if (currentSecs < 4) {
      image(images["dog_flipped"], lerp(640, 0, secs22) + 220, 200, 640, 640);
      image(images["cake"], lerp(640, 0, secs22) + 40, 200, 640, 640);
    } else if (currentSecs < 4.5) {
      image(
        images["dog_flipped"],
        220 + lerp(0, -40, clamp((currentSecs - 4.0) / 0.5, 0, 1)),
        200,
        640,
        640
      );
      image(images["cake"], 40, 200, 640, 640);
    } else {
      image(images["cake_eaten"], 40, 200, 640, 640);
      image(
        images["dog_flipped"],
        220 + lerp(-40, 0, clamp((currentSecs - 4.5) / 0.5, 0, 1)),
        200,
        640,
        640
      );
    }
  } else if (gameState.frame == 5) {
    drawBackgroundTiled("sky", globalSecs * 10, 0);

    drawWindmills(0, 0, 640, 640);
    image(images["balcony"], 0, 0, 640, 640);
    image(images["table"], 0, 200, 640, 640);
    image(images["cake_eaten"], 40, 200, 640, 640);
    if (currentSecs < 2) {
      image(images["dog_flipped"], lerp(0, 640, secs2) + 220, 200, 640, 640);
    } else {
      for (let i = 0; i < 6; i++) {
        let candleX = 140 + 40 * cos((i / 6) * 2 * Math.PI);
        let candleY = 80 + 40 * sin((i / 6) * 2 * Math.PI);
        image(
          images["candle"],
          lerp(640, 0, secs22) + candleX,
          candleY,
          640,
          640
        );
      }
      image(images["dog_flipped"], lerp(640, 0, secs22) + 220, 100, 640, 640);
    }
  } else if (gameState.frame == 6) {
    drawBackgroundTiled("sky", globalSecs * 10, 0);

    drawWindmills(0, 0, 640, 640);
    if (currentSecs >= 2) {
      for (let i = 0; i < 6; i++) {
        let candleX = 140 + 40 * cos((i / 6) * 2 * Math.PI + currentSecs);
        let candleY = 80 + 40 * sin((i / 6) * 2 * Math.PI + currentSecs);
        image(
          images["candle"],
          candleX,
          candleY - lerp(-200, 300, sin((Math.PI + secs22 * Math.PI) / 2)),
          640,
          640
        );
      }
    }
    image(images["balcony"], 0, 0, 640, 640);
    image(images["table"], 0, 200, 640, 640);
    image(images["cake_eaten"], 40, 200, 640, 640);
    if (currentSecs < 2) {
      for (let i = 0; i < 6; i++) {
        let candleX = 140 + 40 * cos((i / 6) * 2 * Math.PI + currentSecs);
        let candleY = 80 + 40 * sin((i / 6) * 2 * Math.PI + currentSecs);
        image(
          images["candle"],
          candleX,
          candleY - lerp(0, 300, sin((secs2 * Math.PI) / 2)),
          640,
          640
        );
      }
    }
    image(images["dog_flipped"], 220, 100, 640, 640);
  } else if (gameState.frame == 7) {
    drawBackgroundTiled("sky", globalSecs * 10, 0);

    drawWindmills(0, 0, 640, 640);
    if (currentSecs >= 2) {
      image(
        images["dog_flipped"],
        220,
        100 - lerp(-200, 300, sin((Math.PI + secs22 * Math.PI) / 2)),
        640,
        640
      );
    }
    image(images["balcony"], 0, 0, 640, 640);
    image(images["table"], 0, 200, 640, 640);
    image(images["cake_eaten"], 40, 200, 640, 640);
    if (currentSecs < 2) {
      image(
        images["dog_flipped"],
        220,
        100 - lerp(0, 300, sin((secs2 * Math.PI) / 2)),
        640,
        640
      );
    }
  } else if (gameState.frame == 8) {
    drawBackgroundTiled(
      "sky",
      globalSecs * 10,
      lerp(0, 640, clamp(currentSecs / 4.0, 0.0, 1.0))
    );
    drawWindmills(
      0,
      0 + lerp(0, 640, clamp(currentSecs / 3.0, 0.0, 1.0)),
      640,
      640
    );
    image(images["balcony"], 0, 0 + lerp(0, 640, secs2), 640, 640);
    image(images["table"], 0, 200 + lerp(0, 640, secs2), 640, 640);
    image(images["cake_eaten"], 40, 200 + lerp(0, 640, secs2), 640, 640);
  }

  noStroke();

  let message = startMessages[gameState.frame];

  displayMessage(message, currentSecs);
}

function displayMessage(
  message: string,
  currentSecs: number,
  speed = 10,
  offsetX = 0
) {
  push();
  fill("black");
  textSize(25);
  textFont("Times New Roman");
  let numberOfChars = Math.floor(currentSecs * speed);

  let messageTrunc = message.substring(0, numberOfChars);

  text(messageTrunc, 10 + offsetX, 30);
  pop();
}

function drawMenu(gameState: MenuState) {
  background("white");
  textFont("Times New Roman");
  textAlign(CENTER);
  textSize(25);
  text("Drücke die Leertaste, um zu starten", 50, 100, 400);
}

function newPhys(pos: Vec, size: Vec, name: string): Phys {
  return {
    pos,
    vel: newVec(0, 0),
    grounded: false,
    size,
    name,
  };
}

function newVec(x: number, y: number): Vec {
  return { x, y };
}

function mulv({ x, y }: Vec, c: number): Vec {
  return { x: c * x, y: c * y };
}

function addv(v1: Vec, v2: Vec): Vec {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
}

function distv(v1: Vec, v2: Vec): number {
  return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
}

function keyPressed() {
  if (gameState.tag == "menu") {
    if (key === " ") {
      gameState = { tag: "start", frame: 0, lastSwitchTime: millis() };
    }
  } else if (gameState.tag == "start") {
    if (key === " ") {
      if (gameState.frame == startMessages.length - 1) {
        gameState = newCollect();
      } else {
        gameState.frame += 1;

        gameState.lastSwitchTime = millis();
      }
    }
  } else if (gameState.tag == "finish") {
    if (key === " ") {
      if (gameState.frame == finishMessages.length - 1) {
        return;
      } else {
        gameState.frame += 1;

        gameState.lastSwitchTime = millis();
      }
    }
  }
}

function updateStartOrFinish(gameState: StartState | FinishState): State {
  if (millis() - gameState.lastSwitchTime > 8000) {
    if (gameState.tag == "start") {
      if (gameState.frame == startMessages.length - 1) {
        return newCollect();
      } else {
        gameState.frame += 1;

        gameState.lastSwitchTime = millis();
      }
    }
    if (gameState.tag == "finish") {
      if (gameState.frame == finishMessages.length - 1) {
        return gameState;
      } else {
        gameState.frame += 1;

        gameState.lastSwitchTime = millis();
      }
    }
  }
  return gameState;
}

function drawFuncImage(name: ImageName): (x: number, y: number) => void {
  return (x, y) => image(images[name], x, y, 640, 640);
}

function newCollect(): CollectState {
  let backgrounds: Background[] = [];
  for (let i = -3; i < 4; i++) {
    backgrounds.push({
      drawFunc: (x, y) =>
        drawBackgroundTiled("sky", x + (millis() / 1000) * 10, y),
      cameraInfluence: 0.125,
      pos: newVec(i * 640, 320),
    });
  }

  for (let i = -3; i < 4; i++) {
    backgrounds.push({
      drawFunc: (x, y) => drawWindmills(x, y, 640, 640),
      cameraInfluence: 0.25,
      pos: newVec(i * 640, 320),
    });
  }

  for (let i = -3; i < 4; i++) {
    backgrounds.push({
      drawFunc: drawFuncImage("midground"),
      cameraInfluence: 0.5,
      pos: newVec(i * 640, 320),
    });
  }
  for (let i = -16; i <= 16; i++) {
    backgrounds.push({
      drawFunc: drawFuncImage(i % 2 == 0 ? "tree_green" : "tree_blue"),
      cameraInfluence: 1.0,
      pos: newVec(i * 140, 320),
    });
  }
  backgrounds.push(
    {
      drawFunc: drawFuncImage("stone"),
      cameraInfluence: 1.0,
      pos: newVec(-640 * 3, 320),
    },
    {
      drawFunc: drawFuncImage("grass_stone"),
      cameraInfluence: 1.0,
      pos: newVec(-640 * 2, 320),
    },
    {
      drawFunc: drawFuncImage("grass"),
      cameraInfluence: 1.0,
      pos: newVec(-640, 320),
    },
    {
      drawFunc: drawFuncImage("grass"),
      cameraInfluence: 1.0,
      pos: newVec(0, 320),
    },
    {
      drawFunc: drawFuncImage("grass"),
      cameraInfluence: 1.0,
      pos: newVec(640, 320),
    },
    {
      drawFunc: drawFuncImage("trampoline"),
      cameraInfluence: 1.0,
      pos: newVec(640 * 2, 320),
    }
  );

  return {
    tag: "collect",
    dog: {
      phys: newPhys(newVec(0, 320), newVec(100, 100), "dog"),
      flipped: false,
    },
    ball: {
      phys: newPhys(newVec(-2 * 640 - 320, 0), newVec(80, 80), "ball"),
    },
    water: { phys: newPhys(newVec(-640, 0), newVec(120, 40), "water") },
    camera: { pos: newVec(-320, 0) },
    candles: [
      { pos: newVec(-2 * 640 - 320, 500), foundTime: null },
      { pos: newVec(-1 * 640 - 100, 560), foundTime: null },
      { pos: newVec(-320, 500), foundTime: null },
      { pos: newVec(420, 300), foundTime: null },
      { pos: newVec(640 * 2, -20), foundTime: null },
      { pos: newVec(-640 * 3 - 320, 520), foundTime: null },
    ],
    startTime: millis(),

    backgrounds,
    lastMessageTime: millis(),
    message: candleMessages[0],
  };
}

function angleBetween(v1: Vec, v2: Vec): number {
  let { x: x1, y: y1 } = v1;
  let { x: x2, y: y2 } = v2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.atan2(dy, dx); // in radians
}

function updateCollect(gameState: CollectState): State {
  let inTrampoline =
    gameState.dog.phys.pos.x > 640 * 1 + 500 &&
    gameState.dog.phys.pos.x < 640 * 3;
  if (keyIsDown(LEFT_ARROW)) {
    gameState.dog.flipped = true;
    if (gameState.dog.phys.grounded) {
      gameState.dog.phys.vel.x -= 2;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    gameState.dog.flipped = false;
    if (gameState.dog.phys.grounded) {
      gameState.dog.phys.vel.x += 2;
    }
  }

  if (keyIsDown(UP_ARROW)) {
    if (gameState.dog.phys.grounded) {
      if (inTrampoline) {
        gameState.dog.phys.vel.y = -40;
      } else {
        gameState.dog.phys.vel.y = -20;
      }
      if (keyIsDown(LEFT_ARROW)) {
        gameState.dog.phys.vel.x -= 5;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        gameState.dog.phys.vel.x += 5;
      }
    }
  }

  // if (keyIsDown(UP_ARROW)) {
  //   gameState.camera.pos.y -= 10;
  // }
  // if (keyIsDown(DOWN_ARROW)) {
  //   gameState.camera.pos.y += 10;
  // }

  // gameState.camera.pos = mulv(addv(gameState.dog.phys.pos, mulv(gameState.camera.pos, -1)), 0
  let targetPos = addv(gameState.dog.phys.pos, newVec(-320, -320));
  gameState.camera.pos = targetPos;

  if (gameState.camera.pos.y > 0) {
    gameState.camera.pos.y = 0;
  }

  if (gameState.camera.pos.x > 640 * 2 - 320) {
    gameState.camera.pos.x = 640 * 2 - 320;
  }
  if (gameState.camera.pos.x < 640 * -3 - 320) {
    gameState.camera.pos.x = 640 * -3 - 320;
  }

  let phys = gameState.dog.phys;
  for (let otherPhys of [gameState.ball.phys, gameState.water.phys]) {
    if (otherPhys.name == phys.name) {
      continue;
    }
    let xRad = (phys.size.x + otherPhys.size.x) / 2;
    let yRad = (phys.size.y + otherPhys.size.y) / 2;
    let ang = angleBetween(phys.pos, otherPhys.pos);

    let radius = Math.abs(xRad * cos(ang)) + Math.abs(yRad * sin(ang));

    let distX = phys.pos.x - otherPhys.pos.x;
    let distY = phys.pos.y - otherPhys.pos.y;
    let dist = sqrt(distX * distX + distY * distY);
    if (dist < radius) {
      let unit = mulv(newVec(distX, distY), 1 / dist);

      let distToMove = radius - dist;

      phys.pos = addv(phys.pos, mulv(unit, distToMove * 0.5));
      otherPhys.pos = addv(otherPhys.pos, mulv(unit, distToMove * -0.5));

      // if (distX > distY) {
      //   let distToMoveX = xRad - Math.abs(distX);
      //   if (distX <= 0) {
      //     distToMoveX *= -1;
      //   }
      //   phys.pos.x += distToMoveX * 0.5;
      //   otherPhys.pos.x -= distToMoveX * 0.5;
      // } else {
      //   let distToMoveY = yRad - Math.abs(distY);
      //   if (distY <= 0) {
      //     distToMoveY *= -1;
      //   }
      //   phys.pos.y += distToMoveY * 0.5;
      //   otherPhys.pos.y -= distToMoveY * 0.5;
      // }
      // phys.vel = addv(phys.vel, mulv(newVec(distX, distY), 0.1));
      // otherPhys.vel = addv(otherPhys.vel, mulv(newVec(-distX, -distY), 0.1));

      phys.grounded = true;
      otherPhys.grounded = true;
    }
  }

  const MAX_Y = 540;
  const MIN_X = 640 * -3 - 320;
  const MAX_X = 640 * 2 + 320;
  for (let phys of [
    gameState.dog.phys,
    gameState.ball.phys,
    gameState.water.phys,
  ]) {
    phys.vel.y += 1;
    phys.vel = mulv(phys.vel, 0.98);
    if (phys.grounded) {
      phys.vel.x *= 0.8;
    }
    phys.pos = addv(phys.pos, phys.vel);
    phys.grounded = false;
    if (phys.pos.y > MAX_Y - phys.size.y / 2) {
      phys.pos.y = MAX_Y - phys.size.y / 2;
      if (phys.vel.y > 0) {
        phys.vel.y = 0;
      }
    }
    if (phys.pos.y >= MAX_Y - phys.size.y / 2) {
      phys.grounded = true;
    }
    if (phys.pos.x > MAX_X - phys.size.x / 2 && phys.name == "dog") {
      phys.pos.x = MAX_X - phys.size.x / 2;
      if (phys.vel.x > 0) {
        phys.vel.x = 0;
      }
    }
    if (phys.pos.x < MIN_X + phys.size.x / 2 && phys.name == "dog") {
      phys.pos.x = MIN_X + phys.size.x / 2;
      if (phys.vel.x < 0) {
        phys.vel.x = 0;
      }
    }
  }
  for (let candle of gameState.candles) {
    if (candle.foundTime !== null) continue;
    if (dist(phys.pos.x, phys.pos.y, candle.pos.x, candle.pos.y) < 80) {
      candle.foundTime = millis();
      let foundCandles = 0;
      for (let candle of gameState.candles) {
        if (candle.foundTime !== null) {
          foundCandles += 1;
        }
      }

      gameState.message = candleMessages[foundCandles];
      gameState.lastMessageTime = millis();
    }
  }
  let foundCandles = 0;
  for (let candle of gameState.candles) {
    if (candle.foundTime !== null) {
      foundCandles += 1;
    }
  }
  if (foundCandles >= gameState.candles.length) {
    let candleFoundSecsMax = 0;
    for (let candle of gameState.candles) {
      if (candle.foundTime !== null && candle.foundTime > candleFoundSecsMax) {
        candleFoundSecsMax = candle.foundTime;
      }
    }
    if ((millis() - candleFoundSecsMax) / 1000 >= 6) {
      return { tag: "finish", frame: 0, lastSwitchTime: millis() };
    }
  }

  return gameState;
}

const candleMessages = [
  "0/6 Kerzen. Benutze die Pfeile, um Pino zu bewegen.",
  "1/6 Kerzen! Du kannst mit dem Hochpfeil springen.",
  "2/6 Kerzen! Gut gemacht, finde jetzt die anderen 4.",
  "3/6 Kerzen! Schneller, Gugu wird hungrig.",
  "4/6 Kerzen! Unglückszahl – finde schnell noch eine.",
  "5/6 Kerzen! Fast fertig!",
  "6/6 Kerzen! Yippie!!",
];
function drawCollect(gameState: CollectState) {
  background(color("#B7DCF5"));

  let cameraPos = structuredClone(gameState.camera.pos);
  let currentSecs = (millis() - gameState.startTime) / 1000;
  let initTransition = 3.0;
  if (currentSecs <= initTransition) {
    cameraPos.y -=
      sin((Math.PI / 2) * (1 - currentSecs / initTransition)) * 640 * 8;
  }
  let foundCandles = 0;
  for (let candle of gameState.candles) {
    if (candle.foundTime !== null) {
      foundCandles += 1;
    }
  }
  if (foundCandles >= gameState.candles.length) {
    let candleFoundSecsMax = 0;
    for (let candle of gameState.candles) {
      if (candle.foundTime !== null && candle.foundTime > candleFoundSecsMax) {
        candleFoundSecsMax = candle.foundTime;
      }
    }
    if ((millis() - candleFoundSecsMax) / 1000 >= 3) {
      let secs = (millis() - candleFoundSecsMax) / 1000 - 3;
      cameraPos.y -= (1 - sin((Math.PI / 2) * (1 - secs / 3))) * 640 * 8;
    }
  }

  imageMode(CENTER);
  let globalSecs = millis() / 1000;
  for (let background of gameState.backgrounds) {
    background.drawFunc(
      background.pos.x - cameraPos.x * background.cameraInfluence,
      background.pos.y - cameraPos.y * background.cameraInfluence
    );
  }

  let dogPhys = gameState.dog.phys;

  for (let candle of gameState.candles) {
    if (candle.foundTime === null) {
      image(
        images["candle"],
        candle.pos.x - cameraPos.x,
        candle.pos.y - cameraPos.y,
        640,
        640
      );
    }
  }

  image(
    images["basketball"],
    gameState.ball.phys.pos.x - cameraPos.x,
    gameState.ball.phys.pos.y - cameraPos.y,
    640,
    640
  );

  image(
    images["bird_water"],
    gameState.water.phys.pos.x - cameraPos.x,
    gameState.water.phys.pos.y - cameraPos.y + 30,
    640,
    640
  );
  image(
    images[gameState.dog.flipped ? "dog_flipped" : "dog"],
    dogPhys.pos.x - cameraPos.x,
    dogPhys.pos.y - cameraPos.y,
    640,
    640
  );

  for (let candle of gameState.candles) {
    if (candle.foundTime !== null) {
      let candleFoundSecs = (millis() - candle.foundTime) / 1000;
      console.log(candleFoundSecs);
      if (candleFoundSecs <= 2) {
        image(
          images["candle"],
          candle.pos.x - cameraPos.x,
          candle.pos.y - cameraPos.y - (candleFoundSecs / 2) * 200,
          640,
          640
        );
      }
    }
  }

  displayMessage(
    gameState.message,
    (millis() - gameState.lastMessageTime) / 1000,
    20
  );
}

const finishMessages = [
  "Gut gemacht! Pino hat alle Kerzen rechtzeitig gefunden. ",
  "Da kommen Gugu und ein paar andere kleine Leute!",
  "Und da kommt der große Julian!",
  "Es ist Zeit zu feiern. Alles Gute zum Geburtstag, Gugu!",
];

function drawFinish(gameState: FinishState) {
  background(color("#B7DCF5"));
  noSmooth();

  let globalSecs = millis() / 1000;
  let currentSecs = (millis() - gameState.lastSwitchTime) / 1000;

  let secs2 = clamp(currentSecs / 2.0, 0.0, 1.0);
  let secs22 = clamp((currentSecs - 2.0) / 2.0, 0.0, 1.0);
  let secs23 = clamp((currentSecs - 4.0) / 2.0, 0.0, 1.0);

  if (gameState.frame == 0) {
    drawBackgroundTiled(
      "sky",
      globalSecs * 10,
      lerp(640, 0, clamp(currentSecs / 4.0, 0.0, 1.0))
    );
    drawWindmills(
      0,
      0 + lerp(640, 0, clamp(currentSecs / 4.0, 0.0, 1.0)),
      640,
      640
    );
    image(
      images["balcony"],
      0,
      0 + lerp(640, 0, clamp(currentSecs / 4.0, 0.0, 1.0)),
      640,
      640
    );
    image(
      images["table"],
      0,
      200 + lerp(640, 0, clamp(currentSecs / 4.0, 0.0, 1.0)),
      640,
      640
    );
    image(
      images["cake_candle"],
      40,
      200 + lerp(640, 0, clamp(currentSecs / 4.0, 0.0, 1.0)),
      640,
      640
    );
    image(
      images["dog_flipped"],
      220,
      250 + lerp(640, 0, clamp(currentSecs / 4.0, 0.0, 1.0)),
      640,
      640
    );
  } else if (gameState.frame == 1) {
    drawBackgroundTiled("sky", globalSecs * 10, 0);
    drawWindmills(0, 0 + 0, 640, 640);
    image(images["balcony"], 0, 0 + 0, 640, 640);
    image(images["table"], 0, 200 + 0, 640, 640);
    image(images["cake_candle"], 40, 200 + 0, 640, 640);
    image(images["dog_flipped"], 220, 250 + 0, 640, 640);
    image(images["people"], 0 + lerp(640, 0, secs2), 0, 640, 640);
  } else if (gameState.frame == 2) {
    drawBackgroundTiled("sky", globalSecs * 10, 0);
    drawWindmills(0, 0 + 0, 640, 640);
    image(images["balcony"], 0, 0 + 0, 640, 640);
    image(images["table"], 0, 200 + 0, 640, 640);
    image(images["cake_candle"], 40, 200 + 0, 640, 640);
    image(images["dog_flipped"], 220, 250 + 0, 640, 640);
    image(images["people"], 0, 0, 640, 640);
    image(images["person"], 0 + lerp(-640, 0, secs2), 0, 640, 640);
  } else if (gameState.frame == 3) {
    drawBackgroundTiled("sky", globalSecs * 10, 0);
    drawWindmills(0, 0 + 0, 640, 640);
    image(images["balcony"], 0, 0 + 0, 640, 640);
    image(images["table"], 0, 200 + 0, 640, 640);
    image(images["cake_candle"], 40, 200 + 0, 640, 640);

    image(images["people"], 0, 0 + sin(currentSecs * 10), 640, 640);
    image(
      images["dog_flipped"],
      220,
      250 + 0 + sin(currentSecs * 10) * 5,
      640,
      640
    );
    image(images["person"], 0, 0 + (sin(currentSecs * 10) - 1) * 10, 640, 640);
  }
  noStroke();

  let message = finishMessages[gameState.frame];

  if (gameState.frame >= 2) {
    displayMessage(message, currentSecs, 10, 60);
  } else {
    displayMessage(message, currentSecs);
  }
}
