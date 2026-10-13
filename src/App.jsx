import React, { useMemo, useState } from 'react';
import { Search, ShoppingBag, Menu, X, ArrowUpRight, SlidersHorizontal, Plus, Minus, Check } from 'lucide-react';

const products = [
  { id: 1, name: 'Everyday Oversized Tee', category: 'T-shirts', price: 799, tag: 'BESTSELLER', color: 'Off-white', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=90' },
  { id: 2, name: 'Essential Cotton Shirt', category: 'Shirts', price: 1499, tag: 'NEW', color: 'Sand', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=90' },
  { id: 3, name: 'Relaxed Fit Denim', category: 'Bottoms', price: 1899, tag: '', color: 'Washed blue', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=90' },
  { id: 4, name: 'Weekend Tote', category: 'Accessories', price: 699, tag: 'LOW STOCK', color: 'Khaki', image: 'https://images.unsplash.com/photo-1590875571916-9d6a6c2a5f19?auto=format&fit=crop&w=1200&q=90' },
  { id: 5, name: 'Classic Black Tee', category: 'T-shirts', price: 849, tag: '', color: 'Black', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=90' },
  { id: 6, name: 'Linen Blend Shirt', category: 'Shirts', price: 1699, tag: 'NEW', color: 'Natural', image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=90' },
  { id: 7, name: 'Daily Straight Jeans', category: 'Bottoms', price: 1999, tag: '', color: 'Indigo', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=90' },
  { id: 8, name: 'Canvas Carry-All', category: 'Accessories', price: 799, tag: '', color: 'Olive', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=90' }
];
const categories = ['All', 'T-shirts', 'Shirts', 'Bottoms', 'Accessories'];
const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

function App() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState('');

  const visibleProducts = useMemo(() => products.filter(p =>
    (category === 'All' || p.category === category) &&
    `${p.name} ${p.color} ${p.category}`.toLowerCase().includes(search.toLowerCase())
  ), [category, search]);

  const addToCart = product => {
    setCart(old => {
      const found = old.find(item => item.id === product.id);
      return found ? old.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...old, { ...product, qty: 1 }];
    });
    setNotice(`${product.name} added to bag`);
    window.setTimeout(() => setNotice(''), 2200);
  };
  const changeQty = (id, delta) => setCart(old => old.map(p => p.id === id ? { ...p, qty: p.qty + delta } : p).filter(p => p.qty > 0));
  const count = cart.reduce((n, p) => n + p.qty, 0);
  const total = cart.reduce((n, p) => n + p.price * p.qty, 0);

  return <div className="site">
    <div className="announcement">COMPLIMENTARY SHIPPING ON ORDERS OVER ₹1,499 <span>✳</span> MADE FOR EVERYDAY</div>
    <header className="header">
      <button className="icon-btn mobile-toggle" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X/> : <Menu/>}</button>
      <a className="brand" href="#top">URBAN<span>THREADS</span><small>EVERYDAY, ELEVATED.</small></a>
      <nav className={mobileMenu ? 'nav nav-open' : 'nav'}>
        <a href="#shop" onClick={() => setMobileMenu(false)}>Shop all</a>
        <a href="#shop" onClick={() => {setCategory('T-shirts'); setMobileMenu(false)}}>T-shirts</a>
        <a href="#shop" onClick={() => {setCategory('Shirts'); setMobileMenu(false)}}>Shirts</a>
        <a href="#story" onClick={() => setMobileMenu(false)}>Our story</a>
      </nav>
      <div className="header-actions">
        <label className="search-box"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pieces..." aria-label="Search products"/></label>
        <button className="icon-btn bag-btn" aria-label="Open shopping bag" onClick={() => setCartOpen(true)}><ShoppingBag size={21}/><span className="bag-count">{count}</span></button>
      </div>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="dot"></span> THE EVERYDAY COLLECTION · 2026</p>
          <h1>Less, but<br/><em>better.</em></h1>
          <p className="hero-description">Thoughtful essentials. Better fits. Pieces that feel like you — every single day.</p>
          <a className="primary-btn" href="#shop">Explore the collection <ArrowUpRight size={17}/></a>
          <div className="hero-foot"><span>01 / 04</span><span>DESIGNED TO LIVE IN</span></div>
        </div>
        <div className="hero-image-wrap">
          <img className="hero-image" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=95" alt="Fashion models wearing relaxed everyday outfits"/>
          <div className="image-note"><span>01</span><div><b>THE DAILY EDIT</b><small>Effortless by design</small></div><ArrowUpRight size={18}/></div>
          <div className="vertical-label">NEW SEASON — NEW PERSPECTIVE</div>
        </div>
        <div className="hero-stamp">GOOD<br/>THINGS<br/><i>TAKE</i><br/>TIME.</div>
      </section>

      <section className="benefits">
        <div><span>✳</span><p><b>Better materials</b><small>Comfort that lasts</small></p></div>
        <div><span>↗</span><p><b>Made to repeat</b><small>Wear it your way</small></p></div>
        <div><span>♡</span><p><b>Considered design</b><small>Nothing extra</small></p></div>
        <div><span>◎</span><p><b>Easy returns</b><small>Shop with confidence</small></p></div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-top"><div><p className="eyebrow">THE GOOD STUFF</p><h2>Find your <em>everyday.</em></h2></div><p className="section-intro">A small collection of hard-working favourites.<br/>Big on comfort, never on fuss.</p></div>
        <div className="shop-toolbar">
          <div className="filters">{categories.map(c => <button key={c} onClick={() => setCategory(c)} className={category === c ? 'filter active' : 'filter'}>{c}</button>)}</div>
          <span className="result-count"><SlidersHorizontal size={15}/> {visibleProducts.length} PIECES</span>
        </div>
        {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((p, i) => <article className="product-card" key={p.id}>
          <div className="product-image-wrap"><img src={p.image} alt={p.name} loading="lazy" onError={e => {e.currentTarget.src='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=90'}}/>
            {p.tag && <span className="product-tag">{p.tag}</span>}
            <button className="quick-add" onClick={() => addToCart(p)} aria-label={`Add ${p.name} to bag`}><Plus size={19}/><span>ADD TO BAG</span></button>
          </div>
          <div className="product-info"><div><h3>{p.name}</h3><p>{p.color} · {p.category}</p></div><b>{money(p.price)}</b></div>
        </article>)}</div> : <div className="empty-search">No pieces found. Try another search.</div>}
        <div className="view-all"><span>GOOD STYLE DOESN'T NEED TO SHOUT.</span><button onClick={() => {setCategory('All'); setSearch('')}}>VIEW ALL PIECES <ArrowUpRight size={16}/></button></div>
      </section>

      <section className="story" id="story"><div className="story-image"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=90" alt="Minimal contemporary fashion editorial" loading="lazy"/></div><div className="story-copy"><p className="eyebrow">A LITTLE ABOUT US</p><h2>Wear more.<br/><em>Waste less.</em></h2><p>We believe the best wardrobe isn't the biggest one. It's the one you reach for again and again. So we focus on versatile shapes, comfortable fabrics, and details that make the everyday feel a little more special.</p><a href="#shop">GET TO KNOW YOUR NEW FAVOURITES <ArrowUpRight size={16}/></a><span className="story-number">UT—001</span></div></section>
      <section className="newsletter"><p className="eyebrow">THE GOOD MAIL</p><h2>A little something<br/><em>worth opening.</em></h2><p>New drops, thoughtful notes, and 10% off your first order.</p><form onSubmit={e => {e.preventDefault(); setNotice('Thanks for joining the list!'); e.currentTarget.reset(); window.setTimeout(() => setNotice(''), 2500)}}><input type="email" required placeholder="Your email address" aria-label="Your email address"/><button type="submit">COUNT ME IN <ArrowUpRight size={16}/></button></form><small>By subscribing, you agree to receive occasional emails from Urban Threads.</small></section>
    </main>

    <footer><a className="brand footer-brand" href="#top">URBAN<span>THREADS</span><small>EVERYDAY, ELEVATED.</small></a><p>GOOD CLOTHES. GOOD DAYS.</p><span>© 2026 URBAN THREADS</span></footer>

    {notice && <div className="toast"><Check size={17}/>{notice}</div>}
    {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="cart-head"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({count})</span></h2></div><button className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Close bag"><X/></button></div>
      {cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={34}/><h3>Your bag is taking it easy.</h3><p>Find something you'll love wearing.</p><button className="primary-btn" onClick={() => setCartOpen(false)}>Explore the collection <ArrowUpRight size={16}/></button></div> : <><div className="cart-items">{cart.map(p => <div className="cart-item" key={p.id}><img src={p.image} alt={p.name}/><div className="cart-item-info"><h3>{p.name}</h3><p>{p.color}</p><b>{money(p.price)}</b><div className="quantity"><button onClick={() => changeQty(p.id, -1)} aria-label="Decrease quantity"><Minus size={13}/></button><span>{p.qty}</span><button onClick={() => changeQty(p.id, 1)} aria-label="Increase quantity"><Plus size={13}/></button></div></div></div>)}</div><div className="cart-bottom"><p><span>Subtotal</span><b>{money(total)}</b></p><small>Shipping and taxes calculated at checkout.</small><button className="checkout" onClick={() => setNotice('Demo project: checkout is not connected yet.')}>CONTINUE TO CHECKOUT <ArrowUpRight size={17}/></button></div></>}
    </aside></div>}
  </div>;
}

export default App;