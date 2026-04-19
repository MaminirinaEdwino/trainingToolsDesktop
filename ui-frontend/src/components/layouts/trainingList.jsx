import { useEffect, useState } from "react";
import Header from "../header";


export default function TrainingList({ flyReset, navigate }) {
    const [list, setLIst] = useState([])
    const get_list = async () => {
        await window.getTraining().then((response) => {
            setLIst(response)
        })
    }
    const [newtrainingname, setNewTrainingName] = useState(null)
    const CreateNewTraining = async () => {
        if (newtrainingname.length > 0) {
            await window.insertTraining(newtrainingname).then(res => {
                setLIst(res)
            })
        }
    }
    const handleDelete = async (id) => {
        await window.deleteTraining(id).then(res => {
            setLIst(res)
        })
    }
    useEffect(() => {
        get_list()
    }, [])

    flyReset()
    return <div>
        <div className="accordion divide-neutral/20 divide-y">
            <div className="accordion-item active" id="payment-basic">
                <button className="accordion-toggle inline-flex items-center gap-x-4 text-start" aria-controls="payment-basic-collapse" aria-expanded="true" >
                    <span className="icon-[tabler--plus] accordion-item-active:hidden text-base-content size-4.5 block shrink-0"></span>
                    <span className="icon-[tabler--minus] accordion-item-active:block text-base-content size-4.5 hidden shrink-0"></span>
                    Add new Training
                </button>
                <div id="payment-basic-collapse" className="accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="payment-basic" role="region" >
                    <div className="px-5 pb-4 flex gap-2">
                        <input type="text" className="input max-w-sm" aria-label="input" placeholder="Training name" onChange={(e) => setNewTrainingName(e.target.value)} value={newtrainingname} />
                        <button className="btn btn-secondary" onClick={CreateNewTraining}> <span className="icon-[tabler--plus]"></span> </button>
                    </div>
                </div>
            </div>
        </div>
        <h1 className="text-5xl text-center">Training list</h1>
        <span class="icon-[ic--sharp-account-circle] size-10"></span>

        <div className="data-table w-full">
            <table className="w-full">
                <thead className="w-full">
                    <tr className="w-full">
                        <th scope="col" className="min-w-32">Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((el) => <tr className="p-2">
                        <td className="p-1">{el.name}</td>
                        <td className="flex gap-1 justify-center p-1">
                            <button onClick={() => navigate("/training", { id: `${el.id}`, name: el.name })}> <span className="icon-[tabler--eye] size-10 text-yellow-500"></span> </button>
                            <button onClick={() => handleDelete(el.id)}> <span className="icon-[tabler--backspace-filled] size-10 text-red-600"></span> </button>
                        </td>
                    </tr>)}

                </tbody>
            </table>

        </div>
    </div>
}