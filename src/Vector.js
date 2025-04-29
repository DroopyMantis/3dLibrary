// Vector Library for functions

class Vector {
  constructor() {
    this.elements = [].slice.call(arguments)
  }
  get length() {
    return this.elements.length
  }

  get x() {
    return this.elements[0]
  }

  get y() {
    return this.elements[1]
  }

  get z() {
    return this.elements[2]
  }

  add(v) {
    let result = new Vector()
    result.elements[0] = this.x + v.x
    result.elements[1] = this.y + v.y
    result.elements[2] = this.z + v.z
    return result
  }

  subtract(v) {
    let result = new Vector()
    result.elements[0] = this.x - v.x
    result.elements[1] = this.y - v.y
    result.elements[2] = this.z - v.z

    return result
  }
  cross(v) {
    let result = new Vector()
    result.elements[0] = this.y * v.z - this.z * v.y
    result.elements[1] = this.z * v.x - this.x * v.z
    result.elements[2] = this.x * v.y - this.y * v.x

    return result
  }

  dot(v) {
    let result = 0
    result += this.x * v.x
    result += this.y * v.y
    result += this.z * v.z
    return result
  }
  divide(n) {
    let result = new Vector()

    result.elements[0] = this.x / n
    result.elements[1] = this.y / n
    result.elements[2] = this.z / n

    return result
  }
  multiply(s) {
    let result = new Vector()
    result.elements[0] = this.elements[0] * s
    result.elements[1] = this.elements[1] * s
    result.elements[2] = this.elements[2] * s

    return result
  }

  get magnitude() {
    let result = Math.sqrt(this.dot(this))
    return result
  }

  get unit() {
    let result = this.divide(this.magnitude)
    return result
  }

  projection(v) {
    let unitVector = v.unit
    let result = unitVector.multiply(this.dot(unitVector))
    return result
  }
}

export default Vector
