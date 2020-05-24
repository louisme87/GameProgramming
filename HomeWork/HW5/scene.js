function setObstacles () {
  scene.obstacles = [];
  for(i=0; i<3; i++){
    scene.obstacles.push (new Obstacle (new THREE.Vector3 (-350 + getRandomInt(700), 0, -350 + getRandomInt(700)), 30 + getRandomInt(30)));
  }
  
  
  scene.targets = [];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}