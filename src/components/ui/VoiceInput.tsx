'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  placeholder?: string;
  language?: string;
}

const LANGUAGES: Record<string, string> = {
  en: 'en-US',
  ta: 'ta-IN',
  te: 'te-IN',
  hi: 'hi-IN',
  kn: 'kn-IN',
};

export default function VoiceInput({
  onTranscript,
  placeholder = 'Speak or type...',
  language = 'ta',
}: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = LANGUAGES[language] || 'ta-IN';

    recognitionRef.current.onresult = (event: any) => {
      const results = Array.from(event.results as any);
      const lastResult = results[results.length - 1] as any;
      const text = lastResult?.[0]?.transcript || '';
      setTranscript(text);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      if (isListening) {
        recognitionRef.current?.start();
      }
    };

    return () => {
      recognitionRef.current?.stop();
    };
  }, [language, isListening]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      if (transcript) {
        onTranscript(transcript);
      }
    } else {
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSubmit = () => {
    if (transcript) {
      onTranscript(transcript);
      setTranscript('');
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="relative">
      <div className="flex gap-2">
        <input
          type="text"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <button
          onClick={toggleListening}
          disabled={isLoading}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
          }`}
          title={isListening ? 'Stop listening' : 'Start voice input'}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isListening ? (
            <MicOff className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </button>
        {transcript && (
          <button
            onClick={handleSubmit}
            className="px-4 py-3 gradient-bg text-white rounded-xl font-medium hover:opacity-90 transition"
          >
            Submit
          </button>
        )}
      </div>
      {isListening && (
        <div className="absolute -bottom-8 left-0 text-sm text-red-500 animate-pulse">
          Listening... Speak in {language.toUpperCase()}
        </div>
      )}
    </div>
  );
}
