var minimapZoom = 13;

var keyRelease = false;
var report = false;

var hexa = "()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^abcdefghijklmnopqrstuvwxyz{|}~¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþ";
//http://dot2pic.com/
var lighthouse = function (pkg) {
    this.r = [];
    this.g = [];
    this.b = [];
    this.index = [];
    this.id = pkg.id;
    for (var a = 0; a < pkg.colors.length; a++) {
        var s = 0;
        var rs = floor(pkg.colors[a] / sq(255));
        this.r.push(rs);
        s += rs * sq(255);
        var gs = floor((pkg.colors[a] - s) / 255);
        this.g.push(gs);
        s += gs * 255;
        var bs = floor((pkg.colors[a] - s));
        this.b.push(bs);
    }
    for (var a = 0; a < pkg.imgData.length; a++) {
        for (var b = 0; b < hexa.length; b++) {
            if (pkg.imgData[a] === hexa[b]) {
                this.index.push(b);
                break;
            }
        }
    }
    this.createImage = function (alpha, beta) {
        noStroke();
        fill(255);
        rect(0, 0, this.id[0], this.id[1]);
        var imgout = get(1, 1, this.id[0] - 1, this.id[1] - 1);
        for (var a = 0; a < this.id[0]; a++) {
            var center = lerp((this.id[1] / 2) * (1 - alpha), (this.id[1] / 2) * (1 - beta), a / this.id[0]);
            var nudge = lerp(alpha, beta, a / this.id[0]);
            for (var b = 0; b < this.id[1]; b++) {
                var space = a + (b * this.id[0]);
                imgout.set(a, floor((b * nudge) + center), color(this.r[this.index[space]],
                    this.g[this.index[space]],
                    this.b[this.index[space]], 255));
                //point(a, (b * nudge) + center);

                //node[0] = x * cosTheta + z * sinTheta;
                //node[2] = z * cosTheta - x * sinTheta;
            }
        }
        for (var a = 1; a < this.id[0]; a++) {
            for (var b = 0; b < this.id[1]; b++) {
                var ide = (a + (b * this.id[0])) * 4;
                var s = imgout.get(a, b);
                if (red(s) > 250 && green(s) > 250 && blue(s) > 250) {
                    imgout.set(a, b, color(red(s), green(s), blue(s), 0));
                }
            }
        }
        return imgout;
    };
};
var textures = [];
var txtsize = [];
var rotationProgress = -1;
var rotationQueue = 0;
var rotationCalculate = true;
var rotationCollection = function (source, frames, id) {
    if (rotationProgress === -1) {
        textures[id] = [];
        txtsize[id] = frames;
        rotationQueue += frames * 2;
    } else {
        if (rotationProgress > rotationQueue - frames * 2 && rotationProgress < rotationQueue) {
            var rx = floor(rotationProgress / frames) * frames;
            var rid = rotationProgress - (rotationQueue - frames * 2) - rx;
            if (floor(rotationProgress / frames) === 0) {
                textures[id].push(source.createImage(1, lerp(1, 0, rid / frames)));
            }
            else {
                textures[id].push(source.createImage(lerp(1, 0, rid / frames), 1));
            }

        }
    }
};

