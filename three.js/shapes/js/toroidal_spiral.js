var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight,0.5, 1000);

camera.position.z = 10;

var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// toroidal 
let points = [];
var x;
var y;
for (let i = 0; i <= 40 ; i += 0.1) 
{
    let t = 2*(Math.PI/40) * i;
    a = 1
    b=2
    c= 15
    x = (a*Math.sin(c*t)+b)*Math.cos(t)
    y =(a*Math.sin(c*t)+b)*Math.sin(t)
    z=a * Math.cos(c*t)
    points.push( new THREE.Vector3(x, y, z) );
}

var material = new THREE.LineBasicMaterial( { color: 'blue'} );
var geometry = new THREE.Geometry().setFromPoints( points );
var toroidal = new THREE.Line( geometry, material );

scene.add(toroidal);

function render()
{       
    requestAnimationFrame(render);
    toroidal.rotation.x += 0.01;
    renderer.render(scene, camera);
}

render();
