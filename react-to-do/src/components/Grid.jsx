import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Grid({ rowData, columnDefs }) {
    return (
        <div className="ag-theme-quartz h-full  w-full">
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
            />
        </div>
  );
}
