from typing import TypedDict
from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq
from langchain_core.tools import tool
import json
import os

llm = ChatGroq(
    groq_api_key = os.getenv("GROQ_API_KEY"),
    model_name = "llama-3.1-8b-instant"
)

def run_text(text):
    response = llm.invoke(text)
    return response.content

class AgentState(TypedDict):
    user_input: str
    extracted_data: dict
    action: str

@tool
def extract_interaction(text: str):
    prompt = f"""
    Extract JSON fields:
    hcp_name, interaction_type, data, time,
    topics_discussed, sentiment,
    outcomes, follow_up_actions
    Text: {text}
    """
    response = llm.invoke(prompt)
    return json.loads(response.content)

