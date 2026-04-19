import { useEffect, useState } from "react";
import Header from "../header";


export default function TrainingList() {
    const [list, setLIst] = useState([])
    const get_list = async ()=>{
        await window.getTraining().then((response)=>{
            setLIst(response)
        })
    }
    const [newtrainingname, setNewTrainingName] = useState(null)
    const CreateNewTraining = async ()=>{
        if (newtrainingname.length > 0) {
            await window.insertTraining(newtrainingname).then(res=>{
                setLIst(res)
            })
        }
    }
    const handleDelete = async (id)=>{
        await window.deleteTraining(id).then(res=>{
            setLIst(res)
        })
    }
    useEffect(()=>{
        get_list()
    }, [])
    return <div>
        <Header></Header>
        {list.length}
        <div className="accordion divide-neutral/20 divide-y">
            <div className="accordion-item active" id="payment-basic">
                <button className="accordion-toggle inline-flex items-center gap-x-4 text-start" aria-controls="payment-basic-collapse" aria-expanded="true" >
                    <span className="icon-[tabler--plus] accordion-item-active:hidden text-base-content size-4.5 block shrink-0"></span>
                    <span className="icon-[tabler--minus] accordion-item-active:block text-base-content size-4.5 hidden shrink-0"></span>
                    Add new Training
                </button>
                <div id="payment-basic-collapse" className="accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="payment-basic" role="region" >
                    <div className="px-5 pb-4 flex gap-2">
                        <input type="text" className="input max-w-sm" aria-label="input" placeholder="Training name" onChange={(e)=>setNewTrainingName(e.target.value)} value={newtrainingname}/> 
                        <button className="btn btn-secondary" onClick={CreateNewTraining}>Secondary</button>
                    </div>
                </div>
            </div>
        </div>
        {list.map((el)=><div >{el.name} <button onClick={()=>handleDelete(el.id)}>Delete</button></div>)}
    </div>
}