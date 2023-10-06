// export function getServerSideProps({ req, res }) {
//     const Cookies = require('cookies')
//     const cookies = new Cookies(req, res)

//     // Delete cookie by not setting the value
//     cookies.set('auth-token')

//     res.writeHead(307, { Location: '/'})
//     res.end() 

//     return { props: {} }
// }