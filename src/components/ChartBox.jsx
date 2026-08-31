import BarChartComponent from './BarChartComponent.jsx'    



export default function ChartBox({ data }) {

    return (
        <>
        <div className="w-[90%]  h-[80%] m-6">
            <div className="flex flex-1 mb-5">
                <div className="flex flex-col items-start font-[var(--font-menu)]">
                    <span className="block text-[20px] font-[500]">Task Distribution & Activity</span>
                    <span className="block text-[14px] text-[var(--grey-text)]">Monitor task status in realtime</span>
                </div>  
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--color-nav-selected-icon-bg)] ml-auto">
                    <img src="/refresh.svg" alt="Refresh" className="w-9 h-9 text-white" />
                </div>
            </div>  
            <BarChartComponent data={data}>
            </BarChartComponent>
        </div>
   

 

        </>
  );
}
