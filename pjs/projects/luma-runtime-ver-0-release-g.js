/*jshint multistr:true*/ // Enables multiline string support
/*jshint curly:false*/  // Disables Requirement for braces around one-line if/else
/*jshint asi:true*/    // Disables Requirement for semicolons
/*jshint moz:true*/   // Enables Mozilla JS Extentions, such as `let` and `const`
/*jshint sub:true*/  // Disables warnings about using dot notation

/// Copyright ⓒ 2021 Carter Reeb <reebcw@pm.me>
/// This code is licensed under the MIT License: https://opensource.org/licenses/MIT

const debuglevel = 0

// Logger consts
const debug_t = 0
const info_t = 1
const warning_t = 2
const error_t = 3
const fatal_t = 4
const trace_t = 5
const program_t = 6

/** DEBUG DISPLAY **/
function BoundingBox(x, y, w, h, p) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.padding = p

    this.isInside = function (x, y) {
        return (
            x > this.x - this.padding &&
            y > this.y - this.padding &&
            x < (this.x + this.w) + this.padding &&
            y < (this.y + this.h) + this.padding //
        )
    }

    this.mouseIsInside = function () {
        return this.isInside(mouseX, mouseY)
    }

    this.drawDisplay = function () {
        rect(this.x, this.y, this.w, this.h)
    }

    this.drawBounding = function () {
        pushMatrix()
        noFill()
        stroke(255, 0, 0)
        rect(this.x - this.padding, this.y - this.padding,
            this.w + this.padding * 2, this.h + this.padding * 2)
        popMatrix()
    }
}
function DebugDisplay() {
    this.y = 100

    this.MouseActive = false

    this.GrabBar = new BoundingBox(0, this.y, width, 5, 3)
    this.GrabBarFill = color(170)
    this.DraggingGrabBar = false

    this.ScrollBarW = 17
    this.ScrollBarFill = color(240)

    this.ScrollArrowActiveFill = color(70)
    this.ScrollArrowPressedFill = color(255)
    this.ScrollBoxActiveFill = color(0, 25)
    this.ScrollBoxPressedFill = color(120)

    this.ScrollBarUpperPressed = false
    this.ScrollBarUpperOver = false
    this.ScrollBarUpperBox = new BoundingBox(-this.ScrollBarW / 2 - 1,
        0, this.ScrollBarW + 1, this.ScrollBarW, 2)

    this.ScrollBarLowerPressed = false
    this.ScrollBarLowerOver = false
    this.ScrollBarLowerBox = new BoundingBox(-this.ScrollBarW / 2 - 1,
        0, this.ScrollBarW + 1, this.ScrollBarW, 2)

    this.ProcessName = "DIM - Debugger IMproved"
    this.TextHeight = 16

    this.TerminalColor = {
        black: color(0),
        white: color(222),
        lightblue: color(70, 202, 250),
        blue: color(92, 153, 153),
        red: color(255, 0, 0),
        yellow: color(255, 255, 0),
        orange: color(255, 153, 0),
        magenta: color(255, 84, 221),
        gray: color(160)
    }

    this.DebugColor = "white"
    this.InfoColor = "lightblue"
    this.WarningColor = "orange"
    this.ErrorColor = "magenta"
    this.FatalColor = "red"
    this.TraceColor = "gray"
    this.ProgramColor = "yellow"

    this.TextColor = this.TerminalColor.white
    this.TextColorAlt = this.TerminalColor.black

    this.ProcessNameFill = this.TerminalColor.lightblue
    this.StatusBarFill = this.TerminalColor.blue

    this.Text = []
    this.TextScroll = 0
}
DebugDisplay.prototype.draw = function () {
    noStroke()
    fill(this.GrabBarFill)
    this.GrabBar.drawDisplay()
    noStroke()
    fill(0)
    rect(0, this.y + this.GrabBar.h, width, height)
    pushMatrix()

    translate(width - this.ScrollBarW, this.y + this.GrabBar.h)

    fill(this.ScrollBarFill)
    rect(0, 0, this.ScrollBarW, height)

    pushMatrix()
    translate(this.ScrollBarW / 2, 0)

    if (this.ScrollBarUpperPressed) {
        fill(this.ScrollBoxPressedFill)
    } else if (this.ScrollBarUpperOver) {
        fill(this.ScrollBoxActiveFill)
    } else {
        noFill()
    }

    this.ScrollBarUpperBox.drawDisplay()

    if (!this.ScrollBarUpperPressed) {
        fill(this.ScrollArrowActiveFill)
    } else {
        fill(this.ScrollArrowPressedFill)
    }
    triangle(0, 7, 4, 11, -4, 11)
    popMatrix()

    popMatrix()

    pushMatrix()
    translate(width - this.ScrollBarW / 2, height - this.ScrollBarW)

    if (this.ScrollBarLowerPressed) {
        fill(this.ScrollBoxPressedFill)
    } else if (this.ScrollBarLowerOver) {
        fill(this.ScrollBoxActiveFill)
    } else {
        noFill()
    }

    this.ScrollBarLowerBox.drawDisplay()

    if (!this.ScrollBarLowerPressed) {
        fill(this.ScrollArrowActiveFill)
    } else {
        fill(this.ScrollArrowPressedFill)
    }
    triangle(0, 11, 4, 7, -4, 7)
    popMatrix()

    pushMatrix()
    translate(0, height - this.TextHeight)
    fill(this.StatusBarFill);
    rect(0, 0, width - this.ScrollBarW, this.TextHeight)

    fill(this.ProcessNameFill)
    rect(0, 0, textWidth(this.ProcessName) * 1.06 + 1, this.TextHeight)
    triangle(textWidth(this.ProcessName) * 1.06 + 1, 0,
        textWidth(this.ProcessName) * 1.06, this.TextHeight,
        textWidth(this.ProcessName) * 1.06 + this.TextHeight + 1, this.TextHeight / 2)

    textAlign(LEFT, CENTER)
    fill(this.TextColorAlt)
    textSize(this.TextHeight / 1.32)
    text(' ' + this.ProcessName, 0, this.TextHeight / 2)

    textAlign(RIGHT, CENTER)
    let c = -this.TextScroll
    text(this.Text.length + 'L : ' +
        (100 + (floor(1 - (-c) /
            (this.Text.length - ((height - this.y) / this.TextHeight) + 2) * 100)) - 1) + '%',
        width - this.ScrollBarW - 10,
        this.TextHeight / 2)

    textAlign(LEFT, CENTER)
    for (let i = this.Text.length - 1; i >= 0; i--) {
        let h = -this.TextHeight / 2 - (this.TextHeight * c)
        if (h + (height - this.TextHeight) - this.GrabBar.h < this.y) break
        if (h + (height - this.TextHeight) - this.GrabBar.h > height - this.TextHeight * 2) {
            c++
            continue
        }
        let mod = this.Text[i].mod
        if (mod.highlight.on) {
            if (typeof mod.highlight.chars === "string") {
                if (mod.highlight.chars.toLowerCase() === "all") {
                    fill(this.Text[i].clr)
                    rect(this.TextHeight / 3,
                        h - this.TextHeight / 2.5,
                        textWidth(this.Text[i].txt) * 1.02 + this.TextHeight / 3,
                        this.TextHeight / 1.5)

                    fill(this.TextColorAlt)
                    text(' ' + this.Text[i].txt, 0, h)
                }
            } else {
                fill(this.Text[i].clr)
                let partialw = textWidth(this.Text[i].txt.substring(
                    0, mod.highlight.chars
                ))
                rect(this.TextHeight / 3,
                    h - this.TextHeight / 2.5,
                    partialw * 1.02 + this.TextHeight / 6,
                    this.TextHeight / 1.5)

                text(' ' + this.Text[i].txt.substring(mod.highlight.chars),
                    partialw + textWidth(' ') / 2, h)

                fill(this.TextColorAlt)
                text(' ' + this.Text[i].txt.substring(0, mod.highlight.chars),
                    0, h)
            }
        } else {
            fill(this.Text[i].clr)
            text(' ' + this.Text[i].txt, 0, h)
        }
        c++
    }
    popMatrix()
    fill(this.GrabBarFill)
    this.GrabBar.drawDisplay()
}
DebugDisplay.prototype.handleInput = function () {
    if (this.GrabBar.mouseIsInside()) {
        cursor("ns-resize")
        if (mouseIsPressed && !this.MouseActive) {
            this.DraggingGrabBar = true
        }
    } else if (this.ScrollBarUpperBox.isInside(
        -(width - this.ScrollBarW) - (this.ScrollBarW / 2) + mouseX,
        -this.y - this.GrabBar.h + mouseY
    )) {
        this.ScrollBarUpperOver = true
        cursor("auto")
        if (mouseIsPressed && !this.MouseActive) {
            this.ScrollBarUpperPressed = true
        }
    } else if (this.ScrollBarLowerBox.isInside(
        -(width - this.ScrollBarW) - (this.ScrollBarW / 2) + mouseX,
        -(height - this.ScrollBarW) + mouseY
    )) {
        this.ScrollBarLowerOver = true
        cursor("auto")
        if (mouseIsPressed && !this.MouseActive) {
            this.ScrollBarLowerPressed = true
        }
    } else {
        this.ScrollBarUpperOver = false
        this.ScrollBarLowerOver = false
        cursor("auto")
    }

    if (mouseIsPressed && this.DraggingGrabBar) {
        this.y = constrain(mouseY, 0, height - 50)
        this.GrabBar.y = constrain(mouseY, 0, height - 50)
    } else if (!mouseIsPressed) {
        this.DraggingGrabBar = false
    }

    if (this.ScrollBarLowerPressed) {
        this.TextScroll--
    } else if (this.ScrollBarUpperPressed) {
        this.TextScroll++

    }

    if (this.ScrollBarLowerPressed || this.ScrollBarUpperPressed) {
        let upper = this.Text.length - ((height - this.y) / this.TextHeight) + 2
        let lower = 0
        if (upper > lower) {
            this.TextScroll = constrain(this.TextScroll, lower, upper)
        } else {
            this.TextScroll = constrain(this.TextScroll, upper, lower)
        }

    }




    if (mouseIsPressed) {
        this.MouseActive = true
    } else {
        this.ScrollBarUpperPressed = false
        this.ScrollBarLowerPressed = false
        this.MouseActive = false
    }
}
DebugDisplay.prototype.println = function (txt, col, mod) {
    mod = !mod ? {} : mod
    let f = this.TextColor
    for (let i in this.TerminalColor) {
        if (col === i.toString()) {
            f = this.TerminalColor[i]
        }
    }

    this.Text.push({
        clr: f,
        txt: txt,
        mod: mod
    })
}
DebugDisplay.prototype.log = function (txt, loglevel) {
    switch (loglevel) {
        case 0:
            this.println("DEBUG " + txt, this.DebugColor, {
                highlight: { on: true, chars: 5 }
            })
            break
        case 1:
            this.println("INFO " + txt, this.InfoColor, {
                highlight: { on: true, chars: 4 }
            })
            break
        case 2:
            this.println("WARNING " + txt, this.WarningColor, {
                highlight: { on: true, chars: 7 }
            })
            break
        case 3:
            this.println("ERROR " + txt, this.ErrorColor, {
                highlight: { on: true, chars: 5 }
            })
            break
        case 4:
            this.println("FATAL " + txt, this.FatalColor, {
                highlight: { on: true, chars: 5 }
            })
            break
        case 5:
            this.println("TRACE " + txt, this.TraceColor, {
                highlight: { on: true, chars: 5 }
            })
            break
        case 6:
            this.println("PROGRAM " + txt, this.ProgramColor, {
                highlight: { on: true, chars: 7 }
            })
            break
    }
}
let dd = new DebugDisplay()

