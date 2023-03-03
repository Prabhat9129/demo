app.use('/q3', async (req, res) => {
    const data = await axios.get('https://coderbyte.com/api/challenges/json/age-counting')
    let jsonData = await data.data

    const arr = jsonData.data.split(', ')
    let obj = []

    for (let i = 0; i < arr.length; i = i + 2) {
        let key = arr[i].split('=')[1]
        let age = arr[i + 1].split('=')[1]

        let d = {
            key: key,
            age: age
        }
        obj.push(d)
    }

    let str = ''
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].age == 32) {
            str = str + obj[i].key + '\n'
        }
    }

    fs.writeFileSync('output.txt', str)

    const hashedData = crypto
        .createHash('sha256')
        .update(JSON.stringify(str))
        .digest('hex')

    return res.status(200).json({
        status: 'Success',
        hashedData
    })
})

app.listen(5000, () => {
    console.log('server is running on Port 5000')
})