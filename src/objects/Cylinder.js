import { object3d } from './object3d'

class Cylinder extends object3d {
  constructor(gl, radiusTop, radiusBottom, height, radialSegments, heightSegments, xOffset, yOffset, zOffset, color) {
    const vertices = []
    const facesByIndex = []

    for (let y = 0; y <= heightSegments; y++) {
      const v = y / heightSegments
      const yPos = height * v - height / 2 + yOffset // Add yOffset to move along the y axis

      for (let x = 0; x <= radialSegments; x++) {
        const u = x / radialSegments
        const theta = u * Math.PI * 2
        const xPos = radiusBottom * Math.cos(theta) + xOffset // Add xOffset to move along the x axis
        const zPos = radiusBottom * Math.sin(theta) + zOffset // Add zOffset to move along the x axis

        vertices.push([xPos, yPos, zPos])
      }
    }

    for (let y = 0; y < heightSegments; y++) {
      for (let x = 0; x < radialSegments; x++) {
        const i = y * (radialSegments + 1) + x
        facesByIndex.push([i, i + radialSegments + 1, i + radialSegments + 2])
        facesByIndex.push([i, i + radialSegments + 2, i + 1])
      }
    }
    super(gl, vertices, facesByIndex, color)
    this.x = xOffset
    this.y = yOffset
    this.z = zOffset
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
export default Cylinder
