import React,{useState,useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Logo from '../assets/images/logo-notificacion.png';
import {SiteTitle,SiteDescription,SiteRedirection} from '../helpers/Constants';

let counter =   ()=>{}
let seg     =   0
let seg_inv =   10

const AppMain=({sleep,setSleep,setStore})=>{

  const [count, setCount] = useState(0);

  /*init clock*/
  useEffect(() => {
    if (sleep) {
      seg     =   0
      counter = setInterval(()=>{
        seg   = seg+1
        setCount(seg)
      }, 1000);
    }
  },[sleep])

  /*stop clock*/
  useEffect(() => {
    if (seg_inv-count<=0) {
      clearInterval(counter);
      setSleep(false)
      setStore(false)
    }
  },[count])


  /*
    handle
    two events
      * close Intro
      * set localstorage
  */
  const handleClick=()=>{
    clearInterval(counter);
    setSleep(false)
    setStore(sleep?false:true)
  }

  return  <>
            <Row>
              <Col className="text-center">
                <Image src={Logo} alt={SiteTitle}/>
                <h1><b>{SiteTitle}</b></h1>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                {SiteDescription}
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                {SiteRedirection} <b>{seg_inv-count}</b> Seg
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="text-center">
                <Button onClick={handleClick}>Ingresar</Button>
              </Col>
            </Row>
          </>
}
export default AppMain
