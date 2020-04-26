import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import styled,{css} from 'styled-components'
import * as fun from '../../redux/actions/index'


const TopbarMain = styled.div`
    position: fixed;
    width: 100%;
    box-shadow: 0px 3px 6px 0px rgba(0,0,0,.1);
    top: 0;
    left: 0;
    right: 0;
    background: white;
    z-index: 99;
    display: flex;

    ul:nth-child(1){
        width: 70%;
    }
    ul:nth-child(2){
        width: 30%;
        flex-direction: row-reverse;
    }

    ul{
        display: flex;
        list-style: none;
        padding: 10px;
        margin-bottom: 0px;
        li.logout{
            color: #4e4e4e;
            cursor: pointer;
            &:hover{
                color: #868686;
            }
        }
        li{
            padding: 7px 20px;
            font-size: 18px;
            color: black;
            a{
                text-decoration: none;
                color: #4e4e4e;
                &:hover{
                    color: #868686;
                }
            }
        }
    }
`


const TopBar = (props) => {

    const mapState = useSelector(state => state.userData);
    const dispatch = useDispatch();

    const [getToken, setGetToken] = useState('')

    const logOutFun = () => {
        localStorage.removeItem("LogedUser");
        localStorage.removeItem("Token");
        dispatch(fun.tokenLogin({"Token": false}))
        window.location.reload();
        return props.history.push('/');
        // return <Redirect path="/addUser" to="/" />
    }

    useEffect(()=>{
        const getToken = localStorage.getItem("Token") || '';
        setGetToken(getToken)
      }, [mapState])


    return(
        <TopbarMain>
            <ul>
                <li><Link to="/">Home</Link></li>
                {
                    getToken &&
                        <React.Fragment>
                            <li><Link to="/addUser">Add User</Link></li>
                            <li><Link to="/usersTable">Users</Link></li>
                        </React.Fragment>
                }
            </ul>
            <ul>
                {
                    getToken && 
                        <React.Fragment>                            
                            <li className="logout" onClick={logOutFun}>Logout</li>
                        </React.Fragment>
                }
                {
                    !getToken && 
                        <React.Fragment>
                            <li>
                                <Link to="/signup">SignUp</Link>
                            </li>
                            <li>
                                <Link to="/login">SignIn</Link>
                            </li>
                        </React.Fragment>
                }
            </ul>
        </TopbarMain>
    )
}

export default TopBar;