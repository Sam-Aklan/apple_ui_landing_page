import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei';
import * as THREE from 'three'
import Lights from './Light';
import Model from './iPhone';
import Loader from './Loader'
import { Suspense } from 'react';
interface Prop{
    index:number;
    groupRef:React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>|undefined>,
    gsapType:string,
    controlRef: React.MutableRefObject<React.Ref<THREE.Group<THREE.Object3DEventMap>> | undefined>,
    setRotation:React.Dispatch<React.SetStateAction<number>>,
    item:{
        title: string;
        color: string[];
        img: string;
    },
    size:string
}
const ModelView = ({
    index,
    groupRef,
    gsapType,
    controlRef,
    setRotation,
    item,
}:Prop) => {
  const targetVector = new THREE.Vector3().set(0,0,0)
  console.log('targeVector: ', targetVector)
  return (
    
    <View
    index={index}
    id={gsapType}
    className={`w-full h-full absolute ${ index === 2 ? 'right-[-100%]':''}`}>
        {/* Ambient light lights all the object equllay */}
        <ambientLight intensity={0.3}/>
        <PerspectiveCamera 
        makeDefault
        position={[0,0,4]}/>
        <Lights/>
        <OrbitControls makeDefault
        ref={()=>controlRef}
        enableZoom={false}
         enablePan={false}
         rotateSpeed={0.4}
         //@ts-expect-error nothing
         target={targetVector} 
         //@ts-expect-error nothing
         onEnd={()=> setRotation(controlRef?.current?.getAzimuthalAngle())}/>
        <group ref={()=>groupRef} name={`${index === 1?'small':'large'}`}
        position={[0,0,0]}>
        <Suspense fallback={<Loader/>}>
          <Model 
          scale={index===1?[15,15,15]:[17,17,17]}
          item={item}
          // size={size}
          />
        </Suspense>
        </group>
    </View>
  )
}

export default ModelView