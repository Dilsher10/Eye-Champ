"use client";
import { Heart, HelpCircle, Search, ShoppingCart, UserRound } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [menu, setMenu] = useState(false);
    const [query, setQuery] = useState("");
    return (
        <>
            <header className="site-header shell">
                <a className="logo" href="#top" aria-label="Eye Champ home">
                    <img src="/images/logo.png" alt="" />
                </a>
                <label className="search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search our AI recommended frames" /></label>
                <nav className={`utility ${menu ? "open" : ""}`} aria-label="Account links">
                    <a href="#login" aria-label="Login"><UserRound size={18} /><small>Login</small></a>
                    <a href="#favorites" aria-label="Favorites"><Heart size={18} /><small>Favorites</small></a>
                    <a href="#help" aria-label="Help"><HelpCircle size={18} /><small>Help</small></a>
                    <a href="#cart" aria-label="Cart"><ShoppingCart size={18} /><small>Cart</small></a>
                </nav>
                <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu">☰</button>
            </header>

            <nav className="main-nav" aria-label="Shop categories">
                <a href="/shop-all">Shop all</a>
                {['Eyeglasses', 'Sunglasses', 'Lenses', 'Sports', 'Trending Now', 'Sale'].map(x => <a key={x} href={`#${x.toLowerCase().replaceAll(' ', '-')}`}>{x}</a>)}
            </nav>
        </>
    );
}
