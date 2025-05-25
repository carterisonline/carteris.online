/**Press SHIFT to open the customization menu**/

//Changeable Variables
var int = 10; //Intensity (color variation)
var pixelsize = 10;
var compressmap = false; /**Compresses the map, making the program run easier on slower computers; may cause distortion**/
var infinite = false; //Infinite generation
{
    var sharpness = 56;
    var eff = [0, 0, 0, 0];
    var rlean = 0;
    var glean = 0;
    var blean = 0;
    var norma = 0.1;
    var bringup = 0;
    var finish = 0;
    var slider = 20;
    var x = -pixelsize;
    var y = 0;
    var f = [(-sharpness + 255) + (rlean * ((-sharpness + 255) / 100)), (-sharpness + 255) + (glean * ((-sharpness + 255) / 100)), (-sharpness + 255) + (blean * ((-sharpness + 255) / 100))];
    var e = [0, 0, 0];
}
draw = function () {
    fill(0, 0, 0);
    if (infinite === true && finish === 1) {
        y = 0;
        x = -pixelsize;
        finish = 0;
        bringup = 0;
    }
    if (keyIsPressed && keyCode === 16) {
        bringup = 1;
    }
    if (bringup === 1) {
        rect(26, 36, 347, 152, 10);
        fill(61, 61, 61);
        rect(241, 51, 100, 44, 5);
        rect(241, 110, 100, 44, 5);
        fill(255, 255, 255);
        text("Re-draw", 268, 77);
        text("Reset", 277, 136);
        fill(255, 0, 0);
        for (var rfi = 50; rfi < 220; rfi++) {
            ellipse(rfi, 56, slider, slider);
        }
        fill(255, 255, 255);
        ellipse(rlean / norma + 50, 56, slider, slider);
        if (mouseIsPressed && mouseX > (rlean / norma) - (slider / 2) + 50 && mouseX < (rlean / norma) + (slider / 2) + 50 && mouseY > 56 - (slider / 2) && mouseY < 56 + (slider / 2) && mouseX > 50 && mouseX < 220) {
            eff = [1, 0, 0, 0];

        }
        fill(0, 255, 0);
        for (var gfi = 50; gfi < 220; gfi++) {
            ellipse(gfi, 89, slider, slider);
        }
        fill(255, 255, 255);
        ellipse(glean / norma + 50, 89, slider, slider);
        if (mouseIsPressed && mouseX > (glean / norma) - (slider / 2) + 50 && mouseX < (glean / norma) + (slider / 2) + 50 && mouseY > 89 - (slider / 2) && mouseY < 89 + (slider / 2) && mouseX > 50 && mouseX < 220) {
            eff = [0, 1, 0, 0];
        }
        fill(0, 0, 255);
        for (var bfi = 50; bfi < 220; bfi++) {
            ellipse(bfi, 124, slider, slider);
        }
        fill(255, 255, 255);
        ellipse(blean / norma + 50, 124, slider, slider);
        if (mouseIsPressed && mouseX > (blean / norma) - (slider / 2) + 50 && mouseX < (blean / norma) + (slider / 2) + 50 && mouseY > 124 - (slider / 2) && mouseY < 124 + (slider / 2) && mouseX > 50 && mouseX < 220) {
            eff = [0, 0, 1, 0];
        } if (mouseIsPressed && mouseX > (sharpness / 1.5) - (slider / 2) + 50 && mouseX < (sharpness / 1.5) + (slider / 2) + 50 && mouseY > 160 - (slider / 2) && mouseY < 160 + (slider / 2) && mouseX > 50 && mouseX < 220) {
            eff = [0, 0, 0, 1];
        }
        if (mouseIsPressed && mouseX > 241 && mouseY > 51 && mouseY < 95 && mouseX < 341) {
            y = 0;
            x = -pixelsize;
            finish = 0;
            bringup = 0;
        } else if (mouseIsPressed && mouseX > 241 && mouseY > 110 && mouseY < 154 && mouseX < 341) {
            rlean = 0;
            glean = 0;
            blean = 0;
            sharpness = 0;
        }
        fill(125, 125, 125);
        for (var vfi = 50; vfi < 220; vfi++) {
            ellipse(vfi, 160, slider, slider);
        }
        fill(255, 255, 255);
        ellipse(sharpness / 1.5 + 50, 160, slider, slider);
        if (eff[0] === 1) {
            rlean = (mouseX * norma) - 50 * norma;
        } else if (eff[1] === 1) {
            glean = (mouseX * norma) - 50 * norma;
        } else if (eff[2] === 1) {
            blean = (mouseX * norma) - 50 * norma;
        } else if (eff[3] === 1) {
            sharpness = (mouseX * 1.5) - 50 * 1.5;
        }
        if (!mouseIsPressed) {
            eff = [0, 0, 0, 0];
        }
        mouseClicked = function () {
            eff = [0, 0, 0, 0];
        };
        if (mouseX < 50 || mouseX > 220) {
            eff = [0, 0, 0, 0];
        }
    }
    if (finish === 0 && compressmap === false) {
        for (var b = 0; b < (width / pixelsize) * (height / pixelsize); b++) {
            x += pixelsize;
            if (x > 399) { y += pixelsize; x -= 400 + pixelsize; }
            e = [random(-int, int * (1 + (rlean / 100))), random(-int, int * (1 + (glean / 100))), random(-int, int * (1 + (blean / 100)))];
            f[0] += e[0];
            f[1] += e[1];
            f[2] += e[2];
            f[0] = constrain(f[0], 0, 255);
            f[1] = constrain(f[1], 0, 255);
            f[2] = constrain(f[2], 0, 255);
            noStroke();
            fill(f[0], f[1], f[2]);
            rect(x, y, pixelsize, pixelsize);
            if (y > height) { finish = 1; }
        }
    }
    else if (finish === 0 && compressmap === true) {
        for (var b = 0; b < (height / pixelsize); b++) {
            y += pixelsize;
            e = [random(-(int * width / 30), (int * width / 30) * (1 + ((rlean * width / 30) / 100))), random(-(int * width / 30), (int * width / 30) * (1 + ((glean * width / 30) / 100))), random(-(int * width / 30), (int * width / 30) * (1 + ((blean * width / 30) / 100)))];
            f[0] += e[0];
            f[1] += e[1];
            f[2] += e[2];
            f[0] = constrain(f[0], 0, 255);
            f[1] = constrain(f[1], 0, 255);
            f[2] = constrain(f[2], 0, 255);
            noStroke();
            fill(f[0], f[1], f[2]);
            rect(x, y - pixelsize, width + pixelsize, pixelsize);
            if (y > height) { finish = 1; }
        }
    }
};