/** LUMA **/

function reportObject(obj, args, lvl, spacing) {
    // Default args. and spacing
    args = (args === undefined) ? [] : args

    // Headless omits header
    if (!args.includes("headless")) {
        dd.log('', lvl)
        dd.log("Entries for " + obj + ":", lvl)
        dd.log('', lvl)
        dd.log('', lvl)
    }

    let buffer = ""

    // Iterate through all entries in object
    for (let k in obj) {
        // Only report objects
        if (obj.hasOwnProperty(k)) {
            let value = obj[k]

            // Space out object name
            for (let i = 0; i < spacing; i++) {
                buffer += "  "
            }

            // Print object name, surrounded by quotes
            dd.log(buffer + "\"" + k + "\"", lvl)
            buffer = ''

            // Recursively report object if it contains its own items
            if (args.includes("recursive") && typeof value === "object") {
                reportObject(value, ["recursive", "headless"], lvl, spacing + 1)
            }

            // Just print the item if not
            else {
                // Add dashes to item entries, not for names
                for (let i = 0; i < spacing; i++) {
                    buffer += "- "
                }

                // Print item
                dd.log(buffer + "  " + typeof value + " " + value, lvl)
                buffer = ''
            }
        }
    }

    // Show in log buffer
    dd.log(buffer, lvl)
}

