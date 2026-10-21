import { useMemo, useState } from 'react'
import type { Participant } from '../types'
import { detectDrift, calculateRisk, recentPattern } from '../intelligence'
import { ParticipantRow } from '../components/ParticipantRow'
type Sort = 'Risk' | 'Recent activity' | 'Name'
export function People({ participants, navigate }: { participants:Participant[]; navigate:(to:string)=>void }) {
  const [query, setQuery] = useState(''); const [filter, setFilter] = useState('All'); const [sort, setSort] = useState<Sort>('Risk')
  const results = useMemo(() => participants.filter(participant => (filter === 'All' || detectDrift(participant) === filter) && participant.name.toLowerCase().includes(query.toLowerCase())).sort((a, b) => {
    if (sort === 'Name') return a.name.localeCompare(b.name)
    if (sort === 'Recent activity') return recentPattern(a).attended - recentPattern(b).attended
    const rank = { High:3, Medium:2, Low:1 }; return rank[calculateRisk(b)] - rank[calculateRisk(a)]
  }), [participants, query, filter, sort])
  return <div className="page"><div className="page-heading"><div><p className="eyebrow">LUDHIANA RUNNING CLUB · PARTICIPANTS</p><h1>People</h1><p className="subheading">Find the relationships that need attention before they quietly fade.</p></div><div className="member-count">{participants.length} participants</div></div><section className="panel people-panel"><div className="toolbar"><label className="search"><span>⌕</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by name"/></label><div className="filter-group"><select aria-label="Filter by status" value={filter} onChange={event => setFilter(event.target.value)}>{['All','Healthy','Drifting','At Risk','New'].map(option => <option key={option}>{option}</option>)}</select><select aria-label="Sort people" value={sort} onChange={event => setSort(event.target.value as Sort)}>{(['Risk','Recent activity','Name'] as Sort[]).map(option => <option key={option}>{option}</option>)}</select></div></div><div className="table-wrap"><table><thead><tr><th>Name</th><th>Recent</th><th>Previous</th><th>Last attended</th><th>Status</th><th>Possible reason</th><th>Recommended action</th><th>Action</th></tr></thead><tbody>{results.map(participant => <ParticipantRow key={participant.id} participant={participant} onOpen={() => navigate(`/people/${participant.id}`)}/>)}</tbody></table></div>{results.length === 0 && <div className="empty-state">No people match that search. Try another name or filter.</div>}</section></div>
}
