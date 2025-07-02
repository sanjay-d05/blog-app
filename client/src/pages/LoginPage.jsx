import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/redux/auth/authActions';
import React, { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginPage({buttonText}) {

  const {isLoggingIn} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false);
  const [data,setData] = useState({
    email:'',
    password:''
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const success = await dispatch(login(data));
    if(success){
      setData({});
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-[rgba(9,0,47,255)]'>
      <Card className="w-full max-w-sm bg-transparent text-white border-[rgba(61,62,119,255)]">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>

          <CardAction onClick={() => navigate('/signup')}>
            <Button className='text-indigo-600' variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="text"
                  placeholder="m@example.com"
                  className='border-[rgba(61,62,119,255)]'
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Password</Label>
                <div className='w-full flex justify-center items-center gap-1'>
                  <Input
                    type={`${showPassword ? 'text' : 'password'}`}
                    placeholder="xxxxxxxx"
                    className='border-[rgba(61,62,119,255)]'
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                  />
                  {showPassword ? <IoEyeOff size={20} onClick={() => setShowPassword(!showPassword)} /> : <IoEye size={20} onClick={() => setShowPassword(!showPassword)} />}
                </div>
              </div>


              {isLoggingIn ?
                <Button type='submit' className='bg-indigo-600 text-white hover:bg-green-500 hover:text-white' >
                  Loading.....
                </Button>
                :
                <Button type='submit' className='bg-indigo-600 text-white hover:bg-green-500 hover:text-white' >
                  {buttonText || 'Submit'}
                </Button>}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage