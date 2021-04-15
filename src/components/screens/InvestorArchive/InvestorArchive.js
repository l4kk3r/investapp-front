import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import axios from 'axios';
import {UserContext} from '../../../App'
import {Link, useHistory} from 'react-router-dom'
import { Helmet } from 'react-helmet';
 

const InvestorArchive = () => {
    const history = useHistory()
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

    const updateFilters = () => {
        axios.post("https://investapp-back.herokuapp.com/updateuser", {id: state.id, fmin_amount, fmax_amount: fmax_amount * -1,}).then(response=>console.log(response.data))
    }
    
    const toArchive = (id) => {
        setAnswers(answers.filter(ans => ans.id !== id))
        axios.post("https://investapp-back.herokuapp.com/user/answer-archive", {id, archived: false}).then(response=>console.log(response.data))
    }

    useEffect(() => {
        if (state) {
            axios.post("https://investapp-back.herokuapp.com/user/answers", {investor_id: state.id, archived: true}).then(res=>{console.log(res); setAnswers(res.data.answers)}) }
    }, [state])

    return (
        <div className='profile'>
            <Helmet>
                <title>SHAR | Архив</title>
            </Helmet>
            <div className='sidemenu'>
                <div className='sidemenu__routing'>
                    <img className='sidemenu__routing__logo' src='/img/logo.png' alt='logo'/>
                    <Link className='sidemenu__routing__link' to='/'>Мои ответы</Link>
                    <Link className='sidemenu__routing__link link-selected' to='/archive'>Архив</Link>
                    <Link className='sidemenu__routing__link' to='/allposts'>Общий список</Link>
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
                            <th scope="col">Объект</th>
                            <th scope="col">Фамилия осн.заемщика</th>
                            <th scope="col">Город</th>
                            <th scope="col">Сумма</th>
                            <th scope="col">Ставка</th>
                            <th scope="col">Срок</th>
                            <th scope="col">Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {answers ? answers.map((answer, i)=>{return (<tr key={i} className='userposts__post'>
                            <th onClick={() => {history.push(`/post/${answer.post_id}`)}}>{answer.id}</th>
                            <td onClick={() => {history.push(`/post/${answer.post_id}`)}}>{answer.createdAt}</td>
                            <td onClick={() => {history.push(`/post/${answer.post_id}`)}}>{answer.object}</td>
                            <td onClick={() => {history.push(`/post/${answer.post_id}`)}}>{answer.fio}</td>
                            <td onClick={() => {history.push(`/post/${answer.post_id}`)}}>{answer.city}</td>
                            <td onClick={() => {history.push(`/post/${answer.post_id}`)}}>{answer.amount.toLocaleString()}</td>
                            <td onClick={() => {history.push(`/post/${answer.post_id}`)}}>{answer.rate}</td>
                            <td onClick={() => {history.push(`/post/${answer.post_id}`)}}>{answer.period}</td>
                            <td onClick={() => {history.push(`/post/${answer.post_id}`)}}>{answer.status}</td>
                            <td><button className='btn btn-success' onClick={() => toArchive(answer.id)}>Вернуть</button></td>
                            </tr>)}) : null}
                    </tbody>
                </table>
                </div>
            </div>
        </div>

    )
}
export default InvestorArchive;