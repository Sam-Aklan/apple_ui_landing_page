import { Html } from '@react-three/drei'

const loader = () => {
  return (
    <Html>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="w-full h- full rounded-full">
          loading...
        </div>
      </div>
    </Html>
  )
}

export default loader