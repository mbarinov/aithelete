# 🏋️‍♂️ AIthelete

Welcome to **AIthelete**! This project is an AI Agent designed to create training plans. By providing detailed feedback and recommendations, it ensures that workout plans are effective, safe, and tailored to individual needs.

### 🛠️ Built With
- Next.js
- TypeScript 
- LangChain
- LangGraph

## 🚀 Demo
Check out the live demo: [AIthelete Demo](https://aithelete.vercel.app/)

## 🚀 Getting Started
To get a local copy up and running, follow these simple steps.

## 📂 Important Files

- [LangGraph Agent](src/lib/agent/index.ts) - The main agent that orchestrates generating and critiquing training plans.
- [Generate Node](src/lib/agent/generateTrainingPlan.ts) - The node that generates a training plan.
- [Critique Node](src/lib/agent/critiqueTrainingPlan.ts) - The node that critiques a training plan.
- [Prompts](src/lib/agent/nodes/prompts.ts) - The prompts used by the agent to generate and critique training plans.

### Prerequisites

Make sure you have the following installed:

- Node.js
- pnpm
- PostgreSQL
- OpenAI API Keys

### Installation

1. Clone the repo:
    ```bash
    git clone https://github.com/mbarinov/aithelete.git
    ```
2. Navigate to the project directory:
    ```bash
    cd aithelete
    ```
3. Install dependencies:
    ```bash
    pnpm install
    ```
4. Set up your environment variables by copying `.env.example` to `.env` and filling in the required values:
    ```bash
    cp .env.example .env
    ```
5. Push the Prisma schema to your database:
    ```bash
    npx prisma db push
    ```

### Running the Development Server

Start the development server:

```bash
pnpm dev
```
Open http://localhost:3000 with your browser to see the result.

### 📜 License
Distributed under the MIT License. See LICENSE for more information.  
### 🧑‍💻 Authors
- **Max Barinov** - [@mbarinov](https://maxbarinov.com)