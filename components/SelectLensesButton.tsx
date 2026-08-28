"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SelectLensesButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const openLensSelection = () => {
    if (loading) return;
    setLoading(true);
    window.setTimeout(() => router.push("/product/select-lenses"), 850);
  };

  return <>
    <button className="select-lenses" type="button" disabled={loading} onClick={openLensSelection}>Select Lenses</button>
    {loading && <div className="lens-loading-overlay" role="status" aria-live="polite" aria-label="Loading lens selection">
      <div className="lens-loading-card">
        <span className="lens-loading-spinner" aria-hidden="true" />
        <b>Loading...</b>
        <small>Please wait</small>
      </div>
    </div>}
  </>;
}
