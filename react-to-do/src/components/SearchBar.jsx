const SearchBar = () => {
    return (
        <div className='flex h-14 my-8 items-center justify-between gap-6'>

                {/* Search field */}
                <label className="flex h-11 w-full max-w-[520px] items-center gap-3 rounded-full border border-gray-200 bg-white px-4 shadow-sm">
                    <img src="/search.svg" alt="" className="h-5 w-5" />
                    <input
                        type="search"
                        placeholder="Search Anything"
                        aria-label="Search"
                        className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                    />
                </label>

                {/* Header actions */}
                <div className="flex shrink-0 items-center gap-3">
                    <button type="button" aria-label="Notifications" className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                        <img src="/notification-bing.svg" alt="" className="h-5 w-5" />
                    </button>
                    <button type="button" aria-label="Settings" className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                        <img src="/setting-2.svg" alt="" className="h-5 w-5" />
                    </button>
                    <div className="flex rounded-full bg-white p-2 shadow-sm">
                        <img
                            src="/user.png"
                            alt="User"
                            className="h-9 w-9 rounded-full object-cover"
                        />
                    </div>
                </div>

        </div>
    );
};

export default SearchBar;
