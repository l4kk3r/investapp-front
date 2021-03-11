import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import axios from 'axios';
import {UserContext} from '../../../App'
import {Link} from 'react-router-dom'
 

const LogoutPage = () => {
    const {state, dispatch} = useContext(UserContext)


    useEffect(() => {
        if (state) {
            dispatch({type:"CLEAR"})
            console.log(state)
        }
    }, [state])

    return (
        <div className='profile'>
            <h2>Вы вышли из своего аккаунта</h2>
            <Link className='btn btn-primary' path='/signin'>Войти</Link>
        </div>

    )
}
export default LogoutPage;