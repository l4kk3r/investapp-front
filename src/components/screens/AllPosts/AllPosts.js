import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import axios from 'axios'
import Select from 'react-select'
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
            axios.post('http://localhost:5500/api/post/allpublished', {user_id: state.id}).then(realans => {setAllPosts(realans.data.posts); console.log(realans.data.filter); setFilter(realans.data.filter); setPosts(realans.data.posts)})
        }}, [state])
    // const checkSearch = (adress) => {
    //     const keywords = filter.search.split(' ')
    //     for (let keyword in keywords) {
    //         if ( !adress.toLowerCase().includes(keywords[keyword]) ) {
    //             console.log(adress, keyword)
    //             return false;
    //         }
    //     }
    //     return true;
    // }
    const regions = [
        { value: 'По умолчанию', label: 'По умолчанию' },  
        { value: 'Республика Адыгея', label: 'Республика Адыгея' },      
    { value: 'Республика Алтай', label: 'Республика Алтай'},      
    {
      value: 'Республика Башкортостан',
      label: 'Республика Башкортостан '
    },
    { value: 'Республика Бурятия', label: 'Республика Бурятия'},  
    { value: 'Республика Дагестан', label: 'Республика Дагестан'},
    { value: 'Республика Ингушетия', label: 'Республика Ингушетия'},
    {
      value: 'Кабардино-Балкарская Республика',
      label: 'Кабардино-Балкарская Республика'
    },
    { value: 'Республика Калмыкия', label: 'Республика Калмыкия'},
    {
      value: 'Карачаево-Черкесская Республика',
      label: 'Карачаево-Черкесская Республика'
    },
    { value: 'Республика Карелия', label: 'Республика Карелия'},
    { value: 'Республика Коми', label: 'Республика Коми'},
    { value: 'Республика Марий Эл', label: 'Республика Марий Эл'},
    { value: 'Республика Мордовия', label: 'Республика Мордовия' },
    {
      value: 'Республика Саха (Якутия)',
      label: 'Республика Саха (Якутия) '
    },
    {
      value: 'Республика Северная Осетия - Алания',
      label: 'Республика Северная Осетия - Алания '
    },
    { value: 'Республика Татарстан', label: 'Республика Татарстан' },
    { value: 'Республика Тыва', label: 'Республика Тыва'},
    { value: 'Удмуртская Республика', label: 'Удмуртская Республика'},
    { value: 'Республика Хакасия', label: 'Республика Хакасия'},
    { value: 'Чеченская Республика', label: 'Чеченская Республика' },
    { value: 'Чувашская Республика', label: 'Чувашская Республика' },
    { value: 'Алтайский край', label: 'Алтайский край' },
    { value: 'Забайкальский край', label: 'Забайкальский край' },
    { value: 'Камчатский край', label: 'Камчатский край' },
    { value: 'Краснодарский край', label: 'Краснодарский край' },
    { value: 'Красноярский край', label: 'Красноярский край' },
    { value: 'Пермский край', label: 'Пермский край' },
    { value: 'Приморский край', label: 'Приморский край' },
    { value: 'Ставропольский край', label: 'Ставропольский край' },
    { value: 'Хабаровский край', label: 'Хабаровский край' },
    { value: 'Амурская область', label: 'Амурская область' },
    { value: 'Архангельская область', label: 'Архангельская область' },
    { value: 'Астраханская область', label: 'Астраханская область' },
    { value: 'Белгородская область', label: 'Белгородская область' },
    { value: 'Брянская область', label: 'Брянская область'},
    { value: 'Владимирская область', label: 'Владимирская область'},
    { value: 'Волгоградская область', label: 'Волгоградская область'},
    { value: 'Вологодская область', label: 'Вологодская область'},
    { value: 'Воронежская область', label: 'Воронежская область'},
    { value: 'Ивановская область', label: 'Ивановская область'},
    { value: 'Иркутская область', label: 'Иркутская область'},
    {
      value: 'Калининградская область',
      label: 'Калининградская область'
    },
    { value: 'Калужская область', label: 'Калужская область'},
    { value: 'Кемеровская область', label: 'Кемеровская область'},
    { value: 'Кировская область', label: 'Кировская область'},
    { value: 'Костромская область', label: 'Костромская область'},
    { value: 'Курганская область', label: 'Курганская область'},
    { value: 'Курская область', label: 'Курская область'},
    { value: 'Ленинградская область', label: 'Ленинградская область'},
    { value: 'Липецкая область', label: 'Липецкая область'},
    { value: 'Магаданская область', label: 'Магаданская область' },
    { value: 'Московская область', label: 'Московская область'},
    { value: 'Мурманская область', label: 'Мурманская область'},
    { value: 'Нижегородская область', label: 'Нижегородская область'},
    { value: 'Новгородская область', label: 'Новгородская область'},
    { value: 'Новосибирская область', label: 'Новосибирская область'},
    { value: 'Омская область', label: 'Омская область' },
    { value: 'Оренбургская область', label: 'Оренбургская область'},
    { value: 'Орловская область', label: 'Орловская область'},
    { value: 'Пензенская область', label: 'Пензенская область'},
    { value: 'Псковская область', label: 'Псковская область'},
    { value: 'Ростовская область', label: 'Ростовская область'},
    { value: 'Рязанская область', label: 'Рязанская область'},
    { value: 'Самарская область', label: 'Самарская область'},
    { value: 'Саратовская область', label: 'Саратовская область'},
    { value: 'Сахалинская область', label: 'Сахалинская область'},
    { value: 'Свердловская область', label: 'Свердловская область'},
    { value: 'Смоленская область', label: 'Смоленская область'},
    { value: 'Тамбовская область', label: 'Тамбовская область'},
    { value: 'Тверская область', label: 'Тверская область'},
    { value: 'Томская область', label: 'Томская область'},
    { value: 'Тульская область', label: 'Тульская область' },
    { value: 'Тюменская область', label: 'Тюменская область'},
    { value: 'Ульяновская область', label: 'Ульяновская область'},
    { value: 'Челябинская область', label: 'Челябинская область'},
    { value: 'Ярославская область', label: 'Ярославская область' },
    { value: 'Москва', label: 'Москва' },
    { value: 'Санкт-Петербург', label: 'Санкт-Петербург' },
    { value: 'Еврейская АО', label: 'Еврейская АО' },
    { value: 'Ненецкий АО', label: 'Ненецкий АО' },
    { value: 'Ханты-Мансийский АО', label: 'Ханты-Мансийский АО' },
    { value: 'Чукотский АО', label: 'Чукотский АО' },
    { value: 'Ямало-Ненецкий АО', label: 'Ямало-Ненецкий АО' },
  ]
    const saveFilters = () => {
        console.log(filter)
        setPosts(allposts.filter(post => post.amount >= filter.min_amount && post.amount <= filter.max_amount && post.zalog >= filter.min_zalog && post.zalog <= filter.max_zalog && post.period >= filter.min_period && post.period <= filter.max_period && post.rate >= filter.min_rate && post.rate <= filter.max_rate && filter.objects.includes(post.object) && filter.loan_types.includes(post.loan_type) && (post.region.toLowerCase() === filter.search.toLowerCase() || filter.search === 'По умолчанию' )))
    }
    const saveFiltersToDb = () => {
        console.log(filter)
        axios.post('http://localhost:5500/api/user/updatefilters', {id: state.id, filter}).then(ans => console.log(ans))
    }
    const showAll = () => {
        setPosts(allposts)
    }
    return (
        <div className='profile'>
            <Helmet>
                <title>SHAR | Общий список</title>
            </Helmet>
            <div className='sidemenu'>
                {state ? state.acctype === 'investor' ? (
                    <div className='sidemenu__routing'>
                        <img className='sidemenu__routing__logo' src='/img/logo.png' alt='logo'/>
                        <Link className='sidemenu__routing__link' to='/'>Мои ответы</Link>
                        <Link className='sidemenu__routing__link' to='/'>Архив</Link>
                        <Link className='sidemenu__routing__link link-selected' to='/allposts'>Общий список</Link>
                        <Link className='sidemenu__routing__link' to='/userdata'>Мои данные</Link>
                        <a href='/logout' className='btn btn-danger' >Выйти</a>
                    </div>
                ) : (
                    <div className='sidemenu__routing'>
                        <img className='sidemenu__routing__logo' src='/img/logo.png' alt='logo'/>
                        <Link className='sidemenu__routing__link' to='/admin'>Модерация постов</Link>
                        <Link className='sidemenu__routing__link' to='/admin/archived'>Архив постов</Link>
                        <Link className='sidemenu__routing__link' to='/admin/users'>Модерация пользователей</Link>
                        <Link className='sidemenu__routing__link' to='/admin/users/archived'>Архив пользователей</Link>
                        <Link className='sidemenu__routing__link link-selected' to='/allposts'>Общий список</Link>
                        <a href='/logout' className='btn btn-danger' >Выйти</a>
                    </div>
                )
                 : null}
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
                                <p>Сумма займа от:</p>
                                <input type='number' onInput={(e) => filter.min_amount = Number(e.target.value)} defaultValue={filter.min_amount} />
                            </div>
                            <div className='posts__filter__row'>
                                <p>Сумма займа до:</p>
                                <input type='number' onInput={(e) => filter.max_amount = Number(e.target.value)} defaultValue={filter.max_amount} />
                            </div>
                        </div>
                        <div className='posts__filter__card card text-white bg-secondary'>
                            <div className='posts__filter__row'>
                                <p>Стоимость объекта от:</p>
                                <input type='number' onInput={(e) => filter.min_zalog = Number(e.target.value)} defaultValue={filter.min_zalog} />
                            </div>
                            <div className='posts__filter__row'>
                                <p>Стоимость объекта до:</p>
                                <input type='number' onInput={(e) => filter.max_zalog = Number(e.target.value)} defaultValue={filter.max_zalog} />
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
                                {filter ? <Select className='region-select' onChange={(e) =>{filter.search = e.value}} placeholder={filter.search}  options = {regions} /> : null}
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
                        <div className='posts__filter__card card text-white bg-secondary'>
                            <p>Тип займа</p>
                            <div className='posts__filter__card__checkboxes'>
                                <input onInput={(e) => {console.log(e.target.value); filter.loan_types.includes(e.target.value) ? filter.loan_types.splice(filter.loan_types.indexOf(e.target.value), 1) : filter.loan_types.push(e.target.value)}} defaultChecked={filter.loan_types.includes('Аннуитет')} id='cloan_1' value='Аннуитет' type='checkbox' />
                                <label for='cloan_1'>Аннуитет</label>
                                <input onInput={(e) => {filter.loan_types.includes(e.target.value) ? filter.loan_types.splice(filter.loan_types.indexOf(e.target.value), 1) : filter.loan_types.push(e.target.value)}} defaultChecked={filter.loan_types.includes('Только проценты')}  id='cloan_2' value='Только проценты' type='checkbox' />
                                <label for='cloan_2'>Только проценты</label>
                            </div>
                        </div>
                    </div>
                    <div className='posts__filter__button'>
                        <button onClick={() => showAll()} className='btn btn-secondary'>Показать все</button>
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
                                    <p   type='number'>{post.amount.toLocaleString().replace(',', ' ')} руб.</p>
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
                                    <h4>≈ {Math.round(post.amount / 100 * post.rate).toLocaleString().replace(',', ' ')} руб.</h4>
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