//
// 応用プログラミング 第7回 課題2 (ap0702.js)
//  G18400-2021 拓殖太郎
// $Id$
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import {CSS3DRenderer, CSS3DObject} from "CSS3D"

// ３Ｄページ作成関数の定義
function init() {
  // 制御変数の定義
  const param = {w:0.6, h:0.1, d:0.6,
     nRow:7, nCol:11, gapX:0.1, gapY:0.3, gapZ:0.4};

  // シーン作成
  const scene = new THREE.Scene();

   // カメラの作成
  const camera1 = new THREE.PerspectiveCamera(
    50, window.innerWidth/window.innerHeight, 0.1, 1000);
  {
    camera1.position.set(0,2,15);
    camera1.lookAt(0,0,0);
    // camera1.position.set(-1,0,3);
    // camera1.lookAt(0,-1.5,5);
  }
  // 第2のカメラ
 

  // 第1のレンダラ
  const renderer = new THREE.WebGLRenderer();
  {
    renderer.setClearColor(0x204060);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.zIndex = 0;
    renderer.domElement.style.top = 0;
  }
  // 第2のレンダラ

  // CSS3Dレンダラ
  const cssRenderer = new CSS3DRenderer();
  {
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = "absolute";
    cssRenderer.domElement.style.zIndex = 1;
    cssRenderer.domElement.style.top = 0;
  }

  // 光源の設定
  { // 環境ライト
    const light = new THREE.AmbientLight();
    light.intensity=0.4;
    scene.add(light);
  }
  { // ポイントライト
    const light = new THREE.PointLight();
    light.position.set(0, 2, 0);
    scene.add(light);
  }

  // 3D物体
  // スクリーン
  const screen = new THREE.Mesh(

  )
  screen.position.set(0,0,0);
  // scene.add(screen);
  // 椅子
  const chair = new THREE.Group();
  {

  }
  // 座席の生成

  // ダミーを作る関数
  function makeDummy(color) {

  }

  // 他の観客

  // アバターの生成

  // アバターの移動
  function setAvatar(position){

  }

  // CSS3D表示のための設定
  // iframe要素の生成
  const iframe = document.createElement("iframe");
  iframe.style.width = "640px";
  iframe.style.height = "360px";
  iframe.style.border = "0px";
  iframe.src = "https://www.youtube.com/embed?version=3"
      +"&mute=1&autoplay=1&controls=0"
      +"&loop=1&playlist=w23RIKTYF28,-9pMuSNlN6A";
  
  // CSSオブジェクトの生成
  const cssObject = new CSS3DObject(iframe);
  cssObject.scale.x *= 8/640;
  cssObject.scale.y *= 8/640;
  scene.add(cssObject);

  // レンダラーの配置
  document.getElementById("output1").appendChild(cssRenderer.domElement);
  
  // シート選択のための設定
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  function onMouseDown(event) {
    // マウスの位置を±1の範囲に変換
  
    // 光線を発射
    
    // 全ての座席について
 
  }
  window.addEventListener("mousedown", onMouseDown, false);

  // Windowサイズの変更処理
  window.addEventListener("resize", ()=>{
    camera1.updateProjectionMatrix();
    cssRenderer.setSize( window.innerWidth, window.innerHeight );
  }, false);

  // 描画処理
  function update(time) {
    cssRenderer.render(scene, camera1);
    requestAnimationFrame(update);
  }

  // 描画開始
  requestAnimationFrame(update);
}

document.onload = init();