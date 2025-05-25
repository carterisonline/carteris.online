function ellipse_normal(x, y, w, h) {
    ellipse((x + 1) * (width / 2),
        (y + 1) * (height / 2),
        w * (width / 2),
        h * (height / 2));
}

function point_normal(x, y) {
    point((x + 1) * (width / 2),
        (y + 1) * (height / 2));
}

function line_normal(x1, y1, x2, y2) {
    line((x1 + 1) * (width / 2),
        (y1 + 1) * (height / 2),
        (x2 + 1) * (width / 2),
        (y2 + 1) * (height / 2));
}

function projection_map(name, data, pos, rad) {
    this.name = name;

    this.pos = pos;
    this.rad = rad;

    this.left_origin = data.lo;
    this.right_origin = data.ro;
    this.left_dest = data.ld;
    this.right_dest = data.rd;
    this.center_origin = data.co;
    this.center_dest = data.cd;

    return this;
}

function cam(name, x, y, rad) {
    this.fov = 90;
    this.name = name;
    this.rad = rad;
    this.pos = new PVector(x, y);
    this.rot = 49;

    this.use_display = false;

    this.display_compositor = [];

    this.project = function (target_obj) {
        var data = {
            lo: 0,
            ro: 0,

            ld: 0,
            rd: 0,

            co: 0,
            cd: 0,
        };

        data.lo = new PVector(
            this.pos.x + (this.rad * sin(this.rot - this.fov / 2)),
            this.pos.y + (this.rad * cos(this.rot - this.fov / 2))
        );

        data.ro = new PVector(
            this.pos.x + (this.rad * sin(this.rot + this.fov / 2)),
            this.pos.y + (this.rad * cos(this.rot + this.fov / 2))
        );

        data.rd = new PVector(
            target_obj.pos.x + (target_obj.rad * sin(this.rot + 90)),
            target_obj.pos.y + (target_obj.rad * cos(this.rot + 90))
        );
        data.ld = new PVector(
            target_obj.pos.x + (target_obj.rad * sin(this.rot - 90)),
            target_obj.pos.y + (target_obj.rad * cos(this.rot - 90))
        );

        data.co = new PVector(
            this.pos.x + (this.rad * sin(this.rot)),
            this.pos.y + (this.rad * cos(this.rot))
        );

        data.cd = new PVector(
            target_obj.pos.x + (target_obj.rad * sin(this.rot)),
            target_obj.pos.y + (target_obj.rad * cos(this.rot))
        );

        var default_angle = atan2(data.cd.x - data.co.x,
            data.cd.y - data.co.y);

        var final_size = abs(default_angle - atan2(data.ld.x - data.lo.x, data.ld.y - data.lo.y)) + abs(default_angle - atan2(data.rd.x - data.ro.x, data.rd.y - data.ro.y));

        if (this.use_display) {
            var obj_out = new projection_map(target_obj.name,
                data,
                target_obj.pos,
                target_obj.rad);

            var match = null;
            for (var i = 0; i < this.display_compositor.length; i++) {
                if (this.display_compositor[i].name === target_obj.name) {
                    match = i;
                    break;
                }
            }
            if (match === null) {
                this.display_compositor.push(obj_out);
            } else {
                this.display_compositor[match] = obj_out;
            }
        }

        return final_size;
    };
    this.display_2d = function () {

        if (!this.use_display) { //Handle Error 100
            println("<Camkit> <!WARN: (#100)\nthis.display_2d was invoked for Camera " + this.name + ", but the method use_display was disabled. For projection stability:\n\b>> run: " + this.name + ".use_display = true;");
        }

        stroke(0, 0, 0);
        ellipse_normal(this.pos.x,
            this.pos.y,
            this.rad * 2,
            this.rad * 2);

        stroke(255, 0, 0);
        strokeWeight(10);

        point_normal(this.pos.x + (this.rad * sin(this.rot - this.fov / 2)),
            this.pos.y + (this.rad * cos(this.rot - this.fov / 2)));

        point_normal(this.pos.x + (this.rad * sin(this.rot + this.fov / 2)),
            this.pos.y + (this.rad * cos(this.rot + this.fov / 2)));

        for (var i = 0; i < this.display_compositor.length; i++) {
            stroke(0, 0, 0);
            strokeWeight(1);
            ellipse_normal(this.display_compositor[i].pos.x,
                this.display_compositor[i].pos.y,
                this.display_compositor[i].rad * 2,
                this.display_compositor[i].rad * 2);
            stroke(255, 0, 0);
            strokeWeight(10);
            point_normal(this.display_compositor[i].left_dest.x,
                this.display_compositor[i].left_dest.y);
            point_normal(this.display_compositor[i].right_dest.x,
                this.display_compositor[i].right_dest.y);
            point_normal(this.display_compositor[i].center_origin.x,
                this.display_compositor[i].center_origin.y);
            point_normal(this.display_compositor[i].center_dest.x,
                this.display_compositor[i].center_dest.y);

            stroke(0, 255, 0);
            strokeWeight(1);
            line_normal(
                this.display_compositor[i].left_dest.x,
                this.display_compositor[i].left_dest.y,
                this.display_compositor[i].left_origin.x,
                this.display_compositor[i].left_origin.y
            );

            line_normal(
                this.display_compositor[i].right_dest.x,
                this.display_compositor[i].right_dest.y,
                this.display_compositor[i].right_origin.x,
                this.display_compositor[i].right_origin.y
            );

            line_normal(
                this.display_compositor[i].center_dest.x,
                this.display_compositor[i].center_dest.y,
                this.display_compositor[i].center_origin.x,
                this.display_compositor[i].center_origin.y
            );
        }
    };
}

