import { FaMicrophone } from "react-icons/fa";
import { Bot } from 'lucide-react';
import { useRef, useState } from "react";
import axios from "axios";

export default function HcpStructureForm() {
    const [text, setText] = useState("");
    const [recording, setRecording] = useState(false);
    const recorderRef = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);  //here this mediarecorder listen to microphone stream.
        recorderRef.current = recorder;
        audioChunks.current = [];     //audiochunks will store recorded audio pieces.
        recorder.ondataavailable = (e) => {
            audioChunks.current.push(e.data);
        };
        recorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
            const formData = new FormData();
            formData.append("audio",audioBlob);
            const audio_data = await fetch("http://localhost:8000/api/transcribe/", {
                method: "POST",
                body: formData,
            });
            const data = await audio_data.json();
            console.log(data);
            //append transcribed text
            setText((prev) => prev + " " + data.text);
        };

        recorder.start();
        setRecording(true);
    };

    const endRecording = () => {
        recorderRef.current?.stop();
        setRecording(false);
    };

    const summarizeText = async () => {
        const summarizedata = await fetch("http://localhost:8000/api/summarize/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });

        const data = await summarizedata.json();
        setText(data.summarize_text);
    };

    const sendMessage = async (msg: string) => {
        const response_data = await axios.post("http://localhost:8000/ai-process", {
            text_message: msg
        });
    }

    return (
        <>
        <div className="flex justify-start items-start px-5 bg-gray-900">
            <h2 className="text-white text-[25px] text-center">Log Interaction Form</h2>
        </div>
        <div className="w-screen h-screen flex flex-row bg-gray-900 fixed">
            
            <div className="w-[50%] h-[90%] bg-gray-800 rounded-lg m-5 overflow-y-auto overflow-x-hidden">
                <div className="flex justify-start">
                    <div className="p-2 w-full">
                        <label className="text-white text-[15px] pl-5">HCP Name</label><br/>
                        <input type="text" placeholder="Enter Name" className="w-full p-2 m-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    </div>
                    <div className="p-2 w-full mr-2">
                        <label className="text-white text-[15px] pl-5">Interaction Type</label><br/>
                        <select className="w-full p-2 m-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200">
                            <option value="">Select</option>
                            <option value="call">Call</option>
                            <option value="email">Email</option>
                            <option value="meeting">Meeting</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-start">
                    <div className="p-2 w-full">
                        <label className="text-white text-[15px] pl-5">Date</label>
                        <input type="date" className="w-full p-2 m-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    </div>
                    <div className="p-2 mr-2 w-full">
                        <label className="text-white text-[15px] pl-5">Time</label>
                        <input type="time" className="w-full p-2 m-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    </div>
                </div>
                
                <div className="flex justify-start">
                    <div className="p-2 mr-2 w-full">
                        <label className="text-white text-[15px] pl-5">Attendees</label>
                        <input type="search" placeholder="Enter Names or Search" id="" name="" className="w-full p-2 m-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    </div>
                </div>

                <div className="flex justify-start">
                    <div className="relative p-2 mr-2 w-full">
                        <label className="text-white text-[15px] pl-5">Topics Discussed</label>
                        <textarea onChange={(e) => setText(e.target.value)} value={text} placeholder="Enter Key Discussion points..." className="w-full p-2 m-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200" rows={4}></textarea>
                        <button onClick={startRecording} className="absolute right-6 bottom-8 cursor-pointer text-gray-400"><FaMicrophone /></button>
                        <button onClick={endRecording} className="absolute right-0 bottom-7 cursor-pointer text-gray-400">⏹</button>
                    </div>
                </div>
                <div className="flex justify-start p-2 ml-3">
                    <button onClick={summarizeText} className="w-[50%] rounded-md bg-gray-600">Summarize from Voice Notes {`(Requires Consent)`}</button>
                </div>
                
                <section>
                <div className="flex justify-start">
                    <div className="relative p-2 mr-2 w-full">
                        <label className="text-white text-[15px] pl-5">Materials Shared / Sample Distributed</label>
                        <textarea className="w-full p-2 m-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="Search/Add Material" />
                        <input placeholder="Search/Add" type="search" className="absolute right-5 bottom-10 rounded-md bg-gray-700 text-white text-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    </div>
                </div>
                </section>

                <section>
                <div className="flex justify-start">
                    <div className="relative p-2 mr-2 w-full">
                        <label className="text-white text-[15px] pl-5">Add Sample</label>
                        <textarea className="w-full p-2 m-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="Add Sample" />
                        <input placeholder="Add Sample" className="absolute right-5 bottom-10 rounded-md bg-gray-700 text-white text-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    </div>
                </div>
                </section>

                <div className="flex justify-start">
                    <div className="p-2 mr-2">
                        <label className="text-white text-[15px] pl-5">Observed/Inferred HCP Sentiment</label>
                        <div className="flex p-2 gap-5 ml-3">
                        <input type="radio" name="hcp_sentiment" value="positive" />
                        <label className="text-white">Positive</label>
                        <input type="radio" name="hcp_sentiment" value="neutral" />
                        <label className="text-white">Neutral</label>
                        <input type="radio" name="hcp_sentiment" value="negative" />
                        <label className="text-white">Negative</label>
                        </div>
                    </div>
                </div>

                <div className="p-2 flex-col justify-start">
                    <label className="text-white text-[15px] pl-5">Outcomes</label>
                    <textarea className="w-full p-2 m-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200" 
                    placeholder="Key outcomes or agreements..." />
                </div>

                <div className="p-2 flex-col justify-start">
                    <label className="text-white text-[15px] pl-5">Follow-up Actions</label>
                    <textarea className="w-full p-2 m-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200" 
                    placeholder="Enter next steps or tasks..." />
                </div>

                <div className="p-2 flex-col justify-start">
                    <label className="text-white text-[15px] pl-5">AI Suggested Follow-ups:</label><br/>
                    <label className="text-white text-[15px] pl-8 cursor-pointer">+ Schedule follow-up meeting in 2 weeks</label><br/>
                    <label className="text-white text-[15px] pl-8 cursor-pointer">+ Send OncoBoost Phase ||| PDF</label><br/>
                    <label className="text-white text-[15px] pl-8 cursor-pointer">+ Add Dr.Suriya to advisory board invite list</label>
                </div>

                <div className="flex justify-center m-5">
                    <button type="submit" className="p-2 w-[15%] rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200">Submit</button>
                </div>
            </div>

            <div className="flex flex-col w-[50%] h-[90%] bg-gray-800 rounded-lg m-5">
                <div className="flex flex-col m-3 border-b-2 border-gray-600">
                    <div className="flex flex-row justify-start gap-2">
                    <Bot className="w-6 h-7 text-blue-500" />
                    <h4 className="text-white">AI Assistant</h4></div>
                    <div className="flex justify-start pb-2">
                    <p className="text-white">Log interaction via chat</p>
                    </div>
                </div>
                <div className="flex justify-start m-5 w-[50%]">
                    <p className="border rounded border-gray-600 p-2 text-white">
                        Log interaction details here {`(e.g.,`} "Met Dr. Smith, discussed Product X efficacy, positive sentiment, shared brochure"{`)`} or ask for help
                    </p>
                </div>

                <div className="flex flex-row m-2 gap-3 fixed left-[55%] right-[5%] bottom-[2%]">
                    <textarea placeholder="Describe interaction..." className="text-white pl-2 w-[80%] bg-gray-800 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        onKeyDown={(e) => {
                            if(e.key === "Enter" && !e.shiftKey){
                                e.preventDefault();
                                sendMessage((e.target as HTMLTextAreaElement).value);
                            }
                        }}
                    />
                    <button className="w-[20%] bg-gray-600 border rounded p-3 text-white border-gray-600">Log</button>
                </div>
            </div>

        </div>
        </>
    )
}