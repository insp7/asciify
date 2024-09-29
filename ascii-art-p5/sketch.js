let img;
let scaleFactor = 0.30;
let oneCharWidth = 10;
let oneCharHeight = 18;

let chars = "Ñ@#W$9876543210?!abc;:+=-,._ ";
let charArray = chars.split('');
let charLength = charArray.length;
let interval = charLength / 256;
let changeRate = 0.9;  // Speed at which the characters change

function preload() {
  img = loadImage('..\\images\\spiderman.jpg');  // Load the image
}

function setup() {
  let canvasWidth = int(scaleFactor * img.width);
  let canvasHeight = int(scaleFactor * img.height * (oneCharWidth / oneCharHeight));
  
  createCanvas(oneCharWidth * canvasWidth, oneCharHeight * canvasHeight);
  img.resize(canvasWidth, canvasHeight);
  img.loadPixels();
  background(0);
  textSize(18);
  textFont('monospace');
}

function draw() {
  background(0);  // Clear the screen on each frame
  
  for (let i = 0; i < img.height; i++) {
    for (let j = 0; j < img.width; j++) {
      let index = (i * img.width + j) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      
      // Convert to grayscale to choose ASCII char
      let brightness = int((r + g + b) / 3);
      
      // Dynamically change the char over time
      let dynamicCharIndex = floor((brightness + frameCount * changeRate + j) % charArray.length);
      let char = charArray[dynamicCharIndex];
      
      // Draw the changing characters with the pixel's color
      fill(r, g, b);
      let x = j * oneCharWidth;
      let y = i * oneCharHeight;
      
      text(char, x, y);
    }
  }
}
