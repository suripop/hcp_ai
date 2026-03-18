import tempfile
import whisper
from openai import OpenAI
import io
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .agent import run_text

# os.environ["PATH"] += os.pathsep + r"C:\Pythonproject\core_project\ffmpeg\bin"
# whisper_model = whisper.load_model("base")
client = OpenAI(api_key="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")

USE_OPENAI = False

@api_view(["POST"])
def transcribe_voice(request):

    audio = request.FILES.get("audio")

    if not audio:
        return Response({"error": "Audio required"}, status=400)
    # return Response({"message": "Audio received"})
    
    # with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp:
    #     for chunk in audio.chunks():
    #         temp.write(chunk)
    #     audio_path = temp.name

    # result = whisper_model.transcribe(audio_path)

    if not USE_OPENAI:
        return Response({
            "text": "A Health Care Professional (HCP) is an individual who is trained, certified, and licensed to provide medical, preventive, therapeutic, "
            "or rehabilitative services to patients. HCPs play a crucial role in maintaining public health, diagnosing illnesses, administering treatment, "
            "managing chronic conditions, and educating individuals about health and wellness."
        })

    try:
        #convert django file to proper file-like object
        audio_file = io.BytesIO(audio.read())
        audio_file.name = "recording.webm" #important!

        transcript = client.audio.transcriptions.create(
            model="gpt-4o-mini-transcribe",
            file=audio_file
        )

        return Response({"text": transcript.text})   #transcript.text
    
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(["POST"])
def summarize_text(request):
    text = request.data.get("text") 
    if not text:
        return Response({"error": "Text required"}, status=400)
    
    if not USE_OPENAI:
        return Response({
            "summarize_text": "A Health Care Professional (HCP) is a trained and licensed individual who provides medical care and treatment to patients. "
            "They play an important role in diagnosing illnesses, managing health conditions, and promoting overall public health and wellness."
        })

    response_data = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Summarize the following discussion clearly"},
            {"role": "user", "content": text}
        ]
    )   

    return Response({
        "summarize_text": response_data.choices[0].message.content
    })

@api_view(["POST"])
def ai_process(request):
    user_message = request.data.get("text_message")

    result = graph.invoke({         #this is where real AI execution begins.
        "user_input": user_message,
        "extracted_data": {},
        "action": ""
    })

    return Response(result["extracted_data"])

def response_text(request):
    text = "Suriya"
    result = run_text(text)
    print("RESULT :", result)  #this will appear in terminal
