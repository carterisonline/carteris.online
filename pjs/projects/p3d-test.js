var gstage = createGraphics(800, 500, WEBGL);
gstage.lights();
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
draw = function () {
    iostage++;
    abcstage++;
    pstage -= 5;
    if (panicmode === 1) {
        if (turnaround[0] === 0) {
            xtrax += xspeed;
        } else {
            xtrax -= xspeed;
        }
        if (xtrax > 20) {
            turnaround[0] = 1;
        }
        if (xtrax < -20) {
            turnaround[0] = 0;
        }
        if (turnaround[1] === 0) {
            xtray += xspeed;
        } else {
            xtray -= xspeed;
        }
        if (xtray > 20) {
            turnaround[1] = 1;
        }
        if (xtray < -20) {
            turnaround[1] = 0;
        }
    }
    frameRate(60);
    var cube = function (x, y, w, h, d) {
        gstage.pushMatrix();
        gstage.translate(x, y);
        gstage.box(w, h, d);
        gstage.popMatrix();
    };
    gstage.fill(69, 45, 45);
    cube(77, 284, 82, 374, 101);
    cube(731, 284, 82, 374, 101);
    gstage.fill(71, 50, 54);
    cube(400, 484, 590, 100, 100);
    cube(400, 63, 759, 75, 293);
    gstage.noStroke();
    image(gstage, 0, 0);
    fill(0, 0, 0);
    noStroke();
    rect(147, 114, 512, 302);
    check++;
    if (check > 40) {
        check = 0;
    }
    stroke(255, 255, 255);
    for (var bees = 0; bees < stars; bees++) {
        estage.push(random(147, 659));
        istage.push(random(114, 416));
        point(estage[bees] + xtrax, istage[bees] + pstage + xtray - 30);
    }
    if (istage[check] + pstage < 211.5) {
        estage[check] = random(147, 659);
        istage[check] = 416 - pstage;
    }
    if (panicmode === 1) {
        if (rflash[0] > 10) {
            rflash[1] = 1;
        }
        if (rflash[0] < 0) {
            rflash[1] = 0;
        }
        if (rflash[1] === 0) {
            fill(255, 0, 0, 50);
            rect(0, 0, 800, 500);
            rflash[0]++;
        } else {
            rflash[0]--;
        }
    }
    if (abcstage < 70) {
        noStroke();
        textSize(75);
        fill(abcstage * 3.64285714);
        rect(0, 0, 800, 500);
        fill(255 - abcstage * 3.14285714);
        text("Loading P3D", 12, 79);
        rect(12, 95, 121, 81);
        fill(abcstage * 3.64285714);
        text(round(abcstage * 1.42857143) + "%", 18, 164);
    } else {
        if (iostage > 300) {
            panicmode = 1;
            fill(0, 255, 0);
            textSize(30);
            text(">> DESCENDING...", 30, 480);
        } else {
            fill(0, 255, 0);
            textSize(30);
            text(">> " + round(iostage * 0.3) + "% UNTIL ATHMOSPHERE", 30, 480);
        }
        if (iostage > 400) {
        }
    }
};
