import React, { useState, useEffect } from "react";
import { FaTachometerAlt , FaExclamation, FaTasks, FaCog, FaQuestionCircle, FaSignOutAlt, FaUsers, FaEnvelope, FaCalendarAlt, FaChartBar, FaLifeRing, FaFolder   } from "react-icons/fa";
import NavBarElement from "./NavBarElement.jsx";


export default function LeftNavBar() {
const [selectedItem, setSelectedItem] = useState("Dashboard");


return(
            <div className="hidden md:flex flex-col items-center h-screen w-73.25 bg-[#F6F5F8] text-[16px]  font-[var(--font-menu)] px-5 py-10">
                <div className="flex w-full flex-col text-left" >
                    <div className="flex" >
                        <div className="flex flex-col justify-between  text-left" >
                        <img src="/logo.svg" alt="Logo" className="w-10 h-10 mb-2" />
                    </div>
                    <span className="text-[20px] font-[var(--font-menu)] font-weight-[500] mt-2.5 ml-3">
                        FlowHive
                    </span>
                    </div>
 

                <div className="flex flex-col justify-between text-left " >
                    

            
                            <NavBarElement selectedItem={selectedItem} onItemClick={setSelectedItem} />

            
                    
                </div>
            </div>

                
            <div className="mt-auto w-full p-1">
                <div className="flex  bg-white rounded-full shadow-sm p-2">
                    <img
                        src="/user.png"
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                    />

                    <div className="ml-3">
                        <p className="text-sm font-semibold text-gray-800">
                            Hannah James
                        </p>
                        <p className="text-xs text-gray-500">
                            abc@example.com
                        </p>
                    </div>

                    <div className="ml-auto flex items-center gap-1 p-3.25">
                        <img src="/dot.svg" />
                        <img src="/dot.svg" />
                        <img src="/dot.svg" />
                    </div>
                </div>
            </div>
                
          
            </div>
    );

}