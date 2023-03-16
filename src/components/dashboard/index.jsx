import React,{useState,useEffect} from 'react'
import { Button, Alert , Container, Row, Col  } from "react-bootstrap"
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {FolderPlus,FileArrowUp,FilePlus} from 'phosphor-react'


const Dashboard = () => {
  const {currentUser,createStorage,listAllStorage,path,imageUrls} = useAuth()
  const [redirect,setRedirect] = useState("")
  const [imageUpload, setImageUpload] = useState()
  const [pathFolder,setPathFolder] = useState()
  const [error,setError] = useState()
  
  const navigate = useNavigate()

  useEffect(() => {
    try {    
      console.log(redirect)
      if(currentUser===null){
        navigate("/login")
      }
      const get = async () => {
        await listAllStorage(redirect)
      }
      get()
      setPathFolder([...new Set(path)])
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }, [imageUpload,redirect])

  const handlerCreateStorage = async () => {
    await createStorage(redirect,imageUpload)
    setImageUpload(null)
  }

  return (
    <> 
    {currentUser && 
    <div className='container-lg d-flex flex-column'>
      {error && <Alert variant="danger">{error}</Alert>}    
      <Container className='d-flex flex-row align-items-center'>      
        <Button variant="link" style={{left:0,position:"absolute"}} >
          <FilePlus size={32} />        
        </Button>
        <input
          type="file"
          style={{left:15,top:70,width:25,opacity:0,position:"absolute"}}
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        {imageUpload && 
          <Button variant="link" onClick={handlerCreateStorage} >
            <FileArrowUp size={32} />
          </Button>
        }
        <Button variant="link">
          <FolderPlus size={32} />
        </Button>
        <input type="text" value={redirect} style={{width:75}} onChange={e=>setRedirect(e.target.value)} list="folder"/>
        <datalist id='folder'>
        { pathFolder &&
          pathFolder.map((e,index)=>(
            <option key={index} value={e}/>
          ))
        }
        </datalist>
        {
          imageUpload &&
          <h2 style={{fontSize:16}}>{imageUpload.name}</h2>
        }  
        </Container>
        <Container style={{padding:60,display:"flex",flexDirection:"column"}}>        
          <Row className='mt-4' style={{rowGap:40}}>
          { imageUrls &&
            imageUrls.map((e,index)=>(
              <Col xs={4} key={index}> 
                <img style={{width:100,height:100}} alt='' src={e}/>
              </Col>
            ))
          }
          </Row>
        </Container>
      
    </div>
    }
    </> 
  )
}

export default Dashboard