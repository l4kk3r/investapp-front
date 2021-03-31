import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import {useHistory, Link} from 'react-router-dom'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fiz from './Fiz'
import AdminPost from './AdminPost'
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Admin = () => {
    const history = useHistory()
    const [posts, setPosts] = useState([])
    const [photos, setPhotos] = useState([])
    const [photosurls, setPhotosUrls] = useState([])
    const [newphotos, setNewPhotos] = useState([])
    const [deletedphotos, setDeletedPhotos] = useState([])
    const [deletedcount, setDeletedCount] = useState(0)
    const [newphotosurls, setNewPhotosUrls] = useState([])
    const [newfile, setNewFile] = useState(false)
    const [postsinfo, setPostsInfo] = useState([])
    const [archiveurl, setArchiveUrl] = useState(false)
    const [mainphoto, setMainPhoto] = useState('')
    const [saving, setSaving] = useState(false)
    const [fiz, setFiz] = useState(['ppp'])
    const [displaying, setDisplaying] = useState(['sdsd'])
    const [opened, setOpened] = useState('notstated')
    const [searchfield, setSearchFilter] = useState("")
    const [answers, setAnswers] = useState("")
    const options = [
        'Ожидание ответов', 'На модерации', 'Отклонено', 'Заблокировано', 'Получен ответ'
    ];
    const changepost = (i) => {
        setSaving(true)
        if (mainphoto) {
            if (photos.includes(mainphoto)) {
                console.log('Has mainphoto1')
                photos.splice(photos.indexOf(mainphoto), 1)
                photos.unshift(mainphoto)
            } else {
                console.log("Main Photo is", mainphoto)
                newphotos.splice(newphotos.indexOf(mainphoto), 1)
                console.log(newphotos)
                uploadToServer(mainphoto, true)
            }
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
        // if (newphotos.length > 0) {
        //     console.log('has')
        //     newphotos.forEach(photo => {
        //         uploadToServer(photo)
        //     })
        // } else {
        //     console.log('hasnt')
        //     postsinfo[opened].todelete = deletedphotos
        //     axios.post("https://investapp-back.herokuapp.com/user/updatepost", postsinfo[opened]).then(response => { console.log(response.data); setSaving(false) })
        // }
    }
    useEffect(() => {
        if (saving && postsinfo[opened] && newphotosurls.length == photosurls.length && (!newfile || archiveurl)) {
            console.log('SENDING!')
            if (archiveurl) {
                postsinfo[opened].archive = archiveurl
            }
            postsinfo[opened].photos = postsinfo[opened].photos.concat(photosurls)
            if (!photos.includes(mainphoto)) {
                const index = postsinfo[opened].photos.indexOf(photosurls[0])
                postsinfo[opened].photos.unshift(photosurls[0])
                postsinfo[opened].photos.splice(index, 1)
            }
            postsinfo[opened].todelete = deletedphotos
            axios.post("http://localhost:5500/admin/updatepost", postsinfo[opened]).then(response => {console.log(response.data); setSaving(false); toast.info('Заявка успешно сохранена')})
        }
    }, [photosurls, archiveurl])
    useEffect(() => {
        axios.get("https://investapp-back.herokuapp.com/admin/allposts").then(result => {setPosts(result.data.posts); console.log(result.data.posts); setPostsInfo(result.data.posts); console.log(result.data.answers); setAnswers(result.data.answers)})
        }, [])
    const openfunc = (i) => {
        if (opened === i) {
            setOpened('notstated')
            return;
        }
        setOpened(i)
        setNewFile(null)
        setPhotos(posts[i].photos)
        setNewPhotos([])
        setNewPhotosUrls([])
        setArchiveUrl(null)
        setMainPhoto(posts[i].photos[0])
        setDeletedPhotos([])
        setDeletedCount(0)
        return;
    }
    const uploadToServer = (photo, isMainPhoto=false) => {
        const data = new FormData();
        data.append("file", photo)
        axios.post("https://investapp-back.herokuapp.com/aws/upload-image", data).then(answer => {
            if (!answer.data.error) {
                if (isMainPhoto) {
                    setPhotosUrls(old=>[answer.data.url, ...old])
                } else {
                    setPhotosUrls(old=>[...old, answer.data.url])
                }
            }
        })
    }
    const uploadToServerArchive = (archive) => {
        console.log(archive)
        const data = new FormData();
        data.append("file", archive)
        axios.post("https://investapp-back.herokuapp.com/aws/upload-archive", data).then(answer => {
            if (!answer.data.error) {
                setArchiveUrl(answer.data.url)
            }
        })
    }
    const photosInput = (e) => {
        const inputed_photos = e.target.files
        for (var i = 0; i < inputed_photos.length; i++) {
            const imgurl = URL.createObjectURL(inputed_photos[i])
            const imgg = inputed_photos[i]
            console.log(inputed_photos[i])
            setNewPhotos(old => [...old, imgg])
            setNewPhotosUrls(old => [...old, imgurl])
        }
    }
    const deleteNewPhoto = (todelete) => {
        setNewPhotosUrls(newphotosurls.filter(photo => photo !== todelete))
        setNewPhotos(newphotos.filter(photo => photo !== todelete))
    }
    const deleteOldPhoto = (todelete) => {
        postsinfo[opened].photos = postsinfo[opened].photos.filter(ph => ph !== todelete)
        setPhotos(photos.filter(photo => photo !== todelete))
        setDeletedPhotos(old => [...old, todelete.replace('https://sharinvest.s3.amazonaws.com/', '').replace('https://sharinvest.s3.eu-central-1.amazonaws.com/', '')])
    }
    const deleteFiz = (i, index) => {
        console.log(postsinfo[opened].fiz.splice(index, 1))
        setFiz(old => [...old, "removed"])
    }
    const makeMain = (photo) => {
        setMainPhoto(photo)
        setPhotos(photos)
    }
    return (
        <div className='maincontainer'>
            <ToastContainer>
            </ToastContainer>
            <Helmet>
                <title>SHAR | Админ.Заявки</title>
            </Helmet>
            <div className='sidemenu'>
                <div className='sidemenu__routing'>
                    <img className='sidemenu__routing__logo' src='/img/logo.png' alt='logo'/>
                    <Link className='sidemenu__routing__link link-selected' to='/admin'>Модерация постов</Link>
                    <Link className='sidemenu__routing__link' to='/admin/users'>Модерация пользователей</Link>
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
            <div className='moderations'>
                <div className='moderations__settings'>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <input placeholder='Поиск...' className='searcher' type='text' onChange={(e) => setSearchFilter(e.target.value)} />
                    </div>
                </div>
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Дата</th>
                            <th scope="col">Сумма</th>
                            <th scope="col">Ставка</th>
                            <th scope="col">Город</th> 
                            <th scope="col">Объект</th> 
                            <th scope="col">ФИО</th> 
                            <th scope="col">Статус</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {posts ? posts.map((post, i) => {return ( <AdminPost openfunc={openfunc} index={i} key={i} post={post} /> ) } ) : null}
                    </tbody>
                </table>
                {(opened != 'notstated') && postsinfo ? !saving ? <div style={{display: opened != 'notstated' ? 'block' : 'none'}} key={opened} className='postinfo'>
                        <h2 className='alert alert-warning'>Заявка №{postsinfo[opened].id}</h2>
                        <h3>Брокер</h3>
                        <div>
                            <table className='table table-bordered'>
                                <thead>
                                    <th>ID</th>
                                    <th>ФИО</th>
                                    <th>Компания</th>
                                    <th>Телефон</th>
                                    <th>Email</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{postsinfo[opened].creator.id}</td>
                                        <td>{`${postsinfo[opened].creator.lastname} ${postsinfo[opened].creator.firstname} ${postsinfo[opened].creator.middlename}`}</td>
                                        <td>{postsinfo[opened].creator.company}</td>
                                        <td>{postsinfo[opened].creator.phone}</td>
                                        <td>{postsinfo[opened].creator.email}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3>Параметры сделки</h3>
                        <div className='moderations__changecards'>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Статус:</h4>
                                <Dropdown  options={options} onChange={(e) => {postsinfo[opened].status = e.value;}} value={postsinfo[opened].status} />
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Объект:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].object = e.target.value}} defaultValue={postsinfo[opened].object}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Город:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].city = e.target.value}} defaultValue={postsinfo[opened].city}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Регион:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].region = e.target.value}} defaultValue={postsinfo[opened].region}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Сумма займа:</h4>
                                <input type='number' onChange={(e) => {postsinfo[opened].amount = e.target.value}} defaultValue={postsinfo[opened].amount}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Ежемесячная ставка:</h4>
                                <input type='number' onChange={(e) => {postsinfo[opened].rate = e.target.value}} defaultValue={postsinfo[opened].rate}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Цель займа:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].reason = e.target.value}} defaultValue={postsinfo[opened].reason}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Фамилия основного заемщика:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].borrower_lname = e.target.value}} defaultValue={postsinfo[opened].borrower_lname}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Телефон основного заемщика:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].borrower_phone = e.target.value}} defaultValue={postsinfo[opened].borrower_phone}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Есть ИП или ООО:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].isIP = e.target.value}} defaultValue={postsinfo[opened].isIP}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Срок финансирования:</h4>
                                <input type='number' onChange={(e) => {postsinfo[opened].period = e.target.value}} defaultValue={postsinfo[opened].period}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Архив с документами:</h4>
                                <a href={postsinfo[opened].archive}>Скачать</a>
                                <label htmlFor={`newfile_${postsinfo[opened].id}`} className='btn btn-secondary'>{newfile ? newfile.name : 'Загрузить новый'}</label>
                                <input onInput={(e) => {setNewFile(e.target.files[0])} } id={`newfile_${postsinfo[opened].id}`} type='file' />
                            </div>
                        </div>
                        <h3>Информация по объекту</h3>
                        <div className='moderations__infobox'>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Кадастровый номер 1:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].kadastr_tag = e.target.value}} defaultValue={postsinfo[opened].kadastr_tag}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Кадастровый номер 2:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].kadastr_tag2 = e.target.value}} defaultValue={postsinfo[opened].kadastr_tag2}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Адрес объекта:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].adress = e.target.value}} defaultValue={postsinfo[opened].adress}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Координата 1:</h4>
                                <input type='number' onChange={(e) => {postsinfo[opened].coordinates_x = e.target.value}} defaultValue={postsinfo[opened].coordinates_x}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Координата 2:</h4>
                                <input type='number' onChange={(e) => {postsinfo[opened].coordinates_y = e.target.value}} defaultValue={postsinfo[opened].coordinates_y}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Дата перехода прав:</h4>
                                <input type='date' onChange={(e) => {postsinfo[opened].access_year = e.target.value}} defaultValue={postsinfo[opened].access_year}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Кадастровая стоимость:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].price_link = e.target.value}} defaultValue={postsinfo[opened].price_link}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Стоимость залога:</h4>
                                <input type='number' onChange={(e) => {postsinfo[opened].zalog = e.target.value}} defaultValue={postsinfo[opened].zalog}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Документ основание:</h4>
                                <Dropdown placeholder='Выберите...' options={['ДКП', 'Дарственная', 'Цессиия', 'Приватизация', 'ДДУ', 'По суду', 'Наследство', 'Свидетельство на право собственности']}  onChange={(e) => {postsinfo[opened].document = e.value}} defaultValue={postsinfo[opened].document}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Дата регистрации документ-основание:</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].document_date = e.target.value}} defaultValue={postsinfo[opened].document_date}/>
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Количество собственников:</h4>
                                <Dropdown placeholder='Выберите...' onChange={(e) => {postsinfo[opened].owners_number = e.value}} options = {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} defaultValue={postsinfo[opened].owners_number} />
                            </div>
                            <div className='card changecards__card' style={{width: '18rem'}}>
                                <h4>Местонахождение (Яндекс):</h4>
                                <input type='text' onChange={(e) => {postsinfo[opened].adress_link = e.target.value}} defaultValue={postsinfo[opened].adress_link}/>
                            </div>
                        </div>
                        <h3>Фотографии</h3>
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
                        <h3>Допольнительные документы</h3>
                        <div>
                            <div>
                                <input onChange={(e) => postsinfo[opened].needed_external = e.target.checked} id='ext_documents' type="checkbox" />
                                <label for='ext_documents'>Запросить доп.документы</label>
                            </div>
                            <textarea onInput={(e) => postsinfo[opened].external_documents = {message: e.target.value, external_archive: ''}} defaultValue={postsinfo[opened].external_documents.message} placeholder='Введите...'>
                            </textarea>
                            {postsinfo[opened].external_documents.message ? postsinfo[opened].external_documents.external_archive ? <a href={postsinfo[opened].external_documents.external_archive} className='btn btn-warning'>Скачать</a> : <h4 className='text-warning'>Ожидание брокера...</h4> : null}
                        </div>
                        <h3>Ответы</h3>
                        <div className='answersbox'>
                            <table className='table table-bordered table-hover'><thead><tr><th >ID</th><th >Ставка</th><th >Сумма</th><th>Период</th><th >Статус</th><th>Комментарий</th><th >Инвестор</th></tr></thead>
                            <tbody>{answers ? (answers.filter(answer => answer.post_id === postsinfo[opened].id).map((ans, i) => <tr key={i}><td >Вариант {i + 1}</td><td >{ans.rate}</td><td >{ans.amount}</td><td>{ans.period}</td><td>{ans.status}</td><td>{ans.comment}</td><td>{ans.investor_info}</td></tr>)) : null}</tbody></table>
                        </div>
                        <h3>Информация по физлицам</h3>
                        <div className='fizbox'>
                            {postsinfo[opened] ? postsinfo[opened].fiz.map((person, index) => {
                                return (
                                    <Fiz person={person} key={index} deleteFiz={deleteFiz} index={index} i={opened} postsinfo={postsinfo}/>
                                )
                            }) : null}
                            {postsinfo[opened].fiz.length < 6 ? <button className='btn btn-secondary' onClick={() => { postsinfo[opened].fiz.push({status: "", fullname: "", birth: "", age: "", pnumber: "", pdate: "", inn: "", snils: "", dcoument: "", regyear: "", rosreestr: "", percents: ""}); console.log(postsinfo[opened].fiz); setFiz(old=>[...old, "new"]) } }>Добавить физ.лицо</button> : null }
                        </div>
                        <div  className='moderation__userinfo__savebutton__wrapper'>
                            <button className='btn btn-primary moderation__userinfo__savebutton' style={{marginBottom: '20px'}} onClick={() => {postsinfo[opened].status = 'Ожидание ответов'; changepost(opened)}}>Отправить в работу</button>
                            <button className='btn btn-secondary moderation__userinfo__savebutton' style={{marginBottom: '20px'}} onClick={() => changepost(opened)}>Сохранить</button>
                            <button className='btn btn-danger moderation__userinfo__savebutton' style={{marginBottom: '20px'}} onClick={() => {postsinfo[opened].status = 'Отклонено'; changepost(opened)}}>Отклонить</button>
                        </div>
                    </div> : <h1>Сохранение...</h1> : null}
            </div>
        </div>

    )
}
export default Admin;