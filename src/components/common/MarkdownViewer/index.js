import React from 'react'
import { DefaultRenderer } from 'steem-content-renderer'
import markdownLinkExtractor from 'markdown-link-extractor'
import textParser from 'npm-text-parser'
import classNames from 'classnames'
import {
  UrlWithImageAndVideoEmbed,
  TweetSkeleton,
} from 'components'
import { createUseStyles } from 'react-jss'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import { parseUrls, generateUniqueId } from 'services/helper'
import { FacebookEmbed, TikTokEmbed } from "react-social-media-embed"

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

const useStyles = createUseStyles(theme => ({
  markdown: {
    wordBreak: 'break-word !important',
    ...theme.markdown.paragraph,
    '& a': {
      wordWrap: 'break-word',
      // color: '#d32f2f !important',
    },
    '& p': {
      wordWrap: 'break-word',
      fontSize: 20,
    },
    '& em': {
      wordWrap: 'break-word',
      fontSize: 20,
    },
    '& h1': {
      wordWrap: 'break-word',
      fontSize: 32,
    },
    '& h2': {
      wordWrap: 'break-word',
      fontSize: 32,
    },
    '& h3': {
      wordWrap: 'break-word',
      fontSize: 31,
    },
    '& h4': {
      wordWrap: 'break-word',
      fontSize: 30,
    },
    '& h5': {
      wordWrap: 'break-word',
      fontSize: 28,
    },
    fontSize: '20 !important',
    '& blockquote': {
      padding: '10px 12px',
      margin: '0 0 20px',
      fontSize: 20,
      borderLeft: '5px solid #eee',
    },
  },
  preview: {
    marginBottom: 10,
  },
  minified: {
    '& img': {
      height: 300,
      width: '100%',
      objectFit: 'cover',
      marginTop: 5,
      border: theme.border.primary,
    },
    '& iframe': {
      height: 300,
      width: '100%',
      border: theme.border.primary,
    },
    '@media (max-width: 768px)': {
      '& img': {
        height: '190px !important',
      },
      '& iframe': {
        height: '190px !important',
      },
    },
  },
  full: {
    '& iframe': {
      width: '100%',
      border: theme.border.primary,
    },
    '& img': {
      width: '100%',
      marginTop: 5,
      border: theme.border.primary,
    },
  },
  modalAssets: {
    '& iframe': {
      height: 288,
      width: 550,
      border: '1px solid #ccd6dd',
    },
    '& img': {
      height: 288,
      width: 550,
      objectFit: 'cover',
      marginTop: 5,
      border: '1px solid #ccd6dd',
    },
  },
}))

const prepareTwitterEmbeds = (content) => {
  let body = content
  const links = textParser.getUrls(content)

  links.forEach((link) => {
    try {
      // Use a regular expression to extract the numeric identifier
      const match = link.match(/\/status\/(\d+)/)
      console.log('prepareTwitterEmbeds', match)

      if (match) {
        const id = match[1]
        body = body.replace(link, `~~~~~~.^.~~~:twitter:${id}:~~~~~~.^.~~~`)
      }
    } catch (e) { }
  })

  return body
}

const prepareVimmEmbeds = (content) => {
  const vimmRegex = /https?:\/\/www\.vimm\.tv\/(.*?)/i
  const vimmRegexEmbed = /https?:\/\/www\.vimm\.tv\/(.*?)\/embed/i
  let body = content

  const links = textParser.getUrls(content)

  links.forEach((link) => {
    link = link.replace(/&amp;/g, '&')
    let match = ''
    let id = ''

    try {
      if (link.match(vimmRegex) && !link.includes('/view')) {
        const data = link.split('/')
        match = link.match(vimmRegex)
        id = data[3]
        if (link.match(vimmRegexEmbed)) {
          match = link.match(vimmRegexEmbed)
          id = match[1]
        }
      }

      if (match) {
        body = body.replace(link, `~~~~~~.^.~~~:vimm:${id}:~~~~~~.^.~~~`)
      }
    } catch (error) { }
  })
  return body
}

const prepareThreeSpeakEmbeds = (content) => {
  try {
    const link = (/\[!\[.*]\(.*\)]\(.*\)/).exec(content)

    // check if there is hyperlink with embedded image
    if (link) {
      const linkRegex = /\[!\[(.*?)]\((.*?)\)]\((.*?)\)/
      const bodyMatch = content.match(linkRegex)
      const [wholeLink, , , videoLink] = bodyMatch
      const platformMatch = videoLink.match(/(?:https?:\/\/(?:3speak\.online|3speak\.co|3speak\.tv)\/watch\?v=(.*))?/i)

      if (platformMatch) {
        console.log('platformMatch', platformMatch)
        const id = platformMatch[1]
        return content.replace(wholeLink, `~~~~~~.^.~~~:threespeak:${id}:~~~~~~.^.~~~`)
      }
    } else { // this should filter all the hyperlink and normal link
      const plainTextRegex = /https?:\/\/(?:3speak\.online|3speak\.co|3speak\.tv)\/watch\?v=([^\s()]+)/i
      const plainTextMatch = content.match(plainTextRegex)

      if (plainTextMatch[0] === plainTextMatch.input) {
        console.log('plainTextMatches', plainTextMatch)

        if (plainTextMatch) {
          const id = plainTextMatch[1]
          return content.replace(plainTextRegex, `~~~~~~.^.~~~:threespeak:${id}:~~~~~~.^.~~~`)
        }
      }
    }
  } catch (error) {}

  return content
}

const prepareRumbleEmbed = (content) => {
  const rumbleRegex = /https?:\/\/rumble\.com\/(.*?)/i
  const rumbleRegexEmbed = /https?:\/\/rumble\.com\/embed\/(.*?)/i
  let body = content

  const links = textParser.getUrls(content)

  links.forEach((link) => {
    link = link.replace(/&amp;/g, '&')
    let match = ''
    let id = ''

    try {
      if (link.match(rumbleRegex)) {
        const data = link.split('/')
        match = link.match(rumbleRegex)
        id = data[4]
        if (link.match(rumbleRegexEmbed)) {
          match = link.match(rumbleRegexEmbed)
          const input = match['input']
          const data = input.split('/')
          id = data[4]
        }
      }
      if (!id) {
        id = ''
      }

      if (match) {
        body = body.replace(link, `~~~~~~.^.~~~:rumble:${id}:~~~~~~.^.~~~`)
      }
    } catch (error) { }
  })

  return body
}


const prepareLbryEmbeds = (content) => {
  const lbryRegex = /(?:https?:\/\/(?:(?:lbry\.tv)))/i
  const lbry1Regex = /(?:https?:\/\/(?:(?:open\.lbry\.com)))/i
  const lbryRegexEmbed = /(?:https?:\/\/(?:(?:lbry\.tv\/.*?\/embed\/(.*?))))/i
  let body = content

  const links = markdownLinkExtractor(content)

  links.forEach((link) => {
    try {
      link = link.replace(/&amp;/g, '&')
      let match = ''
      let id = ''

      if (link.match(lbryRegex) || link.match(lbry1Regex)) {
        const data = link.split('/')
        match = link.match(lbryRegex) ? link.match(lbryRegex) : link.match(lbry1Regex)
        if (data[4]) {
          const data1 = data[4].split(':')
          id = data1[0]
        }

        if (link.match(lbryRegexEmbed)) {
          match = link.split('/')
          id = match[5]
        }
      }

      if (match) {
        body = body.replace(link, `~~~~~~.^.~~~:lbry:${id}:~~~~~~.^.~~~`)
      }
    } catch (error) { }
  })
  return body
}

