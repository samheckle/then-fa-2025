let cracks = [];
let backgroundImg;
let crackImg;

function preload() {
  crackImg = loadImage("crack.png");
}

async function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  backgroundImg = createImage(window.innerWidth, window.innerHeight);

  console.log(backgroundImg.width);
  backgroundImg.loadPixels();

  for (let i = 0; i < backgroundImg.pixels.length; i += 4) {
    backgroundImg.pixels[i] = 255;
    backgroundImg.pixels[i + 1] = 255;
    backgroundImg.pixels[i + 2] = 255;
    backgroundImg.pixels[i + 3] = 255;
  }
  backgroundImg.updatePixels();

  let plainText;

  await fetch(
    "https://samheckle.github.io/code-toolkit-fa-25/week_11/sketch.js"
  ).then(async (response) => {
    let blob = await response.blob();
    plainText = await blob.text();

    let div = createElement('div')
    div.class('container')
    let textArea = createElement("textarea");
    textArea.html(plainText);
    div.child(textArea)
    // let p = createP()
    // p.html(plainText)
  });
}

function draw() {
  // background(220, 0);
  imageMode(CORNER);
  image(backgroundImg, 0, 0);

  for (let crack of cracks) {
    imageMode(CENTER);
    image(crackImg, crack.x, crack.y);
    if (crack.clicks > 2) {
      push();
      translate(crack.x, crack.y);
      scale(-1, 1);
      image(crackImg, 0, 0);
      pop();
    }
    
  }
}

function mouseReleased() {
  if (cracks.length == 0) {
    cracks.push({ x: mouseX, y: mouseY, clicks: 1 });
  }
  for (let i = 0; i < cracks.length; i++) {
    let c = cracks[i];
    if (abs(c.x - mouseX) <= 20 || abs(c.y - mouseY) <= 20) {
      c.clicks++;
      if (c.clicks > 3) {
        for (let x = 0; x < backgroundImg.width; x++) {
          for (let y = 0; y < backgroundImg.height; y++) {
            if (
              x > c.x - crackImg.width / 2 &&
              x < c.x + crackImg.width / 2 &&
              y > c.y - crackImg.height / 2 &&
              y < c.y + crackImg.height / 2
            ) {
              let index = (y * backgroundImg.width + x) * 4;

              backgroundImg.pixels[index + 1] = 0;
              backgroundImg.pixels[index + 3] = 0;
            }
          }
        }
        backgroundImg.updatePixels();
        clear()
      }
    } else if (i == cracks.length - 1) {
      cracks.push({ x: mouseX, y: mouseY, clicks: 1 });
    }
  }
}
