/*
New in 1.3:
    *65 Splashes
    *Options Menu, with About and Player Settings
    *Now looks amazing
    *Added a 3D effect
    *Debug for future mod devs
    *Internal Improvements
    *Added crash menus
    
New in 1.36:
    *Whacked some bugs
    *Updated Options Menu look
*/

var Debug = false;
var PlayerName = "carterisonline";

//Useless Vars
{
    var debugfail = 0;
    var spring3da = 400;
    var spring3db = 400;
    var startup = 0;
    var anal = 0;
    var opbg = 0;
    var style = random(0, 10);
    var font = createFont("segoe ui semibold", 20);
    var Version = "a.1.2.5";
    var Mobile = false;
    var StarX = 0;
    var SingleplayerMenu = false;
    var Display = "None";
    var Games = 0;
    var Saved = 0;
    var CreatingWorld = false;
    var PlayingGame = false;
    var a = 0;
    var b = 0;
    var X = 300;
    var Y = 247;
    var Room = 1;
    var e = -1000;
    var OptionsMenu = false;
    var OPTS = "Options";
    var Openworld = false;
    var watchlook = 0;
    var Splash = random(0, 65);
    var badwidth = false;
    if (width !== 600) {
        badwidth = true;
    }
    var State = "Menu";
    var Debugx = 5;
    var Debugy = 0;
    var objectsize = 0;
    var usuklol = false;
    var Color = "";
}
//Easter Eggs
{
    if (PlayerName === "Badger") {
        println("Easter Egg Get! [BADGERZ]");
    }
    if (PlayerName === "Mr. Pig") {
        println("Easter Egg Get! [Oink...]");
    }
    if (PlayerName === "Tim Fennel") {
        println("Easter Egg Get! [Surprisingly Familiar...]");
    }
    if (PlayerName === "Sandwich Man") {
        println("Easter Egg Get! [Loving...?]");
    }
    if (PlayerName === "VeroSquid") {
        println("Easter Egg Get! [Copycat]");
    }
    if (PlayerName === "SurferDudeRules") {
        println("Easter Egg Get! [Beyond Copycat]");
    }
    if (PlayerName === "HarrisonDudeMC") {
        println("Easter Egg Get! [Does Whatever A Spiderpig Does...]");
    }
    if (PlayerName === "Hello World") {
        println("Easter Egg Get! [Trying to Code!]");
    }
    if (PlayerName === "Bill Nye") {
        println("Easter Egg Get! [SCIENCE!]");
    }
    if (PlayerName === "Bob") {
        println("Easter Egg Get! [Not Very Creative...]");
    }
    if (PlayerName === "GLaDOS") {
        println("Easter Egg Get! [Emotional]");
    }
    if (PlayerName === "John Cena") {
        println("Easter Egg Get! [AND HIS NAME IS... Umm...]");
    }
    if (PlayerName === "Jerry") {
        println("Easter Egg Get! [JEEEEEEERY]");
    }
    if (PlayerName === "Guess What") {
        println("Easter Egg Get! [What?]");
    }
    if (PlayerName === "Blightfall") {
        println("Easter Egg Get! [>:(]");
    }
    if (PlayerName === "asdf") {
        println("Easter Egg Get! [Tom Ska!]");
    }
    if (PlayerName === "Notch") {
        println("Easter Egg Get! [Merncraft]");
    }
    if (PlayerName === "capticalsucks") {
        usuklol = true;
    }
}
var linear = function (x, y, w, h, o, p) { for (var a = 0; a < w; a++) { stroke(lerpColor(o, p, a * (1 / w))); line(a + x, 0 + y, a + x, y + h); } }; var radial = function (x, y, w, o, p) { for (var b = 0; b < w; b++) { fill(lerpColor(o, p, b * (1 / w))); noStroke(); ellipse(x, y, w - b, w - b); } }; var annx = width * 1.2; var announcement = function (textt, y, tsize, color, speed) { var a = -textt.length * (tsize * 0.6); annx -= speed; textFont(createFont("monospace")); fill(color); textSize(tsize); text(textt, annx, y); if (speed < 0) { if (annx > width * 1.2) { annx = a; } } else { if (annx < a) { annx = width * 1.2; } } };
draw = function () {
    //Spring
    startup += 1;
    debugfail += 10;
    if (startup < 240) {
        background(255, 255, 255);
        if (width < 600 | width > 600) {
            if (startup > 200) {
                fill(221, 0, -startup + 55);
                rect(0, 300, width, 4);
                fill(-startup + 55, 0, 174);
                rect(0, 211, width, 2);
                fill(255, 0, -startup - 73);
                rect(324, 0, 10, height);
            }
            else {
                fill(random(213, 255), 0, random(0, 255));
                rect(0, random(0, height), random(width), random(5, 15));
                fill(random(213, 255), 0, random(0, 255));
                rect(205, random(0, height), random(width), random(5, 15));
                fill(random(213, 255), 0, random(0, 255));
                rect(0, random(startup - 10, startup + 10), 400, random(2, 5));
                fill(random(213, 255), 0, random(0, 255));
                rect(0, random(startup + 100, startup + 120), 400, random(2, 5));
                rect(random(debugfail - 10, debugfail + 10), 0, 10, height);
                if (debugfail > width) {
                    debugfail = 0;
                }
            }
        }
        noStroke();
        spring3da -= spring3da / 15;
        spring3db -= spring3db / 25;
        var spring3dcolor1 = color(213, 0, 255);
        var spring3dcolor2 = color(255, 0, 0);
        fill(spring3dcolor1);
        textSize(100);
        text("S", spring3da + 22 + 100, 225);
        fill(lerpColor(spring3dcolor1, spring3dcolor2, 0.20));
        text("P", spring3da + 80 + 100, 225);
        fill(lerpColor(spring3dcolor1, spring3dcolor2, 0.40));
        text("R", spring3da + 142 + 100, 225);
        fill(lerpColor(spring3dcolor1, spring3dcolor2, 0.60));
        text("I", spring3da + 207 + 100, 225);
        fill(lerpColor(spring3dcolor1, spring3dcolor2, 0.80));
        text("N", spring3da + 225 + 100, 225);
        fill(lerpColor(spring3dcolor1, spring3dcolor2, 1));
        text("G", spring3da + 297 + 100, 225);
        fill(255, 255, 255);
        rect(-spring3da + width, 70, 400, 400);
        fill(lerpColor(spring3dcolor1, spring3dcolor2, 0.50));
        textSize(20);
        text("Powered by", -spring3da + width - 252, 141);
    }
    else {
        //Menu
        {
            //Modifiers
            {
                noStroke();
                textAlign(CENTER, CENTER);
                textSize(80);
            }
            //Background
            {
                background(0, 0, 0);
                fill(random(100, 255), random(100, 255), 0);
                ellipse(StarX + 121, 57, 3, 3);
                fill(random(100, 255), random(100, 255), 0);
                ellipse(StarX + 265, 129, 3, 3);
                fill(random(100, 255), random(100, 255), 0);
                ellipse(StarX + 121, 212, 3, 3);
                fill(random(100, 255), random(100, 255), 0);
                ellipse(StarX + 328, 57, 3, 3);
                fill(random(100, 255), random(100, 255), 0);
                ellipse(StarX + 496, 242, 3, 3);
                fill(random(100, 255), random(100, 255), 0);
                ellipse(StarX + 55, 300, 3, 3);
                fill(random(100, 255), random(100, 255), 0);
                ellipse(StarX + 300, 359, 3, 3);
                fill(random(100, 255), random(100, 255), 0);
                ellipse(StarX + 378, 222, 3, 3);
                fill(random(100, 255), random(100, 255), 0);
                ellipse(StarX + 43, 130, 3, 3);
                fill(random(100, 255), random(100, 255), 0);
                ellipse(StarX + 513, 111, 3, 3);
                fill(random(100, 255), random(100, 255), 0);
                ellipse(StarX + 401, 321, 3, 3);
                fill(random(100, 255), random(100, 255), 0);
                ellipse(StarX + 235, 259, 3, 3);
                fill(random(100, 255), random(100, 255), 0);
                ellipse(StarX + 166, 375, 3, 3);
                fill(random(100, 255), random(100, 255), 0);
                ellipse(StarX + 555, 353, 3, 3);
                fill(255, 191, 0);
                ellipse(910, -145, 1000, 1100);
                fill(255, 191, 0, 100);
                ellipse(910, -145, 1025, 1100);
            }
            //Earth
            {
                fill(31, 0, 133);
                ellipse(300, 1203, 1800, 1800);
                fill(17, 128, 0, 100);
                ellipse(435, 401, 259, 100);
                ellipse(168, 373, 168, 100);
                fill(109, 0, 117, 75);
                ellipse(435, 401, 259, 100);
                ellipse(168, 373, 168, 100);
                fill(0, 76, 143, 100);
                noFill();
                stroke(0, 75, 166, 100);
                strokeWeight(10);
                ellipse(300, 1203, 1850, 1850);
                stroke(0, 119, 255, 50);
                ellipse(300, 1203, 1840, 1840);
                stroke(64, 153, 255, 50);
                ellipse(300, 1203, 1830, 1830);
                stroke(18, 133, 255, 50);
                ellipse(300, 1203, 1830, 1830);
                stroke(133, 192, 255, 50);
                ellipse(300, 1203, 1820, 1820);
                stroke(97, 176, 255, 50);
                ellipse(300, 1203, 1810, 1810);
                stroke(227, 242, 255, 50);
                ellipse(300, 1203, 1805, 1805);
                noStroke();
                strokeWeight(1);
            }
            //Ships
            {
                var block = function (x, y, w, h, r, cl, hg, g, b, o) {
                    var vx1m = x + (w / 2);
                    if (w < 0 | h < 0 | r < 0 | cl < 0 | o < 0) {
                        fill(hg, g, b);
                        ellipse(x, y, 100, 100);
                        fill(255, 255, 255);
                        ellipse(x, y, 85, 85);
                        stroke(hg, g, b);
                        strokeWeight(7);
                        line(x - 50, y - 50, x + 50, y + 50);
                        stroke(255, 255, 255);
                        line(x - 61, y - 50, x + 40, y + 50);
                        noStroke();
                    }
                    else {
                        fill(hg, g, b, o);
                        rect(-x, y, w, h);
                        if (-x < (-2 + (r * cl)) && o > 254) {
                            fill(hg + 10, g + 10, b + 10, o);
                        }
                        if (o < 254) {
                            fill(hg + 10, g + 10, b + 10, o);
                        }
                        quad(-x, y, -x - r + (-x / cl), y - r + (-y / cl) + (2.785714285714286 * r), -x - r + (-x / cl), y - r + (-y / cl) + h + (2.785714285714286 * r), -x, y + h);
                        fill(hg + 20, g + 20, b + 20, o);
                        if (y - r + (-y / cl) + (2.78571428574 * r) > y) {
                        }
                        else {
                            quad(-x, y, -x - r + (-x / cl), y - r + (-y / cl) + (2.785714285714286 * r), -x + w - r + (-x / cl), y - r + (-y / cl + (2.785714285714286 * r)), -x + w, y);
                        }
                        if (-x > (-2 + (r * cl)) && o > 254) {
                            fill(hg + 10, g + 10, b + 10, o);
                            quad(-x + w - r + (-x / cl), y - r + (-y / cl) + (2.785714285714286 * r), -x + w, y, -x + w, y + h, -x + w - r + (-x / cl), y - r + (-y / cl) + h + (2.785714285714286 * r));
                        }
                        if (y - r + (-y / cl) + h + (2.785714285714286 * r) < y + h) {
                        }
                        else {
                            fill(hg - 10, g - 10, b - 10);
                            quad(-x - r + (-x / cl), y - r + (-y / cl) + h + (2.785714285714286 * r), -x, y + h, -x + w, y + h, -x - r + (-x / cl) + w, y - r + (-y / cl) + h + (2.785714285714286 * r));
                        }
                        if (o < 254) {
                            fill(hg + 10, g + 10, b + 10, o);
                            quad(-x + w - r + (-x / cl), y - r + (2.785714285714286 * r), -x + w, y, -x + w, y + h, -x + w - r + (-x / cl), y + h - r + (2.785714285714286 * r));
                        }
                    }
                };
                e -= 2;
                block(e, random((-e / 10) + 171, (-e / 10) + 168), 94, 30, 14, 13, 100, 100, 100, 255);
                block(e, (-e / 10) + 171, 94, 30, 14, 13, 100, 100, 100, 255);
                block((-e + 200) / 1.2, (e / 10) + 73, 126, 53, 14, 13, 84, 46, 46, 255);
                fill(150, 46, 46);
                fill(89, 89, 89);
                triangle(-e + 1, random((-e / 10) + 201, (-e / 10) + 201), -e + 69, random((-e / 10) + 184, (-e / 10) + 184), -e + 13, random((-e / 10) + 187, (-e / 10) + 187));
                if (e < -800) {
                    e = 1000;
                }
            }
            //Play
            {
                if (mouseX > 217 && mouseX < 375 && mouseY > 215 && mouseY < 245 && SingleplayerMenu === false && OptionsMenu === false) {
                    textSize(30 + 1);
                    fill(150, 0, 158);
                    text("Singleplayer", 300, 227);
                }
                else {
                    textSize(30);
                    fill(97, 97, 97);
                }
                text("Singleplayer", 300, 227);
                fill(51, 51, 51);
                textSize(30);
                stroke(51, 51, 51);
                line(231, 285, 366, 285);
                line(266, 345, 332, 345);
                text("Multiplayer", 300, 283);
                text("Mods", 300, 343);
                noStroke();
            }
            //Title
            {
                textSize(80);
                fill(54, 54, 54);
                text("Blightfall", 302, 50);
                textSize(40);
                text("KA Edition", 301, 119);
                fill(97, 97, 97);
                textSize(80);
                text("Blightfall", 300, 48);
                textSize(40);
                text("KA Edition", 299, 117);
                if (e > 300) {
                    fill(150 + ((-e / 5) ^ 2), 0, 158 + ((-e / 5) ^ 2));
                }
                else {
                    fill(150 + ((e / 5) ^ 2), 0, 158 + ((e / 5) ^ 2));
                }
                if (e > 400 && e < 500) {
                    fill(random(0, 50), random(0, 50), random(0, 50));
                }
                else {
                    fill(random(200, 255), 0, random(200, 255));
                }
                ellipse(218, 25, 13, 13);
                //Splashes
                {
                    if (Debug === false) {
                        fill(150, 0, 158);
                        textAlign(CENTER, CENTER);
                        textSize(15);
                        if (Splash < 1) {
                            text("It's a game!", 300, 155);
                        }
                        if (Splash > 1 && Splash < 2) {
                            text("Four Upvotes and Counting!", 300, 155);
                        }
                        if (Splash > 2 && Splash < 3) {
                            text("Now what?", 300, 155);
                        }
                        if (Splash > 3 && Splash < 4) {
                            text("Ambitious!", 300, 155);
                        }
                        if (Splash > 4 && Splash < 5) {
                            text("Proof of Concept!", 300, 155);
                        }
                        if (Splash > 5 && Splash < 6) {
                            text("so bassicly im monky", 300, 155);
                        }
                        if (Splash > 6 && Splash < 7) {
                            text("AaAaaaAAaaAaaAAAAaAaAAAaAAAaaaAAAaAaaAAaAaaAaAaaaAAaaAaaAAAAaAaAAAaAAAaaaAAAaAaaAAaAaaAaAaaaAAaaAaaAAAAaAaAAAaAAAaaaAAAaAaaAAaAaaAaAaaaAAaaAaaAAAAaAaAAAaAAAaaaAAAaAaaAAaAaaAaAaaaAAaaAaaAAAAaAaAAAaAAAaaaAAAaAaaAAaAaa", 300, 155);
                        }
                        if (Splash > 7 && Splash < 8) {
                            text("Most Likely Ported!", 300, 155);
                        }
                        if (Splash > 8 && Splash < 9) {
                            text("Peekaboo!", 300, 155);
                        }
                        if (Splash > 9 && Splash < 10) {
                            text("Do you notice something?", 300, 155);
                        }
                        if (Splash > 10 && Splash < 11) {
                            text("OwO", 300, 155);
                        }
                        if (Splash > 11 && Splash < 12) {
                            text("Almost better than Animal Crossing!", 300, 155);
                        }
                        if (Splash > 12 && Splash < 13) {
                            text("Indie!", 300, 155);
                        }
                        if (Splash > 13 && Splash < 14) {
                            text("Try out the easter eggs!", 300, 155);
                        }
                        if (Splash > 14 && Splash < 15) {
                            text("Squids block the way!", 300, 155);
                        }
                        if (Splash > 15 && Splash < 16) {
                            text("What do?", 300, 155);
                        }
                        if (Splash > 16 && Splash < 17) {
                            text("Contemplating Reality (and spelling!)", 300, 155);
                        }
                        if (Splash > 17 && Splash < 18) {
                            text("Now considered ''Fun!''", 300, 155);
                        }
                        if (Splash > 18 && Splash < 19) {
                            text("Alpha since 2014!", 300, 155);
                        }
                        if (Splash > 19 && Splash < 20) {
                            text("(Insert Dead Meme)", 300, 155);
                        }
                        if (Splash > 20 && Splash < 21) {
                            text("Now with more lame!", 300, 155);
                        }
                        if (Splash > 21 && Splash < 22) {
                            text("OH YEAH!", 300, 155);
                        }
                        if (Splash > 22 && Splash < 23) {
                            text("Coded by a 10 year old!", 300, 155);
                        }
                        if (Splash > 23 && Splash < 24) {
                            text("It's Own Happy Little Accident!", 300, 155);
                        }
                        if (Splash > 24 && Splash < 25) {
                            text("kNoWZ gRAMuR!", 300, 155);
                        }
                        if (Splash > 25 && Splash < 26) {
                            text("Vaughn Approved!", 300, 155);
                        }
                        if (Splash > 26 && Splash < 27) {
                            text("Should be on Steam!", 300, 155);
                        }
                        if (Splash > 27 && Splash < 28) {
                            text("ICE TO SEE YOU BRUDDHA!", 300, 155);
                        }
                        if (Splash > 28 && Splash < 29) {
                            text("Your Source of Procrastination!", 300, 155);
                        }
                        if (Splash > 29 && Splash < 30) {
                            text("JERRY!", 300, 155);
                        }
                        if (Splash > 30 && Splash < 31) {
                            text("jerry.", 300, 155);
                        }
                        if (Splash > 31 && Splash < 32) {
                            text("Running out of Splash ideas since 2 minutes ago!", 300, 155);
                        }
                        if (Splash > 32 && Splash < 33) {
                            text("Achievement get!", 300, 155);
                        }
                        if (Splash > 33 && Splash < 34) {
                            text("VOTE UP OR DIE", 300, 155);
                        }
                        if (Splash > 34 && Splash < 35) {
                            text("Not yet hopeless!", 300, 155);
                        }
                        if (Splash > 35 && Splash < 36) {
                            text("Bargaining!", 300, 155);
                        }
                        if (Splash > 36 && Splash < 37) {
                            text("My body is ready.", 300, 155);
                        }
                        if (Splash > 37 && Splash < 38) {
                            text("Wii're Reggie", 300, 155);
                        }
                        if (Splash > 38 && Splash < 39) {
                            text("Not as cool as virtual reality!", 300, 155);
                        }
                        if (Splash > 39 && Splash < 40) {
                            text("Now on the Technic launcher!", 300, 155);
                        }
                        if (Splash > 40 && Splash < 41) {
                            text("''kewl.''", 300, 155);
                        }
                        if (Splash > 41 && Splash < 42) {
                            text("Why not?!", 300, 155);
                        }
                        if (Splash > 42 && Splash < 43) {
                            text("Inspired!", 300, 155);
                        }
                        if (Splash > 43 && Splash < 44) {
                            text("I Wish My Name was Humpfry!", 300, 155);
                        }
                        if (Splash > 44 && Splash < 45) {
                            text("Zero Deaths!", 300, 155);
                        }
                        if (Splash > 45 && Splash < 46) {
                            text("Ew, gross.", 300, 155);
                        }
                        if (Splash > 46 && Splash < 47) {
                            text("Powered by SPRING!", 300, 155);
                        }
                        if (Splash > 47 && Splash < 48) {
                            text("Just a theory!", 300, 155);
                        }
                        if (Splash > 48 && Splash < 49) {
                            text("Praying for profits!", 300, 155);
                        }
                        if (Splash > 49 && Splash < 50) {
                            text("Possibly a game!", 300, 155);
                        }
                        if (Splash > 50 && Splash < 51) {
                            text("Dank since never!", 300, 155);
                        }
                        if (Splash > 51 && Splash < 52) {
                            text("... or is it?", 300, 155);
                        }
                        if (Splash > 52 && Splash < 53) {
                            text("Not a FPS!", 300, 155);
                        }
                        if (Splash > 53 && Splash < 54) {
                            text("SHOT DA BAD GUYS!", 300, 155);
                        }
                        if (Splash > 54 && Splash < 55) {
                            text("KEEP SHOOTING DA BAD GUYS!", 300, 155);
                        }
                        if (Splash > 55 && Splash < 56) {
                            text("Penal Cancer!", 300, 155);
                            if (Splash > 56 && Splash < 57) {
                                text("Team larry!", 300, 155);
                            }
                            if (Splash > 58 && Splash < 59) {
                                text("An Irishman Walks out of a Bar.", 300, 155);
                            }
                            if (Splash > 59 && Splash < 60) {
                                text("Did you see that?", 300, 155);
                            }
                            if (Splash > 60 && Splash < 61) {
                                text("It IS a plane!", 300, 155);
                            }
                            if (Splash > 61 && Splash < 62) {
                                text("He flies through the rings!", 300, 155);
                            }
                            if (Splash > 62 && Splash < 63) {
                                text("liek kerment n subskrib", 300, 155);
                            }
                            if (Splash > 63 && Splash < 64) {
                                text("Where 3D (is now) a thing!", 300, 155);
                            }
                            if (Splash > 64 && Splash < 65) {
                                text("You're a wizard, Harry.", 300, 155);
                            }
                        }
                    }
                }
            }
            //Options
            {
                fill(255, 255, 255, 50);
                if (mouseX < 94 && mouseY > 348 && mouseY < 383) {
                    fill(255, 255, 255, 100);
                    objectsize = 2;
                    rect(0, 348, 92, 36);
                    fill(255, 255, 255, 100);
                    rect(92, 348, 3, 36);
                    if (mouseIsPressed && OptionsMenu === false && SingleplayerMenu === false) {
                        OptionsMenu = true;
                        playSound(getSound("rpg/hit-thud"));
                        State = "Options Menu";
                    }
                }
                else {
                    objectsize = 0;
                    rect(0, 348, 92, 36);
                    fill(255, 255, 255, 100);
                    rect(92, 348, 3, 36);
                }
                fill(26, 26, 26);
                if (mouseIsPressed && OptionsMenu === false && SingleplayerMenu === false) {
                    textSize(20 + objectsize);
                }
                else {
                    textSize(20);
                }
                text("Settings", 46, 365);
                if (OptionsMenu === true) {
                    if (OPTS === "Options") {
                        if (opbg > 50) {
                            anal = 1;
                        }
                        if (anal === 1) {
                            opbg -= 0.1;
                        }
                        if (opbg < 0) {
                            anal = 0;
                        }
                        if (anal === 0) {
                            opbg += 0.1;
                        }
                        background(49 + opbg, 60 + opbg, 66 + opbg);
                        fill(50 + opbg, 50 + opbg, 50 + opbg);
                        if (mouseX > 14 && mouseY > 124 && mouseX < 214 && mouseY < 194) {
                            fill(95, 140, 179);
                            if (mouseIsPressed && OPTS === "Options") {
                                playSound(getSound("rpg/hit-thud"));
                                OPTS = "About";
                                State = "Options Menu: About";
                            }
                        }
                        noStroke();
                        rect(14, 124, 200, 70, 57);
                        fill(50 + opbg, 50 + opbg, 50 + opbg);
                        if (mouseX > 406 && mouseX < 574 && mouseY > 326 && mouseY < 386) {
                            fill(95, 140, 179);
                            if (mouseIsPressed && OPTS === "Options") {
                                playSound(getSound("rpg/hit-thud"));
                                OptionsMenu = false;
                                State = "Menu";
                            }
                        }
                        rect(406, 326, 168, 60, 50);
                        fill(50 + opbg, 50 + opbg, 50 + opbg);
                        if (mouseX > 386 && mouseY > 124 && mouseX < 586 && mouseY < 194) {
                            fill(95, 140, 179);
                            if (mouseIsPressed && OPTS === "Options") {
                                playSound(getSound("rpg/hit-thud"));
                                OPTS = "Player";
                                State = "Options Menu: Player";
                            }
                        }
                        rect(386, 124, 200, 69, 50);
                        noStroke();
                        fill(255, 255, 255);
                        textSize(70);
                        text("Settings", 148, 48);
                        textSize(30);
                        text("About", 109, 159);
                        textSize(25);
                        text("Player Settings", 489, 159);
                        textSize(30);
                        text("Back", 489, 357);
                    }
                    if (OPTS === "About") {
                        background(51, 51, 51);
                        fill(255, 255, 255);
                        textSize(70);
                        text(OPTS, 300, 48);
                        textSize(40);
                        text("Player Name: " + PlayerName, 299, 119);
                        text("Version: " + Version, 299, 165);
                        textSize(35);
                        text("Operating System: Khan Academy", 300, 209);
                        if (Mobile === false) {
                            text("Device: Computer", 300, 251);
                        }
                        if (Mobile === true) {
                            text("Device: Mobile", 300, 251);
                        }
                        if (Debug === true) {
                            fill(255, 248, 117);
                            text("Debug Mode ON", 300, 293);
                        }
                        fill(40, 40, 40);
                        stroke(255, 255, 255);
                        if (mouseX > 10 && mouseX < 145 && mouseY > 321 && mouseY < 391) {
                            fill(158, 0, 158);
                            if (mouseIsPressed && OPTS === "About") {
                                playSound(getSound("rpg/hit-thud"));
                                OPTS = "Options";
                                State = "Options Menu";
                            }
                        }
                        rect(10, 321, 135, 70, 10);
                        fill(255, 255, 255);
                        textSize(30);
                        text("Back", 75, 358);
                    }
                    if (OPTS === "Player") {
                        background(51, 51, 51);
                        fill(255, 255, 255);
                        textSize(70);
                        text(OPTS + " Menu", 300, 48);
                        textSize(25);
                        fill(40, 40, 40);
                        //Color
                        {
                            stroke(255, 255, 255);
                            if (mouseX > 10 && mouseX < 145 && mouseY > 321 && mouseY < 391) {
                                fill(158, 0, 158);
                                if (mouseIsPressed && OPTS === "Player") {
                                    playSound(getSound("rpg/hit-thud"));
                                    OPTS = "Options";
                                    State = "Options Menu";
                                }
                            }
                            rect(10, 321, 135, 70, 10);
                            fill(255, 255, 255);
                            textSize(30);
                            text("Back", 75, 358);
                            text("Color", 99, 128);
                            stroke(0, 0, 0);
                            if (mouseX > 66 && mouseX < 86 && mouseY > 149 && mouseY < 169) {
                                stroke(122, 122, 122);
                                if (mouseIsPressed) {
                                    Color = "Red";
                                }
                            }
                            if (Color === "Red") {
                                stroke(255, 255, 255);
                            }
                            fill(255, 0, 0);
                            rect(66, 149, 20, 20);
                            stroke(0, 0, 0);
                            if (mouseX > 90 && mouseX < 110 && mouseY > 149 && mouseY < 169) {
                                stroke(122, 122, 122);
                                if (mouseIsPressed) {
                                    Color = "Orange";
                                }
                            }
                            if (Color === "Orange") {
                                stroke(255, 255, 255);
                            }
                            fill(255, 122, 0);
                            rect(90, 149, 20, 20);
                            stroke(0, 0, 0);
                            if (mouseX > 114 && mouseX < 134 && mouseY > 149 && mouseY < 169) {
                                stroke(122, 122, 122);
                                if (mouseIsPressed) {
                                    Color = "Yellow";
                                }
                            }
                            if (Color === "Yellow") {
                                stroke(255, 255, 255);
                            }
                            fill(255, 255, 0);
                            rect(114, 149, 20, 20);
                            stroke(0, 0, 0);
                            if (mouseX > 66 && mouseX < 86 && mouseY > 173 && mouseY < 193) {
                                stroke(122, 122, 122);
                                if (mouseIsPressed) {
                                    Color = "Lime";
                                }
                            }
                            if (Color === "Lime") {
                                stroke(255, 255, 255);
                            }
                            fill(122, 255, 0);
                            rect(66, 173, 20, 20);
                            stroke(0, 0, 0);
                            if (mouseX > 90 && mouseX < 110 && mouseY > 173 && mouseY < 193) {
                                stroke(122, 122, 122);
                                if (mouseIsPressed) {
                                    Color = "Green";
                                }
                            }
                            if (Color === "Green") {
                                stroke(255, 255, 255);
                            }
                            fill(0, 122, 0);
                            rect(90, 173, 20, 20);
                            stroke(0, 0, 0);
                            if (mouseX > 114 && mouseX < 134 && mouseY > 173 && mouseY < 193) {
                                stroke(122, 122, 122);
                                if (mouseIsPressed) {
                                    Color = "Aqua";
                                }
                            }
                            if (Color === "Aqua") {
                                stroke(255, 255, 255);
                            }
                            fill(0, 255, 255);
                            rect(114, 173, 20, 20);
                            stroke(0, 0, 0);
                            if (mouseX > 66 && mouseX < 86 && mouseY > 196 && mouseY < 216) {
                                stroke(122, 122, 122);
                                if (mouseIsPressed) {
                                    Color = "Blue";
                                }
                            }
                            if (Color === "Blue") {
                                stroke(255, 255, 255);
                            }
                            fill(0, 0, 255);
                            rect(66, 196, 20, 20);
                            stroke(0, 0, 0);
                            if (mouseX > 90 && mouseX < 110 && mouseY > 196 && mouseY < 216) {
                                stroke(122, 122, 122);
                                if (mouseIsPressed) {
                                    Color = "Purple";
                                }
                            }
                            if (Color === "Purple") {
                                stroke(255, 255, 255);
                            }
                            fill(122, 0, 255);
                            rect(90, 196, 20, 20);
                            stroke(0, 0, 0);
                            if (mouseX > 114 && mouseX < 134 && mouseY > 196 && mouseY < 216) {
                                stroke(122, 122, 122);
                                if (mouseIsPressed) {
                                    Color = "Magenta";
                                }
                            }
                            if (Color === "Magenta") {
                                stroke(255, 255, 255);
                            }
                            fill(255, 0, 255);
                            rect(114, 196, 20, 20);
                        }
                        textSize(20);
                        fill(255, 255, 255);
                        text("Controls\nArrows: Move\n1-9: Inventory Slots\nShift: Sprint\n Ctrl: Open Inventory\nLeft Mouse: Select/Attack\nRight Mouse: Use", 477, 202);
                        textSize(30);
                        text("Achievements", 266, 128);
                    }
                }
            }
            //Triggers
            {
                //Singleplayer Text Trigger
                if (mouseX > 217 && mouseX < 375 && mouseY > 215 && mouseY < 245 && SingleplayerMenu === false && OptionsMenu === false) {
                    textSize(30);
                    if (mouseIsPressed) {
                        SingleplayerMenu = true;
                        playSound(getSound("retro/hit1"));
                        State = "Singleplayer Menu";
                    }
                }
                //Singleplayer Menu
                if (SingleplayerMenu === true) {
                    background(56, 56, 56);
                    stroke(255, 255, 255);
                    line(400, 0, 400, 400);
                    fill(255, 255, 255);
                    if (Display === "None") {
                        textSize(20);
                        text("Worlds: " + Games, 456, 26);
                        if (Saved === 0) {
                            text("Saved Games: 0", 489, 61);
                            text("Unsaved Games: " + Games, 500, 95);
                        }
                        if (Saved === 1) {
                            text("Saved Games: " + Games, 489, 61);
                            text("Unsaved Games: 0", 500, 95);
                        }
                        text("Click ''Create New\nWorld'' to get started.", 500, 366);
                        if (mouseX > 10 && mouseX < 150 && mouseY > 327 && mouseY < 387) {
                            fill(156, 0, 153);
                            if (mouseIsPressed && Games === 0) {
                                CreatingWorld = true;
                                playSound(getSound("rpg/hit-thud"));
                            }
                        }
                        else {
                            noFill();
                        }
                        if (Games === 0) {
                            stroke(255, 255, 255);
                            rect(11, 328, 140, 60);
                            fill(255, 255, 255);
                            textSize(15);
                            text("Create New World", 81, 359);
                        }
                        if (CreatingWorld === true) {
                            Games = 1;
                            /*
                            background(56, 56, 56);
                            fill(255, 255, 255);
                            textSize(100);
                            text("''World''",300,51);
                            textSize(20);
                            fill(112, 112, 112);
                            stroke(122, 122, 122);
                            line(257,114,345,114);
                            text("Edit Name",300,113);
                            noFill();
                            stroke(255, 255, 255);
                            */

                        }
                    }
                    if (Games === 1) {
                        CreatingWorld = false;
                        textSize(20);
                        fill(255, 255, 255);
                        textAlign(LEFT, BASELINE);
                        text("''World'': Created " + month() + "/" + day() + "/" + year(), 6, 22);
                        if (mouseX > 15 && mouseX < 65 && mouseY > 30 && mouseY < 48) {
                            fill(158, 0, 166);
                            if (mouseIsPressed && PlayingGame === false) {
                                playSound(getSound("rpg/hit-thud"));
                                PlayingGame = true;
                            }
                        }
                        text("PLAY", 15, 48);
                        fill(255, 255, 255);
                        if (mouseX > 173 && mouseX < 250 && mouseY > 30 && mouseY < 48) {
                            fill(158, 0, 166);
                            if (mouseIsPressed && Games === 1) {
                                playSound(getSound("rpg/hit-thud"));
                                Games = 0;
                            }
                        }
                        text("DELETE", 173, 48);
                    }
                    noFill();
                    if (mouseX > 244 && mouseX < 384 && mouseY > 328 && mouseY < 388) {
                        fill(156, 0, 153);
                        if (mouseIsPressed && SingleplayerMenu === true) {
                            SingleplayerMenu = false;
                            playSound(getSound("rpg/hit-thud"));
                            State = "Menu";
                        }
                    }
                    textAlign(CENTER, CENTER);
                    stroke(255, 255, 255);
                    rect(244, 328, 140, 60);
                    fill(255, 255, 255);
                    textSize(30);
                    text("Back", 317, 358);
                }
            }
            //Debug
            {
                if (Debug === true) {
                    fill(77, 77, 77, 200);
                    if (mouseIsPressed && mouseX > Debugx && mouseX < Debugx + 191 && mouseY < Debugy + 15 && mouseY > Debugy) {
                        Debugx = mouseX - 80;
                        Debugy = mouseY - 7;
                    }
                    noStroke();
                    rect(Debugx, Debugy, 196, 65);
                    fill(255, 255, 255, 100);
                    rect(Debugx, Debugy, 196, 15);
                    textAlign(LEFT, TOP);
                    textSize(15);
                    fill(255, 248, 117);
                    text("Mouse: " + mouseX, Debugx + 11, Debugy + 16);
                    text(";" + mouseY, Debugx + 87, Debugy + 16);
                    text("State: " + State, Debugx + 11, Debugy + 36);
                    textAlign(CENTER, CENTER);
                }
            }
            //Errors
            {
                if (badwidth === true) {

                    textAlign(LEFT, UP);
                    background(34, 105, 168);
                    textSize(50);
                    fill(255, 255, 255);
                    text("Oops...", 13, 66);
                    textSize(30);
                    text("Looks like that didn't work.", 17, 108);
                    fill(255, 255, 255);
                    textSize(15);
                    text("Error: 101: Unsupported Width", 18, 146);
                    text("Error occurance without restart: 0", 18, 166);
                    text("Possible Solution: Try resizing the screen width to 600.\nYou can type this HTML code: (?width=600) at the end\nof the URL.)", 19, 201);
                    if (style < 1) {
                        text("Thanks for playing Blightfall!", 27, 373);
                    }
                    if (style < 2 && style > 1) {
                        text("I mean, you tried.", 27, 373);
                    }
                    if (style < 3 && style > 2) {
                        text("Only in New York, that is.", 27, 373);
                    }
                    if (style < 4 && style > 3) {
                        text("...and all of the badgers thankfully died.", 27, 373);
                    }
                    if (style < 5 && style > 4) {
                        text("dagnabbit!", 27, 373);
                    }
                    if (style < 6 && style > 5) {
                        text("#%!#@%! @!#@$! $@#!%%# $#!@#$", 27, 373);
                    }
                    if (style < 7 && style > 6) {
                        text("what, have YOU ever crashed before?", 27, 373);
                    }
                    if (style < 8 && style > 7) {
                        text("now fix it real quick, would ya?", 27, 373);
                    }
                    if (style < 9 && style > 8) {
                        text("((insert passive agressive sentence))", 27, 373);
                    }
                    if (style < 10 && style > 9) {
                        text("Thanks for playing Blightfall!", 27, 373);
                    }
                    if (style > 10) {
                        text("Thanks for playing Blightfall!", 27, 373);
                    }
                    textAlign(CENTER, CENTER);
                }
                if (usuklol === true) {
                    textAlign(LEFT, UP);
                    background(0, 74, 158);
                    textSize(50);
                    fill(255, 255, 255);
                    text("Oops...", 22, 66);
                    textSize(30);
                    text("Looks like that didn't work.", 27, 108);
                    fill(255, 255, 255);
                    textSize(15);
                    text("Error: 666: You suck", 27, 146);
                    text("Error occurance without restart: 0", 27, 166);
                    text("Possible Solution: Go get a life", 27, 201);
                    text("Thanks for playing Blightfall!", 27, 373);
                    textAlign(CENTER, CENTER);
                }
            }
        }
        //Game
        {
            if (PlayingGame === true) {
                //Loading Screen
                {
                    State = "Loading Screen";
                    a += 10;
                    b += 1;
                    background(31, 31, 31);
                    noStroke();
                    textSize(80);
                    fill(54, 54, 54);
                    text("Blightfall", 302, 50);
                    textSize(40);
                    text("KA Edition", 301, 119);
                    fill(97, 97, 97);
                    textSize(80);
                    text("Blightfall", 300, 48);
                    textSize(40);
                    text("KA Edition", 299, 117);
                    fill(109, 0, 117);
                    rect(227, 20, 8, 8);
                    fill(150, 0, 158);
                    rect(225, 18, 8, 8);
                    fill(255, 255, 255);
                    if (b < 700) {
                        text("Loading World", 298, 211);
                    }
                    stroke(255, 255, 255);
                    line(a, 244, a + 200, 244);
                    if (a > 700) {
                        a = -200;
                    }
                    if (b > 300 && b < 700) {
                        text("Building Terrain", 298, 277);
                    }
                    if (b > 700) {
                        text("Finalizing...", 298, 211);
                    }
                    if (b > 1000) {
                        background(0, 0, 0);
                        fill(255, 255, 255, b - 1100);
                        text("Welcome To The Jaded.\n It is " + hour() + ":" + minute(), 300, 200);
                    }
                    //Debug
                    {
                        if (Debug === true) {
                            fill(77, 77, 77, 200);
                            if (mouseIsPressed && mouseX > Debugx && mouseX < Debugx + 191 && mouseY < Debugy + 15 && mouseY > Debugy) {
                                Debugx = mouseX - 80;
                                Debugy = mouseY - 7;
                            }
                            noStroke();
                            rect(Debugx, Debugy, 196, 65);
                            fill(255, 255, 255, 100);
                            rect(Debugx, Debugy, 196, 15);
                            textAlign(LEFT, TOP);
                            textSize(15);
                            fill(255, 248, 117);
                            text("Mouse: " + mouseX, Debugx + 11, Debugy + 16);
                            text(";" + mouseY, Debugx + 87, Debugy + 16);
                            text("State: " + State, Debugx + 11, Debugy + 36);
                            textAlign(CENTER, CENTER);
                            if (State === "Menu") {
                                text(e, e + 50, 175);
                            }
                        }
                    }
                }
                //Jaded
                {
                    if (b > 1600) {
                        State = "Jaded Menu";
                        if (Room === 1) {
                            //Background
                            {
                                background(82, 82, 82);
                                noStroke();
                                fill(92, 92, 92);
                                quad(0, 400, 100, 300, 890, 300, 1017, 400);
                                fill(77, 77, 77);
                                quad(0, 400, 100, 300, 100, -1000, 0, -1000);
                                fill(0, 0, 0);
                                rect(146, 100, 100, 100);
                                rect(403, 100, 100, 100);
                                fill(64, 63, 64);
                                rect(192, 100, 10, 100);
                                rect(146, 143, 100, 10);
                                rect(448, 100, 10, 100);
                                rect(403, 143, 100, 10);
                                fill(random(100, 255), random(100, 255), 0);
                                rect(160, 113, 2, 2);
                                rect(232, 131, 2, 2);
                                rect(178, 171, 2, 2);
                                rect(432, 135, 2, 2);
                                rect(489, 113, 2, 2);
                                rect(465, 181, 2, 2);
                                rect(410, 185, 2, 2);
                                fill(255, 255, 255);
                            }
                            //You
                            {
                                fill(112, 38, 38);
                                rect(X - 25, Y, 50, 100);
                                fill(115, 73, 73);
                                ellipse(X, Y - 25, 70, 70);
                                fill(255, 255, 255);
                                textSize(20);
                                text(PlayerName, X, Y - 78);
                                if (keyIsPressed && keyCode === LEFT) {
                                    X -= 3;
                                    if (mouseX < X) {
                                        X -= 1;
                                    }
                                }
                                else if (keyIsPressed && keyCode === RIGHT) {
                                    X += 3;
                                    if (mouseX > X) {
                                        X += 1;
                                    }
                                }
                                else {
                                }
                                if (keyIsPressed && keyCode === DOWN) {
                                    Y += 2;
                                    if (mouseY > Y) {
                                        Y += 1;
                                    }
                                }
                                else if (keyIsPressed && keyCode === UP) {
                                    noStroke();
                                    Y -= 2;
                                    if (mouseY < Y) {
                                        Y -= 1;
                                    }
                                }
                                if (X < 90) {
                                    X = 90;
                                }
                                if (Y < 220) {
                                    Y = 220;
                                }
                                if (Y > 300) {
                                    Y = 300;
                                }
                                if (X > 600) {
                                    Room = 2;
                                    X = 10;
                                }
                            }
                            //Debug
                            {
                                if (Debug === true) {
                                    fill(77, 77, 77, 200);
                                    if (mouseIsPressed && mouseX > Debugx && mouseX < Debugx + 191 && mouseY < Debugy + 15 && mouseY > Debugy) {
                                        Debugx = mouseX - 80;
                                        Debugy = mouseY - 7;
                                    }
                                    noStroke();
                                    rect(Debugx, Debugy, 196, 80);
                                    fill(255, 255, 255, 100);
                                    rect(Debugx, Debugy, 196, 15);
                                    textAlign(LEFT, TOP);
                                    textSize(15);
                                    fill(255, 248, 117);
                                    text("Mouse: " + mouseX, Debugx + 11, Debugy + 16);
                                    text(";" + mouseY, Debugx + 87, Debugy + 16);
                                    text("State: " + State, Debugx + 11, Debugy + 36);
                                    text("X: " + X + "   ; Y: " + Y, Debugx + 11, Debugy + 56);
                                    textAlign(CENTER, CENTER);
                                    if (State === "Menu") {
                                        text(e, e + 50, 175);

                                    }
                                }
                            }
                        }
                        if (Room === 2) {
                            //Background
                            {
                                background(82, 82, 82);
                                noStroke();
                                fill(92, 92, 92);
                                quad(-70, 400, -11, 300, 890, 300, 1017, 400);
                                fill(77, 77, 77);
                                fill(0, 0, 0);
                                rect(69, 100, 100, 100);
                                rect(306, 100, 100, 100);
                                rect(525, 100, 100, 100);
                                fill(64, 63, 64);
                                rect(113, 100, 10, 100);
                                rect(69, 143, 100, 10);
                                rect(350, 100, 10, 100);
                                rect(525, 143, 100, 10);
                                rect(571, 100, 10, 100);
                                rect(306, 143, 100, 10);
                                fill(random(100, 255), random(100, 255), 0);
                                rect(98, 113, 2, 2);
                                rect(129, 184, 2, 2);
                                rect(320, 135, 2, 2);
                                rect(386, 158, 2, 2);
                                rect(334, 181, 2, 2);
                                rect(400, 103, 2, 2);
                                rect(592, 169, 2, 2);
                                rect(552, 108, 2, 2);
                                rect(531, 192, 2, 2);
                                fill(255, 255, 255);
                            }
                            //You
                            {
                                fill(112, 38, 38);
                                rect(X - 25, Y, 50, 100);
                                fill(115, 73, 73);
                                ellipse(X, Y - 25, 70, 70);
                                fill(255, 255, 255);
                                textSize(20);
                                text(PlayerName, X, Y - 78);
                                if (keyIsPressed && keyCode === LEFT) {
                                    X -= 3;

                                    if (mouseX < X) {
                                        X -= 1;
                                    }
                                }
                                else if (keyIsPressed && keyCode === RIGHT) {
                                    X += 3;
                                    if (mouseX > X) {
                                        X += 1;
                                    }
                                }
                                else {
                                }
                                if (keyIsPressed && keyCode === DOWN) {
                                    Y += 2;
                                    if (mouseY > Y) {
                                        Y += 1;
                                    }
                                }
                                else if (keyIsPressed && keyCode === UP) {
                                    noStroke();
                                    Y -= 2;
                                    if (mouseY < Y) {
                                        Y -= 1;
                                    }
                                }
                                if (Y < 220) {
                                    Y = 220;
                                }
                                if (Y > 300) {
                                    Y = 300;
                                }
                                if (X < 0) {
                                    X = 590;
                                    Room = 1;
                                }
                                if (X > 600) {
                                    Room = 3;
                                    X = 10;
                                }
                            }
                            //Debug
                            {
                                if (Debug === true) {
                                    fill(77, 77, 77, 200);
                                    if (mouseIsPressed && mouseX > Debugx && mouseX < Debugx + 191 && mouseY < Debugy + 15 && mouseY > Debugy) {
                                        Debugx = mouseX - 80;
                                        Debugy = mouseY - 7;
                                    }
                                    noStroke();
                                    rect(Debugx, Debugy, 196, 80);
                                    fill(255, 255, 255, 100);
                                    rect(Debugx, Debugy, 196, 15);
                                    textAlign(LEFT, TOP);
                                    textSize(15);
                                    fill(255, 248, 117);
                                    text("Mouse: " + mouseX, Debugx + 11, Debugy + 16);
                                    text(";" + mouseY, Debugx + 87, Debugy + 16);
                                    text("State: " + State, Debugx + 11, Debugy + 36);
                                    text("X: " + X + "   ; Y: " + Y, Debugx + 11, Debugy + 56);
                                    textAlign(CENTER, CENTER);
                                    if (State === "Menu") {
                                        text(e, e + 50, 175);

                                    }
                                }
                            }
                        }
                        if (Room === 3) {
                            //Background
                            {
                                background(82, 82, 82);
                                noStroke();
                                fill(92, 92, 92);
                                quad(-70, 400, -11, 300, 890, 300, 1017, 400);
                                fill(77, 77, 77);
                                fill(0, 0, 0);
                                rect(69, 100, 100, 100);
                                rect(306, 100, 100, 100);
                                fill(64, 63, 64);
                                rect(113, 100, 10, 100);
                                rect(69, 143, 100, 10);
                                rect(350, 100, 10, 100);
                                rect(306, 143, 100, 10);
                                fill(random(100, 255), random(100, 255), 0);
                                rect(138, 113, 2, 2);
                                rect(314, 181, 2, 2);
                                rect(400, 133, 2, 2);
                                fill(255, 255, 255);
                            }
                            //You
                            {
                                fill(112, 38, 38);
                                rect(X - 25, Y, 50, 100);
                                fill(115, 73, 73);
                                ellipse(X, Y - 25, 70, 70);
                                fill(255, 255, 255);
                                textSize(20);
                                text(PlayerName, X, Y - 78);
                                if (keyIsPressed && keyCode === LEFT) {
                                    X -= 3;
                                    noFill();
                                    if (mouseX < X) {
                                        X -= 1;
                                    }
                                }
                                else if (keyIsPressed && keyCode === RIGHT) {
                                    X += 3;
                                    noFill();
                                    stroke(0, 0, 0);
                                    if (mouseX > X) {
                                        X += 1;
                                    }
                                }
                                else {
                                }
                                if (keyIsPressed && keyCode === DOWN) {
                                    Y += 2;
                                    if (mouseY > Y) {
                                        Y += 1;
                                    }
                                }
                                else if (keyIsPressed && keyCode === UP) {
                                    noStroke();
                                    Y -= 2;

                                    if (mouseY < Y) {
                                        Y -= 1;
                                    }
                                }
                                if (Y < 220) {
                                    Y = 220;
                                }
                                if (Y > 300) {
                                    Y = 300;
                                }
                                if (X < 0) {
                                    X = 590;
                                    Room = 2;
                                }
                                if (X > 600) {
                                    Room = 3;
                                }
                            }
                            //Foreground
                            {
                                noStroke();
                                fill(100, 100, 255, 100);
                                rect(461, 131, 100, 255);
                                fill(100, 100, 255, 70);
                                quad(461, 131, 452, 141, 452, 300, 461, 386);
                                if (Y < 286 && X > 485 && X < 525) {
                                    fill(54, 54, 54);
                                    if (mouseX > 465 && mouseX < 548 && mouseY > 80 && mouseY < 118) {
                                        fill(141, 0, 163, 200);
                                        mouseClicked = function () {
                                            Openworld = "Travel";
                                        };
                                    }
                                    rect(465, 80, 83, 38, 5);
                                    fill(255, 255, 255);
                                    textSize(20);
                                    text("Travel...", 507, 101);
                                }
                                else {
                                    Openworld = false;
                                }

                                if (Openworld === false) {
                                    fill(82, 82, 82);
                                    rect(453, 28, 100, 100);
                                }
                                if (Openworld === "Travel") {
                                    watchlook += 1;
                                    fill(0, 0, 0);
                                    ellipse(300, 200, 100, 100);
                                    noFill();
                                    stroke(255, 255, 255);
                                    if (watchlook === 1) {
                                        fill(0, 0, 0);
                                    }
                                    ellipse(300, 200, 200, 200);
                                    noFill();
                                    if (watchlook === 2) {
                                        fill(0, 0, 0);
                                    }
                                    ellipse(300, 200, 300, 300);
                                    noFill();
                                    if (watchlook === 3) {
                                        fill(0, 0, 0);
                                    }
                                    ellipse(300, 200, 400, 400);
                                    noFill();
                                    if (watchlook === 4) {
                                        fill(0, 0, 0);
                                    }
                                    ellipse(300, 200, 500, 500);
                                    noFill();
                                    if (watchlook === 5) {
                                        fill(0, 0, 0);
                                    }
                                    ellipse(300, 200, 600, 600);
                                    if (watchlook === 6) {
                                        background(0, 0, 0);
                                    }
                                }
                            }
                            //Debug
                            {
                                if (Debug === true) {
                                    fill(77, 77, 77, 200);
                                    if (mouseIsPressed && mouseX > Debugx && mouseX < Debugx + 191 && mouseY < Debugy + 15 && mouseY > Debugy) {
                                        Debugx = mouseX - 80;
                                        Debugy = mouseY - 7;
                                    }
                                    noStroke();
                                    rect(Debugx, Debugy, 196, 80);
                                    fill(255, 255, 255, 100);
                                    rect(Debugx, Debugy, 196, 15);
                                    textAlign(LEFT, TOP);
                                    textSize(15);
                                    fill(255, 248, 117);
                                    text("Mouse: " + mouseX, Debugx + 11, Debugy + 16);
                                    text(";" + mouseY, Debugx + 87, Debugy + 16);
                                    text("State: " + State, Debugx + 11, Debugy + 36);
                                    text("X: " + X + "   ; Y: " + Y, Debugx + 11, Debugy + 56);
                                    textAlign(CENTER, CENTER);
                                    if (State === "Menu") {
                                        text(e, e + 50, 175);

                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
