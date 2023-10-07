import Cookies from 'cookies'

export default (req, res) => {

    return new Promise((resolve, reject) => {
        const cookies = new Cookies(req, res)
        const authToken = cookies.get('auth-token')
        

        // console.log(typeof req.headers.cookie)

        res.status(200).json({ token: authToken })
    }) 
}