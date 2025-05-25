/*jshint curly:false*/
/*jshint asi:true*/
/*jshint moz:true*/
/*jshint sub:true*/
/*jshint multistr:true*/

/// Copyright ⓒ 2021 Carter Reeb

/// The Following Code is licensed under the MIT License: https://opensource.org/licenses/MIT

const LINT = false
const __STACKTRACE = false
const GAME = "\
       set named:x to 10 \
    |> set named:y to 6 \
    |> label named:loop \
    |> equal 1 1 \
        |> clearlogs \
        |> getkey named:key \
        \
        |> equal *key 40 \
            |> add named:y 1 \
        |> end \
        |> equal *key 39 \
            |> add named:x 1 \
        |> end \
        |> equal *key 38 \
            |> subtract named:y 1 \
        |> end \
        |> equal *key 37 \
            |> subtract named:x 1 \
        |> end \
        \
        |> setpen to 1601093 \
        |> draw valueof:(add inner:(multiply cloned:y 23) *x ) 0 \
        |> goto *loop \
    |> end \
    |> console done \
 "

let MANDELBROT = [ //Verbose Syntax
    "set named:chars to [#s,.,:,-,=,+,^,#,%,@]",
    "set named:limit to 1",

    "label named:beginFrame",
    "subtract named:limit by 0.01",
    "set named:y to -1.3",
    "set named:coord to 0",
    "label named:a",

    "lessThan *y 1.3",
    "set named:x to -2.1",
    "label named:b",

    "lessThan *x 1.1",
    "set named:zi to 0",
    "set named:zr to 0",
    "set named:i to 0",
    "label named:c",

    "lessThan *i 30",
    "set named:ta to *zi",
    "multiply named:ta by *zi",
    "multiply named:ta by *zr",
    "multiply named:ta by *zr",

    "greaterThanEq *ta 4",
    "goto *break",
    "end",

    "set named:zr2 to *zr",
    "set named:zi2 to *zi",

    "multiply named:zr by *zr2",

    "set named:temp to *zi",
    "multiply named:temp by *zi",

    "subtract named:zr by *temp",

    "set named:tx to *x",
    "multiply named:tx by *limit",

    "add named:zr *tx",

    "multiply named:zi by *zr2",
    "multiply named:zi by 2",

    "set named:ty to *y",
    "multiply named:ty by *limit",
    "add named:zi *ty",
    "add named:i 1",
    "goto *c",
    "end",

    "label named:break",
    "set named:tc to *i",
    "mod named:tc to 10",
    "subtract named:tc by 1",
    "setindex *tc",
    "getarray named:chars named:tcc",
    "setpen to valueof:(multiply cloned:i by 2000000)",
    "draw *coord *tcc",
    "add named:x 0.14",
    "add named:coord 1",
    "goto *b",
    "end",

    "add named:y 0.1",
    "goto *a",
    "end",

    "goto *beginFrame",

].join(' |> ')

let FIBONACCI = [
    "console Press#s<enter>#sto#sstart#sfibonacci#ssequence...",
    "getkey named:key #c Verifying User Input",
    "set named:n 500 #c Number of iterations",
    "set named:a 0",
    "set named:b 1",
    "label named:loop",
    "getkey named:key #c User input",
    "greaterthan *n 0",
    "equal *key 10",
    "subleft named:n 1",
    "set named:t *a",
    "set named:a *b",
    "add named:b *t",
    "end",
    "goto *loop",
    "end",
    "console Final#sResult: *a",
].join(' |> ')

let SHUFFLE = [

    "set named:t to [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]",

    "set named:i to 1",
    "label named:loop",
    "set named:len to valueof:(length named:t )",

    "lessthan *i valueof:(subtract cloned:len by 1)",
    "setrandom named:r *len",

    "setindex to *r",
    "getarray named:t named:temp1",

    "setindex to *i",
    "getarray named:t named:temp2",

    "setarray named:t *temp1",

    "setindex to *r",
    "setarray named:t *temp2",

    "add named:i 1",
    "goto *loop",
    "end",

    "console *t",
].join(' |> ')

