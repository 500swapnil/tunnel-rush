tunnelRotation = 0.0;

function initTunnel(height, gl) {

    // NEW

    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

    const textureCoordinates = [
        // Front
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Back
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Top
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Bottom
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Right
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Left
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Left
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Left
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
        gl.STATIC_DRAW);

    // Lighting
    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

    const vertexNormals = [

        // Back
        -0.707106781,  -0.707106781, 0.0,
        -0.707106781,  -0.707106781, 0.0,
        -0.707106781,  -0.707106781, 0.0,
        -0.707106781,  -0.707106781, 0.0,

        // Top
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,

        // Bottom
        -0.707106781,  0.707106781, 0.0,
        -0.707106781,  0.707106781, 0.0,
        -0.707106781,  0.707106781, 0.0,
        -0.707106781,  0.707106781, 0.0,

        // Right
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,

        // Left
        0.707106781,  0.707106781, 0.0,
        0.707106781,  0.707106781, 0.0,
        0.707106781,  0.707106781, 0.0,
        0.707106781,  0.707106781, 0.0,

        //NN
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,

        //NN2
        0.707106781,  -0.707106781, 0.0,
        0.707106781,  -0.707106781, 0.0,
        0.707106781,  -0.707106781, 0.0,
        0.707106781,  -0.707106781, 0.0,

        // Front
        0.0,  -1.0,  0.0,
        0.0,  -1.0,  0.0,
        0.0,  -1.0,  0.0,
        0.0,  -1.0,  0.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
        gl.STATIC_DRAW);

    // Create a buffer for the cube's vertex positions.

    const positionBuffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Now create an array of positions for the cube.

    const positions = [
        // Face 1
        -height * Math.tan(45 / 2 * Math.PI / 180), height, -1.0,
        -height * Math.tan(45 / 2 * Math.PI / 180), height, 1.0,
        height * Math.tan(45 / 2 * Math.PI / 180), height, 1.0,
        height * Math.tan(45 / 2 * Math.PI / 180), height, -1.0,

        // Face 2
        height * Math.tan(45 / 2 * Math.PI / 180), height, -1.0,
        height * Math.tan(45 / 2 * Math.PI / 180), height, 1.0,
        height, height * Math.tan(45 / 2 * Math.PI / 180), 1.0,
        height, height * Math.tan(45 / 2 * Math.PI / 180), -1.0,

        // Face 3
        height, height * Math.tan(45 / 2 * Math.PI / 180), -1.0,
        height, height * Math.tan(45 / 2 * Math.PI / 180), 1.0,
        height, -height * Math.tan(45 / 2 * Math.PI / 180), 1.0,
        height, -height * Math.tan(45 / 2 * Math.PI / 180), -1.0,

        // Face 4
        height * Math.tan(45 / 2 * Math.PI / 180), -height, -1.0,
        height * Math.tan(45 / 2 * Math.PI / 180), -height, 1.0,
        height, -height * Math.tan(45 / 2 * Math.PI / 180), 1.0,
        height, -height * Math.tan(45 / 2 * Math.PI / 180), -1.0,

        // Face 5
        -height * Math.tan(45 / 2 * Math.PI / 180), -height, -1.0,
        -height * Math.tan(45 / 2 * Math.PI / 180), -height, 1.0,
        height * Math.tan(45 / 2 * Math.PI / 180), -height, 1.0,
        height * Math.tan(45 / 2 * Math.PI / 180), -height, -1.0,

        // Face 6
        -height * Math.tan(45 / 2 * Math.PI / 180), -height, -1.0,
        -height * Math.tan(45 / 2 * Math.PI / 180), -height, 1.0,
        -height, -height * Math.tan(45 / 2 * Math.PI / 180), 1.0,
        -height, -height * Math.tan(45 / 2 * Math.PI / 180), -1.0,

        // Face 7
        -height, height * Math.tan(45 / 2 * Math.PI / 180), -1.0,
        -height, height * Math.tan(45 / 2 * Math.PI / 180), 1.0,
        -height, -height * Math.tan(45 / 2 * Math.PI / 180), 1.0,
        -height, -height * Math.tan(45 / 2 * Math.PI / 180), -1.0,

        // Face 8
        -height * Math.tan(45 / 2 * Math.PI / 180), height, -1.0,
        -height * Math.tan(45 / 2 * Math.PI / 180), height, 1.0,
        -height, height * Math.tan(45 / 2 * Math.PI / 180), 1.0,
        -height, height * Math.tan(45 / 2 * Math.PI / 180), -1.0,
    ];

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Now set up the colors for the faces. We'll use solid colors
    // for each face.

    //+40
    const faceColors = [
        [205 / 255, 58 / 255, 114 / 255, 1.0],    // Front face: white
        [179 / 255, 64 / 255, 146 / 255, 1.0],    // Back face: red
        [116 / 255, 50 / 255, 154 / 255, 1.0],    // Top face: green
        [55 / 255, 55 / 255, 169 / 255, 1.0],    // Bottom face: blue
        [40 / 255, 114 / 255, 141 / 255, 1.0],    // Right face: yellow
        [64 / 255, 170 / 255, 58 / 255, 1.0],    // Left face: purple
        [183 / 255, 218 / 255, 66 / 255, 1.0],    // Face 7: green
        [263 / 255, 122 / 255, 60 / 255, 1.0],    // Face 8: blue
    ];

    // const faceColors = [
    //     [0.0, 0.0, 1.0, 1.0],    // Face 1: white
    //     [0.0, 0.0, 0.8, 1.0],    // Face 2: red
    //     [0.0, 0.0, 0.7, 1.0],
    //     [0.0, 0.0, 0.6, 1.0],    // Face 4: blue
    //     [0.0, 0.0, 0.5, 1.0],
    //     [0.0, 0.0, 0.6, 1.0],
    //     [0.0, 0.0, 0.7, 1.0],
    //     [0.0, 0.0, 0.85, 1.0],
    //
    // ];

    // Convert the array of colors into a table for all the vertices.

    var colors = [];

    for (var j = 0; j < faceColors.length; ++j) {
        const c = faceColors[j];

        // Repeat each color four times for the four vertices of the face
        colors = colors.concat(c, c, c, c);
    }

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // Build the element array buffer; this specifies the indices
    // into the vertex arrays for each face's vertices.

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.

    const indices = [
        0, 1, 2, 0, 2, 3,    // front
        4, 5, 6, 4, 6, 7,    // back
        8, 9, 10, 8, 10, 11,   // top
        12, 13, 14, 12, 14, 15,   // bottom
        16, 17, 18, 16, 18, 19,   // right
        20, 21, 22, 20, 22, 23,   // left
        24, 25, 26, 24, 26, 27,    // front
        28, 29, 30, 28, 30, 31,    // front
    ];

    // Now send the element array to GL

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), gl.STATIC_DRAW);

    return {
        position: positionBuffer,
        color: colorBuffer,
        textureCoord: textureCoordBuffer,
        indices: indexBuffer,
        normal: normalBuffer,
    };
}

