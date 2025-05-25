/**
 * JS-UNIX Update 0.07 - Arrows and Nano
        - Updated nano to v0.5
**/

function reportObject(obj, args, spacing) {
    args = (args === undefined) ? [] : args;
    spacing = (spacing === undefined) ? 0 : spacing;

    if (!args.includes("headless")) {
        println("\nEntries for " + obj + ":\n\n");
    }
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            var value = obj[k];
            for (var i = 0; i < spacing; i++) {
                print("  ");
            }
            if (args.includes("raw")) {
                print(k);
                if (typeof value === "object") {
                    print(" => {}");
                } else {
                    print(" =>");
                }
            } else {
                print("Entry \"" + k + "\" => \n");
            }

            if (args.includes("recursive") && typeof value === "object") {
                if (args.includes("raw")) {
                    reportObject(value, ["recursive", "headless", "raw"], spacing + 1);
                } else {
                    reportObject(value, ["recursive", "headless"], spacing + 1);
                }

            } else {
                if (!args.includes("raw")) {
                    for (var i = 0; i < spacing; i++) {
                        print("_\\");
                    }
                    print("  Contains " + typeof value + " (" + value + ")\n");
                }
                else {
                    print(" " + typeof value + " .. " + value + "\n");
                }

            }
        }
    }
    println("");
}

function remove_character(str, char_pos) {
    var part1 = str.substring(0, char_pos);
    var part2 = str.substring(char_pos + 1, str.length);
    return (part1 + part2);
}

function add_character(str, char, char_pos) {
    var part1 = str.substring(0, char_pos + 1);
    var part2 = str.substring(char_pos + 1, str.length);
    return (part1 + (char) + part2);
}

var command_list = [];
var commands = [];
var command_sel = null;
var terminal_timestamp = "";

var terminal_output = [];

var clock = 0;

var syscolor = {
    green: color(135, 255, 135),
    blue: color(0, 191, 255),
    white: color(255, 255, 255),
};

var directory = function (id) {
    this.item = "directory";
    this.id = id;
    this.containing = [];
};

var file = function (id, type, contents) {
    this.item = "file";
    this.id = id;
    this.contents = contents;
    this.type = type;
};

var sd0 = new directory("/");
var readme_contents = [
    "cd <directory> : Changes the user domain to input id; \"..\" will go backwards",
    "clear : clears the terminal screen ",
    "echo <text> : Prints text given; can take multiple arguments",
    "              Curly Braces (~) put between math will do the math",
    "                    \"~1 + 1~\" -> \"2\"",
    "              Single Quotes (\') identify strings of multiple words",
    "edit <file> <text> : Replaces file contents with a 1D string",
    "ls : Outputs files & directories located in user domain",
    "mkdir <name> : Creates a directory in user\'s domain",
    "mkfile <name> <type> : Creates a file with type in user\'s domain",
    "run <file> : Executes file as a shell or run type",
    "spit <file> : Outputs file contents string-by-string",
    "w : Shows active users on host",
];
var readme = new file("readme", "text", readme_contents);
sd0.containing.push(readme);
var test_script = new file("test_script", "run", ["echo \'This is a test script!\'", "mkdir super_cool_folder"]);
sd0.containing.push(test_script);

var sysuser = function (id) {
    this.perms = {
        read: false,
        write: false,
        execute: false,
    };
    this.task = null;
    this.process = "terminal";
    this.id = id;
    this.tag = syscolor.green;
    this.domain = "/";
    this.domain_id = [0];
    return this;
};

var root = new sysuser("root");
var carter = new sysuser("carter");
root.perms = {
    read: true,
    write: true,
    execute: true,
};
var host_id = "js-pc1";
var users = [root, carter];
var user = 0;

var event = {
    key: {
        pressed: false,
        code: null,
        string: "",
    },
};

var terminal_message = function (new_message) {
    if (terminal_output[terminal_output.length - 1].message !== "The console returned no message to display.") {
        var terminal_defaultoutputclass = {
            message: "The console returned no message to display.",
            author: {
                id: "console",
            },
            domain: "",
        };
        terminal_output.push(terminal_defaultoutputclass);
    }
    terminal_output[terminal_output.length - 1].message = new_message;
};

