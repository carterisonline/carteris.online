/**
  -*-*-*-*-*-*-*-*-* CLEARS *-*-*-*-*-*-*-*-*-*-*-*-*-*-
  
                       Me
                  Lita Klingler
  
  
  -------------IMPARTIAL LEADERBOARD--------------------
                     Me - 859
                TPanda123456 - 803
                 KempoPanda - 780
                    Xenon - 711
               Bryan Amelang - 695
                Eragon Blaze - 685
               Xyzerkz Gaming - 680
               Colin Larratt - 638
                26taschadrie - 632
               Zander Whitley - 607
                Episode V... - 584
                   Asher - 572
                 Bear Beary - 561
                EMMETT MONNOT - 538
              Caleb Richardson - 513
              Infinite Studios - 496
               Ibraheem Ahmed - 436


**/
var block = [];
for (var a = 0; a < 800; a++) {
    block.push(1);
}
var dot = {
    x: 300,
    y: 300,
    xdir: 7,
    ydir: -4,
};
var breaked = 0;
var pushback = 1;
var paddlex = 300;
var failfade = 0;
var fail = 0;
var score = 0;
var fs = 0;
var clearCount = 0;
var high = 0;
var broken = 0;
draw = function () {
    cursor("NONE");
    for (var a = 0; a < 800; a++) {
        if (block[a] === 1) { fs++; }
    }
    if (fs < 100 || fail === 1) {
        for (var a = 0; a < random(1, 10); a++) {
            dot.xdir = 0;
            dot.ydir = 0;
            block[clearCount] = 0;
            clearCount++;
        }
    }
    if (fs < 2 && fail !== 1) {
    }
    if (abs(dot.xdir) + abs(dot.ydir) > 15) {
        pushback = 0;
    } else {
        pushback = 1;
    }
    background(0, 0, 0);
    colorMode(HSB);
    noStroke();
    for (var a = 0; a < 800; a++) {
        if (block[a] === 1) {
            if (dot.x > a * (width / 40) - (floor(a / 40) * width) + (width / 270) && dot.x < a * (width / 40) - (floor(a / 40) * width) + (width / 270) + (width / 40)) {
                if (dot.y < (floor(a / 40) * 8) + 10 && dot.y > (floor(a / 40) * 8)) {
                    if (abs(dot.xdir) < 1) {
                        for (var b = 0; b < 20; b++) {
                            if (block[a - (b * 40)] === 1) {
                                score++;
                                breaked++;
                            } else {
                                score--;
                                breaked--;
                            }
                        }
                    }
                    if (block[a - 1] !== 0) {
                        score++;
                        breaked++;
                    } if (block[a + 1] !== 0) {
                        score++;
                        breaked++;
                    } if (block[a - 40] !== 0) {
                        score++;
                        breaked++;
                    }
                    if (abs(dot.xdir) < 1) {
                        for (var b = 0; b < 20; b++) {
                            block[a - (b * 40)] = 0;
                            if (block[a - (b * 40)] === 0) {
                                score++;
                                breaked++;
                            } else {
                                score--;
                                breaked--;
                            }
                        }
                    }
                    block[a] = 0;
                    block[a - 1] = 0;
                    block[a - 40] = 0;
                    block[a + 1] = 0;
                    breaked++;
                    score++;
                    if (pushback === 1) {
                        dot.ydir = -dot.ydir * 1.1;
                    } else {
                        dot.ydir = dot.ydir * 0.99;
                    }
                }
            }
            fill(floor(a / 40) * 12, 255, 255);
            rect(a * (width / 40) - (floor(a / 40) * width) + (width / 270), floor(a / 40) * 8, width / 40, 8);
        }
    }
    colorMode(RGB);
    fill(255, 255, 255);
    dot.x += dot.xdir;
    dot.y += dot.ydir;
    if (dot.x > width || dot.x < 0) {
        dot.xdir = -dot.xdir;
    }
    if (dot.y < 0) {
        dot.ydir = -dot.ydir;
    }
    if (dot.y > height) {
        fail = 1;
        dot.ydir = -dot.ydir;
    }
    if (dot.x > paddlex - 50 && dot.x < paddlex + 50 && dot.y > height - 29) {
        breaked = 0;
        dot.xdir = ((dot.x - paddlex) / 5);
        dot.ydir = -random(5, 7);
    }
    if (pushback !== 1) {
        fill(255, 0, 0);
    } if (abs(dot.xdir) < 1) {
        fill(255, 255, 0);
    }
    dot.x = constrain(dot.x, 0, width);
    ellipse(dot.x, dot.y, 10, 10);
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    paddlex -= (paddlex - mouseX) / 10;
    rect(paddlex - 50, height - 29, 100, 10);
    textSize((breaked / 2) + 27);
    fill(255, 100 + breaked);
    if (breaked > high) {
        broken = 1;
        high = breaked;
    } if (breaked === 0) {
        broken = 0;
    }
    if (fail !== 1) {
        text(breaked, 300, 300);
        textSize(12);
        if (broken === 1) {
            fill(255, 255, 255);
        }
        text("High Combo: " + high, 300, 322 + ((breaked / 2) + 27) / 2);
    }
    if (fail === 1) {
        failfade -= (failfade - 100) / 30;
        fill(255, 0, 0, failfade);
        rect(0, 0, width, height);
        dot.xdir -= (dot.xdir - 0) / 30;
        dot.ydir -= (dot.ydir - 0) / 30;
        fill(255, 255, 255, failfade * 2.55);
        textSize(30);
        text("Game Over", 300, 274);
        textSize(20);
        text("Click to Restart", 300, 303);
        textSize(14);
        text("Score: " + score, 300, 321);
        if (mouseIsPressed) {
            Program.restart();
        }
    }
    fs = 0;
};
