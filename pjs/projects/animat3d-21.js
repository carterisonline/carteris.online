/*

*****ATTENTION*****
RAWthree is open source! Copy to your heart's content.

v2 update notes:
// Finished total 3D animation for the block object: x, y, w, h
// Implemented underlying lighting engine
// Fixed a bunch of bugs.

*****VARIABLES GUIDE*****
block Variables:
    ----------------------
    x , y , width, height, depth, closeness (NEW), r (color), g (color), b(color)

circle Variables:
    ----------------------
    x , y , width, height, r (color), g (color), b(color)

*/
//source code (copy)

//don't expand the block ((scary))
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
var circle = function (x, y, w, h, r, g, b) {
    fill(r, g, b);
    ellipse(x, y, w, h);
    fill(r + 2, g + 2, b + 2);
    ellipse(x, y, w - ((w / 20) * 1), h - ((h / 20) * 1));
    fill(r + 4, g + 4, b + 4);
    ellipse(x, y, w - ((w / 20) * 2), h - ((h / 20) * 2));
    fill(r + 6, g + 6, b + 6);
    ellipse(x, y, w - ((w / 20) * 3), h - ((h / 20) * 3));
    fill(r + 8, g + 8, b + 8);
    ellipse(x, y, w - ((w / 20) * 4), h - ((h / 20) * 4));
    fill(r + 10, g + 10, b + 10);
    ellipse(x, y, w - ((w / 20) * 5), h - ((h / 20) * 5));
    fill(r + 12, g + 12, b + 12);
    ellipse(x, y, w - ((w / 20) * 6), h - ((h / 20) * 6));
    fill(r + 14, g + 14, b + 14);
    ellipse(x, y, w - ((w / 20) * 7), h - ((h / 20) * 7));
    fill(r + 16, g + 16, b + 16);
    ellipse(x, y, w - ((w / 20) * 8), h - ((h / 20) * 8));
    fill(r + 18, g + 18, b + 18);
    ellipse(x, y, w - ((w / 20) * 9), h - ((h / 20) * 9));
    fill(r + 20, g + 20, b + 20);
    ellipse(x, y, w - ((w / 20) * 10), h - ((h / 20) * 10));
    fill(r + 21, g + 21, b + 21);
    ellipse(x, y, w - ((w / 20) * 11), h - ((h / 20) * 11));
    fill(r + 22, g + 22, b + 22);
    ellipse(x, y, w - ((w / 20) * 12), h - ((h / 20) * 12));
    fill(r + 23, g + 23, b + 23);
    ellipse(x, y, w - ((w / 20) * 13), h - ((h / 20) * 13));
    fill(r + 24, g + 24, b + 24);
    ellipse(x, y, w - ((w / 20) * 14), h - ((h / 20) * 14));
    fill(r + 25, g + 25, b + 25);
    ellipse(x, y, w - ((w / 20) * 15), h - ((h / 20) * 15));
    fill(r + 26, g + 26, b + 26);
    ellipse(x, y, w - ((w / 20) * 16), h - ((h / 20) * 16));
    fill(r + 27, g + 27, b + 27);
    ellipse(x, y, w - ((w / 20) * 17), h - ((h / 20) * 17));
    fill(r + 28, g + 28, b + 28);
    ellipse(x, y, w - ((w / 20) * 18), h - ((h / 20) * 18));
    fill(r + 29, g + 29, b + 29);
    ellipse(x, y, w - ((w / 20) * 19), h - ((h / 20) * 19));
};

//end here
var draw = function () {
    background(255, 255, 255);
    block(sin(frameCount + 90) * 50 - 216, cos(frameCount + 90) * 50 + 145, 121, 90, 38, 3, 142, 144, 180, 255);
    block(sin(frameCount) * 50 - 100, cos(frameCount) * 20 + 50, 63, 62, 26, 3, 112, 172, 169, 255);
    block(sin(frameCount + 180) * 50 - 94, cos(frameCount + 180) * 50 + 190, 69, 57, 33, 4, 213, 134, 146, 255);
    fill(179, 61, 61);
};
