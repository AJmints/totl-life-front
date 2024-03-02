import httpProxy from 'http-proxy'
import url from 'url'
import Cookies from "cookies"

const proxy = httpProxy.createProxyServer()

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// }



export default (req, res) => {

    return new Promise((resolve, reject) => {

        // const { token } = req.body.data.token
        const cookies = new Cookies(req, res)
        // const authToken = cookies.get('auth-token')
        console.log(req.body.data)
        const token = req.body.data

        cookies.set("auth-token", token)
        return res.status(200).json({ success: true })

        // TODO: This approach is depricated, look for update and update isLogin
        // const pathname = url.parse(req.url).pathname
        // const isLogin = req.url === '/api/login' // should: req.url = pathname

        // req.headers.cookies = ''
        // console.log(req.headers.cookie)

        
        // if (isLogin) {
        //     console.log("islogin if statement triggered")
        //     proxy.once('proxyRes', (stream) => {
        //         interceptLoginResponse(proxyRes, req, res)
        //     })
        // }

        // proxy.once('error', reject)

        // proxy.web(req, res, {
        //     target: "",
        //     autoRewrite: false,
        //     selfHandleResponse: isLogin,
        // })
        // console.log(proxy)

        // console.log("run?")

        // function interceptLoginResponse(proxyRes, req, res) {
        //     console.log("read?")
        //     let apiResponseBody = ''
        //     proxyRes.on('data', (chunk) => {
        //         apiResponseBody += chunk
        //     })
            
        //     proxyRes.on('end', () => {
        //         try {
        //             const { authToken } = JSON.parse(responseBody)
        //             const cookies = new Cookies(req, res)
        //             cookies.get( 'auth-token', authToken, {
        //                 httpOnly: true,
        //                 sameSite: 'lax', 
        //             })

        //             res.status(200).json({ logginIn: true })
        //             resolve()
        //         } catch (err) {
        //             reject(err)
        //         }
        //     })
        // }

        
         
        // if (req.body.email === 'admin@example.com') {
        //     res.status(200).json({ authToken: '123'})
        // } else {
        //     res.status(400).json({ error: 'Invalid credentials' })
        // }
    })
}