export type CommonStatus =
  | "Active"
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Inactive"
  | "Awaiting IT Review"
  | "Completed"
  | "In Progress"
  | "Upcoming"
  | "Ongoing"
  | "Published"
  | "Scheduled"
  | "Draft"
  | "Archived";

export function getCommonStatus(
  status: unknown,
  fallback: CommonStatus = "Pending"
): CommonStatus {
  const allowedStatus: CommonStatus[] = [
    "Active",
    "Pending",
    "Approved",
    "Rejected",
    "Inactive",
    "Awaiting IT Review",
    "Completed",
    "In Progress",
    "Upcoming",
    "Ongoing",
    "Published",
    "Scheduled",
    "Draft",
    "Archived",
  ];

  if (allowedStatus.includes(status as CommonStatus)) {
    return status as CommonStatus;
  }

  return fallback;
}
