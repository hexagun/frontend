// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber'

const scaleV = 1;
const widthV = 1;
const spacing = .1;

const TicTacToeGrid = () => {
  return (
    <>
    <mesh position={[-widthV - spacing, -widthV - spacing, 0]} scale={[scaleV, scaleV, .1]}>
      <boxGeometry />
      <meshStandardMaterial color="lightgrey" transparent />
    </mesh>
    <mesh position={[0, -widthV - spacing, 0]} scale={[scaleV, scaleV, .1]}>
      <boxGeometry />
      <meshStandardMaterial color="lightgrey" transparent />
    </mesh>
    <mesh position={[widthV + spacing, -widthV - spacing, 0]} scale={[scaleV, scaleV, .1]}>
      <boxGeometry />
      <meshStandardMaterial color="lightgrey" transparent />
    </mesh>
    <mesh position={[-widthV - spacing, 0, 0]} scale={[scaleV, scaleV, .1]}>
      <boxGeometry />
      <meshStandardMaterial color="lightgrey" transparent />
    </mesh>
    <mesh position={[0, 0, 0]} scale={[scaleV, scaleV, .1]}>
      <boxGeometry />
      <meshStandardMaterial color="lightgrey" transparent />
    </mesh>
    <mesh position={[widthV + spacing, 0, 0]} scale={[scaleV, scaleV, .1]}>
      <boxGeometry />
      <meshStandardMaterial color="lightgrey" transparent />
    </mesh>

    <mesh position={[-widthV - spacing, widthV + spacing, 0]} scale={[scaleV, scaleV, .1]}>
      <boxGeometry />
      <meshStandardMaterial color="lightgrey" transparent />
    </mesh>
    <mesh position={[0, widthV + spacing, 0]} scale={[scaleV, scaleV, .1]}>
      <boxGeometry />
      <meshStandardMaterial color="lightgrey" transparent />
    </mesh>
    <mesh position={[widthV + spacing, widthV + spacing, 0]} scale={[scaleV, scaleV, .1]}>
      <boxGeometry />
      <meshStandardMaterial color="lightgrey" transparent />
    </mesh>
    </> 
  )
}

const App = () => {
  return (
    <div id="canvas-container" style={{  "width": "90vw", "height": "90vh", "margin": "auto" }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight color="white" position={[0, 0, 100]} />
          <TicTacToeGrid></TicTacToeGrid>
        </Canvas>
      </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);