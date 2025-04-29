import { object3d } from './object3d'

class Gem extends object3d {
  constructor(gl, sizeI, xCoord, yCoord, zCoord, color) {
    const size = sizeI ?? 0.15
    const x = xCoord ?? 0
    const y = yCoord ?? 0
    const z = zCoord ?? 0
    super(
      gl,

      [
        [x, 3 * size + y, z], // Top 0
        [size + x, y, z], // Right 1
        [x, y - 3 * size, z], // Bottom 2
        [x - size, y, z], // Left 3
        [x, y, z + size], // Front 4
        [x, y, z - size] // Back 5
      ],

      [
        [0, 4, 1], // Top front right
        [1, 4, 2], //right front bottom
        [0, 3, 4], // top left front
        [4, 3, 2], // front left bottom

        [0, 1, 5], // top right back
        [5, 1, 2], //back right bottom
        [0, 5, 3], //top back left
        [5, 3, 2] // back left bottom
      ],

      color
    )
    this.x = x
    this.y = y
    this.z = z
  }
  x() {
    return this.x
  }

  y() {
    return this.y
  }
  z() {
    return this.z
  }
}
export default Gem
