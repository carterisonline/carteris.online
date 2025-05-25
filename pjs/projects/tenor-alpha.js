angleMode = "degrees";
{
    var loaded = 0;
    var snake = {
        x: 300,
        y: 300,
        xd: [],
        yd: [],
        debug: {
            control: 0,
            x: [],
            y: []
        },
        t: [0, 0, 0, 0],
        tail: 3,
        direction: "up",
    };
    var apple = {
        x: 0,
        y: 0,
        controlrandom: false,
    };
    var vox = {
        x: [],
        y: [],
        d: [],
        de: [],
        s: [],
        r: [],
        g: [],
        b: [],
        amt: 40,
        exe: function (mode, inp) {
            if (mode === 0) {
                vox.x[inp] = random(0, width);
            }
            vox.y[inp] = random(0, height);
            vox.de[inp] = random(0, 17);
            vox.d[inp] = random(1, 5);
            if (vox.de[inp] > 16) {
                vox.s[inp] = random(15, 131);
            } else {
                vox.s[inp] = random(2, 11);
            }
            if (mode === 1) {
                vox.x[inp] = -(vox.s[inp] / 2);
            }
            vox.r[inp] = random(0);
            vox.g[inp] = random(0, 255);
            vox.b[inp] = random(0, 255);
        }
    };
    var reg = 0;
    var count = 0;
    var fail = false;
    var failFade = 0;
    var hs = [];
}//Snake Pro Variables
var snakepro = {
    title: "Snake",
    author: "Carter Reeb",
    update: "1.10",
    /*TenorAuth Chart:
       - 0: Highscore
       - 1: Global Data
       - 2: Player Stats
       - 3: Breach
       - 4: Mods/Code Alts.
    */
    tenorAuth: [1, 1, 1, 1, 1],
    backup: 0, // Do not alter
    load: function () {
        if (snakepro.backup < 1) {
            loaded = 0;
            snake = {
                x: 300,
                y: 300,
                xd: [],
                yd: [],
                debug: {
                    control: 0,
                    x: [],
                    y: []
                },
                t: [0, 0, 0, 0],
                tail: 3,
                direction: "up",
            };
            apple = {
                x: 0,
                y: 0,
                controlrandom: false,
            };
            vox = {
                x: [],
                y: [],
                d: [],
                de: [],
                s: [],
                r: [],
                g: [],
                b: [],
                amt: 40,
                exe: function (mode, inp) {
                    if (mode === 0) {
                        vox.x[inp] = random(0, width);
                    }
                    vox.y[inp] = random(0, height);
                    vox.de[inp] = random(0, 17);
                    vox.d[inp] = random(1, 5);
                    if (vox.de[inp] > 16) {
                        vox.s[inp] = random(15, 131);
                    } else {
                        vox.s[inp] = random(2, 11);
                    }
                    if (mode === 1) {
                        vox.x[inp] = -(vox.s[inp] / 2);
                    }
                    vox.r[inp] = random(0);
                    vox.g[inp] = random(0, 255);
                    vox.b[inp] = random(0, 255);
                }
            };
            reg = 0;
            count = 0;
            fail = false;
            failFade = 0;
            hs = [];
        }
        snakepro.backup++;
    },
    start: function () {
        if (fail === false) {
            if (reg < 1) {
                for (var a = 0; a < vox.amt; a++) {
                    vox.exe(0, a);
                }
                apple.x = round(round(random((1, 59))) * 10);
                apple.y = round(round(random((1, 59))) * 10);
            }
            reg++;
            count++;
            if (count > 3) {
                if (snake.direction === "up") {
                    snake.y -= 10;
                } if (snake.direction === "down") {
                    snake.y += 10;
                } if (snake.direction === "left") {
                    snake.x -= 10;
                } if (snake.direction === "right") {
                    snake.x += 10;
                }
                snake.xd.push(snake.x);
                snake.yd.push(snake.y);

                count = 0;
            }

            if (keyIsPressed && keyCode === UP_ARROW && snake.t[0] !== 1 && snake.direction !== "down") {
                snake.direction = "up";
                snake.t[0] = 1;
            } if (keyIsPressed && keyCode === DOWN_ARROW && snake.t[1] !== 1 && snake.direction !== "up") {
                snake.direction = "down";
                snake.t[1] = 1;
            } if (keyIsPressed && keyCode === LEFT_ARROW && snake.t[2] !== 1 && snake.direction !== "right") {
                snake.direction = "left";
                snake.t[2] = 1;
            } if (keyIsPressed && keyCode === RIGHT_ARROW && snake.t[3] !== 1 && snake.direction !== "left") {
                snake.direction = "right";
                snake.t[3] = 1;
            }
        }
        keyReleased = function () {
            snake.t = [0, 0, 0, 0];
        };
        if (snake.x > 600 || snake.x < 0 || snake.y > 600 || snake.y < 0) {
            fail = true;
        }
        background(0, 0, 0);
        for (var a = 0; a < vox.amt; a++) {
            vox.x[a] += vox.d[a];
            vox.y[a] -= noise(vox.d[a]);
            fill(vox.r[a], vox.g[a], vox.b[a]);
            ellipse(vox.x[a], vox.y[a], vox.s[a], vox.s[a]);
            if (vox.x[a] > width + (vox.s[a] / 2)) {
                vox.exe(1, a);
            }
        }
        stroke(80 + failFade, 80, 80, 100);
        for (var a = 0; a < 600; a += 10) {
            line(a, 0, a, height);
        } for (var a = 0; a < 600; a += 10) {
            line(0, a, width, a);
        }
        noStroke();
        fill(0, 255, 0);
        if (snake.debug.control === 1) {
            snake.debug.x.push(snake.x);
            snake.debug.y.push(snake.y);
            for (var a = 0; a < snake.debug.x.length; a++) {
                fill(255, 5);
                rect(snake.debug.x[a], snake.debug.y[a], 10, 10);
            }
        }
        fill(0, 255, 0);
        for (var a = 0; a < snake.tail; a++) {
            if (snake.x === snake.xd[snake.xd.length - a - 2] && snake.y === snake.yd[snake.xd.length - a - 2]) {
                fail = true;
            }
            rect(snake.xd[snake.xd.length - a - 1], snake.yd[snake.xd.length - a - 1], 10, 10);
        } if (snake.x === apple.x && snake.y === apple.y) {
            snake.tail += 20;
            apple.x = round(round(random((1, 59))) * 10);
            apple.y = round(round(random((1, 59))) * 10);
        }
        fill(255, 20);
        if (snake.direction === "right") {
            rect(snake.x, snake.y, width, 10);
        } else if (snake.direction === "left") {
            rect(0, snake.y, snake.x, 10);
        } else if (snake.direction === "up") {
            rect(snake.x, 0, 10, snake.y);
        } else if (snake.direction === "down") {
            rect(snake.x, snake.y, 10, height);
        }
        fill(255, 0, 0);
        rect(apple.x, apple.y, 10, 10);
        textSize(21);
        fill(255, 255, 255);
        textAlign(LEFT, RIGHT);
        if (fail === true) {
            fill(255, 0, 0);
            rect(snake.x, snake.y, 10, 10);
            rect(snake.xd[snake.xd.length - 2], snake.yd[snake.yd.length - 2], 10, 10);
            failFade += sin(failFade - 255);
            textSize(65);
            fill(255, failFade * 10);
            textAlign(LEFT, RIGHT);
            text("Game Over", 125, 299);
            smooth();
            textSize(20);
            textAlign(CENTER, CENTER);
            text("Score: " + round(((snake.tail / 3) - 1) * 760), 300, 320);
            if (keyIsPressed) {
                Program.restart();
            }
        }
    },
};

