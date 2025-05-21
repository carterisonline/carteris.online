/*
                            ATTENTION
                            ---------
                 This method is old and outdated.
          Gradient tool is being replaced by One Line Script.
        It's resizable, instant gradients 90 times more compact.
https://www.khanacademy.org/computer-programming/one-line-gradient-tool/5414111257198592

*/
var grad1 = 0;
var grad2 = 0;
var ray = 0;
var ray2 = 0;
var extraplc = 0;
draw = function () {
    var gradient = function (g, b, mode) {
        var line1 = "on";
        var line2 = "on";
        var line3 = "on";
        var line4 = "on";
        var inc1 = 0;
        var color1 = g;
        var color2 = b;
        var fr240 = true;
        if (mode === "express") {
            inc1 = 4;
            fr240 = true;
            line1 = "on";
            line2 = "on";
            line3 = "on";
            line4 = "on";
        }
        if (mode === "compressed") {
            inc1 = 2;
            fr240 = true;
            line1 = "on";
            line2 = "on";
            line3 = "off";
            line4 = "off";
        }
        if (mode === "uncompressed") {
            inc1 = 1;
            fr240 = true;
            line1 = "on";
            line2 = "off";
            line3 = "off";
            line4 = "off";
        }
        if (mode === "raw") {
            inc1 = 1;
            fr240 = false;
            line1 = "on";
            line2 = "off";
            line3 = "off";
            line4 = "off";
        }
        grad1 += inc1;
        if (fr240 === true) {
            frameRate(240);
        }
        else {
            frameRate(60);
        }
        ray += 1 / width;
        if (line1 === "on" && line2 === "off" && line3 === "off" && line4 === "off") {
            stroke(lerpColor(color1, color2, ray * 1));
        }
        else {
            stroke(lerpColor(color1, color2, ray * 2));
        }
        if (line1 === "on") {
            line(grad1, 0, grad1, 400);
        }
        if (line2 === "on") {
            line(grad1 + 1, 0, grad1 + 1, 400);
        }
        if (line3 === "on") {
            line(grad1 + 2, 0, grad1 + 2, 400);
        }
        if (line4 === "on") {
            line(grad1 + 3, 0, grad1 + 3, 400);
        }
        textSize(100);
        if (line1 === "on" && line2 === "on" && line3 === "on" && line4 === "on") {
            if (ray > 0.25005) {
                ray = 0;
            }
        }
        if (line1 === "on" && line2 === "on" && line3 === "off" && line4 === "off") {
            if (ray > 0.501) {
                ray = 0;
            }
        }
        if (line1 === "on" && line2 === "off" && line3 === "off" && line4 === "off") {
            if (ray > 1) {
                ray = 0;
            }
        }
        if (grad1 > width) {
            grad1 = 0;
        }
    };
    var fold = function (g, b) {
        var color1 = g;
        var color2 = b;
        grad1 += 4;
        frameRate(9600000);
        ray += 2 / width;
        stroke(lerpColor(color1, color2, ray * 1));
        stroke(lerpColor(color1, color2, ray * 2));
        line(grad1, extraplc, grad1, extraplc);
        line(grad1 + 1, extraplc, grad1 + 1, extraplc);
        line(grad1 + 2, extraplc, grad1 + 2, extraplc);
        line(grad1 + 3, extraplc, grad1 + 3, extraplc);
        textSize(100);
        if (ray > 0.2505) {
            ray = 0;
            extraplc += 1;
        }
        if (grad1 > width) {
            grad1 = 0;
        }
        if (extraplc > 399) {
            extraplc = 1;
        }
    };
    var color5 = color(255, 0, 153);
    var color6 = color(0, 223, 252);
    fold(color5, color6);
};
