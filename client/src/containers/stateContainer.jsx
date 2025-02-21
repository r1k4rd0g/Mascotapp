import { GenericTableContainer } from './genericTableContainer';
import { entitiesConfig } from '../config/entities';

export const StateContainer = () => (
    <GenericTableContainer
        endpoint={entitiesConfig.state.endpoint}
        entityConfig={entitiesConfig.state}
    />
);