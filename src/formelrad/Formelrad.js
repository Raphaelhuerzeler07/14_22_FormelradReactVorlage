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

    const [message, setMessage] = useState(""); // Message-Feld

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage("");

        // Zähle wie viele Felder leer sind
        const filledFields = Object.values(values).filter(v => v !== "" && !isNaN(Number(v)));
        if (filledFields.length < 2) {
            setMessage("Bitte mindestens zwei Werte eingeben!");
            return;
        }

        // Umwandlung in Zahlen
        const u = parseFloat(values.u);
        const i = parseFloat(values.i);
        const r = parseFloat(values.r);
        const p = parseFloat(values.p);

        // Die Berechnungslogik (vereinfacht, du kannst sie wie bisher verwenden!)
        if (values.u === "" && values.i === "") {
            setValues(values => ({
                ...values,
                u: Math.sqrt(values.p * values.r),
                i: Math.sqrt(values.p / values.r)
            }));
        } else if (values.u === "" && values.r === "") {
            setValues(values => ({
                ...values,
                u: values.p / values.i,
                r: values.p / values.i / values.i
            }));
        } else if (values.u === "" && values.p === "") {
            setValues(values => ({
                ...values,
                u: values.i * values.r,
                p: values.i * values.i * values.r
            }));
        } else if (values.i === "" && values.r === "") {
            setValues(values => ({
                ...values,
                i: values.p / values.u,
                r: values.u * values.u / values.p
            }));
        } else if (values.i === "" && values.p === "") {
            setValues(values => ({
                ...values,
                i: values.u / values.r,
                p: values.u * values.u / values.r
            }));
        } else {
            setValues(values => ({
                ...values,
                r: values.u / values.i,
                p: values.u * values.i
            }));
        }
    };

    return (
        <>
            <section>
                <header>
                    <h2>Formelrad</h2>
                    <img src={formelrad} width="200" alt="Formelrad" />
                </header>
                {/* Das Message-Feld */}
                {message && (
                    <div style={{ color: "red", marginBottom: "1em" }}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <InputField color={"black"} value={values.u} label="Spannung" handleChange={e => { setValues(values => ({ ...values, u: e.target.value })) }} />
                    <InputField color={"black"} value={values.i} label="Stromstärke" handleChange={e => { setValues(values => ({ ...values, i: e.target.value })) }} />
                    <InputField color={"black"} value={values.r} label="Widerstand" handleChange={e => { setValues(values => ({ ...values, r: e.target.value })) }} />
                    <InputField color={"black"} value={values.p} label="Leistung" handleChange={e => { setValues(values => ({ ...values, p: e.target.value })) }} />
                    <button type="submit">Calculate</button>
                </form>
            </section>
        </>
    );
}
