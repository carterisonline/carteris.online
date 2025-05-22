//CREDIT TO VEROSQUID WE ARE WORKING TOGETHER ON THIS!!!
/**This is a test
 * Do not vote up this program.
 * Go to VeroSquid's Profile and vote it up there!
 
 
 
 
 
YES! Finally! We are now in beta!

Update Notes:
            Added a few bug fixes
            Enhanced engine and gameplay
            And a couple more things...

T-Shirt Colours: Red, Orange, Yellow, Green, Blue, LightBlue, Purple, Pink, White, Black, And Brown

AreaAt Areas: "Home", "Colony", "Planet BB", and "Spaceship"
 
 
 
\_\_\_       \_\_\_\_     \_\_\_\_       \_\_\_\_\_     \_\_\_\_\_
 \_           \_    \_     \_    \_       \_             \_
  \_           \_\_\_\_     \_    \_       \_             \_
   \_\_\_       \_           \_\_\_\_       \_             \_\_\_\_\_
        \_       \_           \_    \_       \_             \_
         \_       \_           \_    \_       \_             \_
      \_\_\_       \_           \_    \_       \_\_\_\_       \_\_\_\_\_
  


**/
textSize(15);
var cash = 0;
var Spk = 101;
var Clr = Spk - 100;
var Mov = Spk - 100;
var InBank = false;
var InStore = false;
var InBlacksmith = false;

