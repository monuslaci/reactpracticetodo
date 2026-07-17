import React from 'react'
import TaskDistribution from './../components/TaskDistribution.jsx'
import TaskDistributionList from './../components/TaskDistributionList.jsx'
import LeftNavBar from './../components/LeftNavBar.jsx'
import Box from './../components/Box.jsx'
import ChartBox from '../components/ChartBox.jsx'
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
            <div className="hidden lg:block">
                <LeftNavBar />
            </div>

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

                    <div className='sm:flex-col '>
                        <h1 className="text-left">Keep in touch coach</h1>

                        <div className='flex gap-4 my-5 lg:grid-cols-4 lg:gap-4 sm:grid-cols-2 sm:gap-4 grid grid-cols-1'>
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
                    <section className="my-7 flex flex-col gap-4 lg:h-[490px] lg:flex-row">
                        <div className="h-[460px]  w-full overflow-hidden rounded-[24px] bg-white lg:h-full lg:flex-1">
                            <ChartBox />
                        </div>

                        <div className="h-[500px] w-full overflow-hidden rounded-[24px] bg-white lg:h-full lg:w-[42%]">
                            <TaskDistribution />
                        </div>
                    </section>

                    <section className="mb-6 h-[500px] overflow-hidden rounded-[24px] bg-white">
                        <TaskDistributionList />
                    </section>



                </div>

            </div>


        </div>
    )
}

export default Dashboard