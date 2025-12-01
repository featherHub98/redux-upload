import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';
import { login } from '../../redux/reducers/loginSlice.tsx';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
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
     
    }
  return (
  <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
    >
      <Card style={{ width: '100%', maxWidth: '400px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Welcome Back!</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={pwd}
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg">
                Log In
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;