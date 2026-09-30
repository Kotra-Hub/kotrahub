export type RequisitionStatus = 'Pending' | 'Approved' | 'Rejected' | 'Awaiting IT Review' | 'Completed' | 'In Progress'

export interface Requisition {
  requestNo: string
  date: string
  requester: string
  department: string
  category: string
  module?: string
  description: string
  amount?: number
  priority?: 'High' | 'Medium' | 'Low'
  status: RequisitionStatus
}
