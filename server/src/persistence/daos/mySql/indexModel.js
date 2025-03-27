//Modules
import CountryModel from "../mySql/locations/countries/countriesModel.js";
import StateModel from "../mySql/locations/states/statesModel.js";
import CityModel from "../mySql/locations/cities/citiesModel.js";
import NeighborhoodModel from "../mySql/locations/neighborhoods/neighborhoodsModel.js";
//import UserModel from "../mySql/users/usersModel.js";
//import CustomerModel from "../mySql/clients/customerModel.js";
//import PetModel from "../mySql/pets/petsModel.js";
//import ClinicalHistoryModel from "../mySql/clinicalHistories/clinicalHistoriesModel.js";


const registerModels = (sequelize) => {
    //inicia los modelos
    CountryModel(sequelize);
    StateModel(sequelize);
    CityModel(sequelize);
    NeighborhoodModel(sequelize);
    //UserModel(sequelize);
    //CustomerModel(sequelize);
    //PetModel(sequelize);
    //ClinicalHistoryModel(sequelize);

    //relaciona los modelos
    const { Country, State, City, Neighborhood, User, Customer, Pet, ClinicalHistory } = sequelize.models;

    //relación jerárquica de los modelos: Geográfica
    Country.hasMany(State, { foreignKey: 'countryId' }); //un país tiene muchos estados
    State.belongsTo(Country, { foreignKey: 'countryId' }); //un estado pertenece a un país

    State.hasMany(City, { foreignKey: 'stateId' }); //un estado tiene muchas ciudades
    City.belongsTo(State, { foreignKey: 'stateId' }); //una ciudad pertenece a un estado

    City.hasMany(Neighborhood, { foreignKey: 'cityId' }); //una ciudad tiene muchos barrios
    Neighborhood.belongsTo(City, { foreignKey: 'cityId' }); //un barrio pertenece a una ciudad

    //relación de los modelos: usuario - cliente
    //User.hasOne(Customer, { foreignKey: 'userId' }); //un usuario tiene un cliente
    //Customer.belongsTo(User, { foreignKey: 'userId' }); //un cliente pertenece a un usuario

    //relación de los modelos: cliente - mascota
    //Customer.hasMany(Pet, { foreignKey: 'customerId' }); //un cliente tiene muchas mascotas
    //Pet.belongsTo(Customer, { foreignKey: 'customerId' }); //una mascota pertenece a un cliente

    //relación de los modelos: mascota - historia clínica
    //Pet.hasMany(ClinicalHistory, { foreignKey: 'petId' }); //una mascota tiene muchas historias clínicas
    //ClinicalHistory.belongsTo(Pet, { foreignKey: 'petId' }); //una historia clínica pertenece a una mascota
}

export default registerModels;