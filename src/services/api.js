import { v4 as uuidv4 } from 'uuid'
import appConfig from 'config'
import { api, auth } from '@hiveio/hive-js'

export const keychainSignIn = (username) => {
  const challenge = { token: uuidv4() }
  const buffer = JSON.stringify(challenge, null, 0)

  return new Promise((resolve) => {
    window.hive_keychain.requestSignBuffer(
      username, 
      buffer,
      'Posting',
      response => {
        resolve(response)
      },
    )
  })
}

export const packLoginData = (username, password) => {
  return new Buffer(
    `${username}\t${password}`,
  ).toString('hex')
}

export const isWifValid = (password, pubWif) => {
  return auth.wifIsValid(password, pubWif)
}

export const getCommunityRole = async(observer) => {
  return new Promise((resolve, reject) => {
    const params = { "name": `${appConfig.TAG}`, observer }
    api.call('bridge.get_community', params, async(err, data) => {
      if (err) {
        reject(err)
      }else {
        resolve(data.context.subscribed)
      }
    })
  })
}

export const fetchMuteList = (user) => {
  return new Promise((resolve, reject) => {
    api.call('condenser_api.get_following', [user, null, 'ignore', 1000], async(err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}