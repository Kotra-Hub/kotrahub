<template>

  <v-container fluid class="pa-6">

    <!-- ============================================================
         BREADCRUMB
         ============================================================ -->

    <div class="d-flex align-center mb-6">

      <v-icon
        size="20"
        class="mr-2"
      >
        mdi-domain
      </v-icon>

      <span class="text-body-2 text-medium-emphasis">
        Organization
      </span>

      <v-icon
        size="18"
        class="mx-2"
      >
        mdi-chevron-right
      </v-icon>

      <span class="text-body-2 font-weight-medium">
        Events
      </span>

    </div>


    <!-- ============================================================
         PAGE HEADER
         ============================================================ -->

    <div
      class="d-flex flex-wrap align-center justify-space-between mb-6"
    >

      <div>

        <h1 class="text-h5 font-weight-bold">
          Event Management
        </h1>

        <p class="text-body-2 text-medium-emphasis mt-1">
          Manage organization events and event records
        </p>

      </div>


      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded="lg"
        @click="tab = 'new'"
      >
        New Event
      </v-btn>

    </div>


    <!-- ============================================================
         SUMMARY CARDS
         ============================================================ -->

    <v-row class="mb-6">

      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Total Events"
          :value="totalEventCount"
          icon="mdi-calendar-multiple"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Upcoming"
          :value="upcomingEventCount"
          icon="mdi-calendar-clock-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Past Events"
          :value="pastEventCount"
          icon="mdi-calendar-check-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Participants"
          :value="totalParticipantCount"
          icon="mdi-account-group-outline"
        />

      </v-col>

    </v-row>


    <!-- ============================================================
         TABS
         ============================================================ -->

    <v-card
      rounded="xl"
      elevation="0"
      border
    >

      <v-tabs
        v-model="tab"
        color="primary"
        grow
      >

        <v-tab value="list">

          <v-icon start>
            mdi-calendar-multiple
          </v-icon>

          Events

        </v-tab>


        <v-tab value="new">

          <v-icon start>
            mdi-plus-box-outline
          </v-icon>

          New Event

        </v-tab>


        <v-tab value="upcoming">

          <v-icon start>
            mdi-calendar-clock-outline
          </v-icon>

          Upcoming

        </v-tab>


        <v-tab value="past">

          <v-icon start>
            mdi-calendar-check-outline
          </v-icon>

          Past Events

        </v-tab>

      </v-tabs>

    </v-card>


    <!-- ============================================================
         TAB CONTENT
         ============================================================ -->

    <v-window
      v-model="tab"
      class="mt-6"
    >


      <!-- ==========================================================
           EVENTS
           ========================================================== -->

      <v-window-item value="list">

        <v-card
          rounded="xl"
          elevation="0"
          border
        >

          <!-- HEADER -->

          <div
            class="d-flex flex-wrap align-center justify-space-between pa-5"
          >

            <div>

              <h2 class="text-h6 font-weight-bold">
                Event List
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage organization events
              </p>

            </div>


            <!-- FILTER -->

            <v-menu
              v-model="filterMenu"
              :close-on-content-click="false"
              location="bottom end"
            >

              <template #activator="{ props }">

                <v-btn
                  v-bind="props"
                  variant="outlined"
                  rounded="lg"
                  prepend-icon="mdi-filter-outline"
                >
                  Filter
                </v-btn>

              </template>


              <v-card
                width="320"
                rounded="lg"
                elevation="8"
              >

                <v-card-title
                  class="text-subtitle-1 font-weight-bold"
                >
                  Filter Events
                </v-card-title>


                <v-divider />


                <v-card-text>

                  <v-select
                    v-model="eventTypeFilter"
                    label="Event Type"
                    :items="eventTypeOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-shape-outline"
                    class="mb-3"
                  />


                  <v-select
                    v-model="organizerFilter"
                    label="Organizer"
                    :items="organizerOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-account-tie-outline"
                    class="mb-3"
                  />


                  <v-select
                    v-model="locationFilter"
                    label="Location"
                    :items="locationOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-map-marker-outline"
                  />

                </v-card-text>


                <v-divider />


                <v-card-actions class="pa-4">

                  <v-btn
                    variant="text"
                    @click="clearFilters"
                  >
                    Clear
                  </v-btn>

                  <v-spacer />

                  <v-btn
                    color="primary"
                    rounded="lg"
                    @click="filterMenu = false"
                  >
                    Apply
                  </v-btn>

                </v-card-actions>

              </v-card>

            </v-menu>

          </div>


          <v-divider />


          <!-- SEARCH -->

          <div class="pa-5">

            <v-text-field
              v-model="search"
              label="Search Event"
              placeholder="Search event ID, name, organizer or location"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

          </div>


          <v-divider />


          <!-- TABLE -->

          <div class="table-wrapper">

            <v-table>

              <thead>

                <tr>

                  <th>Event ID</th>

                  <th>Event</th>

                  <th>Type</th>

                  <th>Organizer</th>

                  <th>Date</th>

                  <th>Time</th>

                  <th>Location</th>

                  <th>Participants</th>

                  <th class="text-center">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="event in paginatedEvents"
                  :key="event.id"
                >

                  <td>

                    <span class="font-weight-medium">
                      {{ event.id }}
                    </span>

                  </td>


                  <td>

                    <span class="font-weight-medium">
                      {{ event.name }}
                    </span>

                  </td>


                  <td>
                    {{ event.type }}
                  </td>


                  <td>
                    {{ event.organizer }}
                  </td>


                  <td>
                    {{ formatDate(event.date) }}
                  </td>


                  <td>
                    {{ formatTimeRange(event.startTime, event.endTime) }}
                  </td>


                  <td>
                    {{ event.location }}
                  </td>


                  <td>

                    <span class="font-weight-medium">
                      {{ event.participantCount }}
                    </span>

                  </td>


                  <td class="text-center">

                    <v-tooltip text="View">

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          icon="mdi-eye-outline"
                          variant="text"
                          size="small"
                          color="primary"
                          @click="viewEvent(event)"
                        />

                      </template>

                    </v-tooltip>

                  </td>

                </tr>


                <!-- EMPTY -->

                <tr
                  v-if="paginatedEvents.length === 0"
                >

                  <td
                    colspan="9"
                    class="text-center py-10"
                  >

                    <v-icon
                      size="48"
                      color="grey"
                      class="mb-3"
                    >
                      mdi-calendar-remove-outline
                    </v-icon>

                    <div class="text-body-1 font-weight-medium">
                      No events found
                    </div>

                    <div class="text-body-2 text-medium-emphasis mt-1">
                      Try changing your search or filter.
                    </div>

                  </td>

                </tr>

              </tbody>

            </v-table>

          </div>


          <!-- PAGINATION -->

          <v-divider />


          <div class="pagination-wrapper">

            <div class="d-flex align-center ga-2">

              <span class="text-body-2 text-medium-emphasis">
                Rows per page
              </span>

              <v-select
                v-model="itemsPerPage"
                :items="itemsPerPageOptions"
                variant="outlined"
                density="compact"
                hide-details
                rounded="lg"
                style="width: 90px"
              />

            </div>


            <div class="text-body-2 text-medium-emphasis">

              Showing

              <span class="font-weight-medium">
                {{ displayedStart }}
              </span>

              –

              <span class="font-weight-medium">
                {{ displayedEnd }}
              </span>

              of

              <span class="font-weight-medium">
                {{ filteredEvents.length }}
              </span>

            </div>


            <v-pagination
              v-model="page"
              :length="totalPages"
              :total-visible="5"
              density="comfortable"
              rounded="circle"
            />

          </div>

        </v-card>

      </v-window-item>


      <!-- ==========================================================
           NEW EVENT
           ========================================================== -->

      <v-window-item value="new">

        <v-row>

          <v-col
            cols="12"
            md="8"
          >

            <v-card
              rounded="xl"
              elevation="0"
              border
            >

              <v-card-title class="pa-5">

                <div>

                  <div class="text-h6 font-weight-bold">
                    New Event
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Enter event information to create a new event
                  </div>

                </div>

              </v-card-title>


              <v-divider />


              <v-card-text class="pa-5">

                <v-row>

                  <!-- EVENT ID -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="newEventId"
                      label="Event ID"
                      placeholder="e.g. EVT-011"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-identifier"
                    />

                  </v-col>


                  <!-- EVENT NAME -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="newEventName"
                      label="Event"
                      placeholder="e.g. Annual Company Dinner"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-calendar-text-outline"
                    />

                  </v-col>


                  <!-- EVENT TYPE -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-select
                      v-model="newEventType"
                      label="Event Type"
                      :items="eventTypeOptions"
                      variant="outlined"
                      rounded="lg"
                      clearable
                      prepend-inner-icon="mdi-shape-outline"
                    />

                  </v-col>


                  <!-- ORGANIZER -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="newEventOrganizer"
                      label="Organizer"
                      placeholder="e.g. Human Resource"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-account-tie-outline"
                    />

                  </v-col>


                  <!-- EVENT DATE -->

                  <v-col
                    cols="12"
                    md="4"
                  >

                    <v-text-field
                      v-model="newEventDate"
                      label="Event Date"
                      type="date"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-calendar-outline"
                    />

                  </v-col>


                  <!-- START TIME -->

                  <v-col
                    cols="12"
                    md="4"
                  >

                    <v-text-field
                      v-model="newEventStartTime"
                      label="Start Time"
                      type="time"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-clock-outline"
                    />

                  </v-col>


                  <!-- END TIME -->

                  <v-col
                    cols="12"
                    md="4"
                  >

                    <v-text-field
                      v-model="newEventEndTime"
                      label="End Time"
                      type="time"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-clock-end"
                    />

                  </v-col>


                  <!-- LOCATION -->

                  <v-col
                    cols="12"
                    md="8"
                  >

                    <v-text-field
                      v-model="newEventLocation"
                      label="Location"
                      placeholder="e.g. Main Hall"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-map-marker-outline"
                    />

                  </v-col>


                  <!-- PARTICIPANTS -->

                  <v-col
                    cols="12"
                    md="4"
                  >

                    <v-text-field
                      v-model.number="newEventParticipantCount"
                      label="Participants"
                      type="number"
                      min="0"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-account-group-outline"
                    />

                  </v-col>


                  <!-- DESCRIPTION -->

                  <v-col
                    cols="12"
                  >

                    <v-textarea
                      v-model="newEventDescription"
                      label="Description"
                      placeholder="Enter event description"
                      variant="outlined"
                      rounded="lg"
                      rows="4"
                      auto-grow
                    />

                  </v-col>

                </v-row>

              </v-card-text>


              <v-divider />


              <v-card-actions class="pa-5">

                <v-btn
                  variant="text"
                  @click="clearEventForm"
                >
                  Clear
                </v-btn>

                <v-spacer />

                <v-btn
                  color="primary"
                  rounded="lg"
                  :disabled="!canCreateEvent"
                  @click="createNewEvent"
                >
                  Create Event
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>


          <!-- PREVIEW -->

          <v-col
            cols="12"
            md="4"
          >

            <v-card
              rounded="xl"
              elevation="0"
              border
              height="100%"
            >

              <v-card-title class="pa-5">

                <div class="text-h6 font-weight-bold">
                  Preview
                </div>

              </v-card-title>


              <v-divider />


              <v-card-text class="pa-5">

                <div class="d-flex flex-column ga-4">

                  <!-- EVENT ID -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Event ID
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ newEventId || "-" }}
                    </div>

                  </div>


                  <!-- EVENT -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Event
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ newEventName || "-" }}
                    </div>

                  </div>


                  <!-- TYPE -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Event Type
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ newEventType || "-" }}
                    </div>

                  </div>


                  <!-- ORGANIZER -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Organizer
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ newEventOrganizer || "-" }}
                    </div>

                  </div>


                  <!-- DATE -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Event Date
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{
                        newEventDate
                          ? formatDate(newEventDate)
                          : "-"
                      }}
                    </div>

                  </div>


                  <!-- TIME -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Time
                    </div>

                    <div class="text-body-1 font-weight-medium">

                      {{
                        newEventStartTime &&
                        newEventEndTime
                          ? formatTimeRange(
                              newEventStartTime,
                              newEventEndTime
                            )
                          : "-"
                      }}

                    </div>

                  </div>


                  <!-- LOCATION -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Location
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ newEventLocation || "-" }}
                    </div>

                  </div>


                  <!-- PARTICIPANTS -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Participants
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ newEventParticipantCount ?? "-" }}
                    </div>

                  </div>


                  <!-- DESCRIPTION -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Description
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ newEventDescription || "-" }}
                    </div>

                  </div>

                </div>

              </v-card-text>

            </v-card>

          </v-col>

        </v-row>

      </v-window-item>


      <!-- ==========================================================
           UPCOMING EVENTS
           ========================================================== -->

      <v-window-item value="upcoming">

        <v-card
          rounded="xl"
          elevation="0"
          border
        >

          <!-- HEADER -->

          <div
            class="d-flex flex-wrap align-center justify-space-between pa-5"
          >

            <div>

              <h2 class="text-h6 font-weight-bold">
                Upcoming Events
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View upcoming organization events
              </p>

            </div>


            <!-- FILTER -->

            <v-menu
              v-model="upcomingFilterMenu"
              :close-on-content-click="false"
              location="bottom end"
            >

              <template #activator="{ props }">

                <v-btn
                  v-bind="props"
                  variant="outlined"
                  rounded="lg"
                  prepend-icon="mdi-filter-outline"
                >
                  Filter
                </v-btn>

              </template>


              <v-card
                width="320"
                rounded="lg"
                elevation="8"
              >

                <v-card-title
                  class="text-subtitle-1 font-weight-bold"
                >
                  Filter Upcoming Events
                </v-card-title>


                <v-divider />


                <v-card-text>

                  <v-select
                    v-model="upcomingTypeFilter"
                    label="Event Type"
                    :items="eventTypeOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-shape-outline"
                    class="mb-3"
                  />


                  <v-select
                    v-model="upcomingLocationFilter"
                    label="Location"
                    :items="locationOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-map-marker-outline"
                  />

                </v-card-text>


                <v-divider />


                <v-card-actions class="pa-4">

                  <v-btn
                    variant="text"
                    @click="clearUpcomingFilters"
                  >
                    Clear
                  </v-btn>

                  <v-spacer />

                  <v-btn
                    color="primary"
                    rounded="lg"
                    @click="upcomingFilterMenu = false"
                  >
                    Apply
                  </v-btn>

                </v-card-actions>

              </v-card>

            </v-menu>

          </div>


          <v-divider />


          <!-- SEARCH -->

          <div class="pa-5">

            <v-text-field
              v-model="upcomingSearch"
              label="Search Event"
              placeholder="Search event, organizer or location"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

          </div>


          <v-divider />


          <!-- UPCOMING CARDS -->

          <div class="pa-5">

            <v-row>

              <v-col
                v-for="event in paginatedUpcomingEvents"
                :key="event.id"
                cols="12"
                sm="6"
                lg="4"
              >

                <v-card
                  rounded="xl"
                  elevation="0"
                  class="event-card h-100"
                >

                  <!-- CARD HEADER -->

                  <div class="d-flex align-start pa-5">

                    <v-avatar
                      size="48"
                      color="primary"
                      variant="tonal"
                      class="mr-4"
                    >

                      <v-icon size="24">
                        mdi-calendar-clock-outline
                      </v-icon>

                    </v-avatar>


                    <div class="flex-grow-1">

                      <div class="text-subtitle-1 font-weight-bold">
                        {{ event.name }}
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        {{ event.id }}
                      </div>

                    </div>

                  </div>


                  <v-divider />


                  <!-- CARD CONTENT -->

                  <v-card-text class="pa-5">

                    <!-- TYPE -->

                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-shape-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Event Type
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ event.type }}
                        </div>

                      </div>

                    </div>


                    <!-- ORGANIZER -->

                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-account-tie-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Organizer
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ event.organizer }}
                        </div>

                      </div>

                    </div>


                    <!-- DATE -->

                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-calendar-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Event Date
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ formatDate(event.date) }}
                        </div>

                      </div>

                    </div>


                    <!-- TIME -->

                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-clock-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Time
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{
                            formatTimeRange(
                              event.startTime,
                              event.endTime
                            )
                          }}
                        </div>

                      </div>

                    </div>


                    <!-- LOCATION -->

                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-map-marker-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Location
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ event.location }}
                        </div>

                      </div>

                    </div>


                    <!-- PARTICIPANTS -->

                    <div class="d-flex align-start">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-account-group-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Participants
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ event.participantCount }}
                        </div>

                      </div>

                    </div>

                  </v-card-text>


                  <v-divider />


                  <!-- ACTIONS -->

                  <v-card-actions class="pa-4">

                    <v-btn
                      variant="outlined"
                      rounded="lg"
                      prepend-icon="mdi-eye-outline"
                      color="primary"
                      @click="viewEvent(event)"
                    >
                      View
                    </v-btn>

                  </v-card-actions>

                </v-card>

              </v-col>


              <!-- EMPTY -->

              <v-col
                v-if="paginatedUpcomingEvents.length === 0"
                cols="12"
              >

                <div class="text-center py-10">

                  <v-icon
                    size="48"
                    color="grey"
                    class="mb-3"
                  >
                    mdi-calendar-remove-outline
                  </v-icon>

                  <div class="text-body-1 font-weight-medium">
                    No upcoming events found
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Upcoming events will appear here.
                  </div>

                </div>

              </v-col>

            </v-row>

          </div>


          <v-divider />


          <!-- PAGINATION -->

          <div class="pagination-wrapper">

            <div class="d-flex align-center ga-2">

              <span class="text-body-2 text-medium-emphasis">
                Rows per page
              </span>

              <v-select
                v-model="upcomingItemsPerPage"
                :items="itemsPerPageOptions"
                variant="outlined"
                density="compact"
                hide-details
                rounded="lg"
                style="width: 90px"
              />

            </div>


            <div class="text-body-2 text-medium-emphasis">

              Showing

              <span class="font-weight-medium">
                {{ upcomingDisplayedStart }}
              </span>

              –

              <span class="font-weight-medium">
                {{ upcomingDisplayedEnd }}
              </span>

              of

              <span class="font-weight-medium">
                {{ filteredUpcomingEvents.length }}
              </span>

            </div>


            <v-pagination
              v-model="upcomingPage"
              :length="upcomingTotalPages"
              :total-visible="5"
              density="comfortable"
              rounded="circle"
            />

          </div>

        </v-card>

      </v-window-item>


      <!-- ==========================================================
           PAST EVENTS
           ========================================================== -->

      <v-window-item value="past">

        <v-card
          rounded="xl"
          elevation="0"
          border
        >

          <!-- HEADER -->

          <div
            class="d-flex flex-wrap align-center justify-space-between pa-5"
          >

            <div>

              <h2 class="text-h6 font-weight-bold">
                Past Events
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View previous organization events
              </p>

            </div>


            <!-- FILTER -->

            <v-menu
              v-model="pastFilterMenu"
              :close-on-content-click="false"
              location="bottom end"
            >

              <template #activator="{ props }">

                <v-btn
                  v-bind="props"
                  variant="outlined"
                  rounded="lg"
                  prepend-icon="mdi-filter-outline"
                >
                  Filter
                </v-btn>

              </template>


              <v-card
                width="320"
                rounded="lg"
                elevation="8"
              >

                <v-card-title
                  class="text-subtitle-1 font-weight-bold"
                >
                  Filter Past Events
                </v-card-title>


                <v-divider />


                <v-card-text>

                  <v-select
                    v-model="pastTypeFilter"
                    label="Event Type"
                    :items="eventTypeOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-shape-outline"
                  />

                </v-card-text>


                <v-divider />


                <v-card-actions class="pa-4">

                  <v-btn
                    variant="text"
                    @click="clearPastFilters"
                  >
                    Clear
                  </v-btn>

                  <v-spacer />

                  <v-btn
                    color="primary"
                    rounded="lg"
                    @click="pastFilterMenu = false"
                  >
                    Apply
                  </v-btn>

                </v-card-actions>

              </v-card>

            </v-menu>

          </div>


          <v-divider />


          <!-- SEARCH -->

          <div class="pa-5">

            <v-text-field
              v-model="pastSearch"
              label="Search Event"
              placeholder="Search event, organizer or location"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

          </div>


          <v-divider />


          <!-- PAST CARDS -->

          <div class="pa-5">

            <v-row>

              <v-col
                v-for="event in paginatedPastEvents"
                :key="event.id"
                cols="12"
                sm="6"
                lg="4"
              >

                <v-card
                  rounded="xl"
                  elevation="0"
                  class="event-card h-100"
                >

                  <!-- CARD HEADER -->

                  <div class="d-flex align-start pa-5">

                    <v-avatar
                      size="48"
                      color="grey"
                      variant="tonal"
                      class="mr-4"
                    >

                      <v-icon size="24">
                        mdi-calendar-check-outline
                      </v-icon>

                    </v-avatar>


                    <div class="flex-grow-1">

                      <div class="text-subtitle-1 font-weight-bold">
                        {{ event.name }}
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        {{ event.id }}
                      </div>

                    </div>

                  </div>


                  <v-divider />


                  <!-- CARD CONTENT -->

                  <v-card-text class="pa-5">

                    <!-- TYPE -->

                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-shape-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Event Type
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ event.type }}
                        </div>

                      </div>

                    </div>


                    <!-- ORGANIZER -->

                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-account-tie-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Organizer
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ event.organizer }}
                        </div>

                      </div>

                    </div>


                    <!-- DATE -->

                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-calendar-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Event Date
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ formatDate(event.date) }}
                        </div>

                      </div>

                    </div>


                    <!-- TIME -->

                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-clock-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Time
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{
                            formatTimeRange(
                              event.startTime,
                              event.endTime
                            )
                          }}
                        </div>

                      </div>

                    </div>


                    <!-- LOCATION -->

                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-map-marker-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Location
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ event.location }}
                        </div>

                      </div>

                    </div>


                    <!-- PARTICIPANTS -->

                    <div class="d-flex align-start">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-account-group-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Participants
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ event.participantCount }}
                        </div>

                      </div>

                    </div>

                  </v-card-text>


                  <v-divider />


                  <!-- ACTIONS -->

                  <v-card-actions class="pa-4">

                    <v-btn
                      variant="outlined"
                      rounded="lg"
                      prepend-icon="mdi-eye-outline"
                      color="primary"
                      @click="viewEvent(event)"
                    >
                      View
                    </v-btn>

                  </v-card-actions>

                </v-card>

              </v-col>


              <!-- EMPTY -->

              <v-col
                v-if="paginatedPastEvents.length === 0"
                cols="12"
              >

                <div class="text-center py-10">

                  <v-icon
                    size="48"
                    color="grey"
                    class="mb-3"
                  >
                    mdi-calendar-remove-outline
                  </v-icon>

                  <div class="text-body-1 font-weight-medium">
                    No past events found
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Past events will appear here.
                  </div>

                </div>

              </v-col>

            </v-row>

          </div>


          <v-divider />


          <!-- PAGINATION -->

          <div class="pagination-wrapper">

            <div class="d-flex align-center ga-2">

              <span class="text-body-2 text-medium-emphasis">
                Rows per page
              </span>

              <v-select
                v-model="pastItemsPerPage"
                :items="itemsPerPageOptions"
                variant="outlined"
                density="compact"
                hide-details
                rounded="lg"
                style="width: 90px"
              />

            </div>


            <div class="text-body-2 text-medium-emphasis">

              Showing

              <span class="font-weight-medium">
                {{ pastDisplayedStart }}
              </span>

              –

              <span class="font-weight-medium">
                {{ pastDisplayedEnd }}
              </span>

              of

              <span class="font-weight-medium">
                {{ filteredPastEvents.length }}
              </span>

            </div>


            <v-pagination
              v-model="pastPage"
              :length="pastTotalPages"
              :total-visible="5"
              density="comfortable"
              rounded="circle"
            />

          </div>

        </v-card>

      </v-window-item>

    </v-window>


    <!-- ============================================================
         EVENT DETAILS
         ============================================================ -->

    <v-dialog
      v-model="eventDetailsDialog"
      max-width="700"
    >

      <v-card
        v-if="selectedEvent"
        rounded="xl"
      >

        <v-card-title class="d-flex align-center pa-5">

          <div>

            <div class="text-h6 font-weight-bold">
              Event Details
            </div>

            <div class="text-body-2 text-medium-emphasis mt-1">
              Event information
            </div>

          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeEventDetails"
          />

        </v-card-title>


        <v-divider />


        <v-card-text class="pa-5">

          <!-- EVENT HEADER -->

          <div class="d-flex align-center mb-5">

            <v-avatar
              size="56"
              color="primary"
              variant="tonal"
              class="mr-4"
            >

              <v-icon size="28">
                mdi-calendar-star-outline
              </v-icon>

            </v-avatar>


            <div>

              <div class="text-h6 font-weight-bold">
                {{ selectedEvent.name }}
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ selectedEvent.id }}
              </div>

            </div>

          </div>


          <v-row>

            <!-- EVENT ID -->

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Event ID
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedEvent.id }}
              </div>

            </v-col>


            <!-- EVENT -->

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Event
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedEvent.name }}
              </div>

            </v-col>


            <!-- TYPE -->

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Event Type
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedEvent.type }}
              </div>

            </v-col>


            <!-- ORGANIZER -->

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Organizer
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedEvent.organizer }}
              </div>

            </v-col>


            <!-- DATE -->

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Event Date
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ formatDate(selectedEvent.date) }}
              </div>

            </v-col>


            <!-- TIME -->

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Time
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{
                  formatTimeRange(
                    selectedEvent.startTime,
                    selectedEvent.endTime
                  )
                }}
              </div>

            </v-col>


            <!-- LOCATION -->

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Location
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedEvent.location }}
              </div>

            </v-col>


            <!-- PARTICIPANTS -->

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Participants
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedEvent.participantCount }}
              </div>

            </v-col>


            <!-- DESCRIPTION -->

            <v-col cols="12">

              <div class="text-caption text-medium-emphasis">
                Description
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedEvent.description || "-" }}
              </div>

            </v-col>

          </v-row>

        </v-card-text>


        <v-divider />


        <v-card-actions class="pa-4">

          <v-spacer />

          <v-btn
            variant="outlined"
            rounded="lg"
            @click="closeEventDetails"
          >
            Close
          </v-btn>

        </v-card-actions>

      </v-card>

    </v-dialog>


    <!-- ============================================================
         SNACKBAR
         ============================================================ -->

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      location="bottom right"
      :timeout="3000"
    >

      {{ snackbarMessage }}

      <template #actions>

        <v-btn
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>

      </template>

    </v-snackbar>

  </v-container>