let LANGSTONS_ANT = [
    "set named:height to 58",
    "set named:width to 35",
    "set named:direction to 0",
    "set named:step to 10",
    "set named:count to 0",

    "set named:display to valueof:(init2d 35 58)",
    "fill2d named:display -1",

    "set named:y to valueof:(floor inner:(divide cloned:height 2) )",
    "set named:x to valueof:(floor inner:(divide cloned:width 2) )",

    "label named:drawloop",
    "set named:i to 0",

    "label named:loop",
    "lessthan *i *step",
    "add named:count 1",
    "add named:i 1",
    "setindex *x *y",
    "getarray named:display named:pix",
    "equal *pix -1",
    "setarray named:display 1",
    "end",

    "equal *pix 1",
    "setarray named:display -1",
    "end",

    "equal *pix -1",
    "add named:direction 1",
    "end",
    "equal *pix 1",
    "subleft named:direction 1",
    "end",
    "equal *direction -1",
    "set named:direction to 3",
    "end",
    "equal *direction 4",
    "set named:direction to 0",
    "end",

    "equal *direction 0 |> subleft named:y 1 |> end",
    "equal *direction 1 |> subleft named:x 1 |> end",
    "equal *direction 2 |> add named:y 1 |> end",
    "equal *direction 3 |> add named:x 1 |> end",


    "lessthan *x 0",
    "set named:x to valueof:(subleft cloned:height 1)",
    "end",
    "lessthan *y 0",
    "set named:y to valueof:(subleft cloned:width 1)",
    "end",
    "greaterthaneq *x *width",
    "set named:x to 1",
    "end",
    "greaterthaneq *y *height",
    "set named:y to 1",
    "end",

    "goto *loop",
    "end",

    "clearlogs",
    "disp2d named:display",

    "goto *drawloop",
].join(' |> ')

//{
let SORTING_ALGORITHM = "SET $a [-12,3,0,4,7,4,8,-5,9] |> SET $i 0 |> LABEL $l1 |> LESSTHAN &$i &(LENGTH $a ) |> SETINDEX &$i |> GETARRAY $a $k |> SET $j &$i |> LABEL $l2 |> GREATERTHAN &$j 0 |> SETINDEX &(SUBLEFT @&$j 1) |> GETARRAY $a $tmp |> LESSTHAN &$k &$tmp |> SETINDEX &(SUBLEFT @&$j 1) |> GETARRAY $a $tmp1 |> SETINDEX &$j |> SETARRAY $a &$tmp1 |> SUBLEFT $j 1 |> GOTO &$l2 |> END |> END |> SETINDEX &$j |> SETARRAY $a &$k |> ADD $i 1 |> EQUAL &$i &(LENGTH $a ) |> CONSOLE Your#ssorted#sarray: |> CONSOLE &$a |> EXIT |> END |> GOTO &$l1 |> END |>"
//}

// Use this to switch between programs to excecute
let PROGRAM = GAME

function from_color(c) {
    let b = (c - 1) % 256
    let g = ((c - b) / 256) % 256
    var r = ((c - b) / sq(256)) - g / 256

    return color(r, g, b)
}

String.prototype.hashCode = function () {
    var hash = 0, i, chr, len
    if (this.length === 0) return hash
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i)
        hash = ((hash << 5) - hash) + chr
        hash |= 0 // Convert to 32bit integer
    }
    return hash
}

function toHex(n) {
    if (n < 0) n = 0xFFFFFFFF + n + 1
    return n.toString(16).toUpperCase()
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

            else print("Entry \"" + k + "\" => \n");

            if (args.includes("recursive") && typeof value === "object") {
                if (args.includes("raw"))
                    reportObject(value, ["recursive", "headless", "raw"], spacing + 1)

                else
                    reportObject(value, ["recursive", "headless"], spacing + 1)

            }

            else {
                if (!args.includes("raw")) {
                    for (let i = 0; i < spacing; i++) {
                        print("_\\")
                    }
                    print("  Contains " + typeof value + " (" + value + ")\n")
                }

                else print(' ' + typeof value + " .. " + value + '\n')

            }
        }
    }
    println('')
}

function Stack() {
    this.content = []
}

/// Pushes value to the stack `x` times
Stack.prototype.push_x = function (x, value) {
    for (let i = 0; i < x; i++) {
        this.content.push(value)
    }
};

/// Fills bytes with `value` from `x` to `y`
Stack.prototype.fill_from = function (x, y, value) {
    for (let i = x; i <= y; i++) {
        this.content[i] = value
    }
}

function Display() {
    this.screen = new Stack()
    this.colors = new Stack()
}

