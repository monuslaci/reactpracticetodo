import React, { useState, useEffect } from "react";
import BarChartComponent from './BarChartComponent.jsx'    



export default function ChartBox(props) {
    const data = [
        { name: "Jan", tasks: 500 },
        { name: "Feb", tasks: 1300 },
        { name: "Mar", tasks: 750 },
        { name: "Apr", tasks: 1800 },
        { name: "May", tasks: 1300 },
        { name: "Jun", tasks: 750 },
    ];

    return (
        <>
            <BarChartComponent data={data}>
            </BarChartComponent>
        </>
  );
}