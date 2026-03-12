const reactViteTsTemplate = {
  folder: ["src"],

  name_and_content: {
    "src/main.tsx": `
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,

    "src/App.tsx": `
export default function App() {
  return <h1>Hello Vite + React</h1>;
}
`,

    "index.html": `
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,

    "package.json": `
{
  "name": "vite-react-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
`,

    "README.md": "# Vite React App"
  },

  dependencies: [
    "react",
    "react-dom"
  ],

  devDependencies: [
    "vite",
    "typescript",
    "@types/react",
    "@types/react-dom"
  ]
};

export { reactViteTsTemplate };