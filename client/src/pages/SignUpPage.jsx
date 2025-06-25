import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthContext } from '@/context/Auth';
import { AxiosInstance } from '@/lib/axios';
import React, { useContext } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { toast } from 'react-toastify';

function SignUpPage({ buttonText }) {

  const {
    navigate,
    showPassword, setShowPassword,
    isSigningUp, setIsSigningUp,
    signUpData, setSignUpData
  } = useContext(AuthContext);

  const registerUser = async (e) => {
    e.preventDefault();
    setIsSigningUp(true);
    const { name, email, password } = signUpData;
    try {
      await AxiosInstance.post('/auth/signup', signUpData);
      toast.success('Account Created Successfully');
      setSignUpData({});
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSigningUp(false);
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

          <CardAction onClick={() => navigate('/login')}>
            <Button className='text-indigo-600' variant="link">Sign In</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={registerUser}>
            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  className='border-[rgba(61,62,119,255)]'
                  value={signUpData.name}
                  onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="text"
                  placeholder="m@example.com"
                  className='border-[rgba(61,62,119,255)]'
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Password</Label>
                <div className='w-full flex justify-center items-center gap-1'>
                  <Input
                    type={`${showPassword ? 'text' : 'password'}`}
                    placeholder="xxxxxxxx"
                    className='border-[rgba(61,62,119,255)]'
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                  />
                  {showPassword ? <IoEyeOff size={20} onClick={() => setShowPassword(!showPassword)} /> : <IoEye size={20} onClick={() => setShowPassword(!showPassword)} />}
                </div>
              </div>


              {isSigningUp ?
                <Button type='submit' className='bg-indigo-600 text-white hover:bg-green-500 hover:text-white' >
                  Signing.....
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

export default SignUpPage