var stdparse = function (string_parse) {
    var in_command = false;
    var command_line = "";
    var parsed_out = [];
    var signed = false;
    for (var parse_sel = 0; parse_sel < string_parse.length; parse_sel++) {
        if (string_parse[parse_sel] === ' ') {
            if (in_command) {
                parsed_out.push(command_line);
            }
            command_line = "";
            in_command = false;
        }
        else {

            in_command = true;
            command_line += string_parse[parse_sel];
        }
    }
    parsed_out.push(command_line);
    var compute_mode = 0;
    var compute_out = 0;
    for (var sel = 0; sel < parsed_out.length; sel++) {
        var parsed = parseInt(parsed_out[sel], 10);
        if (parsed.toString() === parsed_out[sel]) {
            if (sel === 0) {
                compute_out += parsed;
            }
            else {
                switch (compute_mode) {
                    case 0: {
                        compute_out += parsed;
                        break;
                    } case 1: {
                        compute_out -= parsed;
                        break;
                    } case 2: {
                        compute_out *= parsed;
                        break;
                    } case 3: {
                        compute_out /= parsed;
                        break;
                    }
                }
            }
        } else {
            switch (parsed_out[sel]) {
                case "+": {
                    compute_mode = 0;
                    break;
                } case "-": {
                    compute_mode = 1;
                    break;
                } case "*": {
                    compute_mode = 2;
                    break;
                } case "/": {
                    compute_mode = 3;
                    break;
                }
            }
        }
    }
    return compute_out;
};

var parse = function (string_parse, char_parse) {
    var in_command = false;
    var in_string = -1;
    var command_line = "";
    var parsed_out = [];
    for (var parse_sel = 0; parse_sel < string_parse.length; parse_sel++) {
        if (string_parse[parse_sel] === '\'') {
            in_string = -in_string;
        }
        else if (string_parse[parse_sel] === '~') {
            if (in_string === 1) {
                command_line = stdparse(command_line).toString();
            }
            in_string = -in_string;
        }
        else if (string_parse[parse_sel] === char_parse && in_string === -1) {
            if (in_command) {
                parsed_out.push(command_line);
            }
            command_line = "";
            in_command = false;
        } else {
            in_command = true;
            command_line += string_parse[parse_sel];
        }
    }
    parsed_out.push(command_line);
    return parsed_out;
};

var get_directory = function () {
    var usr = users[user].domain_id;
    var dir = sd0.containing;
    var nam = "/";
    if (usr.length === 1) {
        dir = sd0;
    }
    for (var sel1 = 1; sel1 < usr.length; sel1++) {
        if (sel1 === usr.length - 1) {
            nam += dir[usr[sel1]].id;
            dir = dir[usr[sel1]];
        } else {
            nam += dir[usr[sel1]].id + "/";
            dir = dir[usr[sel1]].containing;
        }
    }
    this.item = dir;
    this.name = nam;
    users[user].domain = name;
    return this;
};

var mkdir = function (id_in) {
    var current_directory = get_directory();
    var r = [];
    var l = 8;
    for (var a = 0; a < users[user].domain_id.length; a++) {
        r.push(users[user].domain_id[a]);
    }
    while (r.length < 8) {
        r.push(0);
        l--;
    }

    var makefolder = new directory(id_in);

    //the awful code i have to write because of JS's lack of refrence variables

    if (l === 1) {
        sd0.containing.push(makefolder);
    } if (l === 2) {
        sd0.containing[r[1]].containing.push(makefolder);
    } if (l === 3) {
        sd0.containing[r[1]].containing[r[2]].containing.push(makefolder);
    } if (l === 4) {
        sd0.containing[r[1]].containing[r[2]].containing[r[3]].containing.push(makefolder);
    } if (l === 5) {
        sd0.containing[r[1]].containing[r[2]].containing[r[3]].containing[r[4]].containing.push(makefolder);
    } if (l === 6) {
        sd0.containing[r[1]].containing[r[2]].containing[r[3]].containing[r[4]].containing[r[5]].containing.push(makefolder);
    } if (l === 7) {
        sd0.containing[r[1]].containing[r[2]].containing[r[3]].containing[r[4]].containing[r[5]].containing[r[6]].containing.push(makefolder);
    } if (l === 8) {
        sd0.containing[r[1]].containing[r[2]].containing[r[3]].containing[r[4]].containing[r[5]].containing[r[6]].containing[r[7]].containing.push(makefolder);
    }
    terminal_message("Created new folder \"" + id_in + "\" in " + current_directory.name);
};

