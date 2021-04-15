import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import {UserContext} from '../../../App'
import Select from 'react-select'
import imageCompression from 'browser-image-compression';
import {Link, useHistory} from 'react-router-dom'
import ReactLoading from 'react-loading';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const NewPost = () => {
    const history = useHistory()
    const {state, dispatch} = useContext(UserContext)
    const [newpost, setNewPost] = useState({photos: []})
    const [archiveloading, setArchiveLoading] = useState(false)
    const [dop_archiveloading, setDopArchiveLoading] = useState(false)
    const [archive, setArchive] = useState("")
    const [dop_archive, setDopArchive] = useState("")
    const [photos, setPhotos] = useState([])
    const [photosurls, setPhotoUrls] = useState([])
    const [sended, setSended] = useState(false)
    const [server_response, setServerResponse] = useState(false)
    const options = [
        'Квартира', 'Дом', 'Земельный участок', 'Коммерция'
    ];
    const options2 = [
        'Да', 'Нет', 'Откроется'
    ];
    const regions = [{ value: 'Республика Адыгея', label: 'Республика Адыгея' },      
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
    useEffect(() => {
        if (state) {
            newpost.creator_id = state.id
        }
    }, [state])
    useEffect(() => {
        if ((sended) && (photosurls.length === photos.length) && (state) && (archive)) {
            newpost.creator = {
                id: state.id,
                firstname: state.firstname,
                lastname: state.lastname,
                middlename: state.middlename,
                company: state.company,
                phone: state.phone,
                email: state.email
            }
            axios.post("https://investappp.herokuapp.com//api/post", newpost).then(result => setServerResponse(result.data.message))
        }
    }, [sended, photosurls, state, archive])

    const uploadToServer = (photo) => {
        const data = new FormData();
        data.append("file", photo)
        axios.post("https://investappp.herokuapp.com//api/aws/upload-image", data).then(answer => {
            if (!answer.data.error) {
                newpost.photos.push(answer.data.url)
                setPhotoUrls(old=>[...old, answer.data.url])
            }
        })
    }
    const uploadArchive = (archive) => {
        setArchiveLoading(true)
        const data = new FormData();
        data.append("file", archive)
        axios.post("https://investappp.herokuapp.com//api/aws/upload-archive", data).then(answer => {
            if (!answer.data.error) {
                if (newpost.archive) {
                    const file_key = newpost.archive.replace('https://comeinvest.s3.amazonaws.com/', '').replace('https://comeinvest.s3.us-east-2.amazonaws.com/', '')
                    axios.post("https://investappp.herokuapp.com//api/aws/delete-file", {file_key}).then(answer => console.log(answer))
                }
                newpost.archive = answer.data.url
                setArchiveLoading(false)
                setArchive(answer.data.url)
            }
        })
    }
    const uploadDopArchive = (archive) => {
        setDopArchiveLoading(true)
        const data = new FormData();
        data.append("file", archive)
        axios.post("https://investappp.herokuapp.com//api/aws/upload-archive", data).then(answer => {
            if (!answer.data.error) {
                if (newpost.dop_archive) {
                    const file_key = newpost.dop_archive.replace('https://comeinvest.s3.amazonaws.com/', '').replace('https://comeinvest.s3.us-east-2.amazonaws.com/', '')
                    axios.post("https://investappp.herokuapp.com//api/aws/delete-file", {file_key}).then(answer => console.log(answer))
                }
                newpost.dop_archive = answer.data.url
                setDopArchiveLoading(false)
                setDopArchive(answer.data.url)
            }
        })
    }
    const sendData = () => {
        if (!archive) {
            setServerResponse('Архив документов не загружен')
            return;
        }
        else if (!(photosurls.length === photos.length)) {
            setServerResponse('Дождитесь загрузки фотографий')
            return;
        }
        setSended(true)
    }
    const inputPhotos = (e) => {
        const files = e.target.files
        const max_photos = Math.min(10 - photos.length, files.length)
        for (let i = 0; i < max_photos; i++ ) {
            uploadToServer(files[i])
            setPhotos(old => [...old, files[i]])
        }
    }
    const deletePhoto = (i) => {
        const file_key = photosurls[i - 1].replace('https://comeinvest.s3.amazonaws.com/', '').replace('https://comeinvest.s3.us-east-2.amazonaws.com/', '')
        axios.post("https://investappp.herokuapp.com//aws/delete-file", {file_key}).then(answer => console.log(answer))
        const new_photos = photos.slice(0, i - 1).concat(photos.slice(i, photos.length))
        const new_photosurls = photosurls.slice(0, i - 1).concat(photosurls.slice(i, photosurls.length))
        newpost.photos.pop(photosurls[i])
        console.log(newpost.photos)
        setPhotos(new_photos)
        setPhotoUrls(new_photosurls)
    }
    return (
        <div className='create'>
            <Helmet>
                <title>SHAR | Новая заявка</title>
            </Helmet>
            <div className='sidemenu'>
                <div className='sidemenu__routing'>
                    <img className='sidemenu__routing__logo' src='/img/logo.png' alt='logo'/>
                    <Link className='sidemenu__routing__link' to='/'>Мои заявки</Link>
                    <Link className='sidemenu__routing__link' to='/archive'>Архив</Link>
                    <Link className='sidemenu__routing__link link-selected' to='/newpost'>Новая заявка</Link>
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

            {server_response !== "Новая запись успешно создана" ? <div><div id='first_window' className='create__form'>
                <div className='create__form__inputgroup'>
                    <div className='create__form__left'>
                        <div className="create__form__group card">
                            <h4>Объект и сумма</h4>
                            <div className="create__form__group-item">
                                <label htmlFor='select-object' className='label-required'>Выберите тип недвижимости</label>
                                <Select placeholder='Выберите...' options={[{value: 'Квартира', label: 'Квартира'}, {value: 'Дом', label: 'Дом'}, {value: 'Земельный участок', label: 'Земельный участок'}, {value: 'Коммерция', label: 'Коммерция'}]} onChange={(e) => newpost.object = e.value}  id="select-object" />
                            </div>
                            <div className="create__form__group-item">
                                <label htmlFor="input-amount" className="form-label label-required">Сумма в рублях</label>
                                <input min="0" type='number' onInput={(e) => newpost.amount = e.target.value} placeholder='Укажите сумму' className="form-control" id="input-amount" />
                            </div>
                        </div>
                        <div className="create__form__group card">
                            <h4>Цель займа</h4>
                            <div className="create__form__group-item">
                                <label htmlFor="input-reason" className="form-label label-required">Укажите цель займа</label>
                                <input onInput={(e) => newpost.reason = e.target.value} placeholder='Пополнение оборотных средств' className="form-control" id="input-reason" />
                            </div>
                        </div>
                        <div className="create__form__group card">
                            <h4>Тип займа</h4>
                            <div className="create__form__group-item">
                                <label htmlFor="select-loan_type" className="form-labe label-required">Выберите тип займа</label>
                                <Select placeholder='Выберите...' options={[{value: 'Аннуитет', label: 'Аннуитет'}, {value: 'Только проценты', label: 'Только проценты'}]} onChange={(e) => newpost.loan_type = e.value}  id="select-loan_type" />
                            </div>
                        </div>
                    </div>
                    <div className='create__form__right'>
                        <div className="create__form__group card">
                            <h4>Ставка и срок</h4>
                            <div className="create__form__group-item">
                                <label htmlFor="input-rate" className="form-label label-required">Ставка (в месяц)</label>
                                <Select placeholder='Выберите...' onChange={ (e) => newpost.rate = e.value }  options={[
                                    { value: '1', label: '1' },
                                    { value: '2', label: '2' },
                                    { value: '3', label: '3' },
                                    { value: '4', label: '4' },
                                    { value: '5', label: '5' },
                                    { value: '6', label: '6' },
                                    { value: '7', label: '7' },
                                    { value: '8', label: '8' },
                                    { value: '9', label: '9' },
                                    { value: '10', label: '10' }
                                ]} />
                            </div>
                            <div className="create__form__group-item">
                                <label htmlFor="input-period" className="form-label label-required">Срок (в месяц)</label>
                                <Select placeholder='Выберите...' onChange={ (e) => {newpost.period = e.value; console.log(e.value)} }  options={[
                                    { value: 'до 12', label: 'до 12' },
                                    { value: ' до 24', label: ' до 24' },
                                    { value: 'до 36', label: 'до 36' },
                                    { value: ' до 48', label: ' до 48' },
                                    { value: 'до 60', label: 'до 60' }
                                    ]} />
                            </div>
                        </div>
                        <div className="create__form__group card">
                            <h4>Место работы</h4>
                            <div className="create__form__group-item">
                                <label htmlFor="input-borrower_work" className="form-label label-required">Место работы</label>
                                <Select placeholder='Выберите...' onChange={ (e) => newpost.borrower_work = e.value }  options={[{value: 'Работа по найму', label: 'Работа по найму'}, {value: 'ИП или ООО', label: 'ИП или ООО'}]} />
                                <input style={{ marginTop: '10px' }} className="form-control" onChange={ (e) => newpost.borrower_work_position = e.value }  placeholder = 'Должность' />
                                <input style={{ marginTop: '10px' }} className="form-control" onChange={ (e) => newpost.borrower_work_salary = e.value }  placeholder = 'Зарплата' />
                            </div>
                            <div className="create__form__group-item">
                                <label htmlFor='select-isIP' className='label-required'>Есть ИП или ООО?</label>
                                <Select placeholder='Есть ИП или ООО?' options={[
                                    { value: 'Да', label: 'Да' },
                                    { value: 'Нет', label: 'Нет' },
                                    { value: 'Скоро откроется', label: 'Скоро откроется' }
                                    ]} onChange={(e) => newpost.isIP = e.value}  id="select-isIP" />
                            </div>
                        </div>
                        <div className="create__form__group card">
                            <h4>Тип сделки</h4>
                            <div className="create__form__group-item">
                                <label htmlFor="select-deal_type" className="form-label label-required">Выберите тип сделки</label>
                                <Select placeholder='Выберите...' options={[
                                    { value: 'Займ под залог', label: 'Займ под залог' },
                                    { value: 'Обратный выкуп (ДКП)', label: 'Обратный выкуп (ДКП)' },
                                    { value: 'Срочная продажа', label: 'Срочная продажа' }
                                    ]} onChange={(e) => newpost.deal_type = e.value} id="select-deal_type" />
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={() => {document.getElementById('first_window').style.display = 'none'; document.getElementById('second_window').style.display = 'flex'}} className='create__form__inputgroup__button btn btn-primary'>Далее</button>
            </div>
            <div id='second_window' style={{display: 'none'}} className='create__form'>
                { server_response ? <h3 className='create__form__errormessage'>{server_response}</h3> : null }
                <div className='create__form__inputgroup'>
                    <div className='create__form__left'>
                        <div className="create__form__group card">
                            <div className="create__form__group-item">
                                <label htmlFor="input-borrower_lname" className="form-label label-required">Фамилия основного заемщика</label>
                                <input onInput={(e) => newpost.borrower_lname = e.target.value} className="form-control" id="input-borrower_lname" />
                            </div>
                            <div className="create__form__group-item">
                                <label htmlFor="input-borrower_lname" className="form-label">Телефон основного заемщика</label>
                                <input onInput={(e) => newpost.borrower_phone = e.target.value} className="form-control" id="input-borrower_lname" />
                            </div>
                            <div className="create__form__group-item">
                                <label htmlFor="input-city" className="form-label">Город объекта</label>
                                <input onInput={(e) => newpost.city = e.target.value} className="form-control" id="input-city" />
                            </div>
                        </div>
                    </div>
                    <div className='create__form__right'>
                        <div className="create__form__group card">
                            <div className="create__form__group-item">
                                <label htmlFor="input-region" className="form-label">Республика, Область, Край</label>
                                <Select onChange={(e) => newpost.region = e.value} placeholder='Выберите...' options = {regions} />
                            </div>
                            <div className="create__form__group-item">
                                <label htmlFor="input-adress" className="form-label">Точный адрес</label>
                                <input onInput={(e) => newpost.adress = e.target.value} className="form-control" id="input-adress" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='create__form__inputfile'>
                    <div className='create__form__inputfile__photos'>
                        <h3 className='label-required'>Фотографии</h3>
                        <h5 id='photo'>Загрузите до 10 фотографий объекта</h5>
                        <div className='create__form__uploadedphotos'>
                            {photos.map((photo, i) => {return (<div key={i} className='create__form__uploadedphoto'> {photosurls[i] ? <div style={{backgroundImage: `url(${photosurls[i]})`, width: '100%', height: '100%', borderRadius: '8px', backgroundPosition: 'center', backgroundSize: 'cover'}} > <span onClick={() => deletePhoto(i + 1)} className='btn btn-danger delete_span'>X</span> </div> : <ReactLoading className='loading' type={"spinningBubbles"} color={"#4472C4"} height={'50%'} width={'50%'}/>} </div>) })}
                            {photos.length < 10 ? <div className="create__form__uploadbutton">
                                <label className='create__form__uploadbutton__field' htmlFor='upload-photo'>+</label>
                                <input id='upload-photo' multiple type='file' onChange={(e) => inputPhotos(e)} accept=".jpg, .jpeg, .png" />
                            </div> : null}
                        </div>
                    </div>
                    <div className='create__form__inputfile__archive'>
                        <h3 className='label-required'>Документы</h3>
                        <h5>Прикрепите архив с требуемыми документами:</h5>
                        <ul style={{textAlign: 'left'}}>
                            <li>Страницы паспортов всех участников сделки</li>
                            <li>Документ основание</li>
                            <li>СНИЛС</li>
                        </ul>
                        <div className="create__form__uploadbutton">
                            <label htmlFor='upload-archive' className="btn btn-secondary">{archiveloading ? 'Идёт загрузка...' : archive ? archive.slice(60,) : 'Загрузить'}</label>
                            <input id='upload-archive' type='file'  onChange={(e) => uploadArchive(e.target.files[0])} accept=".zip, .rar, .7z, .zipx, .lha, .war"/>
                        </div>
                    </div>
                    <div className='create__form__inputfile__archive'>
                        <h3>Иные документы</h3>
                        <h5>Прикрепите архив с иными документами необходимыми для сделки:</h5>
                        <div className="create__form__uploadbutton">
                            <label htmlFor='upload-doparchive' className="btn btn-secondary">{dop_archiveloading ? 'Идёт загрузка...' : dop_archive ? dop_archive.slice(60,) : 'Загрузить'}</label>
                            <input id='upload-doparchive' type='file'  onChange={(e) => uploadDopArchive(e.target.files[0])} accept=".zip, .rar, .7z, .zipx, .lha, .war"/>
                        </div>
                    </div>
                </div>
                <div className='create__form__movebuttons'> 
                    <button onClick={() => {document.getElementById('first_window').style.display = 'flex'; document.getElementById('second_window').style.display = 'none'}} className='create__form__inputgroup__button btn btn-primary'>Назад</button>
                    <button onClick={() => {sendData()}} className='create__form__inputgroup__button btn btn-primary'>Создать</button>
                </div>
            </div> </div> : <div className='create__form'> <h1>{server_response}</h1> <a href='/' class='btn btn-primary'>На главную</a> </div> }
        </div>

    )
}
export default NewPost;