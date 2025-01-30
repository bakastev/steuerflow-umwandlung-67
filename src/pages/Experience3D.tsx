import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Header } from "@/components/landing/Header";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

const Experience3D = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sceneRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x111827);
    sceneRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xC5A572, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create sections with their 3D representations
    const sections = [
      { 
        title: "Vorteile", 
        position: new THREE.Vector3(0, 0, 0),
        objects: [
          {
            geometry: new THREE.IcosahedronGeometry(1, 0),
            material: new THREE.MeshPhongMaterial({ color: 0xC5A572 }),
            position: new THREE.Vector3(0, 2, 0)
          }
        ]
      },
      { 
        title: "Expertise", 
        position: new THREE.Vector3(15, 0, 0),
        objects: [
          {
            geometry: new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16),
            material: new THREE.MeshPhongMaterial({ color: 0xC5A572 }),
            position: new THREE.Vector3(15, 2, 0)
          }
        ]
      },
      { 
        title: "Prozess", 
        position: new THREE.Vector3(30, 0, 0),
        objects: [
          {
            geometry: new THREE.OctahedronGeometry(1),
            material: new THREE.MeshPhongMaterial({ color: 0xC5A572 }),
            position: new THREE.Vector3(30, 2, 0)
          }
        ]
      },
      { 
        title: "Testimonials", 
        position: new THREE.Vector3(45, 0, 0),
        objects: [
          {
            geometry: new THREE.DodecahedronGeometry(1),
            material: new THREE.MeshPhongMaterial({ color: 0xC5A572 }),
            position: new THREE.Vector3(45, 2, 0)
          }
        ]
      },
      { 
        title: "Kontakt", 
        position: new THREE.Vector3(60, 0, 0),
        objects: [
          {
            geometry: new THREE.TetrahedronGeometry(1),
            material: new THREE.MeshPhongMaterial({ color: 0xC5A572 }),
            position: new THREE.Vector3(60, 2, 0)
          }
        ]
      }
    ];

    // Create platforms and objects for each section
    sections.forEach((section) => {
      // Platform
      const platformGeometry = new THREE.BoxGeometry(10, 0.5, 10);
      const platformMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x1f2937,
        shininess: 100
      });
      const platform = new THREE.Mesh(platformGeometry, platformMaterial);
      platform.position.copy(section.position);
      scene.add(platform);

      // Add section objects
      section.objects.forEach(obj => {
        const mesh = new THREE.Mesh(obj.geometry, obj.material);
        mesh.position.copy(obj.position);
        scene.add(mesh);
      });

      // Create text as a canvas texture
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = 512;
        canvas.height = 128;
        context.fillStyle = '#C5A572';
        context.font = 'bold 48px Arial';
        context.textAlign = 'center';
        context.fillText(section.title, canvas.width/2, canvas.height/2);
        
        const texture = new THREE.CanvasTexture(canvas);
        const textMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
        });
        const textGeometry = new THREE.PlaneGeometry(5, 1.25);
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(
          section.position.x,
          section.position.y + 4,
          section.position.z
        );
        scene.add(textMesh);
      }
    });

    // Initial camera position
    camera.position.set(0, 5, 15);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Animation loop
    let currentSection = 0;
    let animationFrameId: number;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate all section objects
      sections.forEach((section) => {
        const sectionObjects = scene.children.filter(
          child => child instanceof THREE.Mesh && 
          child.position.x === section.objects[0].position.x &&
          child.position.y === section.objects[0].position.y
        );
        sectionObjects.forEach(obj => {
          obj.rotation.x += 0.01;
          obj.rotation.y += 0.01;
        });
      });

      // Smooth camera movement
      const targetPosition = sections[currentSection].position;
      camera.position.lerp(
        new THREE.Vector3(targetPosition.x, camera.position.y, camera.position.z),
        0.05
      );
      camera.lookAt(new THREE.Vector3(targetPosition.x, 0, 0));

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
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        sceneRef.current?.removeChild(rendererRef.current.domElement);
      }
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
        Scrolle um durch die 3D-Welt zu navigieren
      </div>
    </div>
  );
};

export default Experience3D;