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
        Announcements
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
          Announcement Management
        </h1>

        <p class="text-body-2 text-medium-emphasis mt-1">
          Manage organization announcements and communications
        </p>

      </div>


      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded="lg"
        @click="tab = 'new'"
      >
        New Announcement
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
          title="Total Announcements"
          :value="totalAnnouncementCount"
          icon="mdi-bullhorn-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Published"
          :value="publishedAnnouncementCount"
          icon="mdi-bullhorn"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Scheduled"
          :value="scheduledAnnouncementCount"
          icon="mdi-calendar-clock-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Expired"
          :value="expiredAnnouncementCount"
          icon="mdi-calendar-remove-outline"
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
            mdi-bullhorn-outline
          </v-icon>

          Announcements

        </v-tab>


        <v-tab value="new">

          <v-icon start>
            mdi-plus-box-outline
          </v-icon>

          New Announcement

        </v-tab>


        <v-tab value="published">

          <v-icon start>
            mdi-bullhorn
          </v-icon>

          Published

        </v-tab>


        <v-tab value="scheduled">

          <v-icon start>
            mdi-calendar-clock-outline
          </v-icon>

          Scheduled

        </v-tab>


        <v-tab value="expired">

          <v-icon start>
            mdi-calendar-remove-outline
          </v-icon>

          Expired

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
           ANNOUNCEMENTS
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
                Announcement List
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage organization announcements
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
                width="330"
                rounded="lg"
                elevation="8"
              >

                <v-card-title
                  class="text-subtitle-1 font-weight-bold"
                >
                  Filter Announcements
                </v-card-title>


                <v-divider />


                <v-card-text>

                  <v-select
                    v-model="categoryFilter"
                    label="Category"
                    :items="categoryOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-shape-outline"
                    class="mb-3"
                  />


                  <v-select
                    v-model="targetAudienceFilter"
                    label="Target Audience"
                    :items="targetAudienceOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-account-group-outline"
                    class="mb-3"
                  />


                  <v-select
                    v-model="statusFilter"
                    label="Status"
                    :items="statusOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-list-status"
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
              label="Search Announcement"
              placeholder="Search title, category, author or target audience"
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

                  <th>Announcement ID</th>

                  <th>Title</th>

                  <th>Category</th>

                  <th>Target Audience</th>

                  <th>Publish Date</th>

                  <th>Expiry Date</th>

                  <th>Author</th>

                  <th>Status</th>

                  <th class="text-center">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="announcement in paginatedAnnouncements"
                  :key="announcement.id"
                >

                  <td>

                    <span class="font-weight-medium">
                      {{ announcement.id }}
                    </span>

                  </td>


                  <td>

                    <span class="font-weight-medium">
                      {{ announcement.title }}
                    </span>

                  </td>


                  <td>
                    {{ announcement.category }}
                  </td>


                  <td>
                    {{ announcement.targetAudience }}
                  </td>


                  <td>
                    {{ formatDate(announcement.publishDate) }}
                  </td>


                  <td>
                    {{ formatDate(announcement.expiryDate) }}
                  </td>


                  <td>
                    {{ announcement.author }}
                  </td>


                  <td>

                    <v-chip
                      size="small"
                      variant="tonal"
                      :color="getStatusColor(announcement.status)"
                    >
                      {{ announcement.status }}
                    </v-chip>

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
                          @click="viewAnnouncement(announcement)"
                        />

                      </template>

                    </v-tooltip>

                  </td>

                </tr>


                <!-- EMPTY -->

                <tr
                  v-if="paginatedAnnouncements.length === 0"
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
                      mdi-bullhorn-outline
                    </v-icon>

                    <div class="text-body-1 font-weight-medium">
                      No announcements found
                    </div>

                    <div class="text-body-2 text-medium-emphasis mt-1">
                      Try changing your search or filter.
                    </div>

                  </td>

                </tr>

              </tbody>

            </v-table>

          </div>


          <v-divider />


          <!-- PAGINATION -->

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
                {{ filteredAnnouncements.length }}
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
           NEW ANNOUNCEMENT
           ========================================================== -->

      <v-window-item value="new">

        <v-row>

          <!-- FORM -->

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
                    New Announcement
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Create a new organization announcement
                  </div>

                </div>

              </v-card-title>


              <v-divider />


              <v-card-text class="pa-5">

                <v-row>

                  <!-- ANNOUNCEMENT ID -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="newAnnouncementId"
                      label="Announcement ID"
                      placeholder="e.g. ANN-011"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-identifier"
                    />

                  </v-col>


                  <!-- TITLE -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="newAnnouncementTitle"
                      label="Title"
                      placeholder="Enter announcement title"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-bullhorn-outline"
                    />

                  </v-col>


                  <!-- CATEGORY -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-select
                      v-model="newAnnouncementCategory"
                      label="Category"
                      :items="categoryOptions"
                      variant="outlined"
                      rounded="lg"
                      clearable
                      prepend-inner-icon="mdi-shape-outline"
                    />

                  </v-col>


                  <!-- TARGET AUDIENCE -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-select
                      v-model="newAnnouncementTargetAudience"
                      label="Target Audience"
                      :items="targetAudienceOptions"
                      variant="outlined"
                      rounded="lg"
                      clearable
                      prepend-inner-icon="mdi-account-group-outline"
                    />

                  </v-col>


                  <!-- PUBLISH DATE -->

                  <v-col
                    cols="12"
                    md="4"
                  >

                    <v-text-field
                      v-model="newAnnouncementPublishDate"
                      label="Publish Date"
                      type="date"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-calendar-outline"
                    />

                  </v-col>


                  <!-- EXPIRY DATE -->

                  <v-col
                    cols="12"
                    md="4"
                  >

                    <v-text-field
                      v-model="newAnnouncementExpiryDate"
                      label="Expiry Date"
                      type="date"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-calendar-remove-outline"
                    />

                  </v-col>


                  <!-- AUTHOR -->

                  <v-col
                    cols="12"
                    md="4"
                  >

                    <v-text-field
                      v-model="newAnnouncementAuthor"
                      label="Author"
                      placeholder="e.g. Corporate Affairs"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-account-outline"
                    />

                  </v-col>


                  <!-- CONTENT -->

                  <v-col cols="12">

                    <v-textarea
                      v-model="newAnnouncementContent"
                      label="Announcement Content"
                      placeholder="Enter announcement content"
                      variant="outlined"
                      rounded="lg"
                      rows="7"
                      auto-grow
                      prepend-inner-icon="mdi-text-box-outline"
                    />

                  </v-col>

                </v-row>

              </v-card-text>


              <v-divider />


              <v-card-actions class="pa-5">

                <v-btn
                  variant="text"
                  @click="clearAnnouncementForm"
                >
                  Clear
                </v-btn>

                <v-spacer />

                <v-btn
                  color="primary"
                  rounded="lg"
                  :disabled="!canCreateAnnouncement"
                  @click="createAnnouncement"
                >
                  Create Announcement
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

                <div class="announcement-preview">

                  <div class="d-flex align-start mb-5">

                    <v-avatar
                      size="48"
                      color="primary"
                      variant="tonal"
                      class="mr-4"
                    >

                      <v-icon>
                        mdi-bullhorn-outline
                      </v-icon>

                    </v-avatar>


                    <div>

                      <div class="text-h6 font-weight-bold">
                        {{ newAnnouncementTitle || "Announcement Title" }}
                      </div>

                      <div class="text-body-2 text-medium-emphasis mt-1">
                        {{ newAnnouncementId || "ANN-000" }}
                      </div>

                    </div>

                  </div>


                  <div class="d-flex flex-wrap ga-2 mb-5">

                    <v-chip
                      v-if="newAnnouncementCategory"
                      size="small"
                      variant="tonal"
                      color="primary"
                    >
                      {{ newAnnouncementCategory }}
                    </v-chip>


                    <v-chip
                      v-if="newAnnouncementTargetAudience"
                      size="small"
                      variant="tonal"
                    >
                      {{ newAnnouncementTargetAudience }}
                    </v-chip>

                  </div>


                  <div class="d-flex flex-column ga-4">

                    <div>

                      <div class="text-caption text-medium-emphasis">
                        Publish Date
                      </div>

                      <div class="text-body-2 font-weight-medium">
                        {{
                          newAnnouncementPublishDate
                            ? formatDate(newAnnouncementPublishDate)
                            : "-"
                        }}
                      </div>

                    </div>


                    <div>

                      <div class="text-caption text-medium-emphasis">
                        Expiry Date
                      </div>

                      <div class="text-body-2 font-weight-medium">
                        {{
                          newAnnouncementExpiryDate
                            ? formatDate(newAnnouncementExpiryDate)
                            : "-"
                        }}
                      </div>

                    </div>


                    <div>

                      <div class="text-caption text-medium-emphasis">
                        Author
                      </div>

                      <div class="text-body-2 font-weight-medium">
                        {{ newAnnouncementAuthor || "-" }}
                      </div>

                    </div>


                    <div>

                      <div class="text-caption text-medium-emphasis">
                        Content
                      </div>

                      <div class="text-body-2">
                        {{ newAnnouncementContent || "-" }}
                      </div>

                    </div>

                  </div>

                </div>

              </v-card-text>

            </v-card>

          </v-col>

        </v-row>

      </v-window-item>


      <!-- ==========================================================
           PUBLISHED
           ========================================================== -->

      <v-window-item value="published">

        <v-card
          rounded="xl"
          elevation="0"
          border
        >

          <div
            class="d-flex flex-wrap align-center justify-space-between pa-5"
          >

            <div>

              <h2 class="text-h6 font-weight-bold">
                Published Announcements
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                Announcements currently published to users
              </p>

            </div>


            <v-menu
              v-model="publishedFilterMenu"
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
                width="300"
                rounded="lg"
                elevation="8"
              >

                <v-card-title
                  class="text-subtitle-1 font-weight-bold"
                >
                  Filter Published
                </v-card-title>


                <v-divider />


                <v-card-text>

                  <v-select
                    v-model="publishedCategoryFilter"
                    label="Category"
                    :items="categoryOptions"
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
                    @click="clearPublishedFilters"
                  >
                    Clear
                  </v-btn>

                  <v-spacer />

                  <v-btn
                    color="primary"
                    rounded="lg"
                    @click="publishedFilterMenu = false"
                  >
                    Apply
                  </v-btn>

                </v-card-actions>

              </v-card>

            </v-menu>

          </div>


          <v-divider />


          <div class="pa-5">

            <v-text-field
              v-model="publishedSearch"
              label="Search Announcement"
              placeholder="Search title, category or author"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

          </div>


          <v-divider />


          <div class="pa-5">

            <v-row>

              <v-col
                v-for="announcement in paginatedPublishedAnnouncements"
                :key="announcement.id"
                cols="12"
                sm="6"
                lg="4"
              >

                <v-card
                  rounded="xl"
                  elevation="0"
                  class="announcement-card h-100"
                >

                  <div class="d-flex align-start pa-5">

                    <v-avatar
                      size="48"
                      color="primary"
                      variant="tonal"
                      class="mr-4"
                    >

                      <v-icon>
                        mdi-bullhorn
                      </v-icon>

                    </v-avatar>


                    <div class="flex-grow-1">

                      <div class="text-subtitle-1 font-weight-bold">
                        {{ announcement.title }}
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        {{ announcement.id }}
                      </div>

                    </div>

                  </div>


                  <v-divider />


                  <v-card-text class="pa-5">

                    <div class="d-flex flex-wrap ga-2 mb-5">

                      <v-chip
                        size="small"
                        variant="tonal"
                        color="primary"
                      >
                        {{ announcement.category }}
                      </v-chip>

                      <v-chip
                        size="small"
                        variant="tonal"
                      >
                        {{ announcement.targetAudience }}
                      </v-chip>

                    </div>


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
                          Publish Date
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ formatDate(announcement.publishDate) }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-calendar-remove-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Expiry Date
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ formatDate(announcement.expiryDate) }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-account-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Author
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ announcement.author }}
                        </div>

                      </div>

                    </div>

                  </v-card-text>


                  <v-divider />


                  <v-card-actions class="pa-4">

                    <v-btn
                      variant="outlined"
                      rounded="lg"
                      prepend-icon="mdi-eye-outline"
                      color="primary"
                      @click="viewAnnouncement(announcement)"
                    >
                      View
                    </v-btn>

                  </v-card-actions>

                </v-card>

              </v-col>


              <v-col
                v-if="paginatedPublishedAnnouncements.length === 0"
                cols="12"
              >

                <div class="text-center py-10">

                  <v-icon
                    size="48"
                    color="grey"
                    class="mb-3"
                  >
                    mdi-bullhorn-outline
                  </v-icon>

                  <div class="text-body-1 font-weight-medium">
                    No published announcements found
                  </div>

                </div>

              </v-col>

            </v-row>

          </div>


          <v-divider />


          <div class="pagination-wrapper">

            <div class="d-flex align-center ga-2">

              <span class="text-body-2 text-medium-emphasis">
                Rows per page
              </span>

              <v-select
                v-model="publishedItemsPerPage"
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
                {{ publishedDisplayedStart }}
              </span>

              –

              <span class="font-weight-medium">
                {{ publishedDisplayedEnd }}
              </span>

              of

              <span class="font-weight-medium">
                {{ filteredPublishedAnnouncements.length }}
              </span>

            </div>


            <v-pagination
              v-model="publishedPage"
              :length="publishedTotalPages"
              :total-visible="5"
              density="comfortable"
              rounded="circle"
            />

          </div>

        </v-card>

      </v-window-item>


      <!-- ==========================================================
           SCHEDULED
           ========================================================== -->

      <v-window-item value="scheduled">

        <v-card
          rounded="xl"
          elevation="0"
          border
        >

          <div
            class="d-flex flex-wrap align-center justify-space-between pa-5"
          >

            <div>

              <h2 class="text-h6 font-weight-bold">
                Scheduled Announcements
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                Announcements scheduled for future publication
              </p>

            </div>

          </div>


          <v-divider />


          <div class="pa-5">

            <v-text-field
              v-model="scheduledSearch"
              label="Search Announcement"
              placeholder="Search title, category or author"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

          </div>


          <v-divider />


          <div class="pa-5">

            <v-row>

              <v-col
                v-for="announcement in paginatedScheduledAnnouncements"
                :key="announcement.id"
                cols="12"
                sm="6"
                lg="4"
              >

                <v-card
                  rounded="xl"
                  elevation="0"
                  class="announcement-card h-100"
                >

                  <div class="d-flex align-start pa-5">

                    <v-avatar
                      size="48"
                      color="primary"
                      variant="tonal"
                      class="mr-4"
                    >

                      <v-icon>
                        mdi-calendar-clock-outline
                      </v-icon>

                    </v-avatar>


                    <div class="flex-grow-1">

                      <div class="text-subtitle-1 font-weight-bold">
                        {{ announcement.title }}
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        {{ announcement.id }}
                      </div>

                    </div>

                  </div>


                  <v-divider />


                  <v-card-text class="pa-5">

                    <div class="d-flex flex-wrap ga-2 mb-5">

                      <v-chip
                        size="small"
                        variant="tonal"
                        color="primary"
                      >
                        {{ announcement.category }}
                      </v-chip>

                      <v-chip
                        size="small"
                        variant="tonal"
                      >
                        {{ announcement.targetAudience }}
                      </v-chip>

                    </div>


                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-calendar-clock-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Scheduled Date
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ formatDate(announcement.publishDate) }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-account-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Author
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ announcement.author }}
                        </div>

                      </div>

                    </div>

                  </v-card-text>


                  <v-divider />


                  <v-card-actions class="pa-4">

                    <v-btn
                      variant="outlined"
                      rounded="lg"
                      prepend-icon="mdi-eye-outline"
                      color="primary"
                      @click="viewAnnouncement(announcement)"
                    >
                      View
                    </v-btn>

                  </v-card-actions>

                </v-card>

              </v-col>


              <v-col
                v-if="paginatedScheduledAnnouncements.length === 0"
                cols="12"
              >

                <div class="text-center py-10">

                  <v-icon
                    size="48"
                    color="grey"
                    class="mb-3"
                  >
                    mdi-calendar-clock-outline
                  </v-icon>

                  <div class="text-body-1 font-weight-medium">
                    No scheduled announcements found
                  </div>

                </div>

              </v-col>

            </v-row>

          </div>


          <v-divider />


          <div class="pagination-wrapper">

            <div class="d-flex align-center ga-2">

              <span class="text-body-2 text-medium-emphasis">
                Rows per page
              </span>

              <v-select
                v-model="scheduledItemsPerPage"
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
                {{ scheduledDisplayedStart }}
              </span>

              –

              <span class="font-weight-medium">
                {{ scheduledDisplayedEnd }}
              </span>

              of

              <span class="font-weight-medium">
                {{ filteredScheduledAnnouncements.length }}
              </span>

            </div>


            <v-pagination
              v-model="scheduledPage"
              :length="scheduledTotalPages"
              :total-visible="5"
              density="comfortable"
              rounded="circle"
            />

          </div>

        </v-card>

      </v-window-item>


      <!-- ==========================================================
           EXPIRED
           ========================================================== -->

      <v-window-item value="expired">

        <v-card
          rounded="xl"
          elevation="0"
          border
        >

          <div
            class="d-flex flex-wrap align-center justify-space-between pa-5"
          >

            <div>

              <h2 class="text-h6 font-weight-bold">
                Expired Announcements
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View announcements that have passed their expiry date
              </p>

            </div>

          </div>


          <v-divider />


          <div class="pa-5">

            <v-text-field
              v-model="expiredSearch"
              label="Search Announcement"
              placeholder="Search title, category or author"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

          </div>


          <v-divider />


          <div class="pa-5">

            <v-row>

              <v-col
                v-for="announcement in paginatedExpiredAnnouncements"
                :key="announcement.id"
                cols="12"
                sm="6"
                lg="4"
              >

                <v-card
                  rounded="xl"
                  elevation="0"
                  class="announcement-card h-100"
                >

                  <div class="d-flex align-start pa-5">

                    <v-avatar
                      size="48"
                      color="grey"
                      variant="tonal"
                      class="mr-4"
                    >

                      <v-icon>
                        mdi-calendar-remove-outline
                      </v-icon>

                    </v-avatar>


                    <div class="flex-grow-1">

                      <div class="text-subtitle-1 font-weight-bold">
                        {{ announcement.title }}
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        {{ announcement.id }}
                      </div>

                    </div>

                  </div>


                  <v-divider />


                  <v-card-text class="pa-5">

                    <div class="d-flex flex-wrap ga-2 mb-5">

                      <v-chip
                        size="small"
                        variant="tonal"
                      >
                        {{ announcement.category }}
                      </v-chip>

                      <v-chip
                        size="small"
                        variant="tonal"
                      >
                        {{ announcement.targetAudience }}
                      </v-chip>

                    </div>


                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-calendar-remove-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Expired Date
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ formatDate(announcement.expiryDate) }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-account-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Author
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ announcement.author }}
                        </div>

                      </div>

                    </div>

                  </v-card-text>


                  <v-divider />


                  <v-card-actions class="pa-4">

                    <v-btn
                      variant="outlined"
                      rounded="lg"
                      prepend-icon="mdi-eye-outline"
                      color="primary"
                      @click="viewAnnouncement(announcement)"
                    >
                      View
                    </v-btn>

                  </v-card-actions>

                </v-card>

              </v-col>


              <v-col
                v-if="paginatedExpiredAnnouncements.length === 0"
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
                    No expired announcements found
                  </div>

                </div>

              </v-col>

            </v-row>

          </div>


          <v-divider />


          <div class="pagination-wrapper">

            <div class="d-flex align-center ga-2">

              <span class="text-body-2 text-medium-emphasis">
                Rows per page
              </span>

              <v-select
                v-model="expiredItemsPerPage"
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
                {{ expiredDisplayedStart }}
              </span>

              –

              <span class="font-weight-medium">
                {{ expiredDisplayedEnd }}
              </span>

              of

              <span class="font-weight-medium">
                {{ filteredExpiredAnnouncements.length }}
              </span>

            </div>


            <v-pagination
              v-model="expiredPage"
              :length="expiredTotalPages"
              :total-visible="5"
              density="comfortable"
              rounded="circle"
            />

          </div>

        </v-card>

      </v-window-item>

    </v-window>


    <!-- ============================================================
         DETAILS DIALOG
         ============================================================ -->

    <v-dialog
      v-model="announcementDetailsDialog"
      max-width="760"
    >

      <v-card
        v-if="selectedAnnouncement"
        rounded="xl"
      >

        <v-card-title class="d-flex align-center pa-5">

          <div>

            <div class="text-h6 font-weight-bold">
              Announcement Details
            </div>

            <div class="text-body-2 text-medium-emphasis mt-1">
              Announcement information
            </div>

          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeAnnouncementDetails"
          />

        </v-card-title>


        <v-divider />


        <v-card-text class="pa-5">

          <div class="d-flex align-start mb-6">

            <v-avatar
              size="56"
              color="primary"
              variant="tonal"
              class="mr-4"
            >

              <v-icon size="28">
                mdi-bullhorn-outline
              </v-icon>

            </v-avatar>


            <div>

              <div class="text-h6 font-weight-bold">
                {{ selectedAnnouncement.title }}
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ selectedAnnouncement.id }}
              </div>

            </div>

          </div>


          <v-row>

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Announcement ID
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedAnnouncement.id }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Status
              </div>

              <v-chip
                size="small"
                variant="tonal"
                class="mt-1"
                :color="getStatusColor(selectedAnnouncement.status)"
              >
                {{ selectedAnnouncement.status }}
              </v-chip>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Category
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedAnnouncement.category }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Target Audience
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedAnnouncement.targetAudience }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Publish Date
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ formatDate(selectedAnnouncement.publishDate) }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Expiry Date
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ formatDate(selectedAnnouncement.expiryDate) }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Author
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedAnnouncement.author }}
              </div>

            </v-col>


            <v-col cols="12">

              <div class="text-caption text-medium-emphasis">
                Content
              </div>

              <div class="text-body-1 mt-2 announcement-content">
                {{ selectedAnnouncement.content }}
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
            @click="closeAnnouncementDetails"
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