const prepareBitchuteEmbeds = (content) => {
  const bitchuteRegex = /(?:https?:\/\/(?:(?:www\.bitchute\.com\/(.*?))))/i
  const bitchuteRegexEmbed = /(?:https?:\/\/(?:(?:www\.bitchute\.com\/embed\/(.*?))))/i
  let body = content

  const links = textParser.getUrls(content)

  links.forEach((link) => {
    link = link.replace(/&amp;/g, '&')
    let match = ''
    let id = ''

    try {
      if (link.match(bitchuteRegex)) {
        const data = link.split('/')
        match = link.match(bitchuteRegex)
        id = data[4]
        if (link.match(bitchuteRegexEmbed)) {
          match = link.match(bitchuteRegexEmbed)
          const input = match['input']
          const data = input.split('/')
          id = data[4]
        }
      }

      if (!id) {
        id = ''
      }

      if (match) {
        body = body.replace(link, `~~~~~~.^.~~~:bitchute:${id}:~~~~~~.^.~~~`)
      }
    } catch (error) { }
  })
  return body
}

const prepareBannedEmbeds = (content) => {
  const bannedRegex = /https?:\/\/banned\.video\/watch\?id=(.*)/i

  let body = content

  const links = parseUrls(content)

  links.forEach((link) => {
    try {
      link = link.replace(/&amp;/g, '&')
      let match = ''
      let id = ''

      if (link.match(bannedRegex)) {
        const data = link.split('?id=')
        match = link.match(bannedRegex)
        if (data[1]) {
          id = data[1]
        }
      }

      if (match) {
        body = body.replace(link, `~~~~~~.^.~~~:banned:${id}:~~~~~~.^.~~~`)
      }
    } catch (error) { }
  })

  return body
}

const prepareDollarVigilanteEmbeds = (content) => {
  const dollarVigilanteRegex = /https?:\/\/(www\.)?vigilante\.tv\/w\/(.*)/i

  let body = content

  const links = parseUrls(content)
  links.forEach((link) => {
    try {
      link = link.replace(/&amp;/g, '&')
      let match = ''
      let id = ''

      if (link.match(dollarVigilanteRegex)) {
        const data = link.split('/')
        match = link.match(dollarVigilanteRegex)
        if (data[4]) {
          id = data[4]
        }
      }

      if (match) {
        body = body.replace(link, `~~~~~~.^.~~~:dollarvigilante:${id}:~~~~~~.^.~~~`)
      }
    } catch (error) { }
  })

  return body
}

const prepareSoundCloudEmbeds = (content) => {
  const soundcloudRegex = /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/
  let body = content

  const links = parseUrls(content)

  links.forEach((link) => {
    link = link.replace(/&amp;/g, '&')
    let match = ''
    let id = ''

    try {
      if (link.match(soundcloudRegex)) {
        const data = link.split('/')
        match = link.match(soundcloudRegex)
        id = `${data[3]}/${data[4]}`
      }

      if (!id) {
        id = ''
      }

      if (match) {
        body = body.replace(link, `~~~~~~.^.~~~:soundcloud:${id}:~~~~~~.^.~~~`)
      }
    } catch (error) { }
  })

  return body
}

const prepareFacebookEmbeds = (content) => {
  let body = content

  const links = parseUrls(content)

  links.forEach((link) => {
    try {
      body = body.replace(link, `~~~~~~.^.~~~:facebook:${link}:~~~~~~.^.~~~`)
    } catch (error) { }
  })

  return body
}

const prepareTiktokEmbeds = (content) => {
  let body = content
  const links = parseUrls(content)

  links.forEach((link) => {
    body = body.replace(link, `~~~~~~.^.~~~:tiktok:${link}:~~~~~~.^.~~~`)
  })

  return body
}

