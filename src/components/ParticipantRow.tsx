import type { Participant } from '../types'
import { calculateRisk, detectDrift, previousPattern, recentPattern, recommendIntervention } from '../intelligence'
import { StatusBadge } from './RiskBadge'
export function ParticipantRow({ participant, onOpen }: { participant:Participant; onOpen:()=>void }) {
  const before = previousPattern(participant); const recent = recentPattern(participant); const status = detectDrift(participant)
  return <tr onClick={onOpen}><td><div className="person"><div className="avatar">{participant.name.split(' ').map(name => name[0]).join('')}</div><strong>{participant.name}</strong></div></td><td><strong>{recent.attended}/{recent.total}</strong><small className="table-sub">recent</small></td><td><strong>{before.attended}/{before.total}</strong><small className="table-sub">previous</small></td><td>{participant.lastAttended}</td><td><div className="table-status"><StatusBadge status={status}/><span className={`risk ${calculateRisk(participant).toLowerCase()}`}>{calculateRisk(participant)}</span></div></td><td>{participant.likelyReason}</td><td>{recommendIntervention(participant)}</td><td><button className="text-button" onClick={event => { event.stopPropagation(); onOpen() }}>Review <span>→</span></button></td></tr>
}
