import { llmService } from '../services/llmService';
import { LLMRequest, LLMResponse } from '../types';

/**
 * Controller for handling LLM-related operations
 * Following MVC pattern - this acts as the controller layer
 */
class LLMController {
  /**
   * Process a user prompt and get LLM response
   * @param prompt - User's input prompt
   * @param options - Optional parameters for the LLM
   * @returns Promise with the LLM response
   */
  async processPrompt(
    prompt: string,
    options?: Partial<LLMRequest>
  ): Promise<LLMResponse> {
    // Validate input
    if (!prompt || prompt.trim().length === 0) {
      throw new Error('Prompt cannot be empty');
    }

    // Check if service is configured
    if (!llmService.isConfigured()) {
      throw new Error('LLM service is not properly configured. Please check your API key and URL.');
    }

    // Prepare request
    const request: LLMRequest = {
      prompt: prompt.trim(),
      model: options?.model,
      maxTokens: options?.maxTokens,
      temperature: options?.temperature,
    };

    // Call service
    try {
      const response = await llmService.generateCompletion(request);
      return response;
    } catch (error) {
      console.error('Error processing prompt:', error);
      throw error;
    }
  }

  /**
   * Check if the LLM service is available
   */
  checkServiceStatus(): boolean {
    return llmService.isConfigured();
  }
}

// Export singleton instance
export const llmController = new LLMController();
export default llmController;