Display.prototype.init = function () {
    this.screen.push_x(0x211, '')
}

let display0 = new Display()
display0.init()

let CACHE = 0x6

/** The Program:
 * Contains a Stack
 * Uses a UUID to refer to other programs and itself
 * 
 * The Initial `CACHE` bytes of space is used accordingly:
    - 0x000: Program Counter
    - 0x001: Routine definition (0x0 for none)
    - 0x002: Index item for array access
    - 0x003: Condition evaluation level
    - 0x004: Condition evaluation array
    - 0x005: 24-bit Pen Color
*/
function Program(uuid) {
    this.stack = new Stack()
    this.parsed = []
    this.uuid = uuid
}

/// Initializes the program with 0x400 (1024) bytes of program-
/// -readable addresses used for various things
Program.prototype.init = function () {
    // Program data
    this.stack.push_x(CACHE, 0)

    // Condition Stack
    this.stack.content[0x4] = []
}

Program.prototype.try_int = function (val) {
    // Only run startsWith if `val` is a string without running both tests
    if (typeof val === "string") {
        if (val.startsWith('&'))
            return this.stack.content[CACHE + parseFloat(val.substring(1))]
        if (val.startsWith("valueof:"))
            return this.stack.content[CACHE + parseFloat(val.substring(8))]

        if (val.startsWith('[') && val[val.length - 1] === ']') {
            return val
                .slice(val.indexOf('[') + 1, val.indexOf(']'))
                .replaceAll(' ', '')
                .split(',')
        }
    }
    let int = parseFloat(val)
    if (int === undefined) return undefined
    return (int.toString() === val) ? int : val
}

Program.prototype.inherit = function (data) {
    this.stack = data
}

Program.prototype.set = function (former, latter) {
    if (__STACKTRACE) println("@@ EXEC (SET (" + former + ') (' + latter + "))")
    this.stack.content[former] = latter
}

Program.prototype.check_array = function (former) {
    if (typeof this.stack.content[CACHE + former] !== "object") {
        if (typeof this.stack.content[CACHE + former] === undefined)
            this.set(CACHE + former, [])
        else this.set(CACHE + former, [this.stack.content[CACHE + former]])
    }
}

Program.prototype.compare_safe = function () {
    this.stack.content[0x3]++
    if (__STACKTRACE) println("  ++ FLOW: Comparison failed; condition counter is " + this.stack.content[0x3])
    this.stack.content[0x4].push(false)
}

