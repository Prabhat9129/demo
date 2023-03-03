app.get('/q2', async (req, res) => {
    const data = await fetch('https://coderbyte.com/api/challenges/json/json-cleaning')
    let jsonData = await data.json()

    for (key in jsonData) {
        if (typeof (jsonData[key]) === 'object') {
            if (Array.isArray(jsonData[key])) {
                let arr = jsonData[key]
                let arr1 = []
                for (let i = 0; i < arr.length; i++) {
                    if (jsonData[key][i] !== '-') {
                        arr1.push(arr[i])
                    }
                }
                jsonData[key] = arr1
            }
            else {
                for (k in jsonData[key]) {
                    if (jsonData[key][k] === '' || jsonData[key][k] === 'N/A') {
                        delete jsonData[key][k]
                    }
                }
            }
        }
        if (jsonData[key] === '-') {
            delete jsonData[key]
        }
    }

    console.log(jsonData)

    return res.status(200).json({
        jsonData
    })
})