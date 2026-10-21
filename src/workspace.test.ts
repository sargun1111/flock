import { describe, expect, it } from 'vitest'
import { demoRepository } from './repository'
import { detectDrift, getInterventionStats } from './intelligence'
import { approveWorkspaceIntervention, simulateWorkspaceReturn } from './workspace'

describe('demo workspace transitions', () => {
  it('keeps workspace unchanged when a proposal is cancelled, then records only after approval', () => {
    const initial = demoRepository.loadWorkspace()
    // Modal cancellation deliberately invokes no workspace transition.
    const originalCount = initial.interventions.length
    expect(initial.interventions).toHaveLength(originalCount)
    const approved = approveWorkspaceIntervention(initial, 'aman-sharma', 'Alternative event suggestion', 'i-aman-test')
    expect(approved.interventions).toHaveLength(originalCount + 1)
    expect(approved.interventions[0]).toMatchObject({ participantId:'aman-sharma', status:'Approved', result:'Pending' })
  })

  it('does not create duplicate pending interventions for the same participant', () => {
    const initial = demoRepository.loadWorkspace()
    const approved = approveWorkspaceIntervention(initial, 'aman-sharma', 'Alternative event suggestion', 'i-aman-test')
    const duplicate = approveWorkspaceIntervention(approved, 'aman-sharma', 'Ask reason', 'i-aman-duplicate')
    expect(duplicate.interventions).toHaveLength(approved.interventions.length)
  })

  it('completes only the approved intervention and prevents a second simulated return', () => {
    const initial = demoRepository.loadWorkspace()
    const approved = approveWorkspaceIntervention(initial, 'aman-sharma', 'Alternative event suggestion', 'i-aman-test')
    const returned = simulateWorkspaceReturn(approved, 'aman-sharma')
    expect(returned.participants.find(item => item.id === 'aman-sharma')?.returnedAt).toBe('Oct 20, 2026')
    expect(returned.participants.find(item => item.id === 'aman-sharma')?.lastAttended).toBe('Oct 20, 2026')
    expect(returned.interventions.find(item => item.id === 'i-aman-test')).toMatchObject({ status:'Completed', result:'Returned', timeToReturnDays:8 })
    expect(returned.interventions.filter(item => item.status === 'Approved')).toHaveLength(0)
    expect(detectDrift(returned.participants.find(item => item.id === 'aman-sharma')!)).toBe('Returned')
    expect(getInterventionStats(returned.interventions).successful).toBe(getInterventionStats(approved.interventions).successful + 1)
    expect(simulateWorkspaceReturn(returned, 'aman-sharma')).toBe(returned)
  })

  it('restores a fresh original dataset when the demo is reset', () => {
    const initial = demoRepository.loadWorkspace()
    const changed = approveWorkspaceIntervention(initial, 'aman-sharma', 'Alternative event suggestion', 'i-aman-test')
    const reset = demoRepository.resetWorkspace()
    expect(reset.interventions).toHaveLength(initial.interventions.length)
    expect(reset.interventions).not.toBe(initial.interventions)
    expect(reset.interventions.some(item => item.id === 'i-aman-test')).toBe(false)
    expect(changed.interventions).toHaveLength(initial.interventions.length + 1)
  })
})
