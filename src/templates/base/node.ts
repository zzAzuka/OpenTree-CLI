const nodeTemplate = {
    folder: [""],
    name_and_content: {
        "package.json" : `
{
  "name": "node-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "node src/index.ts"
  },
  "dependencies": {}
}
`,
".gitignore" : "",
"README.md" : "# Express TypeScript API"
    }
}


export { nodeTemplate };