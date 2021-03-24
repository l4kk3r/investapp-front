import React, {useContext, useEffect, useState} from 'react'
import './signup-styles.css'
import {useHistory} from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Home = () => {
    const history = useHistory()
    const [acctype, setAccType] = useState("broker")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [company, setCompany] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(null)
    var password_check = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const mail_check = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const sendData = () => {
        if (!firstname || !lastname || !email || !phone || !password || !confirmpassword) {
            setError('Пожалуйста, заполните все поля')
            return;
        }
        if (!mail_check.test(email)) {
            setError('Введите корректный email')
            return;  
        }
        if (!password_check.test(password)) {
            setError('Пароль должен состоять только из латинских букв и цифр. Длина пароля 6-16 символов')
            return;
        }
        if (password !== confirmpassword) {
            setError('Пароли не совпадают')
            return;
        }
        fetch("https://investapp-back.herokuapp.com/user/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json" 
            },
            body:JSON.stringify({
                acctype,
                firstname,
                lastname,
                email,
                company,
                phone,
                password,
                confirmpassword
            })
        }).then(ans=>ans.json()).then(realans=>{
            if (realans.err) {
                setError(realans.err)
                return
            }
            history.push('/signin')
            })
    }
    return (
        <div className='signup'>
            <Helmet>
                <title>SHAR | Регистрация</title>
            </Helmet>
            <div className="wrapper">
                <div className="info">
                    <div className="info__logo">
                        <img src="img/logo.png" alt="" />
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
                        Регистрация
                    </div>
                    <h4 style={{display: error ? 'block' : 'none'}} className='errorlogg'>{error}</h4>
                    <div className="form__filter">
                        <span onClick={() => setAccType('broker')} className="form__filter-item" style={{borderBottom: acctype === 'broker' ? '1.6px solid rgb(77, 189, 116)' : '1.6px solid black'}}>Брокер</span>
                        <span onClick={() => setAccType('investor')} className="form__filter-item" style={{borderBottom: acctype === 'investor' ? '1.6px solid rgb(77, 189, 116)' : '1.6px solid black'}}>Инвестор</span>
                    </div>
                    <div action="" className="form__form">
                        <div className="form__inputs">
                            <label htmlFor="" className="form__form-label">Имя</label>
                            <input value={firstname} onChange={(e) => setFirstName(e.target.value)} type="text" className="form__form-input form__form-email" />
                        </div>
                        <div className="form__inputs">
                            <label htmlFor="" className="form__form-label">Фамилия</label>
                            <input value={lastname} onChange={(e) => setLastName(e.target.value)} type="text" className="form__form-input form__form-email" />
                        </div>
                        <div className="form__inputs">
                            <label htmlFor="" className="form__form-label">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form__form-input form__form-email" />
                        </div>
                        <div className="form__inputs">
                            <label htmlFor="" className="form__form-label">Название компании (если есть)</label>
                            <input value={company} onChange={(e) => setCompany(e.target.value)} type="text" className="form__form-input form__form-email" />
                        </div>
                        <div className="form__inputs">
                            <label htmlFor="" className="form__form-label">Телефон</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="form__form-input form__form-email" />
                        </div>
                        <div className="form__inputs">
                            <label htmlFor="" className="form__form-label">Пароль</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className="form__form-input form__form-email" />
                        </div>
                        <div className="form__inputs">
                            <label htmlFor="" className="form__form-label">Подтверждение пароля</label>
                            <input value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} type="text" className="form__form-input form__form-email" />
                        </div>
                        <button type="submit" onClick={() => sendData()} className="form__form-button">Зарегистрироваться</button>
                        <div className="form__form-question">
                            <span>Есть аккаунт?</span><a href="/signin">Войти</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Home;