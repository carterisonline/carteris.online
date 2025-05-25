/**
 *                                                                    ATTENTION! ATTENTION!
                                                BEFORE USING THIS PROGRAM FOR DEVELOPMENTAL
                                            PURPOSES, YOU NEED TO CHANGE THE HEIGHT TO 800.
                                            
                                    THIS CAN BE DONE BY ADDING (without quotes) "?height=800"
                                                                    TO THE END OF YOUR URL.
                                    
                                              You should also enable devmode (set it to true)
                                                          so that you can see your character.
**/



var castSpeed = 10; // Higher Adds less detail, but more framerate.
var compression = 1; //Improves Framerate but compresses background objects
var turnspeed = 1; // Speed of player turning
var speed = 1; //Speed of player walking
var devmode = true;
{/**

    Hey There! So, prehaps I should explain this.
    
    Ray-Casting is not a new idea. It was used in games like Wolfenstein 3D and DOOM. I          always saw 3D games here on Khan Academy and thought they were a pain to work with, 
    specifically the program forcefully restarting everytime you change a single line of code
    
    So, I wanted to change things up. Maybe make an engine which relies on the 2D structures     and makes them look like 3D.
    
    Let me break this down for you.
    
    What Ray-Casters do is shoot a bunch of rays at a 2D surface. When a ray hits an object,     it stops the ray from moving and continues with the rest until all of the rays have been     stopped.
    
    Once the rays are done casting, the distances of each of the rays (from the player to the     object) is measured and calculated.
    
    Once that's done, the program creates a bunch of vertical lines on the screen. The taller     the line, the closer the object was to the player. This creates a 3D image.
    
    What's useful about ray-tracers is that you can see a bird's-eye-view of the 2D map and     the player and change it in real time. This makes it so where you can edit an entire level     at once and not have to move around your character in the 3D space.
    
    Essentially, what ray-tracers do is turn a 2D map into a 3D image. It's not *real* 3D,       but it sure looks like it!
    
    If you have any questions, you can ask so in the new Questions tab in the comments. I'll     be happy to reach out to every one of you .
    
**/}
{
    var moved = [];
    var fc = [0.01, 0.01];
    var fram = 0.01;
    var fin = 0;
    var wallc = [];
    var asmooth = 1;
    var com = 0.5;
    var obsx = [];
    var obsy = [];
    var obsw = [];
    var obsh = [];
    var c = [];
    var x = [];
    var y = [];
    var stop = [];
    var px = 200;
    var py = 200;
    var wall = [];
    var basesize = 400;
    var fov = 100;
    var numid = 0;
    var addto = 0;
    var lagto = [];
    var mm = 0;
    var r = 1;
} //Scary Variables
var obs = function (x, y, w, h, t) {
    fill(0, 0, 0);
    rect(x, y, w, h);
    obsx[t] = x;
    obsh[t] = h;
    obsy[t] = y;
    obsw[t] = w;
};

