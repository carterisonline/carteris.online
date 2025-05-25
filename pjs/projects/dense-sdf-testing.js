/*jshint moz:true*/

/*
    Hello! It's been a while.

    I'm starting to "hit the ceiling" with my skills in operating systems development. Not to say I've mastered it, but I'd like to broaden my knowledge a bit while I'm still in school.
    
    Anyways! I'm completely unfamiliar with the world of realtime graphics, and I wanted to start off by implementing this new technique called Radiance Cascades (https://arxiv.org/abs/2408.14425)
    
    One issue with ray tracing/casting is finding out whether or not the ray of light collides with an object. Every pixel has its own ray cast from each light source, and one easy (but SLOOOOW) way to do it is to check EVERY PIXEL to see if ANY of them collide with EACH RAY. With a resolution of 1920x1080, and a wimpy 10 lights, that means we need to do (1920 * 1080) * (1920 * 1080) * 10 = (2,073,600) * (2,073,600) * 10 = 42,998,169,600,000 CHECKS!!!!!! Obviously, doing 42 trillion checks each frame is off the table, so we'll have to try something else.
    
    This is where Signed Distance Functions (SDFs) come in clutch. Here's an exercise: Imagine you have your eyes closed, and you're told that the closest wall is 5 steps away. How many steps can you take before you hit a wall? 5! This same idea applies to raytracing. For each pixel, we start at our light source. Then, we use a SDF that we've already computed to determine the distance to the closest wall. We move that distance in the direction of our target pixel, and check again, and so on. If we can reach our target pixel within the safe distance, then there are no walls in the way, and we can light up our pixel. If we ever get a distance less than 1 from any wall, we assume that our path is blocked, and cast the target pixel in a shadow. With the same resolution and light count, this technique costs ((1920 * 1080) + (1920 * 1080)) * 10 = 20,736,000 checks - which seems like a lot, but it's 2 MILLION times less than before, and modern GPUs can do 20M checks quite easily.
*/

const BIG = 0xfffff;

function numToString(s, sigdigs) {
    return s.toLocaleString(undefined, { maximumFractionDigits: sigdigs });
}

function distSq(point) {
    return sq(point[0]) + sq(point[1]);
}

function SDF(layerSize, grid) {
    this.layerSize = layerSize;
    this.span = width / layerSize;
    this.grid = grid;

    this.getPoint = function (x, y) {
        return this.grid[y][x];
    };

    this.setPoint = function (x, y, val) {
        this.grid[y][x] = val;
    };

    this.compare = function (p, x, y, dx, dy) {
        if (x + dx >= this.layerSize || x + dx < 0 || y + dy >= this.layerSize || y + dy < 0) {
            return p;
        }

        const other = [this.grid[y + dy][x + dx][0], this.grid[y + dy][x + dx][1]];
        other[0] += dx;
        other[1] += dy;

        if (distSq(other) < distSq(p)) {
            return other;
        } else {
            return p;
        }
    };

    this.generate = function () {
        // pass 0
        for (let y = 0; y < this.layerSize; y++) {
            for (let x = 0; x < this.layerSize; x++) {
                let p = this.getPoint(x, y);
                p = this.compare(p, x, y, -1, 0);
                p = this.compare(p, x, y, 0, -1);
                p = this.compare(p, x, y, -1, -1);
                p = this.compare(p, x, y, 1, -1);
                this.setPoint(x, y, p);
            }

            for (let x = this.layerSize - 1; x >= 0; x--) {
                let p = this.getPoint(x, y);
                p = this.compare(p, x, y, 1, 0);
                this.setPoint(x, y, p);
            }
        }

        // pass 1
        for (let y = this.layerSize - 1; y >= 0; y--) {
            for (let x = this.layerSize - 1; x >= 0; x--) {
                let p = this.getPoint(x, y);
                p = this.compare(p, x, y, 1, 0);
                p = this.compare(p, x, y, 0, 1);
                p = this.compare(p, x, y, -1, 1);
                p = this.compare(p, x, y, 1, 1);
                this.setPoint(x, y, p);
            }

            for (let x = 0; x < this.layerSize; x++) {
                let p = this.getPoint(x, y);
                p = this.compare(p, x, y, -1, 0);
                this.setPoint(x, y, p);
            }
        }
    };
}

const s = 50;
const grid = [];

for (let i = 0; i < s; i++) {
    grid.push([]);
    for (let j = 0; j < s; j++) {
        grid[i].push([BIG, BIG]);
    }
}

textAlign(LEFT, TOP);
noStroke();

let mx = 0;
let my = 0;

const temp = [];
for (let i = 0; i < s; i++) {
    temp.push([]);
    for (let j = 0; j < s; j++) {
        temp[i].push(0);
    }
}

const sdf = new SDF(s, grid);

draw = function () {
    mx = floor(mouseX / sdf.span);
    my = floor(mouseY / sdf.span);

    if (mouseIsPressed && mouseButton === LEFT) {
        grid[my][mx] = [0, 0];

        for (let x = 0; x < sdf.layerSize; x++) {
            for (let y = 0; y < sdf.layerSize; y++) {
                fill(min(sqrt(sqrt(distSq(sdf.getPoint(x, y)))) * 20, 255));
                rect(x * sdf.span, y * sdf.span, sdf.span, sdf.span);
            }
        }
        sdf = new SDF(s, grid);
    } else {
        sdf.generate();
        for (let x = 0; x < sdf.layerSize; x++) {
            for (let y = 0; y < sdf.layerSize; y++) {
                let rx = mx;
                let ry = my;
                let value = 0;

                const dv = new PVector(x - mx, y - my);
                dv.normalize();

                while (true) {
                    // get distance to the nearest "wall" at current ray pos
                    const dist = sqrt(distSq(sdf.getPoint(floor(rx), floor(ry))));

                    // assume we've hit a wall at a certain threshold
                    if (dist < 1.1415) {
                        break;
                    }

                    // if dist > (distance to point) then the ray has been hit
                    if (dist > sqrt(sq(x - rx) + sq(y - ry))) {
                        value = 3 / sqrt(sq(x - mx) + sq(y - my));
                        break;
                    }

                    // else, march the ray the safe distance and loop
                    rx += dv.x * dist;
                    ry += dv.y * dist;
                }

                fill(min(value * 0xff, 255));
                rect(x * sdf.span, y * sdf.span, sdf.span, sdf.span);
            }
        }
    }


};