function obj(name, x, y, rad) {
    this.name = name;
    this.rad = rad;
    this.pos = new PVector(x, y);
}

var indivText = function (input, x, y, s, i) {
    for (var a = 0; a < input.length; a++) {
        fill(random(220, 255), i * 2.55);
        textSize(s * 1.3);
        text(input[a], s * a + x, y);
        fill(0, 73, 84, i);
        text(input[a], s * a + x, y);
    }
};
var notification = function (text, category) {
    this.arn = 51;
    this.x = -text.length * 22;
    this.bss = floor(random(1, 20));
    this.count = 0;
    this.opa = 0;
    this.display = function () {
        if (frameCount - (floor(frameCount / this.bss) * this.bss) === 0) {
            this.bss = floor(random(1, 5));
            if (this.count > 400 && this.count < 1000) {
                this.x -= 5;
            } else if (this.count < 400) {
                this.x -= this.x / (this.bss * 2) - 1;
            }
        }
        this.count++;
        if (this.count > 100 && this.count - (floor(this.count / 60) * 60) === 30 && this.count < 401) {
            playSound(getSound("rpg/metal-clink"));
            this.opa = 0;
        } if (this.count > 100 && this.count - (floor(this.count / 60) * 60) === 0 && this.count < 401 || this.count < 30) {
            this.opa = 100;
        }
        for (var a = 0; a < this.arn; a++) {

            stroke(0, 0, 0, this.opa * (255 / 100));
            if (a - floor(a / 2) * 2 === 0) {
                stroke(0, 67, 112, this.opa);
            }
            line(this.x, 466 + a, (text.length * 11) + this.x, 466 + a);
        }
        indivText(text, this.x + 8, 483, 10, this.opa);
        indivText('From ' + category, this.x + 10, 498, 7, this.opa);
    };
};

