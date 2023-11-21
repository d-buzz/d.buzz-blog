import classNames from "classnames"
import React, { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import { createUseStyles } from 'react-jss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { isMobile, isDesktop } from 'react-device-detect'
import { CloseIcon } from '../../elements'
import {useHistory} from 'react-router-dom'

import {
  setPostRequest,
  uploadFileRequest,
} from 'store/posts/actions'
import Renderer from "../../common/Renderer"
import UploadIcon from "../../elements/Icons/UploadIcon"
import PlusIcon from "../../elements/Icons/PlusIcon"
import GifIcon from "../../elements/Icons/GifIcon"
import EmojiIcon2 from "../../elements/Icons/EmojiIcon2"
import heic2any from 'heic2any'
import { useRef } from "react"
import ImagesContainer from "../../ImagesContainer"

const useStyles = createUseStyles(theme => ({
  marginLeft0:{
    marginLeft: 0,
  },
  marginRight0:{
    marginRight: 0,
  },
  displayFlex:{
    display: 'flex',
  },
  displayNone:{
    display: 'none',
  },
  justifyContentCenter:{
    justifyContent: 'center',
  },
  justifyContentStart:{
    justifyContent: 'start',
  },
  alignItemsCenter:{
    alignItems: 'center',
  },
  alignItemsStart:{
    alignItems: 'start',
  },
  minWidth100:{
    minWidth: '100%',
  },
  backgroundColore5:{
    background: 'white',
  },
  borderNone: {
    border: 0,
  },
  fontSize21:{
    fontSize: 21,
  },
  lineHeight158: {
    lineHeight: '1.58',
  },
  fontWeight400:{
    fontWeight: '400',
  },
  marginTop10:{
    marginTop: 10,
  },
  letterSpacing3em:{
    letterSpacing: '-.003em',
  },
  paddingTop16: {
    paddingTop: 16,
  },
  fontSize42: {
    fontSize:42,
  },
 
  lineHeight125:{
    lineHeight:1.25,
  },
  width40: {
    width: 40,
  },
  width45: {
    width: 42,
  },
  height40: {
    height: 40,
  },
  border1: {
    border: '1px solid',
  },
  borderRadius50:{
    borderRadius:'50%',
  },
  marginRight20:{
    marginRight: 20,
  },
  marginRight10:{
    marginRight: 10,
  },
  margin10: {
    margin: '10px',
  },
  margin1x2:{
    margin: '1px 2px',
  },
  marginTop0: {
    marginTop: '0px',
  },
  width80:{
    width: '80px',
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  flexDirectionRow:{
    flexDirection:"row",
  },
  flexDirectionColumn:{
    flexDirection:"column-reverse",
  },
  paddingLeft50:{
    paddingLeft: '50px',
  },
  flexGrow1:{
    flexGrow: 1,
  },
  marginBottom0:{
    marginBottom: '0 !important',
  },
  positionRelative:{
    position: 'relative',
  },
  positionAbsolute:{
    position: 'absolute',
  },
  top0:{
    top: '0',
  },
  left60:{
    left: '60px',
  },
  backgroundWhite:{
    backgroundColor: 'white',
  },
  maxWidthUnset:{
    maxWidth: 'unset',
  },
  backgroundColorfff:{
    backgroundColor: '#fff',
  },
  border1solidccc:{
    border: '1px solid #ccc',
  },
  padding4:{
    padding: '4px',
  },
  flexWrapWrap: {
    flexWrap: 'flex',
  },
  width100:{
    width: '100%',
  },
  lineHeight1em:{
    lineHeight: '1em',
  },
  margin0:{
    margin: 0,
  },
  padding0:{
    padding: 0,
  },
  listStyleTypeNone:{
    listStyleType: 'none',
  },
  bg999:{
    backgroundColor: '#999',
  },
  colorfff:{
    color: '#fff',
  },
  borderRadius2:{
    borderRadius: '2px',
  },
  padding3x5:{
    padding: '3px 5px',
  },
  fontSize085em:{
    fontSize: '.85em',
  },
  boxSizingBorderBox: {
    boxSizing: 'border-box',
  },
  borderColor999:{
    borderColor:'#999',
  },
  padding2:{
    padding: '2px',
  },
  padding2x5:{
    padding: '2px 5px',
  },
  marginLeft2:{
    marginLeft:"2px",
  },
  fontSize1p15em:{
    fontSize: '1.15em',
  },
  flex1x0xauto:{
    flex: '1 0 auto',
  },
  margin2:{
    margin: '2px',
  },
  fontSizep85em:{
    fontSize: '.85em',
  },
  minWidth100px:{
    minWidth: '100px',
  },
  color757575:{
    color: '#757575',
  },
  colorRed:{
    color: 'red',
  },
  fontSize12:{
    fontSize: '12px',
  },
  border1soliddarkgray:{
    border: '0px solid darkgray',
    // border: '1px solid darkgray',
  },
  marginBottom10:{
    marginBottom: '10px',
  },
  borderRadius7:{
    borderRadius:'7px',
  },
  padding10:{
    padding: '10px',
  },
  paddingTop0:{
    paddingTop: 0,
  },
  imageUploadInput: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: '0 auto',
    cursor: 'pointer',
    visibility: isDesktop? 'hidden':'0',
    opacity: 0,
  },
  uploadImageButton: {
    positions: 'relative',
    display: 'flex',
    margin: '0 !important',
    width: 'fit-content',
    height: 'fit-content',
    cursor: 'pointer',
    overflow: 'hidden',
  },
}))
const Post = (props) => {
  const {
    uploadFileRequest,
    setPostRequest,
  } = props
  const history = useHistory()
  const classes = useStyles()
  // eslint-disable-next-line
  const [showTitleButton, setShowTitleButton] = useState(false)
  const [showDescButton, setShowDescButton] = useState(true)
  const [postContent, setpostContent] = useState('')
  const [titleContent, settitleContent] = useState('')
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState('')
  const [tagError, settagError] = useState(false)
  const [showUploadIcon, setshowUploadIcon] = useState(false)
  const [buzzAttachedImages, setBuzzAttachedImages] = useState([])

  const [compressing, setCompressing] = useState(false)
  const buzzAllowedImages = 4
  // eslint-disable-next-line
  const [imagesLength, setImagesLength] = useState(0)
  // eslint-disable-next-line
  const [imageSize, setImageSize] = useState(0)
  const [imageUploading, setImageUploading] = useState(false)
  // eslint-disable-next-line
  const [imageUploadProgress, setImageUploadProgress] = useState(0)
  // eslint-disable-next-line
  const [currentBuzz, setCurrentBuzz] = useState(1)
  // eslint-disable-next-line
  const [viewImageUrl, setViewImageUrl] = useState('')
  // eslint-disable-next-line
  const [videoLimit, setVideoLimit] = useState(false)
  const [videoUploading] = useState(false)
  // eslint-disable-next-line
  const [buzzLoading, setBuzzLoading] = useState(false)

  const inputRefFileUpload = useRef(null)

  const handleImageCompression = async (image) => {
    let compressedFile = null

    setImageUploading(true)

    const MAX_SIZE = 500 * 1024

    const options = {
      maxSizeMB: MAX_SIZE / (1024 * 1024),
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    }
    try {
      await import('browser-image-compression').then(async ({default: imageCompression}) => {
        compressedFile = await imageCompression(image, options)
      })
    } catch (error) {
      console.log(error)
    }

    return compressedFile !== null && compressedFile
  }

  useEffect(() => {
    let tagspec = false
    tags.map((tag) => {
      var format = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
  
      if(format.test(tag) ){
        tagspec = true
      }
      return true
    })
    if (tagspec) {
      settagError(true)
    }else{
      settagError(false)
    }
    
  }, [tags])

  const handleClickContent = (e) => {
    try {
      const {target} = e
      let {href} = target
      const hostname = window.location.hostname

      e.preventDefault()
      if (href && !href.includes(hostname)) {
        window.open(href, '_blank')
      } else {
        const split = `${href}`.split('#')
        if (split.length === 2) {
          href = `${split[1]}`
        } else {
          const split = `${href}`.split('/')
          href = split[3] ? `/${split[3]}` : '/'
        }
        if (href !== '' && href !== undefined) {
          history.push(href)
        }
      }
    } catch (e) {
    }
  }

  const updateFromDesc = () => {
    setShowTitleButton(false)
    setShowDescButton(true)
  }
  const removeTag = (tagREmove) => {
    setTags(current => current.filter(oldtag => {
      return oldtag !== tagREmove
    }))
    const tagsFILTER = tags.filter(old => {
      return old !== tagREmove
    })
    const payout = 1
    const buzzPermlink = null
    setPostRequest(titleContent,postContent,tagsFILTER,payout,buzzPermlink)
  }
  const onkeydownTags = (e) => {
    let newtags = []
    if ((e.keyCode === 13 || e.keyCode === 188 || e.keyCode === 32) && (tags.length < 10)) {
      const data = e.target.value.replace(/,*$/, '')
      setTags([...tags, data])
      newtags = [...tags, data]
      // setPostRequest(postContent,tags,payout,buzzPermlink)
      setTag("")
      const payout = 1
      const buzzPermlink = null
      setPostRequest(titleContent,postContent,newtags,payout,buzzPermlink)
    }    
   
  }
  const updateTitle = (e) =>{
    settitleContent(e.target.value)
    const payout = 1
    const buzzPermlink = null
    setPostRequest(e.target.value,postContent,tags,payout,buzzPermlink)
  }
  const updateContent = (e) =>{
    setpostContent(e.target.value)
    const payout = 1
    const buzzPermlink = null
    setPostRequest(titleContent,e.target.value,tags,payout,buzzPermlink)
  }

  
  const handleFileSelectChange = async (event) => {

    const images = Array.from(event.target.files)
    const allImages = [...images.filter(image => image.type !== 'image/heic')]
    const heicImages = images.filter(image => image.type === 'image/heic')
    const uploadedImages = []

    const remainingImageUploads = (4 - buzzAttachedImages.length) >= 0 ? (4 - buzzAttachedImages.length) : 0

    Promise.all(
      heicImages.map(async (image) => {
        setCompressing(true)

        const pngBlob = await heic2any({
          blob: image,
          toType: 'image/png',
          quality: 1,
        })

        allImages.push(
          new File([pngBlob], image.name.replace('.heic', ''), {type: 'image/png', size: pngBlob.size}),
        )
      }),
    )
      .then(async () => {
        
        setCompressing(false)

        if ((allImages.length + buzzAttachedImages.length) <= buzzAllowedImages) {
          
          setImagesLength(images.length)

          await Promise.all(
            allImages.map(async (image) => {
              // calculate image file size
              const fileSize = image.size / 1e+6
              setImageSize(Number(fileSize.toFixed(2)))

              // handle image compression and then upload it
              setCompressing(true)
              await handleImageCompression(image).then((uri) => {
               
                setCompressing(false)
                setImageSize(Number((uri.size / 1e+6).toFixed(2)))
               
                uploadFileRequest(uri, setImageUploadProgress).then((image) => {
                  const lastImage = image[image.length - 1]
                  uploadedImages.push(lastImage)

                  if (uploadedImages.length === allImages.length) {
                    setImageUploading(false)
                    setBuzzAttachedImages(images => [...images, ...uploadedImages])
                    document.getElementById('file-upload').value = ''
                    setshowUploadIcon(current => {return !current})

                    // set the thread if its the thread
                    // if (Object.keys(buzzThreads).length > 1) {
                    //   setIsThread(true)
                    //   setThreadCount(Object.keys(buzzThreads).length)
                    // }
                    setImageSize(0)
                    setImagesLength(0)
                  }
                })
              })
            }),
          )
        } else {
          alert(`You can only upload 4 images per buzz \n\n Please only upload remaining ${remainingImageUploads <= 1 ? `${remainingImageUploads} image` : `${remainingImageUploads} images`}`)
        }
      })

  }

  const clickFile = () =>{
    console.log('test upload')
    inputRefFileUpload.current.click()
  }

  useEffect(() => {
    const buzzContent = buzzAttachedImages.length >= 1 ? postContent + '\n' + buzzAttachedImages.toString().replace(/,/gi, ' ') : postContent
    // eslint-disable-next-line
    const rawBuzzContent = buzzContent
    // setpostContent(rawBuzzContent)
    // setBuzzContentStripped(stripHtml(rawBuzzContent))
  }, [buzzAttachedImages, postContent])
  return (
    <Container>
      <form>
        <div className={classNames(classes.displayFlex, classes.justifyContentStart, classes.alignItemsStart)}>
          <div   className={classNames(classes.marginRight20, classes.width40 )}></div>
          <input autoFocus value={titleContent}  onChange={(e) => updateTitle(e)}  rows={10} cols={50}  placeholder="Title" className={classNames(classes.backgroundColore5, classes.borderNone, classes.fontSize21, classes.lineHeight158, classes.fontWeight400, classes.letterSpacing3em, classes.border1soliddarkgray, classes.marginBottom10, classes.borderRadius7, classes.padding10, classes.width100 )} />
        </div>
        <div className={classNames(isMobile? classes.flexDirectionColumn:'', isMobile?classes.paddingLeft50:'', classes.displayFlex, classes.justifyContentStart, classes.alignItemsStart)}>
          <div className={classNames(classes.positionRelative, classes.cursorPointer  )}> 
            <div onClick={() => setshowUploadIcon(current => {return !current})}  className={classNames( classes.cursorPointer, classes.width45, classes.height40, showDescButton?classes.border1:'', classes.borderRadius50, !isMobile? classes.marginRight20:'', isMobile? classes.margin10:'', isMobile?classes.marginTop0:'', isMobile?classes.width40:classes.width45, classes.displayFlex, classes.justifyContentCenter, classes.alignItemsCenter)}> <PlusIcon/></div>
            {showUploadIcon && (
              <div className={classNames(classes.displayFlex, classes.positionAbsolute, classes.top0, classes.left60, classes.backgroundWhite)}>
                <div onTouchStart={() => clickFile} onClick={() => clickFile()}    className={classNames( classes.cursorPointer, classes.height40, showDescButton?classes.border1:'', classes.borderRadius50, !isMobile? classes.marginRight10:'', isMobile? classes.margin10:'', isMobile?classes.marginTop0:'', isMobile?classes.width40:classes.width45, classes.displayFlex, classes.justifyContentCenter, classes.alignItemsCenter)}> 
                  <label  className={classes.uploadImageButton}>
                    <UploadIcon/>
                  </label>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  name="image"
                  accept="image/*,image/heic"
                  multiple={true}
                  ref={inputRefFileUpload}
                  className={classes.imageUploadInput}
                  onInput={(e) => handleFileSelectChange(e)}
                  
                />
                <div  className={classNames( classes.cursorPointer, classes.width45, classes.height40, showDescButton?classes.border1:'', classes.borderRadius50, !isMobile? classes.marginRight10:'', isMobile? classes.margin10:'', isMobile?classes.marginTop0:'', isMobile?classes.width40:classes.width45, classes.displayFlex, classes.justifyContentCenter, classes.alignItemsCenter)}> <GifIcon/></div>
                <div  className={classNames( classes.cursorPointer, classes.width45, classes.height40, showDescButton?classes.border1:'', classes.borderRadius50, !isMobile? classes.marginRight10:'', isMobile? classes.margin10:'', isMobile?classes.marginTop0:'', isMobile?classes.width40:classes.width45, classes.displayFlex, classes.justifyContentCenter, classes.alignItemsCenter)}> <EmojiIcon2/></div>
              </div>
            )}
          </div>
          <textarea  onInput={(e) => updateContent(e)}  rows={10} cols={50} onFocus={() => updateFromDesc()} onClick={() => updateFromDesc()}  placeholder="Tell your story" className={classNames(classes.backgroundColore5, classes.borderNone, classes.fontSize21, classes.lineHeight158, classes.fontWeight400, classes.letterSpacing3em, classes.border1soliddarkgray, classes.marginBottom10, classes.borderRadius7, classes.padding10, classes.width100, classes.paddingTop0 )} value={postContent} ></textarea>
        </div>
      </form>
      <div className={classNames(classes.flexDirectionRow, classes.displayFlex)}>
        <div   className={classNames(classes.marginRight20, classes.width40 )}></div>
        <div className={classNames(classes.flexGrow1, classes.marginBottom0, classes.positionRelative)}>
          <div className={classNames(classes.maxWidthUnset, classes.positionRelative, classes.backgroundColorfff)}>
            <div className={classNames(classes.border1solidccc, classes.displayFlex, classes.padding4, classes.flexWrapWrap)}>
              <ul className={classNames(classes.displayFlex, classes.flexWrapWrap, classes.width100, classes.lineHeight1em, classes.margin0, classes.padding0, classes.listStyleTypeNone)}>
                {tags.map((tag, index) => {
                  return (
                    <li key={index} className={classNames(classes.margin1x2, classes.bg999, classes.colorfff, classes.borderRadius2, classes.displayFlex, classes.padding3x5, classes.fontSize085em, classes.boxSizingBorderBox, classes.borderColor999)}>
                      <div className={classNames(classes.padding2, classes.displayFlex, classes.alignItemsCenter, classes.padding2x5)}>{tag}</div>
                      <div onClick={()=>removeTag(tag)} className={classNames(classes.marginLeft2, classes.displayFlex, classes.alignItemsCenter, classes.fontSize1p15em)}><CloseIcon color='grey'/></div>
                    </li>
                  )
                })}
                <li className={classNames(classes.displayFlex, classes.flex1x0xauto, classes.padding3x5, classes.margin2, classes.fontSize085em, classes.borderRadius7)}>
                  <input value={tag} onChange={(e) => setTag(e.target.value)} onKeyUp={(e) => onkeydownTags(e)} placeholder="Add a new topic" className={classNames(classes.flex1x0xauto, classes.minWidth100px,  classes.borderNone, classes.padding0, classes.margin0)} />
                </li>
              </ul>
            </div>
          </div>
          
          {!tagError && (
            <span className={classNames(classes.color757575, classes.fontSize12)}>Topics-Tags to classify your post: {tags.length}/10</span>
          )} 
          {tagError && (
            <span className={classNames(classes.colorRed, classes.fontSize12)}>Remove special characters from tags (only lowercase characters, numbers and dashes)</span>
          )}
        </div>
      </div>
      {/* <div className={classNames(classes.flexDirectionRow, classes.displayFlex, classes.padding10)}> */}
      <div>
        <div   className={classNames(classes.marginRight20, classes.width40 )}></div>
        <div className={classNames( classes.padding10)}>
          {buzzAttachedImages.length >= 1 && (<ImagesContainer buzzId={currentBuzz} buzzImages={buzzAttachedImages}
            upadateBuzzImages={setBuzzAttachedImages}
            viewFullImage={setViewImageUrl}
            setVideoLimit={setVideoLimit}
            loading={compressing || imageUploading || videoUploading || buzzLoading}/>)}
          <React.Fragment>
            {(postContent.length !== 0) &&  (
              <div className={classes.previewContainer} onClick={handleClickContent}>
                <Renderer content={postContent} minifyAssets={true} contentImages={0}/>
              </div>
            )}
          </React.Fragment>
        </div>
        
      </div>
    </Container>
  )
}
const mapStateToProps = (state) => ({
  user: state.auth.get('user'),
})
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({
    uploadFileRequest,
    setPostRequest,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
