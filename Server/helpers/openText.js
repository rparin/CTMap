const [accessToken, setAccessToken] = React.useState()
const [file, setFile] = React.useState({                        
  name: "",
  size: "",
  type: ""
})                         
const [capturedFileId, setCapturedFileId] = React.useState("")  
const [ocrResponse, setOCRResponse] = React.useState({         
  resultItems: [{
    "files":[{
        "name":"",
        "value":"",
        "contentType":"",
        "src":"",
        "fileType":""
    }]    
  }]
})
const [pdfFile, setPdfFile] = React.useState({              
  size: "",
  type: ""
})
const [uploadedFile, setUploadedFile] = React.useState({      
  id: "",
  mimeType: "",
  size: ""
})
const [fileMetadata, setFileMetadata] = React.useState({
  id: "",
  name: "",
  mime_type: "",
  content_size: ""    
})

const [folderName, setFolderName] = React.useState("")
const [folderId, setFolderId] = React.useState("")

const [tokenPlaceholder, setTokenPlaceholder] = React.useState("Authentication Token Information")
const [capFileIdPlaceholder, setCapFileIdPlaceholder] = React.useState("")
const [ocrRespIdPlaceholder, setOcrRespIdPlaceholder] = React.useState("")
const [uploadedFileIdPlaceholder, setUploadedFileIdPlaceholder] = React.useState("")
const [retrieveStatus, setRetrieveStatus] = React.useState("")

function getAuthToken() {
  setTokenPlaceholder("Processing...")

  const url = `${process.env.base_url}/tenants/${process.env.tenant_id}/oauth2/token`
  const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
          client_id: process.env.client_id,
          client_secret: process.env.client_secret,
          grant_type: "password",
          username: process.env.username,
          password: prrocess.env.password
      })
  }

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => setAccessToken(data.access_token))
    .catch(error => console.error("Error: ", error))
}