</template>


<script setup lang="ts">

import {
  computed,
  ref,
  watch,
} from "vue"

import AppSummaryCard from "@/components/common/AppSummaryCard.vue"


/* */

type EventItem = {

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


/* */

const tab =
  ref("list")


/* */

const events =
  ref<EventItem[]>([

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


/* */

const eventTypeOptions =
  computed(() => {

    return [
      ...new Set(
        events.value.map(
          event => event.type
        )
      ),
    ]

  })


const organizerOptions =
  computed(() => {

    return [
      ...new Set(
        events.value.map(
          event => event.organizer
        )
      ),
    ]

  })


const locationOptions =
  computed(() => {

    return [
      ...new Set(
        events.value.map(
          event => event.location
        )
      ),
    ]

  })


/* */

const filterMenu =
  ref(false)

const search =
  ref("")

const eventTypeFilter =
  ref<string | null>(null)

const organizerFilter =
  ref<string | null>(null)

const locationFilter =
  ref<string | null>(null)


const filteredEvents =
  computed(() => {

    const keyword =
      search.value
        .trim()
        .toLowerCase()


    return events.value.filter(
      event => {

        const searchMatch =
          !keyword ||
          event.id
            .toLowerCase()
            .includes(keyword) ||
          event.name
            .toLowerCase()
            .includes(keyword) ||
          event.type
            .toLowerCase()
            .includes(keyword) ||
          event.organizer
            .toLowerCase()
            .includes(keyword) ||
          event.location
            .toLowerCase()
            .includes(keyword)


        const typeMatch =
          !eventTypeFilter.value ||
          event.type ===
            eventTypeFilter.value


        const organizerMatch =
          !organizerFilter.value ||
          event.organizer ===
            organizerFilter.value


        const locationMatch =
          !locationFilter.value ||
          event.location ===
            locationFilter.value


        return (
          searchMatch &&
          typeMatch &&
          organizerMatch &&
          locationMatch
        )

      }
    )

  })


/* */

const page =
  ref(1)

const itemsPerPage =
  ref(5)

const itemsPerPageOptions = [
  5,
  10,
  20,
  50,
]


const totalPages =
  computed(() => {

    return Math.max(
      1,
      Math.ceil(
        filteredEvents.value.length /
          itemsPerPage.value
      )
    )

  })


const paginatedEvents =
  computed(() => {

    const start =
      (page.value - 1) *
      itemsPerPage.value

    const end =
      start +
      itemsPerPage.value

    return filteredEvents.value.slice(
      start,
      end
    )

  })


const displayedStart =
  computed(() => {

    if (
      filteredEvents.value.length === 0
    ) {

      return 0

    }

    return (
      (page.value - 1) *
      itemsPerPage.value
    ) + 1

  })


const displayedEnd =
  computed(() => {

    return Math.min(
      page.value *
        itemsPerPage.value,
      filteredEvents.value.length
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

  }
)


watch(
  totalPages,
  total => {

    if (
      page.value > total
    ) {

      page.value = total

    }

  }
)


function clearFilters() {

  search.value = ""

  eventTypeFilter.value =
    null

  organizerFilter.value =
    null

  locationFilter.value =
    null

  page.value = 1

}


/* */

function getToday() {

  const today =
    new Date()

  const year =
    today.getFullYear()

  const month =
    String(
      today.getMonth() + 1
    ).padStart(2, "0")

  const day =
    String(
      today.getDate()
    ).padStart(2, "0")

  return `${year}-${month}-${day}`

}


const totalEventCount =
  computed(() => {

    return events.value.length

  })


const upcomingEventCount =
  computed(() => {

    return events.value.filter(
      event =>
        event.date >= getToday()
    ).length

  })


const pastEventCount =
  computed(() => {

    return events.value.filter(
      event =>
        event.date < getToday()
    ).length

  })


const totalParticipantCount =
  computed(() => {

    return events.value.reduce(
      (
        total,
        event
      ) =>
        total +
        event.participantCount,
      0
    )

  })


/* */

const newEventId =
  ref("")

const newEventName =
  ref("")

const newEventType =
  ref<string | null>(null)

const newEventOrganizer =
  ref("")

const newEventDate =
  ref("")

const newEventStartTime =
  ref("")

const newEventEndTime =
  ref("")

const newEventLocation =
  ref("")

const newEventParticipantCount =
  ref<number | null>(null)

const newEventDescription =
  ref("")


const canCreateEvent =
  computed(() => {

    return (
      newEventId.value.trim() !== "" &&
      newEventName.value.trim() !== "" &&
      newEventType.value !== null &&
      newEventOrganizer.value.trim() !== "" &&
      newEventDate.value.trim() !== "" &&
      newEventStartTime.value.trim() !== "" &&
      newEventEndTime.value.trim() !== "" &&
      newEventLocation.value.trim() !== "" &&
      newEventParticipantCount.value !== null
    )

  })


function createNewEvent() {

  if (
    !canCreateEvent.value
  ) {

    return

  }


  const eventId =
    newEventId.value.trim()


  const duplicate =
    events.value.some(
      event =>
        event.id.toLowerCase() ===
        eventId.toLowerCase()
    )


  if (duplicate) {

    snackbarMessage.value =
      "Event ID already exists."

    snackbarColor.value =
      "error"

    snackbar.value =
      true

    return

  }


  const newEvent: EventItem = {

    id:
      eventId,

    name:
      newEventName.value.trim(),

    type:
      newEventType.value as string,

    organizer:
      newEventOrganizer.value.trim(),

    date:
      newEventDate.value,

    startTime:
      newEventStartTime.value,

    endTime:
      newEventEndTime.value,

    location:
      newEventLocation.value.trim(),

    participantCount:
      newEventParticipantCount.value || 0,

    description:
      newEventDescription.value.trim(),

  }


  events.value.push(
    newEvent
  )


  clearEventForm()


  snackbarMessage.value =
    "Event created successfully."

  snackbarColor.value =
    "success"

  snackbar.value =
    true


  tab.value =
    "list"

  page.value =
    1

}


function clearEventForm() {

  newEventId.value =
    ""

  newEventName.value =
    ""

  newEventType.value =
    null

  newEventOrganizer.value =
    ""

  newEventDate.value =
    ""

  newEventStartTime.value =
    ""

  newEventEndTime.value =
    ""

  newEventLocation.value =
    ""

  newEventParticipantCount.value =
    null

  newEventDescription.value =
    ""

}


/* */

const upcomingFilterMenu =
  ref(false)

const upcomingSearch =
  ref("")

const upcomingTypeFilter =
  ref<string | null>(null)

const upcomingLocationFilter =
  ref<string | null>(null)


const filteredUpcomingEvents =
  computed(() => {

    const keyword =
      upcomingSearch.value
        .trim()
        .toLowerCase()


    return events.value.filter(
      event => {

        if (
          event.date < getToday()
        ) {

          return false

        }


        const searchMatch =
          !keyword ||
          event.id
            .toLowerCase()
            .includes(keyword) ||
          event.name
            .toLowerCase()
            .includes(keyword) ||
          event.organizer
            .toLowerCase()
            .includes(keyword) ||
          event.location
            .toLowerCase()
            .includes(keyword)


        const typeMatch =
          !upcomingTypeFilter.value ||
          event.type ===
            upcomingTypeFilter.value


        const locationMatch =
          !upcomingLocationFilter.value ||
          event.location ===
            upcomingLocationFilter.value


        return (
          searchMatch &&
          typeMatch &&
          locationMatch
        )

      }
    ).sort(
      (
        a,
        b
      ) =>
        a.date.localeCompare(
          b.date
        )
    )

  })


const upcomingPage =
  ref(1)

const upcomingItemsPerPage =
  ref(5)


const upcomingTotalPages =
  computed(() => {

    return Math.max(
      1,
      Math.ceil(
        filteredUpcomingEvents.value.length /
          upcomingItemsPerPage.value
      )
    )

  })


const paginatedUpcomingEvents =
  computed(() => {

    const start =
      (upcomingPage.value - 1) *
      upcomingItemsPerPage.value

    const end =
      start +
      upcomingItemsPerPage.value

    return filteredUpcomingEvents.value.slice(
      start,
      end
    )

  })


const upcomingDisplayedStart =
  computed(() => {

    if (
      filteredUpcomingEvents.value.length === 0
    ) {

      return 0

    }

    return (
      (upcomingPage.value - 1) *
      upcomingItemsPerPage.value
    ) + 1

  })


const upcomingDisplayedEnd =
  computed(() => {

    return Math.min(
      upcomingPage.value *
        upcomingItemsPerPage.value,
      filteredUpcomingEvents.value.length
    )

  })


watch(
  [
    upcomingSearch,
    upcomingTypeFilter,
    upcomingLocationFilter,
    upcomingItemsPerPage,
  ],
  () => {

    upcomingPage.value =
      1

  }
)


watch(
  upcomingTotalPages,
  total => {

    if (
      upcomingPage.value > total
    ) {

      upcomingPage.value =
        total

    }

  }
)


function clearUpcomingFilters() {

  upcomingSearch.value =
    ""

  upcomingTypeFilter.value =
    null

  upcomingLocationFilter.value =
    null

  upcomingPage.value =
    1

}


/* */

const pastFilterMenu =
  ref(false)

const pastSearch =
  ref("")

const pastTypeFilter =
  ref<string | null>(null)


const filteredPastEvents =
  computed(() => {

    const keyword =
      pastSearch.value
        .trim()
        .toLowerCase()


    return events.value.filter(
      event => {

        if (
          event.date >= getToday()
        ) {

          return false

        }


        const searchMatch =
          !keyword ||
          event.id
            .toLowerCase()
            .includes(keyword) ||
          event.name
            .toLowerCase()
            .includes(keyword) ||
          event.organizer
            .toLowerCase()
            .includes(keyword) ||
          event.location
            .toLowerCase()
            .includes(keyword)


        const typeMatch =
          !pastTypeFilter.value ||
          event.type ===
            pastTypeFilter.value


        return (
          searchMatch &&
          typeMatch
        )

      }
    ).sort(
      (
        a,
        b
      ) =>
        b.date.localeCompare(
          a.date
        )
    )

  })


const pastPage =
  ref(1)

const pastItemsPerPage =
  ref(5)


const pastTotalPages =
  computed(() => {

    return Math.max(
      1,
      Math.ceil(
        filteredPastEvents.value.length /
          pastItemsPerPage.value
      )
    )

  })


const paginatedPastEvents =
  computed(() => {

    const start =
      (pastPage.value - 1) *
      pastItemsPerPage.value

    const end =
      start +
      pastItemsPerPage.value

    return filteredPastEvents.value.slice(
      start,
      end
    )

  })


const pastDisplayedStart =
  computed(() => {

    if (
      filteredPastEvents.value.length === 0
    ) {

      return 0

    }

    return (
      (pastPage.value - 1) *
      pastItemsPerPage.value
    ) + 1

  })


const pastDisplayedEnd =
  computed(() => {

    return Math.min(
      pastPage.value *
        pastItemsPerPage.value,
      filteredPastEvents.value.length
    )

  })


watch(
  [
    pastSearch,
    pastTypeFilter,
    pastItemsPerPage,
  ],
  () => {

    pastPage.value =
      1

  }
)


watch(
  pastTotalPages,
  total => {

    if (
      pastPage.value > total
    ) {

      pastPage.value =
        total

    }

  }
)


function clearPastFilters() {

  pastSearch.value =
    ""

  pastTypeFilter.value =
    null

  pastPage.value =
    1

}


/* */

const eventDetailsDialog =
  ref(false)

const selectedEvent =
  ref<EventItem | null>(null)


function viewEvent(
  event: EventItem
) {

  selectedEvent.value =
    event

  eventDetailsDialog.value =
    true

}


function closeEventDetails() {

  eventDetailsDialog.value =
    false

  selectedEvent.value =
    null

}


/* */

function formatDate(
  date: string
) {

  if (!date) {

    return "-"

  }


  const value =
    new Date(
      `${date}T00:00:00`
    )


  return value.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  )

}


function formatTime(
  time: string
) {

  if (!time) {

    return "-"

  }


  const [
    hour,
    minute,
  ] =
    time
      .split(":")
      .map(Number)


  const value =
    new Date()


  value.setHours(
    hour,
    minute,
    0,
    0
  )


  return value.toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  )

}


function formatTimeRange(
  startTime: string,
  endTime: string
) {

  return (
    `${formatTime(startTime)} - ` +
    `${formatTime(endTime)}`
  )

}


/* */

const snackbar =
  ref(false)

const snackbarMessage =
  ref("")

const snackbarColor =
  ref("success")

</script>


<style scoped>

.table-wrapper {

  width: 100%;

  overflow-x: auto;

}


.table-wrapper :deep(table) {

  min-width: 1200px;

}


.table-wrapper :deep(th) {

  white-space: nowrap;

  font-weight: 600;

  font-size: 13px;

}


.table-wrapper :deep(td) {

  white-space: nowrap;

  font-size: 14px;

}


/* */

.pagination-wrapper {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 16px;

  padding: 16px 20px;

  flex-wrap: wrap;

}


@media (max-width: 960px) {

  .pagination-wrapper {

    justify-content: center;

  }

}


@media (max-width: 700px) {

  .pagination-wrapper {

    flex-direction: column;

    align-items: center;

  }

}


/* */

.event-card {

  border: 1px solid #d9d9d9 !important;

  border-radius: 16px !important;

  overflow: hidden;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

}


.event-card:hover {

  transform: translateY(-2px);

  border-color: #bdbdbd !important;

  box-shadow:
    0 4px 12px
    rgba(0, 0, 0, 0.08) !important;

}

</style>