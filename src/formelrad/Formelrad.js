import { useState } from "react";
import formelrad from "../image/formelradelektronik.gif";

export default function Formelrad() {
    const [values, setValues] = useState({
        u: 10,
        i: 2,
        r: "",
        p: ""
    });

    return (
        <>
            <h2>Formelrad</h2>
            <img src={formelrad} width="200" alt="Formelrad" />
            <form>
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
