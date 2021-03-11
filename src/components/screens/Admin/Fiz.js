import React, {useContext, useEffect, useState} from 'react'
const Fiz = (props) => {
    return(
    <div className='fizuserb'><>
                                <label for="1">Статус</label>
                                <select id="1" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].status = e.target.value}}>
                                    <option value="" selected disabled hidden>{props.person.status}</option>
                                    <option value='Заёмщик'>Заёмщик</option>
                                    <option value='Собственник'>Собственник</option>
                                    <option value='Предыдущий владелец'>Предыдущий владелец</option>
                                </select>
                            </>
                            <>
                                <label for="2">Фио</label>
                                <input id="2" type="text" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].fullname = e.target.value}} defaultValue = {props.person.fullname} />
                            </>
                            <>
                                <label for="3">Дата рождения</label>
                                <input id="3" type="date" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].birth = e.target.value}} defaultValue = {props.person.birth} />
                            </>
                            <>
                                <label for="4">Возраст</label>
                                <input id="4" type="number" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].age = e.target.value}} defaultValue = {props.person.age} />
                            </>
                            <>
                                <label for="5">Паспорт серия и номер</label>
                                <input id="5" type="text" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].pnumber = e.target.value}} defaultValue = {props.person.pnumber} />
                            </>                            <>
                                <label for="6">Паспорт дата выдачи</label>
                                <input id="6" type="date" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].pdate = e.target.value}} defaultValue = {props.person.pdate} />
                            </>                            <>
                                <label for="7">ИНН</label>
                                <input id="7" type="number" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].inn = e.target.value}} defaultValue = {props.person.inn} />
                            </>                            <>
                                <label for="7">СНИЛС</label>
                                <input id="7" type="number" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].snils = e.target.value}} defaultValue = {props.person.snils} />
                            </>
                            <>
                                <label for="8">Документ основания</label>
                                <select id="8" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].document = e.target.value}}>
                                    <option value="" selected disabled hidden>{props.person.document}</option>
                                    <option value='Договор купли-продажи'>Договор купли-продажи</option>
                                    <option value='Договор дарения'>Договор дарения</option>
                                    <option value='Договор приватизации'>Договор приватизации</option>
                                    <option value='Договор мены'>Договор мены</option>
                                    <option value='Наследство'>Наследство</option>
                                </select></>
                            <>
                                <label for="9">Год регистрации объекта</label>
                                <input id="9" type="number" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].regyear = e.target.value}} defaultValue = {props.person.regyear} />
                            </>
                            <>
                                <label for="10">Запись в Росреестре</label>
                                <input id="10" type="text" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].rosreestr = e.target.value}} defaultValue = {props.person.rosreestr} />
                            </>
                            <>
                                <label for="11">Доля в объекте</label>
                                <input id="11" type="text" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].percents = e.target.value}} defaultValue = {props.person.percents} />
                            </>
                            <><label for="12">СЕМ.ПОЛОЖЕНИЕ</label>
                                <select id="12" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].family = e.target.value}}>
                                    <option value="" selected disabled hidden>{props.person.family}</option>
                                    <option value='В браке'>В браке</option>
                                    <option value='Не в браке'>Не в браке</option>
                                    <option value='Не имеет значения'>Не имеет значения</option>
                                </select></>
                            <><label for="14">СОГЛАСИЕ СУПРУГИ(А)</label>
                                <select id="14" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].agreement = e.target.value}}>
                                    <option value="" selected disabled hidden>{props.person.agreement}</option>
                                    <option value='Требуется'>Требуется</option>
                                    <option value='Не требуется'>Не требуется</option>
                                    <option value='Не имеет значения'>Не имеет значения</option>
                                </select></>
                            <><label for="15">Мат.Капитал</label>
                                <select id="15" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].mothercapital = e.target.value}}>
                                    <option value="" selected disabled hidden>{props.person.mothercapital}</option>
                                    <option value='Да'>Да</option>
                                    <option value='Нет'>Нет</option>
                                    <option value='Не имеет значения'>Не имеет значения</option>
                                </select></>
                            <><label for="16">Несовершеннолетние дети</label>
                                <select id="16" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].kids = e.target.value}}>
                                    <option value="" selected disabled hidden>{props.person.kids}</option>
                                    <option value='Да'>Да</option>
                                    <option value='Нет'>Нет</option>
                                    <option value='Не имеет значения'>Не имеет значения</option>
                                </select></>
                            </div>)
}
export default Fiz;