const reactViteTsTemplate = [
{
    folder: "src",
    name: "main.tsx",
    content: `
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
},
{
    folder: "src",
    name: "App.tsx",
    content: `
export default function App() {
  return <h1>Hello Vite + React</h1>;
}
`
},
{
    folder: "",
    name: "index.html",
    content: `
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
},
{
    folder: "",
    name: "package.json",
    content: `
{
  "name": "vite-react-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
`
},
{
    folder: "",
    name: "README.md",
    content: "# Vite React App"
}
]

export { reactViteTsTemplate };