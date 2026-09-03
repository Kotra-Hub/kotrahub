import { kpCurrencyCode, kpCurrencyName } from "@/utils/consts/kConsts";
import type { CrtUser, EmployeeBasic } from "@/modules/employee/employee.interface";

export enum SnackbarColor {
  SUCCESS = '#4CAF50',
  WARNING = '#FF9100',
  ERROR = '#F4511E',
  INFO = '#2196F3'
}

export interface Snackbar {
  show?: boolean | ((obj?: object) => boolean);
  // color: SnackbarColor | string;
  type: 'success' | 'warning' | 'error' | 'info';
  text: string;
  closable?: boolean;
  timeout?: number;
  date?: Date;
}

export const newSnackbar: Snackbar = {
  // color: SnackbarColor.WARNING,
  type: 'error',
  text: 'something went wrong...',
  closable: true,
  show: false,
}

export interface MenuOptions {
  name: string;
  icon: string;
  color: string;
  action(obj?: any): void;
  show(obj?: any): boolean;
}

export interface CommonChangeStatus {
  entityId: string;
  newStatus: string;
  newPhase?: string;
  userId: string;
  remarks?: string;
  departmentId?: string;
  attachmentIds?: string[];
}

export const newCommonChangeStatus: CommonChangeStatus = {
  entityId: '',
  newStatus: '',
  userId: ''
}

export enum AppTheme {
  LIGHT = 'LightTheme',
  DARK = 'DarkTheme',
  LIGHT_BLUE = 'LightBlueTheme',
  DARK_BLUE = 'DarkBlueTheme',
}

export enum StatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  ACCESS_DENIED = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export interface NameValue {
  name: string,
  value: string
}

export interface StoreFlag {
  isLoading: boolean;
  isSaving: boolean;
  isEdit: boolean;
  isEditCat: boolean;
  isEditVendor: boolean;
  isEditContact: boolean;
  isEditAddress: boolean;
  isEditAccDetails: boolean;
  isDeleting: boolean;
  isSubmitting: boolean,
  isAssign: boolean,
  dialogSubmit: boolean,
  dialogDelete: boolean,
  dialogDeleteAtt: boolean,
  dialogNew: boolean;
  dialogConsumable: boolean;
  dialogAddress: boolean,
  dialogContact: boolean,
  validCForm: boolean,
  validAForm: boolean,
  validBForm: boolean,
  dialogDetails: boolean;
  addAnother: boolean;
  validForm: boolean;
  dialogAssign: boolean;
  dialogCategory: boolean;
  dialogRequisition: boolean;
  dialogAllocation: boolean;
  dialogReturn: boolean;
  dialogStart: boolean;
  dialogClose: boolean;
  dialogReview: boolean;
  dialogDisabled: boolean;
  dialogPasswordReset: boolean;
  dialogReset: boolean;
  dialogShipping: boolean;
  dialogDelivery: boolean;
  dialogAnnounce: boolean;
  dialogClaim: boolean;
  dialogApprove: boolean;
  dialogWithdraw: boolean;
  dialogVerify: boolean;
  dialogAuthorize: boolean;
  dialogBankDetails: boolean;
  dialogSpecification: boolean;
  dialogOperating: boolean;
  dialogCalibration: boolean;
  dialogAccount: boolean;
  dialogCancel: boolean;
  isShowItem: boolean;
  dialogStock: boolean;
}

export const newStoreFlag: StoreFlag = {
  isLoading: false,
  isSaving: false,
  isEdit: false,
  isEditCat: false,
  isEditVendor: false,
  isEditContact: false,
  isEditAddress: false,
  isEditAccDetails: false,
  isDeleting: false,
  isSubmitting: false,
  isAssign: false,
  dialogContact: false,
  dialogAddress: false,
  dialogSubmit: false,
  dialogDelete: false,
  dialogDeleteAtt: false,
  dialogNew: false,
  dialogDetails: false,
  dialogAssign: false,
  dialogPasswordReset: false,
  dialogReset: false,
  addAnother: false,
  validForm: false,
  validCForm: false,
  validAForm: false,
  validBForm: false,
  dialogCategory: false,
  dialogRequisition: false,
  dialogAllocation: false,
  dialogReturn: false,
  dialogStart: false,
  dialogClose: false,
  dialogReview: false,
  dialogDisabled: false,
  dialogShipping: false,
  dialogDelivery: false,
  dialogAnnounce: false,
  dialogClaim: false,
  dialogApprove: false,
  dialogWithdraw: false,
  dialogVerify: false,
  dialogBankDetails: false,
  dialogSpecification: false,
  dialogOperating: false,
  dialogCalibration: false,
  dialogAuthorize: false,
  dialogAccount: false,
  dialogConsumable: false,
  dialogCancel: false,
  isShowItem: false,
  dialogStock: false
}

