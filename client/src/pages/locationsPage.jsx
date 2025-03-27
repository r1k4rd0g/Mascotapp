//import { CountryContainer } from "../containers/countryContainer";
import {CountryContainer, StateContainer, CityContainer, NeighborhoodContainer} from "../containers/locationsContainer"

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

export  const CityPage = () =>{
    return(
        <div>
            <h1>Ciudades</h1>
            <CityContainer/>
        </div>
    )
}

export  const NeighborhoodPage = () =>{
    return(
        <div>
            <h1>Barrios</h1>
            <NeighborhoodContainer/>
        </div>
    )
}