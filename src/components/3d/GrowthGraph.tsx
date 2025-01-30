import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const GrowthGraph = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xC5A572, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xC5A572, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create growth curve
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2, -2, 0),
      new THREE.Vector3(-1, -1, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, 2, 0),
      new THREE.Vector3(2, 4, 0),
    ]);

    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xC5A572 });
    const curveObject = new THREE.Line(geometry, material);
    scene.add(curveObject);

    // Add spheres along the curve
    const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xC5A572 });
    points.forEach((point, index) => {
      if (index % 10 === 0) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.copy(point);
        scene.add(sphere);
      }
    });

    // Position camera
    camera.position.z = 10;

    // Animation
    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      frame += 0.01;
      
      curveObject.rotation.y = Math.sin(frame) * 0.2;
      camera.position.y = Math.sin(frame * 0.5) * 0.5;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-[600px]" />;
};