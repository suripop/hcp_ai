

export default function HcpStructureForm() {
    return (
        <>
        <div className="w-screen h-screen flex flex-col bg-gray-900">
            <div className="flex justify-start items-start px-5">
                <h2 className="text-white text-[25px] text-center">Log Interaction Form</h2>
            </div>
            <div className="w-[50%] h-full bg-gray-800 rounded-lg m-5">
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
                    <div className="p-2 mr-2 w-full">
                        <label className="text-white text-[15px] pl-5">Notes</label>
                        <textarea placeholder="Enter Notes" className="w-full p-2 m-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200" rows={4}></textarea>
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
}