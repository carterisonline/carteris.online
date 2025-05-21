//tree vars

var treearray = [0, 0, 0, 0, 0, 0, 0, 0];
var treey = [450, 450, 450, 450, 450, 450, 450, 450];
var treespeed = [random(4, 7), random(4, 7), random(4, 7), random(4, 7), random(4, 7), random(4, 7), random(4, 7), random(4, 7)];
var treex = [random(50, 350), random(50, 350), random(50, 350), random(50, 350), random(50, 350), random(50, 350), random(50, 350), random(50, 350)];
var treecheck = 0;
var overtcheck = 0;

//player vars
var playerx = 200;
var fail = 0;
var wait = 0;
var sec = 0;
var m = 0;
var dis = 0;

draw = function () {
    dis += 1;
    if (dis < 2000) {
        m += 1.5;
    }
    if (m > 6000) {
        sec += 1;
        m = 0;
    }
    background(232, 244, 255);
    overtcheck += 1;
    frameRate(60);
    fill(0, 0, 0);
    textSize(30);
    if (m > 1000) {
        text(sec + ":" + round(m / 100), 10, 31);
    }
    else {
        text(sec + ":0" + round(m / 100), 10, 31);
    }
    //tree
    {
        if (overtcheck > 7) {
            overtcheck = 0;
        }
        var spawncheck = random(0, 20);
        var spawncheck2 = random(0, 20);
        var spawncheck3 = random(0, 20);
        var spawncheck4 = random(0, 20);
        var tree = function (x) {
            stroke(140, 108, 108);
            strokeWeight(2);
            fill(77, 25, 25);
            treecheck += 1;
            if (treecheck > 7) {
                treecheck = 0;
            }
            if (treearray[x] === 1) {
                treey[x] -= treespeed[x];
                strokeWeight(3);
                line(treex[x], treey[x], treex[x], treey[x] + 27);
                strokeWeight(2);
                line(treex[x] + -9, treey[x] + -13, treex[x] + 0, treey[x] + 10);
                line(treex[x] + 18, treey[x] + -13, treex[x] + 0, treey[x] + 10);
                line(treex[x] + 6, treey[x] + -20, treex[x] + 0, treey[x] + 10);
                line(treex[x] + -22, treey[x] + -11, treex[x] + -6, treey[x] + -5);
                line(treex[x] + 22, treey[x] + -8, treex[x] + 12, treey[x] + -4);
                line(treex[x] + 0, treey[x] + -19, treex[x] + -7, treey[x] + -8);
            }
        };
        if (spawncheck > 19.8) {
            treearray[0] = 1;
        }
        if (spawncheck < 0.2) {
            treearray[1] = 1;
        }
        if (treearray[0] === 1) {
            tree(0);
        }
        if (treearray[1] === 1) {
            tree(1);
        }
        if (spawncheck2 > 19.8) {
            treearray[2] = 1;
        }
        if (spawncheck2 < 0.2) {
            treearray[3] = 1;
        }
        if (spawncheck3 > 19.8) {
            treearray[4] = 1;
        }
        if (spawncheck3 < 0.2) {
            treearray[5] = 1;
        }
        if (spawncheck4 > 19.8) {
            treearray[6] = 1;
        }
        if (spawncheck4 < 0.2) {
            treearray[7] = 1;
        }
        if (treearray[2] === 1) {
            tree(2);
        }
        if (treearray[3] === 1) {
            tree(3);
        }
        if (treearray[4] === 1) {
            tree(4);
        }
        if (treearray[5] === 1) {
            tree(5);
        } if (treearray[6] === 1) {
            tree(6);
        } if (treearray[7] === 1) {
            tree(7);
        }
        if (treey[overtcheck] < -50) {
            treearray[overtcheck] = 0;
            treey[overtcheck] = 450;
            treex[overtcheck] = random(50, 350);
        }
    }
    //player
    {
        if (mouseX < playerx) {
            playerx -= 2;
        }
        if (mouseX > playerx) {
            playerx += 2;
        }
        if (playerx > treex[overtcheck] - 20 && playerx < treex[overtcheck] + 20 && treey[overtcheck] < 45) {
            fail = 1;
        }
        if (fail === 1) {
            wait += 1;
            frameRate(120 - wait * 6);
            if (wait > 20) {
                frameRate(1);
            }
            if (wait > 21) {
                frameRate(60);
                if (dis < 2000) {
                    m += 300;
                }
                wait = 0;
                fail = 0;
            }
        }
        ellipse(playerx, 45, 20, 20);
        if (dis > 2000) {
            background(0, 0, 0);
            fill(255, 255, 255);
            if (round(m / 100) < 30) {
                text("You Cheated!", 102, 112);
                textSize(25);
                text("Go Away!", 146, 150);
            }
            else {
                text("Level One Complete!", 63, 112);
                textSize(25);
                if (m > 1000) {
                    text("Time: " + sec + ":" + round(m / 100), 141, 150);
                }
                else {
                    text("Time: " + sec + ":0" + round(m / 100), 141, 150);
                }
            }
        }
    }
};
