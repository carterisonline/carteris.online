// Following code is a zoomable Mandelbrot. 
// Of course, you want to click on an interesting area 
// with contrast and more colors to zoom in.

var x, y, zr, zi, zr2, zi2, cr, ci, n;
var re, gr, bl, xt, yt, j;

var antialiasing = 1;

var i = 0;
var di = 0;
var dj = 0;
var f = 10;
var fn1 = random(20);
var fn2 = random(20);
var fn3 = random(20);
var zmx1 = floor(height / 4);
var zmx2 = 2 * (width / height);
var zmy1 = floor(height / 4);
var zmy2 = 2;
var i2 = 0;

var di2 = di;
var dj2 = dj;
var zmx12 = zmx1;
var zmx22 = zmx2;
var zmy12 = zmy1;
var zmy22 = zmy2;

var detail = 5;

var skip = 25;
var pres = 30;
var siz = 3.5;
var n2 = 0;
var arr = 2;
var to = 0;

var nnn = [0, 0, 0];
var ppp = 0;
var jjj = 0;

var precint = 200;
//println("ArrowLeft:  Increase Resolution\nArrowRight: Decrease Resolution\nArrowUp:    Zoom into preview point\nArrowDown:  Zoom Out\n\nCamera is dependent on MouseX & MouseY");
draw = function () {
    //noTint();
    //noSmooth();
    strokeWeight(detail);
    strokeCap(SQUARE);
    noStroke();
    if (antialiasing === 1) { arr = 1; }
    for (var frameSkip = 0; frameSkip < ceil(detail / 2); frameSkip++) {
        if (i < width) { i += detail; ppp++; }
        x = (i + di) / zmx1 - zmx2;
        for (j = 0; j <= height - 50; j += detail) {
            y = zmy2 - (j + dj) / zmy1;
            zr = 0;
            zi = 0;
            zr2 = 0;
            zi2 = 0;
            cr = x;
            ci = y;
            n = 1;
            n2 = 1;
            while (n < precint && (zr2 + zi2) < 4) {
                zi2 = zi * zi;
                zr2 = zr * zr;
                zi = 2 * zi * zr + ci;
                zr = zr2 - zi2 + cr;
                n++;
            }
            nnn = [0, 0, 0];
            for (var a = 1; a < antialiasing; a++) {
                n2 = 0;
                y = zmy2 - (j + dj) / zmy1;
                zr = 0;
                zi = 0;
                zr2 = 0;
                zi2 = 0;
                cr = (i + random(0, (detail * (a / antialiasing))) + di) / zmx1 - zmx2;
                ci = zmy2 - (j + random(0, (detail * ((a / antialiasing)))) + dj) / zmy1;
                while (n2 < precint && (zr2 + zi2) < 4) {
                    zi2 = zi * zi;
                    zr2 = zr * zr;
                    zi = 2 * zi * zr + ci;
                    zr = zr2 - zi2 + cr;
                    n2++;
                }
                nnn[0] += (n2 * fn1) % 255;
                nnn[1] += (n2 * fn2) % 255;
                nnn[2] += (n2 * fn3) % 255;
            } if (antialiasing === 1) {
                re = (n * fn1) % 255;
                gr = (n * fn2) % 255;
                bl = (n * fn3) % 255;
                fill(re, gr, bl);
            }
            if (n < precint) {
                detail = 10 / n + 1;
            }
            fill((((n * fn1) % 255) + nnn[0]) / antialiasing, (((n * fn2) % 255) + (nnn[1])) / antialiasing, (((n * fn3) % 255) + nnn[2]) / antialiasing);
            rect(i - detail - 1, j, width, ceil(detail));
        }
    }
    if (i2 > width - 1) {
        i2 = 0;
    }
    di2 = di;
    dj2 = dj;
    zmx12 = zmx1;
    zmx22 = zmx2;
    zmy12 = zmy1;
    zmy22 = zmy2;
    xt = mouseX;
    yt = mouseY;
    di2 = di2 + xt - (width / 2);
    dj2 = dj2 + yt - (height / 2);
    zmx12 = zmx12 * f;
    zmx22 = zmx22 * (1 / f);
    zmy12 = zmy12 * f;
    zmy22 = zmy22 * (1 / f);
    di2 = di2 * f;
    dj2 = dj2 * f;
    if (i > width - 1) {
        skip = 10;
        pres = 7.5;
        siz = 1;
    } else {
        skip = 25;
        pres = 30;
        siz = 3.5;
    }
    if (frameCount - (floor(frameCount / 10) * 10) === 0) {
        jjj = (i - ppp) / detail;
        ppp = 0;
    }
    fill((((n * fn1) % 255) * 1.2 - 20) / 10, (((n * fn2) % 255) * 1.2 - 20) / 10, (((n * fn3) % 255) * 1.2 - 20) / 10);
    rect(0, height - 50, width, 50);
    fill(255);
    text("| 1e" + floor(log(zmx1 / precint) / 2 + 1) + "x Zoom  | " + floor(width / detail * antialiasing) + "x" + floor((height / detail * antialiasing)) + "  | Downscaling to [" + floor(sqrt(floor(width / detail) * floor(height / detail))) + "p]  | " + floor((i / width) * 100) + "% Complete (~" + ceil((width - i) * sq(1 / detail) * sqrt(antialiasing) / (60)) + " Seconds Left)", 68, height - 8);
    colorMode(HSB);
    fill(60, 255, 255);
    rect(width - 119 - ((60 - (60)) * (width / 300)), height - 19, 100 + ((60 - (60)) * (width / 300)), 12);
    colorMode(RGB);
    for (var bb = 0; bb < skip; bb++) {
        if (i2 < width) { i2 += pres; }
        x = (i2 + di2) / zmx12 - zmx22;
        for (j = 0; j <= height - 50; j += pres) {
            y = zmy22 - (j + dj2) / zmy12;
            zr = 0;
            zi = 0;
            zr2 = 0;
            zi2 = 0;
            cr = x;
            ci = y;
            n = 1;
            while (n < precint && (zr2 + zi2) < 4) {
                zi2 = zi * zi;
                zr2 = zr * zr;
                zi = 2 * zi * zr + ci;
                zr = zr2 - zi2 + cr;
                n++;
            }
            re = (n * fn1) % 255;
            gr = (n * fn2) % 255;
            bl = (n * fn3) % 255;
            fill(re, gr, bl);
            rect(i2 / 9, j / 9, siz, siz);
        }
    }
    keyPressed = function () {
        if (key.toString() === "e" && detail !== 1) {
            background(0, 0, 0);
            i = 0;
            detail--;
        } if (key.toString() === "q") {
            background(0, 0, 0);
            i = 0;
            detail++;
        } if (key.toString() === "w") {
            background(0, 0, 0);
            xt = mouseX;
            yt = mouseY;
            di = di + xt - (width / 2);
            dj = dj + yt - (height / 2);
            zmx1 = zmx1 * f;
            zmx2 = zmx2 * (1 / f);
            zmy1 = zmy1 * f;
            zmy2 = zmy2 * (1 / f);
            di = di * f;
            dj = dj * f;
            i = 0;
            j = 0;
        } if (key.toString() === "s") {
            background(0, 0, 0);
            xt = mouseX;
            yt = mouseY;
            di = di + xt - (width / 2);
            dj = dj + yt - (height / 2);
            zmx1 = zmx1 / f;
            zmx2 = zmx2 / (1 / f);
            zmy1 = zmy1 / f;
            zmy2 = zmy2 / (1 / f);
            di = di / f;
            dj = dj / f;
            i = 0;
            j = 0;
        } if (key.toString() === "d") {
            antialiasing++;
            background(0, 0, 0);
            i = 0;
        } if (key.toString() === "a" && antialiasing !== 1) {
            antialiasing--;
            background(0, 0, 0);
            i = 0;
        }
    };
};
