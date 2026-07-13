import React from 'react'
import LeftNavBar from './../components/LeftNavBar.jsx'

const Dashboard = () => {
    return (
        <div className='flex h-screen overflow-hidden'>
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
                        <h1>Keep in touch coach</h1>

                        <div className='flex gap-4 my-5'>
                            {/* BOX */}
                            {
                                [1, 2, 3, 4].map((item, index) => (
                                    <div className='flex-1 h-37.5 bg-amber-300 '>BOX {index}</div>

                                ))
                            }

                        </div>
                    </div>

                    {/* Charts  */}
                    <div className='flex sm:flex-row flex-col gap-2.5 my-7.5 h-auto sm:h-122.5'>
                        <div className='w-full  h-62.5 sm:h-full  bg-amber-100' >Big Chart</div>
                        <div className='w-full sm:w-12/19 h-62.5 sm:h-full bg-amber-100'>Small Chart</div>
                    </div>

                    <div className='h-82.5 bg-amber-100 mb-6'>Table</div>



                </div>

            </div>


        </div>
    )
}

export default Dashboard