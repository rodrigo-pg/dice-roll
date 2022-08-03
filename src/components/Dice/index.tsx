import { Button } from '@chakra-ui/react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface DiceTypes extends Partial<JSX.IntrinsicElements> {
    diceFace: number;
}

const sides = new Map<number, THREE.Vector3>();

sides.set(1, new THREE.Vector3(0, -Math.PI / 2, 0));
sides.set(2, new THREE.Vector3(0, Math.PI / 2, 0));
sides.set(3, new THREE.Vector3(Math.PI / 2, 0, 0));
sides.set(4, new THREE.Vector3(-Math.PI / 2, 0, 0));
sides.set(5, new THREE.Vector3(0, 0, 0));
sides.set(6, new THREE.Vector3(Math.PI, 0, 0));

const Dice:React.FC<DiceTypes> = ({
    diceFace
}) => {

    const [currentSide, setCurrentSide] = useState(1);
    const mesh = useRef<THREE.Mesh>(null!);

    const texture1 = useLoader(THREE.TextureLoader, 'textures/1.jpeg');
    const texture2 = useLoader(THREE.TextureLoader, 'textures/2.jpeg');
    const texture3 = useLoader(THREE.TextureLoader, 'textures/3.jpeg');
    const texture4 = useLoader(THREE.TextureLoader, 'textures/4.jpeg');
    const texture5 = useLoader(THREE.TextureLoader, 'textures/5.jpeg');
    const texture6 = useLoader(THREE.TextureLoader, 'textures/6.jpeg');

    useEffect(() => {
        setCurrentSide(diceFace);
    }, [diceFace])

    useFrame((state, delta) => {
        const sidePosition = sides.get(currentSide);
        const currentX = mesh.current.rotation.x;
        const currentY = mesh.current.rotation.y;
        const currentZ = mesh.current.rotation.z;

        if (currentX === sidePosition?.x && currentY === sidePosition?.y && currentZ === sidePosition?.z) return;

        const diffX = sidePosition!.x - currentX;
        const diffY = sidePosition!.y - currentY;
        const diffZ = sidePosition!.z - currentZ;

        if (diffX >= 0.1 || diffX <= -0.1) {
            mesh.current.rotation.x += diffX > 0 ? 0.1 : -0.1;
        } else {
            mesh.current.rotation.x += diffX
        }

        if (diffY >= 0.1 || diffY <= -0.1) {
            mesh.current.rotation.y += diffY > 0 ? 0.1 : -0.1;
        } else {
            mesh.current.rotation.y += diffY
        }

        if (diffZ >= 0.1 || diffZ <= -0.1) {
            mesh.current.rotation.z += diffZ > 0 ? 0.1 : -0.1;
        } else {
            mesh.current.rotation.z += diffZ
        }
    })

    return (
        <mesh ref={mesh}>
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
          <meshStandardMaterial map={texture1} attach="material-0" />
          <meshStandardMaterial map={texture2} attach="material-1" />
          <meshStandardMaterial map={texture3} attach="material-2" />
          <meshStandardMaterial map={texture4} attach="material-3" />
          <meshStandardMaterial map={texture5} attach="material-4" />
          <meshStandardMaterial map={texture6} attach="material-5" />
        </mesh>
    )
}

export { Dice };