var p_wall1 = {
    colors: [6854505, 8220009, 7763042, 6392148, 6397538, 7768439, 8225406, 5026637, 4112703, 7761250, 7757652, 5935174, 4569670, 5933375, 3655736, 8212827, 5478214, 5483604, 5940571, 9596307, 5023018, 11873953, 8682373, 3198769, 9589118, 5023032, 8676976, 6845510, 8669794, 10504844, 2741802, 4107306, 4109091, 10046085, 7761243, 9126754, 6392134, 11424175, 13232282, 10053274, 11416986, 10046078, 6849108, 9133922, 10047870, 2284835, 10038896, 12330920, 3196949, 10967208, 2739989, 11408005, 10951038, 4564266, 10510241, 10495863, 8219995, 5021240, 12338109, 6399302, 5935167, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062, 1826062],
    imgData: "^^444444444444444444444ddd4444444444444444444444444444444444444444444444444444444444444444444444444444ddd444444444444444444444^^^^dd^^^^^/^^d^^/^^/ddd/9:////d/d/ddddddddd/dd/dd//dd4d///d/dd4dddd4dd/d///d4dd//dd/dd/ddddddddd/d/d////:9/ddd/^^/^^d^^/^^^^^dd^^/3/*CCCCd:dCC33::C:::/:f(ff::/:/9999*7*(((C(f((ff((:9::(:::9999999999:::(::9:((ff((f(C(((*7*9999/:/::ff(f:/:::C::33CCd:dCCCC*/3//L>O..bSS*SSS>S@S>K@OO@O;KK;.7fCfff(7K@K;;D;.;;KK;;;;KK;;KK;.(ffff(.;KK;;KK;;;;KK;;.;D;;K@K7(fffCf7.;KK;O@OO@K>S@S>SSS*SSb..O>L//*>OSN]=b]bNNNNPbN]]]]=====b;K(Cff(.D@b]]]]]]]=PP==]]======b;D(ff(D;b======]]==PP=]]]]]]]b@D.(ffC(K;b=====]]]]NbPNNNNb]b=]NSO>*//7>YNN]=b=bNN=YbbNP===P]]]P=b@(Cff..DO]=======e==e====Y]]]Y=bK(ff(Kb=Y]]]Y====e==e=======]OD..ffC(@b=P]]]P===PNbbY=NNb=b=]NNY>7//7O=aObSSOSSS>S@DSSOO@b@O;KbP@fCff.;@]b;bb]bb;];;;;;KK;K;;KVYKf::fKYVK;;K;KK;;;;;];bb]bb;b]@;.ffCf@PbK;O@b@OOSSD@S>SSSOSSbOa=O7//*Oa.2D.DD*.22.D*.*DDDKDD.-D;D:Cff(;@@DDKK@KKKOKDDD.--.-..-.;.::::.;.-..-.--.DDDKOKKK@KKDD@@;(ffC:D;D-.DDKDDD*.*D.22.*DD.D2.aO*//L>S.2*.DD*.222D*.*DDDKDD.-D(7:Lf:f(77D.DK@DK.@.....--.-..-.((:99:((.-..-.--.....@.KD@KD.D77(f:fL:7(D-.DDKDDD*.*D222.*DD.*2.S>L/LL(>LLL(CCL((LL(L((7*CDC7ffCfC9L:/ffC7*f((*ff(*ff(f(ff(f(fffff9999fffff(f(ff(f(ff*(ff*((f*7Cff/:L9CfCff7CDC*7((L(LL((LCC(LLL>(LLX8LL8898L998dHd8/89L98L9L/49/94L:^//9L9//9L//99//9//44//9/4///4994///4/9//44//9//99//L9//9L9//^:L49/94/L9L89L98/8dHd899L8988LL8XX^FF^^^^666HHH^^^Hd866668^^846^L:^^^686^^48^^46^^4^^66^^4^^44^^99^^44^^4^^66^^4^^64^^84^^686^^^:L^648^^866668dH^^^HHH666^^^^FF^XL^HHHH^^666HHHH^^H^666666^66^6/C:/^^666^^^6^^^6^^^^^66^^^^6^^^/ff/^^^6^^^^66^^^^^6^^^6^^^666^^/:C/6^66^666666^H^^HHHH666^^HHHH^L/8LL8898LLL88H^//H/9/9CL9999/9:C/://999///9///9//////999/99///:ff:///99/999//////9///9///999//:/C:9/9999LC9/9/H//^H88LLL8988LL8//LC2((CLCCCLL8LfLLLCLCDCCf(C:C:C:f::CCC:ffCfffCffffff((f:f(::::ff::::(f:f((ffffffCfffCff:CCC::f:C:C:C(fCCDCLCLLLfL8LLCCCLC((2CL//L>>SS*SDD*>S>a@S>S@S@@@@;;@.7:C:ff(7DO;;;OKK.@K;;;;KDDKK;;K.(::::(.K;;KKDDK;;;;K@.KKO;;;OD7(ff:C:7.@;;@@@@S@S>S@a>S>*DDS*SS>>L//2>OKbKND@b==NNbbNPPP====P]];D7C/f(.DOO]=================Y]b;.(::(.;b]Y=================]OOD.(f/C7D;]]P====PPPNbbNN==b@DNKbKO>2//.OSbbbNS@bYNNN=bN=PPPPP====]@7C/:.KDO]=e=eee=====eYYYYY====bK(::(Kb====YYYYYe=====eee=e=]ODK.:/C7@]====PPPPP=Nb=NNNYb@SNbbbSO.//.SaKKKSDDSSSOOOSSbb]]]bV]OO]O7C/:.;O]O;b;]]b;O;OO;bbbbVVb;;b;(::(;b;;bVVbbbb;OO;O;b]];b;O]O;.:/C7O]OO]Vb]]]bbSSOOOSSSDDSKKKaS./L*SS7.7.*D*.2.>D*.DD@Ob@Kb@K;K7C/9(;OOD.K.@OK.D..D.K;V;KKVKD;D(ff(D;DKVKK;V;K.D..D.KO@.K.DOO;(9/C7K;K@bK@bO@DD.*D>.2.*D*.7.7SS*LL*>.72*2*D*.2.>D*.DDD@@DDOKK.D7C/9(DDDD.D.K@D.D.-D-.K;K.D;DD..(ff(..DD;D.K;K.-D-.D.D@K.D.DDDD(9/C7D.KKODD@@DDD.*D>.2.*D*2*27.>*L/L>2*2*2*C*2..>D*.DDDKDDD@KD-7CC/:f-7D7...K@..D--D-.DK..DKD.-(ffff(-.DKD..KD.-D--D..@K...7D7-f:/CC7-DK@DDDKDDD.*D>..2*C*2*2*2>L//L>2*2*2*C*2..>D*.DDDDDDDKKD-7CC/:f(7D7-..DK.-D-.D-..K..DDD.-(ffff(-.DDD..K..-D.-D-.KD..-7D7(f:/CC7-DKKDDDDDDD.*D>..2*C*2*2*2>L/8L>2*2*2*f*2...D*.DDDDDDD@DD-7CC/9f(7D7-..DK.-7-.D-..K..DK..-(ffff(-..KD..K..-D.-7-.KD..-7D7(f9/CC7-DD@DDDDDDD.*D...2*f*2*2*2>L88L>222*2CCC2>..DD.DDDDDDD@DD(7CC/9f(7D7(..DD.-7-.D-.-D..DK.-((ffff((-.KD..D-.-D.-7-.DD..(7D7(f9/CC7(DD@DDDDDDD.DD..>2CCC2*222>L88L>222*2CCC2...DD.DDDDDD.@DD(7CC/9f(7D7-..DD.-7-.D-.-..-.D.-((ffff((-.D.-..-.-D.-7-.DD..-7D7(f9/CC7(DD@.DDDDDD.DD...2CCC2*222>L88L>222*2CCC2.2.DD.DDDDDD.KDD(7CC//f(777-.-DD.-7(-D-.-..-.D.-((ffff((-.D.-..-.-D-(7-.DD-.-777(f//CC7(DDK.DDDDDD.DD.2.2CCC2*222>L88L>222*2CCC2.2.DD.7DDDDD.KDD(7CC/9f(7D7(.-DD.-7(.D-.-..-.D.-((f::f((-.D.-..-.-D.(7-.DD-.(7D7(f9/CC7(DDK.DDDDD7.DD.2.2CCC2*222>L8CL>22(*2LC*2.2.DD.7DDDDD.KDD(7CC4/f(7D7(--DD.-7(.7-.--.---.-((f99f((-.---.--.-7.(7-.DD--(7D7(f/4CC7(DDK.DDDDD7.DD.2.2*CL2*(22>LC8L>22L**CC*2.2.7DD7DDDDD.KDD(7CC49f(777(--DD.-((-7-.-.-((..-((f//f((-..((-.-.-7-((-.DD--(777(f94CC7(DDK.DDDDD7DD7.2.2*CC**L22>L88L(2CLCLCC*2.2.7(777D7D7(.DD(7C94/f(777(--DD.-((.7--(.-((..-((f//f((-..((-.(--7.((-.DD--(777(f/49C7(DD.(7D7D777(7.2.2*CCLCLC2(L88L(2CLCLCC*2.2.7-777D7D7(.DD(7C94/ff777(--DD-((((7(-(-.-(..-((f//f((-..(-.-(-(7((((-DD--(777ff/49C7(DD.(7D7D777-7.2.2*CCLCLC2(L88L(2(LCLCC*2.2.7-77777D7(-DD(7C94/ff777(--DD-(((((-.--.-(-.-((f//f((-.-(-.--.-(((((-DD--(777ff/49C7(DD-(7D77777-7.2.2*CCLCL(2(L88L(2(LCLCC*2.2.7(77777D7(-D7(7C9^9ff777(-(DD-(((((-.--.-(--(((f//f(((--(-.--.-(((((-DD(-(777ff9^9C7(7D-(7D77777(7.2.2*CCLCL(2(L88L(2(LCCCC*2.2.7(777(7D7-.D7(7C9^/ff777(-(DD-(((((----.--.-(((f//f(((-.--.----(((((-DD(-(777ff/^9C7(7D.-7D7(777(7.2.2*CCCCL(2(L88L(27LCCCC*2.2.7(777(7D7-.D7(7C9^/ff777(-(DD-((((7-.--.--.-(((f//f(((-.--.--.-7((((-DD(-(777ff/^9C7(7D.-7D7(777(7.2.2*CCCCL72(L88L(27LCCCC*2.2.7-777(7D7(-D7(7C9^/ff777-.(DD-((((7(-(-.-(--(((f//f(((--(-.-(-(7((((-DD(.-777ff/^9C7(7D-(7D7(777-7.2.2*CCCCL72(L88L(27LCCCC*2.2.7(777(7D7(-D7(7C9^/ff777-.(DD-((((((((-.-(-.(((f//f(((.-(-.-((((((((-DD(.-777ff/^9C7(7D-(7D7(777(7.2.2*CCCCL72(L88L(27LCCCC*(.227(777(*77(-D7(CC9^/ff777-.(DD-((((((((-.-(--((f://:f((--(-.-((((((((-DD(.-777ff/^9CC(7D-(77*(777(722.(*CCCCL72(L88LL2(LCLCCC(.22*(7**(C*7(-D7(CC9^/:fC77(((77(((((((((---(--((f://:f((--(---(((((((((77(((77Cf:/^9CC(7D-(7*C(**7(*22.(CCCLCL(2LL8?8LCCLCLCCCLL(CCfCCC:CCC:fCC:996^^//CCCfffCCff:f(f((ff((:fff://^^//:fff:((ff((f(f:ffCCfffCCC//^^699:CCf:CCC:CCCfCC(LLCCCLCLCCL8??^888d8899L8L889/99948884488/9666^^^999/:/CC//9/9//://9:4444//^^^^//4444:9//://9/9//CC/:/999^^^6669/88448884999/988L8L9988d888^??^^^^H^H^^6HHHH6^66666666666^66X66^66664/^994^/^/^^^444/6666^^6666^^6666/444^^^/^/^499^/46666^66X66^66666666666^6HHHH6^^H^H^^^^??FHZZFZ?XZZFFhFX6XX66XZZXXZZ6XXX66X6XXXX66XXX6X666666XXXXXXX66666666XXXXXXX666666X6XXX66XXXX6X66XXX6ZZXXZZX66XX6XFhFFZZX?ZFZZHF??HH^^H^H^^LHH889666X666X66666666^^^^^^^^^^^^^^^^4^^^^^44^^^^666^^666^^^^44^^^^^4^^^^^^^^^^^^^^^^66666666X666X666988HHL^^H^H^^HH?LLLLLLLLCCC(((((/////^///////////////^^^^^^/^///9/^/^^99////4^^^^^^4////99^^/^/9///^/^^^^^^///////////////^/////(((((CCCLLLLLLLL.C222LCLCC(>*SS*fffff9fffff*********DDD7DDDDKKDDD77777D7DDfffff99fffffDD7D77777DDDKKDDDD7DDD*********fffff9fffff*SS*>(CCLCL222C.>>>>>(CLL*YaaYY7DKKKDKKKDDKK7DDCDDDD77DDDDDDKDDDDDD*----..((((ffff((((..----*DDDDDDKDDDDDD77DDDDCDD7KKDDKKKDKKKD7YYaaY*LLC(>>>>>2C((CLCLLLC..SS*(777(7DD((77(7*C((((77**(7D-..-(D((*((-(-.--((((((((--.-(-((*((D(-..-D7(**77((((C*7(77((DD7(777(*SS..CLLLCLC((C2CLLLLLL8LLCLL22Cf*7*(7DD((7C(**C((((*7**(7D-----D((*((-(-.(((((ff(((((.-(-((*((D-----D7(**7*((((C**(C7((DD7(*7*fC22LLCLL8LLLLLLCCLLLLL9LCLCLL(CCf***(7DD(f7Cf**C(fff*7**(7D-.--(D(f*f(-(-.(f(((ff(((f(.-(-(f*f(D(--.-D7(**7*fff(C**fC7f(DD7(***fCC(LLCLCL9LLLLLCCLLLLL88CLCLL(CCfC*C(77D((7*fC*Cffff*7**(7D-.-(-Dff*f(-(--(ff((ff((ff(--(-(f*ffD-(-.-D7(**7*ffffC*Cf*7((D77(C*CfCC(LLCLC88LLLLLCCLLLL888L9CLL(CCfC*C(7DD(f**fC*Cffff**7*(7D(.-(-7f(*((((--((ff(ff(ff((--((((*(f7-(-.(D7(*7**ffffC*Cf**f(DD7(C*CfCC(LLC9L888LLLLCCLLLL888L9CLL(CCfC*C(*D7(f*Cf*CCff:f7*77(7D(.--(7f(*((f(--(ff(ffff(ff(--(f((*(f7(--.(D7(77*7f:ffCC*fC*f(7D*(C*CfCC(LLC9L888LLLLCCLLL9888L9CLL(CC:C*C:***::*C:*CL9999CCCC9CC99999C999999999:99:9//9:99:999999999C99999CC9CCCC9999LC*:C*::***:C*C:CC(LLC9L8889LLLCL(LLL88899Lddd///LLL/LLL//LL/LLL///4444444//////9/////999//////////////999/////9//////4444444///LLL/LL//LLL/LLL///dddL99888LLL(L9899889899989889999999LL66666868^^4d9L9ddd9dddddddddddd/4^^^^^^^^^^^^^^4/dddddddddddd9ddd9L9d4^^86866666LL9999999889899989889989L8LL88989C98L88C99CLLL((:9:99L9L9///LCL///9/////////////////44////44/////////////////9///LCL///9L9L99:9:((LLLC99C88L89C98988LL8LCLC>22D2L*L22LL((((*7C7D(((ffCfCf9:f*7*(((C(f((ff((((((ff999//9999//999ff((((((ff((f(C(((*7*f:9fCfCff(((D7C7*((((LL22L*L2D22>CLCCL>O..bSS*SSS>S@S>K@OO@O;KK;.7fCffff7K@K;;D;.;;KK;;;K;KK;KK;.(ffff(.;KK;KK;K;;;KK;;.;D;;K@K7ffffCf7.;KK;O@OO@K>S@S>SSS*SSb..O>LCC*>OSN]=b]bNNNNPbN]]]]=====b;K(Cff((D@b]]]]]]]=PP===YYY====b;D(ff(D;b====YYY===PP=]]]]]]]b@D((ffC(K;b=====]]]]NbPNNNNb]b=]NSO>*CC7>YNN]=b=bNN=YbbNP===P]]]P=b@(Cff..DO]=======e==e=eeee=]]Y=bK(ff(Kb=Y]]=eeee=e==e=======]OD..ffC(@b=P]]]P===PNbbY=NNb=b=]NNY>7CC7O=aObSSOSSS>S@DSSOO@b@O;KbP@fCff..@]b;bb]bb;];;;;;bb;;;;KVYKf::fKYVK;;;;bb;;;;;];bb]bb;b]@..ffCf@PbK;O@b@OOSSD@S>SSSOSSbOa=O7CC*Oa.2D.DD*.22.D*.*DDDKDD.-D;D:Cff((@@DDKK@KKKOKDDDDK;KD..-.;.::::.;.-..DK;KDDDDKOKKK@KKDD@@((ffC:D;D-.DDKDDD*.*D.22.*DD.D2.aO*CCL>S.2*.DD*.222D*.*DDDKDD.-D(7:Lf:ff77D.DK@DK.@.....K;K...-.((:99:((.-...K;K.....@.KD@KD.D77ff:fL:7(D-.DDKDDD*.*D222.*DD.*2.S>LC8L(>LLL(CCL((LL(L((7*CDC7ffCfC9L:/:9C7*f((*ff(*ff(f((((f(fffff9999fffff(f((((f(ff*(ff*((f*7C9:/:L9CfCff7CDC*7((L(LL((LCC(LLL>(L8?8LL8898L998dHd8/89L98L9L/49/94L:^//9L9//9L//99//9/9:f:/9/4///4994///4/9/:f:9/9//99//L9//9L9//^:L49/94/L9L89L98/8dHd899L8988LL8??^FF^^^^666HHH^^^Hd866668^^846^L:^^^686^^48^^46^^4^^4/444^^44^^99^^44^^444/4^^4^^64^^84^^686^^^:L^648^^866668dH^^^HHH666^^^^FF^?8^HHHH^^666HHHH^^H^666666^66^6/C:/^^666^^^6^^^6^^^^^^^^^^^6^^^/ff/^^^6^^^^^^^^^^^6^^^6^^^666^^/:C/6^66^666666^H^^HHHH666^^HHHH^8C8LL8898LLL88H^//H/9/9CL9999/9:C/:/:999///9///9//////9///99///:ff:///99///9//////9///9///999:/:/C:9/9999LC9/9/H//^H88LLL8988LL8CCLC2((CLCCCLL8LfLLLCLCDCCf(C:C:C:f::CCC:ffCfffCffffff(ff:f(::::ff::::(f:ff(ffffffCfffCff:CCC::f:C:C:C(fCCDCLCLLLfL8LLCCCLC((2CLCCL>>SS*SDD*>S>a@S>S@S@@@@;;@.7:C:fff7DO;;;OKK.@K;;;;VbV;K;;K.(::::(.K;;K;VbV;;;;K@.KKO;;;OD7fff:C:7.@;;@@@@S@S>S@a>S>*DDS*SS>>LCC2>OKbKND@b==NNbbNPPP====P]];D7C/f((DOO]=============ee==Y]b;.(::(.;b]Y==ee=============]OOD((f/C7D;]]P====PPPNbbNN==b@DNKbKO>2CC.OSbbbNS@bYNNN=bN=PPPPP====]@7C/:..DO]=e=eee=====eeeee=====bK(::(Kb=====eeeee=====eee=e=]OD..:/C7@]====PPPPP=Nb=NNNYb@SNbbbSO.CC.SaKKKSDDSSSOOOSSbb]]]bV]OO]O7C/:..O]O;b;]]b;O;OO;;;bb;Vb;;b;(::(;b;;bV;bb;;;OO;O;b]];b;O]O..:/C7O]OO]Vb]]]bbSSOOOSSSDDSKKKaS.C8*SS7.7.*D*.2.>D*.DD@Ob@Kb@K;K7C/9((OOD.K.@OK.D..D...K;KKVKD;D(ff(D;DKVKK;K...D..D.KO@.K.DOO((9/C7K;K@bK@bO@DD.*D>.2.*D*.7.7SS*88*>.72*2*D*.2.>D*.DDD@@DDOKK.D7C/9((DDD.D.K@D.D.-D-..DKDD;DD..(ff(..DD;DDKD..-D-.D.D@K.D.DDD((9/C7D.KKODD@@DDD.*D>.2.*D*2*27.>*8CL>2*2*2*C*2..>D*.DDDKDDD@KD-7CC/:ff7D7...K@..D--D-...D.DKD.-(ffff(-.DKD.D...-D--D..@K...7D7ff:/CC7-DK@DDDKDDD.*D>..2*C*2*2*2>LCCL>2*2*2*C*2..>D*.DDDDDDDKKD-7CC/:ff7D7-..DK.-D-.D-...DDDDD.-(ffff(-.DDDDD...-D.-D-.KD..-7D7ff:/CC7-DKKDDDDDDD.*D>..2*C*2*2*2>LC8L>2*2*2*f*2...D*.DDDDDDD@DD-7CC/9ff7D7-..DK.-7-.D-...DDDK..-(ffff(-..KDDD...-D.-7-.KD..-7D7ff9/CC7-DD@DDDDDDD.*D...2*f*2*2*2>L88L>222*2CCC2>..DD.DDDDDDD@DD(7CC/9ff7D7(..DD.-7-.D-...DDDK.-((ffff((-.KDDD...-D.-7-.DD..(7D7ff9/CC7(DD@DDDDDDD.DD..>2CCC2*222>L88L>222*2CCC2...DD.DDDDDD.@DD(7CC/9ff7D7-..DD.-7-.D-...D..K.-((ffff((-.K..D...-D.-7-.DD..-7D7ff9/CC7(DD@.DDDDDD.DD...2CCC2*222>L88L>222*2CCC2.2.DD.DDDDDD.KDD(7CC/9ff777-.-DD.-7(-D-...D..D.-((ffff((-.D..D...-D-(7-.DD-.-777ff9/CC7(DDK.DDDDDD.DD.2.2CCC2*222>L88L>222*2CCC2.2.DD.7DDDDD.KDD(7CC/9ff7D7(.-DD.-7(.D-.-.DD.D.-((ffff((-.D.DD.-.-D.(7-.DD-.(7D7ff9/CC7(DDK.DDDDD7.DD.2.2CCC2*222>L88L>22(*2LC*2.2.DD.7DDDDD.KDD(7CC//ff7D7(--DD.-7(.7-.-.D..D.-((ffff((-.D..D.-.-7.(7-.DD--(7D7ff//CC7(DDK.DDDDD7.DD.2.2*CL2*(22>L88L>22L**CC*2.2.7DD7DDDDD.KDD(7CC/9ff777(--DD.-((-7-.-.D..D.-((f::f((-.D..D.-.-7-((-.DD--(777ff9/CC7(DDK.DDDDD7DD7.2.2*CC**L22>L88L>22(**CC*2.2.7DD7DDDDD.DDD(7CC49ff777(--DD.-((.7-.-......-((f::f((-......-.-7.((-.DD--(777ff94CC7(DDD.DDDDD7DD7.2.2*CC**(22>L88L>22(**LC*..2.7DD7DDDDD.DDD(7CC4/ff777(--DD.-((-7-.-.D....-((f::f((-....D.-.-7-((-.DD--(777ff/4CC7(DDD.DDDDD7DD7.2..*CL**(22>L88L>2(L**LC*..2.7D.7DDDDD-DDD(7CC//ff777(--DD--((-7-.-...-..-((f::f((-..-...-.-7-((--DD--(777ff//CC7(DDD-DDDDD7.D7.2..*CL**L(2>L88L22(L**LC*..2.7D.7DDDDD-DDD(7CC/9ff777(-(DD-(((-7-.(...-..-((f::f((-..-...(.-7-(((-DD(-(777ff9/CC7(DDD-DDDDD7.D7.2..*CL**L(22L88L22((**CC*..2.7D.7DDDDD-DDD(7CL49ff777(-(DD-(((.7-.(-..--.-((f99f((-.--..-(.-7.(((-DD(-(777ff94LC7(DDD-DDDDD7.D7.2..*CC**((22L88L22CL**CC*..2.7-27DDDDD-DDD(7CL4/ff777(--DD-(((-7--(-..--.-((f99f((-.--..-(--7-(((-DD--(777ff/4LC7(DDD-DDDDD72-7.2..*CC**LC22L88L22CL**CC*.D2.7-27DDDDD(DDD(7CL49ff777(-(DD-(((-7(-(-..(-.-((f99f((-.-(..-(-(7-(((-DD(-(777ff94LC7(DDD(DDDDD72-7.2D.*CC**LC22L88L22CL*CCC*.D2.7-77DDDDD(DDD(7CL/9ff777(-(DD-(((-7(-(-..(-.-((f99f((-.-(..-(-(7-(((-DD(-(777ff9/LC7(DDD(DDDDD77-7.2D.*CCC*LC22L88L22CL*CCC*.*2.7-77DDDDD(DDD(7CL/9ff777(-(DD--((-7-.--.-(-.-((f99f((-.-(-.--.-7-((--DD(-(777ff9/LC7(DDD(DDDDD77-7.2*.*CCC*LC22L88L22CL(CCC*.*2.7-77DDDDD(DDD(7CL/9ff777(-(DD-((((7-.--.-(..-((f99f((-..(-.--.-7((((-DD(-(777ff9/LC7(DDD(DDDDD77-7.2*.*CCC(LC22L8CL22CL(LCC*(D2.7-77DD7DD(.DD(7CL/:ff777(-(DD--(((7(-(-.-(..-((f99f((-..(-.-(-(7(((--DD(-(777ff:/LC7(DD.(DD7DD77-7.2D(*CCL(LC22LC8L22CL(LCC*(*2.7(777DDD7(.DD(7C949ff777(-(DD-(((-7(-(-.-(..-((f//f((-..(-.-(-(7-(((-DD(-(777ff949C7(DD.(7DDD777(7.2*(*CCL(LC22L88L(2CLCLCC*2*2.7(777D7D7(.DD(7C94/ff777(-(DD-(((-7(((-.-(..-((f//f((-..(-.-(((7-(((-DD(-(777ff/49C7(DD.(7D7D777(7.2*2*CCLCLC2(L88L(2CLCLCC*2*2.7-777D7D7(.DD(7C94/ff777(--DD-((((7(-(-.-(..-((f//f((-..(-.-(-(7((((-DD--(777ff/49C7(DD.(7D7D777-7.2*2*CCLCLC2(L88L(2(LCLCC*2*2.7-77777D7(-DD(7C94/ff777(--DD-(((((-.--.-(-.-((f//f((-.-(-.--.-(((((-DD--(777ff/49C7(DD-(7D77777-7.2*2*CCLCL(2(L88L(2(LCLCC*2D2.7(77777D7(-D7(7C9^9ff777(-(DD-(((((-.--.-(--(((f//f(((--(-.--.-(((((-DD(-(777ff9^9C7(7D-(7D77777(7.2D2*CCLCL(2(L88L(2(LCCCC*2D2.7(777(7D7-.D7(7C9^/ff777(-(DD-(((((----.--.-(((f//f(((-.--.----(((((-DD(-(777ff/^9C7(7D.-7D7(777(7.2D2*CCCCL(2(L88L(27LCCCC*2*2.7(777(7D7-.D7(7C9^/ff777(-(DD-((((7-.--.--.-(((f//f(((-.--.--.-7((((-DD(-(777ff/^9C7(7D.-7D7(777(7.2*2*CCCCL72(L88L(27LCCCC*2C2.7-777(7D7(-D7(7C9^/ff777-.(DD-((((7(-(-.-(--(((f//f(((--(-.-(-(7((((-DD(.-777ff/^9C7(7D-(7D7(777-7.2C2*CCCCL72(L88L(27LCCCC*2*2.7(777(7D7(-D7(7C9^/ff777-.(DD-((((((((-.-(-.(((f//f(((.-(-.-((((((((-DD(.-777ff/^9C7(7D-(7D7(777(7.2*2*CCCCL72(L88L(27LCCCC*(C227(777(*77(-D7(CC9^/ff777-.(DD-((((((((-.-(--((f://:f((--(-.-((((((((-DD(.-777ff/^9CC(7D-(77*(777(722C(*CCCCL72(L88LL2(LCLCCC(C22*(7**(C*7(-D7(CC9^/:fC77(((77(((((((((---(--((f://:f((--(---(((((((((77(((77Cf:/^9CC(7D-(7*C(**7(*22C(CCCLCL(2LL8?8LCCLCLCCCLC(CCfCCC:CCC:fCC:996^^//CCCfffCCff:f(f((ff((:fff://^^//:fff:((ff((f(f:ffCCfffCCC//^^699:CCf:CCC:CCCfCC(CLCCCLCLCCL8??^888d8899L8L889/99948884488/9666^^^999/:/CC//9/9//://9:4444//^^^^//4444:9//://9/9//CC/:/999^^^6669/88448884999/988L8L9988d888^??^^^^H^H^^6H6HH6^66666666666^66X66^66664/^994^/^/^^^444/6666^^6666^^6666/444^^^/^/^499^/46666^66X66^66666666666^6HH6H6^^H^H^^^^??FHZZFZ?XZZFXhFX6XX66XZZXXZZ6XXX66^6XXZXX6XZ66XX66XXXXXXXXXX66666666XXXXXXXXXX66XX66ZX6XXZXX6^66XXX6ZZXXZZX66XX6XFhXFZZX?ZFZZHF??HH^^H^H^^6H6??6666X666X6666666666^^6XX6666X6666666666666666666666666666666666666666X6666XX6^^6666666666X666X6666??6H6^^H^H^^HH??^^^^^^^^^6H6HH6^666^666^^666666^^^^66644^684^^^^^^^^^44^^^^666^^666^^^^44^^^^^^^^^486^44666^^^^666666^^666^666^6HH6H6^^^^^^^^^?8889^^^^^^LHL889/996/699//994666////999///99///444////99////4^^^^^^4////99////444///99///999////666499//996/699/988LHL^^^^^^9888LLLCCLCLCCC(C((CC**CCCCCffCCfCLLffffCCCfffCCffffffffffffffffff9999ffffffffffffffffffCCfffCCCffffLLCfCCffCCCCC**CC((C(CCCLCLCCLLL.CC((LCLCC(>*SS**DDD*DDD**DD(***-((DD7DDDDKKDDD77777D7DD((((((((((((((((DD7D77777DDDKKDDDD7DD((-***(DD**DDD*DDD**SS*>(CCLCL((CC..****(CLL*YaDYY7DKKKDKKKDDKK7DDC(((7DDDDDDKDDDDDD-----..----(((ff(((----..-----DDDDDDKDDDDDD7(((CDD7KKDDKKKDKKKD7YYDaY*LLC(****.2CC(CLCLLLCS*SS*(777(7DD((77(7*C(((7(7(7D-..-(D(((((-(-.(((((((ff(((((((.-(-(((((D(-..-D7(7(7(((C*7(77((DD7(777(*SS*SCLLLCLC(CC2CLLCLLL8LLCLC22Cf*7*(7DD((7C(**C(ff7*C(7D-----D((f((-(-.(((f(((ff(((f(((.-(-((f((D-----D7(C*7ff(C**(C7((DD7(*7*fC22CLCLL8LLLCLLCCLLCLL9LCLCLC2CCf***(7DD(f7Cf**Cfff7**(7D-.--(D(fff(-(-.(f(ff((ff((ff(f(.-(-(fff(D(--.-D7(**7fffC**fC7f(DD7(***fCC2CLCLCL9LLCLLCCLLCLL88CLCLC2CCfC*C(77D((7*fC*Cfff7*C(7D-.-(-Dffff(-(--((((ff(ff(ff((((--(-(ffffD-(-.-D7(C*7fffC*Cf*7((D77(C*CfCC2CLCLC88LLCLLCCLLCL888L9CLC2CCfC*C(7DD(f**fC*Cfff*7*(7D(.-(-7f(f((((--(f((ff(ff(ff((f(--((((f(f7-(-.(D7(*7*fffC*Cf**f(DD7(C*CfCC2CLC9L888LCLLCCLLCL888L9CLC(CCfC*C(*D7(f*Cf*CCff:*77(7D(.--(7f(f((f(--(f(ff(ffff(ff(f(--(f((f(f7(--.(D7(77*:ffCC*fC*f(7D*(C*CfCC(CLC9L888LCLLCCLLC9888L9CLC(CCfC*C(*D7(f*Cf*CLfff*7*(7D(---(*fff((((-((f(ff(f99f(ff(f((-((((fff*(---(D7(*7*fffLC*fC*f(7D*(C*CfCC(CLC9L8889CLLCL(LCL88899LLC2CCfC7C(CDD(fCCfCCC(ff*7C(7D(-(-(*f(ff(f((-(ffff:ffff:ffff(-((f(ff(f*(-(-(D7(C7*ff(CCCfCCf(DDC(C7CfCC2CLL99888LCL(LLLLC88/899CLC2CCfCC*(CD7((CC:CCCf::*7C(7D(-(-(*fff((((--ff::9:9::9:9::ff--((((fff*(-(-(D7(C7*::fCCC:CC((7DC(*CCfCC2CLC998/88CLLL88888//d89L8LLLL9LLC:LCC:9LL99999/dLLL:CC9999/9////9999::9999//////9999::9999////9/9999CC:LLLd/99999LL9:CCL:CLL9LLLL8L98d//88888",
    id: [128, 128],
};
var wall1 = new lighthouse(p_wall1);