var devMode = 1;
var ship = {
    camview: new cam("camview", 0, 0, 1000), //change size pls

    r: 0,
    x: 0,
    y: 0,
    z: 0,
    ry: 90,
    rumble: 10,
    rcon: 0,
    target: {
        x: 1,
        y: 1,
    },
    current: {
        x: 1,
        y: 1,
    },
    node: {
        x: [-21, 21, 0, 0, 0, 11, -12, -56, 56, -45, 45],
        y: [1, 1, 0, 1, -49, -39, -39, 15, 15, 5, 5],
        z: [0, 0, 130, 0, 7, 30, 30, -69, -69, -9, -9],
    },
    mem: {
        x: [-21, 21, 0, 0, 0, 11, -12, -56, 56, -45, 45],
        y: [1, 1, 0, 1, -49, -39, -39, 15, 15, 5, 5],
        z: [0, 0, 130, 0, 7, 30, 30, -69, -69, -9, -9],
    },
    fill: {
        front: color(79, 79, 79),
        lfront: color(84, 84, 84),
        rfront: color(84, 84, 84),
        lwing: color(62, 81, 94),
        rwing: color(62, 81, 94),
        top: color(64, 64, 64)
    },
    rotate: {
        z: function (t) {
            for (var za = 0; za < ship.node.x.length; za++) {
                var phx = ship.node.x[za];
                var phy = ship.node.y[za];
                ship.node.x[za] = phx * cos(t) - phy * sin(t);
                ship.node.y[za] = phy * cos(t) + phx * sin(t);
            }
        },
        x: function (t) {
            for (var xa = 0; xa < ship.node.x.length; xa++) {
                var phz = ship.node.z[xa];
                var phy = ship.node.y[xa];
                ship.node.y[xa] = phy * cos(t) - phz * sin(t);
                ship.node.z[xa] = phz * cos(t) + phy * sin(t);
            }
        },
        y: function (t) {
            for (var ya = 0; ya < ship.node.x.length; ya++) {
                var phx = ship.node.x[ya];
                var phz = ship.node.z[ya];
                ship.node.x[ya] = phx * cos(t) - phz * sin(t);
                ship.node.z[ya] = phz * cos(t) + phx * sin(t);
            }
        },
    },
    con: function (t, y) {
        line(ship.node.x[t], ship.node.y[t], ship.node.x[y], ship.node.y[y]);
    },
    triad: function (t, y, j) {
        triangle(ship.node.x[t], ship.node.y[t], ship.node.x[y], ship.node.y[y], ship.node.x[j], ship.node.y[j]);
    },
    stereo: function () {
        if (mouseIsPressed) {
            ship.target.x -= pmouseX - mouseX;
            ship.target.y -= pmouseY - mouseY;
        } else {
            ship.target.x = 1;
            ship.target.y = 1;
            for (var a = 0; a < ship.node.x.length; a++) {
                var bcd = 44;
                if (a !== 4) { bcd = 10; }
                ship.node.x[a] -= (ship.node.x[a] - ship.mem.x[a]) / bcd;
                ship.node.y[a] -= (ship.node.y[a] - ship.mem.y[a]) / bcd;
                ship.node.z[a] -= (ship.node.z[a] - ship.mem.z[a]) / bcd;
            }
        }
        ship.current.x -= (ship.current.x - ship.target.x) / 44;
        ship.current.y -= (ship.current.y - ship.target.y) / 44;
        ship.rotate.y(-(ship.current.x - ship.target.x) / 155);
        ship.rotate.x(-(ship.current.y - ship.target.y) / 155);
    },
    draw: function () {
        pushMatrix();
        translate(width / 2, height / 2);
        /*for(var a = 0; a < ship.node.x.length; a++){
            ellipse(ship.node.x[a],ship.node.y[a],10,10);
        }*/
        ship.con(0, 1); ship.con(1, 2); ship.con(0, 2); ship.con(0, 4); ship.con(1, 4); ship.con(2, 5); ship.con(2, 6); ship.con(4, 5); ship.con(4, 6); ship.con(6, 0); ship.con(5, 1); ship.con(0, 7); ship.con(1, 8); ship.con(0, 9); ship.con(7, 9); ship.con(1, 10); ship.con(8, 10);
        fill(ship.fill.top); ship.triad(6, 2, 0); ship.triad(6, 2, 1); ship.triad(6, 2, 5); ship.triad(6, 4, 5); fill(ship.fill.lfront); ship.triad(6, 4, 0); fill(ship.fill.rfront); ship.triad(5, 4, 1); fill(ship.fill.front); ship.triad(0, 4, 1); fill(ship.fill.lwing); ship.triad(0, 9, 7); fill(ship.fill.rwing); ship.triad(1, 8, 10);
        popMatrix();
    },
    controls: function () {
        ship.camview.pos.x = ship.x;
        ship.camview.pos.y = ship.z;
        //ship.camview.rot = ship.r;
        if (keyIsPressed && key.toString() === " ") {
            ship.rumble += 0.01;
            ship.rcon = 1;
        } else {
            ship.rumble -= 0.03;
        }
        ship.r += ship.node.x[2] / 100;
        ship.ry += ship.node.y[2] / 100;
        ship.x += cos(ship.r) * ship.rumble * 100;
        ship.z += sin(ship.r) * ship.rumble * 100;
        ship.rumble = constrain(ship.rumble, 0, Infinity);
    },
    rumblecon: function () {
        if (ship.rcon === 1) {
            ship.rumble = constrain(ship.rumble, 0, 3);
        } else {
            ship.rumble = constrain(ship.rumble, 0, 10);
        }
        translate(random(-ship.rumble, ship.rumble), random(-ship.rumble, ship.rumble));
    },
};

