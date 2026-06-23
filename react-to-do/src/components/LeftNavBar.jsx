import React, { useState, useEffect } from "react";
import { FaTachometerAlt , FaExclamation, FaTasks, FaCog, FaQuestionCircle, FaSignOutAlt  } from "react-icons/fa";



export default function LeftNavBar() {

return(
    <>
    <div className="navbartop h-[33px] pr-0 ml-0  bg-[var(--bg-secondary)]">      
    </div>
    
    <div className="navbarlinks flex-1 flex-col relative h-[831px] pr-0 ml-0  bg-[var(--bg)] rounded shadow h-full ">
            <img src="/user.png" className="absolute  left-1/2 top-0  -translate-x-1/2  -translate-y-1/2 w-17 h-17  rounded-full  border-1  border-white object-cover" />    
            <div className="navbarcontent flex flex-col">
                    <div className="navbaruserdetails flex flex-col items-center justify-center  mt-[40px] mr-[20px] ml-[20px]">
                            <div className="name w-full flex items-center justify-center text-md text-[var(--color-white)]">
                                John Doe
                            </div> 
                            <div className="name w-full flex items-center justify-center text-[12px] text-[var(--color-white)]">
                                johndoe@gmail.com
                            </div> 
                        </div>

                        <div className="navbarlinks flex flex-col items-center justify-center gap-4 mt-[30px] mr-[20px] ml-[20px]">
                            <div className="link w-full h-[50px] bg-[var(--bg-secondary)] rounded  flex items-center justify-start text-[var(--bg)]">
                                <div className="content flex p-2">
                                    <FaTachometerAlt className="mr-2 mt-[5px]" />
                                    Dashboard
                                </div>

                            </div> 
        
                            <div className="link w-full h-[50px]  rounded  flex items-center justify-start text-[var(--color-white)]">
                                    <div className="content flex p-2">
                                        <FaExclamation className="mr-2 mt-[5px]" />
                                        Vital Tasks
                                    </div>
                            </div>

                            <div className="link w-full h-[50px] rounded  flex items-center justify-start text-[var(--color-white)]">
                                <div className="content flex p-2">
                                    <FaTasks className="mr-2 mt-[5px]" />
                                    My Tasks
                                </div>
                            </div> 

                            <div className="link w-full h-[50px] rounded  flex items-center justify-start text-[var(--color-white)]">
                                <div className="content flex p-2">
                                    <FaCog className="mr-2 mt-[5px]" />
                                    Settings
                                </div>
                            </div> 

                            <div className="link w-full h-[50px] rounded  flex items-center justify-start text-[var(--color-white)]">
                                <div className="content flex p-2">
                                    <FaQuestionCircle className="mr-2 mt-[5px]" />
                                    Help
                                </div>
                            </div> 
                        </div>
    
            </div> 
            
            <div className="navbarfooter flex flex-col  absolute bottom-0">
                <div className="link w-full h-[50px] rounded flex items-center justify-start ml-[20px] text-[var(--color-white)]">
                    <div className="content flex p-2">
                        <FaSignOutAlt className="mr-2 mt-[5px]" />
                            Logout
                    </div>
                </div> 
                
            </div>
            


    </div>
                    </>
    );

}