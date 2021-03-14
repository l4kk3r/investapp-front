import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import axios from 'axios';
import {UserContext} from '../../../App'
import {Link} from 'react-router-dom'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { post } from 'jquery';
 

const BrokerProfile = () => {
    const {state, dispatch} = useContext(UserContext)
    const [filters, setFilters] = useState("")
    const [openedpost, setOpenedPost] = useState("")
    const [posts, setPosts] = useState("")
    const [answers, setAnswers] = useState("")
    const [fmin_amount, setMinAmount] = useState("")
    const [fmax_amount, setMaxAmount] = useState("")
    const isIP_options = [
        'Да', 'Нет', 'Откроется'
    ];
    const answer_options = [
        'Ожидание', 'Согласен', 'Отказ'
    ]

    const updateFilters = () => {
        axios.post("https://investapp-back.herokuapp.com/updateuser", {id: state.id, fmin_amount, fmax_amount: fmax_amount * -1,}).then(response=>console.log(response.data))
    }
    const saveOpenedPost = () => {
        axios.post("https://investapp-back.herokuapp.comuser/updatepost", openedpost).then(response => console.log(response.data))
    }
    const changeAnswerStatus = (answer, status) => {
        console.log('sending!')
        axios.post("https://investapp-back.herokuapp.com/user/answer-changestatus", {id: answer.id, status}).then(response => console.log(response))
    }

    useEffect(() => {
        if (state) {
            axios.post("https://investapp-back.herokuapp.com/getfilters", {id: state.id}).then(response=>{setFilters(response.data.data); setMaxAmount(response.data.data.fmax_amount * -1)})
            axios.post("https://investapp-back.herokuapp.com/getposts", {creator_id: state.id}).then(res=>{setPosts(res.data.posts); setAnswers(res.data.answers); console.log(res.data)}) }
    }, [state])

    return (
        <div className='profile'>
            <div className='sidemenu'>
                <div className='sidemenu__routing'>
                    <img className='sidemenu__routing__logo' src='/img/logo.png' alt='logo'/>
                    <Link className='sidemenu__routing__link link-selected' to='/'>Мои заявки</Link>
                    <Link className='sidemenu__routing__link' to='/newpost'>Новая заявка</Link>
                    <Link className='sidemenu__routing__link' to='/userdata'>Мои данные</Link>
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
                <div className='userposts'>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Дата</th>
                            <th scope="col">Сумма займа</th>
                            <th scope="col">Ставка</th>
                            <th scope="col">Срок</th>
                            <th scope="col">Объект</th>
                            <th scope="col">Местоположение</th>
                            <th scope="col">Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts ? posts.map((post, i)=>{return (<tr key={i} onClick={() => setOpenedPost(post)} className='userposts__post'>
                            <th>{post.id}</th>
                            <td>{post.createdAt}</td>
                            <td>{post.amount}</td>
                            <td>{post.rate}</td>
                            <td>{post.period}</td>
                            <td>{post.object}</td>
                            <td>{post.city}</td>
                            <td>{post.status}</td>
                            </tr>)}) : null}
                    </tbody>
                </table>
                {openedpost ? <div key={openedpost.id} className='openedpost'>
                    <h3><mark>Редактирование заявки №{openedpost.id}</mark></h3>
                    <div className='openedpost__edit'>
                        <table className='table table-striped table-first'>
                            <thead>
                                <tr>
                                    <th scope="col">Номер</th>
                                    <th scope="col">{openedpost.id}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Дата</td>
                                    <td>{openedpost.createdAt}</td>
                                </tr>
                                <tr>
                                    <td>Сумма</td>
                                    <td><input className="form-control" onChange={(e) => {openedpost.amount = e.target.value}} defaultValue={openedpost.amount} /></td>
                                </tr>
                                <tr>
                                    <td>Ставка</td>
                                    <td><input className="form-control" onChange={(e) => {openedpost.rate = e.target.value}} defaultValue={openedpost.rate} /></td>
                                </tr>
                                <tr>
                                    <td>Город</td>
                                    <td><input className="form-control" onChange={(e) => {openedpost.city = e.target.value}} defaultValue={openedpost.city} /></td>
                                </tr>
                                <tr>
                                    <td>Объект</td>
                                    <td><input className="form-control" onChange={(e) => {openedpost.object = e.target.value}} defaultValue={openedpost.object} /></td>
                                </tr>
                                <tr>
                                    <td>Республика</td>
                                    <td><input className="form-control" onChange={(e) => {openedpost.region = e.target.value}} defaultValue={openedpost.region} /></td>
                                </tr>
                            </tbody>
                        </table>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope="col">Тип сделки</th>
                                    <th scope="col">-</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ФИО заемщика-основного</td>
                                    <td><input className="form-control" onChange={(e) => {openedpost.creator_fname = e.target.value}} defaultValue={openedpost.creator_fname} /></td>
                                </tr>
                                <tr>
                                    <td>Цель займа</td>
                                    <td><input className="form-control" onChange={(e) => {openedpost.reason = e.target.value}} defaultValue={openedpost.reason} /></td>
                                </tr>
                                <tr>
                                    <td>Телефон</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>Есть ИП или ООО</td>
                                    {/* <td><Dropdown options={isIP_options} onChange={(e) => {openedpost.isIP = e.value}} value={openedpost.isIP} /></td> */}
                                </tr>
                                <tr>
                                    <td>Фото объекта</td>
                                    <td>{openedpost.photos ? 'Загружено' : 'Не загружено'}</td>
                                </tr>
                                <tr>
                                    <td>Республика</td>
                                    <td>{openedpost.archive ? 'Загружено' : 'Не загружено'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button onClick={() => saveOpenedPost()} className='btn btn-primary openedpost__edit__savebutton'>Сохранить</button>
                    <div className='openedpost__answers'>
                        <h3><mark>Предложения инвесторов</mark></h3>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Варианты</th>
                                    <th>Ставка</th>
                                    <th>Сумма</th>
                                    <th>Период</th>
                                    <th>Комментарий</th>
                                    <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody>
                                {answers.filter(a => a.post_id === openedpost.id).map((answer, i) => <tr key={i}>
                                    <td>Вариант {i + 1}</td>
                                    <td>{answer.rate}</td>
                                    <td>{answer.amount}</td>
                                    <td>{answer.period}</td>
                                    <td>{answer.comment}</td>
                                    <td>
                                        <Dropdown options={answer_options} onChange={(e) => changeAnswerStatus(answer, e.value)} value={answer.status} />
                                        {answer.comment}
                                    </td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div> : null }
                </div>
                {state ? state.acctype == 'investor' ? <div className='filters'>
                    <p>Минимальная сумма займа</p>
                    <input onChange={(e) => setMinAmount(e.target.value)} defaultValue={filters.fmin_amount}/>
                    <p>Максимальная сумма займа</p>
                    <input  onChange={(e) => setMaxAmount(e.target.value)} defaultValue={fmax_amount}/>
                    <button onClick={() => updateFilters()}>Сохранить</button>
                </div> : null : null}
            </div>
        </div>

    )
}
export default BrokerProfile;