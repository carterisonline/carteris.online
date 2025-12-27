var a = 0.01;
var b = height;
var c = height;
var d = 123;
var e = height * 10;
var f = 0;
var g = 0;
var h = 0;
var hm = 0;
var col = 255;
draw = function () {
    frameRate(60);
    a += a / 5;
    background(0, 0, 0);
    textFont(createFont("Montserrat Black"));
    textSize(a);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255);
    text("!", 200, 176);
    if (a > 2135) {
        background(255, 255, 255);
        b -= b / 7;
        c -= c / 17;
        e -= e / 13;
        if (e < 100) {
            d -= 2;
            e += 2;
        } if (d < 70) {
            d = 70;
        }
        textSize(53);
        textFont(createFont("Montserrat Semibold"));
        fill(0, 0, 0);
        text("carter", 122, b + 70);
        text("is", 224, c + d);
        text("online", 291, e + 83);
        fill(255, 255, 255);
        noStroke();
        rect(0, -b + height, width, 400);
        textSize(26);
        if (d < 71) {
            col -= col / 122;
            fill(0, 0, 0);
            text("P    R    E    S    E    N    T    S", 207, 163);
            f++;
            g += abs(h / 4);
            if (h > 60) {
                hm = 1;
            } if (h < -60) {
                hm = 0;
            }
            if (hm === 1) {
                h--;
            } if (hm === 0) {
                h++;
            }
            stroke(col);
            line(-h + g, 200, h + 64 + g, 200);
            if (-h + g > width) {
                g = -232;
            }
        } if (f > 300) {
            textSize(16);
            text("Click to Continue", 207, 369);
        }
    }
};