import React, { useState, useEffect } from "react";

export default function Card() {

    return (
    <>
        <div className="dashboard-card flex flex-col border-2 border-[var(--border)] rounded-2xl shadow  m-2 w-[365px] h-[134px] bg-[var(--bg-secondary)]">
            <div className="card-header  items-center flex justify-between text-[var(--text-h)] font-semibold text-lg pt-1 pl-6">
                Title
            </div>
            <div className="card-body flex">
                <div className="w-[70%] min-w-0 pl-6 pt-2">
                    <p className="text-[var(--text-h)] text-sm line-clamp-2 overflow-hidden">
                    Card body content goes here. This is where you can add details about the task, such as description, due date, priority, etc. You can also include buttons or links for actions related to the task, like editing or deleting it.
                    </p>
                </div>

                <div className="w-[30%] shrink-0">
                    <img src="/user.png" className="w-full h-[60px] rounded border border-white object-contain" />
                </div>
            </div>

            <div className="card-footer text-[12px] ml-2">
                Priority: Moderate, Status: In Progress, Created: 2024-06-30
            </div>
        </div>
    </>
    );

}