//START OF TENOR -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
var currentGame = "";
var not = {
    y: 200,
    out: "",
    title: "",
    goal: -24,
};
var timer = {
    first: 0,
    signin: 0,
};
var notfirst = 0;
var showNotification = function (title, information) {
    not.y -= not.y / 20;
    not.out = information;
    not.title = title;
};
var hideNotification = function () {
    not.y -= (not.y - 150) / 20;
};
var highContrast = {
    mode: 0,
    fade: 0,
    toggle: 0,
    switched: 0,
};
var debugMode = false;
var compressImport = [2];
var initials = "";
var compressMap = 2;
var noLoad = 0;
var loadString = [0, 1];
var users = [];
var userNames = [];
var userLast = [];
var name = "";
var firstName = "";
var lastName = "";
var nameSwitch = 0;
var startSequence = "compress";
var freq = 40;
var clock = function (x, y, s) {
    strokeWeight(1);
    noFill();
    stroke(255, 255, 255);
    ellipse(x, y, s, s);
    line(x, y, x + cos(((hour() + minute() / 60) * 30) - 90) * s / 2, y + sin(((hour() + minute() / 60) * 30) - 90) * s / 2);
};
var gameMatrix = function (i, x, y, s) {
    pushMatrix();
    translate(x, y);
    textAlign(CENTER, CENTER);
    textSize(23 * s);
    text(i.title, 0, 0);
    textSize(12 * s);
    text("v." + i.update, 18 + textWidth(i.title), 4);
    text("by " + i.author, 41 - textWidth(i.title), 20);
    textSize(15 * s);
    if (i.tenorAuth[0] === 1 || i.tenorAuth[1] === 1 || i.tenorAuth[2] === 1 || i.tenorAuth[3] === 1 || i.tenorAuth[4] === 1 || i.tenorAuth[5] === 1) {
        text(i.title + " saves data for:", 80 - (textWidth(i.title) / 2), 45);
    }
    i.backup = 0;
    if (i.tenorAuth[0] === 1) {
        i.backup++;
        text("+ Highscores", 79 - textWidth(i.title), (20 * i.backup) + 45);
    } if (i.tenorAuth[1] === 1) {
        i.backup++;
        text("+ Global Data", 79 - textWidth(i.title), (20 * i.backup) + 45);
    } if (i.tenorAuth[2] === 1) {
        i.backup++;
        text("+ Player Stats", 82 - textWidth(i.title), (20 * i.backup) + 45);
    }
    popMatrix();
};
var tabnum = 0;
var tabpush = 0;
var tablim = [0, 0];
var ready = 0;
var theme = 1;
var themeSelect = 1;
var themeList = ["Ultraviolet", 255, 0, 145, 153, 0, 255, "Mooray", 30, 208, 88, 153, 221, 256, "Granite", 201, 93, 93, 147, 76, 62, "Sunflower", 255, 170, 0, 191, 194, 25, "Sunset", 277, 0, 85, 225, 116, 0, "Regal", 204, 102, 255, 114, 60, 232];
var currentTheme = [255, 0, 145, 153, 0, 255];
var settings = {
    shift: 0,
    label: "Settings",
    num: 0,
};
var games = {
    label: "Games",
};
var signin = {
    label: "Sign In",
};
var eee = 0;
var firstNum = 0;
var keyHandling = function (inp) {
    keyPressed = function () {
        if (keyCode === UP) {
            settings.num--;
            inp.shift = 23;
        } else if (keyCode === DOWN) {
            settings.num++;
            inp.shift = -23;
        }
    };
};
var greetings = [];
var greetingPick = 0;
draw = function () {
    if (currentGame === "snake") {
        snakepro.load();
        snakepro.start();
        fill(255, 255, 255, 100);
        if (mouseX > 11 && mouseX < 54 && mouseY > 579 && mouseY < 589) {
            fill(255, 255, 255);
            if (mouseIsPressed) {
                currentGame = "";
            }
        }
        ellipse(16, 584, 10, 10);
        ellipse(32.5, 584, 10, 10);
        ellipse(49, 584, 10, 10);
    }
    else {
        firstNum = tabnum;
        if (firstName !== "") {
            signin.label = firstName;
        } else {
            signin.label = "Sign In";
        }
        var diagonal = function (c1, c2) {
            strokeWeight(100);
            for (var a = 0; a < width * 2; a += compressMap) {
                stroke(lerpColor(c1, c2, a / width / 2));
                line(0, a, a, 0);
            }
        };
        var option = function (label, num, inp) {
            if (inp.num - num === 0) {
                fill(255, 255, 255);
            } else if (highContrast.mode === 1) {
                fill(171, 171, 171);
            } else {
                fill(0, 0, 0, ((num - inp.num) * 79) + 255);
            }
            text(label, 99 - tabpush, ((num - inp.num) * 23) + 129 - inp.shift);
        };
        var tab = function (inp, num) {
            if (tabnum - num !== 0) {
                fill(0, 0, 0);
            } else {
                fill(255, 255, 255);
            } if (highContrast.mode === 1) {
                if (tabnum - num !== 0) {
                    fill(255, highContrast.fade / 1.4);
                } else {
                    fill(255, 255, 255);
                }
            }
            if (tablim[0] > num) { tablim[0] = num; }
            if (tablim[1] < num) { tablim[1] = num; }
            text(inp.label, 79 - ((tabnum - num) * 100) - tabpush, 76);
            if (num === tabnum && inp === settings) {
                keyHandling(inp);
                option("Theme: " + themeList[(theme * 7) - 7], 0, settings);
                if (settings.num === 0) {
                    if (keyIsPressed && key.code === 32) {

                        if (themeSelect !== 0) {
                            if (theme === themeList.length / 7) {
                                theme = 0;
                            }
                            theme++;

                        }
                        loadString[1] = theme;
                        saveStrings("tenor__XMB-pref-" + initials, loadString);
                        themeSelect = 0;
                    }
                }
                option("Password/PIN", 1, settings);
            }
            if (num === tabnum && inp === signin) {

                noStroke();
                fill(0, 100 - abs(tabpush));
                rect(53 - tabpush, 119, width, 436, 10);
                if (mouseX > 89 - (tabpush * 2) && mouseX < 317 - (tabpush * 2) && mouseY > 469 && mouseY < 518) {
                    if (mouseIsPressed) {
                        firstName = "";
                        lastName = "";
                        tabnum = 0;
                        startSequence = "signin";
                    }
                    fill(255, 255, 255);
                }
                rect(89 - (tabpush * 2), 469, 228, 49, 10);
                fill(0, 100);
                if (mouseX > 91 - (tabpush * 3) && mouseX < 191 - (tabpush * 3) && mouseY > 242 && mouseY < 442) {
                    fill(255, 255, 255);
                }
                rect(91 - (tabpush * 3), 242, 101, 200, 10);
                fill(255, 255, 255);
                textSize(40);
                text(greetings[greetingPick], 90 - (tabpush * 2), 182);
                textSize(13);
                text("Signed in as " + firstName + " " + lastName, 91 - (tabpush * 1.5), 207);
                textSize(20);
                if (mouseX > 89 - (tabpush * 2) && mouseX < 317 - (tabpush * 2) && mouseY > 469 && mouseY < 518) {
                    fill(0, 0, 0);
                }
                strokeWeight(5);
                text("S I G N   O U T", 132 - (tabpush * 2), 500);
                fill(255, 255, 255);
                if (mouseX > 91 - (tabpush * 3) && mouseX < 191 - (tabpush * 3) && mouseY > 242 && mouseY < 442) {
                    fill(0);
                    arc(142 - (tabpush * 3), 285, 50, 50, 0, 180);
                } else {
                    arc(142 - (tabpush * 3), 285, 50, 50, 181, 360);
                }
                noFill();
                stroke(255, 255, 255);
                fill(0, 0, 0);
                if (mouseX > 91 - (tabpush * 3) && mouseX < 191 - (tabpush * 3) && mouseY > 242 && mouseY < 442) {
                    fill(255, 255, 255);
                    stroke(0);
                    arc(142 - (tabpush * 3), 285, 45, 45, 181, 360);
                    fill(0);
                } else {
                    arc(142 - (tabpush * 3), 285, 45, 45, 0, 180);
                    fill(255);
                }
                ellipse(142.5 - (tabpush * 3), 398 - highContrast.fade / 4.4, 10, 10);
                line(142 - (tabpush * 3), 341, 142 - (tabpush * 3), 398);
                if (mouseX > 91 - (tabpush * 3) && mouseX < 191 - (tabpush * 3) && mouseY > 242 && mouseY < 442) {
                    saveStrings("tenor__XMB-pref-" + initials, loadString);
                    if (mouseIsPressed && highContrast.toggle === 0) {
                        if (highContrast.mode === 0) {

                            highContrast.mode = 1;
                            highContrast.switched = 1;
                        } if (highContrast.mode === 1 && highContrast.switched !== 1) {
                            highContrast.mode = 0;
                        }
                        highContrast.switched = 0;
                        highContrast.toggle = 1;
                    }
                    fill(0, 100);
                    noStroke();
                    rect(mouseX + 10, mouseY - 10, 100, 20);
                    fill(255, 255, 255);
                    textSize(11);
                    text("High Contrast", mouseX + 18, mouseY + 3);
                }
                loadString[2] = highContrast.mode;
                if (mouseIsPressed) { } else {
                    highContrast.toggle = 0;
                }
            }
            inp.shift -= inp.shift / 10;
        };
        //XMB Menu
        {
            for (var a = 0; a < 6; a++) {
                currentTheme[a] -= (currentTheme[a] - themeList[((theme - 1) * 7) + 1 + a]) / 40;
            }
            if (startSequence !== "compress" && highContrast.fade < 254) {
                diagonal(color(currentTheme[0], currentTheme[1], currentTheme[2]), color(currentTheme[3], currentTheme[4], currentTheme[5]));
            }
            if (highContrast.mode === 1) {
                highContrast.fade -= (highContrast.fade - 255) / 10;
            } else {
                highContrast.fade -= (highContrast.fade - 0) / 10;
            }
            noStroke();
            fill(0, highContrast.fade);
            rect(0, 0, width, height);
            highContrast.fade = constrain(highContrast.fade, 0, 255);
            strokeWeight(1);
            stroke(255, 255, 255);
            if (highContrast.mode === 1) {
                stroke(255 - highContrast.fade);
            }
            for (var a = 0; a < width; a += freq) {
                line(a, (cos((a + frameCount) * noise(frameCount)) * 51) + 187, a + freq, (cos((a + freq + frameCount) * noise(frameCount)) * 51) + 187);
            } for (var a = 0; a < width; a += freq) {
                line(a, (sin((a + frameCount) * noise(frameCount)) * 51) + 187, a + freq, (cos((a + freq + frameCount) * noise(frameCount)) * 51) + 187);
            } for (var a = 0; a < width; a += freq) {
                line(a, (sin((a + frameCount) * noise(frameCount)) * 51) + 187, a + freq, (sin((a + freq + frameCount) * noise(frameCount)) * 51) + 187);
            }
            if (startSequence === false) {
                textSize(17);
                fill(255, 255, 255);
                if (hour() > 12) {
                    if (minute() < 10) {
                        text(hour() - 12 + ":0" + minute() + " PM", width - 110, 29);
                    } else {
                        text(hour() - 12 + ":" + minute() + " PM", width - 110, 29);
                    }
                } else if (hour() === 12) {
                    if (minute() < 10) {
                        text("12:0" + minute() + " PM", width - 110, 29);
                    } else {
                        text("12:" + minute() + " PM", width - 110, 29);
                    }
                } else {
                    if (minute() < 10) {
                        text(hour() + ":0" + minute() + " AM", width - 110, 29);
                    } else {
                        text(hour() + ":" + minute() + " AM", width - 110, 29);
                    }
                }
                clock(width - 22, 23, 20);

                if (keyIsPressed) {
                    if (ready !== 1) {
                        if (keyCode === LEFT && tabnum !== tablim[0]) {
                            tabpush = 100;
                            tabnum--;
                        } else if (keyCode === RIGHT && tabnum !== tablim[1]) {
                            tabpush = -100;
                            tabnum++;
                        }
                    }
                    ready = 1;
                } keyReleased = function () {
                    ready = 0;
                    themeSelect = 1;
                };
                tabpush -= tabpush / 10;
                tab(games, 0);
                tab(settings, -1);
                tab(signin, 1);
            }

            //Extra Information Tab
            {
                noStroke();
                fill(255, 255, 255);
                rect(0, 600, width, height);
                fill(0, 0, 0);
                text(tabnum, 300, 857);
                text(255 - ((tabnum + 1) * 255), 100, 900);
                text(tablim, 100, 800);
                text(currentTheme[0] - themeList[((theme - 1) * 7) + 1], 424, 729);
                text(((theme - 1) * 7) + 1, 100, 1000);
                fill(28, 28, 28);
                rect(42, 1046, 100, 100);
                if (mouseIsPressed && mouseX > 42 && mouseX < 142 && mouseY > 1046 && mouseY < 1146) {
                    Program.restart();
                }
            }
        }
        if (noLoad !== 1) {
            if (loadStrings) {
                // try {
                //     compressImport = loadStrings("tenor__XMB-pref");
                //     compressMap = compressImport[0] / 1;
                //     theme = loadString[1] / 1;
                //     highContrast.mode = loadString[2] / 1;
                //     if (frameCount < 60) {
                //         startSequence = "signin";
                //     }
                // }
                // catch (err) {
                if (startSequence === "compress") {
                    compressImport[0] = compressMap;
                    compressMap += 0.02;
                    diagonal(color(0, 0, 0), color(0, 0, 0));
                    fill(255, 255, 255);
                    textAlign(CENTER, CENTER);
                    text("Compressing Gradients... (" + round((60 / 65) * 100) + "%)", 300, 291);
                    if (frameCount > 10) {
                        noLoad = 1;
                        // saveStrings("tenor__XMB-pref", compressImport);
                        // saveStrings("tenor__XMB-pref-" + initials, loadString);
                        // compressImport = loadStrings("tenor__XMB-pref");
                        // loadString = loadStrings("tenor__XMB-pref-" + initials);
                        startSequence = "signin";
                    }
                }
                fill(255, 255, 255);
                textAlign(CENTER, CENTER);
                text("Preparing First-Time Setup...", 300, 258);
                textAlign(LEFT, RIGHT);
                // }
            }
        }
        if (startSequence === "signup") {
            notfirst = 0;
            theme = 1;
            fill(0, 50);
            rect(0, 0, width, 600);
            if (compressImport[0] < 1) {
                filter(BLUR, 1.2);
                compressMap = compressImport[0] / 0.15;
            } else {
                compressMap = compressImport[0] / 1;
            }
            fill(255, 255, 255, 200);
            textSize(50);
            textAlign(CENTER, CENTER);
            text("Enter Your Initials", 300, 113);
            keyPressed = function () {
                if (keyCode === 8) {
                    initials = "";
                } else if (keyCode === 13 && initials.length === 3) {
                    if (loadStrings) {
                        // try {
                        //     loadString = loadStrings("tenor__XMB-pref-" + initials);
                        //     theme = loadString[1];
                        //     highContrast.mode = loadString[2] / 1;
                        //     startSequence = false;
                        // } catch (err) {
                        // saveStrings("tenor__XMB-pref-" + initials, loadString);
                        users.push(initials);
                        // saveStrings("tenor__XMB-users", users);
                        startSequence = "name";
                        // }
                    }
                    compressMap = compressImport[0] / 1;

                }
                else if (initials.length < 3 && keyCode !== 16 && keyCode !== 17 && keyCode !== 18 && keyCode !== 157 && keyCode !== 20 && keyCode !== 192) {
                    initials += key.toString();
                }
            };
            fill(0, 100);
            rect(0, 162, width, 189);
            fill(255, 255, 255);
            textSize(169);
            text(initials, 300, 241);
            if (initials.length === 3) {
                fill(255, 255, 255, 200);
                textSize(20);
                text("Press ENTER to Create Account", 300, 400);
            }
        }
        if (startSequence === "signin") {
            timer.signin = 0;
            hideNotification();
            notfirst = 1;
            nameSwitch = 0;
            theme = 1;
            highContrast.mode = 0;
            if (loadStrings) {
                // try {
                //     users = loadStrings("tenor__XMB-users");
                //     userNames = loadStrings("tenor__XMB-usernames");
                //     userLast = loadStrings("tenor__XMB-usernames-last");
                // } catch (err) {
                startSequence = "signup";
                // }
            }
            fill(0, 50);
            rect(0, 0, width, 600);
            if (compressImport[0] < 1) {
                filter(BLUR, 1.2);
                compressMap = compressImport[0] / 0.15;
            } else {
                compressMap = compressImport[0] / 1;
            }
            textAlign(CENTER, CENTER);
            textSize(100);
            fill(54, 54, 54, 200);
            text("Sign In", 300, 119);
            fill(255, 255, 255, 200);
            text("Sign In", 300, 115);
            textSize(30);
            fill(0, 0, 0, 100);
            rect(0, 199, width, 22);
            for (var a = 0; a < users.length; a++) {
                fill(0, 0, 0, 150);
                if (mouseY > a * 60 + 221 && mouseY < a * 60 + 221 + 38) {
                    fill(255, 255, 255);
                    if (mouseIsPressed) {
                        initials = users[a];
                        firstName = userNames[a];
                        lastName = userLast[a];
                        loadString = loadStrings("tenor__XMB-pref-" + initials);
                        startSequence = false;
                    }
                }
                rect(0, a * 60 + 221, width, 38);
                fill(0, 0, 0, 100);
                rect(0, a * 60 + 259, width, 22);
                fill(255, 255, 255);
                if (mouseY > a * 60 + 221 && mouseY < a * 60 + 221 + 38) {
                    fill(0, 0, 0);
                }
                text("''" + userNames[a] + " " + userLast[a] + "'' [" + users[a] + "]", 300, a * 60 + 238);
            }
            fill(0, 150);
            if (mouseX > 100 && mouseX < 504 && mouseY > 516 && mouseY < 565) {
                if (mouseIsPressed) {
                    startSequence = "signup";
                }
                fill(255, 255, 255);
            }
            rect(100, 516, 404, 49);
            fill(255, 255, 255);
            textSize(19);
            if (mouseX > 100 && mouseX < 504 && mouseY > 516 && mouseY < 565) {
                fill(0, 0, 0);
            }
            text("C R E A T E   N E W   U S E R", 300, 540);
        }
        if (startSequence === "name") {
            theme = 1;
            fill(0, 200);
            rect(0, 0, width, height);
            fill(255, 200);
            textSize(58);
            textAlign(CENTER, CENTER);
            text("Who Are You?", 300, 115);
            textSize(20);
            text("You Can Enter First & Last Name if you Want.", 300, 154);
            keyPressed = function () {
                if (keyCode === 8) {
                    name = "";
                } else if (keyCode === 13 && name.length > 1) {
                    for (var a = 0; a < name.length; a++) {
                        if (name[a] !== " " && nameSwitch === 0) {
                            firstName += name[a];
                        } if (name[a] === " " && nameSwitch === 0) {
                            nameSwitch = 1;
                        } if (name[a] !== " " && nameSwitch === 1) {
                            lastName += name[a];
                        }
                    }
                    userNames.push(firstName);
                    userLast.push(lastName);
                    // saveStrings("tenor__XMB-usernames", userNames);
                    // saveStrings("tenor__XMB-usernames-last", userLast);
                    startSequence = false;
                }
                else if (keyCode !== 16 && keyCode !== 17 && keyCode !== 18 && keyCode !== 157 && keyCode !== 20 && keyCode !== 192) {
                    name += key.toString();
                }
            };
            if (name.length > 1) {
                text("Press ENTER to finish signup.", 300, 414);
            }
            fill(0, 0, 0, 50);
            rect(0, 223, width, 100);
            textSize(38);
            fill(255, 255, 255);
            text(name, 300, 269);
        }
        eee += compressMap;
        textAlign(LEFT, RIGHT);
        if (debugMode === true) {
            fill(255, 255, 255);
            textSize(15);
            text(round(60 * 10) / 10 + " fps", 11, 27);
            text("Compress Map: " + round(abs(2 - compressMap) * 10) / 10 + "wpd", 9, 48);
            fill(46, 46, 46);
        }
        if (firstNum === tabnum) {
            greetings = ["Hi, " + firstName + "!", "Greetings, " + firstName + "!", "How are you, " + firstName + "?", "Hey, " + firstName + "!", "Need some help?", "What's up, " + firstName + "?", "Need anything, " + firstName + "?"];
        }
        if (firstNum !== tabnum) {
            greetings = ["Hi, " + firstName + "!", "Greetings, " + firstName + "!", "How are you, " + firstName + "?", "Hey, " + firstName + "!", "Need some help?", "What's up, " + firstName + "?", "Need anything, " + firstName + "?"];
            greetingPick = round(random(0, greetings.length - 1));
        }
        if (users.length === 1 && notfirst !== 1) {
            timer.first++;
            if (timer.first < 300) {
                showNotification("Welcome", "Thanks for trying out Tenor!\n--------------------------------------\nUse the arrow keys to move\nand the space bar to select.");
            } else if (timer.first < 400) {
                hideNotification();
            }
        } if (firstName !== "") {
            timer.signin++;
            if (timer.signin < 300) {
                showNotification("Hello, " + firstName, "Signed in as " + firstName + " " + lastName + "\n--------------------------------------\nVisit the sign in tab for more\noptions and information.");
            } else if (timer.signin < 400) {
                hideNotification();
            }
        }
        {
            fill(255, 255, 255);
            rect(width - 200, not.goal - not.y, 175, 131, 10);
            fill(0, 0, 0);
            textSize(18);
            text(not.title, width - 191, not.goal - (not.y * 2) + 56);
            textSize(11);
            text(not.out, width - 190, not.goal - (not.y * 1.5) + 74);
        } // Notification
    } //Tenor XMB
};
