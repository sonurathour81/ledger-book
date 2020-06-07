import styled from 'styled-components'

export const MainDiv = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
`

export const MainDiv2 = styled.div`
    height: auto;
    box-shadow: 0px 0px 18px 7px rgba(0,0,0,.1);
    padding: 15px;
    display:flex;
    border-top-left-radius: 100px;
    border-bottom-right-radius: 100px;
    width: 65%;
`

export const Div1 = styled.div`
    width: 20%;
    padding: 15px;
    padding-top: 30px;
    padding-left: 30px;
}
`

export const Div2 = styled.div`
    width: 80%;
    padding: 15px;
    padding-top: 25px;
    padding-right: 30px;
`

export const ImageDiv = styled.div`
    /* background: #21ba45; */
    border-radius: 100%;
    height: 180px;
    width: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 90px;
    color: white;
    box-shadow: 0px 0px 0px 8px rgba(0,0,0,.1);
    margin: 0 auto;
    background: ${props => props.bgcolor && `${props.bgcolor}`};
`

export const FullName = styled.div`
    font-size: 16px;
    text-transform: capitalize;
    color: #4e4e4e;
    display: flex;
    line-height: 2;
    justify-content: center;
    .rating{
        margin: 10px 0px;
        i{
            cursor: pointer;
            color: #fbe966!important;
        }
        i:last-child {
            color: #d4d4d4!important;
        }  
    } 

`

export const CustmFormField = styled.div`
    padding: 3px 12px!important;

    label{
        font-size: 16px!important;
        font-weight: 100!important;
        color: #888888!important;
        margin-bottom: 6px!important;
    }
    input{
        padding: 10px!important;
        font-size: 13px!important;
        color: #383838!important;
        border-radius: 0px!important;

    }
`
export const CustmButtonTop = styled.div`
    padding: 0px 6px 20px;
    display: flex!important;
    justify-content: space-between;
    button{
        padding: 12px!important;
        font-size: 13px!important;
        border-radius: 0px!important;
        display: flex!important;
        i{
            color: white;
            &:hover{
                color: white;
            }
        }
    }
    div:nth-child(1){
        font-size: 20px;
        color: #21ba45;
    }
`

export const CustmButton = styled.div`
    padding: 10px 6px;
    button{
        width: 100%;
        padding: 14px!important;
        font-size: 13px!important;
        border-radius: 0px!important;
    }
`

export const ChekBoxsMain = styled.div`
    padding: 8px 0px;
    .ui.radio.checkbox label:before {
        width: 20px!important;
        height: 20px!important;
        top: 0px!important;
    }
    .ui.radio.checkbox label:after {
        top: 0px!important;
        width: 20px!important;
        height: 20px!important;
        background-color: rgb(33, 186, 69)!important;
    }
` 

export const ChangePassword = styled.div`
    color: #21ba45;
    cursor: pointer;
    opacity: .7;
    &:hover{
        opacity: 1;
    }
`