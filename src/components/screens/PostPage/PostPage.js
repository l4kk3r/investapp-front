import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import {UserContext} from '../../../App'
import {useHistory, Link} from 'react-router-dom'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Popup from 'reactjs-popup';
import { Helmet } from 'react-helmet'
import ReactLoading from 'react-loading';
import 'reactjs-popup/dist/index.css';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import axios from 'axios';
import FizUser from './FizUser'
const TITLE = 'TOP APP'

const PostPage = (props) => {
    const history = useHistory()
    const [post, setPost] = useState("")
    const [investamount, setInvestAmount] = useState("")
    const [investrate, setInvestRate] = useState("")
    const [investperiod, setInvestPeriod] = useState("")
    const [investcomment, setInvestComment] = useState("")
    const [show, setShow] = useState(false)
    const [monthly, setMonthly] = useState("")
    const [sended, setSended] = useState(false)
    const [fake_loading, setFakeLoading] = useState(false)
    const {state, dispatch} = useContext(UserContext)
    
    const sendRequest = (e) => {
        axios.post("https://investapp-back.herokuapp.com/user/newanswer", {creator_id: post.creator_id, investor_info: `${state.firstname} ${state.lastname}, ${state.phone}, ${state.email}`, investor_id: state.id, post_id: post.id, object: post.object, city: post.city, fio: post.borrower_lname, amount: investamount, period: investperiod, rate: investrate, comment: investcomment }).then(response => response.data.message == 'Ответ успешно отправлен' ? setSended(true) : null)
    }

    useEffect(()=>{    
        axios.post("https://investapp-back.herokuapp.com/user/post", {id: props.match.params.id}).then(response => {console.log(response); const post = response.data.post[0]; setInvestAmount(post.amount); setInvestRate(post.rate); setInvestPeriod(post.period); setPost(response.data.post[0])})
    },[])
    return (
        <>
            <Helmet>
            <title>{ TITLE }</title>
            </Helmet>
        <div className='postpage__wapper'>

            <div className='sidemenu'>
                <div className='sidemenu__routing'>
                    <img className='sidemenu__routing__logo' src='/img/logo.png' alt='logo'/>
                    <Link className='sidemenu__routing__link' to='/'>Мои ответы</Link>
                    <Link className='sidemenu__routing__link' to='/archive'>Архив</Link>
                    <Link className='sidemenu__routing__link link-selected' to='/allposts'>Общий список</Link>
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
            {!post ? <div className='loading-wrapper'><ReactLoading className='loading' type={"spinningBubbles"} color={"#4472C4"} height={'100px'} width={'100px'}/></div> : (
            <div className='postpage'>
            <Link className='postpage__homelink' to='/allposts'>Главная</Link>
            <div className='objectitle'>
                {/* <img style={{marginTop: '0'}} src={post.object === 'Квартира' ? '/appartment.png' : post.object === 'Дом' ? '/home.png' : post.object === 'Земельный участок' ? '/field.png' : '/shop.png' }/> */}
                <h1>{post.object} <span style={{color: '#656969'}}>г. {post.city}, {post.region}</span></h1> 
            </div>
                <div className='topinfo'>
                    <div className='info-container'>
                        <h3>Ежемесячный доход</h3>
                        <p>{post.amount / 100 * post.rate} ₽</p>
                    </div>
                    <div className='info-container'>
                        <h3>Ставка</h3>
                        <p>{post.rate} %</p>
                    </div>
                    <div className='info-container'>
                        <h3>Сумма инвестиций</h3>
                        <p>{post.amount} ₽</p>
                    </div>
                    <div className='info-container'>
                        <h3>Срок финансирования</h3>
                        <p>{post.period} мес.</p>
                    </div>
                </div>
        <div className='middleinfo' style={{marginBottom: '20px'}}>
            <div className='left'>
                
                <AwesomeSlider bullets={show ? false : true} style={{marginBottom: show ? '10px' : null ,height: show ? 'calc(50% - 10px)' : '80%'}} loader-bar-color='transparent'>
                    {post ? post.photos.map(photo => (
                        <div data-src={photo}></div>
                    )) : null}
                </AwesomeSlider>

                {post.coordinates_x && post.coordinates_y ? <YMaps>
                <div style={{width:'100%', marginTop: show ? '10px' : null, height: show ? 'calc(50% - 10px)' : '20%'}} className='down'>
                    {show ? <Map style={{width: '100%', height: '100%'}} defaultState={{ center: [post.coordinates_x, post.coordinates_y], zoom: 15 }}>
                        <p className='closemap' onClick={() => setShow(!show)}>&#x25BC; Скрыть карту</p>
                        <Placemark options ={{preset: 'islands#dotIcon', iconColor: '#FF6163'}} defaultGeometry={[post.coordinates_x, post.coordinates_y]} geоmetry={[post.coordinates_x, post.coordinates_y]}/>
                    </Map> : null}
                    {!show ? <p className='open-cart' onClick={() => setShow(!show)}><img src='/img/yandex-map.png' />Показать на карте</p> : null}
                    </div>
                </YMaps> : null}
            </div>
            <div className='right'>
                <div className='info-container2'>
                    <h3 style={{marginTop:0}}>Местонахождение</h3>
                    <p>{post.adress}, {post.city}</p>
                </div>
                <div className='info-container2'>
                    <h3>Цель займа</h3>
                    <p>{post.reason}</p>
                </div>
                <div className='info-container2'>
                    <h3>Стоимость залога</h3>
                    <p>{post.zalog} ₽</p>
                </div>
                <div className='info-container2'>
                    <h3>Количество собственников</h3>
                    <p>{post.owners_number}</p>
                </div> 
                {post.kadastr_tag2 ? <div className='info-container2'>
                    <h3>Кадастровые номера</h3>
                    <p style={{marginRight: '5px'}}>{post.kadastr_tag}</p>
                    <p>{post.kadastr_tag2}</p>
                </div> : <div className='info-container2'>
                    <h3>Кадастровый номер</h3>
                    <p>{post.kadastr_tag}</p>
                </div>}
                <div className='info-container2'>
                    <h3>Тип займа</h3>
                    <p>{post.loan_type}</p>
                </div> 
                <div className='info-container2'>
                    <h3>Тип сделки</h3>
                    <p>{post.deal_type}</p>
                </div> 
                <div className='info-container2'>
                    <h3>Документ основание</h3>
                    <p>{post.document}</p>
                </div> 
                { state ? state.acctype === 'investor' ? (<div className='lowerinfo'>
                <Popup style={{borderRadius:'5px'}}  modal closeOnDocumentClick trigger={<button className='answer-button'>Сделать предложение</button>} position="center center">
                {!sended ? (<div className='ans-popup'>
                    <div className='popupinfo'>
                    <div>
                        <h2><span style={{color:'#028858'}}>Сумма</span> инвестирования</h2>
                        <input value={investamount} onChange={(e) => setInvestAmount(e.target.value)} type='number' />
                    </div>
                    <div>
                        <h2><span style={{color:'#028858'}}>Срок</span> финансирования</h2>
                        <input value={investperiod} onChange={(e) => setInvestPeriod(e.target.value)} type='number' />
                    </div>
                    <div>
                        <h2>Процентная <span style={{color:'#028858'}}>ставка</span></h2>
                        <input value={investrate} onChange={(e) => setInvestRate(e.target.value)} type='number' />
                    </div>
                    <div>
                        <textarea  value={investcomment} onChange={(e) => setInvestComment(e.target.value)} placeholder='Свободный комментарий'></textarea>
                    </div>
                    <button onClick={(e) => sendRequest(e)}>Сделать предложение</button></div>
                </div>) : (<div>
                    <h2>Ваше <span style={{color:'#028858'}}>предложение</span> успешно <span style={{color:'#028858'}}>отправлено!</span></h2>
                </div>)}
            </Popup>
            <Popup style={{borderRadius:'5px'}}  modal closeOnDocumentClick trigger={<button className='answer-button2'>Проверить объект</button>} position="center center">
                <div className='objectinfo'>
                    <div className='objectinfo__popupinfo'>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Кадастровый номер 1:</h4>
                                <p>{post.kadastr_tag}</p>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Кадастровый номер 2:</h4>
                                <p>{post.kadastr_tag2}</p>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Адрес объекта:</h4>
                                <p>{post.adress}</p>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Дата перехода прав:</h4>
                                <p>{post.access_year ? post.access_year.split("-").reverse().join("-") : null}</p>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Стоимость (ссылка):</h4>
                                <p>{post.price_link}</p>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Стоимость залога:</h4>
                                <p>{post.zalog}</p>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Докменты:</h4>
                                <a href={post.archive}>Скачать</a>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Количество собственников:</h4>
                                <p>{post.owners_number}</p>
                            </div>
                    </div>
                    { post.fiz.length > 0 ? <div className='objectinfo__popupinfo__fiz'>
                        <h3>Данные по физ.лицам</h3>
                        <div className='objectinfo__popupinfo__fiz__wrapper'>
                            {post.fiz.map((fiz, index) => { return (
                                <div className='objectinfo__popupinfo__fiz-item'>
                                    <FizUser key={index} fiz={fiz} />
                                </div>)
                            })}
                        </div>
                    </div> : null }
                </div>
            </Popup>
            <a href={post.archive}><button className='answer-button2'>Скачать документы</button></a>
        </div>): null : null}
            </div>
        </div>
            </div>)}
    </div>
    </>
    )
}
export default PostPage;