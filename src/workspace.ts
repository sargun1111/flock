import type { Intervention, InterventionType, Participant, WorkspaceState } from './types'

export const DEMO_APPROVAL_DATE = 'Oct 12, 2026'
export const DEMO_RETURN_DATE = 'Oct 20, 2026'
export const DEMO_RETURN_DAYS = 8

export function approveWorkspaceIntervention(state: WorkspaceState, participantId: string, type: InterventionType, id: string, date = DEMO_APPROVAL_DATE): WorkspaceState {
  const participantExists = state.participants.some(participant => participant.id === participantId)
  const alreadyPending = state.interventions.some(intervention => intervention.participantId === participantId && intervention.status === 'Approved')
  if (!participantExists || alreadyPending) return state
  const intervention: Intervention = { id, participantId, type, date, status: 'Approved', result: 'Pending', channel: 'Demo' }
  return { ...state, interventions: [intervention, ...state.interventions] }
}

export function simulateWorkspaceReturn(state: WorkspaceState, participantId: string, returnDate = DEMO_RETURN_DATE): WorkspaceState {
  const participant = state.participants.find(item => item.id === participantId)
  const pendingIntervention = state.interventions.find(item => item.participantId === participantId && item.status === 'Approved')
  if (!participant || participant.returnedAt || !pendingIntervention) return state
  const participants: Participant[] = state.participants.map(item => item.id === participantId
    ? { ...item, status:'Returned', returnedAt:returnDate, lastAttended:returnDate, history:[...item.history, { eventId:`simulated-return-${pendingIntervention.id}`, date:returnDate, attended:true }] }
    : item)
  const interventions = state.interventions.map(item => item.id === pendingIntervention.id
    ? { ...item, status:'Completed' as const, result:'Returned' as const, returnDate, timeToReturnDays:DEMO_RETURN_DAYS }
    : item)
  return { participants, interventions }
}
