import { useState, useEffect } from 'react'
import uuid from 'uuid-random'
import { encrypt, decrypt } from 'caesar-shift'
import CryptoJS  from 'crypto-js'
import sha256 from 'crypto-js/sha256'
import { Remarkable } from 'remarkable'
import { DefaultRenderer } from 'steem-content-renderer'
import markdownLinkExtractor from 'markdown-link-extractor'
import stripHtml from 'string-strip-html'

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

const randomizer = (min, max) => {
  return Math.random() * (max - min) + min
}

const keygen = (index) => {
  let key = 5 + index
  if (key > 28) {
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

const renderer = new DefaultRenderer({
  baseUrl: "https://blog.d.buzz/",
  breaks: true,
  skipSanitization: false,
  allowInsecureScriptTags: false,
  addNofollowToLinks: true,
  doNotShowImages: false,
  ipfsPrefix: "https://images.hive.blog/0x0/",
  assetsWidth: 640,
  assetsHeight: 480,
  imageProxyFn: (url) => `https://images.hive.blog/0x0/${url}`,
  usertagUrlFn: (account) => "/@" + account,
  hashtagUrlFn: (hashtag) => `/tags?q=${hashtag}`,
  isLinkSafeFn: (url) => url.match(/^\//g),
})

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

export const extractVideoLinks = (links) => {
  const videoLinks = []

  links.forEach((link) => {
    if (link.includes('youtube') || link.includes('youtu.be')) {
      const splitLink = link.includes('youtu.be') ? link.split('be/') : link.split('v=')
      const tempLink = splitLink[1]

      if (tempLink !== undefined) {
        if (tempLink.includes('&')) {
          splitLink[1] = (tempLink.split('&'))[0]
        }
  
        videoLinks.push({ link, type: 'youtube', id: splitLink[1] })
      }
    } else if (link.includes('3speak.online')) {
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
    if ((link.includes('.jpg') 
        || link.includes('.png')
        || link.includes('.JPEG')
        || link.includes('youtu.be') 
        || link.includes('youtube')) 
        && !link.includes('img.3speakcontent.online')) {

      if (link.includes('youtube')) {
        const splitLink = link.includes('youtu.be') ? link.split('be/') : link.split('v=')
        link = `https://img.youtube.com/vi/${splitLink[1]}/hqdefault.jpg`
      } 
      
      imageLinks.push(link)
    }
  })

  return imageLinks
}

const prepareImages = (content) => {
  let contentReplaced = content
  const splitContent = contentReplaced.split(' ')
  splitContent.forEach((item, index) => {
    // remove 3speak thumbnails
    if((item.includes('.png') && item.includes('img.3speakcontent.online')) && !item.includes('https://images.hive.blog')) {
      splitContent[index] = ''
    } 
  })
  return splitContent.join(' ')
}

const prepareEmbeds = (content) => {
  let contentReplaced = content
  contentReplaced = contentReplaced.replace('Watch on 3Speak', 'Watch-on-3Speak')
  const splitContent = contentReplaced.split(' ')
  const visited = []
  splitContent.forEach((item, index) => {
    if(item.includes('3speak.online') && item.includes('watch?v=')) {
      const preserve = `&#9654;&#65039;${item.replace('Watch-on-3Speak', 'Watch on 3Speak')}`
      item = item.split(')')

      if(item.length !== 0) {
        item = item[0]
      }

      let splitLink = item.split('watch?v=')

      let idToFormat = splitLink[1]
      idToFormat = idToFormat.replace(/\)/g, '')
      idToFormat = idToFormat.replace('[Watch on', '')
      idToFormat = idToFormat.trim('')
  
      const videoLink = `https://3speak.online/embed?v=${idToFormat}`

      if(!visited.includes(videoLink)) {
        visited.push(videoLink)
        splitContent[index] = `.^~~~~~~embed:${videoLink}~~~~~~^. \n\n${preserve}`
      }
    } else if(item.includes('d.tube/#!/v/')) {
      const preserve = item
      const link  = markdownLinkExtractor(item)
      const rawLink = link[0].split('v/')
      const splitRawLink = rawLink[1].split('&#39')
      const videoLink = `https://emb.d.tube/#!/${splitRawLink[0]}`

      if(!visited.includes(videoLink)) {
        visited.push(videoLink)
        splitContent[index] = `.^~~~~~~embed:${videoLink}~~~~~~^. \n\n<center><a ${preserve}`
      }

    }
  })
  return splitContent.join(' ')
}

const render = (content) => {
  const sections = []
  content = content.split('~~~~~~^.')

  content.forEach((item, index) => {
    let contentBody = ''
    if(item.includes('.^~~~~~~')) {
      const splitEmbed = item.split('embed:')
      const src = splitEmbed[1]

      contentBody = `<iframe
                    title='Embedded Video'
                    key='${index}'
                    src="${src}"
                    allowFullScreen='true'
                    frameBorder='0'
                    height='400'
                    width='100%'
                  ></iframe>`    
    } else {
      contentBody = renderer.render(item)
    }

    sections.push(contentBody)
  })

  return sections.join(' ')
}

export const renderContent = (content) => {
  let body = content
  body = prepareImages(body)
  body = prepareEmbeds(body)
  body = render(body)

  return body
}

export const calculatePayout = (data) => {

  const {
    pending_payout_value,
    total_payout_value,
    curator_payout_value,
    is_paidout = null,
  } = data

  let payout = 0

  if(is_paidout) {

    // if(is_paidout) {
    payout = parseFloat(`${pending_payout_value}`.replace('HBD'))
    // } else {
    //   payout = parseFloat(`${total_payout_value}`.replace('HBD')) + parseFloat(`${curator_payout_value}`.replace('HBD'))
    // }
  } else {
    payout = parseFloat(`${total_payout_value}`.replace('HBD')) + parseFloat(`${curator_payout_value}`.replace('HBD')) + parseFloat(`${pending_payout_value}`.replace('HBD'))
  }

  payout = payout.toFixed(2)

  if(payout === 0) {
    payout = '0.00'
  }

  return payout
}

export const invokeTwitterIntent = (content) => {
  const width = 500
  const height = 600
  let body = content
  if(body.length < 274) {
    body += ' #HIVE'
  }
  body = encodeURIComponent(stripHtml(body))
  window.open(`https://twitter.com/intent/tweet?text=${body}` , 'newwindow', 'width=' + width + ', height=' + height + ', top=' + ((window.innerHeight - height) / 2) + ', left=' + ((window.innerWidth - width) / 2))
}

export const sendToBerries = (author) => {
  window.open(`https://buymeberri.es/!dbuzz/@${author}`, '_blank')
}

export const truncateBody = (body) => {
  const bodyLength = `${stripHtml(body)}`.length

  if(bodyLength > 280) {
    body = stripHtml(body)
    body = `${body}`.substr(0, 280)
    body = `${body} . . .`
  }

  return body
}