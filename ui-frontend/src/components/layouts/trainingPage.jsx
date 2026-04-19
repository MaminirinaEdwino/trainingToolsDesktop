import { useEffect, useState } from "react";
import Header from "../header";
import TrainingChart from "../chart";
import TrainingTable from "../trainingTable";
import PredictionCard from "../predictionCard";

export default function Training({ flyreset, navigate, params }) {
    const [list, setList] = useState([])
    let { id, name } = params
    const [value, setValue] = useState(0)
    const [prediction, setPrediction] = useState(0)
    const getPrediction = async () => {
        await window.predictNextValue(id).then(res => {
            setPrediction(res)
        })
    }
    const getInfo = async () => {
        await window.getTrainingEvolution(id).then(res => {
            console.log("get all")
            setList(res)
            getPrediction()
        })
    }
    const handleNewValue = async () => {
        await window.insertEvolution(id, value).then(res => {
            console.log("new ")
            setList(res)
            getPrediction()
        })
    }
    const deleteEvo = async (id_evo) => {
        await window.deleteTrainingEvolution(`${id_evo}`, id).then(res => {
            console.log("delete")
            setList(res)
            getPrediction()
        })
    }
    flyreset()
    useEffect(() => {
        getInfo()
    }, [])

    return <>
        <div className="sticky top-1 m-1 flex justify-between p-2">
            <button onClick={()=>navigate("/", null)} className="btn btn-soft "><span class="icon-[tabler--arrow-back-up] size-5"></span></button>
            <p className="font-bold text-2xl">Training : {name}</p>
        </div>
        <div className="px-5 pb-4 flex gap-2">
            <input type="text" className="input max-w-sm" aria-label="input" placeholder="Training name" onChange={(e) => setValue(e.target.value)} value={value} />
            <button className="btn btn-secondary" onClick={handleNewValue}><span className="icon-[tabler--plus] size-4"></span></button>
        </div>
        <PredictionCard predictedValue={prediction} />
        <TrainingChart data={list} />
        <TrainingTable data={list} deleteFunction={deleteEvo} />
    </>
}