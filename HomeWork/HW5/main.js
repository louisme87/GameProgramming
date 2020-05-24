/////////////////////////////////////////////////////////
// global variables
var camera, renderer;
var agent;
var targetId = 0;

// program starts here ...
init();
animate();

function init() {

  initThree();
  
  //scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.z = 500;
  camera.position.y = 400;


  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x888888);

  let controls = new THREE.OrbitControls(camera, renderer.domElement);

  document.body.appendChild(renderer.domElement);

  /////////////////////////////////////////////////////////////////////

  
  // scene grid [-400,400]x[-400,400]
  var gridXZ = new THREE.GridHelper(800, 80, 'red', 'white');
  scene.add(gridXZ);

  // in scene.js
  setObstacles( );  // using LevelDesigner
  
  //////////////////////////////////////////////////////////////////////////	
  	let size = 10; // halfsize of agent
    agent = new Agent(new THREE.Vector3(50,0,-50), size);

}


function animate() {
  if(scene.targets.length == 0){
    while(true){
      targetTmp = new THREE.Vector3 (-300 + getRandomInt(600), 0, -300 + getRandomInt(600));
      checkCount = 0;
      for (i=0; i<scene.obstacles.length; i++) {
        if(scene.obstacles[i].center.distanceTo(targetTmp) > scene.obstacles[i].size+8){
          checkCount++;
        }
      }
      if(checkCount == scene.obstacles.length){
        scene.targets.push (new Target (targetId, targetTmp));
        break;
      }
    }
    targetId++;
  }

  agent.update(0.01)
  
  // check agent crossing obstacles ...
  scene.obstacles.forEach ( function (obs) { obs.checkCollision (agent)} );

  
  requestAnimationFrame(animate);

  render();
}

function render() {
  renderer.render(scene, camera);
}

