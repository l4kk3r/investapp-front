import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import {UserContext} from '../../../App'
import {useHistory, Link} from 'react-router-dom'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';

const AdminUsers = () => {
    const history = useHistory()
    const [users, setUsers] = useState([])
    const [usersinfo, setUsersInfo] = useState([])
    const [displaying, setDisplaying] = useState([])
    const [opened, setOpened] = useState(null)
    const [published_filter, setPublishedFilter] = useState(true)
    const [moderation_filter, setModerationFilter] = useState(true)
    const [blocked_filter, setBlockedFilter] = useState(true)
    const [ptrigger, setPersonTrigger] = useState(true)
    const [searchfield, setSearchFilter] = useState("")
    const colorsd = {'Модерация': '#291F1E', 'Заблокирован': '#EF5B5B', 'Активный': '#028858'}
    const options = [
        'Модерация', 'Активный', 'Заблокирован'
    ];
    const changepost = (i) => {
        axios.put(`https://investappp.herokuapp.com/api/user/${usersinfo[i].id}`, usersinfo[i]).then(ans => { console.log(ans); toast.info('Заявка успешно сохранена') })
    }
    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch('https://investappp.herokuapp.com/api/user/not_archived',{method:"get", headers: {"Content-Type":"application/json"}}).then(ans=>ans.json()).then(realans=>{setUsersInfo(realans.users); console.log(realans); setUsers(realans.users); })
    }, [])
    const toArchive = (needed_id) => {
        setUsers(users.filter(pst => pst.id !== needed_id))
        axios.post("https://investappp.herokuapp.com/api/user/admin/archive", {id: needed_id, archived: true}).then(ans => console.log(ans))
    }
    const openfunc = (i) => {
        setOpened(i)
        return;
    }
    useEffect(()=>{
        if (users) {
            console.log(users)
            setDisplaying(users.map((user, i)=>(
                <div className='mainwrappera' style={{display: user.id ? user.id.toString().includes(searchfield) ? user.status === 'Активный' ? published_filter ? 'block' : 'none' : user.status === 'Модерация' ? moderation_filter ? 'block' : 'none' : user.status === "Заблокирован" ? blocked_filter ? 'block' : 'none' : 'none' : 'none' : 'none'}}>
                    <div className='postbox'>
                        <h4 onClick={() => openfunc(i)} >#{user.id}</h4>
                        <h4 onClick={() => openfunc(i)} >{user.acctype}</h4>
                        <h4 onClick={() => openfunc(i)} >{user.firstname}</h4>
                        <h4 onClick={() => openfunc(i)} >{user.lastname}</h4>
                        <h4 onClick={() => openfunc(i)} >{user.phone}</h4>
                        <h4 onClick={() => openfunc(i)} >{user.email}</h4>
                        <h4 onClick={() => openfunc(i)} >{user.companyname ? user.companyname : '-'}</h4>
                        <h4 onClick={() => openfunc(i)} style={{color: colorsd[user.status]}}>{user.status}</h4>
                        <h4 onClick={() => toArchive(user.id)} className='btn btn-warning'>В архив</h4>
                    </div>
                    
                    <div style={{display: (i === opened) ? 'block' : 'none'}} className='postinfo'>
                        <h3>Параметры сделки</h3>
                        <div className='infobox'>
                            <div className='changer status'>
                                <h4>Статус:</h4>
                                <Dropdown  options={options} onChange={(e) => {usersinfo[i].status = e.value;}} value={user.status} />
                            </div>
                            <div className='changer'>
                                <h4>Тип:</h4>
                                <input type='text' onChange={(e) => {usersinfo[i].acctype = e.target.value}} defaultValue={user.acctype}/>
                            </div>
                            <div className='changer'>
                                <h4>Имя:</h4>
                                <input type='text' onChange={(e) => {usersinfo[i].firstname = e.target.value}} defaultValue={user.firstname}/>
                            </div>
                            <div className='changer'>
                                <h4>Фамилия:</h4>
                                <input type='text' onChange={(e) => {usersinfo[i].lastname = e.target.value}} defaultValue={user.lastname}/>
                            </div>
                            <div className='changer'>
                                <h4>Телефон:</h4>
                                <input type='text' onChange={(e) => {usersinfo[i].phone = e.target.value}} defaultValue={user.phone}/>
                            </div>
                            <div className='changer'>
                                <h4>Почта:</h4>
                                <input type='text' onChange={(e) => {usersinfo[i].email = e.target.value}} defaultValue={user.email}/>
                            </div>
                            <div className='changer'>
                                <h4>Компания:</h4>
                                <input type='text' onChange={(e) => {usersinfo[i].companyname = e.target.value}} defaultValue={user.companyname}/>
                            </div>
                        </div>
                    </div>
                    <button className='okbutton' style={{display: (i === opened) ? 'flex' : 'none'}} onClick={() => changepost(i)}>Сохранить</button>
                </div>
            )))
        }
    },[users, opened, moderation_filter, published_filter, ptrigger, blocked_filter, searchfield])
    return (
        <div className='maincontainer'>
            <ToastContainer>
            </ToastContainer>
            <Helmet>
                <title>SHAR | Админ.Пользователи</title>
            </Helmet>
            <div className='sidemenu'>
                <div className='sidemenu__routing'>
                    <img className='sidemenu__routing__logo' src='/img/logo.png' alt='logo'/>
                    <Link className='sidemenu__routing__link' to='/admin'>Модерация постов</Link>
                    <Link className='sidemenu__routing__link' to='/admin/archived'>Архив постов</Link>
                    <Link className='sidemenu__routing__link link-selected' to='/admin/users'>Модерация пользователей</Link>
                    <Link className='sidemenu__routing__link' to='/admin/users/archived'>Архив пользователей</Link>
                    <Link className='sidemenu__routing__link' to='/allposts'>Общий список</Link>
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
            <div className='moderations'>
                <div className='search_bar'>
                            <div class="input-group mb-3 search_bar_input">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-sizing-default"><i class="fa fa-search"></i></span>
                                </div>
                                <input type="text" onChange={(e) => setUsers(usersinfo.filter(p => ((p.firstname ? p.firstname.toString() : '') + (p.lastname ? p.lastname.toString() : '') + (p.middlename ? p.middlename.toString() : '') + (p.companyname ? p.companyname : '') + (p.email ? p.email : '') + (p.phone ? p.phone : '') + p.status).includes(e.target.value.replaceAll(' ', '')) ))} class="form-control" aria-label="Поиск" aria-describedby="inputGroup-sizing-default" />
                            </div>
                </div>
                { opened ? <div key={opened} style={{display: opened ? 'block' : 'none'}} className='moderation__userinfo'>
                        <h3>Параметры пользователя</h3>
                        <div className='moderation__userinfo__change'>
                            <div className='moderation__userinfo-item card status'>
                                <h4>Статус:</h4>
                                <Dropdown  options={options} onChange={(e) => {usersinfo[opened].status = e.value;}} value={usersinfo[opened].status} />
                            </div>
                            <div className='moderation__userinfo-item card'>
                                <h4>Тип:</h4>
                                <input type='text' onChange={(e) => {usersinfo[opened].acctype = e.target.value}} defaultValue={usersinfo[opened].acctype}/>
                            </div>
                            <div className='moderation__userinfo-item card'>
                                <h4>Имя:</h4>
                                <input type='text' onChange={(e) => {usersinfo[opened].firstname = e.target.value}} defaultValue={usersinfo[opened].firstname}/>
                            </div>
                            <div className='moderation__userinfo-item card'>
                                <h4>Фамилия:</h4>
                                <input type='text' onChange={(e) => {usersinfo[opened].lastname = e.target.value}} defaultValue={usersinfo[opened].lastname}/>
                            </div>
                            <div className='moderation__userinfo-item card'>
                                <h4>Телефон:</h4>
                                <input type='text' onChange={(e) => {usersinfo[opened].phone = e.target.value}} defaultValue={usersinfo[opened].phone}/>
                            </div>
                            <div className='moderation__userinfo-item card'>
                                <h4>Почта:</h4>
                                <input type='text' onChange={(e) => {usersinfo[opened].email = e.target.value}} defaultValue={usersinfo[opened].email}/>
                            </div>
                            <div className='moderation__userinfo-item card'>
                                <h4>Компания:</h4>
                                <input type='text' onChange={(e) => {usersinfo[opened].companyname = e.target.value}} defaultValue={usersinfo[opened].companyname}/>
                            </div>
                        </div>
                        <div  className='moderation__userinfo__savebutton__wrapper'>
                            <button className='btn btn-secondary moderation__userinfo__savebutton' style={{marginBottom: '20px'}} onClick={() => changepost(opened)}>Сохранить</button>
                        </div>
                    </div> : null }
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th >ID</th>
                            <th >Тип</th>
                            <th >Имя</th>
                            <th >Фамилия</th>
                            <th >Телефон</th> 
                            <th >Почта</th> 
                            <th >Компания</th> 
                            <th >Статус</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => {return (<tr className='moderation__userrow' onClick={() => openfunc(i)} key={i}> <td >#{user.id}</td>
                        <td onClick={() => openfunc(i)} >{user.acctype}</td>
                        <td onClick={() => openfunc(i)} >{user.firstname}</td>
                        <td onClick={() => openfunc(i)} >{user.lastname}</td>
                        <td onClick={() => openfunc(i)} >{user.phone}</td>
                        <td onClick={() => openfunc(i)} >{user.email}</td>
                        <td onClick={() => openfunc(i)} >{user.companyname ? user.companyname : '-'}</td>
                        <td onClick={() => openfunc(i)} style={{color: colorsd[user.status]}}>{user.status}</td>
                        <td onClick={() => toArchive(user.id)} className='btn btn-warning'>В архив</td>
                        </tr>)})}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
export default AdminUsers;