import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as fun from '../../redux/actions/index'
import * as stylCls from './style'
import { toast } from 'react-toastify';
import { ConfirmationModal } from '../confirmationModal/index'

export const UserProfile = () => {
    const mapState = useSelector(state => state);
    const dispatch = useDispatch();
    
    const [logInUser, setloginUser] = useState('')
    const [clickEdit, setClickEdit] = useState(false)
    
    const [clor, setClor] = useState('')
    const colors = ["#ca8a8a", "#21ba45", "#9f79e6", "#fe36ff", "#ff81aa"]
    const changeBg = () => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        setClor(color)
        return color
    }

	useEffect(()=>{
        dispatch(fun.displayDataInitial())
        setloginUser(...JSON.parse(localStorage.getItem("LogedUser")) || '')
        setClor(localStorage.getItem("imageColor") || '#21ba45')
    }, [clickEdit])


    const fieldHandle = (e) => {
        setloginUser({...logInUser,
            [e.target.name] : e.target.value
        })
    }
    
    const [updateStatus, setUpdateStatus] = useState(false)
    const updateSubmit = (e) => {
        e.preventDefault();
        dispatch(fun.initialUpdateUser(logInUser))
        setUpdateStatus(!updateStatus)
        setClickEdit(false)
        if(fixedValue.first_name.charAt(0).toUpperCase() !== logInUser.first_name.charAt(0).toUpperCase() 
            || 
            fixedValue.last_name.charAt(0).toUpperCase() !== logInUser.last_name.charAt(0).toUpperCase()){
            localStorage.setItem("imageColor", changeBg())
            changeBg()
        }
        toast.success(`Profile Update Successfully!`)
    }
    
    const [fixedValue, setFixedValue] = useState('')
    useEffect(()=>{
        setFixedValue(...JSON.parse(localStorage.getItem("LogedUser")) || '')
    },[updateStatus])
    const first_last =  fixedValue && (fixedValue.first_name.charAt(0).toUpperCase() + fixedValue.last_name.charAt(0).toUpperCase());
    const [showModal, setShowModal] = useState(false)
    const hideModal = () => {
        setShowModal(false)
        dispatch(fun.changePasswordStatus(Date.now()))
        setUpdateStatus(!updateStatus)
    }
    return(
        <stylCls.MainDiv>
            <stylCls.MainDiv2>
                <stylCls.Div1>
                    <stylCls.ImageDiv
                        bgcolor={clor}
                    >
                      {first_last}
                    </stylCls.ImageDiv>
                    <div style={{marginTop:'20px'}}>
                        <stylCls.FullName>
                            {fixedValue.first_name} {fixedValue.last_name}
                        </stylCls.FullName>
                        <stylCls.FullName>
                            {fixedValue.store_name}
                        </stylCls.FullName>
                        <stylCls.FullName>
                            <div class="ui huge star rating">
                                <i class="icon"></i>
                                <i class="icon"></i>
                                <i class="icon"></i>
                                <i class="icon"></i>
                                <i class="icon"></i>
                            </div>
                        </stylCls.FullName>
                        <stylCls.FullName>
                            <stylCls.ChangePassword onClick={()=>setShowModal(true)}>Change Password</stylCls.ChangePassword>
                        </stylCls.FullName>
                    </div>
                </stylCls.Div1>
                <stylCls.Div2>
                    <div>
                        <stylCls.CustmButtonTop>
                            <div>
                                My Profile
                            </div>
                            <div>
                                <button 
                                    className="positive ui button" 
                                    type="submit"
                                    onClick={()=> clickEdit ? setClickEdit(false) : setClickEdit(true) }
                                >
                                    {
                                        clickEdit ? 
                                        <React.Fragment><i className="close icon"></i>Close</React.Fragment>
                                        :
                                        <React.Fragment><i className="edit outline icon"></i> Edit / Complete Profile</React.Fragment>
                                    }
                                    
                                </button>
                            </div>
                        </stylCls.CustmButtonTop>
                        <form className="ui form" onSubmit={updateSubmit} false>
                            <div className="two fields">
                                <stylCls.CustmFormField className="field">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        required
                                        name="first_name"
                                        value={logInUser.first_name}
                                        onChange={(e)=>{fieldHandle(e)}}
                                        disabled = {clickEdit === false && true}
                                    />
                                </stylCls.CustmFormField>
                                <stylCls.CustmFormField className="field">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        name="last_name"
                                        value={logInUser.last_name}
                                        onChange={(e)=>{fieldHandle(e)}}
                                        disabled = {clickEdit === false && true}
                                    />
                                </stylCls.CustmFormField>
                            </div>
                            <div className="two fields">
                                <stylCls.CustmFormField className="field">
                                    <label>Store Name</label>
                                    <input
                                        type="text"
                                        required
                                        name="store_name"
                                        value={logInUser.store_name}
                                        onChange={(e)=>{fieldHandle(e)}}
                                        disabled = {clickEdit === false && true}
                                    />
                                </stylCls.CustmFormField>
                                <stylCls.CustmFormField className="field">
                                    <label>Type of Store</label>
                                    <select 
                                        class="ui dropdown"
                                        name="storeType"
                                        value={logInUser.storeType}
                                        onChange={(e)=>{fieldHandle(e)}}
                                        disabled = {clickEdit === false && true}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="kirana">Kirana Store</option>
                                        <option value="electronic">Electronic</option>
                                        <option value="hotel">Hotel</option>
                                        <option value="bicycle">Bicycle</option>
                                    </select>
                                </stylCls.CustmFormField>             
                            </div>
                            <div className="two fields">
                                <stylCls.CustmFormField className="field">
                                    <label>Email</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={logInUser.email}
                                        onChange={(e)=>{fieldHandle(e)}}
                                        disabled = {clickEdit === false && true}
                                    />
                                </stylCls.CustmFormField>
                                <stylCls.CustmFormField className="field">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        required
                                        name="phone"
                                        value={logInUser.phone}
                                        onChange={(e)=>{fieldHandle(e)}}
                                        pattern="[0-9]{10}"
                                        title="Please use Number & 10 digit's Phone number!"
                                        maxLength={10}
                                        minLength={10}
                                        disabled = {clickEdit === false && true}
                                    />
                                </stylCls.CustmFormField>                                
                            </div>
                            <div className="two fields">
                                <stylCls.CustmFormField className="field">
                                    <label>Password</label>
                                    <input
                                        type="text"
                                        required
                                        name="city"
                                        value={fixedValue.password}
                                        disabled = {true}
                                    />
                                </stylCls.CustmFormField>
                                {
                                    (logInUser.gender || clickEdit) &&
                                    <stylCls.CustmFormField className="field">
                                        <label>Gender</label>
                                        <stylCls.ChekBoxsMain>
                                            <div class="ui radio checkbox">
                                                <input
                                                    required
                                                    type="radio"
                                                    name="gender"
                                                    value="male"
                                                    checked={logInUser.gender === "male"}
                                                    onChange={(e)=>{fieldHandle(e)}}
                                                    disabled = {clickEdit === false && true}
                                                />
                                                <label>Male</label>
                                            </div>
                                            <div class="ui radio checkbox" style={{marginLeft: '30px'}}>
                                                <input
                                                    required
                                                    type="radio"
                                                    name="gender"
                                                    value="female"
                                                    onChange={(e)=>{fieldHandle(e)}}
                                                    checked={logInUser.gender === "female"}
                                                    disabled = {clickEdit === false && true}
                                                />
                                                <label>Female</label>
                                            </div>
                                            <div class="ui radio checkbox" style={{marginLeft: '30px'}}>
                                                <input
                                                    required 
                                                    type="radio"
                                                    name="gender"
                                                    value="others"
                                                    onChange={(e)=>{fieldHandle(e)}}
                                                    checked={logInUser.gender === "others"}
                                                    disabled = {clickEdit === false && true}
                                                />
                                                <label>Others</label>
                                            </div>
                                        </stylCls.ChekBoxsMain>
                                    </stylCls.CustmFormField>
                                }     
                                                               
                            </div>
                            <div className="two fields">
                                {   
                                    (logInUser.state || clickEdit) &&
                                    <stylCls.CustmFormField className="field">
                                        <label>State</label>
                                        <select
                                            required
                                            class="ui dropdown"
                                            name="state"
                                            value={logInUser.state}
                                            onChange={(e)=>{fieldHandle(e)}}
                                            disabled = {clickEdit === false && true}
                                        >
                                            <option value="">Select State</option>
                                            <option value="up">UP</option>
                                            <option value="mp">MP</option>
                                            <option value="punjab">Punjab</option>
                                            <option value="chandigarh">Chandigarh</option>
                                            <option value="hp">Himachal Pradesh</option>
                                        </select>
                                    </stylCls.CustmFormField>
                                } 
                                {
                                    (logInUser.city || clickEdit) &&
                                    <stylCls.CustmFormField className="field">
                                        <label>City</label>
                                        <input
                                            type="text"
                                            required
                                            name="city"
                                            value={logInUser.city}
                                            onChange={(e)=>{fieldHandle(e)}}
                                            disabled = {clickEdit === false && true}
                                        />
                                    </stylCls.CustmFormField>
                                }                                
                            </div>
                            <div className="two fields">
                                {
                                    (logInUser.zip || clickEdit) &&
                                    <stylCls.CustmFormField className="field">
                                        <label>Zip Code</label>
                                        <input
                                            type="text"
                                            required
                                            name="zip"
                                            value={logInUser.zip}
                                            onChange={(e)=>{fieldHandle(e)}}
                                            pattern="[0-9]{6}"
                                            title="Please use Number & 6 digit's zip code!"
                                            maxLength={6}
                                            minLength={6}
                                            disabled = {clickEdit === false && true}
                                        />
                                    </stylCls.CustmFormField>
                                }
                            </div>
                            <stylCls.CustmButton>
                                {
                                    clickEdit === true &&
                                    <button 
                                        className="positive ui button" 
                                        type="submit"
                                    >
                                        Update Profile
                                    </button>
                                }
                            </stylCls.CustmButton>
                        </form>
                    </div>
                </stylCls.Div2>
            </stylCls.MainDiv2>
            <ConfirmationModal
                changePass
                showModal = {showModal}
                hideModal = {hideModal}
            />
        </stylCls.MainDiv>
    )
  }