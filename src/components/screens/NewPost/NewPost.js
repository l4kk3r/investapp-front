import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import {UserContext} from '../../../App'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import imageCompression from 'browser-image-compression';
import {Link, useHistory} from 'react-router-dom'
import ReactLoading from 'react-loading';
import axios from 'axios';

const NewPost = () => {
    const history = useHistory()
    const {state, dispatch} = useContext(UserContext)
    const [newpost, setNewPost] = useState({photos: []})
    const [object, setObject] = useState("")
    const [region, setRegion] = useState("")
    const [city, setCity] = useState("")
    const [rate, setRate] = useState("")
    const [amount, setAmount] = useState("")
    const [reason, setReason] = useState("")
    const [rooms, setRooms] = useState("")
    const [currentq, setCurrentQ] = useState(1)
    const [period, setPeriod] = useState("")
    const [archive, setArchive] = useState("")
    const [photos, setPhotos] = useState([])
    const [isIP, setisIP] = useState(null)
    const [photosurls, setPhotoUrls] = useState([])
    const [sended, setSended] = useState(false)
    const [server_response, setServerResponse] = useState(false)
    const options = [
        'Квартира', 'Дом', 'Земельный участок', 'Коммерция'
    ];
    const options2 = [
        'Да', 'Нет', 'Откроется'
    ];
    useEffect(() => {
        if (state) {
            newpost.creator_id = state.id
        }
    }, [state])
    useEffect(() => {
        if ((sended) && (photosurls.length === photos.length) && (state) && (archive)) {
            axios.post("https://investapp-back.herokuapp.com/user/createpost", newpost).then(result => setServerResponse(result.data.message))
        }
    }, [sended, photosurls, state, archive])


    async function uploadPhoto(photo) {
        console.log('originalFile instanceof Blob', photo instanceof Blob); // true
        console.log(`originalFile size ${photo.size / 1024 / 1024} MB`);

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
        try {
          const compressedFile = await imageCompression(photo, options);
          console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

          await uploadToServer(compressedFile); // write your own logic
        } catch (error) {
          console.log(error);
        }

      }

    const uploadToServer = (photo) => {
        const data = new FormData();
        data.append("file", photo)
        axios.post("https://investapp-back.herokuapp.com/upload-image", data).then(answer => {
            if (!answer.data.error) {
                newpost.photos.push(answer.data.url)
                setPhotoUrls(old=>[...old, answer.data.url])
            }
        })
    }
    const uploadArchive = (archive) => {
        const data = new FormData();
        data.append("file", archive)
        axios.post("https://investapp-back.herokuapp.com/upload-archive", data).then(answer => {
            if (!answer.data.error) {
                if (newpost.archive) {
                    const file_key = newpost.archive.replace('https://comeinvest.s3.amazonaws.com/', '').replace('https://comeinvest.s3.us-east-2.amazonaws.com/', '')
                    axios.post("https://investapp-back.herokuapp.com/delete-file", {file_key}).then(answer => console.log(answer))
                }
                newpost.archive = answer.data.url
                setArchive(answer.data.url)
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
        axios.post("https://investapp-back.herokuapp.com/delete-file", {file_key}).then(answer => console.log(answer))
        const new_photos = photos.slice(0, i - 1).concat(photos.slice(i, photos.length))
        const new_photosurls = photosurls.slice(0, i - 1).concat(photosurls.slice(i, photosurls.length))
        newpost.photos.pop(photosurls[i])
        console.log(newpost.photos)
        setPhotos(new_photos)
        setPhotoUrls(new_photosurls)
    }
    return (
        <div className='create'>
            <div className='sidemenu'>
                <div className='sidemenu__routing'>
                    <img className='sidemenu__routing__logo' src='/img/logo.png' alt='logo'/>
                    <Link className='sidemenu__routing__link' to='/'>Мои заявки</Link>
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
                                <label htmlFor='select-object'>Выберите тип недвижимости</label>
                                <Dropdown placeholder='Выберите объект' options={['Квартира', 'Дом', 'Земельный участок', 'Коммерция']} onChange={(e) => newpost.object = e.value}  id="select-object" />
                            </div>
                            <div className="create__form__group-item">
                                <label htmlFor="input-amount" className="form-label">Сумма в рублях</label>
                                <input min="0" type='number' onInput={(e) => newpost.amount = e.target.value} placeholder='Укажите сумму' className="form-control" id="input-amount" />
                            </div>
                        </div>
                        <div className="create__form__group card">
                            <h4>Цель займа</h4>
                            <div className="create__form__group-item">
                                <label htmlFor="input-reason" className="form-label">Укажите цель займа</label>
                                <input onInput={(e) => newpost.reason = e.target.value} placeholder='Пополнение оборотных средств' className="form-control" id="input-reason" />
                            </div>
                        </div>
                        <div className="create__form__group card">
                            <h4>Тип займа</h4>
                            <div className="create__form__group-item">
                                <label htmlFor="select-loan_type" className="form-label">Выберите тип займа</label>
                                <Dropdown placeholder='Выберите тип' options={['Аннуитет', 'Только проценты']} onChange={(e) => newpost.loan_type = e.value}  id="select-loan_type" />
                            </div>
                        </div>
                    </div>
                    <div className='create__form__right'>
                        <div className="create__form__group card">
                            <h4>Ставка и срок</h4>
                            <div className="create__form__group-item">
                                <label htmlFor="input-rate" className="form-label">Ставка</label>
                                <input min="0" type='number' placeholder='Укажите ставку' onInput={(e) => newpost.rate = e.target.value} className="form-control" id="input-rate" />
                            </div>
                            <div className="create__form__group-item">
                                <label htmlFor="input-period" className="form-label">Срок</label>
                                <input min="0" placeholder='Укажите срок' type='number' onInput={(e) => newpost.period = e.target.value} className="form-control" id="input-period" />
                            </div>
                        </div>
                        <div className="create__form__group card">
                            <h4>Место работы</h4>
                            <div className="create__form__group-item">
                                <label htmlFor="input-borrower_work" className="form-label">Место работы</label>
                                <input placeholder='Укажите место работы' onInput={(e) => newpost.borrower_work = e.target.value} className="form-control" id="input-borrower_work" />
                            </div>
                            <div className="create__form__group-item">
                                <label htmlFor='select-isIP'>Есть ИП или ООО?</label>
                                <Dropdown placeholder='Есть ИП или ООО?' options={['Да', 'Нет', 'Скоро откроется']} onChange={(e) => newpost.isIP = e.value}  id="select-isIP" />
                            </div>
                        </div>
                        <div className="create__form__group card">
                            <h4>Тип сделки</h4>
                            <div className="create__form__group-item">
                                <label htmlFor="select-deal_type" className="form-label">Выберите тип сделки</label>
                                <Dropdown placeholder='Выберите тип' options={['Займ под залог', 'Обратный выкуп (ДКП)', 'Срочная продажа']} onChange={(e) => newpost.deal_type = e.value} id="select-deal_type" />
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
                                <label htmlFor="input-borrower_lname" className="form-label">Фамилия основного заемщика</label>
                                <input onInput={(e) => newpost.borrower_lname = e.target.value} className="form-control" id="input-borrower_lname" />
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
                                <label htmlFor="input-region" className="form-label">Населенный пункт</label>
                                <input onInput={(e) => newpost.region = e.target.value} className="form-control" id="input-region" />
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
                        <h3>Фотографии</h3>
                        <h5 id='photo'>Загрузите до 10 фотографий объекта</h5>
                        <div className='create__form__uploadedphotos'>
                            {photos.map((photo, i) => {return (<div key={i} className='create__form__uploadedphoto'> {photosurls[i] ? <div style={{backgroundImage: `url(${photosurls[i]})`, width: '100%', height: '100%', borderRadius: '8px', backgroundPosition: 'center', backgroundSize: 'cover'}} > <span onClick={() => deletePhoto(i + 1)} className='btn btn-danger'>X</span> </div> : <ReactLoading className='loading' type={"spinningBubbles"} color={"#4472C4"} height={'50%'} width={'50%'}/>} </div>) })}
                            {photos.length < 10 ? <div className="create__form__uploadbutton">
                                <label className='create__form__uploadbutton__field' htmlFor='upload-photo'>+</label>
                                <input id='upload-photo' multiple type='file' onChange={(e) => inputPhotos(e)} accept=".jpg, .jpeg, .png" />
                            </div> : null}
                        </div>
                    </div>
                    <div className='create__form__inputfile__archive'>
                        <h3>Документы</h3>
                        <h5>Прикрепите архив с требуемыми документами:</h5>
                        <ul style={{textAlign: 'left'}}>
                            <li>Страницы паспортов всех участников сделки</li>
                            <li>Документ основание</li>
                            <li>СНИЛС</li>
                        </ul>
                        <div className="create__form__uploadbutton">
                            <label htmlFor='upload-archive' className="btn btn-secondary">{archive ? archive.slice(60,) : 'Загрузить'}</label>
                            <input id='upload-archive' type='file'  onChange={(e) => uploadArchive(e.target.files[0])} accept=".zip, .rar, .7z, .zipx, .lha, .war"/>
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