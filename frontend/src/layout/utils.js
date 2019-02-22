const axios = require('axios')

export function getLast(number) {
    return new Promise(async (res, rej) => {
        try {
            const respDB = await axios.get(
                `http://localhost:8081/api/getLast/${number}`
            )   
            const data = respDB.data            
            res({data})
        } catch(e) {
            rej(e)
        }
    })
}
