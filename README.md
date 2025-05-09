# Dokkaebi Recruitment Hub

A modern AI-powered recruitment dashboard built with React, TypeScript, and Tailwind CSS, designed to streamline the hiring process with intelligent candidate management, job tracking, and AI-assisted communication.

![Dokkaebi Recruitment Hub](https://via.placeholder.com/800x400?text=Dokkaebi+Recruitment+Hub)

## Live Demo

Visit the application at [your-firebase-url.web.app](https://your-firebase-url.web.app)

## Features

- **Dashboard** - Visual analytics on recruitment metrics and key performance indicators
- **Candidate Management** - Track candidates through the recruitment pipeline with detailed profiles
- **Job Listings** - Create, manage, and publish job postings with analytics
- **Messaging** - Communicate with candidates directly through the platform
- **Calendar** - Schedule and manage interviews and recruitment events
- **AI Chatbot** - Powered by Groq API to assist recruiters and answer questions
- **Insights** - Advanced analytics and reporting on recruitment performance
- **Voice Features** - Text-to-speech and speech-to-text capabilities for accessibility

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Hosting**: Firebase Hosting
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **AI Integration**: Groq API
- **Voice Features**: React Speech Recognition and React Text-to-Speech
- **Charts & Visualization**: Recharts

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/dokkaebi-recruitment-hub.git
   cd dokkaebi-recruitment-hub
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GROQ_API_KEY=your_groq_api_key
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Deployment

The application is deployed on Firebase Hosting. To deploy your own instance:

1. Install Firebase CLI
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project
   ```bash
   firebase init
   ```

4. Build the application
   ```bash
   npm run build
   # or
   yarn build
   ```

5. Deploy to Firebase
   ```bash
   firebase deploy
   ```

## Key Pages and Features

- **Dashboard** - Overview of recruitment metrics with interactive charts
- **Candidates** - List and filter candidates, view detailed profiles
- **Jobs** - Create, edit, and manage job listings
- **Messages** - Communication hub with candidates
- **Calendar** - Schedule and manage recruitment events
- **AI Chatbot** - AI assistant for recruitment tasks and questions
- **Insights** - Advanced analytics and reporting
- **Voice Commands** - Use speech to navigate and control the application

## Voice Features

The application supports both text-to-speech and speech-to-text functionalities:

- **Text-to-Speech**: The system can read out notifications, candidate profiles, and job descriptions
- **Speech-to-Text**: Users can dictate messages, search queries, and navigate the app using voice commands

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Tailwind CSS and shadcn/ui for the UI components
- Supabase for authentication and database services
- Groq API for the chatbot functionality
- React Speech Recognition and React Text-to-Speech libraries
