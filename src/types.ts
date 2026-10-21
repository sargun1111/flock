export type Status = 'Healthy' | 'Drifting' | 'At Risk' | 'New' | 'Returned'
export type Risk = 'High' | 'Medium' | 'Low'
export type InterventionStatus = 'Proposed' | 'Approved' | 'Completed'
export type InterventionResult = 'Pending' | 'Returned' | 'No return yet'
export type InterventionType = 'Alternative event suggestion' | 'Welcome-back message' | 'Low-pressure reminder' | 'Ask reason' | 'Do nothing'

export interface HistoryItem { eventId: string; date: string; attended: boolean }
export interface Participant { id: string; name: string; joinedAt: string; status: Status; lastAttended: string; likelyReason: string; history: HistoryItem[]; joinedRecently?: boolean; returnedAt?: string }
export interface Event { id: string; name: string; date: string; attended: number; registered: number }
export interface Intervention { id: string; participantId: string; type: InterventionType; date: string; status: InterventionStatus; result: InterventionResult; returnDate?: string; timeToReturnDays?: number; channel: 'Demo' }
export interface WorkspaceState { participants: Participant[]; interventions: Intervention[] }
export interface InterventionStats {
  total: number
  pending: number
  completed: number
  successful: number
  returnRate: number
  averageTimeToReturn: number
}