var mkfile = function (id_in, type_in) {
    var current_directory = get_directory();
    var r = [];
    var l = 8;
    for (var a = 0; a < users[user].domain_id.length; a++) {
        r.push(users[user].domain_id[a]);
    }
    while (r.length < 8) {
        r.push(0);
        l--;
    }

    var makefolder = new file(id_in, type_in, []);

    //the awful code i have to write because of JS's lack of refrence variables
    if (l === 1) {
        sd0.containing.push(makefolder);
    } if (l === 2) {
        sd0.containing[r[1]].containing.push(makefolder);
    } if (l === 3) {
        sd0.containing[r[1]].containing[r[2]].containing.push(makefolder);
    } if (l === 4) {
        sd0.containing[r[1]].containing[r[2]].containing[r[3]].containing.push(makefolder);
    } if (l === 5) {
        sd0.containing[r[1]].containing[r[2]].containing[r[3]].containing[r[4]].containing.push(makefolder);
    } if (l === 6) {
        sd0.containing[r[1]].containing[r[2]].containing[r[3]].containing[r[4]].containing[r[5]].containing.push(makefolder);
    } if (l === 7) {
        sd0.containing[r[1]].containing[r[2]].containing[r[3]].containing[r[4]].containing[r[5]].containing[r[6]].containing.push(makefolder);
    } if (l === 8) {
        sd0.containing[r[1]].containing[r[2]].containing[r[3]].containing[r[4]].containing[r[5]].containing[r[6]].containing[r[7]].containing.push(makefolder);
    }
    terminal_message("Created new file \"" + id_in + "\" in " + current_directory.name);
};

var edit = function (file, list_in) {
    var file_id;
    var current_directory = get_directory();
    for (var sel1 = 0; sel1 < current_directory.item.containing.length; sel1++) {
        if (current_directory.item.containing[sel1].id === file && current_directory.item.containing[sel1].item === "file") {
            file_id = sel1;
            break;
        }
    }
    var r = [];
    var l = 8;
    for (var a = 0; a < users[user].domain_id.length; a++) {
        r.push(users[user].domain_id[a]);
    }
    r.push(file_id);
    while (r.length < 8) {
        r.push(0);
        l--;
    }

    if (l === 2) {
        sd0.containing[r[1]].contents = list_in;
    } if (l === 3) {
        sd0.containing[r[1]].containing[r[2]].contents = list_in;
    } if (l === 4) {
        sd0.containing[r[1]].containing[r[2]].containing[r[3]].contents = list_in;
    } if (l === 5) {
        sd0.containing[r[1]].containing[r[2]].containing[r[3]].containing[r[4]].contents = list_in;
    } if (l === 6) {
        sd0.containing[r[1]].containing[r[2]].containing[r[3]].containing[r[4]].containing[r[5]].contents = list_in;
    } if (l === 7) {
        sd0.containing[r[1]].containing[r[2]].containing[r[3]].containing[r[4]].containing[r[5]].containing[r[6]].contents = list_in;
    } if (l === 8) {
        sd0.containing[r[1]].containing[r[2]].containing[r[3]].containing[r[4]].containing[r[5]].containing[r[6]].containing[r[7]].contents = list_in;
    }
};

