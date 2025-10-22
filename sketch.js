let rings = []
let poem
let currLine = 0
let add = true

function setup() {
  createCanvas(400, 400);
  for(let i = 1; i <= 10; i++){
    rings.push(new Ring(i))
  }
}

function draw() {
  background(220, 0);

  poem = document.getElementsByClassName('line')

  noFill()
  
  for(let i = rings.length-1; i >=0; i--){
    // fill(color(184, 136, 70, 70))
    // stroke(color(145, 78, 18, 70))
    // circle(rings[i].x, rings[i].y, rings[i].size)
    if(rings[i].hover()){

      fill('green')

      stroke('black')
      push()
      translate(width/2, height/2)
      // (x,y)=(originX + r * cosθ, originY + r * sinθ)
      // θ = acos((mouseX - originX) / r)
      let theta = acos( ( (mouseX-width/2) - 0) / rings[i].size/2)
      rotate(theta)
      point(mouseX-width/2, mouseY-height/2)
      pop()
    } else fill('white')
  }

  for(let p of poem){
    if(p.style.display == "block"){
      p.style.opacity = p.style.opacity - 0.001
    } else p.style.opacity = 1
  }

  let sss = document.getElementById('sss')
  if(sss.style.display == 'block' && add){
    let s = ['slipping', 'sliding', 'sourcing', 'searching']
    for(let i = 0; i < s.length; i++){
      let p = createP(s[i])
      p.position = random(width)
      p.style.diplsay = 'block'
      p.addClass('line')
    }
    add = false;
  }
}

function mousePressed(){
  poem[currLine].style.display = 'block'
  poem[currLine].style.opacity = 1
  poem[currLine].style.top = Math.random() * window.innerHeight - 30 + "px" 
  currLine++
  if( currLine >= poem.length){
    currLine = 0
  }
}

class Ring{
  constructor(num){
    this.x = width/2
    this.y = height/2
    this.id = num
    this.size = num * 40
  }

  hover(){
    let d = dist(mouseX, mouseY, this.x, this.y)
    if(d < this.size/2){
      return true;
    }
    return false
  }
}