import { useState } from "react";

const SearchBar = ({ page, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        if (page === "tasks" && onSearch) {
            onSearch(searchTerm);
        } else if (page === "projects" && onSearch) {
            onSearch(searchTerm);
        }
    };

    const handleSearchChange = (event) => {
        const nextSearchTerm = event.target.value;
        setSearchTerm(nextSearchTerm);

        if (page === "tasks" && onSearch && nextSearchTerm === "") {
            onSearch("");
        } else if (page === "projects" && onSearch && nextSearchTerm === "") {
            onSearch("");
        }
    };

    return (
        <div className='flex h-14 my-8 items-center justify-between gap-6'>

                {/* Search field */}
                <form onSubmit={handleSearchSubmit} className="flex h-11 w-full max-w-[520px] items-center gap-3 rounded-full border border-gray-200 bg-white px-4 shadow-sm">
                    <button type="submit" aria-label="Search" className="shrink-0">
                        <img src="/search.svg" alt="" className="h-5 w-5" />
                    </button>
                    <input
                        type="search"
                        placeholder="Search Anything"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                    />
                </form>

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