//What a basic process looks like
var nano = function (file) {
    users[user].process = "nano";
    var nano_version = "0.5";
    //Startup Actions (runs on execute)
    var current_directory = get_directory();
    var file_editing = file;
    var file_contents = [];
    var nano_scroll = 0;
    var nano_x = 0;
    var nano_y = 0;
    var ctrl_mode = false;
    for (var sel1 = 0; sel1 < current_directory.item.containing.length; sel1++) {
        if (current_directory.item.containing[sel1].id === file) {
            for (var line_sel = 0; line_sel < current_directory.item.containing[sel1].contents.length; line_sel++) {
                file_contents.push(current_directory.item.containing[sel1].contents[line_sel]);
            }
            break;
        }
    }
    //end
    users[user].task = function () {
        pushMatrix();
        translate(0, 40 + (nano_scroll * 20));
        background(0);
        //Runtime Actions (runs constantly)
        textSize(12);
        textAlign(LEFT, RIGHT);
        nano_y = constrain(nano_y, 0, file_contents.length - 2);
        if (event.key.pressed) {
            switch (event.key.code) {
                case UP_ARROW: {
                    nano_y--;
                    break;
                }
                case DOWN_ARROW: {
                    nano_y++;
                    break;
                }
                case LEFT_ARROW: {
                    nano_x--;
                    break;
                }
                case RIGHT_ARROW: {
                    nano_x++;
                    break;
                }
                case 8: { //Backspace
                    file_contents[nano_y] = remove_character(file_contents[nano_y], nano_x);
                    nano_x--;
                    break;
                }
                case 17: { //Ctrl
                    ctrl_mode = !ctrl_mode;
                    break;
                }
            }
            if (ctrl_mode) {
                switch (event.key.string) {
                    case 'x' || 'X': {
                        users[user].process = "terminal";
                    }
                }
            } else if (event.key.code < 16 || event.key.code > 40 || event.key.code === 32) {
                if (event.key.code !== 144 && event.key.code !== 157 && event.key.code !== 8) {
                    file_contents[nano_y] = add_character(file_contents[nano_y], event.key.string, nano_x);
                    nano_x++;
                }
            }

            nano_x = constrain(nano_x, 0, file_contents[nano_y].length - 1);
            nano_y = constrain(nano_y, 0, file_contents.length - 2);
        }
        for (var line_sel = 0; line_sel < file_contents.length; line_sel++) {
            fill(syscolor.blue);
            text(line_sel + 1, 10, line_sel * 20 + 20);
            fill(syscolor.white);
            text(file_contents[line_sel], 10 + textWidth(file_contents.length.toString() + "  "), line_sel * 20 + 20);
        }
        fill(abs((clock % 60) - 30) * (255 / 60) + 127.5);
        if (event.key.pressed) { fill(syscolor.white); }
        text("|", nano_x * 6.6 + 13 + textWidth(file_contents.length.toString() + "  "), nano_y * 20 + 20);
        popMatrix();
        textAlign(CENTER, CENTER);
        fill(syscolor.white);
        if (current_directory.name === "/") {
            text("NANO v" + nano_version + " - Editing " + current_directory.name + "" + file_editing, width / 2, 20);
        }
        else {
            text("NANO v" + nano_version + " - Editing " + current_directory.name + "/" + file_editing, width / 2, 20);
        }

        fill(syscolor.blue);
        noStroke();
        rect(0, height * (23 / 24), width, height * (1 / 24));
        fill(0);
        rect(width * (1 / 90), height * (93 / 96), width * (6 / 30), height * (1 / 48));
        fill(syscolor.white);
        if (ctrl_mode) {
            fill(syscolor.blue);
        }
        rect(width * (1 / 90), height * (89 / 96), width * (3 / 30), height * (1 / 48));
        fill(0);
        text("Ctrlmode", width * (1.8 / 30), height * (45 / 48));
        fill(syscolor.white);
        textSize(width / 45);
        text("QUIT: Ctrl + X", width * (3 / 30), height * (47 / 48));
    };
};

var ls = function () {
    var current_directory = get_directory();
    terminal_message("Origin of " + current_directory.name + ":");
    for (var sel1 = 0; sel1 < current_directory.item.containing.length; sel1++) {
        if (current_directory.item.containing[sel1].item === "directory") {
            terminal_message(current_directory.item.containing[sel1].id + " [" + (current_directory.item.containing[sel1].item) + "]");
        } else {
            terminal_message(current_directory.item.containing[sel1].id + " [" + current_directory.item.containing[sel1].type + " " + (current_directory.item.containing[sel1].item) + "]");
        }
    }

};

