import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Box,
  AlertCircle,
  Clipboard,
  ClipboardCheck,
} from "lucide-react";

const NotFound = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [boxPosition, setBoxPosition] = useState(0);
  const [showBox, setShowBox] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setShowBox(true);
    }, 500);

    const boxAnimation = setInterval(() => {
      setBoxPosition((prev) => (prev === 0 ? 1 : 0));
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(boxAnimation);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left content */}
              <div className="text-center lg:text-left">
                <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">
                  <span className="inline-block animate-bounce">4</span>
                  <span className="inline-block animate-bounce delay-75">
                    0
                  </span>
                  <span className="inline-block animate-bounce delay-150">
                    4
                  </span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
                  Inventory Item Not Found
                </h2>
                <p className="text-gray-600 mb-8 max-w-lg">
                  The inventory item or page you're looking for doesn't exist or
                  has been moved. Please check the reference number and try
                  again.
                </p>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Dashboard
                </button>
              </div>

              {/* Right content - animated warehouse/inventory graphics */}
              <div className="w-full max-w-md relative h-64">
                {/* Shelves */}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gray-200 rounded-lg shadow-inner border border-gray-300">
                  {/* Shelf dividers */}
                  <div className="absolute top-1/3 inset-x-0 h-0.5 bg-gray-300"></div>
                  <div className="absolute top-2/3 inset-x-0 h-0.5 bg-gray-300"></div>

                  {/* Shelf items */}
                  <div className="absolute top-1/6 left-1/4 transform -translate-x-1/2">
                    <Clipboard className="h-8 w-8 text-gray-500" />
                  </div>
                  <div className="absolute top-1/6 right-1/4 transform translate-x-1/2">
                    <ClipboardCheck className="h-8 w-8 text-green-500" />
                  </div>

                  {/* Middle shelf */}
                  <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                    <Box className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="absolute top-1/2 right-1/3 transform translate-x-1/2 -translate-y-1/2">
                    <Box className="h-8 w-8 text-yellow-500" />
                  </div>

                  {/* Bottom shelf */}
                  <div className="absolute bottom-4 left-1/3">
                    <Box className="h-8 w-8 text-red-500" />
                  </div>
                </div>

                {/* Animated search box */}
                {showBox && (
                  <div
                    className={`absolute transition-all duration-1000 ease-in-out
                                ${boxPosition === 0 ? "left-1/4" : "left-3/4"} 
                                top-1/4 transform -translate-x-1/2 -translate-y-1/2`}
                  >
                    <div className="relative">
                      <Box className="h-16 w-16 text-gray-700 animate-pulse" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-red-500 animate-ping" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Scanning light */}
                <div className="absolute h-full w-1 bg-blue-400 opacity-50 top-0 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
              </div>
            </div>

            {/* Additional helpful info */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                What can you do?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <p className="text-gray-700">
                    <span className="font-semibold">
                      Check the inventory ID
                    </span>{" "}
                    - Verify the item reference number is correct
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <p className="text-gray-700">
                    <span className="font-semibold">Search the catalog</span> -
                    Try using our search function to find the item
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white py-4 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          Inventory Ledger System &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
