import { useState, useEffect } from 'react'
import uuid from 'uuid-random'
import { encrypt, decrypt } from 'caesar-shift'
import CryptoJS  from 'crypto-js'
import sha256 from 'crypto-js/sha256'
import { Remarkable } from 'remarkable'

const randomizer = (min, max) => {
  return Math.random() * (max - min) + min
}

const keygen = (index) => {
  let key = 5 + index
  if(key > 28) {
    key = key - 5
  }

  key = Math.ceil(key)

  return key
}

export const generateSession = (obj) => {
  const date = new Date()
  const lowerLimit = randomizer(1, 12)
  const upperLimit = randomizer(13, 26)
  const index = randomizer(upperLimit, lowerLimit)

  const uid = uuid()
  const key = keygen(index)

  const caesar = encrypt(key, uid)
  const hash = sha256(uid).toString()

  const data = CryptoJS.AES.encrypt(JSON.stringify(obj), hash).toString()
  const id = Math.ceil(date.getTime())


  let token = {
    index: key,
    uid: caesar,
    data,
  }

  token = CryptoJS.AES.encrypt(JSON.stringify(token), `${id}x0`).toString()
  return { id, token }
}

export const readSession = (session) => {
  const { id, token } = session
  const idKey = `${id}x0`

  let sessionDecrypt = CryptoJS.AES.decrypt(token, idKey)
  sessionDecrypt = JSON.parse(sessionDecrypt.toString(CryptoJS.enc.Utf8))

  const { index, uid, data } = sessionDecrypt
  const uuid = decrypt(index, uid)
  const hash = sha256(uuid).toString()

  let dataDecrypt = CryptoJS.AES.decrypt(data, hash)
  dataDecrypt = JSON.parse(dataDecrypt.toString(CryptoJS.enc.Utf8))

  return dataDecrypt
}

export const signupHiveOnboard = () => {
  const referenceUrl = window.open('https://hiveonboard.com/create-account?ref=dbuzz&redirect_url=https://d.buzz/#/?status=success', '_blank')
  referenceUrl.blur()
}

export function hasCompatibleKeychain() {
  return (
    window.hive_keychain &&
    window.hive_keychain.requestSignBuffer &&
    window.hive_keychain.requestBroadcast &&
    window.hive_keychain.requestSignedCall
  )
}

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return { width, height }
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export const anchorTop = () => {
  window.scrollTo(0, 0)
}

const remarkable = new Remarkable()
export default remarkable

/** Removes all markdown leaving just plain text */
const remarkableStripper = md => {
  md.renderer.render = (tokens, options, env) => {
    let str = ''
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'inline') {
        str += md.renderer.render(tokens[i].children, options, env);
      } else {
        // console.log('content', tokens[i])
        const content = tokens[i].content
        str += (content || '') + ' '
      }
    }
    return str
  }
}

remarkable.use(remarkableStripper)

export const extractVideoLinks = (links) => {
  const videoLinks = []

  links.forEach((link) => {
    if(link.includes('youtube') || link.includes('youtu.be')) {
      const splitLink = link.includes('youtu.be') ? link.split('be/') : link.split('v=')
      const tempLink = splitLink[1]

      if(tempLink !== undefined) {
        if(tempLink.includes('&')) {
          splitLink[1] = (tempLink.split('&'))[0]
        }
  
        videoLinks.push({ link, type: 'youtube', id: splitLink[1] })
      }
    } else if(link.includes('3speak.online')) {
      const splitLink = link.split('watch?v=')
      link = `https://3speak.online/embed?v=${splitLink[1]}`
      videoLinks.push({ link, type: '3speak', id: splitLink[1] })
    }
  })

  return videoLinks
}

export const extractImageLinks = (links) => {
  const imageLinks = []

  links.forEach((link) => {
    if((link.includes('.jpg') 
        || link.includes('.png')
        || link.includes('.JPEG')
        || link.includes('youtu.be') 
        || link.includes('youtube')) 
        && !link.includes('img.3speakcontent.online')) {

      if(link.includes('youtube')) {
        const splitLink = link.includes('youtu.be') ? link.split('be/') : link.split('v=')
        link = `https://img.youtube.com/vi/${splitLink[1]}/hqdefault.jpg`
      } 
      
      imageLinks.push(link)
    }
  })

  return imageLinks
}