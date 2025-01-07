# Simple Kanban Board

A simple Kanban board application that allows users to manage tasks visually using lists and cards.

## Live Demo:-

[Live Demo](https://kanban-board-iwl2.vercel.app/) - https://kanban-board-iwl2.vercel.app/

## Tech Stack

- React JS
- Node JS
- Express JS
- MongoDB

## Run Locally

1. Clone the project

```bash
git clone https://github.com/ichukekar/kanban-board
```

2. Go to the project directory

```bash
cd kanban_board
```

3. Install dependencies and start respectively:

   i) Go to the client folder and install packages then start

```bash
cd .. && cd client/
npm install
npm run dev
```

ii) Go to the backend folder and install packages then start

```bash
cd backend/
npm install
npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .backend env file

`MONGO_URI`

`JWT_SECRET`

## Note :

Change the backend URL to the `/frontend/src/api.js` directory

export const backendBaseURL = `http://localhost:${your_backend-port_number}`;
