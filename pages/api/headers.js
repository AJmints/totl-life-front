import Cookies from 'cookies'

export default (req, res) => {
    const cookieStore = new Cookies(req, res)
    const token = cookieStore.get('auth-token')

    return res.status(200).json(token)
}
