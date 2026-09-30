<script setup lang="ts">

export type Status =
  | "Active"
  | "Inactive"
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Awaiting IT Review"
  | "Completed"
  | "In Progress"
  | "Upcoming"
  | "Ongoing"
  | "Published"
  | "Scheduled"
  | "Draft"
  | "Archived"


const props = defineProps<{
  status: Status | null | undefined
}>()



const getColor = (status: Status | null | undefined) => {

  switch (status) {

    case "Approved":
    case "Active":
    case "Completed":
    case "Published":
      return "success"


    case "Rejected":
    case "Inactive":
      return "error"


    case "In Progress":
      return "info"


    case "Awaiting IT Review":
      return "warning"


    case "Pending":
      return "warning"


    case "Upcoming":
      return "info"


    case "Ongoing":
      return "primary"


    case "Scheduled":
      return "warning"


    case "Draft":
      return "grey"


    case "Archived":
      return "grey"


    default:
      return "grey"

  }

}

</script>



<template>

  <v-chip

    size="small"

    variant="tonal"

    :color="getColor(props.status)"

  >

    {{ props.status || "-" }}

  </v-chip>

</template>