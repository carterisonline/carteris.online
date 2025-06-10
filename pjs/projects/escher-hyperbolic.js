p5.RendererGL.prototype._initContext = function () {
    try {
        this.drawingContext =
            this.canvas.getContext('webgl2', this._pInst._glAttributes) ||
            this.canvas.getContext('experimental-webgl', this._pInst._glAttributes);
        if (this.drawingContext === null) {
            throw new Error('Error creating webgl context');
        } else {
            const gl = this.drawingContext;
            // gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            this._viewport = this.drawingContext.getParameter(
                this.drawingContext.VIEWPORT
            );
        }
    } catch (er) {
        throw er;
    }
};

let s;

s = loadShader('shaders/rect.vert', 'shaders/escher-hyperbolic.frag');
pixelDensity(1);
p = createGraphics(600, 600, WEBGL).noStroke();


function draw() {
    if (frameCount > 30) {
        background(200);
        s.setUniform("iResolution", [p.width, p.height]);
        s.setUniform("iTime", millis() / 1000.);
        s.setUniform("iMouse", mouseIsPressed ? [mouseX, mouseY, 1.0, 1.0] : [0.0, 0.0, 0.0, 0.0]);
        p.shader(s);
        p.rect(0, 0, 50);
        image(p, 0, 0);
    }
}