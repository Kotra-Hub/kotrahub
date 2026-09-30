import { computed, ref } from "vue";

export function useOrganizationAnnouncements() {
  const announcements = ref([
    {
      id: "ANN001",
      title: "Public Holiday Notice",
      category: "HR",
      publishDate: "25 Sep 2026",
      targetAudience: "All Employees",
      status: "Completed",
      content:
        "Please be informed that the company will observe the upcoming public holiday on 25 September 2026. All employees are advised to plan their work accordingly and ensure any urgent tasks are completed before the holiday.",
    },

    {
      id: "ANN002",
      title: "System Maintenance",
      category: "IT",
      publishDate: "30 Sep 2026",
      targetAudience: "All Users",
      status: "Upcoming",
      content:
        "The IT Department will perform scheduled system maintenance on 30 September 2026. During this period, selected systems and applications may be temporarily unavailable. Users are advised to save their work and plan accordingly.",
    },

    {
      id: "ANN003",
      title: "Safety Reminder",
      category: "EHS",
      publishDate: "20 Sep 2026",
      targetAudience: "Plant Staff",
      status: "Completed",
      content:
        "All plant staff are reminded to follow the required safety procedures while working in the production area. Please wear the appropriate personal protective equipment and report any unsafe conditions to the relevant supervisor immediately.",
    },
  ]);

  const headers = [
    { title: "Announcement ID", key: "id" },
    { title: "Title", key: "title" },
    { title: "Category", key: "category" },
    { title: "Publish Date", key: "publishDate" },
    { title: "Target Audience", key: "targetAudience" },
    { title: "Status", key: "status" },
    { title: "Actions", key: "actions", sortable: false },
  ];

  return {
    headers,
    filteredItems: computed(() => announcements.value),
  };
}