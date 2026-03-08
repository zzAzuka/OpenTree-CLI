import cliSelect from "cli-select";
import {reactViteTsTemplate} from "src/templates/react_ts";
import {nodeExpressTsTemplate} from "src/templates/node_express_ts";
import {pythonFastApiTemplate} from "src/templates/python_fastapi";

const cliOptions = async () => {
  const result = await cliSelect({
    values: ["Node + Express + TypeScript", "Python + FastAPI", "React + Vite + TypeScript", "Custom"],
  });
    console.log("Selected:", result.value);

    if (result.value == "Node + Express + TypeScript") {
        return nodeExpressTsTemplate;
    }
    else if (result.value == "Python + FastAPI") {
        return pythonFastApiTemplate;
    }
    else if (result.value == "React + Vite + TypeScript") {
        return reactViteTsTemplate;
    }
};

export { cliOptions };