export interface AttachmentFlag {
  view: boolean;
  delete: boolean;
  upload: boolean;
  loading: boolean;
  deleting: boolean;
  entityId?: string;
  entityCode?: string;
  entityName?: string;
}

export const newAttachmentFlag: AttachmentFlag = {
  view: false,
  delete: false,
  upload: false,
  loading: false,
  deleting: false,
}

export interface AttachmentFlagAccount {
  view: boolean;
  delete: boolean;
  upload: boolean;
  loading: boolean;
  deleting: boolean;
  entityId?: string;
  entityCode?: string;
  entityName?: string;
}

export const newAttachmentFlagAccount: AttachmentFlagAccount = {
  view: false,
  delete: false,
  upload: false,
  loading: false,
  deleting: false,
}

export interface AppOrderKey {
  order: 'asc' | 'desc'
  key: string;
}

export interface NameData {
  name: string;
  data: number[];
}

export interface AppParams {
  orderBy?: string;
  status?: string;
  isNew?: boolean;
  isActive?: boolean;
  Entity?: string;
  position?: string;
  department?: string;
  yearFrom?: number;
  yearTo?: number;
  monthFrom?: number;
  monthTo?: number;
  dayFrom?: number;
  dayTo?: number;
  pageSize?: number;
  page?: number;
  createdBy?: string;
  search?: string;
  sortBy?: string;
  typeId?: string;
  excludeTypeId?: string;
  categoryId?: string;
  subCategoryId?: string;
  locationId?: string;
  siteId?: string;
  areaId?: string;
  divisionId?: string;
  floorId?: string;
  group?: string;
  title?: string;
  assignee?: string;
  item?: string;
  crtUserId?: string;
  category?: string;
}

export interface CodeName {
  code: string;
  name: string;
}

export interface IdCodeName {
  id: string;
  code: string;
  name: string;
}

export interface CodeDescription {
  code: string;
  description: string;
}

export interface Country {
  name: string;
}

export interface WithholdingTax {
  // id: string;
  code?: string;
  rate: number;
  country?: string;
  name?: string;
}
// export interface WithholdingTax {
//   code?: string;
//   name?: string;
//   rate?: string;
//   country?: string;
// }

export interface Currency {
  code: string;
  name: string;
}

export const currencyDefault: Currency = {
  code: kpCurrencyCode,
  name: kpCurrencyName
}

export interface Uom {
  code: string;
  name: string;
}

export const newUom: Uom = {
  name: '',
  code: '',
};

export interface Compliance {
  itemIds: string[],
  action: string,
  remarks?: string,
}