var cd = function (directory_in) {
    var first_directory = users[user].domain;
    var current_directory = get_directory();
    if (directory_in[0] === ".." && users[user].domain_id.length > 1) {
        var temp_dir = [];
        for (var sel1 = 0; sel1 < users[user].domain_id.length - 1; sel1++) {
            temp_dir.push(users[user].domain_id[sel1]);
        }
        users[user].domain_id = temp_dir;
        terminal_message(users[user].id + " is now located in " + get_directory().name);
        return;
    }
    var parse_in = parse(directory_in[0], "/");
    if (directory_in[0][0] === "/") {
        users[user].domain_id = [0];
        users[user].domain = "/";
    }
    if (directory_in[0] !== "..") {
        for (var parse_sel = 0; parse_sel < parse_in.length; parse_sel++) {
            current_directory = get_directory();
            for (var sel1 = 0; sel1 < current_directory.item.containing.length; sel1++) {
                if (current_directory.item.containing[sel1].id === parse_in[parse_sel]) {
                    if (current_directory.item.containing[sel1].item === "directory") {
                        users[user].domain_id.push(sel1);
                    } else {
                        terminal_message(current_directory.item.containing[sel1].id + " is a file, and cannot be moved to.");
                    }
                    break;
                }
            }
        }
        if (first_directory === get_directory().name) {
            terminal_message(users[user].id + " will not be moved from " + get_directory().name);
        } else {
            terminal_message(users[user].id + " is now located in " + get_directory().name);
        }
        return;
    }

};

var echo = function (arr) {
    var term_out = "";
    for (var a = 0; a < arr.length; a++) {
        term_out += (arr[a] + " ");
    }
    terminal_message(term_out);
};

var clear = function () {
    terminal_output = [];
};

var w = function () {
    terminal_message("Users |");
    for (var user_sel = 0; user_sel < users.length; user_sel++) {
        var cuser = users[user_sel];
        terminal_message("   " + hex(user_sel, 2) + " | " + cuser.id + " ( Read: " + cuser.perms.read + ", Write: " + cuser.perms.write + ", Execute: " + cuser.perms.execute + ")");
    }
};

var spit = function (file_name) {
    var current_directory = get_directory();
    for (var sel1 = 0; sel1 < current_directory.item.containing.length; sel1++) {
        if (current_directory.item.containing[sel1].id === file_name[0] && current_directory.item.containing[sel1].item === "file") {
            for (var line_sel = 0; line_sel < current_directory.item.containing[sel1].contents.length; line_sel++) {
                terminal_message(current_directory.item.containing[sel1].contents[line_sel]);
            }
            break;
        }
    }
};

var command = function (str) {
    var parsed = parse(str, ' ');

    this.author = users[user].id;

    this.call = parsed[0];
    this.sub = subset(parsed, 1, Infinity);

    var terminal_defaultoutputclass = {
        message: "The console returned no message to display.",
        author: {
            id: "console",
        },
        domain: "",
    };

    terminal_output.push(terminal_defaultoutputclass);

    switch (this.call) {
        case "run": {
            var current_directory = get_directory();
            for (var sel1 = 0; sel1 < current_directory.item.containing.length; sel1++) {
                if (current_directory.item.containing[sel1].id === this.sub[0] && current_directory.item.containing[sel1].item === "file") {
                    if (current_directory.item.containing[sel1].type !== "run" && current_directory.item.containing[sel1].type !== "shell") {
                        terminal_message(current_directory.item.containing[sel1].id + " is not a shell or run file (currently " + current_directory.item.containing[sel1].type + ")");
                    } else {
                        terminal_message("Begin " + current_directory.item.containing[sel1].id + " output:");
                        for (var line_sel = 0; line_sel < current_directory.item.containing[sel1].contents.length; line_sel++) {
                            command(current_directory.item.containing[sel1].contents[line_sel]);
                        }
                    }
                    break;
                }
            }
            break;
        }
        case "echo": {
            echo(this.sub);
            break;
        }
        case "cls":
        case "clear": {
            clear();
            break;
        }
        case "w": {
            w();
            break;
        }
        case "ls": {
            ls();
            break;
        }
        case "cd": {
            cd(this.sub);
            break;
        }
        case "cat":
        case "spit": {
            spit(this.sub);
            break;
        }
        case "edit": {
            edit(this.sub[0], this.sub[1]);
            break;
        }
        case "help": {
            for (var a = 0; a < 9; a++) {
                cd([".."]);
            }
            spit(["readme"]);
            break;
        }
        case "mkdir": {
            mkdir(this.sub[0]);
            break;
        }
        case "mkfile": {
            mkfile(this.sub[0], this.sub[1]);
            break;
        }
        case "nano": {
            nano(this.sub[0]);
            break;
        }
    }
};

