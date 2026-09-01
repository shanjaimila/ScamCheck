import React, { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  a: number;
  b: number;
}

interface WireframeMesh {
  vertices: Point3D[];
  edges: Edge[];
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  drx: number;
  dry: number;
  drz: number;
  scale: number;
  color: string;
}

interface ConstellationNode {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
}

export const CyberBackground3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.25;
      targetMouseY = (e.clientY - height / 2) * 0.25;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // 1. Procedural 3D Wireframe Meshes Generator
    const createCubeMesh = (x: number, y: number, z: number, scale: number, color: string, drx: number, dry: number): WireframeMesh => {
      const s = 40;
      const vertices: Point3D[] = [
        { x: -s, y: -s, z: -s },
        { x: s, y: -s, z: -s },
        { x: s, y: s, z: -s },
        { x: -s, y: s, z: -s },
        { x: -s, y: -s, z: s },
        { x: s, y: -s, z: s },
        { x: s, y: s, z: s },
        { x: -s, y: s, z: s },
      ];
      const edges: Edge[] = [
        { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 0 },
        { a: 4, b: 5 }, { a: 5, b: 6 }, { a: 6, b: 7 }, { a: 7, b: 4 },
        { a: 0, b: 4 }, { a: 1, b: 5 }, { a: 2, b: 6 }, { a: 3, b: 7 }
      ];
      return { x, y, z, rx: Math.random() * Math.PI, ry: Math.random() * Math.PI, rz: 0, drx, dry, drz: 0.002, scale, color, vertices, edges };
    };

    const createOctahedronMesh = (x: number, y: number, z: number, scale: number, color: string, drx: number, dry: number): WireframeMesh => {
      const s = 50;
      const vertices: Point3D[] = [
        { x: 0, y: -s * 1.3, z: 0 },
        { x: s, y: 0, z: 0 },
        { x: 0, y: 0, z: s },
        { x: -s, y: 0, z: 0 },
        { x: 0, y: 0, z: -s },
        { x: 0, y: s * 1.3, z: 0 }
      ];
      const edges: Edge[] = [
        { a: 0, b: 1 }, { a: 0, b: 2 }, { a: 0, b: 3 }, { a: 0, b: 4 },
        { a: 5, b: 1 }, { a: 5, b: 2 }, { a: 5, b: 3 }, { a: 5, b: 4 },
        { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 }, { a: 4, b: 1 }
      ];
      return { x, y, z, rx: Math.random() * Math.PI, ry: Math.random() * Math.PI, rz: 0, drx, dry, drz: -0.003, scale, color, vertices, edges };
    };

    const createShieldMesh = (x: number, y: number, z: number, scale: number, color: string, drx: number, dry: number): WireframeMesh => {
      const s = 45;
      const vertices: Point3D[] = [
        { x: 0, y: -s * 1.2, z: 0 },
        { x: s * 0.9, y: -s * 0.7, z: 0 },
        { x: s * 0.9, y: s * 0.2, z: 0 },
        { x: 0, y: s * 1.3, z: 0 },
        { x: -s * 0.9, y: s * 0.2, z: 0 },
        { x: -s * 0.9, y: -s * 0.7, z: 0 },
        // Back extrusion
        { x: 0, y: -s * 1.2, z: -15 },
        { x: s * 0.9, y: -s * 0.7, z: -15 },
        { x: s * 0.9, y: s * 0.2, z: -15 },
        { x: 0, y: s * 1.3, z: -15 },
        { x: -s * 0.9, y: s * 0.2, z: -15 },
        { x: -s * 0.9, y: -s * 0.7, z: -15 },
      ];
      const edges: Edge[] = [
        { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 }, { a: 4, b: 5 }, { a: 5, b: 0 },
        { a: 6, b: 7 }, { a: 7, b: 8 }, { a: 8, b: 9 }, { a: 9, b: 10 }, { a: 10, b: 11 }, { a: 11, b: 6 },
        { a: 0, b: 6 }, { a: 1, b: 7 }, { a: 2, b: 8 }, { a: 3, b: 9 }, { a: 4, b: 10 }, { a: 5, b: 11 }
      ];
      return { x, y, z, rx: Math.random() * Math.PI, ry: Math.random() * Math.PI, rz: 0, drx, dry, drz: 0.001, scale, color, vertices, edges };
    };

    const meshes: WireframeMesh[] = [
      createCubeMesh(-width * 0.35, -height * 0.25, 100, 1.1, 'rgba(0, 229, 153, 0.45)', 0.005, 0.008),
      createOctahedronMesh(width * 0.38, -height * 0.2, 50, 1.2, 'rgba(6, 182, 212, 0.5)', 0.007, -0.005),
      createShieldMesh(-width * 0.3, height * 0.28, 80, 1.0, 'rgba(16, 185, 129, 0.4)', -0.004, 0.006),
      createCubeMesh(width * 0.32, height * 0.3, 120, 0.9, 'rgba(99, 102, 241, 0.45)', -0.006, -0.007),
      createOctahedronMesh(0, -height * 0.38, 150, 0.8, 'rgba(0, 229, 153, 0.35)', 0.003, 0.009)
    ];

    // 2. Constellation Particles (90-110 nodes)
    const particleCount = 100;
    const particles: ConstellationNode[] = [];
    const colors = ['rgba(0, 229, 153, ', 'rgba(6, 182, 212, ', 'rgba(16, 185, 129, ', 'rgba(99, 102, 241, '];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.8,
        y: (Math.random() - 0.5) * height * 1.8,
        z: Math.random() * 500 - 100,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        vz: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.8 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // 3D Matrix Rotation & Projection Helper
    const rotateAndProject = (p: Point3D, mesh: WireframeMesh, camX: number, camY: number, fov: number, cx: number, cy: number) => {
      // Scale
      let x = p.x * mesh.scale;
      let y = p.y * mesh.scale;
      let z = p.z * mesh.scale;

      // Rotate X
      let cos = Math.cos(mesh.rx);
      let sin = Math.sin(mesh.rx);
      let y1 = y * cos - z * sin;
      let z1 = y * sin + z * cos;

      // Rotate Y
      cos = Math.cos(mesh.ry);
      sin = Math.sin(mesh.ry);
      let x2 = x * cos + z1 * sin;
      let z2 = -x * sin + z1 * cos;

      // Rotate Z
      cos = Math.cos(mesh.rz);
      sin = Math.sin(mesh.rz);
      let x3 = x2 * cos - y1 * sin;
      let y3 = x2 * sin + y1 * cos;

      // World offset + parallax
      const wx = x3 + mesh.x + camX;
      const wy = y3 + mesh.y + camY;
      const wz = z2 + mesh.z + 400; // Camera z distance

      // Perspective projection
      const factor = fov / Math.max(1, wz);
      return {
        x: cx + wx * factor,
        y: cy + wy * factor,
        z: wz,
        factor
      };
    };

    let time = 0;

    // Render Loop (60 FPS)
    const render = () => {
      time += 0.015;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Deep obsidian base fill
      ctx.fillStyle = '#070a0f';
      ctx.fillRect(0, 0, width, height);

      // Render Ambient Nebula Glows
      const cx = width / 2;
      const cy = height / 2;

      // Cyan Nebula Top-Right
      const grad1 = ctx.createRadialGradient(width * 0.85 + mouseX, height * 0.15 + mouseY, 20, width * 0.85, height * 0.15, width * 0.5);
      grad1.addColorStop(0, 'rgba(6, 182, 212, 0.12)');
      grad1.addColorStop(0.5, 'rgba(0, 229, 153, 0.05)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Emerald Nebula Bottom-Left
      const grad2 = ctx.createRadialGradient(width * 0.15 + mouseX * 0.8, height * 0.85 + mouseY * 0.8, 30, width * 0.15, height * 0.85, width * 0.55);
      grad2.addColorStop(0, 'rgba(0, 229, 153, 0.12)');
      grad2.addColorStop(0.6, 'rgba(30, 27, 75, 0.08)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Cobalt Indigo Pulse Center
      const pulseSize = width * 0.4 + Math.sin(time) * 30;
      const grad3 = ctx.createRadialGradient(cx, cy, 10, cx, cy, pulseSize);
      grad3.addColorStop(0, 'rgba(99, 102, 241, 0.06)');
      grad3.addColorStop(1, 'transparent');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      const fov = 450;

      // 3. Render Floating 3D Wireframe Meshes
      for (const mesh of meshes) {
        mesh.rx += mesh.drx;
        mesh.ry += mesh.dry;
        mesh.rz += mesh.drz;

        const projectedPts = mesh.vertices.map(v => rotateAndProject(v, mesh, mouseX * 0.6, mouseY * 0.6, fov, cx, cy));

        ctx.strokeStyle = mesh.color;
        ctx.lineWidth = 1.3;
        ctx.shadowColor = mesh.color;
        ctx.shadowBlur = 8;

        for (const edge of mesh.edges) {
          const p1 = projectedPts[edge.a];
          const p2 = projectedPts[edge.b];

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }

        // Draw glowing vertex nodes
        for (const pt of projectedPts) {
          ctx.fillStyle = mesh.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.5 * pt.factor, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.shadowBlur = 0; // Reset blur
      }

      // 4. Update & Render Constellation Particles & Cyber Threads
      const projParticles = particles.map(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Bounce bounds
        if (Math.abs(p.x) > width * 0.9) p.vx *= -1;
        if (Math.abs(p.y) > height * 0.9) p.vy *= -1;
        if (p.z < -100 || p.z > 400) p.vz *= -1;

        const wx = p.x + mouseX * 0.3;
        const wy = p.y + mouseY * 0.3;
        const wz = p.z + 400;
        const factor = fov / Math.max(1, wz);

        return {
          px: cx + wx * factor,
          py: cy + wy * factor,
          z: p.z,
          radius: p.radius * factor,
          color: p.color
        };
      });

      // Connect nearby particles with glowing cyber threads
      const thresholdSq = 160 * 160;
      for (let i = 0; i < projParticles.length; i++) {
        const p1 = projParticles[i];

        // Draw Particle Dot
        ctx.fillStyle = p1.color + '0.8)';
        ctx.beginPath();
        ctx.arc(p1.px, p1.py, Math.max(0.8, p1.radius), 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < projParticles.length; j++) {
          const p2 = projParticles[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const distSq = dx * dx + dy * dy;

          if (distSq < thresholdSq) {
            const alpha = (1 - distSq / thresholdSq) * 0.25;
            ctx.strokeStyle = p1.color + alpha + ')';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block'
      }}
    />
  );
};
