import { useState } from "react";
import formelrad from "../image/formelradelektronik.gif";

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
            const u = p / i;
            setValues(values => ({ ...values, u: u.toFixed(2) }));
        } else if (!isNaN(p) && !isNaN(r)) {
            const u = Math.sqrt(p * r);
            const i = Math.sqrt(p / r);
            setValues(values => ({
                ...values,
                u: u.toFixed(2),
                i: i.toFixed(2)
            }));
        } else if (!isNaN(i) && !isNaN(r)) {
            const u = i * r;
            const p = i * i * r;
            setValues(values => ({
                ...values,
                u: u.toFixed(2),
                p: p.toFixed(2)
            }));
        } else if (!isNaN(u) && !isNaN(r)) {
            const i = u / r;
            const p = (u * u) / r;
            setValues(values => ({
                ...values,
                i: i.toFixed(2),
                p: p.toFixed(2)
            }));
        } else if (!isNaN(u) && !isNaN(i)) {
            const r = u / i;
            const p = u * i;
            setValues(values => ({
                ...values,
                r: r.toFixed(2),
                p: p.toFixed(2)
            }));
        }
    }

    return (
        <>
            <h2>Formelrad</h2>
            <img src={formelrad} width="200" alt="Formelrad" />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Spannung</label>
                    <input
                        value={values.u}
                        onChange={e =>
                            setValues(values => ({ ...values, u: e.target.value }))
                        }
                    />
                </div>
                <div>
                    <label>Strom</label>
                    <input
                        value={values.i}
                        onChange={e =>
                            setValues(values => ({ ...values, i: e.target.value }))
                        }
                    />
                </div>
                <div>
                    <label>Widerstand</label>
                    <input
                        value={values.r}
                        onChange={e =>
                            setValues(values => ({ ...values, r: e.target.value }))
                        }
                    />
                </div>
                <div>
                    <label>Leistung</label>
                    <input
                        value={values.p}
                        onChange={e =>
                            setValues(values => ({ ...values, p: e.target.value }))
                        }
                    />
                </div>
                <button type="submit">Calculate</button>
            </form>
        </>
    );
}
