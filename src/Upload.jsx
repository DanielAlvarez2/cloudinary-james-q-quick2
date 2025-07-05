import React,{useState} from 'react'

export default function Upload(){
    const [fileInputState, setFileInputState] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [previewSource, setPreviewSource] = useState('')
    const previewFile = (file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file) // converts image to a string
        reader.onloadend = ()=>{
            setPreviewSource(reader.result)
        }
    }
    const handleFileInputChange = (e)=>{
        const file = e.target.files[0]
        previewFile(file)
    }
    const handleSubmitFile = (e) =>{
        console.log('submitting...')
        e.preventDefault()
        if(!previewSource) return
        uploadImage(previewSource)
    }
    const uploadImage = async(base64EncodedImage)=>{
        console.log(base64EncodedImage)
        try{
            await fetch('/api/upload', {method:'POST',
                                        body:JSON.stringify({data:base64EncodedImage}),
                                        headers:{'Content-type':'application/json'} //delete?
                                        })
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div>
            <h1>Upload</h1>
            <form onSubmit={handleSubmitFile} >
                <input  type='file' 
                        name='image'
                        onChange={handleFileInputChange} 
                        value={fileInputState} /><br/><br/>
                <button type='submit'>Upload</button>
            </form><br/><br/>
            {previewSource && <img  src={previewSource} 
                                    alt='Selected Image Preview'
                                    style={{height:'300px'}} />}
        </div>
    )
}