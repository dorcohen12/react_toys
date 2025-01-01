import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react';
import 'animate.css';
import './assets/css/index.scss'

// import { About } from './pages/About'
// import { RobotEdit } from './pages/RobotEdit'
// import { RobotIndex } from './pages/RobotIndex'
// import { RobotDetails } from './pages/RobotDetails'
// import { AboutTeam } from './cmps/AboutTeam'
// import { AboutVision } from './cmps/AboutVision'
const About = lazy(() => import('./pages/About'))
const ToyEdit = lazy(() => import('./pages/ToyEdit'))
const ToysIndex = lazy(() => import('./pages/ToysIndex'))
const ToyDetails = lazy(() => import('./pages/ToyDetails'))
const AboutTeam = lazy(() => import('./cmps/AboutTeam'))
const AboutVision = lazy(() => import('./cmps/AboutVision'))

////////////////////////////////////////////////////

import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { Home } from './pages/Home'
import { UserMsg } from './cmps/UserMsg'
import { DynamicModal } from './cmps/DynamicModal';
import { ThemeProvider } from './contexts/ThemeContext';

function withSuspense(Cmp, fallback = <div >Loading...</div>) {
    return (
        <Suspense fallback={fallback}>
            <Cmp />
        </Suspense>
    )
}

function App() {

    return (
        <Router>
            <section className='main-app'>
                <ThemeProvider>
                    <AppHeader />
                    <main className='container'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={withSuspense(About)} >
                                <Route path="/about/team" element={withSuspense(AboutTeam)} />
                                <Route path="/about/vision" element={withSuspense(AboutVision)} />
                            </Route>
                            <Route path="/toys" element={withSuspense(ToysIndex)} >
                                <Route path='/toys/edit/:toyId?' element={withSuspense(ToyEdit)} />
                            </Route>
                            <Route path="/toy/:toyId" element={withSuspense(ToyDetails)} />
                        </Routes>
                    </main>
                    <AppFooter />
                    <UserMsg />
                    <DynamicModal />
                </ThemeProvider>

            </section>
        </Router >

    )
}

export default App


function Modal({ children }) {

    return (
        <section className='back-drop'>
            <button>X</button>
            {children}
        </section>
    )

}