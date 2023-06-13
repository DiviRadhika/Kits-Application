export const api = "http://34.100.227.119:5001/api";
export const country ='https://trial.mobiscroll.com/content/countries.json'
export const endPointsUser = {
    // Endpoints for UserCreate
    getcros: `${api}/cros`,
    getCroById: `${api}/cro/`,
    getCroAddUpdate: `${api}/cro`,

    // Endpoints for UserCreate
    getUser: `${api}/user/register`,
    getUserById: `${api}/user_actions/`,
    getUserAddUpdate: `${api}/user/register`,

    // Endpoints for  Login 
    login: `${api}/login`,
    sendotp: `${api}/login/sendotp`,
    reset:`${api}/user/register`,

    // Endpoints for sponsors
    getSponsors: `${api}/sponsors`,
    getSponsorsById: `${api}/sponsor/`,
    getSponsorsAddUpdate: `${api}/sponsor`,

    // Endpoints for Site
    getSites: `${api}/sites_data`,
    getSiteById: `${api}/site_data/`,
    getSiteAddUpdate: `${api}/site_data`,

    // Endpoints for Lab Test
    getLabTest: `${api}/lab_tests`,
    getLabTestById: `${api}/lab_test/`,
    getLabTestAddUpdate: `${api}/lab_test`,

   // Endpoints for Material
   meterials: `${api}/meterials`,
   materialAddUpdate:  `${api}/meterial`,
   getmeterialById: `${api}/meterial/`,

    // Endpoints for Protocol
    postProtocol: `${api}/cro_protocol`,
    croProtocols: `${api}/cro_protocols`,
    getProtocolId : `${api}/cro_protocol/`
   

}
