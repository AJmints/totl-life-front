import Cookies from 'cookies'

export default (req, res) => {

    return new Promise((resolve, reject) => {

        const cookies = new Cookies(req, res)
        const authToken = cookies.get('auth-token')
        
        try{

            const details = JSON.parse(atob(authToken.split(".")[1]))
            const date = new Date()
            // console.log("currenttim: " + date.getTime() + "\nExpiration: " + investigate.exp + "000")
            if (Number(details.exp+"000") > date.getTime()) {
                return res.status(200).json({ loggedIn: true, id: details.sub })
            } else {
                cookies.set('auth-token')
                return res.status(200).json({ loggedIn: false })
            }
        } catch (error) {
            if (authToken === undefined || authToken === null) {
                return res.status(200).json({ loggedIn: false })
            }
            return res.status(200).json({ loggedIn: false })
        }
    })
}