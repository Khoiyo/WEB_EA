export default function Gomb({setCount}){
    return(
        <button onClick={()=>setCount(prev=> prev+1)}>gomb</button>
    )
}