import React, { useEffect, useState } from "react";
import Image2 from "./image-2.png";

const Popup = ({ isOpen, onClose, title, content }) => {
  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      setBgOpacity(0);
      setTimeout(() => setBgOpacity(50), 10);
    } else {
      setBgOpacity(0);
      setTimeout(() => {
        document.body.classList.remove('overflow-hidden');
      }, 300);
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-300"
      style={{ backgroundColor: `rgba(0, 0, 0, ${bgOpacity/100})` }}
    >
      <div 
        className="relative bg-n-8 p-8 rounded-lg shadow-lg w-[1500px] max-h-[75vh] overflow-y-auto transform transition-all duration-300 flex"
        style={{
          opacity: bgOpacity/50,
          transform: `scale(${0.9 + (bgOpacity/500)})`
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold transition-colors duration-200 z-10"
        >
          &times;
        </button>

        {/* Seção da Imagem - Esconder abaixo de 1035px */}
        <div className="w-[40%] pr-8 flex-shrink-0 flex items-center justify-center hidden xl:flex">
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src={Image2} 
              alt="Automação com IA" 
              className="max-w-full max-h-[70vh] rounded-lg object-contain shadow-md"
            />
          </div>
        </div>

        {/* Seção do Texto - Ajustar largura quando imagem escondida */}
        <div className="xl:w-[60%] w-full pl-4 py-4 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-6 text-white">{title}</h2>
          
          <div className="text-gray-300 space-y-5 text-lg leading-relaxed">
            {content.map((paragraph, index) => (
              <p key={index}>
                {paragraph.startsWith('Diga ') ? (
                  <span className="italic text-white">{paragraph}</span>
                ) : paragraph === paragraph.toUpperCase() ? (
                  <strong className="text-white">{paragraph}</strong>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;