var GameStart = false;
var draw = function () {
    var x = mouseX;
    var y = 320;
    //Your Personal Stuff
    var YourName = "Tim Fennel";
    var Black = false;
    var TShirtColour = "LightBlue";
    var AreaAt = "Home";
    var Translator = true;
    //Colony Sheets
    var ColonyName = "Colony";
    var Houseing_A = "Giant Building";
    var Houseing_B = "Big Building";
    var Houseing_C = "Small Building";
    var Houseing_D = "Home";
    //Code
    if (GameStart === false) {
        if (Spk > 100 && Spk < 700) {
            noStroke();
            Spk = Spk + 5;
            Clr = Clr + 5;
            Mov = Mov - 5;
            background(51, 0, 255);
            textSize(30);
            fill(0, 200, 200);
            text("Captical Specifications", 55, 348);
            textSize(350);
            fill(0, 225, 255);
            text("C", 80, 279);
            ellipse(296, 213, 60, 60);
            ellipse(296, 98, 60, 60);
        }
        else {
            textAlign(CENTER, CENTER);
            background(0, 0, 0);
            fill(255, 255, 0);
            textSize(50);
            text("Space Colony", 200, 35);
            rect(100, 200, 200, 50, 50);
            textSize(10);
            text("Space Colony Beta 0.46", 200, 392);
            fill(0, 0, 0);
            textSize(30);
            text("Start", 200, 225);
            if (mouseIsPressed && mouseX > 100 && mouseX < 300 && mouseY > 200 && mouseY < 250) {
                GameStart = true;
            }
        }
    }
    if (GameStart === true) {
        background(0, 0, 0);
        if (AreaAt === "Home") {

            //Button
            var goX = 150;
            var goY = 250;
            var goWidth = 100;
            var goHeight = 100;
            fill(92, 62, 7);
            rect(goX, goY, goWidth, goHeight, 5);
            fill(0, 0, 0);

            textAlign(LEFT, TOP);
            text("Click 4 Cash", goX + 10, goY + goHeight / 4);

            mouseClicked = function () {
                if (mouseX >= btnX && mouseX <= (goX + goWidth) &&
                    mouseY >= btnY && mouseY <= (goY + goHeight)) {
                    AreaAt = 1;

                }
            };

            //Mine
            textSize(15);
            fill(45, 25, 25);
            ellipse(200, 300, 250, 200);
            fill(33, 27, 27);
            ellipse(200, 300, 200, 150);
            fill(135, 93, 25);
            rect(150, 195, 100, 25);
            fill(0);

            text("MINE", 180, 200);
            var btnX = 150;
            var btnY = 250;
            var btnWidth = 100;
            var btnHeight = 50;
            fill(255, 0, 0);
            text("CASH:", 300, 3);
            text(cash, 350, 3);

            var btnX = 150;
            var btnY = 250;
            var btnWidth = 100;
            var btnHeight = 100;
            fill(92, 62, 7);
            rect(btnX, btnY, btnWidth, btnHeight, 5);
            fill(0, 0, 0);

            textAlign(LEFT, TOP);
            text("Click 4 Cash", btnX + 10, btnY + btnHeight / 4);

            mouseClicked = function () {
                if (mouseX >= btnX && mouseX <= (btnX + btnWidth) &&
                    mouseY >= btnY && mouseY <= (btnY + btnHeight)) {
                    cash = cash + 1;

                }
            };













            //Ground
            fill(0, 100, 0);
            rect(0, 350, 663, 50);
            rect(0, 300, 663, 100);
            fill(255, 0, 0);
            ellipse(190, 350, 9, 9);
            ellipse(300, 375, 9, 9);
            ellipse(120, 380, 9, 9);
            ellipse(110, 325, 9, 9);
            ellipse(19, 360, 9, 9);
            ellipse(370, 370, 9, 9);
            //Path
            fill(150, 138, 138);
            rect(0, 330, 400, 25);
            //You
            //Body
            if (TShirtColour === "Red") {
                fill(255, 0, 0);
            }
            if (TShirtColour === "Orange") {
                fill(255, 100, 0);
            }
            if (TShirtColour === "Yellow") {
                fill(255, 255, 0);
            }
            if (TShirtColour === "Green") {
                fill(0, 200, 0);
            }
            if (TShirtColour === "Blue") {
                fill(0, 0, 255);
            }
            if (TShirtColour === "LightBlue") {
                fill(0, 200, 255);
            }
            if (TShirtColour === "Purple") {
                fill(150, 0, 255);
            }
            if (TShirtColour === "Pink") {
                fill(255, 0, 255);
            }
            if (TShirtColour === "Brown") {
                fill(92, 54, 54);
            }
            if (TShirtColour === "Black") {
                fill(87, 87, 87);
            }
            if (TShirtColour === "White") {
                fill(255, 255, 255);
            }

            rect(x, y - 10, 20, 30);
            //Face
            if (Black === false) {
                fill(255, 153, 153);
            }
            if (Black === true) {
                fill(74, 51, 19);
            }
            ellipse(x + 10, y - 18, 30, 30);
            //Sky
            stroke(255, 255, 0);
            point(141, 50);
            point(329, 191);
            point(90, 90);
            point(175, 175);
            point(60, 60);
            point(60, 150);
            point(200, 5);
            point(300, 25);
            stroke(0, 0, 0);
            //Guy 1
            fill(255, 0, 0);
            rect(229, y - 10, 20, 30);
            if (Black === false) {
                fill(255, 153, 153);
            }
            if (Black === true) {
                fill(74, 51, 19);
            }
            ellipse(239, y - 18, 30, 30);
            if (mouseX > 224 && mouseX < 254) {
                fill(255, 255, 255);

                if (YourName === "") {
                    text("Hello!", 200, 273);
                }
                else if (YourName === "DaSandwichMan") {
                    text("I Hate You.", 180, 273);
                }
                else if (YourName === "DaSandwichManOfDaWorld") {
                    text("I Hate You.", 180, 273);
                }

                else if (YourName === "TheSandwichMan") {
                    text("I Hate You.", 180, 273);
                }
                else if (YourName === "TheSandwichManOfTheWorld") {
                    text("I Hate You.", 180, 273);
                }
                else {
                    text("Hello, " + YourName + "!", 180, 283);
                }

            }
            //Shop View
            fill(194, 119, 119);
            rect(300, 251, 100, 100);
            fill(71, 45, 45);
            rect(300, 302, 25, 49);
            fill(255, 255, 0);
            ellipse(308, 325, 10, 10);
            //Blacksmith View
            fill(112, 112, 112);
            rect(0, 251, 100, 100);
            fill(71, 45, 45);
            rect(75, 302, 25, 49);
            fill(255, 255, 0);
            ellipse(95, 325, 10, 10);
            if (YourName === "DEATH") {
                background(255, 0, 0);
                fill(random(0, 255));
                textSize(50);
                text("You DIED", 200, 200);
            }
            var Shop = function () {
                if (YourName === "DEATH") {
                    background(255, 0, 0);
                    fill(random(0, 255));
                    text("You DIED", 100, 100);
                }
                //Wall
                background(194, 119, 119);
                //Counter
                fill(71, 45, 45);
                rect(0, 325, 400, 100);
                //Arms
                fill(255, 0, 0);
                rect(219, 215, 40, 90);
                rect(136, 215, 40, 90);
                //Hair
                fill(116, 145, 145);
                rect(150, 100, 100, 74);
                //Body
                fill(255, 0, 0);
                rect(175, 200, 50, 125);
                //Logo
                fill(139, 180, 186);
                text("Shop", 183, 251);
                //Face
                fill(255, 153, 153);
                ellipse(200, 173, 100, 100);
                //Smiley Mouth
                fill(0, 0, 0);
                ellipse(200, 183, 75, 75);
                fill(255, 153, 153);
                noStroke();
                ellipse(200, 179, 83, 75);
                //Left Eye
                fill(0, 150, 255);
                ellipse(179, 155, 20, 10);
                fill(0, 0, 0);
                ellipse(179, 155, 10, 9);

                //Right Eye
                fill(0, 150, 255);
                ellipse(223, 155, 20, 10);
                fill(0, 0, 0);
                ellipse(222, 155, 10, 9);
                //Nose
                fill(0, 0, 0);
                text("J", 200, 175);
                //Exit
                fill(255, 0, 0);
                rect(0, 0, 50, 50);
                fill(0, 0, 0);
                text("Exit", 24, 26);

                //"Welcome!"
                stroke(0, 0, 0);
                line(234, 128, 263, 100);
                if (YourName === "DaSandwichMan") {
                    text("I Hate You.", 265, 90);
                }
                else {
                    text("Welcome!", 265, 90);
                }
                //Case 1
                fill(90, 50, 50);
                rect(276, 268, 100, 25);
                fill(255, 200, 0);
                rect(309, 268, 30, 10);
            };
            var Blacksmith = function () {
                if (YourName === "DEATH") {
                    background(255, 0, 0);
                    fill(random(0, 255));
                    text("You DIED", 100, 100);
                }
                textAlign(LEFT, RIGHT);
                background(90, 90, 90);
                fill(74, 17, 19);
                rect(0, 310, 400, 90);
                fill(255, 255, 235);
                rect(270, 200, 90, 135);
                fill(255, 0, 0);

                if (YourName === "DaSandwichMan") {
                    text("I Hate", 280, 260);
                    text("You.", 280, 300);
                }
                else {
                    text("I love", 296, 260);
                    text("CATS", 292, 300);
                }


                fill(255, 0, 0);
                rect(155, 130, 90, 180);
                fill(153, 105, 34);
                ellipse(200, 100, 100, 100);
                fill(0, 0, 0);
                rect(167, 0, 70, 84);
                ellipse(200, 75, 116, 34);
                rect(246, 140, 100, 50);
                rect(105, 146, 50, 131);
                fill(153, 105, 34);
                rect(345, 136, 40, 54);
                fill(150, 78, 78);
                rect(365, 94, 10, 88);
                fill(255, 0, 0);
                rect(341, 88, 44, 20);
                fill(0, 0, 0);
                text("Wadda you want?", 274, 63);
                line(243, 123, 338, 67);
                strokeWeight(1);
                fill(0, 0, 0);
                text("Blacksmith", 162, 191);
                line(220, 136, 175, 130);
                fill(255, 0, 0);
                rect(0, 0, 50, 50);
                fill(0, 0, 0);
                text("Exit", 4, 34);
                text("J", 200, 112);
            };



            if (mouseX < 100 && mouseY > 250 && mouseIsPressed) {
                InBlacksmith = true;
            }
            if (InBlacksmith === true) {
                Blacksmith();
            }
            if (mouseX > 300 && mouseY > 250 && mouseIsPressed) {
                InStore = true;
            }
            if (InStore === true) {
                Shop();

            }
            if (InStore === true && mouseX < 50 && mouseY < 50 && mouseIsPressed) {
                InStore = false;
            }
            if (InBlacksmith === true && mouseX < 50 && mouseY < 50 && mouseIsPressed) {
                InBlacksmith = false;
            }

        }

        else {
            noStroke();
            background(200, 0, 255);
            fill(200, 0, 255);
            ellipse(200, 200, 400, 400);
            fill(0, 0, 0);
            ellipse(200, 200, 375, 375);
            fill(200, 0, 255);
            ellipse(200, 200, 350, 350);
            fill(0, 0, 0);
            ellipse(200, 200, 325, 325);
            fill(200, 0, 255);
            ellipse(200, 200, 300, 300);
            fill(0, 0, 0);
            ellipse(200, 200, 275, 275);
            fill(200, 0, 255);
            ellipse(200, 200, 250, 250);
            fill(0, 0, 0);
            ellipse(200, 200, 225, 150);
        }
        if (AreaAt === "Spaceship") {
            background(0, 0, 0);
            stroke(0, 0, 0);
            fill(120, 120, 120);
            rect(0, 250, 400, 150);
            rect(0, 0, 400, 50);
            fill(0, 100, 0);
            ellipse(60, 150, 100, 100);
            fill(255, 255, 255);
            textAlign(CENTER, CENTER);
            text("Home", 60, 86);
            if (ColonyName === "") {
                text("Colony", 325, 86);
            }
            else {
                text(ColonyName, 325, 86);
            }
            fill(0, 100, 0);
            if (ColonyName === "Deathville") {
                fill(random(0, 255), 0, 0);

            }
            if (ColonyName === "Corruption") {
                fill(random(0, 255), random(0, 255), random(0, 255));

            }
            ellipse(325, 150, 100, 100);
            fill(255, 0, 0);
            ellipse(174, 327, 100, 100);
            rect(102, 280, 1, 100);
            rect(88, 365, 30, 1);
            ellipse(41, 293, 30, 30);
            ellipse(41, 378, 30, 30);
            ellipse(41, 336, 30, 30);
            ellipse(286, 293, 60, 60);
            ellipse(370, 293, 60, 60);
            rect(238, 365, 150, 1);
            rect(288, 350, 1, 30);
        }
        if (AreaAt === "Planet BB") {

            background(0, 0, 0);
            if (TShirtColour === "Red") {
                fill(255, 0, 0);
            }
            if (TShirtColour === "Orange") {
                fill(255, 100, 0);
            }
            if (TShirtColour === "Yellow") {
                fill(255, 255, 0);
            }
            if (TShirtColour === "Green") {
                fill(0, 200, 0);
            }
            if (TShirtColour === "Blue") {
                fill(0, 0, 255);
            }
            if (TShirtColour === "LightBlue") {
                fill(0, 200, 255);
            }
            if (TShirtColour === "Purple") {
                fill(150, 0, 255);
            }
            if (TShirtColour === "Pink") {
                fill(255, 0, 255);
            }
            if (TShirtColour === "Brown") {
                fill(92, 54, 54);
            }
            if (TShirtColour === "Black") {
                fill(87, 87, 87);
            }
            if (TShirtColour === "White") {
                fill(255, 255, 255);
            }

            rect(x, y - 10, 20, 30);
            //Face
            if (Black === false) {
                fill(255, 153, 153);
            }
            if (Black === true) {
                fill(74, 51, 19);
            }
            ellipse(x + 10, y - 18, 30, 30);
            fill(0, 100, 0);
            rect(0, 350, 400, 50);
            fill(194, 119, 119);
            rect(300, 251, 100, 100);
            fill(71, 45, 45);
            rect(300, 302, 25, 49);
            fill(255, 255, 0);
            textSize(15);
            text("$", 301, 321, 30, 30);
            if (mouseX > 325) {
                textAlign(CENTER, CENTER);
                background(194, 119, 119);
                fill(0, 255, 255);
                ellipse(200, 300, 150, 150);
                fill(148, 143, 10);
                ellipse(200, 200, 130, 130);
                fill(255, 255, 255);
                ellipse(200, 170, 30, 30);
                fill(0, 0, 0);
                ellipse(200, 170, 15, 15);
                fill(0, 0, 0);
                if (Translator === true) {
                    text("Translation: ''Welcome To The Bank!''", 200, 118);
                }
                else {
                    text("Esdenwesquaz Dosepliyn Tsunoiv!", 200, 118);
                }
                fill(110, 43, 43);
                rect(0, 325, 400, 750);


            }
        }
        if (AreaAt === "1") {
            background(0, 0, 0);
            stroke(0, 0, 0);

            ellipse(x + 6, y, 15, 15);
            var House = function (X) {
                fill(194, 119, 119);
                rect(X, 265, 85, 85);
                fill(56, 26, 26);
                rect(X + 30, 310, 20, 40);
                fill(255, 255, 0);
                ellipse(X + 45, 329, 7, 7);
                rect(X + 52, 275, 25, 25);
                rect(X + 4, 275, 25, 25);

            };
            var Sign = function (xty) {
                noStroke();
            };
            var Small_Building = function (xy) {
                fill(194, 119, 119);
                rect(xy, 180, 85, 170);
                rect(xy + 10, 310, 10, 40);
                fill(56, 26, 26);
                rect(xy + 30, 310, 20, 40);
                fill(255, 255, 0);
                ellipse(xy + 45, 329, 7, 7);
                rect(xy + 5, 200, 20, 20);
                rect(xy + 31, 200, 20, 20);
                rect(xy + 60, 200, 20, 20);
                rect(xy + 5, 230, 20, 20);
                rect(xy + 31, 230, 20, 20);
                rect(xy + 60, 230, 20, 20);
                rect(xy + 5, 260, 20, 20);
                rect(xy + 31, 260, 20, 20);
                rect(xy + 60, 260, 20, 20);
                rect(xy + 5, 290, 20, 20);
                rect(xy + 31, 290, 20, 20);
                rect(xy + 60, 290, 20, 20);
                rect(xy + 5, 320, 20, 20);
                rect(xy + 60, 320, 20, 20);
            };
            var Big_Building = function (xy) {
                fill(194, 119, 119);
                rect(xy, 130, 85, 220);
                rect(xy + 10, 310, 10, 40);
                fill(56, 26, 26);
                rect(xy + 30, 310, 20, 40);
                fill(255, 255, 0);
                ellipse(xy + 45, 329, 7, 7);
                rect(xy + 5, 200, 20, 20);
                rect(xy + 31, 200, 20, 20);
                rect(xy + 60, 200, 20, 20);
                rect(xy + 5, 230, 20, 20);
                rect(xy + 31, 230, 20, 20);
                rect(xy + 60, 230, 20, 20);
                rect(xy + 5, 260, 20, 20);
                rect(xy + 31, 260, 20, 20);
                rect(xy + 60, 260, 20, 20);
                rect(xy + 5, 290, 20, 20);
                rect(xy + 31, 290, 20, 20);
                rect(xy + 60, 290, 20, 20);
                rect(xy + 5, 320, 20, 20);
                rect(xy + 60, 320, 20, 20);
                rect(xy + 5, 170, 20, 20);
                rect(xy + 31, 170, 20, 20);
                rect(xy + 60, 170, 20, 20);
                rect(xy + 5, 140, 20, 20);
                rect(xy + 31, 140, 20, 20);
                rect(xy + 60, 140, 20, 20);
            };
            var Giant_Building = function (xy) {
                fill(194, 119, 119);
                rect(xy, 70, 85, 280);
                rect(xy + 10, 310, 10, 40);
                fill(56, 26, 26);
                rect(xy + 30, 310, 20, 40);
                fill(255, 255, 0);
                ellipse(xy + 45, 329, 7, 7);
                rect(xy + 5, 200, 20, 20);
                rect(xy + 31, 200, 20, 20);
                rect(xy + 60, 200, 20, 20);
                rect(xy + 5, 230, 20, 20);
                rect(xy + 31, 230, 20, 20);
                rect(xy + 60, 230, 20, 20);
                rect(xy + 5, 260, 20, 20);
                rect(xy + 31, 260, 20, 20);
                rect(xy + 60, 260, 20, 20);
                rect(xy + 5, 290, 20, 20);
                rect(xy + 31, 290, 20, 20);
                rect(xy + 60, 290, 20, 20);
                rect(xy + 5, 320, 20, 20);
                rect(xy + 60, 320, 20, 20);
                rect(xy + 5, 170, 20, 20);
                rect(xy + 31, 170, 20, 20);
                rect(xy + 60, 170, 20, 20);
                rect(xy + 5, 140, 20, 20);
                rect(xy + 31, 140, 20, 20);
                rect(xy + 60, 140, 20, 20);
                rect(xy + 5, 110, 20, 20);
                rect(xy + 31, 110, 20, 20);
                rect(xy + 60, 110, 20, 20);
                rect(xy + 5, 80, 20, 20);
                rect(xy + 31, 80, 20, 20);
                rect(xy + 60, 80, 20, 20);
            };
            //_________________________________________________
            fill(0, 100, 0);
            rect(0, 350, 400, 50);
            if (Houseing_A === "Home") {
                House(0);
            }
            else {
                Sign(25);
            }
            if (Houseing_B === "Home") {
                House(100);
            }
            else {
                Sign(125);
            }
            if (Houseing_C === "Home") {
                House(200);
            }
            else {
                Sign(225);
            }
            if (Houseing_D === "Home") {
                House(300);
            }
            else {
                Sign(225);
            }
            if (Houseing_A === "Empty") {

            }
            if (Houseing_B === "Empty") {

            }
            if (Houseing_C === "Empty") {

            }
            if (Houseing_D === "Empty") {

            }
            if (Houseing_A === "Small Building") {
                Small_Building(0);
            }
            else {
                Sign(225);
            }
            if (Houseing_B === "Small Building") {
                Small_Building(100);
            }
            else {
                Sign(225);
            }
            if (Houseing_C === "Small Building") {
                Small_Building(200);
            }
            else {
                Sign(225);
            }
            if (Houseing_D === "Small Building") {
                Small_Building(300);
            }
            else {
                Sign(225);
            }
            if (Houseing_A === "Big Building") {
                Big_Building(0);
            }
            else {
                Sign(225);
            }
            if (Houseing_B === "Big Building") {
                Big_Building(100);
            }
            else {
                Sign(225);
            }
            if (Houseing_C === "Big Building") {
                Big_Building(200);
            }
            else {
                Sign(225);
            }
            if (Houseing_D === "Big Building") {
                Big_Building(300);
            }
            else {
                Sign(225);
            }
            if (Houseing_A === "Giant Building") {
                Giant_Building(0);
            }
            else {
                Sign(225);
            }
            if (Houseing_B === "Giant Building") {
                Giant_Building(100);
            }
            else {
                Sign(225);
            }
            if (Houseing_C === "Giant Building") {
                Giant_Building(200);
            }
            else {
                Sign(225);
            }
            if (Houseing_D === "Giant Building") {
                Giant_Building(300);
            }
            else {
                Sign(325);
            }


            //_________________________________________________
            if (TShirtColour === "Red") {
                fill(255, 0, 0);
            }
            if (TShirtColour === "Orange") {
                fill(255, 100, 0);
            }
            if (TShirtColour === "Yellow") {
                fill(255, 255, 0);
            }
            if (TShirtColour === "Green") {
                fill(0, 200, 0);
            }
            if (TShirtColour === "Blue") {
                fill(0, 0, 255);
            }
            if (TShirtColour === "LightBlue") {
                fill(0, 200, 255);
            }
            if (TShirtColour === "Purple") {
                fill(150, 0, 255);
            }
            if (TShirtColour === "Pink") {
                fill(255, 0, 255);
            }
            if (TShirtColour === "Brown") {
                fill(92, 54, 54);
            }
            if (TShirtColour === "Black") {
                fill(87, 87, 87);
            }
            if (TShirtColour === "White") {
                fill(255, 255, 255);
            }

            rect(x, y, 10, 20);
            //Face
            if (Black === false) {
                fill(255, 153, 153);
            }
            if (Black === true) {
                fill(74, 51, 19);
            }
            ellipse(x + 5, y - 5, 20, 20);
        }

    }
};

