const pythonFastApiTemplate = [
{
    folder: "app",
    name: "main.py",
    content: `
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello FastAPI"}
`
},
{
    folder: "app/routes",
    name: "health.py",
    content: `
from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def health():
    return {"status": "ok"}
`
},
{
    folder: "",
    name: "requirements.txt",
    content: `
fastapi
uvicorn
`
},
{
    folder: "",
    name: "run.py",
    content: `
import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.main:app", reload=True)
`
},
{
    folder: "",
    name: "README.md",
    content: "# FastAPI Backend"
}
]

export { pythonFastApiTemplate };