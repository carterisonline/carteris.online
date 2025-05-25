/*jshint curly:false*/
/*jshint asi:true*/
/*jshint moz:true*/
/*jshint sub:true*/
/*jshint shadow:outer*/
/*jshint loopfunc:true*/
/*jshint eqeqeq:false*/
angleMode = "radians"
let new_world = {
    worldmap: [
        "################XXXXXXXX",
        "|               X      X",
        "|  /                   X",
        "|  |                   X",
        "|  -            X      X",
        "|  #   *********XX XXXXX",
        "|  *   * * * * *X   XXX/",
        "|  x   *       *X      =",
        "|  X                XXX/",
        "|  =   *       *X      =",
        "|      *       *X   XXX/",
        "|      **** ****XXXXXXX/",
        "xxxxxxxxxxx xxxxxxxxxxxx",
        "|                      |",
        "xxxxxx xxxx xxxxxxxxxxxx",
        "#####x x##x x|||||||----",
        "x        xx x|     |   |",
        "x           x|  *  |   |",
        "x        xx x|     || ||",
        "x x x    xx     *      |",
        "x  *     xx x|     || ||",
        "x x x    xx x|  *  |   |",
        "x        xx x|     |   |",
        "##########///||||||-----",
    ],


    // .,:;*#@
    heightmap: [
        "@@@@@@@@@@@@@@@@@@@@@@@@",
        "@               @      @",
        "@  @                   @",
        "@  @                   @",
        "@  #            @      @",
        "@  *   @@@@@@@@@@@ @@@@@",
        "@  ;   @ @ @ @ @@   @@@@",
        "@  :   @       @@      @",
        "@  ,                @@@@",
        "@  .   @       @@      @",
        "@      @       @@   @@@@",
        "@      @@@@ @@@@@@@@@@@@",
        "@@@@@@@@@@@ @@@@@@@@@@@@",
        "@                      @",
        "@@@@@@ @@@@ @@@@@@@@@@@@",
        "@@@@@@ @@@@ @@@@@@@@@@@@",
        "@        @@ @@     @   @",
        "@           @@  @  @   @",
        "@        @@ @@     @@ @@",
        "@ @ @    @@     @      @",
        "@  @     @@ @@     @@ @@",
        "@ @ @    @@ @@  @  @   @",
        "@        @@ @@     @   @",
        "@@@@@@@@@@@@@@@@@@@@@@@@",
    ]
}

let map_width = new_world.worldmap[0].length
let map_height = new_world.worldmap.length
let world_map = []
let height_map = []
let ri = 1

for (let i in new_world.worldmap) {
    world_map.push([])
    for (let j in new_world.worldmap[i]) {
        let x = 0
        switch (new_world.worldmap[i][j]) {
            case ' ': x = 0; break
            case '/': x = 1; break
            case '|': x = 2; break
            case '-': x = 3; break
            case '#': x = 4; break
            case '*': x = 5; break
            case 'x': x = 6; break
            case 'X': x = 7; break
            case '=': x = 8; break
        }
        world_map[i].push(x)
    }
}

for (let i in new_world.heightmap) {
    height_map.push([])
    for (let j in new_world.heightmap[i]) {
        let x = 0
        switch (new_world.heightmap[i][j]) {
            case ' ': x = 0; break
            case '.': x = 1; break
            case ',': x = 2; break
            case ':': x = 3; break
            case ';': x = 4; break
            case '*': x = 5; break
            case '#': x = 6; break
            case '@': x = 7; break
        }
        height_map[i].push(x)
    }
}

let posX = 21.5
let posY = 11.5
let dirX = -1
let dirY = 0
let planeX = 0
let planeY = 0.66
let time = 0
let time_old = 0

let res = 0 //Resolution
let res_mode = false

let pds // Previous Draw Start
let pde // Previous Draw End
let pci // Previous Color ID
let ris = 1 //ri storage
let interpolate = true

keyPressed = function () {
    switch (keyCode) {

        case 187:
        case 61:
            res -= ceil(res / 2) - 1
            res = constrain(res - 1, 0, Infinity)
            if (!res_mode) ri = (1 + (res / 10))
            else ris = 1 + (res / 10)
            break
        case 189:
        case 173:
            res += res + 1
            res = constrain(res, 0, Infinity)
            if (!res_mode) ri = (1 + (res / 10))
            else ris = 1 + (res / 10)
            break

        case 68:
            res_mode = !res_mode
            if (res_mode) {
                ri = 1
                ris = 1 + (res / 10)
            }
            else ri = 1 + (res / 10)
            break

        case 69:
            interpolate = !interpolate
    }
}

