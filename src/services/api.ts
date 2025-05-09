
// Mock backend API service

const API_BASE_URL = 'http://localhost:2900';

interface TextToSpeechResponse {
  audio_url: string;
}

interface SpeechToTextResponse {
  transcript: string;
}

export const textToSpeech = async (text: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data: TextToSpeechResponse = await response.json();
    return data.audio_url;
  } catch (error) {
    console.error('Error in textToSpeech:', error);
    return '';
  }
};

export const speechToText = async (audioBlob: Blob, id: string): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    const response = await fetch(`${API_BASE_URL}/api/stt/${id}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data: SpeechToTextResponse = await response.json();
    return data.transcript;
  } catch (error) {
    console.error('Error in speechToText:', error);
    return '';
  }
};

// WebSocket for real-time STT
export const connectSttWebSocket = (id: string, onMessage: (transcript: string) => void): WebSocket => {
  const ws = new WebSocket(`ws://localhost:2900/ws/stt/${id}`);
  
  ws.onopen = () => {
    console.log('WebSocket connected');
  };
  
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.transcript) {
        onMessage(data.transcript);
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  return ws;
};
