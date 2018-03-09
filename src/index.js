import './styles.css';
import image from './mapping.png';



function loadImage(url) {
  const image = new Image();
  image.src = url;
  image.crossOrigin = 'anonymous';
  return new Promise((resolve) => {
    image.onload = () => {
      resolve(image);
    };
  });
}


function drawImage(canvas, image) {
  const mappingCtx = canvas.getContext('2d');
  mappingCtx.drawImage(image, 0, 0, image.width, image.height);
}


function drawMapping(canvas, color) {
  const { r, g, b, a } = color;
  const ctx = canvas.getContext('2d');
  console.log(`rgba(${r}, ${g}, ${b}, ${a})`);
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}


async function main() {
  const mappingCanvas = document.getElementById('mapping');
  const viewerCanvas = document.getElementById('viewer');
  const mappingImage = await loadImage(image);

  mappingCanvas.width = viewerCanvas.width = mappingImage.width;
  mappingCanvas.height = viewerCanvas.height = mappingImage.height;

  mappingCanvas.addEventListener('mousemove', (e) => {
    const ctx = mappingCanvas.getContext('2d');
    const { data: pixelColor } = ctx.getImageData(e.clientX, e.clientY, 1, 1);
    console.log(pixelColor);

    drawMapping(viewerCanvas, pixelColor);
  });

  drawImage(mappingCanvas, mappingImage);
}


main();