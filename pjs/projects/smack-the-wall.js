var numnodes = 40;//length of both ropes


var nodeaccx = [];
var nodeaccy = [];
var nodeaccx2 = [];
var nodeaccy2 = [];
var hitswitch = 0;
var score = 0;
var nodes = [];
var FollowMouse = true;
var change = false;//mode
var linear = function (x, y, w, h, o, p) { for (var a = 0; a < w; a++) { stroke(lerpColor(o, p, a * (1 / w))); line(a + x, 0 + y, a + x, y + h); } };
var obj = function (i) {
    this.i = i;
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0, 0);
    if (i > 0) {
        this.origin = new PVector(nodes[i - 1].position.x, nodes[i - 1].position.y);
        this.position = new PVector(random(-20, 20), random(-20, 20));
    } else {
        this.origin = new PVector(0, 0);
        this.position = new PVector(200, 100);
    }
    this.position.add(this.origin);
    this.length = 10;
};//section (circle) of the rope
obj.prototype.draw = function () {
    fill(255, 0, 0);
    ellipse(this.position.x, this.position.y, 10, 10);
}; //draw circle
obj.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.mult(0.98);
}; //move circle with acc and vel
obj.prototype.move = function () {
    if (this.i > 0) {
        this.origin = new PVector(nodes[this.i - 1].position.x, nodes[this.i - 1].position.y);
    }
    var gravity = new PVector(0, 0.2 * (change === true ? -1 : 1));
    this.acceleration.add(gravity);
    if (this.position.y >= height) {
        this.velocity.mult(-0.1);
        this.position.y = height;
    }
    var force = PVector.sub(this.position, this.origin);
    var dist = force.mag();
    force.normalize();
    if (dist > this.length) {
        var force2 = PVector.mult(force, this.length);
        this.position = new PVector(force2.x, force2.y);
        this.position.add(this.origin);
        if (this.i !== nodes.length) {
            dist -= this.length;
            force.mult(-dist * 0.05 / 2);
            this.acceleration.add(force);
        }
    }
};// change acc and vel based on gravity and others
nodes[0] = new obj(0);
for (var l = 0; l < numnodes; l++) {
    nodes[l + 1] = new obj(l + 1);
}//create random rope circles
var clouds = [];
for (var x = 0; x < 100; x++) {
    clouds.push([random(-800, -100), random(20, 380), random(2, 6)]);
}//cloud
draw = function () {
    nodeaccx.push(nodes[numnodes].position.x);
    nodeaccy.push(nodes[numnodes].position.x);
    background(!change ? color(0, 220, 255) : color(0, 130, 0));
    fill(0, 90, 0);
    if (change) {
        for (var x = -40 + (frameCount * 10) % 45; x < 390; x += (400 - x) / 10) {
            rect(0, 380 - x, 400, (400 - x) / 20);
        }//aesthetics
    } else {
        fill(255, 255, 255, 30);
        noStroke();
        for (var x = 0; x < clouds.length; x++) {
            ellipse(clouds[x][0], clouds[x][1], 180, 6);
            clouds[x][0] += clouds[x][2];
            if (clouds[x][0] > width + 70) {
                clouds[x][0] = -70;
                clouds[x][1] = random(20, 380);
                clouds[x][2] = random(2, 6);
            }
        }
    }
    noStroke();
    for (var l = 1; l < nodes.length; l++) {
        nodes[l].move();

    }//check distances and positions
    stroke(0);
    for (var l = nodes.length - 1; l > 2; l--) {
        var force = PVector.div(nodes[l].acceleration, 1.6);
        nodes[l - 1].acceleration.add(force);
    }//update pos, acc and vel
    strokeWeight(40);
    noStroke();
    for (var l = nodes.length - 1; l > 0; l--) {
        fill(0, (sin(l * 25)) * 80 + 150, 0);
        nodes[l].update();
        if (change) {
            ellipse(nodes[l].position.x, nodes[l].position.y, (nodes[l].position.y) / 2, (nodes[l].position.y) / 2);

            nodes[l].length = (nodes[l].position.y) / 12;
        } else {
            fill(105, 78, 8);
            strokeWeight(4);
            stroke(92, 67, 5);
            ellipse(nodes[l].position.x, nodes[l].position.y, 30, 30);
            nodes[l].length = 10;
        }
    }
    if (!change) {
        fill(105, 78, 8);
        strokeWeight(4);
        stroke(92, 67, 5);
        ellipse(nodes[0].position.x, nodes[0].position.y, 30, 30);
    } else {
        fill(0, 150, 0);
        ellipse(nodes[0].position.x, nodes[0].position.y, (nodes[0].position.y) / 2, (nodes[0].position.y) / 2);
    }//add the first cicle
    if (change) {
        for (var x = 0; x < 20; x++) {
            fill(0, 0, 0, 20);
            rect(0, 0, 400, 1 * x);
        }
    }//dark thing
    mouseMoved = function () {
        if (FollowMouse) {
            nodes[0].position = new PVector(mouseX, mouseY);
        }
    };//follow mouse
    mousePressed = function () {
        if (hitswitch !== 1) {
            change = !change;
        }
    };//change mode
    textAlign(CENTER, CENTER);
    nodeaccx2.push(nodes[numnodes].position.x);
    nodeaccy2.push(nodes[numnodes].position.x);
    if (nodes[numnodes].position.x < 10 && hitswitch !== 1) {
        score = round((abs(round(nodeaccx[nodeaccx.length - 1] - nodeaccx2[nodeaccx2.length - 1])) + abs(round(nodeaccy[nodeaccy.length - 1] - nodeaccy2[nodeaccy2.length - 1]))) / (numnodes / 40));
        hitswitch = 1;
    }
    if (hitswitch === 1) {
        frameRate(10);
        fill(0, 0, 0, 200);
        rect(0, 0, width, height);
        fill(255, 255, 255);
        textSize(50);
        text("Score: " + score, 300, 150);
        textSize(30);
        if (score < 20) { text("Pathetic.", 300, 300); }
        else if (score < 40) { text("...alright.", 300, 300); }
        else if (score < 60) { text("Not Bad!", 300, 300); }
        else if (score < 80) { text("Pretty Good.", 300, 300); }
        else if (score < 100) { text("Great Work!", 300, 300); }
        else if (score < 150) { text("Smashed It!", 300, 300); }
        else if (score < 200) { text("Teared it Apart!", 300, 300); }
        else if (score < 300) { text("Sent it to Heaven!", 300, 300); }
        else if (score < 300) { text("Crucified, Dead, and Buried!", 300, 300); }
        else { text("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", 300, 300); }
        text(numnodes + " Nodes", 300, 350);
        if (mouseIsPressed) { Program.restart(); }
    }
    else {
        linear(0, 0, 100, height, color(125, 125, 125), color(56, 56, 56));
        line(126, 300, 161, 300);
        fill(56, 56, 56);
        triangle(126, 290, 126, 310, 116, 300);
        textSize(15);
        text("Smack", 198, 300);
    }
};
