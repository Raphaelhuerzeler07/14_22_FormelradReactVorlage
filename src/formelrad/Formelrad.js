import { useState } from "react";
import '../css/mvp.css';
import formelrad from "../image/formelradelektronik.gif";
import InputField from "../formular/InputField";

export default function Formelrad() {
    const [values, setValues] = useState({
        u: 10,
        i: 2,
        r: "",
        p: ""
    });

    function handleSubmit(e) {
        e.preventDefault();

        const u = parseFloat(values.u);
        const i = parseFloat(values.i);
        const r = parseFloat(values.r);
        const p = parseFloat(values.p);

        if (!isNaN(p) && !isNaN(i)) {
            setValues(values => ({ ...values, u: (p / i).toFixed(2) }));
        } else if (!isNaN(p) && !isNaN(r)) {
            setValues(values => ({
                ...values,
                u: Math.sqrt(p * r).toFixed(2),
                i: Math.sqrt(p / r).toFixed(2)
            }));
        } else if (!isNaN(i) && !isNaN(r)) {
            setValues(values => ({
                ...values,
                u: (i * r).toFixed(2),
                p: (i * i * r).toFixed(2)
            }));
        } else if (!isNaN(u) && !isNaN(r)) {
            setValues(values => ({
                ...values,
                i: (u / r).toFixed(2),
                p: ((u * u) / r).toFixed(2)
            }));
        } else if (!isNaN(u) && !isNaN(i)) {
            setValues(values => ({
                ...values,
                r: (u / i).toFixed(2),
                p: (u * i).toFixed(2)
            }));
        }
    }

    return (
        <>
            <section>
                <header>
                    <h2>Formelrad</h2>
                    <img src={formelrad} width="200" alt="Formelrad" />
                </header>
                <form onSubmit={handleSubmit}>
                    <InputField color="black" value={values.u} label="Spannung" handleChange={e => setValues(values => ({ ...values, u: e.target.value }))} />
                    <InputField color="black" value={values.i} label="Strom" handleChange={e => setValues(values => ({ ...values, i: e.target.value }))} />
                    <InputField color="black" value={values.r} label="Widerstand" handleChange={e => setValues(values => ({ ...values, r: e.target.value }))} />
                    <InputField color="black" value={values.p} label="Leistung" handleChange={e => setValues(values => ({ ...values, p: e.target.value }))} />
                    <button type="submit">Calculate</button>
                </form>
            </section>
        </>
    );
}
