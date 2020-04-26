import styled from "styled-components";

export const MainUsersDiv = styled.div`
    margin-top: 87px;
`
export const MainUsersTable = styled.div`
    position: fixed;
    width: 100%;
    top: 175px;

    .cust-mrgn-tp{
        margin-left: 20px;
        margin-right: 20px;
        box-shadow: 0px 0px 8px 3px rgba(0,0,0,.1);
        padding: 20px;
    }
    .cust-mrgn-tp table{
        border-bottom: 1px solid #21ba45!important;
        border-top: 1px solid #21ba45!important;
        margin-bottom: 0px!important;
        border-radius: 0px!important;


        tbody tr td{
            padding-top: 13px!important;
            align-items: center;
            padding-bottom: 10px;
        }
        .action{
            padding-top: 9px!important;
            padding-bottom: 8px!important;
        }
    }
    
    .fullTr:hover{
        cursor: pointer;
        background: #f9fafb;
        z-index: -1;
    }

    .iconsManDiv{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .iconsManDiv div{
        cursor: pointer;
        padding: 2px;
        font-size: 17px;
    }

    .iconsManDiv div:nth-child(1){
        color: #21ba45;
    }

    .iconsManDiv div:nth-child(2){
        a{
            color: #fbbd08;
            text-decoration: none;
        }
    }

    .iconsManDiv div:nth-child(3){
        color: #db2828;
    }

`
export const NoUser = styled.div`
    text-align: center;
    font-size: 22px;
    color: grey;
    line-height: 1;
`