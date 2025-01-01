import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, logout, signup } from '../store/user/user.actions.js'
import { onToggleModal } from '../store/app/app.actions.js'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext.jsx'
import { Validate } from './Validate.jsx'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    const { theme } = useContext(ThemeContext)


    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user:${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function sayHey(ev) {
        onToggleModal({
            cmp: Validate,
            props: {
                user,
                onApprove() {
                    showSuccessMsg('Approved successfully!')
                    onToggleModal(null)
                }
            },
            style: {
                border: '5px solid red'
            }
        })
    }

    return (
        <header className={`app-header ${theme}`}>
            <section className="container">
                <h1>Robots</h1>
                <button onClick={() => navigate(-1)}>Back</button>
                <nav>
                    <NavLink to='/' >Home</NavLink>
                    <NavLink to='/about' >About</NavLink>
                    <NavLink to='/toys' >Toys</NavLink>
                </nav>
            </section>
            <section className="container">
                {user &&
                    <span className="user-info">
                        {user.imgUrl && <img src={user.imgUrl} />}
                        {user.fullname}
                        <span className="score">{user.balance?.toLocaleString()}</span>
                        <button onClick={onLogout}>Logout</button>
                        <button onClick={sayHey} >Say hey!</button>
                    </span>
                }
                {!user &&
                    <div className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </div>
                }
            </section>
        </header>
    )
}
