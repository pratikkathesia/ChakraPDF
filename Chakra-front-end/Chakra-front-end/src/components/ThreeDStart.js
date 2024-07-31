import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeDStart = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x87CEFA)); // Light blue background color
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 4); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // White directional light
    directionalLight.position.set(1,1,1).normalize();
    scene.add(directionalLight);

    // Load models
    const loader = new GLTFLoader();
    let object1, object2, object3;
    let object2RotationComplete = false; // Flag to track if Object 2's rotation is complete

    loader.load('/object_1.glb', (gltf) => {
      object1 = gltf.scene;
      object1.position.set(-20, 0, -5); // Start from left side
      object1.scale.set(0.3, 0.3, 0.3);
      scene.add(object1);
    });

    loader.load('/object_2.glb', (gltf) => {
      object2 = gltf.scene;
      object2.position.set(0,0,0); 
      object2.scale.set(0.09, 0.09, 0.09);
      scene.add(object2);
    });

    loader.load('/object_3.glb', (gltf) => {
      object3 = gltf.scene;
      object3.position.set(0, 0, -5); // Start from left side, hidden
      object3.scale.set(3, 3, 3);
      object3.visible = false; // Initially hidden
      object3.traverse(child => {
        if (child.isMesh) {
          child.castShadow = false; // Disable shadow casting
          child.receiveShadow = false; // Disable shadow receiving
          child.material = new THREE.MeshBasicMaterial({ color: child.material.color }); // Use basic material to retain original color
        }
      });
      scene.add(object3);
    });

    // Set camera position
    camera.position.z = 10;

    // Animation function
    let frame = 0;
    const animate = () => {
      frame++;
      requestAnimationFrame(animate);

      if (object1 && object2 && object3) {
        if (frame <= 60) {
          // Object 2 appears in the center
          object2.position.lerp(new THREE.Vector3(0, -2.54, -5), frame / 60);
        }

        if (frame > 60 && frame <= 120) {
          // Object 1 appears from the left and moves to Object 2
          object1.position.lerp(new THREE.Vector3(0, 0, -5), (frame - 60) / 60);
        }

        if (frame > 120 && frame <= 180) {
          // Object 1 disappears as it reaches Object 2
          object1.traverse(child => {
            if (child.isMesh) {
              child.material.opacity = 1 - (frame - 120) / 60;
              child.material.transparent = true;
            }
          });
        }

        if (frame > 180 && frame <= 240) {
          // Object 2 rotates around the x-axis for 1 second
          object2.rotation.y += (2 * Math.PI) / 60; // 360 degrees in 60 frames

          // Check if rotation of Object 2 is complete
          if (frame === 240) {
            object2RotationComplete = true; // Mark rotation as complete
          }
        }

        if (object2RotationComplete) {
          if (frame > 240 && frame <= 360) {
            // Object 3 appears from the left and moves to the right
            object3.visible = true; // Make Object 3 visible
            object3.position.lerp(new THREE.Vector3(20, 0, -5), (frame - 240) / 60);

            // Object 3 rotates around the z-axis for 1 second
            object3.rotation.z += (2 * Math.PI) / 60; // 360 degrees in 60 frames
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeDStart;
