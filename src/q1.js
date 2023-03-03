const express = require('express')
const axios = require('axios')
 const fetch = require('node-fetch')
const fs = require("fs")
const crypto = require('crypto')

const app = express()
app.use(express.json())


app.get('/hello',async(req,res)=>{
    res.status(200).json({
status:"success"
    })
})

app.get('/q1', async (req, res) => {
    console.log('question1 ===============');
    const data = await axios.get('https://coderbyte.com/api/challenges/json/age-counting')
    let jsonData = await data.data
console.log(data)
    const arr = jsonData.data.split(', ')
    console.log(arr)
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

    let count = 0
    let temp = 1
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].age >= 50) {
            console.log(temp)
            temp++
            count++
        }
    }

    console.log('count:', count)

    return res.status(200).json({
        count
    })
})


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

app.listen(8080, () => {
    console.log('server is running on Port 8080')
})