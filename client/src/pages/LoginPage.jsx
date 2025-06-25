import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthContext } from '@/context/Auth';
import { AxiosInstance } from '@/lib/axios';
import React, { useContext } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { toast } from 'react-toastify';

function LoginPage({ buttonText }) {

  const {
    navigate,
    showPassword, setShowPassword,
    isLoggingIn, setIsLoggingIn,
    loginData, setLoginData,
    setAuthUser ,authUser
  } = useContext(AuthContext);

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    const { email, password } = loginData;
    try {
      const res = await AxiosInstance.post('/auth/login', loginData);
      setAuthUser(res.data);
      window.location.reload();
      toast.success('Logged In successfully');
      setLoginData({email:'',password:''});
    } catch (error) {
      toast.error(error?.response?.data.message);
    } finally {
      setIsLoggingIn(false);
    }
  };  

  return (
    <div className='h-screen flex justify-center items-center bg-[rgba(9,0,47,255)]'>
      <Card className="w-full max-w-sm bg-transparent text-white border-[rgba(61,62,119,255)]">
        <CardHeader>
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>

          <CardAction onClick={() => navigate('/signup')}>
            <Button className='text-indigo-600' variant="link">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={loginUser}>
            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="text"
                  placeholder="m@example.com"
                  className='border-[rgba(61,62,119,255)]'
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Password</Label>
                <div className='w-full flex justify-center items-center gap-1'>
                  <Input
                    type={`${showPassword ? 'text' : 'password'}`}
                    placeholder="xxxxxxxx"
                    className='border-[rgba(61,62,119,255)]'
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
