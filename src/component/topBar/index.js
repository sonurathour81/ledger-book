import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
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
        li.rightside {
            padding: 7px 0px;
            padding-right: 15px;
            i{
                align-items: center;
                justify-content: center;
                display: flex;
                padding-right: 10px;
                cursor: pointer;
                color: #808080;
            }
            i.up{
                align-items: end;
            }
        }
        li.rightsideImg{
            padding: 2px 0px;
            div{
                height: 37px;
                width: 37px;
                border-radius: 20px;
                font-size: 16px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
            }
        }
        li.rightsideuser{
            color: #4e4e4e;
            cursor: pointer;
            text-transform: capitalize;
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

const HideShowDiv = styled.div`
    position: absolute;
    right: 20px;
    bottom: -107px;
    box-shadow: 0px 5px 15px 4px rgba(0,0,0,.1);
    background: white;
    padding: 7px 0px;
    transition-timing-function: ease-in-out;
    div{
        padding: 10px 15px;
        width: 150px;
        font-size: 16px;
        color: #4e4e4e;
        cursor: pointer;
        &:hover{
            color: #21ba45;
        }
    }
    div a{
        color: #4e4e4e;
        &:hover{
            color: #21ba45;
            text-decoration: none!important;
        }
    }
`
const ImgDiv= styled.div`
    background: ${props => props.clor && props.clor};
`
const TopBar = (props) => {
    const mapState = useSelector(state => state.userData);
    const dispatch = useDispatch();

    const [getToken, setGetToken] = useState('')
    const [logInUser, setloginUser] = useState('')
    const [hideShow, setHideShow] = useState(false)
    
    const showHideFun = () => {
        setHideShow(!hideShow)
    }

    const logout = (e) => {        
        localStorage.removeItem("LogedUser");
        localStorage.removeItem("Token");
        localStorage.removeItem("imageColor");
        dispatch(fun.tokenLogin({"Token": false}))
        setHideShow(false)
        window.location.reload();
        return props.history.push('/');
    }


    const [clor, setClor] = useState('')
    useEffect(()=>{
        const getToken = localStorage.getItem("Token") || '';
        setGetToken(getToken)
        setloginUser(...JSON.parse(localStorage.getItem("LogedUser")) || '')
        setClor(localStorage.getItem("imageColor") || '#21ba45')
      }, [mapState])

      
      const first_last =  logInUser && (logInUser.first_name.charAt(0).toUpperCase() + logInUser.last_name.charAt(0).toUpperCase());
    return(
        <TopbarMain>
            <ul>
                {
                    getToken &&
                        <React.Fragment>
                            <li><Link to="/">Customers</Link></li>
                        </React.Fragment>
                }
            </ul>
            <ul>
                {
                    getToken && 
                        <React.Fragment>
                            <li className="rightside">
                                <i className= {`sort ${hideShow ? "up" : "down"} icon`} onClick={showHideFun}></i>    
                            </li>                         
                            <li className="rightsideuser" onClick={showHideFun}><div>{logInUser.first_name} {logInUser.last_name}</div></li>
                            <li className="rightsideImg"><ImgDiv clor = {clor}>{first_last}</ImgDiv></li>
                        </React.Fragment>
                }
                {
                    !getToken && 
                        <React.Fragment>
                            <li>
                                <Link to="/signup">SignUp</Link>
                            </li>
                            <li>
                                <Link to="/">SignIn</Link>
                            </li>
                        </React.Fragment>
                }
            </ul>

            {
                hideShow &&
                    <HideShowDiv>
                        <div className="profileLink"><Link to="/userProfile" onClick={() => setHideShow(false)}> <i className="user circle outline icon"></i> Profile </Link></div>
                        <div onClick={logout}> <i className="power off icon"></i> Logout</div>
                    </HideShowDiv>
            }

        </TopbarMain>
    )
}

export default TopBar;