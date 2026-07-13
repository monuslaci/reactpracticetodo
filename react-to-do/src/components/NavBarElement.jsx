import React, { useState, useEffect } from "react";
import { navItems } from "../params/params.js";


export default function NavBarElement(props) {

 return (
    <>
      {Object.keys(navItems).map((section) => (
        <div key={section}>
          <span className="uppercase text-[14px] mt-2 block">
            {section}
          </span>

          {navItems[section].map((item) => {
            const isSelected = item.title === props.selectedItem;

            return (
              <div key={item.title} onClick={() => props.onItemClick(item.title)} className={`flex text-left p-1  rounded-full mt-2 ${  isSelected
                    ? "bg-[var(--color-nav-selected-bg)] text-white]"
                    : "bg-[var(--color-nav-bg)] text-[var(--color-nav-text)]"
                }`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${isSelected ? "bg-[var(--color-nav-selected-icon-bg)]" : "bg-gray-200"}`}>
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-5 h-5 text-white"
                  />
                </div>

                <span className="ml-2 mt-1">{item.title}</span>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}