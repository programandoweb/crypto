import React,{useEffect,useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Logo from '../assets/images/logo-notificacion.png';
import {SiteTitle} from '../helpers/Constants';
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import {EndPoint} from '../helpers/Constants';
import * as axios from 'axios';

let counter       =   ()=>{}
let refresh       =   60*1000
let default_data  =   []
const CoinsPath   =  "tickers/?start=0&limit=100"

const PostAsync   =  async (url) =>  {
  let data        =   new FormData();
  try {
    const   response = await axios.post(EndPoint+url, data);
    return  response.data
  } catch (e) {
    console.log(e);
  }
}

const empty = {
                                        info:{
                                                coins_num:0,
                                                time:0,
                                              },
                                        data:[

                                        ]
                                      }

const Detalle=({row,setModalShow})=>{
  return  <div className="row">
            <div className="col-12 mb-3">
              <h5>Nombre <b>{row.name}({row.symbol})</b></h5>
              <h6>Ranking <b>#{row.rank}</b> top 100</h6>
              <div>Precio USD <b>${row.price_usd}</b></div>
              <div>Porcentaje cambios últimas 24 horas: <b>{row.percent_change_24h}%</b></div>
              <div>Porcentaje cambios última hora: <b>{row.percent_change_1h}%</b></div>
              <div>Porcentaje cambios últimos 7 días: <b>{row.percent_change_7d}%</b></div>
              {console.log(row)}
            </div>
            <div className="col-12">
              <div className="btn btn-primary" onClick={()=>{setModalShow({show:false})}}> Cerrar </div>
            </div>
          </div>
}

const AppHome=({setSleep,setStore,setModalShow})=>{

  const [time, setTime]       = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData]       = useState(empty);
  const [filter, setFilter]   = useState(false);

  /*
    handle
    two events
      * open Intro
      * set localstorage
  */
  const handleClick=()=>{
    setSleep(true)
    setStore(true)
  }

  /*effect calling EndPoint from coins*/
  useEffect(() => {
    if (time) {
      setTime(false)
    }
    if (!time) {
      /*get data way axio*/
      PostAsync(CoinsPath).then((response)=>{
        setData(empty)
        if (response.data!==undefined && response.data.length>0) {
          /*set var default for reset filter*/
          default_data  = response.data

          /*set state*/
          setData(response)
          setLoading(false)
        }
      })
    }
  },[time])


  /*init clock*/
  useEffect(() => {
    counter = setInterval(()=>{
      setTime(true)
    }, refresh);
  },[filter])


  const onChangeFilter=(e)=>{
    /*
      make temporal var
    */
    let data_ = {...data}

    /*
      if input value not is null
    */
    if (e.target.value!=='') {
      /* stop clock*/
      setFilter(true)
      clearInterval(counter);

      let return_ = []
      default_data.map((row,key)=>{

        /*
          converted to uppercase the input.value and the item array
          find if input.value is inside item
        */
        let result = row.name.toUpperCase().includes(e.target.value.toUpperCase());

        /*
          in case true push array
        */
        if (result) {
          return return_.push(row)
        }
      })
      data_.data =  return_
    }else {
      /* start clock*/
      setFilter(false)
      /*
        if input value is null
        set default data
      */
      data_.data =  default_data
    }

    /*
      Finally set the state
    */
    setData(data_)
  }

  const openDetail=(row)=>{
    return  setModalShow({
                show:true,
                message:<Detalle row={row} setModalShow={setModalShow}/>,
                size:""
            })
  }

  return  <>
            <Row>
              <Col className="text-center">
                <Image src={Logo} alt={SiteTitle}/>
                <h1 className="text-white"><b>{SiteTitle}</b></h1>
              </Col>
            </Row>
            <Container>
              <Row className="mt-3">
                <Col className="text-center">
                  {loading && loading!=='Empty'?<Spinner animation="grow" />:<>
                    <Card>
                      <Card.Body>
                        <Card.Title><h3>Top 100 de {data.info.coins_num} monedas registradas</h3></Card.Title>
                        <div className="col-4 ps-3">
                          <input type="text" onChange={onChangeFilter} className="form-control" placeholder="Filtrar...."/>
                        </div>
                        <Card.Body>
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Rank</th>
                                  <th>Moneda</th>
                                  <th>Símbolo</th>
                                  <th>USD</th>
                                  <th>Tendencia </th>
                                  <th>Detalle </th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.data.map((row,key)=>{
                                  return  <tr key={key}>
                                            <td>{row.rank}</td>
                                            <td className={parseFloat(row.percent_change_24h)<=0?"text-danger text-start":"text-success text-start"}>{row.name}</td>
                                            <td>{row.symbol}</td>
                                            <td className="text-end">${row.price_usd}</td>
                                            <td className={parseFloat(row.percent_change_24h)<=0?"text-danger":"text-success"}>
                                              {parseFloat(row.percent_change_24h)<=0?"⇓":"⇑"} {row.percent_change_24h}
                                            </td>
                                            <td className="text-center">
                                              <div className="btn btn-primary btn-sm" onClick={()=>{openDetail(row)}}>
                                                Ver
                                              </div>
                                            </td>
                                          </tr>
                                })}
                              </tbody>
                            </Table>
                        </Card.Body>
                      </Card.Body>
                    </Card>
                  </>}
                </Col>
              </Row>
            </Container>
            {
              !loading?<Row className="mt-3">
                        <Col className="text-center">
                          <Button onClick={handleClick}>Abrir intro</Button>
                        </Col>
                      </Row>:false
            }
          </>
}
export default AppHome
