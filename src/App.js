import { useRef, useEffect } from 'react'

function App() {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)

  useEffect(() => {
    console.log('useEffect Mount')
    const { current: canvas } = canvasRef
    ctxRef.current = canvas.getContext('2d')
  }, [])

  useEffect(() => {
    const { current: ctx } = ctxRef

    ctx.fillRect(25, 25, 100, 100)
    ctx.clearRect(45, 45, 60, 60)
    ctx.strokeRect(50, 50, 50, 50)
  })

  return (
    <div className="App">
      <canvas ref={canvasRef} width={500} height={500}>
        Canvas Is not Supported!
      </canvas>
    </div>
  );
}

export default App;
