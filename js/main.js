var container, camera, controls, glScene, glRenderer, headlight;
var objects = {};

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 2000;

  controls = new THREE.OrbitControls( camera );
  controls.addEventListener( 'change', render );

  glScene = new THREE.Scene();

  // Add WebGL

  var cube = makeCube(200, 10);
  objects.cube = cube;
  glScene.add(cube);


  // light = new THREE.DirectionalLight( 0xffffff );
  // light.position.set( 1, 1, 1 );
  // light.intensity = 0.5;
  // glScene.add( light );
  //
  // light = new THREE.DirectionalLight( 0xffffff );
  // light.position.set( -1, -1, -1 );
  // light.intensity = 0.5;
  // glScene.add( light );

  light = new THREE.AmbientLight( 0x222222 );
  light.intensity = 1.5;
  glScene.add( light );

  headlight = new THREE.PointLight( 0xFFFFFF, 0.5 );
  glScene.add( headlight );


  // renderers

  glRenderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
  glRenderer.setClearColor( 0x000000, 0 );
  glRenderer.setPixelRatio(window.devicePixelRatio);
  glRenderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( glRenderer.domElement );

  window.addEventListener( 'resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    glRenderer.setSize( window.innerWidth, window.innerHeight );
    render();
  }, false );
}

function animate() {

  requestAnimationFrame( animate );
  controls.update();
  render();
}

function render() {
  for (var i = 0; i < objects.cube.children.length; i ++) {
    objects.cube.children[i].position.multiplyScalar(1.001);
  }


  headlight.position.copy(camera.position);
  glRenderer.render( glScene, camera );
}

function makeCube(size, segments) {
  var cube = new THREE.Object3D();
  var subLen = size/segments;
  var material = new THREE.MeshPhongMaterial( {color: 0xff0000 } );
  for (var i = -(size/2); i <= (size/2); i += subLen) {
    for (var j = -(size/2); j <= (size/2); j += subLen) {
      for (var k = -(size/2); k <= (size/2); k += subLen) {
        var geometry = new THREE.BoxGeometry(subLen, subLen, subLen);
        var subCube = new THREE.Mesh(geometry, material);
        subCube.position.x = i;
        subCube.position.y = j;
        subCube.position.z = k;
        cube.add(subCube);
      }
    }
  }

  return cube;
}
