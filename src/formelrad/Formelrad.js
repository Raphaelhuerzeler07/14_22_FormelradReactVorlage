import { useState } from "react";
import formelrad from "../image/formelradelektronik.gif";
import InputField from "../formular/InputField";

export default function Formelrad() {
    const [values, setValues] = useState({
        u: 10,
        i: 2,
        r: "",
        p: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const u = parseFloat(values.u);
        const i = parseFloat(values.i);
        const r = parseFloat(values.r);
        const p = parseFloat(values.p);

        // P und R -> u & i
        if (!isNaN(r) && !isNaN(p)) {
            const newU = Math.sqrt(p * r);
            const newI = Math.sqrt(p / r);
            setValues(values => ({
                ...values,
                u: newU.toFixed(2),
                i: newI.toFixed(2)
            }));
            return;
        }
        // I und R -> u & p
        if (!isNaN(i) && !isNaN(r)) {
            setValues(values => ({
                ...values,
                u: (i * r).toFixed(2),
                p: (i * i * r).toFixed(2)
            }));
            return;
        }
        // U und R -> i & p
        if (!isNaN(u) && !isNaN(r)) {
            setValues(values => ({
                ...values,
                i: (u / r).toFixed(2),
                p: ((u * u) / r).toFixed(2)
            }));
            return;
        }
        // U und I -> r & p
        if (!isNaN(u) && !isNaN(i)) {
            setValues(values => ({
                ...values,
                r: (u / i).toFixed(2),
                p: (u * i).toFixed(2)
            }));
            return;
        }
        // P und I -> u
        if (!isNaN(p) && !isNaN(i)) {
            setValues(values => ({
                ...values,
                u: (p / i).toFixed(2)
            }));
            return;
        }
        // NEU: I & P -> r (ergänzt mit Patch 15, falls du das brauchst)
        if (!isNaN(i) && !isNaN(p)) {
            setValues(values => ({
                ...values,
                r: (p / (i * i)).toFixed(2)
            }));
            return;
        }
    };

    return (
        <>
            <section>
                <header>
                    <h2>Formelrad</h2>
                    <img src={formelrad} width="200" alt="Formelrad" />
                </header>
                <form onSubmit={handleSubmit}>
                    <InputField color={"black"} value={values.u} label="Spannung" handleChange={e => setValues(values => ({ ...values, u: e.target.value }))} />
                    <InputField color={"black"} value={values.i} label="Stromstärke" handleChange={e => setValues(values => ({ ...values, i: e.target.value }))} />
                    <InputField color={"black"} value={values.r} label="Widerstand" handleChange={e => setValues(values => ({ ...values, r: e.target.value }))} />
                    <InputField color={"black"} value={values.p} label="Leistung" handleChange={e => setValues(values => ({ ...values, p: e.target.value }))} />
                    <button type="submit">Calculate</button>
                </form>
            </section>
        </>
    );
}
