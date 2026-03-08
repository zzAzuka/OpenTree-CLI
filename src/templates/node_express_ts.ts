const nodeExpressTsTemplate = [
{
    folder: "src",
    name: "index.ts",
    content: `
import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express + TS");
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`
},
{
    folder: "src/routes",
    name: "index.ts",
    content: `
import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default router;
`
},
{
    folder: "",
    name: "package.json",
    content: `
{
  "name": "express-ts-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "ts-node src/index.ts"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
`
},
{
    folder: "",
    name: "tsconfig.json",
    content: `
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true
  }
}
`
},
{
    folder: "",
    name: "README.md",
    content: "# Express TypeScript API"
}
]

export { nodeExpressTsTemplate };