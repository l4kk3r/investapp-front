import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import axios from 'axios';
import {UserContext} from '../../../App'
import {Link} from 'react-router-dom'
import { Helmet } from 'react-helmet';
 

const UserData = () => {
    const {state, dispatch} = useContext(UserContext)
    const [userdata, setUserData] = useState({})
    const token = localStorage.getItem("jwt")

    const sendData = () => {
        console.log(userdata)
        axios.post('https://investapp-back.herokuapp.com/user/userdata', userdata, { headers: { 'x-auth-token': token } }).then(result => console.log(result.data))
    }

    useEffect(() => {
        if (state) {
            axios.get(`https://investapp-back.herokuapp.com/user/userdata`, { headers: { 'x-auth-token': token } }).then(result => setUserData(result.data.userdata))
        }
    }, [state])

    return (
        <div className='profile'>
            <Helmet>
                <title>SHAR | Данные</title>
            </Helmet>
            <div className='sidemenu'>
                <div className='sidemenu__routing'>
                    <img className='sidemenu__routing__logo' src='/img/logo.png' alt='logo'/>
                    { state ? state.acctype === 'broker' ? <Link className='sidemenu__routing__link' to='/'>Мои заявки</Link> : <Link className='sidemenu__routing__link' to='/'>Мои ответы</Link> : <Link className='sidemenu__routing__link' to='/'>Мои заявки</Link> }
                    <Link className='sidemenu__routing__link' to='/archive'>Архив</Link>
                    { state ? state.acctype === 'broker' ? <Link className='sidemenu__routing__link' to='/newpost'>Новая заявка</Link> : <Link className='sidemenu__routing__link' to='/allposts'>Общий список</Link> : <Link className='sidemenu__routing__link' to='/newpost'>Новая заявка</Link> }
                    <Link className='sidemenu__routing__link link-selected' to='/userdata'>Мои данные</Link>
                    <a href='/logout' className='btn btn-danger' >Выйти</a>
                </div>
                <div className='sidemenu__social'>
                    <div className='sidemenu__social__header'>
                        <p>Поддержка:</p>
                    </div>
                    <div className='sidemenu__social__icons'>
                        <img src='/img/telegram.svg' className='sidemenu__social__icons-item' />
                        <img src='/img/whatsapp.svg' className='sidemenu__social__icons-item' />
                        <img src='/img/viber.svg' className='sidemenu__social__icons-item' />
                    </div>
                </div>
            </div>
            <div className='content'>
                <div className='userdata'>
                    <div className='userdata__inputgroup'>
                        <label>ТЕЛЕГРАМ ID</label>
                        <input className="form-control" onInput={ (e) => userdata.telegram_login = e.target.value } defaultValue={userdata.telegram_login} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>Фамилия</label>
                        <input className="form-control" onInput={ (e) => userdata.lastname = e.target.value } defaultValue={userdata.lastname} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>Имя</label>
                        <input className="form-control" onInput={ (e) => userdata.firstname = e.target.value } defaultValue={userdata.firstname} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>Отчество</label>
                        <input className="form-control" onInput={ (e) => userdata.middlename = e.target.value } defaultValue={userdata.middlename} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>Пол</label>
                        <input className="form-control" onInput={ (e) => userdata.sex = e.target.value } defaultValue={userdata.sex} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>День рождения</label>
                        <input className="form-control" type='date' onInput={ (e) => userdata.birthday = e.target.value } defaultValue={userdata.birthday} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>Гражданство</label>
                        <input className="form-control" onInput={ (e) => userdata.citizenship = e.target.value } defaultValue={userdata.citizenship} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>СНИЛС</label>
                        <input className="form-control" onInput={ (e) => userdata.snils = e.target.value } defaultValue={userdata.snils} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>ИНН</label>
                        <input className="form-control" onInput={ (e) => userdata.inn = e.target.value } defaultValue={userdata.inn} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>Телефон</label>
                        <input className="form-control" onInput={ (e) => userdata.phone = e.target.value } defaultValue={userdata.phone} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>E-mail</label>
                        <input className="form-control" onInput={ (e) => userdata.email = e.target.value } defaultValue={userdata.email} />
                    </div>
                    <h3>АДРЕС</h3>
                    <div className='userdata__inputgroup'>
                        <label>Регион</label>
                        <input className="form-control" onInput={ (e) => userdata.adress_region = e.target.value } defaultValue={userdata.adress_region} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>Район</label>
                        <input className="form-control" onInput={ (e) => userdata.adress_district = e.target.value } defaultValue={userdata.adress_district} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>Город</label>
                        <input className="form-control" onInput={ (e) => userdata.adress_city = e.target.value } defaultValue={userdata.adress_city} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>Улица</label>
                        <input className="form-control" onInput={ (e) => userdata.adress_street = e.target.value } defaultValue={userdata.adress_street} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>Дом</label>
                        <input className="form-control" onInput={ (e) => userdata.adress_house = e.target.value } defaultValue={userdata.adress_house} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>Строение</label>
                        <input className="form-control" onInput={ (e) => userdata.adress_building = e.target.value } defaultValue={userdata.adress_building} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>Квартира</label>
                        <input className="form-control" onInput={ (e) => userdata.adress_flat = e.target.value } defaultValue={userdata.adress_flat} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>Почтовый индекс</label>
                        <input className="form-control" onInput={ (e) => userdata.adress_zip = e.target.value } defaultValue={userdata.adress_zip} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>ОКАТО</label>
                        <input className="form-control" onInput={ (e) => userdata.adress_okato = e.target.value } defaultValue={userdata.adress_okato} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>ОКТМО</label>
                        <input className="form-control" onInput={ (e) => userdata.adress_oktmo = e.target.value } defaultValue={userdata.adress_oktmo} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>КЛАДР</label>
                        <input className="form-control" onInput={ (e) => userdata.adress_kladr = e.target.value } defaultValue={userdata.adress_kladr} />
                    </div>
                    <h3>БАНКОВСКИЕ РЕКВИЗИТЫ</h3>
                    <div className='userdata__inputgroup'>
                        <label>ФИО</label>
                        <input className="form-control" onInput={ (e) => userdata.bank_fio = e.target.value } defaultValue={userdata.bank_fio} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>Расчетный счёт</label>
                        <input className="form-control" onInput={ (e) => userdata.bank_rasschet = e.target.value } defaultValue={userdata.bank_rasschet} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>Наименование банка</label>
                        <input className="form-control" onInput={ (e) => userdata.bank_name = e.target.value } defaultValue={userdata.bank_name} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>Корр.счет</label>
                        <input className="form-control" onInput={ (e) => userdata.bank_corschet = e.target.value } defaultValue={userdata.bank_corschet} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>БИК</label>
                        <input className="form-control" onInput={ (e) => userdata.bank_bik = e.target.value } defaultValue={userdata.bank_bik} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>КПП</label>
                        <input className="form-control" onInput={ (e) => userdata.bank_kpp = e.target.value } defaultValue={userdata.bank_kpp} />
                    </div>
                    <div className='userdata__inputgroup'>
                        <label>ИНН Банка</label>
                        <input className="form-control" onInput={ (e) => userdata.bank_inn = e.target.value } defaultValue={userdata.bank_inn} />
                    </div>
                    <button onClick={() => sendData()} class='btn btn-primary'>Сохранить</button>
                </div>
                
            </div>
        </div>

    )
}
export default UserData;