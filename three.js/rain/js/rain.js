const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 200 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();

// function to generate random number between two numbers
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const material = new THREE.LineBasicMaterial
({
  color: 'white',
  scale: 1,
  dashSize: 2,
  gapSize: 1,
});

function animate() 
{
    requestAnimationFrame( animate );
    const points = [];

    points.push(new THREE.Vector3(0, 3, 0));
    points.push(new THREE.Vector3(-0.5, 1, 0));
  
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.LineSegments(geometry, material);

    var raindrop=[];

    for(let i=0; i<=10; i++)
    {
        raindrop.push(new THREE.Line(geometry, material));
        
        scene.add(raindrop[i]);
        
        let posi= getRandomInt(-80,80);
        let posi1 = getRandomInt(-200,200);
        
        raindrop[i].position.set(posi1,posi,0);
    }

    renderer.render(scene, camera);   

    for(let i=0; i<=10; i++)
    {
        scene.remove(raindrop[i])
    }
};

animate();
