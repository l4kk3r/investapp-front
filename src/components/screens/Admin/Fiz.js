import React, {useContext, useEffect, useState} from 'react'
const Fiz = (props) => {
    return(
    <div className='fizuserb card' ><>
                                <label htmlFor="1">Статус</label>
                                <select id="1" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].status = e.target.value}}>
                                    <option value="" selected disabled hidden>{props.person.status}</option>
                                    <option value='Заёмщик'>Заёмщик</option>
                                    <option value='Собственник'>Собственник</option>
                                    <option value='Заёмщик и собственник'>Заёмщик и собственник</option>
                                    <option value='Предыдущий владелец'>Предыдущий владелец</option>
                                </select>
                            </>
                            <>
                                <label htmlFor="2_1">Имя</label>
                                <input id="2_1" type="text" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].firstname = e.target.value}} defaultValue = {props.person.firstname} />
                            </>
                            <>
                                <label htmlFor="2_2">Фамилия</label>
                                <input id="2_2" type="text" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].lastname = e.target.value}} defaultValue = {props.person.lastname} />
                            </>
                            <>
                                <label htmlFor="2_3">Отчество</label>
                                <input id="2_3" type="text" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].middlename = e.target.value}} defaultValue = {props.person.middlename} />
                            </>
                            <>
                                <label htmlFor="3">Дата рождения</label>
                                <input id="3" type="date" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].birth = e.target.value}} defaultValue = {props.person.birth} />
                            </>
                            <>
                                <label htmlFor="4">Возраст</label>
                                <input id="4" type="number" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].age = e.target.value}} defaultValue = {props.person.age} />
                            </>
                            <>
                                <label htmlFor="5">Паспорт серия и номер</label>
                                <input id="5" type="text" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].pnumber = e.target.value}} defaultValue = {props.person.pnumber} />
                            </>                            <>
                                <label htmlFor="6">Паспорт дата выдачи</label>
                                <input id="6" type="date" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].pdate = e.target.value}} defaultValue = {props.person.pdate} />
                            </>                            <>
                                <label htmlFor="7">ИНН</label>
                                <input id="7" type="number" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].inn = e.target.value}} defaultValue = {props.person.inn} />
                            </>                            <>
                                <label htmlFor="7">СНИЛС</label>
                                <input id="7" type="number" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].snils = e.target.value}} defaultValue = {props.person.snils} />
                            </>
                            <>
                                <label htmlFor="8">Документ основания</label>
                                <select id="8" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].document = e.target.value}}>
                                    <option value="" selected disabled hidden>{props.person.document}</option>
                                    <option value='Договор купли-продажи'>Договор купли-продажи</option>
                                    <option value='Договор дарения'>Договор дарения</option>
                                    <option value='Договор приватизации'>Договор приватизации</option>
                                    <option value='Договор мены'>Договор мены</option>
                                    <option value='Наследство'>Наследство</option>
                                </select></>
                            <>
                                <label htmlFor="9">Год регистрации объекта</label>
                                <input id="9" type="number" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].regyear = e.target.value}} defaultValue = {props.person.regyear} />
                            </>
                            <>
                                <label htmlFor="10">Запись в Росреестре</label>
                                <input id="10" type="text" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].rosreestr = e.target.value}} defaultValue = {props.person.rosreestr} />
                            </>
                            <>
                                <label htmlFor="11">Доля в объекте</label>
                                <input id="11" type="text" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].percents = e.target.value}} defaultValue = {props.person.percents} />
                            </>
                            <><label htmlFor="12">СЕМ.ПОЛОЖЕНИЕ</label>
                                <select id="12" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].family = e.target.value}}>
                                    <option value="" selected disabled hidden>{props.person.family}</option>
                                    <option value='В браке'>В браке</option>
                                    <option value='Не в браке'>Не в браке</option>
                                    <option value='Не имеет значения'>Не имеет значения</option>
                                </select></>
                            <><label htmlFor="14">СОГЛАСИЕ СУПРУГИ(А)</label>
                                <select id="14" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].agreement = e.target.value}}>
                                    <option value="" selected disabled hidden>{props.person.agreement}</option>
                                    <option value='Требуется'>Требуется</option>
                                    <option value='Не требуется'>Не требуется</option>
                                    <option value='Не имеет значения'>Не имеет значения</option>
                                </select></>
                            <><label htmlFor="15">Мат.Капитал</label>
                                <select id="15" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].mothercapital = e.target.value}}>
                                    <option value="" selected disabled hidden>{props.person.mothercapital}</option>
                                    <option value='Да'>Да</option>
                                    <option value='Нет'>Нет</option>
                                    <option value='Не имеет значения'>Не имеет значения</option>
                                </select></>
                            <><label htmlFor="16">Несовершеннолетние дети</label>
                                <select id="16" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].kids = e.target.value}}>
                                    <option value="" selected disabled hidden>{props.person.kids}</option>
                                    <option value='Да'>Да</option>
                                    <option value='Нет'>Нет</option>
                                    <option value='Не имеет значения'>Не имеет значения</option>
                                </select></>
                                <>
                                <label htmlFor="17">ФССП</label>
                                <input id="17" type="number" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].fssp = e.target.value}} defaultValue = {props.person.fssp} />
                            </>
                            <>
                                <label htmlFor="18">Банкротство</label>
                                <select id="18" onChange={(e) => {props.postsinfo[props.i].fiz[props.index].bankrupt = e.target.value}}>
                                    <option value="" selected disabled hidden>{props.person.bankrupt}</option>
                                    <option value='Да'>Да</option>
                                    <option value='Нет'>Нет</option>
                                    <option value='Было ранее'>Было ранее</option>
                                </select>
                            </>
                            <>
                                <label htmlFor="19">Суды</label>
                                <select id="19" onChange={(e) => {if (e.target.value == 'Да') { document.getElementById(`convictions_links_${props.i}_${props.index}`).style.display = 'block' } else {document.getElementById(`convictions_links_${props.i}_${props.index}`).style.display = 'none'}; props.postsinfo[props.i].fiz[props.index].convictions = e.target.value}}>
                                    <option value="" selected disabled hidden>{props.person.convictions}</option>
                                    <option value='Да'>Да</option>
                                    <option value='Нет'>Нет</option>
                                </select>
                            </>
                            {props.person.convictions === "Да" ?<div id={`convictions_links_${props.i}_${props.index}`} style={{ display: props.person.convictions == 'Да' ? 'block' : 'none' }}>
                                <input placeholder='Дело №1' id={`cls_input_${props.i}_${props.index}_1`} defaultValue={props.postsinfo[props.i].fiz[props.index].convictions_links[0]} onChange={(e) => {props.postsinfo[props.i].fiz[props.index].convictions_links = [document.getElementById(`cls_input_${props.i}_${props.index}_1`).value, document.getElementById(`cls_input_${props.i}_${props.index}_2`).value, document.getElementById(`cls_input_${props.i}_${props.index}_3`).value]}} />
                                <input placeholder='Дело №2' id={`cls_input_${props.i}_${props.index}_2`} defaultValue={props.postsinfo[props.i].fiz[props.index].convictions_links[1]}   onChange={(e) => {props.postsinfo[props.i].fiz[props.index].convictions_links = [document.getElementById(`cls_input_${props.i}_${props.index}_1`).value, document.getElementById(`cls_input_${props.i}_${props.index}_2`).value, document.getElementById(`cls_input_${props.i}_${props.index}_3`).value]}} />
                                <input placeholder='Дело №3' id={`cls_input_${props.i}_${props.index}_3`} defaultValue={props.postsinfo[props.i].fiz[props.index].convictions_links[2]}   onChange={(e) => {props.postsinfo[props.i].fiz[props.index].convictions_links = [document.getElementById(`cls_input_${props.i}_${props.index}_1`).value, document.getElementById(`cls_input_${props.i}_${props.index}_2`).value, document.getElementById(`cls_input_${props.i}_${props.index}_3`).value]}} />
                            </div> : null }
                                <button onClick={() => {props.deleteFiz(props.i, props.index)}} className='btn btn-danger'>Удалить</button>
                            </div>)
}
export default Fiz;