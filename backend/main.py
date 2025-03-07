from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from transformers import ViTForImageClassification, ViTFeatureExtractor
from PIL import Image
import torch
import io

app = FastAPI()

# Enable CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production to specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the Vision Transformer model
model_name = "nateraw/vit-base-beans"
model = ViTForImageClassification.from_pretrained(model_name)
feature_extractor = ViTFeatureExtractor.from_pretrained(model_name)

@app.get("/")
def read_root():
    return {"message": "Leaf Disease Detection API is running!"}

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    # Read the uploaded image
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    # Preprocess the image
    inputs = feature_extractor(images=image, return_tensors="pt")

    # Run inference
    with torch.no_grad():
        outputs = model(**inputs)

    # Get softmax probabilities
    probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)[0]
    
    # Get the top prediction & confidence score
    predicted_label = probabilities.argmax().item()
    confidence = probabilities[predicted_label].item() * 100  # Convert to percentage

    # Get human-readable class name
    label_name = model.config.id2label.get(predicted_label, "Unknown Disease")

    # Filter out low-confidence classifications
    if confidence < 50:
        return {
            "filename": file.filename,
            "predicted_label": None,
            "disease": "Uncertain - Please upload a clear leaf image",
            "confidence": f"{confidence:.2f}%"
        }

    return {
        "filename": file.filename,
        "predicted_label": predicted_label,
        "disease": label_name,
        "confidence": f"{confidence:.2f}%"
    }