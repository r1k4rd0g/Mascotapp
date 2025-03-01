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