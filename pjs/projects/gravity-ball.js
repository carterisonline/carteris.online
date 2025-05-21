//works in any width/height
//try adding "?width=800&&height=800" to url for bigger screen

//gravity, paper, steel


var mobile = true;
//touch sensitive + more speed

var material = "gravity";
//edits material and physics properties

var pong = true;
//turns on pong mode

var twoplayers = false;
//two players for pong mode

var officialmode = true;
//toggles pong game over wait times

//Don't Change
{
    var a = 28;
    var b = 0;
    var c = width / 2;
    var d = 1;
    var e = 0;
    var f = 33;
    var g = 0;
    var h = 0;
    var i = 0;
    var j = 0;
    var k = 0;

    var py = a + 100;
    var py2 = a + 100;
}
var draw = function () {
    if (material === "gravity") {
        g = 0;
    }
    if (material === "paper") {
        g = 1;
    }
    if (material === "steel") {
        g = 2;
    }
    if (g === 0) {
        frameRate(60);
        if (pong === true) {
            fill(255, 255, 255);
        }
        else {
            fill(a, c, e * 3);
        }
        noStroke();
        e -= 1;
        if (pong === true) {
            if (j === 1) {
                if (officialmode === true) {
                    background(255, 255, 255);
                    fill(0, 0, 0);
                    if (i > 10) {
                        fill(0, 0, 0);
                        text("Get Ready...", 70, 200);
                        fill(255, 255, 255);
                    }
                    else {
                        background(0, 0, 0);
                        fill(255, 255, 255);
                        text("GAME OVER", 51, 200);
                        fill(0, 0, 0);
                    }
                }
            }
            else {
                background(0, 0, 0);
            }
            if (twoplayers === false) {
                rect(width - 50, a - (height / 4), 20, height - 256);
            }
            else {
                rect(width - 50, py2 - ((height - 256) / 2), 20, height - 256);
            }
        }
        else {
            background(255, 255, 255);
        }
        ellipse(c, a, f, f);
        if (a > height - (f / 2)) {
            b = 1;
        }
        if (a < (f / 2)) {
            b = 0;
        }
        if (b === 1) {
            a -= a / 10;
        }
        else {
            a += a / 10;
        }
        if (twoplayers === false) {
            if (c > width - (f / 2) - 50) {
                d = 1;
                e = f / 2;
            }
        }
        if (twoplayers === true) {
            if (c > width - 75 && a > py2 - 128 && a < py2 + 128) {
                d = 1;
                e = f / 2;
            }
            if (c > width) {
                j = 1;
            }
        }
        if (pong === true | j === 1) {
            if (c < f / 2 | c > width) {
                j = 1;
                i += 1;
                if (officialmode === true) {
                    if (i > 50) {
                        Program.restart();
                    }
                }
                else {
                    if (i > 0) {
                        Program.restart();
                    }
                }
            }
        }
        else {
            if (c < f / 2) {
                d = 0;
                e = f / 2;
            }
        }
        if (pong === true) {
            textSize(50);
            if (twoplayers === false) {
                text(h, (width / 2) - 18, 66);
            }
            if (c < 75 && a > py - 128 && a < py + 128) {
                d = 0;
                e = f / 2;
                h += 1;
            }
            rect(50, py - ((height - 256) / 2), 20, height - 256);
            if (twoplayers === false) {
                if (mobile === false) {
                    if (keyIsPressed) {
                        py -= 5;
                    } else {
                        py += 5;
                    }
                }
                if (mobile === true) {
                    if (mouseIsPressed) {
                        py -= 10;
                    } else {
                        py += 10;
                    }
                }
            }
            if (twoplayers === true) {
                if (keyIsPressed && keyCode === LEFT) {
                    py -= 5;
                } else {
                    py += 5;
                }
                if (mouseIsPressed === true) {
                    py2 -= 5;
                } else {
                    py2 += 5;
                }
            }
            if (py > height) {
                py = height;
            }
            if (py2 > height) {
                py2 = height;
            }
            if (py2 < 0) {
                py2 = 0;
            }
            if (py < 0) {
                py = 0;
            }
        }
        if (d === 1) {
            c -= e;
            fill(255, 255, 255, 200);
            ellipse(c * 1.05, a / 1.05, f, f);
            fill(255, 255, 255, 100);
            ellipse(c * 1.1, a / 1.1, f, f);
            fill(255, 255, 255, 50);
            ellipse(c * 1.15, a / 1.15, f, f);
            fill(255, 255, 255, 25);
            ellipse(c * 1.2, a / 1.2, f, f);
        }
        if (d === 0) {
            c += e;
            fill(255, 255, 255, 200);
            ellipse(c / 1.05, a * 1.05, f, f);
            fill(255, 255, 255, 100);
            ellipse(c / 1.1, a * 1.1, f, f);
            fill(255, 255, 255, 50);
            ellipse(c / 1.15, a * 1.15, f, f);
            fill(255, 255, 255, 25);
            ellipse(c / 1.2, a * 1.2, f, f);
        }
        fill(255, 255, 255);
        text(e = f / 2, -100, -100);
        fill(255, 0, 0);
    }
    if (g === 1) {
        frameRate(60);
        fill(196, 196, 196);
        noStroke();
        e += 1;
        background(255, 255, 255);
        rect(c, a, f, f);
        if (a > height - (f / 2)) {
            b = 1;
        }
        if (a < (f / 2)) {
            b = 0;
        }
        if (b === 1) {
            a -= a / (10 + (-f / 20));
        }
        else {
            a += a / (10 + (-f / 20));
        }
        if (c > width - (f / 2)) {
            d = 1;
            e = 5;
        }
        if (c < f / 2) {
            d = 0;
            e = 5;
        }
        if (d === 1) {
            c -= e;
        }
        if (d === 0) {
            c += e;
        }
        fill(255, 255, 255);
        text(e = f / 2, -100, -100);
        fill(255, 0, 0);
    }
    if (g === 2) {
        var o = a - 185;
        if (o < 1) {
            o = 0;
        }
        frameRate(60);
        fill(o);
        noStroke();
        e -= 2;
        background(255, 255, 255);
        rect(c, a, f, f);
        if (a > height - (f / 2)) {
            b = 1;
        }
        if (a < (f / 2)) {
            b = 0;
        }
        if (b === 1) {
            a -= a / 15;
        }
        else {
            a += a / 10;
        }
        if (c > width - (f / 2)) {
            d = 1;
            e = 5;
        }
        if (c < f / 2) {
            d = 0;
            e = 5;
        }
        if (d === 1) {
            c -= e;
        }
        if (d === 0) {
            c += e;
        }
        fill(255, 255, 255);
        text(e = f / 2, -100, -100);
        fill(255, 0, 0);
    }
};
