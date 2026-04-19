import { useEffect, useState } from "react";
import Header from "../header";
import { useParams } from "react-router-dom"

export default function Training({flyreset}) {
    const [list, setList] = useState([])
    const { id, name } = useParams()
    const [value, setValue] = useState(0)
    const getInfo = async () => {
        await window.getTrainingEvolution(id).then(res => {
            setList(res)
        })
    }
    const handleNewValue = async () => {
        await window.insertEvolution(id, value).then(res => {
            setList(res)
        })
    }
    const deleteEvo = async (id_evo) => {
        await window.deleteTrainingEvolution(`${id_evo}`, id).then(res => {
            setList(res)
        })
    }
    flyreset()
    useEffect(() => {
        getInfo()
    }, [])
    return <>
        <div className="sticky top-1 m-1 flex justify-between p-2">
            <a href="/" className="btn btn-soft "><span class="icon-[tabler--arrow-back-up] size-5"></span></a>
        <p className="font-bold text-2xl">Training : {name}</p>
        </div>
        <div className="px-5 pb-4 flex gap-2">
            <input type="text" className="input max-w-sm" aria-label="input" placeholder="Training name" onChange={(e) => setValue(e.target.value)} value={value} />
            <button className="btn btn-secondary" onClick={handleNewValue}><span className="icon-[tabler--plus] size-4"></span></button>
        </div>
        <div>
            {list.map((el) => <div>
                {el.training} {el.value} {el.date}
                <button className="" onClick={() => deleteEvo(el.id)}> <span className="icon-[tabler--backspace-filled] size-5 text-red-500 p-1"></span> </button>
            </div>)}
        </div>
    </>
}