import axios, { AxiosInstance } from 'axios';
import { LLMRequest, LLMResponse } from '../types';

class LLMService {
  private client: AxiosInstance;
  private apiKey: string;
  private baseURL: string;

  constructor() {
    // These would typically come from environment variables
    this.apiKey = import.meta.env.VITE_LLM_API_KEY || '';
    this.baseURL = import.meta.env.VITE_LLM_API_URL || 'https://api.openai.com/v1';
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      timeout: 30000,
    });
  }

  /**
   * Send a prompt to the LLM provider
   * @param request - The LLM request containing the prompt and optional parameters
   * @returns Promise with the LLM response
   */
  async generateCompletion(request: LLMRequest): Promise<LLMResponse> {
    try {
      const response = await this.client.post('/chat/completions', {
        model: request.model || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: request.prompt,
          },
        ],
        max_tokens: request.maxTokens || 1000,
        temperature: request.temperature || 0.7,
      });

      return {
        content: response.data.choices[0].message.content,
        model: response.data.model,
        usage: {
          promptTokens: response.data.usage.prompt_tokens,
          completionTokens: response.data.usage.completion_tokens,
          totalTokens: response.data.usage.total_tokens,
        },
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`LLM API Error: ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  }

  /**
   * Check if the service is properly configured
   */
  isConfigured(): boolean {
    return !!this.apiKey && !!this.baseURL;
  }
}

// Export a singleton instance
export const llmService = new LLMService();
export default llmService;
