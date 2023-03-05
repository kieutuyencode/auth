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
}
export default function Shoe(props: ShoeProps) {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={0.7} />
      <Model
        edit={props?.edit}
        colors={props.colors}
        colorsTest={props.colorsTest}
      />
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
function Model(props: ShoeProps) {
  return (
    <>
      {props?.edit ? (
        <ModelShoe colors={props.colors} colorsTest={props.colorsTest} />
      ) : (
        <Float speed={4}>
          <ModelShoe colors={props.colors} colorsTest={props.colorsTest} />
        </Float>
      )}
    </>
  );
}
