import { useState, useRef, useEffect } from "react";
import { brainwaveSymbol } from "../assets";

const ChatAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Olá! Sou um assistente da K-Sec, especializado em Agentes de IA. Estou aqui para ajudar com dúvidas sobre a empresa ou como poderiamos te ajudar.", sender: "ai" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Define sessionId único por usuário
  useEffect(() => {
    if (!localStorage.getItem("sessionId")) {
      localStorage.setItem("sessionId", crypto.randomUUID());
    }
  }, []);
  const sessionId = localStorage.getItem("sessionId");

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => setIsButtonVisible(true), 300);
    } else {
      setIsButtonVisible(false);
      setTimeout(() => setIsOpen(true), 10);
    }
  };

  const callN8nAI = async (message) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://n8n.srv902763.hstgr.cloud/webhook/465cfe7d-4292-4ef8-914c-716854ce0568/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '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'
        },
        body: JSON.stringify({
          chatInput: message,
          timestamp: new Date().toISOString(),
          sessionId: sessionId // <-- ESSA É A CORREÇÃO PRINCIPAL
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 500) {
          throw new Error("Servidor indisponível. Tente novamente mais tarde.");
        }
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.output) {
        return data.output;
      } else if (typeof data === 'string') {
        return data.replace(/^\[|\]$/g, '');
      } else if (typeof data === 'object') {
        const jsonString = JSON.stringify(data);
        return jsonString.replace(/^\[|\]$/g, '');
      }

      return "Não entendi sua pergunta.";
    } catch (error) {
      console.error('API Error:', error);
      return `⚠️ ${error.message}`;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { text: userMessage, sender: "user" }]);
    setInputValue("");

    setMessages(prev => [...prev, { text: "Digitando...", sender: "ai" }]);

    try {
      const aiResponse = await callN8nAI(userMessage);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages.pop();
        return [...newMessages, { text: aiResponse, sender: "ai" }];
      });
    } catch (error) {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages.pop();
        return [...newMessages, {
          text: "Falha na comunicação. Por favor, tente novamente.",
          sender: "ai"
        }];
      });
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating button */}
      <button
        onClick={toggleChat}
        className={`w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-600 flex items-center justify-center shadow-lg transition-all duration-300 ${
          isButtonVisible && !isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          pointerEvents: isButtonVisible && !isOpen ? 'auto' : 'none'
        }}
      >
        <img
          src={brainwaveSymbol}
          alt="Chat Agent"
          className="w-5 h-5"
        />
      </button>

      {/* Chat container */}
      <div
        className={`fixed bottom-6 right-6 w-80 h-96 bg-n-8 rounded-lg shadow-xl flex flex-col border border-n-6 overflow-hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{
          transition: 'opacity 300ms ease, visibility 300ms ease'
        }}
      >
        <div className="bg-n-7 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={brainwaveSymbol}
              alt="AI Assistant"
              className="w-5 h-5 mr-2"
            />
            <span className="font-bold text-white text-sm">Assistente Virtual</span>
          </div>
          <button
            onClick={toggleChat}
            className="text-gray-400 hover:text-white text-xl"
          >
            ×
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs p-2 rounded-lg text-sm ${
                  msg.sender === 'ai'
                    ? 'bg-n-6 text-white rounded-bl-none'
                    : 'bg-purple-500 text-white rounded-br-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-3 border-t border-n-6">
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-n-7 text-white rounded-l-lg px-3 py-1 text-base focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-r-lg text-sm disabled:opacity-50"
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? '...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatAgent;
