import { useEffect, useState } from "react";
import Header from "../header";
import { useParams } from "react-router-dom"

export default function Training() {
    const [list, setList] = useState([])
    const {id} = useParams()
    const getInfo = async () => {
        await window.getTrainingEvolution(id).then(res=>{
            setList(res)
        })
    }
    useEffect(()=>{
        getInfo()
    }, [])
    return <>
        <Header></Header>
        {list.length}
    </>
}