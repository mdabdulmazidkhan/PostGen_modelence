import { Store, schema } from 'modelence/server';

export const dbPosts = new Store('posts', {
  schema: {
    userId: schema.userId(),
    content: schema.string(),
    platform: schema.string(),
    tone: schema.string(),
    topic: schema.string(),
    characterCount: schema.number(),
    createdAt: schema.date(),
  },
  indexes: [
    { key: { userId: 1, createdAt: -1 } },
    { key: { userId: 1, platform: 1 } },
  ],
});

export const dbFavorites = new Store('favorites', {
  schema: {
    userId: schema.userId(),
    content: schema.string(),
    platform: schema.string(),
    tone: schema.string(),
    topic: schema.string(),
    characterCount: schema.number(),
    createdAt: schema.date(),
  },
  indexes: [
    { key: { userId: 1, createdAt: -1 } },
  ],
});

export const dbSettings = new Store('settings', {
  schema: {
    userId: schema.userId(),
    defaultPlatform: schema.string(),
    defaultTone: schema.string(),
    autoSave: schema.boolean(),
    updatedAt: schema.date(),
  },
  indexes: [
    { key: { userId: 1 } },
  ],
});