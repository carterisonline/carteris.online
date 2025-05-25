var numOfObjects = 488; //Number of objects orbiting; size randomised
var collision = false; // Enables/Disables wall collision
var pathFinder = true; //Shows a path for objects
var randomColors = true; //Assigns random colors to paths
var weird = 2000; //Don't change pretty please

var ball = {
    x: [],
    y: [],
    s: [],
    velocity: {
        x: [],
        y: [],
    },
    history: {
        x: [],
        y: [],
    },
    color: [],

};
var oogadooga = 0;
for (var a = 0; a < numOfObjects; a++) {
    if (numOfObjects === 255) {
        ball.color.push(a);
        ball.x.push(200 + a);
        ball.y.push(200 + a);
    } else {
        ball.color.push(random(0, 255));
        ball.x.push(random(200, 400));
        ball.y.push(random(200, 400));
    }
    ball.s.push(random(10, 20));
    ball.velocity.x.push(0);
    ball.velocity.y.push(0);
    ball.history.x.push([]);
    ball.history.y.push([]);
}
var drag = ((ball.s + (3.14)) / 2);
var mx = 0;
var my = 0;
var dog = 0;
draw = function () {
    for (var frameSkip = 0; frameSkip < 2; frameSkip++) {
        colorMode(HSB);
        if (mx !== mouseX || my !== mouseY || pathFinder === false || mouseIsPressed) {
            background(0);
            dog = 0;
        } else {
            dog++;
        }
        for (var a = 0; a < numOfObjects; a++) {
            if (collision === true) {
                if (ball.y[a] > height - (ball.s[a] / 2) || ball.y[a] < (ball.s[a] / 2)) {
                    ball.velocity.y[a] = -ball.velocity.y[a];
                }
                if (ball.x[a] < (ball.s[a] / 2) || ball.x[a] > width - (ball.s[a] / 2)) {
                    ball.velocity.x[a] = -ball.velocity.x[a];
                }
            }
            ball.velocity.x[a] += (mouseX - ball.x[a]) / (((ball.s[a] + (3.14)) / 2));
            ball.x[a] += ball.velocity.x[a] / (((ball.s[a] + (3.14)) / 2) * ball.s[a]);
            ball.velocity.y[a] += (mouseY - ball.y[a]) / (((ball.s[a] + (3.14)) / 2));
            ball.y[a] += ball.velocity.y[a] / (((ball.s[a] + (3.14)) / 2) * ball.s[a]);
            ball.history.x[a].push(ball.x[a]);
            ball.history.y[a].push(ball.y[a]);
            if (randomColors === false) {
                fill(255, 0, 255);
            } else {
                fill(ball.color[a], 255, 255);
            }
            noStroke();
            if (mouseIsPressed) {
                ball.velocity.x[a] -= ball.velocity.x[a] / 20;
                ball.velocity.y[a] -= ball.velocity.y[a] / 20;
            }
            if (mx !== mouseX || my !== mouseY || pathFinder === false || mouseIsPressed) {
                ellipse(ball.x[a], ball.y[a], ball.s[a], ball.s[a]);
            } else {
                if (randomColors === false) {
                    stroke(255, 0, 255, 100);
                } else {
                    stroke(ball.color[a], 255, 255, 100);
                }
                if (frameCount < weird) {
                    line(ball.x[a], ball.y[a], ball.history.x[a][oogadooga - abs(frameCount) + 1], ball.history.y[a][oogadooga - abs(frameCount) + 1]);
                } else {
                    line(ball.x[a], ball.y[a], ball.history.x[a][oogadooga - abs(weird) + 1], ball.history.y[a][oogadooga - abs(weird) + 1]);
                }
            }
            noStroke();
        }
        oogadooga++;
        mx = mouseX;
        my = mouseY;
    }
};
