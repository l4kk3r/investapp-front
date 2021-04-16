import React, {useContext, useEffect, useState} from 'react'
import './styles.css'
import {useHistory, Link} from 'react-router-dom'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Select from 'react-select'
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
    const [neededChecked, setNeededChecked] = useState(false)
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
    const regions = [
        { value: 'Республика Адыгея', label: 'Республика Адыгея' },      
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
            if (!photos.includes(mainphoto)) {
                let ph_copy = photosurls
                const mainphoto = ph_copy.shift()
                postsinfo[opened].photos = postsinfo[opened].photos.concat(ph_copy)
                postsinfo[opened].photos.unshift(mainphoto)
            } else {
                postsinfo[opened].photos = postsinfo[opened].photos.concat(photosurls)
            }
            postsinfo[opened].todelete = deletedphotos
            axios.put(`https://investappp.herokuapp.com/api/post/admin/${postsinfo[opened].id}`, postsinfo[opened]).then(response => {console.log(response.data); setSaving(false); toast.info('Заявка успешно сохранена')})
        }
    }, [photosurls, archiveurl])
    useEffect(() => {
        axios.get("https://investappp.herokuapp.com/api/post/archived").then(result => {setPosts(result.data.posts); console.log(result.data.posts); setPostsInfo(result.data.posts); console.log(result.data.answers); setAnswers(result.data.answers)})
        }, [])
    const toArchive = (i) => {
        let needed_id = posts[i].id
        setPosts(posts.filter(pst => pst.id !== needed_id))
        axios.post("https://investappp.herokuapp.com/api/post/admin/archive", {id: posts[i].id, archived: false}).then(ans => console.log(ans))
    }
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
        axios.post("https://investappp.herokuapp.com/api/aws/upload-image", data).then(answer => {
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
        axios.post("https://investappp.herokuapp.com/api/aws/upload-archive", data).then(answer => {
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
                    <Link className='sidemenu__routing__link' to='/admin'>Модерация постов</Link>
                    <Link className='sidemenu__routing__link link-selected' to='/admin/archived'>Архив постов</Link>
                    <Link className='sidemenu__routing__link' to='/admin/users'>Модерация пользователей</Link>
                    <Link className='sidemenu__routing__link' to='/admin/users/archived'>Архив пользователей</Link>
                    <Link className='sidemenu__routing__link' to='/allposts'>Общий список</Link>
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
                <div className='search_bar'>
                            <div class="input-group mb-3 search_bar_input">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-sizing-default"><i class="fa fa-search"></i></span>
                                </div>
                                <input type="text" onChange={(e) => setPosts(postsinfo.filter(p => ((p.amount ? p.amount.toString() : '') + (p.rate ? p.rate.toString() : '') + (p.period ? p.period.toString() : '') + (p.object ? p.object : '') + (p.city ? p.city : '') + p.status).includes(e.target.value.replaceAll(' ', '')) ))} class="form-control" aria-label="Поиск" aria-describedby="inputGroup-sizing-default" />
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
                        {posts ? posts.map((post, i) => {return ( <AdminPost openfunc={openfunc} toArchive={toArchive} index={i} key={i} post={post} /> ) } ) : null}
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
                                <Select className='region-select' onChange={(e) => {postsinfo[opened].region = e.value}} placeholder={postsinfo[opened].region}  options = {regions} />
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
                                <input type='text' onChange={(e) => {postsinfo[opened].period = e.target.value}} defaultValue={postsinfo[opened].period}/>
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
                                <input onChange={(e) => { setNeededChecked(!neededChecked); postsinfo[opened].needed_external = e.target.checked; postsinfo[opened].external_documents.external_archive = ''}} id='ext_documents' type="checkbox" />
                                <label for='ext_documents'>Запросить доп.документы</label>
                            </div>
                            <div className='extdocuments__message'>
                                <label>Сообщение брокеру:</label>
                                {neededChecked ? 
                                <textarea onInput={(e) => postsinfo[opened].external_documents = {message: e.target.value, external_archive: ''}} defaultValue={postsinfo[opened].external_documents.message} placeholder='Введите...'>
                                </textarea> : <textarea disabled onInput={(e) => postsinfo[opened].external_documents = {message: e.target.value, external_archive: ''}} defaultValue={postsinfo[opened].external_documents.message} placeholder='Введите...'>
                                </textarea>}
                            </div>
                            {postsinfo[opened].external_documents.message ? postsinfo[opened].external_documents.external_archive ? <a href={postsinfo[opened].external_documents.external_archive} className='btn btn-warning'>Скачать</a> : <h4 className='text-warning'>Доп.документы уже запрошены. Ожидание брокера...</h4> : null}
                        </div>
                        <h3>Ответы</h3>
                        <div className='answersbox'>
                            <table className='table table-bordered table-hover'><thead><tr><th >ID</th><th >Ставка</th><th >Сумма</th><th>Период</th><th >Статус</th><th>Комментарий</th><th >Инвестор</th></tr></thead>
                            <tbody>{answers ? (answers.filter(answer => answer.post_id === postsinfo[opened].id).map((ans, i) => <tr key={i}><td >Вариант {i + 1}</td><td >{ans.rate}</td><td >{ans.amount}</td><td>{ans.period}</td><td>{ans.status}</td><td>{ans.comment}</td><td>{ans.investor_info}</td></tr>)) : null}</tbody></table>
                        </div>
                        <h3>Информация по участникам</h3>
                        <div className='fizbox'>
                            {postsinfo[opened] ? postsinfo[opened].fiz.map((person, index) => {
                                return (
                                    <Fiz person={person} key={index} deleteFiz={deleteFiz} index={index} i={opened} postsinfo={postsinfo}/>
                                )
                            }) : null}
                            {postsinfo[opened].fiz.length < 6 ? <button className='btn btn-secondary' onClick={() => { postsinfo[opened].fiz.push({status: "", fullname: "", birth: "", age: "", pnumber: "", pdate: "", inn: "", snils: "", dcoument: "", regyear: "", rosreestr: "", percents: ""}); console.log(postsinfo[opened].fiz); setFiz(old=>[...old, "new"]) } }>Добавить участника</button> : null }
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