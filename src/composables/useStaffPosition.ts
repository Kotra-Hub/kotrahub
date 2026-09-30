import { computed, ref } from "vue"
import type { Status } from "@/components/common/AppStatusChip.vue"

/* */

export interface StaffPosition {
  id: string
  positionCode: string
  positionName: string
  department: string
  grade: string
  employees: number
  status: Status
  description: string
}

export interface PositionHistory {
  id: string
  positionCode: string
  positionName: string
  action: string
  changedBy: string
  date: string
}

/* */

const initialPositions: StaffPosition[] = [
  {
    id: "POS-001",
    positionCode: "IT-001",
    positionName: "IT Executive",
    department: "Information Technology",
    grade: "Executive",
    employees: 5,
    status: "Active",
    description:
      "Responsible for IT application support, system maintenance and user support.",
  },
  {
    id: "POS-002",
    positionCode: "IT-002",
    positionName: "Software Developer",
    department: "Information Technology",
    grade: "Executive",
    employees: 4,
    status: "Active",
    description:
      "Responsible for software development, testing and system enhancement.",
  },
  {
    id: "POS-003",
    positionCode: "HR-001",
    positionName: "HR Executive",
    department: "Human Resources",
    grade: "Executive",
    employees: 3,
    status: "Active",
    description:
      "Responsible for human resource administration and employee services.",
  },
  {
    id: "POS-004",
    positionCode: "FIN-001",
    positionName: "Finance Executive",
    department: "Finance",
    grade: "Executive",
    employees: 4,
    status: "Active",
    description:
      "Responsible for financial operations and reporting.",
  },
  {
    id: "POS-005",
    positionCode: "QA-001",
    positionName: "Quality Assurance Executive",
    department: "Quality Assurance",
    grade: "Executive",
    employees: 2,
    status: "Active",
    description:
      "Responsible for quality assurance, testing and compliance activities.",
  },
  {
    id: "POS-006",
    positionCode: "MKT-001",
    positionName: "Marketing Executive",
    department: "Marketing",
    grade: "Executive",
    employees: 2,
    status: "Active",
    description:
      "Responsible for marketing activities and campaign management.",
  },
  {
    id: "POS-007",
    positionCode: "OPS-001",
    positionName: "Operations Executive",
    department: "Operations",
    grade: "Executive",
    employees: 6,
    status: "Active",
    description:
      "Responsible for daily operational activities and coordination.",
  },
  {
    id: "POS-008",
    positionCode: "IT-003",
    positionName: "IT Support Technician",
    department: "Information Technology",
    grade: "Technician",
    employees: 0,
    status: "Active",
    description:
      "Provides hardware, software and technical support to users.",
  },
  {
    id: "POS-009",
    positionCode: "ADM-001",
    positionName: "Administrative Assistant",
    department: "Administration",
    grade: "Support",
    employees: 3,
    status: "Active",
    description:
      "Provides administrative and clerical support.",
  },
  {
    id: "POS-010",
    positionCode: "IT-004",
    positionName: "System Administrator",
    department: "Information Technology",
    grade: "Senior Executive",
    employees: 0,
    status: "Inactive",
    description:
      "Responsible for system administration and infrastructure management.",
  },
]

/* */

const initialHistory: PositionHistory[] = [
  {
    id: "HIS-001",
    positionCode: "IT-001",
    positionName: "IT Executive",
    action: "Created",
    changedBy: "System Admin",
    date: "2026-05-04T09:00:00",
  },
  {
    id: "HIS-002",
    positionCode: "IT-002",
    positionName: "Software Developer",
    action: "Created",
    changedBy: "System Admin",
    date: "2026-05-05T10:15:00",
  },
  {
    id: "HIS-003",
    positionCode: "HR-001",
    positionName: "HR Executive",
    action: "Created",
    changedBy: "System Admin",
    date: "2026-05-06T11:00:00",
  },
  {
    id: "HIS-004",
    positionCode: "IT-003",
    positionName: "IT Support Technician",
    action: "Created",
    changedBy: "System Admin",
    date: "2026-05-10T14:30:00",
  },
  {
    id: "HIS-005",
    positionCode: "IT-004",
    positionName: "System Administrator",
    action: "Deactivated",
    changedBy: "System Admin",
    date: "2026-08-15T16:00:00",
  },
]

/* */

const staffPositions = ref<StaffPosition[]>(
  [...initialPositions],
)

const positionHistory = ref<PositionHistory[]>(
  [...initialHistory],
)

/* */

