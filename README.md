A full-stack web application designed to facilitate the submission and management of SME health check applications. The frontend is built with React and Tailwind CSS, while the backend utilizes NestJS and PostgreSQL.

🛠️ Features
Multi-step form with conditional rendering based on user input

File upload functionality with PDF validation

Form data persistence using PostgreSQL

Robust error handling and user feedback mechanisms

Modular and scalable codebase

🚀 Getting Started
Prerequisites
Node.js (v14 or higher)

npm or yarn

PostgreSQL

Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/gpd60to360/CrediLint.git
cd CrediLint
Install dependencies:

bash
Copy
Edit
# For the frontend
cd frontend
pnpm install

# For the backend
cd ../backend
npm install
Configure environment variables:
Create a .env file in the backend directory with the following content:

env
Copy
Edit
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
Run the application:

bash
Copy
Edit
# Start the backend server
cd backend

npm run start:dev

# Start the frontend development server

cd ../frontend

pnpm run dev
📁 Project Structure

