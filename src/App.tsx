import { useEffect, useState } from 'react'
import { events } from './data'
import { demoRepository } from './repository'
import type { InterventionType, Participant, WorkspaceState } from './types'
import { approveWorkspaceIntervention, simulateWorkspaceReturn } from './workspace'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { People } from './pages/People'
import { ParticipantDetail } from './pages/ParticipantDetail'
import { Interventions } from './pages/Interventions'

const storageKey = 'flock-validation-workspace-v4'
const isWorkspaceState = (value: unknown): value is WorkspaceState => Boolean(value) && typeof value === 'object' && Array.isArray((value as WorkspaceState).participants) && Array.isArray((value as WorkspaceState).interventions)
const load = (): WorkspaceState => { try { const saved = JSON.parse(localStorage.getItem(storageKey) || 'null'); return isWorkspaceState(saved) ? saved : demoRepository.loadWorkspace() } catch { return demoRepository.loadWorkspace() } }

export default function App() {
  const initial = load()
  const [workspace, setWorkspace] = useState<WorkspaceState>(initial)
  const [path, setPath] = useState(window.location.pathname || '/dashboard')
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(workspace)) }, [workspace])
  useEffect(() => { const onPop = () => setPath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop) }, [])
  const navigate = (to: string) => { history.pushState({}, '', to); setPath(to); window.scrollTo(0, 0) }
  const resetDemo = () => { setWorkspace(demoRepository.resetWorkspace()); navigate('/dashboard') }
  const approveIntervention = (participant: Participant, type: InterventionType) => {
    setWorkspace(current => approveWorkspaceIntervention(current, participant.id, type, `i-${participant.id}-${Date.now()}`))
  }
  const simulateReturn = (participant: Participant) => setWorkspace(current => simulateWorkspaceReturn(current, participant.id))
  const detailId = path.match(/^\/people\/([^/]+)$/)?.[1]
  const shared = { participants: workspace.participants, interventions: workspace.interventions, navigate }
  let content
  if (path === '/dashboard' || path === '/') content = <Dashboard {...shared} events={events} />
  else if (path === '/people') content = <People participants={workspace.participants} navigate={navigate} />
  else if (path === '/interventions') content = <Interventions items={workspace.interventions} participants={workspace.participants} navigate={navigate} />
  else if (detailId) { const participant = workspace.participants.find(item => item.id === detailId); content = participant ? <ParticipantDetail participant={participant} interventions={workspace.interventions} navigate={navigate} approve={approveIntervention} simulate={simulateReturn} /> : <div className="page not-found"><p className="eyebrow">PARTICIPANT NOT FOUND</p><h1>That person is not in this demo workspace.</h1><button className="primary" onClick={() => navigate('/people')}>Back to people</button></div> }
  else content = <div className="page not-found"><p className="eyebrow">PAGE NOT FOUND</p><h1>There is nothing at this address.</h1><button className="primary" onClick={() => navigate('/dashboard')}>Back to overview</button></div>
  return <Layout page={detailId ? '/people' : path} navigate={navigate} resetDemo={resetDemo}>{content}</Layout>
}