var r255 = function () { return random(0, 255); };

var currentSystemID = 0;
var systems = [];
var systemNames = ["Sigma", "Unica", "Pi", "Abugida", "Yuvati", "Zeta", "Eta", "Vandor", "Alpha", "Tori", "Vega", "Unicae", "Caroli", "Lukida", "Keyser", "Gomeisa", "Delta", "Fornacis", "Alrai", "Paloma", "Corvi", "Epsilon", "Vendrizi", "Lambda", "Carina", "Omicron", "Penduli", "Rho", "Cassiopeie", "Beta", "Columbae", "Omicron", "Odysseus", "Omega", "Luna", "Iliad", "Planar", "Riftin", "Helio"];

var system = function () {
    this.id = round(random(1, 26));
    this.name = systemNames[round(random(0, systemNames.length - 1))];
    this.xSize = 100000;
    this.ySize = 100000;
    this.zSize = 100000;
};
systems[0] = new system();
var currentSystem = systems[currentSystemID];
ship.x = -currentSystem.xSize * 1.5;

var stars = [];

var starSpeed;

var star = function () {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);

    this.update = function () {
        this.z = this.z - starSpeed;
        if (this.z < 1) {
            this.z = width;
            this.x = random(-width / 2, width / 2);
            this.y = random(-height / 2, height / 2);
        } if (starSpeed < 1 && this.x > width / 2 || this.x < -width / 2 || this.y > height / 2 || this.y < -height / 2) {
            this.z = random(0, width);
            if (this.x > width / 2) {
                this.x = -width / 2;
                this.y = random(-height / 2, height / 2);
            } if (this.x < -width / 2) {
                this.x = width / 2;
                this.y = random(-height / 2, height / 2);
            } if (this.y > height / 2) {
                this.x = random(-width / 2, width / 2);
                this.y = -height / 2;
            } if (this.y < -height / 2) {
                this.x = random(-width / 2, width / 2);
                this.y = height / 2;
            }
        }
    };

    this.show = function () {
        fill(255);
        noStroke();
        var f = constrain(ship.rumble / 3, 0, 1);

        var sx = map(this.x / ((this.z * (f)) + width / 2), 0, 1, 0, width);
        var sy = map(this.y / ((this.z * (f)) + width / 2), 0, 1, 0, height);

        var r = map(this.z, 0, width, 16, 0);
        fill(255, this.z / (width / 255));
        ellipse(sx, sy, r / 4, r / 4);

        this.pz = this.z;

    };
};
for (var i = 0; i < 800; i++) {
    stars[i] = new star();
}


