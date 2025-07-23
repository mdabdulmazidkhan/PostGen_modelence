import { modelenceService, type GeneratePostsParams } from './modelenceService';

export async function generatePosts(params: GeneratePostsParams): Promise<string[]> {
  const posts = await modelenceService.generatePosts(params);
  
  // Log the generation event
  await modelenceService.logPostGeneration({
    ...params,
    generatedCount: posts.length,
    timestamp: new Date().toISOString(),
  });

  // Save posts to MongoDB
  for (const post of posts) {
    await modelenceService.saveToMongoDB({
      content: post,
      platform: params.platform,
      tone: params.tone,
      topic: params.topic,
      characterCount: post.length,
    });
  }

  return posts;
}