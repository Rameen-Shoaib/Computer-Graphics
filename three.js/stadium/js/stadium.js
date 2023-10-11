const renderer = new THREE.WebGLRenderer({});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//camera.position.z = 5;
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();

// stadium
const geometry = new THREE.CircleGeometry( 75, 32 );  //3.5
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );   
const stadium = new THREE.Mesh( geometry, material );
scene.add( stadium );

// boundary
const innerRadius = 65;  //2.8
const outerRadius = 67;  //3.0
const segments = 32;
const geometry1 = new THREE.RingBufferGeometry(innerRadius, outerRadius, segments);
const material1 = new THREE.MeshBasicMaterial( { color: 0xffffff } );   
const boundary = new THREE.Mesh( geometry1, material1 );
scene.add( boundary );

// pitch
const width = 25;  //2.5
const height = 55;   //1
const widthSegments = 2;
const heightSegments = 2;
const geometry2 = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
const material2 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const pitch = new THREE.Mesh( geometry2, material2 );
scene.add( pitch );

// stumps1
const material3 = new THREE.LineBasicMaterial({color: 0xffffff});
const points = [];
points.push( new THREE.Vector3( -6, 26, 0 ) );  //1.1,0.2,0
points.push( new THREE.Vector3( 6, 26, 0 ) ); //1.1,-0.2,0
const geometry3 = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry3, material3 );
scene.add( line );

// stumps2
const material4 = new THREE.LineBasicMaterial({color: 0xffffff});
const points2 = [];
points2.push( new THREE.Vector3( 6, -26, 0 ) );  //-1.1,0.2,0
points2.push( new THREE.Vector3( -6, -26, 0 ) ); //-1.1,-0.2,0
const geometry4 = new THREE.BufferGeometry().setFromPoints( points2 );
const line2 = new THREE.Line( geometry4, material4 );
scene.add( line2 );

// ball
const geometry5 = new THREE.CircleGeometry( 1, 12 );   //0.05
const material5 = new THREE.MeshBasicMaterial( { color: 0xff0000 } );   
const ball = new THREE.Mesh( geometry5, material5 );
ball.position.x = 0;
scene.add( ball );

// batsman (sprite sheet)
var clock = new THREE.Clock();
var texture = new THREE.TextureLoader().load('sixer.png');
var annie = new TextureAnimator(texture, 2.4, 1.3, 2, 60); // texture, horizontal, vertical, total, duration
var geometry6 = new THREE.PlaneGeometry(12, 10, 1);   //0.8,0.6,1
var material6 = new THREE.MeshBasicMaterial({ map: texture, transparent: true, color: 0xffff00 }); //, color: 0xffff00
var cube = new THREE.Mesh(geometry6, material6);
cube.position.y = 21;  //0.7
scene.add( cube )

// animation
function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration)
{
  // texture passed by reference, will be updated by the update function

  this.tilesHorizontal = tilesHoriz;
  this.tilesVertical = tilesVert;

  // how many images does this spritesheet contain?
  // usually equals tilesHoriz * tilesVert, but not necessarily,
  // if there at blank tiles at the bottom of the spritesheet
  this.numberOfTiles = numTiles;

  // how the texture is wrapped horizontally = how the texture is wrapped vertically =how many times the texture is repeated across the surface in each direction
  // if repeat is set greater than 1 in either direction, the corresponding Wrap parameter should also be set to achieve the desired tiling effect 
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);

  // how long should each image be displayed?
  this.tileDisplayDuration = tileDispDuration;

  // how long has the current image been displayed?
  this.currentDisplayTime = 0;

  // which image is currently being displayed?
  this.currentTile = 0;

  this.update = function (milliSec)
  {
    this.currentDisplayTime += milliSec;

    while (this.currentDisplayTime > this.tileDisplayDuration)
    {
      this.currentDisplayTime -= this.tileDisplayDuration;
      this.currentTile++;

      if (this.currentTile == this.numberOfTiles)
      this.currentTile = 0;

      // how much a single repetition of the texture is offset from the beginning in each direction
      var currentColumn = this.currentTile % this.tilesHorizontal;
      texture.offset.x = currentColumn / this.tilesHorizontal;
      var currentRow = Math.floor(this.currentTile / this.tilesHorizontal);
      texture.offset.y = currentRow / this.tilesVertical;
    }
  };
}

// rain
// function to generate random number between two numbers
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const material7 = new THREE.LineBasicMaterial
({
  color: 'white',
  scale: 1,
  dashSize: 2,
  gapSize: 1,
});

function animate() 
{
	requestAnimationFrame( animate );

  const points3 = [];

  points3.push(new THREE.Vector3(0, 3, 0));
  points3.push(new THREE.Vector3(-0.5, 1, 0));
  
  const geometry7 = new THREE.BufferGeometry().setFromPoints(points3);
  const line3 = new THREE.LineSegments(geometry7, material7);

  var raindrop=[];

  for(let i=0; i<=10; i++)
  {
    raindrop.push(new THREE.Line(geometry7, material7));
        
    stadium.add(raindrop[i]);
        
    let posi= getRandomInt(-80,80);
    let posi1 = getRandomInt(-200,200);
        
    raindrop[i].position.set(posi1,posi,0);
  }

	var delta = clock.getDelta();
  annie.update(delta * 60);

	renderer.render( scene, camera );

  for(let i=0; i<=10; i++)
  {
    stadium.remove(raindrop[i])
  }
}

animate();
