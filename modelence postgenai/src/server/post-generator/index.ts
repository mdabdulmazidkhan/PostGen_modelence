import { Module, ObjectId, UserInfo } from 'modelence/server';
import { generateText } from '@modelence/ai';
import { dbPosts, dbFavorites, dbSettings } from './db';
import { z } from 'zod';

export default new Module('postGenerator', {
  stores: [dbPosts, dbFavorites, dbSettings],
  queries: {
    async getPosts(args, { user: _user }) {
      const user = requireUser(_user);
      return dbPosts.fetch({ userId: new ObjectId(user.id) }, {
        sort: { createdAt: -1 },
      });
    },

    async getFavorites(args, { user: _user }) {
      const user = requireUser(_user);
      return dbFavorites.fetch({ userId: new ObjectId(user.id) }, {
        sort: { createdAt: -1 },
      });
    },

    async getSettings(args, { user: _user }) {
      const user = requireUser(_user);
      const settings = await dbSettings.findOne({ userId: new ObjectId(user.id) });
      
      if (!settings) {
        // Create default settings
        const defaultSettings = {
          userId: new ObjectId(user.id),
          defaultPlatform: 'twitter',
          defaultTone: 'professional',
          autoSave: true,
          updatedAt: new Date(),
        };
        await dbSettings.insertOne(defaultSettings);
        return defaultSettings;
      }
      
      return settings;
    },
  },

  mutations: {
    async generatePosts(args, { user: _user }) {
      const user = requireUser(_user);

      const { topic, platform, tone, length, count } = z.object({
        topic: z.string(),
        platform: z.string(),
        tone: z.string(),
        length: z.string(),
        count: z.number().min(1).max(10),
      }).parse(args);

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
        const response = await generateText({
          provider: 'openai',
          model: 'gpt-4o',
          messages: [{ role: 'user', content: prompt }],
        });

        // Parse the numbered posts
        const posts = response.text
          .split(/\d+\.\s/)
          .filter((post: string) => post.trim().length > 0)
          .map((post: string) => post.trim())
          .slice(0, count);

        const finalPosts = posts.length > 0 ? posts : [response.text.trim()];

        // Save posts to database
        const postsToSave = finalPosts.map(content => ({
          userId: new ObjectId(user.id),
          content,
          platform,
          tone,
          topic,
          characterCount: content.length,
          createdAt: new Date(),
        }));

        await dbPosts.insertMany(postsToSave);

        return finalPosts;
      } catch (error) {
        console.error('Error generating posts:', error);
        // Fallback posts in case of AI failure
        return Array.from({ length: count }, (_, i) => 
          `Generated post ${i + 1} about ${topic} for ${platform}. This is a ${tone} post with ${length} length. #${topic.replace(/\s+/g, '')} #SocialMedia`
        );
      }
    },

    async addToFavorites(args, { user: _user }) {
      const user = requireUser(_user);

      const { content, platform, tone, topic, characterCount } = z.object({
        content: z.string(),
        platform: z.string(),
        tone: z.string(),
        topic: z.string(),
        characterCount: z.number(),
      }).parse(args);

      // Check if already in favorites
      const existing = await dbFavorites.findOne({
        userId: new ObjectId(user.id),
        content,
      });

      if (existing) {
        throw new Error('Post already in favorites');
      }

      await dbFavorites.insertOne({
        userId: new ObjectId(user.id),
        content,
        platform,
        tone,
        topic,
        characterCount,
        createdAt: new Date(),
      });

      return { success: true };
    },

    async removeFromFavorites(args, { user: _user }) {
      const user = requireUser(_user);

      const { favoriteId } = z.object({
        favoriteId: z.string(),
      }).parse(args);

      await dbFavorites.deleteOne({
        _id: new ObjectId(favoriteId),
        userId: new ObjectId(user.id),
      });

      return { success: true };
    },

    async deletePost(args, { user: _user }) {
      const user = requireUser(_user);

      const { postId } = z.object({
        postId: z.string(),
      }).parse(args);

      await dbPosts.deleteOne({
        _id: new ObjectId(postId),
        userId: new ObjectId(user.id),
      });

      return { success: true };
    },

    async updateSettings(args, { user: _user }) {
      const user = requireUser(_user);

      const { defaultPlatform, defaultTone, autoSave } = z.object({
        defaultPlatform: z.string(),
        defaultTone: z.string(),
        autoSave: z.boolean(),
      }).parse(args);

      await dbSettings.updateOne(
        { userId: new ObjectId(user.id) },
        {
          $set: {
            defaultPlatform,
            defaultTone,
            autoSave,
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );

      return { success: true };
    },

    async exportData(args, { user: _user }) {
      const user = requireUser(_user);

      const posts = await dbPosts.fetch({ userId: new ObjectId(user.id) });
      const favorites = await dbFavorites.fetch({ userId: new ObjectId(user.id) });
      const settings = await dbSettings.findOne({ userId: new ObjectId(user.id) });

      return {
        posts,
        favorites,
        settings,
        exportedAt: new Date().toISOString(),
      };
    },

    async clearData(args, { user: _user }) {
      const user = requireUser(_user);

      await Promise.all([
        dbPosts.deleteMany({ userId: new ObjectId(user.id) }),
        dbFavorites.deleteMany({ userId: new ObjectId(user.id) }),
        dbSettings.deleteMany({ userId: new ObjectId(user.id) }),
      ]);

      return { success: true };
    },
  },
});

function requireUser(user: UserInfo | null): UserInfo {
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}