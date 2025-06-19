from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
# Importa il tuo modello ML
# import your_ml_model 

app = FastAPI()

# Configura CORS per permettere le richieste da Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL del tuo frontend Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Machine Learning API is running"}

@app.post("/predict")
async def predict(params: dict):
    # Estrai i parametri
    # param1 = params.get("param1")
    # param2 = params.get("param2")
    
    # Esegui la tua logica di ML
    # result = your_ml_model.predict(param1, param2)
    
    # Per test, restituisci i parametri ricevuti
    return {
        "received_params": params,
        "prediction": "Risultato di esempio"  # Sostituisci con il vero risultato
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)