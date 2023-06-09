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

    // Endpoints for sponsors
    getSponsors: `${api}/sponsors`,
    getSponsorsById: `${api}/sponsor/`,
    getSponsorsAddUpdate: `${api}/sponsor`,

    // Endpoints for sponsors
    getSites: `${api}/sites_data`,
    getSiteById: `${api}/site_data/`,
    getSiteAddUpdate: `${api}/site_data`,

    // Endpoints for sponsors
    getLabTest: `${api}/lab_tests`,
    getLabTestById: `${api}/lab_test/`,
    getLabTestAddUpdate: `${api}/lab_test`,


    // Endpoints for Protocol
    postProtocol: `${api}/cro_protocol`,
    croProtocols: `${api}/cro_protocols`,


}
