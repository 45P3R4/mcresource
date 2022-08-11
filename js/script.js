var canvas_width = window.innerWidth;
var canvas_height = window.innerHeight / 2;

var texture = load_texture("textures/dirt.png");
var material = new THREE.MeshBasicMaterial({map: texture});
var geometry = new THREE.BoxGeometry(canvas_height / 15, canvas_height / 15, canvas_height / 15);

const mesh = new THREE.Mesh(geometry, material);

var mousex;
var mousey;

var animation_request;

let vector = new THREE.Vector3();
let vector_down = new THREE.Vector3();
let vector_current = new THREE.Vector3();

window.onload = function()
{
    var canvas = document.getElementById('canvas');
    canvas.setAttribute('width', canvas_width);
    canvas.setAttribute('height', canvas_height);

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, canvas_width / canvas_height, 1, 1000);
    camera.position.set(0,0,90);

    var renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});

    scene.add(mesh);

    renderer.render(scene, camera);

    function loop()
    {
        renderer.render(scene, camera);
        requestAnimationFrame(function() {loop();})
    }
    loop();
}

function rotate_mesh(e)
{
    // mousex = ( event.clientX / window.innerWidth ) * 2 - 1;
    // mousey = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // mesh.rotation.y =THREE.MathUtils.lerp(mesh.rotation.y, (mousex * Math.PI) / 10, 0.1);
    // mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, (mousey * Math.PI) / 10, 0.1);
    mesh.rotation.x = (vector_current.y - (vector.y - vector_down.y));
    mesh.rotation.y = (vector_current.x - (vector.x - vector_down.x));
    
    
    animation_request = requestAnimationFrame(rotate_mesh);
}

window.onmousemove = function(e)
{
    //vector.set((e.clientX / canvas_width) * 2 - 1, -(e.clientY / canvas_height) * 2 + 1,0);

    vector.set(e.clientX / canvas_width, e.clientY / canvas_height, 0);

    //vector.unproject(camera);
    //console.log(vector.x + " " + vector.y);
}

window.onmousedown = function(e)
{
    vector_down.set(e.clientX / canvas_width, e.clientY / canvas_height, 0);
    animation_request = requestAnimationFrame(rotate_mesh);

}

window.onmouseup = function()
{
    cancelAnimationFrame(animation_request);
}

function load_texture(new_texture)
{
    const loader = new THREE.TextureLoader();
    const texture = loader.load(new_texture);
    texture.magFilter = THREE.NearestFilter;
    return texture;
}

function set_texture()
{
    const input = document.getElementById("file_input");
    texture = load_texture("textures/" + document.getElementById("file_input").files[0].name);
    mesh.material = new THREE.MeshBasicMaterial({map: texture});

    console.log("textures/" + document.getElementById("file_input").files[0].name)
}

    