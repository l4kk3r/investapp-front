import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import axios from 'axios'
import {UserContext} from '../../../App'
import {Link, useHistory} from 'react-router-dom'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { Helmet } from 'react-helmet'

const AllPosts = () => {
    const history = useHistory()
    const {state, dispatch} = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [allposts, setAllPosts] = useState([])
    const [filter, setFilter] = useState(null)
    const [display_posts, setDisplayPosts] = useState([])
    useEffect(() => {
        if (state) {
            axios.post('https://investapp-back.herokuapp.com/user/allpublished', {id: state.id}).then(realans => {setAllPosts(realans.data.posts); setFilter(realans.data.filter); setPosts(realans.data.posts)})
        }}, [state])
    const checkSearch = (adress) => {
        const keywords = filter.search.split(' ')
        for (let keyword in keywords) {
            if ( !adress.toLowerCase().includes(keywords[keyword]) ) {
                console.log(adress, keyword)
                return false;
            }
        }
        return true;
    }
    const saveFilters = () => {
        console.log(filter)
        setPosts(allposts.filter(post => post.amount > filter.min_amount && post.amount < filter.max_amount && post.period > filter.min_period && post.period < filter.max_period && post.rate > filter.min_rate && post.rate < filter.max_rate && filter.objects.includes(post.object) && checkSearch(post.adress + post.region + post.city)))
    }
    const saveFiltersToDb = () => {
        axios.post('https://investapp-back.herokuapp.com/user/update-filters', {id: state.id, filter}).then(ans => console.log(ans))
    }
    return (
        <div className='profile'>
            <Helmet>
                <title>SHAR | Общий список</title>
            </Helmet>
            <div className='sidemenu'>
                <div className='sidemenu__routing'>
                    <img className='sidemenu__routing__logo' src='/img/logo.png' alt='logo'/>
                    <Link className='sidemenu__routing__link' to='/'>Мои ответы</Link>
                    <Link className='sidemenu__routing__link' to='/'>Архив</Link>
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
            <div className='posts__data'>
                {filter ? <div className='posts__filter__wrapper'>
                    <div className='posts__filter'>
                        <div className='posts__filter__card card text-white bg-secondary'>
                            <div className='posts__filter__row'>
                                <p>Минимальная цена:</p>
                                <input type='number' onInput={(e) => filter.min_amount = Number(e.target.value)} defaultValue={filter.min_amount} />
                            </div>
                            <div className='posts__filter__row'>
                                <p>Максимальная цена:</p>
                                <input type='number' onInput={(e) => filter.max_amount = Number(e.target.value)} defaultValue={filter.max_amount} />
                            </div>
                        </div>
                        <div className='posts__filter__card card text-white bg-secondary'>
                            <div className='posts__filter__row'>
                                <p>Минимальный срок:</p>
                                <input type='number' onInput={(e) => filter.min_period = Number(e.target.value)} defaultValue={filter.min_period} />
                            </div>
                            <div className='posts__filter__row'>
                                <p>Максимальный срок:</p>
                                <input type='number' onInput={(e) => filter.max_period = Number(e.target.value)} defaultValue={filter.max_period} />
                            </div>
                        </div>
                        <div className='posts__filter__card card text-white bg-secondary'>
                            <div className='posts__filter__row'>
                                <p>Минимальная ставка:</p>
                                <input type='number' onInput={(e) => filter.min_rate = Number(e.target.value)} defaultValue={filter.min_rate} />
                            </div>
                            <div className='posts__filter__row'>
                                <p>Максимальная ставка:</p>
                                <input type='number' onInput={(e) => filter.max_rate = Number(e.target.value)} defaultValue={filter.max_rate} />
                            </div>
                        </div>
                        <div className='posts__filter__card card text-white bg-secondary'>
                            <div className='posts__filter__row'>
                                <p>Местоположение:</p>
                                <input type='text' placeholder='Поиск...' onInput={(e) => filter.search = e.target.value.toLowerCase()}  defaultValue={filter.search} />
                            </div>
                        </div>
                        <div className='posts__filter__card card text-white bg-secondary'>
                            <p>Тип объектов</p>
                            <div className='posts__filter__card__checkboxes'>
                                <input onInput={(e) => {console.log(e.target.value); filter.objects.includes(e.target.value) ? filter.objects.splice(filter.objects.indexOf(e.target.value), 1) : filter.objects.push(e.target.value)}} defaultChecked={filter.objects.includes('Квартира')} id='cobj_1' value='Квартира' type='checkbox' />
                                <label for='cobj_1'>Квартира</label>
                                <input onInput={(e) => {filter.objects.includes(e.target.value) ? filter.objects.splice(filter.objects.indexOf(e.target.value), 1) : filter.objects.push(e.target.value)}} defaultChecked={filter.objects.includes('Дом')}  id='cobj_2' value='Дом' type='checkbox' />
                                <label for='cobj_2'>Дом</label>
                                <input onInput={(e) => {filter.objects.includes(e.target.value) ? filter.objects.splice(filter.objects.indexOf(e.target.value), 1) : filter.objects.push(e.target.value)}} defaultChecked={filter.objects.includes('Земельный участок')}  id='cobj_3' value='Земельный участок' type='checkbox' />
                                <label for='cobj_3'>Земельный участок</label>
                                <input onInput={(e) => {filter.objects.includes(e.target.value) ? filter.objects.splice(filter.objects.indexOf(e.target.value), 1) : filter.objects.push(e.target.value)}} defaultChecked={filter.objects.includes('Коммерция')}  id='cobj_4' value='Коммерция' type='checkbox' />
                                <label for='cobj_4'>Коммерция</label>
                            </div>
                        </div>
                    </div>
                    <div className='posts__filter__button'>
                        <button onClick={() => saveFilters()} className='btn btn-primary'>Применить</button>
                        <button onClick={() => saveFiltersToDb()} className='btn btn-secondary'>Сохранить</button>
                    </div>
                </div> : null }
                <div className='posts'>
                    {posts.map((post, i) => (
                        <div onClick={() => history.push(`/post/${post.id}`)} className='item-container'> 
                            <div className='onitemphoto'><h4>Подробнее</h4></div><div className='itemphoto' style={{backgroundImage: `url(${post.photos[0]})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                            <div className='iteminfo'>
                            <div className='item-row'>
                                <h3 className='objectname'  type='text'>{post.object}</h3>
                            </div>
                            <div className='item-row'>
                                <h4>Ставка:</h4>
                                <p type='text'>{post.rate} </p>
                            </div>
                            <div className='item-row'>
                                <h4>Сумма займа:</h4>
                                <p   type='number'>{post.amount} </p>
                            </div>
                            <div className='item-row'>
                                <h4>Срок финансирования:</h4>
                                <p  type='text'>{post.period} </p>
                            </div>
                            <div className='item-row'>
                                <h4>Местонахождение:</h4>
                                <p  type='text'>{post.adress} </p>
                            </div>
                            <div className='revenue'>
                                <h4>≈ {Math.round(post.amount / 100 * post.rate)}₽</h4>
                                <p>Ежемесячная прибыль</p>
                            </div>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}
export default AllPosts;