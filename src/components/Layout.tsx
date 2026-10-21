import type { ReactNode } from 'react'
type Props = { page:string; navigate:(to:string)=>void; resetDemo:()=>void; children:ReactNode }
export function Layout({ page, navigate, resetDemo, children }: Props) {
  const navigation = [['/dashboard','Overview','⌂'],['/people','People','◎'],['/interventions','Interventions','↗']]
  return <div className="app-shell"><aside className="sidebar"><button className="brand" onClick={() => navigate('/dashboard')}>flock<span>.</span></button><p className="brand-sub">Retention intelligence<br />for real life</p><nav>{navigation.map(([path, label, icon]) => <button key={path} className={page === path ? 'nav active' : 'nav'} onClick={() => navigate(path)}><i>{icon}</i>{label}</button>)}</nav><div className="workspace"><span className="pulse"/><div><b>Demo Workspace</b><small>Ludhiana Running Club</small></div><button onClick={resetDemo}>Reset demo</button></div></aside><main><header className="mobile-header"><button className="brand" onClick={() => navigate('/dashboard')}>flock<span>.</span></button><span>Demo Workspace</span><button className="mobile-reset" onClick={resetDemo}>Reset</button></header>{children}</main></div>
}
