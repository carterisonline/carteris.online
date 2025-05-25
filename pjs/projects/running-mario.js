//BIOS
var ntsc = [124,124,124,0,0,252,0,0,188,68,40,188,148,0,132,201,0,32,168,16,0,136,20,0,80,48,0,0,120,0,0,104,0,0,88,0,0,64,88,0,0,0,0,0,0,0,0,0,188,188,188,0,120,248,0,88,248,104,68,252,216,0,204,228,0,88,248,56,0,228,92,16,172,124,0,0,184,0,0,168,0,0,168,68,0,136,136,0,0,0,0,0,0,0,0,0,248,248,248,60,188,252,104,136,252,152,120,248,248,120,248,248,88,152,248,120,88,252,160,68,248,184,0,184,248,24,88,216,84,88,248,152,0,232,216,120,120,120,0,0,0,0,0,0,252,252,252,164,228,252,184,184,248,216,184,248,248,184,248,248,164,192,240,208,176,252,224,168,255,216,120,216,248,120,184,248,184,184,248,216,0,252,252,248,216,248,0,0,0,0,0,0];
var palette = [32,5,13,54,56,41,26,44,12,3,19,36];

var ntscfill = function(n){
    fill(ntsc[n*3],ntsc[(n*3)+1],ntsc[(n*3)+2]);
};
var ntscinvfill = function(n){
    fill(255-ntsc[n*3],255-ntsc[(n*3)+1],255-ntsc[(n*3)+2]);
};
var hexa = "0123456789ABCDEF";
var deci = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var preload = function(from,into){
    for(var a = 0; a < from.length; a++){
        if(from[a] === "G"){
            into.push(a+1);
        }
    }
};
var spr = {
    line:0,
    hexTranslate:0,
    lineControl:0,
    draw:function(sprite,db,pos,x,y){
        for(var a = db[pos]; a < db[pos+1]-1; a+=2){
            spr.hexTranslate = 0;
            for(var b = 0; b < 16; b++){
                if(sprite[a] === hexa[b]){
                    spr.hexTranslate = b;
                }
            }
            noStroke();
            ntscfill(palette[sprite[a+1]]);
            if(sprite[a+1] !== "0"){
                rect(spr.lineControl+x,spr.line+y,deci[spr.hexTranslate]+1,1);
            }
            spr.lineControl+=deci[spr.hexTranslate]+1;
            if(spr.lineControl === 16){spr.lineControl = 0;spr.line++;}
        }
        spr.lineControl = 0;
        spr.hexTranslate = 0;
        spr.line = 0;
    },
    append:function(lib,x,y){
        spr.draw(lib.spr,lib.db,lib.animate,x,y);
    },
    preload:function(lib){
        preload(lib.spr,lib.db);
    }
};

//Sprite Library

var mario = {
    small:{
        spr:"205260100251124000028102300022130203224002131203023302300213121302230230001223424010124302500002111211026002311211025002314250000223120312500002132122501002410260106260G50424040024122103002810200302213020322102002131203023302002002131213022302003012234210302243022010122112112210000213311211020102000002231152010302100213620302030220821102001002115221020010022102100221021020223022G205260100251124000028102300022130203224002131203023302300213121302230230001223424010124302500002111211026002311211025002314250000223120312500002132122501002410260106260G504240400241221030028102003022130203221020021312030233020020021312130223020030122342103022430220201211121122102002311211020110300241120301103022012322102002210223120102001002214221020010022102101211021020223022G",
        db:[0],
        animate:0,
    }
};
var flowerstem = "702240601216122060024602106002160216021070021602160200800216020602006052160060760060760060521600800216020602007002160216020060021602160210600246021060121612207022G";
var flower = "F070323000221012110B011210022B12110B410200024B22310B0200027B123102128B020B110200622B02110B0200622B02110B02128B020B1102027B123102024B22310B0200022B12110B41020000221012110B011210703230G0022303230022B020012210B1210023B02110B410200123B02510B020000123B02610220122B02510240022B020B310250021B02310B0250021B02310B0240022B020B310220122B02510200123B026102123B02510B0200023B02110B410200022B020012210B121000223032G";
var flowerstem_db = [0];
var flower_db = [0];

//Sprite Preloading
spr.preload(mario.small);
preload(flowerstem,flowerstem_db);
preload(flower,flower_db);

//User Variables

var mx = 0;
var my = 112;
var marioanimate = 0;
var flowere = 0;
draw= function() {
    background(255, 255, 255);
    pushMatrix();
    scale(width/280,height/256);
    if(marioanimate === 1 || marioanimate === 3){
        spr.draw(mario.small.spr,mario.small.db,marioanimate,mx-3,my);
    }else{
        spr.draw(mario.small.spr,mario.small.db,marioanimate,mx,my);
    }
    if(frameCount/2 === floor(frameCount/2)){
        mx+=2;
    }
    if(frameCount/6 === floor(frameCount/6)){
        marioanimate++;
    }if(marioanimate > 3){marioanimate = 0;}
    if(mx > 280){mx = -16;my+=16;}
    spr.draw(flowerstem,flowerstem_db,0,265,128);
    spr.draw(flowerstem,flowerstem_db,0,257,128);
    if(my === 128){
        flowere = 1;
    }else{
        flowere = 0;
    }
    spr.draw(flower,flower_db,flowere,248,128);
    popMatrix();
};
