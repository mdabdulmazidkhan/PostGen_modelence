# AI Post Generator

Welcome to the **AI Post Generator**! 🚀

This project is your all-in-one solution for creating, managing, and saving social media posts with the power of AI. Whether you're a marketer, content creator, or just want to spice up your social feeds, this app helps you craft engaging posts for platforms like Twitter, Facebook, Instagram, LinkedIn, and TikTok in seconds.

---

## 🌟 Why Use AI Post Generator?

- **Save Time:** Instantly generate creative, platform-optimized posts—no more writer's block!
- **Consistency:** Maintain your style across all your social channels.
- **Customization:** Choose your platform, post length for tailored results.
- **Organization:** Keep track of your post history and favorites, and manage your content with ease.
- **Modern UI:** Enjoy a beautiful, responsive interface with dark/light mode support.

---

## ✨ Features at a Glance

- **AI-Powered Post Generation:** Just enter a topic, pick your platform and tone, and let the AI do the rest.
- **Multi-Platform Support:** Twitter/X, Facebook, Instagram, LinkedIn, TikTok, and more.
- **Customizable Tone & Length:** Professional, casual, funny, inspiring, educational, promotional, and more.
- **Favorites & History:** Save your best posts and revisit your entire generation history. Search and filter included!
- **User Settings:** Set your default platform, tone, and auto-save preferences for a personalized experience.
- **Dark/Light Theme:** Switch between dark and light modes to suit your style.
- **Export & Data Management:** Export your posts or clear your data anytime.
- **Analytics & Logging:** All actions are logged for insights and analytics (powered by Modelence/ElasticSearch).

---

## 🖼️ Getting Started (with Example Workflow) ( live web > postgenai.xyz )

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd PostGen_modelence/modelence postgenai
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```
   Open your browser and go to [http://localhost:5173](http://localhost:5173)

4. **Build for production:**
   ```sh
   npm run build
   npm start
   ```

---

## 🏄‍♂️ How It Works: A Typical User Journey

1. **Generate a Post:**
   - Enter a topic (e.g., "AI in Marketing").
   - Select your platform (e.g., Twitter), tone (e.g., Professional), and length (e.g., Medium).
   - Click **Generate**. The AI creates several unique posts for you!

   ![Post Generation Example](./docs/screenshots/generate.png)

2. **Review & Manage:**
   - Browse your generated posts. Copy, favorite, or export any post you like.
   - Use the **History** tab to see all your past generations. Search and filter by platform or keyword.
   - Mark your favorite posts for quick access in the **Favorites** tab.

   ![History Example](./docs/screenshots/history.png)
   ![Favorites Example](./docs/screenshots/favorites.png)

3. **Personalize:**
   - Visit the **Settings** tab to set your default platform and auto-save preferences.
   - Toggle between dark and light mode for a comfortable viewing experience.

   ![Settings Example](./docs/screenshots/settings.png)

---

## 🛠️ Tech Stack (What Powers This App?)

- **Frontend:** React, TypeScript, TailwindCSS for a modern, responsive UI.
- **Backend:** Modelence framework (Node.js, TypeScript) for robust API and data management.
- **AI Integration:** OpenAI GPT-4o, Google Gemini, and Modelence AI for content generation.
- **Database:** MongoDB (via Modelence) for storing posts, favorites, and settings.
- **Analytics:** ElasticSearch for logging and insights.
- **Other:** React Query, React Router, Lucide Icons for smooth navigation and visuals.

---

## 📁 Project Structure (What’s Where?)

```
modelence postgenai/
├── src/
│   ├── client/           # Frontend (pages, components, hooks)
│   ├── components/       # Shared React components
│   ├── services/         # AI and backend service integrations
│   ├── server/           # Backend (Modelence modules, DB)
│   ├── App.tsx           # Main React app
│   └── main.tsx          # Entry point
├── package.json          # Project metadata & dependencies
├── tailwind.config.js    # TailwindCSS config
├── vite.config.ts        # Vite build config
└── ...                   # Other configs
```

---

## 🤖 Under the Hood: AI & Backend Details

- **AI Generation:**
  - Prompts are crafted based on your input (topic, platform, tone, length).
  - Modelence orchestrates calls to OpenAI GPT-4o and Gemini. If one service fails, the app falls back to another, so you always get results.
- **Backend:**
  - Handles user data, post/favorite/history storage, and settings via MongoDB.
  - API endpoints for post generation, favorites, settings, and analytics logging.
  - ElasticSearch is used for logging and analytics.
- **Database Schemas:**
  - `posts`: Stores generated posts with metadata.
  - `favorites`: Stores user-favorited posts.
  - `settings`: Stores user preferences.

---

## 🛠️ Customization & Tips

- **Add New Platforms or Tones:**
  - Update the `platforms` and `tones` arrays in `PostGenerator.tsx` and backend prompt logic.
- **Change AI Model:**
  - Modify the provider/model in the backend (`index.ts` in server/post-generator).
- **Styling:**
  - Edit TailwindCSS classes or update `tailwind.config.js` for custom themes.
- **Authentication:**
  - Integrate with Modelence Auth or your preferred auth provider for user accounts.
- **Pro Tip:** Use the export feature to save your best posts for later campaigns!

---

## 🤝 Contributing

We welcome contributions from everyone! Here’s how you can help:

1. **Fork** the repository
2. **Create your feature branch:**
   ```sh
   git checkout -b feature/YourFeature
   ```
3. **Commit your changes:**
   ```sh
   git commit -am 'Add new feature'
   ```
4. **Push to the branch:**
   ```sh
   git push origin feature/YourFeature
   ```
5. **Open a Pull Request** and describe your changes

If you have ideas for new features, improvements, or bug fixes, please open an issue or start a discussion!

---



## 🙏 Acknowledgements

- [Modelence](https://modelence.com/) for the backend framework and AI orchestration
- [OpenAI](https://openai.com/) and [Google Gemini](https://ai.google.dev/gemini-api) for the AI models
- [React](https://react.dev/) and [TailwindCSS](https://tailwindcss.com/) for the frontend magic

