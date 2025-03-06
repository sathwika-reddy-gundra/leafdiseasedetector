from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Leaf Disease Detection API is running!"}
