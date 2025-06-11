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

        // NEU: Falls r und p gegeben, berechne u und i
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
        // Falls p und i gegeben, berechne u
        if (!isNaN(p) && !isNaN(i)) {
            setValues(values => ({
                ...values,
                u: (p / i).toFixed(2)
            }));
            return;
        }
        // Falls i und r gegeben, berechne u und p
        if (!isNaN(i) && !isNaN(r)) {
            setValues(values => ({
                ...values,
                u: (i * r).toFixed(2),
                p: (i * i * r).toFixed(2)
            }));
            return;
        }
        // Falls u und r gegeben, berechne i und p
        if (!isNaN(u) && !isNaN(r)) {
            setValues(values => ({
                ...values,
                i: (u / r).toFixed(2),
                p: ((u * u) / r).toFixed(2)
            }));
            return;
        }
        // Falls u und i gegeben, berechne r und p
        if (!isNaN(u) && !isNaN(i)) {
            setValues(values => ({
                ...values,
                r: (u / i).toFixed(2),
                p: (u * i).toFixed(2)
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
