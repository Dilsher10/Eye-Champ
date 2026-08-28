import "../../product.css";

export default function Loading() {
  return <div className="lens-loading-overlay" role="status" aria-live="polite" aria-label="Loading lens selection">
    <div className="lens-loading-card">
      <span className="lens-loading-spinner" aria-hidden="true" />
      <b>Loading...</b>
      <small>Please wait</small>
    </div>
  </div>;
}
