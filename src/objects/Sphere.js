import { object3d } from './object3d'

class Sphere extends object3d {
  constructor(gl, radius, latitudeSegments, longitudeSegments, xOffset, yOffset, zOffset, color) {
    const vertices = []
    const facesByIndex = []

    for (let lat = 0; lat <= latitudeSegments; lat++) {
      const theta = (lat * Math.PI) / latitudeSegments
      const sinTheta = Math.sin(theta)
      const cosTheta = Math.cos(theta)

      for (let lon = 0; lon <= longitudeSegments; lon++) {
        const phi = (lon * 2 * Math.PI) / longitudeSegments
        const sinPhi = Math.sin(phi)
        const cosPhi = Math.cos(phi)

        const x = cosPhi * sinTheta + xOffset // Add xOffset to move along the x axis
        const y = cosTheta + yOffset // Add yOffset to move along the y axis
        const z = sinPhi * sinTheta + zOffset //add zOffset to move along the z axis

        vertices.push([radius * x, radius * y, radius * z])
      }
    }

    for (let lat = 0; lat < latitudeSegments; lat++) {
      for (let lon = 0; lon < longitudeSegments; lon++) {
        const first = lat * (longitudeSegments + 1) + lon
        const second = first + longitudeSegments + 1
        facesByIndex.push([first, first + 1, second])
        facesByIndex.push([second, first + 1, second + 1])
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
export default Sphere
