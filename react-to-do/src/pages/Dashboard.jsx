import { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useMediaQuery } from "react-responsive";
import TaskDistribution from './../components/TaskDistribution.jsx'
import TaskDistributionList from './../components/TaskDistributionList.jsx'
import LeftNavBar from './../components/LeftNavBar.jsx'
import Box from './../components/Box.jsx'
import ChartBox from '../components/ChartBox.jsx'
import { boxItems } from "../params/params.js";
import { getDashboardData } from "../api/dashboardApi.js";
import SearchBar from '../components/SearchBar.jsx';

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dashboardData, setDashboardData] = useState(null);
    const [dashboardError, setDashboardError] = useState(null);

    useEffect(() => {
        getDashboardData()
            .then(setDashboardData)
            .catch(setDashboardError);
    }, []);

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
                    <SearchBar />

                    {/* Keep in touch  */}

                    <div className='sm:flex-col '>
                        <div className="text-left font-[var(--font-menu)] text-[24px] ">Keep in touch coach</div>

                        <div className='flex gap-4 my-5 xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-2 grid grid-cols-1'>
                            {/* BOX */}
                            {dashboardData &&
                                boxItems.map((item) => (
                                    boxItemsDBData.map((itemData) => (
                                       item.title === itemData.title && <Box key={item.title} icon={item.icon} title={item.title} text={item.text} titleNumber={dashboardData.summary[item.title === "Total Projects" ? "totalProjects" : item.title === "In progress" ? "inProgress" : item.title === "Completed" ? "completed" : "onHold"]} changeNumber={itemData.changeNumber} />
                                    ))
                                

                                ))
                            }

                        </div>
                    </div>

                    {/* Charts  */}
                    {dashboardError && <p className="text-left text-red-600">Unable to load dashboard data: {dashboardError.message}</p>}
                    {dashboardData && <section className="my-7 flex flex-col gap-4 lg:h-[490px] lg:flex-row">
                        <div className="h-[460px]  w-full overflow-hidden rounded-[24px] bg-white lg:h-full lg:flex-1">
                            <ChartBox data={Object.entries(dashboardData.distribution.statuses).map(([name, tasks]) => ({ name, tasks }))} />
                        </div>

                        <div className="h-[500px] w-full overflow-hidden rounded-[24px] bg-white lg:h-full lg:w-[42%]">
                            <TaskDistribution distribution={dashboardData.distribution} />
                        </div>
                    </section>}

                    <section className="mb-6 h-[600px] overflow-hidden rounded-[24px] bg-white">
                        {dashboardData && <TaskDistributionList recentTasks={dashboardData.recentTasks} />}
                    </section>



                </div>

            </div>


        </div>
    )
}

export default Dashboard
