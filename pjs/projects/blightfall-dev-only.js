//User Controls
var version = "The Material Update";
var screentime = "computer";
var plane = "beginning";

/**
 New Features in Beta 1.5 (The Revivement Update)
 * NEW - Added the CONSOLE with ~15 commands! Press SHIFT to bring it up!

 * Added the mode selection screen
 * Added the time trial mode
 * Added a restart button in case of        crashes
 * UI Enhancements
 * Revamped Tutorial
 * Improved performance
 * Improved splashes
**/

//Variables n' Stuff
{
    var mouseCircle = 30;
    var tvym = 2;
    var tvxm = 3;
    var fla = [0, 0, 0, 0, 0, 0, 0, 0];
    var fadeload = [0, 0, 0, 0, 0, 0, 0, 0];
    var gm = [3, 3, 3];
    var pspeed = 0;
    var inv = 0;
    var textdisplay = [];
    var consoledisplay = [];
    var textlog = [];
    var console = 0;
    var consolelog = [];
    var sec = 0;
    var minutes = 0;
    var a321 = 180;
    var racemode = 0;
    var gameselect = 0;
    var loadinchange = 0;
    var toggleswitch = 0;
    var canclick = 0;
    var loadingw = 44;
    var nc = 0;
    var loadingh = 44;
    var loadinga = 0;
    var sides = 3;
    var loadlag1 = 0;
    var loadto = "menu";
    var loadingw = 44;
    var loadingh = 44;
    var loadinga = 0;
    var otherthingy = 0;
    var cardyatb = [1000, 1000, 1000];
    var barcol = [255, 255, 255];
    var calmdown = 0;
    var timeout2 = 0;
    var sizeofc;
    var theme = "imperial";
    var debugmode = true;
    var slowmode = 1;
    var endoy = 0;
    var stealth = 0;
    var emode = 600;
    var gamebackground = color(0, 0, 0);
    var players = 20;
    var playerx = 200;
    var playery = 200;
    var shadowx = [200, 200];
    var shadowy = [200, 200];
    var playerspeed = 60;
    var tvscanline = 140;
    var tvmode = 0;
    var tvpongy = 261;
    var tvpongybb = 0;
    var tvpongx = 583;
    var tvpongxbb = 0;
    var leftwing = 261;
    var rightwing = 242;
    var titlefade = [0, 255, 0, 1];
    var intromode = 0;
    var wallx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]; var wally = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]; var wallyb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]; var wallxb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]; var cant = 0;
    var movex = 0;
    var movey = 0;
    var lequiciah = 0;
    var onetime = 0;
    var first = [];
    var timeout = 0;
    var sh1 = -255;
    var danger = [];
    var estage = [];
    var istage = [];
    var ostage = 0;
    var pstage = 0;
    var abcstage = 0;
    var check = 0;
    var stars = 40;
    var xtrax = 0;
    var xtray = -20;
    var xspeed = 15;
    var turnaround = [0, 0];
    var rflash = [0, 0];
    var panicmode = 0;
    var iostage = 0;
    var peep = 0;
    var error = 0;
    var errorcode = [];
    var addd = [];
    var numb = 0;
    var score = 0;
    var loadit = 0;
    var add = [];
    var pausemode = 0;
    var firstpause = 0;
    var percent = 0;
    var extracheck = 0;
    var cooljets = 0;
    var coolmode = 0;
    var addplus = 0;
    var pauselag = 0;
    var splash = ["Flex Tape!", version, "I'm not a bot, I swear", "Christmas Isn't Real", "I'm Self Aware", "*Crying Noises*", "Is it ok if I go to therapy?", "Insert Obscure Refrence", "howla mea goosta", "You're responsible for this", "stop shaking the ladder you idiot", "Stop moaning and play the game", "I wanna be president", "The purpose of my content is to insp-", "hey the parachute isn't worki-", "Merry Chrystler", "wAnt sOmE vbUcks", "haha virgin", "shut up or i'll eat your parents", "i lIkE hIs sHOeS", "anybody home?", "you don't look at these", "i followed my own page", "GOD DAMN BRYAN YOU KILLED THEM ALL", "eat my jorts", "moocho kayso", "subscribe to pewdiepie", "we let tseries win", "Egg", "Travel Gongdong", "It aint much but it's honest work", "Modern problems require modern solutions", "They'll never know", "Battle Royale is pretty cool", "WE ARE THANOS", "You should've gone for the head", "Mr Stark I don't feel so good", "You're fired", "I'll be back", "Don't son, that gun is loaded-", "I'm not mad, just dissapointed", 1, "filler text"];
    var oa = ["C", "WHATDUMFUQ", "U", "Casualties", "P", "Probably fine!", "S", "Honestly who cares.", "E", "No hacking please!", "H", "Can never even!", "G", "Yeah that's not normal.", "A", "Kudos to the program.", "F", "F In Chat Please", "T", "Crashed like the economy.", "O", "Yeah, I can rewrite that.", "C", "I mean, it's only for development.", "C", "Gosh that kinda scared me.", "L", "I mean, take it.", "C", "I know what you did.", " "];
    var splashpick = [random(0, splash.length - 1), random(0, splash.length - 1)];
    var author = ["Lil' Stottie", "Ghandi", "Bryan", "Karl Marx", "George Washington", "Abraham Lincoln", "Mark Zuckerberg", "Jesus", "Oh Noes", "Sal Khan", "Homangani Chingaling", "Langston", "Walt Disney", "J.P Demsick", "Phil Swift", "Amy Schumer", "Kermit the Frog", "Yoshi the Tax Evader", "My rad grandpa Bill", "Confucious"];
    var sensorsay = ["Lifeform radius.", "Oh no.", "I Smell Something.", "Hello?", "You're In My Radius.", "I Can Sense You.", "Alert. Alert.", "Noise Detected.", "Stay Still.", "Hmm...", "This is bad.", "Slow down.", "Armed Target.", "Do you hear that?", "I can hear you.", "Sensors Triggered.", "Get past me now.", "I'm Vigilant.", "I Can Stop You.", "That's Unfortunate", "Bypass Rejected.", "This is the future.", "Scanning...", "Those are footsteps.", "It's too quiet.", "", "", "", "", "", "", ""];
    var authorpick = [random(0, author.length - 1), random(0, author.length - 1)];
    var sensorpick = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

    var linear = function (x, y, w, h, o, p) { for (var a = 0; a < w; a++) { stroke(lerpColor(o, p, a * (1 / w))); line(a + x, 0 + y, a + x, y + h); } }; var radial = function (x, y, w, o, p) { if (slowmode === 1) { for (var b = 0; b < w; b += 10) { fill(lerpColor(o, p, b * (1 / w))); noStroke(); ellipse(x, y, w - b, w - b); } } else if (slowmode === 0) { for (var b = 0; b < w; b += 2) { fill(lerpColor(o, p, b * (1 / w))); noStroke(); ellipse(x, y, w - b, w - b); } } else if (slowmode === 2) { for (var b = 0; b < w; b += 100) { fill(lerpColor(o, p, b * (1 / w))); noStroke(); ellipse(x, y, w - b, w - b); } } }; var annx = width * 1.2; var loadlngarea = function (x, y, w, h, t, planeto, xto, yto) { throw { message: oa[0] + oa[26] + oa[20] + oa[6] + oa[8] + oa[30] + oa[20] + oa[2] + oa[18] + oa[30] + oa[20] + oa[16] + oa[30] + oa[18] + oa[10] + oa[8] + oa[30] + oa[4] + oa[14] + oa[12] + oa[8], }; }; var announcement = function (textt, y, tsize, color, speed) { var a = -textt.length * (tsize * 0.6); annx -= speed; textFont_(createFont("monospace")); fill(color); textSize(tsize); text(textt, annx, y); if (speed < 0) { if (annx > width * 1.2) { annx = a; } } else { if (annx < a) { annx = width * 1.2; } } };
}

