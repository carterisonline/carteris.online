var MAX_MARCH = 10;
var co = 1;

var imageSize = new PVector(width, height);

function Sphere (x, y, z, r) {
    this.pos = new PVector(x, y, z);
    this.rad = r;
}

var light_pos = new PVector(3, -3, -1);

var spheres = [];
spheres.push(new Sphere(-2.3, -1.2, -13.6, 4.7));
spheres.push(new Sphere(1.0, 2.0, -10.0, 2.7));
spheres.push(new Sphere(-3.5, 2.1, -10.0, 1.1));

function Map (p) {
    var d = PVector.dist(
        p,
        spheres[0].pos
    ) - spheres[0].rad;
    for(var i = 0; i < spheres.length; i++) {
        d = min(
            d,
            PVector.dist(
                p,
                spheres[i].pos
            ) - spheres[i].rad
        );
    }
    return d;
}

function MapB (p) {
    var h = 0;
    var d = PVector.dist(
        p,
        spheres[0].pos
    ) - spheres[0].rad;
    for(var i = 0; i < spheres.length; i++) {
        h += abs(d - (PVector.dist(p,spheres[i].pos) - spheres[i].rad));
        d = min(
            d,
            PVector.dist(
                p,
                spheres[i].pos
            ) - spheres[i].rad
        );
    }
    return h;
}

function CalcNormal (p) {
    var e = new PVector(0.0005, -0.0005);
    
    var mapA = Map(PVector.add(p, new PVector(e.x, e.y, e.y)));
    var mapB = Map(PVector.add(p, new PVector(e.y, e.y, e.x)));
    var mapC = Map(PVector.add(p, new PVector(e.y, e.x, e.y)));
    var mapD = Map(PVector.add(p, new PVector(e.x, e.x, e.x)));
    return PVector.normalize(
        PVector.add(
            PVector.add(
                PVector.mult(
                    new PVector(e.x, e.y, e.y),
                    new PVector(mapA, mapA, mapA)
                ),
                PVector.mult(
                    new PVector(e.y, e.y, e.x),
                    new PVector(mapB, mapB, mapB)
                )
            ),
            PVector.add(
                PVector.mult(
                    new PVector(e.y, e.x, e.y),
                    new PVector(mapC, mapC, mapC)
                ),
                PVector.mult(
                    new PVector(e.x, e.x, e.x),
                    new PVector(mapD, mapD, mapD)
                )
            )
        )
    );
}

function MainImage (x, y) {
    var strokeColor = color(0);
    
    var ro = new PVector(0, 0, 1);
    var q = PVector.div(
        PVector.sub(
            new PVector(x, y), 
            PVector.mult(
                new PVector(0.5, 0.5),
                imageSize
            )
        ),
        height
    );
    var rd = PVector.normalize(
        PVector.sub(
            new PVector(q.x, q.y, 0),
            ro
        )
    );
    var h, t = 1;
    var pad = 0;
    for (var i = 0; i < MAX_MARCH; i++) {
        h = Map(
            PVector.add(
                ro,
                PVector.mult(
                    rd,
                    new PVector(t, t, t)
                )
            )
        );
        t += h;
        if(h < 0.01) {
            pad = MapB(PVector.add(
                ro,
                PVector.mult(
                    rd,
                    new PVector(t, t, t)
                )
            ));
            break;
        }
    }
    if(h < 0.01) {
        var p = PVector.add(
            ro,
            PVector.mult(
                rd,
                t
            )
        );
        var normal = CalcNormal(p);
        var light = light_pos;
        var dif1 = PVector.dot(
            normal,
            PVector.normalize(
                PVector.sub(
                    light,
                    p
                )
            )
        );
        var dif2 = new PVector(
            abs(dif1),
            abs(dif1),
            abs(dif1)
        );
        /*
        var dif2 = new PVector(
            constrain(dif1.x, 0, 1),
            constrain(dif1.y, 0, 1),
            constrain(dif1.z, 0, 1)
        );
        */
        
        var fe = PVector.dot(
                    PVector.sub(
                        light,
                        p
                    ),
                    PVector.sub(
                        light,
                        p
                    )
                );
        var dif = PVector.mult(
            dif2,
            PVector.div(
                new PVector(5, 5, 5),
                new PVector(fe, fe, fe)
            )
        );
        strokeColor = color(
            pow(dif.x, 0.4545) * 255 - sq(pad/2),
            pow(dif.y, 0.4545) * 255 - sq(pad/2),
            pow(dif.z, 0.4545) * 255 - sq(pad/2)
        );
    } else {
        strokeColor = color(0, 0, 0);
    }
    return strokeColor;
}

var xc = 0;
var yc = 0;

background(255, 255, 255);
draw= function() {
    for(var frameSkip = 0; frameSkip < (1/MAX_MARCH)*1500; frameSkip ++) {
        if(xc > width) { xc -= width; yc += co;}
        noStroke();
        if(yc < height) {
            var f = MainImage(xc, yc);
            //println(red(f)+", "+green(f)+", "+blue(f));
            fill(f);
            rect(xc, yc, co, co);
        }
        xc+=co;
    }
};
