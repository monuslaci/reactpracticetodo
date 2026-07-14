import React, { useState, useEffect } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";



export default function Chart(props) {
    const data = [
        { name: "Low", tasks: 85 },
        { name: "Medium", tasks: 25 },
        { name: "High", tasks: 15 },
        { name: "Completed", tasks: 60 }
    ];

    return (
        <>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar
            dataKey="tasks"
            fill="#6D5DF6"
            radius={[8, 8, 0, 0]}
            />
        </BarChart>
        </ResponsiveContainer>
    </>
  );
}