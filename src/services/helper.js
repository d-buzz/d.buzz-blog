import { useState, useEffect } from 'react'
import uuid from 'uuid-random'
import { encrypt, decrypt } from 'caesar-shift'
import CryptoJS  from 'crypto-js'
import sha256 from 'crypto-js/sha256'
import { Remarkable } from 'remarkable'
import { DefaultRenderer } from 'steem-content-renderer'
import markdownLinkExtractor from 'markdown-link-extractor'
import diff_match_patch from 'diff-match-patch'
import sanitize from 'sanitize-html'
import textParser from 'npm-text-parser'
import axios from 'axios'

export const getUrls = (text) => {
  const regexUrls = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[/w@?^=%&/~+#-(a-z)(A-Z)(0-9)])?/gm
  return text?.match(regexUrls) !== null ? text?.match(regexUrls) : []
}
export const calculateOverhead = (content) => {
  let urls = getUrls(content) || []
  
  const markdown = content?.match(/#+\s|[*]|\s+&nbsp;+\s|\s+$/gm) || []

  let overhead = 0

  // let overheadItems = []

  if(markdown.length>0) {
    markdown.forEach((item) => {
      // overheadItems.push(item)
      overhead += item.length
    })
  }
  
  if((urls.length) > 3) {
    urls = urls.slice(0, 2)
  }
  
  if(urls && urls.length <= 3){
    urls.forEach((item) => {
      // overheadItems.push(item)
      overhead += item.length
    })
  }

  // console.log(overheadItems)

  return overhead
}
export const stripHtml = (content) => {
  return content.replace(/(<([^>]+)>)/gi, '')
}

const dmp = new diff_match_patch()

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
  const contentReplaced = content
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

      const splitLink = item.split('watch?v=')

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
                    loading='lazy'
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

export const createPatch = (text1, text2) => {
  if (!text1 && text1 === '') return undefined
  const patches = dmp.patch_make(text1, text2)
  const patch = dmp.patch_toText(patches)
  return patch
}

export const errorMessageComposer = (type = null, errorCode = 0) => {
  let errorMessage = 'Transaction broadcast failure for unknown reason, please contact the administrator'

  const prefixes = [
    {
      type: 'post',
      prefix: 'Post creation failed',
    },
    {
      type: 'upvote',
      prefix: 'Upvote transaction failed',
    },
    {
      type: 'reply',
      prefix: 'Reply transaction failed',
    },
  ]

  if(type) {
    errorMessage = prefixes.find( item => item.type === type).prefix
  }

  if(errorCode === -32000) {
    errorMessage += ', you have insufficient resource credit to make this transaction, please consider retrying after recharge or after powering up hive'
  }

  return errorMessage
}


const remarkable = new Remarkable()
export default remarkable

const remarkableStripper = md => {
  md.renderer.render = (tokens, options, env) => {
    let str = ''
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'inline') {
        str += md.renderer.render(tokens[i].children, options, env)
      } else {
        const content = tokens[i].content
        str += (content || '') + ' '
      }
    }
    return str
  }
}

remarkable.use(remarkableStripper)

const htmlCharMap = {
  amp: '&',
  quot: '"',
  lsquo: '‘',
  rsquo: '’',
  sbquo: '‚',
  ldquo: '“',
  rdquo: '”',
  bdquo: '„',
  hearts: '♥',
  trade: '™',
  hellip: '…',
  pound: '£',
  copy: '',
}

export const htmlDecode = txt => txt.replace(/&[a-z]+;/g, ch => {
  const char = htmlCharMap[ch.substring(1, ch.length - 1)]
  return char ? char : ch
})


export function extractBodySummary(body, stripQuotes = false) {
  let desc = body

  if (stripQuotes) desc = desc.replace(/(^(\n|\r|\s)*)>([\s\S]*?).*\s*/g, '')
  desc = remarkableStripper.render(desc)
  desc = sanitize(desc, { allowedTags: [] })
  desc = htmlDecode(desc)

  desc = desc.replace(/https?:\/\/[^\s]+/g, '')

  desc = desc.trim().split('\n')[0]

  if (desc.length > 200) {
    desc = desc.substring(0, 200).trim()
    desc = desc.substring(0, 180)
      .trim()
      //eslint-disable-next-line
      .replace(/[,!\?]?\s+[^\s]+$/, '…')
  }

  return desc
}

