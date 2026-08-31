import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { useMemo } from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Grid({ rowData, columnDefs, height, width }) {
      const rowSelection = useMemo(() => {
            return {
            theme: "ag-theme-quartz",
            mode: "multiRow",
            checkboxes: true,
            headerCheckbox: true,
            enableClickSelection: true
            };
        }, []);
    return (
        <div className={`ag-theme-quartz ${height} ${width}`}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                rowSelection={rowSelection}
                    onSelectionChanged={(event) => {
                    console.log("Selected rows:", event.api.getSelectedRows());
                    }}
            />
        </div>
  );
}




//with pagination and navigation buttons
// import { AgGridReact } from "ag-grid-react";
// import {
//     ModuleRegistry,
//     AllCommunityModule
// } from "ag-grid-community";
// import { useMemo, useRef, useState } from "react";

// ModuleRegistry.registerModules([AllCommunityModule]);

// export default function Grid({ rowData, columnDefs }) {
//     const gridRef = useRef(null);

//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);

//     const rowSelection = useMemo(() => {
//         return {
//             mode: "multiRow",
//             checkboxes: true,
//             headerCheckbox: true,
//             enableClickSelection: true
//         };
//     }, []);

//     const updatePagination = () => {
//         const api = gridRef.current?.api;

//         if (!api) return;

//         // AG Grid page numbers start from 0
//         setCurrentPage(api.paginationGetCurrentPage() + 1);
//         setTotalPages(api.paginationGetTotalPages());
//     };

//     const goToFirstPage = () => {
//         gridRef.current?.api.paginationGoToFirstPage();
//     };

//     const goToPreviousPage = () => {
//         gridRef.current?.api.paginationGoToPreviousPage();
//     };

//     const goToNextPage = () => {
//         gridRef.current?.api.paginationGoToNextPage();
//     };

//     const goToLastPage = () => {
//         gridRef.current?.api.paginationGoToLastPage();
//     };

//     return (
//         <div className="flex h-full w-full flex-col">
//             <div className="ag-theme-quartz min-h-0 flex-1">
//                 <AgGridReact
//                     ref={gridRef}
//                     rowData={rowData}
//                     columnDefs={columnDefs}
//                     rowSelection={rowSelection}

//                     pagination={true}
//                     paginationPageSize={10}

//                     // Hide AG Grid's default pagination controls
//                     suppressPaginationPanel={true}

//                     onGridReady={updatePagination}
//                     onPaginationChanged={updatePagination}

//                     onSelectionChanged={(event) => {
//                         console.log(
//                             "Selected rows:",
//                             event.api.getSelectedRows()
//                         );
//                     }}
//                 />
//             </div>

//             <div className="flex shrink-0 items-center justify-between gap-3 py-3">
//                 <span className="text-sm text-[var(--grey-text)]">
//                     Page {currentPage} of {totalPages}
//                 </span>

//                 <div className="flex gap-2">
//                     <button
//                         type="button"
//                         onClick={goToFirstPage}
//                         disabled={currentPage === 1}
//                         className="rounded-md border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
//                     >
//                         First
//                     </button>

//                     <button
//                         type="button"
//                         onClick={goToPreviousPage}
//                         disabled={currentPage === 1}
//                         className="rounded-md border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
//                     >
//                         Previous
//                     </button>

//                     <button
//                         type="button"
//                         onClick={goToNextPage}
//                         disabled={currentPage === totalPages}
//                         className="rounded-md border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
//                     >
//                         Next
//                     </button>

//                     <button
//                         type="button"
//                         onClick={goToLastPage}
//                         disabled={currentPage === totalPages}
//                         className="rounded-md border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
//                     >
//                         Last
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }