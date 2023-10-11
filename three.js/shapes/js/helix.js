var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight,0.5, 1000);

camera.position.z = 20;

var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// helix
let points = [];
var x;
var y;
for (let i = 0; i <= 300 ; i+=1) 
{
    let t = 2*(Math.PI/40) * i;
    x = Math.cos(t);
    y = Math.sin(t);
    z = 0.2*t;
    points.push( new THREE.Vector3(x, y, z) );
}

var material = new THREE.LineBasicMaterial( { color: 'blue' } );
var geometry = new THREE.Geometry().setFromPoints( points );
var helix = new THREE.Line( geometry, material );
scene.add(helix);


function render()
{       
    requestAnimationFrame(render);
    helix.rotation.y += 0.01;
    renderer.render(scene, camera);
}

render();