function drawTunnel(gl, programInfo, buffers, deltaTime) {

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 150.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar);

    tunnelRotation = 0.0;
    for (var i = 0; i < 300; i++) {
        // Set the drawing position to the "identity" point, which is
        // the center of the scene.
        const modelViewMatrix = mat4.create();

        // Now move the drawing position a bit to where we want to
        // start drawing the square.

        mat4.translate(modelViewMatrix,     // destination matrix
            modelViewMatrix,     // matrix to translate
            [0, cubeR, 0]);  // amount to translate

        // mat4.rotate(modelViewMatrix,  // destination matrix
        //     modelViewMatrix,  // matrix to rotate
        //     -cubeA-Math.PI/2,     // amount to rotate in radians
        //     [0, 0, 1]);       // axis to rotate around (Z)
        //
        // mat4.translate(modelViewMatrix,     // destination matrix
        //     modelViewMatrix,     // matrix to translate
        //     [-cubeR*Math.cos(cubeA), -cubeR*Math.sin(cubeA), 0]);  // amount to translate

        var cubeTranslate = cubePositionz;
        while (cubeTranslate >= 16) {
            cubeTranslate -= 16;
        }

        mat4.translate(modelViewMatrix,     // destination matrix
            modelViewMatrix,     // matrix to translate
            [-0.0, 0.0, cubeTranslate - i * 2]);  // amount to translate

        mat4.rotate(modelViewMatrix,  // destination matrix
            modelViewMatrix,  // matrix to rotate
            tunnelRotation - cubeA,     // amount to rotate in radians
            [0, 0, 1]);       // axis to rotate around (Z)
        // mat4.rotate(modelViewMatrix,  // destination matrix
        //     modelViewMatrix,  // matrix to rotate
        //     tunnelRotation,// amount to rotate in radians
        //     [0, 1, 0]);       // axis to rotate around (X)

        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
        }

        // Tell WebGL how to pull out the colors from the color buffer
        // into the vertexColor attribute.
        {
            const numComponents = 4;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexColor,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexColor);
        }

        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

        {
            const vertexCount = 48;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
        tunnelRotation += 135 * Math.PI / 180;
    }

    // Update the rotation for the next draw

    // tunnelRotation += deltaTime;
}

