import type { Status } from '../types'
export function StatusBadge({status}:{status:Status}){return <span className={'badge '+status.toLowerCase().replace(' ','-')}>{status}</span>}