function error(type, message) {
    background(138, 0, 0) // Dark red
    text("ERROR", 10, 40)
    text(type, 13, 75)
    text(message, 13, 100, width - 20, 100)
}

const Type = [
    {
        label: "Array",
        pattern: new RegExp("\\[(.+)\\]"), // Object with square brackets surrounding
        is_supertype: true, // Can contain an item inside it
        is_multi: true, // Contains multiple items in subtype
        format_display: function (item) {
            throw "Display format for Array is unimplemented"
        }
    },

    {
        label: "Numeric",
        pattern: new RegExp("(-?\\d+(\\.\\d+)?)"), // Decimal is optional
        parse: function (item) {
            return parseFloat(item) // Return actual number from string
        },
        format_display: function (item) {
            return item.value
        }
    },

    {
        label: "String",
        pattern: new RegExp("'(.*)'"), // Text with single quotes surrounding
        parse: function (item) {
            return item // Do nothing, already a string
        },
        format_display: function (item) {
            return item.value
        }
    },

    {
        label: "Pointer", // Acts as an indication of where any value is located
        pattern: new RegExp("\\*(\\d+)"), // Prefix an integer with a `*`
        is_supertype: true
    },

    {
        label: "Boolean",
        pattern: new RegExp("(T|F)"), // Just a literal T or F
        parse: function (item) {
            if (item === 'T') return true
            else return false
        }
    },

    {
        label: "Void", // Treated as null
        pattern: new RegExp("(\\.)"), // Just a dot
        parse: function (item) {
            return null
        }
    },

    {
        label: "Atom", // Much like an enumerated value or label
        pattern: new RegExp(":(.+)\\s?"), // Text with colon preceeding
        parse: function (item) {
            return item // Do nothing, already a valid string
        }
    },

    {
        label: "Deref", // Will take the value of an item at the position indicated
        pattern: new RegExp("&(\\d+)"), // Prefix an integer with a `&`
        is_supertype: true,
        does_deref: true // Will derefrence an object at runtime
    }
]

