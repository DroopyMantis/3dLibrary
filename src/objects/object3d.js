import { initVertexBuffer } from '../glsl-utilities'
import {
  computeTriangleNormals,
  toRawLineArray,
  toRawTriangleArray,
  computeFaceNormals,
  computeVertexNormals
} from '../shapes-utilities'
import Matrix from '../Matrix'

class object3d {
  constructor(gl, vertices, facesByIndex, color) {
    this.gl = gl
    this.vertices = vertices ?? []
    this.facesByIndex = facesByIndex ?? []
    this.color = color ?? { r: 0.0, g: 0.0, b: 0.5 }
    this.faceNormals = facesByIndex ? computeFaceNormals(this) : []
    this.wireframeValue = false
    this.rawVertices = toRawLineArray(this)
    this.smooth = true

    this.rotateX = false
    this.rotateY = false
    this.rotateZ = false
    this.scale = false
    this.translate = false
    this.rotationPoint = [0, 0, 0]
    this.translationVector = [0, 0, 0]
    this.scaleVector = [1, 1, 1]
  }

  get wireframe() {
    return this.wireframeValue
  }

  set wireframe(newWireframeValue) {
    this.wireframeValue = newWireframeValue

    this.rawVertices = newWireframeValue ? toRawLineArray(this) : toRawTriangleArray(this)
    this.verticesBuffer = initVertexBuffer(this.gl, this.rawVertices)

    if (Array.isArray(this.color)) {
      const colorsInsteadOfVertices = { facesByIndex: this.facesByIndex, vertices: this.color }
      this.colors = this.wireframeValue
        ? toRawLineArray(colorsInsteadOfVertices)
        : toRawTriangleArray(colorsInsteadOfVertices)
    } else {
      this.colors = []
      for (let i = 0, maxi = this.rawVertices.length / 3; i < maxi; i += 1) {
        this.colors = this.colors.concat(this.color.r, this.color.g, this.color.b)
      }
    }

    if (!this.wireframeValue) {
      this.normalsBuffer = initVertexBuffer(this.gl, computeTriangleNormals(this))
      if (!this.smooth) {
        this.normalsBuffer = initVertexBuffer(this.gl, computeTriangleNormals(this))
      } else {
        this.normalsBuffer = initVertexBuffer(this.gl, computeVertexNormals(this))
      }
    } else {
      this.normalsBuffer = initVertexBuffer(this.gl, this.rawVertices)
    }

    this.colorsBuffer = initVertexBuffer(this.gl, this.colors)
  }
  draw(transform, currentRotation, parentTransform, shaderProgram, vertexPosition) {
    // Draw the current object
    const mat = new Matrix()
    let transformation = mat
    let final = mat

    if (this.rotateY) {
      transformation = mat.rotateYaxis(currentRotation / 4, this.rotationPoint[0], this.rotationPoint[2])
    }
    if (this.rotateX) {
      transformation = mat.rotateXaxis(currentRotation / 4, this.rotationPoint[1], this.rotationPoint[2])
    }
    if (this.rotateZ) {
      transformation = mat.rotateZaxis(currentRotation / 4, this.rotationPoint[0], this.rotationPoint[1])
    }
    if (this.scale) {
      transformation = mat.scale(...this.scaleVector)
    }
    if (this.translate) {
      transformation = mat.translate(...this.translationVector)
    }
    final = parentTransform.multiply(transformation)

    this.gl.uniformMatrix4fv(transform, this.gl.FALSE, new Float32Array(final.getElements()))

    const vertexColor = this.gl.getAttribLocation(shaderProgram, 'vertexColor')
    const vertexNormal = this.gl.getAttribLocation(shaderProgram, 'vertexNormal')

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalsBuffer)
    this.gl.vertexAttribPointer(vertexNormal, 3, this.gl.FLOAT, false, 0, 0)

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorsBuffer)
    this.gl.vertexAttribPointer(vertexColor, 3, this.gl.FLOAT, false, 0, 0)

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.verticesBuffer)
    this.gl.vertexAttribPointer(vertexPosition, 3, this.gl.FLOAT, false, 0, 0)

    this.gl.drawArrays(this.wireframeValue ? this.gl.LINES : this.gl.TRIANGLES, 0, this.rawVertices.length / 3)
  }
}

class objectGroup extends object3d {
  constructor(gl) {
    super(gl)
    this.children = []
    this.rotateX = false
    this.rotateY = false
    this.rotateZ = false
    this.scale = false
    this.translate = false
    this.parentTransform = new Matrix()
    this.rotationPoint = [0, 0, 0]
    this.translationVector = [0, 0, 0]
    this.scaleVector = [1, 1, 1]
  }

  add(child) {
    this.children.push(child)
  }

  remove(child) {
    const index = this.children.indexOf(child)
    if (index !== -1) {
      this.children.splice(index, 1)
    }
  }
  draw(transform, currentRotation, shaderProgram) {
    const mat = new Matrix()
    if (this.rotateY) {
      this.parentTransform = mat.rotateYaxis(currentRotation / 10, this.rotationPoint[0], this.rotationPoint[2])
    }
    if (this.rotateX) {
      this.parentTransform = mat.rotateXaxis(currentRotation / 10, this.rotationPoint[1], this.rotationPoint[2])
    }
    if (this.rotateZ) {
      this.parentTransform = mat.rotateZaxis(currentRotation / 10, this.rotationPoint[0], this.rotationPoint[1])
    }
    if (this.scale) {
      this.parentTransform = mat.scale(...this.scaleVector)
    }
    if (this.translate) {
      this.parentTransform = mat.translate(...this.translationVector)
    }

    // Draw the children
    this.children.forEach(child => {
      child.draw(transform, currentRotation, this.parentTransform, shaderProgram)
    })
  }
}

export { object3d, objectGroup }
