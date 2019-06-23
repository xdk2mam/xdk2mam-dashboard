const mam = require('@iota/mam')
const { asciiToTrytes } = require('@iota/converter')
const crypto = require('crypto')


const provider = "https://nodes.devnet.thetangle.org:443"

//const provider = "https://node01.iotatoken.nl:443"

function sha256(data){ return crypto.createHash('sha256').update(data).digest() }

const keyGen = length => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'
    const values = crypto.randomBytes(length)
    return Array.from(new Array(length), (x, i) => charset[values[i] % charset.length]).join('')
}

async function publishData(data) {
    var mamState = mam.init(provider)
    var message = mam.create(mamState,
        asciiToTrytes(JSON.stringify(data)))
    await mam.attach(message.payload, message.address, 3, 9)    

    return message.root
}

module.exports = {
    publishData,
}