export function useStaffPosition() {
  /* */

  const totalPositions = computed(
    () => staffPositions.value.length,
  )

  const activePositions = computed(
    () =>
      staffPositions.value.filter(
        (position) =>
          position.status === "Active",
      ).length,
  )

  const totalEmployees = computed(
    () =>
      staffPositions.value.reduce(
        (total, position) =>
          total +
          Number(position.employees || 0),
        0,
      ),
  )

  const vacantPositions = computed(
    () =>
      staffPositions.value.filter(
        (position) =>
          Number(position.employees || 0) === 0,
      ).length,
  )

  /* */

  const getPositionById = (
    id: string,
  ): StaffPosition | undefined => {
    return staffPositions.value.find(
      (position) =>
        position.id === id,
    )
  }

  /* */

  const getPositionByCode = (
    positionCode: string,
  ): StaffPosition | undefined => {
    const code =
      positionCode.trim().toLowerCase()

    return staffPositions.value.find(
      (position) =>
        position.positionCode
          .trim()
          .toLowerCase() === code,
    )
  }

  /* */

  const createPosition = async (
    data: Omit<StaffPosition, "id">,
  ): Promise<StaffPosition> => {
    const position: StaffPosition = {
      id: `POS-${Date.now()}`,
      positionCode:
        data.positionCode,
      positionName:
        data.positionName,
      department:
        data.department,
      grade:
        data.grade,
      employees:
        Number(data.employees) || 0,
      status:
        data.status,
      description:
        data.description || "",
    }

    staffPositions.value.unshift(
      position,
    )

    return position
  }

  /* */

  const updatePosition = async (
    id: string,
    data: Partial<
      Omit<StaffPosition, "id">
    >,
  ): Promise<StaffPosition> => {
    const index =
      staffPositions.value.findIndex(
        (position) =>
          position.id === id,
      )

    if (index === -1) {
      throw new Error(
        "Position not found.",
      )
    }

    const current =
      staffPositions.value[index]

    const updated: StaffPosition = {
      ...current,
      ...data,
      employees:
        data.employees !== undefined
          ? Number(data.employees) || 0
          : current.employees,
    }

    staffPositions.value[index] =
      updated

    return updated
  }

  /* */

  const deletePosition = async (
    id: string,
  ): Promise<StaffPosition> => {
    const index =
      staffPositions.value.findIndex(
        (position) =>
          position.id === id,
      )

    if (index === -1) {
      throw new Error(
        "Position not found.",
      )
    }

    const deleted =
      staffPositions.value[index]

    staffPositions.value.splice(
      index,
      1,
    )

    return deleted
  }

  /* */

  const addHistory = async (
    data: Omit<PositionHistory, "id">,
  ): Promise<PositionHistory> => {
    const history: PositionHistory = {
      id: `HIS-${Date.now()}`,
      positionCode:
        data.positionCode,
      positionName:
        data.positionName,
      action:
        data.action,
      changedBy:
        data.changedBy,
      date:
        data.date ||
        new Date().toISOString(),
    }

    positionHistory.value.unshift(
      history,
    )

    return history
  }

  /* */

  const getHistoryByPosition = (
    positionCode: string,
  ): PositionHistory[] => {
    const code =
      positionCode.trim().toLowerCase()

    return positionHistory.value.filter(
      (history) =>
        history.positionCode
          .trim()
          .toLowerCase() === code,
    )
  }

  /* */

  const activatePosition = async (
    id: string,
    changedBy = "System Admin",
  ) => {
    const position =
      getPositionById(id)

    if (!position) {
      throw new Error(
        "Position not found.",
      )
    }

    const updated =
      await updatePosition(id, {
        status: "Active",
      })

    await addHistory({
      positionCode:
        position.positionCode,
      positionName:
        position.positionName,
      action: "Activated",
      changedBy,
      date:
        new Date().toISOString(),
    })

    return updated
  }

  /* */

  const deactivatePosition = async (
    id: string,
    changedBy = "System Admin",
  ) => {
    const position =
      getPositionById(id)

    if (!position) {
      throw new Error(
        "Position not found.",
      )
    }

    const updated =
      await updatePosition(id, {
        status: "Inactive",
      })

    await addHistory({
      positionCode:
        position.positionCode,
      positionName:
        position.positionName,
      action: "Deactivated",
      changedBy,
      date:
        new Date().toISOString(),
    })

    return updated
  }

  /* */

  return {
    staffPositions,
    positionHistory,

    totalPositions,
    activePositions,
    totalEmployees,
    vacantPositions,

    createPosition,
    updatePosition,
    deletePosition,
    addHistory,

    getPositionById,
    getPositionByCode,
    getHistoryByPosition,

    activatePosition,
    deactivatePosition,
  }
}