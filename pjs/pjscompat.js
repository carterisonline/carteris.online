// A note on compatibility:
// 
// The version of Processing.JS that Khan Academy uses is much older than current p5.js, is heavily modified, and is
// integrated with several other components of the KA editor that I don't want to bring over to my website. This file
// makes some changes to legacy Processing.JS sketches that allow them to work with p5.
//
// UNHANDLED ISSUES:
// - No visual console (println calls go to the browser console for now)
// - No image loading (stub)
// - No audio loading/playback (stub)
//
/**
 * @typedef {{title: string, slug: string, created: string, desc: string, width: number, height: number}}  ProjectMeta 
 */

const replacement = func => source => func(source);
const replaceStrings = search => replace => source => replacement(s => s.replaceAll(search, replace))(source);
const replaceFunctionIdent = search => replace => replaceStrings(new RegExp(`([^\\w\\.])${search}\\s*\\(`, "g"))(`\$1${replace}(`);
const patchTail = search => insertion => replaceStrings(search)(`${search}${insertion}`);
const patchHead = search => insertion => replaceStrings(search)(`${insertion}${search}`);
const patchProgramHead = insertion => source => `${insertion}\n${source}`;
const patchedIdent = ident => `${ident}__patched`;
const patchIdent = search => replaceStrings(search)(patchedIdent(search));
const patchIdentAs = search => def => source => patchProgramHead(`let ${patchedIdent(search)} = ${def}; `)(patchIdent(search)(source));
const patchFunctionIdent = ident => replaceFunctionIdent(ident)(patchedIdent(ident))


/**
 * @param {ProjectMeta} projectMeta
 */
function patches(projectMeta) {
    return {
        assignToConstAllowed: [
            replaceStrings("const ")("let "),
        ],
        keepMouseWithinCanvas: [
            patchIdentAs("pmouseX")(0),
            patchIdentAs("pmouseY")(0),
            patchIdentAs("mouseX")(0),
            patchIdentAs("mouseY")(0),
            replaceStrings(/(draw\s*=\s*function\s*\(\)\s*{\n)|(function\s+draw\s*\(\)\s*{\n)/g)(`draw = function () {
                if (mouseX > 0 && mouseY > 0 && mouseX < ${projectMeta.width} && mouseY < ${projectMeta.height}) {
                    ${patchedIdent("mouseX")} = mouseX;
                    ${patchedIdent("mouseY")} = mouseY;
                    ${patchedIdent("pmouseX")} = pmouseX;
                    ${patchedIdent("pmouseY")} = pmouseY;
                }\n`),
        ],
        renameToP5Names: [
            replaceStrings("PVector")("p5.Vector"),
            replaceFunctionIdent("println")("print"),
            replaceFunctionIdent("pushMatrix")("push"),
            replaceFunctionIdent("popMatrix")("pop"),
        ],
        sizeGlobalsWeirdBehavior: [
            patchIdentAs("width")(projectMeta.width),
            patchIdentAs("height")(projectMeta.height),
        ],
        fontCompatibility: [
            patchIdentAs("textFont")(`function(fontName) {
                if (cachedFonts[fontName]) textFont(cachedFonts[fontName]);
            }`),
            patchProgramHead(`const cachedFonts = {};
            function createFont(fontName) {
                if (!cachedFonts[fontName]) {
                    try { loadFont(font, f => cachedFonts[fontName] = f, e => {}); } catch {}
                }
            }`)
        ],
        noTextOutline: [
            patchFunctionIdent("noStroke"),
            patchProgramHead(`function ${patchedIdent("noStroke")}() {
                globalStrokeEnabled = false;
                noStroke();
            }`),
            patchFunctionIdent("stroke"),
            patchProgramHead(`function ${patchedIdent("stroke")}(...args) {
                globalStroke = color(...args);
                globalStrokeEnabled = true;
                stroke(...args);
            }`),
            patchFunctionIdent("text"),
            patchProgramHead(`function ${patchedIdent("text")}(...args) {
                noStroke();
                text(...args);
                if (globalStrokeEnabled) {
                    stroke(globalStroke);
                }
            }`),
            patchProgramHead("let globalStroke = color(0); let globalStrokeEnabled = true;"),
        ],
        dontOverrideWebGlobals: [
            patchIdent("console"),
        ],
        kaAssetsStub: [
            patchIdentAs("getImage")("function(...args) {return createImage(50, 50);}"),
            patchIdentAs("getSound")("function(...args) {}"),
            patchIdentAs("playSound")("function(...args) {}"),
        ],
        clearLogsStub: [
            replaceStrings(/(this\.)?_clearLogs\s*\(\);?/g)(""),
        ],
        programRestart: [
            replaceStrings("Program.restart")("window.location.reload")
        ],
        angleModeIsAFunctionNow: [
            replaceStrings(/angleMode\s*=\s*(\"\w+\")/g)("angleMode($1)")
        ]
    }
};

/**
 * Transforms the source of a legacy PJS project to be largely compatible with modern P5.js
 * @param {string} projectSource 
 * @param {ProjectMeta} projectMeta
*/
function transformPJS(projectSource, projectMeta) {
    return applyTransformations(projectSource, Object.values(patches(projectMeta)).flat());
}

function applyTransformations(source, [car, ...cdr]) {
    switch (cdr.length) {
        case 0:
            return car(source);
        default:
            return applyTransformations(car(source), cdr);
    }
}