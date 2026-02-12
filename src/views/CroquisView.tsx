import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Croquis from '../mockData/Croquis.json';
import logo from '/Logo.svg'
import Btn from '../components/Btn'
import useData from '../globalContext/useData';

type Rectangle = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type Bin = {
  bin_id: number;
  width: number;
  height: number;
  rectangles: Rectangle[];
  used_area: number;
  total_area: number;
  efficiency_percent: number;
};

type PackingData = {
  [algorithm: string]: Bin[];
};

// Función helper fuera del componente
const gcd = (a: number, b: number): number => {
  return b ? gcd(b, a % b) : a;
};

export default function CroquisView() {
  const idSelected = useData((state) => state.idSelected);

  const [allData] = useState<PackingData>(Croquis);
  const [currentAlgo, setCurrentAlgo] = useState<string>(() => {
    return Object.keys(Croquis).length > 0 ? Object.keys(Croquis)[0] : '';
  });
  const [showAll, setShowAll] = useState(false);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const navigate = useNavigate();

  const SCALE = 7.5;

  const setRoute = (route: string) => {
    navigate(route)
  }

  // Encontrar el algoritmo con menos contenedores
  const getMinContainers = useCallback(() => {
    return Math.min(...Object.values(allData).map(bins => bins.length));
  }, [allData]);

  // Filtrar algoritmos por número de contenedores
  const getFilteredAlgorithms = useCallback(() => {
    const minContainers = getMinContainers();
    const algorithms = Object.entries(allData);

    if (showAll) {
      return algorithms;
    }

    return algorithms.filter(([, bins]) => bins.length === minContainers);
  }, [allData, showAll, getMinContainers]);

  const decimalToMixedFraction = useCallback((decimal: number): string => {
    if (decimal === 0) return "0";
    const rounded = parseFloat(decimal.toFixed(4));
    const whole = Math.floor(rounded);
    const fraction = rounded - whole;

    if (fraction === 0) return whole.toString();

    const MAX_DEN = 64;
    let num = Math.round(fraction * MAX_DEN);
    let den = MAX_DEN;

    const d = gcd(num, den);
    num /= d;
    den /= d;

    return whole === 0 ? `${num}/${den}` : `${whole} ${num}/${den}`;
  }, []);

  const renderBins = useCallback(() => {
    const bins = allData[currentAlgo];
    if (!bins) return;

    bins.forEach((bin, index) => {
      const canvas = canvasRefs.current[index];
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = bin.width * SCALE;
      canvas.height = bin.height * SCALE;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bin.rectangles.forEach(rect => {
        const x = rect.x * SCALE;
        const y = rect.y * SCALE;
        const w = rect.width * SCALE;
        const h = rect.height * SCALE;

        ctx.fillStyle = "rgb(174, 197, 240)";
        ctx.fillRect(x, y, w, h);

        ctx.strokeStyle = "black";
        ctx.strokeRect(x, y, w, h);

        ctx.fillStyle = "black";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(rect.id, x + w / 2, y + 12);

        ctx.font = "bold 14px Arial";
        ctx.fillText(
          `Ancho: ${decimalToMixedFraction(rect.width)}"`,
          x + w / 2,
          y + h / 2
        );
        ctx.fillText(
          `Alto: ${decimalToMixedFraction(rect.height)}"`,
          x + w / 2,
          y + h / 2 + 18
        );
      });
    });
  }, [allData, currentAlgo, SCALE, decimalToMixedFraction]);

  useEffect(() => {
    if (currentAlgo) {
      renderBins();
    }
  }, [currentAlgo, renderBins]);

  useEffect(() => {
    if (idSelected < 0) {
      navigate('/')
    }
  }, [idSelected, navigate])

  const handlePrint = () => {
    window.print();
  };


  const filteredAlgorithms = getFilteredAlgorithms();
  const hiddenCount = Object.keys(allData).length - filteredAlgorithms.length;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className='flex justify-between p-5'>
        <div className="flex items-center gap-7">
          <h1 className="text-[36px] font-bold">Croquis</h1>
          <img src={logo} className='w-12 h-12' alt="Logo" />
        </div>

        <div className='flex gap-5'>
          <div onClick={() => setRoute('/')}>
            <Btn label={'Ver Ordenes'} />
          </div>
          <div onClick={() => setRoute('/editar-desglose')}>
            <Btn label={'Editar Desglose'} />
          </div>
          <div onClick={() => setRoute('/ver-desglose')}>
            <Btn label={'Ver Desglose'} />
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="mx-5 my-5 p-4 bg-[#eee] rounded-md text-center print:hidden">
        <h2 className="text-2xl font-bold mb-4">Visualización de Empaquetamiento</h2>

        <div className="flex justify-center gap-1 mb-4 flex-wrap" id="algo-buttons">
          {filteredAlgorithms.map(([algo, bins]) => (
            <button
              key={algo}
              onClick={() => setCurrentAlgo(algo)}
              className={`px-3 py-1.5 rounded border border-[#333] transition-colors ${currentAlgo === algo
                ? 'bg-[rgb(174,197,240)] font-bold'
                : 'bg-white hover:bg-gray-100'
                }`}
            >
              {algo} ({bins.length})
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Imprimir
          </button>

          {hiddenCount > 0 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              {showAll ? 'Ocultar algoritmos' : `Mostrar todos (${hiddenCount} ocultos)`}
            </button>
          )}
        </div>
      </div>

      {/* Contenedor de moldes en grid 3 columnas */}
      <div className="grid grid-cols-3 gap-6 px-5 pb-10" id="bins-container">
        {currentAlgo && allData[currentAlgo]?.map((bin, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Título del molde */}
            <div className="flex flex-col items-center font-bold text-base mt-4 mb-2">
              <span>Molde {index + 1}</span>
              <span className="text-sm font-normal">
                {decimalToMixedFraction(bin.width)} x {decimalToMixedFraction(bin.height)} (in)
              </span>
              <span className="text-sm font-normal">
                Eficiencia: {bin.efficiency_percent.toFixed(2)}%
              </span>
            </div>

            {/* Canvas */}
            <canvas
              ref={el => { canvasRefs.current[index] = el; }}
              className="border-2 border-[#333] bg-white"
            />
          </div>
        ))}
      </div>

      {/* Estilos para impresión */}
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 1cm;
          }

          body {
            background-color: rgb(174, 197, 240);
          }

          .print\\:hidden {
            display: none;
          }

          canvas {
            page-break-after: always;
          }
        }
      `}</style>
    </div>
  );
}