function drawTunnelTex(gl, programInfo, buffers, deltaTime, texture) {

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 150.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
        fieldOfView,
        aspect,
        zNear,
        zFar);

    tunnelRotation = 0.0;
    for (var i = 0; i < 300; i++) {
        // Set the drawing position to the "identity" point, which is
        // the center of the scene.
        const modelViewMatrix = mat4.create();

        // Now move the drawing position a bit to where we want to
        // start drawing the square.

        mat4.translate(modelViewMatrix,     // destination matrix
            modelViewMatrix,     // matrix to translate
            [0, cubeR, 0]);  // amount to translate

        // mat4.rotate(modelViewMatrix,  // destination matrix
        //     modelViewMatrix,  // matrix to rotate
        //     -cubeA-Math.PI/2,     // amount to rotate in radians
        //     [0, 0, 1]);       // axis to rotate around (Z)
        //
        // mat4.translate(modelViewMatrix,     // destination matrix
        //     modelViewMatrix,     // matrix to translate
        //     [-cubeR*Math.cos(cubeA), -cubeR*Math.sin(cubeA), 0]);  // amount to translate

        var cubeTranslate = cubePositionz;
        while (cubeTranslate >= 16) {
            cubeTranslate -= 16;
        }

        mat4.translate(modelViewMatrix,     // destination matrix
            modelViewMatrix,     // matrix to translate
            [-0.0, 0.0, cubeTranslate - i * 2]);  // amount to translate

        mat4.rotate(modelViewMatrix,  // destination matrix
            modelViewMatrix,  // matrix to rotate
            tunnelRotation - cubeA,     // amount to rotate in radians
            [0, 0, 1]);       // axis to rotate around (Z)
        // mat4.rotate(modelViewMatrix,  // destination matrix
        //     modelViewMatrix,  // matrix to rotate
        //     tunnelRotation,// amount to rotate in radians
        //     [0, 1, 0]);       // axis to rotate around (X)

        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
        }

        // tell webgl how to pull out the texture coordinates from buffer
        {
            const num = 2; // every coordinate composed of 2 values
            const type = gl.FLOAT; // the data in the buffer is 32 bit float
            const normalize = false; // don't normalize
            const stride = 0; // how many bytes to get from one set to the next
            const offset = 0; // how many bytes inside the buffer to start from
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
            gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, num, type, normalize, stride, offset);
            gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
        }

        // Tell WebGL how to pull out the normals from
        // the normal buffer into the vertexNormal attribute.
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexNormal,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexNormal);
        }

        const normalMatrix = mat4.create();
        mat4.invert(normalMatrix, modelViewMatrix);
        mat4.transpose(normalMatrix, normalMatrix);

        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.normalMatrix,
            false,
            normalMatrix);

        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);

        // Bind the texture to texture unit 0
        if (i%2===0)
            gl.bindTexture(gl.TEXTURE_2D, wallTex);
        else
            gl.bindTexture(gl.TEXTURE_2D, wall2Tex);

        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

        {
            const vertexCount = 48;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
        tunnelRotation += 135 * Math.PI / 180;
    }

    // Update the rotation for the next draw

    // tunnelRotation += deltaTime;
}