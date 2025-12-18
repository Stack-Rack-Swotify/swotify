
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MascotProps {
  className?: string; 
  width?: number;
  flipped?: boolean;
}

const Mascot: React.FC<MascotProps> = ({ className = "", width = 300, flipped = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const w = width;
    const h = width * 1.2; 

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
    camera.position.set(0, 1.5, 7); 
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xfff5e6, 2.5);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 3);
    mainLight.position.set(5, 10, 7);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x3b82f6, 1);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    // Student Materials
    const skinMaterial = new THREE.MeshStandardMaterial({
        color: 0xffdbac, // Warm skin tone
        roughness: 0.8
    });
    
    const robeMaterial = new THREE.MeshStandardMaterial({
        color: 0x3b82f6, // Swotify Blue
        roughness: 0.7
    });

    const capMaterial = new THREE.MeshStandardMaterial({
        color: 0x1e293b, // Slate Dark
        roughness: 0.5
    });
    
    const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700, 
        metalness: 0.6,
        roughness: 0.2,
        emissive: 0xffd700,
        emissiveIntensity: 0.2
    });
    
    const eyeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x3b82f6,
        emissiveIntensity: 0.5
    });
    
    const pupilMaterial = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.1
    });

    const student = new THREE.Group();

    // Body (Robe/Sweater)
    const bodyGeometry = new THREE.CapsuleGeometry(1, 1.8, 16, 32);
    const body = new THREE.Mesh(bodyGeometry, robeMaterial);
    student.add(body);

    // Backpack
    const backpackGroup = new THREE.Group();
    const bagGeo = new THREE.BoxGeometry(1.2, 1.4, 0.6);
    const bag = new THREE.Mesh(bagGeo, capMaterial);
    bag.position.set(0, 0, -0.8);
    backpackGroup.add(bag);
    
    // Backpack Straps
    const strapGeo = new THREE.TorusGeometry(0.5, 0.08, 16, 32, Math.PI);
    const strapL = new THREE.Mesh(strapGeo, capMaterial);
    strapL.position.set(-0.4, 0.3, -0.4);
    strapL.rotation.y = Math.PI / 2;
    backpackGroup.add(strapL);
    
    const strapR = new THREE.Mesh(strapGeo, capMaterial);
    strapR.position.set(0.4, 0.3, -0.4);
    strapR.rotation.y = Math.PI / 2;
    backpackGroup.add(strapR);

    student.add(backpackGroup);

    // Head Group
    const headGroup = new THREE.Group();
    const headGeo = new THREE.SphereGeometry(1, 32, 32);
    const head = new THREE.Mesh(headGeo, skinMaterial);
    headGroup.add(head);

    // Graduation Cap (Mortarboard)
    const capTopGeo = new THREE.BoxGeometry(2.2, 0.1, 2.2);
    const capTop = new THREE.Mesh(capTopGeo, capMaterial);
    capTop.position.y = 1.2;
    headGroup.add(capTop);

    const capBaseGeo = new THREE.CylinderGeometry(0.6, 0.7, 0.5, 16);
    const capBase = new THREE.Mesh(capBaseGeo, capMaterial);
    capBase.position.y = 0.8;
    headGroup.add(capBase);

    // Tassel
    const tasselGroup = new THREE.Group();
    const tasselCordGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 8);
    const tasselCord = new THREE.Mesh(tasselCordGeo, goldMaterial);
    tasselCord.position.set(1.1, 0.7, 0);
    tasselGroup.add(tasselCord);
    
    const tasselEndGeo = new THREE.CapsuleGeometry(0.08, 0.2, 8, 16);
    const tasselEnd = new THREE.Mesh(tasselEndGeo, goldMaterial);
    tasselEnd.position.set(1.1, 0.3, 0);
    tasselGroup.add(tasselEnd);
    tasselGroup.position.y = 0.5;
    headGroup.add(tasselGroup);

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.18, 32, 32);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMaterial);
    leftEye.position.set(-0.35, 0, 0.9);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMaterial);
    rightEye.position.set(0.35, 0, 0.9);
    headGroup.add(rightEye);

    const pupilGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    leftPupil.position.set(-0.35, 0, 1.05);
    headGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    rightPupil.position.set(0.35, 0, 1.05);
    headGroup.add(rightPupil);

    // Smile
    const smileCurve = new THREE.EllipseCurve(
        0, 0,
        0.3, 0.2,
        Math.PI * 0.2, Math.PI * 0.8,
        false,
        0
    );
    const smilePoints = smileCurve.getPoints(50);
    const smileGeometry = new THREE.BufferGeometry().setFromPoints(smilePoints);
    const smileLineMaterial = new THREE.LineBasicMaterial({ color: 0x1e293b });
    const smile = new THREE.Line(smileGeometry, smileLineMaterial);
    smile.position.set(0, -0.4, 0.95);
    smile.rotation.x = Math.PI;
    headGroup.add(smile);

    headGroup.position.y = 2.4; 
    student.add(headGroup);

    // Arms
    const createArm = (side: number) => {
        const armGroup = new THREE.Group();
        const upperArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.8, 16, 32), robeMaterial);
        upperArm.position.y = -0.4;
        armGroup.add(upperArm);
        const lowerArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.7, 16, 32), robeMaterial);
        lowerArm.position.y = -1.1;
        armGroup.add(lowerArm);
        const hand = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), skinMaterial);
        hand.position.y = -1.6;
        armGroup.add(hand);
        armGroup.position.set(side * 1.3, 1.2, 0);
        return armGroup;
    };

    const leftArm = createArm(-1);
    const rightArm = createArm(1);
    student.add(leftArm);
    student.add(rightArm);

    // Legs
    const createLeg = (side: number) => {
        const legGroup = new THREE.Group();
        const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.25, 1.4, 16, 32), robeMaterial);
        leg.position.y = -0.7;
        legGroup.add(leg);
        const shoe = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.4, 16, 32), capMaterial);
        shoe.rotation.z = Math.PI / 2;
        shoe.position.set(0, -1.4, 0.2);
        legGroup.add(shoe);
        legGroup.position.set(side * 0.5, -1.2, 0);
        return legGroup;
    };
    
    const leftLeg = createLeg(-1);
    const rightLeg = createLeg(1);
    student.add(leftLeg);
    student.add(rightLeg);

    scene.add(student);

    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        targetRotation.y = mouse.x * 0.6;
        targetRotation.x = mouse.y * 0.3;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;
    let animationId: number;

    const animate = () => {
        animationId = requestAnimationFrame(animate);
        time += 0.02;

        currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
        currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

        headGroup.rotation.x = currentRotation.x * 0.4 + Math.sin(time * 0.5) * 0.05;
        headGroup.rotation.y = currentRotation.y * 0.8 + Math.sin(time * 0.3) * 0.1;

        student.rotation.y = currentRotation.y * 0.2;
        if (flipped) student.rotation.y += Math.PI / 4;

        student.position.y = Math.sin(time * 1.2) * 0.2;

        leftArm.rotation.x = Math.sin(time * 0.8) * 0.2 + currentRotation.x * 0.1;
        rightArm.rotation.x = Math.sin(time * 0.8 + Math.PI) * 0.2 + currentRotation.x * 0.1;
        
        // Swiveling tassel
        tasselGroup.rotation.z = Math.sin(time * 1.5) * 0.1 + currentRotation.y * 0.2;

        eyeMaterial.emissiveIntensity = 0.4 + Math.sin(time * 2) * 0.2;

        renderer.render(scene, camera);
    };
    animate();

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationId);
        if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
            mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
    };
  }, [width, flipped]);

  return (
    <div 
      ref={mountRef}
      className={`pointer-events-none ${className}`}
      style={{
         width: width,
         height: width * 1.2,
         transform: flipped ? 'scaleX(-1)' : 'none'
      }}
    />
  );
};

export default Mascot;
