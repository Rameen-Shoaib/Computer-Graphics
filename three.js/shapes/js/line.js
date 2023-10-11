var scene = new THREE.Scene();
scene.background = new THREE.Color( '#ffffff');
var camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight,0.5, 1000);
camera.position.z = 8;

var renderer = new THREE.WebGLRenderer({});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// P1 
let x1= 2;
let y1= 1;
let z1= 0;

// P2 
let x2= 10;
let y2= 9;
let z2= 0;

const points = [];
let noOfPoints = 10;
let increment = 1/noOfPoints;

for (let t = 0 ; t <= 1 ; t += increment)
{
    x = x1 + (x2-x1)*t;
    y = y1 + (y2-y1)*t;
    z = z1 + (z2-z1)*t;
    points.push( new THREE.Vector3(x, y, z) );
}

for (let i= 0; i < noOfPoints  ; i++)
{
    let pp = [];
    pp.push(points[i]);
    pp.push(points[i+1]);

    var material = new THREE.LineBasicMaterial( { color: '#000000'} );
    var geometry = new THREE.Geometry().setFromPoints( pp );
    var line = new THREE.Line( geometry, material );

    scene.add(line);
}

renderer.render(scene, camera);