const Instruction = [
    {
        // Add operation: (Numeric, Numeric)
        // Pops two items from the stack, adds them, and pushes the result.
        label: "Add",
        inst: '+',
        requires: 2,
        process: function (vals, global) {
            vals[1].value += vals[0].value
            return {
                outstack: [vals[1]]
            }
        }
    },

    {
        // Subtract operation: (Numeric, Numeric)
        // Pops two items from the stack, subtracts the right item from the left, and 
        //    pushes the result.
        label: "Subtract",
        inst: '-',
        requires: 2,
        process: function (vals, global) {
            vals[1].value -= vals[0].value
            return {
                outstack: [vals[1]]
            }
        }
    },

    {
        // Multiply operation: (Numeric, Numeric)
        // Pops two items from the stack, multiplies them, and pushes the result.
        label: "Multiply",
        inst: '*',
        requires: 2,
        process: function (vals) {
            vals[1].value *= vals[0].value
            return {
                outstack: [vals[1]]
            }
        }
    },

    {
        // Divide operation: (Numeric, Numeric)
        // Pops two items from the stack, divides the left item by the right, and pushes
        //    the result.
        label: "Divide",
        inst: '/',
        requires: 2,
        process: function (vals) {
            vals[1].value /= vals[0].value
            return {
                outstack: [vals[1]]
            }
        }
    },

    {
        // Power/Exponent operation: (Numeric, Numeric)
        // Pops two items from the stack, raises the left item to the power of the right
        //    and pushes the result.
        label: "Power",
        inst: '**',
        requires: 2,
        process: function (vals) {
            vals[1].value = pow(vals[1].value, vals[0].value)
            return {
                outstack: [vals[1]]
            }
        }
    },

    {
        // Modulo/Remainder operation: (Numeric, Numeric)
        // Pops two items from the stack, divides the left item by the right, and pushes
        //    the remainder of the operation to the stack.
        label: "Modulo",
        inst: '%',
        requires: 2,
        process: function (vals) {
            vals[1].value %= vals[0].value
            return {
                outstack: [vals[1]]
            }
        }
    },

    {
        // Global Variable Assignment operation: (Numeric, Pointer)
        // Pops two items from the stack, and sets the global variable indicated by the
        //    right item to the left.
        label: "AssignGlobal",
        inst: '^',
        requires: 2,
        process: function (vals) {
            return {
                outstack: [],
                globalreturn: {
                    index: vals[0].subvalue.value,
                    value: vals[1]
                }
            }
        }
    },

    {
        // Copy operation: (Any)
        // Pops an item from the stack, and pushes it back twice.
        label: "Copy",
        inst: 'c',
        requires: 1,
        process: function (vals) {
            return {
                outstack: [vals[0], vals[0]]
            }
        }
    },

    {
        // Pop operation: (Any)
        // Pops an item from the stack.
        label: "Pop",
        inst: '_',
        requires: 1,
        process: function (vals) {
            return {
                outstack: []
            }
        }
    },

    {
        // Inner variable export operation: (Any Superval)
        // Pops an item from the stack, and pushes its subvalue.
        label: "ReturnInner",
        inst: '->',
        requires: 1,
        process: function (vals) {
            return {
                outstack: [vals[0].subvalue]
            }
        }
    },

    {
        // Dereference operation: (Pointer)
        // Pops an item from the stack, and pushes the value of the address indicated
        //    to by the item.
        label: "Deref",
        inst: '&',
        requires: 1,
        process: function (vals) {
            return {
                outstack: [],
                deref: [vals[0].subvalue.value]
            }
        }
    },

    {
        // Goto operation: (Numeric)
        // Pops an item from the stack, and sets the instruction pointer to that value.
        label: "Goto",
        inst: 'g',
        requires: 1,
        process: function (vals) {
            vals[0].value -= 1
            return {
                outstack: [],
                globalreturn: {
                    index: 0,
                    value: vals[0]
                }
            }
        }
    },

    {
        // Print operation: (Any)
        // Pops an item from the stack, and prints it to stdout.
        label: "Print",
        inst: 'p',
        requires: 1,
        process: function (vals) {
            dd.log(Type[vals[0].typepointer].format_display(vals[0]), program_t)
            return {
                outstack: [],
            }
        }
    }
]

