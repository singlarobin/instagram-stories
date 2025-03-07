# Instructions for setting up and running my application and tests.

## Installation
- Ensure you have the following installed before proceeding:
   - Node.js (Recommended: LTS version)
   - npm
- Clone the Repository
   - git clone <repo-url>
   - cd <your-project-folder>
- Install Dependencies
   - npm install
-  Start the Development Server
   - npm run dev
   - This will start the application, and you can access it at: http://localhost:5173


## Running Testing In Cypress
- Open Cypress Test Runner
  - npx cypress open
-  Run Cypress Tests in Headless Mode
  - npx cypress run


# A brief explanation of myr design choices, particularly how i optimized for performance and scalability

I designed the project with **performance and scalability** in mind by leveraging **Redux Toolkit** for efficient state management, minimizing unnecessary re-renders. **React Router** ensures seamless navigation, while **React Toastify** provides non-blocking notifications for a better user experience. Data fetching is handled using the **fetch API with async/await and error handling**, encapsulated in a **custom hook to improve reusability**. UI components are modularized in a separate folder for maintainability. **Framer Motion** enhances UI transitions smoothly without impacting performance, ensuring a fluid user experience. These choices collectively improve the app's **efficiency, maintainability, and scalability**.

