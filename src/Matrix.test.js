import Matrix from './Matrix'

describe('Matrix implementation', () => {
  describe('creation and data access', () => {
    it('should instantiate and access matrix properly', () => {
      const m = new Matrix()
      expect(m.getElements()).toStrictEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    })
    it('should access elements of Matrix properly', () => {
      const m = new Matrix(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)
      expect(m.elements[8]).toBe(8)
    })
    it('should throw an exception when inputs are not sufficient for a 4x4 matrix', () => {
      expect(() => {
        const m = new Matrix(0, 1, 2, 3, 4)
        checkMatrices(m.elements)
      }).toThrow()
    })
  })

  describe('multiplication', () => {
    it('should perform multiplication correctly', () => {
      const m1 = new Matrix(1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4)
      const m2 = new Matrix(1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4)
      const m3 = m1.multiply(m2)
      expect(m3.getElements()).toStrictEqual([30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30])
    })
  })
  describe('transfomation matrices', () => {
    it('should create a translation matrix given parameters', () => {
      const m = new Matrix()
      const trans = m.translate(2, 4, 6)
      expect(trans.getElements()).toStrictEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 4, 6, 1])
    })
    it('should create a rotation matrix about the Y axis', () => {
      const m = new Matrix()
      const rotY = m.rotateYaxis(1)
      expect(rotY.getElements()).toStrictEqual([
        0.5403023058681398, 0, -0.8414709848078965, 0, 0, 1, 0, 0, 0.8414709848078965, 0, 0.5403023058681398, 0, 0, 0,
        0, 1
      ])
    })
    it('should create a rotation matrix about the Y axis without theta parameter, creating the identity matrix, not moving the object', () => {
      const m = new Matrix()
      const rotY = m.rotateYaxis()
      expect(rotY.getElements()).toStrictEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    })
    it('should create a rotation matrix about the Y axis at different point', () => {
      const m = new Matrix()
      const rotY = m.rotateYaxis(1, 1, 1)
      expect(rotY.getElements()).toStrictEqual([
        0.5403023058681398, 0, -0.8414709848078965, 0, 0, 1, 0, 0, 0.8414709848078965, 0, 0.5403023058681398, 0,
        -0.38177329067603627, 0, 1.3011686789397567, 1
      ])
    })
    it('should create a rotation matrix about the X axis given theta parameter', () => {
      const m = new Matrix()
      const rotX = m.rotateXaxis(1)
      expect(rotX.getElements()).toStrictEqual([
        1, 0, 0, 0, 0, 0.5403023058681398, 0.8414709848078965, 0, 0, -0.8414709848078965, 0.5403023058681398, 0, 0, 0,
        0, 1
      ])
    })
    it('should create a rotation matrix about the X axis without theta parameter, creating the identity matrix, not moving the object', () => {
      const m = new Matrix()
      const rotX = m.rotateXaxis()
      expect(rotX.getElements()).toStrictEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    })
    it('should create a rotation matrix about the X axis at a different point', () => {
      const m = new Matrix()
      const rotX = m.rotateXaxis(1, 1, 1)
      expect(rotX.getElements()).toStrictEqual([
        1, 0, 0, 0, 0, 0.5403023058681398, 0.8414709848078965, 0, 0, -0.8414709848078965, 0.5403023058681398, 0, 0,
        1.3011686789397567, -0.38177329067603627, 1
      ])
    })
    it('should create a rotation matrix about the Z axis', () => {
      const m = new Matrix()
      const rotZ = m.rotateZaxis(1)
      expect(rotZ.getElements()).toStrictEqual([
        0.5403023058681398, 0.8414709848078965, 0, 0, -0.8414709848078965, 0.5403023058681398, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 1
      ])
    })
    it('should create a rotation matrix about the Z axis without theta parameter, creating the identity matrix, not moving the object', () => {
      const m = new Matrix()
      const rotZ = m.rotateZaxis()
      expect(rotZ.getElements()).toStrictEqual([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    })
    it('should create a rotation matrix about the Z axis at a different point', () => {
      const m = new Matrix()
      const rotZ = m.rotateZaxis(1, 1, 1)
      expect(rotZ.getElements()).toStrictEqual([
        0.5403023058681398, 0.8414709848078965, 0, 0, -0.8414709848078965, 0.5403023058681398, 0, 0, 0, 0, 1, 0,
        1.3011686789397567, -0.38177329067603627, 0, 1
      ])
    })
    it('should create a scale transformation matrices that changes according to parameters given', () => {
      const m = new Matrix()
      const scale = m.scale(1.2, 1.4, 1.5)
      expect(scale.getElements()).toStrictEqual([1.2, 0, 0, 0, 0, 1.4, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 1])
    })
  })
  describe('projection matrices', () => {
    it('should create an orthographic matrix properly given parameters', () => {
      const m = new Matrix()
      const o = m.ortho(2, 2, 4, 4, -1, 1)
      expect(o.getElements()).toStrictEqual([0.5, 0, 0, 0, 0, 0.25, 0, 0, 0, 0, -1, 0, -0, -0, -0, 1])
    })
    it('should create a perspective matrix', () => {
      const m = new Matrix()
      const persp = m.perspective(5, 5, 3, 3, 100, 10000)
      expect(persp.getElements()).toStrictEqual([
        20,
        0,
        0,
        0,
        0,
        200.0 / 6.0,
        0,
        0,
        0,
        0,
        -10100.0 / 9900.0,
        -1,
        0,
        0,
        -2000000.0 / 9900.0,
        0
      ])
    })
  })
})