type AnnouncementStatus =
  | "Published"
  | "Scheduled"
  | "Expired"


type AnnouncementItem = {

  id: string

  title: string

  category: string

  targetAudience: string

  publishDate: string

  expiryDate: string

  author: string

  status: AnnouncementStatus

  content: string

}


/* */

const tab =
  ref("list")


/* */

const announcements =
  ref<AnnouncementItem[]>([

    {
      id: "ANN-001",
      title: "Company Annual Dinner 2026",
      category: "Event",
      targetAudience: "All Employees",
      publishDate: "2026-09-15",
      expiryDate: "2026-10-17",
      author: "Human Resource",
      status: "Published",
      content:
        "The company annual dinner will be held on 16 October 2026. All employees are invited to attend the event.",
    },

    {
      id: "ANN-002",
      title: "System Maintenance Notification",
      category: "IT",
      targetAudience: "All Employees",
      publishDate: "2026-09-25",
      expiryDate: "2026-10-02",
      author: "IT Department",
      status: "Published",
      content:
        "The internal system will undergo scheduled maintenance. Some services may be temporarily unavailable during the maintenance period.",
    },

    {
      id: "ANN-003",
      title: "Cybersecurity Awareness Training",
      category: "Training",
      targetAudience: "All Employees",
      publishDate: "2026-09-20",
      expiryDate: "2026-10-06",
      author: "IT Department",
      status: "Published",
      content:
        "Employees are required to attend the upcoming cybersecurity awareness training session.",
    },

    {
      id: "ANN-004",
      title: "Health Screening Programme",
      category: "Health",
      targetAudience: "All Employees",
      publishDate: "2026-10-01",
      expiryDate: "2026-10-23",
      author: "Human Resource",
      status: "Scheduled",
      content:
        "The annual employee health screening programme will be conducted at the company medical room.",
    },

    {
      id: "ANN-005",
      title: "Company Futsal Tournament",
      category: "Sports",
      targetAudience: "All Employees",
      publishDate: "2026-10-05",
      expiryDate: "2026-11-08",
      author: "Sports Club",
      status: "Scheduled",
      content:
        "Employees are invited to participate in the upcoming company futsal tournament.",
    },

    {
      id: "ANN-006",
      title: "New Employee Orientation",
      category: "Human Resource",
      targetAudience: "New Employees",
      publishDate: "2026-09-01",
      expiryDate: "2026-09-09",
      author: "Human Resource",
      status: "Expired",
      content:
        "New employee orientation programme for newly joined employees.",
    },

    {
      id: "ANN-007",
      title: "Blood Donation Campaign",
      category: "CSR",
      targetAudience: "All Employees",
      publishDate: "2026-08-01",
      expiryDate: "2026-08-16",
      author: "CSR Committee",
      status: "Expired",
      content:
        "Employees were invited to participate in the company blood donation campaign.",
    },

    {
      id: "ANN-008",
      title: "Fire Safety Awareness Programme",
      category: "Safety",
      targetAudience: "All Employees",
      publishDate: "2026-10-15",
      expiryDate: "2026-10-30",
      author: "Safety Department",
      status: "Scheduled",
      content:
        "Fire safety awareness programme covering emergency procedures and workplace safety.",
    },

  ])