export interface FileUploadDTO {
  totalFilesUploaded: number;
  totalSizeUploaded: string;
  filePaths: string[];
  fileNames: string[];
  notUploadedFiles: string[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  path: string;
  uri: string;
  entityId: string;
  entityName: string;
  dtCreated?: Date;
  dtUpdated?: Date;
  crtUser?: EmployeeBasic;
}

export interface AttachmentBasic {
  id: string;
  name: string;
  uri: string;
  nameEncoded: string;
  extension: string;
  type: string;
  size: number;
  dtUpdated?: Date;
  fileStream?: Blob
}
export interface AttachmentBasicAccount {
  id: string;
  name: string;
  uri: string;
  nameEncoded: string;
  extension: string;
  type: string;
  size: number;
  dtUpdated?: Date;
  fileStream?: Blob
}

export interface UploadFile {
  file: File;
  entityId?: string;
  entityCode?: string;
}

export interface EntityAction {
  entityId: string;
  action: string;
  remarks?: string;
  attachmentIds?: string[];
  crtUser?: CrtUser;
  departmentId?: string;
}

export interface DownloadPDF {
  id: string;
  crtUser?: CrtUser;
}

export interface MonthlyData {
  name: string;
  data: number[];
}

export enum CommonStatus {
  CREATED = 'created',
  SUBMITTED = 'submitted',
  IN_REVIEW = 'in review',
  UNDER_VERIFICATION = 'under verification',
  MISSING_INFO = 'missing info',
  REQUEST_INFO = 'request info',
  REJECTED = 'rejected',
  REJECTED_AUTO = 'auto rejected',
  APPROVED = 'approved',
  OBSOLETE = 'obsolete',
  INACTIVE = 'inactive',
  INITIATION = 'initiation',
  PLANNING = 'planning',
  EXECUTION = 'execution',
  MONITORING = 'monitoring',
  CLOSURE = 'closure',
  ACTIVE = 'active',
  RESIGNED = 'resigned',
  TERMINATED = 'terminated',
  RETIRED = 'retired',
  ABSCONDED = 'absconded',
  DECEASED = 'deceased',
  ARCHIVED = 'archived',
  OTHERS = 'others',
  RETURN_APPROVE = 'return approve',
  RETURN_REJECTED = 'return rejected',
  REQUISITION_REJECTED = 'requisition rejected',
  IN_PROGRESS = 'in progress',
  AVAILABLE = 'available',
  COMPLETED = 'completed'
}

export enum ProjectPhase {
  INITIATION = 'initiation',
  PLANNING = 'planning',
  EXECUTION = 'execution',
  MONITORING = 'monitoring',
  CLOSURE = 'closure',
}

export enum CommonAction {
  ADD = 'add',
  REMOVE = 'remove',
  SUBMIT = 'submit',
  SUBMIT_FOR_APPROVAL = 'submit for approval',
  APPROVE = 'approve',
  APPROVE_L1 = 'approve level 1',
  APPROVE_L2 = 'approve level 2',
  REJECT = 'reject',
  REQUEST_INFO = 'request info',
  VERIFY = 'verify',
  CANCEL = 'cancel',
  CONFIRM = 'confirm',
  SUBMIT_CHANGES = 'submit changes',
  WITHDRAW = 'withdraw',
}

export enum AppTabs {
  DASHBOARD = 'Dashboard',
  USER_HISTORY = 'My History',
  MGMT_CATEGORY = 'Category Management',
  MGMT_DEPARTMENT = 'Department Management',
  MGMT_EMPLOYEE = 'requisition management',
  PO_LIST_PERSONAL = 'Manage Personal Purchase Orders',
  PO_LIST_DEPARTMENT = 'Manage Department Purchase Orders',
  PO_LIST_ALL = 'Manage All Purchase Orders',
  PO_LIST_MASTER = 'Manage Master List Purchase Orders',
  PO_LIST_PENDING = 'Manage Pending Purchase Orders',
  PO_LIST_ALLOCATION = 'Manage Purchase Orders Allocations',
  PO_LIST_VENDORS = 'Manage Vendors & Suppliers',
  PO_REPORTS = 'Purchase Orders Reports',
  PO_ITEM_DETAILS = 'Purchase Order Item Details',
  PO_ITEM_ATTACHMENTS = 'Purchase Order Item Attachments',
  PO_ITEM_ASSESSMENT = 'Purchase Order Item Assessment',
  PO_ITEM_HISTORY = 'Purchase Order Item History',
  PO_LIST_SHIPPING = 'Manage Purchase Orders Shipment',
  PO_TERMS_CONDITION = 'Manage Purchase Orders Terms and Condition',
  PO_DETAILS_ALL = 'Details',
  PO_DETAILS_ITEMS = 'Items',
  PO_DETAILS_HISTORY = 'History',
  PO_DETAILS_PREVIEW = 'Preview',
  PO_DETAILS_SHIPPING = 'Shipping',
  MGMT_LOCATION = 'Location Management',
  INVENTORY_ADMIN = 'Inventory Management',
  INVENTORY_ITEMS = 'Inventory Items',
  INVENTORY_REQUISITION = 'Inventory Requisitions',
  INVENTORY_ISSUES = 'Inventory Issues',
  INVENTORY_PERSONAL = 'Inventory Personal',
  INVENTORY_TYPE = 'Inventory Type',
  INVENTORY_CATEGORY = 'Inventory Category',
  ORG_EMPLOYEES_ALL = 'All Employees',
  ORG_EMPLOYEES_DEPT = 'Department Employees',
  ORG_DEPARTMENTS = 'Departments',
  ORG_ROLES = 'Roles',
  ORG_LOCATIONS = 'Locations',
  ORG_SITES = 'Sites',
  ORG_CATEGORIES = 'Categories',
  ORG_POSITIONS = 'Positions',
  ORG_GRADES = 'Grades',
  REQUISITION_ALL = 'All Requisitions',
  REQUISITION_PERSONAL = 'My Requisitions',
  REQUISITION_DEPARTMENT = 'Department Requisitions',
  REQUISITION_TASKED = 'Pendings',
  REQUISITION_CATEGORY = 'Categories',
  REQUISITION_DETAILS = 'Details',
  REQUISITION_ITEMS = 'Items',
  REQUISITION_ITEM_DETAILS = 'Details',
  REQUISITION_ATTACHMENTS = 'Attachments',
  REQUISITION_HISTORY = 'History',
  REQUISITION_ITEM_HISTORY = 'History',
  REQUISITION_TASKS = 'Tasks',
  REQUISITION_FORM = 'Form',
  REQUISITION_CHECKOUT = 'Checkout',
  REQUISITION_REPORTS = 'Requisition Reports',
  ANNOUNCEMENT_LIST = 'Announcements',
  GROUP_LIST = 'Groups',
  CLAIM_LIST = 'Claims',
  CLAIM_PERSONAL = 'Claims Personal',
  CLAIM_DETAILS = 'Claim Details',
  CLAIM_ATTACHMENTS = 'Claim Attachments',
  CLAIM_HISTORY = 'Claim History',
  EMPLOYEE = 'Employees',
  DETAILS = 'Details',
  ATTACHMENTS = 'Attachments',
  MY_REPORT = 'My Feedbacks',
  REPORTING_ISSUE_LIST = 'Help & Feedback',
  REPORTING_ISSUE_CATEGORY = 'Feedback Types',
  REPORTING_ISSUE_DETAILS = 'Details',
  REPORTING_ISSUE_HISTORY = 'History',
  REPORTING_ISSUE_ATTACHMENTS = 'Attachments',
  EVENT_LIST = 'Events',
  MODULE_LIST = 'Modules',
  CALIBRATION = 'Calibrations',
  DEPARTMENT_DETAILS = 'Details',
  DEPARTMENT_EMPLOYEES = 'Employees',
  DEPARTMENT_TEAMS = 'Teams',
  DEPARTMENT_WORKFLOW = 'Workflow',
  DEPARTMENT_HISTORY = 'History',
  VENDOR_DETAILS = 'Details',
  VENDOR_VERIFICATION = 'Checklist',
  VENDOR_ACCOUNTING_INFO = 'Accounting Info',
  VENDOR_ATTACHMENTS = 'Attachments',
  VENDOR_HISTORY = 'History',
}

export enum SendType {
  ALL = 'all',
  EMAIL = 'email',
  NOTIFICATION = 'notification',
  GROUPS = 'groups',
  DEPARTMENTS = 'departments',
  ALLKP = 'all kotra',
  ISSUE_FOR = 'issue for',
}

export enum ShipmentType {
  PARTIAL = 'partial',
  FULL = 'full',
}

export enum OrderType {
  SERVICE = 'Service',
  ASSET = 'Asset',
  CONSUMABLE = 'Consumable',
  RAW = 'raw material',
}

export enum TCTypes {
  ALL = 'all',
  SELECTED_DEPARTMENT = 'selected department',
}

export interface TourStep {
  title: string;
  content: string;
  target?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  width?: number;
  height?: number;
}

export interface ActionConfirmation {
  actionName: CommonAction;
  remarks?: string
}
