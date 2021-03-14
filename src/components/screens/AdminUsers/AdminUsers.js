import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import {UserContext} from '../../../App'
import {useHistory, Link} from 'react-router-dom'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

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
        const token = localStorage.getItem("token")
        fetch('https://investapp-back.herokuapp.com/updateuser',{
            method:'post',
            headers:{
                "Content-Type":"application/json" ,
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(usersinfo[i])
        }).then(ans=>ans.json()).then(realans=>console.log(realans))
    }
    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch('https://investapp-back.herokuapp.com/allusers',{method:"get", headers: {"Content-Type":"application/json"}}).then(ans=>ans.json()).then(realans=>{setUsersInfo(realans.users); console.log(realans); setUsers(realans.users); })
    }, [])
    const openfunc = (i) => {
        setOpened(i)
        return;
    }
    useEffect(()=>{
        if (users) {
            console.log(users)
            setDisplaying(users.map((user, i)=>(
                <div className='mainwrappera' style={{display: user.id ? user.id.toString().includes(searchfield) ? user.status === 'Активный' ? published_filter ? 'block' : 'none' : user.status === 'Модерация' ? moderation_filter ? 'block' : 'none' : user.status === "Заблокирован" ? blocked_filter ? 'block' : 'none' : 'none' : 'none' : 'none'}}>
                    <div onClick={() => openfunc(i)} className='postbox'>
                        <h4 >#{user.id}</h4>
                        <h4 >{user.acctype}</h4>
                        <h4 >{user.firstname}</h4>
                        <h4 >{user.lastname}</h4>
                        <h4 >{user.phone}</h4>
                        <h4 >{user.email}</h4>
                        <h4 >{user.companyname ? user.companyname : '-'}</h4>
                        <h4 style={{color: colorsd[user.status]}}>{user.status}</h4>
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
            <div className='sidemenu'>
                <div className='sidemenu__routing'>
                    <img className='sidemenu__routing__logo' src='/img/logo.png' alt='logo'/>
                    <Link className='sidemenu__routing__link' to='/admin'>Модерация постов</Link>
                    <Link className='sidemenu__routing__link link-selected' to='/admin/users'>Модерация пользователей</Link>
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
                <div className='moderations__settings'>
                    <div className='moderations__settings__filters'>
                        <label><input type="checkbox" onChange={() => setPublishedFilter(!published_filter)} checked={published_filter}/>Активный</label>
                        <label><input type="checkbox" onChange={() => setModerationFilter(!moderation_filter)} checked={moderation_filter}/>Модерация</label>
                        <label><input type="checkbox" onChange={() => setBlockedFilter(!blocked_filter)} checked={blocked_filter}/>Заблокирован</label>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <input placeholder='Поиск...' className='searcher' type='text' onChange={(e) => setSearchFilter(e.target.value)} />
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
                        <td >{user.acctype}</td>
                        <td >{user.firstname}</td>
                        <td >{user.lastname}</td>
                        <td >{user.phone}</td>
                        <td >{user.email}</td>
                        <td >{user.companyname ? user.companyname : '-'}</td>
                        <td style={{color: colorsd[user.status]}}>{user.status}</td></tr>)})}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
export default AdminUsers;