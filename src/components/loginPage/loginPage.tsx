import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import { login,logout } from '../../redux/reducers/loginSlice.tsx';
import { useDispatch, useSelector } from 'react-redux';
 function LoginPage() {
  
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [pwd,setPwd] = useState('')
    interface User{
      id: number,
      email : string,
      pwd : string
    }
    const getUser= async ()=>{
      return await fetch('data.json')
    }
    const submitHandler = (e:any)=>{
        e.preventDefault();
      const usersPromise:Promise<User[]> = getUser().then(res=>res.json());
      usersPromise.then((user :User[] )=>{
        let isAuthenticated = false;  
        user.forEach((u: User)=>{
           if (email === u.email && pwd === u.pwd){
           isAuthenticated = true;
        }})
        if(isAuthenticated)
        {dispatch(login({email : email}))
          navigate('/upload')}
      })
       /* if (email === user.email && pwd === user.pwd){
           navigate('/upload')
        }*/
    }
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPwd(e.target.value)}}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default LoginPage;