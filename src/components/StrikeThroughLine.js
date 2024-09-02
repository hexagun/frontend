import React, { useEffect, useRef }from 'react'
import { useFrame } from '@react-three/fiber';
import { useSelector } from 'react-redux'
import { EndGameReason } from '../endGameReason';

const StrikeThroughLine = () => {

    const lineRef = useRef();
    const is_won = useSelector((state) => state.endgame.reason === EndGameReason.GameWon);
    const winningLine = useSelector((state) => state.endgame.info.line);
    console.log(winningLine); 
    useEffect(() => {       
        console.log(winningLine); 
        if (winningLine && lineRef.current) {
            switch (winningLine)
            {
                case 'row1': 
                {                
                    lineRef.current.position.set(0, -1, .25); // Adjust Y position for row 1
                    lineRef.current.rotation.set(0, 0, 0); // Horizontal line
                    break;
                }
                case 'row2':
                {
                    lineRef.current.position.set(0, 0, .25); // Adjust Y position for row 2
                    lineRef.current.rotation.set(0, 0, 0); // Horizontal line
                    break;
                }
                case 'row3':
                {
                    lineRef.current.position.set(0, 1, .25); // Adjust Y position for row 3
                    lineRef.current.rotation.set(0, 0, 0); // Horizontal line
                    break;
                }
                case 'column1':
                {
                    lineRef.current.position.set(-1, 0, .25); // Adjust X position for column 1
                    lineRef.current.rotation.set(0, 0, Math.PI / 2); // Vertical line
                    break;
                }
                case 'column2': 
                {
                    lineRef.current.position.set(0, 0, .25); // Adjust X position for column 2
                    lineRef.current.rotation.set(0, 0, Math.PI / 2); // Vertical line
                    break;
                }
                case 'column3':
                {
                    lineRef.current.position.set(1, 0, .25); // Adjust X position for column 3
                    lineRef.current.rotation.set(0, 0, Math.PI / 2); // Vertical line
                    break;
                }
                case 'diagonal1':
                {
                    lineRef.current.position.set(0, 0, .25); // Adjust X,Y position for diagonal 1
                    lineRef.current.rotation.set(0, 0, (Math.PI) / 4); // Diagonal line
                    break;
                }
                case 'diagonal2':
                {
                    lineRef.current.position.set(0, 0, .25); // Adjust X,Y position for diagonal 2
                    lineRef.current.rotation.set(0, 0, -Math.PI / 4); // Diagonal line
                    break;
                }
                default:
                    console.log("error: there's no winning line...")
            }
        }
     } , [winningLine])

    useFrame(() => {
        if (lineRef.current && is_won) {        
            // Animate the scale or any other property to create the strike-through effect
            if (lineRef.current.scale.x < 3) {
                lineRef.current.scale.x += 0.2; // Increase scale to create the animation
            }
        }
      });

    return (
        <mesh ref={lineRef} scale={[0, 0.05, 0.01]}>
            <boxGeometry />
            <meshBasicMaterial color="white" />
        </mesh>
    );
}

export default StrikeThroughLine;