Program.prototype.exec = function (instruction, former, latter) {
    let latterbck = latter
    former = (former === undefined) ? 0 : former
    latter = (latter === undefined) ? 0 : latter

    if (__STACKTRACE) println("~~ INPUT: " + instruction + " " + former + " " + latter)

    if ((this.stack.content[0x001] === 0x0 &&
        this.stack.content[0x3] === 0x0) ||
        instruction.toUpperCase() === "END") {
        switch (instruction.toUpperCase()) {

            case "CLEAR": {
                display0.screen.fill_from(0x0, 0x900, ' ')
                break
            }
            case "SET": {
                this.set(CACHE + former, latter)
                break
            }
            case "ROUTINE": {
                this.stack.content[0x001] = former
                this.set(CACHE + former, [])
                break
            }
            case "FROMCODE": {
                this.set(CACHE + former, String.fromCharCode(latter + 40))
                break
            }
            case "END": {
                if (this.stack.content[0x1] !== 0x0) {
                    if (__STACKTRACE) println("  ++ FLOW: Exiting Routine " + this.stack.content[0x1])
                    this.stack.content[0x1] = 0x0
                }
                else if (this.stack.content[0x4].pop() === false) {
                    if (__STACKTRACE) println("  ++ FLOW: Decrementing condition counter to " + this.stack.content[0x3] - 1)
                    this.stack.content[0x3] -= 1
                }
                break
            }
            case "ADD": {
                this.set(CACHE + former, this.stack.content[CACHE + former] + latter)
                break
            }
            case "MOD": {
                this.set(CACHE + former, this.stack.content[CACHE + former] % latter)
                break
            }
            case "PRINT":
            case "CONSOLE": {
                if (__STACKTRACE) println("\n-----")
                if (latterbck === undefined) {
                    println(former)
                } else {
                    println(former + ' ' + latter)
                }
                if (__STACKTRACE) println("---\n")
                break
            }
            case "CONSOLELINE": {
                println("")
                break
            }
            case "GOTO": {
                this.stack.content[0x0] = former
                if (__STACKTRACE) println("  ++ FLOW: Pointer located at " + this.stack.content[0x0])
                break
            }
            case "EQUAL": {
                if (former !== latter) this.compare_safe()
                else this.stack.content[0x4].push(true)
                break
            }
            case "NOTEQUAL": {
                if (former === latter) this.compare_safe()
                else this.stack.content[0x4].push(true)
                break
            }
            case "SETOR": {
                this.set(CACHE + former, this.stack.content[CACHE + former] | latter)
                break
            }
            case "SETAND": {
                this.set(CACHE + former, this.stack.content[CACHE + former] & latter)
                break
            }
            case "SETXOR": {
                this.set(CACHE + former, this.stack.content[CACHE + former] ^ latter)
                break
            }
            case "SETPEN": {
                this.set(0x005, from_color(former))
                break
            }
            case "SUBTRACT":
            case "SUBLEFT": {
                this.set(CACHE + former, this.stack.content[CACHE + former] - latter)
                break
            }
            case "SUBRIGHT": {
                this.set(CACHE + former, latter - this.stack.content[CACHE + former])
                break
            }
            case "SHIFTLEFT": {
                this.set(CACHE + former, this.stack.content[CACHE + former] << latter)
                break
            }
            case "SHIFTRIGHT": {
                this.set(CACHE + former, this.stack.content[CACHE + former] >>> latter)
                break
            }
            case "SETRANDOM": {
                this.set(CACHE + former, floor(random(0, latter)))
                break
            }
            case "MULTIPLY": {
                this.set(CACHE + former, this.stack.content[CACHE + former] * latter)
                break
            }
            case "DIVIDE":
            case "DIVIDELEFT": {
                this.set(CACHE + former, this.stack.content[CACHE + former] / latter)
                break
            }
            case "DIVIDERIGHT": {
                this.set(CACHE + former, latter / this.stack.content[CACHE + former])
                break
            }
            case "SETNEGATIVE": {
                this.set(CACHE + former, -this.stack.content[CACHE + former])
                break
            }
            case "GETKEY": {
                this.set(CACHE + former, keyCode)
                break
            }
            case "EXIT": {
                this.stack.content[0x0] = this.parsed.length
                break
            }
            case "PUSH": {
                this.check_array(former)
                // this check might slow down things considerably
                if (this.stack.content[CACHE + former][0] === undefined)
                    this.stack.content[CACHE + former][0] = latter
                else this.stack.content[CACHE + former].push(latter)
                break
            }
            case "POP": {
                this.check_array(former)
                this.set(CACHE + latter,
                    this.stack.content[CACHE + former].pop()
                )
                break
            }
            case "SETINDEX": {
                if (latterbck === undefined) {
                    this.set(0x2, former)
                } else {
                    this.set(0x2, [former, latter])
                }
                break
            }
            case "GETINDEX": {
                this.set(CACHE + former, this.stack.content[0x2])
                break
            }
            case "SETARRAY": {
                this.check_array(former)
                if (this.stack.content[0x2][1] !== undefined) {
                    this.stack.content[CACHE + former][
                        this.stack.content[0x2][0]
                    ][
                        this.stack.content[0x2][1]
                    ] = latter
                } else {
                    this.stack.content[CACHE + former][
                        this.stack.content[0x2]
                    ] = latter
                }
                break
            }
            case "GETARRAY": {
                this.check_array(former)
                if (this.stack.content[0x2][1] !== undefined) {
                    this.set(CACHE + latter, this.stack.content[CACHE + former][
                        this.stack.content[0x2][0]][this.stack.content[0x2][1]])
                } else {
                    this.set(CACHE + latter, this.stack.content[CACHE + former][
                        this.stack.content[0x2]])
                }
                break
            }
            case "ITEM": {
                this.check_array(former)
                this.stack.content[CACHE] = this.stack.content[CACHE + former][latter]
                break
            }
            case "LESSTHAN": {
                if (former > latter) this.compare_safe()
                else this.stack.content[0x4].push(true)
                break
            }
            case "GREATERTHAN": {
                if (former < latter) this.compare_safe()
                else this.stack.content[0x4].push(true)
                break
            }
            case "LESSTHANEQ": {
                if (former >= latter) this.compare_safe()
                else this.stack.content[0x4].push(true)
                break
            }
            case "GREATERTHANEQ": {
                if (former <= latter) this.compare_safe()
                else this.stack.content[0x4].push(true)
                break
            }
            case "LENGTH": {
                this.set(CACHE + latter, this.stack.content[CACHE + former].length)
                break
            }
            case "LABEL": {
                break
            }
            case "DRAW": {
                display0.colors.content[former] = this.stack.content[0x005]
                display0.screen.content[former] = latter
                break
            }
            case "FLOOR": {
                this.set(CACHE + former, floor(this.stack.content[CACHE + former]))
                break
            }
            case "CEIL": {
                this.set(CACHE + former, ceil(this.stack.content[CACHE + former]))
                break
            }
            case "ROUND": {
                this.set(CACHE + former, round(this.stack.content[CACHE + former]))
                break
            }
            case "INIT2D": {
                let out = []
                for (let i = 0; i < former; i++) {
                    out.push([])
                    for (let j = 0; j < latter; j++) {
                        out[i].push(0)
                    }
                }
                this.stack.content[CACHE] = out
                break
            }
            case "FILL2D": {
                let out = this.stack.content[CACHE + former]
                for (let i in out) {
                    for (let j in out[i]) {
                        out[i][j] = latter
                    }
                }
                this.stack.content[CACHE + former] = out
                break
            }
            case "DISP2D": {
                for (let i in this.stack.content[CACHE + former]) {
                    let out = ""
                    for (let j in this.stack.content[CACHE + former][i]) {
                        if (this.stack.content[CACHE + former][i][j] === 1) {
                            out += '█'
                        } else out += ' '
                    }
                    println(out)
                }
                break
            }
            case "CLEARLOGS": {
                _clearLogs()
                break
            }
            case "AVG": {
                this.stack.content[CACHE] = (former + latter) / 2
                break
            }

            default: {
                println("COMMAND NOT FOUND: " + instruction)
                break
            }
        }
    }
    else if (this.stack.content[0x1] !== 0x0) {
        if (__STACKTRACE) println("  ++ FLOW: Subroutine " + this.stack.content[0x1] + " is busy. (Skipped)")
        this.stack.content[CACHE + this.stack.content[0x001]].push(
            [instruction, former, latter]
        )
    }
    else {
        if (__STACKTRACE) println("  ++ FLOW: Condition Counter " + this.stack.content[0x3] + " > 0 (Skipped")

        if (instruction.toUpperCase() === "EQUAL" || instruction.toUpperCase() === "GREATERTHAN" ||
            instruction.toUpperCase() === "LESSTHAN" || instruction.toUpperCase() === "NOTEQUAL" ||
            instruction.toUpperCase() === "LESSTHANEQ" || instruction.toUpperCase() === "GREATERTHANEQ") {
            this.stack.content[0x4].push(true)
        }
    }
}

