
<script>
        
let textcolor = document.querySelector('#text-color');
let backgroundColor = document.querySelector('#canvas-background-color');
let fontSize = document.querySelector('#font-size');

const clearButton = document.querySelector('#clear-button');
const saveButton = document.querySelector('#save-button');
const retrieveButton = document.querySelector('#retrieve-button');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

textcolor.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
    if(isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        lastX = event.offsetX;
        lastY = event.offsetY;
    }
});

canvas.addEventListener('mouseup', (event) => {
    isDrawing = false;
})

backgroundColor.addEventListener('change', (event) => {
    console.log(event.target.value);
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0,0,800,500);
})

fontSize.addEventListener('input', (event) => {
    ctx.lineWidth = event.target.value;
})

clearButton.addEventListener('click', () => {
    console.log("clicked");
    ctx.clearRect(0,0,canvas.width, canvas.height);
});

saveButton.addEventListener('click', () => {
    localStorage.setItem('canvasContents',canvas.toDataURL());

    const link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});

retrieveButton.addEventListener('click', () => {
    const savedContent = localStorage.getItem('canvasContents');
    console.log(savedContent);
    if(savedContent) {
        const image = new Image();
        image.src = savedContent;
        ctx.drawImage(image,0,0);
    }
})
</script>