function excluded_parse_replace(target, replacee, replacer, _in, _out) {
    target = target.split('')
    let block = 0
    for (let c in target) {
        if (target[c] === _in) {
            block++
        } else if (target[c] === _out) {
            block--
        } else if (block === 0) {
            if (target[c] === replacee) {
                target[c] = replacer
            }
        }
    }

    return target
}

function parse_item(item) {
    let iout = {
        type: null,
        value: null
    }

    for (let i in Type) {
        if (!Type[i].pattern) {
            error(
                "Parser Error 2",
                "The type \"" + Type[i].label +
                "\" does not contain a pattern to match."
            )
        }
        if (!Type[i].label) {
            error(
                "Parser Error 1",
                "Type " + i + " does not contain a label."
            )
        }
        let matched = item.match(Type[i].pattern)

        if (matched) {
            let index = item.search(Type[i].pattern)
            if (index === 0) {
                if (Type[i].is_supertype) {
                    if (Type[i].is_multi) {
                        let vals = []
                        let subitem = matched[1].split('')
                        let block = 0
                        for (let c in subitem) {
                            if (subitem[c] === '[') {
                                block++
                            } else if (subitem[c] === ']') {
                                block--
                            } else if (block === 0) {
                                if (subitem[c] === ',') {
                                    subitem[c] = '\\COMMASEP'
                                }
                            }
                        }
                        let multivals = subitem.join('').split("\\COMMASEP")
                        let outvals = []
                        for (let v in multivals) {
                            outvals.push(parse_item(multivals[v].trim()))
                        }

                        if (!Type[i].parse) {
                            iout = {
                                type: Type[i].label,
                                subvalue: outvals,
                                typepointer: parseInt(i, 10)
                            }
                        } else {
                            iout = {
                                type: Type[i].label,
                                subvalue: outvals,
                                value: Type[i].parse(matched[1]),
                                typepointer: parseInt(i, 10)
                            }
                        }
                    } else {
                        if (!Type[i].parse) {
                            iout = {
                                type: Type[i].label,
                                subvalue: parse_item(matched[1]),
                                typepointer: parseInt(i, 10)
                            }
                        } else {
                            iout = {
                                type: Type[i].label,
                                subvalue: parse_item(matched[1]),
                                value: Type[i].parse(matched[1]),
                                typepointer: parseInt(i, 10)
                            }
                        }
                    }
                } else {
                    if (!Type[i].parse && Type[i].label) {
                        error(
                            "Parser Error 0",
                            "The type \"" + Type[i].label +
                            "\" does not contain a parse() function."
                        )
                    } else {
                        iout = {
                            type: Type[i].label,
                            value: Type[i].parse(matched[1]),
                            typepointer: parseInt(i, 10)
                        }
                    }
                    break
                }
            }
        }
    }

    return !iout.type && !iout.value ? item : iout
}

