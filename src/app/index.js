import React,{useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Intro from './intro';
import Home from './home';
import Modal from './modal';
import {get,set} from '../helpers/Store';

const AppMain=()=>{
  /*set states*/
  const [sleep, setSleep] = useState(false);
  /*time sleep for intro*/

  const [modalShow, setModalShow] = useState(false);

  /*
    read the localstorage
    for automatic update the state
  */
  useEffect(() => {
    if (get("sleep").status!==undefined) {
      setSleep(get("sleep").status)
    }else if(get("sleep").status===undefined) {
      setSleep(true)
    }else {
      setSleep(true)
    }
  },[get])

  /*
    set localstorage
  */
  const setStore=(bool)=>{
    set("sleep",{status:bool})
  }

  return  <Container fluid className={!sleep?"gradient":""}>
            <Modal modalShow={modalShow} setModalShow={setModalShow}/>
            {sleep? <Intro sleep={sleep} setSleep={setSleep} setStore={setStore}/>:
                    <Home setSleep={setSleep} setStore={setStore} setModalShow={setModalShow}/>}
          </Container>
}
export default AppMain
