var wallTex;
var wall2Tex;
var cementTex;
var score=0;
var dead = false;
main();

function callDead() {
    dead = true;
    $("#canvasDiv").html("<h1>Game Over! Refresh Page to Start Again</h1>");
    
}

//
// Start here
//
function main() {
    
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    // If we don't have a GL context, give up now

    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }

    // Vertex shader program

    const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

    // Fragment shader program

    const fsSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;

    const fsSourcebw = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying lowp vec4 vColor;

    void main(void) {
        float gray = (vColor.r + vColor.g + vColor.b) / 3.0;
        vec3 grayscale = vec3(gray);

        gl_FragColor = vec4(grayscale, vColor.a);
    }
  `;

    const fsSourceBlink = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `;

    const fsSourceBlinkbw = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying lowp vec4 vColor;

    void main(void) {
        float gray = (vColor.r + vColor.g + vColor.b) / 3.0;
        vec3 grayscale = vec3(gray);
        gl_FragColor = vec4(grayscale, vColor.a);
        gl_FragColor.r+=0.4;
      gl_FragColor.g+=0.4;
      gl_FragColor.b+=0.4;
    }
  `;

    const vsSourceTex = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;

      // Apply lighting effect

      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;

    const fsSourceTex = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;

    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
  `;

    const fsSourceTexbw = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;

    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
      
      vec3 color = texelColor.rgb;
        float gray = (color.r + color.g + color.b) / 3.0;
        vec3 grayscale = vec3(gray);

      gl_FragColor = vec4(grayscale * vLighting, texelColor.a);
    }
  `;

    const fsSourceTexBlink = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;

    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
       gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
      
      // vec3 color = texelColor.rgb;
      //   float gray = (color.r + color.g + color.b) / 3.0;
      //   vec3 grayscale = vec3(gray);

      // gl_FragColor = vec4(grayscale * vLighting, texelColor.a);
      gl_FragColor.r+=0.4;
      gl_FragColor.g+=0.4;
      gl_FragColor.b+=0.4;
    }
  `;

    const fsSourceTexBlinkbw = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;

    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
       // gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
      
      vec3 color = texelColor.rgb;
        float gray = (color.r + color.g + color.b) / 3.0;
        vec3 grayscale = vec3(gray);

      gl_FragColor = vec4(grayscale * vLighting, texelColor.a);
      gl_FragColor.r+=0.4;
      gl_FragColor.g+=0.4;
      gl_FragColor.b+=0.4;
      
    }
  `;

    // Initialize a shader program; this is where all the lighting
    // for the vertices and so forth is established.
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    const shaderProgrambw = initShaderProgram(gl, vsSource, fsSourcebw);
    const shaderProgramBlink = initShaderProgram(gl, vsSource, fsSourceBlink);
    const shaderProgramBlinkbw = initShaderProgram(gl, vsSource, fsSourceBlinkbw);
    const shaderProgramTex = initShaderProgram(gl, vsSourceTex, fsSourceTex);
    const shaderProgramTexbw = initShaderProgram(gl, vsSourceTex, fsSourceTexbw);
    const shaderProgramTexBlink = initShaderProgram(gl, vsSourceTex, fsSourceTexBlink);
    const shaderProgramTexBlinkbw = initShaderProgram(gl, vsSourceTex, fsSourceTexBlinkbw);

    // Collect all the info needed to use the shader program.
    // Look up which attributes our shader program is using
    // for aVertexPosition, aVevrtexColor and also
    // look up uniform locations.
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };

    const programInfobw = {
        program: shaderProgrambw,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgrambw, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(shaderProgrambw, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgrambw, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgrambw, 'uModelViewMatrix'),
        },
    };

    const programInfoBlink = {
        program: shaderProgramBlink,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgramBlink, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(shaderProgramBlink, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgramBlink, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgramBlink, 'uModelViewMatrix'),
        },
    };

    const programInfoBlinkbw = {
        program: shaderProgramBlinkbw,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgramBlinkbw, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(shaderProgramBlinkbw, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgramBlinkbw, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgramBlinkbw, 'uModelViewMatrix'),
        },
    };

    const programInfoTex = {
        program: shaderProgramTex,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgramTex, 'aVertexPosition'),
            textureCoord: gl.getAttribLocation(shaderProgramTex, 'aTextureCoord'),
            vertexNormal: gl.getAttribLocation(shaderProgramTex, 'aVertexNormal'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgramTex, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgramTex, 'uModelViewMatrix'),
            uSampler: gl.getUniformLocation(shaderProgramTex, 'uSampler'),
            normalMatrix: gl.getUniformLocation(shaderProgramTex, 'uNormalMatrix'),
        },
    };

    const programInfoTexbw = {
        program: shaderProgramTexbw,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgramTexbw, 'aVertexPosition'),
            textureCoord: gl.getAttribLocation(shaderProgramTexbw, 'aTextureCoord'),
            vertexNormal: gl.getAttribLocation(shaderProgramTexbw, 'aVertexNormal'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgramTexbw, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgramTexbw, 'uModelViewMatrix'),
            uSampler: gl.getUniformLocation(shaderProgramTexbw, 'uSampler'),
            normalMatrix: gl.getUniformLocation(shaderProgramTexbw, 'uNormalMatrix'),
        },
    };

    const programInfoTexBlink = {
        program: shaderProgramTexBlink,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgramTexBlink, 'aVertexPosition'),
            textureCoord: gl.getAttribLocation(shaderProgramTexBlink, 'aTextureCoord'),
            vertexNormal: gl.getAttribLocation(shaderProgramTexBlink, 'aVertexNormal'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgramTexBlink, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgramTexBlink, 'uModelViewMatrix'),
            uSampler: gl.getUniformLocation(shaderProgramTexBlink, 'uSampler'),
            normalMatrix: gl.getUniformLocation(shaderProgramTexBlink, 'uNormalMatrix'),
        },
    };

    const programInfoTexBlinkbw = {
        program: shaderProgramTexBlinkbw,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgramTexBlinkbw, 'aVertexPosition'),
            textureCoord: gl.getAttribLocation(shaderProgramTexBlinkbw, 'aTextureCoord'),
            vertexNormal: gl.getAttribLocation(shaderProgramTexBlinkbw, 'aVertexNormal'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgramTexBlinkbw, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgramTexBlinkbw, 'uModelViewMatrix'),
            uSampler: gl.getUniformLocation(shaderProgramTexBlinkbw, 'uSampler'),
            normalMatrix: gl.getUniformLocation(shaderProgramTexBlinkbw, 'uNormalMatrix'),
        },
    };


    // Here's where we call the routine that builds all the
    // objects we'll be drawing.

    const demo_cube = initCube(gl);
    const tunnel = initTunnel(2, gl);
    var obPole = [];
    var obPoleRot = [];
    var obDisk = [];
    var obDiskRot = [];
    var tex = false;
    var bw = false;
    wallTex = loadTexture(gl, 'stone.png');
    wall2Tex = loadTexture(gl, 'brick.jpg');
    cementTex = loadTexture(gl, 'cement.jpg');

    for (var i = 40; i <= 140; i += 20) {
        var rand = (Math.random() * (10) - 5);
        if (rand < 0) {
            obDisk.push(initObDisk(gl, -i))
        }
        else {
            obPole.push(initObPole(gl, -i));
        }
    }

    for (i = 180; i <= 840; i += 20) {
        rand = (Math.random() * (10) - 5);
        if (rand < 0) {
            obDiskRot.push(initObDisk(gl, -i));
        }
        else {
            obPoleRot.push(initObPole(gl, -i));
        }
    }

    var then = 0;
    Mousetrap.bind('a', function () {
        cubeA -= 0.06;
    });
    Mousetrap.bind('d', function () {
        cubeA += 0.06;
    });
    Mousetrap.bind('space', function () {
        if (cubeR === 1.5) {
            cubeV = 0.2;
        }
    });

    Mousetrap.bind('t', function () {
        tex = ~tex;
    });

    Mousetrap.bind('b', function () {
        bw = ~bw;
    });

    var count = 120;

    // Draw the scene repeatedly
    function render(now) {
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        score += deltaTime;
        $("#score").text("Score: " + (Math.round(score)));
        // console.log(score);
        then = now;

        gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
        gl.clearDepth(1.0);                 // Clear everything
        gl.enable(gl.DEPTH_TEST);           // Enable depth testing
        gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

        // Clear the canvas before we start drawing on it.

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        drawCube(gl, programInfo, demo_cube, deltaTime);
        if (bw){
            if (count > 0)
                if (tex)
                    drawTunnelTex(gl, programInfoTexbw, tunnel, deltaTime, wallTex);
                else
                    drawTunnel(gl, programInfobw, tunnel, deltaTime);
            else {
                if (tex)
                    drawTunnelTex(gl, programInfoTexBlinkbw, tunnel, deltaTime, wallTex);
                else
                    drawTunnel(gl, programInfoBlinkbw, tunnel, deltaTime);
                if (count < -1)
                    count = 120;
            }
        }
        else{
            if (count > 0)
                if (tex)
                    drawTunnelTex(gl, programInfoTex, tunnel, deltaTime, wallTex);
                else
                    drawTunnel(gl, programInfo, tunnel, deltaTime);
            else {
                if (tex)
                    drawTunnelTex(gl, programInfoTexBlink, tunnel, deltaTime, wallTex);
                else
                    drawTunnel(gl, programInfoBlink, tunnel, deltaTime);
                if (count < -1)
                    count = 120;
            }
        }
        count--;


        for (var j = 0; j < obPole.length; ++j) {
            if (tex)
                drawObPoleTex(gl, programInfoTex, obPole[j], deltaTime);
            else
                drawObPole(gl, programInfo, obPole[j], deltaTime);

            var diff = Math.max(obPole[j].a, cubeA) - Math.min(obPole[j].a, cubeA);
            if (diff > Math.PI) diff = 2 * Math.PI - diff;

            var diff2 = Math.max(obPole[j].a + Math.PI, cubeA) - Math.min(obPole[j].a + Math.PI, cubeA);
            if (diff2 > Math.PI) diff2 = 2 * Math.PI - diff2;

            if (cubePositionz >= obPole[j].z && Math.abs(obPole[j].z - (-cubePositionz)) < 0.5 && (diff < 10 * Math.PI / 180 || diff2 < 10 * Math.PI / 180)) {
                callDead();
                return;
            }
        }

        for (j = 0; j < obDisk.length; ++j) {
            if (tex)
                drawObDiskTex(gl, programInfoTex, obDisk[j], deltaTime);
            else
                drawObDisk(gl, programInfo, obDisk[j], deltaTime);

            var endA = obDisk[j].a - Math.PI;
            if (endA < 0) {
                if (((cubeR >= 0 && (cubeA <= obDisk[j].a || cubeA >= endA + 2 * Math.PI)) || (cubeR < 0 && (cubeA >= obDisk[j].a && cubeA <= endA + 2 * Math.PI))) && Math.abs(obDisk[j].z - (-cubePositionz)) < 0.5) {
                    callDead();
                    return;
                }
            }
            else {
                if (((cubeR < 0 && (cubeA >= obDisk[j].a || cubeA <= endA)) || (cubeR >= 0 && cubeA <= obDisk[j].a && cubeA >= endA)) && Math.abs(obDisk[j].z - (-cubePositionz)) < 0.5) {
                    callDead();
                    return;
                }
            }
        }

        for (j = 0; j < obPoleRot.length; ++j) {
            obPoleRot[j].a += obPoleRot[j].speed * deltaTime;
            if (tex)
                drawObPoleTex(gl, programInfoTex, obPoleRot[j], deltaTime);
            else
                drawObPole(gl, programInfo, obPoleRot[j], deltaTime);

            diff = Math.max(obPoleRot[j].a, cubeA) - Math.min(obPoleRot[j].a, cubeA);
            if (diff > Math.PI) diff = 2 * Math.PI - diff;

            diff2 = Math.max(obPoleRot[j].a + Math.PI, cubeA) - Math.min(obPoleRot[j].a + Math.PI, cubeA);
            if (diff2 > Math.PI) diff2 = 2 * Math.PI - diff2;

            if (cubePositionz >= obPoleRot[j].z && Math.abs(obPoleRot[j].z - (-cubePositionz)) < 0.5 && (diff < 10 * Math.PI / 180 || diff2 < 10 * Math.PI / 180)) {
                callDead();
                return;
            }
        }

        for (j = 0; j < obDiskRot.length; ++j) {
            obDiskRot[j].a += obDiskRot[j].speed * deltaTime;
            if (tex)
                drawObDiskTex(gl, programInfoTex, obDiskRot[j], deltaTime);
            else
                drawObDisk(gl, programInfo, obDiskRot[j], deltaTime);

            endA = obDiskRot[j].a - Math.PI;
            if (endA < 0) {
                if (((cubeR >= 0 && (cubeA <= obDiskRot[j].a || cubeA >= endA + 2 * Math.PI)) || (cubeR < 0 && (cubeA >= obDiskRot[j].a && cubeA <= endA + 2 * Math.PI))) && Math.abs(obDiskRot[j].z - (-cubePositionz)) < 0.5) {
                    callDead();
                    return;
                }
            }
            else {
                if (((cubeR < 0 && (cubeA >= obDiskRot[j].a || cubeA <= endA)) || (cubeR >= 0 && cubeA <= obDiskRot[j].a && cubeA >= endA)) && Math.abs(obDiskRot[j].z - (-cubePositionz)) < 0.5) {
                    callDead();
                    return;
                }
            }
        }

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

