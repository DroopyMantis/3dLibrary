import { object3d } from './object3d'

class zPlane extends object3d {
  constructor(gl, sizeI, location, color) {
    const size = sizeI ?? 2
    const x = location[0] ?? 0
    const y = location[1] ?? 0
    const z = location[2] ?? 0
    super(
      gl,

      [
        [x + size, y, z], // bottom right 0
        [x - size, y + size, z], // top left 1
        [x - size, y, z], // Bottom left 2
        [x + size, y + size, z] // top right 3
      ],

      [
        [1, 2, 0], // Top left bottom left bottom right
        [3, 1, 0] // top right, bottom left, bottom right
      ],

      color
    )
  }
}
export default zPlane
