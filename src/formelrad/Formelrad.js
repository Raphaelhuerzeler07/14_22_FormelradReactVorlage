import { useState } from "react";
import formelrad from "../image/formelradelektronik.gif";
import InputField from "../formular/InputField";
import OutputField from "../formular/OutputField";

export default function Formelrad() {
    const [values, setValues] = useState({
        u: 10,
        i: 2,
        r: "",
        p: ""
    });

    // Welches Feld wurde zuletzt geändert? (damit alle anderen Felder als Output erscheinen)
    const [changedField, setChangedField] = useState("u");

    const handleSubmit = (event) => {
        event.preventDefault();

        const u = parseFloat(values.u);
        const i = parseFloat(values.i);
        const r = parseFloat(values.r);
        const p = parseFloat(values.p);

        // P und R -> u & i
        if (!isNaN(p) && !isNaN(r)) {
            setValues(values => ({
                ...values,
                u: Math.sqrt(p * r).toFixed(2),
                i: Math.sqrt(p / r).toFixed(2)
            }));
            setChangedField("p"); // z.B. nach P als Eingabe
            return;
        }
        // I und R -> u & p
        if (!isNaN(i) && !isNaN(r)) {
            setValues(values => ({
                ...values,
                u: (i * r).toFixed(2),
                p: (i * i * r).toFixed(2)
            }));
            setChangedField("i");
            return;
        }
        // U und R -> i & p
        if (!isNaN(u) && !isNaN(r)) {
            setValues(values => ({
                ...values,
                i: (u / r).toFixed(2),
                p: ((u * u) / r).toFixed(2)
            }));
            setChangedField("u");
            return;
        }
        // U und I -> r & p
        if (!isNaN(u) && !isNaN(i)) {
            setValues(values => ({
                ...values,
                r: (u / i).toFixed(2),
                p: (u * i).toFixed(2)
            }));
            setChangedField("u");
            return;
        }
        // P und I -> u & r
        if (!isNaN(p) && !isNaN(i)) {
            setValues(values => ({
                ...values,
                u: (p / i).toFixed(2),
                r: (p / (i * i)).toFixed(2)
            }));
            setChangedField("p");
            return;
        }
        // U und P -> i & r
        if (!isNaN(u) && !isNaN(p)) {
            setValues(values => ({
                ...values,
                i: (p / u).toFixed(2),
                r: ((u * u) / p).toFixed(2)
            }));
            setChangedField("u");
            return;
        }
    };

    // Hilfsfunktion, um das richtige Feld als Input anzuzeigen
    function getField(field, label) {
        if (field === changedField) {
            return (
                <InputField
                    color="black"
                    value={values[field]}
                    label={label}
                    handleChange={e => {
                        setValues(values => ({ ...values, [field]: e.target.value }));
                        setChangedField(field);
                    }}
                />
            );
        } else {
            return (
                <OutputField
                    value={values[field]}
                    label={label}
                />
            );
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
                    {getField("u", "Spannung")}
                    {getField("i", "Stromstärke")}
                    {getField("r", "Widerstand")}
                    {getField("p", "Leistung")}
                    <button type="submit">Calculate</button>
                </form>
            </section>
        </>
    );
}