draw = function () {
    fin++;
    if (fin > 60) {
        if (px !== moved[0] && py !== moved[1]) {
            fin = 0.01; fram = 0.01; fc[0] = 0.01; fc[1] = 0.01;
        } else {
            fc[0] += round((fram / fin) * 100);
            fc[1]++;
            fin = 0.01; fram = 0.01;
        }
        moved[0] = px;
        moved[1] = py;
    }

    var cons = function (inp) {
        if (lagto[inp + (fov / 2)] < 1) {
            addto++;
        }
        lagto[inp + (fov / 2)]++;
        if (devmode === true) {
            wall[inp + (fov / 2)] = (dist(0, 0, x[inp + (fov / 2)], y[inp + (fov / 2)]));
        }
        stop[inp + (fov / 2)] = 1;
    };
    if (keyIsPressed && keyCode === LEFT_ARROW) { r -= turnspeed; }
    if (keyIsPressed && keyCode === RIGHT_ARROW) { r += turnspeed; }
    if (keyIsPressed && keyCode === UP_ARROW) {
        px += cos(r) * speed;
        py += sin(r) * speed;
    } if (keyIsPressed && keyCode === DOWN_ARROW) {
        px -= cos(r) * speed;
        py -= sin(r) * speed;
    } px = constrain(px, 0, 400);
    py = constrain(py, 0, 400);
    background(255, 255, 255);
    fill(148, 148, 148);
    if (numid < 1) {
        for (var e = 0; e < fov; e += 1) {
            obsx[e] = 0;
            obsy[e] = 0;
            obsw[e] = 0;
            obsh[e] = 0;
            c[e] = 0;
            stop[e] = 0;
            lagto[e] = 0;
            wall[e] = 0;
        }
    }
    numid++;
    for (var b = 0; b < fov; b++) {
        if (stop[b] !== 1) {
            c[b] += (castSpeed + (addto * (compression / 100))) * asmooth;
        }
    }
    if (addto > fov - 1) {
        fram++;
        for (var z = 0; z < fov; z++) {
            if (devmode === false) {
                wall[z] = dist(0, 0, x[z], y[z]);
            }
            x[z] = 0;
            y[z] = 0;
            c[z] = 0;
            lagto[z] = 0;
            mm++;
            stop[z] = 0;
            addto = 0;
        }
    }
    obs(83, 60, 350, 37, 0);
    obs(83, 95, 35, 103, 1);
    obs(83, 162, 254, 37, 2);
    obs(166, 265, 79, 139, 3);
    obs(322, 265, 79, 32, 4);
    obs(57, 265, 41, 104, 5);
    obs(91, 265, 83, 29, 6);
    pushMatrix();
    translate(px, py);
    stroke(0, 0, 0);
    for (var a = 0 - (fov / 2); a < fov / 2; a += 1) {
        x[a + (fov / 2)] = cos(a + r) * c[a + fov / 2];
        y[a + (fov / 2)] = sin(a + r) * c[a + fov / 2];
        if (devmode === true) {
            if (stop[a + (fov / 2)] === 0) {
                stroke(0, 0, 0);
            } else { stroke(255, 0, 0); }
            line(0, 0, x[a + (fov / 2)], y[a + (fov / 2)]);
        }
        for (var bbc = 0; bbc < asmooth; bbc++) {
            if (x[a + (fov / 2)] > width - px || x[a + (fov / 2)] < -px || y[a + (fov / 2)] > 400 - py || y[a + (fov / 2)] < -py) {
                cons(a);
            } for (var d = 0; d < obsx.length; d++) {
                if (x[a + (fov / 2)] > obsx[d] - px && y[a + (fov / 2)] > obsy[d] - py && y[a + (fov / 2)] < obsy[d] + obsh[d] - py && x[a + (fov / 2)] < obsx[d] + obsw[d] - px) { cons(a); }
            }
        }
    }

    popMatrix();
    noStroke();
    rect(0, height - 400, 400, 400);
    fill(58, 70, 74);
    rect(0, height - 200, 400, 200);
    pushMatrix();
    for (var wx = 0; wx < width; wx++) {
        var form = ((basesize - wall[wx]) - (cos((wx * -2.8) + r)) * -20);
        var form2 = (form + (basesize - wall[wx + 1]) - (cos((wx * -2.8) + r)) * -20) / 2;
        var form3 = (form + form2) / 2;
        var form4 = (form2 + (basesize - wall[wx + 1]) - (cos((wx * -2.8) + r)) * -20) / 2;
        if (form > 0) {
            fill(((basesize / 3) - wall[wx] / 5));
            rect(wx * (width / fov), height - 200 - (form / 2), 1, form);
            rect(wx * (width / fov) + 2, height - 200 - (form2 / 2), 1, form2);
            rect(wx * (width / fov) + 1, height - 200 - (form3 / 2), 1, form3);
            rect(wx * (width / fov) + 3, height - 200 - (form4 / 2), 1, form4);
        }
    }
    popMatrix();
    fill(238, 255, 0);
    if (round(fc[0] / fc[1]) < 5) { fill(255, 0, 0); }
    if (round(fc[0] / fc[1]) > 1) {
        text(round(fc[0] / fc[1]) + " fps", 11, height - 400 + 21);
    } else { fill(238, 255, 0); text("FPS Calculating...", 11, height - 400 + 21); }
};
