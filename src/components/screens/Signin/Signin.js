import React, {useContext, useEffect, useState} from 'react'
import './signin-styles.css'
import {UserContext} from '../../../App'
import {useHistory} from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Home = () => {
    const history = useHistory()
    const {dispatch} = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const sendData = () => {
        fetch("https://investapp-back.herokuapp.com/user/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json" 
            },
            body:JSON.stringify({
                email,
                password,
            })
        }).then(ans=>ans.json()).then(realans=>{
            if (realans.token) {
                if (realans.user.status === 'Модерация') {
                    setError("Спасибо за регистрацию. Наш менеджер свяжется с вами в течение 5 минут и подтвердит вашу личность")
                    return;
                } else if (realans.user.status === 'Заблокирован') {
                    setError("Ваш аккаунт был заблокирован за нарушения правил сервиса")
                    return;
                } else {
                    localStorage.setItem("jwt",realans.token)
                    localStorage.setItem("user",JSON.stringify(realans.user))
                    dispatch({type:"USER",payload:realans.user})
                }
            } else {
                setError(realans.err)
            }
        })
    }
    return (
        <div className='signin'>
            <Helmet>
                <title>SHAR | Вход</title>
            </Helmet>
            
            <div className="wrapper">
                <div className="info">
                    <div className="info__logo">
                        <img src="/img/logo.png" alt=""/>
                    </div>
                    <div className="info__title">
                        Регистратор Online
                    </div>
                    <div className="info__subtitle">
                        Сервис регистрации сделок с недвижимостью №1 в России
                    </div>
                    <div className="info__text">
                        Мы гарантируем вам: 
                    </div>
                    <ul className="info__list">
                        <li className="info__list-item">Качественный сервис</li>
                        <li className="info__list-item">Быстрое оформление</li>
                        <li className="info__list-item">Довольных клиентов</li>
                        <li className="info__list-item">Экономию средств</li>
                    </ul>
                </div>
                <div className="form">
                    <div className="form__title">
                        Вход
                    </div>
                    <h4 style={{display: error ? 'block' : 'none'}} className='errorlog'>{error}</h4>
                    <div className="form__form">
                        <div className="form__inputs">
                            <label htmlFor="" className="form__form-label">Введите ваш Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form__form-input form__form-email" />
                        </div>
                        <div className="form__inputs">
                            <label htmlFor="" className="form__form-label">Введите ваш Пароль</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className="form__form-input form__form-email" />
                        </div>
                        <button onClick={() => sendData()} type="submit" className="form__form-button">Войти</button>
                        <div className="form__form-question">
                            <span>Нет аккаунта? </span><a href="/signup">Зарегистрировать</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Home;