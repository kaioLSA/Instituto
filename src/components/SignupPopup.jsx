import React, { useEffect, useState } from "react";
import { brainwaveSymbol } from "../assets";

const SignupPopup = ({ isOpen, onClose }) => {
  const [bgOpacity, setBgOpacity] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const showOnlySignup = windowWidth < 1200;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-300"
      style={{ backgroundColor: `rgba(0, 0, 0, ${bgOpacity/100})` }}
    >
      <div 
        className={`relative bg-n-8 p-8 rounded-lg shadow-lg ${showOnlySignup ? 'w-[90%] max-w-[500px]' : 'w-[90%] max-w-[1200px]'} max-h-[90vh] overflow-y-auto transform transition-all duration-300 flex ${showOnlySignup ? '' : 'flex-col lg:flex-row'}`}
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

        {/* Seção do Texto - Mostrar apenas em telas maiores que 1200px */}
        {!showOnlySignup && (
          <div className="w-full lg:w-[60%] pr-0 lg:pr-8 flex-shrink-0 flex flex-col justify-center mb-8 lg:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Junte-se à revolução da IA com a K - Sec</h2>
            
            <p className="text-gray-300 text-lg md:text-xl mb-8">
              Comece agora com a K-sec, Agentes de IA autônomos, hoje mesmo e revolucione a forma como você trabalha!
            </p>

            <div className="flex items-center mt-4">
              <img
                src={brainwaveSymbol}
                width={48}
                height={48}
                alt="brainwave"
                className="mr-4"
              />
              <span className="text-white text-xl md:text-2xl font-bold">Brainwave</span>
            </div>
          </div>
        )}

        {/* Seção do Conteúdo (Sign Up) - Sempre visível */}
        <div className={`${showOnlySignup ? 'w-full' : 'w-full lg:w-[40%]'} pl-0 lg:pl-8 py-4 ${showOnlySignup ? '' : 'border-t lg:border-t-0 lg:border-l border-n-6'}`}>
          <div className="bg-n-7 p-6 md:p-8 rounded-lg h-full flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-white">Descubra o poder da automação inteligente</h3>
            
            <div className="text-gray-300 space-y-4 mb-8 flex-grow">
              <p className="text-lg">
                Nossos agentes de IA executam tarefas complexas de forma autônoma, integrando-se perfeitamente ao seu fluxo de trabalho.
              </p>
              <p className="text-lg">
                Experimente grátis e veja como a K-sec pode aumentar sua produtividade, reduzir erros e liberar seu tempo para o que realmente importa.
              </p>
            </div>
            
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 mt-auto">
              Contate - Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPopup;