<template>
  <v-container
    fluid
    class="pa-6"
  >
    <!-- =========================================================
         BREADCRUMB
    ========================================================== -->

    <div class="d-flex align-center mb-6">
      <v-icon
        size="20"
        class="mr-2"
      >
        mdi-cart-outline
      </v-icon>

      <span class="text-body-2 text-medium-emphasis">
        Procurement
      </span>

      <v-icon
        size="16"
        class="mx-2"
      >
        mdi-chevron-right
      </v-icon>

      <span class="text-body-2 font-weight-medium">
        Purchase Orders
      </span>
    </div>

    <!-- =========================================================
         HEADER
    ========================================================== -->

    <div
      class="d-flex flex-wrap align-center justify-space-between mb-6"
      style="gap: 16px;"
    >
      <div>
        <h1 class="text-h4 font-weight-bold mb-1">
          Purchase Orders
        </h1>

        <div class="text-body-2 text-medium-emphasis">
          Manage purchase orders, suppliers and procurement items.
        </div>
      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="openNewOrder"
      >
        New Order
      </v-btn>
    </div>

    <!-- =========================================================
         SUMMARY
    ========================================================== -->

    <v-row class="mb-6">
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          border
          rounded="lg"
          class="h-100"
        >
          <v-card-text>
            <div class="d-flex justify-space-between">
              <div>
                <div class="text-body-2 text-medium-emphasis">
                  Total Orders
                </div>

                <div class="text-h4 font-weight-bold mt-2">
                  {{ totalOrders }}
                </div>
              </div>

              <v-avatar
                color="primary"
                variant="tonal"
                size="44"
              >
                <v-icon>
                  mdi-file-document-multiple-outline
                </v-icon>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          border
          rounded="lg"
          class="h-100"
        >
          <v-card-text>
            <div class="d-flex justify-space-between">
              <div>
                <div class="text-body-2 text-medium-emphasis">
                  Approved Orders
                </div>

                <div class="text-h4 font-weight-bold mt-2">
                  {{ approvedOrders }}
                </div>
              </div>

              <v-avatar
                color="success"
                variant="tonal"
                size="44"
              >
                <v-icon>
                  mdi-check-circle-outline
                </v-icon>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          border
          rounded="lg"
          class="h-100"
        >
          <v-card-text>
            <div class="d-flex justify-space-between">
              <div>
                <div class="text-body-2 text-medium-emphasis">
                  Total Value
                </div>

                <div class="text-h5 font-weight-bold mt-2">
                  {{ formatCurrency(totalValue) }}
                </div>
              </div>

              <v-avatar
                color="success"
                variant="tonal"
                size="44"
              >
                <v-icon>
                  mdi-cash-multiple
                </v-icon>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- =========================================================
         MAIN CARD
    ========================================================== -->

    <v-card
      border
      rounded="lg"
    >
      <v-tabs
        v-model="activeTab"
        color="primary"
      >
        <v-tab value="all">
          All Orders
        </v-tab>

        <v-tab value="department">
          Department Orders
        </v-tab>

        <v-tab value="mine">
          My Orders
        </v-tab>

        <v-tab value="terms">
          Terms & Conditions
        </v-tab>
      </v-tabs>

      <v-divider />

      <v-window v-model="activeTab">

        <!-- =====================================================
             ALL ORDERS
        ====================================================== -->

        <v-window-item value="all">
          <div class="pa-4">

            <v-row class="mb-2">
              <v-col
                cols="12"
                md="3"
              >
                <v-text-field
                  v-model="filters.search"
                  label="Search"
                  placeholder="Search PO, supplier, department..."
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  density="comfortable"
                  clearable
                  hide-details
                />
              </v-col>

              <v-col
                cols="12"
                sm="6"
                md="2"
              >
                <v-select
                  v-model="filters.department"
                  :items="departments"
                  label="Department"
                  variant="outlined"
                  density="comfortable"
                  clearable
                  hide-details
                />
              </v-col>

              <v-col
                cols="12"
                sm="6"
                md="2"
              >
                <v-select
                  v-model="filters.supplier"
                  :items="suppliers"
                  label="Supplier"
                  variant="outlined"
                  density="comfortable"
                  clearable
                  hide-details
                />
              </v-col>

              <v-col
                cols="12"
                sm="6"
                md="2"
              >
                <v-select
                  v-model="filters.status"
                  :items="statuses"
                  label="PO Status"
                  variant="outlined"
                  density="comfortable"
                  clearable
                  hide-details
                />
              </v-col>

              <v-col
                cols="12"
                md="1"
                class="d-flex align-center"
              >
                <v-btn
                  block
                  variant="text"
                  @click="clearFilters"
                >
                  Clear
                </v-btn>
              </v-col>
            </v-row>

            <!-- =================================================
                 PURCHASE ORDER TABLE
            ================================================== -->

            <v-data-table
              v-model:expanded="expandedOrders"
              :headers="orderHeaders"
              :items="filteredOrders"
              item-value="id"
              show-expand
              hover
              class="purchase-order-table"
            >

              <!-- CODE -->

              <template #item.poNumber="{ item }">
                <span class="font-weight-medium">
                  {{ item.poNumber }}
                </span>
              </template>

              <!-- DEPARTMENT -->

              <template #item.department="{ item }">
                <div class="text-body-2">
                  {{ item.department }}
                </div>
              </template>

              <!-- SUPPLIER -->

              <template #item.supplier="{ item }">
                <div class="text-body-2">
                  {{ item.supplier }}
                </div>
              </template>

              <!-- STATUS -->

              <template #item.status="{ item }">
                <v-chip
                  size="small"
                  variant="tonal"
                  :color="statusColor(item.status)"
                >
                  {{ item.status }}
                </v-chip>
              </template>

              <!-- TOTAL -->

              <template #item.totalAmount="{ item }">
                <span class="font-weight-medium">
                  {{ formatCurrency(item.totalAmount) }}
                </span>
              </template>

              <!-- DATE -->

              <template #item.poDate="{ item }">
                {{ formatDate(item.poDate) }}
              </template>

              <!-- =================================================
                   MORE INFO
              ================================================== -->

              <template #item.data-table-expand="{ item, internalItem, isExpanded, toggleExpand }">
                <v-btn
                  size="small"
                  variant="text"
                  color="primary"
                  :prepend-icon="
                    isExpanded(internalItem)
                      ? 'mdi-chevron-up'
                      : 'mdi-information-outline'
                  "
                  @click="toggleExpand(internalItem)"
                >
                  {{
                    isExpanded(internalItem)
                      ? "Hide Info"
                      : "More Info"
                  }}
                </v-btn>
              </template>

              <!-- =================================================
                   ACTIONS
              ================================================== -->

              <template #item.actions="{ item }">
                <v-menu location="bottom end">
                  <template #activator="{ props }">
                    <v-btn
                      v-bind="props"
                      icon="mdi-dots-vertical"
                      size="small"
                      variant="text"
                    />
                  </template>

                  <v-list density="compact">

                    <v-list-item
                      prepend-icon="mdi-content-copy"
                      title="Clone Order"
                      @click="handleCloneOrder(item)"
                    />

                    <v-list-item
                      prepend-icon="mdi-file-pdf-box"
                      title="View PDF"
                      @click="viewPdf(item)"
                    />

                    <v-divider />

                    <v-list-item
                      prepend-icon="mdi-eye-outline"
                      title="View Order"
                      @click="viewOrder(item)"
                    />

                    <v-list-item
                      v-if="item.status === 'Draft'"
                      prepend-icon="mdi-pencil-outline"
                      title="Edit"
                      @click="openEditOrder(item)"
                    />

                    <v-list-item
                      prepend-icon="mdi-delete-outline"
                      title="Delete"
                      class="text-error"
                      @click="handleDeleteOrder(item)"
                    />

                  </v-list>
                </v-menu>
              </template>

              <!-- =================================================
                   EXPANDED ROW
              ================================================== -->

              <template #expanded-row="{ columns, item }">
                <tr>
                  <td
                    :colspan="columns.length"
                    class="pa-0"
                  >
                    <div class="expanded-order-wrapper">

                      <div
                        class="d-flex flex-wrap align-center justify-space-between mb-4"
                        style="gap: 12px;"
                      >
                        <div>
                          <div class="text-subtitle-1 font-weight-bold">
                            Order Items
                          </div>

                          <div class="text-caption text-medium-emphasis">
                            {{ item.poNumber }}
                            ·
                            {{ item.items.length }}
                            {{
                              item.items.length === 1
                                ? "item"
                                : "items"
                            }}
                          </div>
                        </div>

                        <div class="text-body-2 font-weight-bold">
                          Total:
                          {{ formatCurrency(item.totalAmount) }}
                        </div>
                      </div>

                      <!-- ITEM TABLE -->

                      <v-table
                        density="comfortable"
                        class="item-detail-table"
                      >
                        <thead>
                          <tr>
                            <th>
                              Description
                            </th>

                            <th>
                              Type
                            </th>

                            <th>
                              Category
                            </th>

                            <th class="text-right">
                              Quantity
                            </th>

                            <th class="text-right">
                              Unit Price
                            </th>

                            <th class="text-right">
                              Discount
                            </th>

                            <th class="text-right">
                              Total
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr
                            v-for="orderItem in item.items"
                            :key="orderItem.id"
                          >
                            <td>
                              <div class="font-weight-medium">
                                {{
                                  orderItem.description ||
                                  orderItem.asset ||
                                  "-"
                                }}
                              </div>

                              <div
                                v-if="
                                  orderItem.asset &&
                                  orderItem.asset !==
                                    orderItem.description
                                "
                                class="text-caption text-medium-emphasis"
                              >
                                {{ orderItem.asset }}
                              </div>
                            </td>

                            <td>
                              {{ orderItem.category || "-" }}
                            </td>

                            <td>
                              {{ orderItem.subcategory || "-" }}
                            </td>

                            <td class="text-right">
                              {{ orderItem.quantity }}
                            </td>

                            <td class="text-right">
                              {{ formatCurrency(orderItem.unitPrice) }}
                            </td>

                            <td class="text-right">
                              {{ formatCurrency(orderItem.discount) }}
                            </td>

                            <td class="text-right font-weight-bold">
                              {{ formatCurrency(orderItem.totalAmount) }}
                            </td>
                          </tr>
                        </tbody>

                        <tfoot>
                          <tr>
                            <td
                              colspan="6"
                              class="text-right font-weight-bold"
                            >
                              Grand Total
                            </td>

                            <td class="text-right font-weight-bold">
                              {{ formatCurrency(item.totalAmount) }}
                            </td>
                          </tr>
                        </tfoot>
                      </v-table>

                    </div>
                  </td>
                </tr>
              </template>

              <template #no-data>
                <div class="py-10 text-center">
                  <v-icon
                    size="48"
                    color="grey"
                    class="mb-3"
                  >
                    mdi-file-document-outline
                  </v-icon>

                  <div class="text-subtitle-1">
                    No purchase orders found
                  </div>

                  <div class="text-body-2 text-medium-emphasis">
                    Try changing your filters or search.
                  </div>
                </div>
              </template>

            </v-data-table>
          </div>
        </v-window-item>

        <!-- =====================================================
             DEPARTMENT ORDERS
        ====================================================== -->

        <v-window-item value="department">
          <div class="pa-4">
            <v-row>
              <v-col
                v-for="department in departmentCards"
                :key="department.department"
                cols="12"
                md="6"
                lg="4"
              >
                <v-card
                  border
                  rounded="lg"
                  class="h-100"
                >
                  <v-card-text>
                    <div class="d-flex justify-space-between mb-4">
                      <div>
                        <div class="text-subtitle-1 font-weight-bold">
                          {{ department.department }}
                        </div>

                        <div class="text-caption text-medium-emphasis">
                          {{ department.orderCount }}
                          {{
                            department.orderCount === 1
                              ? "order"
                              : "orders"
                          }}
                        </div>
                      </div>

                      <v-icon color="primary">
                        mdi-domain
                      </v-icon>
                    </div>

                    <div class="d-flex justify-space-between mb-4">
                      <div>
                        <div class="text-caption text-medium-emphasis">
                          Total Value
                        </div>

                        <div class="font-weight-bold">
                          {{ formatCurrency(department.totalValue) }}
                        </div>
                      </div>

                      <div class="text-right">
                        <div class="text-caption text-medium-emphasis">
                          Pending Approval
                        </div>

                        <div class="font-weight-bold">
                          {{ department.pendingOrders }}
                        </div>
                      </div>
                    </div>

                    <v-btn
                      block
                      color="primary"
                      variant="tonal"
                      prepend-icon="mdi-eye-outline"
                      @click="
                        viewDepartmentOrders(
                          department.department,
                        )
                      "
                    >
                      View Orders
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-window-item>

        <!-- =====================================================
             MY ORDERS
        ====================================================== -->

        <v-window-item value="mine">
          <div class="pa-4">
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-bold">
                My Orders
              </div>

              <div class="text-body-2 text-medium-emphasis">
                Orders created by {{ currentUser }}.
              </div>
            </div>

            <v-data-table
              :headers="myOrderHeaders"
              :items="myOrders"
              hover
            >
              <template #item.poNumber="{ item }">
                <span class="font-weight-medium">
                  {{ item.poNumber }}
                </span>
              </template>

              <template #item.status="{ item }">
                <v-chip
                  size="small"
                  variant="tonal"
                  :color="statusColor(item.status)"
                >
                  {{ item.status }}
                </v-chip>
              </template>

              <template #item.totalAmount="{ item }">
                {{ formatCurrency(item.totalAmount) }}
              </template>

              <template #item.poDate="{ item }">
                {{ formatDate(item.poDate) }}
              </template>

              <template #item.actions="{ item }">
                <v-btn
                  size="small"
                  variant="text"
                  prepend-icon="mdi-eye-outline"
                  @click="viewOrder(item)"
                >
                  View
                </v-btn>

                <v-btn
                  size="small"
                  variant="text"
                  prepend-icon="mdi-file-pdf-box"
                  @click="viewPdf(item)"
                >
                  PDF
                </v-btn>
              </template>
            </v-data-table>
          </div>
        </v-window-item>

        <!-- =====================================================
             TERMS
        ====================================================== -->

        <v-window-item value="terms">
          <div class="pa-4">

            <div
              class="d-flex flex-wrap justify-space-between align-center mb-4"
              style="gap: 12px;"
            >
              <div>
                <div class="text-subtitle-1 font-weight-bold">
                  Terms & Conditions
                </div>

                <div class="text-body-2 text-medium-emphasis">
                  Procurement terms used for purchase orders.
                </div>
              </div>

              <v-btn
                color="primary"
                prepend-icon="mdi-plus"
                @click="openNewTerm"
              >
                Add Term
              </v-btn>
            </div>

            <v-data-table
              :headers="termHeaders"
              :items="terms"
              hover
            >
              <template #item.mandatory="{ item }">
                <v-chip
                  size="small"
                  variant="tonal"
                  :color="
                    item.mandatory
                      ? 'error'
                      : 'grey'
                  "
                >
                  {{
                    item.mandatory
                      ? "Mandatory"
                      : "Optional"
                  }}
                </v-chip>
              </template>

              <template #item.lastUpdated="{ item }">
                {{ formatDate(item.lastUpdated) }}
              </template>

              <template #item.actions="{ item }">
                <v-btn
                  icon="mdi-pencil-outline"
                  size="small"
                  variant="text"
                  @click="openEditTerm(item)"
                />

                <v-btn
                  icon="mdi-delete-outline"
                  size="small"
                  variant="text"
                  color="error"
                  @click="handleDeleteTerm(item)"
                />
              </template>
            </v-data-table>
          </div>
        </v-window-item>

      </v-window>
    </v-card>

    <!-- =========================================================
         NEW / EDIT ORDER
    ========================================================== -->

    <v-dialog
      v-model="orderDialog"
      max-width="1100"
      scrollable
    >
      <v-card rounded="lg">

        <v-card-title class="d-flex align-center pa-5">
          <div>
            <div class="text-h6 font-weight-bold">
              {{
                editingOrderId
                  ? "Edit Purchase Order"
                  : "New Purchase Order"
              }}
            </div>

            <div class="text-caption text-medium-emphasis">
              Add purchase order information and items.
            </div>
          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeOrderDialog"
          />
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-5">

          <div class="text-subtitle-1 font-weight-bold mb-4">
            Order Information
          </div>

          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="orderForm.orderType"
                label="Order Type"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-select
                v-model="orderForm.department"
                :items="departments"
                label="Department"
                variant="outlined"
                density="comfortable"
                clearable
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                :model-value="currentUser"
                label="Requester"
                variant="outlined"
                density="comfortable"
                readonly
              />
            </v-col>
          </v-row>

          <v-divider class="my-5" />

          <div class="d-flex align-center justify-space-between mb-4">
            <div>
              <div class="text-subtitle-1 font-weight-bold">
                Purchase Item
              </div>

              <div class="text-caption text-medium-emphasis">
                Add item details below.
              </div>
            </div>

            <v-chip
              v-if="orderItems.length"
              color="primary"
              variant="tonal"
            >
              {{ orderItems.length }} items
            </v-chip>
          </div>

          <v-row>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="assetForm.asset"
                label="Asset"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-select
                v-model="assetForm.category"
                :items="categories"
                label="Category"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-select
                v-model="assetForm.subcategory"
                :items="subcategories"
                label="Subcategory"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-select
                v-model="assetForm.supplier"
                :items="suppliers"
                label="Vendor / Supplier"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="assetForm.description"
                label="Item Description / Specifications"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="assetForm.brand"
                label="Brand"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="assetForm.manufacturer"
                label="Manufacturer"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="assetForm.model"
                label="Model"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="assetForm.hsCode"
                label="HS Code"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              sm="4"
              md="2"
            >
              <v-select
                v-model="assetForm.currency"
                :items="currencies"
                label="Currency"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              sm="4"
              md="2"
            >
              <v-text-field
                v-model.number="assetForm.quantity"
                label="Pieces"
                type="number"
                min="1"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              sm="4"
              md="2"
            >
              <v-text-field
                v-model.number="assetForm.unitPrice"
                label="Unit Cost"
                type="number"
                min="0"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              sm="6"
              md="2"
            >
              <v-text-field
                v-model.number="assetForm.discount"
                label="Discount"
                type="number"
                min="0"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              sm="6"
              md="3"
            >
              <v-text-field
                :model-value="
                  formatCurrency(
                    currentItemTotal,
                  )
                "
                label="Total Cost"
                variant="outlined"
                density="comfortable"
                readonly
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-select
                v-model="assetForm.department"
                :items="departments"
                label="Item Department"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="assetForm.requiredDeliveryDate"
                label="Required Delivery Date"
                type="date"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-select
                v-model="assetForm.costSplit"
                :items="costSplitOptions"
                label="Cost Split"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col cols="12">
              <v-file-input
                :model-value="assetForm.supportingDocuments"
                label="Supporting Documents"
                prepend-icon="mdi-paperclip"
                variant="outlined"
                density="comfortable"
                multiple
                show-size
                @update:model-value="handleFileChange"
              />
            </v-col>

          </v-row>

          <!-- ADDED ITEMS -->

          <div
            v-if="orderItems.length"
            class="mt-4"
          >
            <div class="text-subtitle-2 font-weight-bold mb-3">
              Added Items
            </div>

            <v-table
              density="comfortable"
              class="border rounded"
            >
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th class="text-right">
                    Quantity
                  </th>
                  <th class="text-right">
                    Unit Price
                  </th>
                  <th class="text-right">
                    Discount
                  </th>
                  <th class="text-right">
                    Total
                  </th>
                  <th class="text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(orderItem, index) in orderItems"
                  :key="orderItem.id"
                >
                  <td>
                    {{
                      orderItem.description ||
                      orderItem.asset ||
                      "-"
                    }}
                  </td>

                  <td>
                    {{ orderItem.category || "-" }}
                  </td>

                  <td>
                    {{ orderItem.subcategory || "-" }}
                  </td>

                  <td class="text-right">
                    {{ orderItem.quantity }}
                  </td>

                  <td class="text-right">
                    {{ formatCurrency(orderItem.unitPrice) }}
                  </td>

                  <td class="text-right">
                    {{ formatCurrency(orderItem.discount) }}
                  </td>

                  <td class="text-right font-weight-bold">
                    {{ formatCurrency(orderItem.totalAmount) }}
                  </td>

                  <td class="text-center">
                    <v-btn
                      icon="mdi-delete-outline"
                      size="small"
                      variant="text"
                      color="error"
                      @click="
                        removeOrderItem(index)
                      "
                    />
                  </td>
                </tr>
              </tbody>

              <tfoot>
                <tr>
                  <td
                    colspan="6"
                    class="text-right font-weight-bold"
                  >
                    Total
                  </td>

                  <td class="text-right font-weight-bold">
                    {{ formatCurrency(orderItemsTotal) }}
                  </td>

                  <td />
                </tr>
              </tfoot>
            </v-table>
          </div>

          <v-divider class="my-5" />

          <v-textarea
            v-model="orderForm.notes"
            label="Notes"
            rows="3"
            variant="outlined"
            density="comfortable"
          />

          <v-checkbox
            v-model="addAnotherItem"
            label="Add another item?"
            hide-details
          />

        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-5">
          <v-spacer />

          <v-btn
            variant="text"
            @click="closeOrderDialog"
          >
            Cancel
          </v-btn>

          <v-btn
            variant="outlined"
            color="primary"
            @click="addCurrentItem"
          >
            Add Item
          </v-btn>

          <v-btn
            color="primary"
            @click="saveOrder"
          >
            {{
              editingOrderId
                ? "Update Order"
                : "Save Order"
            }}
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <!-- =========================================================
         VIEW ORDER
    ========================================================== -->

    <v-dialog
      v-model="viewDialog"
      max-width="1000"
      scrollable
    >
      <v-card
        v-if="selectedOrder"
        rounded="lg"
      >
        <v-card-title class="d-flex align-center pa-5">
          <div>
            <div class="text-h6 font-weight-bold">
              {{ selectedOrder.poNumber }}
            </div>

            <div class="text-caption text-medium-emphasis">
              {{ selectedOrder.orderType }}
            </div>
          </div>

          <v-spacer />

          <v-chip
            size="small"
            variant="tonal"
            :color="statusColor(selectedOrder.status)"
          >
            {{ selectedOrder.status }}
          </v-chip>

          <v-btn
            icon="mdi-close"
            variant="text"
            class="ml-2"
            @click="viewDialog = false"
          />
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-5">

          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <div class="text-caption text-medium-emphasis">
                Department
              </div>

              <div class="font-weight-medium">
                {{ selectedOrder.department }}
              </div>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <div class="text-caption text-medium-emphasis">
                Supplier
              </div>

              <div class="font-weight-medium">
                {{ selectedOrder.supplier }}
              </div>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <div class="text-caption text-medium-emphasis">
                Requester
              </div>

              <div class="font-weight-medium">
                {{ selectedOrder.requester }}
              </div>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <div class="text-caption text-medium-emphasis">
                PO Date
              </div>

              <div class="font-weight-medium">
                {{ formatDate(selectedOrder.poDate) }}
              </div>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <div class="text-caption text-medium-emphasis">
                Total
              </div>

              <div class="text-h6 font-weight-bold">
                {{ formatCurrency(selectedOrder.totalAmount) }}
              </div>
            </v-col>
          </v-row>

          <v-divider class="my-5" />

          <div class="text-subtitle-1 font-weight-bold mb-3">
            Order Items
          </div>

          <v-table class="border rounded">
            <thead>
              <tr>
                <th>Description</th>
                <th>Type</th>
                <th>Category</th>
                <th class="text-right">
                  Quantity
                </th>
                <th class="text-right">
                  Unit Price
                </th>
                <th class="text-right">
                  Discount
                </th>
                <th class="text-right">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="orderItem in selectedOrder.items"
                :key="orderItem.id"
              >
                <td>
                  {{
                    orderItem.description ||
                    orderItem.asset ||
                    "-"
                  }}
                </td>

                <td>
                  {{ orderItem.category || "-" }}
                </td>

                <td>
                  {{ orderItem.subcategory || "-" }}
                </td>

                <td class="text-right">
                  {{ orderItem.quantity }}
                </td>

                <td class="text-right">
                  {{ formatCurrency(orderItem.unitPrice) }}
                </td>

                <td class="text-right">
                  {{ formatCurrency(orderItem.discount) }}
                </td>

                <td class="text-right font-weight-bold">
                  {{ formatCurrency(orderItem.totalAmount) }}
                </td>
              </tr>
            </tbody>
          </v-table>

          <div
            v-if="selectedOrder.notes"
            class="mt-5"
          >
            <div class="text-caption text-medium-emphasis">
              Notes
            </div>

            <div>
              {{ selectedOrder.notes }}
            </div>
          </div>

        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-5">
          <v-spacer />

          <v-btn
            variant="outlined"
            prepend-icon="mdi-file-pdf-box"
            @click="viewPdf(selectedOrder)"
          >
            View PDF
          </v-btn>

          <v-btn
            v-if="selectedOrder.status === 'Draft'"
            color="primary"
            prepend-icon="mdi-pencil-outline"
            @click="openEditOrder(selectedOrder)"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- =========================================================
         TERMS
    ========================================================== -->

    <v-dialog
      v-model="termDialog"
      max-width="650"
    >
      <v-card rounded="lg">

        <v-card-title class="d-flex align-center pa-5">
          <div class="text-h6 font-weight-bold">
            {{
              editingTermId
                ? "Edit Term"
                : "Add Term"
            }}
          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="termDialog = false"
          />
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-5">

          <v-text-field
            v-model="termForm.title"
            label="Title"
            variant="outlined"
            density="comfortable"
            class="mb-3"
          />

          <v-select
            v-model="termForm.applicableFor"
            :items="applicableForOptions"
            label="Applicable For"
            variant="outlined"
            density="comfortable"
            class="mb-3"
          />

          <v-textarea
            v-model="termForm.description"
            label="Description"
            rows="4"
            variant="outlined"
            density="comfortable"
            class="mb-3"
          />

          <v-text-field
            v-model="termForm.lastUpdated"
            label="Last Updated"
            type="date"
            variant="outlined"
            density="comfortable"
          />

          <v-checkbox
            v-model="termForm.mandatory"
            label="Mandatory"
            hide-details
          />

        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-5">
          <v-spacer />

          <v-btn
            variant="text"
            @click="termDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            @click="saveTerm"
          >
            Save
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <!-- =========================================================
         SNACKBAR
    ========================================================== -->

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      location="bottom right"
      timeout="3000"
    >
      {{ snackbar.message }}

      <template #actions>
        <v-btn
          variant="text"
          @click="snackbar.show = false"
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

import {
  usePurchaseOrders,
  type AssetForm,
  type PurchaseOrder,
  type PurchaseOrderItem,
  type TermsCondition,
} from "@/composables/usePurchaseOrders"

const {
  orders,
  terms,
  currentUser,

  departments,
  suppliers,
  categories,
  subcategories,
  statuses,
  currencies,
  costSplitOptions,
  applicableForOptions,

  totalOrders,
  approvedOrders,
  totalValue,
  myOrders,
  departmentCards,

  createEmptyAsset,
  createItemFromForm,

  createOrder,
  updateOrder,
  deleteOrder,
  cloneOrder,

  addTerm,
  updateTerm,
  deleteTerm,
} = usePurchaseOrders()

/* ================================================================
   TABS
================================================================ */

const activeTab =
  ref("all")

/* ================================================================
   FILTERS
================================================================ */

const filters = ref<{
  search: string
  department: string
  supplier: string
  status: any | null
}>({
  search: "",
  department: "",
  supplier: "",
  status: null,
})

const clearFilters = () => {
  filters.value = {
    search: "",
    department: "",
    supplier: "",
    status: null,
  }
}

/* ================================================================
   HEADERS
================================================================ */

const orderHeaders = [
  {
    title: "Code",
    key: "poNumber",
  },

  {
    title: "Purpose",
    key: "orderType",
  },

  {
    title: "Department",
    key: "department",
  },

  {
    title: "Vendor / Supplier",
    key: "supplier",
  },

  {
    title: "Issuer",
    key: "requester",
  },

  {
    title: "Status",
    key: "status",
  },

  {
    title: "Total",
    key: "totalAmount",
    align: "end" as const,
  },

  {
    title: "Modified",
    key: "poDate",
  },

  /*
   * IMPORTANT:
   * Jangan letak data-table-expand dekat sini.
   * show-expand akan create column tersebut automatically.
   */
  {
    title: "Actions",
    key: "actions",
    sortable: false,
  },
]

const myOrderHeaders = [
  {
    title: "Code",
    key: "poNumber",
  },

  {
    title: "Purpose",
    key: "orderType",
  },

  {
    title: "Department",
    key: "department",
  },

  {
    title: "Supplier",
    key: "supplier",
  },

  {
    title: "Status",
    key: "status",
  },

  {
    title: "Total",
    key: "totalAmount",
    align: "end" as const,
  },

  {
    title: "Date",
    key: "poDate",
  },

  {
    title: "Actions",
    key: "actions",
    sortable: false,
  },
]

const termHeaders = [
  {
    title: "Title",
    key: "title",
  },

  {
    title: "Applicable For",
    key: "applicableFor",
  },

  {
    title: "Description",
    key: "description",
  },

  {
    title: "Last Updated",
    key: "lastUpdated",
  },

  {
    title: "Mandatory",
    key: "mandatory",
  },

  {
    title: "Actions",
    key: "actions",
    sortable: false,
  },
]

/* ================================================================
   FILTERED ORDERS
================================================================ */

const filteredOrders =
  computed(() => {
    const search =
      filters.value.search
        .trim()
        .toLowerCase()

    return orders.value.filter(
      (order) => {
        const searchableText = [
          order.poNumber,
          order.orderType,
          order.department,
          order.supplier,
          order.requester,
          order.status,
        ]
          .join(" ")
          .toLowerCase()

        const matchesSearch =
          !search ||
          searchableText.includes(
            search,
          )

        const matchesDepartment =
          !filters.value.department ||
          order.department ===
            filters.value.department

        const matchesSupplier =
          !filters.value.supplier ||
          order.supplier ===
            filters.value.supplier

        const matchesStatus =
          !filters.value.status ||
          order.status ===
            filters.value.status


        return (
          matchesSearch &&
          matchesDepartment &&
          matchesSupplier &&
          matchesStatus         
        )
      },
    )
  })

/* ================================================================
   EXPANDED ROW
================================================================ */

const expandedOrders =
  ref<string[]>([])

watch(
  filters,
  () => {
    expandedOrders.value = []
  },
  {
    deep: true,
  },
)

/* ================================================================
   ORDER FORM
================================================================ */

const orderDialog =
  ref(false)

const editingOrderId =
  ref<string | null>(null)

const assetForm =
  ref<AssetForm>(
    createEmptyAsset(),
  )

const orderItems =
  ref<PurchaseOrderItem[]>([])

const orderForm =
  ref({
    orderType:
      "Purchase Order",

    department: "",

    notes: "",
  })

const addAnotherItem =
  ref(false)

/* ================================================================
   TOTALS
================================================================ */

const currentItemTotal =
  computed(() => {
    return Math.max(
      0,

      Number(
        assetForm.value.quantity ||
          0,
      ) *
        Number(
          assetForm.value.unitPrice ||
            0,
        ) -
        Number(
          assetForm.value.discount ||
            0,
        ),
    )
  })

const orderItemsTotal =
  computed(() => {
    return orderItems.value.reduce(
      (sum, item) =>
        sum +
        Number(
          item.totalAmount || 0,
        ),
      0,
    )
  })

/* ================================================================
   NEW ORDER
================================================================ */

const openNewOrder =
  () => {
    editingOrderId.value =
      null

    orderForm.value = {
      orderType:
        "Purchase Order",

      department: "",

      notes: "",
    }

    assetForm.value =
      createEmptyAsset()

    orderItems.value = []

    addAnotherItem.value =
      false

    orderDialog.value =
      true
  }

const closeOrderDialog =
  () => {
    orderDialog.value =
      false

    editingOrderId.value =
      null

    orderItems.value = []

    assetForm.value =
      createEmptyAsset()
  }

/* ================================================================
   EDIT ORDER
================================================================ */

const openEditOrder = (
  order: PurchaseOrder,
) => {
  if (
    order.status !==
    "Draft"
  ) {
    showSnackbar(
      "Only Draft orders can be edited.",
      "warning",
    )

    return
  }

  editingOrderId.value =
    order.id

  orderForm.value = {
    orderType:
      order.orderType,

    department:
      order.department,

    notes:
      order.notes,
  }

  /*
   * Load ALL existing items.
   * This fixes the previous issue where
   * the first item could be duplicated.
   */
  orderItems.value =
    order.items.map(
      (item) => ({
        ...item,

        supportingDocuments: [
          ...item.supportingDocuments,
        ],
      }),
    )

  assetForm.value =
    createEmptyAsset()

  assetForm.value.department =
    order.department

  addAnotherItem.value =
    false

  orderDialog.value =
    true
}

/* ================================================================
   VALIDATE ITEM
================================================================ */

const validateItem =
  () => {
    if (
      !assetForm.value.asset.trim()
    ) {
      showSnackbar(
        "Please enter the asset.",
        "warning",
      )

      return false
    }

    if (
      !assetForm.value.supplier
    ) {
      showSnackbar(
        "Please select a supplier.",
        "warning",
      )

      return false
    }

    if (
      !orderForm.value.department
    ) {
      showSnackbar(
        "Please select a department.",
        "warning",
      )

      return false
    }

    if (
      Number(
        assetForm.value.quantity,
      ) <= 0
    ) {
      showSnackbar(
        "Quantity must be greater than 0.",
        "warning",
      )

      return false
    }

    if (
      Number(
        assetForm.value.unitPrice,
      ) < 0
    ) {
      showSnackbar(
        "Unit price cannot be negative.",
        "warning",
      )

      return false
    }

    if (
      Number(
        assetForm.value.discount,
      ) < 0
    ) {
      showSnackbar(
        "Discount cannot be negative.",
        "warning",
      )

      return false
    }

    return true
  }

/* ================================================================
   ADD CURRENT ITEM
================================================================ */

const addCurrentItem =
  () => {
    if (!validateItem()) {
      return
    }

    if (
      !assetForm.value.department
    ) {
      assetForm.value.department =
        orderForm.value.department
    }

    const item =
      createItemFromForm(
        assetForm.value,
      )

    orderItems.value.push(
      item,
    )

    assetForm.value =
      createEmptyAsset()

    assetForm.value.department =
      orderForm.value.department

    showSnackbar(
      "Item added.",
      "success",
    )
  }

/* ================================================================
   REMOVE ITEM
================================================================ */

const removeOrderItem =
  (index: number) => {
    orderItems.value.splice(
      index,
      1,
    )

    showSnackbar(
      "Item removed.",
      "success",
    )
  }

/* ================================================================
   SAVE ORDER
================================================================ */

const saveOrder =
  () => {
    /*
     * If current item contains data,
     * add it automatically.
     */
    if (
      assetForm.value.asset.trim()
    ) {
      if (!validateItem()) {
        return
      }

      if (
        !assetForm.value.department
      ) {
        assetForm.value.department =
          orderForm.value.department
      }

      orderItems.value.push(
        createItemFromForm(
          assetForm.value,
        ),
      )

      assetForm.value =
        createEmptyAsset()
    }

    if (
      !orderItems.value.length
    ) {
      showSnackbar(
        "Please add at least one item.",
        "warning",
      )

      return
    }

    if (
      !orderForm.value.department
    ) {
      showSnackbar(
        "Please select a department.",
        "warning",
      )

      return
    }

    const items =
      orderItems.value.map(
        (item) => ({
          ...item,

          department:
            item.department ||
            orderForm.value
              .department,
        }),
      )

    if (
      editingOrderId.value
    ) {
      updateOrder(
        editingOrderId.value,
        {
          orderType:
            orderForm.value
              .orderType,

          department:
            orderForm.value
              .department,

          notes:
            orderForm.value
              .notes,

          items,
        },
      )

      showSnackbar(
        "Purchase order updated successfully.",
        "success",
      )
    } else {
      createOrder({
        orderType:
          orderForm.value
            .orderType,

        requester:
          currentUser.value,

        department:
          orderForm.value
            .department,

        notes:
          orderForm.value
            .notes,

        items,

        status: "Draft",

      })

      showSnackbar(
        "Purchase order created successfully.",
        "success",
      )
    }

    closeOrderDialog()
  }

/* ================================================================
   FILES
================================================================ */

const handleFileChange =
  (
    value:
      | File[]
      | File
      | null,
  ) => {
    if (!value) {
      assetForm.value.supportingDocuments =
        []

      return
    }

    if (
      Array.isArray(value)
    ) {
      assetForm.value.supportingDocuments =
        value

      return
    }

    assetForm.value.supportingDocuments =
      [value]
  }

/* ================================================================
   VIEW ORDER
================================================================ */

const viewDialog =
  ref(false)

const selectedOrder =
  ref<PurchaseOrder | null>(
    null,
  )

const viewOrder =
  (
    order: PurchaseOrder,
  ) => {
    selectedOrder.value =
      order

    viewDialog.value =
      true
  }

/* ================================================================
   CLONE
================================================================ */

const handleCloneOrder =
  (
    order: PurchaseOrder,
  ) => {
    const cloned =
      cloneOrder(
        order.id,
      )

    if (!cloned) {
      showSnackbar(
        "Unable to clone order.",
        "error",
      )

      return
    }

    showSnackbar(
      `${order.poNumber} cloned as ${cloned.poNumber}.`,
      "success",
    )
  }

/* ================================================================
   DELETE
================================================================ */

const handleDeleteOrder =
  (
    order: PurchaseOrder,
  ) => {
    const confirmed =
      window.confirm(
        `Delete ${order.poNumber}?`,
      )

    if (!confirmed) {
      return
    }

    if (
      deleteOrder(order.id)
    ) {
      expandedOrders.value =
        expandedOrders.value.filter(
          (id) =>
            id !== order.id,
        )

      showSnackbar(
        `${order.poNumber} deleted.`,
        "success",
      )
    }
  }

/* ================================================================
   DEPARTMENT
================================================================ */

const viewDepartmentOrders =
  (
    department: string,
  ) => {
    filters.value = {
      search: "",

      department,

      supplier: "",

      status: "",

    }

    activeTab.value =
      "all"
  }

/* ================================================================
   TERMS
================================================================ */

const termDialog =
  ref(false)

const editingTermId =
  ref<string | null>(null)

const termForm = ref({
  title: "",

  applicableFor:
    "All Suppliers",

  description: "",

  lastUpdated:
    new Date()
      .toISOString()
      .split("T")[0],

  mandatory: true,
})

const resetTermForm =
  () => {
    termForm.value = {
      title: "",

      applicableFor:
        "All Suppliers",

      description: "",

      lastUpdated:
        new Date()
          .toISOString()
          .split("T")[0],

      mandatory: true,
    }
  }

const openNewTerm =
  () => {
    editingTermId.value =
      null

    resetTermForm()

    termDialog.value =
      true
  }

const openEditTerm =
  (
    term: TermsCondition,
  ) => {
    editingTermId.value =
      term.id

    termForm.value = {
      title:
        term.title,

      applicableFor:
        term.applicableFor,

      description:
        term.description,

      lastUpdated:
        term.lastUpdated,

      mandatory:
        term.mandatory,
    }

    termDialog.value =
      true
  }

const saveTerm =
  () => {
    if (
      !termForm.value.title.trim()
    ) {
      showSnackbar(
        "Please enter a title.",
        "warning",
      )

      return
    }

    if (
      editingTermId.value
    ) {
      updateTerm(
        editingTermId.value,
        {
          ...termForm.value,
        },
      )

      showSnackbar(
        "Term updated successfully.",
        "success",
      )
    } else {
      addTerm({
        ...termForm.value,
      })

      showSnackbar(
        "Term added successfully.",
        "success",
      )
    }

    termDialog.value =
      false

    editingTermId.value =
      null
  }

const handleDeleteTerm =
  (
    term: TermsCondition,
  ) => {
    const confirmed =
      window.confirm(
        `Delete "${term.title}"?`,
      )

    if (!confirmed) {
      return
    }

    deleteTerm(term.id)

    showSnackbar(
      "Term deleted.",
      "success",
    )
  }

/* ================================================================
   PDF
================================================================ */

const escapeHtml =
  (
    value: unknown,
  ) => {
    return String(
      value ?? "",
    )
      .replace(
        /&/g,
        "&amp;",
      )
      .replace(
        /</g,
        "&lt;",
      )
      .replace(
        />/g,
        "&gt;",
      )
      .replace(
        /"/g,
        "&quot;",
      )
      .replace(
        /'/g,
        "&#039;",
      )
  }

const viewPdf =
  (
    order: PurchaseOrder,
  ) => {
    const printWindow =
      window.open(
        "",
        "_blank",
        "width=1100,height=800",
      )

    if (!printWindow) {
      showSnackbar(
        "Please allow pop-ups to view PDF.",
        "warning",
      )

      return
    }

    const rows =
      order.items
        .map(
          (item) => `
            <tr>
              <td>
                ${escapeHtml(
                  item.description ||
                    item.asset ||
                    "-",
                )}
              </td>

              <td>
                ${escapeHtml(
                  item.category ||
                    "-",
                )}
              </td>

              <td>
                ${escapeHtml(
                  item.subcategory ||
                    "-",
                )}
              </td>

              <td class="right">
                ${item.quantity}
              </td>

              <td class="right">
                ${formatCurrency(
                  item.unitPrice,
                )}
              </td>

              <td class="right">
                ${formatCurrency(
                  item.discount,
                )}
              </td>

              <td class="right">
                ${formatCurrency(
                  item.totalAmount,
                )}
              </td>
            </tr>
          `,
        )
        .join("")

    printWindow.document.write(`
      <!DOCTYPE html>

      <html>

      <head>

        <meta charset="UTF-8">

        <title>
          ${escapeHtml(
            order.poNumber,
          )}
        </title>

        <style>

          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            color: #222;
          }

          h1 {
            margin-bottom: 5px;
          }

          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }

          .info {
            display: grid;
            grid-template-columns:
              repeat(3, 1fr);

            gap: 15px;

            margin-bottom: 30px;
          }

          .box {
            border: 1px solid #ddd;
            padding: 12px;
          }

          .label {
            color: #777;
            font-size: 11px;
            margin-bottom: 5px;
          }

          .value {
            font-weight: bold;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th,
          td {
            border: 1px solid #ddd;
            padding: 9px;
          }

          th {
            background: #f5f5f5;
            text-align: left;
          }

          .right {
            text-align: right;
          }

          .grand-total td {
            font-weight: bold;
          }

          .notes {
            margin-top: 30px;
            border: 1px solid #ddd;
            padding: 15px;
          }

        </style>

      </head>

      <body>

        <div class="header">

          <div>
            <h1>Purchase Order</h1>

            <div>
              Procurement
            </div>
          </div>

          <div style="text-align:right;">
            <strong>
              ${escapeHtml(
                order.poNumber,
              )}
            </strong>

            <br>

            ${escapeHtml(
              formatDate(
                order.poDate,
              ),
            )}
          </div>

        </div>

        <div class="info">

          <div class="box">
            <div class="label">
              Department
            </div>

            <div class="value">
              ${escapeHtml(
                order.department,
              )}
            </div>
          </div>

          <div class="box">
            <div class="label">
              Supplier
            </div>

            <div class="value">
              ${escapeHtml(
                order.supplier,
              )}
            </div>
          </div>

          <div class="box">
            <div class="label">
              Requester
            </div>

            <div class="value">
              ${escapeHtml(
                order.requester,
              )}
            </div>
          </div>

          <div class="box">
            <div class="label">
              Status
            </div>

            <div class="value">
              ${escapeHtml(
                order.status,
              )}
            </div>
          </div>

          <div class="box">
            <div class="label">
              Order Type
            </div>

            <div class="value">
              ${escapeHtml(
                order.orderType,
              )}
            </div>
          </div>

        </div>

        <h3>
          Order Items
        </h3>

        <table>

          <thead>
            <tr>
              <th>Description</th>
              <th>Type</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Discount</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>

            ${rows}

            <tr class="grand-total">

              <td
                colspan="6"
                class="right"
              >
                Grand Total
              </td>

              <td class="right">
                ${formatCurrency(
                  order.totalAmount,
                )}
              </td>

            </tr>

          </tbody>

        </table>

        ${
          order.notes
            ? `
              <div class="notes">
                <strong>
                  Notes
                </strong>

                <br><br>

                ${escapeHtml(
                  order.notes,
                )}
              </div>
            `
            : ""
        }

        <script>
          window.onload = function () {
            window.print();
          };
        <\/script>

      </body>

      </html>
    `)

    printWindow.document.close()
  }

/* ================================================================
   FORMAT
================================================================ */

const formatCurrency =
  (
    value: number,
  ) => {
    return new Intl.NumberFormat(
      "en-MY",
      {
        style: "currency",
        currency: "MYR",
        minimumFractionDigits: 2,
      },
    ).format(
      Number(value || 0),
    )
  }

const formatDate =
  (
    value: string,
  ) => {
    if (!value) {
      return "-"
    }

    const date =
      new Date(value)

    if (
      Number.isNaN(
        date.getTime(),
      )
    ) {
      return value
    }

    return new Intl.DateTimeFormat(
      "en-MY",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      },
    ).format(date)
  }

/* ================================================================
   COLORS
================================================================ */

const statusColor =
  (
    status: string,
  ) => {
    switch (status) {
      case "Draft":
        return "grey"

      case "Pending Approval":
        return "warning"

      case "Approved":
        return "success"

      case "Ordered":
        return "info"

      case "Partially Received":
        return "deep-purple"

      case "Completed":
        return "success"

      case "Cancelled":
        return "error"

      default:
        return "grey"
    }
  }

const approvalColor =
  (
    status: string,
  ) => {
    switch (status) {
      case "Approved":
        return "success"

      case "Rejected":
        return "error"

      case "Pending":
        return "warning"

      default:
        return "grey"
    }
  }

/* ================================================================
   SNACKBAR
================================================================ */

const snackbar = ref({
  show: false,
  message: "",
  color:
    "success" as
      | "success"
      | "warning"
      | "error"
      | "info",
})

const showSnackbar =
  (
    message: string,
    color:
      | "success"
      | "warning"
      | "error"
      | "info" =
      "success",
  ) => {
    snackbar.value = {
      show: true,
      message,
      color,
    }
  }
</script>

<style scoped>
.purchase-order-table :deep(th) {
  white-space: nowrap;
}

.purchase-order-table :deep(td) {
  vertical-align: middle;
}

.expanded-order-wrapper {
  padding: 20px 24px 24px;
  background: rgb(var(--v-theme-surface-variant));
}

.item-detail-table {
  background: rgb(var(--v-theme-surface));
  border: 1px solid
    rgba(
      var(--v-border-color),
      var(--v-border-opacity)
    );
  border-radius: 8px;
}

.item-detail-table th {
  white-space: nowrap;
  font-weight: 600;
}

.item-detail-table td {
  vertical-align: middle;
}

.item-detail-table tfoot td {
  border-top: 2px solid
    rgba(
      var(--v-border-color),
      var(--v-border-opacity)
    );
}

.h-100 {
  height: 100%;
}
</style>