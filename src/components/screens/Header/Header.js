import React,{useContext} from 'react'
import './styles.css'
import axios from 'axios'
import {UserContext} from '../../../App'
import {Link,useHistory} from 'react-router-dom'


const Header = () => {
    const history = useHistory()
    const {state} = useContext(UserContext)
    const HeaderLinking = () => {
        console.log("State is", state)
        if (state) {
            if (state.acctype === 'broker') {
            return [
                <header className='Header'>
                <div className='inheader'>
                <Link className='Logo' to='/'>СOMEINVEST</Link>
                <div className='Auth'>
                    <a href='/create'> Создать объявление</a>
                    <a href='/myprofile'>{state.firstname}</a>
                 </div>
            </div></header>]}
            else if (state.acctype === 'investor') {
                return [
                    <header className='Header'><div className='inheader'>
                    <Link className='Logo' to='/'>СOMEINVEST</Link>
                    <div className='Auth'>
                        <a href='/create'> Создать объявление</a>
                        <a href='/myprofile'>{state.firstname}</a>
                     </div>
                </div></header>]
            } else if (state.acctype === 'admin') {
                return [
                    <header className='Admin'><div className='inheader2'>
                    <div className='hrk1'>
                        <a className='toadmin' href='/myadmin'>Админ.Панель</a>
                     </div>
                </div></header>]
            }
        } else {
            return [
                <header className='Header'>
                    <div className='inheader'>
                    <Link className='Logo' to='/'>СOMEINVEST</Link>
                <div className='Auth'>
                <div className='authbuttons'>
                <a href='/signin' className='login'>Вход</a>
                <a href='/signup' className='register'>Регистрация</a>
            </div>
            </div></div></header>]
        }
    }
    return (
        <div>
            {HeaderLinking()}
        </div>
    )
}
export default Header;