export const api = "http://34.100.227.119:5001/api";
export const api2 = "http://34.100.227.119:5002/api";
export const country ='https://trial.mobiscroll.com/content/countries.json'
export const apin ="http://34.100.202.30:5001/api"
export const endPointsUser = {
    // Endpoints for UserCreate
    getcros: `${apin}/cros`,
    getCroById: `${apin}/cro/`,
    getCroAddUpdate: `${apin}/cro`,

    // Endpoints for UserCreate
    getUser: `${apin}/user/register`,
    getUserById: `${apin}/user_actions/`,
    getUserAddUpdate: `${apin}/user/register`,
    getUserUpdate: `${apin}/user_actions/`,

    // Endpoints for  Login 
    login: `${apin}/login`,
    sendotp: `${apin}/login/sendotp`,
    reset:`${apin}/user/register`,
    dashboard: `${apin}/dashboard`,

    // Endpoints for sponsors
    getSponsors: `${apin}/sponsors`,
    getSponsorsById: `${apin}/sponsor/`,
    getSponsorsAddUpdate: `${apin}/sponsor`,

    // Endpoints for Site
    getSites: `${apin}/sites_data`,
    getSiteById: `${apin}/site_data/`,
    getSiteAddUpdate: `${apin}/site_data`,

    // Endpoints for Lab Test
    getLabTest: `${apin}/lab_tests`,
    getLabTestById: `${apin}/lab_test/`,
    getLabTestAddUpdate: `${apin}/lab_test`,

   // Endpoints for Material
   meterials: `${apin}/meterials`,
   materialAddUpdate:  `${apin}/meterial`,
   getmeterialById: `${apin}/meterial/`,

    // Endpoints for Protocol
    postProtocol: `${apin}/cro_protocol`,
    croProtocols: `${apin}/cro_protocols`,
    getProtocolId : `${apin}/cro_protocol/`,
        
    // Endpoints for Preparatiion
    getPreparation:`${apin}/clab_kit_preparations`,
    postPreparation:`${apin}/clab_kit_preparation`,
    getPreparationById:`${apin}/clab_kit_preparation/`,
    sampleack:`${apin}/sample_ack/`,
    sampleackput:`${apin}/sample_ack`,
   

}
