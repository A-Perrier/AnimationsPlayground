import { getRandomInt, removePx, isInRange } from './functions.js';
 
export default class FireflyCanvas {
  wrapper
  cursorRange
  poppingSpeed
  mousePos = {}
  firefliesInterval

  constructor (wrapper, cursorRange, poppingSpeed) 
  {
    this.wrapper = wrapper
    this.cursorRange = cursorRange
    this.poppingSpeed = poppingSpeed
  }

  init () 
  {
    this.#observeMousePosition()
    this.#invoke()
    this.#bounce()
  }

  #observeMousePosition () 
  {
    this.wrapper.addEventListener('mousemove', (e) => {
      this.mousePos = {... this.mousePos, x: e.pageX, y: e.pageY}
    })
    this.wrapper.addEventListener('mouseleave', (e) => {
      this.mousePos = {x: -1, y: -1}
    })
  }

  // On pourra sûrement créer un objet Firefly
  #startFireflies () {
    if (this.mousePos.x > 0 && this.mousePos.y > 0) {
      const size = getRandomInt(2,3) + 'px'
      const firefly = document.createElement('div')
      firefly.classList.add('firefly')
      firefly.style.backgroundColor = '#14CE3D'
      firefly.style.top = getRandomInt(this.mousePos.y - this.cursorRange, this.mousePos.y + this.cursorRange) + 'px' 
      firefly.style.left = getRandomInt(this.mousePos.x - this.cursorRange, this.mousePos.x + this.cursorRange) + 'px'
      firefly.style.width = size
      firefly.style.height = size
      firefly.style.opacity = getRandomInt(2, 6) / 10
      firefly.addEventListener('animationend', (e) => {
        firefly.remove()
      })
      this.wrapper.appendChild(firefly)
    }
  }


  #invoke () 
  {
    this.firefliesInterval = setInterval(() => {
      this.#startFireflies()
    }, this.poppingSpeed)
  }


  #bounce () 
  {
    this.wrapper.addEventListener('click', (e) => {
      clearInterval(this.firefliesInterval)
      let closeFireflies = []
      document.querySelectorAll('.firefly').forEach(item => {
        const top = removePx(item.style.top)
        const left = removePx(item.style.left)
        
        if (isInRange(top, this.mousePos.y - (this.cursorRange*2), this.mousePos.y + (this.cursorRange*2)) &&
            isInRange(left, this.mousePos.x - (this.cursorRange*2), this.mousePos.x + (this.cursorRange*2))) {
              closeFireflies.push(item)
            }
      })
      
      closeFireflies.forEach(item => {
        item.classList.add('bounced')
      })
    
      setTimeout(() => {
        this.firefliesInterval = setInterval(() => {
          this.#startFireflies()
        }, this.poppingSpeed)
      }, 800)
    })
  }
}