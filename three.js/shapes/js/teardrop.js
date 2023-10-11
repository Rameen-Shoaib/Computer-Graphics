const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const scene = new THREE.Scene();

// Half a sphere
const phiStart = 0;
const phiEnd = Math.PI*2;
const thetaStart = 360;
const thetaEnd = Math.PI/2;
const geometry = new THREE.SphereGeometry( 1.1, 32, 16, phiStart, phiEnd, thetaStart, thetaEnd );
const material = new THREE.MeshBasicMaterial( { color: 0x9900ff} ); //, wireframe: true 
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

// cone
const radius = 1.06;
const height = 2;
const segments = 16;
const geometry1 = new THREE.ConeGeometry(radius, height, segments);
const material1 = new THREE.MeshBasicMaterial( { color: 0x9900ff} ); //, wireframe: true 
const cone = new THREE.Mesh( geometry1, material1 );
scene.add( cone );

// sphere -> bottom
sphere.position.y = -0.69;
// cone -> up
cone.position.y = 1;

// Add  the sphere object to the cone (parent-child relationship)
cone.add(sphere);
// Add the cone (and its child) to the scene
scene.add(cone);

function animate() 
{
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();