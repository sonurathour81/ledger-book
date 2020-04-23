import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as fun from '../../redux/actions/index'
import * as styl from '../../style'

export const Home = () => {
    const mapState = useSelector(state => state);
    const dispatch = useDispatch();
    

	useEffect(()=>{
        dispatch(fun.displayDataInitial())
	}, [])

    return(
        <styl.ManForm>
            <styl.NotFondText>
                Home
            </styl.NotFondText>
        </styl.ManForm>
    )
  }