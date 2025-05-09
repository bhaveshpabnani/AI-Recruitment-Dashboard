import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Volume2, StopCircle } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeech } from 'react-text-to-speech';
import Groq from 'groq-sdk';

// Access environment variable with VITE_ prefix
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
console.log('GROQ API Key available:', !!GROQ_API_KEY);

// Initialize Groq client
const groq = new Groq({ 
  apiKey: GROQ_API_KEY,
  dangerouslyAllowBrowser: true // Allow running in browser environment
});

// Define message role types
type MessageRole = 'user' | 'assistant' | 'system';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  isPlaying?: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI recruitment assistant. How can I help you today?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`); // Generate unique session ID
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(null);

  // Define recruitment-related voice commands
  const commands = [
    {
      command: 'Help me with *',
      callback: (topic: string) => {
        console.log(`Command detected: Help me with ${topic}`);
        setInputText(`Help me with ${topic}`);
      }
    },
    {
      command: 'I need information about *',
      callback: (topic: string) => {
        console.log(`Command detected: I need information about ${topic}`);
        setInputText(`I need information about ${topic}`);
      }
    },
    {
      command: 'Tell me about job opportunities',
      callback: () => {
        console.log('Command detected: Tell me about job opportunities');
        setInputText('Tell me about job opportunities');
      }
    },
    {
      command: 'Submit',
      callback: () => {
        console.log('Command detected: Submit');
        if (inputText.trim()) {
          handleSend();
        }
      },
      matchInterim: true
    },
    {
      command: 'Clear',
      callback: ({ resetTranscript }) => {
        console.log('Command detected: Clear');
        setInputText('');
        resetTranscript();
      },
      matchInterim: true
    }
  ];

  // Speech recognition setup
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition({ commands });

  // Speech synthesis for the latest bot message
  const { speechStatus, start: startSpeech, pause: pauseSpeech, stop: stopSpeech } = 
    useSpeech({ 
      text: messages.find(m => m.id === currentSpeakingId)?.content || '',
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0
    });

  // Log initial state and browser support
  useEffect(() => {
    console.log('Speech Recognition Support:', {
      browserSupportsSpeechRecognition,
      isMicrophoneAvailable
    });
  }, [browserSupportsSpeechRecognition, isMicrophoneAvailable]);

  // Log whenever listening state changes
  useEffect(() => {
    console.log('Listening state changed:', listening);
  }, [listening]);

  // Update input text when transcript changes
  useEffect(() => {
    console.log('Transcript changed:', transcript);
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update message playing status based on speech status
  useEffect(() => {
    if (currentSpeakingId) {
      setMessages(prev => prev.map(msg => 
        msg.id === currentSpeakingId 
          ? { ...msg, isPlaying: speechStatus === 'started' } 
          : msg
      ));
    }
  }, [speechStatus, currentSpeakingId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to get response from Groq
  const getGroqResponse = async (userMessage: string): Promise<string> => {
    try {
      console.log('Getting response from Groq API...');
      
      // Convert our message history to the format expected by Groq
      const messageHistory = messages.map(msg => ({
        role: (msg.type === 'user' ? 'user' : 'assistant') as MessageRole,
        content: msg.content
      }));
      
      // Add the new user message
      messageHistory.push({
        role: 'user' as MessageRole,
        content: userMessage
      });
      
      // Add type assertion to satisfy TypeScript
      const chatCompletion = await groq.chat.completions.create({
        messages: messageHistory as any, // Type assertion to bypass type checking
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stop: null
      });
      
      const response = chatCompletion.choices[0]?.message?.content || 
        "I'm sorry, I couldn't generate a response. Please try again.";
      
      console.log('Groq API response:', response);
      return response;
    } catch (error) {
      console.error('Error getting response from Groq:', error);
      return "I'm experiencing some technical difficulties. Please try again later.";
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (inputText.trim()) {
      // Stop listening if active
      if (listening) {
        console.log('Stopping listening before sending message');
        SpeechRecognition.stopListening();
      }
      
      // Stop any ongoing speech
      if (speechStatus === 'started') {
        stopSpeech();
        setCurrentSpeakingId(null);
      }
      
      setIsProcessing(true);
      
      const userInput = inputText;
      
      // Add user message
      const userMessageId = `user_${Date.now()}`;
      const userMessage: Message = {
        id: userMessageId,
        type: 'user',
        content: userInput
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      resetTranscript();
      
      try {
        // Get response from Groq API
        const botResponse = await getGroqResponse(userInput);
        
        const botMessageId = `bot_${Date.now()}`;
        const botMessage: Message = {
          id: botMessageId,
          type: 'bot',
          content: botResponse,
          isPlaying: false
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        // Set current speaking message and start speech
        setCurrentSpeakingId(botMessageId);
      } catch (error) {
        console.error('Error processing message:', error);
        // Add error message
        setMessages(prev => [...prev, {
          id: `error_${Date.now()}`,
          type: 'bot',
          content: 'Sorry, I encountered an error processing your request.'
        }]);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const startListening = async () => {
    try {
      console.log('Starting speech recognition...');
      resetTranscript();
      await SpeechRecognition.startListening({ 
        continuous: true, // Try continuous: true instead of false
        language: 'en-US'
      });
      console.log('Speech recognition started successfully');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  };

  const stopListening = () => {
    console.log('Stopping speech recognition...');
    console.log('Current transcript before stopping:', transcript);
    SpeechRecognition.stopListening();
    console.log('Speech recognition stopped');
    console.log('Current transcript after stopping:', transcript);
    
    // Add manual handling since the useEffect might not be triggered
    if (transcript) {
      console.log('Manually setting input text from transcript');
      setInputText(transcript);
    }
  };

  const toggleSpeech = (messageId: string) => {
    // If this message is already speaking
    if (currentSpeakingId === messageId) {
      if (speechStatus === 'started') {
        pauseSpeech();
      } else {
        startSpeech();
      }
    } else {
      // If another message is speaking, stop it first
      if (speechStatus === 'started') {
        stopSpeech();
      }
      
      // Set current speaking message and start speech
      setCurrentSpeakingId(messageId);
      // Speech will start automatically due to the useEffect dependency on currentSpeakingId
      setTimeout(() => startSpeech(), 50); // Small delay to ensure the text is updated
    }
  };

  // Show browser support message if speech recognition isn't supported
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="flex flex-col h-full bg-black/20 rounded-lg border border-white/10 p-4">
        <p className="text-white">
          Browser doesn't support speech recognition. Please try using Chrome or Edge.
        </p>
      </div>
    );
  }

  // Show microphone access message if microphone is not available
  if (isMicrophoneAvailable === false) {
    return (
      <div className="flex flex-col h-full bg-black/20 rounded-lg border border-white/10 p-4">
        <p className="text-white">
          Microphone access is required for speech recognition. Please allow microphone access in your browser settings.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black/20 rounded-lg border border-white/10">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-purple-600/70 text-white'
                  : 'bg-black/40 border border-white/10 text-white'
              }`}
            >
              <div className="flex flex-col">
                <div className="break-words">
                  {message.content}
                </div>
                
                {message.type === 'bot' && (
                  <div className="mt-2 flex justify-end">
                    <button 
                      onClick={() => toggleSpeech(message.id)}
                      className="text-gray-300 hover:text-white"
                    >
                      {message.isPlaying ? (
                        <StopCircle size={18} />
                      ) : (
                        <Volume2 size={18} />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-white/10 p-4">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button
            type="button"
            onClick={listening ? stopListening : startListening}
            disabled={isProcessing}
            className={`p-2 rounded-full transition-colors ${
              listening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-black/30 text-gray-300 hover:bg-black/50'
            }`}
            title={listening ? "Stop listening" : "Start listening"}
          >
            <Mic size={20} />
          </button>
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            disabled={isProcessing}
            className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
          
          <button
            type="submit"
            disabled={isProcessing || !inputText.trim()}
            className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </form>
        
        {listening && (
          <div className="mt-2 text-sm text-gray-400">
            Listening... Say something or click the microphone button to stop.
          </div>
        )}
        
        {transcript && (
          <div className="mt-2 text-sm text-gray-300">
            <strong>Current Transcript:</strong> {transcript}
          </div>
        )}
        
        <div className="mt-2 text-xs text-gray-500">
          Speech Recognition Status: {listening ? 'Active' : 'Inactive'}
          {transcript ? ` | Transcript Length: ${transcript.length}` : ' | No transcript'}
          {currentSpeakingId ? ` | TTS Status: ${speechStatus}` : ''}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
