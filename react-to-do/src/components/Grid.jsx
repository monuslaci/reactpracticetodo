import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { useMemo } from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Grid({ rowData, columnDefs }) {
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
        <div className="ag-theme-quartz h-full  w-full">
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
