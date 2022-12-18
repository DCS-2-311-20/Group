//
// 応用プログラミング 第12回 (ap12L1.js)
// 
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import * as L1 from "./ap12L1.js";
import * as L2 from "./ap12L2.js";
import * as L3 from "./ap12L3.js";
import * as L4 from "./ap12L4.js";

let renderer;
let camera;
export const origin = new THREE.Vector3();
let course;
export const controlPoints = [
    [-50, 20],
    [ 25,-40]
];
export function init(scene, size, id, offset) {
    origin.set(offset.x, 0, offset.z);
    camera = new THREE.PerspectiveCamera(20, 1, 0.1, 1000);
    {
      camera.position.set(0, 10, 0);
      camera.lookAt(offset.x, 0, offset.z);
    }
    renderer =  new THREE.WebGLRenderer();
    {
      renderer.setClearColor(0x808020);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(size, size);
    }
    document.getElementById(id).appendChild(renderer.domElement);
    // ポイントライト
    const light = new THREE.PointLight();
    light.position.set(offset.x, 2, offset.z);
    scene.add(light);
    // 平面
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 80),
        new THREE.MeshLambertMaterial({color: "green"})
    )
    plane.rotateX(-Math.PI/2);
    plane.position.set(offset.x, -0.01, offset.z);
    scene.add(plane);
    // コース
    
    const course = new THREE.CatmullRomCurve3(
        controlPoints.map((p) => {
            return (new THREE.Vector3()).set(
                offset.x + p[0],
                0,
                offset.z + p[1]
            );
        }), false
    )
    const points = course.getPoints(100);
    points.forEach((point)=>{
        const road = new THREE.Mesh(
            new THREE.CircleGeometry(5,16),
            new THREE.MeshLambertMaterial({color: "gray"})
        )
        road.rotateX(-Math.PI/2);
        road.position.set(
            point.x,
            0,
            point.z
        );
        scene.add(road);
    });
}

export function makeCourse(scene) {
    const courseVectors = [];
    const parts = [L4, L1, L2, L3];
    parts.forEach((part) => {
        part.controlPoints.forEach((p) => {
            courseVectors.push(
                new THREE.Vector3(
                    p[0] + part.origin.x,
                    0,
                    p[1] + part.origin.z,
                )
            )
        });
    })
    course = new THREE.CatmullRomCurve3(
        courseVectors, true
    )
}

export function getCamera() {
    return camera;
}

export function setCar(scene, car) {
    const SCALE = 0.01;
    car.position.copy(origin);
    car.scale.set(SCALE, SCALE, SCALE);
    car.rotation.y = 0;
    car.visible = true;
    scene.add(car);
}

const radius = 20;
let angle = 0;
const clock = new THREE.Clock();
const carPosition = new THREE.Vector3();
const carTarget = new THREE.Vector3();
export function render(scene, car) {
    const time = (clock.getElapsedTime() / 20);
    angle = (angle + 0.02) % (2 * Math.PI);
    course.getPointAt(time % 1, carPosition);
    car.position.copy(carPosition);
    course.getPointAt((time + 0.01) %1, carTarget);
    car.lookAt(carTarget);
    camera.lookAt(car.position.x, car.position.y, car.position.z);
    renderer.render(scene, camera);
}

