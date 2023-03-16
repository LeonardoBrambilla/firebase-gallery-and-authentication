import React,{useState,useEffect} from 'react'
import {Form,Button,Alert} from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'
import {GoogleLogo} from "phosphor-react"
import {useAuth} from '../../context/AuthContext'

const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const navigate = useNavigate()

  const {login,currentUser,googleAuth} = useAuth()

  useEffect(() => {
    if(currentUser) {
      navigate("/")
    }
  }, [])


  const handleSubmit = async () => {
    try {
      setError("")
      await login(email,password)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoogleSign = async () => {
    try {
      await googleAuth()
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{width:300}} className='container text-center'>
      <div  className='row text-center justify-content-start bs-dark-rg'>
        <h2 className="text-center mb-4">Sign In</h2>
        {error && <Alert variant="danger">{error}</Alert>}        
        <Form.Label>Email</Form.Label>
        <input value={email} requided="true" onChange={e=>setEmail(e.target.value)} />       
        <Form.Label>Password</Form.Label>
        <input type="password" requided="true" value={password} onChange={e=>setPassword(e.target.value)} />            
        <span style={{padding:5}}/>
        <Button onClick={handleSubmit}  type="submit">
          Sign In
        </Button>
      </div>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
      <Button onClick={handleGoogleSign} type="button" className="btn-sm">
        <GoogleLogo  weight="duotone" size={30}/>
        Entrar com google
      </Button>
    </div>
  )
}

export default Login