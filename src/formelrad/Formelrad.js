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

        const p = parseFloat(values.p);
        const i = parseFloat(values.i);

        if (!isNaN(p) && !isNaN(i)) {
            const u = p / i;
            setValues(values => ({ ...values, u: u.toFixed(2) }));
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
