/*jshint multistr:true*/ // Multiline string support
/*jshint curly:false*/  // Disables Requirement for braces
/*jshint asi:true*/    // Disables Requirement for semicolons
/*jshint moz:true*/   // Enables Mozilla JS Extentions

/// Copyright ⓒ 2021 Carter Reeb <reebcw@pm.me>
/// Licensed under the MIT License: opensource.org/licenses/MIT

/** LIBISONLINE EXTENTIONS 0.3 **/
const Type = {
    LeanVec: 1,
    Err: 2,
}
let caughterrors = []
const ErrorType = {
    IndexOutOfBounds: 0
}
function Error(type, message) {
    this.type = Type.Err
    this.error_type = type
    this.message = message
}
function error(type, message) {
    caughterrors.push(new Error(type, message))
}
function reportObject(obj, args, spacing) {
    args = (args === undefined) ? [] : args
    spacing = (spacing === undefined) ? 0 : spacing

    if (!args.includes("headless"))
        println("\nEntries for " + obj + ":\n\n")

    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            let value = obj[k]
            for (let i = 0; i < spacing; i++) {
                print("  ")
            }

            if (args.includes("raw")) {
                print(k)
                if (typeof value === "object") print(" => {}")
                else print(" =>")

            }

            else print("Entry \"" + k + "\" => \n")

            if (args.includes("recursive") &&
                typeof value === "object") {

                if (args.includes("raw")) {
                    reportObject(
                        value,
                        ["recursive", "headless", "raw"],
                        spacing + 1
                    )
                }

                else {
                    reportObject(
                        value,
                        ["recursive", "headless"],
                        spacing + 1
                    )
                }

            }

            else {
                if (!args.includes("raw")) {
                    for (let i = 0; i < spacing; i++) {
                        print("_\\")
                    }

                    print(
                        "  Contains " +
                        typeof value +
                        " (" + value + ")\n"
                    )
                }

                else print(' ' + typeof value + " .. " + value + '\n')

            }
        }
    }

    println('')
}
function LeanVec(x, y) {
    this.type = Type.LeanVec
    this.x = x
    this.y = y

    this.drawRect = function (w, h) {
        if (w.type === Type.LeanVec) {
            rect(this.x, this.y, w.x, w.y)
        } else {
            rect(this.x, this.y, w, h)
        }
    }

    this.add = function (lv) {
        let out = new LeanVec()
        out.x = lv.x + this.x
        out.y = lv.y + this.y

        return out
    }

    this.sub = function (lv) {
        let out = new LeanVec()
        out.x = this.x - lv.x
        out.y = this.y - lv.y

        return out
    }

    this.dist = function (lv) {
        return sqrt(sq(lv.x - this.x) + sq(lv.y - this.y))
    }
}
function vector(x, y) {
    return new LeanVec(x, y)
}
const format = {
    debug: 0,
    display: 1,
}
function formatitem(content, formatoption) {
    const debug = formatoption === format.debug
    switch (typeof content) {
        case 'object':
            switch (content.type) {
                case Type.Err:
                    var out = ""
                    switch (content.error_type) {
                        case ErrorType.IndexOutOfBounds:
                            out = "IndexOutOfBounds"
                            break
                        default:
                            out = "UnknownError"
                    }

                    out += ": "
                    out += content.message

                    if (debug) return out + ': Err'
                    else return out
                    break
                case Type.LeanVec:
                    var out = ""

                    out += '('
                    out += content.x
                    out += ', '
                    out += content.y
                    out += ')'

                    return out
                    break
                case undefined:
                    var c = []
                    for (let i in content) {
                        c.push(formatitem(content[i]))
                    }

                    return '[' + c.join(', ') + ']'
            }
            break
        case 'number':
            if (debug) return content + ': number'
            else return content
            break
        case 'string':
            if (debug) return '"' + content + '"'
            else return content
            break
        case 'boolean':
            if (debug) return content + ': bool'
            else return content
            break
    }
}
function report(content, options) {
    println(formatitem(content))
}
function noisyrgb(s, r, g, b) {
    return color(
        red(s) + random(-r, r),
        green(s) + random(-g, g),
        blue(s) + random(-b, b)
    )
}
function noisy(s, h) {
    const change = random(-h, h)
    return color(
        red(s) + change,
        green(s) + change,
        blue(s) + change
    )
}
function Button(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.draw_rect = function () {
        rect(this.x, this.y, this.w, this.h)
    }

    this.label = function (txt) {
        textAlign(CENTER, CENTER)
        textSize(sqrt(sq(this.w) + sq(this.h)) / 4)
        text(txt, this.x + (this.w / 2), this.y + (this.h / 2))
    }

    this.over = function () {
        if (mouseX > this.x && mouseX < this.x + this.w &&
            mouseY > this.y && mouseY < this.y + this.h) {
            return true
        }

        return false
    }

    this.pressed = function () {
        if (mouseIsPressed) {
            return this.over()
        }
    }
}

/** FALLING ENGINE 0.1 **/

const ParticleType = {
    Sand: 0,
    Water: 1,
    Wood: 2,
}

const WeightMap = [
    1, //Sand
    0.5, //Water
    1e9, //Wood
]

function FallingParticle(type) {
    this.type = type
    this.solid = false
    switch (type) {
        case ParticleType.Sand:
            this.color = noisy(color(214, 192, 47), 24)
            break
        case ParticleType.Water:
            this.color = noisyrgb(
                color(20, 96, 209),
                0, 14, 25
            )
            break
        case ParticleType.Wood:
            this.color = noisyrgb(
                color(71, 40, 17),
                16, 13, 13
            )
            this.solid = true
            break
    }
}

