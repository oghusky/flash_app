import axios from 'axios';

const ReportAPI = {
    createReport: async (data, jwt) => {
        try {
            return axios.post("/report", data, {
                headers: {
                    authorization: jwt
                }
            })
        } catch (e) {
            return e.message;
        }
    }
}

export default ReportAPI;