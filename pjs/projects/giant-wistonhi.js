noStroke();

var faceSize = 30;
var mouthSize = faceSize / 2;
var eyeSize = faceSize / 7;
var x = 200;
var y = 193;

// face
fill(255, 255, 0);
ellipse(x, y, faceSize, faceSize);

// eyes
fill(46, 46, 41);
ellipse(x - faceSize / 6, y - faceSize / 6, eyeSize, eyeSize);
ellipse(x + faceSize / 3, y - faceSize / 5, eyeSize, eyeSize);

// mouth
fill(252, 65, 65);
ellipse(x + faceSize / 6, y + faceSize / 7, mouthSize, mouthSize);