draw = function () {
    background(0);
    pushMatrix();
    noStroke()

    translate((width / 2) - ((width / 2) / ri),
        (height / 2) - ((height / 2) / ri))

    fill(145, 106, 0)
    rect(0, 0, width / ri, (height / 2) / ri)
    fill(40, 93, 145)
    rect(0, height / 2 / ri, width / ri, height / 2 / ri)

    for (let x = 0; x < width; x += (1 + (res / 10))) {
        let camera = 2 * x / width - 1
        let rayX = dirX + planeX * camera
        let rayY = dirY + planeY * camera

        let mapX = floor(posX)
        let mapY = floor(posY)
        let side_distX = 0
        let side_distY = 0

        let delta_distX = abs(1 / rayX)
        let delta_distY = abs(1 / rayY)

        let perp_wall_dist

        let stepX = 0
        let stepY = 0

        let hit = 0
        let side

        if (rayX < 0) {
            stepX = -1
            side_distX = (posX - mapX) * delta_distX
        }

        else {
            stepX = 1
            side_distX = (mapX + 1.0 - posX) * delta_distX
        }

        if (rayY < 0) {
            stepY = -1
            side_distY = (posY - mapY) * delta_distY
        } else {
            stepY = 1
            side_distY = (mapY + 1.0 - posY) * delta_distY
        }

        while (hit === 0) {
            if (side_distX < side_distY) {
                side_distX += delta_distX
                mapX += stepX
                side = 0
            } else {
                side_distY += delta_distY
                mapY += stepY
                side = 1
            }

            if (world_map[mapX][mapY] > 0) hit = 1
        }


        if (side === 0) perp_wall_dist = (
            mapX - posX + (1 - stepX) / 2
        ) / rayX

        else perp_wall_dist = (
            mapY - posY + (1 - stepY) / 2
        ) / rayY


        let line_height = (height / perp_wall_dist)

        let draw_start = -line_height / 2 + height / 2
        if (draw_start < 0) draw_start = 0
        let draw_end = line_height / 2 + height / 2
        if (draw_end >= height) draw_end = height - 1


        let stroke_color
        switch (world_map[mapX][mapY]) {
            case 1:
                stroke_color = color(255, 0, 0)
                break
            case 2:
                stroke_color = color(0, 255, 0)
                break
            case 3:
                stroke_color = color(0, 0, 255)
                break
            case 4:
                stroke_color = color(255)
                break
            default:
                stroke_color = color(255, 255, 0)
                break
        }

        if (side == 1) stroke_color = stroke_color / 2

        let ds
        let h = (height_map[mapX][mapY] - 7)
        if (height_map[mapX][mapY] !== 7) ds = draw_end - (draw_end - draw_start) * (height_map[mapX][mapY] / 7)
        else ds = draw_start
        let de = draw_end
        if (res_mode) {
            noStroke()
            fill(stroke_color)
            if (x !== 0 && interpolate) quad(x - ris - 1, pds, x - ris - 1, pde, x, de, x, ds)
            else if (x !== 0) rect(x - ris - 1, ds, ris + 1, de - ds)

            pds = ds
            pde = de
            pci = world_map[mapX][mapY]
        }
        else {
            stroke(stroke_color)
            line(x / ri, ds / ri, x / ri, de / ri)
        }
    }
    popMatrix()

    let decider = ri === 1 ? ris : ri

    fill(255);
    textAlign(RIGHT, TOP)
    textSize(19)
    text(round(60 * 100) / 100 + " fps", width - 1, 0)
    text(floor(width / decider) + "x" + floor(height / decider), width - 1, height / 25)

    fill(0);
    text(round(60 * 100) / 100 + " fps", width, 0)
    text(floor(width / decider) + "x" + floor(height / decider), width, height / 25)

    time_old = time
    time = frameCount
    let frame_time = (time - time_old) / 60.0

    // this._clearLogs()
    // println((1.0 / frame_time) + " FPS") //FPS counter

    let move_speed = frame_time * 5.0
    let rot_speed = 3.0

    if (keyIsPressed && keyCode === UP_ARROW) {

        if (world_map[floor(posX + dirX * move_speed)]
        [floor(posY)] === 0) {

            posX += dirX * move_speed
        }

        if (world_map[floor(posX)]
        [floor(posY + dirY * move_speed)] === 0) {

            posY += dirY * move_speed
        }
    }

    if (keyIsPressed && keyCode === DOWN_ARROW) {

        if (world_map[floor(posX - dirX * move_speed)]
        [floor(posY)] === 0) {

            posX -= dirX * move_speed
        }

        if (world_map[floor(posX)]
        [floor(posY - dirY * move_speed)] === 0) {

            posY -= dirY * move_speed
        }
    }

    if (keyIsPressed && keyCode === RIGHT_ARROW) {
        let dirX_old = dirX

        dirX = dirX * cos(-rot_speed) - (
            dirY * sin(-rot_speed))

        dirY = dirX_old * sin(-rot_speed) + (
            dirY * cos(-rot_speed))

        let planeX_old = planeX

        planeX = planeX * cos(-rot_speed) - (
            planeY * sin(-rot_speed))

        planeY = planeX_old * sin(-rot_speed) + (
            planeY * cos(-rot_speed))
    }

    if (keyIsPressed && keyCode === LEFT_ARROW) {
        let dirX_old = dirX

        dirX = dirX * cos(rot_speed) - (
            dirY * sin(rot_speed))

        dirY = dirX_old * sin(rot_speed) + (
            dirY * cos(rot_speed))

        let planeX_old = planeX

        planeX = planeX * cos(rot_speed) - (
            planeY * sin(rot_speed))

        planeY = planeX_old * sin(rot_speed) + (
            planeY * cos(rot_speed))
    }


    let sized = 4
    noStroke()
    for (let i in world_map) {
        for (let j in world_map[i]) {
            if (world_map[i][j] !== 0) {
                switch (world_map[i][j]) {
                    case 1: fill(255, 0, 0); break
                    case 2: fill(0, 255, 0); break
                    case 3: fill(0, 0, 255); break
                    case 4: fill(255); break
                    default: fill(255, 255, 0); break
                }
            }

            else {
                fill(84, 84, 84)
                rect(j * sized, i * sized, sized, sized)
            }
            rect(j * sized, i * sized, sized / 2, sized / 2)
        }
    }
    fill(0, (frameCount * 8) % 255, (frameCount * 8) % 255)
    ellipse(posY * sized, posX * sized, sized, sized)
}
