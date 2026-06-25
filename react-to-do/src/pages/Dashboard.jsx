import React, { useState, useEffect } from "react";

import LeftNavBar from './../components/LeftNavBar.jsx'
import Card from "./../components/Card.jsx";
import MyTasks from "../components/MyTasks.jsx";
import TaskDetail from "../components/TaskDetail.jsx";

export default function Dashboard() {



    return (
        <div className="dashboard flex flex-col items-center justify-center  w-full h-screen bg-[var(--bg-secondary)] overflow-y-auto" >
         
            <div className="toppart bg-[var(--code-bg)] w-full h-[100px] flex items-center justify-between px-4 md:px-8 py-4 rounded shadow">
                <div className="searchbar">
                    <input type="text" placeholder="Search..." />
                </div>              
                <div className="filter">
                    <button>Filter</button>
                </div>
            </div>

            <div className="content display flex w-full h-[911px] h-screen bg-[var(--bg-secondary)] rounded shadow ">
                
                <LeftNavBar />
                <MyTasks />  
                <TaskDetail />
            </div>
        </div>

    );
}