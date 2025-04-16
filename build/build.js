var gameState = { tag: "menu" };
var renderer;
var imageNames = [
    "background",
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
];
var images = {};
function setup() {
    gameState = { tag: "menu" };
    renderer = createCanvas(640, 640);
    renderer.style("height", "min(640px, min(100vh, 100vw))");
    renderer.style("width", "min(640px, min(100vh, 100vw))");
    noSmooth();
    for (var _i = 0, imageNames_1 = imageNames; _i < imageNames_1.length; _i++) {
        var name_1 = imageNames_1[_i];
        images[name_1] = loadImage("./assets/" + name_1 + ".png");
    }
}
function draw() {
    if (gameState.tag == "start" || gameState.tag == "finish") {
        gameState = updateStartOrFinish(gameState);
    }
    else if (gameState.tag == "collect") {
        gameState = updateCollect(gameState);
    }
    push();
    if (gameState.tag == "start") {
        drawStart(gameState);
    }
    else if (gameState.tag == "menu") {
        drawMenu(gameState);
    }
    else if (gameState.tag == "collect") {
        drawCollect(gameState);
    }
    else if (gameState.tag == "finish") {
        drawFinish(gameState);
    }
    pop();
}
var startMessages = [
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
function clamp(num, low, hi) {
    return Math.max(low, Math.min(hi, num));
}
function drawBackgroundTiled(imageName, offset, y) {
    image(images[imageName], offset % 640, y, 640, 640);
    image(images[imageName], (offset % 640) + 640, y, 640, 640);
    image(images[imageName], (offset % 640) - 640, y, 640, 640);
}
function drawStart(gameState) {
    background(color("#B7DCF5"));
    noSmooth();
    var globalSecs = millis() / 1000;
    var currentSecs = (millis() - gameState.lastSwitchTime) / 1000;
    var secs2 = clamp(currentSecs / 2.0, 0.0, 1.0);
    var secs22 = clamp((currentSecs - 2.0) / 2.0, 0.0, 1.0);
    var secs23 = clamp((currentSecs - 4.0) / 2.0, 0.0, 1.0);
    if (gameState.frame == 0) {
        drawBackgroundTiled("sky", globalSecs * 10, lerp(640, 0, secs2));
        image(images["background"], 0, lerp(640, 0, secs2), 640, 640);
    }
    else if (gameState.frame == 1) {
        drawBackgroundTiled("sky", globalSecs * 10, 0);
        image(images["background"], 0, 0, 640, 640);
        image(images["balcony"], 0, lerp(640, 0, secs2), 640, 640);
    }
    else if (gameState.frame == 2) {
        drawBackgroundTiled("sky", globalSecs * 10, 0);
        image(images["background"], 0, 0, 640, 640);
        image(images["balcony"], 0, 0, 640, 640);
        image(images["dog"], lerp(-640, 0, secs2), 0, 640, 640);
    }
    else if (gameState.frame == 3) {
        drawBackgroundTiled("sky", globalSecs * 10, 0);
        image(images["background"], 0, 0, 640, 640);
        image(images["balcony"], 0, 0, 640, 640);
        if (currentSecs < 2) {
            image(images["dog_flipped"], lerp(0, -640, secs2), 0, 640, 640);
        }
        else {
            image(images["dog"], lerp(-640, 0, secs22) - 220, 200, 640, 640);
            image(images["table"], lerp(-640, 0, secs22), 200, 640, 640);
        }
    }
    else if (gameState.frame == 4) {
        drawBackgroundTiled("sky", globalSecs * 10, 0);
        image(images["background"], 0, 0, 640, 640);
        image(images["balcony"], 0, 0, 640, 640);
        image(images["table"], 0, 200, 640, 640);
        if (currentSecs < 2) {
            image(images["dog"], lerp(0, -640, secs2) - 220, 200, 640, 640);
        }
        else if (currentSecs < 4) {
            image(images["dog_flipped"], lerp(640, 0, secs22) + 220, 200, 640, 640);
            image(images["cake"], lerp(640, 0, secs22) + 40, 200, 640, 640);
        }
        else if (currentSecs < 4.5) {
            image(images["dog_flipped"], 220 + lerp(0, -40, clamp((currentSecs - 4.0) / 0.5, 0, 1)), 200, 640, 640);
            image(images["cake"], 40, 200, 640, 640);
        }
        else {
            image(images["cake_eaten"], 40, 200, 640, 640);
            image(images["dog_flipped"], 220 + lerp(-40, 0, clamp((currentSecs - 4.5) / 0.5, 0, 1)), 200, 640, 640);
        }
    }
    else if (gameState.frame == 5) {
        drawBackgroundTiled("sky", globalSecs * 10, 0);
        image(images["background"], 0, 0, 640, 640);
        image(images["balcony"], 0, 0, 640, 640);
        image(images["table"], 0, 200, 640, 640);
        image(images["cake_eaten"], 40, 200, 640, 640);
        if (currentSecs < 2) {
            image(images["dog_flipped"], lerp(0, 640, secs2) + 220, 200, 640, 640);
        }
        else {
            for (var i = 0; i < 6; i++) {
                var candleX = 140 + 40 * cos((i / 6) * 2 * Math.PI);
                var candleY = 80 + 40 * sin((i / 6) * 2 * Math.PI);
                image(images["candle"], lerp(640, 0, secs22) + candleX, candleY, 640, 640);
            }
            image(images["dog_flipped"], lerp(640, 0, secs22) + 220, 100, 640, 640);
        }
    }
    else if (gameState.frame == 6) {
        drawBackgroundTiled("sky", globalSecs * 10, 0);
        image(images["background"], 0, 0, 640, 640);
        if (currentSecs >= 2) {
            for (var i = 0; i < 6; i++) {
                var candleX = 140 + 40 * cos((i / 6) * 2 * Math.PI + currentSecs);
                var candleY = 80 + 40 * sin((i / 6) * 2 * Math.PI + currentSecs);
                image(images["candle"], candleX, candleY - lerp(-200, 300, sin((Math.PI + secs22 * Math.PI) / 2)), 640, 640);
            }
        }
        image(images["balcony"], 0, 0, 640, 640);
        image(images["table"], 0, 200, 640, 640);
        image(images["cake_eaten"], 40, 200, 640, 640);
        if (currentSecs < 2) {
            for (var i = 0; i < 6; i++) {
                var candleX = 140 + 40 * cos((i / 6) * 2 * Math.PI + currentSecs);
                var candleY = 80 + 40 * sin((i / 6) * 2 * Math.PI + currentSecs);
                image(images["candle"], candleX, candleY - lerp(0, 300, sin((secs2 * Math.PI) / 2)), 640, 640);
            }
        }
        image(images["dog_flipped"], 220, 100, 640, 640);
    }
    else if (gameState.frame == 7) {
        drawBackgroundTiled("sky", globalSecs * 10, 0);
        image(images["background"], 0, 0, 640, 640);
        if (currentSecs >= 2) {
            image(images["dog_flipped"], 220, 100 - lerp(-200, 300, sin((Math.PI + secs22 * Math.PI) / 2)), 640, 640);
        }
        image(images["balcony"], 0, 0, 640, 640);
        image(images["table"], 0, 200, 640, 640);
        image(images["cake_eaten"], 40, 200, 640, 640);
        if (currentSecs < 2) {
            image(images["dog_flipped"], 220, 100 - lerp(0, 300, sin((secs2 * Math.PI) / 2)), 640, 640);
        }
    }
    else if (gameState.frame == 8) {
        drawBackgroundTiled("sky", globalSecs * 10, lerp(0, 640, clamp(currentSecs / 4.0, 0.0, 1.0)));
        image(images["background"], 0, 0 + lerp(0, 640, clamp(currentSecs / 3.0, 0.0, 1.0)), 640, 640);
        image(images["balcony"], 0, 0 + lerp(0, 640, secs2), 640, 640);
        image(images["table"], 0, 200 + lerp(0, 640, secs2), 640, 640);
        image(images["cake_eaten"], 40, 200 + lerp(0, 640, secs2), 640, 640);
    }
    noStroke();
    var message = startMessages[gameState.frame];
    displayMessage(message, currentSecs);
}
function displayMessage(message, currentSecs, speed, offsetX) {
    if (speed === void 0) { speed = 10; }
    if (offsetX === void 0) { offsetX = 0; }
    push();
    fill("black");
    textSize(25);
    textFont("Times New Roman");
    var numberOfChars = Math.floor(currentSecs * speed);
    var messageTrunc = message.substring(0, numberOfChars);
    text(messageTrunc, 10 + offsetX, 30);
    pop();
}
function drawMenu(gameState) {
    background("white");
    textFont("Times New Roman");
    textAlign(CENTER);
    textSize(25);
    text("Drücke die Leertaste, um zu starten", 50, 100, 400);
}
function newPhys(pos, size, name) {
    return {
        pos: pos,
        vel: newVec(0, 0),
        grounded: false,
        size: size,
        name: name,
    };
}
function newVec(x, y) {
    return { x: x, y: y };
}
function mulv(_a, c) {
    var x = _a.x, y = _a.y;
    return { x: c * x, y: c * y };
}
function addv(v1, v2) {
    return { x: v1.x + v2.x, y: v1.y + v2.y };
}
function distv(v1, v2) {
    return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
}
function keyPressed() {
    if (gameState.tag == "menu") {
        if (key === " ") {
            gameState = { tag: "start", frame: 0, lastSwitchTime: millis() };
        }
    }
    else if (gameState.tag == "start") {
        if (key === " ") {
            if (gameState.frame == startMessages.length - 1) {
                gameState = newCollect();
            }
            else {
                gameState.frame += 1;
                gameState.lastSwitchTime = millis();
            }
        }
    }
    else if (gameState.tag == "finish") {
        if (key === " ") {
            if (gameState.frame == finishMessages.length - 1) {
                return;
            }
            else {
                gameState.frame += 1;
                gameState.lastSwitchTime = millis();
            }
        }
    }
}
function updateStartOrFinish(gameState) {
    if (millis() - gameState.lastSwitchTime > 8000) {
        if (gameState.tag == "start") {
            if (gameState.frame == startMessages.length - 1) {
                return newCollect();
            }
            else {
                gameState.frame += 1;
                gameState.lastSwitchTime = millis();
            }
        }
        if (gameState.tag == "finish") {
            if (gameState.frame == finishMessages.length - 1) {
                return gameState;
            }
            else {
                gameState.frame += 1;
                gameState.lastSwitchTime = millis();
            }
        }
    }
    return gameState;
}
function drawFuncImage(name) {
    return function (x, y) { return image(images[name], x, y, 640, 640); };
}
function newCollect() {
    var backgrounds = [];
    for (var i = -3; i < 4; i++) {
        backgrounds.push({
            drawFunc: function (x, y) {
                return drawBackgroundTiled("sky", x + (millis() / 1000) * 10, y);
            },
            cameraInfluence: 0.125,
            pos: newVec(i * 640, 320),
        });
    }
    for (var i = -3; i < 4; i++) {
        backgrounds.push({
            drawFunc: drawFuncImage("background"),
            cameraInfluence: 0.25,
            pos: newVec(i * 640, 320),
        });
    }
    for (var i = -3; i < 4; i++) {
        backgrounds.push({
            drawFunc: drawFuncImage("midground"),
            cameraInfluence: 0.5,
            pos: newVec(i * 640, 320),
        });
    }
    for (var i = -16; i <= 16; i++) {
        backgrounds.push({
            drawFunc: drawFuncImage(i % 2 == 0 ? "tree_green" : "tree_blue"),
            cameraInfluence: 1.0,
            pos: newVec(i * 140, 320),
        });
    }
    backgrounds.push({
        drawFunc: drawFuncImage("stone"),
        cameraInfluence: 1.0,
        pos: newVec(-640 * 3, 320),
    }, {
        drawFunc: drawFuncImage("grass_stone"),
        cameraInfluence: 1.0,
        pos: newVec(-640 * 2, 320),
    }, {
        drawFunc: drawFuncImage("grass"),
        cameraInfluence: 1.0,
        pos: newVec(-640, 320),
    }, {
        drawFunc: drawFuncImage("grass"),
        cameraInfluence: 1.0,
        pos: newVec(0, 320),
    }, {
        drawFunc: drawFuncImage("grass"),
        cameraInfluence: 1.0,
        pos: newVec(640, 320),
    }, {
        drawFunc: drawFuncImage("trampoline"),
        cameraInfluence: 1.0,
        pos: newVec(640 * 2, 320),
    });
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
        backgrounds: backgrounds,
        lastMessageTime: millis(),
        message: candleMessages[0],
    };
}
function angleBetween(v1, v2) {
    var x1 = v1.x, y1 = v1.y;
    var x2 = v2.x, y2 = v2.y;
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.atan2(dy, dx);
}
function updateCollect(gameState) {
    var inTrampoline = gameState.dog.phys.pos.x > 640 * 1 + 500 &&
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
            }
            else {
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
    var targetPos = addv(gameState.dog.phys.pos, newVec(-320, -320));
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
    var phys = gameState.dog.phys;
    for (var _i = 0, _a = [gameState.ball.phys, gameState.water.phys]; _i < _a.length; _i++) {
        var otherPhys = _a[_i];
        if (otherPhys.name == phys.name) {
            continue;
        }
        var xRad = (phys.size.x + otherPhys.size.x) / 2;
        var yRad = (phys.size.y + otherPhys.size.y) / 2;
        var ang = angleBetween(phys.pos, otherPhys.pos);
        var radius = Math.abs(xRad * cos(ang)) + Math.abs(yRad * sin(ang));
        var distX = phys.pos.x - otherPhys.pos.x;
        var distY = phys.pos.y - otherPhys.pos.y;
        var dist_1 = sqrt(distX * distX + distY * distY);
        if (dist_1 < radius) {
            var unit = mulv(newVec(distX, distY), 1 / dist_1);
            var distToMove = radius - dist_1;
            phys.pos = addv(phys.pos, mulv(unit, distToMove * 0.5));
            otherPhys.pos = addv(otherPhys.pos, mulv(unit, distToMove * -0.5));
            phys.grounded = true;
            otherPhys.grounded = true;
        }
    }
    var MAX_Y = 540;
    var MIN_X = 640 * -3 - 320;
    var MAX_X = 640 * 2 + 320;
    for (var _b = 0, _c = [
        gameState.dog.phys,
        gameState.ball.phys,
        gameState.water.phys,
    ]; _b < _c.length; _b++) {
        var phys_1 = _c[_b];
        phys_1.vel.y += 1;
        phys_1.vel = mulv(phys_1.vel, 0.98);
        if (phys_1.grounded) {
            phys_1.vel.x *= 0.8;
        }
        phys_1.pos = addv(phys_1.pos, phys_1.vel);
        phys_1.grounded = false;
        if (phys_1.pos.y > MAX_Y - phys_1.size.y / 2) {
            phys_1.pos.y = MAX_Y - phys_1.size.y / 2;
            if (phys_1.vel.y > 0) {
                phys_1.vel.y = 0;
            }
        }
        if (phys_1.pos.y >= MAX_Y - phys_1.size.y / 2) {
            phys_1.grounded = true;
        }
        if (phys_1.pos.x > MAX_X - phys_1.size.x / 2) {
            phys_1.pos.x = MAX_X - phys_1.size.x / 2;
            if (phys_1.vel.x > 0) {
                phys_1.vel.x = 0;
            }
        }
        if (phys_1.pos.x < MIN_X + phys_1.size.x / 2) {
            phys_1.pos.x = MIN_X + phys_1.size.x / 2;
            if (phys_1.vel.x < 0) {
                phys_1.vel.x = 0;
            }
        }
    }
    for (var _d = 0, _e = gameState.candles; _d < _e.length; _d++) {
        var candle = _e[_d];
        if (candle.foundTime !== null)
            continue;
        if (dist(phys.pos.x, phys.pos.y, candle.pos.x, candle.pos.y) < 80) {
            candle.foundTime = millis();
            var foundCandles_1 = 0;
            for (var _f = 0, _g = gameState.candles; _f < _g.length; _f++) {
                var candle_1 = _g[_f];
                if (candle_1.foundTime !== null) {
                    foundCandles_1 += 1;
                }
            }
            gameState.message = candleMessages[foundCandles_1];
            gameState.lastMessageTime = millis();
        }
    }
    var foundCandles = 0;
    for (var _h = 0, _j = gameState.candles; _h < _j.length; _h++) {
        var candle = _j[_h];
        if (candle.foundTime !== null) {
            foundCandles += 1;
        }
    }
    if (foundCandles >= gameState.candles.length) {
        var candleFoundSecsMax = 0;
        for (var _k = 0, _l = gameState.candles; _k < _l.length; _k++) {
            var candle = _l[_k];
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
var candleMessages = [
    "0/6 Kerzen. Benutze die Pfeile, um Pino zu bewegen.",
    "1/6 Kerzen! Du kannst mit dem Hochpfeil springen.",
    "2/6 Kerzen! Gut gemacht, finde jetzt die anderen 4.",
    "3/6 Kerzen! Schneller, Gugu wird hungrig.",
    "4/6 Kerzen! Unglückszahl – finde schnell noch eine.",
    "5/6 Kerzen! Fast fertig!",
    "6/6 Kerzen! Yippie!!",
];
function drawCollect(gameState) {
    background(color("#B7DCF5"));
    var cameraPos = structuredClone(gameState.camera.pos);
    var currentSecs = (millis() - gameState.startTime) / 1000;
    var initTransition = 3.0;
    if (currentSecs <= initTransition) {
        cameraPos.y -=
            sin((Math.PI / 2) * (1 - currentSecs / initTransition)) * 640 * 8;
    }
    var foundCandles = 0;
    for (var _i = 0, _a = gameState.candles; _i < _a.length; _i++) {
        var candle = _a[_i];
        if (candle.foundTime !== null) {
            foundCandles += 1;
        }
    }
    if (foundCandles >= gameState.candles.length) {
        var candleFoundSecsMax = 0;
        for (var _b = 0, _c = gameState.candles; _b < _c.length; _b++) {
            var candle = _c[_b];
            if (candle.foundTime !== null && candle.foundTime > candleFoundSecsMax) {
                candleFoundSecsMax = candle.foundTime;
            }
        }
        if ((millis() - candleFoundSecsMax) / 1000 >= 3) {
            var secs = (millis() - candleFoundSecsMax) / 1000 - 3;
            cameraPos.y -= (1 - sin((Math.PI / 2) * (1 - secs / 3))) * 640 * 8;
        }
    }
    imageMode(CENTER);
    var globalSecs = millis() / 1000;
    for (var _d = 0, _e = gameState.backgrounds; _d < _e.length; _d++) {
        var background_1 = _e[_d];
        background_1.drawFunc(background_1.pos.x - cameraPos.x * background_1.cameraInfluence, background_1.pos.y - cameraPos.y * background_1.cameraInfluence);
    }
    var dogPhys = gameState.dog.phys;
    for (var _f = 0, _g = gameState.candles; _f < _g.length; _f++) {
        var candle = _g[_f];
        if (candle.foundTime === null) {
            image(images["candle"], candle.pos.x - cameraPos.x, candle.pos.y - cameraPos.y, 640, 640);
        }
    }
    image(images["basketball"], gameState.ball.phys.pos.x - cameraPos.x, gameState.ball.phys.pos.y - cameraPos.y, 640, 640);
    image(images["bird_water"], gameState.water.phys.pos.x - cameraPos.x, gameState.water.phys.pos.y - cameraPos.y + 30, 640, 640);
    image(images[gameState.dog.flipped ? "dog_flipped" : "dog"], dogPhys.pos.x - cameraPos.x, dogPhys.pos.y - cameraPos.y, 640, 640);
    for (var _h = 0, _j = gameState.candles; _h < _j.length; _h++) {
        var candle = _j[_h];
        if (candle.foundTime !== null) {
            var candleFoundSecs = (millis() - candle.foundTime) / 1000;
            console.log(candleFoundSecs);
            if (candleFoundSecs <= 2) {
                image(images["candle"], candle.pos.x - cameraPos.x, candle.pos.y - cameraPos.y - (candleFoundSecs / 2) * 200, 640, 640);
            }
        }
    }
    displayMessage(gameState.message, (millis() - gameState.lastMessageTime) / 1000, 20);
}
var finishMessages = [
    "Gut gemacht! Pino hat alle Kerzen rechtzeitig gefunden. ",
    "Da kommen Gugu und ein paar andere kleine Leute!",
    "Und da kommt der große Julian!",
    "Es ist Zeit zu feiern. Alles Gute zum Geburtstag, Gugu!",
];
function drawFinish(gameState) {
    background(color("#B7DCF5"));
    noSmooth();
    var globalSecs = millis() / 1000;
    var currentSecs = (millis() - gameState.lastSwitchTime) / 1000;
    var secs2 = clamp(currentSecs / 2.0, 0.0, 1.0);
    var secs22 = clamp((currentSecs - 2.0) / 2.0, 0.0, 1.0);
    var secs23 = clamp((currentSecs - 4.0) / 2.0, 0.0, 1.0);
    if (gameState.frame == 0) {
        drawBackgroundTiled("sky", globalSecs * 10, lerp(640, 0, clamp(currentSecs / 4.0, 0.0, 1.0)));
        image(images["background"], 0, 0 + lerp(640, 0, clamp(currentSecs / 4.0, 0.0, 1.0)), 640, 640);
        image(images["balcony"], 0, 0 + lerp(640, 0, clamp(currentSecs / 4.0, 0.0, 1.0)), 640, 640);
        image(images["table"], 0, 200 + lerp(640, 0, clamp(currentSecs / 4.0, 0.0, 1.0)), 640, 640);
        image(images["cake_candle"], 40, 200 + lerp(640, 0, clamp(currentSecs / 4.0, 0.0, 1.0)), 640, 640);
        image(images["dog_flipped"], 220, 250 + lerp(640, 0, clamp(currentSecs / 4.0, 0.0, 1.0)), 640, 640);
    }
    else if (gameState.frame == 1) {
        drawBackgroundTiled("sky", globalSecs * 10, 0);
        image(images["background"], 0, 0 + 0, 640, 640);
        image(images["balcony"], 0, 0 + 0, 640, 640);
        image(images["table"], 0, 200 + 0, 640, 640);
        image(images["cake_candle"], 40, 200 + 0, 640, 640);
        image(images["dog_flipped"], 220, 250 + 0, 640, 640);
        image(images["people"], 0 + lerp(640, 0, secs2), 0, 640, 640);
    }
    else if (gameState.frame == 2) {
        drawBackgroundTiled("sky", globalSecs * 10, 0);
        image(images["background"], 0, 0 + 0, 640, 640);
        image(images["balcony"], 0, 0 + 0, 640, 640);
        image(images["table"], 0, 200 + 0, 640, 640);
        image(images["cake_candle"], 40, 200 + 0, 640, 640);
        image(images["dog_flipped"], 220, 250 + 0, 640, 640);
        image(images["people"], 0, 0, 640, 640);
        image(images["person"], 0 + lerp(-640, 0, secs2), 0, 640, 640);
    }
    else if (gameState.frame == 3) {
        drawBackgroundTiled("sky", globalSecs * 10, 0);
        image(images["background"], 0, 0 + 0, 640, 640);
        image(images["balcony"], 0, 0 + 0, 640, 640);
        image(images["table"], 0, 200 + 0, 640, 640);
        image(images["cake_candle"], 40, 200 + 0, 640, 640);
        image(images["people"], 0, 0 + sin(currentSecs * 10), 640, 640);
        image(images["dog_flipped"], 220, 250 + 0 + sin(currentSecs * 10) * 5, 640, 640);
        image(images["person"], 0, 0 + (sin(currentSecs * 10) - 1) * 10, 640, 640);
    }
    noStroke();
    var message = finishMessages[gameState.frame];
    if (gameState.frame >= 2) {
        displayMessage(message, currentSecs, 10, 60);
    }
    else {
        displayMessage(message, currentSecs);
    }
}
//# sourceMappingURL=build.js.map