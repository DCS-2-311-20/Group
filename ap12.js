//
// 応用プログラミング 第12回 (ap12.js)
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import { GLTFLoader } from "gltf";
import * as L1 from "./ap12L1.js";
import * as L2 from "./ap12L2.js";
import * as L3 from "./ap12L3.js";
import * as L4 from "./ap12L4.js";

// ３Ｄページ作成関数の定義
function init() {
  // 制御変数の定義
  
  const parts = [
    {module: L1, id: "left1", offset: {x: 50, z:-40}},
    {module: L2, id: "left2", offset: {x:-50, z:-40}},
    {module: L3, id: "left3", offset: {x:-50, z: 40}},
    {module: L4, id: "left4", offset: {x: 50, z: 40}},
  ];
  
  let sizeR = 0.8 * window.innerWidth;
  let sizeL = 0.2 * window.innerWidth;
  // シーン作成
  const scene = new THREE.Scene();

   // カメラの作成
  const mainCamera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  {
    mainCamera.position.set(50,50,200);
    mainCamera.lookAt(0,0,0);
  }

  // レンダラ
  const mainRenderer = new THREE.WebGLRenderer();
  {
    mainRenderer.setClearColor(0x204060);
    mainRenderer.setPixelRatio(window.devicePixelRatio);
    mainRenderer.setSize(sizeR, sizeR);
  }

  // 3Dモデル(GLTF形式)の読み込み

  const PREFIX = "SHTV_Prefab_Car_"
  const loader = new GLTFLoader();
  let cars = [];
  loader.load("cars/scene.gltf", model => {
    model.scene.traverse( obj => {
      obj.rotation.y = 0;
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.material.needsUpdate = true;
        if ( obj.name.indexOf("Wheel_Ambulance_FR") == 11 
          || obj.name.indexOf("Wheel_Ambulance_BR") == 11
        ) {
          obj.geometry.translate(-200, 0, 0)
        }
        else {
          obj.geometry.translate(200, 0, 0)
        }
      }
      if (obj.name.indexOf(PREFIX) == 0) {
        cars.push(obj);
      }
    });

    parts.forEach((part, i) => {
      part.module.init(scene, sizeL, part.id, part.offset);
    });
    L1.makeCourse(scene);
    L2.makeCourse(scene);
    L3.makeCourse(scene);
    L4.makeCourse(scene);
    parts.forEach((part, i) => {      
      part.module.setCar(scene, cars[i]);
      part.module.render(scene, cars[i]);
    });
    render();
  });

  // 光源の設定
  { // 環境ライト
    const light = new THREE.AmbientLight();
    light.intensity=0.4;
    scene.add(light);
  }
  
  // レンダラーの配置
  document.getElementById("main").appendChild(mainRenderer.domElement);
  
   // Windowサイズの変更処理
  window.addEventListener("resize", ()=>{
    mainCamera.updateProjectionMatrix();
    sizeR = 0.8 * window.innerWidth;
    mainRenderer.setSize(sizeR, sizeR);
  }, false);

  let camera = mainCamera;
  parts.forEach((part) => {
    document.getElementById(part.id).onclick = () => {
      camera = part.module.getCamera();
    }
  });

  document.getElementById("main").onclick = () => {
    camera = mainCamera;
  }

  // 描画処理
  function render() {
    mainRenderer.render(scene, camera);
    parts.forEach((part, i) => {
      part.module.render(scene, cars[i]);
    });
    requestAnimationFrame(render);
  }
}

document.onload = init();