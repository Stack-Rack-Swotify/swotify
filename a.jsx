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
    camera.position.set(0, 1.5, 6); 
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    mountRef.current.appendChild(renderer.domElement);

    // Warmer, friendlier lighting
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 2.5);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 3);
    mainLight.position.set(5, 10, 7);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffa500, 1);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    // Student-friendly materials with brighter colors
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a90e2, // Friendly blue
        metalness: 0.3,
        roughness: 0.6
    });
    
    const accentMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700, // Bright yellow/gold
        metalness: 0.5,
        roughness: 0.3,
        emissive: 0xffd700,
        emissiveIntensity: 0.3
    });
    
    const eyeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff, // White eyes
        emissive: 0x4a90e2,
        emissiveIntensity: 0.8
    });
    
    const pupilMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        metalness: 0.8,
        roughness: 0.2
    });
    
    const darkMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a6ea5, // Lighter accent blue
        metalness: 0.4,
        roughness: 0.5
    });

    const robot = new THREE.Group();

    // Rounder, cuter body
    const bodyGeometry = new THREE.CapsuleGeometry(1, 1.5, 16, 32);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    robot.add(body);

    // Friendly chest panel with heart/badge
    const chestGeometry = new THREE.CircleGeometry(0.5, 32);
    const chest = new THREE.Mesh(chestGeometry, accentMaterial);
    chest.position.set(0, 0.3, 1.02);
    robot.add(chest);

    // Add a friendly star or school badge
    const starGeometry = new THREE.CircleGeometry(0.3, 5);
    const star = new THREE.Mesh(starGeometry, eyeMaterial);
    star.position.set(0, 0.3, 1.05);
    robot.add(star);

    // Head Group - LARGER and ROUNDER
    const headGroup = new THREE.Group();

    // Round head
    const headGeo = new THREE.SphereGeometry(0.9, 32, 32);
    const head = new THREE.Mesh(headGeo, bodyMaterial);
    headGroup.add(head);

    // Friendly face plate (smile area)
    const faceGeo = new THREE.CapsuleGeometry(0.4, 0.3, 16, 32);
    const face = new THREE.Mesh(faceGeo, darkMaterial);
    face.rotation.z = Math.PI / 2;
    face.position.set(0, -0.15, 0.85);
    headGroup.add(face);

    // BIGGER, friendlier eyes
    const eyeGeo = new THREE.SphereGeometry(0.2, 32, 32);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMaterial);
    leftEye.position.set(-0.3, 0.15, 0.8);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMaterial);
    rightEye.position.set(0.3, 0.15, 0.8);
    headGroup.add(rightEye);

    // Add pupils for more expression
    const pupilGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    leftPupil.position.set(-0.3, 0.15, 0.9);
    headGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMaterial);
    rightPupil.position.set(0.3, 0.15, 0.9);
    headGroup.add(rightPupil);

    // Add cute eyebrows
    const browGeo = new THREE.CapsuleGeometry(0.05, 0.2, 8, 16);
    const leftBrow = new THREE.Mesh(browGeo, darkMaterial);
    leftBrow.rotation.z = -Math.PI / 6;
    leftBrow.position.set(-0.3, 0.35, 0.85);
    headGroup.add(leftBrow);

    const rightBrow = new THREE.Mesh(browGeo, darkMaterial);
    rightBrow.rotation.z = Math.PI / 6;
    rightBrow.position.set(0.3, 0.35, 0.85);
    headGroup.add(rightBrow);

    // Friendly smile
    const smileCurve = new THREE.EllipseCurve(
        0, 0,
        0.35, 0.25,
        Math.PI * 0.2, Math.PI * 0.8,
        false,
        0
    );
    const smilePoints = smileCurve.getPoints(50);
    const smileGeometry = new THREE.BufferGeometry().setFromPoints(smilePoints);
    const smileMaterial = new THREE.LineBasicMaterial({ color: 0x2a2a2a, linewidth: 3 });
    const smile = new THREE.Line(smileGeometry, smileMaterial);
    smile.position.set(0, -0.15, 0.9);
    smile.rotation.x = Math.PI;
    headGroup.add(smile);

    // Pencil antenna (school theme!)
    const antennaGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.6, 16);
    const antenna = new THREE.Mesh(antennaGeo, accentMaterial);
    antenna.position.set(0, 1.15, 0);
    headGroup.add(antenna);

    // Eraser top
    const antennaBallGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.15, 16);
    const antennaBall = new THREE.Mesh(antennaBallGeo, new THREE.MeshStandardMaterial({
        color: 0xff6b9d,
        metalness: 0.2,
        roughness: 0.8
    }));
    antennaBall.position.set(0, 1.5, 0);
    headGroup.add(antennaBall);

    // Cute round ears
    const earGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const leftEar = new THREE.Mesh(earGeo, accentMaterial);
    leftEar.position.set(-0.8, 0.2, 0);
    headGroup.add(leftEar);
    
    const rightEar = new THREE.Mesh(earGeo, accentMaterial);
    rightEar.position.set(0.8, 0.2, 0);
    headGroup.add(rightEar);

    headGroup.position.y = 2.2; // Bigger head means adjust position
    headGroup.scale.set(1.2, 1.2, 1.2); // Make head proportionally larger
    robot.add(headGroup);

    // Shorter, rounder neck
    const neckGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.4, 16);
    const neck = new THREE.Mesh(neckGeo, darkMaterial);
    neck.position.y = 1.5;
    robot.add(neck);

    // Rounder, friendlier arms
    const createArm = (side: number) => {
        const armGroup = new THREE.Group();
        const shoulder = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), accentMaterial);
        armGroup.add(shoulder);
        const upperArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.7, 16, 32), bodyMaterial);
        upperArm.position.y = -0.5;
        armGroup.add(upperArm);
        const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), darkMaterial);
        elbow.position.y = -0.9;
        armGroup.add(elbow);
        const lowerArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.6, 16, 32), bodyMaterial);
        lowerArm.position.y = -1.3;
        armGroup.add(lowerArm);
        // Rounder hands
        const hand = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), accentMaterial);
        hand.position.y = -1.7;
        armGroup.add(hand);
        armGroup.position.set(side * 1.2, 0.8, 0);
        return armGroup;
    };

    const leftArm = createArm(-1);
    const rightArm = createArm(1);
    robot.add(leftArm);
    robot.add(rightArm);

    // Rounder, sturdier legs
    const createLeg = (side: number) => {
        const legGroup = new THREE.Group();
        const hip = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), darkMaterial);
        legGroup.add(hip);
        const upperLeg = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.9, 16, 32), bodyMaterial);
        upperLeg.position.y = -0.6;
        legGroup.add(upperLeg);
        const knee = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), accentMaterial);
        knee.position.y = -1.1;
        legGroup.add(knee);
        const lowerLeg = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.8, 16, 32), bodyMaterial);
        lowerLeg.position.y = -1.6;
        legGroup.add(lowerLeg);
        // Cute rounded feet
        const foot = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.3, 16, 32), accentMaterial);
        foot.rotation.z = Math.PI / 2;
        foot.position.set(0, -2.1, 0.15);
        legGroup.add(foot);
        legGroup.position.set(side * 0.5, -1.25, 0);
        return legGroup;
    };
    
    const leftLeg = createLeg(-1);
    const rightLeg = createLeg(1);
    robot.add(leftLeg);
    robot.add(rightLeg);

    scene.add(robot);

    // Mouse Tracking
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // More subtle tracking for friendlier feel
        targetRotation.y = mouse.x * 0.5;
        targetRotation.x = mouse.y * 0.3;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop with bouncier, friendlier movements
    let time = 0;
    let animationId: number;

    const animate = () => {
        animationId = requestAnimationFrame(animate);
        time += 0.02;

        currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
        currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

        // Friendlier head movements
        headGroup.rotation.x = currentRotation.x * 0.4 + Math.sin(time * 0.5) * 0.05;
        headGroup.rotation.y = currentRotation.y * 1 + Math.sin(time * 0.3) * 0.1;

        robot.rotation.y = currentRotation.y * 0.2;
        if (flipped) robot.rotation.y += Math.PI / 4;

        // Bouncier floating animation
        robot.position.y = Math.sin(time * 1.2) * 0.15;

        // Playful arm waving
        leftArm.rotation.x = Math.sin(time * 0.8) * 0.3 + currentRotation.x * 0.2;
        rightArm.rotation.x = Math.sin(time * 0.8 + Math.PI) * 0.3 + currentRotation.x * 0.2;
        leftArm.rotation.z = 0.3 + Math.sin(time * 0.5) * 0.15;
        rightArm.rotation.z = -0.3 - Math.sin(time * 0.5) * 0.15;

        // Twinkling eyes
        eyeMaterial.emissiveIntensity = 0.6 + Math.sin(time * 2) * 0.3;
        
        // Bouncy antenna
        antennaBall.position.y = 1.5 + Math.sin(time * 4) * 0.05;
        antennaBall.rotation.y = time * 0.5;

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
      className={`absolute pointer-events-none z-[1] ${className}`}
      style={{
         width: width,
         height: width * 1.2,
         transform: flipped ? 'scaleX(-1)' : 'none'
      }}
    />
  );
};

export default Mascot;
