import axios from 'axios'

var routes = {
    login: '/login',
    signup: '/signup',
    facebook: '/facebook',
    twitter: '/twitter',
    analyze: '/analyze'
}

const serverPost = (routeName, message) => {
    return axios.post(routes[routeName], message)
}

const serverGet = (routeName) => {
    axios.get(routes[routeName])
}

export {serverPost, serverGet}

