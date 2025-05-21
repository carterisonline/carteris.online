var a = 0;
var b = 300;
var c = 200;
var d = 300;
var e = 315;
var draw = function () {
    //Intro
    {
        a += 1;
        if (a > 30) {
            b -= 5;
        }
        if (b < 50) {
            b = 50;
            c -= 1;
            d += 1;
        }
        if (c < 110) {
            c = 110;
        }
        if (d > 400) {
            d = 400;
        }
        noStroke();
        background(0, 0, 0);
        fill(0, 166, 255);
        ellipse(d, c, b, b);
        noFill();
        if (a < 30) {
            stroke(0, 0, 0);
            strokeWeight(30);
            arc(297, 205, 200, 200, 0, 180);
            fill(0, 0, 0);
            ellipse(233, 124, 30, 30);
            ellipse(369, 124, 30, 30);
        }
        if (a > 190) {
            e -= 5;
            stroke(0, 166, 255);
            arc(317, 202, 250, 250, e, 315);
            if (e < 55) {
                e = 55;
                fill(0, 251, 255);
                ellipse(402, 291, 20, 20);
            }
        }
        if (a > 400) {
            textSize(40);
            text("Captical Productions", 137, 383);
        }
    }
    if (a > 600) {
        background(0, 0, 0);
        fill(66, 0, 0);
        textAlign(CENTER, CENTER);
        textSize(100);
        text("Rifted", 300, 62);
        fill(102, 0, 0);
        text("Rifted", 303, 64);
        stroke(66, 0, 0);
        strokeWeight(1);
        line(0, 110, 600, 110);
        textSize(width / 20);
        fill(79, 61, 61);
        textSize(25);
        stroke(66, 0, 0);
        strokeWeight(3);
        fill(120, 0, 0);
        stroke(64, 0, 0);
        strokeWeight(10);
        ellipse(-261, 669, 1000, 1000);
        fill(14, 0, 120);
        stroke(0, 38, 71);
        ellipse(829, 669, 1000, 1000);
        fill(0, 56, 8);
        noStroke();
        fill(255, 255, 255);
        ellipse(100, 39, 2, 2);
        ellipse(273, 242, 2, 2);
        ellipse(542, 118, 2, 2);
        ellipse(387, 355, 2, 2);
        ellipse(53, 215, 2, 2);
        ellipse(181, 361, 2, 2);
        ellipse(356, 118, 2, 2);
        ellipse(470, 27, 2, 2);
        ellipse(138, 183, 2, 2);
        ellipse(426, 214, 2, 2);
        ellipse(21, 97, 2, 2);
        ellipse(297, 399, 2, 2);
        ellipse(578, 39, 2, 2);
        ellipse(534, 239, 2, 2);
    }
};