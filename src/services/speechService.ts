import { LanguageCode } from '../../shared/types';

// SpeechRecognition type declarations for window
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

class SpeechService {
  private recognition: any = null;
  private isListening = false;
  private audioCtx: AudioContext | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.initRecognition();
  }

  private initRecognition() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
    }
  }

  public isSpeechRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  /**
   * Play subtle tone for mic start / stop using Web Audio API (zero external audio files)
   */
  public playFeedbackTone(type: 'start' | 'stop' | 'success') {
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
      if (!this.audioCtx) return;

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      const now = this.audioCtx.currentTime;

      if (type === 'start') {
        osc.frequency.setValueAtTime(440, now); // A4
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'stop') {
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(330, now + 0.15);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else {
        // Success chord
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch {
      // AudioContext unavailable or blocked by autoplay
    }
  }

  /**
   * Listen to user voice via Web Speech API
   */
  public startListening(
    langCode: LanguageCode,
    onInterim: (text: string) => void,
    onFinal: (text: string) => void,
    onError: (error: string) => void
  ): () => void {
    if (!this.recognition) {
      onError('Speech recognition not supported in this browser.');
      return () => {};
    }

    // Map language to BCP-47
    const langMap: Record<LanguageCode, string> = {
      hi: 'hi-IN',
      en: 'en-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      bn: 'bn-IN',
      mr: 'mr-IN',
      kn: 'kn-IN',
      gu: 'gu-IN',
    };

    this.recognition.lang = langMap[langCode] || 'hi-IN';
    this.isListening = true;
    this.playFeedbackTone('start');

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (interimTranscript) {
        onInterim(interimTranscript);
      }
      if (finalTranscript) {
        this.playFeedbackTone('stop');
        this.isListening = false;
        onFinal(finalTranscript);
      }
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      this.playFeedbackTone('stop');
      onError(event.error || 'Voice input interrupted');
    };

    this.recognition.onend = () => {
      if (this.isListening) {
        this.isListening = false;
        this.playFeedbackTone('stop');
      }
    };

    try {
      this.recognition.start();
    } catch (e) {
      onError('Could not activate microphone.');
    }

    return () => {
      this.stopListening();
    };
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      this.isListening = false;
      try {
        this.recognition.stop();
      } catch {}
      this.playFeedbackTone('stop');
    }
  }

  /**
   * Speak response aloud using SpeechSynthesis
   */
  public speak(
    text: string,
    langCode: LanguageCode,
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return;
    }

    this.stopSpeaking();

    const langMap: Record<LanguageCode, string> = {
      hi: 'hi-IN',
      en: 'en-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      bn: 'bn-IN',
      mr: 'mr-IN',
      kn: 'kn-IN',
      gu: 'gu-IN',
    };

    const cleanText = text.replace(/[*#_~`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = langMap[langCode] || 'hi-IN';
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.0;

    // Pick best matching voice if available
    const voices = window.speechSynthesis.getVoices();
    const targetLang = langMap[langCode] || 'hi-IN';
    const voice = voices.find(v => v.lang === targetLang) || voices.find(v => v.lang.startsWith(langCode));
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    if (typeof window === 'undefined' || !window.speechSynthesis) return false;
    return window.speechSynthesis.speaking;
  }
}

export const speechService = new SpeechService();
