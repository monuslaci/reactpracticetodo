import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useMediaQuery } from "react-responsive";
import TaskDistribution from './../components/TaskDistribution.jsx'
import TaskDistributionList from './../components/TaskDistributionList.jsx'
import LeftNavBar from './../components/LeftNavBar.jsx'
import Box from './../components/Box.jsx'
import ChartBox from '../components/ChartBox.jsx'
import { boxItems } from "../params/params.js";

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const boxItemsDBData= [
        { title: "Total Projects", titleNumber:  25, changeNumber: 20 },
        { title: "In progress", titleNumber:  17, changeNumber: -15 },
        { title: "Completed", titleNumber:  32, changeNumber: 25 },
        { title: "On Hold", titleNumber:  3, changeNumber: 10 }
    ];


        const isSmallScreen = useMediaQuery({
        query: "(max-width: 1023px)"
        });

    return (
        <div className='flex h-screen overflow-hidden bg-[#F6F5F8]'>
            {/* ** Sidebar */}
            <div className="hidden lg:block">
                <LeftNavBar />
            </div>


            {/* Dashboard Layout */}
            <div className='flex-1 overflow-y-auto'>
                <div className='mx-auto w-full max-w-277.75 px-4'>
                    {isSmallScreen && (
                         
                        <div className="flex justify-start mt-4">
                            <button
                                type="button"
                                className="text-2xl"
                                onClick={() => setIsMenuOpen((current) => !current)}
                                aria-label="Toggle navigation menu"
                                aria-expanded={isMenuOpen}
                                >
                                {isMenuOpen ? <FaTimes /> : <FaBars />}
                            </button>
                                 {isMenuOpen && (
                                <div className="flex flex-col gap-3 px-4 pb-4 lg:hidden">
                                    <a
                                    href="/"
                                    className="border-b border-gray-100 py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                    >
                                    Home
                                    </a>
                                    </div>
                                            
                                        )}
                        </div>
                        
                    )}
                    {/* ** Search Section */}
                    <div className='flex h-14 my-8 items-center justify-between'>

                        {/* Search Input Field */}
                        <input className='h-8 px-4 bg-amber-100' placeholder='Search Something' />

                        {/* Icons */}
                        <div>Icons</div>

                    </div>

                    {/* Keep in touch  */}

                    <div className='sm:flex-col '>
                        <div className="text-left font-[var(--font-menu)] text-[24px] ">Keep in touch coach</div>

                        <div className='flex gap-4 my-5 xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-2 grid grid-cols-1'>
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