var terminal_subset = "";

var terminal = function () {
    textAlign(LEFT, RIGHT);
    get_directory();
    background(0, 0, 0);
    textSize(12);
    fill(255);
    for (var output_sel = 0; output_sel < terminal_output.length; output_sel++) {
        var msg = terminal_output[output_sel];
        var output_normal = terminal_output.length - output_sel;
        var author_text, location_text, amp_pad;
        var use_amp = false;
        if (msg.author.id !== "console") {
            use_amp = true;
            location_text = msg.domain + "  ";
            amp_pad = msg.domain;
            author_text = msg.author.id + "@" + host_id + ":";
        } else {
            location_text = "";
            author_text = " ";
        }


        fill(msg.author.tag ?? color(255));
        text(author_text, 10, height - output_normal * 20 - 60);
        fill(syscolor.blue);
        text(msg.domain, 10 + textWidth(author_text), height - output_normal * 20 - 60);
        fill(syscolor.white);
        text(msg.message, 10 + textWidth(author_text + location_text), height - output_normal * 20 - 60);
        if (use_amp) {
            text("$", 10 + textWidth(author_text + amp_pad), height - output_normal * 20 - 60);
        }
    }
    if (event.key.pressed) {
        if (event.key.code === 13) {
            terminal_output.push({
                message: terminal_subset,
                author: users[user],
                domain: users[user].domain,
            });
            commands.push({
                command: terminal_subset,
                timestamp: (("0" + hour()).slice(-2) + ":" + ("0" + minute()).slice(-2) + "." + ("0" + second()).slice(-2))
            });
            command_sel = null;
            terminal_timestamp = "";
            command(terminal_subset);
            terminal_subset = "";
        }
        else if (event.key.code === UP_ARROW && commands.length > 0) {
            command_sel = command_sel !== null ? command_sel - 1 : commands.length - 1;
            command_sel = constrain(command_sel, 0, commands.length - 1);
            terminal_timestamp = commands[command_sel].timestamp;
            terminal_subset = commands[command_sel].command;
        }

        else if (event.key.code === DOWN_ARROW && commands.length > 0) {
            command_sel = command_sel !== null ? command_sel + 1 : commands.length - 1;
            command_sel = constrain(command_sel, 0, commands.length - 1);
            terminal_timestamp = commands[command_sel].timestamp;
            terminal_subset = commands[command_sel].command;
        }

        else if (event.key.code === 8) {
            var temp_subset = "";
            for (var setsel = 0; setsel < terminal_subset.length - 1; setsel++) {
                temp_subset += terminal_subset[setsel];
            }
            terminal_subset = temp_subset;
        }
        else if (event.key.code < 16 || event.key.code > 40 && event.key.code !== 144 && event.key.code !== 157 || event.key.code === 32) {
            terminal_subset += event.key.string;
        }
    }
    textSize(30);
    if (clock % 60 < 30) {
        text(terminal_subset, 10, height - 30);
    } else {
        text(terminal_subset + "_", 10, height - 30);
    }
    fill(syscolor.blue);
    textSize(15);
    if (terminal_timestamp !== "") {
        text("ran @ " + terminal_timestamp, 10, height - 10);
    }
};
keyPressed = function () {
    event.key.pressed = true;
    event.key.code = keyCode;
    event.key.string = key.toString();
};
draw = function () {
    textFont_(createFont("monospace"));
    clock++;
    if (users[user].process === "terminal") {
        terminal();
    } else {
        if (event.key.pressed) {
            if (event.key.code === 81) {
                users[user].process = "terminal";
            }
        }
        users[user].task();
    }
    if (event.key.pressed) { event.key.pressed = false; }

    textAlign(LEFT, RIGHT);
    stroke(209, 0, 0, 50);
    noFill();
    strokeWeight(5);
    rect(width - 50, height - 50, 37, 37);
    fill(209, 0, 0, 50);
    textFont_(createFont("Basic Italic"));
    textSize(25);
    text("s", width - 30, height - 30);
};
