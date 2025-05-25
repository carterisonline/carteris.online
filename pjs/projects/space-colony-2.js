/**
                            Controls:
            -==-==-==-==-==-==-==-==-==-==-==-==-==-
             Up/Down Arrows to move Forward/Backward
                  Left/Right Arrows to rotate
                        M to open/close Map
                    Hold SPACE for Hyperdrive
                     Click planet to Rename
                         S to save game
                 E to open inventory (on planets)
                   Arrows to move (on planets)
  Return to Space by moving your mouse to the top of the screen
                     
**/

/*
    What's New In 0.3:
        - Randomly Generated Terrain per Planet
        - Player Collision 
        - New Physics Engine
        - Player Movement Reinvented
        - New Character Models
        - Dynamic Camera
    What's New In 0.3.2:
        - Bug Fixes (Obviously)
        - HUGE Performance Improvements
        - More Player Animations
        - Dynamic Fading between Menus
        - Dynamic Restart

*/

var linear = function (x, y, w, h, o, p) { for (var a = 0; a < h; a += 5) { strokeWeight(5); strokeCap(PROJECT); stroke(lerpColor(o, p, a * (1 / w))); line(x, a + y, x + w, a + y); } }; var radial = function (x, y, w, o, p) { for (var b = 0; b < w; b += 101) { fill(lerpColor(o, p, b * (1 / w))); noStroke(); ellipse(x, y, w - b, w - b); } }; var radialhd = function (x, y, w, o, p) { for (var b = 0; b < w; b += 5) { fill(lerpColor(o, p, b * (1 / w))); noStroke(); ellipse(x, y, w - b, w - b); } };

var screentime = "space";

//intro variables
{
    var vturn = 360;
    var fade = 255;
    var x = 172;
    var playIntro = 1;
    var properLoad = 0;
    var diagonal = function (c1, c2) {
        strokeWeight(100);
        for (var a = 0; a < width * 2; a += 14) {
            stroke(lerpColor(c1, c2, a / width / 2));
            line(0, a, a, 0);
        }
    };
}

//space variables
{
    var bruv = 0;
    var playSSIntro = 0;
    var accelerateX = 0;
    var accelerateY = 0;
    var accelerateSpeed = 0.3;
    var rotateSpeed = 0;
    var rotateAcceleration = 0.02;
    var playerX = 0;
    var playerY = 0;
    var playerSize = 10;
    var playerRotate = 57;
    var hyperDriveCountdown = 240;
    var countDownDisplay = 0;
    var hyperDriveSlowDown = 2;
    var starDistance = [];
    var hyperDriveAccelerationSpeed = 0;
    var scaleout = 1.00;
    var scaleRefresh = 0;

    var numOfStars = 150;
    var starX = [];
    var starY = [];
    var assignVariables = 0;
}

//planet variables
{
    var landsize = [];//obvious
    var temper = [];//0
    var temperheight = [];//0
    var temperint = [];//0.002
    var landheight = [];//50
    var land = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    var numOfPlanets = 1;
    var planetX = [];
    var planetY = [];
    var planetSize = [];
    var planetColor = [];
    var planetFill = [];
    var planetTemp = [];
    var planetName = [];
    var planetLean = {
        first: [],
        r: [],
        g: [],
        b: [],
        max: []
    };
    var averageTemp = 0;
    var planetInput = 0;
}

//misc variables
{
    var solarNames = ["Sigma", "Unica", "Pi", "Abugida", "Yuvati", "Zeta", "Eta", "Vandor", "Alpha", "Tori", "Vega", "Unicae", "Caroli", "Lukida", "Keyser", "Gomeisa", "Delta", "Fornacis", "Alrai", "Paloma", "Corvi", "Epsilon", "Vendrizi", "Lambda", "Carina", "Omicron", "Penduli", "Rho", "Cassiopeie", "Beta", "Columbae", "Omicron", "Odysseus", "Omega", "Luna", "Iliad", "Planar", "Riftin", "Notch", "Helio", "Obama"];
    var solarPick = 0;
    var solarNumber = 0;
    var solarIntro = 0;
    var solarFade = 0;
    var input = "";
    var inputTyper = 0;
    var output = "";
    var inputReady = 0;
    var dummy = 0;
    var debug = false;

}

//surface variables
{
    var surface = {
        color: color(0, 0, 0),
        climate: 0,
        current: 0,
        material: {
            scatter: [],
            minx: 50,
            max: 800,
            size: {
                x: [],
                y: [],
                minx: 25,
                max: 100,
                miny: 50,
                maxy: 200
            },
            ran: {
                r: [],
                g: [],
                b: []
            }
        },
        range: {
            negx: -10000,
            posx: +10000,
        }
    };
    var player = {
        model: {
            jumping: false,
            x: 42,
            y: 219,
            icon: {
                count: 0,
                flash: [0, 0, 0]
            },
            stage: 0,
            fade: 232,
            facing: "right",
        },
        x: 0,
        y: 400,
        velocity: {
            gravity: 0,
            x: 0,
            y: 0
        },
        mvmt: {
            negX: 0,
            posX: 0,
            jump: 0
        },
        perk: {
            jump: 7,
            health: 100,
            move: {
                acceleration: 1,
                cap: 5
            }
        }
    };
    var cam = {
        y: -height / 2,
    };
}

//menu variables
{
    var planetB = 0;
    var menuMode = "initial";
    var backgroundfade = 100;
}

//tenor reliants
{
    var topic = {
        x: 160,
        y: 340,
        size: 116,
        l: 19,
        fade: 255,
        mode: 0,
    };
    var gameSave = {
        misc: [],
        planet: [],
        terrain: [],
        load: {
            misc: [0],
            planet: [],
            terrain: [],
        },
        timeout: 0
    };
    var saveStringBar = [568];
    var loadStringBar = [];
    var projectName = "space_colony_2";
    var initialString = "";
}

//build variables
{
    //Asset Variables
    var element = {
        id: ["Carbon", "Ephite", "Quartz"],
    };
    var inventory = {
        x: width - 8,
        mode: 0,
        switched: 0,
        fade: 0,
    };
    var base1 = {
        x: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
        y: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
        rot: 0,
        brod: 0,
        brodl: 1.33,
        rotate: 3,
        ex: 0,
    };

    var build = {
        x: mouseX,
        y: mouseY,
        mode: "",
        cost: {
            base1: [0, 50, 2, 100],
        }
    };
    var display = {
        gear: function (x, y, s, r, c) {
            if (c === 1) {
                stroke(122, 122, 122);
            } else {
                stroke(0, 255, 255, 150);
            }
            for (var a = 0; a < 6; a++) {
                pushMatrix();
                translate(x, y);
                rotate((a * 60) + r);
                strokeWeight(s / 11);
                line(0, 0, +(s / 2), +(s / 2));
                popMatrix();
            }
            noStroke();
        },
        base1: function (x, y, c) {
            strokeWeight(1);
            noStroke();
            if (c === 1) { fill(66, 66, 66); } else { fill(0, 255, 255, 100); }
            rect(x, y, 11, 84);
            rect(x + 89, y, 11, 84);
            rect(x + 11, y + 54, 78, 10);
            if (c === 1) {
                fill(224, 224, 224); stroke(107, 107, 107);
                strokeWeight(4);
            }
            if (c === 1) { stroke(66, 66, 66); } else { stroke(0, 255, 255, 100); }
            rect(x, y + 0, 100, 65);
            arc(x + 50, y + 2, 100, 51, 180, 360);
            arc(x + 50, y + 0, 100, 51, 180, 360);
            display.gear(x + 78, y + 9, 17, 101 + base1.rot, c);
            display.gear(x + 67, y + -2, 11, 72 - (base1.rot * 2), c);
            if (c === 1) { stroke(66); } else { stroke(0, 255, 255, 100); }
            strokeWeight(4);
            pushMatrix();
            translate(x + 79, y - 21);
            rotate(base1.rotate);
            line(52, -10, 0, 0);
            noFill();
            arc(-14 + 52, 5 - 10, 34, 39, -79, 38);
            for (var a = -1; a < 110; a += 18) {
                stroke(255, -(base1.brod - a) * 1.5 + 50);
                strokeWeight(5 - ((base1.brod + a) / 18));
                arc(-14 + 52 + a + base1.brod, 5 - 10 - ((a + base1.brod) / 4.92), 34, 39, -79 + ((a + base1.brod) / base1.brodl), 38 - ((a + base1.brod) / base1.brodl));
            }
            popMatrix();
            noStroke();
            if (c === 1) { fill(186, 186, 186); } else { fill(0, 255, 255, 150); }
            rect(x + 10, y + 13, 7, 14);
            for (var a = 0; a < 2; a++) {
                if (c === 1) { stroke(floor(random(0, 510) / 255) * 255, floor(random(0, 510) / 255) * 255, 0); }
                strokeWeight(3);
                point(x + 14, y + 17 + a * 5);
            }
            noStroke();
            if (c === 1) { fill(173, 173, 173); } else { fill(0, 255, 255, 200); }
            rect(x + 22, y + 2, 34, 61, 5);
            rect(x + 22, y + 20, 34, 43);
            if (c === 1) { stroke(191, 191, 191); }
            for (var a = 0; a < 56; a += 10) {
                if (a > 37 && a < 46) {
                    line(x + 24, y + a + 5, x + 46, y + a + 22);
                } else if (a > 46) {
                    line(x + 24, y + a + 5, x + 33, y + a + 12);
                } else {
                    line(x + 24, y + a + 5, x + 54, y + a + 30);
                }
            }
            line(x + 33, y + 3, x + 55, y + 21);
            line(x + 45, y + 3, x + 55, y + 12);
        },
        preview: {
            base1: function (x, y) {
                noFill();
                strokeWeight(2);
                rect(x, y, 40, 25);
                rect(x, y + 20, 4, 20);
                rect(x + 36, y + 20, 4, 20);
                arc(x + 20, y + 2, 40, 18, 180, 360);
                line(x + 28, y, x + 53, y - 10);
                noFill();
                arc(x + 50, y - 8, 10, 10, 250, 387);
            },
        }
    };
}

