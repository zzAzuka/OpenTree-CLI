const expressTemplate = {
    folder: ["src"],
    name_and_content: {
        "src/app.js": `
const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use("/api", routes);

module.exports = app;
`,
        "src/server.js": `
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running!");
});
`
    }
}


export { expressTemplate };