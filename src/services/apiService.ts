import { LanguageCode, QueryResult } from '../../shared/types';
import { resolveServiceQuery } from '../../shared/queryResolver';

class ApiService {
  /**
   * Submit text or voice query to the public-services knowledge engine
   */
  public async submitQuery(query: string, language: LanguageCode, isVoice: boolean = false): Promise<QueryResult> {
    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, language, isVoice }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      return await response.json();
    } catch {
      // Offline / standalone fallback directly executes matching engine
      return resolveServiceQuery(query, language);
    }
  }
}

export const apiService = new ApiService();
