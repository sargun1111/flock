import { describe, expect, it } from 'vitest'
import { initialParticipants } from './data'
import { calculateRisk, detectDrift, getInterventionStats, getInterventionTypeStats, getReturnRate, hasSufficientAttendanceHistory } from './intelligence'
import type { Intervention, Participant } from './types'

const participant = (overrides: Partial<Participant> = {}): Participant => ({
  id:'test', name:'Test Person', joinedAt:'Jan 2026', status:'Healthy', lastAttended:'Today', likelyReason:'—',
  history:[
    { eventId:'1', date:'Sep 1', attended:true }, { eventId:'2', date:'Sep 8', attended:true }, { eventId:'3', date:'Sep 15', attended:true },
    { eventId:'4', date:'Sep 22', attended:true }, { eventId:'5', date:'Sep 29', attended:true }, { eventId:'6', date:'Oct 6', attended:true },
    { eventId:'7', date:'Oct 11', attended:true }, { eventId:'8', date:'Oct 14', attended:false }, { eventId:'9', date:'Oct 17', attended:false }, { eventId:'10', date:'Oct 18', attended:false }
  ], ...overrides
})

describe('retention intelligence', () => {
  it('identifies Aman as a high-risk drifting participant', () => {
    const aman = initialParticipants.find(item => item.id === 'aman-sharma')!
    expect(detectDrift(aman)).toBe('Drifting')
    expect(calculateRisk(aman)).toBe('High')
  })

  it('does not divide by zero or label sparse history as drift', () => {
    const sparse = participant({ history:[{ eventId:'1', date:'Oct 18', attended:false }] })
    expect(hasSufficientAttendanceHistory(sparse)).toBe(false)
    expect(calculateRisk(sparse)).toBe('Low')
    expect(detectDrift(sparse)).toBe('New')
  })

  it('uses completed interventions, not pending interventions, as the return-rate denominator', () => {
    const interventions: Intervention[] = [
      { id:'completed', participantId:'a', type:'Ask reason', date:'Oct 1', status:'Completed', result:'Returned', returnDate:'Oct 4', timeToReturnDays:3, channel:'Demo' },
      { id:'pending', participantId:'b', type:'Ask reason', date:'Oct 2', status:'Approved', result:'Pending', channel:'Demo' }
    ]
    expect(getInterventionStats(interventions)).toMatchObject({ total:2, pending:1, completed:1, successful:1, returnRate:100, averageTimeToReturn:3 })
  })

  it('uses only completed outcomes for each intervention type and labels no-outcome types', () => {
    const interventions: Intervention[] = [
      { id:'returned', participantId:'a', type:'Ask reason', date:'Oct 1', status:'Completed', result:'Returned', returnDate:'Oct 8', timeToReturnDays:7, channel:'Demo' },
      { id:'pending', participantId:'b', type:'Ask reason', date:'Oct 12', status:'Approved', result:'Pending', channel:'Demo' },
      { id:'only-pending', participantId:'c', type:'Welcome-back message', date:'Oct 12', status:'Approved', result:'Pending', channel:'Demo' }
    ]
    expect(getInterventionTypeStats(interventions, 'Ask reason')).toEqual({ recorded:2, pending:1, completed:1, simulatedReturns:1, returnRate:100 })
    expect(getInterventionTypeStats(interventions, 'Welcome-back message')).toEqual({ recorded:1, pending:1, completed:0, simulatedReturns:0, returnRate:null })
  })

  it('counts only explicitly recorded participant returns in the community return rate', () => {
    const returned = participant({ id:'returned', returnedAt:'Oct 18, 2026' })
    const notReturned = participant({ id:'not-returned' })
    expect(getReturnRate([returned, notReturned])).toBe(50)
  })
})
