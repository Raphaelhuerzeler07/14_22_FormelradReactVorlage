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
    const [message, setMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage("");
        setSuccessMessage("");

        const u = parseFloat(values.u);
        const i = parseFloat(values.i);
        const r = parseFloat(values.r);
        const p = parseFloat(values.p);

        // Mindestens zwei Felder müssen gesetzt sein!
        const filled = [!isNaN(u), !isNaN(i), !isNaN(r), !isNaN(p)].filter(Boolean).length;
        if (filled < 2) {
            setMessage("Bitte mindestens zwei Werte eingeben!");
            return;
        }

        // U und I leer → rechne U und I
        if (values.u === "" && values.i === "" && !isNaN(p) && !isNaN(r)) {
            setValues(values => ({
                ...values,
                u: Math.sqrt(p * r).toFixed(2),
                i: Math.sqrt(p / r).toFixed(2)
            }));
            setSuccessMessage("Spannung (U) und Stromstärke (I) wurden berechnet!");
        }
        // U und R leer → rechne U und R
        else if (values.u === "" && values.r === "" && !isNaN(p) && !isNaN(i)) {
            setValues(values => ({
                ...values,
                u: (p / i).toFixed(2),
                r: (p / (i * i)).toFixed(2)
            }));
            setSuccessMessage("Spannung (U) und Widerstand (R) wurden berechnet!");
        }
        // U und P leer → rechne U und P
        else if (values.u === "" && values.p === "" && !isNaN(i) && !isNaN(r)) {
            setValues(values => ({
                ...values,
                u: (i * r).toFixed(2),
                p: (i * i * r).toFixed(2)
            }));
            setSuccessMessage("Spannung (U) und Leistung (P) wurden berechnet!");
        }
        // I und R leer → rechne I und R
        else if (values.i === "" && values.r === "" && !isNaN(p) && !isNaN(u)) {
            setValues(values => ({
                ...values,
                i: (p / u).toFixed(2),
                r: ((u * u) / p).toFixed(2)
            }));
            setSuccessMessage("Stromstärke (I) und Widerstand (R) wurden berechnet!");
        }
        // I und P leer → rechne I und P
        else if (values.i === "" && values.p === "" && !isNaN(u) && !isNaN(r)) {
            setValues(values => ({
                ...values,
                i: (u / r).toFixed(2),
                p: ((u * u) / r).toFixed(2)
            }));
            setSuccessMessage("Stromstärke (I) und Leistung (P) wurden berechnet!");
        }
        // R und P leer → rechne R und P
        else if (values.r === "" && values.p === "" && !isNaN(u) && !isNaN(i)) {
            setValues(values => ({
                ...values,
                r: (u / i).toFixed(2),
                p: (u * i).toFixed(2)
            }));
            setSuccessMessage("Widerstand (R) und Leistung (P) wurden berechnet!");
        }
        else {
            setMessage("Bitte zwei Werte leer lassen und die anderen ausfüllen.");
        }
    };

    return (
        <>
            <section>
                <header>
                    <h2>Formelrad</h2>
                    <img src={formelrad} width="200" alt="Formelrad" />
                </header>
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
                    {successMessage && (
                        <div style={{ color: "green", marginTop: "1em" }}>
                            {successMessage}
                        </div>
                    )}
                </form>
            </section>
        </>
    );
}
