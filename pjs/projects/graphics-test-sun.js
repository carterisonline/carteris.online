var suncolor = [255, 255, 255]; // Sun Color
var intensity = 2; //Flare Intensity
var lensFlare = true; //Heptagon Rendering
var fun = false; //Do You Dare Set It To True?
//Did it in Just 8 lines!
{
    //jk
    var heptagon = function (x, y, w, h) {
        beginShape();
        for (var i = 0; i < 8; i++) {
            vertex(cos(i * (360 / 7) + 10) * w / 2 + x, sin(i * (360 / 7) + 10) * h / 2 + y);
        }
        endShape(CLOSE);
    };
    var buildings = {
        x: [0, 50, 150, 200, 300, 350],
        y: [214, 236, 171, 213, 193, 250],
        width: [50, 100, 50, 100, 50, 50],
        length: 6
    };
    var sunX = 200, sunY = 200, c, d;
    var sound = 0;
    draw = function () {
        noStroke();
        background(104, 137, 204);
        strokeWeight(30);
        if (mouseIsPressed) {
            sunX = mouseX; sunY = mouseY;
        } else {
            sunX = cos(frameCount + 180) * 100 + 200; sunY = sin(frameCount + 180) * 85 + 150;
        }
        for (var i = 0; i < 360; i++) {
            stroke(255, 255, 255, noise(i, sound / 50) * intensity * 4);
            line(sunX, sunY, cos(i) * 1000 + sunX, sin(i) * 1000 + sunY);
        }
        if (fun) {
            fill(255, 0, 0, 20);
            ellipse(sunX + 7, sunY + 10, 28, 35);
            fill(0, 0, 0, 20);
            ellipse(sunX + 23, sunY - 13, 10, 10);
            ellipse(sunX - 10, sunY - 11, 10, 10);
        }
        sound += 0.01;
        noStroke();
        for (var i = 0; i < 50; i++) {
            fill(100 - i, 100 - i, 255 - i * 2);
            rect(0, i * 2 + 300, 400, 2);
        }
        for (var j = 0; j < 30; j++) {
            fill(255, 255, 255, 20);
            ellipse(sunX, 600 - sunY, j * 5 + 30, j * 5 + 30);
        }
        for (var j = 0; j < 90; j++) {
            var x = sin(j * 2 + 180) * 30, y = cos(j * 2 + 180) * 30;
            var n = noise(j / 2, sound * 2 + 5) * 70;
            fill(255);
            rect(sunX + x + n - 35, 600 - (y + sunY), x * -2, 2);
        }
        fill(100);
        for (var i = 0; i < buildings.length; i++) {
            rect(buildings.x[i], buildings.y[i], buildings.width[i], 300 - buildings.y[i]);
            for (var j = 0; j < 150 - buildings.y[i] / 2; j++) {
                var n = noise(j / 2, sound * 2 - i) * 30;
                fill(90 - j);
                rect(buildings.x[i] - 20 + n + i * 2, j * 2 + 300, buildings.width[i] + (i + 1) * 2 + 5, 2);
                fill(100);
            }
        }
        for (var i = 0; i < 360; i++) {
            for (var j = 0; j < buildings.length; j++) {
                if (cos(i) * 30 + sunX > buildings.x[j] && cos(i) * 30 + sunX < buildings.width[j] + buildings.x[j] && sin(i) * 30 + sunY > buildings.y[j]) {
                    c = true;
                    d++;
                }
            }
            if (!c) {
                strokeWeight(5);
                stroke(suncolor[0], suncolor[1], suncolor[2], intensity * 2);
                line(sunX + cos(i) * 30, sunY + sin(i) * 30, cos(i) * 1000 + sunX, sin(i) * 1000 + sunY);
            }
            c = false;
        }
        for (var j = 0; j < buildings.length; j++) {
            if (sunX > buildings.x[j] && sunX < buildings.width[j] + buildings.x[j] && sunY > buildings.y[j]) {
                c = true;
            }
        }
        if (!c && lensFlare) {
            for (var i = 0; i < 5; i++) {
                noStroke();
                fill(255, 200, 200, 10 - (d / 18));
                heptagon(400 - sunX, 400 - sunY, 40 + i * 2, 40 + i * 2);
                fill(255, 225, 190, 10 - (d / 10));
                heptagon(200 - (sunX - 200) / 4, 200 - (sunY - 200) / 4, 50 + i * 2, 50 + i * 2);
                fill(225, 255, 225, 10 - (d / 10));
                heptagon(200 + (sunX - 200) / 5, 200 + (sunY - 200) / 5, 60 + i * 2, 60 + i * 2);
                fill(255, 255, 255, 10 - (d / 10));
                heptagon(200 + (sunX - 200) / 1.5, 200 + (sunY - 200) / 1.5, 80 + i * 2, 80 + i * 2);
            }
        }
        c = false; d = 0;
    };
}