import { computed, ref, watch } from "vue"

export interface EventItem {
  id: string
  name: string
  type: string
  organizer: string
  date: string
  startTime: string
  endTime: string
  location: string
  participantCount: number
  description: string
}

export function useEvents() {
  // ===========================================================================
  // EVENTS
  // ===========================================================================

  const events = ref<EventItem[]>([
    {
      id: "EVT-001",
      name: "Annual Company Dinner 2026",
      type: "Corporate",
      organizer: "Human Resource",
      date: "2026-10-16",
      startTime: "19:00",
      endTime: "22:00",
      location: "Hotel Equatorial Melaka",
      participantCount: 180,
      description:
        "Annual company dinner and appreciation event for employees.",
    },
    {
      id: "EVT-002",
      name: "Cybersecurity Awareness Training",
      type: "Training",
      organizer: "IT Department",
      date: "2026-10-05",
      startTime: "09:00",
      endTime: "12:00",
      location: "Training Room 1",
      participantCount: 45,
      description:
        "Cybersecurity awareness session covering security best practices and common threats.",
    },
    {
      id: "EVT-003",
      name: "Monthly Management Meeting",
      type: "Meeting",
      organizer: "Management",
      date: "2026-09-30",
      startTime: "10:00",
      endTime: "12:00",
      location: "Board Room",
      participantCount: 15,
      description:
        "Monthly management meeting to review business and operational matters.",
    },
    {
      id: "EVT-004",
      name: "Health Screening Programme",
      type: "Health",
      organizer: "Human Resource",
      date: "2026-10-22",
      startTime: "08:30",
      endTime: "13:00",
      location: "Medical Room",
      participantCount: 120,
      description:
        "Employee health screening programme organised by the Human Resource department.",
    },
    {
      id: "EVT-005",
      name: "Company Futsal Tournament",
      type: "Sports",
      organizer: "Sports Club",
      date: "2026-11-07",
      startTime: "08:00",
      endTime: "17:00",
      location: "Melaka Sports Complex",
      participantCount: 80,
      description:
        "Inter-department futsal tournament for company employees.",
    },
    {
      id: "EVT-006",
      name: "Blood Donation Campaign",
      type: "Community",
      organizer: "CSR Committee",
      date: "2026-08-15",
      startTime: "09:00",
      endTime: "14:00",
      location: "Main Hall",
      participantCount: 65,
      description:
        "Blood donation campaign in collaboration with a local healthcare organisation.",
    },
    {
      id: "EVT-007",
      name: "IT Team Building",
      type: "Team Building",
      organizer: "IT Department",
      date: "2026-08-29",
      startTime: "08:00",
      endTime: "17:00",
      location: "A'Famosa Resort",
      participantCount: 32,
      description:
        "Team building activity for the IT Department.",
    },
    {
      id: "EVT-008",
      name: "New Employee Orientation",
      type: "Orientation",
      organizer: "Human Resource",
      date: "2026-09-08",
      startTime: "09:00",
      endTime: "16:00",
      location: "Training Room 2",
      participantCount: 18,
      description:
        "Orientation programme for newly joined employees.",
    },
    {
      id: "EVT-009",
      name: "Fire Safety Awareness",
      type: "Safety",
      organizer: "Safety Department",
      date: "2026-10-29",
      startTime: "10:00",
      endTime: "12:00",
      location: "Main Hall",
      participantCount: 70,
      description:
        "Fire safety awareness session including emergency response procedures.",
    },
    {
      id: "EVT-010",
      name: "Year End Appreciation Event",
      type: "Corporate",
      organizer: "Human Resource",
      date: "2026-12-18",
      startTime: "18:30",
      endTime: "22:00",
      location: "Grand Ballroom",
      participantCount: 200,
      description:
        "Year-end appreciation event for employees and management.",
    },
  ])

  // ===========================================================================
  // SEARCH
  // ===========================================================================

  const search = ref("")

  // ===========================================================================
  // FILTERS
  // ===========================================================================

  const eventTypeFilter = ref<string | null>(null)
  const organizerFilter = ref<string | null>(null)
  const locationFilter = ref<string | null>(null)

  const eventTypeOptions = computed(() => {
    return [...new Set(events.value.map((event) => event.type))].sort()
  })

  const organizerOptions = computed(() => {
    return [...new Set(events.value.map((event) => event.organizer))].sort()
  })

  const locationOptions = computed(() => {
    return [...new Set(events.value.map((event) => event.location))].sort()
  })

  // ===========================================================================
  // DATE
  // ===========================================================================

  function getToday() {
    const date = new Date()

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
  }

  function isUpcoming(event: EventItem) {
    return event.date >= getToday()
  }

  function isPast(event: EventItem) {
    return event.date < getToday()
  }

  // ===========================================================================
  // FILTERED EVENTS
  // ===========================================================================

  const filteredEvents = computed(() => {
    const keyword = search.value.trim().toLowerCase()

    return events.value.filter((event) => {
      const matchesSearch =
        !keyword ||
        event.id.toLowerCase().includes(keyword) ||
        event.name.toLowerCase().includes(keyword) ||
        event.type.toLowerCase().includes(keyword) ||
        event.organizer.toLowerCase().includes(keyword) ||
        event.location.toLowerCase().includes(keyword)

      const matchesType =
        !eventTypeFilter.value ||
        event.type === eventTypeFilter.value

      const matchesOrganizer =
        !organizerFilter.value ||
        event.organizer === organizerFilter.value

      const matchesLocation =
        !locationFilter.value ||
        event.location === locationFilter.value

      return (
        matchesSearch &&
        matchesType &&
        matchesOrganizer &&
        matchesLocation
      )
    })
  })

  // ===========================================================================
  // UPCOMING / PAST
  // ===========================================================================

  const upcomingEvents = computed(() => {
    return filteredEvents.value
      .filter(isUpcoming)
      .sort((a, b) => a.date.localeCompare(b.date))
  })

  const pastEvents = computed(() => {
    return filteredEvents.value
      .filter(isPast)
      .sort((a, b) => b.date.localeCompare(a.date))
  })

  // ===========================================================================
  // PAGINATION
  // ===========================================================================

  const page = ref(1)

  const itemsPerPage = ref(5)

  const itemsPerPageOptions = [5, 10, 20, 50]

  const totalPages = computed(() => {
    return Math.max(
      1,
      Math.ceil(
        filteredEvents.value.length / itemsPerPage.value,
      ),
    )
  })

  const upcomingTotalPages = computed(() => {
    return Math.max(
      1,
      Math.ceil(
        upcomingEvents.value.length / itemsPerPage.value,
      ),
    )
  })

  const pastTotalPages = computed(() => {
    return Math.max(
      1,
      Math.ceil(
        pastEvents.value.length / itemsPerPage.value,
      ),
    )
  })

  const paginatedEvents = computed(() => {
    const start =
      (page.value - 1) * itemsPerPage.value

    const end = start + itemsPerPage.value

    return filteredEvents.value.slice(start, end)
  })

  const paginatedUpcomingEvents = computed(() => {
    const start =
      (page.value - 1) * itemsPerPage.value

    const end = start + itemsPerPage.value

    return upcomingEvents.value.slice(start, end)
  })

  const paginatedPastEvents = computed(() => {
    const start =
      (page.value - 1) * itemsPerPage.value

    const end = start + itemsPerPage.value

    return pastEvents.value.slice(start, end)
  })

  // ===========================================================================
  // PAGINATION DISPLAY
  // ===========================================================================

  const displayedStart = computed(() => {
    if (filteredEvents.value.length === 0) {
      return 0
    }

    return (
      (page.value - 1) * itemsPerPage.value + 1
    )
  })

  const displayedEnd = computed(() => {
    return Math.min(
      page.value * itemsPerPage.value,
      filteredEvents.value.length,
    )
  })

  const upcomingDisplayedStart = computed(() => {
    if (upcomingEvents.value.length === 0) {
      return 0
    }

    return (
      (page.value - 1) * itemsPerPage.value + 1
    )
  })

  const upcomingDisplayedEnd = computed(() => {
    return Math.min(
      page.value * itemsPerPage.value,
      upcomingEvents.value.length,
    )
  })

  const pastDisplayedStart = computed(() => {
    if (pastEvents.value.length === 0) {
      return 0
    }

    return (
      (page.value - 1) * itemsPerPage.value + 1
    )
  })

  const pastDisplayedEnd = computed(() => {
    return Math.min(
      page.value * itemsPerPage.value,
      pastEvents.value.length,
    )
  })

  watch(
    [
      search,
      eventTypeFilter,
      organizerFilter,
      locationFilter,
      itemsPerPage,
    ],
    () => {
      page.value = 1
    },
  )

  watch(totalPages, (value) => {
    if (page.value > value) {
      page.value = value
    }
  })

  // ===========================================================================
  // SUMMARY
  // ===========================================================================

  const totalEventCount = computed(() => {
    return events.value.length
  })

  const upcomingEventCount = computed(() => {
    return events.value.filter(isUpcoming).length
  })

  const pastEventCount = computed(() => {
    return events.value.filter(isPast).length
  })

  const totalParticipantCount = computed(() => {
    return events.value.reduce(
      (total, event) =>
        total + event.participantCount,
      0,
    )
  })

  // ===========================================================================
  // FILTER ACTIONS
  // ===========================================================================

  const hasFilters = computed(() => {
    return Boolean(
      eventTypeFilter.value ||
        organizerFilter.value ||
        locationFilter.value,
    )
  })

  function clearFilters() {
    eventTypeFilter.value = null
    organizerFilter.value = null
    locationFilter.value = null
  }

  // ===========================================================================
  // SELECTED EVENT
  // ===========================================================================

  const selectedEvent =
    ref<EventItem | null>(null)

  function selectEvent(event: EventItem) {
    selectedEvent.value = event
  }

  function clearSelectedEvent() {
    selectedEvent.value = null
  }

  // ===========================================================================
  // NEW EVENT
  // ===========================================================================

  const newEventId = ref("")
  const newEventName = ref("")
  const newEventType =
    ref<string | null>(null)
  const newEventOrganizer = ref("")
  const newEventDate = ref("")
  const newEventStartTime = ref("")
  const newEventEndTime = ref("")
  const newEventLocation = ref("")
  const newEventParticipantCount =
    ref<number | null>(null)
  const newEventDescription = ref("")

  const canCreateEvent = computed(() => {
    return Boolean(
      newEventId.value.trim() &&
        newEventName.value.trim() &&
        newEventType.value &&
        newEventOrganizer.value.trim() &&
        newEventDate.value &&
        newEventStartTime.value &&
        newEventEndTime.value &&
        newEventLocation.value.trim() &&
        newEventParticipantCount.value !== null &&
        newEventParticipantCount.value >= 0,
    )
  })

  function createEvent() {
    if (!canCreateEvent.value) {
      return false
    }

    const eventId =
      newEventId.value.trim()

    const duplicate = events.value.some(
      (event) =>
        event.id.toLowerCase() ===
        eventId.toLowerCase(),
    )

    if (duplicate) {
      return false
    }

    events.value.push({
      id: eventId,
      name: newEventName.value.trim(),
      type: newEventType.value as string,
      organizer:
        newEventOrganizer.value.trim(),
      date: newEventDate.value,
      startTime: newEventStartTime.value,
      endTime: newEventEndTime.value,
      location:
        newEventLocation.value.trim(),
      participantCount:
        newEventParticipantCount.value ?? 0,
      description:
        newEventDescription.value.trim(),
    })

    clearEventForm()

    return true
  }

  function clearEventForm() {
    newEventId.value = ""
    newEventName.value = ""
    newEventType.value = null
    newEventOrganizer.value = ""
    newEventDate.value = ""
    newEventStartTime.value = ""
    newEventEndTime.value = ""
    newEventLocation.value = ""
    newEventParticipantCount.value = null
    newEventDescription.value = ""
  }

  // ===========================================================================
  // RETURN
  // ===========================================================================

  return {
    // Events
    events,
    filteredEvents,
    upcomingEvents,
    pastEvents,

    // Search
    search,

    // Filters
    eventTypeFilter,
    organizerFilter,
    locationFilter,
    eventTypeOptions,
    organizerOptions,
    locationOptions,
    hasFilters,
    clearFilters,

    // Pagination
    page,
    itemsPerPage,
    itemsPerPageOptions,
    totalPages,
    upcomingTotalPages,
    pastTotalPages,
    paginatedEvents,
    paginatedUpcomingEvents,
    paginatedPastEvents,
    displayedStart,
    displayedEnd,
    upcomingDisplayedStart,
    upcomingDisplayedEnd,
    pastDisplayedStart,
    pastDisplayedEnd,

    // Summary
    totalEventCount,
    upcomingEventCount,
    pastEventCount,
    totalParticipantCount,

    // Selected Event
    selectedEvent,
    selectEvent,
    clearSelectedEvent,

    // New Event
    newEventId,
    newEventName,
    newEventType,
    newEventOrganizer,
    newEventDate,
    newEventStartTime,
    newEventEndTime,
    newEventLocation,
    newEventParticipantCount,
    newEventDescription,
    canCreateEvent,
    createEvent,
    clearEventForm,
  }
}