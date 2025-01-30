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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xC5A572, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xC5A572, 2);
    pointLight.position.set(0, 5, 0);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // Create rocket body
    const rocketGroup = new THREE.Group();

    // Main body with metallic material
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xC5A572,
      metalness: 0.8,
      roughness: 0.2,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    rocketGroup.add(body);

    // Nose cone with metallic material
    const noseGeometry = new THREE.ConeGeometry(0.5, 1, 32);
    const noseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xC5A572,
      metalness: 0.8,
      roughness: 0.2,
    });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.y = 1.5;
    nose.castShadow = true;
    rocketGroup.add(nose);

    // Fins with metallic material
    const finGeometry = new THREE.BoxGeometry(0.1, 0.8, 0.8);
    const finMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xA17F47,
      metalness: 0.9,
      roughness: 0.1,
    });

    // Add 3 fins
    for (let i = 0; i < 3; i++) {
      const fin = new THREE.Mesh(finGeometry, finMaterial);
      fin.position.y = -0.8;
      fin.position.x = Math.cos((i * 2 * Math.PI) / 3) * 0.5;
      fin.position.z = Math.sin((i * 2 * Math.PI) / 3) * 0.5;
      fin.rotation.y = (i * 2 * Math.PI) / 3;
      fin.castShadow = true;
      rocketGroup.add(fin);
    }

    // Enhanced rocket flames with glow effect
    const flameGeometry = new THREE.ConeGeometry(0.3, 1, 32);
    const flameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff3d00,
      transparent: true,
      opacity: 0.8,
      emissive: 0xff3d00,
      emissiveIntensity: 2,
    });
    const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    flame.position.y = -1.5;
    flame.rotation.x = Math.PI;
    rocketGroup.add(flame);

    // Add glow effect to flames
    const glowGeometry = new THREE.ConeGeometry(0.4, 1.2, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff5722,
      transparent: true,
      opacity: 0.4,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.y = -1.5;
    glow.rotation.x = Math.PI;
    rocketGroup.add(glow);

    scene.add(rocketGroup);

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

      rocketGroup.rotation.y += deltaMove.x * 0.005;
      rocketGroup.rotation.x += deltaMove.y * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Scroll-based animation with smooth interpolation
    let currentY = 0;
    let targetY = 0;
    
    const handleScroll = () => {
      if (!mountRef.current) return;
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      targetY = scrollPercent * 8; // Increased movement range
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Animation
    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      frame += 0.01;

      // Smooth floating animation when not dragging
      if (!isDragging) {
        rocketGroup.rotation.y = Math.sin(frame) * 0.1;
      }

      // Smooth scroll-based position update with lerp
      currentY += (targetY - currentY) * 0.1; // Increased interpolation speed
      rocketGroup.position.y = currentY + Math.sin(frame * 0.5) * 0.2;

      // Animate flame and glow
      flame.scale.x = 0.8 + Math.sin(frame * 4) * 0.2;
      flame.scale.z = 0.8 + Math.sin(frame * 4) * 0.2;
      flameMaterial.opacity = 0.6 + Math.sin(frame * 4) * 0.2;
      
      glow.scale.x = flame.scale.x * 1.2;
      glow.scale.z = flame.scale.z * 1.2;
      glowMaterial.opacity = 0.3 + Math.sin(frame * 4) * 0.1;

      // Animate point light
      pointLight.position.x = Math.sin(frame) * 3;
      pointLight.position.z = Math.cos(frame) * 3;
      pointLight.intensity = 1.5 + Math.sin(frame * 4) * 0.5;
      
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

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-[600px]" />;
};