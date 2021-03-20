const express = require ("express")
const bodyParser = require ("body-parser") 
const request =require ("request")
const https =require ("https")
const { response } = require("express")



const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html")
})

app.post('/', function (req, res) {

  const firstName = req.body.fName
  const lastName =req.body.lName
  const email = req.body.email

const data = {
  members: [
    {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
}

var jsonData = JSON.stringify(data)

const url ='https://us1.api.mailchimp.com/3.0/lists/91aaaf5888'

const options = {
  method: 'POST',
  auth: 'henry1:8d8dd2eaa578c6d525aa56cb02e13815-us1'

}

const request = https.request(url, options, (response)=>{

  if (request.statusCode === 200) {
    res.sendFile(__dirname + '/success.html' )
  } else {
    res.sendFile(__dirname + '/failure.html' )
  }


  response.on('data',(data)=>{
    console.log(JSON.parse(data))
  })
})

request.write(jsonData)
request.end()

})

app.post("/failure", (req, res) => {
res.redirect("/")
})


app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running on port 3000`)
})

// API key 
// 8d8dd2eaa578c6d525aa56cb02e13815-us1

// list Id
// 91aaaf5888