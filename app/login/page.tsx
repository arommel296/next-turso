import { login, signup } from './actions'
import styles from './login.module.css'

export default function LoginPage()  {
  return (
    <body>
      <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required placeholder='email@email.com' />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required placeholder='password' />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
    </body>
  )
}