var dec = function (num, decimal) {
    var s = pow(10, decimal);
    return floor(num * s) / s;
};

var bounce = function (error) {
    if (error.toString() === error) {
        println(error);
    }
    else {
        print("Error " + error + ": ");
        report = true;
        if (error === 1) {
            print("Casting Couldn't Locate a Player!");
        }
        else {
            print("Error Unlocated");
        }
        println("");
    }
};

var node = function (x, z) {
    this.x = x;
    this.z = z;
};

var sect = function (x, y, z, w, h, d, textureid) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.d = d;
    this.textureid = textureid;

    this.nodes = [];
    this.nodes[0] = new node(x + 0, z + 0);
    this.nodes[1] = new node(x + w, z + 0);
    this.nodes[2] = new node(x + w, z + d);
    this.nodes[3] = new node(x + 0, z + d);

    this.minicast = function (sourcePlayer) {
        if (sourcePlayer.isPlayer) {
            this.minicast.distance = [];
            for (var a = 0; a < 4; a++) {
                var nodeSrc = this.nodes[a];
                var dx = sq(nodeSrc.x - sourcePlayer.x);
                var dz = sq(nodeSrc.z - sourcePlayer.z);
                this.minicast.distance[a] = sqrt(dx + dz);
            }

            var dis = this.minicast.distance;
            this.minicast.distanceSorted = [
                min(min(dis[0], dis[1]), min(dis[2], dis[3])),
                max(min(dis[0], dis[1]), min(dis[2], dis[3])),
                min(max(dis[0], dis[1]), max(dis[2], dis[3])),
                max(max(dis[0], dis[1]), max(dis[2], dis[3])),
            ];
            var maxO = min(this.minicast.distanceSorted[1], this.minicast.distanceSorted[2]);
            var minO = max(this.minicast.distanceSorted[1], this.minicast.distanceSorted[2]);
            this.minicast.distanceSorted[1] = maxO;
            this.minicast.distanceSorted[2] = minO;

            return this.minicast;
        }
        else {
            bounce(1);
        }
    };
    this.cast = function (sourcePlayer) {
        if (sourcePlayer.isPlayer) {
            this.cast.distance = [];
            this.cast.delta = [];
            for (var a = 0; a < 4; a++) {
                var nodeSrc = this.nodes[a];
                var dx = sq(nodeSrc.x - sourcePlayer.x);
                var dz = sq(nodeSrc.z - sourcePlayer.z);
                this.cast.distance[a] = sqrt(dx + dz);
                var delta = 180 - atan2(sourcePlayer.x - nodeSrc.x, sourcePlayer.z - nodeSrc.z);
                this.cast.delta[a] = delta;
            }

            var dis = this.cast.distance;
            this.cast.distanceSorted = [
                min(min(dis[0], dis[1]), min(dis[2], dis[3])),
                max(min(dis[0], dis[1]), min(dis[2], dis[3])),
                min(max(dis[0], dis[1]), max(dis[2], dis[3])),
                max(max(dis[0], dis[1]), max(dis[2], dis[3])),
            ];
            var sortof = [];
            var maxO = min(this.cast.distanceSorted[1], this.cast.distanceSorted[2]);
            var minO = max(this.cast.distanceSorted[1], this.cast.distanceSorted[2]);
            this.cast.distanceSorted[1] = maxO;
            this.cast.distanceSorted[2] = minO;
            var deltaSorted = [];
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (this.cast.distance[j] === this.cast.distanceSorted[i]) {
                        sortof[j] = i;
                    }
                }
            }
            for (var i = 0; i < 4; i++) {
                deltaSorted[i] = this.cast.delta[sortof[i]];
            }
            this.cast.textureid = this.textureid;
            this.cast.sortof = sortof;
            this.cast.deltaSorted = deltaSorted;

            return this.cast;
        }
        else {
            bounce(1);
        }
    };
};

