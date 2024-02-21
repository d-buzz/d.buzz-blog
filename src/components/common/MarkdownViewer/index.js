import React from 'react'
import { DefaultRenderer } from 'steem-content-renderer'
import markdownLinkExtractor from 'markdown-link-extractor'
import textParser from 'npm-text-parser'
import classNames from 'classnames'
import {
  UrlVideoEmbed,
  UrlWithImageAndVideoEmbed,
  TweetSkeleton,
} from 'components'
import { createUseStyles } from 'react-jss'
import { TwitterTweetEmbed } from 'react-twitter-embed'

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
  const rumbleRegex = /(?:https?:\/\/(?:(?:rumble\.com\/(.*?))))/i
  const rumbleRegexEmbed = /(?:https?:\/\/(?:(?:rumble\.com\/embed\/(.*?))))/i
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

const render = (content, markdownClass, assetClass, scrollIndex, recomputeRowIndex) => {

  if (content.includes(':twitter:')) {
    const splitTwitter = content.split(':')
    try {
      return <TwitterTweetEmbed
        key={`${splitTwitter[2]}${scrollIndex}`}
        tweetId={splitTwitter[2]}
        onLoad={() => recomputeRowIndex(scrollIndex)}
        placeholder={<TweetSkeleton/>}
      />
    } catch (e) {
      console.log(e)
    }
  } else if (content.includes(':threespeak:')) {
    const splitThreeSpeak = content.split(':')
    const embed = {
      app: splitThreeSpeak[1],
      id: splitThreeSpeak[2],
    }
    return <UrlWithImageAndVideoEmbed key={`${content}${splitThreeSpeak[2]}url-embed`} embed={embed} />
  } else if (content.includes(':vimm:')) {
    const splitVimm = content.split(':')
    const embed = {
      app: splitVimm[1],
      id: splitVimm[2],
      domain: `https://www.vimm.tv/${splitVimm[2]}/embed?autoplay=0`,
    }
    return <UrlWithImageAndVideoEmbed key={`${content}${splitVimm[2]}url-embed`} embed={embed} />
  } else if (content.includes(':rumble:')) {
    const splitRumble = content.split(':')
    if (splitRumble[2]) {
      const url = `https://rumble.com/embed/${splitRumble[2]}`
      return <UrlVideoEmbed key={`${content}${scrollIndex}rumble`} url={url} />
    }
  } else if (content.includes(':lbry:')) {
    const splitLbry = content.split(':')
    const url = `https://lbry.tv/$/embed/${splitLbry[2]}`
    return <UrlVideoEmbed key={`${url}${scrollIndex}lbry`} url={url} />
  } else if (content.includes(':bitchute:')) {
    const splitBitchute = content.split(':')
    const url = `https://www.bitchute.com/embed/${splitBitchute[2]}`
    return <UrlVideoEmbed key={`${url}${scrollIndex}bitchute`} url={url} />
  } else if (content.includes(':facebook:')) {
    const splitFacebook = content.split(':')
    const url = splitFacebook[4] ? `https:${splitFacebook[3]}` : `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F${splitFacebook[2]}%2Fvideos%2F${splitFacebook[3]}&width=500&show_text=false&height=300`
    return <UrlVideoEmbed key={`${url}${scrollIndex}facebook`} url={url} />
  } else {
    // render normally
    return <div
      key={`${new Date().getTime()}${scrollIndex}${Math.random()}`}
      className={classNames(markdownClass, assetClass)}
      dangerouslySetInnerHTML={{ __html: renderer.render(content) }}
    />
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
  // const links = textParser.getUrls(content)

  // links.forEach((link, index) => {
  //   try {
  //     link = link.replace(/&amp;/g, '&')
  //     console.log(`link from parser ${index}`, link)
  //     if (link.includes('twitter.com')) {
  //       content = prepareTwitterEmbeds(content)
  //     } else if (link.includes('3speak.co') || link.includes('3speak.online') || link.includes('3speak.tv')) {
  //       content = prepareThreeSpeakEmbeds(content)
  //     } else if (link.includes('vimm.tv') || link.includes('Vimm.tv')) {
  //       content = prepareVimmEmbeds(content)
  //     } else if (link.includes('rumble.com')) {
  //       content = prepareRumbleEmbed(content)
  //     } else if (link.includes('lbry.tv') || link.includes('open.lbry.com')) {
  //       content = prepareLbryEmbeds(content)
  //     } else if (link.includes('www.bitchute.com')) {
  //       content = prepareBitchuteEmbeds(content)
  //     }
  //   } catch (error) { }
  // })

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
    } else if (item.includes('vimm1.tv') || item.includes('Vimm1.tv')) {
      item = prepareVimmEmbeds(item)
    } else if (item.includes('rumble.com')) {
      item = prepareRumbleEmbed(item)
    } else if (item.includes('lbry.tv') || item.includes('open.lbry.com')) {
      item = prepareLbryEmbeds(item)
    } else if (item.includes('www.bitchute.com')) {
      item = prepareBitchuteEmbeds(item)
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
