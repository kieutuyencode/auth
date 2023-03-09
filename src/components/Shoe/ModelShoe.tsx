import { useGLTF } from "@react-three/drei";

export interface Color {
  laces: string;
  mesh: string;
  caps: string;
  inner: string;
  sole: string;
  stripes: string;
  band: string;
  patch: string;
}
export interface ModelShoeProps {
  colors: Color;
  colorsTest: Color;
}
export default function ModelShoe({ colors, colorsTest }: ModelShoeProps) {
  const { nodes, materials } = useGLTF("shoe-draco.glb") as any;
  return (
    <group>
      <mesh
        geometry={nodes.shoe.geometry}
        material={materials.laces}
        material-color={colorsTest.laces || colors.laces}
      />
      <mesh
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
        material-color={colorsTest.mesh || colors.mesh}
      />
      <mesh
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
        material-color={colorsTest.caps || colors.caps}
      />
      <mesh
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
        material-color={colorsTest.inner || colors.inner}
      />
      <mesh
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
        material-color={colorsTest.sole || colors.sole}
      />
      <mesh
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
        material-color={colorsTest.stripes || colors.stripes}
      />
      <mesh
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
        material-color={colorsTest.band || colors.band}
      />
      <mesh
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
        material-color={colorsTest.patch || colors.patch}
      />
    </group>
  );
}
