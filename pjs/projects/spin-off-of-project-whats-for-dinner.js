background(186, 145, 20); // wooden table
ellipse(200, 200, 350, 350); // plate
ellipse(200, 200, 300, 300);
var grape = function (x, y) {
    fill(113, 0, 130);
    ellipse(x + 22, y + 5, 25, 25);
    ellipse(x + 5, y + 14, 25, 25);
    ellipse(x, y, 25, 25);
};
var megagrape = function (x, y) {
    grape(x, y);
    grape(x + 26, y + 27);
    grape(x - 5, y + 32);
};
var megamegagrape = function (x, y) {
    megagrape(x, y);
    megagrape(x + 37, y + -26);
    megagrape(x + 37, y + 13);
    megagrape(x + 6, y + 38);
};
var plateofgrapes = function () {
    megamegagrape(100, 100);
    megamegagrape(170, 76);
    megamegagrape(100, 168);
    megamegagrape(171, 158);
    megamegagrape(237, 100);
    megamegagrape(245, 189);
    megamegagrape(166, 232);
    megamegagrape(114, 231);
};
plateofgrapes();
