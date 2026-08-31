import UserCell from "../components/UserCell";
import StatusCell from "../components/StatusCell";
import ActionCell from "../components/ActionCell";

export const navItems = {
    "Navigation": [
        { title: "Dashboard", icon:  "/dashboard.svg", path: "/dashboard" },
        { title: "Projects", icon:  "/projects.svg", path: "/projects" },
        { title: "Tasks", icon:  "/tasks.svg", path: "/tasks" },
    ],
    "Collaboration": [
        { title: "Teams", icon: "/team.svg", path: "/teams" },
        { title: "Messages", icon: "/messages.svg", path: "/messages" },
        { title: "Calendar", icon: "/calendar.svg", path: "/calendar" }
    ],
    "Settings": [
        { title: "Reports", icon: "/reports.svg", path: "/reports" },
        { title: "Settings", icon: "/settings.svg", path: "/settings" },
        { title: "Support", icon: "/support.svg", path: "/support" }
    ]
}


export const boxItems = [
    { title: "Total Projects", icon:  "/totalProjects.svg", text: "from last month" },
    { title: "In progress", icon:  "/inProgress.svg", text: "from this month" },
    { title: "Completed", icon:  "/completed.svg", text: "from last quarter" },
    { title: "On Hold", icon:  "/onHold.svg", text: "from last year" }
];



export const desktopColumnDefs = [
    { field: "ID", flex: 0.75 },
    { field: "Name", flex: 2, cellRenderer: UserCell },
    { field: "Assigned", flex: 1 },
    { field: "In Progress", flex: 1 },
    { field: "Pending", flex: 1 },
    { field: "On Hold", flex: 1 },
    { field: "Department", flex: 1 },
    { field: "Status", flex: 1, cellRenderer: StatusCell },
    { field: "Action", flex: 1, cellRenderer: ActionCell },
];

export const tabletColumnDefs = [
    { field: "ID", flex: 0.75 },
    { field: "Name", flex: 2, cellRenderer: UserCell },
    { field: "Assigned", flex: 1 },
    { field: "Department", flex: 1 },
    { field: "Status", flex: 1, cellRenderer: StatusCell },
    { field: "Action", flex: 1, cellRenderer: ActionCell },
];

export const mobileColumnDefs = [
    { field: "Name", flex: 2, cellRenderer: UserCell },
    { field: "Status", flex: 1, cellRenderer: StatusCell },
    { field: "Action", flex: 1, cellRenderer: ActionCell },
];

export const statusLabels = {
        completed: "Completed",
        in_progress: "In Progress",
        pending: "Pending",
        on_hold: "On Hold",
    };

export const prioLabels = {
        high: "High",
        medium: "Medium",
        low: "Low",
    };

export const assignees  = [ { name: "George Smith", email: "george@example.com" }, { name: "Carol Bloggs", email: "carol@example.com" }, { name: "John Doe", email: "john@example.com" }, { name: "Charlie White", email: "charlie@example.com" }, { name: "Jane Smith", email: "janes@example.com" }, { name: "Fred Bloggs", email: "fred@example.com" }, { name: "Jane Doe", email: "jane@example.com" } ];