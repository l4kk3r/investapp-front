import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import {UserContext} from '../../../App'
import {useHistory, Link} from 'react-router-dom'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Fiz from './Fiz'
import AdminPost from './AdminPost'
import axios from 'axios';

const Admin = () => {
    const history = useHistory()
    const [posts, setPosts] = useState([])
    const [postsinfo, setPostsInfo] = useState([])
    const [fiz, setFiz] = useState(['ppp'])
    const [displaying, setDisplaying] = useState(['sdsd'])
    const [opened, setOpened] = useState('notstated')
    const [searchfield, setSearchFilter] = useState("")
    const [answers, setAnswers] = useState("")
    const options = [
        'Ожидание ответов', 'На модерации', 'Отклонено', 'Заблокировано', 'Получен ответ'
    ];
    const changepost = (i) => {
        const token = JSON.parse(localStorage.getItem("token"))
        fetch('https://investapp-back.herokuapp.com/updatepost',{
            method:'post',
            headers:{
                "Content-Type":"application/json" ,
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(postsinfo[i])
        }).then(ans=>ans.json()).then(realans=>console.log(realans))
    }
    useEffect(() => {
        axios.get("https://investapp-back.herokuapp.com/admin/allposts").then(result => {setPosts(result.data.posts); setPostsInfo(result.data.posts); console.log(result.data.answers); setAnswers(result.data.answers)})
        }, [])
    const openfunc = (i) => {
        if (opened === i) {
            setOpened('notstated')
            return;
        }
        setOpened(i)
        return;
    }
    return (
        <div className='maincontainer'>
            <div className='sidemenu'>
                <div className='sidemenu__routing'>
                    <img className='sidemenu__routing__logo' src='/img/logo.png' alt='logo'/>
                    <Link className='sidemenu__routing__link link-selected' to='/admin'>Модерация постов</Link>
                    <Link className='sidemenu__routing__link' to='/admin/users'>Модерация пользователей</Link>
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
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <input placeholder='Поиск...' className='searcher' type='text' onChange={(e) => setSearchFilter(e.target.value)} />
                    </div>
                </div>
                {(opened != 'notstated') && postsinfo ? <div style={{display: opened != 'notstated' ? 'block' : 'none'}} key={opened} className='postinfo'>
                        <h3>Параметры сделки</h3>
                        <div className='moderations__changecards'>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Статус:</h4>
                                <Dropdown  options={options} onChange={(e) => {postsinfo[opened].status = e.value;}} value={postsinfo[opened].status} />
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Объект:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].object = e.target.value}} defaultValue={postsinfo[opened].object}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Город:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].city = e.target.value}} defaultValue={postsinfo[opened].city}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Регион:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].region = e.target.value}} defaultValue={postsinfo[opened].region}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Сумма займа:</h4>
                                <input type='number' onChange={(e) => {postsinfo[opened].amount = e.target.value}} defaultValue={postsinfo[opened].amount}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Ежемесячная ставка:</h4>
                                <input type='number' onChange={(e) => {postsinfo[opened].rate = e.target.value}} defaultValue={postsinfo[opened].rate}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Цель займа:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].reason = e.target.value}} defaultValue={postsinfo[opened].reason}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Фамилия основного заемщика:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].borrower_lname = e.target.value}} defaultValue={postsinfo[opened].borrower_lname}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Есть ИП или ООО:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].isIP = e.target.value}} defaultValue={postsinfo[opened].isIP}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Срок финансирования:</h4>
                                <input type='number' onChange={(e) => {postsinfo[opened].period = e.target.value}} defaultValue={postsinfo[opened].period}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Фотографии:</h4>
                                {postsinfo[opened].photos.map((photo, index)=>(<a key={index} href={photo}>Фото {index + 1}</a>))}
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Архив с документами:</h4>
                                <a href={postsinfo[opened].archive}>Скачать</a>
                            </div>
                        </div>
                        <h3>Информация по объекту</h3>
                        <div className='moderations__infobox'>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Кадастровый номер 1:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].kadastr_tag = e.target.value}} defaultValue={postsinfo[opened].kadastr_tag}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Кадастровый номер 2:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].kadastr_tag2 = e.target.value}} defaultValue={postsinfo[opened].kadastr_tag2}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Адрес объекта:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].adress = e.target.value}} defaultValue={postsinfo[opened].adress}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Координата 1:</h4>
                                <input type='number' onChange={(e) => {postsinfo[opened].coordinates_x = e.target.value}} defaultValue={postsinfo[opened].coordinates_x}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Координата 2:</h4>
                                <input type='number' onChange={(e) => {postsinfo[opened].coordinates_y = e.target.value}} defaultValue={postsinfo[opened].coordinates_y}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Дата перехода прав:</h4>
                                <input type='number' onChange={(e) => {postsinfo[opened].access_year = e.target.value}} defaultValue={postsinfo[opened].access_year}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Стоимость:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].price_link = e.target.value}} defaultValue={postsinfo[opened].price_link}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Стоимость залога:</h4>
                                <input type='number' onChange={(e) => {postsinfo[opened].zalog = e.target.value}} defaultValue={postsinfo[opened].zalog}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Количество собственников:</h4>
                                <input type='number' onChange={(e) => {postsinfo[opened].owners_number = e.target.value}} defaultValue={postsinfo[opened].owners_number}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Местонахождение (Яндекс):</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].adress_link = e.target.value}} defaultValue={postsinfo[opened].adress_link}/>
                            </div>
                        </div>
                        <h3>Ответы</h3>
                        <div className='answersbox'>
                            <table className='table table-bordered table-hover'><thead><tr><th >ID</th><th >Ставка</th><th >Сумма</th><th>Период</th><th >Статус</th></tr></thead>
                            <tbody>{answers ? (answers.filter(answer => answer.post_id === postsinfo[opened].id).map((ans, i) => <tr key={i}><td >Вариант {i + 1}</td><td >{ans.rate}</td><td >{ans.amount}</td><td>{ans.period}</td><td>{ans.status}</td></tr>)) : null}</tbody></table>
                        </div>
                        <h3>Информация по физлицам</h3>
                        <div className='fizbox'>
                            {postsinfo[opened] ? postsinfo[opened].fiz.map((person, index) => {
                                return (
                                    <Fiz person={person} key={index} index={index} i={opened} postsinfo={postsinfo}/>
                                )
                            }) : null}
                            {postsinfo[opened].fiz.length < 4 ? <button className='btn btn-secondary' onClick={() => { postsinfo[opened].fiz.push({status: "", fullname: "", birth: "", age: "", pnumber: "", pdate: "", inn: "", snils: "", dcoument: "", regyear: "", rosreestr: "", percents: ""}); console.log(postsinfo[opened].fiz); setFiz(old=>[...old, "new"]) } }>Добавить физ.лицо</button> : null }
                        </div>
                        <div  className='moderation__userinfo__savebutton__wrapper'>
                            <button className='btn btn-primary moderation__userinfo__savebutton' style={{marginBottom: '20px'}} onClick={() => changepost(opened)}>Сохранить</button>
                        </div>
                    </div> : null}
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Дата</th>
                            <th scope="col">Сумма</th>
                            <th scope="col">Ставка</th>
                            <th scope="col">Город</th> 
                            <th scope="col">Объект</th> 
                            <th scope="col">ФИО</th> 
                            <th scope="col">Статус</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {posts ? posts.map((post, i) => {return ( <AdminPost openfunc={openfunc} index={i} key={i} post={post} /> ) } ) : null}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
export default Admin;