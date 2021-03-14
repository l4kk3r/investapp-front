import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import axios from 'axios'
import {UserContext} from '../../../App'
import {Link, useHistory} from 'react-router-dom'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const AllPosts = () => {
    const history = useHistory()
    const [posts, setPosts] = useState([])
    const [display_posts, setDisplayPosts] = useState([])
    const {dispatch} = useContext(UserContext)
    useEffect(() => {
        if (posts.length > 0) {
            setDisplayPosts(posts.map((post, i) => (
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
            )))
        }
    },[posts])
    useEffect(() => {
        fetch('https://investapp-back.herokuapp.com/user/allpublished').then(ans=> ans.json()).then(realans=> setPosts(realans.posts))
    }, [])
    return (
        <div className='profile'>
            <div className='sidemenu'>
                <div className='sidemenu__routing'>
                    <img className='sidemenu__routing__logo' src='/img/logo.png' alt='logo'/>
                    <Link className='sidemenu__routing__link' to='/'>Мои ответы</Link>
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
            <div className='posts'>
                {display_posts}
            </div>
        </div>

    )
}
export default AllPosts;