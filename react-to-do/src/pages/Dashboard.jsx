import React, { useState, useEffect } from "react";

import LeftNavBar from './../components/LeftNavBar.jsx'
import Card from "./../components/Card.jsx";
import MyTasks from "../components/MyTasks.jsx";

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

                <div className="taskdetail  w-[40%]  h-[747px] bg-white mt-[43px] ml-[20px] bg-[var(--bg-secondary)] rounded shadow border-[var(--border)]">
                    <h2>Task Detail</h2>
     
                </div>
            </div>
        </div>

    );
}