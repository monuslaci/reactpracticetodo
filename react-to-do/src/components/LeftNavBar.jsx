import React, { useState, useEffect } from "react";
import { FaTachometerAlt , FaExclamation, FaTasks, FaCog, FaQuestionCircle, FaSignOutAlt, FaUsers, FaEnvelope, FaCalendarAlt, FaChartBar, FaLifeRing, FaFolder   } from "react-icons/fa";



export default function LeftNavBar() {

return(
            <div className="hidden md:flex flex-col items-center h-screen w-73.25 bg-[#F6F5F8] text-[16px]  font-[var(--font-menu)]">
                <div className="flex flex-col text-left w-[86.35%] bg-[#bff05d] " >

                    <div className="flex flex-col justify-between p-4 text-left" >
                        Logo
                    </div>

                <div className="flex flex-col justify-between text-left " >
                    <span className="uppercase text-[14px]">Navigation</span>
                    <div className="flex text-left p-1" >    
                            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center ">
                                <FaTachometerAlt className="text-gray-600 " />
                            </div>  
                        <span className="ml-2 inline mt-1">Dashboard</span>
                    </div>
                    <div className="flex text-left p-1" >    
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ">
                                <FaFolder className="text-gray-600" />
                            </div>  
                        <span className="ml-2 inline mt-1">Projects</span>
                    </div>
                    <div className="flex text-left p-1" >
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ">
                                <FaTasks className="text-gray-600" />
                            </div>  
                        <span className="ml-2 inline mt-1">Tasks</span>
                    </div>
             
                </div>

                  <div className="flex flex-col justify-between text-left" >
                    <span className="uppercase text-[14px]">Collaboration</span>
                    <div className="flex text-left p-1" >
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ">
                                <FaUsers className="text-gray-600" />
                            </div>  
                        <span className="ml-2 inline mt-1">Teams</span>
                    </div>
                    <div className="flex text-left p-1" >
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ">
                                <FaEnvelope className="text-gray-600" />
                            </div>  
                        <span className="ml-2 inline mt-1">Messages</span>
                    </div>
                    <div className="flex text-left p-1" >
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ">
                                <FaCalendarAlt className="text-gray-600" />
                            </div>  
                        <span className="ml-2 inline mt-1">Calendar</span>
                    </div>

          
                </div>

                  <div className="flex flex-col  justify-between  text-left" >
                    <span className="uppercase text-[14px]">Settings</span>
                      <div className="flex text-left p-1" >
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ">
                                <FaCog className="text-gray-600" />
                            </div>  
                        <span className="ml-2 inline mt-1">Reports</span>
                    </div>

                    <div className="flex text-left p-1" >
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ">
                                <FaChartBar className="text-gray-600" />
                            </div>  
                        <span className="ml-2 inline mt-1">Settings</span>
                    </div>

                    <div className="flex text-left p-1" >
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ">
                                <FaLifeRing className="text-gray-600" />
                            </div>  
                        <span className="ml-2 inline mt-1">Support</span>
                    </div>

                </div>
                    
                </div>
                
          
            </div>
    );

}