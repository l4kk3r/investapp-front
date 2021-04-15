import React, {useContext, useEffect, useState} from 'react'
const AdminPost = (props) => {
    const colorsd = {'На модерации': '#291F1E', 'Заблокировано': '#EF5B5B', 'Ожидание ответов': '#2274A5', 'Получен ответ': '#028858', 'Отклонено': '#27213C'}
    // onClick={() => openfunc(i)} style={{display: post.id.toString().includes(searchfield) ? status_filter.includes(post.status) ? 'table-row' : 'none' : 'none'}}
    return(<tr>
    <td onClick={() => props.openfunc(props.index)} >#{props.post.id}</td>
    <td onClick={() => props.openfunc(props.index)} >{props.post.createdAt ? props.post.createdAt.slice(8, 10) + '-' + props.post.createdAt.slice(5, 7) : null}</td>
    <td onClick={() => props.openfunc(props.index)} >{props.post.amount}</td>
    <td onClick={() => props.openfunc(props.index)} >{props.post.rate}</td>
    <td onClick={() => props.openfunc(props.index)} >{props.post.city}</td>
    <td onClick={() => props.openfunc(props.index)} >{props.post.object}</td>
    <td onClick={() => props.openfunc(props.index)} >{props.post.borrower_lname}</td>
    <td onClick={() => props.openfunc(props.index)} style={{color: colorsd[props.post.status]}}>{props.post.status}</td>
    <td onClick={() => props.toArchive(props.index)}><button className='btn btn-success'>Вернуть</button></td>
    </tr>
    )
}
export default AdminPost;
