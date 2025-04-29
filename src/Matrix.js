import Vector from './Vector'
//checks to see if matrices
const checkMatrices = m => {
  if (m.length !== 16) {
    throw 'Not a 4x4 Matrix'
  }
}

class Matrix {
  constructor() {
    // Constructs a matrix given the values provided; if empty, the matrix becomes the identity matrix
    if (arguments.length === 0) {
      this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    } else {
      this.elements = [].slice.call(arguments)
    }
    checkMatrices(this.elements)
  }

  getElements() {
    return this.elements
  }

  //orthographic matrix
  ortho(left, right, top, bottom, near, far) {
    const l = left * -1 ?? -1
    const r = right ?? 1
    const t = top ?? 1
    const b = bottom * -1 ?? -1
    const n = near ?? -1
    const f = far ?? 100

    const result = new Matrix(
      2.0 / (r - l),
      0,
      0,
      0,

      0,
      2.0 / (t - b),
      0,
      0,

      0,
      0,
      -2.0 / (f - n),
      0,

      ((r + l) * -1) / (r - l),
      ((t + b) * -1) / (t - b),
      ((f + n) * -1) / (f - n),
      1
    )
    return result
  }
  perspective(left, right, top, bottom, near, far) {
    const l = left * -1 ?? -1
    const r = right ?? 1
    const t = top ?? 1
    const b = bottom * -1 ?? -1
    const n = near ?? 0.01
    const f = far ?? 100

    const result = new Matrix(
      (2.0 * n) / (r - l),
      0,
      0,
      0,

      0,
      (2.0 * n) / (t - b),
      0,
      0,

      (r + l) / (r - l),
      (t + b) / (t - b),
      (-1 * (f + n)) / (f - n),
      -1,

      0,
      0,
      (f * n * -2.0) / (f - n),
      0
    )
    return result
  }

  multiply(matrix2) {
    let result = []
    const a = this.elements
    const b = matrix2.getElements()
    checkMatrices(b)

    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 4; i++) {
        let sum = 0
        for (let k = 0; k < 4; k++) {
          sum += a[k * 4 + i] * b[j * 4 + k]
        }
        result.push(sum)
      }
    }
    let final = new Matrix(...result)
    return final // Return the result array
  }
  translate(x1, y1, z1) {
    const x = x1 ?? 0
    const y = y1 ?? 0
    const z = z1 ?? 0
    const result = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1)
    return result
  }
  rotateYaxis(currentRotation, x1, z1) {
    const x = x1 ?? 0
    const z = z1 ?? 0

    //translates rotational axis back to orgin
    const backToOrgin = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -x, 0, -z, 1)

    //rotates object around point (now at orgin)
    const rotate = new Matrix(1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1)
    const cR = currentRotation ?? 0
    const c = Math.cos(cR)
    const s = Math.sin(cR)
    rotate.elements[0] *= c
    rotate.elements[2] *= -s
    rotate.elements[8] *= s
    rotate.elements[10] *= c

    //translate rotational axis back to original point
    const point = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, 0, z, 1)

    //backToOrgin * rotate * point
    let final = point.multiply(rotate)
    final = final.multiply(backToOrgin)

    return final
  }
  rotateXaxis(currentRotation, y1, z1) {
    const y = y1 ?? 0
    const z = z1 ?? 0

    //translates rotational axis back to orgin
    const backToOrgin = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -y, -z, 1)

    //rotates object around point (now at orgin)
    const cR = currentRotation ?? 0
    const c = Math.cos(cR)
    const s = Math.sin(cR)
    const rotate = new Matrix(1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1)
    rotate.elements[5] *= c
    rotate.elements[6] *= s
    rotate.elements[9] *= -s
    rotate.elements[10] *= c

    //translate rotational axis back to original point
    const point = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, y, z, 1)

    //backToOrgin * rotate * point
    let final = point.multiply(rotate)
    final = final.multiply(backToOrgin)

    return final
  }
  rotateZaxis(currentRotation, x1, y1) {
    const x = x1 ?? 0
    const y = y1 ?? 0
    const cR = currentRotation ?? 0
    const c = Math.cos(cR)
    const s = Math.sin(cR)

    //translates rotational axis back to orgin
    const backToOrgin = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -x, -y, 0, 1)

    //rotates object around point (now at orgin)
    const rotate = new Matrix(1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
    rotate.elements[0] *= c
    rotate.elements[1] *= s
    rotate.elements[4] *= -s
    rotate.elements[5] *= c

    //translate rotational axis back to original point
    const point = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, 0, 1)

    //backToOrgin * rotate * point
    let final = point.multiply(rotate)
    final = final.multiply(backToOrgin)

    return final
  }
  scale(x1, y1, z1) {
    const x = x1 ?? 1
    const y = y1 ?? 1
    const z = z1 ?? 1
    const scale = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
    scale.elements[0] *= x
    scale.elements[5] *= y
    scale.elements[10] *= z
    return scale
  }
  cameraMatrix(location, direction, up) {
    let P = new Vector(...location)
    let Q = new Vector(...direction)
    let u = new Vector(...up)

    const ze = P.subtract(Q).unit
    const ye = u.subtract(u.projection(ze)).unit
    const xe = ye.cross(ze)
    const camera = new Matrix(
      xe.x,
      ye.x,
      ze.x,
      0,
      xe.y,
      ye.y,
      ze.y,
      0,
      xe.z,
      ye.z,
      ze.z,
      0,
      -P.dot(xe),
      -P.dot(ye),
      -P.dot(ze),
      1
    )

    return camera
  }
}
export default Matrix
