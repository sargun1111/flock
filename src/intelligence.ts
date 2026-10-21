import type { Intervention, InterventionStats, InterventionType, Participant, Risk, Status } from './types'

const RECENT_WINDOW = 3
const MINIMUM_PREVIOUS_EVENTS = 3
const recent = (participant: Participant) => participant.history.slice(-RECENT_WINDOW)
const previous = (participant: Participant) => participant.history.slice(0, -RECENT_WINDOW)
export const attended = (items: { attended: boolean }[]) => items.filter(item => item.attended).length
export const previousPattern = (participant: Participant) => ({ attended: attended(previous(participant)), total: previous(participant).length })
export const recentPattern = (participant: Participant) => ({ attended: attended(recent(participant)), total: recent(participant).length })
export const attendanceSummary = (participant: Participant) => `${attended(participant.history)} / ${participant.history.length}`
export const hasSufficientAttendanceHistory = (participant: Participant) => previousPattern(participant).total >= MINIMUM_PREVIOUS_EVENTS && recentPattern(participant).total > 0

/** Current demo logic: transparent rules. Future production logic can replace these with AI/ML-assisted signals. */
export function calculateRisk(participant: Participant): Risk {
  if (participant.returnedAt || participant.joinedRecently || !hasSufficientAttendanceHistory(participant)) return 'Low'
  const before = previousPattern(participant)
  const now = recentPattern(participant)
  const previousRate = before.attended / before.total
  if (previousRate >= .7 && now.attended === 0) return 'High'
  if (previousRate >= .5 && now.attended <= 1) return 'Medium'
  return 'Low'
}

export function detectDrift(participant: Participant): Status {
  if (participant.returnedAt) return 'Returned'
  if (participant.joinedRecently || !hasSufficientAttendanceHistory(participant)) return 'New'
  const before = previousPattern(participant)
  const now = recentPattern(participant)
  const previousRate = before.attended / before.total
  if (previousRate >= .7 && now.attended === 0) return 'Drifting'
  if (previousRate >= .5 && now.attended <= 1) return 'At Risk'
  return 'Healthy'
}

export function inferReason(participant: Participant) {
  if (participant.joinedRecently || !hasSufficientAttendanceHistory(participant)) return 'New participant drop-off'
  const before = previousPattern(participant)
  const now = recentPattern(participant)
  if (before.attended / before.total >= .85 && now.attended === 0) return 'Schedule conflict'
  if (now.attended <= 1) return 'Changing engagement'
  return 'Temporary absence'
}

export function recommendIntervention(participant: Participant): InterventionType {
  const reason = inferReason(participant)
  if (reason === 'Schedule conflict') return 'Alternative event suggestion'
  if (reason === 'New participant drop-off') return 'Welcome-back message'
  if (reason === 'Changing engagement') return 'Ask reason'
  return 'Low-pressure reminder'
}

export function getTotalParticipants(participants: Participant[]) { return participants.length }
export function getActiveParticipants(participants: Participant[]) { return participants.filter(participant => detectDrift(participant) === 'Healthy').length }
export function getDriftingParticipants(participants: Participant[]) { return participants.filter(participant => ['Drifting', 'At Risk'].includes(detectDrift(participant))) }

/** Community return rate: participants with an explicitly recorded return divided by participants with sufficient attendance history. */
export function getReturnRate(participants: Participant[]) {
  const eligible = participants.filter(hasSufficientAttendanceHistory)
  return eligible.length ? Math.round(eligible.filter(participant => Boolean(participant.returnedAt)).length / eligible.length * 100) : 0
}

/** Intervention return rate: successful completed interventions divided by all completed interventions with a recorded outcome. */
export function getInterventionStats(interventions: Intervention[]): InterventionStats {
  const pending = interventions.filter(item => item.status === 'Proposed' || item.status === 'Approved').length
  const completed = interventions.filter(item => item.status === 'Completed')
  const successful = completed.filter(item => item.result === 'Returned')
  const times = successful.map(item => item.timeToReturnDays).filter((time): time is number => typeof time === 'number')
  return {
    total: interventions.length,
    pending,
    completed: completed.length,
    successful: successful.length,
    returnRate: completed.length ? Math.round(successful.length / completed.length * 100) : 0,
    averageTimeToReturn: times.length ? Math.round(times.reduce((sum, time) => sum + time, 0) / times.length) : 0
  }
}

export type InterventionTypeStats = {
  recorded: number
  pending: number
  completed: number
  simulatedReturns: number
  returnRate: number | null
}

/** Outcome rates deliberately exclude Approved interventions until a demo outcome is recorded. */
export function getInterventionTypeStats(interventions: Intervention[], type: InterventionType): InterventionTypeStats {
  const recorded = interventions.filter(item => item.type === type)
  const completed = recorded.filter(item => item.status === 'Completed')
  const simulatedReturns = completed.filter(item => item.result === 'Returned').length
  return {
    recorded: recorded.length,
    pending: recorded.length - completed.length,
    completed: completed.length,
    simulatedReturns,
    returnRate: completed.length ? Math.round(simulatedReturns / completed.length * 100) : null
  }
}
