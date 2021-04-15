import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import axios from 'axios';
import {UserContext} from '../../../App'
import {Link} from 'react-router-dom'
import Dropdown from 'react-dropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-dropdown/style.css';
import { post } from 'jquery';
import { Helmet } from 'react-helmet';
 

const BrokerProfile = () => {
    const {state, dispatch} = useContext(UserContext)
    const [filters, setFilters] = useState("")
    const [openedpost, setOpenedPost] = useState("")
    const [posts, setPosts] = useState("")
    const [answers, setAnswers] = useState("")
    const [photos, setPhotos] = useState([])
    const [external_document, setExtDocument] = useState(false)
    const [photosurls, setPhotosUrls] = useState([])
    const [newphotos, setNewPhotos] = useState([])
    const [newfile, setNewFile] = useState(false)
    const [saving, setSaving] = useState(false)
    const [mainphoto, setMainPhoto] = useState('')
    const [deletedphotos, setDeletedPhotos] = useState([])
    const [externalurl, setExtUrl] = useState(false)
    const [deletedcount, setDeletedCount] = useState(0)
    const [archiveurl, setArchiveUrl] = useState(false)
    const [newphotosurls, setNewPhotosUrls] = useState([])
    const [fmin_amount, setMinAmount] = useState("")
    const [fmax_amount, setMaxAmount] = useState("")
    const isIP_options = [
        'Да', 'Нет', 'Откроется'
    ];
    const answer_options = [
        'Ожидание', 'Согласен', 'Отказ'
    ]

    const uploadToServer = (photo, isMainPhoto = false) => {
        const data = new FormData();
        data.append("file", photo)
        axios.post("https://investappp.herokuapp.com//api/aws/upload-image", data).then(answer => {
            if (!answer.data.error) {
                if (isMainPhoto) {
                    setPhotosUrls(old=>[answer.data.url, ...old])
                } else {
                    setPhotosUrls(old=>[...old, answer.data.url])
                }
            }
        })
    }
    const saveOpenedPost = () => {
        setSaving(true)
        console.log(photos)
        console.log(mainphoto)
        if (photos.includes(mainphoto)) {
            photos.splice(photos.indexOf(mainphoto), 1)
            photos.unshift(mainphoto)
        } else {
            console.log("Main Photo is", mainphoto)
            newphotos.splice(newphotos.indexOf(mainphoto), 1)
            console.log(newphotos)
            uploadToServer(mainphoto, true)
        }
        if (external_document) {
            uploadToServerArchive(external_document, true)
        }
        newphotos.forEach(photo => {
            uploadToServer(photo)
        })
        if (newfile) {
            uploadToServerArchive(newfile)
        }
        if (newphotos.length == 0 && !newfile) {
            setPhotosUrls([])
        }
    }
    useEffect(() => {
        if (saving && openedpost && newphotosurls.length == photosurls.length && (!newfile || archiveurl) && (!external_document || externalurl)) {
            console.log('SENDING!')
            if (archiveurl) {
                openedpost.archive = archiveurl
            }
            if (externalurl) {
                console.log(externalurl)
                const neww = {
                    message: openedpost.external_documents.message,
                    external_archive: externalurl
                }
                console.log(neww)
                openedpost.external_documents = neww
            }
            if (!photos.includes(mainphoto)) {
                let ph_copy = photosurls
                const mainphoto = ph_copy.shift()
                openedpost.photos = openedpost.photos.concat(ph_copy)
                openedpost.photos.unshift(mainphoto)
            } else {
                openedpost.photos = openedpost.photos.concat(photosurls)
            }
            openedpost.todelete = deletedphotos
            axios.put(`https://investappp.herokuapp.com//api/post/${openedpost.id}`, openedpost).then(response => {console.log(response.data); setSaving(false); toast.info('Заявка успешно сохранена')})
        }
    }, [photosurls, archiveurl, externalurl])

    const changeAnswerStatus = (answer, status) => {
        axios.put("https://investappp.herokuapp.com//api/answer/status", {id: answer.id, status}).then(response => console.log(response))
    }
    const openPost = (post) => {
        setOpenedPost(post)
        setPhotos(post.photos)
        setNewPhotos([])
        setExtDocument(false)
        setNewFile(null)
        setArchiveUrl(null)
        setNewPhotosUrls([])
        setDeletedPhotos([])
        setMainPhoto(post.photos[0])
        setDeletedCount(0)
    }
    const photosInput = (e) => {
        const inputed_photos = e.target.files
        for (var i = 0; i < inputed_photos.length; i++) {
            const imgurl = URL.createObjectURL(inputed_photos[i])
            const imgg = inputed_photos[i]
            setNewPhotos(old => [...old, imgg])
            setNewPhotosUrls(old => [...old, imgurl])
        }
    }
    const deleteNewPhoto = (todelete) => {
        setNewPhotosUrls(newphotosurls.filter(photo => photo !== todelete))
        setNewPhotos(newphotos.filter(photo => photo !== todelete))
    }
    const deleteOldPhoto = (todelete) => {
        openedpost.photos = openedpost.photos.filter(ph => ph !== todelete)
        setPhotos(photos.filter(photo => photo !== todelete))
        setDeletedPhotos(old => [...old, todelete.replace('https://sharinvest.s3.amazonaws.com/', '').replace('https://sharinvest.s3.eu-central-1.amazonaws.com/', '')])
    }
    const toArchive = (id) => {
        setPosts(posts.filter(pst => pst.id !== id))
        axios.post("https://investappp.herokuapp.com//api/post/archive", {id, archived: true}).then(response=>console.log(response.data))
    }
    const uploadToServerArchive = (archive, isExternal = false) => {
        console.log(archive)
        const data = new FormData();
        data.append("file", archive)
        axios.post("https://investappp.herokuapp.com//api/aws/upload-archive", data).then(answer => {
            if (!answer.data.error) {
                if (isExternal) {
                    setExtUrl(answer.data.url)
                }
                else {
                    setArchiveUrl(answer.data.url)
                }
            }
        })
    }

    useEffect(() => {
        if (state) {
            axios.post("https://investappp.herokuapp.com//api/post/users", {creator_id: state.id, archived: false}).then(res=>{setPosts(res.data.posts); setAnswers(res.data.answers); console.log(res.data)}) }
    }, [state])

    const makeMain = (photo) => {
        setMainPhoto(photo)
        setPhotos(photos)
    }

    return (
        <div className='profile'>
            <ToastContainer />
            <Helmet>
                <title>SHAR | Профиль</title>
            </Helmet>
            <div className='sidemenu'>
                <div className='sidemenu__routing'>
                    <img className='sidemenu__routing__logo' src='/img/logo.png' alt='logo'/>
                    <Link className='sidemenu__routing__link link-selected' to='/'>Мои заявки</Link>
                    <Link className='sidemenu__routing__link' to='/archive'>Архив</Link>
                    <Link className='sidemenu__routing__link' to='/newpost'>Новая заявка</Link>
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
            <div className='content'>
                <div className='userposts'>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Дата</th>
                            <th scope="col">Сумма займа</th>
                            <th scope="col">Ставка</th>
                            <th scope="col">Срок</th>
                            <th scope="col">Объект</th>
                            <th scope="col">Местоположение</th>
                            <th scope="col">Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts ? posts.map((post, i)=>{return (<tr key={i} className='userposts__post'>
                            <th onClick={() => openPost(post)} >{post.id}</th>
                            <td onClick={() => openPost(post)} >{post.createdAt}</td>
                            <td onClick={() => openPost(post)} >{post.amount.toLocaleString()}</td>
                            <td onClick={() => openPost(post)} >{post.rate}</td>
                            <td onClick={() => openPost(post)} >{post.period}</td>
                            <td onClick={() => openPost(post)} >{post.object}</td>
                            <td onClick={() => openPost(post)} >{post.city}</td>
                            <td onClick={() => openPost(post)} >{post.status}</td>
                            <td><button className='btn btn-warning' onClick={() => toArchive(post.id)}>В архив</button></td>
                            </tr>)}) : null}
                    </tbody>
                </table>
                {openedpost ? !saving ? <div key={openedpost.id} className='openedpost'>
                    <h3 className='alert alert-primary'>Редактирование заявки №{openedpost.id}</h3>
                    <div className='openedpost__edit_wrapper'>
                        <div className='openedpost__edit'>
                            <table className='table table-striped table-first'>
                                <thead>
                                    <tr>
                                        <th scope="col">Номер</th>
                                        <th scope="col">{openedpost.id}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Дата</td>
                                        <td>{openedpost.createdAt}</td>
                                    </tr>
                                    <tr>
                                        <td>Сумма</td>
                                        <td><input className="form-control" onChange={(e) => {openedpost.amount = e.target.value}} defaultValue={openedpost.amount.toLocaleString()} /></td>
                                    </tr>
                                    <tr>
                                        <td>Ставка</td>
                                        <td><input className="form-control" onChange={(e) => {openedpost.rate = e.target.value}} defaultValue={openedpost.rate} /></td>
                                    </tr>
                                    <tr>
                                        <td>Город</td>
                                        <td><input className="form-control" onChange={(e) => {openedpost.city = e.target.value}} defaultValue={openedpost.city} /></td>
                                    </tr>
                                    <tr>
                                        <td>Объект</td>
                                        <td><input className="form-control" onChange={(e) => {openedpost.object = e.target.value}} defaultValue={openedpost.object} /></td>
                                    </tr>
                                    <tr>
                                        <td>Республика</td>
                                        <td><input className="form-control" onChange={(e) => {openedpost.region = e.target.value}} defaultValue={openedpost.region} /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th scope="col">Тип сделки</th>
                                        <th scope="col">-</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ФИО заемщика-основного</td>
                                        <td><input className="form-control" onChange={(e) => {openedpost.borrower_lname = e.target.value}} defaultValue={openedpost.borrower_lname} /></td>
                                    </tr>
                                    <tr>
                                        <td>Телефон заемщика-основного</td>
                                        <td><input className="form-control" onChange={(e) => {openedpost.borrower_phone = e.target.value}} defaultValue={openedpost.borrower_phone} /></td>
                                    </tr>
                                    <tr>
                                        <td>Цель займа</td>
                                        <td><input className="form-control" onChange={(e) => {openedpost.reason = e.target.value}} defaultValue={openedpost.reason} /></td>
                                    </tr>
                                    <tr>
                                        <td>Телефон</td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>Есть ИП или ООО</td>
                                        <td><Dropdown options={isIP_options} onChange={(e) => {openedpost.isIP = e.value}} value={openedpost.isIP} /></td>
                                    </tr>
                                    <tr>
                                        <td>Фото объекта</td>
                                        <td>{openedpost.photos ? 'Загружено' : 'Не загружено'}</td>
                                    </tr>
                                    <tr>
                                        <td>Документы</td>
                                        <td><label htmlFor={`newfile_${openedpost.id}`} className='btn btn-secondary'>{newfile ? newfile.name : 'Загрузить новый'}</label>
                                    <input onInput={(e) => {setNewFile(e.target.files[0])} } id={`newfile_${openedpost.id}`} type='file' /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 className='alert alert-warning'>Фотографии</h3>
                        <div className='openedpost__photos'>
                            {photos.map((photo, i) => {
                                        if (mainphoto === photo) {
                                            return (
                                                <div key={i} className='create__form__uploadedphoto'> <div style={{backgroundImage: `url(${photo})`, width: '100%', height: '100%', borderRadius: '8px', backgroundPosition: 'center', backgroundSize: 'cover'}} ><span onClick={() => deleteOldPhoto(photo)} className='btn btn-danger delete_span'>X</span><span onClick={() => makeMain(photo)} className='btn btn-primary main_span'>Обложка</span></div>  </div>
                                            )
                                        }
                                        else {
                                            return (
                                                <div key={i} className='create__form__uploadedphoto'> <div style={{backgroundImage: `url(${photo})`, width: '100%', height: '100%', borderRadius: '8px', backgroundPosition: 'center', backgroundSize: 'cover'}} ><span onClick={() => deleteOldPhoto(photo)} className='btn btn-danger delete_span'>X</span><span onClick={() => makeMain(photo)} className='btn btn-primary makemain_span'>Сделать обложкой</span></div>  </div>
                                            )
                                        }
                                    })}
                            {newphotosurls.map((photo, i) => {
                                if (mainphoto === newphotos[newphotosurls.indexOf(photo)]) {
                                    return (
                                        <div key={i} className='create__form__uploadedphoto'> <div style={{backgroundImage: `url(${photo})`, width: '100%', height: '100%', borderRadius: '8px', backgroundPosition: 'center', backgroundSize: 'cover'}} ><span onClick={() => deleteOldPhoto(photo)} className='btn btn-danger delete_span'>X</span><span onClick={() => makeMain(newphotos[newphotosurls.indexOf(photo)])} className='btn btn-primary main_span '>Обложка</span></div>  </div>
                                    )
                                }
                                else {
                                    return (
                                        <div key={i} className='create__form__uploadedphoto'> <div style={{backgroundImage: `url(${photo})`, width: '100%', height: '100%', borderRadius: '8px', backgroundPosition: 'center', backgroundSize: 'cover'}} ><span onClick={() => deleteOldPhoto(photo)} className='btn btn-danger delete_span'>X</span><span onClick={() => makeMain(newphotos[newphotosurls.indexOf(photo)])} className='btn btn-primary makemain_span'>Сделать обложкой</span></div>  </div>
                                    )
                                }
                            })}
                            <label className='create__form__uploadbutton__field' htmlFor='upload-photo'>+</label>
                            <input id='upload-photo' multiple type='file' onInput={(e) => photosInput(e)} accept=".jpg, .jpeg, .png" />
                        </div>
                        <h3 className='alert alert-warning'>Доп.документы</h3>
                        <div>
                            {(openedpost.external_documents.message && !openedpost.external_documents.external_archive) ? <div>
                                <h4>Необходимы доп.документы</h4>
                                <h4 className='alert alert-danger'>Сообщение от администратора: {openedpost.external_documents.message}</h4>
                                <label className='btn btn-secondary'  for='upload-external'>{external_document ? external_document.name : 'Загрузить доп.документы'}</label>
                                <input onInput={(e) => { setExtDocument(e.target.files[0]); openedpost.status = 'На модерации' }} id='upload-external' type='file'/>
                            </div> : <h4>Никаких доп.документов не требуется</h4>}
                        </div>
                    </div>
                    <div className='openedpost__edit__savebutton__wrapper'>
                        <button onClick={() => saveOpenedPost()} className='btn btn-primary openedpost__edit__savebutton'>Сохранить</button>
                    </div>
                    <div className='openedpost__answers'>
                        <h3 className='alert alert-primary'>Предложения инвесторов</h3>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Варианты</th>
                                    <th>Ставка (в мес.)</th>
                                    <th>Сумма</th>
                                    <th>Срок финансирования (в мес.)</th>
                                    <th>Комментарий</th>
                                    <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody>
                                {answers.filter(a => a.post_id === openedpost.id).map((answer, i) => <tr key={i}>
                                    <td>Вариант {i + 1}</td>
                                    <td>{answer.rate}</td>
                                    <td>{answer.amount}</td>
                                    <td>{answer.period}</td>
                                    <td>{answer.comment}</td>
                                    <td>
                                        <Dropdown options={answer_options} onChange={(e) => changeAnswerStatus(answer, e.value)} value={answer.status} />
                                        {answer.comment}
                                    </td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div> : <h1>Сохранение...</h1> : null }
                </div>
            </div>
        </div>

    )
}
export default BrokerProfile;