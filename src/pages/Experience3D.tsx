import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Header } from "@/components/landing/Header";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { sections } from '@/components/3d/SceneConfig';
import { Navigation3D } from '@/components/3d/Navigation3D';
import { useToast } from '@/components/ui/use-toast';

const Experience3D = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create sections with their 3D representations
    sections.forEach((section, index) => {
      // Platform
      const platformGeometry = new THREE.BoxGeometry(10, 0.5, 10);
      const platformMaterial = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color(section.color),
        shininess: 100
      });
      const platform = new THREE.Mesh(platformGeometry, platformMaterial);
      platform.position.copy(section.position);
      scene.add(platform);

      // Section specific 3D object
      let sectionObject;
      switch(index) {
        case 0: // Vorteile
          sectionObject = new THREE.IcosahedronGeometry(1, 0);
          break;
        case 1: // Expertise
          sectionObject = new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16);
          break;
        case 2: // Prozess
          sectionObject = new THREE.OctahedronGeometry(1);
          break;
        case 3: // Testimonials
          sectionObject = new THREE.DodecahedronGeometry(1);
          break;
        default: // Kontakt
          sectionObject = new THREE.TetrahedronGeometry(1);
      }

      const objectMaterial = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color(section.color),
        wireframe: true
      });
      const mesh = new THREE.Mesh(sectionObject, objectMaterial);
      mesh.position.set(section.position.x, section.position.y + 2, section.position.z);
      scene.add(mesh);

      // Add text
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = 512;
        canvas.height = 256;
        context.fillStyle = section.color;
        context.font = 'bold 48px Arial';
        context.textAlign = 'center';
        context.fillText(section.title, canvas.width/2, canvas.height/2);
        context.font = '24px Arial';
        context.fillText(section.content, canvas.width/2, canvas.height/2 + 48);
        
        const texture = new THREE.CanvasTexture(canvas);
        const textMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
        });
        const textGeometry = new THREE.PlaneGeometry(8, 4);
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
    const animate = () => {
      const animationId = requestAnimationFrame(animate);

      // Rotate all objects
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh && !(child.geometry instanceof THREE.BoxGeometry) && !(child.geometry instanceof THREE.PlaneGeometry)) {
          child.rotation.x += 0.01;
          child.rotation.y += 0.01;
        }
      });

      // Smooth camera movement
      const targetPosition = sections[currentSection].position;
      camera.position.lerp(
        new THREE.Vector3(targetPosition.x, camera.position.y, camera.position.z),
        0.05
      );
      camera.lookAt(new THREE.Vector3(targetPosition.x, 0, 0));

      renderer.render(scene, camera);

      return () => {
        cancelAnimationFrame(animationId);
      };
    };
    animate();

    // Handle scroll
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1);
        toast({
          title: sections[currentSection + 1].title,
          description: sections[currentSection + 1].content,
        });
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
        toast({
          title: sections[currentSection - 1].title,
          description: sections[currentSection - 1].content,
        });
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
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        sceneRef.current?.removeChild(rendererRef.current.domElement);
      }

      // Dispose of all geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [currentSection, toast]);

  const handleNavigate = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    toast({
      title: sections[sectionIndex].title,
      description: sections[sectionIndex].content,
    });
  };

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
      <div ref={sceneRef} className="absolute inset-0" />
      <Navigation3D currentSection={currentSection} onNavigate={handleNavigate} />
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-white text-sm z-50">
        Scrolle oder nutze die Navigation um durch die 3D-Welt zu navigieren
      </div>
    </div>
  );
};

export default Experience3D;