function FallingMap(w, h) {
    this.particles = []
    this.size = vector(w, h)

    for (let x = 0; x < w; x++) {
        this.particles.push([])
    }
}

FallingMap.prototype.set = function (pos, particle) {
    try {
        this.particles[pos.x][pos.y] = particle
    }

    catch (_) {
        error(
            ErrorType.IndexOutOfBounds,
            "Tried to set an invalid position to a particle"
        )
    }
}

FallingMap.prototype.get = function (x, y) {
    try {
        let out = this.particles[x][y]
        return !out ? null : out
    }

    catch (_) {
        return null
    }
}

FallingMap.prototype.get_surrounding = function (x, y) {
    return {
        topleft: this.get(x - 1, y - 1),
        top: this.get(x, y - 1),
        topright: this.get(x + 1, y - 1),
        left: this.get(x - 1, y),
        right: this.get(x + 1, y),
        bottomleft: this.get(x - 1, y + 1),
        bottom: this.get(x, y + 1),
        bottomright: this.get(x + 1, y + 1),
    }
}

FallingMap.prototype.move = function (x, y, dx, dy) {
    this.particles[x + dx][y + dy] = this.particles[
        x][y]

    this.particles[x][y] = null
}

FallingMap.prototype.swap = function (x, y, dx, dy) {
    const temp = this.particles[x][y]
    this.particles[x][y] = this.particles[dx][dy]
    this.particles[dx][dy] = temp
}

FallingMap.prototype.apply_behavior = function (x, y) {
    const prt = this.particles[x][y]
    if (prt === null || prt === undefined) return
    const surrounding = this.get_surrounding(x, y)

    switch (prt.type) {
        case ParticleType.Sand: {
            if (y === this.size.y - 1) break

            if (!surrounding.bottom) {
                this.move(x, y, 0, 1)
            }

            else if (!surrounding.left &&
                !surrounding.bottomleft &&
                x !== 0) {
                this.move(x, y, -1, 1)
            }

            else if (!surrounding.right &&
                !surrounding.bottomright &&
                x !== this.size.x - 1) {
                this.move(x, y, 1, 1)
            }

            break
        }

        case ParticleType.Water: {
            if (y === this.size.y - 1) break

            const movedir = floor(random(0, 5))

            if (!surrounding.bottom) {
                this.move(x, y, 0, 1)
            }

            else if (movedir === 0) {
                if (!surrounding.left &&
                    x !== 0) {
                    this.move(x, y, -1, 0)
                }

                else if (!surrounding.right &&
                    x !== this.size.x - 1) {
                    this.move(x, y, 1, 0)
                }
            } else if (movedir === 1) {
                if (!surrounding.right &&
                    x !== this.size.x - 1) {
                    this.move(x, y, 1, 0)
                }

                else if (!surrounding.left &&
                    x !== 0) {
                    this.move(x, y, -1, 0)
                }
            }

            break
        }
    }

    if (surrounding.top !== null && prt !== null) {
        if (WeightMap[surrounding.top.type] >
            WeightMap[prt.type] &&
            !prt.solid && !surrounding.top.solid) {

            this.swap(x, y, x, y - 1)
        }
    }
}

FallingMap.prototype.apply_all = function () {
    for (let i = this.size.y - 1; i >= 0; i--) {
        for (let j = 0; j < this.size.x; j++) {
            if (this.particles[j][i] !== undefined &&
                this.particles[j][i] !== null)

                this.apply_behavior(j, i)
        }
    }
}

FallingMap.prototype.display = function (x, y, w, h) {
    const tilew = w / this.size.x
    const tileh = h / this.size.y

    noStroke()

    for (let i = 0; i < this.size.x; i++) {
        for (let j = 0; j < this.size.y; j++) {
            const p = this.particles[i][j]
            if (p === undefined || p === null) continue

            fill(p.color)

            rect(i * tilew + x, j * tileh + y, tilew, tileh)
        }
    }

    noFill()
    stroke(0)
    strokeWeight(1)
    //rect(x, y, w, h)
}

/** MAIN **/

let siz = vector(100, 100)
let m = new FallingMap(siz.x, siz.y)

const sandbutton = new Button(10, 10, 80, 36)
const waterbutton = new Button(10, 50, 80, 36)
const woodbutton = new Button(10, 90, 80, 36)
let drawtype = ParticleType.Sand

draw = function () {
    background(255, 255, 255)
    m.apply_all()
    m.display(0, 0, width, height)

    const mx = floor(mouseX / (width / siz.x))
    const my = floor(mouseY / (height / siz.y))
    noStroke()
    fill(100, 100)
    rect(
        mx * (width / siz.x),
        my * (height / siz.y),
        width / siz.x,
        height / siz.y
    )

    fill(112, 95, 0)
    if (drawtype === ParticleType.Sand) {
        fill(245, 212, 0)
    }
    sandbutton.draw_rect()
    fill(0)
    sandbutton.label("Sand")

    fill(12, 79, 196)
    if (drawtype === ParticleType.Water) {
        fill(0, 237, 245)
    }
    waterbutton.draw_rect()
    fill(0)
    waterbutton.label("Water")

    fill(56, 29, 1)
    if (drawtype === ParticleType.Wood) {
        fill(87, 49, 38)
    }
    woodbutton.draw_rect()
    fill(0)
    woodbutton.label("Wood")

    if (sandbutton.pressed()) {
        drawtype = ParticleType.Sand
    }

    else if (waterbutton.pressed()) {
        drawtype = ParticleType.Water
    }

    else if (woodbutton.pressed()) {
        drawtype = ParticleType.Wood
    }

    else if (mouseIsPressed) {
        m.set(
            vector(mx, my),
            new FallingParticle(drawtype)
        )
    }
}
