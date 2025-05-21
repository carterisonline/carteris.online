var Slide = 1;
var draw = function () {
    if (Slide === 1) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(50);
        textAlign(CENTER, CENTER);
        text("Hello!", 200, 200);
        mouseClicked = function () {
            Slide = 2;
        };
    }
    if (Slide === 2) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Welcome to my\nproject...", 200, 200);
        mouseClicked = function () {
            Slide = 3;
        };
    }
    if (Slide === 3) {
        background(0, 0, 0);
        textSize(60);
        textAlign(CENTER, CENTER);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("J", 16, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("A", 52, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("V", 94, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("A", 135, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("S", 177, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("C", 220, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("R", 262, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("I", 294, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("P", 325, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("T", 364, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("!", 390, 200);
        mouseClicked = function () {
            Slide = 4;
        };
    }
    if (Slide === 4) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("There are a lot of\nthings to do in\nJavaScript...", 200, 200);
        mouseClicked = function () {
            Slide = 5;
        };
    }
    if (Slide === 5) {
        background(0, 0, 0);
        fill(21, 255, 0);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("You can change font\ncolor,", 200, 200);
        mouseClicked = function () {
            Slide = 6;
        };
    }
    if (Slide === 6) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("You can see what\nslide you're on,", 200, 200);
        textSize(15);
        text("Slide is " + Slide, 31, 12);
        mouseClicked = function () {
            Slide = 7;
        };
    }
    if (Slide === 7) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("You can also make\ndrawings!", 200, 200);
        image(getImage("creatures/Winston"), 16, 267);
        image(getImage("creatures/Hopper-Cool"), 249, 17);
        mouseClicked = function () {
            Slide = 8;
        };
    }
    if (Slide === 8) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Which is what you're\ngoing to be learning\nright now!", 200, 200);
        mouseClicked = function () {
            Slide = 9;
        };
    }
    if (Slide === 9) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Running this program\nis something called,", 200, 200);
        mouseClicked = function () {
            Slide = 10;
        };
    }
    if (Slide === 10) {
        background(0, 0, 0);
        textSize(60);
        textAlign(CENTER, CENTER);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("J", 16, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("A", 52, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("V", 94, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("A", 135, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("S", 177, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("C", 220, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("R", 262, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("I", 294, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("P", 325, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("T", 364, 200);
        fill(random(0, 255), random(0, 255), random(0, 255));
        text("!", 390, 200);
        mouseClicked = function () {
            Slide = 11;
        };
    }
    if (Slide === 11) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Which I've definitely\ntalked about before.", 200, 200);
        mouseClicked = function () {
            Slide = 12;
        };
    }
    if (Slide === 12) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(80);
        textAlign(CENTER, CENTER);
        text("SO!", 200, 200);
        mouseClicked = function () {
            Slide = 13;
        };
    }
    if (Slide === 13) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Let's get started.", 200, 200);
        mouseClicked = function () {
            Slide = 14;
        };
    }
    if (Slide === 14) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("To create a circle, you\nneed to run the\nfunction ''Ellipse''.", 200, 200);
        mouseClicked = function () {
            Slide = 15;
        };
    }
    if (Slide === 15) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Type ''ellipse'' then an\nopening parenthese\nwithout a space in the\ntext box.", 200, 200);
        mouseClicked = function () {
            Slide = 16;
        };
    }
    if (Slide === 16) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Then, you need to tell\nthe program where to\nput it.", 200, 200);
        mouseClicked = function () {
            Slide = 17;
        };
    }
    if (Slide === 17) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("The program in\nfunction is on the right.\nIt is 400 pixels big.", 200, 200);
        mouseClicked = function () {
            Slide = 18;
        };
    }
    if (Slide === 18) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("The first thing you\nhave to add after the\nperenthesie is a\nnumber. That number\nis the ''X'' coordinate.\n(Left to Right)\nSet that to 200.", 200, 200);
        mouseClicked = function () {
            Slide = 19;
        };
    }
    if (Slide === 19) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Add a comma and the\nnext number, which is\nthe ''Y'' coordinate.\n(Up and Down)\nSet that also to 200.", 200, 200);
        mouseClicked = function () {
            Slide = 20;
        };
    }
    if (Slide === 20) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Add a comma and yet\nanother number, which\n is how big the circle is\nleft to right. Set that to\n100.", 200, 200);
        mouseClicked = function () {
            Slide = 21;
        };
    }
    if (Slide === 21) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Add the last comma,\nand the last number,\nwhich is how big it\nis up and down. Set\nthat to 100.", 200, 200);
        mouseClicked = function () {
            Slide = 22;
        };
    }
    if (Slide === 22) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Finally, add a closing\nparenthisie, and a\nsemicolon. A\nsemicolon looks like\nthis (;)", 200, 200);
        mouseClicked = function () {
            Slide = 23;
        };
    }
    if (Slide === 23) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Now you're done!\nYour code should look\nlike this:\nellipse(200,200,100,100);\n\nAnd your circle should look\nlike this:", 200, 135);
        fill(0, 0, 0);
        stroke(255, 255, 255);
        ellipse(200, 330, 100, 100);
        mouseClicked = function () {
            Slide = 24;
        };
    }
    if (Slide === 24) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Feel free to experiment! You\ncan add ''fill('' and\nKhanAcademy will give you\na color selector and you can\nchoose the color of the circle!", 200, 200);
        mouseClicked = function () {
            Slide = 25;
        };
    }
    if (Slide === 25) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(30);
        textAlign(CENTER, CENTER);
        text("If you want, you can go to\nthe tutorial section of the\nComputer Programming\nlessons and you can learn\nsome more about coding!", 200, 200);
        mouseClicked = function () {
            Slide = 26;
        };
    }
    if (Slide === 26) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(70);
        textAlign(CENTER, CENTER);
        text("Thank You!", 200, 200);
        mouseClicked = function () {
            Slide = 27;
        };
    }
    if (Slide === 27) {
        background(0, 0, 0);
        fill(255, 255, 255);
        textSize(70);
        textAlign(CENTER, CENTER);
        println("working...");
        println("done");
        println("slide is " + Slide);
        println("period 7 by user verosquid");
        mouseClicked = function () {
            Slide = 27;
        };
    }
};