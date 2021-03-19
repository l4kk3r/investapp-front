import React, {useContext, useEffect, useState} from 'react'
const FizUser = (props) => {
    return(
    <div className='fizuserb card' ><>
                            <label for="1">Статус</label>
                            <p>{props.fiz.status}</p>
                            </>
                            <>
                                <label for="2_1">Имя</label>
                                <p>{props.fiz.firstname}</p>
                            </>
                            <>
                                <label for="2_2">Фамилия</label>
                                <p>{props.fiz.lastname}</p>
                            </>
                            <>
                                <label for="2_3">Отчество</label>
                                <p>{props.fiz.middlename}</p>
                            </>
                            <>
                                <label for="3">Дата рождения:</label>
                                <p>{props.fiz.birth}</p>
                            </>
                            <>
                                <label for="4">Возраст:</label>
                                <p>{props.fiz.age}</p>
                            </>
                            <>
                                <label for="8">Документ основания:</label>
                                <p>{props.fiz.document}</p></>
                            <>
                                <label for="9">Год регистрации объекта:</label>
                                <p>{props.fiz.regyear}</p>
                            </>
                            <>
                                <label for="10">Запись в Росреестре:</label>
                                <p>{props.fiz.rosreestr}</p>
                            </>
                            <>
                                <label for="11">Доля в объекте:</label>
                                <p>{props.fiz.percents}</p>
                            </>
                            <><label for="12">СЕМ.ПОЛОЖЕНИЕ:</label>
                            <p>{props.fiz.family}</p></>
                            <><label for="14">СОГЛАСИЕ СУПРУГИ(А):</label>
                            <p>{props.fiz.agreement}</p></>
                            <><label for="15">Мат.Капитал:</label>
                            <p>{props.fiz.mothercapital}</p></>
                            <><label for="16">Несовершеннолетние дети:</label>
                            <p>{props.fiz.kids}</p></>
                            <><label for="17">ФССП:</label>
                            <p>{props.fiz.fssp}</p></>
                            <><label for="18">Банкротство:</label>
                            <p>{props.fiz.bankrupt}</p></>
                            <><label for="19">Суды:</label>
                            <p>{props.fiz.convictions}</p></>
                            <><label for="19">Суды-ссылки:</label>
                            {props.fiz.convictions_links.map(link => {return (<p>{link}</p>)})}</>
                            </div>)
}
export default FizUser;