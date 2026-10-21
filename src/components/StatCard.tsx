type Props={value:string|number; label:string; note?:string}
export function StatCard({value,label,note}:Props){return <section className="stat-card"><div className="stat-value">{value}</div><div className="stat-label">{label}</div>{note&&<small>{note}</small>}</section>}
