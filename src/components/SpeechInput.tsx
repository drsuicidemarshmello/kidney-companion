import React, { useState } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface SpeechInputProps {
  onTranscript: (text: string) => void;
}

export const SpeechInput: React.FC<SpeechInputProps> = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Try Chrome!');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const text = result[0].transcript;
      setTranscript(text);
      
      if (result.isFinal) {
        onTranscript(text);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const speakSummary = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-card rounded-2xl shadow-card border border-border/50">
      <button
        onClick={startListening}
        disabled={isListening}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
          isListening
            ? 'bg-danger animate-pulse'
            : 'bg-primary hover:bg-primary/90'
        } shadow-button`}
      >
        {isListening ? (
          <MicOff className="w-7 h-7 text-primary-foreground" />
        ) : (
          <Mic className="w-7 h-7 text-primary-foreground" />
        )}
      </button>

      <div className="text-center">
        <div className="text-sm font-medium">
          {isListening ? '🎤 Listening...' : 'Tap to log with voice'}
        </div>
        {transcript && (
          <div className="text-xs text-muted-foreground mt-1 max-w-xs">
            "{transcript}"
          </div>
        )}
      </div>

      <button
        onClick={() => speakSummary("Great job today! You've logged 7 drinks, good blood pressure, and one walk. Your kidney plant is looking healthy!")}
        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <Volume2 className="w-4 h-4" />
        <span>Read summary aloud</span>
      </button>
    </div>
  );
};
