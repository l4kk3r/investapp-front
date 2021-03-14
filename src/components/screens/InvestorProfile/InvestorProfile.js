import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import axios from 'axios';
import {UserContext} from '../../../App'
import {Link, useHistory} from 'react-router-dom'
 

const InvestorProfile = () => {
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

    useEffect(() => {
        if (state) {
            axios.post("https://investapp-back.herokuapp.com/user/answers", {investor_id: state.id}).then(res=>{console.log(res); setAnswers(res.data.answers)}) }
    }, [state])

    return (
        <div className='profile'>
            <div className='sidemenu'>
                <div className='sidemenu__routing'>
                    <img className='sidemenu__routing__logo' src='/img/logo.png' alt='logo'/>
                    <Link className='sidemenu__routing__link link-selected' to='/'>Мои ответы</Link>
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
                        {answers ? answers.map((answer, i)=>{return (<tr key={i} onClick={() => {history.push(`/post/${answer.post_id}`)}} className='userposts__post'>
                            <th>{answer.id}</th>
                            <td>{answer.createdAt}</td>
                            <td>{answer.object}</td>
                            <td>{answer.fio}</td>
                            <td>{answer.city}</td>
                            <td>{answer.amount}</td>
                            <td>{answer.rate}</td>
                            <td>{answer.period}</td>
                            <td>{answer.status}</td>
                            </tr>)}) : null}
                    </tbody>
                </table>
                </div>
            </div>
        </div>

    )
}
export default InvestorProfile;