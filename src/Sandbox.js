import { useEffect, useRef } from 'react'
import Matrix from './Matrix'
import Universe from './Universe'
import Sphere from './objects/Sphere'
import yPlane from './objects/yPlane'
import { objectGroup } from './objects/object3d'
import zPlane from './objects/zPlane'
import xPlane from './objects/xPlane'

const Sandbox = props => {
  const canvasRef = useRef()
  const group = new objectGroup()
  let c = 0.05
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    // WebGL rendering context.
    const universe = new Universe(canvas)
    const gl = universe.gl

    // Build objects and translation vectors/matrices
    const matrix = new Matrix()

    //create orthographic matrix (unused)
    //const o = matrix.ortho(2, 2, 1, 1, -10, 100)
    //create perspective matrix
    const p = matrix.perspective(5, 5, 3, 3, 100, 10000)

    //set parent transformation
    group.scale = true
    group.rotateY = false
    group.rotationPoint = [0, 0, 0]
    group.translationVector = [0, 0, 0]

    const sphere = new Sphere(gl, 1, 50, 50, 0, 0, 0, { r: 1.0, g: 0.0, b: 0.0 })
    sphere.smooth = false
    sphere.wireframe = false
    sphere.scale = true
    sphere.scaleVector = [1, 1, 1]

    const sphere2 = new Sphere(gl, 1, 50, 50, 0, 2.5, 0, { r: 0.0, g: 1.0, b: 0.0 })
    sphere2.smooth = true
    sphere2.wireframe = false
    sphere2.rotateY = true

    const floor = new yPlane(gl, 5, [0, -1, 0])
    floor.color = { r: 0.0, g: 0.0, b: 1.0 }
    floor.wireframe = false

    const wall = new zPlane(gl, 5, [0, -1, -5])
    wall.color = { r: 0.0, g: 1.0, b: 1.0 }
    wall.wireframe = false

    const wall1 = new xPlane(gl, 5, [-5, -1, 0])
    wall1.color = { r: 1.0, g: 0.0, b: 1.0 }
    wall1.wireframe = false

    const wall2 = new xPlane(gl, 5, [5, -1, 0])
    wall2.color = { r: 1.0, g: 0.0, b: 1.0 }
    wall2.wireframe = false

    //add all shapes to group

    group.add(sphere)
    group.add(sphere2)

    group.add(wall)
    group.add(wall1)
    group.add(wall2)

    group.add(floor)

    // ...and finally, do the initial display.
    /*
     * Animates the scene.
     */
    // let apocalypse = false
    let animationActive = false
    let previousTimestamp = null

    const FRAMES_PER_SECOND = 60
    const MILLISECONDS_PER_FRAME = 1000 / FRAMES_PER_SECOND

    let currentRotation = 0.0
    const DEGREES_PER_MILLISECOND = 0.003
    const FULL_CIRCLE = 360.0

    const location = [30, 30, 120] // where the camera is
    const direction = [0, 0, 0] // where the camera is looking
    const up = [0, 1, 0] //  how sober the camera is
    const camera = matrix.cameraMatrix(location, direction, up)

    const ambientLightStrength = 0.3
    const lightDirection = [30, 20, 0]

    canvas.addEventListener('click', handleCanvasClick)

    const advanceScene = timestamp => {
      // if (apocalypse) {
      //   return
      // }
      // Check if the user has turned things off.
      if (!animationActive) {
        return
      }

      // Initialize the timestamp.
      if (!previousTimestamp) {
        previousTimestamp = timestamp
        window.requestAnimationFrame(advanceScene)
        return
      }

      // Check if it's time to advance.
      const progress = timestamp - previousTimestamp
      if (progress < MILLISECONDS_PER_FRAME) {
        // Do nothing if it's too soon.
        window.requestAnimationFrame(advanceScene)
        return
      }

      // All clear.
      currentRotation += DEGREES_PER_MILLISECOND * progress

      sphere.scaleVector = [Math.sin(currentRotation / 8), Math.sin(currentRotation / 8), Math.sin(currentRotation / 8)]
      if (currentRotation >= FULL_CIRCLE) {
        currentRotation -= FULL_CIRCLE
      }

      universe.drawScene(group, p, camera.getElements(), currentRotation, ambientLightStrength, lightDirection)
      // Request the next frame.
      previousTimestamp = timestamp
      window.requestAnimationFrame(advanceScene)
    }

    animationActive = true
    window.requestAnimationFrame(advanceScene)

    // return () => {
    //   apocalypse = true
    // }
  }, [canvasRef])
  const handleCanvasClick = event => {
    group.scaleVector[0] -= c
    group.scaleVector[1] -= c
    group.scaleVector[2] -= c
    if (group.scaleVector[0] <= 0 && group.scaleVector[1] < -0 && group.scaleVector[2] <= 0) {
      group.scaleVector[0] = 1
      group.scaleVector[1] = 1
      group.scaleVector[2] = 1
    }

    console.log(group.scaleVector)
  }

  return (
    <article>
      {/* Canvas is not square! */}
      <canvas width="813" height="512" ref={canvasRef} onClick={handleCanvasClick}>
        Hello World!
      </canvas>
    </article>
  )
}

export default Sandbox
