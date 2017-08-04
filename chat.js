const request = require('request')

module.exports = async (message, callback) => {
  const encodedMessage = encodeURI(message.replace(/nattasha|natt/gi, 'simi').replace(/@/g, ''))
  const simiURL = `${process.env.CHAT_URL}${encodedMessage}`

  request(simiURL, (error, resp, body) => {
    const result = JSON.parse(body)
    if (result.simsimi_talk_set) {
      const simiResponse = result.simsimi_talk_set.answers[0].sentence
      const response = simiResponse.replace(/sim |simi|simsimi|simsimk/gi, 'nattasha').replace(/ayam|anak ayam/gi, 'anak kecil')
      callback(response)
    }
  })
}
