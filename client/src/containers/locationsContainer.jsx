import { GenericTableContainer } from './genericTableContainer';
import { entitiesConfig } from '../config/entities';
import { useLocations } from '../hooks/useLocations';

export const StateContainer = () => {
    const {countries} = useLocations();

    return(
        <GenericTableContainer
        endpoint={entitiesConfig.state.endpoint}
        entityConfig={entitiesConfig.state}
        parentData={countries}
    />
    )
};

export const CityContainer = () => {
    const {states} = useLocations();

    return(
        <GenericTableContainer
        endpoint={entitiesConfig.city.endpoint}
        entityConfig={entitiesConfig.city}
        parentData={states}
    />
    )
}

export const NeighborhoodContainer = () => {
    const {cities} = useLocations();

    return(
        <GenericTableContainer
        endpoint={entitiesConfig.neighborhood.endpoint}
        entityConfig={entitiesConfig.neighborhood}
        parentData={cities}
    />
    )
}