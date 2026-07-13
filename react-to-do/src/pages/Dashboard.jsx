import React from 'react'
import TaskDistribution from './../components/TaskDistribution.jsx'
import LeftNavBar from './../components/LeftNavBar.jsx'
import Box from './../components/Box.jsx'
import { boxItems } from "../params/params.js";

const Dashboard = () => {
const boxItemsDBData= [
    { title: "Total Projects", titleNumber:  25, changeNumber: 20 },
    { title: "In progress", titleNumber:  17, changeNumber: -15 },
    { title: "Completed", titleNumber:  32, changeNumber: 25 },
    { title: "On Hold", titleNumber:  3, changeNumber: 10 }
];

    return (
        <div className='flex h-screen overflow-hidden bg-[#F6F5F8]'>
            {/* ** Sidebar */}
            <LeftNavBar />

            {/* Dashboard Layout */}
            <div className='flex-1 overflow-y-auto'>
                <div className='mx-auto w-full max-w-277.75 px-4'>

                    {/* ** Search Section */}
                    <div className='flex h-14 my-8 items-center justify-between'>

                        {/* Search Input Field */}
                        <input className='h-8 px-4 bg-amber-100' placeholder='Search Something' />

                        {/* Icons */}
                        <div>Icons</div>

                    </div>

                    {/* Keep in touch  */}

                    <div>
                        <h1 className="text-left">Keep in touch coach</h1>

                        <div className='flex gap-4 my-5'>
                            {/* BOX */}
                            {
                                boxItems.map((item, index) => (
                                    boxItemsDBData.map((itemData, index) => (
                                       item.title === itemData.title && <Box key={index} icon={item.icon} title={item.title} text={item.text} titleNumber={itemData.titleNumber} changeNumber={itemData.changeNumber} />
                                    ))
                                

                                ))
                            }

                        </div>
                    </div>

                    {/* Charts  */}
                    <div className='flex sm:flex-row flex-col gap-2.5 my-7.5 h-auto sm:h-122.5'>
                        <div className='w-full  h-62.5 sm:h-full  rounded-[24px] bg-[#FFFFFF]' >Big Chart</div>
                        <div className='w-full sm:w-12/19 h-62.5 sm:h-full rounded-[24px] bg-[#FFFFFF]'>
                            <TaskDistribution  />
                        </div>
                    </div>

                    <div className='h-82.5  mb-6 rounded-[24px] bg-[#FFFFFF]'>Table</div>



                </div>

            </div>


        </div>
    )
}

export default Dashboard