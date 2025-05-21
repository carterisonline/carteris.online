//feel free to use ;)
var gra = 1800;
var grb = 0;
var grc = 360;
draw = function () {
    textFont_(createFont("montserrat"));
    grb += 1;
    background(255, 255, 255);
    gra -= gra / 5;
    fill(0, 0, 0);
    textSize(10);
    textAlign(CENTER, CENTER);
    textSize(gra + 20);
    text("Get Ready...", 200, 200);
    if (grb > 50) {
        translate(200, 200);
        if (grb === 51) {
            gra = 1800;
        }
        rotate(grc);
        background(0, 0, 0);
        fill(255, 255, 255);
        textAlign(CENTER, CENTER);
        textSize(gra + 20);
        if (grb < 100) {

            text("Get Set...", 0, 0);
        }
        if (grb > 100) {
            grc -= grc / 20;
            textSize(-grc + 360);
            text("Get Set...", 0, 0);
        }
        if (grb > 130) {
            rotate(0);
            background(255, 255, 255);
            if (grb === 131) {
                gra = 1800;
            }
            fill(0, 0, 0);
            textSize(gra + 20);
            text("Go!", 0, 0);
        }
    }
};
