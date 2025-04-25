//esta función verifica si existe el nombre de una entidad, con un id diferente.
//considera ademas si esta entidad tienen un parentId, en cuyo caso verifica que el nombre no exista para ese parentId
//si no tiene parentId, verifica que el nombre no exista para el id de la entidad

export const checkIfNameExistsWithDifId = async (name, parentId, entityId, dao, parentFieldName = null) => {
    try {
        let whereClause = { name };
        if (parentId && parentFieldName) {
            whereClause[parentFieldName] = parentId;
        }
        const existingEntity = await dao.getByName(whereClause);
        if (existingEntity && existingEntity.id !== entityId) {
            return true; // Name exists with a different ID (and same parent if applicable)
        }
        return false; // Name does not exist for that parent, or it's the same entity
    } catch (error) {
        console.error('Error al verificar la existencia del nombre:', error);
        throw error;
    }
}
