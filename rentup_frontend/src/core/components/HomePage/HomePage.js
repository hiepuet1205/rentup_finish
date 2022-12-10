import Page from "../common/Page"
import Filter from "./filter/Filter"
import Type from "./type/Type"
import Recent from "./Recent/Recent"
import Landlord from "./landlord/Landlord"
import {useState} from "react"

const HomePage = () => {
    
    const [filter, setFilter] = useState({})
    
    const handleFilter = (item) => {
        console.log(item)
        setFilter(item)
    }
    
    return (
        <Page>
            <Filter handleFilter={handleFilter}/>
            <Type handleFilter={handleFilter}/>
            <Recent filter={filter}/>
            <Landlord/>
        </Page>
    )
}

export default HomePage