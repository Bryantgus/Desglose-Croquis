
export default function App() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  console.log(`Viewport: ${width}x${height}`);
  return (
    <div className="d:text-red-300">{width} {height}</div>
  )
}
