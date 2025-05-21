var pts = 0;
var inc = 1;
var ex = 1;
var inc1 = 0;
var ex1 = 1;
var autoclick = 0;
draw = function () {
    pts += inc1 / 60;
    var tw = pow(ex, 2);
    var tw1 = pow(ex1, 2);
    var shop = function () {
        pts += inc;
        if (mouseX > 7 && mouseX < 132 && mouseY > 352 && mouseY < 393 && pts > tw + ex) {
            pts -= tw + ex;
            inc += ex;
            ex++;
        } if (mouseX > 265 && mouseX < 390 && mouseY > 352 && mouseY < 393 && pts > tw1 + ex1) {
            pts -= tw1 + ex1;
            inc1 += ex1;
            ex1++;
        }
    };
    noStroke();
    background(0, 0, 0);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255);
    textSize(100 - (pts / 44000000));
    text(round(pts), 200, 200);
    mouseClicked = function () {
        shop();
    };
    if (autoclick === 1) {
        shop();
    }
    rect(7, 352, 125, 41);
    rect(265, 352, 125, 41);
    fill(0, 0, 0);
    textSize(36);
    text(tw, 70, 372);
    text(tw1, 330, 372);
    fill(255, 0, 0);
};