Program.prototype.subroutine = function (id) {
    let instructions = this.stack.content[CACHE + id]
    for (let i in instructions) {
        this.exec(
            instructions[i][0],
            instructions[i][1],
            instructions[i][2]
        )
    }
}

Program.prototype.parse = function (instruction) {
    let parsed = instruction.split("|>")
    this.parsed = []
    for (let i in parsed) {
        let instructionstorage = ""

        let foundvar = false
        let varstorage = ""

        if (LINT) {
            if (parsed[i].includes("emulated:valueof:named:"))
                println("LINTER: Consider using \"cloned\" instead of \"emulated:valueof:named\" (line " + (floor(i) + 1) + ')')
            if (parsed[i].includes("emulated:valueof:"))
                println("LINTER: Consider using \"inner\" instead of \"emulated:valueof\" (line " + (floor(i) + 1) + ')')
            if (parsed[i].includes("valueof:named:"))
                println("LINTER: Consider using the pointer \'*\' operand instead of \"valueof:named\" (line " + (floor(i) + 1) + ')')
        }
        parsed[i] = parsed[i].replaceAll("cloned:", "emulated:valueof:named:")
        parsed[i] = parsed[i].replaceAll("inner:", "emulated:valueof:")
        parsed[i] = parsed[i].replaceAll("*", "valueof:named:")
        for (let j = 0; j < parsed[i].length;) {
            if (parsed[i][j] === '$') foundvar = true
            else if (parsed[i].substring(j, j + 6) === "named:") {
                foundvar = true
                j += 5
            }
            else if (parsed[i][j] === ' ' && foundvar) {
                foundvar = false
                instructionstorage += varstorage.hashCode() + ' '
                varstorage = ""
            }
            else if (j === parsed[i].length - 1 && foundvar) {
                foundvar = false
                varstorage += parsed[i][j]
                instructionstorage += varstorage.hashCode() + ' '
                varstorage = ""
            }

            else if (foundvar) varstorage += parsed[i][j]
            else instructionstorage += parsed[i][j]
            j++
        }

        if (!instructionstorage.toUpperCase().startsWith("CONSOLE")) {
            instructionstorage = instructionstorage.replaceAll(" by", '')
            instructionstorage = instructionstorage.replaceAll(" to", '')
        }

        let comment = instructionstorage.indexOf(' #c')
        if (comment !== -1) instructionstorage = instructionstorage.substring(0, comment)
        instructionstorage = instructionstorage.trim().replaceAll(' ', '#x')
        instructionstorage = instructionstorage.replaceAll('#s', ' ')

        let parsed_instruction = instructionstorage.split('#x')
        if (parsed_instruction[0].toUpperCase() === "LABEL" || parsed_instruction[0] === "::") {
            this.stack.content[CACHE + this.try_int(parsed_instruction[1])] = i
        }

        this.parsed.push(parsed_instruction)
    }
}

