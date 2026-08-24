"use client";

import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import "./AdminTopbar.css";

export default function AdminTopbar({ onMenuOpen }: { onMenuOpen: () => void }) {
  return <header className="admin-topbar">
    <button className="admin-topbar-menu" onClick={onMenuOpen} aria-label="Open navigation"><Menu size={22}/></button>
    <label className="admin-topbar-search"><Search size={18}/><input aria-label="Search admin" placeholder="Search orders, products, customers..."/><kbd>⌘ K</kbd></label>
    <div className="admin-topbar-actions">
      <button className="admin-topbar-notifications" aria-label="Notifications"><Bell size={20}/><i/></button>
      <span className="admin-topbar-divider"/>
      <button className="admin-topbar-profile"><span>A</span><div><strong>Admin</strong><small>Administrator</small></div><ChevronDown size={15}/></button>
    </div>
  </header>;
}
