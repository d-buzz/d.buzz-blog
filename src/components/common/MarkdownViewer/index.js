import React from 'react'
import markdownLinkExtractor from 'markdown-link-extractor'
import textParser from 'npm-text-parser'
import classNames from 'classnames'
import { UrlVideoEmbed, LinkPreview } from 'components'
import { createUseStyles } from 'react-jss'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import { TweetSkeleton } from 'components'
import  remarkableStripper from 'services/helper'
import removeMd from 'remove-markdown'
import { renderContent, extractImageLinks, extractVideoLinks } from 'services/helper'

const useStyles = createUseStyles(theme => ({
  markdown: {
    // paddingTop: 20,
    marginTop: 15,
    marginBottom: 10,
    wordBreak: 'break-word !important',
    ...theme.markdown.paragraph,
    '& a': {
      wordWrap: 'break-word',
      color: '#d32f2f !important',
    },
    '& p': {
      wordWrap: 'break-word',
      fontSize: 14,
    },
    fontSize: '14 !important',
    '& blockquote': {
      // padding: '10px 12px',
      margin: 0,
      fontSize: 13,
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
  const mainTwitterRegex = /(?:https?:\/\/(?:(?:twitter\.com\/(.*?)\/status\/(.*))))/i
  const htmlReplacement = /<blockquote[^>]*?><p[^>]*?>(.*?)<\/p>.*?mdash; (.*)<a href="(https:\/\/twitter\.com\/.*?(.*?\/status\/(.*?))\?.*?)">(.*?)<\/a><\/blockquote>/i

  const links = textParser.getUrls(content)

  const matchData = content.match(htmlReplacement)
  if (matchData) {
    const id = matchData[5]
    let title = body
    title = title.replace(htmlReplacement, '')
    body = body.replace(body, `~~~~~~.^.~~~:twitter:${id}:~~~~~~.^.~~~`)
    body = `${title} ${body}`
  } else {
    links.forEach((link) => {
      try {
        link = link.replace(/&amp;/g, '&')
        let match = ''
        let id = ''

        if (link.match(mainTwitterRegex)) {
          match = link.match(mainTwitterRegex)
          id = match[2]
          if (link.match(/(?:https?:\/\/(?:(?:twitter\.com\/(.*?)\/status\/(.*)?=(.*))))/i)) {
            match = link.match(/(?:https?:\/\/(?:(?:twitter\.com\/(.*?)\/status\/(.*)?=(.*))))/i)
            id = match[2]
            id = id.slice(0, -2)
          }
          body = body.replace(link, `~~~~~~.^.~~~:twitter:${id}:~~~~~~.^.~~~`)
        }

        if (match) {
          const id = match[2]
          body = body.replace(link, `~~~~~~.^.~~~:twitter:${id}:~~~~~~.^.~~~`)
        }
      } catch(e) { }
    })
  }


  return body
}

const prepareVimmEmbeds = (content) => {
  const vimmRegex = /(?:https?:\/\/(?:(?:www\.vimm\.tv\/(.*?))))/i
  const vimmRegexEmbed = /(?:https?:\/\/(?:(?:www\.vimm\.tv\/(.*?)\/embed)))/i
  let body = content

  const links = textParser.getUrls(content)

  links.forEach((link) => {
    link = link.replace(/&amp;/g, '&')
    let match = ''
    let id = ''

    try {
      if (link.match(vimmRegex) && !link.includes('/view')){
        const data = link.split('/')
        match = link.match(vimmRegex)
        id = data[3]
        if (link.match(vimmRegexEmbed)){
          match = link.match(vimmRegexEmbed)
          id = match[1]
        }
      }

      if (match){
        body = body.replace(link, `~~~~~~.^.~~~:vimm:${id}:~~~~~~.^.~~~`)
      }
    } catch(error) { }
  })
  return body
}

const prepareThreeSpeakEmbeds = (content) => {
  let body = content
  const links = markdownLinkExtractor(content)

  links.forEach((link) => {
    try {
      link = link.replace(/&amp;/g, '&')
      let match = ''
      if (link.includes('3speak.online/watch?v')) {
        match = link.match(/(?:https?:\/\/(?:(?:3speak\.online\/watch\?v=(.*))))?/i)
      } else if (link.includes('3speak.co/watch?v')){
        match = link.match(/(?:https?:\/\/(?:(?:3speak\.co\/watch\?v=(.*))))?/i)
      }

      if (match) {
        const id = match[1]
        body = body.replace(link, `~~~~~~.^.~~~:threespeak:${id}:~~~~~~.^.~~~`)
      }
    } catch(error) { }
  })

  return body
}

const extractDescription = (content) => {
  let description = content.replace(/(^(\n|\r|\s)*)>([\s\S]*?).*\s*/g, '')
  description = description.replace(/https?:\/\/[^\s]+/g, '')
  description = description.replace(/[[(\]!]/g, '')

  description = remarkableStripper.render(description)

  description = removeMd(description, {
    stripListLeaders: true , 
    listUnicodeChar: '',  
    gfm: true, 
    useImgAltText: true,
  })


  const splitDescription = description.split(' ')


  splitDescription.forEach((item, index) => {
    if (item.includes('JPEG') || item.includes('jpg') || item.includes('png')) {
      splitDescription[index] = ''
    }
  })

  description = splitDescription.join(' ')

  if (description.length > 400) {
    description = `${description.substring(0, 400).trim()} ....`
  }

  return description
}


const render = (content, markdownClass, assetClass, scrollIndex, recomputeRowIndex, isPostList) => {
  if (isPostList) {
    const links = markdownLinkExtractor(content)
    const imageLinks = extractImageLinks(links)
    const videoLinks = extractVideoLinks(links)
    const description = extractDescription(content)
    let data = null

    if (imageLinks.length !== 0) {
      const rawData = imageLinks[0] + ' ' + description
      data = renderContent(rawData)
      data = data.toString()
    } else if (videoLinks.length !== 0) {
      const rawData = videoLinks[0] + ' ' + description
      data = renderContent(rawData)
      data = data.toString()
    }

    return <div
      key={`${new Date().getTime()}${scrollIndex}${Math.random()}`}
      className={classNames(markdownClass, assetClass)}
      dangerouslySetInnerHTML={{ __html: data }} 
    />
    
    
  } else {
    if (content.includes(':twitter:')) {
      const splitTwitter = content.split(':')
      return <TwitterTweetEmbed key={`${splitTwitter[2]}${scrollIndex}tweet`} tweetId={splitTwitter[2]} onLoad={() => recomputeRowIndex(scrollIndex)} placeholder={<TweetSkeleton />}/>
    } else if (content.includes(':threespeak:')) {
      const splitThreeSpeak = content.split(':')
      const url = `https://3speak.co/embed?v=${splitThreeSpeak[2]}`
      return <UrlVideoEmbed key={`${url}${scrollIndex}3speak`} url={url} />
    } else if (content.includes(':vimm:')){
      const splitVimm = content.split(':')
      const url = `https://www.vimm.tv/${splitVimm[2]}/embed?autoplay=0`
      return <UrlVideoEmbed key={`${url}${scrollIndex}vimm`} url={url} />
    } else {
      let safeHtmlString = ''

      safeHtmlString = renderContent(content)  
      
      return <div
        key={`${new Date().getTime()}${scrollIndex}${Math.random()}`}
        className={classNames(markdownClass, assetClass)}
        dangerouslySetInnerHTML={{__html: safeHtmlString || ''}} 
      />
    }
  }
 
}

const MarkdownViewer = React.memo((props) => {
  const classes = useStyles()
  const {
    isPostList = false,
    minifyAssets = true,
    scrollIndex = -1,
    recomputeRowIndex = () => {},
  } = props
  let { content = '' } = props
  const original = content

  const links = textParser.getUrls(content)

  links.forEach((link) => {
    try {
      link = link.replace(/&amp;/g, '&')

      if (link.includes('twitter.com')) {
        content = prepareTwitterEmbeds(content)
      } else if (link.includes('3speak.co') || link.includes('3speak.online')) {
        content = prepareThreeSpeakEmbeds(content)
      } else if (link.includes('www.vimm.tv')) {
        content = prepareVimmEmbeds(content)
      }

    } catch(error) { }
  })


  let assetClass = classes.minified

  if (!minifyAssets) {
    assetClass = classes.full
  }
  let splitContent = content.split(`~~~~~~.^.~~~`)
  splitContent = splitContent.filter((item) => item !== '')

  return (
    <React.Fragment>
      {splitContent.map((item) => (
        render(item, classes.markdown, assetClass, scrollIndex, recomputeRowIndex, isPostList)
      ))}
      <LinkPreview content={original} scrollIndex={scrollIndex} recomputeRowIndex={recomputeRowIndex} />
    </React.Fragment>
  )
})

export default MarkdownViewer