import { useState } from "react";

export default function App() {
  // Inputs (Textboxes)
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("1");
  const [aisle, setAisle] = useState("");
  const [bay, setBay] = useState("");

  // Tabla (records)
  const [rows, setRows] = useState([]);

  function clearInputs() {
    setItem("");
    setQty("1");
    setAisle("");
    setBay("");
  }

  function addRow(e) {
    e.preventDefault(); // evita refrescar la página si viene de un <form>
    const cleanItem = item.trim();
    const cleanQty = parseInt(qty, 10); // <- nombre correcto

    if (!cleanItem) {
      alert("Item is required");
      return;
    }
    if (Number.isNaN(cleanQty) || cleanQty <= 0) {
      alert("Qty must be a positive number");
      return;
    }

    const newRow = {
      id: crypto.randomUUID(),
      item: cleanItem,
      qty: cleanQty,
      aisle: aisle.trim(),
      bay: bay.trim(),
    };

    setRows((prev) => [...prev, newRow]);
    clearInputs();
  }

  function deleteRow(id) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  // Estilos simples inline
  const wrap = { maxWidth: 900, margin: "24px auto", padding: "0 16px", fontFamily: "system-ui, sans-serif" };
  const h1 = { textAlign: "center", marginBottom: 24, fontSize: 32 };
  const row = { display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap" };
  const field = { flex: 1, minWidth: 240, display: "flex", flexDirection: "column", gap: 6 };
  const label = { fontSize: 14, fontWeight: 600 };
  const input = { padding: 8, border: "1px solid #ccc", borderRadius: 8 };
  const btnRow = { display: "flex", gap: 12, margin: "8px 0 16px" };
  const btn = { padding: "10px 14px", borderRadius: 8, border: "1px solid #ccc", background: "#f7f7f7", cursor: "pointer" };
  const btnPrimary = { ...btn, background: "#1e90ff", color: "white", border: "1px solid #1e90ff" };
  const btnDanger = { ...btn, background: "#d32f2f", color: "white", border: "1px solid #b71c1c" }; // <- añadido
  const table = { width: "100%", borderCollapse: "collapse" };
  const thtd = { borderBottom: "1px solid #e5e5e5", padding: "10px 8px", textAlign: "left" };

  return (
    <div style={wrap}>
      <h1 style={h1}>Doors and Windows</h1>

      {/* Línea 1: Item number (izq) y Qty (der) */}
      <div style={row}>
        <div style={field}>
          <label style={label}>Item number:</label>
          <input
            style={input}
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Ej. 1234567"
          />
        </div>
        <div style={field}>
          <label style={label}>Qty (Quantity):</label>
          <input
            style={input}
            type="number"
            min="1"
            step="1"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder="1"
          />
        </div>
      </div>

      {/* Línea 2: Aisle (izq) y Bay (der) */}
      <div style={row}>
        <div style={field}>
          <label style={label}>Aisle:</label>
          <input
            style={input}
            value={aisle}
            onChange={(e) => setAisle(e.target.value)}
            placeholder="Ej. 12"
          />
        </div>
        <div style={field}>
          <label style={label}>Bay:</label>
          <input
            style={input}
            value={bay}
            onChange={(e) => setBay(e.target.value)}
            placeholder="Ej. 07"
          />
        </div>
      </div>

      {/* Botones: Enter (añadir) y Clear (limpiar inputs) */}
      <div style={btnRow}>
        <button style={btnPrimary} onClick={addRow}>Enter</button>
        <button style={btnDanger} onClick={clearInputs}>Clear</button>
      </div>

      {/* Tabla */}
      <table style={table}>
        <thead>
          <tr>
            <th style={thtd}>Item number</th>
            <th style={thtd}>Qty</th>
            <th style={thtd}>Aisle</th>
            <th style={thtd}>Bay</th>
            <th style={thtd}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td style={thtd} colSpan={5}>(No records yet)</td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr key={r.id}>
                <td style={thtd}>{r.item}</td>
                <td style={thtd}>{r.qty}</td>
                <td style={thtd}>{r.aisle}</td>
                <td style={thtd}>{r.bay}</td>
                <td style={thtd}>
                  <button style={btnDanger} onClick={() => deleteRow(r.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// http://localhost:5173/