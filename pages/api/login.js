// // a demo api endpoint for loggin in
import Cookie from "cookies"
import cookies from 'next/headers'

export default (req, res) => {
    

    const { token } = req.body

    console.log(req.body)
    
    res.status(200).json({ success: true }) 
    // if (req.body.email === 'admin@example.com') {
    //     res.status(200).json({ authToken: '123'})
    // } else {
    //     res.status(400).json({ error: 'Invalid credentials' })
    // }
}