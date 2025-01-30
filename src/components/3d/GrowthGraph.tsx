import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const GrowthGraph = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xC5A572, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xC5A572, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xC5A572, 1);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    // Create multiple growth curves
    const createCurve = (offset: number, height: number) => {
      const curvePoints = [];
      for (let i = 0; i <= 50; i++) {
        const t = i / 50;
        curvePoints.push(new THREE.Vector3(
          (t * 4 - 2) + offset,
          Math.pow(t, 2) * height - 2,
          0
        ));
      }
      return new THREE.CatmullRomCurve3(curvePoints);
    };

    const curves = [
      createCurve(0, 6),
      createCurve(0.5, 5),
      createCurve(-0.5, 7)
    ];

    const meshObjects: THREE.Mesh[] = [];
    const sphereGroups: THREE.Group[] = [];

    curves.forEach((curve, index) => {
      // Create tube geometry for smoother curves
      const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.02, 8, false);
      const tubeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xC5A572,
        shininess: 100,
        transparent: true,
        opacity: 0.8
      });
      const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
      scene.add(tubeMesh);
      meshObjects.push(tubeMesh);

      // Add animated spheres along the curve
      const sphereGroup = new THREE.Group();
      const points = curve.getPoints(10);
      points.forEach((point) => {
        const sphereGeometry = new THREE.SphereGeometry(0.05, 32, 32);
        const sphereMaterial = new THREE.MeshPhongMaterial({ 
          color: 0xC5A572,
          shininess: 100
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.copy(point);
        sphereGroup.add(sphere);
      });
      scene.add(sphereGroup);
      sphereGroups.push(sphereGroup);
    });

    // Position camera
    camera.position.z = 8;
    camera.position.y = 1;

    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      meshObjects.forEach(mesh => {
        mesh.rotation.y += deltaMove.x * 0.005;
        mesh.rotation.x += deltaMove.y * 0.005;
      });

      sphereGroups.forEach(group => {
        group.rotation.y += deltaMove.x * 0.005;
        group.rotation.x += deltaMove.y * 0.005;
      });

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    mountRef.current.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation
    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      frame += 0.01;

      // Smooth floating animation when not dragging
      if (!isDragging) {
        meshObjects.forEach((mesh, index) => {
          mesh.rotation.y = Math.sin(frame + index * 0.5) * 0.1;
          mesh.position.y = Math.sin(frame * 0.5 + index * 0.3) * 0.1;
        });

        sphereGroups.forEach((group, index) => {
          group.rotation.y = Math.sin(frame + index * 0.5) * 0.1;
          group.position.y = Math.sin(frame * 0.5 + index * 0.3) * 0.1;
        });
      }

      // Animate point light
      pointLight.position.x = Math.sin(frame) * 3;
      pointLight.position.z = Math.cos(frame) * 3;
      
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      mountRef.current?.removeEventListener('mousedown', handleMouseDown);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-[600px]" />;
};