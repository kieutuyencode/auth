import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
} from "@react-three/drei";
import ModelShoe from "./ModelShoe";
import { ModelShoeProps } from "./ModelShoe";

interface ShoeProps extends ModelShoeProps {
  edit?: boolean;
  modal?: boolean;
}
export default function Shoe(props: ShoeProps) {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      {props?.modal && <color attach="background" args={[1, 1, 1]} />}
      <ambientLight intensity={0.7} />
      {props?.edit ? (
        <ModelShoe colors={props.colors} colorsTest={props.colorsTest} />
      ) : (
        <Float speed={4}>
          <ModelShoe colors={props.colors} colorsTest={props.colorsTest} />
        </Float>
      )}
      <Environment preset="city" />
      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.25}
        scale={10}
        blur={1}
        far={0.8}
      />
      {props?.edit && <OrbitControls makeDefault />}
    </Canvas>
  );
}
