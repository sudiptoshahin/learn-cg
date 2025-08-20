window.onload = function () {

    const canvas = document.getElementById('mycanvas');
    const gl = canvas.getContext('webgl');

    // for responsiveness we have to use window.devicePixelRatio
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = pixelRatio * canvas.clientWidth;
    canvas.height = pixelRatio * canvas.clientHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // before rendering clear the screen
    gl.clearColor(1, 1, 1, 0);
    gl.lineWidth(1.0);

    /** vartex attributes */
    let positions = [
        -0.9, 0.4, 0,
        0.8, 0.4, 0,
        0.8, -0.4, 0,
        -0.8, 0.4, 0,
        0.8, -0.4, 0,
        -0.8, -0.4, 0
    ];

    let colors = [
        1, 0, 0, 1,
        0, 1, 0, 1,
        0, 0, 1, 1,
        1, 0, 0, 1,
        0, 0, 1, 1,
        1, 0, 1, 1
    ];
    
    // position buffer
    const position_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW
    );

    // color buffer
    const color_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(colors),
        gl.STATIC_DRAW
    );


    /** COMPILE PROGRAM */
    /** VARTEX shader code */
    const vs = gl.createShader(gl.VARTEX_SHADER);
    gl.shaderSource(vs, vs_source);
    gl.compileShader(vs);

    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        console.error('__SHADER_ERROR__', gl.getShaderParameter(vs, gl.COMPILE_STATUS));
        alert(gl.getShaderInfoLog(vs));
        gl.deleteShader(vs);
    }

    /** Fragment shader code */
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fx_source);
    gl.compileShader(fs);

    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        console.error('__FRAGMENT_SHADER_ERROR__', gl.getShaderParameter(fs, gl.COMPILE_STATUS));
        alert(gl.getShaderInfoLog(fs));
        gl.deleteShader(fs);
    }

    // /** create program for compile */
    prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        alert(gl.getProgramInfoLog(prog));
    }

    /** Uniform variables */
    const m = gl.getUniformLocation(prog, 'trans');

    let matrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];

    gl.useProgram(prog);
    gl.uniformMatrix4fv(m, false, matrix);

    /**
     * In rendering GLSL code explanation for
     * ------------------
     * vartex_shader
     * ------------------
     * attribute vec3 pos;
     * attribute vec4 clr;
     * 
     * uniform mat4 trans;
     * varying vec4 vcolor;
     * 
     * void main() {
     *    gl_Position = trans * vec4(pos, 1);
     *    vcolor = clr;
     * }
     * 
     * --------------------
     * fragment_shader
     * --------------------
     * 
     * precision mediump float;
     * varying vec4 vcolor;
     * 
     * void main() {
     *    gl_FragColor = vcolor;
     * }
     */

    // attribute vec3 pos;
    // attribute vec4 clr;
    const p = gl.getAttribLocation(prog, 'pos');
    gl.bindBuffer(gl.ARRAY_BUFFER, position_buffer);
    gl.vartexAttribPointer(p, 3, gl.FLOAT, false, 0, 0);
    gl.enableVartexAttribArray(p);

    const c = gl.getAttribLocation(prog, 'clr');
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    gl.vartexAttribPointer(c, 4, gl.FLOAT, false, 0, 0);
    gl.enableVartexAttribArray(c);


    /**
     * before compile clear screen
     * vertex-shader -> rasterizer -> fragment-shader -> rendering
     */
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(prog);
    gl.drawArrays(gl.TRIANGLES, 0, 6);


}