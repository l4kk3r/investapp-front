import React, {useContext, useEffect, useState} from 'react'
const AdminPost = (props) => {
    const colorsd = {'На модерации': '#291F1E', 'Заблокировано': '#EF5B5B', 'Ожидание ответов': '#2274A5', 'Получен ответ': '#028858', 'Отклонено': '#27213C'}
    // onClick={() => openfunc(i)} style={{display: post.id.toString().includes(searchfield) ? status_filter.includes(post.status) ? 'table-row' : 'none' : 'none'}}
    return(<tr onClick={() => props.openfunc(props.index)}>
    <td >#{props.post.id}</td>
    <td >{props.post.createdAt ? props.post.createdAt.slice(8, 10) + '-' + props.post.createdAt.slice(5, 7) : null}</td>
    <td >{props.post.amount}</td>
    <td >{props.post.rate}</td>
    <td >{props.post.city}</td>
    <td >{props.post.object}</td>
    <td >{props.post.borrower_lname}</td>
    <td style={{color: colorsd[props.post.status]}}>{props.post.status}</td></tr>
    )
}
export default AdminPost;