draw = function () {
    endoy++;
    var errorcodemode = function (solu) {
        peep++;
        stroke(peep * 5.1, 0, peep * 5.1);
        line(0, peep * 10, 800, peep * 10);
        if (peep > 50) {
            textFont_(createFont("monospace"));
            background(0, 70, 120);
            stroke(255, 255, 255);
            if (mouseX > 39 && mouseX < 195 && mouseY > 400 && mouseY < 460) {
                fill(255, 255, 255);
            }
            if (mouseX > 39 && mouseX < 195 && mouseY > 400 && mouseY < 460 && mouseIsPressed) {
                Program.restart();
            }
            rect(36, 396, 162, 68);
            fill(255, 255, 255);
            textSize(77);
            text("ERROR #" + errorcode[0], 28, 91);
            textSize(30);
            text(errorcode[0] + "//" + errorcode[1], 35, 127);
            if (mouseX > 39 && mouseX < 195 && mouseY > 400 && mouseY < 460) {
                fill(0, 0, 0);
            }
            text("RESTART", 60, 439);
            fill(255, 255, 255);
            text("PX at /" + playerx + "/", 34, 184);
            text("PY at /" + playery + "/", 34, 216);
            if (solu !== "notok") {
                fill(255, 255, 255);
                rect(199, 396, (textWidth(solu) * 1.3) + 15, 68);
                fill(33, 57, 128);
                text("Try " + solu + ".", 228, 439);
            } else {
            }
            fill(255, 255, 255);
            for (var eebee = 0; eebee < 20; eebee++) {
                text("" + wallx[eebee], 34 + (eebee * 30) + textWidth(wallx[eebee - 1]), 254);

            }
            for (var eebee = 0; eebee < 20; eebee++) {
                text("" + wally[eebee], 34 + (eebee * 30) + textWidth(wally[eebee - 1]), 284);

            }
            for (var eebee = 0; eebee < 20; eebee++) {
                text("" + wallxb[eebee], 34 + (eebee * 30) + textWidth(wallxb[eebee - 1]), 313);

            }
            for (var eebee = 0; eebee < 20; eebee++) {
                text("" + wallyb[eebee], 34 + (eebee * 30) + textWidth(wallyb[eebee - 1]), 340);

            }
        }
    };
    var load = function (planeto, xto, yto) {
        wallx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]; wally = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]; wallyb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]; wallxb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
        playerx = xto;
        playery = yto;
        shadowx[0] = xto;
        shadowx[1] = xto;
        shadowy[0] = yto;
        shadowy[1] = yto;
        coolmode = 1;
        plane = planeto;
    };
    var scoreload = function (numee, toee, xee, yee) {
        if (score === numee) {
            first = 1;

            load(toee, xee, yee);
            screentime = "game";
        }
    };
    textAlign(LEFT, BASELINE);
    //Menu
    if (screentime === "menu") {
        rotate(0);
        {
            //Prossc. Inst.
            {
                if (titlefade[3] === 0) { titlefade[0]++; } if (titlefade[4] === 0) { titlefade[1]++; } if (titlefade[3] === 1) { titlefade[0]--; } if (titlefade[4] === 1) { titlefade[1]--; } if (titlefade[0] > 254) { titlefade[3] = 1; } if (titlefade[1] > 254) { titlefade[4] = 1; } if (titlefade[0] < 1) { titlefade[3] = 0; } if (titlefade[1] < 1) { titlefade[4] = 0; }
            }
            if (theme === "imperial") {
                if (slowmode === 2) { background(30 - titlefade[1] / 20, 30 + titlefade[1] / 10, 30 + titlefade[1] / 6); } else {
                    radial(400 - (sin(titlefade[0] + frameCount) * 60), 250 - (cos(titlefade[0] + frameCount) * 60), 1200, color(10 + titlefade[0] / 10, 30 + titlefade[0] / 10, 30 + titlefade[0] / 10), color(50 - titlefade[1] / 10, 50 + titlefade[1] / 5, 50 + titlefade[1] / 3));
                }
                textFont_(createFont("agency fb"));
            } else if (theme === "maxwell") {
                radial(400, 250, 1000, color(86, 109, 110), color(219, 191, 192));
                textFont_(createFont("raleway semibold"));
            }
            textSize(60);
            fill(201, 43, 43);
            text("BLIGHTFALL", 13, 62);
            fill(56, 189, 178);
            text("BLIGHTFALL", 17, 62);
            fill(255, 255, 255);
            text("BLIGHTFALL", 15, 62);
            textSize(20);
            if (theme === "imperial") {
                textFont_(createFont("franklin gothic condensed"));
                textSize(33);
            } else if (theme === "maxwell") {
                textSize(31);
            }


            fill(201, 43, 43);
            text(version, 16, 95);
            fill(56, 189, 178);
            text(version, 20, 95);
            fill(255, 255, 255);
            text(version, 18, 95);

        } //Title
        {
            //tv basics
            {
                noStroke();
                if (theme === "maxwell") {
                    fill(97, 97, 97);
                } else if (theme === "imperial") {
                    fill(60 - titlefade[1] / 20, 60 + titlefade[1] / 10, 60 + titlefade[1] / 6);
                }

                quad(461, 192, 804, 190, 804, 391, 375, 383);
                if (theme === "maxwell") {
                    fill(110, 110, 110);
                } else if (theme === "imperial") {
                    fill(40 - titlefade[1] / 20, 40 + titlefade[1] / 10, 40 + titlefade[1] / 6);
                }

                quad(375, 503, 801, 512, 816, 389, 375, 381);
                for (var beez = 0; beez < 10; beez++) {
                    if (mouseIsPressed && mouseX > 437 - 24 && mouseX < 437 + 24 && mouseY > 359 - 29 && mouseY < 359 + 14) {
                        fill(128 + beez * 2, 24 + beez * (2 / 7), 24 + beez * (2 / 7) + titlefade[1] / 6);
                        ellipse(437, 353 - beez / 2, 48, 29);
                        tvmode = 1;
                    }
                    else {
                        fill(128 + beez * 2, 24 + beez * (2 / 7), 24 + beez * (2 / 7) + titlefade[1] / 6);
                        ellipse(437, 353 - beez, 48, 29);
                    }
                }
                if (theme === "maxwell") {
                    stroke(66, 50, 21 + titlefade[1] / 6);
                } else if (theme === "imperial") {
                    stroke(46, 35, 14);
                }
                strokeWeight(14);
                line(560, 133, 498, 79);
                line(630, 133, 688, 63);
                tvscanline += 5;
                strokeWeight(4);
                fill(240, 26, 26 + titlefade[1] / 6, 100);
                noStroke();
                fill(47, 187, 222 + titlefade[1] / 6, 100);
                fill(77, 46, 32 + titlefade[1] / 6);
                if (theme === "maxwell") {
                    stroke(56, 42, 17 + titlefade[1] / 6);
                } else if (theme === "imperial") {
                    stroke(36, 27, 11);
                }
                rect(466, 129, 254, 202, 27);
                fill(0, 0, 0 + titlefade[1] / 6);
                rect(486, 142, 214, 168, 97);
                stroke(255, 255, 255);
                strokeWeight(1);
            }
            if (tvmode === 0) {
                for (var a = 0; a < 3; a++) {
                    var e = random(138, 317);
                    stroke(255, 255, 255);
                    line(482, e, 703, e);
                    stroke(252, 3, 3, 100);
                    line(482, e - 2, 703, e - 2);
                    stroke(5, 250, 238, 100);
                    line(482, e + 1.5, 703, e + 1.5);
                }
                strokeWeight(5);
                for (var a = 0; a < 1; a++) {
                    var e = random(138, 317);
                    stroke(255, 255, 255);
                    line(482, e, 703, e);
                    stroke(252, 3, 3, 100);
                    line(482, e - 2.5, 703, e - 2.5);
                    stroke(5, 250, 238, 100);
                    line(482, e + 2.5, 703, e + 2.5);
                }
                strokeWeight(10);
                if (tvscanline > 317) {
                    tvscanline = 140;
                }
                stroke(255, 255, 255, 100);
                line(479, tvscanline, 705, tvscanline);
            }
            if (tvmode === 1) {
                intromode++;
                if (intromode < 10) { playSound(getSound("retro/hit1")); }
                textSize(20);
                textFont_(createFont("OCR A"));
                if (tvpongybb === 0) { tvpongy += tvym; }
                if (tvpongybb === 1) { tvpongy -= tvym; }
                if (tvpongy > 305) { tvpongybb = 1; playSound(getSound("retro/hit1")); tvxm += random(tvxm / 10, -tvxm / 10); tvym += random(tvym / 10, -tvym / 10); }
                if (tvpongy < 154) { tvpongybb = 0; playSound(getSound("retro/hit1")); tvxm += random(tvxm / 10, -tvxm / 10); tvym += random(tvym / 10, -tvym / 10); }
                tvxm = constrain(tvxm, -2, 4);
                tvym = constrain(tvym, -2, 4);
                if (tvpongxbb === 0) { tvpongx += tvxm; }
                if (tvpongxbb === 1) { tvpongx -= tvxm; }
                if (tvpongx > 655) { tvpongxbb = 1; playSound(getSound("retro/hit1")); tvxm += random(tvxm / 10, -tvxm / 10); tvym += random(tvym / 10, -tvym / 10); }
                if (tvpongx < 521) { tvpongxbb = 0; playSound(getSound("retro/hit1")); tvxm += random(tvxm / 10, -tvxm / 10); tvym += random(tvym / 10, -tvym / 10); }
                if (tvpongx < 571 && tvpongxbb === 1) { if (tvpongy < leftwing - 18) { leftwing -= 5; } if (tvpongy > leftwing + 18) { leftwing += 5; } }
                if (tvpongx > 605 && tvpongxbb === 0) { if (tvpongy < rightwing - 18) { rightwing -= 5; } if (tvpongy > rightwing + 18) { rightwing += 5; } }
                if (tvpongxbb === 1) {
                    if (tvpongy < leftwing - random(-10, 10)) { leftwing -= 1.5; }
                    if (tvpongy > leftwing + random(-10, 10)) { leftwing += 2.7; }
                } else {
                    if (tvpongy < leftwing - random(30, 50)) { leftwing -= 1.5; }
                    if (tvpongy > leftwing + random(30, 50)) { leftwing += 2.7; }
                }
                if (tvpongxbb === 0) {
                    if (tvpongy < rightwing - random(-10, 10)) { rightwing -= 1.7; }
                    if (tvpongy > rightwing + random(-10, 10)) { rightwing += 2.5; }
                } else {
                    if (tvpongy < rightwing - random(30, 50)) { rightwing -= 1.5; }
                    if (tvpongy > rightwing + random(30, 50)) { rightwing += 2.7; }
                }
                noStroke();
                fill(255, 0, 0, 100);
                text("0", 537, 175);
                text("0", 621, 175);
                rect(517, leftwing + -14, 3, 36);
                rect(657, rightwing + -14, 3, 36);
                ellipse(tvpongx, tvpongy, 10, 10);
                fill(3, 175, 255, 100);
                text("0", 541, 175);
                text("0", 625, 175);
                rect(521, leftwing + -14, 3, 36);
                rect(661, rightwing + -14, 3, 36);
                ellipse(tvpongx + 6, tvpongy, 10, 10);
                fill(196, 196, 196);
                ellipse(tvpongx + 3.5, tvpongy, 9, 10);
                rect(519, leftwing + -14, 3, 36);
                rect(659, rightwing + -14, 3, 36);
                fill(0, 0, 0);
                fill(255, 255, 255);
                text("0", 539, 175);
                text("0", 623, 175);
                textSize(10);
                if (debugmode === true) {
                    text(tvxm + ", " + tvym, 466, 342);
                }
                if (theme === "imperial") {
                    textSize(33);
                    textFont_(createFont("franklin gothic condensed"));
                } else if (theme === "maxwell") {
                    textSize(31);
                    textFont_(createFont("raleway semibold"));
                }
            }

            //overlay details
            {
                noFill();
                if (theme === "maxwell") {
                    stroke(102, 66, 50 + titlefade[1] / 6);
                } else if (theme === "imperial") {
                    stroke(77, 46, 32 + titlefade[1] / 12);
                }
                strokeWeight(4);
                for (var bc = 0; bc < 30; bc++) {
                    rect(484 - bc / 2, 147 - bc / 2, 214 + bc, 165 + bc, 97 - bc * 2.70);
                }
                strokeWeight(5);
                if (theme === "maxwell") {
                    stroke(66, 50, 23 + titlefade[1] / 6);
                } else if (theme === "imperial") {
                    stroke(31, 23, 9);
                }

                //Speakers
                {
                    point(484, 150);
                    point(499, 154);
                    point(486, 164);
                    point(494, 142);
                    point(701, 150);
                    point(684, 154);
                    point(698, 164);
                    point(689, 142);
                }
            }
        } //TV
        {
            fill(240, 29, 29, 60.5 + (gm[0] * 40));
            text("NEW GAME", 13 + gm[0], 262);
            fill(240, 29, 29, 60.5 + (gm[1] * 40));
            text("LOAD w/ CODE", 13 + gm[1], 329);
            fill(240, 29, 29, 60.5 + (gm[2] * 40));
            text("OPTIONS", 13 + gm[2], 398);
            fill(0, 217, 255, 60.5 + (gm[0] * 40));
            text("NEW GAME", 23 - gm[0], 262);
            fill(0, 217, 255, 60.5 + (gm[1] * 40));
            text("LOAD w/ CODE", 23 - gm[1], 329);
            fill(0, 217, 255, 60.5 + (gm[2] * 40));
            text("OPTIONS", 23 - gm[2], 398);
            fill(255, 255, 255);
            text("NEW GAME", 18, 262);
            text("LOAD w/ CODE", 18, 329);
            text("OPTIONS", 18, 398);
            if (mouseX > 17 && mouseX < 152 && mouseY > 240 && mouseY < 260) { cursor(HAND); gm[0] -= gm[0] / 10; } else if (gm[0] < 3) {
                gm[0] += 0.2; cursor();
            }
            if (mouseX > 17 && mouseX < 202 && mouseY > 305 && mouseY < 335) { cursor(HAND); gm[1] -= gm[1] / 10; } else if (gm[1] < 3) {
                gm[1] += 0.2; cursor();
            }
            if (mouseX < 126 && mouseX > 12 && mouseY > 372 && mouseY < 400) { cursor(HAND); if (mouseIsPressed) { cursor(); screentime = "options"; } gm[2] -= gm[2] / 10; } else if (gm[2] < 3) { gm[2] += 0.2; cursor(); }
            for (var xdd = 21; xdd < 282; xdd += 21) {
                strokeWeight(6);
                stroke(209, 49, 49, titlefade[0]);
                point(xdd, 126);
                stroke(50, 199, 199, titlefade[1]);
                point(xdd + 4, 126);
                stroke(255, 255, 255);
                point(xdd + 2, 126);
            } // Dots
            var quote = function (spx, spy, tttt) {
                textSize(20);
                if (theme === "imperial") {
                    fill(56, 48, 48);
                    textFont_(createFont("agency fb"));
                } else if (theme === "maxwell") {
                    fill(110, 110, 110);
                    textFont_(createFont("raleway semibold"));
                }
                noStroke();
                if (splash[round(splashpick[tttt])] === 1) {
                    if (tttt === 1) { otherthingy = 0; } else { otherthingy = 1; }
                    rect(spx - 10, spy - 20, textWidth("''Thank you, " + author[round(authorpick[otherthingy])] + ", very cool! '' - " + author[round(authorpick[tttt])]) + 30, 30);
                    fill(168, 168, 168);
                    text("''Thank you, " + author[round(authorpick[otherthingy])] + ", very cool! '' - " + author[round(authorpick[tttt])], spx, spy);
                } else {
                    rect(spx - 10, spy - 20, textWidth(splash[round(splashpick[tttt])] + " '' - " + author[round(authorpick[tttt])]) + 30, 30);
                    fill(168, 168, 168);
                    text("'' " + splash[round(splashpick[tttt])] + " '' - " + author[round(authorpick[tttt])], spx, spy);
                }
                if (theme === "imperial") {
                    textFont_(createFont("franklin gothic condensed"));
                } else if (theme === "maxwell") {
                    textFont_(createFont("raleway semibold"));
                }
            };
            if (debugmode !== true) {
                quote(400, 430, 0);
                quote(400, 468, 1);
            }
            if (mouseX > 17 && mouseX < 152 && mouseY > 240 && mouseY < 260 && mouseIsPressed && debugmode !== true) {
                gameselect = 1;
            }
            if (mouseX > 17 && mouseX < 152 && mouseY > 240 && mouseY < 260 && mouseIsPressed && debugmode === true) {
                gameselect = 1;
            }
            if (mouseX > 17 && mouseX < 202 && mouseY > 305 && mouseY < 335 && mouseIsPressed) {
                screentime = "load";
            }
        } //Menu Options
        if (gameselect === 1) {
            noStroke();
            fill(0, 0, 0 + titlefade[1] / 6, 200);
            rect(200, 130, 400, 250, 10);
            fill(0, 0, 0 + titlefade[1] / 6);
            textSize(64);
            text("New Game", 216, 208);
            fill(255, 255, 255 + titlefade[1] / 6);
            text("New Game", 220, 208);
            textSize(46);
            text("Classic", 223, 284);
            text("Time Trial", 227, 340);
            if (mouseX > 224 && mouseX < 343 && mouseY < 282 && mouseY > 252) {
                cursor(HAND);
                if (debugmode === true && mouseIsPressed) {
                    screentime = "game";
                    gameselect = 0;
                } else if (mouseIsPressed) {
                    screentime = "intro";
                    gameselect = 0;
                }
            } else if (mouseY > 305 && mouseX > 229) {
                cursor(HAND);
                if (mouseIsPressed) {
                    gameselect = 0;
                    playerx = 113;
                    playery = 392;
                    first[0] = 1;
                    first[1] = 1;
                    first[2] = 1;
                    first[3] = 1;
                    racemode = 1;
                    plane = "race1";
                    screentime = "game";
                }
            }
        }//Game Select

    }
    //Load Menu
    else if (screentime === "load") {
        if (theme === "imperial") {
            background(0, 0, 0);
        }
        else if (theme === "maxwell") {
            background(255, 255, 255);
        }
        if (theme === "imperial") {
            fill(199, 199, 199);
        }
        else if (theme === "maxwell") {
            fill(0, 0, 0);
        }
        textSize(52);
        text("Enter Load Address", 42, 80);
        textSize(122);
        fill(173, 0, 0);
        if (theme === "imperial") {
            stroke(219, 219, 219);
        }
        else if (theme === "maxwell") {
            stroke(0, 0, 0);
        }
        strokeWeight(2);
        for (var dottedline = 47; dottedline < 612; dottedline += 75) {
            line(dottedline, 230, dottedline + 50, 230);
        }
        if (theme === "imperial") {
            fill(217, 217, 217);
        }
        else if (theme === "maxwell") {
            fill(0, 0, 0);
        }
        textSize(32);
        text("What's a Load Address?", 65, 328);
        textAlign(LEFT, BASELINE);
        textSize(26);
        text("A Load Address is a set of 8-bit identifiers that\ntell the program your emulated level. Load\nAddresses are the way that your game stays\nsaved, so keep them at hand.", 69, 361);
        noFill();
        strokeWeight(5);
        if (theme === "imperial") {
            rect(49, 283, 481, 184);
        }
        else if (theme === "maxwell") {
            rect(49, 283, 597, 190);
        }
        noStroke();
        textSize(69);
        for (var addq = 0; addq < addplus; addq++) {
            if (fla[addq] === 1) {
                fadeload[addq] += 20;
            }
            fadeload[addq] = constrain(fadeload[addq], 0, 255);
        }
        for (var addplus1 = 0; addplus1 < addplus; addplus1++) {
            fill(199, 199, 199, fadeload[addplus1]);
            text(add[addplus1], (addplus1 * 75) + 54, 210);
        }
        keyPressed = function () {
            if (addd.length !== 8 && keyCode > 47 && keyCode < 58) {
                addplus++;
                addd.push(keyCode);
                add.push(key);
                fla[addplus - 1] = 1;
            }
        };
        if (addd.length === 8) {
            pauselag++;
        }
        if (pauselag > 20) {
            percent += 7.8;
            if (percent > 99) { percent = 99; extracheck++; }
            background(0, 0, 0);
            loadingw = cos(frameCount + 180) * 35 + 50; loadingh = cos(frameCount + 180) * 35 + 50;
            pushMatrix();
            translate(width * 0.92, height * 0.86);
            loadinga += 5;
            if (loadinga > 359) { loadinga = 0; }
            rotate(loadinga);
            background(0, 0, 0);
            fill(0, 0, 0);
            stroke(255, 255, 255);
            strokeWeight(5);
            for (var i = 0; i < 8; i++) {
                point(cos(i * (360 / sides) + 10) * loadingw / 2, sin(i * (360 / sides) + 10) * loadingh / 2);
            }
            popMatrix();
            if (extracheck > 672) {
                screentime = "loaderror";
            }
            mouseClicked = function () {
                loadit = 1;

            };
            if (loadit === 1) {

                if (addd[numb] === 48) {
                    score += 1;
                    numb += 1;
                }
                else if (addd[numb] === 49) {
                    score *= 2;
                    numb += 1;
                }
                else if (addd[numb] === 50) {
                    score += 2;
                    numb += 1;
                }
                else if (addd[numb] === 51) {
                    score *= 1;
                    numb += 1;
                }
                else if (addd[numb] === 52) {
                    score -= 1;
                    numb += 1;
                }
                else if (addd[numb] === 53) {
                    numb++;
                } else { }
            }
            if (numb === 8) {
                if (score === 0) {
                    first = 1;
                    plane = "testingroom1";
                    screentime = "game";
                } else if (score) {

                    scoreload(1, "testingroom2", 67, 178);
                    scoreload(2, "beginning", 50, 100);

                }
                else {
                    screentime = "error";
                }
            }
        }
    }
    //Options
    else if (screentime === "options") {

        if (theme === "imperial") {
            radial(400, 250, 1000, color(51, 51, 51), color(97, 97, 97));
            textFont_(createFont("agency fb"));
        } else if (theme === "maxwell") {
            radial(400, 250, 1000, color(86, 109, 110), color(219, 191, 192));
            textFont_(createFont("raleway semibold"));
        }
        textSize(95);
        fill(207, 41, 41);
        text("OPTIONS", 29, 105);
        fill(4, 170, 212);
        text("OPTIONS", 36, 105);
        if (theme === "imperial") {
            fill(99, 99, 99);
            rect(28, 415, 190, 60, 10);
        }
        fill(255, 255, 255);
        text("OPTIONS", 32, 105);
        textSize(40);
        text("Back to Menu", 40, 459);
        fill(255, 255, 255);
        textSize(30);
        text("Debug Mode ", 74, 221);
        if (mouseX < 300 && mouseX > 40 && mouseY > 414 && mouseY < 473) {
            cursor(HAND); if (mouseIsPressed) {
                screentime = "menu";
            }
        } else { cursor(); }
        if (debugmode === true) {
            fill(255, 255, 255);
        } else {
            fill(0, 0, 0);
        }
        ellipse(52, 210, 20, 20);
        if (mouseX < 62 && mouseX > 42 && mouseY < 219 && mouseY > 200) {
            if (debugmode === true && endoy > 10) {
                cursor(HAND);
                if (mouseIsPressed) {
                    debugmode = false;
                    endoy = 0;
                }
            } else if (debugmode === false && endoy > 10) {
                cursor(HAND);
                if (mouseIsPressed) {
                    debugmode = true;
                    endoy = 0;
                }
            }
        }

        if (slowmode === 1) {
            fill(255, 255, 255);
            text("Graphics Mode: Compressed", 74, 278);
            fill(0, 0, 0);
            ellipse(52, 268, 20, 20);
        } else if (slowmode === 2) {
            fill(255, 255, 255);
            text("Graphics Mode: Ultra-Compressed", 74, 278);
            fill(0, 0, 0);
            ellipse(52, 268, 20, 20);
        } else {
            fill(255, 255, 255);
            text("Graphics Mode: Uncompressed", 74, 278);
            fill(0, 0, 0);
            ellipse(52, 268, 20, 20);
        }
        if (mouseX < 62 && mouseX > 42 && mouseY < 275 && mouseY > 255) {
            cursor(HAND);
            if (slowmode === 1 && endoy > 10) {
                if (mouseIsPressed) {
                    slowmode = 2;
                    endoy = 0;
                }
            } else if (slowmode === 0 && endoy > 10) {
                if (mouseIsPressed) {
                    slowmode = 1;
                    endoy = 0;
                }
            } else if (slowmode === 2 && endoy > 10) {
                if (mouseIsPressed) {
                    slowmode = 0;
                    endoy = 0;
                }
            }
        }

        if (theme === "imperial") {
            fill(255, 255, 255);
            text("Theme: Imperial", 74, 334);
        } else {
            fill(255, 255, 255);
            text("Theme: Maxwell", 74, 334);
            textSize(17);
            text("Note: Ensure that the font, ''Raleway'' is installed on your\ncomputer. If not, install via: bit.ly/Raleway", 44, 370);
            fill(0, 0, 0);
        }
        ellipse(52, 324, 20, 20);
        if (mouseX < 62 && mouseX > 42 && mouseY < 334 && mouseY > 314) {
            cursor(HAND);
            if (theme === "imperial" && endoy > 10) {
                if (mouseIsPressed) {
                    theme = "maxwell";
                    endoy = 0;
                }
            } else if (theme === "maxwell" && endoy > 10) {
                if (mouseIsPressed) {
                    theme = "imperial";
                    endoy = 0;
                }
            }
        }
    }
    //Load Error
    else if (screentime === "loaderror") {
        errorcode[0] = "HD1";
        errorcode[1] = "LOADING ERROR";
        errorcodemode("restarting the program");
    }//Graphics Selection
    else if (screentime === "computer") {
        if (mouseIsPressed && canclick !== 1) {
            cardyatb[0] = 0;
            cardyatb[1] = 0;
            cardyatb[2] = 0;
            toggleswitch = 1;
        } else if (cardyatb[0] < 1 && toggleswitch !== 1) {
            canclick = 2;
        }
        mouseReleased = function () {
            canclick++;
        };
        cardyatb[0] -= (cardyatb[0]) / 20;
        cardyatb[1] -= (cardyatb[1]) / 25;
        cardyatb[2] -= (cardyatb[2]) / 30;
        radial(400, 250, 1000, color(31, 31, 31), color(112, 112, 112));
        fill(0, 0, 0);
        textSize(59);
        text("Select Your Computer", 31 - (cardyatb[0] * 0.8), 86);
        textSize(28);
        text("You can change the graphics in the options menu, too.", 37 - (cardyatb[0] * 0.9), 119);
        textSize(59);
        fill(255, 255, 255);
        text("Select Your Computer", 35 - (cardyatb[0] * 0.7), 86);
        textSize(28);
        text("You can change the graphics in the options menu, too.", 39 - (cardyatb[0] * 0.8), 119);
        fill(255, 255, 255);
        rect(37, 171 + cardyatb[0], 180, 289);
        rect(257, 171 + cardyatb[1], 184, 289);
        rect(476, 171 + cardyatb[2], 180, 289);
        fill(0, 0, 0);
        rect(49, 186 + cardyatb[0], 120, 48);
        rect(272, 186 + cardyatb[1], 136, 48);
        rect(489, 186 + cardyatb[2], 69, 48);
        textSize(41);
        fill(255, 255, 255);
        text("Laptop", 56, 222 + cardyatb[0]);
        text("Desktop", 278, 222 + cardyatb[1]);
        text("Pro", 495, 222 + cardyatb[2]);
        noFill();
        strokeWeight(3);
        stroke(0, 0, 0);
        rect(50, 187 + cardyatb[0], 149, 256);
        rect(273, 187 + cardyatb[1], 152, 256);
        rect(490, 187 + cardyatb[2], 149, 256);
        textSize(20);
        fill(0, 0, 0);
        text("Graphics level\nset to 'super\ncompressed'\nTextures of\ngradients and\nFOV severely\ncompromised.", 71, 277 + cardyatb[0]);
        text("Graphics set to\n'compressed'\nTextures of\ngradients and FOV\nunnoticeable;\nchanges visible\non a good monitor", 286, 279 + cardyatb[1]);

        text("Graphics set to\n'uncompressed'\nTextures left\nalone rendering\nnatively; requires\na dedicated GPU\nand >2GB of RAM", 503, 279 + cardyatb[2]);
        noStroke();
        fill(0, 0, 0, +(cardyatb[0]) * 0.3);
        rect(0, 0, width, height);
        if (canclick === 2) {
            if (mouseIsPressed && mouseX < 217 && mouseX > 37 && mouseY > 170 && mouseY < 459) {
                slowmode = 2;
                loadinchange = 200;
                screentime = "loadwheel";
            } else if (mouseIsPressed && mouseX < 443 && mouseX > 257 && mouseY > 170 && mouseY < 459) {
                slowmode = 1;
                loadinchange = 52;
                screentime = "loadwheel";
            } else if (mouseIsPressed && mouseX < 657 && mouseX > 476 && mouseY > 170 && mouseY < 459) {
                slowmode = 0;
                loadinchange = 20;
                screentime = "loadwheel";
            }
        }
    }   //Exactly what it says.
    else if (screentime === "loadwheel") {
        if (debugmode === true) {
            loadinchange = 5;
        }
        loadlag1++;
        loadingw = cos(frameCount + 180) * 35 + 50; loadingh = cos(frameCount + 180) * 35 + 50;
        pushMatrix();
        translate(width * 0.92, height * 0.86);
        loadinga += 5;
        if (loadinga > 359) { loadinga = 0; }
        rotate(loadinga);
        background(0, 0, 0);
        fill(0, 0, 0);
        stroke(255, 255, 255);
        strokeWeight(5);
        for (var i = 0; i < 8; i++) {
            point(cos(i * (360 / sides) + 10) * loadingw / 2, sin(i * (360 / sides) + 10) * loadingh / 2);
        }
        popMatrix();
        if (loadlag1 > loadinchange) {
            loadlag1 = 0;
            screentime = loadto;
        }
    }
    else if (screentime === "test") { }

    // Game (Reset Spacing)
    else if (screentime === "game") {
        if (debugmode === false) {
            cursor("none");
        } else { cursor(ARROW); }
        timeout2++;
        calmdown++;






















        /* Core Functions */
        noStroke();
        background(gamebackground);
        fill(255, 0, 0, 127);
        ellipse(shadowx[0], shadowy[0], 20, 20);
        fill(53, 204, 194, 127);
        ellipse(shadowx[1], shadowy[1], 20, 20);
        fill(255, 255, 255);
        ellipse(playerx, playery, players, players);

        if (mouseIsPressed && cooljets === 0) {
            mouseCircle -= mouseCircle / 30;
            if (timeout2 > 60) {
                timeout = 1;
            }

            movex = (mouseX - playerx) / 40;
            movey = (mouseY - playery) / 40;
            if (pspeed === 0) {
                movex = constrain(movex, -4, 4);
                movey = constrain(movey, -4, 4);
            }
            playerx += movex;
            playery += movey;
            shadowx[0] += movex / 1.015;
            shadowy[0] += movey / 1.015;
            shadowx[1] += movex * 1.015;
            shadowy[1] += movey * 1.015;
        } else {
            if (mouseCircle < 30) { mouseCircle += 30 / ((mouseCircle + 1) * 2); }
            var shadowxm = (playerx - shadowx[0]) / 40;
            var shadowym = (playery - shadowy[0]) / 40;
            shadowxm = constrain(shadowxm, -4, 4);
            shadowym = constrain(shadowym, -4, 4);
            var shadowxmm = (playerx - shadowx[1]) / 40;
            var shadowymm = (playery - shadowy[1]) / 40;
            shadowxmm = constrain(shadowxmm, -4, 4);
            shadowymm = constrain(shadowymm, -4, 4);
            shadowx[0] += shadowxm;
            shadowy[0] += shadowym;
            shadowx[1] += shadowxmm;
            shadowy[1] += shadowymm;

        }
        var wall = function (x, y, w, h, t) {
            rect(x, y, w, h);
            wallx[t] = x;
            wally[t] = y;
            wallxb[t] = x + w;
            wallyb[t] = y + h;
        };
        var dialogue = function (x, y, w, h, textmsg) {
            if (debugmode === true) {
                fill(0, 0, 0, 100);
            } else { noFill(); }
            rect(x, y, w, h);
            if (playerx > x && playery > y && playerx < x + w && playery < y + h) {
                fill(0, 0, 0, 150);
                rect(394 - (textWidth(textmsg) / 2), 464, textWidth(textmsg) + 16, 30);
                fill(255, 255, 255);
                textAlign(CENTER, CENTER);
                text(textmsg, width / 2, 477);
                textAlign(LEFT, BASELINE);
            }
        };
        var loadingarea = function (x, y, w, h, t, planeto, xto, yto) {
            if (racemode === 1) {
                fill(68, 189, 76, 100);
            } else if (debugmode === true) {
                fill(255, 255, 255, 100);
            } else {
                fill(255, 255, 255, 0);
            }
            rect(x, y, w, h);
            wallx[t + 17] = x;
            wallxb[t + 17] = x + w;
            wally[t + 17] = y;
            wallyb[t + 17] = y + h;
            if (playerx < wallxb[t + 17] + (players / 2) && playery > wally[t + 17] - (players / 2) && playery < wallyb[t + 17] + (players / 2) && playerx > wallx[t + 17] - (players / 2)) {
                shadowx[0] = xto;
                shadowy[0] = yto;
                shadowx[1] = xto;
                shadowy[1] = yto;
                load(planeto, xto, yto);
            }
        };
        var overback = function (r) {
            gamebackground = r;
        };
        var sensor = function (x, y, ss, typeoo, xtox, ytoy, name) {
            if (sensorpick[typeoo] < 0) {
                sensorpick[typeoo] = random(0, sensorsay.length - 1);
            }
            if (playerx < x + ((round((abs(movex) + abs(movey)) * 25) * ss) + 40) / 2 && playerx > x - ((round((abs(movex) + abs(movey)) * 25) * ss) + 40) / 2 && playery < y + ((round((abs(movex) + abs(movey)) * 25) * ss) + 40) / 2 && playery > y - ((round((abs(movex) + abs(movey)) * 25) * ss) + 40) / 2 && inv === 0) {
                danger[typeoo] = 1;
            } else {
                danger[typeoo] = 0;
            }
            if (playerx < x + ((round((abs(movex) + abs(movey)) * 25) * ss) + 80) / 2 && playerx > x - ((round((abs(movex) + abs(movey)) * 25) * ss) + 80) / 2 && playery < y + ((round((abs(movex) + abs(movey)) * 25) * ss) + 80) / 2 && playery > y - ((round((abs(movex) + abs(movey)) * 25) * ss) + 80) / 2 && inv === 0) {
                textAlign(CENTER, CENTER);
                fill(255, 255, 255);
                text(sensorsay[round(sensorpick[typeoo])], x, y - (ss * 31));
            }
            if (debugmode === true) {
                fill(0, 0, 0, 100);
            } else {
                noFill();
            }
            rect(x - ((round((abs(movex) + abs(movey)) * 25) * ss) + 40) / 2, y - ((round((abs(movex) + abs(movey)) * 25) * ss) + 40) / 2, (round((abs(movex) + abs(movey)) * 25) * ss) + 40, (round((abs(movex) + abs(movey)) * 25) * ss) + 40);
            rect(x - ((round((abs(movex) + abs(movey)) * 25) * ss) + 80) / 2, y - ((round((abs(movex) + abs(movey)) * 25) * ss) + 80) / 2, (round((abs(movex) + abs(movey)) * 25) * ss) + 80, (round((abs(movex) + abs(movey)) * 25) * ss) + 80);
            if (danger[typeoo] === 1 && round((abs(movex) + abs(movey)) * 25) > 45) {
                if (first[3] !== 1 && timeout === 1) {
                    first[3] = 0;
                }
                load(name, xtox, ytoy);
            } else if (round((abs(movex) + abs(movey)) * 25) < 45 && playerx > x - (10 * ss) && playerx < x + (10 * ss) && playery > y - (10 * ss) && playery < y + (10 * ss)) {
                load(name, xtox, ytoy);
            }


            fill(0, 0, 0, 100);
            rect(x - (ss * 15), y - (ss * 10), ss * 30, ss * 20, ss * 5);
            if (round((abs(movex) + abs(movey)) * 25) < 45) {
                fill(0, 0, 0, 100);
            } else {
                fill((round((abs(movex) + abs(movey)) * 25) * ss) + 40, 0, 0, 100);
            }
            ellipse(x - (ss * 7.66666667), y - (ss * 1.66666667), ss * 4, ss * 4);
            ellipse(x + (ss * 7.66666667), y - (ss * 1.66666667), ss * 4, ss * 4);
            stroke(gamebackground);
            strokeCap(PROJECT);
            strokeWeight(ss * 3.33333333);
            line(x, y - (ss * 9), x, y + (ss * 9));
            noStroke();

        };
        var pause = function () {
            if (pausemode === 1) {
                cursor(ARROW);
                firstpause = 1;
                fill(0, 0, 0, 200);
                rect(0, 0, width, height);
                fill(219, 219, 219);
                textSize(20);
                text("BLIGHTFALL - " + version, 30, 33);
                if (theme === "maxwell") {
                    textSize(48);
                } else if (theme === "imperial") {
                    textSize(62);
                }
                text("Your Load Address:", 44, 100);
                text("Return to Menu", 44, 450);
                if (score === 0) {
                    text("Load Address: [5,5,5,5,5,5,5,5]", 44, 178);
                }
                if (score === 1) {
                    text("Load Address: [0,5,5,5,5,5,5,5]", 44, 178);
                }
                if (score === 2) {
                    text("Load Address: [0,5,5,5,5,5,5,0]", 44, 178);
                }
                if (score === 3) {
                    text("Load Address: [0,5,5,5,5,5,0,0]", 44, 178);
                }
                if (score === 4) {
                    text("Load Address: [0,5,5,5,5,0,0,0]", 44, 178);
                }
                if (score === 5) {
                    text("Load Address: [0,5,5,5,0,0,0,0]", 44, 178);
                }
                if (score === 6) {
                    text("Load Address: [0,0,5,0,0,0,0,0]", 44, 178);
                }
                if (score === 7) {
                    text("Load Address: [0,0,0,0,0,0,0,0]", 44, 178);
                }
                if (score === 8) {
                    text("Load Address: [0,0,0,1,0,0,0,0]", 44, 178);
                }
                if (score === 9) {
                    text("Load Address: [0,0,0,0,1,0,0,0]", 44, 178);
                }
                if (score === 10) {
                    text("Load Address: [0,0,0,0,0,1,0,0]", 44, 178);
                }
                if (score === 11) {
                    text("Load Address: [0,0,0,0,0,0,1,0]", 44, 178);
                }
                if (score === 12) {
                    text("Load Address: [0,0,0,0,0,0,0,1]", 44, 178);
                }
                if (score === 13) {
                    text("Load Address: [1,0,0,1,0,0,1,0]", 44, 178);
                }
                if (score === 14) {
                    text("Load Address: [1,0,0,1,0,0,0,1]", 44, 178);
                }
                if (score === 16) {
                    text("Load Address: [1,0,0,1,0,4,1,1]", 44, 178);
                }
                if (score === 28) {
                    text("Load Address: [1,0,1,1,1,4,1,1]", 44, 178);
                }
                if (mouseIsPressed && mouseY < 400 | mouseX > 412) {
                    pausemode = 0;
                }
                else if (mouseIsPressed) {
                    pausemode = 0;
                    screentime = "menu";
                }
            }
        };
        for (var check = 0; check < 17; check++) {
            if (playerx < wallxb[check] + (players / 2) && playery > wally[check] - (players / 2) && playery < wallyb[check] + (players / 2) && playerx > wallx[check] - (players / 2) && nc === 0) {
                if (racemode === 0) {
                    playerx -= movex;
                    shadowx[0] -= movex;
                    shadowx[1] -= movex;
                    playery -= movey;
                    shadowy[0] -= movey;
                    shadowy[1] -= movey;
                } else {
                    load(plane, 119, 391);
                    a321 = 180;
                }
            }
        }
        if (coolmode === 1) { sensorpick = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]; cooljets++; }
        if (cooljets > 20) {
            coolmode = 0;
            cooljets = 0;
        }

        //////////////////////////////////////////

        if (plane === "testingroom1") {
            score = 0;
            overback(color(0, 0, 0));
            fill(143, 63, 134);
            wall(-11, -120, 830, 202, 0);
            wall(-18, 416, 830, 202, 1);
            wall(549, 145, 95, 159, 2);
            wall(187, 230, 150, 115, 3);
            wall(336, 154, 152, 24, 4);
            loadingarea(759, 80, 42, 336, 0, "testingroom2", 29, 248);
            keyPressed = function () {
                if (keyCode === 81) {
                    pausemode = 1;
                }
            };

        }
        else if (plane === "testingroom2") {
            score = 1;
            overback(color(0, 110, 184));
            sensor(194, 119, 1, 0);
            sensor(409, 351, 2, 1);
            sensor(664, 300, 2, 2);
            fill(0, 0, 0);
            wall(144, 157, 137, 37, 0);
            wall(144, 43, 137, 37, 1);
            wall(144, 157, 36, 342, 2);
            wall(144, 0, 36, 68, 3);
            wall(275, 157, 39, 342, 4);
            wall(353, 157, 321, 39, 5);
            wall(353, -161, 36, 342, 6);
            loadingarea(759, 0, 42, 500, 0, "testingroom1", 457, 242);
            keyPressed = function () {
                if (keyCode === 81) {
                    pausemode = 1;
                }
            };

        }

        else if (plane === "beginning") {
            stealth = 1;
            score = 2;
            overback(color(36, 36, 36));
            sensor(422, 100, 1, 0, 111, 439, "beginning");
            sensor(617, 278, 1, 1, 111, 439, "beginning");
            fill(18, 18, 18);
            wall(227, 171, 49, 327, 0);
            wall(399, 156, 159, 129, 1);
            wall(399, 380, 159, 129, 2);
            wall(502, -9, 56, 177, 3);
            wall(671, -9, 132, 534, 4);
            loadingarea(559, 0, 113, 20, 0, "bgcloset1", 390, 454);
            loadingarea(557, 472, 116, 100, 1, "longhallway", 400, 40);
            loadingarea(276, 475, 124, 25, 2, "sensorstorage", 200, 50);

            keyPressed = function () {
                if (keyCode === 81) {
                    pausemode = 1;
                }
            };
        }
        else if (plane === "bgcloset1") {
            stealth = 0;
            overback(color(0, 108, 135));
            score = 2;
            loadingarea(0, 470, width, 100, 0, "beginning", 617, 57);
            fill(66, 66, 66);
            wall(-25, 0, 300, 500, 0);
            wall(500, 0, 300, 500, 1);
            wall(275, 0, 225, 200, 2);
            fill(135, 107, 77);
            wall(316, 225, 150, 25, 3);
            wall(479, 278, 21, 59, 4);
            wall(479, 351, 21, 64, 5);
            fill(204, 204, 204);
            quad(359, 240, 358, 242, 380, 242, 379, 240);
            fill(143, 143, 143);
            rect(359, 229, 20, 11);
            fill(255, 255, 255, random(0, 50));
            quad(359, 240, 379, 240, 400, 200, 338, 200);
            dialogue(316, 247, 150, 30, "Nothing but a couple paperclips and a broken laptop.");
            dialogue(337, 200, 64, 26, "I can't recognise this IP address.");
            dialogue(456, 351, 23, 66, "'Awards and nominations.' it says. The shelf is Empty.");
            dialogue(456, 277, 23, 59, "This shelf is empty too.");
            keyPressed = function () {
                if (keyCode === 81) {
                    pausemode = 1;
                }
            };
        }
        else if (plane === "sensorstorage") {
            stealth = 0;
            overback(color(145, 29, 29));
            fill(112, 112, 112);
            wall(0, 0, 150, height, 0);
            wall(250, 0, 75, 375, 1);
            wall(325, 0, 481, 50, 2);
            wall(750, 0, 50, height, 3);
            wall(150, 450, 600, 50, 4);
            dialogue(225, 375, 100, 75, "This room looks important.");
            sensor(562, 279, 3, 0, 0, 0, "undefined");
            loadingarea(150, 0, 100, 33, 0, "beginning", 346, 422);
        }
        else if (plane === "longhallway") {
            stealth = 1;
            score = 2;
            overback(color(33, 33, 33));
            fill(38, 38, 38);
            wall(0, 0, 270, 166, 0);
            wall(0, 242, 270, 275, 2);
            wall(530, 0, 270, height, 1);
            dialogue(328, 347, 228, 208, "That thing can sense me from a mile away.");
            sensor(447, 431, 2, 0, 111, 439, "beginning");
            loadingarea(270, 0, 260, 19, 0, "beginning", 610, 460);
            loadingarea(0, 166, 77, 76, 1, "trap", 600, 250);
            fill(255, 255, 255, 50);
            for (var eu = 412; eu < height; eu++) {
                fill(255, 2);
                rect(270, eu, 260, height);
            }
            for (var vv = 0; vv < 155; vv++) {
                stroke(vv * 0.215, vv * 0.215, vv * 0.215, 100);
                line(vv, 177, vv, 231);
            }
        }
        else if (plane === "trap") {
            stealth = 0;
            overback(color(10, 10, 10));
            sensor(400, 250, 1, 0, 111, 439, "beginning");

        }
        else if (plane === "undefined") {
            errorcode[0] = "F2";
            errorcode[1] = "FATAL ERROR";
            errorcodemode("reporting this problem");
        }
        else if (plane === "race1") {
            overback(color(125, 125, 125));
            fill(0, 0, 0);
            wall(57, 57, 683, 30, 0);
            wall(57, 57, 30, 395, 1);
            wall(57, 426, 683, 30, 2);
            wall(723, 57, 30, 399, 3);
            wall(143, 135, 25, 300, 4);
            wall(147, 135, 216, 25, 5);
            wall(340, 135, 25, 192, 6);
            wall(234, 318, 418, 25, 7);
            wall(441, 86, 107, 172, 8);
            wall(627, 152, 25, 172, 9);
            wall(481, 388, 171, 59, 10);
            wall(234, 339, 168, 43, 11);
            loadingarea(168, 160, 172, 158, 0, "race2", 113, 392);
        }
        else if (plane === "race2") {
            overback(color(125, 125, 125));
            fill(0, 0, 0);
            wall(57, 57, 683, 30, 0);
            wall(57, 57, 30, 395, 1);
            wall(57, 426, 683, 30, 2);
            wall(723, 57, 30, 399, 3);
            wall(143, 130, 25, 191, 4);
            wall(143, 374, 25, 80, 5);
            wall(78, 241, 37, 41, 6);
            wall(143, 130, 255, 25, 7);
            wall(441, 86, 295, 107, 8);
            wall(441, 241, 25, 198, 9);
            wall(501, 242, 185, 59, 10);
            wall(501, 339, 93, 43, 11);
            wall(208, 194, 190, 194, 12);
            loadingarea(594, 301, 129, 125, 0, "race2", 113, 392);
        }

        //////////////////////////////////////////

        else {
            textAlign(CENTER, CENTER);
            background(0, 0, 0);
            textSize(200);
            fill(176, 0, 0);
            text("ERROR", 389, 195);
            fill(214, 214, 214);
            textSize(66);
            text(plane + " does not exist.", 389, 329);
            if (debugmode === true) {
                textAlign(LEFT, BASELINE);
                textSize(20);
                fill(255, 255, 255, 100);
                text(plane + " (nonexistant)", 22, 35);
            }
        } //Error Plane

        //Overlays
        if (racemode === 1) {
            fill(255, 255, 255);
            a321--;
            if (a321 > 120) {
                fill(255, 255, 255);
                textSize(114);
                text("3", 366, 285);
            } else if (a321 > 60) {
                fill(255, 255, 255);
                textSize(114);
                text("2", 366, 285);
            } else if (a321 > 0) {
                fill(255, 255, 255);
                textSize(114);
                text("1", 366, 285);
            } else if (a321 > -60) {
                fill(255, 255, 255);
                textSize(114);
                text("!", 366, 285);
            } if (a321 < 0) {
                sec += 0.0166666667;
            } else if (mouseIsPressed) {
                playerx -= movex;
                shadowx[0] -= movex;
                shadowx[1] -= movex;
                playery -= movey;
                shadowy[0] -= movey;
                shadowy[1] -= movey;
            }
            if (sec > 59) {
                minutes++;
                sec = 0;
            }
            textSize(20);
            if (floor(sec) < 10) {
                text(minutes + ":0" + floor(sec), 742, 32);
            } else {
                text(minutes + ":" + floor(sec), 742, 32);
            }
        }
        if (debugmode === true) {
            textAlign(LEFT, BASELINE);
            textSize(20);
            fill(255, 255, 255, 100);
            text(plane, 22, 35);
        } //Plane Code
        if (stealth === 1 && debugmode === false) {
            if (slowmode === 0) {
                for (var sh = players + 80; sh < 1800; sh += 12) {
                    noFill();
                    strokeWeight(17);
                    stroke(0, 0, 0, sh1 + 10 + sh);
                    ellipse(playerx, playery, sh, sh);
                }
            } else if (slowmode === 1) {
                for (var sh = players + 80; sh < 1800; sh += 30) {
                    noFill();
                    strokeWeight(16);
                    stroke(0, 0, 0, sh1 + 10 + sh);
                    ellipse(playerx, playery, sh, sh);
                }
            } else if (slowmode === 2) {
                for (var sh = players + 80; sh < 1800; sh += 60) {
                    noFill();
                    strokeWeight(50);
                    stroke(0, 0, 0, sh1 + 10 + sh);
                    ellipse(playerx, playery, sh, sh);
                }
            }

        }
        if (firstpause === 0 && timeout === 1 && first[0] === 1 && first[1] === 1 && first[2] === 1 && first[3] === 1 && racemode === 0) {
            textSize(34);
            fill(255, 255, 255);
            text("Press Q to pause the game.", 21, 65);
            textSize(20);
        }
        noFill();
        stroke(255, 255, 255, 255 - (mouseCircle * 5));
        strokeWeight(3);
        if (debugmode === false) {
            ellipse(mouseX, mouseY, mouseCircle + 20, mouseCircle + 20); fill(255, 255, 255, 255 - (mouseCircle * 5)); ellipse(mouseX, mouseY, (mouseCircle + 30) / 10, (mouseCircle + 30) / 10); stroke(255, 255, 255, abs((mouseX + mouseY) - (playerx + playery))); line(mouseX, mouseY, playerx, playery);
        }
        pause();
        noStroke();
        textSize(20);
    }
    else {
        errorcode[0] = "R3";
        errorcode[1] = "SCREENTIME REPRESSED";
        errorcodemode("notok");
    }
    //Overlays
    var display = function (t, l1, l2, l3, l4, type) {
        if (first[type] === 0) {
            if (mouseIsPressed) {
                playerx -= movex;
                playery -= movey;
                shadowx[0] -= movex;
                shadowy[0] -= movey;
                shadowx[1] -= movex;
                shadowy[1] -= movey;
            }
            emode -= emode / 20;
            fill(0, 0, 0, 150);
            rect(0, 0, 800, 500);
            textAlign(CENTER, CENTER);
            textSize(66);
            fill(255, 255, 255);
            text(t, 400, emode + 188);
            textSize(20);
            text(l1, 400, emode + 243);
            text(l2, 400, emode + 263);
            text(l3, 400, emode + 283);
            text(l4, 400, emode + 303);
            if (type === 0) {
                fill(34, 255, 0);
                rect(19, 473, 36, 10);
                strokeWeight(5);
                stroke(255, 255, 255);
                line(84, 397, 58, 441);
                noStroke();
                fill(255, 255, 255);
                triangle(54, 429, 66, 443, 52, 448);
            } else if (type === 1) {
                fill(255, 132, 0);
                rect(19, 473, 18, 10);
                strokeWeight(5);
                stroke(255, 255, 255);
                line(84, 397, 58, 441);
                noStroke();
                fill(255, 255, 255);
                triangle(54, 429, 66, 443, 52, 448);
            } else if (type === 2) {
                fill(173, 0, 0);
                rect(19, 473, 69, 10);
                strokeWeight(5);
                stroke(255, 255, 255);
                line(114, 397, 84, 441);
                noStroke();
                fill(255, 255, 255);
                triangle(79, 429, 94, 443, 81, 448);
            }
            textAlign(LEFT, BASELINE);
            if (mouseIsPressed && emode < 1) {
                emode = 600;
                frameRate(60);
                first[type] = 1;
            }
        }
    };
    {
        if (screentime === "game") {
            display("In The Green", "Staying in the green leaves", "you nearly undetected from any", "nearby enemies or traps without", "your visibility dropping.", 0);

            display("Laying Low", "If your bar goes orange, there's a", "large chance that you might bump", "into some stuff with your", "lowered visibility.", 1);

            display("Red Alert", "If your bar goes red, that means", "your speed is too high, and", "you'll get caught easily.", "Avoid the Red Zone.", 2);

            display("Getting Caught", "If you tend to go fast, sensors", "can pick up the noise you're making.", "", "Try to stay under cover.", 3);
        }

        fill(255, 255, 255);
        if (round((abs(movex) + abs(movey)) * 25) < 45 && round((abs(movex) + abs(movey)) * 25) > 30) {
            fill(34, 255, 0);
            if (first[0] !== 1 && timeout === 1 && calmdown > 200) {
                first[0] = 0;
                calmdown = 0;
            }
        }
        if (round((abs(movex) + abs(movey)) * 25) < 31) {
            sh1 -= sh1 / 50;
            if (first[1] !== 1 && timeout === 1 && calmdown > 200) {
                first[1] = 0;
                calmdown = 0;
            }
        } else {
            sh1 -= (abs(movex)) * 5;
        }
        if (round((abs(movex) + abs(movey)) * 25) > 90) {
            fill(173, 0, 0);
            if (first[2] !== 1 && timeout === 1 && calmdown > 200) {
                first[2] = 0;
                calmdown = 0;
            }
        }

    } // Speed
    if (theme === "imperial") {
        textFont_(createFont("franklin gothic condensed"));
    } else if (theme === "maxwell") {
        textFont_(createFont("raleway semibold"));
    }
    if (debugmode === true) {
        if (mouseX > 710) {
            fill(0, 0, 0);
            textSize(22);
            text(mouseX + ", " + mouseY, mouseX + -73, mouseY + 1.5);
            textSize(20);
            fill(255, 255, 255);
            text(mouseX + ", " + mouseY, mouseX + -70, mouseY + 1);
        } else {
            fill(0, 0, 0);
            textSize(22);
            text(mouseX + ", " + mouseY, mouseX + -3, mouseY + 1.5);
            textSize(20);
            fill(255, 255, 255);
            text(mouseX + ", " + mouseY, mouseX + 0, mouseY + 1);
        }
    } //Coords
    if (timeout === 0 && screentime === "game" && racemode === 0) {
        fill(0, 0, 0, 100);
        rect(0, 0, width, height);
        sizeofc = cos(frameCount + 180) * 36 + 152;
        stroke(255, 255, 255);
        strokeWeight(4);
        noFill();
        ellipse(118, height / 2, sizeofc, sizeofc);
        fill(255, 255, 255);
        textSize((-sizeofc / 20) + 21);
        textAlign(CENTER, CENTER);
        text("C L I C K", 116, 249);
        textAlign(LEFT, BASELINE);
    }
    if (cooljets !== 0) { fill(0, 0, 0, 255 - (cooljets * 12.75)); } else { noFill(); }
    noStroke();
    rect(0, 0, width, height);
    if (emode === 600 && screentime === "game") {
        if (round((abs(movex) + abs(movey)) * 25) < 31) {
            barcol[0] += 10;
            if (barcol[0] > 255) { barcol[0] = 255; }
            barcol[1] -= 10;
            if (barcol[1] < 132) { barcol[1] = 132; }
            barcol[2] -= 10;
            if (barcol[2] < 0) { barcol[2] = 0; }
            fill(255, 132, 0);
        }
        else if (round((abs(movex) + abs(movey)) * 25) < 45 && round((abs(movex) + abs(movey)) * 25) > 30) {
            barcol[0] -= 10;
            if (barcol[0] < 0) { barcol[0] = 0; }
            barcol[1] += 10;
            if (barcol[1] > 255) { barcol[1] = 255; }
            barcol[2] -= 10;
            if (barcol[2] < 9) { barcol[2] = 9; }
        }
        else if (round((abs(movex) + abs(movey)) * 25) > 90) {
            barcol[0] += 10;
            if (barcol[0] > 173) { barcol[0] = 173; }
            barcol[1] -= 10;
            if (barcol[1] < 0) { barcol[1] = 0; }
            barcol[2] -= 10;
            if (barcol[2] < 0) { barcol[2] = 0; }
        }
        else {
            barcol[0] += 10;
            if (barcol[0] > 255) { barcol[0] = 255; }
            barcol[1] += 10;
            if (barcol[1] > 255) { barcol[1] = 255; }
            barcol[2] += 10;
            if (barcol[2] > 255) { barcol[2] = 255; }
        }
        fill(barcol[0], barcol[1], barcol[2]);
        if (racemode === 0) {
            rect(19, 473, (abs(movex) + abs(movey)) * 25, 10);
        }
    }
    if (keyIsPressed && keyCode === 16) {
        console = 1;
    }
    if (console === 1) {
        textSize(20);
        textFont_(createFont("Consolas"));
        fill(0, 0, 0, 100);
        rect(0, 455 - (consolelog.length * 20), 427, 105 + (consolelog.length * 20));
        fill(0, 0, 0, 200);
        rect(0, 455, 427, 100);
        fill(255, 255, 255);
        for (var textlognum = textlog.length; textlognum > 0; textlognum--) {

            text(textdisplay[textlognum], -1 + (textlognum * 11), 484);
        }
        keyPressed = function () {
            textlog.push(keyCode);
            textdisplay.push(key);
        };
        keyReleased = function () {

            if (keyCode === 10) {
                if (textlog[1] === 69 && textlog[2] === 67 && textlog[3] === 72 && textlog[4] === 79) {
                    consolelog.push("");
                    consolelog.push(">> echo");
                    consolelog.push("Hello World!");
                } else if (textlog[1] === 72 && textlog[2] === 69 && textlog[3] === 76 && textlog[4] === 80 && textlog[5] === 32 && textlog[6] === 49) {
                    consolelog.push("");
                    consolelog.push(">> help 1");
                    consolelog.push("Help Menu 1/2");
                    consolelog.push("--------------");
                    consolelog.push("1) help <page>");
                    consolelog.push("2) echo");
                    consolelog.push("3) exit");
                    consolelog.push("4) clear");
                    consolelog.push("5) debug");
                    consolelog.push("6) basic");
                    consolelog.push("7) game");
                    consolelog.push("8) menu");
                } else if (textlog[1] === 72 && textlog[2] === 69 && textlog[3] === 76 && textlog[4] === 80 && textlog[5] === 32 && textlog[6] === 50) {
                    consolelog.push("");
                    consolelog.push(">> help 2");
                    consolelog.push("Help Menu 2/2");
                    consolelog.push("--------------");
                    consolelog.push("1) noclip");
                    consolelog.push("2) clipback");
                    consolelog.push("3) inv");
                    consolelog.push("4) mortal");
                    consolelog.push("5) restart");
                    consolelog.push("6) sonic");
                    consolelog.push("7) slow");
                } else if (textlog[1] === 72 && textlog[2] === 69 && textlog[3] === 76 && textlog[4] === 80) {
                    consolelog.push("");
                    consolelog.push("Use this command like: help <page>");
                } else if (textlog[1] === 69 && textlog[2] === 88 && textlog[3] === 73 && textlog[4] === 84) {
                    consolelog = [];
                    console = 0;
                } else if (textlog[1] === 67 && textlog[2] === 76 && textlog[3] === 69 && textlog[4] === 65 && textlog[5] === 82) {
                    consolelog = [];
                } else if (textlog[1] === 68 && textlog[2] === 69 && textlog[3] === 66 && textlog[4] === 85 && textlog[5] === 71) {
                    consolelog.push("");
                    debugmode = true;
                    consolelog.push(">> debug");
                    consolelog.push("Debug Mode Enabled.");
                } else if (textlog[1] === 66 && textlog[2] === 65 && textlog[3] === 83 && textlog[4] === 73 && textlog[5] === 67) {
                    consolelog.push("");
                    debugmode = false;
                    consolelog.push(">> basic");
                    consolelog.push("Debug Mode Disabled.");
                } else if (textlog[1] === 71 && textlog[2] === 65 && textlog[3] === 77 && textlog[4] === 69) {
                    consolelog.push("");
                    screentime = "game";
                    consolelog.push(">> game");
                    consolelog.push("Screentime set to GAME.");
                } else if (textlog[1] === 77 && textlog[2] === 69 && textlog[3] === 78 && textlog[4] === 85) {
                    consolelog.push("");
                    screentime = "menu";
                    consolelog.push(">> menu");
                    consolelog.push("Screentime set to MENU.");
                } else if (textlog[1] === 78 && textlog[2] === 79 && textlog[3] === 67 && textlog[4] === 76 && textlog[5] === 73 && textlog[6] === 80) {
                    consolelog.push("");
                    nc = 1;
                    consolelog.push(">> noclip");
                    consolelog.push("Noclip is now on.");
                } else if (textlog[1] === 67 && textlog[2] === 76 && textlog[3] === 73 && textlog[4] === 80 && textlog[5] === 66 && textlog[6] === 65 && textlog[7] === 67 && textlog[8] === 75) {
                    consolelog.push("");
                    nc = 0;
                    consolelog.push(">> clipback");
                    consolelog.push("Noclip is now off.");
                } else if (textlog[1] === 73 && textlog[2] === 78 && textlog[3] === 86) {
                    consolelog.push("");
                    inv = 1;
                    consolelog.push(">> inv");
                    consolelog.push("Invincibility is now on.");
                } else if (textlog[1] === 77 && textlog[2] === 79 && textlog[3] === 82 && textlog[4] === 84 && textlog[5] === 65 && textlog[6] === 76) {
                    consolelog.push("");
                    inv = 0;
                    consolelog.push(">> mortal");
                    consolelog.push("Invincibility is now off.");
                } else if (textlog[1] === 82 && textlog[2] === 69 && textlog[3] === 83 && textlog[4] === 84 && textlog[5] === 65 && textlog[6] === 82 && textlog[7] === 84) {
                    consolelog.push("");
                    consolelog.push(">> restart");
                    consolelog.push("Restarting...");
                    Program.restart();
                } else if (textlog[1] === 83 && textlog[2] === 79 && textlog[3] === 78 && textlog[4] === 73 && textlog[5] === 67) {
                    consolelog.push("");
                    pspeed = 1;
                    consolelog.push(">> sonic");
                    consolelog.push("Speed mode is now on.");
                } else if (textlog[1] === 83 && textlog[2] === 76 && textlog[3] === 79 && textlog[4] === 87) {
                    consolelog.push("");
                    pspeed = 0;
                    consolelog.push(">> slow");
                    consolelog.push("Speed mode is now off.");
                } else {
                    consolelog.push("");
                    consolelog.push("Invalid Command.");
                }
                textlog = [0];
                textdisplay = [0];
            }
        };
        for (var consolelognum = 0; consolelognum < consolelog.length; consolelognum++) {
            text(consolelog[consolelognum], 10, 462 + (consolelognum * 20) - (consolelog.length * 20));
        }
    }
    if (width !== 800 && height !== 500) {
        lequiciah += 0.1;
        onetime += 1;
        if (onetime < 2) {
            // println("https://www.khanacademy.org/computer-programming/blightfall-redesign-indev/5488405046755328?width=800&&height=500");
        }
        if (lequiciah > 255) {
            lequiciah = 0;
        }
        colorMode(HSB);
        fill(255, 0, 255);
        background(lequiciah, 255, 200);
        textAlign(LEFT, BASELINE);
        textSize(121);
        text("sorry...", 10, 82);
        textSize(44);
        text("BLIGHTFALL's native\nscreen resolution is\n800x500.", 16, 154);
        textSize(20);
        text("Use the URL below instead of the one you're\nusing for this to work.", 16, 290);
    } //Error
};
