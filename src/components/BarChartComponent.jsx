import React, { useState, useEffect } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";



export default function BarChartComponent(props) {


    return (
        <>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={props.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={false} />
            <Tooltip />
            {/* <Legend /> */}

            <Bar
            dataKey="tasks"
            fill="var(--chart-color)"
            radius={[8, 8, 0, 0]}
            />
        </BarChart>
        </ResponsiveContainer>
    </>
  );
}