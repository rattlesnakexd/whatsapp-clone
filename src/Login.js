import React from 'react'
import './Login.css'
import { Button } from '@mui/material'
import {auth, provider} from './firebase'
import { useStateValue } from './StateProvider'
import { actionType } from './reducer'

function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type: actionType.SET_USER,
                user: result.user,
            });
        }).catch((error) => alert(error.message));
    };
  return (
    <div className='login'>
        <div className='login__container'>
            <img src='https://d1jj76g3lut4fe.cloudfront.net/processed/thumb/520F5NkxfMU306behA.png?Expires=1691606777&Signature=GJmaMWNpo55XsKa~DK4HLJiwkXYr1ThN-itS4YDBVXblCQZVw0HM3978WI4rm5oF6cUBl~Gdnzrm5RZ5JHjbfrp6uKP8H6n8WoD4uqadNRFWHJJfdS5BJDDe1cGUuUHHwB5Y-edsfKe7VCMGDg-CcSNbddbkFmqis06qMgyeVc0R23RxQeb8UiKe0b1g-w1CbhXwEZxq7xJCj5j-kvrBzdScgmC2kFOseqQzTqZ3V8W4lp5rS8nE9ALHcfJBIONx4o7S2pYu7t47D92mXp1mH6XFOMggODYKvHaSoVhRkIoP-nE4rciVH-kPMoz3SINVdzjcZHUlK90uxBpgBH3C6w__&Key-Pair-Id=K2YEDJLVZ3XRI' alt='IWhatsapp Logo'/>
            <div className='login__text'>
                <h1>Sign in to Whatsapp</h1>
            </div>
            <Button onClick={signIn}>
                Sign in with Google
            </Button>

        </div>
      
    </div>
  )
}

export default Login
