# Mini Jira 🗂️

A full-stack Kanban board application inspired by Jira, built with React, TypeScript, Node.js, Express, and MongoDB.

🔗 **Live Demo:** [mini-jira-nine.vercel.app](https://mini-jira-nine.vercel.app)

<img width="1415" height="1003" alt="image" src="https://github.com/user-attachments/assets/94fe0877-a16b-491a-a902-03c725bf9e0f" />


---

## Features

- **Kanban Board** — Three-column board with Not Started, In Progress, and Done columns
- **Drag and Drop** — Drag tasks between columns to update their status instantly
- **Create Tasks** — Add tasks with a title, description, priority level, and due date
- **Edit Tasks** — Click any task card to open a detail page and edit all fields
- **Delete Tasks** — Remove tasks permanently from the board
- **Priority Badges** — Visual colour-coded badges for Low, Medium, and High priority
- **Persistent Data** — All tasks are saved to MongoDB and persist across sessions
- **Responsive Design** — Works on desktop and mobile

---

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM

### Backend
- Node.js
- Express
- TypeScript
- Mongoose
- MongoDB Atlas

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## Project Structure

```
mini-jira/
├── frontend/
│   └── src/
│       ├── api/
│       │   └── tasks.ts         # API layer — all fetch calls
│       ├── components/
│       │   ├── Board.tsx        # Kanban board container
│       │   └── Column.tsx       # Individual column with drag and drop
│       ├── pages/
│       │   └── TaskPage.tsx     # Task detail / edit page
│       ├── types.ts             # Shared TypeScript interfaces
│       └── App.tsx              # Routes
│
└── backend/
    └── src/
        ├── config/
        │   └── db.ts            # MongoDB connection
        ├── models/
        │   └── Task.ts          # Mongoose schema and model
        ├── routes/
        │   └── taskRoutes.ts    # REST API endpoints
        └── index.ts             # Express app entry point
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

