var directShow = false; //Displays precise location instead of smoothed/predictive; causes stuttering
var neat = {
    populi: 300, //Population
    mutate: 17,   //Mutation of Offspring
    random: 10,  //Random Attribute Generation at Begining
    biasly: 600, //Average 'bias' for movement
    
    //Advanced - Do Not Alter
    inputs: 4,
    senset: 0,
    bias:[],
    fitness:[],
    dead:[],
    weight:[],
    jump:[],
    ad:0,
    ct:0,
};
var ais = 0;
var speed = 2;
var difficulty = 100;
var bird = {
    gravity: [],
    y:[],
    ye:[],
};
var pipe = {
    x:[],
    y1:[],
    y2:[],
};
var focus = round(random(0,neat.populi));
var skip = 1;
var hs = 0;
for(var a = 0; a < neat.populi; a++){
    bird.gravity.push(0);
    neat.bias.push(random(-neat.biasly,neat.biasly));
    bird.ye.push(height/2);
    neat.weight.push([]);
    neat.dead.push(false);
    bird.y.push(height/2);
    for(var b = 0; b < neat.inputs; b++){
        neat.weight[a].push(random(-neat.random,neat.random));
    }
}
var fc = 0;
draw= function() {
    for(var frameSkip = 0; frameSkip < skip; frameSkip++){
    fc++;
    neat.ct++;
    background(15, 15, 15);
    if(fc - (floor(fc/(120/(speed-1)))*(120/(speed-1))) === 0){
        pipe.x.push(width);
        pipe.y1.push(random(0,height*(2/3)));
        pipe.y2.push(pipe.y1[pipe.x.length-1]+random(difficulty/2,difficulty));
    }
    fill(255, 255, 255);
    for(var a = 0; a < pipe.x.length; a++){
        pipe.x[a]-=speed;
        if(a === pipe.x.length-2){
            fill(255, 0, 0);
        }else{
            fill(255, 255, 255);
        }
        rect(pipe.x[a],-10,50,pipe.y1[a]+10,10);
        rect(pipe.x[a],pipe.y2[a],50,height,10);
    }
    fill(255, 0, 0);
    for(var a = 0; a < neat.populi; a++){
        var tar;
        if(pipe.x.length < 2){
            tar = 0;
        }else{
            tar = pipe.x.length-2;
        }
        var processBY = bird.y[a]*neat.weight[a][0];
        var processY1 = pipe.y1[tar]*neat.weight[a][1];
        var processY2 = pipe.y2[tar]*neat.weight[a][2];
        var processDS = (pipe.x[tar]-165)*neat.weight[a][3];
        var decision = processBY+processY1+processY2+processDS+neat.bias[a];
        neat.jump[a] = atan(decision);
        colorMode(HSB);
        fill(a*(255/neat.populi),255,255);
        if(bird.y[a] < pipe.y1[tar] && pipe.x[tar] < 165 && pipe.x[tar] > 115 && neat.dead[a] === false){
            neat.dead[a] = true;
            neat.ad++;
            neat.fitness[a] = neat.ct;
        }if(bird.y[a] > pipe.y2[tar] && pipe.x[tar] < 165 && pipe.x[tar] > 115 && neat.dead[a] === false){
            neat.dead[a] = true;
            neat.ad++;
            neat.fitness[a] = neat.ct;
        }
        if(a === ais){
            stroke(255,0, 255);
        }
        if(neat.dead[a] === false){
            if(directShow === true){
                rect(165,bird.y[a],10,10);
                if(a === ais){
                    line(165,bird.y[a],100,100);
                }
            }else{
                rect(165,bird.ye[a],10,10);
                if(a === ais){
                    line(165,bird.ye[a]+10,14,104);
                    line(175,bird.ye[a],136,21);
                }
            }
        }
        colorMode(RGB);
        stroke(0,0,0);
    }
    if(fc - (floor(fc/5)*5) === 0){
        for(var a = 0; a < neat.populi; a++){
            if(neat.jump[a] > neat.senset){
                bird.gravity[a] -= bird.gravity[a]/3;
                bird.y[a] -= random(30,40);
            }
        }
    }
    for(var a = 0; a < neat.populi; a++){
        bird.gravity[a] += 0.1;
        bird.y[a] +=bird.gravity[a];
        bird.ye[a] += (bird.y[a]-bird.ye[a])/(10*skip);
    }
    if(neat.ad === neat.populi){
        for(var a = 0; a < neat.populi; a++){
            if(neat.fitness[a] > hs){hs = a;}
        }
        for(var a = 0; a < neat.populi; a++){
            if(a !== hs){
            for(var b = 0; b < neat.inputs; b++){
                neat.weight[a][b] = neat.weight[hs][b]+random(-neat.mutate,neat.mutate);
            }}
            neat.bias[a] = neat.bias[hs] +random(-neat.mutate,neat.mutate);
            neat.dead[a] = false;
            bird.gravity[a] = 0;
            bird.y[a] = height/2;
            bird.ye[a] = height/2;
            pipe.x = [];
            pipe.y1 = [];
            pipe.y2 = [];
        }
        focus = hs;
        neat.ct = 0;
        neat.ad = 0;
    }
    }
    if(neat.dead[focus] !== true){
        ais = focus;
    }else{
        for(var a = 0; a < neat.populi; a++){
            if(neat.dead[a] !== true){
                ais = a;
            }
        }
    }
    stroke(255, 255, 255);
    fill(0, 0, 0);
    rect(7,8,130,100,20);
    stroke(0, 0, 0);
    fill(255);
    text("Viewing AI #"+ais,29,30);
    for(var a = 0; a < neat.inputs; a++){
        fill(neat.weight[ais][a]);
        ellipse(35,46+a*14,10,10);
        stroke(204, 204, 204);
        for(var b = 0; b < neat.inputs; b++){
            line(35,46+a*14,81,46+b*14);
        }
        line(81,46+a*14,114,67);
        line(114,67,114,88);
        stroke(0, 0, 0);
    }
    fill(bird.y[ais]*neat.weight[ais][0]);
    ellipse(81,46,10,10);
    fill(pipe.y1[pipe.x.length-2]*neat.weight[ais][0]);
    ellipse(81,60,10,10);
    fill(pipe.y2[pipe.x.length-2]*neat.weight[ais][0]);
    ellipse(81,74,10,10);
    fill(bird.y[ais]*neat.weight[ais][0]);
    ellipse(81,88,10,10);
    fill(neat.jump[ais]+90);
    ellipse(114,67,10,10);
    fill((neat.bias[ais]/neat.biasly)*255);
    ellipse(114,88,10,10);
};
