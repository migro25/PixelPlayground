const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

// clear
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function clearScreen(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getPixel(x, y) {
  const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
  // match against the only colors drawPixel can produce, default to white
  if (r === 255 && g === 0 && b === 0) return "red";
  if (r === 0 && g === 128 && b === 0) return "green";
  if (r === 0 && g === 0 && b === 255) return "blue";
  return "black";
}

function checkPixel(x, y, expected, label) {
  let actual = getPixel(x, y)
  if (actual !== expected) console.error(`FAIL: ${label} -> expected "${expected}", got "${actual}"`);
}

function drawPixel(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
}


function drawHorizontalLine(x, y, color, length) {
  for(let i= 0; i < length; i = i+1) {
    drawPixel(x+i, y, color);
  }
}

function drawVerticalLine (x, y, color, length) {
    for (let i = 0; i < length; i = i +1) {
        drawPixel(x, y + i, color);
    }
  }

function drawRectangle(x, y, width, height) {
    drawHorizontalLine(x, y, width);
    drawHorizontalLine(x, y + height - 1, width);
 
    drawVerticalLine(x, y, height);
    drawVerticalLine(x + width - 1, y, height);
}

function drawVariableLengthHorizontalLine(x, y, color, length) {
  for(let i = 0; i < length; i = i+1) {
    drawPixel(x + i, y, color);
  }
}
 
function drawVariableLengthVerticalLine(x, y, color, length) {
  for(let i = 0; i < length; i++) {
    drawPixel(x, y + i, color);
  }
}
 
function drawDiagonalLine(x, y, color, length) {
  for(let i = 0; i < length; i++) {
    drawPixel(x + i, y + i, color);
  }
}

function drawRectangle(x, y, color, width, height) {

  for(let h = 0; h < height; h++) {
    drawVariableLengthHorizontalLine(x, y + h, color, width);
  }

}

function writeuselessnumbers(length) {
  for (let i = 0; i<length; i++) {
    console.log(i);
  }
}

writeuselessnumbers(10);



clearScreen("black");

// test code 
drawPixel(0,0,"red")
drawPixel(50,50,"green")
drawPixel(99,99,"blue")

checkPixel(0,0, "red", "checkPixel(0,0)")
checkPixel(1,1, "black", "checkPixel(1,1)")

// reset
clearScreen("black");

