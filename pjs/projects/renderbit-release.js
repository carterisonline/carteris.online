/*
 HIT RESTART TO FIX WHITE SCREEN BUG
 HIT RESTART TO FIX WHITE SCREEN BUG
 HIT RESTART TO FIX WHITE SCREEN BUG
 HIT RESTART TO FIX WHITE SCREEN BUG
 HIT RESTART TO FIX WHITE SCREEN BUG
 HIT RESTART TO FIX WHITE SCREEN BUG
 HIT RESTART TO FIX WHITE SCREEN BUG
 HIT RESTART TO FIX WHITE SCREEN BUG
 HIT RESTART TO FIX WHITE SCREEN BUG
 HIT RESTART TO FIX WHITE SCREEN BUG
 HIT RESTART TO FIX WHITE SCREEN BUG
 HIT RESTART TO FIX WHITE SCREEN BUG
 HIT RESTART TO FIX WHITE SCREEN BUG
 HIT RESTART TO FIX WHITE SCREEN BUG
 HIT RESTART TO FIX WHITE SCREEN BUG
*/

var resolution = 1;  /** Higher Means MORE Compression **/
var TYPE = 4;        /** Different Spiral Presets **/
var tiles = false;    /** Shaded Tiles for Low Resolutions **/
var tileShade = 34;  /** Tile Shade Intensity **/
var tileType = 2;
var precalculated = false;
var frameBlur = 9;

//************************************************************
var bb = 0;
var dot = function (one, two) {
    return one[0] * two[0] + one[1] * two[1];
};
var bs = 0;

var iTime = 0;
var comp = 600;

var cx = -4;
var cy = 0;
if (precalculated) { iTime = 3; }
var col = [];


var tau = PI * 2;
var time;