export const getProfileMetaData = (profile = {}) => {
  let cover = ''
  let name = ''
  let about = ''
  let website = ''
  if(
    'json_metadata' in profile
    && profile.json_metadata.includes('"profile":')
    && profile.json_metadata.includes('"cover_image":')
  ) {
    const meta = JSON.parse(profile.json_metadata)
    cover = meta.profile.cover_image
  }

  if(
    'posting_json_metadata' in profile
    && profile.posting_json_metadata.includes('"profile":')
    && profile.posting_json_metadata.includes('"cover_image":')
  ) {
    const meta = JSON.parse(profile.posting_json_metadata)
    cover = meta.profile.cover_image
  }

  if(
    'json_metadata' in profile
    && profile.json_metadata.includes('"profile":')
    && profile.json_metadata.includes('"name":')
  ) {
    const meta = JSON.parse(profile.json_metadata)
    name = meta.profile.name
  }

  if(
    'posting_json_metadata' in profile
    && profile.posting_json_metadata.includes('"profile":')
    && profile.posting_json_metadata.includes('"name":')
  ) {
    const meta = JSON.parse(profile.posting_json_metadata)
    name = meta.profile.name
  }

  if(
    'json_metadata' in profile
    && profile.json_metadata.includes('"profile":')
    && profile.json_metadata.includes('"about":')
  ) {
    const meta = JSON.parse(profile.json_metadata)
    about = meta.profile.about
  }

  if(
    'posting_json_metadata' in profile
    && profile.posting_json_metadata.includes('"profile":')
    && profile.posting_json_metadata.includes('"about":')
  ) {
    const meta = JSON.parse(profile.posting_json_metadata)
    about = meta.profile.about
  }

  if(
    'json_metadata' in profile
    && profile.json_metadata.includes('"profile":')
    && profile.json_metadata.includes('"website":')
  ) {
    const meta = JSON.parse(profile.json_metadata)
    website = meta.profile.website
  }

  if(
    'posting_json_metadata' in profile
    && profile.posting_json_metadata.includes('"website":')
  ) {
    const meta = JSON.parse(profile.posting_json_metadata)
    website = meta.profile.website
  }

  return {
    cover,
    name,
    about,
    website,
  }
}

export const redirectToUserProfile = () => {
  if(window.location.href.includes("@") && !window.location.href.includes("#/@")){
    const account = window.location.href.split("@")
    window.location = (`/#/@${account[1].replace("#/", "")}`)
  }
}

export const censorLinks = (content) => {
  const links = textParser.getUrls(content)
  let contentCopy = content

  links.forEach((item) => {
    contentCopy = contentCopy.replace(item, '<b>[link removed]</b>')
  })

  return contentCopy
}

export const parseUrls = (c) => {
  return c.match(/((http|ftp|https):\/\/)?([\w_-]+(?:(?:\.[\w_-])+))+([a-zA-Z]*[a-zA-Z]){1}?(\/+[\w.,@?^=%&:/~+!#-$-']*)*/gm) || []
}

export const truncateString = (str, num) => {
  if (str.length > num) {
    return str.slice(0, num) + "..."
  } else {
    return str
  }
}


export const proxyImage = (url) => {
  // const enabled = true
  const imageUrl = url

  // if(enabled) {
  //   if(!isGifImage(url)) {
  //     imageUrl = `https://wsrv.nl/?url=${url}&q=50`
  //     if(isImageUrl404(imageUrl)){
  //       imageUrl = url
  //     }
  //   }
  // }

  return imageUrl
}

export const isGifImage = (url) => {
  return url.endsWith('.gif')
}

export const isImageUrl404 = async (url) => {
  try {
    const response = await axios.head(url)
    return response.status === 404
  } catch (error) {
    return true
  }
}

export const getTheme =() => {
  const theme = JSON.parse(localStorage.getItem('customUserData'))?.settings?.theme
  let mode = ''

  if(theme && (theme === 'gray' || theme === 'night') ) {
    mode = theme
  } else {
    mode = 'light'
  }

  return mode
}