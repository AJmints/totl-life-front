import Cookies from 'cookies'

export default (req, res) => {
    const cookies = new Cookies(req, res)
    cookies.set('auth-token', null)
    res.end()
}