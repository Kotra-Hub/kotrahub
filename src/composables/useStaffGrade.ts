import { computed, ref } from "vue";

export interface StaffGrade {
  id: number;
  gradeCode: string;
  gradeName: string;
  level: string;
  description: string;
  positions: number;
  employees: number;
  status: "Active" | "Inactive" | "Vacant";
}

export interface GradeHistory {
  id: number;
  gradeCode: string;
  gradeName: string;
  action: "Created" | "Updated" | "Deleted";
  changedBy: string;
  date: string;
}

const staffGrades = ref<StaffGrade[]>([
  {
    id: 1,
    gradeCode: "G1",
    gradeName: "Junior Level",
    level: "Entry",
    description: "Entry-level grade for junior employees.",
    positions: 5,
    employees: 24,
    status: "Active",
  },
  {
    id: 2,
    gradeCode: "G2",
    gradeName: "Executive Level",
    level: "Junior",
    description: "Grade for executive-level positions.",
    positions: 8,
    employees: 36,
    status: "Active",
  },
  {
    id: 3,
    gradeCode: "G3",
    gradeName: "Senior Executive",
    level: "Intermediate",
    description: "Grade for senior executive positions.",
    positions: 6,
    employees: 28,
    status: "Active",
  },
  {
    id: 4,
    gradeCode: "G4",
    gradeName: "Assistant Manager",
    level: "Management",
    description: "Grade for assistant manager positions.",
    positions: 4,
    employees: 12,
    status: "Active",
  },
  {
    id: 5,
    gradeCode: "G5",
    gradeName: "Manager",
    level: "Management",
    description: "Grade for manager-level positions.",
    positions: 3,
    employees: 7,
    status: "Active",
  },
  {
    id: 6,
    gradeCode: "G6",
    gradeName: "Senior Manager",
    level: "Senior Management",
    description: "Grade for senior management positions.",
    positions: 2,
    employees: 4,
    status: "Vacant",
  },
]);

const gradeHistory = ref<GradeHistory[]>([
  {
    id: 1,
    gradeCode: "G1",
    gradeName: "Junior Level",
    action: "Created",
    changedBy: "Admin",
    date: "15 Sep 2026",
  },
  {
    id: 2,
    gradeCode: "G3",
    gradeName: "Senior Executive",
    action: "Updated",
    changedBy: "HR Admin",
    date: "18 Sep 2026",
  },
  {
    id: 3,
    gradeCode: "G5",
    gradeName: "Manager",
    action: "Created",
    changedBy: "HR Admin",
    date: "20 Sep 2026",
  },
]);

export function useStaffGrade() {
  const totalGrades = computed(() => {
    return staffGrades.value.length;
  });

  const activeGrades = computed(() => {
    return staffGrades.value.filter(
      (grade) => grade.status === "Active"
    ).length;
  });

  const totalPositions = computed(() => {
    return staffGrades.value.reduce(
      (total, grade) => total + grade.positions,
      0
    );
  });

  const vacantGrades = computed(() => {
    return staffGrades.value.filter(
      (grade) => grade.status === "Vacant"
    ).length;
  });

  function createGrade(data: Omit<StaffGrade, "id">) {
    const nextId =
      staffGrades.value.length > 0
        ? Math.max(
            ...staffGrades.value.map((grade) => grade.id)
          ) + 1
        : 1;

    const newGrade: StaffGrade = {
      id: nextId,
      ...data,
    };

    staffGrades.value.push(newGrade);

    addHistory({
      gradeCode: newGrade.gradeCode,
      gradeName: newGrade.gradeName,
      action: "Created",
      changedBy: "Admin",
      date: getCurrentDate(),
    });

    return newGrade;
  }

  function updateGrade(
    id: number,
    data: Partial<StaffGrade>
  ) {
    const grade = staffGrades.value.find(
      (item) => item.id === id
    );

    if (!grade) return null;

    Object.assign(grade, data);

    addHistory({
      gradeCode: grade.gradeCode,
      gradeName: grade.gradeName,
      action: "Updated",
      changedBy: "Admin",
      date: getCurrentDate(),
    });

    return grade;
  }

  function deleteGrade(id: number) {
    const index = staffGrades.value.findIndex(
      (grade) => grade.id === id
    );

    if (index === -1) return false;

    const grade = staffGrades.value[index];

    addHistory({
      gradeCode: grade.gradeCode,
      gradeName: grade.gradeName,
      action: "Deleted",
      changedBy: "Admin",
      date: getCurrentDate(),
    });

    staffGrades.value.splice(index, 1);

    return true;
  }

  function addHistory(
    data: Omit<GradeHistory, "id">
  ) {
    const nextId =
      gradeHistory.value.length > 0
        ? Math.max(
            ...gradeHistory.value.map(
              (history) => history.id
            )
          ) + 1
        : 1;

    gradeHistory.value.unshift({
      id: nextId,
      ...data,
    });
  }

  function getGradeById(id: number) {
    return staffGrades.value.find(
      (grade) => grade.id === id
    );
  }

  function getGradeByCode(gradeCode: string) {
    return staffGrades.value.find(
      (grade) => grade.gradeCode === gradeCode
    );
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return {
    staffGrades,
    gradeHistory,

    totalGrades,
    activeGrades,
    totalPositions,
    vacantGrades,

    createGrade,
    updateGrade,
    deleteGrade,
    addHistory,

    getGradeById,
    getGradeByCode,
  };
}