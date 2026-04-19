import { useEffect, useState } from "react";
import Header from "../header";
import { useParams } from "react-router-dom"

export default function Training() {
    const [list, setList] = useState([])
    const { id } = useParams()
    const [value, setValue] = useState(0)
    const getInfo = async () => {
        await window.getTrainingEvolution(id).then(res => {
            setList(res)
        })
    }
    const handleNewValue = async ()=>{
        await window.insertEvolution(id, value).then(res=>{
            setList(res)
        })
    }
    useEffect(() => {
        getInfo()
    }, [])
    return <>
        <Header></Header>
        {list.length}
        <div className="px-5 pb-4 flex gap-2">
            <input type="text" className="input max-w-sm" aria-label="input" placeholder="Training name" onChange={(e) => setValue(e.target.value)} value={value} />
            <button className="btn btn-secondary" onClick={handleNewValue}>Secondary</button>
        </div>
    </>
}