var cX = -0.7;
var cY = 0.27015;
var zx, zy;
var maxIter = 300;
var hsv2rgb = function (h, s, v) {
    var c = v * s;
    var x = c * (1 - abs(((h / 60) % 2) - 1));
    var m = v - c;

    var r, g, b;
    if (h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (h < 300) {
        r = x;
        g = 0;
        b = c;
    } else {
        r = c;
        g = 0;
        b = x;
    }

    var ri = round((r + m) * 255);
    var gi = round((g + m) * 255);
    var bi = round((b + m) * 255);

    return color(ri, gi, bi);
};

var vres = resolution;
var storage = [];

var timeres = 1;
var animate = 0;
var animated = 0;
var pixel = [];
draw = function () {
    if (resolution > comp) { comp = resolution; }
    noSmooth();
    noTint();
    time = floor(iTime * 30);
    if (frameCount < 2) {
        this.loadPixels();
    }
    pixel = this.imageData.data;
    cx += resolution;
    if (cx > comp - 1) { cx = 0; cy += resolution; }
    if (cy > comp - 1) {
        cx = -resolution;
        cy = 0;
        if (iTime > 2) {
            iTime += 1 / timeres;
        } else {
            iTime++;
        }
        this.updatePixels();
        var img;
        if (tiles === false) {
            img = get(0, 0, width / resolution, height / resolution);
        } if (tiles) {
            img = get(0, 0, width, height);
        }
        if (iTime > 2) {
            storage[animated] = img;
            animated++;
        }
    }
    if (precalculated === false && animated < 1) {
        comp -= 1;
    } if (iTime === 1) {
        iTime += 2;
        if (comp > 300) { comp = 300; }
        else if (comp > 200) { comp = 200; }
        else if (comp > 150) { comp = 150; }
        else if (comp > 100) { comp = 100; }
        else if (comp > 75) { comp = 75; }
        else if (comp > 60) { comp = 60; }
        else if (comp > 50) { comp = 50; }
        else if (comp > 40) { comp = 40; }
        else if (comp > 30) { comp = 30; }
        else if (comp > 25) { comp = 25; }
        else if (comp > 20) { comp = 20; }
        else if (comp > 15) { comp = 15; }
        else if (comp > 10) { comp = 10; }
        else if (comp > 5) { comp = 5; }
    }
    for (var rx = cx; rx < width; rx += comp) {
        for (var ry = cy; ry < height; ry += comp) {
            var i = maxIter;
            var xn = (noise(1, iTime / 100) - 0.333) * 4;
            var yn = (noise(0, iTime / 100) - 0.333) * 4;

            zx = 1.5 * (rx - width / 2) / (0.5 * width);
            zy = (ry - height / 2) / (0.5 * height);
            while (zx * zx + zy * zy < 4 && i > 0) {
                var tmp = zx * zx * xn - zy * zy * yn + cX;
                zy = (2.0 * zx * zy + cY);
                zx = tmp;
                i -= 1;
            }
            var c = hsv2rgb(i / maxIter * 360, 1, i > 1 ? 1 : 0);

            col[0] = red(c);
            col[1] = green(c);
            col[2] = blue(c);
            if (tiles && tileType === 0) {
                for (var ab = 0; ab < resolution; ab++) {
                    bb = (ab / resolution) * tileShade;
                    for (var ac = 0; ac < resolution; ac++) {
                        bs = (ac / resolution) * tileShade;
                        pixel[((rx + ab) * 4) + ((ry + ac) * width * 4) + 0] = (col[0]) - bs - bb;
                        pixel[((rx + ab) * 4) + ((ry + ac) * width * 4) + 1] = (col[1]) - bs - bb;
                        pixel[((rx + ab) * 4) + ((ry + ac) * width * 4) + 2] = (col[2]) - bs - bb;
                        pixel[((rx + ab) * 4) + ((ry + ac) * width * 4) + 3] = 255 / frameBlur;
                    }
                }
            } else if (tiles && tileType === 1) {
                for (var ab = 0; ab < resolution; ab++) {
                    bb = abs((ab / resolution) - 0.5) * tileShade;
                    for (var ac = 0; ac < resolution; ac++) {
                        bs = abs((ac / resolution) - 0.5) * tileShade;
                        pixel[((rx + ab) * 4) + ((ry + ac) * width * 4) + 0] = (col[0]) - bs - bb;
                        pixel[((rx + ab) * 4) + ((ry + ac) * width * 4) + 1] = (col[1]) - bs - bb;
                        pixel[((rx + ab) * 4) + ((ry + ac) * width * 4) + 2] = (col[2]) - bs - bb;
                        pixel[((rx + ab) * 4) + ((ry + ac) * width * 4) + 3] = 255 / frameBlur;
                    }
                }
            } else if (tiles && tileType === 2) {
                for (var ab = 0; ab < resolution; ab++) {
                    bb = (1 - abs((ab / resolution) - 0.5)) * tileShade;
                    for (var ac = 0; ac < resolution; ac++) {
                        bs = (-abs((ac / resolution) - 0.5)) * tileShade;
                        pixel[((rx + ab) * 4) + ((ry + ac) * width * 4) + 0] = (col[0]) - bs - bb;
                        pixel[((rx + ab) * 4) + ((ry + ac) * width * 4) + 1] = (col[1]) - bs - bb;
                        pixel[((rx + ab) * 4) + ((ry + ac) * width * 4) + 2] = (col[2]) - bs - bb;
                        pixel[((rx + ab) * 4) + ((ry + ac) * width * 4) + 3] = 255 / frameBlur;
                    }
                }
            } else {
                pixel[(rx / resolution * 4) + (ry / resolution * width * 4) + 0] = (col[0]);
                pixel[(rx / resolution * 4) + (ry / resolution * width * 4) + 1] = (col[1]);
                pixel[(rx / resolution * 4) + (ry / resolution * width * 4) + 2] = (col[2]);
                pixel[(rx / resolution * 4) + (ry / resolution * width * 4) + 3] = 255 / frameBlur;
            }
        }
    }
    if (animated > 0 && storage[4] && storage[4].width) {
        animate++;
        if (animate === animated && precalculated) { animate = 0; }
        else if (animate === animated) { animate = 4; }
        for (var a = 1; a < frameBlur + 1; a++) {
            if (animate > a - 1) {
                image(storage[animate - a], -(resolution / 2 / (frameBlur / a)), -(resolution / 2 / (frameBlur / a)), 600, 600);
                image(storage[animate - a], (resolution / 2 / (frameBlur / a)), (resolution / 2 / (frameBlur / a)), 600, 600);
            }
        }
        fill(0, 100);
        rect(0, 550, width, 100);
        fill(255, 255, 255);
        textAlign(RIGHT, RIGHT);
        textSize(20);
        text(animate + "/" + animated, 582, 583);
        textAlign(LEFT, RIGHT);
        var rb = -69;
        var ry = 478;
        textSize(38);
        noStroke();
        fill(28, 28, 28);
        rect(93 + rb, 63 + ry, 43, 28);
        rect(212 + rb, 79 + ry, 68, 29);
        fill(255, 255, 255);
        text("renderbit", 100 + rb, 100 + ry);
    } else {
        background(0, 0, 0);
        var rb = -69;
        textSize(85);
        noStroke();
        fill(28, 28, 28);
        rect(107 + rb, 23, 95, 70);
        rect(340 + rb, 68, 113, 51);
        fill(255, 255, 255);
        text("renderbit", 100 + rb, 100);
        textSize(20);
        if (iTime < 3) {
            text("Busy Prerendering", 33, 166);
        } else {
            text((animated / 4) * 100 + "%", 33, 166);
        }
    }
};