const render = (content, markdownClass, assetClass, scrollIndex, recomputeRowIndex) => {
  const splitContent = content.split(':')
  const embedTypes = [
    ':threespeak:',
    ':vimm:',
    ':rumble:',
    ':lbry:',
    ':bitchute:',
    ':banned:',
    ':dollarvigilante:',
    ':soundcloud:',
    // ':facebook:',
    // ':tiktok:',
  ]

  if (content.includes(':twitter:')) {
    try {
      return (
        <TwitterTweetEmbed
          key={`${splitContent[1]}${scrollIndex}${generateUniqueId()}`}
          tweetId={splitContent[2]}
          onLoad={() => recomputeRowIndex(scrollIndex)}
          placeholder={<TweetSkeleton />}
        />
      )
    } catch (e) {
      console.log(e)
    }
  } else if (content.includes(':facebook:')) {
    return <FacebookEmbed
      key={`${splitContent[1]}${splitContent[2]}${generateUniqueId()}`}
      url={`${splitContent[2]}:${splitContent[3]}`}
    />
  } else if (content.includes(':tiktok:')) {
    return <TikTokEmbed
      key={`${splitContent[1]}${splitContent[2]}${generateUniqueId()}`}
      url={`${splitContent[2]}:${splitContent[3]}`}
    />
  } else if (embedTypes.some(type => content.includes(type))) {
    const embed = {
      app: splitContent[1],
      id: splitContent[2],
      domain: '',
    }
    return <UrlWithImageAndVideoEmbed key={`${splitContent[1]}${splitContent[2]}${generateUniqueId()}`} embed={embed} />
  } else {
    // render normally
    return (
      <div
        key={`${new Date().getTime()}${scrollIndex}${Math.random()}`}
        className={classNames(markdownClass, assetClass)}
        dangerouslySetInnerHTML={{ __html: renderer.render(content) }}
      />
    )
  }
}


const MarkdownViewer = React.memo((props) => {
  const classes = useStyles()
  const {
    minifyAssets = true,
    scrollIndex = -1,
    recomputeRowIndex = () => { },
  } = props
  const { content = '' } = props

  let assetClass = classes.minified

  if (!minifyAssets) {
    assetClass = classes.full
  }

  let splitContent = content.split(`\n`)

  splitContent = splitContent.map((item, index) => {
    if (item.includes('twitter.com') || item.includes('x.com')) {
      item = prepareTwitterEmbeds(item)
    } else if (item.includes('3speak.co') || item.includes('3speak.online') || item.includes('3speak.tv')) {
      item = prepareThreeSpeakEmbeds(item)
    // } else if (item.includes('vimm.tv') || item.includes('Vimm.tv')) {
    //   item = prepareVimmEmbeds(item)
    } else if (item.includes('rumble.com')) {
      item = prepareRumbleEmbed(item)
    } else if (item.includes('lbry.tv') || item.includes('open.lbry.com')) {
      item = prepareLbryEmbeds(item)
    } else if (item.includes('bitchute.com')) {
      item = prepareBitchuteEmbeds(item)
    } else if (item.includes('banned.video')) {
      item = prepareBannedEmbeds(item)
    } else if (item.includes('vigilante.tv')) {
      item = prepareDollarVigilanteEmbeds(item)
    } else if (item.includes('soundcloud.com')) {
      item = prepareSoundCloudEmbeds(item)
    } else if (item.includes('facebook.com') || item.includes('fb.watch')) {
      item = prepareFacebookEmbeds(item)
    } else if (item.includes('tiktok.com')) {
      item = prepareTiktokEmbeds(item)
    // } else if (item.includes('odysee.com')) {
    //   item = prepareOdyseeEmbeds(item)
    // } else if (item.includes('music.apple.com')) {
    //   item = prepareAppleEmbeds(item)
    // } else if (item.includes('d.tube')) {
    //   item = prepareDTubeEmbeds(item)
    // } else if (item.includes('dbuzz_video')) {
    //   item = prepareDBuzzVideos(item)
    // } else if (hiveTubePattern.test(link)) {
    //   item = prepareHiveTubeVideoEmbeds(item)
    // } else if (buzzImagesPattern.test(link)) {
    //   item = prepareBuzzImages(item)
    }

    return item
  })

  const combinedString = splitContent.join('\n')

  console.log('splitContent', splitContent)
  console.log('combinedString', combinedString)

  splitContent = combinedString.split(`~~~~~~.^.~~~`)
  splitContent = splitContent.filter((item) => item !== '')

  return (
    <React.Fragment>
      {splitContent.map((item) => (
        render(item, classes.markdown, assetClass, scrollIndex, recomputeRowIndex)
      ))}
      {/* <LinkPreview content={original} scrollIndex={scrollIndex} recomputeRowIndex={recomputeRowIndex} /> */}
    </React.Fragment>
  )
})

export default MarkdownViewer
