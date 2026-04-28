"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  organisation: "",
  segment: "Campus partnership",
  flavour: "Mango Charge",
  message: ""
};

export default function LeadForm({ products }) {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState({ status: "idle", message: "" });

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setState({ status: "loading", message: "Saving enquiry..." });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Unable to save enquiry.");
      }

      setForm(initialForm);
      setState({ status: "success", message: "Enquiry saved. The admin dashboard now has the new lead." });
    } catch (error) {
      setState({ status: "error", message: error.message });
    }
  };

  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          Name
          <input name="name" value={form.name} onChange={update} placeholder="Your name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Organisation
          <input name="organisation" value={form.organisation} onChange={update} placeholder="Campus, gym or cafe" />
        </label>
        <label>
          Opportunity
          <select name="segment" value={form.segment} onChange={update}>
            <option>Campus partnership</option>
            <option>Gym partnership</option>
            <option>Cafe stockist</option>
            <option>Bulk order</option>
            <option>General enquiry</option>
          </select>
        </label>
      </div>
      <label>
        Flavour interest
        <select name="flavour" value={form.flavour} onChange={update}>
          {products.map((product) => (
            <option key={product.id}>{product.name}</option>
          ))}
          <option>Mixed range</option>
        </select>
      </label>
      <label>
        Message
        <textarea
          name="message"
          value={form.message}
          onChange={update}
          placeholder="Tell us what you want to launch, stock or pre-order."
          rows={4}
          required
        />
      </label>
      <button className="primary-button" type="submit" disabled={state.status === "loading"}>
        <Send size={17} />
        Send enquiry
      </button>
      {state.message && <p className={`form-state ${state.status}`}>{state.message}</p>}
    </form>
  );
}
