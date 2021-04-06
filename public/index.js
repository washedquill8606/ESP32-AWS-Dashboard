import * as THREE from "./three/three.module.js";
import {STLLoader} from "./three/STLLoader.js";
import {OrbitControls} from "./three/OrbitControls.js";

var scene, camara, renderer, object, control;

var loaderContainer = document.getElementById("loader");

const init =()=>{
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x002035);

    camara = new THREE.PerspectiveCamera(
        75,
        loaderContainer.clientWidth / loaderContainer.clientHeight,
        0.1,
        10000
    );

    camara.position.z = 350;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(loaderContainer.clientWidth, loaderContainer.clientHeight);
    loaderContainer.appendChild(renderer.domElement);

    control = new OrbitControls(camara, renderer.domElement);
    control.enableZoom =false;
    control.enablePan = false;

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0,0,350);
    scene.add(light);

    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(0,0,-350);
    scene.add(light2);

    //renderer.render(scene, camara);
    animate();
};

const animate = () =>{
    requestAnimationFrame(animate);
    control.update();
    renderer.render(scene, camara);
}

var loader = new STLLoader();
loader.load('/3dmodels/robotic_armv1.stl', model =>{
    object = new THREE.Mesh(
        model,
        new THREE.MeshLambertMaterial({color: 0xffffff})
    );

    object.scale.set(0.18,0.18,0.18);

    object.rotation.x = -Math.PI/2;

    object.position.set(210,-200,0)

    scene.add(object);
    
});

loaderContainer.addEventListener("click",()=>{
    control.autoRotate=!control.autoRotate;
})

init();