var fadeoutr = 0;
var safefr = 0;
var fadeoutrmode = 0;
var compMatrix = 5;

var drawMaterials = function (inp) {
    pushMatrix();
    for (var a = round(player.x) - surface.material.size.max; a < round(player.x) + 600 + round(mouseX / 10); a++) {
        fill(surface.material.ran.r[a], surface.material.ran.g[a], surface.material.ran.b[a], 150 + mouseY / 3);
        rect(surface.material.scatter[a] - player.x - mouseX / 10, (+527 - mouseY / 10) - surface.material.size.y[a], surface.material.size.x[a], surface.material.size.y[a]);
    }
    popMatrix();
};
var drawTitle = function (x, y, e) {
    pushMatrix();
    scale(e);
    fill(255, 255, 255);
    textSize(65);
    textAlign(CENTER, CENTER);
    text("Space\nColony", 300 + x - ((mouseX - 300) / 10), 102 + y - ((mouseY - 300) / 10));
    textSize(186);
    fill(87, 87, 87);
    text("2", 312 + x - ((mouseX - 300) / 15), 102 + y - ((mouseY - 300) / 15));
    textSize(65);
    fill(255, 255, 255);
    text("ce", 355 + x - ((mouseX - 300) / 10), 63 + y - ((mouseY - 300) / 10));
    text("on", 332 + x - ((mouseX - 300) / 10), 141 + y - ((mouseY - 300) / 10));
    popMatrix();
};
var card = function (x, y, inp) {
    rect((planetX[inp] / 333) + x + mouseX / 10, (planetY[inp] / 333) + y + mouseY / 10, 100, 90);
    fill(255, 255, 255);
    textSize(13);

    textAlign(LEFT, RIGHT);
    if (planetName[inp] !== "Undiscovered") {
        fill(255, 255, 0);
    } else {
        fill(255, 255, 255);
    }
    text(planetName[inp], 5 + (planetX[inp] / 333) + x + mouseX / 10, y + 15 + (planetY[inp] / 333) + mouseY / 10);
    fill(255, 255, 255);
    text(round(planetSize[inp]) + "u²", x + 5 + (planetX[inp] / 333) + mouseX / 10, y + 37 + (planetY[inp] / 333) + mouseY / 10);
    text(round(planetTemp[inp]) + "°F", x + 5 + (planetX[inp] / 333) + mouseX / 10, y + 52 + (planetY[inp] / 333) + mouseY / 10);
    text("X: " + round(planetX[inp]), x + 5 + (planetX[inp] / 333) + mouseX / 10, y + 67 + (planetY[inp] / 333) + mouseY / 10);
    text("Y: " + round(planetY[inp]), x + 5 + (planetX[inp] / 333) + mouseX / 10, y + 83 + (planetY[inp] / 333) + mouseY / 10);
};
var inputbox = function (x, y, w, h) {
    inputTyper++;
    if (inputTyper > 120) { inputTyper = 0; }
    stroke(255, 255, 255);
    fill(0, 0, 0, 100);
    rect(x, y, w, h);
    if (mouseX > x && mouseY > y && mouseX < x + w && mouseY < y + h) {
        cursor(TEXT);
    } else { cursor(); }
    textSize(h / 1.3);
    fill(255, 255, 255);
    text(input, x + 10, y + (h / 1.35));
    keyPressed = function () {
        if (keyCode === 8) {
            input = "";
        } else if (keyCode === 13) {
            output = input;
            input = "";
        } else if (keyCode !== 16) {
            input += key.toString();
        }
    };
    if (inputTyper < 60) {
        line(26 + -mouseX / 10 + textWidth(input) + h * 2, y + 5, 26 + -mouseX / 10 + textWidth(input) + h * 2, y + h - 5);
    }
};
var showTheCard = function (x, y, inp) {
    card(x, y, inp);
    if (debug === false) {
        if (mouseIsPressed) {
            inputReady = 1;
            planetInput = inp;
        }
    } else if (mouseIsPressed) {
        playerX = planetX[inp];
        playerY = planetY[inp];
    }
};
var starHandling = function (inp) {
    if (starX[inp] < 0) {
        starX[inp] = width / scaleout;
        starY[inp] = random(0, height / scaleout);
        starDistance[inp] = random(0.1, 1);
    }
    if (starX[inp] > width / scaleout) {
        starX[inp] = 0;
        starY[inp] = random(0, height / scaleout);
        starDistance[inp] = random(0.1, 1);
    }
    if (starY[inp] < 0) {
        starY[inp] = height / scaleout;
        starX[inp] = random(0, width / scaleout);
        starDistance[inp] = random(0.1, 1);
    }
    if (starY[inp] > height / scaleout) {
        starY[inp] = 0;
        starX[inp] = random(0, width / scaleout);
        starDistance[inp] = random(0.1, 1);
    }
};
var shipHandling = function () {
    if (scaleRefresh !== scaleout) {
        assignVariables = 0;
    }
    scaleRefresh = scaleout;
    pushMatrix();
    scale(scaleout);
    hyperDriveAccelerationSpeed = random(80, 100);
    if (keyIsPressed && keyCode === LEFT_ARROW) {
        rotateSpeed -= rotateAcceleration;
    }
    else if (keyIsPressed && keyCode === RIGHT_ARROW) {
        rotateSpeed += rotateAcceleration;
    }
    else if (keyIsPressed && keyCode === UP_ARROW) {
        accelerateX += (cos(playerRotate) / 10) * accelerateSpeed;
        accelerateY += (sin(playerRotate) / 10) * accelerateSpeed;
    }
    else if (keyIsPressed && keyCode === DOWN_ARROW) {
        accelerateX -= (cos(playerRotate) / 10) * accelerateSpeed;
        accelerateY -= (sin(playerRotate) / 10) * accelerateSpeed;
    }
    else if (keyIsPressed && key.code === 32) {
        hyperDriveCountdown -= 1 * (60 / safefr);
        countDownDisplay = 1;
        if (hyperDriveCountdown === 2) {
            accelerateX = (cos(playerRotate) / 10) * accelerateSpeed;
            accelerateY = (sin(playerRotate) / 10) * accelerateSpeed;
        }
        if (hyperDriveCountdown < 1) {
            hyperDriveSlowDown = 0;
            rotateSpeed -= rotateSpeed / 10;
            accelerateX += ((cos(playerRotate) / 10) * accelerateSpeed) * 4;
            accelerateY += ((sin(playerRotate) / 10) * accelerateSpeed) * 4;
            if (abs(accelerateX) + abs(accelerateY) > 40) {
                accelerateX -= ((cos(playerRotate) / 10) * accelerateSpeed) * 4;
                accelerateY -= ((sin(playerRotate) / 10) * accelerateSpeed) * 4;
            }
        }

    } else if (keyIsPressed && key.toString() === 'c') {
        rotateSpeed -= rotateSpeed / 10;
    }
    rotateSpeed -= rotateSpeed / 100;
    keyReleased = function () {
        hyperDriveSlowDown++;
        countDownDisplay = 0;
        hyperDriveCountdown = 240;
    };
    if (abs(accelerateX) < abs(cos(playerRotate) / 10) * accelerateSpeed * 100 && abs(accelerateY) < abs(sin(playerRotate) / 10) * accelerateSpeed * 100) {
        hyperDriveSlowDown = 2;
    }
    if (hyperDriveSlowDown === 1) {
        if (abs(accelerateX) > abs(cos(playerRotate) / 10) * accelerateSpeed * 100) {
            accelerateX -= ((cos(playerRotate) / 10) * accelerateSpeed * 40);
        }
        if (abs(accelerateY) > abs(sin(playerRotate) / 10) * accelerateSpeed * 100) {
            accelerateY -= ((sin(playerRotate) / 10) * accelerateSpeed * 40);
        }
    }
    if (hyperDriveCountdown > 1) {
        playerX += accelerateX;
        playerY += accelerateY;

    } else {
        playerX += accelerateX * 4;
        playerY += accelerateY * 4;
    }
    playerRotate += rotateSpeed * (60 / safefr);
    background(0, 0, 0);
    playerX = constrain(playerX, -100000, 100000);
    playerY = constrain(playerY, -100000, 100000);
};
var saveGame = function () {
    gameSave.misc[0] = numOfPlanets;
    gameSave.misc[1] = solarPick;
    gameSave.misc[2] = solarNumber;
    gameSave.misc[3] = round(averageTemp);
    gameSave.misc[4] = playerX;
    gameSave.misc[5] = playerY;
    gameSave.misc[6] = accelerateX;
    gameSave.misc[7] = accelerateY;
    for (var planetB = 0; planetB < numOfPlanets; planetB++) {
        gameSave.planet[planetB] = planetX[planetB];
        gameSave.planet[planetB + numOfPlanets] = planetY[planetB];
        gameSave.planet[planetB + (numOfPlanets * 2)] = round(planetSize[planetB]);
        gameSave.planet[planetB + (numOfPlanets * 3)] = planetName[planetB];
        gameSave.planet[planetB + (numOfPlanets * 4)] = planetTemp[planetB];
        gameSave.planet[planetB + (numOfPlanets * 5)] = planetColor[planetB * 3];
        gameSave.planet[planetB + (numOfPlanets * 6)] = planetColor[planetB * 3 + 1];
        gameSave.planet[planetB + (numOfPlanets * 7)] = planetColor[planetB * 3 + 2];
        saveStrings("tenor" + projectName + initialString + "terrain" + planetB + "", land[planetB]);
    }
    saveStrings("tenor" + projectName + initialString + "misc", gameSave.misc);
    saveStrings("tenor" + projectName + initialString + "planet", gameSave.planet);
};
var fancy = function (t, x, y, ts, d) {
    textSize(ts);
    fill(0);
    text(t, x - (mouseX - (width / 2)) / (20 * d), y - ((mouseY - (height / 2)) / (20 * d)));
    fill(255, 255, 255);
    text(t, x - (mouseX - (width / 2)) / (19 * d), y - ((mouseY - (height / 2)) / ((15) * d)));
};
var crash = function () {
    background(255, 255, 255);
    fill(222, 222, 222);
    textSize(409);
    textAlign(CENTER, CENTER);
    text("504", 300, 459);
    fill(0, 0, 0);
    textSize(100);
    fill(255, 0, 166);
    textAlign(LEFT, RIGHT);
    text("T", 21, 90);
    noStroke();
    ellipse(45, 105, 13, 13);
    fill(255, 102, 204);
    textSize(56);
    text("There was an error.", 101, 59);
    fill(255, 148, 219);
    textSize(34);
    text("Tenor failed to load because:", 111, 99);
    text("504: FILE DOES NOT EXIST", 112, 137);
    textSize(20);
    fill(143, 143, 143);
    text("Ask Yourself: Are your initials correct? Have you previously\nsaved on this computer before?\n\nTenor does not work via the cloud.", 14, 195);
};
var loadGame = function () {
    if (loadStrings) {
        try {
            gameSave.load.misc = loadStrings("tenor" + projectName + initialString + "misc");
            gameSave.load.planet = loadStrings("tenor" + projectName + initialString + "planet");
            numOfPlanets = gameSave.load.misc[0];
            solarPick = gameSave.load.misc[1];
            solarNumber = gameSave.load.misc[2];
            averageTemp = gameSave.load.misc[3];
            for (var planetB = 0; planetB < 10; planetB++) {
                planetX[planetB] = gameSave.load.planet[planetB];
                planetY[planetB] = gameSave.load.planet[planetB + (gameSave.load.misc[0] * 1)];

                planetSize[planetB] = gameSave.load.planet[planetB + (gameSave.load.misc[0] * 2)];
                planetName[planetB] = gameSave.load.planet[planetB + (gameSave.load.misc[0] * 3)];
                planetTemp[planetB] = gameSave.load.planet[planetB + (gameSave.load.misc[0] * 4)];
                planetColor[planetB * 3] = gameSave.load.planet[planetB + (gameSave.load.misc[0] * 5)];
                planetColor[planetB * 3 + 1] = gameSave.load.planet[planetB + (gameSave.load.misc[0] * 6)];
                planetColor[planetB * 3 + 2] = gameSave.load.planet[planetB + (gameSave.load.misc[0] * 7)];
                planetFill[planetB] = color(planetColor[planetB * 3], planetColor[(planetB * 3) + 1], planetColor[(planetB * 3) + 2]);
                land[planetB] = loadStrings("tenor" + projectName + initialString + "terrain" + planetB);
            }
        }
        catch (err) {
            crash();
            noLoop();
        }
    }
};
var prect = function (x, y, w, h) {
    rect(x + player.model.x, y + player.model.y, w, h);
};
var createPlayer = function (x, y) {
    player.model.x = x;
    player.model.y = y;
    if (player.model.facing === "right") {
        noStroke();
        fill(191);
        prect(0, 0, 3, 6);
        fill(179);
        prect(3, 0, 6, 3);
        fill(189);
        prect(9, 0, 3, 3);
        prect(-3, 6, 3, 15);
        fill(171, 171, 171);
        prect(12, 0, 6, 3);
        prect(18, 3, 3, 3);
        fill(166, 234, 255, player.model.fade);
        prect(3, 6, 21, 15);
        fill(140, 238, 255, player.model.fade);
        prect(3, 3, 15, 3);
        fill(161, 225, 255, player.model.fade);
        prect(0, 6, 3, 15);
        for (var a = -3; a < 12; a += 3) {
            fill(255, 255, 255, player.model.fade / 2);
            prect(12 + a, 6 + a, 3, 3);
        } for (var a = 0; a < 15; a += 3) {
            prect(3 + a, 6 + a, 3, 3);
        } for (var a = -3; a < 15; a += 3) {
            fill(207, 245, 255, player.model.fade / 2);
            prect(9 + a, 6 + a, 3, 3);
        } for (var a = 0; a < 15; a += 3) {
            prect(a, 6 + a, 3, 3);
        } for (var a = 0; a < 9; a += 3) {
            fill(235, 251, 255, player.model.fade / 2);
            prect(a, 12 + a, 3, 3);
        }
    } else {
        noStroke();
        fill(191);
        prect(18, 0, 3, 6);
        fill(179);
        prect(12, 0, 6, 3);
        fill(189);
        prect(9, 0, 3, 3);
        prect(21, 6, 3, 15);
        fill(171, 171, 171);
        prect(3, 0, 6, 3);
        prect(0, 3, 3, 3);
        fill(166, 234, 255, player.model.fade);
        prect(-3, 6, 24, 15);
        fill(140, 238, 255, player.model.fade);
        prect(3, 3, 15, 3);
        fill(161, 225, 255, player.model.fade);
        prect(18, 6, 3, 15);
        for (var a = -3; a < 12; a += 3) {
            fill(255, 255, 255, player.model.fade / 2);
            prect(6 - a, 6 + a, 3, 3);
        } for (var a = 0; a < 15; a += 3) {
            prect(15 - a, 6 + a, 3, 3);
        } for (var a = -3; a < 15; a += 3) {
            fill(207, 245, 255, player.model.fade / 2);
            prect(9 - a, 6 + a, 3, 3);
        } for (var a = 0; a < 15; a += 3) {
            prect(18 - a, 6 + a, 3, 3);
        } for (var a = 0; a < 9; a += 3) {
            fill(235, 251, 255, player.model.fade / 2);
            prect(18 - a, 12 + a, 3, 3);
        }
    }
    //

    fill(168, 168, 168);
    prect(0, 21, 21, 3);
    fill(191, 191, 191);
    prect(3, 24, 15, 3);
    fill(200);
    prect(0, 27, 21, 27);
    prect(1, 54, 19, 3);

    //
    if (player.model.facing === "right") {
        fill(150);
        prect(21, 27, 3, 6);
        prect(-3, 27, 3, 8);
        fill(175);
        prect(24, 30, 3, 6);
        prect(-6, 32, 3, 6);
        prect(26, 45, 3, 3);
        prect(-10, 45, 3, 3);
    } else {
        fill(150);
        prect(-3, 27, 3, 6);
        prect(21, 27, 3, 8);
        fill(175);
        prect(-6, 30, 3, 6);
        prect(24, 32, 3, 6);
        prect(28, 45, 3, 3);
        prect(-8, 45, 3, 3);
    }

    prect(27, 36, 3, 9);
    prect(-9, 36, 3, 9);


    //

    player.model.icon.count++;
    if (player.model.icon.count > 7) {
        player.model.stage++;
        for (var a = 0; a < 3; a++) {
            player.model.icon.flash[a] = floor(random(0, 2)) * 255 + 200;
        }
        player.model.icon.count = 0;
    }
    fill(player.model.icon.flash[0], player.model.icon.flash[1], player.model.icon.flash[2]);

    //

    if (player.model.facing === "right") {
        prect(15, 30, 3, 3);
    } else {
        prect(3, 30, 3, 3);
    }
    fill(0, 255, 255, 100);
    if (player.model.stage > 2) {
        player.model.stage = 0;
    }
    if (player.model.jumping === false) {
        if (player.model.facing === "right" && abs(player.velocity.x) > 0.1) {
            if (player.model.stage === 0) {
                prect(3, 60, 12, 3);
                prect(-5, 57, 3, 3);
                prect(-3, 66, 7, 3);
            } if (player.model.stage === 1) {
                prect(-1, 60, 12, 3);
                prect(-11, 51, 3, 3);
                prect(-11, 63, 7, 3);
                prect(15, 60, 3, 3);
            } if (player.model.stage === 2) {
                prect(-5, 57, 12, 3);
                prect(-18, 51, 3, 3);
                prect(-17, 57, 7, 3);
                prect(12, 58, 3, 3);
            }
        } else if (abs(player.velocity.x) > 0.1) {
            if (player.model.stage === 0) {
                prect(4, 60, 12, 3);
                prect(23, 57, 3, 3);
                prect(16, 66, 7, 3);
            } if (player.model.stage === 1) {
                prect(11, 60, 12, 3);
                prect(30, 51, 3, 3);
                prect(25, 63, 7, 3);
                prect(4, 60, 3, 3);
            } if (player.model.stage === 2) {
                prect(14, 57, 12, 3);
                prect(36, 51, 3, 3);
                prect(29, 57, 7, 3);
                prect(6, 58, 3, 3);
            }
        }
    } else {
        if (player.model.stage === 0) {
            prect(4, 60, 12, 3);
            prect(20, 58, 3, 3);
            prect(-8, 57, 7, 3);
        } else if (player.model.stage === 1) {
            prect(3, 67, 15, 3);
            prect(-8, 63, 7, 3);
            prect(6, 59, 10, 3);
            prect(24, 62, 3, 3);
        } else if (player.model.stage === 2) {
            prect(1, 73, 19, 2);
            prect(-11, 66, 9, 3);
            prect(6, 65, 10, 3);
            prect(24, 68, 3, 3);
        }
    }
    //

};
var ruinsHandling = function (xp) {
    vertex(0 + xp, 128);
    vertex(35 + xp, 180);
    vertex(50 + xp, 170);
    vertex(65 + xp, 170);
    vertex(75 + xp, 180);
    vertex(100 + xp, 140);
    vertex(110 + xp, 150);
    vertex(120 + xp, 140);
    vertex(160 + xp, 200);
    vertex(170 + xp, 200);
    vertex(190 + xp, 160);
    vertex(200 + xp, 160);
    vertex(220 + xp, 130);
    vertex(230 + xp, 130);
    vertex(235 + xp, 180);
    vertex(245 + xp, 200);
    vertex(250 + xp, 200);
    vertex(270 + xp, 150);
    vertex(290 + xp, 152.5);
    vertex(295 + xp, 190);
    vertex(305 + xp, 185);
    vertex(310 + xp, 165);
    vertex(325 + xp, 145);
    vertex(335 + xp, 165);
    vertex(360 + xp, 195);
};
var DistantRuins = function (x, y, z) {
    pushMatrix();
    scale(z);
    translate((-player.x / (surface.range.posx / 325)) + x - mouseX / 100, y - mouseY / 100 + cam.y / 50 + -84);

    noStroke();
    fill(red(surface.color), green(surface.color), blue(surface.color), 162);
    beginShape();
    ruinsHandling(0);

    vertex(380, 165);
    vertex(400, 145);
    vertex(410, 177);
    vertex(445, 125);
    vertex(455, 164);
    vertex(484, 200);
    vertex(511, 160);
    vertex(496, 133);
    vertex(501, 100);
    vertex(564, 117);
    vertex(581, 182);
    vertex(600, 231);
    vertex(656, 167);
    vertex(675, 206);
    vertex(714, 131);
    vertex(719, 165);
    vertex(753, 202);
    vertex(801, 234);
    vertex(854, 100);
    vertex(900, 100);
    vertex(920, 120);
    vertex(940, 100);
    vertex(980, 200);
    vertex(1000, 220);
    vertex(1100, 100);
    vertex(1000, 5000);
    vertex(-1000, 5000);
    vertex(0, 130);
    endShape();

    popMatrix();
};
var CloserRuins = function (x, y, z) {
    pushMatrix();
    scale(z);
    translate((-player.x / (surface.range.posx / 362)) + x - mouseX / 80, y - mouseY / 80 + cam.y / 30 + -84);

    noStroke();
    fill(red(surface.color), green(surface.color), blue(surface.color), 105);
    beginShape();
    vertex(0, 290);
    vertex(20, 250);
    vertex(30, 260);
    vertex(60, 210);
    vertex(70, 210);
    vertex(90, 240);
    vertex(110, 220);
    vertex(125, 190);
    vertex(145, 260);
    vertex(150, 260);
    vertex(170, 170);
    vertex(175, 170);
    vertex(185, 110);
    vertex(215, 125);
    vertex(235, 175);
    vertex(240, 215);
    vertex(250, 265);
    vertex(255, 265);
    vertex(260, 280);
    vertex(270, 280);
    vertex(280, 240);
    vertex(300, 210);
    vertex(310, 210);
    vertex(320, 170);
    vertex(335, 185);
    vertex(335, 225);
    vertex(355, 255);
    vertex(365, 255);
    vertex(400, 2095);
    vertex(-10, 2095);
    vertex(0, 290);
    endShape();

    popMatrix();
};
var EvenCloserRuins = function (x, y, z) {
    pushMatrix();
    scale(z);
    translate((-player.x / (surface.range.posx / 486)) + x - mouseX / 60, y - mouseY / 60 + cam.y / 10 + -84);

    noStroke();
    fill(red(surface.color), green(surface.color), blue(surface.color), 202);
    beginShape();
    vertex(0, 295);
    vertex(30, 265);
    vertex(70, 295);
    vertex(80, 335);
    vertex(85, 345);
    vertex(87.5, 325);
    vertex(90, 300);
    vertex(100, 270);
    vertex(110, 260);
    vertex(120, 240);
    vertex(125, 210);
    vertex(135, 195);
    vertex(165, 315);
    vertex(175, 335);
    vertex(175, 315);
    vertex(180, 305);
    vertex(215, 290);
    vertex(235, 260);
    vertex(260, 250);
    vertex(270, 300);
    vertex(280, 310);
    vertex(290, 330);
    vertex(320, 310);
    vertex(340, 270);
    vertex(350, 285);
    vertex(370, 295);
    vertex(410, 325);
    vertex(442, 243);
    vertex(500, 215);
    vertex(525, 162);
    vertex(599, 282);
    vertex(652, 262);
    vertex(665, 292);
    vertex(700, 262);
    vertex(760, 370);
    vertex(1440, 3065);
    vertex(-40, 3065);
    vertex(0, 295);
    endShape();

    popMatrix();
};

