import { computed, ref } from "vue";

export interface ChecklistItem {
  id: number;
  category: string;
  label: string;
  completed: boolean;
}

export interface StaffOffboardingRecord {
  employeeId: string;
  name: string;
  department: string;
  position: string;
  lastWorkingDay: string;
  reason: string;
  status: "Pending" | "In Progress" | "Completed";
  progress: number;
  checklist: ChecklistItem[];
  completedDate?: string;
}

const staffOffboardingRecords = ref<StaffOffboardingRecord[]>([
  {
    employeeId: "EMP001",
    name: "Ahmad Rahman",
    department: "Engineering",
    position: "Senior Engineer",
    lastWorkingDay: "30 Sept 2026",
    reason: "Resignation",
    status: "Pending",
    progress: 0,
    checklist: [
      { id: 1, category: "HR Clearance", label: "Resignation Letter Received", completed: false },
      { id: 2, category: "HR Clearance", label: "Exit Interview Completed", completed: false },
      { id: 3, category: "Asset Return", label: "Laptop Returned", completed: false },
      { id: 4, category: "Asset Return", label: "Access Card Returned", completed: false },
      { id: 5, category: "System Access", label: "Email Account Disabled", completed: false }
    ]
  },
  {
    employeeId: "EMP002",
    name: "Sarah Lim",
    department: "Finance",
    position: "Account Executive",
    lastWorkingDay: "15 Oct 2026",
    reason: "Contract End",
    status: "In Progress",
    progress: 40,
    checklist: [
      { id: 1, category: "HR Clearance", label: "Resignation Letter Received", completed: true },
      { id: 2, category: "HR Clearance", label: "Exit Interview Completed", completed: false },
      { id: 3, category: "Asset Return", label: "Laptop Returned", completed: true },
      { id: 4, category: "Asset Return", label: "Access Card Returned", completed: false },
      { id: 5, category: "System Access", label: "Email Account Disabled", completed: false }
    ]
  }
]);

export function useStaffOffboarding() {
  const activeOffboarding = computed(() =>
    staffOffboardingRecords.value.filter(
      item => item.status !== "Completed"
    )
  );

  const completedExit = computed(() =>
    staffOffboardingRecords.value.filter(
      item => item.status === "Completed"
    )
  );

  function updateProgress(record: StaffOffboardingRecord) {
    const total = record.checklist.length;
    const done = record.checklist.filter(
      item => item.completed
    ).length;

    record.progress = Math.round((done / total) * 100);

    if (record.progress === 0) {
      record.status = "Pending";
    } else if (record.progress < 100) {
      record.status = "In Progress";
    } else {
      // Keep in active list until user clicks Complete Exit.
      record.status = "In Progress";
    }
  }

  function createOffboarding(data: StaffOffboardingRecord) {
    staffOffboardingRecords.value.push(data);
  }

  return {
    staffOffboardingRecords,
    activeOffboarding,
    completedExit,
    createOffboarding,
    updateProgress
  };
}
