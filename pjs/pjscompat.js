// A note on compatibility:
// 
// The version of Processing.JS that Khan Academy uses is much older than current p5.js, is heavily modified, and is
// integrated with several other components of the KA editor that I don't want to bring over to my website. This file
// makes some changes to p5.js (assuming it's loaded) that allow legacy Processing.JS sketches to work with p5.
// 
// There are still several compatibility issues that I'd like to fix at some point, but JS is such an unbearable mess
// of a language that getting *this* deep into prototype hell is going to be very hard.
//
// UNHANDLED ISSUES:
// - Misc. fill/stroke artifacts
// - No visual console (println calls go to the browser console for now)
// - No image loading (stub)
// - No audio loading/playback (stub)
//
// MIGRATION:
// - Move from textFont -> textFont_ OR handle the exceptions that textFont throws yourself

p5.prototype.getImage = function () { return createImage(50, 50) }
p5.prototype.getSound = function () { return {} }
p5.prototype.println = p5.prototype.print;
p5.prototype.Program = { restart: function () { window.location.reload() } }
p5.prototype.pushMatrix = p5.prototype.push;
p5.prototype.popMatrix = p5.prototype.pop;
p5.prototype.createFont = function (font) {
    try { loadFont(font); } catch { }
};
p5.prototype.textFont_ = function (font) {
    try { textFont(font); } catch { }
}
p5.prototype.playSound = function (sound) { }
try {
    p5.prototype.UP = UP_ARROW;
    p5.prototype.DOWN = DOWN_ARROW;
    p5.prototype.LEFT = LEFT_ARROW;
    p5.prototype.RIGHT = RIGHT_ARROW;
} catch { }