draw = function () {
    safefr = 60;
    inventory.switched = 0;
    //Asset Animation
    {
        base1.rot += 1 * (60 / safefr);
        base1.brod += 0.5 * (60 / safefr);
        base1.ex += random(-0.1, 0.1);
        base1.rotate += base1.ex * (60 / safefr);
        if (base1.rotate > 33) { base1.ex -= 0.04 * (60 / safefr); }
        if (base1.rotate < -23) { base1.ex += 0.04 * (60 / safefr); }
        base1.ex -= (base1.ex / 100) * (60 / safefr);
        if (base1.brod > 17) {
            base1.brod = 0;
        }
    }

    //Variable Assignments
    {
        if (assignVariables < 1) {
            for (var b = 0; b < numOfStars / scaleout; b++) {
                starDistance[b] = random(0.1, 1);
                starX[b] = random(0, width / scaleout);
                starY[b] = random(0, height / scaleout);
            }
            numOfPlanets = round(random(3, 8));
            solarPick = round(random(0, solarNames.length - 1));
            solarNumber = round(random(7, 49));
        }
        if (assignVariables < numOfPlanets + 1) {
            planetB++;

            planetLean.first[planetB] = round(random(0, 2));
            planetX[planetB] = random(-100000, 100000);
            planetY[planetB] = random(-100000, 100000);
            planetSize[planetB] = random(6000, 20000);
            if (planetLean.first[planetB] === 0) {
                planetLean.r[planetB] = random(0, 1);
                planetLean.max[planetB] = 1 - planetLean.r[planetB] * random(-1, 1);
                planetLean.g[planetB] = random(0, planetLean.max[planetB]);
                planetLean.b[planetB] = random(0, planetLean.max[planetB]);
            } else if (planetLean.first[planetB] === 1) {
                planetLean.g[planetB] = random(0, 1);
                planetLean.max[planetB] = 1 - planetLean.g[planetB] * random(-1, 1);
                planetLean.b[planetB] = random(0, planetLean.max[planetB]);
                planetLean.r[planetB] = random(0, planetLean.max[planetB]);

            } else {
                planetLean.b[planetB] = random(0, 1);
                planetLean.max[planetB] = 1 - planetLean.b[planetB] * random(-1, 1);
                planetLean.r[planetB] = random(0, planetLean.max[planetB]);
                planetLean.g[planetB] = random(0, planetLean.max[planetB]);
            }
            planetColor[planetB * 3] = random(0, 255 * planetLean.r[planetB]);
            planetColor[(planetB * 3) + 1] = random(0, 255 * planetLean.g[planetB]);
            planetColor[(planetB * 3) + 2] = random(0, 255 * planetLean.b[planetB]);
            planetName[planetB] = "Undiscovered";
            planetTemp[planetB] = round(random(-260, 260));
            averageTemp += planetTemp[planetB];
            planetFill[planetB] = color(planetColor[planetB * 3], planetColor[(planetB * 3) + 1], planetColor[(planetB * 3) + 2]);
            landheight[planetB] = 50;
            temperint[planetB] = 0.002;
            temperheight[planetB] = 0;
            temper[planetB] = 0;
            landsize[planetB] = planetSize[planetB];
            for (var a = 0; a < landsize[planetB]; a++) {
                if (landheight[planetB] < 100) {
                    temperint[planetB] = random(0.001, 0.005);
                    temper[planetB] = random(-temperint[planetB] / 10, temperint[planetB]);
                } else if (landheight[planetB] > height - 100) {
                    temperint[planetB] = random(0.001, 0.005);
                    temper[planetB] = random(-temperint[planetB], temperint[planetB] / 10);
                } else {
                    temperint[planetB] = random(0.001, 0.01) / (landheight[planetB] / 1000);
                    temper[planetB] = random(-temperint[planetB], temperint[planetB]) * (landheight[planetB] / 100);
                }
                temperheight[planetB] += temper[planetB];
                landheight[planetB] += temperheight[planetB];
                if (landheight < 1) {
                    temperheight[planetB] = temperint[planetB];
                    temper[planetB] = 0;
                } if (landheight[planetB] > height - 1) {
                    temperheight[planetB] = -temperint[planetB];
                    temper[planetB] = 0;
                }
                land[planetB].push(landheight[planetB]);
            }

        }
        assignVariables++;
    }

    if (screentime === "space") {
        //Assignments
        {
            /***********************************************************/
            //Physics & Logic
            {
                shipHandling();
            }

            //Stars
            {
                stroke(255, 255, 255);
                for (var a = 0; a < numOfStars / scaleout; a++) {
                    if (hyperDriveCountdown > 1) {
                        starX[a] -= accelerateX * starDistance[a];
                        starY[a] -= accelerateY * starDistance[a];
                    } else {
                        starX[a] -= accelerateX * starDistance[a] * 4;
                        starY[a] -= accelerateY * starDistance[a] * 4;
                    }
                    starHandling(a);
                    stroke(255, 255, 255, random(starDistance[a] * 255, 255));
                    strokeWeight(starDistance[a] * 4);
                    if (hyperDriveCountdown > 1) {
                        point(starX[a] - mouseX / 30 * (starDistance[a]), starY[a] - mouseY / 30 * (starDistance[a]));
                    }
                    if (hyperDriveCountdown > 1) {
                        stroke(255, 255, 255, abs(accelerateX + accelerateY) * 10);
                        line(starX[a] - mouseX / 30 * (starDistance[a]), starY[a] - mouseY / 30 * (starDistance[a]), starX[a] - mouseX / 30 * (starDistance[a]) - (accelerateX * starDistance[a]), starY[a] - mouseY / 30 * (starDistance[a]) - (accelerateY * starDistance[a]));
                    } else {
                        stroke(random(0, abs(round(((abs(accelerateX) + abs(accelerateY)) / 60) * 5000 * 4)) * 0.01912547813), random(255 - abs(round(((abs(accelerateX) + abs(accelerateY)) / 60) * 5000 * 4)) * 0.01912547813, 255), random(255 - abs(round(((abs(accelerateX) + abs(accelerateY)) / 60) * 5000 * 4)) * 0.01912547813, 255), random(0, 255));
                        line(starX[a] - mouseX / 30 * (starDistance[a]), starY[a] - mouseY / 30 * (starDistance[a]), starX[a] - mouseX / 30 * (starDistance[a]) - (accelerateX * starDistance[a]) * 4, starY[a] - (mouseY / 30 * (starDistance[a])) - (accelerateY * starDistance[a]) * 4);
                    }
                    noStroke();
                }
            }

            /***********************************************************/
        }

        //Planets
        {
            pushMatrix();
            translate(-playerX + width / 2, -playerY + width / 2);
            fill(0, 217, 255);
            for (var planet = 0; planet < numOfPlanets; planet++) {
                if (playerX > planetX[planet] - planetSize[planet] && playerX < planetX[planet] + planetSize[planet] && playerY > planetY[planet] - planetSize[planet] && playerY < planetY[planet] + planetSize[planet]) {

                    radial(planetX[planet] - mouseX / 100, planetY[planet] - mouseY / 100, planetSize[planet], color(255 - red(planetFill[planet]), 255 - green(planetFill[planet]), 255 - blue(planetFill[planet]), 100), planetFill[planet]);

                }
            }
            popMatrix();
        }

        //Additional Space (get it?)
        {
            /************************************************************/
            //Player
            {
                translate((width / 2) - mouseX / 60 + 10, height / 2 - mouseY / 60 + 10);
                rotate(playerRotate);
                fill(255, 255, 255);
                triangle(-playerSize, -playerSize / 2, -playerSize, playerSize / 2, playerSize, 0);
                popMatrix();
            }

            //Overlay
            {
                pushMatrix();
                textSize(20);
                fill(255, 255, 255, 200);
                textAlign(LEFT, RIGHT);
                text("X: " + round(playerX) + " Y: " + round(playerY), 31 - mouseX / 30, 47 - mouseY / 30);
                textAlign(RIGHT, LEFT);
                if (hyperDriveCountdown > 1) {
                    text("Velocity: " + abs(round(((abs(accelerateX) + abs(accelerateY)) / 60) * 5000)) + "pps²", 582 - mouseX / 30, 47 - mouseY / 30);
                } else {
                    text("Velocity: " + abs(round(((abs(accelerateX) + abs(accelerateY)) / 60) * 5000 * 4)) + "pps²", 582 - mouseX / 30, 47 - mouseY / 30);

                }
                for (var planet = 0; planet < numOfPlanets; planet++) {
                    if (playerX > planetX[planet] - (planetSize[planet] / 2) && playerX < planetX[planet] + (planetSize[planet] / 2) && playerY > planetY[planet] - (planetSize[planet] / 2) && playerY < planetY[planet] + (planetSize[planet] / 2)) {
                        fill(0, 0, 0, 100);
                        rect(139 - mouseX / 10, 458 - mouseY / 10, 343, 100);
                        fill(255, 255, 255, 200);
                        textAlign(LEFT, RIGHT);
                        textSize(18);
                        text("Docking Mode Ready", 157 - mouseX / 9, 492 - mouseY / 9);
                        fill(255, 255, 255);
                        textSize(14);
                        if (planetName[planet] === "Undiscovered") {
                            text("Undiscovered Planet", 338 - mouseX / 9, 491 - mouseY / 9);
                        } else {
                            text(planetName[planet], 338 - mouseX / 9, 491 - mouseY / 9);
                        }
                        text("Climate: " + planetTemp[planet] + "°F", 338 - mouseX / 9, 510 - mouseY / 9);
                        text("Economy: ???", 338 - mouseX / 9, 527 - mouseY / 9);
                        text("Conflict: ???", 338 - mouseX / 9, 544 - mouseY / 9);
                        stroke(255, 255, 255, 200);
                        noFill();
                        if (mouseX > 159 - mouseX / 9 && mouseX < 159 + 159 - mouseX / 9 && mouseY < 36 + 505 - mouseY / 9 && mouseY > 505 - mouseY / 9) {
                            if (mouseIsPressed) {
                                surface.current = planet;
                                player.x = 0;
                                player.y = 400;
                                player.velocity.gravity = planetSize[planet] / 2000;
                                surface.color = planetFill[planet];
                                surface.range.negx = -planetSize[planet] / 2;
                                surface.range.posx = planetSize[planet] / 2;
                                for (var a = surface.range.negx; a < surface.range.posx; a++) {
                                    surface.material.ran.r[round(a)] = random(red(surface.color), red(surface.color) / 8);
                                    surface.material.ran.g[round(a)] = random(green(surface.color), green(surface.color) / 8);
                                    surface.material.ran.b[round(a)] = random(blue(surface.color), blue(surface.color) / 8);
                                }
                                for (var a = surface.range.negx; a < surface.range.posx; a += random(surface.material.minx, surface.material.max)) {
                                    surface.material.size.x[round(a)] = random(surface.material.size.minx, surface.material.size.max);
                                    surface.material.size.y[round(a)] = random(surface.material.size.miny, surface.material.size.maxy);
                                    surface.material.scatter[round(a)] = a;
                                }
                                surface.climate = planetTemp[planet];
                                screentime = "surface";

                            }
                            cursor(HAND);
                            stroke(255, 255, 255);
                            fill(255, 255, 255);
                        } else {
                            cursor();
                        }
                        strokeWeight(3);

                        rect(159 - mouseX / 9, 505 - mouseY / 9, 159, 36);
                    }
                }
                popMatrix();
                if (countDownDisplay === 1) {
                    textSize(200);
                    textAlign(CENTER, CENTER);
                    if (hyperDriveCountdown > 1) {
                        text(round(hyperDriveCountdown / 60), width / 2, height / 2);
                    }
                }
            }

            /************************************************************/
        }

        keyPressed = function () {
            if (key.toString() === 'm') {
                screentime = "space_map";
            }
            else if (key.toString() === 's') {
                saveGame();
            }

        };
        textAlign(CENTER, CENTER);
        fill(255, 100);
        textSize(94);
        if (keyIsPressed && key.toString() === 's') {
            text("Game Saved", 300, 300);
        }

    }

    else if (screentime === "space_map") {
        shipHandling();
        background(38, 38, 38);
        for (var a = 0; a < width + 1; a += 33.33) {
            stroke(100 - (-abs(a - mouseY) / -5) + 20);
            line(0, a - mouseY / 50, width, a - mouseY / 50);
        }
        for (var a = 0; a < height + 1; a += 33.33) {
            stroke(100 - (-abs(a - mouseX) / -5) + 20);
            line(a - mouseX / 50, 0, a - mouseX / 50, height);
        }

        pushMatrix();
        translate(width / 2, height / 2);
        fill(255, 255, 255);
        pushMatrix();
        for (var d = 0; d < numOfPlanets; d++) {
            radialhd((planetX[d] / 333) - 10 / planetSize[d], (planetY[d] / 333) - 10 / planetSize[d] / 2, planetSize[d] / 2 / 255, color(max(0, 255 - red(planetFill[d] ?? color(0))), max(0, 255 - green(planetFill[d] ?? color(0))), max(0, 255 - blue(planetFill[d] ?? color(0))), 100), planetFill[d]);
        }
        popMatrix();
        pushMatrix();
        stroke(0, 117 + (abs(mouseX - width / 2) / 10) + (abs(mouseY - height / 2) / 10), 0);
        line(playerX / 333, playerY / 333, accelerateX * 100, accelerateY * 100);
        noStroke();
        translate(-width / 2, -height / 2);
        fill(255, 255, 255);
        textAlign(CENTER, CENTER);
        textSize(20);
        text("Overview: " + solarNames[solarPick] + " " + solarNumber, 320 - mouseX / 20, 82 - mouseY / 20);
        text("- " + (numOfPlanets - 1) + " planets", 320 - mouseX / 20, 106 - mouseY / 20);
        text("- Average Temperature: " + round(averageTemp / numOfPlanets) + "°F", 320 - mouseX / 20, 131 - mouseY / 20);
        popMatrix();
        for (var a = 0; a < numOfPlanets; a++) {
            fill(0, 0, 0, 200);
            if ((mouseX * 333) - 100000 - mouseX / 30 > planetX[a] - (planetSize[a] / 2) && (mouseX * 333) - 100000 - mouseX / 30 < planetX[a] + (planetSize[a] / 2) && (mouseY * 333) - 100000 - mouseY / 30 > planetY[a] - (planetSize[a] / 2) && (mouseY * 333) - 100000 - mouseY / 30 < planetY[a] + (planetSize[a] / 2)) {
                if ((planetX[a] / 333) + width / 2 > 500 && (planetY[a] / 333) + height / 2 < 400) {
                    showTheCard(-200, 0, a);
                } else if ((planetY[a] / 333) + height / 2 < 400) {
                    showTheCard(0, 0, a);
                } else if ((planetY[a] / 333) + height / 2 > 500) {
                    showTheCard(0, -200, a);
                } else {
                    showTheCard(-200, -200, a);
                }
            }
        }
        noStroke();
        pushMatrix();
        strokeWeight(1);
        translate(playerX / 333, playerY / 333);
        rotate(playerRotate);
        fill(255, 255, 255);
        triangle(-playerSize, -playerSize / 2, -playerSize, playerSize / 2, playerSize, 0);
        stroke(255, 255, 255);
        for (var a = 0; a < 1000; a += 20) {
            line(a, 0, a + 10, 0);
        }
        popMatrix();
        stroke(255, 0, 0);
        popMatrix();
        if (mouseX > 138) { textAlign(RIGHT, LEFT); } else {
            textAlign(LEFT, RIGHT);
        }
        textSize(20);
        keyPressed = function () {
            if (key.toString() === 'm') {
                screentime = "space";
            }
        };
        if (inputReady === 1) {
            textAlign(LEFT, RIGHT);
            text("Rename", 132 - mouseX / 10, 471 - mouseY / 10);
            inputbox(131 - mouseX / 10, 482 - mouseY / 10, 401, 61);
            if (output !== "") {
                planetName[planetInput] = output;
                planetInput = 0;
                output = "";
                inputReady = 0;
            }
        }
    }

    else if (screentime === "surface") {
        textAlign(CENTER, CENTER);
        fill(255, 100);
        textSize(94);
        keyPressed = function () {
            if (key.toString() === 's') {
                saveGame();
            }
        };
        if (keyIsPressed && key.toString() === 's') {
            text("Game Saved", 300, 300);
        }
        cursor();
        background(color((red(surface.color)) / 2, (green(surface.color)) / 2, (blue(surface.color)) / 2));

        if (frameCount - (floor(frameCount / 2) * 2) === 0) {
            for (var i = 0; i < height; i += 8) {
                strokeWeight(100);
                var m = lerpColor(color((red(surface.color)), (green(surface.color)), (blue(surface.color)), 255), color((255 - red(surface.color)), (255 - green(surface.color)), (255 - blue(surface.color)), 255), i / 600);
                stroke(m);
                line(0, i, width, i);
            }
        } else {
            for (var i = 4; i < height; i += 8) {
                strokeWeight(100);
                var m = lerpColor(color((red(surface.color)), (green(surface.color)), (blue(surface.color)), 255), color((255 - red(surface.color)), (255 - green(surface.color)), (255 - blue(surface.color)), 255), i / 604);
                stroke(m);
                line(0, i, width, i);
            }
        }
        strokeWeight(5);
        pushMatrix();
        scale(width / 400, height / 400);

        DistantRuins(-330, 45, 1.2);

        CloserRuins(0, -5, 1.3);

        EvenCloserRuins(-269, -78, 1.4);
        popMatrix();
        noStroke();
        var drawPlayer = function (inp) {
            if (keyIsPressed) {
                if (keyCode === RIGHT_ARROW) {
                    player.velocity.x++;
                    player.model.facing = "right";
                    player.model.jumping = false;
                } else if (keyCode === LEFT_ARROW) {
                    player.velocity.x--;
                    player.model.facing = "left";
                    player.model.jumping = false;
                } else if (keyCode === UP_ARROW) {
                    player.model.jumping = true;
                    if (player.mvmt.jump !== 1) {
                        player.velocity.y = -1;
                    } else {
                        player.velocity.y -= 0.15;
                    }
                    player.mvmt.jump = 1;
                } else {
                    player.model.jumping = false;
                }
            }
            player.velocity.x -= player.velocity.x / 10;
            if (player.mvmt.jump !== 0) {
                player.velocity.y += 0.1;
            }
            if (player.y > round(land[surface.current][round(abs(player.x + 300))])) {
                player.model.jumping = false;
                player.mvmt.jump = 0;
                player.y = round(land[surface.current][round(abs(player.x + 300))]);
            } else {
                player.mvmt.jump = 1;
            }
            textSize(20);
            fill(255, 255, 255);
            var ohthebees = surface.range.posx * 0.002;
            player.y += player.velocity.y;
            player.x += player.velocity.x;
            if (inp.x < surface.range.negx - width + ohthebees) {
                inp.x = surface.range.posx + width;
            }
            if (inp.x > surface.range.posx + width) {
                inp.x = surface.range.negx - width + ohthebees;
            }
            fill(255, 255, 255);
            if (debug !== true) {
                cam.y -= ((cam.y + player.y - 448) / 10);
            } else {
                cam.y = -player.y + 448;
            }
            createPlayer((width * 0.5) - mouseX / 20, cam.y + player.y + -92 - mouseY / 20);
            textSize(20);
            fill(255, 255, 255);
        };
        drawPlayer(player);
        fill(255, 255, 255);
        noFill();
        stroke(255, 255, 255, 100 - mouseY);
        fill(0, 0, 0, 100 - mouseY);
        if (mouseX > 376 - mouseX / 20 && mouseX < 195 + 376 - mouseX / 20 && mouseY > 26 - mouseY / 20 && mouseY < 62 + 26 - mouseY / 20) {
            cursor(HAND);
            fill(255, 255, 255);
            stroke(255, 255, 255);
            if (mouseIsPressed) { screentime = "space"; }
        } else {
            cursor();
        }
        rect(376 - mouseX / 20, 26 - mouseY / 20, 195, 62);
        fill(255, 255, 255, 100 - mouseY);
        textSize(27);
        textAlign(LEFT, RIGHT);
        text("Return to Map", 391 - mouseX / 20, 65 - mouseY / 20);
        stroke(0, 0, 0);
        pushMatrix();
        translate(-player.x - mouseX / 20, cam.y - mouseY / 20);
        strokeWeight(1 + compMatrix * 4.0);
        strokeCap(ROUND);
        for (var a = player.x; a < player.x + width + 100; a += compMatrix) {
            stroke(red(surface.color) / 2, green(surface.color) / 2, blue(surface.color) / 2);
            line(a, land[surface.current][round(abs(a))] + compMatrix * 1.9, a, height);
            fill(0, 0, 0);
            textSize(13);
        }

        noStroke();
        build.x -= round((build.x - mouseX) / 10) * (60 / safefr);
        build.y -= round((build.y - mouseY) / 10) * (60 / safefr);
        if (build.mode === "base1") {
            display.base1(build.x + player.x, land[surface.current][round(abs(build.x + player.x))] - 88, 100, 100, 0);
        }
        keyPressed = function () {
            if (key.toString() === 'e') {
                if (inventory.mode === 1) {
                    inventory.switched = 1;
                    inventory.mode = 0;
                } if (inventory.mode === 0 && inventory.switched !== 1) {
                    inventory.mode = 1;
                }
            }
        };
        mousePressed = function () {
            if (mouseX > width - 33 && mouseY < 34) {
                if (inventory.mode === 1) {
                    inventory.switched = 1;
                    inventory.mode = 0;
                }
                if (inventory.mode === 0 && inventory.switched !== 1) {
                    inventory.mode = 1;
                }
            } else if (inventory.mode !== 1) {
                if (build.mode === "base1") {
                    base1.x[surface.current].push(build.x + player.x);
                    base1.y[surface.current].push(land[surface.current][round(abs(build.x + player.x))] - 88);
                    build.mode = "";
                }
            }
        };
        fill(0, 0, 0);
        for (var a = 0; a < base1.x[surface.current].length; a++) {
            if (base1.x[surface.current][a] - player.x < 700 && base1.x[surface.current][a] - player.x > -200) {
                display.base1(base1.x[surface.current][a], base1.y[surface.current][a], 1);
            }
        }
        popMatrix();
        stroke(255, 150);
        strokeWeight(2);
        for (var a = 0; a < 28; a += 10) {
            line(width - 8, a + 6, inventory.x, a + 6);
        }

        fill(0, inventory.fade);
        stroke(255, inventory.fade * 4);
        strokeWeight(3);
        rect(-14 - mouseX / 40, 25 - mouseY / 40, inventory.fade * 2.84, 550, 17);
        fill(255, inventory.fade * 4);
        textSize(50);
        text("Blueprints", -522 + inventory.fade * 3 - mouseX / 30, 92 - mouseY / 30);
        fill(0, inventory.fade);
        for (var a = 0; a < 5; a++) {
            if (mouseX > a * (49 + (inventory.fade / 4)) + -520 + inventory.fade * 3 - mouseX / 30 && mouseX < a * (49 + (inventory.fade / 4)) + -520 + inventory.fade * 3 - mouseX / 30 + 66 && mouseY > 115 - mouseY / 30 && mouseY < (115 - mouseY / 30) + 128) {
                fill(255); stroke(0);
                if (mouseIsPressed && a === 0) {
                    build.mode = "base1";
                    inventory.mode = 0;
                }

            } else { fill(0); stroke(255); }
            rect(a * (49 + (inventory.fade / 4)) + -520 + inventory.fade * 3 - mouseX / 30, 115 - mouseY / 30, 66, 128, 10);
            textSize(13);
            fill(255, 255, 255);
            if (a === 0 && inventory.mode === 1) {
                text(build.cost.base1[1] + "x\n" + element.id[build.cost.base1[0]], -512 - mouseX / 25 + inventory.fade * 3, 205 - mouseY / 25);
            }
        }

        if (inventory.mode === 1) {
            build.mode = "";
            inventory.fade -= ((inventory.fade - 184) / 10) * (60 / safefr);
            inventory.x -= (inventory.x - width + 26) / 10;
        } else {
            inventory.fade -= ((inventory.fade) / 10) * (60 / safefr);
            inventory.x -= (inventory.x - width + 8) / 10;
        }
        if (mouseX > -520 + inventory.fade * 3 - mouseX / 30 && mouseX < (-520 + inventory.fade * 3 - mouseX / 30) + 66 && mouseY > 115 - mouseY / 30 && mouseY < (115 - mouseY / 30) + 128) { stroke(0); } else { stroke(255); }
        display.preview.base1(-513 + inventory.fade * 3 - mouseX / 30, 138 - mouseY / 30, 1);
    }

    else if (screentime === "menu") {
        if (menuMode === "initial") {
            backgroundfade -= (backgroundfade / 30) * (60 / safefr);
            diagonal(color(90 - (backgroundfade / 3)), color(160 - backgroundfade));
            textAlign(CENTER, CENTER);
            fancy("Enter Your Initials", 300, 124, 50, 1);
            keyPressed = function () {
                if (initialString.length < 3) {
                    if (keyCode !== 16 && keyCode !== 8 && keyCode !== 17 && keyCode !== 18 && keyCode !== 20) {
                        initialString += key.toString();
                    }
                }
            };
            pushMatrix();
            translate(-60 - mouseX / 30, (backgroundfade * 8) + 253 - mouseY / 30);
            strokeCap(PROJECT);
            diagonal(color(133, 133, 133, 0), color(112, 112, 112, 255 - backgroundfade * 2));
            popMatrix();
            fancy(initialString, 300, 300, 200, 0.5);
            fill(255, 255, 255);
            noFill();
            strokeWeight(5);
            stroke(255, 100);
            if (mouseX > 111 - mouseX / 10 && mouseX < 304 - mouseX / 10 && mouseY > 460 - mouseY / 10 && mouseY < 563 - mouseY / 10 && initialString.length > 0) {
                cursor(HAND);
                stroke(255, 255, 255);
                fill(255, 255, 255);
                rect(111 - mouseX / 10, 463 - mouseY / 10, 193, 100);
                if (mouseIsPressed) {
                    cursor();
                    initialString = "";
                }
            } else if (initialString.length > 0) {
                cursor();
                rect(111 - mouseX / 10, 463 - mouseY / 10, 193, 100);
                fancy("Reset", 177, 479, 54, 0.7);
            }
            if (mouseX > 369 - mouseX / 10 && mouseX < 562 - mouseX / 10 && mouseY > 460 - mouseY / 10 && mouseY < 563 - mouseY / 10 && initialString.length > 0) {
                cursor(HAND);
                stroke(255, 255, 255);
                fill(255, 255, 255);
                rect(369 - mouseX / 10, 463 - mouseY / 10, 193, 100);
                if (mouseIsPressed) {
                    cursor();
                    backgroundfade = 60;
                    menuMode = "game";
                }
            } else if (initialString.length > 2) {
                cursor();
                noFill();
                stroke(255, 100);
                rect(369 - mouseX / 10, 463 - mouseY / 10, 193, 100);
                fancy("Done", 440, 479, 54, 0.7);
            }
        }
        else if (menuMode === "game") {
            backgroundfade -= backgroundfade / 10;
            diagonal(color(30 + (backgroundfade / 3)), color(100 + backgroundfade));
            textAlign(CENTER, CENTER);
            strokeWeight(7);
            if (mouseX > 203 - ((mouseX + 300) / 20) && mouseX < 453 - ((mouseX + 300) / 20) && mouseY > 236 - mouseY / 15 && mouseY < 308 - mouseY / 15) {
                if (mouseIsPressed) {
                    playSSIntro = 1;
                    screentime = "space";
                }
                fill(255);
                stroke(255);
            } else {
                fancy("New Game", 300, 250, 31, 1);
                noFill();
                stroke(255, 100);
            }
            rect(203 - ((mouseX + 300) / 20), 236 - mouseY / 15, 250, 72);
            if (mouseX > 235 - ((mouseX + 300) / 20) && mouseY > 334 - mouseY / 15 && mouseX < 421 - ((mouseX + 300) / 20) && mouseY < 406 - mouseY / 15) {
                if (mouseIsPressed) {
                    playSSIntro = 1;
                    screentime = "space";
                    loadGame();
                }
                fill(255);
                stroke(255);
            } else {
                fancy("Resume", 300, 350, 31, 1);
                noFill();
                stroke(255, 100);
            }
            rect(235 - ((mouseX + 300) / 20), 334 - mouseY / 15, 186, 72);
        }
        if (dummy === 0) {
            backgroundfade = 100;
            diagonal(color(90 - (backgroundfade / 3)), color(160 - backgroundfade));
            drawTitle(-78, 105, 1.4);
            if (mouseIsPressed) {
                menuMode = "initial";
                dummy = 1;
            }
        }
        var epicbees = 400;
        fill(0, (epicbees * 4) - (frameCount * 4));
        noStroke();
        rect(0, 0, width, height);
    }

    //Intro
    {
        pushMatrix();
        textAlign(RIGHT, LEFT);
        if (playIntro === 1) {
            if (topic.mode === 0) {
                topic.fade -= 2;
            } else {
                topic.fade += 2;
            }
            if (topic.fade < 0) {
                topic.mode = 1;
            }
            if (topic.fade > 255) {
                playIntro = 0;
                screentime = "menu";

            }
            textAlign(LEFT, RIGHT);
            background(0, 0, 0);
            fill(255, 255, 255);
            textSize(topic.size);
            text("Topic", topic.x, topic.y);
            noStroke();
            triangle(topic.x + -12 - topic.l, topic.y + -76, topic.x + 1 - topic.l, topic.y + -83.2, topic.x + 1 - topic.l, topic.y - 68.0);
            rect(topic.x - topic.l + 10, topic.y + -83, 14 + (topic.l * 2) + 15, 15, 5);
            rect(topic.x - topic.l + 0, topic.y + -83, 14 + (topic.l * 2) + -44, 15, 5);
            rect(topic.x - topic.l + 55, topic.y + -83, 14 + (topic.l * 2) + -28, 15);
            fill(178, 185, 209);
            rect(topic.x - topic.l + 79, topic.y + -83, 14 + (topic.l * 2) + -51, 15);
            stroke(0, 0, 0);
            strokeWeight(7);
            line(topic.x - topic.l + 5, topic.y + -69, topic.x - topic.l + 5, topic.y - 84);
            random(0);
            textSize(23);
            fill(255, 255, 255);
            text("presents", topic.x + 203, topic.y + 22);
            fill(0, 0, 0, topic.fade);
            rect(0, 0, width, height);
        }
    }

    //Solar System Intro
    {
        pushMatrix();
        if (playSSIntro === 1) {
            solarIntro += 1 * (60 / safefr);
            solarFade += (7.83333333 - (solarIntro / 30)) * (60 / safefr);
        }
        if (solarIntro > 1 && solarIntro < 240) {
            stroke(255, 255, 255, solarFade - (solarIntro * 4));
            line(30 - (mouseX / 16) + (sin(solarIntro) * 100) + 160, 30 - (mouseY / 16) + 200, 30 - (mouseX / 16) + (sin(solarIntro) * -100) + 437, 30 - (mouseY / 16) + 200);
            line(30 - (mouseX / 16) + (cos(solarIntro) * 100) + 160, 30 - (mouseY / 10) + 400, 30 - (mouseX / 10) + (cos(solarIntro) * -100) + 437, 30 - (mouseY / 10) + 400);
            textAlign(CENTER, CENTER);
            textSize(100);
            fill(220, 220, 220, solarFade - (solarIntro * 4));
            text(solarNames[solarPick] + " " + solarNumber, 30 - (mouseX / 14) + width / 2, 30 - (mouseY / 14) + 328);
            textSize(50);
            fill(120, 120, 120, solarFade - (solarIntro * 4));
            if (gameSave.load.misc[0] === 0) {
                text("Welcome to", 30 - (mouseX / 10) + width / 2, 30 - (mouseY / 10) + 246);
            } else {
                text("Welcome back to", 30 - (mouseX / 10) + width / 2, 30 - (mouseY / 10) + 246);
            }
            popMatrix();
        }
    }

    //Graphic Overlay
    if (screentime !== "menu" && screentime !== "space_map") {
        pushMatrix();
        strokeWeight(1);
        colorMode(HSB);
        for (var a = -5 - (mouseY / 100); a < 104; a++) {
            stroke(a + 20, 255, 255, 20 - a / 2);
            noFill();
            rect(0, tan(a) * 100, width, 0);
        }
        popMatrix();
        colorMode(RGB);
    }
    /*
    
    */
    mouseOut = function () {
        if (mouseY > 500) {
            fadeoutrmode = 1;
        }
    };
    if (mouseY < 500) { fadeoutrmode = 0; }
    if (fadeoutrmode === 1) { fadeoutr += 10 * (60 / safefr); } else { fadeoutr = 0; }
    fill(0, fadeoutr);
    noStroke();
    rect(0, 0, width, height);
    fill(255, 0, 0);
    textSize(30);
    fill(0, 255 - (surface.range.posx + width - abs(player.x)));
    rect(0, 0, width, height);
};
