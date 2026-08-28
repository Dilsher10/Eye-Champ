"use client";

import { Check, ChevronLeft, ChevronRight, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Choice = { id: string; title: string; description: string; price: number };

const visionChoices: Choice[] = [
  { id: "distance", title: "Single vision — distance", description: "For everyday distance vision", price: 0 },
  { id: "reading", title: "Single vision — reading", description: "For reading and close-up work", price: 9.95 },
  { id: "progressive", title: "Progressive", description: "Distance, intermediate and near vision", price: 39.95 },
  { id: "non-prescription", title: "Non-prescription", description: "Fashion lenses without vision correction", price: 0 },
];

const lensChoices: Choice[] = [
  { id: "standard", title: "Standard clear", description: "Anti-scratch coating and UV protection", price: 0 },
  { id: "blue-light", title: "Blue-light blocking", description: "Helps reduce exposure from digital screens", price: 19.95 },
  { id: "photochromic", title: "Photochromic", description: "Darkens automatically in sunlight", price: 39.95 },
  { id: "sunglass", title: "Polarized sunglass", description: "UV400 protection with reduced glare", price: 49.95 },
];

const powers = Array.from({ length: 33 }, (_, index) => ((index - 16) * .25).toFixed(2));
const cylinders = Array.from({ length: 13 }, (_, index) => (index * -.25).toFixed(2));

function ChoiceCard({ choice, selected, onSelect }: { choice: Choice; selected: boolean; onSelect: () => void }) {
  return <button type="button" className={`lens-choice ${selected ? "selected" : ""}`} onClick={onSelect}>
    <span className="lens-choice-check">{selected && <Check />}</span>
    <span><b>{choice.title}</b><small>{choice.description}</small></span>
    <strong>{choice.price ? `+$${choice.price.toFixed(2)}` : "Included"}</strong>
  </button>;
}

export default function LensSelector({ framePrice = 31.95, standalone = false }: { framePrice?: number; standalone?: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(standalone);
  const [step, setStep] = useState(1);
  const [vision, setVision] = useState("");
  const [prescriptionMethod, setPrescriptionMethod] = useState("");
  const [lens, setLens] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (standalone) router.push("/product");
      else setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = previousOverflow; };
  }, [open, router, standalone]);

  const selectedVision = visionChoices.find(item => item.id === vision);
  const selectedLens = lensChoices.find(item => item.id === lens);
  const total = framePrice + (selectedVision?.price ?? 0) + (selectedLens?.price ?? 0);
  const canContinue = step === 1 ? Boolean(vision) : step === 2 ? vision === "non-prescription" || Boolean(prescriptionMethod) : Boolean(lens);

  const resetAndOpen = () => { setStep(1); setVision(""); setPrescriptionMethod(""); setLens(""); setAdded(false); setOpen(true); };
  const closeSelector = () => standalone ? router.push("/product") : setOpen(false);

  return <>
    {!standalone && <button className="select-lenses" type="button" onClick={resetAndOpen}>Select Lenses</button>}
    {open && <div className={`lens-modal-backdrop${standalone ? " lens-page-backdrop" : ""}`} role="presentation" onMouseDown={event => !standalone && event.target === event.currentTarget && setOpen(false)}>
      <section className="lens-modal" role="dialog" aria-modal="true" aria-labelledby="lens-modal-title">
        <header className="lens-modal-header">
          <div><small>Customize your glasses</small><h2 id="lens-modal-title">Select your lenses</h2></div>
          <button type="button" aria-label="Close lens selector" onClick={closeSelector}><X /></button>
        </header>

        <div className="lens-progress" aria-label={`Step ${step} of 3`}>
          {[1, 2, 3].map(number => <span key={number} className={number <= step ? "active" : ""}><i>{number < step ? <Check /> : number}</i><b>{["Vision", "Prescription", "Lens package"][number - 1]}</b></span>)}
        </div>

        <div className="lens-modal-body">
          {step === 1 && <><h3>What do you use your glasses for?</h3><p>Choose the option that matches your prescription.</p><div className="lens-choice-list">{visionChoices.map(choice => <ChoiceCard key={choice.id} choice={choice} selected={vision === choice.id} onSelect={() => setVision(choice.id)} />)}</div></>}

          {step === 2 && vision === "non-prescription" && <div className="lens-empty-step"><Check /><h3>No prescription needed</h3><p>You selected non-prescription lenses. Continue to choose your lens package.</p></div>}

          {step === 2 && vision !== "non-prescription" && <><h3>How would you like to provide your prescription?</h3><p>You can enter it now or send it after checkout.</p><div className="prescription-methods">
            <button type="button" className={prescriptionMethod === "manual" ? "selected" : ""} onClick={() => setPrescriptionMethod("manual")}><b>Enter it manually</b><small>Use the values from your prescription</small></button>
            <label className={prescriptionMethod === "upload" ? "selected" : ""} onClick={() => setPrescriptionMethod("upload")}><Upload /><b>Upload prescription</b><small>JPG, PNG or PDF</small><input type="file" accept=".jpg,.jpeg,.png,.pdf" /></label>
            <button type="button" className={prescriptionMethod === "later" ? "selected" : ""} onClick={() => setPrescriptionMethod("later")}><b>Send it later</b><small>We’ll contact you after checkout</small></button>
          </div>
          {prescriptionMethod === "manual" && <div className="rx-table"><div className="rx-head"><span>Eye</span><span>SPH</span><span>CYL</span><span>AXIS</span></div>{["Right (OD)", "Left (OS)"].map(eye => <div className="rx-row" key={eye}><b>{eye}</b><select aria-label={`${eye} sphere`}>{powers.map(value => <option key={value}>{value}</option>)}</select><select aria-label={`${eye} cylinder`}>{cylinders.map(value => <option key={value}>{value}</option>)}</select><input aria-label={`${eye} axis`} type="number" min="0" max="180" placeholder="0" /></div>)}<label className="pd-field">PD (Pupillary distance)<input type="number" min="40" max="80" placeholder="e.g. 62" /></label></div>}
          </>}

          {step === 3 && <><h3>Choose your lens package</h3><p>All lenses are made to your selected prescription.</p><div className="lens-choice-list">{lensChoices.map(choice => <ChoiceCard key={choice.id} choice={choice} selected={lens === choice.id} onSelect={() => setLens(choice.id)} />)}</div></>}
        </div>

        <footer className="lens-modal-footer">
          <div className="lens-total"><span>Total</span><strong>${total.toFixed(2)}</strong><small>Frame + selected lenses</small></div>
          <div className="lens-footer-actions">{step > 1 && <button type="button" className="lens-back" onClick={() => setStep(step - 1)}><ChevronLeft /> Back</button>}{step < 3 ? <button type="button" className="lens-next" disabled={!canContinue} onClick={() => setStep(step + 1)}>Continue <ChevronRight /></button> : <button type="button" className="lens-next" disabled={!lens} onClick={() => { setAdded(true); setTimeout(closeSelector, 1200); }}><Check /> Add to cart</button>}</div>
        </footer>
        {added && <div className="lens-added" role="status"><Check /><b>Added to your cart</b></div>}
      </section>
    </div>}
  </>;
}