Program.prototype.finished = function () {
    return this.stack.content[0x0] >= this.parsed.length
}

Program.prototype.step = function (batch) {
    batch = !batch ? 1 : batch

    for (let __skip = 0; __skip < batch; __skip++) {
        if (!this.finished()) {
            let routine = this.parsed[this.stack.content[0x0]]

            while (routine.toString().indexOf('(') !== -1) {
                routine = routine.toString()
                let b = routine.slice(routine.lastIndexOf('(') + 1, routine.indexOf(')'))
                let c = b.split(',')
                for (let i = 1; i <= 2; i++) {
                    if (c[i][0] === '@') {
                        let e = c[i].slice(1, c[i].length)
                        this.stack.content[CACHE] = this.try_int(e)
                        c[i] = 0
                    }
                    if (c[i].substring(0, 9) === 'emulated:') {
                        let e = c[i].slice(9, c[i].length)
                        this.stack.content[CACHE] = this.try_int(e)
                        c[i] = 0
                    }
                }
                this.exec(c[0], this.try_int(c[1]), this.try_int(c[2]))

                let d = this.stack.content[CACHE + 0x0]
                routine = routine.replace("(" + b + ")", '0')
                routine = routine.split(',')
            }

            if (routine[0] === "EXECUTE") {
                this.subroutine(this.try_int(routine[1]))
            }

            else {
                this.exec(routine[0],
                    this.try_int(routine[1]),
                    this.try_int(routine[2])
                )
            }

            this.stack.content[0x0]++
        }
    }
}

let p0 = new Program()
p0.init()
let m = millis()
p0.parse(PROGRAM)

if (LINT) {
    println("Compiled in " + (millis() - m) + "ms\n------------------------")
    println(p0.parsed.join('\n|> ').toUpperCase().replaceAll(',', "#x").replaceAll("EMULATED:", '@').replaceAll("VALUEOF:", '&'))
}

let done = false

let screensize = floor(sqrt(display0.screen.content.length))
fill(0xFF)
textSize(18)

draw = function () {
    p0.step(0x1)
    if (p0.finished() && !done) println("Done!")
    if (p0.finished()) done = true

    background(0x0)

    text("", 10, 20)

    textSize(18)
    for (let i in display0.screen.content) {
        fill(display0.colors.content[i] ?? color(0, 0, 0));
        text(
            display0.screen.content[i],
            (i % screensize) * screensize / 1.4 + 12,
            floor(i / screensize) * screensize / 1.4 + 24
        )
    }

    let logox = 311
    let logoy = 581

    fill(255, 183, 0, 255)
    textSize(38)
    text(">", logox + 53, logoy - 13)
    textSize(38)
    text(" |", logox + 15, logoy - 10)

    textSize(24)
    fill(161, 27, 74, 50);
    text("superscript | pipes", 17, 576)
}

