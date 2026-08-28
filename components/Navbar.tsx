"use client";
import { Heart, HelpCircle, Search, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import MegaMenuSlider from "./MegaMenuSlider";

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
                    <Link href="/admin" aria-label="Login"><UserRound size={18} /><small>Login</small></Link>
                    <a href="#favorites" aria-label="Favorites"><Heart size={18} /><small>Favorites</small></a>
                    <a href="#help" aria-label="Help"><HelpCircle size={18} /><small>Help</small></a>
                    <a href="#cart" aria-label="Cart"><ShoppingCart size={18} /><small>Cart</small></a>
                </nav>
                <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu">☰</button>
            </header>

            <nav className="main-nav" aria-label="Shop categories">
                <div className="mega-trigger">
                    <a className="mega-link" href="/shop-all">Eyeglasses</a>
                    <section className="mega-menu" aria-label="Eyeglasses menu">
                        <div className="mega-inner">
                            <div className="mega-column"><b>Eyeglasses</b>{["All eyeglasses", "Men eyeglasses", "Women eyeglasses", "Kids eyeglasses", "New arrivals", "Under 5000", "Premium eyeglasses", "Transition eyeglasses"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <MegaMenuSlider />
                        </div>
                    </section>
                </div>
                <div className="mega-trigger">
                    <a className="mega-link" href="/shop-all">Sunglasses</a>
                    <section className="mega-menu" aria-label="Sunglasses menu">
                        <div className="mega-inner">
                            <div className="mega-column"><b>Sunglasses</b>{["All sunglasses", "Men sunglasses", "Women sunglasses", "Kids sunglasses", "New arrivals", "Under 5000", "Premium sunglasses", "Polarized sunglasses", "Powered sunglasses"].map(x => <a href="/shop-all" key={x}>{x}</a>)}</div>
                            <MegaMenuSlider />
                        </div>
                    </section>
                </div>
                <div className="mega-trigger">
                    <a className="mega-link" href="#lenses">Lenses</a>
                    <section className="mega-menu" aria-label="Lenses menu">
                        <div className="mega-inner">
                            <div className="mega-column">
                                <b>Transparent lenses</b>{["Brand", "Brand"].map(x => <a href="/shop-all" key={x}>{x}</a>)}
                                <b>Coloured lenses</b>{["Brand", "Brand"].map(x => <a href="/shop-all" key={x}>{x}</a>)}
                                <b>Daily disposable lenses</b>
                            </div>
                            <MegaMenuSlider />
                        </div>
                    </section>
                </div>
                <div className="mega-trigger">
                    <a className="mega-link" href="#sports">Sports</a>
                    <section className="mega-menu" aria-label="Sports menu">
                        <div className="mega-inner">
                            <MegaMenuSlider fullWidth />
                        </div>
                    </section>
                </div>
                <div className="mega-trigger">
                    <a className="mega-link mega-trending" href="#trending-now">✨ Trending Now</a>
                    <section className="mega-menu" aria-label="Trending Now menu">
                        <div className="mega-inner">
                            <MegaMenuSlider fullWidth />
                        </div>
                    </section>
                </div>
                <a className="sale-link" href="#sale">🛍 Sale</a>
            </nav>
        </>
    );
}
