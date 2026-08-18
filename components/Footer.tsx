"use client";

export default function Footer() {
    return (
        <footer id="help"><div className="shell footer-grid">{[["SHOP BY", "ALL SUNGLASSES", "ALL EYEGLASSES", "POLARIZED", "NEW ICONS", "SPECIAL OFFERS"], ["SHOPPING ONLINE", "SIZE GUIDE", "ACCEPTED PAYMENT METHODS", "PARTS & SERVICE", "SHIPPING INFORMATION", "CANCEL OR RETURN AN ORDER"], ["ABOUT US", "OUR ICONS HISTORY", "RAY-BAN RED", "THE ONES", "ONESIGHT"], ["DO IT IN PERSON", "STORE LOCATOR"], ["HOW CAN WE HELP?", "GET SUPPORT", "TRACK ORDERS", "TRACK RETURNS", "FAQ", "REPORT A FAKE"], ["CONTACT US", "+92 333 8888888", "002 888888", "FOLLOW US", "◉ ◎ ◉ ◉ ✕"]].map(group => <div key={group[0]}><h3>{group[0]}</h3>{group.slice(1).map(x => <a href="#top" key={x}>{x}</a>)}</div>)}</div><div className="copyright">© COPYRIGHT 2026 ZENNI OPTICAL, INC. ALL RIGHTS RESERVED.</div></footer>
    );
}