export const navItems = {
    "Navigation": [
        { title: "Dashboard", icon:  "/dashboard.svg"},
        { title: "Projects", icon:  "/projects.svg" },
        { title: "Tasks", icon:  "/tasks.svg" }
    ],
    "Collaboration": [
        { title: "Teams", icon: "/team.svg" },
        { title: "Messages", icon: "/messages.svg" },
        { title: "Calendar", icon: "/calendar.svg" }
    ],
    "Settings": [
        { title: "Reports", icon: "/reports.svg" },
        { title: "Settings", icon: "/settings.svg" },
        { title: "Support", icon: "/support.svg" }
    ]
}


export const boxItems = [
    { title: "Total Projects", icon:  "/totalProjects.svg", text: "from last month" },
    { title: "In progress", icon:  "/inProgress.svg", text: "from this month" },
    { title: "Completed", icon:  "/completed.svg", text: "from last quarter" },
    { title: "On Hold", icon:  "/onHold.svg", text: "from last year" }
];



export const columnDefs = [
        { field: "ID", flex: 2 },
        { field: "Name", flex: 1 },
        { field: "Assigned", flex: 1 },
        { field: "In Progress", flex: 1 },
        { field: "Pending", flex: 1 },
        { field: "On Hold", flex: 1 },
        { field: "Department", flex: 1 },
        { field: "Status", flex: 1 },
        { field: "Action", flex: 1 },
    ];

