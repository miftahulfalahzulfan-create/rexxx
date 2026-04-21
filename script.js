AOS.init();
const text="3D Developer | Sultan Level";let i=0;
function typing(){if(i<text.length){document.getElementById("typing").innerHTML+=text[i];i++;setTimeout(typing,40);}}
typing();

tsParticles.load("particles",{particles:{number:{value:40},color:{value:"#38bdf8"},links:{enable:true},move:{enable:true}}});

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.domElement.style.position="fixed";
renderer.domElement.style.zIndex=-3;

const geo=new THREE.TorusKnotGeometry(10,3,100,16);
const mat=new THREE.MeshBasicMaterial({color:0x38bdf8,wireframe:true});
const mesh=new THREE.Mesh(geo,mat);
scene.add(mesh);
camera.position.z=30;

function animate(){requestAnimationFrame(animate);mesh.rotation.x+=0.01;mesh.rotation.y+=0.01;renderer.render(scene,camera);}
animate();

document.querySelectorAll(".card").forEach(card=>{
card.addEventListener("mousemove",(e)=>{let x=e.offsetX;let y=e.offsetY;card.style.transform=`rotateX(${-(y/10)}deg) rotateY(${x/10}deg)`;});
card.addEventListener("mouseleave",()=>card.style.transform="rotateX(0) rotateY(0)");
});