let currentdebug = 0
function debuglog(txt, levelmin) {
    if (debuglevel >= levelmin) {
        dd.log(txt, levelmin)
    }
}

function debugobj(label, item, levelmin) {
    if (debuglevel >= levelmin) {
        debuglog(label + ": ", levelmin)
        reportObject(item, ["recursive", "headless"], levelmin)
    }
}

function Program(source) {
    this.stack = []
    this.source = source
    this.exports = []
    this.globals = []
    this.functions = []
    this.instructions = []

    this.subroutines = []
    this.returns = []

    // Object for solving a JS bug (see `this.run()`)
    this.parsedvars = []

    this.parse_vars = function (part) {
        let vars = excluded_parse_replace(
            part, ' ', "\\ARGSEP", '[', ']'
        )

        let instr = false
        for (let i in vars) {
            if (vars[i] === '\'') {
                instr = !instr
            }

            if (instr && vars[i] === "\\ARGSEP") {
                vars[i] = ' '
            }
        }
        vars = vars.join('').split("\\ARGSEP")

        return vars
    }
    this.parse_inst = function (part) {
        let instructions = this.parse_vars(part)
        this.parsedvars = instructions
        let out = []
        for (let i in instructions) {
            let parsed = parse_item(instructions[i])
            if (typeof parsed === "string") {
                if (parsed.startsWith('R')) {
                    out.push({
                        type: "Function",
                        value: parseInt(parsed.substring(1), 10)
                    })
                } else {
                    for (let j in Instruction) {
                        if (Instruction[j].inst === parsed) {
                            out.push({
                                type: Instruction[j].label,
                                instruction: j
                            })
                        }
                    }
                }
            } else {
                out.push({
                    type: "Push",
                    value: parsed
                })
            }
        }

        return out
    }
    this.parse = function () {
        //   A layout of the program map:
        //   Section 0: Program Exports
        //     - These are just numbers associated with global variables, functions, etc
        //       for exporting into other modules.
        //   Section 1: Global Variables
        //     - A list of numbers, arrays, whatever to abstract over global
        //       singletons. This is sometimes called the "heap"
        //     - Contains the instruction counter, which is assigned to global value `0`
        //       and needs to be explicitly set.
        //   Section 2: Functions
        //     - Sometimes called a subroutine; a list of instructions surrounded by
        //       parenthesis is one function, and you can have multiple in their own
        //       pairs of parenthesis.
        //   Section 3: Entrypoint Instructions
        //     - These are just the instructions that the program starts to execute
        //       as an entrypoint, starting with the instruction that the instruction
        //       counter started pointing to.
        //   
        //   These sections are split into pipes `|`

        let parts = this.source.split('|')

        // Parse the "Global Variables" section's seperators
        let vars = this.parse_vars(parts[1])

        // Parse the "Global Variables" section's individual variables and push
        for (let i in vars) {
            this.globals.push(parse_item(vars[i]))
        }

        // Parse the "Entrypoint Instructions" section entirely
        this.instructions = this.parse_inst(parts[3])

        let functions = [] // List of functions
        let infn = false   // Is parser currently "inside" a function?
        let fn = 0         // Address of current function

        // Step through functions and parse separators between them
        for (let i in parts[2]) {
            // If there's an opening parenthesis, we are in a function
            if (parts[2][i] === '(') {
                functions[fn] = ""
                infn = true
            }

            // If not, tell the parser to stop parsing that function.
            else if (parts[2][i] === ')') {
                infn = false
                fn++
            }

            // If we're in a function, start parsing that function.
            else if (infn) {
                functions[fn] += parts[2][i]
            }
        }

        // Trim down each functions' whitespace just-in-case
        functions = functions.map(function (s) { return s.trim() })

        // Parse each functions' instructions, and push.
        for (let i in functions) {
            this.functions.push(this.parse_inst(functions[i]))
        }
    }

    // Parse the ENTIRE program and log the time it took to compile. If we're lucky
    // this might only take 1-2ms.

    let startofparse = millis()
    this.parse()
    debuglog("Compiled in " + (millis() - startofparse) + "ms.", info_t)

    this.run = function () {
        //   So, something is changing the instructions every single time and i have
        //   no idea. This is just a last-resort trick, but it results in a
        //   significant slowdown. Hopefully I can figure it out, but as it seems,
        //   the variable preceeding a Goto instruction seems to mirror the instrution
        //   counter, even after pushing it into the stack. Hopefully (or not, idk) this
        //   is some sort of Javascript bug that I'm not involved in creating because
        //   i'm completely stumped as to what's the issue here.


        {
            let parsed = parse_item(this.parsedvars[this.globals[0].value])
            if (typeof parsed === "string") {
                if (parsed.startsWith('R')) {
                    this.instructions[this.globals[0].value] = {
                        type: "Function",
                        value: parseInt(parsed.substring(1), 10)
                    }
                } else {
                    for (let j in Instruction) {
                        if (Instruction[j].inst === parsed) {
                            this.instructions[this.globals[0].value] = {
                                type: Instruction[j].label,
                                instruction: j
                            }
                        }
                    }
                }
            } else {
                this.instructions[this.globals[0].value] = {
                    type: "Push",
                    value: parsed
                }
            }
        }

        //   This basically just parses the instruction we're about to run, even
        //   though everything has already been parsed, but that's not working (see
        //   above) so this will have to do. I know I could store the instruction type
        //   into a buffer any only re-interpret the values themselves, but I don't
        //   see a reason into putting this much effort into a workaround for a
        //   (hopefully) temporary bug.


        let inst
        if (this.returns.length === 0) {
            inst = this.instructions[this.globals[0].value]
        } else {
            inst = this.functions[this.subroutines[this.subroutines.length - 1]][
                this.globals[0].value]
        }
        debugobj("Instruction " + this.globals[0].value, inst, info_t)
        if (inst.type === "Push") {
            if (Type[inst.value.typepointer].does_deref) {
                this.stack.push(this.globals[inst.value.subvalue.value])
            } else {
                this.stack.push(inst.value)
            }
        } else if (inst.type === "Function") {
            debuglog("Entering subroutine " + inst.value + "...", info_t)
            this.returns.push(this.globals[0].value)
            this.subroutines.push(inst.value)
            this.globals[0].value = -1
        } else {
            // weird naming schemes general
            let rawinst = Instruction[inst.instruction]
            let instack = []
            debugobj("wtf", this.stack, fatal_t)
            for (let i = 0; i < rawinst.requires; i++) {
                instack.push(this.stack.pop())
            }

            let out = rawinst.process(instack)
            if (out.deref) {
                for (let i in out.deref) {
                    this.stack.push(this.globals[out.deref[i]])
                }
            }
            for (let i in out.outstack) {
                this.stack.push(out.outstack[i])
            }

            if (out.globalreturn) {
                this.globals[out.globalreturn.index] = out.globalreturn.value
            }
        }
        debugobj("Stack", this.stack, info_t)
        debugobj("Heap", this.globals, info_t)

        this.globals[0].value++

        if (this.globals[0].value !== 0) {
            let rttail = this.subroutines[this.subroutines.length - 1]

            try {
                while (this.globals[0].value >= this.functions[rttail].length &&
                    this.returns.length >= 1) {

                    debuglog("Leaving subroutine " +
                        rttail + "...", debug_t)

                    debuglog("Program pointer is back at " +
                        (this.returns[this.returns.length - 1] + 1) + '.', debug_t)
                    this.globals[0].value = this.returns.pop() + 1
                    this.subroutines.pop()
                    rttail = this.subroutines[this.subroutines.length - 1]
                }
            } catch (_) { }
        }
    }
}

