import { useEffect, useRef } from 'react';
import Quagga from 'quagga';

function BarcodeScanner({ onDetected }) {
  const scannerRef = useRef(null);

  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: scannerRef.current,
        constraints: {
          facingMode: "environment"
        },
      },
      decoder: {
        readers: ["ean_reader", "ean_8_reader", "upc_reader", "upc_e_reader"]
      }
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((result) => {
      if (result.codeResult.code) {
        onDetected(result.codeResult.code);
      }
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div ref={scannerRef} className="relative w-full max-w-lg mx-auto h-64 overflow-hidden rounded-lg">
      <div className="absolute inset-0 border-2 border-blue-500 z-10 pointer-events-none"></div>
    </div>
  );
}

export default BarcodeScanner;