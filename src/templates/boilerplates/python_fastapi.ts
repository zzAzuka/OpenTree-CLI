const pythonFastApiTemplate = {
  folder: ["app", "app/routes"],

  name_and_content: {
    "app/main.py": `
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello FastAPI"}
`,

    "app/routes/health.py": `
from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def health():
    return {"status": "ok"}
`,

    "requirements.txt": `
fastapi
uvicorn
`,

    "run.py": `
import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.main:app", reload=True)
`,

    "README.md": "# FastAPI Backend"
  },

  dependencies: [
    "fastapi",
    "uvicorn"
  ],

  devDependencies: []
};

export { pythonFastApiTemplate };