var planet = function () {
    this.size = random(5000, 10000);
    this.x = random(-currentSystem.xSize + this.size, currentSystem.xSize - (this.size));
    this.z = random(-currentSystem.zSize + this.size, currentSystem.zSize - (this.size));
    this.y = random(-1, 1);
    this.color = color(r255(), r255(), r255());
    this.miniMap = function () {
        fill(this.color);
        ellipse((this.x / currentSystem.xSize) * (width / 2) + width / 2, (this.z / currentSystem.zSize) * (height / 2) + height / 2, this.size / currentSystem.xSize * width / 2, this.size / currentSystem.zSize * height / 2);
    };
    this.display = function () {
        var angle = -atan2((this.x - ship.x), (this.z - ship.z));
        var objectperm = new obj("temp", this.x, this.z, this.size);
        var distance = ship.camview.project(objectperm) * ((width * 2) / 360);
        var calc = ((angle - ship.r) / 180);
        var calc2 = ((-ship.ry) / 180) + this.y;
        if (calc < -2) { calc += 2; }
        if (calc2 < -2) { calc2 += 2; }
        var bee = 1 - constrain(sq(distance) / (sq(900) / 2), 1, 2) + 1;
        fill(red(this.color) / bee, green(this.color) / bee, blue(this.color) / bee, 10);
        for (var s = distance; s < distance * 1.1 + 20; s++) {
            ellipse(width * 2 * calc + width * 1.5, height * 2 * calc2 + height * 1.5, s, s);
        }
        fill(red(this.color) / bee, green(this.color) / bee, blue(this.color) / bee);
        ellipse(width * 2 * calc + width * 1.5, height * 2 * calc2 + height * 1.5, distance, distance);
    };

};
var planets = [];
for (var i = 0; i < 4; i++) {
    planets[i] = new planet();
}

var miniMap = function () {
    stroke(255, 255, 255);
    fill(255, 255, 255);
    if (devMode === 1) {
        pushMatrix();
        scale(0.25);
        strokeWeight(4);
        translate(30, 29);
        stroke(255, 255, 255);
        fill(31, 31, 31);
        rect(0, 0, width, height);
        noStroke();
        for (var a = 0; a < planets.length; a++) {
            planets[a].miniMap();
        }
        stroke(255, 255, 255);
        var stx = (ship.x / currentSystem.xSize) * (width / 2) + (width / 2);
        var stz = (ship.z / currentSystem.zSize) * (height / 2) + (width / 2);
        fill(255, 255, 255);
        ellipse(stx, stz, 10, 10);
        line(stx, stz, stx + (40 * cos(ship.r)), stz + (40 * sin(ship.r)));
        popMatrix();
    }
};

var systemDisplayName = new notification('Welcome to ' + currentSystem.name + ' ' + currentSystem.id, 'From Galaxy Map');

background(0, 0, 0);
draw = function () {
    if (ship.r < 0) { ship.r += 360; }
    if (ship.r > 360) { ship.r -= 360; }
    if (ship.ry < 0) { ship.ry += 360; }
    if (ship.ry > 360) { ship.ry -= 360; }
    if (ship.rumble < 4) {
        ship.x = constrain(ship.x, -currentSystem.xSize, currentSystem.xSize);
    }
    ship.y = constrain(ship.y, -currentSystem.ySize, currentSystem.ySize);
    ship.z = constrain(ship.z, -currentSystem.zSize, currentSystem.zSize);
    pushMatrix();
    noStroke();
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);

    ship.controls();
    ship.rumblecon();

    pushMatrix();
    starSpeed = map(ship.rumble * 100, 0, width, 0, 50);
    translate(width / 2, height / 2);
    for (var i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
        stars[i].x -= ship.node.x[2] / 45;
        stars[i].y -= ship.node.y[2] / 45;
    }
    popMatrix();
    for (var a = 0; a < planets.length; a++) {
        planets[a].display();
    }
    noStroke();
    ship.stereo();
    ship.draw();
    popMatrix();
    miniMap();
    systemDisplayName.display();
};