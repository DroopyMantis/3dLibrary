import { useEffect, useRef } from 'react'
import Matrix from './Matrix'
import Universe from './Universe'
import Gem from './objects/Gem'
import Sphere from './objects/Sphere'
import Cylinder from './objects/Cylinder'
import { objectGroup } from './objects/object3d'
import yPlane from './objects/yPlane'
import zPlane from './objects/zPlane'
import xPlane from './objects/xPlane'

const PitchedScene = props => {
  const canvasRef = useRef()
  //create object group for scene
  const group = new objectGroup()
  let c = 0.02
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
    let currentRotation = 0.0
    //create perspective matrix
    const p = matrix.perspective(8, 8, 3, 3, 50, 200)

    //set parent transformation
    group.scale = true
    group.scaleVector = [0.75, 0.75, 0.75]

    const outerSphere = new Sphere(gl, 75, 50, 50, 0, 0.25, 0, { r: 1.0, g: 0.0, b: 0.0 })
    outerSphere.smooth = true
    outerSphere.wireframe = false

    const center = new Sphere(gl, 0.8, 50, 50, 0, 0, 0, { r: 255.0, g: 255.0, b: 255.0 })
    center.smooth = false
    center.wireframe = false
    center.scale = true

    const gate = new Sphere(gl, 0.9, 50, 50, 0, 0, 0, { r: 1.0, g: 0.0, b: 0.0 })
    gate.rotateY = true
    gate.wireframe = true

    const pillarN = new Cylinder(gl, 0.5, 0.5, 3.35, 32, 1, 0, 1.04, 10, { r: 0.5, g: 0.5, b: 0.5 })
    pillarN.smooth = false
    pillarN.wireframe = false

    const gemN = new Gem(gl, 0.2, 0, 3.5, 10, { r: 0.0, g: 1.0, b: 1.0 })
    gemN.smooth = false
    gemN.wireframe = false

    const gemNWF = new Gem(gl, 0.2, 0, 3.5, 10, { r: 0.0, g: 0.0, b: 1.0 })
    gemNWF.smooth = false
    gemNWF.wireframe = true
    gemNWF.rotateY = true
    gemNWF.rotationPoint = [0, 3.5, 10]

    const pillarS = new Cylinder(gl, 0.5, 0.5, 4, 32, 1, 0, 0.75, -10, { r: 0.5, g: 0.1, b: 0.5 })
    pillarS.smooth = false
    pillarS.wireframe = false

    const gemS = new Gem(gl, 0.2, 0, 3.5, -10, { r: 0.0, g: 1.0, b: 1.0 })
    gemS.smooth = false
    gemS.wireframe = false

    const gemSWF = new Gem(gl, 0.2, 0, 3.5, -10, { r: 0.0, g: 0.0, b: 1.0 })
    gemSWF.smooth = false
    gemSWF.wireframe = true
    gemSWF.rotateY = true
    gemSWF.rotationPoint = [0, 3.5, -10]

    const pillarE = new Cylinder(gl, 0.5, 0.5, 4, 32, 1, -10, 0.75, 0, { r: 0.5, g: 1.0, b: 1.0 })
    pillarE.smooth = false
    pillarE.wireframe = false

    const gemE = new Gem(gl, 0.2, -10, 3.5, 0, { r: 0.0, g: 1.0, b: 1.0 })
    gemE.smooth = false
    gemE.wireframe = false

    const gemEWF = new Gem(gl, 0.2, -10, 3.5, 0, { r: 0.0, g: 0.0, b: 1.0 })
    gemEWF.smooth = false
    gemEWF.wireframe = true
    gemEWF.rotateY = true
    gemEWF.rotationPoint = [-10, 3.5, 0]

    const pillarW = new Cylinder(gl, 0.5, 0.5, 4, 32, 1, 10, 0.75, 0, { r: 1.5, g: 0.5, b: 0.5 })
    pillarW.smooth = false
    pillarW.wireframe = false

    const gemW = new Gem(gl, 0.2, 10, 3.5, 0, { r: 0.0, g: 1.0, b: 1.0 })
    gemW.smooth = false
    gemW.wireframe = false

    const gemWWF = new Gem(gl, 0.2, 10, 3.5, 0, { r: 0.0, g: 0.0, b: 1.0 })
    gemWWF.smooth = false
    gemWWF.wireframe = true
    gemWWF.rotateY = true
    gemWWF.rotationPoint = [10, 3.5, 0]

    const pillarNE = new Cylinder(gl, 0.5, 0.5, 4, 32, 1, Math.cos(45) * 10, 0.75, Math.cos(45) * 10, {
      r: 0.5,
      g: 0.5,
      b: 0.1
    })
    pillarNE.smooth = false
    pillarNE.wireframe = false

    const gemNE = new Gem(gl, 0.2, Math.cos(45) * 10, 3.5, Math.cos(45) * 10, { r: 0.0, g: 1.0, b: 1.0 })
    gemNE.smooth = false
    gemNE.wireframe = false

    const gemNEWF = new Gem(gl, 0.2, Math.cos(45) * 10, 3.5, Math.cos(45) * 10, { r: 0.0, g: 0.0, b: 1.0 })
    gemNEWF.smooth = false
    gemNEWF.wireframe = true
    gemNEWF.rotateY = true
    gemNEWF.rotationPoint = [Math.cos(45) * 10, 3.5, Math.cos(45) * 10]

    const pillarNW = new Cylinder(gl, 0.5, 0.5, 4, 32, 1, -Math.cos(45) * 10, 0.75, Math.cos(45) * 10, {
      r: 1.5,
      g: 1.5,
      b: 0.7
    })
    pillarNW.smooth = false
    pillarNW.wireframe = false

    const gemNW = new Gem(gl, 0.2, -Math.cos(45) * 10, 3.5, Math.cos(45) * 10, { r: 0.0, g: 1.0, b: 1.0 })
    gemNW.smooth = false
    gemNW.wireframe = false

    const gemNWWF = new Gem(gl, 0.2, -Math.cos(45) * 10, 3.5, Math.cos(45) * 10, { r: 0.0, g: 0.0, b: 1.0 })
    gemNWWF.smooth = false
    gemNWWF.wireframe = true
    gemNWWF.rotateY = true
    gemNWWF.rotationPoint = [-Math.cos(45) * 10, 3.5, Math.cos(45) * 10]

    const pillarSE = new Cylinder(gl, 0.5, 0.5, 4, 32, 1, Math.cos(45) * 10, 0.75, -Math.cos(45) * 10, {
      r: 0.5,
      g: 0.7,
      b: 0.7
    })
    pillarSE.smooth = false
    pillarSE.wireframe = false

    const gemSE = new Gem(gl, 0.2, Math.cos(45) * 10, 3.5, -Math.cos(45) * 10, { r: 0.0, g: 1.0, b: 1.0 })
    gemSE.smooth = false
    gemSE.wireframe = false

    const gemSEWF = new Gem(gl, 0.2, Math.cos(45) * 10, 3.5, -Math.cos(45) * 10, { r: 0.0, g: 0.0, b: 1.0 })
    gemSEWF.smooth = false
    gemSEWF.wireframe = true
    gemSEWF.rotateY = true
    gemSEWF.rotationPoint = [Math.cos(45) * 10, 3.5, -Math.cos(45) * 10]

    const pillarSW = new Cylinder(gl, 0.5, 0.5, 4, 32, 1, -Math.cos(45) * 10, 0.75, -Math.cos(45) * 10)
    pillarSW.smooth = false
    pillarSW.wireframe = false

    const gemSW = new Gem(gl, 0.2, -Math.cos(45) * 10, 3.5, -Math.cos(45) * 10, { r: 0.0, g: 1.0, b: 1.0 })
    gemSW.smooth = false
    gemSW.wireframe = false

    const gemSWWF = new Gem(gl, 0.2, -Math.cos(45) * 10, 3.5, -Math.cos(45) * 10, { r: 0.0, g: 0.0, b: 1.0 })
    gemSWWF.smooth = false
    gemSWWF.wireframe = true
    gemSWWF.rotateY = true
    gemSWWF.rotationPoint = [-Math.cos(45) * 10, 3.5, -Math.cos(45) * 10]

    const floor = new yPlane(
      gl,
      25,
      [0, 0, 0],
      [
        [0.1, 1.0, 0.1],
        [0.0, 0.0, 0.0],
        [0.1, 1.0, 0.1],
        [0.1, 1.0, 0.1]
      ]
    )

    floor.wireframe = false

    const wallS = new zPlane(
      gl,
      25,
      [0, 0, -25],
      [
        [0.0, 1.0, 1.0],
        [0.0, 1.0, 1.0],
        [0.0, 0.0, 0.0],
        [0.0, 1.0, 1.0]
      ]
    )
    wallS.wireframe = false

    const wallW = new xPlane(
      gl,
      25,
      [-25, 0, 0],
      [
        [0.0, 0.0, 0.0],
        [1.0, 0.0, 1.0],
        [1.0, 0.0, 1.0],
        [1.0, 0.0, 1.0]
      ]
    )
    wallW.wireframe = false

    const wallE = new xPlane(gl, 25, [25, 0, 0])
    wallE.color = { r: 1.0, g: 0.0, b: 1.0 }
    wallE.wireframe = false

    const wallN = new zPlane(gl, 25, [0, 0, 25])
    wallN.color = { r: 0.0, g: 1.0, b: 1.0 }
    wallN.wireframe = false

    const ceiling = new yPlane(
      gl,
      25,
      [0, 25, 0],
      [
        [0.1, 1.0, 0.1],
        [0.0, 0.0, 0.0],
        [0.1, 1.0, 0.1],
        [0.0, 0.0, 0.0]
      ]
    )
    ceiling.wireframe = false

    //add all shapes to group

    group.add(floor)
    group.add(ceiling)
    group.add(wallW)
    group.add(wallS)
    group.add(wallE)
    group.add(wallN)

    group.add(pillarN)
    group.add(gemNWF)
    group.add(gemN)
    group.add(pillarS)
    group.add(gemSWF)
    group.add(gemS)
    group.add(pillarE)
    group.add(gemEWF)
    group.add(gemE)
    group.add(pillarW)
    group.add(gemWWF)
    group.add(gemW)
    group.add(pillarNE)
    group.add(gemNEWF)
    group.add(gemNE)
    group.add(pillarNW)
    group.add(gemNWWF)
    group.add(gemNW)
    group.add(pillarSE)
    group.add(gemSEWF)
    group.add(gemSE)
    group.add(pillarSW)
    group.add(gemSWWF)
    group.add(gemSW)

    group.add(center)
    group.add(gate)
    group.add(outerSphere)

    // ...and finally, do the initial display.
    /*
     * Animates the scene.
     */
    let animationActive = false
    let previousTimestamp = null

    const FRAMES_PER_SECOND = 60
    const MILLISECONDS_PER_FRAME = 1000 / FRAMES_PER_SECOND

    const DEGREES_PER_MILLISECOND = 0.003
    const FULL_CIRCLE = 360.0

    const location = [30, 20, 50] // where the camera is
    const direction = [0, 1, 0] // where the camera is looking
    const up = [0, 1, 0] //  how sober the camera is

    const camera = matrix.cameraMatrix(location, direction, up)
    const ambientLightStrength = 0.3
    const lightDirection = [0, 30, 50]

    canvas.addEventListener('click', handleCanvasClick)

    const advanceScene = timestamp => {
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

      center.scaleVector = [Math.sin(currentRotation / 3), Math.sin(currentRotation / 3), Math.sin(currentRotation / 3)]

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
  }, [canvasRef])
  const handleCanvasClick = event => {
    group.scaleVector[0] -= c
    group.scaleVector[1] -= c
    group.scaleVector[2] -= c
    if (group.scaleVector[0] - 0.001 <= 0 && group.scaleVector[1] - 0.001 < -0 && group.scaleVector[2] - 0.001 <= 0) {
      group.scaleVector[0] = 0.75
      group.scaleVector[1] = 0.75
      group.scaleVector[2] = 0.75
    }
  }

  return (
    <article>
      {/* Canvas is not square! */}
      <canvas width="1024" height="512" ref={canvasRef} onClick={handleCanvasClick}>
        Hello World!
      </canvas>
    </article>
  )
}

export default PitchedScene
