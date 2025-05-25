var p1 = {
    x:100,
    y:300,
    vel:{
        x:0,
        y:0,
    },inp:{
        u:0,d:0,l:0,r:0,
    },sm:10,sp:0.5,
    size:30,
};
var p2 = {
    x:500,
    y:300,
    vel:{
        x:0,
        y:0,
    },inp:{
        u:0,d:0,l:0,r:0,
    },sm:10,sp:0.5,
    size:30,
};
var ball = {
    x:300,
    y:300,
    vel:{
        x:0,
        y:0,
    },
    size:10,
    sm:20,
    sp:0.5,
};
var handleInputs = function(){
    keyReleased = function(){
        if(keyCode === 87){ //W
            p1.inp.u = 0;
        }if(keyCode === 83){ //S
            p1.inp.d = 0;
        }if(keyCode === 65){ //A
            p1.inp.l = 0;
        }if(keyCode === 68){ //D
            p1.inp.r = 0;
        }
    };
    if(keyIsPressed){
        if(key.toString() === "w"){
            p1.inp.u = 1;
            p1.inp.d = 0;
        }if(key.toString() === "s"){
            p1.inp.u = 0;
            p1.inp.d = 1;
        }if(key.toString() === "a"){
            p1.inp.l = 1;
            p1.inp.r = 0;
        }if(key.toString() === "d"){
            p1.inp.l = 0;
            p1.inp.r = 1;
        }
    }else{
        p1.inp.u = 0;
        p1.inp.d = 0;
        p1.inp.l = 0;
        p1.inp.r = 0;
    }if(round(mouseX/(1/p2.sp))*(1/p2.sp) > p2.x){
        p2.inp.r = 1;
        p2.inp.l = 0;
    }
    if(round(mouseX/(1/p2.sp))*(1/p2.sp) < p2.x){
        p2.inp.l = 1;
        p2.inp.r = 0;
    }
    if(round(mouseY/(1/p2.sp))*(1/p2.sp) < p2.y){
        p2.inp.u = 1;
        p2.inp.d = 0;
    }
    if(round(mouseY/(1/p2.sp))*(1/p2.sp) > p2.y){
        p2.inp.d = 1;
        p2.inp.u = 0;
    }
};
var handlePlayer = function(obj){
    if(obj.inp.u === 1){obj.vel.y-=obj.sp;}
    if(obj.inp.d === 1){obj.vel.y+=obj.sp;}
    if(obj.inp.l === 1){obj.vel.x-=obj.sp;}
    if(obj.inp.r === 1){obj.vel.x+=obj.sp;}
    obj.y+=obj.vel.y;
    obj.x+=obj.vel.x;
    obj.vel.y -= obj.vel.y/obj.sm;
    obj.vel.x -= obj.vel.x/obj.sm;
    obj.x = constrain(obj.x,obj.size/2,width-(obj.size/2));
    obj.y = constrain(obj.y,obj.size/2,height-(obj.size/2));
};
var handleBall = function(obj){
    if(p1.x+(p1.size/2) > obj.x-(obj.size/2) && p1.x-(p1.size/2) < obj.x+(obj.size/2) && p1.y+(p1.size/2) > obj.y-(obj.size/2) && p1.y-(p1.size/2) < obj.y+(obj.size/2)){
        obj.vel.x += p1.vel.x;
        obj.vel.y += p1.vel.y;
    }if(p2.x+(p2.size/2) > obj.x-(obj.size/2) && p2.x-(p2.size/2) < obj.x+(obj.size/2) && p2.y+(p2.size/2) > obj.y-(obj.size/2) && p2.y-(p2.size/2) < obj.y+(obj.size/2)){
        obj.vel.x += p2.vel.x;
        obj.vel.y += p2.vel.y;
    }
    obj.x += obj.vel.x;
    obj.y += obj.vel.y;
    obj.vel.x -= obj.vel.x/obj.sm;
    obj.vel.y -= obj.vel.y/obj.sm;
    if(obj.y-(obj.size/2) > height-2 || obj.y-(obj.size/2) < 2){
        obj.vel.y = -obj.vel.y;
    }if(obj.x-(obj.size/2) > width-2 || obj.x-(obj.size/2) < 2){
        obj.vel.x = -obj.vel.x;
    }
    obj.x = constrain(obj.x,(obj.size/2),width-(obj.size/2));
    obj.y = constrain(obj.y,(obj.size/2),height-(obj.size/2));
};
var drawPlayer = function(obj){
    noStroke();
    fill(0, 0, 0);
    ellipse(obj.x,obj.y,obj.size,obj.size);
    if(obj === p1){
        fill(255, 128, 0,10);
        triangle(obj.x,obj.y,0,0,width/2,0);
        triangle(obj.x,obj.y,0,height,0,height/2);
        triangle(obj.x,obj.y,width,height,width/2,height);
        triangle(obj.x,obj.y,width,0,width,height/2);
    }else if(obj === p2){
        fill(0, 128, 255,10);
        triangle(obj.x,obj.y,0,0,0,height/2);
        triangle(obj.x,obj.y,0,height,width/2,height);
        triangle(obj.x,obj.y,width,height,width,height/2);
        triangle(obj.x,obj.y,width,0,width/2,0);
    }
};
draw= function() {
    background(255, 255, 255);
    handleInputs();
    handleBall(ball);
    handlePlayer(p1);
    handlePlayer(p2);
    drawPlayer(p1);
    drawPlayer(p2);
    drawPlayer(ball);
};
