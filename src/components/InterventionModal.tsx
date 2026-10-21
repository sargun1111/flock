import type { InterventionType, Participant } from '../types'
type Props = { participant:Participant; type:InterventionType; onClose:()=>void; onConfirm:()=>void }
export function InterventionModal({ participant, type, onClose, onConfirm }: Props) {
  const firstName = participant.name.split(' ')[0]
  const messages: Record<InterventionType, string> = {
    'Alternative event suggestion': `Hey ${firstName}, we haven't seen you recently. There's another session coming up that may be a better fit for you.` ,
    'Low-pressure reminder': `Hey ${firstName}, we miss seeing you at the runs. No pressure at all—you're always welcome whenever it feels right.`,
    'Ask reason': `Hey ${firstName}, we noticed you haven't been around recently. If there's anything making it harder to join, we'd be glad to listen.`,
    'Welcome-back message': `Hey ${firstName}, it was great having you at the club. We'd love to welcome you back whenever you're ready.`,
    'Do nothing': `No message will be sent. Flock will simply keep observing the participation pattern in this demo.`
  }
  const message = messages[type]
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={event => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close">×</button><p className="eyebrow">CONFIRM INTERVENTION</p><h2 id="modal-title">Record a thoughtful follow-up</h2><div className="modal-details"><div><span>Recommended intervention</span><strong>{type}</strong></div><div><span>Participant</span><strong>{participant.name}</strong></div><div><span>Possible reason</span><strong>{participant.likelyReason}</strong></div></div><div className="message-preview"><span>Message preview</span><p>“{message}”</p><small>Demo preview only — no message will be sent.</small></div><div className="modal-actions"><button className="outline compact" onClick={onClose}>Cancel</button><button className="primary" onClick={onConfirm}>Record demo intervention <span>→</span></button></div></section></div>
}
