const nodeExpressTsTemplate = {
  folder: ["src", "src/routes"],

  name_and_content: {
    "src/index.ts": `
import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express + TS");
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`,

    "src/routes/index.ts": `
import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default router;
`,

    "package.json": `
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
`,

    "tsconfig.json": `
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true
  }
}
`,

    "README.md": "# Express TypeScript API"
  },

  dependencies: [
    "express"
  ],

  devDependencies: [
    "typescript",
    "ts-node",
    "@types/node",
    "@types/express"
  ]
};

export { nodeExpressTsTemplate };