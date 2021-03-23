import React, { createContext ,useReducer, useEffect, useContext } from 'react';
import {reducer,initialState} from './reducers/userReducer'
import {BrowserRouter, Switch, Route, useHistory, Redirect} from 'react-router-dom'
import './App.css';
import Home from './components/screens/Home/Home'
import Signin from './components/screens/Signin/Signin'
import Header from './components/screens/Header/Header'
import Signup from './components/screens/Signup/Signup'
import BrokerProfile from './components/screens/BrokerProfile/BrokerProfile'
import InvestorProfile from './components/screens/InvestorProfile/InvestorProfile'
import NewPost from './components/screens/NewPost/NewPost'
import PostPage from './components/screens/PostPage/PostPage'
import Admin from './components/screens/Admin/Admin'
import Page404 from './components/screens/Page404/Page404'
import AdminUsers from './components/screens/AdminUsers/AdminUsers'
import UserData from './components/screens/UserData/UserData'
import AllPosts from './components/screens/AllPosts/AllPosts'
import LogoutPage from './components/screens/LogoutPage/LogoutPage'
import InvestorArchive from './components/screens/InvestorArchive/InvestorArchive';
import BrokerArchive from './components/screens/BrokerArchive/BrokerArchive';

export const UserContext = createContext()
const Routing = () => {
  const history = useHistory()
  const currentpath = history.location.pathname
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    dispatch({type:"USER",payload:user})
    console.log(user)
  },[])
  const user = JSON.parse(localStorage.getItem("user"))
  return(
    <Switch>
      <Route path='/'render = { () => user ? user.acctype === "admin" ? <Admin /> : user.acctype == "broker" ? <BrokerProfile /> : <InvestorProfile /> : <Redirect to="/signin"/>}  exact />
      <Route path='/archive'render = { () => user ? user.acctype === "admin" ? <Admin /> : user.acctype == "broker" ? <BrokerArchive /> : <InvestorArchive /> : <Redirect to="/signin"/>}  exact />
      <Route path='/userdata' component = { UserData } exact />
      <Route path='/newpost' component = { () => user ? user.acctype == "broker" ? <NewPost /> : <Redirect to="/"/> : <Redirect to="/signin"/> } exact />
      <Route path='/signup' exact render={() => (user ? ( <Redirect to="/"/>) : (<Signup/>))} />
      <Route path='/signin' exact render={() => (user ? ( <Redirect to="/"/>) : (<Signin/>))} />
      <Route path='/post/:id' render = { props => <PostPage {...props} /> } exact />
      <Route path='/allposts' render = { () => user ? user.acctype == "investor" ? <AllPosts /> : <Redirect to="/"/> : <Redirect to="/signin"/> } exact />
      <Route path='/admin/users' exact render={() => (user ? user.acctype === "admin" ? (<AdminUsers/>) : ( <Redirect to="/"/>) : ( <Redirect to="/signin"/>))}/>
      <Route path='/admin' exact render={() => (user ? user.acctype === "admin" ? (<Admin/>) : ( <Redirect to="/"/>) : ( <Redirect to="/signin"/>))} exact/>
      <Route path='/logout' exact render={() => (user ? <LogoutPage /> : ( <Redirect to="/signin"/>))} exact/>
      <Route path='/' render={() => (user ? <Page404/> : <Redirect to="/"/> )}/>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
  <UserContext.Provider value={{state:state,dispatch:dispatch}}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
  </UserContext.Provider>
  )
}

export default App;
