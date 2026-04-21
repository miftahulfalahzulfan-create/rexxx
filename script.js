const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

const frameCount=60;
const images=[];
let frame=0;

for(let i=0;i<frameCount;i++){
 let img=new Image();
 img.src=`frames/frame_${i}.png`;
 images.push(img);
}

images[0].onload=()=>render();

function render(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 ctx.drawImage(images[frame],0,0,canvas.width,canvas.height);
}

window.addEventListener("scroll",()=>{
 const scrollTop=window.scrollY;
 const maxScroll=document.body.scrollHeight-window.innerHeight;
 const fraction=scrollTop/maxScroll;
 frame=Math.min(frameCount-1,Math.floor(fraction*frameCount));
 requestAnimationFrame(render);
});