var player = function () {
    this.isPlayer = true;

    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
    this.rotation = 0;
    this.rotationSpeed = 2.0;
    this.speed = 1.0;
    this.acceleration = 0.01;

    this.direction = 0;
    this.moving = false;
    this.rotate1 = 0;
    this.rotate2 = 0;

    this.controls = function () {
        if (this.rotation > 360) {
            this.rotation -= 360;
        }
        if (this.rotation < 0) {
            this.rotation += 360;
        }
        this.moving = false;
        this.speed = constrain(this.speed, 0.0, 1);
        if (keyIsPressed) {
            if (key.toString() === 'a' || keyCode === LEFT) {
                this.rotate2 = 1;
                this.rotate1 = 0;
            }
            if (key.toString() === 'd' || keyCode === RIGHT) {
                this.rotate1 = 1;
                this.rotate2 = 0;
            }
            if (key.toString() === 'w' || keyCode === UP) {
                this.speed += this.acceleration;
                this.direction = 1;
                this.moving = true;

            }
            if (key.toString() === 's' || keyCode === DOWN) {
                this.speed += this.acceleration;
                this.direction = -1;
                this.moving = true;
            }

        }
        else {
            this.rotate2 = 0;
            this.rotate1 = 0;
        }

        if (keyRelease) {
            if (key.toString() === 'a' || keyCode === LEFT) {
                this.rotate2 = 0;
            }
            if (key.toString() === 'd' || keyCode === RIGHT) {
                this.rotate1 = 0;
            }
            keyRelease = false;
        }
        if (this.moving === false) {
            this.speed -= this.speed / 20;
        }
        if (this.rotate1 === 1) {
            this.rotation += this.rotationSpeed;
        }
        if (this.rotate2 === 1) {
            this.rotation -= this.rotationSpeed;
        }
        this.x += cos(this.rotation + 90) * this.speed * this.direction;
        this.z += sin(this.rotation + 90) * this.speed * this.direction;
    };

    this.render = function (room, subject) {
        var minimap = false;
        var nodes = [];
        pushMatrix();
        if (height > width) {
            noStroke();
            fill(46, 46, 46);
            rect(0, height / 2, width, height / 2);
            translate(width / 2, height * 3 / 4);
            translate(-subject.x * minimapZoom, -subject.z * minimapZoom);
            minimap = true;
            fill(156, 156, 156);
            scale(minimapZoom);
        }
        var current;
        var roomSorted = [];
        var sortList = [];
        for (var a = 0; a < room.length; a++) {

            var sortDone = false;
            var comparison = 0;
            if (a > 0) {
                var s = room[a].minicast(subject).distanceSorted[0];
                while (!sortDone) {
                    if (s < sortList[comparison] || comparison === sortList.length) {
                        for (var b = sortList.length - 1; b > comparison - 1; b--) {
                            sortList[b + 1] = sortList[b];
                            roomSorted[b + 1] = roomSorted[b];
                        }
                        sortList[comparison] = s;
                        roomSorted[comparison] = room[a];
                        sortDone = true;
                    }
                    comparison++;
                }
            }
            else {
                roomSorted.push(room[a]);
                sortList.push(room[a].minicast(subject).distanceSorted[0]);
            }
        }
        for (var a = 0; a < roomSorted.length; a++) {
            var d = roomSorted[a];
            noStroke();
            if (minimap) {
                quad(d.x + 0.0, d.z + 0.0,
                    d.x + d.w, d.z + 0.0,
                    d.x + d.w, d.z + d.d,
                    d.x + 0.0, d.z + d.d);
            }
        }
        popMatrix();
        if (height > width) {
            rect(0, 0, width, height / 2);
        }
        else {
            rect(0, 0, width, height);
        }
        for (var a = roomSorted.length - 1; a > -1; a--) {
            strokeWeight(1);
            var d = roomSorted[a];
            current = d.cast(subject);
            for (var b = 0; b < 4; b++) {
                //current.deltaSorted[b] = -current.deltaSorted[a]+90;
            }
            var ds = current.deltaSorted;
            var di = current.distanceSorted;
            var sv = current.sortof;
            var de = current.distance;
            var dt = current.delta;

            for (var b = 3; b > -1; b--) {
                if (ds[b] - subject.rotation > 180) { ds[b] -= 360; }
                if (ds[b] - subject.rotation < -180) { ds[b] += 360; }
            }
            ds = current.deltaSorted;
            stroke(43, 43, 43);

            for (var b = 3; b > -1; b--) {
                var hsize = 1 / (de[sv[b]]) * 400;
                var h1 = height / 2 - hsize;
                var h2 = height / 2 + hsize;
                if (height > width) {
                    h1 -= height / 4;
                    h2 -= height / 4;
                }
                if (ds[b] < 0) { ds[b] += 360; }
                var fov = width / 90;
                var id2 = 3;
                if (sv[b] !== 0) {
                    id2 = sv[b] - 1;
                }
                var isize = 1 / (de[id2]) * 400;
                var i1 = height / 2 - isize;
                var i2 = height / 2 + isize;
                if (height > width) {
                    i1 -= height / 4;
                    i2 -= height / 4;
                }
                noFill();
                var textureDiff = 0;
                var imageid = 0;
                var resolve = 0;
                if (hsize > isize && ds[b] - subject.rotation < dt[id2] - subject.rotation) {
                    resolve = 0;
                    textureDiff = isize / hsize;
                    imageid = 0;

                }
                if (hsize > isize && ds[b] - subject.rotation > dt[id2] - subject.rotation) {
                    resolve = 1;
                    textureDiff = isize / hsize;
                    imageid = txtsize[current.textureid];
                }
                if (hsize < isize && ds[b] - subject.rotation < dt[id2] - subject.rotation) {
                    resolve = 2;
                    textureDiff = hsize / isize;
                    imageid = txtsize[current.textureid];
                }
                if (hsize < isize && ds[b] - subject.rotation > dt[id2] - subject.rotation) {
                    resolve = 3;
                    textureDiff = hsize / isize;
                    imageid = txtsize[current.textureid];
                }
                imageid += floor((1 - textureDiff) * txtsize[current.textureid]);
                //println(txtsize[current.textureid]);
                stroke(resolve * (255 / 4));
                for (var c = -1; c < 2; c++) {
                    var imagex = 0;

                    var one1 = ds[b] - subject.rotation + (c * 360);
                    var two2 = dt[id2] - subject.rotation + (c * 360);

                    while (one1 > 360) {
                        one1 -= 360;
                    }
                    var w = abs((one1 * fov + width / 2) - (two2 * fov + width / 2));

                    //println(one1 + ", "+two2);
                    if (resolve === 1) { imagex -= w; }
                    noTint();
                    if (imageid > txtsize[current.textureid] - 1) {

                        image(textures[0][constrain(imageid, 0, txtsize[current.textureid] * 2 - 2)], one1 * fov + width / 2 + imagex, i1, w, isize * 2);
                    } else {
                        image(textures[0][constrain(imageid, 0, txtsize[current.textureid] * 2 - 2)], one1 * fov + width / 2 + imagex, h1, w, hsize * 2);
                    }

                    /*quad((ds[b] - subject.rotation + (c*360))*fov + width/2, h1,
                         (ds[b] - subject.rotation + (c*360))*fov + width/2, h2,
                         (dt[id2] - subject.rotation + (c*360))*fov + width/2, i2,
                         (dt[id2] - subject.rotation + (c*360))*fov + width/2, i1);*/
                }
            }

        }
        pushMatrix();
        if (minimap) {
            fill(255, 255, 255);
            translate(width / 2, height * 3 / 4);
            scale(minimapZoom / width);
            ellipse(0, 0, width, width);
            stroke(255, 255, 255);
            strokeWeight(100);
            line(0, 0, cos(this.rotation + 90) * width * 4, sin(this.rotation + 90) * width * 4);
        }
        popMatrix();
    };
};

var room1 = [];

var testPlayer = new player();
room1[0] = new sect(0.0, 0.0, 0.0, 5.0, 0.0, 5.0, 0);
//room1[1] = new sect(5.0, 0.0, 0.0, 10.0, 0.0, 2.0, 0);
draw = function () {
    background(255, 255, 255);
    rotationCollection(wall1, 90, 0);
    rotationProgress++;
    textAlign(CENTER, CENTER);
    fill(0, 0, 0);
    if (height > width) {
        text("Loading.. (" + (floor((rotationProgress / rotationQueue) * 100)) + "%)", width / 2, width * 0.75);
    } else {
        text("Loading.. (" + (floor((rotationProgress / rotationQueue) * 100)) + "%)", width / 2, height * 0.75);
    }
    if (rotationProgress > rotationQueue) {
        this._clearLogs();
        keyReleased = function () {
            keyRelease = true;
        };
        testPlayer.render(room1, testPlayer);
        testPlayer.controls();
    }
};
