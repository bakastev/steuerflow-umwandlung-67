import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Header } from "@/components/landing/Header";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

const Experience3D = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sceneRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x111827); // Primary dark color
    sceneRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xC5A572, 0.5); // Accent color
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create sections as 3D objects
    const sections = [
      { title: "Vorteile", position: new THREE.Vector3(0, 0, 0) },
      { title: "Prozess", position: new THREE.Vector3(10, 0, 0) },
      { title: "Über uns", position: new THREE.Vector3(20, 0, 0) },
      { title: "Kontakt", position: new THREE.Vector3(30, 0, 0) }
    ];

    sections.forEach((section) => {
      // Create platform for each section
      const platformGeometry = new THREE.BoxGeometry(8, 0.5, 8);
      const platformMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xC5A572,
        metalness: 0.8,
        roughness: 0.2
      });
      const platform = new THREE.Mesh(platformGeometry, platformMaterial);
      platform.position.copy(section.position);
      scene.add(platform);

      // Add floating text (as 3D object for now - could be replaced with HTML overlay)
      const textGeometry = new THREE.TextGeometry(section.title, {
        size: 1,
        height: 0.2,
      });
      const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(
        section.position.x - 2,
        section.position.y + 2,
        section.position.z
      );
      scene.add(textMesh);
    });

    // Initial camera position
    camera.position.set(0, 5, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Animation loop
    let currentSection = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth camera movement
      const targetPosition = sections[currentSection].position;
      camera.position.lerp(
        new THREE.Vector3(targetPosition.x, camera.position.y, targetPosition.z + 10),
        0.05
      );
      camera.lookAt(targetPosition);

      renderer.render(scene, camera);
    };
    animate();

    // Handle scroll
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        currentSection++;
      } else if (e.deltaY < 0 && currentSection > 0) {
        currentSection--;
      }
    };
    window.addEventListener('wheel', handleScroll);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('resize', handleResize);
      sceneRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-primary">
      <Header />
      <Button
        variant="ghost"
        className="fixed top-24 left-4 z-50 text-white hover:text-accent"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Zurück zur normalen Ansicht
      </Button>
      <div 
        ref={sceneRef} 
        className="absolute inset-0"
      />
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-white text-sm z-50">
        Scrolle um durch die Erfahrung zu navigieren
      </div>
    </div>
  );
};

export default Experience3D;