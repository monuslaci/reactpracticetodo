import React, { useState, useEffect } from "react";
import { FaTachometerAlt , FaExclamation, FaTasks, FaCog, FaQuestionCircle, FaSignOutAlt  } from "react-icons/fa";
import Card from "./Card.jsx";

export default function MyTasks() {

return(
    <>  
    <div className="tasklist  w-[35%] h-[747px] bg-white ml-[60px] mt-[43px] bg-[var(--bg-secondary)] rounded shadow border-[var(--border)] ">
        <div className="tasklistheader flex flex-col text-left mt-3 ml-3 px-4 py-2 ">
            <div className="text-lg font-semibold justify-start text-[var(--text-h)]">My Tasks</div>
            <div className="flex justify-center mt-2">
                <Card />
            </div>
        </div>

    </div>
    </>
);
}