let p = new Program("|0 0||1 2 * c p 1 g")

let ex1 = new Program("|0|(2 *)|2 R0")
// Alma Code Examples:

// 1   Void fn multiply_by_2 does
// 2       core.stack.push(2)
// 3       core.stack.multiply
// 4   end
// 5
// 6   core.stack.push(2)
// 7   multiply_by_2

/**   --- or ---

// 1   Numeric fn multiply_by_2(Numeric i) does
// 2       i * 2
// 3   end
// 4
// 5   core.stack.push(multiply_by_2(2))

**/// --- or --- 

// 1   Numeric fn multiply_by_2(Numeric i) does i * 2
// 2
// 3   core.stack.push(multiply_by_2(2))

/**   --- or ---

// 1   use core.stack.push
// 2   Numeric fn multiply_by_2(Numeric i) does i * 2
// 3
// 4   multiply_by_2(2) |> push
**/

// Example Luma program:
let j = new Program("|0 12||&1 10 * *1 ^")
// inst. counter <---/   |  |   | |  \___\---->   Push value back into y
//    Numeric y = 12  <--/  |   | |
//                          |   | \-----> Multiply
//      Push value of y <---/   |
//                              v
//                      Push literal 10
//                             
//
// Alma code:       /-------------------------------------------------\
//                  |                                                 |
//                  | 1   pub mut Numeric y = 12                      |
//                  | 2   y = y * 10                                  |
//                  |                                                 |
//                  \-------------------------------------------------/

/** DRAW LOOP **/
textFont_(createFont("monospace"))
draw = function () {
    background(255)
    if (p.globals[0].value < p.instructions.length || p.returns.length >= 1) {
        p.run()
    }
    dd.draw()
    dd.handleInput()
}
