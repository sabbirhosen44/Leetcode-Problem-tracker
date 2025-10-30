# NeetCode 250 Problem Tracker

A full-stack web application to track your progress through the NeetCode 250 coding problems. Built with Next.js 14, TypeScript, Tailwind CSS, and MongoDB.

## Features

- **Problem Management**: Add, edit, and delete coding problems
- **Progress Tracking**: Mark problems as solved and track completion percentage
- **Categorization**: Organize problems by 18 different algorithm categories
- **Difficulty Levels**: Filter problems by Easy, Medium, and Hard
- **Summary Notes**: Add and manage notes for each problem
- **Statistics Dashboard**: View comprehensive statistics about your progress
- **Search & Filter**: Quickly find problems with powerful search and filtering
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Beautiful UI with Framer Motion animations

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **UI Components**: Lucide React icons
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS v4

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18+ and npm/yarn
- MongoDB account (or local MongoDB instance)

## Installation

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd neetcode-tracker
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install

# or

yarn install
\`\`\`

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add your MongoDB connection string:

\`\`\`env
MONGODB_URI="Your Mongodb uri string"
\`\`\`

### 4. Run the Development Server

\`\`\`bash
npm run dev

# or

yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Adding a Problem

1. Click the "Add Problem" button in the top right
2. Fill in the problem details:
   - **Problem Name**: The name of the coding problem
   - **Category**: Select from 18 algorithm categories
   - **Difficulty**: Choose Easy, Medium, or Hard
   - **LeetCode Number**: Optional LeetCode problem number
   - **Video URL**: Optional link to a tutorial video
   - **Summary Notes**: Add multiple notes about the problem
3. Click "Create" to save the problem

### Tracking Progress

- Click the circle icon next to a problem to mark it as solved
- Solved problems will show a green checkmark and strikethrough text
- The statistics dashboard updates automatically

### Filtering Problems

Use the filter bar to:

- **Search**: Find problems by name or category
- **Category**: Filter by algorithm category
- **Difficulty**: Filter by Easy, Medium, or Hard
- **Status**: Show all problems or only solved ones
- **Clear**: Reset all filters with one click

### Editing Problems

1. Click the edit icon (pencil) on any problem
2. Modify the details in the modal
3. Click "Update" to save changes

### Deleting Problems

1. Click the delete icon (trash) on any problem
2. Confirm the deletion in the popup

## API Endpoints

### Problems

- `GET /api/problems` - Fetch all problems
- `POST /api/problems` - Create a new problem
- `PUT /api/problems/[id]` - Update a problem
- `DELETE /api/problems/[id]` - Delete a problem

### Statistics

- `GET /api/stats` - Get comprehensive statistics

## Database Schema

### Problem Collection

\`\`\`typescript
{
category: String, // One of 18 categories
problemName: String, // Problem title
difficulty: String, // 'Easy', 'Medium', or 'Hard'
leetcodeNumber: String, // Optional LeetCode problem number
videoUrl: String, // Optional tutorial video link
summaryNotes: [
{
id: String,
content: String,
createdAt: Date
}
],
solved: Boolean, // Completion status
createdAt: Date, // Auto-generated
updatedAt: Date // Auto-generated
}
\`\`\`

## Categories

The application supports 18 algorithm categories:

1. Arrays & Hashing
2. Two Pointers
3. Sliding Window
4. Stack
5. Binary Search
6. Linked List
7. Trees
8. Tries
9. Heap/Priority Queue
10. Backtracking
11. Graphs
12. Advanced Graphs
13. 1-D DP
14. 2-D DP
15. Greedy
16. Intervals
17. Math & Geometry
18. Bit Manipulation

## Project Structure

\`\`\`
neetcode-tracker/
├── app/
│ ├── api/
│ │ ├── problems/
│ │ │ ├── route.ts # GET/POST problems
│ │ │ └── [id]/
│ │ │ └── route.ts # PUT/DELETE specific problem
│ │ └── stats/
│ │ └── route.ts # GET statistics
│ ├── layout.tsx
│ ├── globals.css
│ └── page.tsx # Main dashboard
├── components/
│ ├── filter-bar.tsx # Search and filter component
│ ├── problem-list.tsx # Problems list display
│ ├── problem-modal.tsx # Add/edit problem modal
│ └── stats-card.tsx # Statistics card component
├── lib/
│ ├── mongodb.ts # MongoDB connection
│ ├── models/
│ │ └── Problem.ts # Mongoose schema
│ └── types.ts # TypeScript types
├── .env.local # Environment variables
├── package.json
├── tsconfig.json
└── README.md
\`\`\`

## Development

### Running Tests

\`\`\`bash
npm run test
\`\`\`

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

### Code Quality

The project uses TypeScript for type safety and follows React best practices.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add the `MONGODB_URI` environment variable
5. Deploy

### Deploy to Other Platforms

The application can be deployed to any platform that supports Node.js:

- Heroku
- Railway
- Render
- AWS
- DigitalOcean

## Troubleshooting

### MongoDB Connection Issues

- Ensure your MongoDB URI is correct in `.env.local`
- Check that your IP address is whitelisted in MongoDB Atlas
- Verify that the database and collection exist

### Port Already in Use

If port 3000 is already in use, you can specify a different port:

\`\`\`bash
npm run dev -- -p 3001
\`\`\`

### Build Errors

Clear the `.next` folder and rebuild:

\`\`\`bash
rm -rf .next
npm run build
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Roadmap

- [ ] User authentication
- [ ] Sync across devices
- [ ] Problem difficulty recommendations
- [ ] Study schedule generator
- [ ] Community problem sharing
- [ ] Dark mode support
- [ ] Export progress reports

## Acknowledgments

- [NeetCode](https://neetcode.io) for the problem list
- [Next.js](https://nextjs.org) for the framework
- [MongoDB](https://www.mongodb.com) for the database
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Framer Motion](https://www.framer.com/motion) for animations
