interface ModelenceConfig {
  elasticApiKey: string;
  elasticSearchEndpoint: string;
  geminiProjectId: string;
  mongodbUri: string;
}

interface GeneratePostsParams {
  topic: string;
  platform: string;
  tone: string;
  length: string;
  count: number;
}

class ModelenceService {
  private config: ModelenceConfig;

  constructor() {
    this.config = {
      elasticApiKey: 'Q3JvNkpKZ0JqamZrdGZxY2RtaXg6OC1oWmNWSm5TY21tUGFXdlJycWZPQQ==',
      elasticSearchEndpoint: 'https://modelence-tenants-cloud.es.us-west-2.aws.found.io',
      geminiProjectId: '938124619348',
      mongodbUri: 'mongodb+srv://postgen_dev-abdul_687bf6636d3fd6f15bfadc2a:afb3ce7b631904a1b4cb7d9067657ff5@tenants-local.z717d9x.mongodb.net/687bf6636d3fd6f15bfadc2a?retryWrites=true&w=majority'
    };
  }

  async generatePosts({
    topic,
    platform,
    tone,
    length,
    count,
  }: GeneratePostsParams): Promise<string[]> {
    const platformLimits: Record<string, number> = {
      twitter: 280,
      facebook: 2000,
      instagram: 2200,
      linkedin: 1300,
      tiktok: 150,
    };

    const lengthGuides: Record<string, string> = {
      short: 'Keep it concise and punchy',
      medium: 'Provide a good balance of detail and brevity',
      long: 'Include more detail and context',
    };

    const characterLimit = platformLimits[platform] || 280;
    const lengthGuide = lengthGuides[length] || 'medium length';

    const prompt = `Create ${count} engaging social media posts for ${platform} about "${topic}". 

Requirements:
- Tone: ${tone}
- Length: ${lengthGuide}
- Character limit: ${characterLimit} characters
- Each post should be unique and creative
- Include relevant hashtags when appropriate
- Make them engaging and shareable
- Ensure they fit the ${platform} audience and style

Please provide ${count} different variations, each on a new line, numbered 1., 2., etc.`;

    try {
      // Use Modelence framework for AI generation
      const response = await this.callModelenceAPI(prompt);
      
      if (!response || !response.content) {
        throw new Error('Invalid response from Modelence service');
      }

      // Parse the numbered posts
      const posts = response.content
        .split(/\d+\.\s/)
        .filter((post: string) => post.trim().length > 0)
        .map((post: string) => post.trim())
        .slice(0, count);

      return posts.length > 0 ? posts : [response.content.trim()];
    } catch (error) {
      console.error('Error generating posts with Modelence:', error);
      // Fallback posts in case of API failure
      return Array.from({ length: count }, (_, i) => 
        `Generated post ${i + 1} about ${topic} for ${platform}. This is a ${tone} post with ${length} length. #${topic.replace(/\s+/g, '')} #SocialMedia`
      );
    }
  }

  private async callModelenceAPI(prompt: string): Promise<{ content: string }> {
    try {
      // Modelence API call using the framework
      const response = await fetch('/api/modelence/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.elasticApiKey}`,
          'X-Project-ID': this.config.geminiProjectId,
        },
        body: JSON.stringify({
          prompt,
          model: 'gemini-1.5-flash',
          temperature: 0.7,
          maxTokens: 2048,
        }),
      });

      if (!response.ok) {
        // Fallback to direct Gemini API if Modelence endpoint is not available
        return await this.fallbackToGemini(prompt);
      }

      const data = await response.json();
      return { content: data.response || data.content || '' };
    } catch (error) {
      console.error('Modelence API error:', error);
      // Fallback to direct Gemini API
      return await this.fallbackToGemini(prompt);
    }
  }

  private async fallbackToGemini(prompt: string): Promise<{ content: string }> {
    const API_KEY = 'AIzaSyBTWPM9WjzjZ0rRQej1Y9qmenCE2a7lGaA';
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    return { content: data.candidates[0].content.parts[0].text };
  }

  async logPostGeneration(postData: any): Promise<void> {
    try {
      // Log to Elastic Search via Modelence
      await fetch('/api/modelence/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.elasticApiKey}`,
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          action: 'post_generation',
          data: postData,
          userId: 'anonymous', // Replace with actual user ID when auth is implemented
        }),
      });
    } catch (error) {
      console.error('Failed to log to Modelence:', error);
    }
  }

  async saveToMongoDB(postData: any): Promise<void> {
    try {
      // Save to MongoDB via Modelence
      await fetch('/api/modelence/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.elasticApiKey}`,
        },
        body: JSON.stringify({
          collection: 'generated_posts',
          data: {
            ...postData,
            createdAt: new Date().toISOString(),
            userId: 'anonymous', // Replace with actual user ID when auth is implemented
          },
        }),
      });
    } catch (error) {
      console.error('Failed to save to MongoDB via Modelence:', error);
    }
  }
}

export const modelenceService = new ModelenceService();
export { type GeneratePostsParams };