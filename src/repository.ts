import { initialInterventions, initialParticipants } from './data'
import type { WorkspaceState } from './types'
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T
/** Local demo data source. Replace these calls with REST/database requests in a future backend. */
export const demoRepository = {
  loadWorkspace: (): WorkspaceState => clone({ participants: initialParticipants, interventions: initialInterventions }),
  resetWorkspace: (): WorkspaceState => clone({ participants: initialParticipants, interventions: initialInterventions })
}
