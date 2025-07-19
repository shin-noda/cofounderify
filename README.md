# CoFounderify

CoFounderify is a platform designed to help entrepreneurs and innovators find co-founders and collaborators for their projects. Users can browse projects, create new ones, search by keywords, and view detailed project information. The app also features pages like About, Contact, Privacy Policy, Terms of Use, and an interactive project map.

## Features

- Browse and search projects  
- Create new projects with detailed roles and member counts  
- View individual project details  
- Responsive navigation with React Router  
- Project map visualization  
- Informational pages: About, Contact, Privacy Policy, Terms of Use  
- Firebase Firestore integration for real-time data syncing  
- Image uploads handled via Cloudinary (or similar service)  

## Tech Stack

- React with TypeScript  
- React Router for client-side routing  
- Firebase Firestore for backend data storage  
- Tailwind CSS for styling  
- Cloudinary (optional) for image hosting  
- Vite for build tooling  

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)  
- Firebase account and Firestore database  
- Cloudinary account (optional, for image uploads)  

### Installation

1. Clone the repo:

   git clone https://github.com/yourusername/cofounderify.git
   cd cofounderify

2. Install dependencies:

   npm install

3. Set up Firebase:

   - Create a Firebase project  
   - Enable Firestore  
   - Copy your Firebase config and place it in `src/lib/firebase.ts`  

4. (Optional) Configure Cloudinary or other image hosting service for project image uploads.

### Running Locally

npm run dev

Open http://localhost:5173 in your browser.

### Building for Production

npm run build
npm run preview

## Folder Structure

- `src/components/` - Reusable React components  
- `src/pages/` - Route components like Home, About, Contact, etc.  
- `src/types/` - TypeScript type definitions  
- `src/lib/firebase.ts` - Firebase config and initialization  
- `src/App.tsx` - Main app component with routing  

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

[MIT](LICENSE)

---

Made by Shin
