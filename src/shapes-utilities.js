import Vector from './Vector'

const computeFaceNormals = protoGeometry =>
  protoGeometry.facesByIndex.map(face => {
    // Compute the triangle normal...
    const p0 = new Vector(...protoGeometry.vertices[face[0]])
    const p1 = new Vector(...protoGeometry.vertices[face[1]])
    const p2 = new Vector(...protoGeometry.vertices[face[2]])

    const v1 = p1.subtract(p0)
    const v2 = p2.subtract(p0)

    // Formula from book "Real-time 3D Graphics" "Normals" section.
    return v1.cross(v2)
  })

const computeVertexNormals = protoGeometry => {
  const result = []

  // For every triangle...
  protoGeometry.facesByIndex.forEach(face => {
    // For every vertex in that triangle...
    face.forEach(vertexIndex => {
      let totalVector = new Vector(0, 0, 0)

      // Grab every face the vertex is in.
      protoGeometry.facesByIndex.forEach((face, faceIndex) => {
        if (face.includes(vertexIndex)) {
          totalVector = totalVector.add(protoGeometry.faceNormals[faceIndex])
        }
      })

      result.push(...totalVector.unit.elements)
    })
  })

  return result
}

const computeTriangleNormals = protoGeometry => {
  const result = []

  // For every triangle...
  protoGeometry.facesByIndex.forEach((face, faceIndex) => {
    const N = protoGeometry.faceNormals[faceIndex]

    // Every vertex in the triangle gets the same normal.
    result.push(...N.elements)
    result.push(...N.elements)
    result.push(...N.elements)
  })

  return result
}

/**
 * Utility function for turning our nascent geometry object into a “raw” coordinate array
 * arranged as triangles.
 */
const toRawTriangleArray = protoGeometry => {
  const result = []

  protoGeometry.facesByIndex.forEach(face => {
    face.forEach(vertexIndex => {
      result.push(...protoGeometry.vertices[vertexIndex])
    })
  })

  return result
}

/*
 * Utility function for turning indexed vertices into a “raw” coordinate array
 * arranged as line segments.
 */
const toRawLineArray = protoGeometry => {
  const result = []

  protoGeometry.facesByIndex.forEach(face => {
    // Oddly enough, the inner loop here is clearer as a `for` loop because we
    // need to access the current vertex index and the one after that (wrapping
    // around once we get to the end).
    for (let i = 0, maxI = face.length; i < maxI; i += 1) {
      // “Connect the dots.”
      result.push(
        ...protoGeometry.vertices[face[i]],
        ...protoGeometry.vertices[face[(i + 1) % maxI]] // Lets us wrap around to 0.
      )
    }
  })

  return result
}

export { computeTriangleNormals, toRawLineArray, toRawTriangleArray, computeFaceNormals, computeVertexNormals }