/* */

const categoryOptions =
  computed(() => {

    return [
      ...new Set(
        announcements.value.map(
          announcement =>
            announcement.category
        )
      ),
    ]

  })


const targetAudienceOptions =
  computed(() => {

    return [
      ...new Set(
        announcements.value.map(
          announcement =>
            announcement.targetAudience
        )
      ),
    ]

  })


const statusOptions = [
  "Published",
  "Scheduled",
  "Expired",
]


/* */

const filterMenu =
  ref(false)

const search =
  ref("")

const categoryFilter =
  ref<string | null>(null)

const targetAudienceFilter =
  ref<string | null>(null)

const statusFilter =
  ref<string | null>(null)


const filteredAnnouncements =
  computed(() => {

    const keyword =
      search.value
        .trim()
        .toLowerCase()


    return announcements.value.filter(
      announcement => {

        const searchMatch =
          !keyword ||
          announcement.id
            .toLowerCase()
            .includes(keyword) ||
          announcement.title
            .toLowerCase()
            .includes(keyword) ||
          announcement.category
            .toLowerCase()
            .includes(keyword) ||
          announcement.targetAudience
            .toLowerCase()
            .includes(keyword) ||
          announcement.author
            .toLowerCase()
            .includes(keyword)


        const categoryMatch =
          !categoryFilter.value ||
          announcement.category ===
            categoryFilter.value


        const audienceMatch =
          !targetAudienceFilter.value ||
          announcement.targetAudience ===
            targetAudienceFilter.value


        const statusMatch =
          !statusFilter.value ||
          announcement.status ===
            statusFilter.value


        return (
          searchMatch &&
          categoryMatch &&
          audienceMatch &&
          statusMatch
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
        filteredAnnouncements.value.length /
          itemsPerPage.value
      )
    )

  })


const paginatedAnnouncements =
  computed(() => {

    const start =
      (page.value - 1) *
      itemsPerPage.value

    const end =
      start +
      itemsPerPage.value

    return filteredAnnouncements.value.slice(
      start,
      end
    )

  })


const displayedStart =
  computed(() => {

    if (
      filteredAnnouncements.value.length === 0
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
      filteredAnnouncements.value.length
    )

  })


watch(
  [
    search,
    categoryFilter,
    targetAudienceFilter,
    statusFilter,
    itemsPerPage,
  ],
  () => {

    page.value =
      1

  }
)


watch(
  totalPages,
  total => {

    if (
      page.value > total
    ) {

      page.value =
        total

    }

  }
)


function clearFilters() {

  search.value =
    ""

  categoryFilter.value =
    null

  targetAudienceFilter.value =
    null

  statusFilter.value =
    null

  page.value =
    1

}


/* */

const totalAnnouncementCount =
  computed(() =>
    announcements.value.length
  )


const publishedAnnouncementCount =
  computed(() =>
    announcements.value.filter(
      announcement =>
        announcement.status ===
        "Published"
    ).length
  )


const scheduledAnnouncementCount =
  computed(() =>
    announcements.value.filter(
      announcement =>
        announcement.status ===
        "Scheduled"
    ).length
  )


const expiredAnnouncementCount =
  computed(() =>
    announcements.value.filter(
      announcement =>
        announcement.status ===
        "Expired"
    ).length
  )


/* */

const newAnnouncementId =
  ref("")

const newAnnouncementTitle =
  ref("")

const newAnnouncementCategory =
  ref<string | null>(null)

const newAnnouncementTargetAudience =
  ref<string | null>(null)

const newAnnouncementPublishDate =
  ref("")

const newAnnouncementExpiryDate =
  ref("")

const newAnnouncementAuthor =
  ref("")

const newAnnouncementContent =
  ref("")


const canCreateAnnouncement =
  computed(() => {

    return (
      newAnnouncementId.value.trim() !== "" &&
      newAnnouncementTitle.value.trim() !== "" &&
      newAnnouncementCategory.value !== null &&
      newAnnouncementTargetAudience.value !== null &&
      newAnnouncementPublishDate.value !== "" &&
      newAnnouncementExpiryDate.value !== "" &&
      newAnnouncementAuthor.value.trim() !== "" &&
      newAnnouncementContent.value.trim() !== ""
    )

  })


function createAnnouncement() {

  if (
    !canCreateAnnouncement.value
  ) {

    return

  }


  const duplicate =
    announcements.value.some(
      announcement =>
        announcement.id.toLowerCase() ===
        newAnnouncementId.value
          .trim()
          .toLowerCase()
    )


  if (duplicate) {

    snackbarMessage.value =
      "Announcement ID already exists."

    snackbarColor.value =
      "error"

    snackbar.value =
      true

    return

  }


  const today =
    getToday()


  let status: AnnouncementStatus =
    "Scheduled"


  if (
    newAnnouncementPublishDate.value <=
    today
  ) {

    if (
      newAnnouncementExpiryDate.value <
      today
    ) {

      status =
        "Expired"

    } else {

      status =
        "Published"

    }

  }


  announcements.value.push({

    id:
      newAnnouncementId.value.trim(),

    title:
      newAnnouncementTitle.value.trim(),

    category:
      newAnnouncementCategory.value as string,

    targetAudience:
      newAnnouncementTargetAudience.value as string,

    publishDate:
      newAnnouncementPublishDate.value,

    expiryDate:
      newAnnouncementExpiryDate.value,

    author:
      newAnnouncementAuthor.value.trim(),

    status,

    content:
      newAnnouncementContent.value.trim(),

  })


  clearAnnouncementForm()


  snackbarMessage.value =
    "Announcement created successfully."

  snackbarColor.value =
    "success"

  snackbar.value =
    true


  tab.value =
    "list"

  page.value =
    1

}


function clearAnnouncementForm() {

  newAnnouncementId.value =
    ""

  newAnnouncementTitle.value =
    ""

  newAnnouncementCategory.value =
    null

  newAnnouncementTargetAudience.value =
    null

  newAnnouncementPublishDate.value =
    ""

  newAnnouncementExpiryDate.value =
    ""

  newAnnouncementAuthor.value =
    ""

  newAnnouncementContent.value =
    ""

}


/* */

const publishedFilterMenu =
  ref(false)

const publishedSearch =
  ref("")

const publishedCategoryFilter =
  ref<string | null>(null)


const filteredPublishedAnnouncements =
  computed(() => {

    const keyword =
      publishedSearch.value
        .trim()
        .toLowerCase()


    return announcements.value
      .filter(
        announcement => {

          if (
            announcement.status !==
            "Published"
          ) {

            return false

          }


          const searchMatch =
            !keyword ||
            announcement.id
              .toLowerCase()
              .includes(keyword) ||
            announcement.title
              .toLowerCase()
              .includes(keyword) ||
            announcement.category
              .toLowerCase()
              .includes(keyword) ||
            announcement.author
              .toLowerCase()
              .includes(keyword)


          const categoryMatch =
            !publishedCategoryFilter.value ||
            announcement.category ===
              publishedCategoryFilter.value


          return (
            searchMatch &&
            categoryMatch
          )

        }
      )
      .sort(
        (
          a,
          b
        ) =>
          b.publishDate.localeCompare(
            a.publishDate
          )
      )

  })


const publishedPage =
  ref(1)

const publishedItemsPerPage =
  ref(5)


const publishedTotalPages =
  computed(() =>
    Math.max(
      1,
      Math.ceil(
        filteredPublishedAnnouncements.value.length /
          publishedItemsPerPage.value
      )
    )
  )


const paginatedPublishedAnnouncements =
  computed(() => {

    const start =
      (publishedPage.value - 1) *
      publishedItemsPerPage.value

    const end =
      start +
      publishedItemsPerPage.value

    return filteredPublishedAnnouncements.value.slice(
      start,
      end
    )

  })


const publishedDisplayedStart =
  computed(() => {

    if (
      filteredPublishedAnnouncements.value.length === 0
    ) {

      return 0

    }

    return (
      (publishedPage.value - 1) *
      publishedItemsPerPage.value
    ) + 1

  })


const publishedDisplayedEnd =
  computed(() =>
    Math.min(
      publishedPage.value *
        publishedItemsPerPage.value,
      filteredPublishedAnnouncements.value.length
    )
  )


watch(
  [
    publishedSearch,
    publishedCategoryFilter,
    publishedItemsPerPage,
  ],
  () => {

    publishedPage.value =
      1

  }
)


watch(
  publishedTotalPages,
  total => {

    if (
      publishedPage.value > total
    ) {

      publishedPage.value =
        total

    }

  }
)


function clearPublishedFilters() {

  publishedSearch.value =
    ""

  publishedCategoryFilter.value =
    null

  publishedPage.value =
    1

}


/* */

const scheduledSearch =
  ref("")

const scheduledPage =
  ref(1)

const scheduledItemsPerPage =
  ref(5)


const filteredScheduledAnnouncements =
  computed(() => {

    const keyword =
      scheduledSearch.value
        .trim()
        .toLowerCase()


    return announcements.value
      .filter(
        announcement => {

          if (
            announcement.status !==
            "Scheduled"
          ) {

            return false

          }


          return (
            !keyword ||
            announcement.id
              .toLowerCase()
              .includes(keyword) ||
            announcement.title
              .toLowerCase()
              .includes(keyword) ||
            announcement.category
              .toLowerCase()
              .includes(keyword) ||
            announcement.author
              .toLowerCase()
              .includes(keyword)
          )

        }
      )
      .sort(
        (
          a,
          b
        ) =>
          a.publishDate.localeCompare(
            b.publishDate
          )
      )

  })


const scheduledTotalPages =
  computed(() =>
    Math.max(
      1,
      Math.ceil(
        filteredScheduledAnnouncements.value.length /
          scheduledItemsPerPage.value
      )
    )
  )


const paginatedScheduledAnnouncements =
  computed(() => {

    const start =
      (scheduledPage.value - 1) *
      scheduledItemsPerPage.value

    const end =
      start +
      scheduledItemsPerPage.value

    return filteredScheduledAnnouncements.value.slice(
      start,
      end
    )

  })


const scheduledDisplayedStart =
  computed(() => {

    if (
      filteredScheduledAnnouncements.value.length === 0
    ) {

      return 0

    }

    return (
      (scheduledPage.value - 1) *
      scheduledItemsPerPage.value
    ) + 1

  })


const scheduledDisplayedEnd =
  computed(() =>
    Math.min(
      scheduledPage.value *
        scheduledItemsPerPage.value,
      filteredScheduledAnnouncements.value.length
    )
  )


watch(
  [
    scheduledSearch,
    scheduledItemsPerPage,
  ],
  () => {

    scheduledPage.value =
      1

  }
)


watch(
  scheduledTotalPages,
  total => {

    if (
      scheduledPage.value > total
    ) {

      scheduledPage.value =
        total

    }

  }
)


/* */

const expiredSearch =
  ref("")

const expiredPage =
  ref(1)

const expiredItemsPerPage =
  ref(5)


const filteredExpiredAnnouncements =
  computed(() => {

    const keyword =
      expiredSearch.value
        .trim()
        .toLowerCase()


    return announcements.value
      .filter(
        announcement => {

          if (
            announcement.status !==
            "Expired"
          ) {

            return false

          }


          return (
            !keyword ||
            announcement.id
              .toLowerCase()
              .includes(keyword) ||
            announcement.title
              .toLowerCase()
              .includes(keyword) ||
            announcement.category
              .toLowerCase()
              .includes(keyword) ||
            announcement.author
              .toLowerCase()
              .includes(keyword)
          )

        }
      )
      .sort(
        (
          a,
          b
        ) =>
          b.expiryDate.localeCompare(
            a.expiryDate
          )
      )

  })


const expiredTotalPages =
  computed(() =>
    Math.max(
      1,
      Math.ceil(
        filteredExpiredAnnouncements.value.length /
          expiredItemsPerPage.value
      )
    )
  )


const paginatedExpiredAnnouncements =
  computed(() => {

    const start =
      (expiredPage.value - 1) *
      expiredItemsPerPage.value

    const end =
      start +
      expiredItemsPerPage.value

    return filteredExpiredAnnouncements.value.slice(
      start,
      end
    )

  })


const expiredDisplayedStart =
  computed(() => {

    if (
      filteredExpiredAnnouncements.value.length === 0
    ) {

      return 0

    }

    return (
      (expiredPage.value - 1) *
      expiredItemsPerPage.value
    ) + 1

  })


const expiredDisplayedEnd =
  computed(() =>
    Math.min(
      expiredPage.value *
        expiredItemsPerPage.value,
      filteredExpiredAnnouncements.value.length
    )
  )


watch(
  [
    expiredSearch,
    expiredItemsPerPage,
  ],
  () => {

    expiredPage.value =
      1

  }
)


watch(
  expiredTotalPages,
  total => {

    if (
      expiredPage.value > total
    ) {

      expiredPage.value =
        total

    }

  }
)


/* */

const announcementDetailsDialog =
  ref(false)

const selectedAnnouncement =
  ref<AnnouncementItem | null>(null)


function viewAnnouncement(
  announcement: AnnouncementItem
) {

  selectedAnnouncement.value =
    announcement

  announcementDetailsDialog.value =
    true

}


function closeAnnouncementDetails() {

  announcementDetailsDialog.value =
    false

  selectedAnnouncement.value =
    null

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


/* */

function getStatusColor(
  status: AnnouncementStatus
) {

  switch (status) {

    case "Published":
      return "success"

    case "Scheduled":
      return "primary"

    case "Expired":
      return "grey"

    default:
      return "grey"

  }

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

  min-width: 1300px;

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

.announcement-card {

  border: 1px solid #d9d9d9 !important;

  border-radius: 16px !important;

  overflow: hidden;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

}


.announcement-card:hover {

  transform: translateY(-2px);

  border-color: #bdbdbd !important;

  box-shadow:
    0 4px 12px
    rgba(0, 0, 0, 0.08) !important;

}


/* */

.announcement-preview {

  min-height: 400px;

}


.announcement-content {

  white-space: pre-line;

  line-height: 1.6;

}

</style>