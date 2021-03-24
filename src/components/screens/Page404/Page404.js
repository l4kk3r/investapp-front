import React, {useContext, useEffect, useState} from 'react'
import { Helmet } from 'react-helmet'
import './styles.css'

const Page404 = () => {
    return (
        <div className='page404'>
            <Helmet>
                <title>SHAR | Объявление</title>
            </Helmet>
            <h1>404</h1>
            <h4>Похоже данной страницы не существует</h4>
            <a class='btn btn-primary' href='/'>Мой профиль</a>
        </div>

    )
}
export default Page404;