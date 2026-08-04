import { useLocation, useNavigate } from "react-router-dom";

function formatDate(timestamp) {
    if (!timestamp?._seconds) {
        return "Date unavailable";
    }

    return new Date(timestamp._seconds * 1000).toLocaleDateString();
}

export default function WorkCard({ item, icon, type }) {
    const navigate = useNavigate();
    const isProject = type === "project";

    const statusStyles = {
        completed: "bg-[var(--green-bullet-transparent)] text-[var(--green-bullet)]",
        in_progress: "bg-[var(--button-bg-light-purple)] text-[var(--chart-color)]",
        pending: "bg-amber-100 text-amber-700",
        on_hold: "bg-[var(--red-bullet-transparent)] text-[var(--red-bullet)]",
        unknown: "bg-gray-100 text-gray-500",
    };

    const statusLabels = {
        completed: "Completed",
        in_progress: "In Progress",
        pending: "Pending",
        on_hold: "On Hold",
    };

    const value =  item.status
    const normalizedStatus = String(value).toLowerCase().replaceAll(" ", "_");
    const style = statusStyles[normalizedStatus] || statusStyles.unknown;
    const label = statusLabels[normalizedStatus] || value;

    const prioStyles = {
        low: "bg-[var(--green-bullet-transparent)] text-[var(--green-bullet)]",
        medium: "bg-amber-100 text-amber-700",
        high: "bg-[var(--red-bullet-transparent)] text-[var(--red-bullet)]",
    };

    const prioLabels = {
        high: "High",
        medium: "Medium",
        low: "Low",
    };

    const prioValue =  item.priority
    const normalizedPriority = String(prioValue).toLowerCase().replaceAll(" ", "_");
    const priorityStyle = prioStyles[normalizedPriority];
    const priorityLabel = prioLabels[normalizedPriority] || prioValue;

    return (
        <article className="flex min-h-52 flex-col justify-between rounded-3xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md" onClick={() => navigate(isProject ? `/projects/${item.id}` : `/tasksDetails/${item.id}`)}>
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold text-gray-900">
                        {isProject ? item.name : item.title}
                    </h2>
                    {isProject ? (
                        <p className="mt-2 line-clamp-2 text-sm text-gray-500">{item.description}</p>
                    ) : (
                        <>
                            <p className="mt-1 text-sm text-gray-400">Assigned to</p>
                            <p className="truncate text-sm font-medium text-gray-700">
                                {item.assignee?.name || "Unassigned"}
                            </p>
                        </>
                    )}
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EFE9FC]">
                    <img src={icon} alt="" className="h-6 w-6" />
                </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
                <span title="Status" className={`rounded-full bg-[#EFE9FC] px-3 py-1 text-xs font-medium ${style}`}>
                    {label}
                </span>
                {isProject ? (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                        {item.taskIds.length} tasks
                    </span>
                ) : (
                    <span
                        title="Priority"
                        className={`rounded-full px-3 py-1 text-xs font-medium ${priorityStyle}`}
                    >
                        {priorityLabel}
                    </span>
                )}
            </div>

            {isProject && (
                <p className="mt-3 text-xs text-gray-400">Created {formatDate(item.createdAt)}</p>
            )}
        </article>
    );
}
