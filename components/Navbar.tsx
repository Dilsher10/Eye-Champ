"use client";
import { Heart, HelpCircle, Search, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import MegaMenuSlider from "./MegaMenuSlider";

export default function Navbar() {
    const [menu, setMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [cartCount, setCartCount] = useState(0);
    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem("eye-champ-cart") ?? "[]") as Array<{ quantity?: number }>;
            setCartCount(cart.reduce((total, item) => total + (item.quantity ?? 1), 0));
        };
        updateCartCount();
        window.addEventListener("storage", updateCartCount);
        window.addEventListener("eye-champ-cart-updated", updateCartCount);
        return () => { window.removeEventListener("storage", updateCartCount); window.removeEventListener("eye-champ-cart-updated", updateCartCount); };
    }, []);
    return (
        <>
            <header className="site-header shell">
                <Link className="logo" href="/" aria-label="Eye Champ home">
                    <img src="/images/logo.png" alt="" />
                </Link>
                <label className="search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search our AI recommended frames" /></label>
                <nav className={`utility ${menu ? "open" : ""}`} aria-label="Account links">
                    <Link href="/admin" aria-label="Login"><UserRound size={18} /><small>Login</small></Link>
                    <a href="#favorites" aria-label="Favorites"><Heart size={18} /><small>Favorites</small></a>
                    <a href="#help" aria-label="Help"><HelpCircle size={18} /><small>Help</small></a>
                    <Link href="/cart" aria-label={`Cart with ${cartCount} items`}><ShoppingCart size={18} />{cartCount > 0 && <b className="cart-count">{cartCount}</b>}<small>Cart</small></Link>
                </nav>
                <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu">☰</button>
            </header>

            <nav className="main-nav" aria-label="Shop categories">
                <div className="mega-trigger">
                    <a className="mega-link" href="/shop-all">Eyeglasses</a>
                    <section className="mega-menu" aria-label="Eyeglasses menu">
                        <div className="mega-inner">
                            <div className="mega-column"><b>Eyeglasses</b>{["All eyeglasses", "Men eyeglasses", "Women eyeglasses", "Kids eyeglasses", "New arrivals", "Under 5000", "Premium eyeglasses", "Transition eyeglasses"].map(x => <Link href="/shop-all" key={x}>{x}</Link>)}</div>
                            <MegaMenuSlider />
                        </div>
                    </section>
                </div>
                <div className="mega-trigger">
                    <a className="mega-link" href="/shop-all">Sunglasses</a>
                    <section className="mega-menu" aria-label="Sunglasses menu">
                        <div className="mega-inner">
                            <div className="mega-column"><b>Sunglasses</b>{["All sunglasses", "Men sunglasses", "Women sunglasses", "Kids sunglasses", "New arrivals", "Under 5000", "Premium sunglasses", "Polarized sunglasses", "Powered sunglasses"].map(x => <Link href="/shop-all" key={x}>{x}</Link>)}</div>
                            <MegaMenuSlider />
                        </div>
                    </section>
                </div>
                <div className="mega-trigger">
                    <a className="mega-link" href="#lenses">Lenses</a>
                    <section className="mega-menu" aria-label="Lenses menu">
                        <div className="mega-inner">
                            <div className="mega-column">
                                <b>Transparent lenses</b>{["Brand", "Brand"].map(x => <Link href="/shop-all" key={x}>{x}</Link>)}
                                <b>Coloured lenses</b>{["Brand", "Brand"].map(x => <Link href="/shop-all" key={x}>{x}</Link>)}
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
                <Link className="sale-link" href="#sale">🛍 Sale</Link>
            </nav>
        </>
    );
}
