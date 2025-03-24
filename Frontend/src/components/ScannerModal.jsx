import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BarcodeScanner from './BarcodeScanner';
import { FiX } from 'react-icons/fi';

function ScannerModal({ isOpen, onClose, onScan }) {
  const [scanning, setScanning] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const [scanHistory, setScanHistory] = useState(() => {
    const saved = localStorage.getItem("scanHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const handleDetected = async (code) => {
    // Avoid duplicate consecutive scans
    if (code === barcode) return;
  
    setBarcode(code);
    setIsLoading(true);
    setScanning(false);
  
    try {
      const response = await fetch(`http://localhost:5000/api/shoes/barcode/${code}`);
      const product = await response.json();
  
      if (product) {
        setProductInfo(product);
        // Add to scan history
        const newHistory = [
          { barcode: code, product: product },
          ...scanHistory.filter(item => item.barcode !== code).slice(0, 4)
        ];
        setScanHistory(newHistory);
        localStorage.setItem("scanHistory", JSON.stringify(newHistory));
      }
    } catch (error) {
      console.error('Error finding product:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const clearScanHistory = () => {
    setScanHistory([]);
    localStorage.removeItem("scanHistory");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Scan Barcode</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="mb-6">
              {scanning ? (
                <BarcodeScanner onDetected={handleDetected} />
              ) : (
                <button
                  onClick={() => setScanning(true)}
                  className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-red-900 transition-colors"
                >
                  Start Scanning
                </button>
              )}
            </div>

            {/* Results Section */}
            {(barcode || isLoading) && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold mb-3">Scan Results</h3>
                
                {isLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-3 text-gray-600">Looking up product...</span>
                  </div>
                ) : (
                  <div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 mb-4">
                      <p className="font-mono text-blue-800">{barcode}</p>
                    </div>
                    
                    {productInfo && (
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">{productInfo.name}</h4>
                          <span className="font-semibold text-primary">${productInfo.price}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{productInfo.description}</p>
                        <button
                          onClick={() => {
                            onScan(productInfo);
                            onClose();
                          }}
                          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-red-900 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Scan History Section */}
            {scanHistory.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Recent Scans</h3>
                  <button 
                    onClick={clearScanHistory}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Clear History
                  </button>
                </div>
                
                <div className="space-y-2">
                  {scanHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500 font-mono">{item.barcode}</p>
                      </div>
                      <span className="font-medium text-primary">${item.product.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ScannerModal; 