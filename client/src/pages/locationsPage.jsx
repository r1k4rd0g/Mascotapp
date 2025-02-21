import { CountryContainer } from "../containers/countryContainer";
import {StateContainer} from "../containers/stateContainer"

export const CountryPage = () => {
    return(
        <div>
            <h1>Paises</h1>
            <CountryContainer />
        </div>
    )
}

export  const StatePage = () =>{
    return(
        <div>
            <h1>Departamentos</h1>
            <StateContainer/>
        </div>
    )
}