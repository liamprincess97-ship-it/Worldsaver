import { useState } from 'react'

const transactions = [
  { person: 'Henry Hawkins', initials: 'HH', time: '12:28 PM', amount: '+$980', kind: 'Transfer', color: 'lime', avatar: 'portrait peach' },
  { person: 'Lara Collins', initials: 'LC', time: '11:21 AM', amount: '+$400', kind: 'Transfer', color: 'lime', avatar: 'portrait blue' },
  { person: 'Airbnb', initials: 'A', time: '09:18 AM', amount: '-$99.99', kind: 'Payment', color: '', avatar: 'brand airbnb' },
  { person: 'Uber Eats', initials: 'U', time: '05:35 PM', amount: '-$20.44', kind: 'Payment', color: '', avatar: 'brand uber' },
  { person: 'Pegasus Airlines', initials: 'P', time: '04:41 PM', amount: '-$420', kind: 'Purchase', color: '', avatar: 'brand pegasus' },
  { person: 'Meg Hawkins', initials: 'MH', time: '02:18 PM', amount: '+$330', kind: 'Transfer', color: 'lime', avatar: 'portrait rose' },
  { person: 'John Levi', initials: 'JL', time: '11:43 AM', amount: '+$300', kind: 'Transfer', color: 'lime', avatar: 'portrait teal' },
  { person: 'Apple Store', initials: 'A', time: '10:43 AM', amount: '-$399.99', kind: 'Purchase', color: '', avatar: 'brand apple' },
]
const people = [
  { name: 'Henry', initials: 'H', tone: 'peach' }, { name: 'Lara', initials: 'L', tone: 'blue' },
  { name: 'John', initials: 'J', tone: 'teal' }, { name: 'Meg', initials: 'M', tone: 'rose' },
  { name: 'Lee', initials: 'L', tone: 'gold' },
]
const favorites = [['＋', 'Add'], ['♟', 'Games'], ['▣', 'Bills'], ['▯', 'Phone'], ['♡', 'Charity']]
const paymentTypes = [['▰', 'Transport'], ['▣', 'Internet & TV'], ['▯', 'Phone'], ['◉', 'Games']]

function Avatar({ initials, tone = 'peach', size = '' }) {
  return <div className={`avatar ${size} ${tone}`}>{initials}</div>
}
function Status() { return <div className="status"><span>9:41</span><span className="status-right"><i className="cell-bars">▂▄▆</i><i className="wifi">◔</i><i className="battery" /></span></div> }
function Search() { return <div className="search"><span>⌕</span>Search ATMs, Payments, Fines</div> }
function Nav({ active = 0 }) {
  return <nav className="bottom-nav">{['⌂', '▤', '▣', '⚙'].map((icon, i) => <span className={i === active ? 'selected' : ''} key={icon}>{icon}</span>)}</nav>
}
function Phone({ children, className = '' }) {
  return <section className={`phone ${className}`}><div className="speaker"/><Status/><div className="phone-content">{children}</div><div className="home-indicator"/></section>
}
function HomePhone() {
  return <Phone className="home-phone">
    <header className="topbar"><Avatar initials="L" size="small" tone="rose"/><strong>Home</strong><span className="top-actions">◉　♟</span></header>
    <Search/>
    <div className="section-heading">Accounts</div>
    <div className="account-card"><div className="balance-line"><span className="coin">＄</span><div><b>24,129.50</b><small>Dollar balance</small></div></div><div className="bank-cards"><div className="bank-card purple"><small>VISA　•• 1892</small><b>✦</b></div><div className="bank-card navy"><small>VISA　•• 8141</small><b>◉</b></div></div></div>
    <div className="button-row"><button className="add-button">⊕　Add money</button><button className="transfer-button">⊕　Transfer</button></div>
    <div className="pager"><b/> <i/> <i/></div>
    <div className="new-product">⊕　Open a new account or product</div>
    <div className="overview card-surface"><div className="section-heading">Overview</div><div className="overview-grid"><div className="overview-tile"><small>Spendings</small><b>$4,282.75 spent</b><span>this month</span><div className="progress"><i/></div></div><div className="overview-tile cashback"><small>Cashback</small><div className="brand-row"><b>Uber</b><b></b><b>N</b><b>◉</b></div><span>earned this month</span></div></div></div>
    <div className="quick-transfer card-surface"><div className="section-heading">Quick transfer</div><div className="quick-people">{people.slice(0, 4).map(p => <Avatar key={p.name} initials={p.initials} tone={p.tone} size="small"/>)}</div></div>
    <Nav active={0}/>
  </Phone>
}
function TransactionRow({ item }) {
  return <div className="transaction"><div className={`transaction-avatar ${item.avatar}`}>{item.initials}</div><div className="transaction-info"><b>{item.person}</b><small>{item.time}</small></div><div className="amount"><b className={item.color}>{item.amount}</b><small>{item.kind}</small></div></div>
}
function TransfersPhone() {
  return <Phone className="transfers-phone"><header className="transfer-header"><span>×</span><b>Transfers</b><span/></header><Search/>
    <div className="spending-title">Spendings in December <span>⌄</span></div><div className="spending-bar"><i/><i/><i/><i/></div>
    <div className="transaction-list"><h3>Today</h3>{transactions.slice(0, 3).map((t, i) => <TransactionRow key={i} item={t}/>)}<h3>Yesterday</h3>{transactions.slice(3, 6).map((t, i) => <TransactionRow key={i} item={t}/>)}<h3>11 December</h3>{transactions.slice(6).map((t, i) => <TransactionRow key={i} item={t}/>)}</div>
  </Phone>
}
function PaymentsPhone() {
  const [active, setActive] = useState('Payments')
  return <Phone className="payments-phone"><header className="topbar"><Avatar initials="L" size="small" tone="rose"/><strong>Payments</strong><span className="top-actions">◎</span></header><Search/>
    <div className="favorites card-surface"><div className="section-heading">Favorites</div><div className="favorite-grid">{favorites.map(([icon, label]) => <button key={label} className="favorite" onClick={() => setActive(label)}><span className={label === 'Add' ? 'favorite-icon add-icon' : 'favorite-icon'}>{icon}</span><small>{label}</small></button>)}</div></div>
    <div className="section-heading options-title">Transfer options</div><div className="transfer-options"><button><span>▣</span>Card to card</button><button><span>◉</span>To account</button><button><span>♜</span>Bank transfer</button></div>
    <div className="recent card-surface"><div className="section-heading">Recent transfers</div><div className="recent-grid">{people.map(p => <button key={p.name} onClick={() => setActive(p.name)}><Avatar initials={p.initials} tone={p.tone}/><small>{p.name}</small></button>)}</div></div>
    <div className="section-heading options-title">Payment options</div><div className="payment-grid">{paymentTypes.map(([icon, label]) => <button key={label} onClick={() => setActive(label)}><span>{icon}</span><small>{label}</small></button>)}</div>
    <div className="payment-feedback" aria-live="polite">{active !== 'Payments' ? `${active} selected` : ''}</div><Nav active={1}/>
  </Phone>
}
export default function App() {
  return <main className="showcase"><div className="device-row"><HomePhone/><TransfersPhone/><PaymentsPhone/></div></main>
}
