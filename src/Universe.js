import { getGL, initSimpleShaderProgram } from './glsl-utilities'
// New language alert! The ultimate bare-bones GLSL shaders.
const VERTEX_SHADER = `
  #ifdef GL_ES
  precision highp float;
  #endif

  attribute vec3 vertexPosition;
  attribute vec3 vertexColor;
  varying vec4 pixelVertexColor;

  attribute vec3 vertexNormal;

  uniform mat4 projectionMatrix;
  uniform mat4 cameraMatrix;
  uniform mat4 transform;
  uniform vec3 ambientLight;
  uniform vec3 directLight;

  void main(void) {
    vec4 transformedNormal = transform * vec4(vertexNormal, 1.0);

    float reflectedLight = dot(
      normalize(directLight),
      normalize(vec3(transformedNormal))
    );

    gl_Position = projectionMatrix * cameraMatrix * transform * vec4(vertexPosition, 1.0);
    pixelVertexColor = vec4(
      (ambientLight * vertexColor) + (
      reflectedLight < 0.0 ? vec3(0.0, 0.0, 0.0) : reflectedLight * vertexColor
      ), 
      1.0
    );
  }
`

const FRAGMENT_SHADER = `
  #ifdef GL_ES
  precision highp float;
  #endif

  uniform vec3 color;

  varying vec4 pixelVertexColor;

  void main(void) {
    gl_FragColor = pixelVertexColor;
  }
`

class Universe {
  constructor(canvas) {
    // Grab the WebGL rendering context.
    const gl = getGL(canvas)
    if (!gl) {
      alert('No WebGL context found...sorry.')

      // No WebGL, no use going on...
      return
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.viewport(0, 0, canvas.width, canvas.height)

    // Initialize the shaders.
    let abort = false
    const shaderProgram = initSimpleShaderProgram(
      gl,
      VERTEX_SHADER,
      FRAGMENT_SHADER,

      // Very cursory error-checking here...
      shader => {
        abort = true
        alert('Shader problem: ' + gl.getShaderInfoLog(shader))
      },

      // Another simplistic error check: we don't even access the faulty
      // shader program.
      shaderProgram => {
        abort = true
        alert('Could not link shaders...sorry.')
      }
    )

    // If the abort variable is true here, we can't continue.
    if (abort) {
      alert('Fatal errors encountered; we cannot continue.')
      return
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram)

    this.gl = gl
    this.shaderProgram = shaderProgram

    // We need to remember where our GLSL variables live.
    // Hold on to the important variables within the shaders.
    this.vertexPosition = gl.getAttribLocation(shaderProgram, 'vertexPosition')
    gl.enableVertexAttribArray(this.vertexPosition)

    this.vertexColor = gl.getAttribLocation(shaderProgram, 'vertexColor')
    gl.enableVertexAttribArray(this.vertexColor)

    this.vertexNormal = gl.getAttribLocation(shaderProgram, 'vertexNormal')
    gl.enableVertexAttribArray(this.vertexNormal)

    this.rotationMatrix = gl.getUniformLocation(shaderProgram, 'rotationMatrix')
    this.transform = gl.getUniformLocation(shaderProgram, 'transform')
    this.projection = gl.getUniformLocation(shaderProgram, 'projectionMatrix')
    this.cameraLocation = gl.getUniformLocation(shaderProgram, 'cameraMatrix')
    this.lightDirection = gl.getUniformLocation(shaderProgram, 'directLight')
    this.ambientLight = gl.getUniformLocation(shaderProgram, 'ambientLight')
  }

  /*
   * Displays an individual object.
   */
  drawScene(group, projectionMatrix, camera, currentRotation, ambientLightStrength, lightDirection) {
    const gl = this.gl

    // Clear the display.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    // Display the objects.
    gl.uniformMatrix4fv(this.projection, gl.FALSE, new Float32Array(projectionMatrix.getElements()))

    gl.uniformMatrix4fv(this.cameraLocation, gl.FALSE, new Float32Array(camera))

    gl.uniform3f(this.ambientLight, ambientLightStrength, ambientLightStrength, ambientLightStrength)
    gl.uniform3f(this.lightDirection, ...lightDirection)

    group.draw(this.transform, currentRotation, this.shaderProgram, this.vertexPosition)
    // All done.
    gl.flush()
  }
}

export default Universe
