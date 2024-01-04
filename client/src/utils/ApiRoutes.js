export const HOST = 'http://localhost:3005'

const AUTH_ROUTE = `${HOST}/api/v1/auth`
const MESSAGE_ROUTE = `${HOST}/api/v1/messages`

export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`
export const ONBOARD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`
export const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`

export const ADD_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-message`
export const GET_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/get-messages`