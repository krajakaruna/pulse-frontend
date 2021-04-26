import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Layout, Card, Col, Badge, Timeline, Row, Divider, Descriptions, Button, Carousel, Skeleton, Menu} from 'antd';
import {Link} from 'react-router-dom';
import axios from "axios";
import {DownCircleFilled, MenuOutlined} from '@ant-design/icons';
import {treeForEach} from "enzyme/src/RSTTraversal";
import Footer from "./Footer";
import Background5 from "../../images/banner6.jpg";
import Background7 from "../../images/banner7.jpg";
import Background8 from "../../images/banner8.jpg";
import Background9 from "../../images/banner9.jpg";

const { Header, Content } = Layout;
const { Meta } = Card;
var sectionStyle5 = {
  width: "100%",
  backgroundImage: "url(" + Background5 + ")"
};
var sectionStyle7 = {
  width: "100%",
  backgroundImage: "url(" + Background7 + ")"
};
var sectionStyle8 = {
  width: "100%",
  backgroundImage: "url(" + Background8 + ")"
};
var sectionStyle9 = {
  width: "100%",
  backgroundImage: "url(" + Background9 + ")"
};
export class Offers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ReviewData:[],
      feedbackData:[],
      feedbackDataLoad:[],
      loading: false
    }

  }
  static propTypes = {
    pulse: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  gotoPage(val){
    if(val=="Pulse"){
      this.props.history.push('/');
    }else if(val=="Offers"){
      this.props.history.push('/offers');
    }else if(val=="Team"){
      this.props.history.push('/team');
    }else if(val=="Login"){
      this.props.history.push('/login');
    }else if(val=="About"){
      this.props.history.push('/about');
    }else {

    }
  }
  render() {
    return (
      <div className="pulse-offers">
        <Layout >
          <Header className='header'>
            <Row>
              <Col xl={12} lg={12} md={12} sm={20} xs={20}>

                <Menu
                    //   theme='dark'
                    mode='horizontal'
                    style={{textAlign:'left',backgroundColor:'#003760',color:'#ffa500',fontWeight:800}}
                    defaultSelectedKeys={["Pulse"]}
                    //  overflowedIndicator={<MenuOutlined />}
                >
                  <Menu.Item
                      key="Pulse"
                      onClick={() => this.gotoPage("Pulse")}
                  >
                    <img src={require('../../images/pulse.png')} className="app-logo" alt="logo" /> MST-Pulse
                  </Menu.Item>
                </Menu>
              </Col>
              <Col xl={12} lg={12} md={12} sm={4} xs={4}>
                <Menu
                    //   theme='dark'
                    mode='horizontal'
                    //defaultSelectedKeys={["item1"]}
                    overflowedIndicator={<MenuOutlined />}
                    style={{textAlign:'right',backgroundColor:'#003760',color:'#ffa500',fontWeight:800}}
                >
                  <Menu.Item
                      key="Offers"
                      onClick={() => this.gotoPage("Offers")}
                  >
                    Offers
                  </Menu.Item>
                  <Menu.Item
                      key={"Team"}
                      onClick={() => this.gotoPage("Team")}
                  >
                    Team
                  </Menu.Item>
                  <Menu.Item
                      key={"About"}
                      onClick={() => this.gotoPage("About")}
                  >
                    About
                  </Menu.Item>
                  <Menu.Item
                      key={"Login"}
                      onClick={() => this.gotoPage("Login")}
                  >
                    Login
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
          </Header>
          <Content  className="home1"   style={{backgroundColor:'#ffffff'}}>
            <section >
          <div className="main-body">
            <div className="container">
              <nav aria-label="breadcrumb" className="main-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Offers</li>
                </ol>
                <center>
                  <div style={{backgroundColor:'rgb(53 137 175)'}} >
                    <h1  className="font-heading" style={{fontWeight:850,color:'rgb(250,250,250)',fontSize:26,padding:10}}>Mitra Managed Services offering</h1>
                  </div>
                </center>
              </nav>


              <div className="row gutters-sm">
                <div className="col-sm-6 col-xl-3 mb-3">
                  <div className="card" style={sectionStyle5}>
                    <div className="card-header border-bottom flex-column align-items-start p-3"   style={sectionStyle5}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                           className="feather feather-box text-secondary h3 stroke-width-1 mb-2">
                        <path
                            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                      <h3 className="text-secondary font-weight-light mb-2"><strong>Bronze</strong></h3>
                      <p className="font-size-sm mb-0"><strong>A Simple plan to cater your basic supporting needs</strong></p>
                    </div>
                    {/*<div className="card-header border-bottom justify-content-center py-4">*/}
                    {/*  <h1 className="pricing-price">*/}
                    {/*    <small className="align-self-start">$</small>*/}
                    {/*    29*/}
                    {/*    <small className="align-self-end">/month</small>*/}
                    {/*  </h1>*/}
                    {/*</div>*/}
                    <div className="card-body" >
                      <ul className="list-unstyled font-size-sm mb-0">
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                          </svg>
                          <strong style={{color:'rgb(53 137 175)'}}> L1 Support</strong></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>

                          </svg>
                          <span className="text-secondary ml-1">Provide initial investigation</span></li>

                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Picking up calls for  <strong>P1</strong> and <strong>P2</strong> incidents</span></li>

                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                          </svg>
                          <strong  style={{color:'rgb(53 137 175)'}}> L2 Support</strong></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Application Monitoring</span></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Infrastructure Monitoring</span></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Cloud Management</span></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Reporting</span></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Servers/Virtual environment management</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Database Management</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Storage</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Backup</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Network management</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Security Management</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                          </svg>
                          <strong  style={{color:'rgb(53 137 175)'}}> No L3 Support</strong></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Defects Fixing</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Minor Enhancements</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Testing Services</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                          </svg>
                          <strong  style={{color:'rgb(53 137 175)'}}> Support Hours</strong></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1"><strong>8x5</strong> Support</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1"><strong>40</strong> Hours a Month (<strong>L2</strong> Support)</span>
                        </li>
                      </ul>
                    </div>
                    {/*<div className="card-footer justify-content-center p-3">*/}
                    {/*  <button className="btn btn-outline-secondary">SUBSCRIBE PLAN</button>*/}
                    {/*</div>*/}
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3 mb-3">
                  <div className="card border border-success">
                    <div className="card-header border-bottom flex-column align-items-start p-3"  style={sectionStyle8}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                           className="feather feather-package text-success h3 stroke-width-1 mb-2">
                        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                        <path
                            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                      <h4 className="text-success font-weight-light mb-2"><strong>Silver</strong></h4>
                      <p className="font-size-sm mb-0"><strong>A plan that covers the basics yet with wider coverage</strong></p>
                    </div>
                    {/*<div className="card-header border-bottom justify-content-center py-4">*/}
                    {/*  <h1 className="pricing-price">*/}
                    {/*    <small className="align-self-start">$</small>*/}
                    {/*    39*/}
                    {/*    <small className="align-self-end">/month</small>*/}
                    {/*  </h1>*/}
                    {/*</div>*/}
                    <div className="card-body"  style={sectionStyle8}>
                      <ul className="list-unstyled font-size-sm mb-0">
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                          </svg>
                          <strong  className="text-success font-weight-light mb-2"> L1 Support</strong></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>

                          </svg>
                          <span className="text-secondary ml-1">Provide initial investigation</span></li>

                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Picking up calls for  <strong>P1</strong> and <strong>P2</strong> incidents</span></li>

                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                          </svg>
                          <strong className="text-success font-weight-light mb-2"> L2 Support</strong></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Application Monitoring</span></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Infrastructure Monitoring</span></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Cloud Management</span></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Reporting</span></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Servers/Virtual environment management</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Database Management</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Storage</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Backup</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Network management</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Security Management</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                          </svg>
                          <strong  className="text-success font-weight-light mb-2"> No L3 Support</strong></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Defects Fixing</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Minor Enhancements</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Testing Services</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                          </svg>
                          <strong  className="text-success font-weight-light mb-2"> Support Hours</strong></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1"><strong>8x7</strong> Support</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1"><strong>40</strong> Hours a Month (<strong>L2</strong> Support)</span>
                        </li>
                      </ul>
                    </div>
                    {/*<div className="card-footer justify-content-center p-3">*/}
                    {/*  <button className="btn btn-outline-success">SUBSCRIBE PLAN</button>*/}
                    {/*</div>*/}
                  </div>
                </div>
                <Divider/>
                <div className="col-sm-6 col-xl-3 mb-3">
                  <div className="card" >
                    <div className="card-header border-bottom flex-column align-items-start p-3" style={sectionStyle9}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                           className="feather feather-layers text-primary h3 stroke-width-1 mb-2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                      </svg>
                      <h3 className="text-primary font-weight-light mb-2"><strong>Gold</strong></h3>
                      <p className="font-size-sm mb-0"> <strong>A balanced premium offering to suit large enterprises</strong></p>
                    </div>
                    {/*<div className="card-header border-bottom justify-content-center py-4">*/}
                    {/*  <h1 className="pricing-price">*/}
                    {/*    <small className="align-self-start">$</small>*/}
                    {/*    49*/}
                    {/*    <small className="align-self-end">/month</small>*/}
                    {/*  </h1>*/}
                    {/*</div>*/}
                    <div className="card-body" style={sectionStyle9}>
                      <ul className="list-unstyled font-size-sm mb-0">
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                          </svg>
                          <strong className="text-primary font-weight-light mb-2"> L1 Support</strong></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>

                          </svg>
                          <span className="text-secondary ml-1">Provide initial investigation</span></li>

                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Picking up calls for  <strong>P1</strong> and <strong>P2</strong> incidents</span></li>

                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                          </svg>
                          <strong  className="text-primary font-weight-light mb-2"> L2 Support</strong></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Application Monitoring</span></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Infrastructure Monitoring</span></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Cloud Management</span></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Reporting</span></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Servers/Virtual environment management</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Database Management</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Storage</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Backup</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Network management</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Security Management</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                          </svg>
                          <strong  className="text-primary font-weight-light mb-2"> L3 Support</strong></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Defects Fixing</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Minor Enhancements</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-x text-danger mr-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                          <strong>No </strong><span className="text-secondary ml-1">Testing Services</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                          </svg>
                          <strong  className="text-primary font-weight-light mb-2"> Support Hours</strong></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1"> <strong>24x7</strong>(Out of office support <strong>P1 & P2</strong> incidents)</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">A shared pool of resources with a cap of <strong>80</strong> hours for <strong>L2 & 40</strong> Hours for <strong>L3</strong> support</span>
                        </li>
                      </ul>
                    </div>
                    {/*<div className="card-footer justify-content-center p-3">*/}
                    {/*  <button className="btn btn-outline-primary">SUBSCRIBE PLAN</button>*/}
                    {/*</div>*/}
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3 mb-3">
                  <div className="card">
                    <div className="card-header border-bottom flex-column align-items-start p-3" style={sectionStyle7}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                           className="feather feather-gift text-danger h3 stroke-width-1 mb-2">
                        <polyline points="20 12 20 22 4 22 4 12"></polyline>
                        <rect x="2" y="7" width="20" height="5"></rect>
                        <line x1="12" y1="22" x2="12" y2="7"></line>
                        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                      </svg>
                      <h4 className="text-danger font-weight-light mb-2"><strong>Platinum</strong></h4>
                      <p className="font-size-sm mb-0"><strong>Uncompromised service offering with dedicated dev support & test teams</strong></p>
                    </div>
                    {/*<div className="card-header border-bottom justify-content-center py-4">*/}
                    {/*  <h1 className="pricing-price">*/}
                    {/*    <small className="align-self-start">$</small>*/}
                    {/*    159*/}
                    {/*    <small className="align-self-end">/month</small>*/}
                    {/*  </h1>*/}
                    {/*</div>*/}
                    <div className="card-body"  style={sectionStyle7}>
                      <ul className="list-unstyled font-size-sm mb-0">
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                          </svg>
                          <strong   className="text-danger font-weight-light mb-2"> L1 Support</strong></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>

                          </svg>
                          <span className="text-secondary ml-1">Provide initial investigation</span></li>

                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Picking up calls for  <strong>P1</strong> and <strong>P2</strong> incidents</span></li>

                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                          </svg>
                          <strong   className="text-danger font-weight-light mb-2"> L2 Support</strong></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Application Monitoring</span></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Infrastructure Monitoring</span></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Cloud Management</span></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Reporting</span></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Servers/Virtual environment management</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Database Management</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Storage</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Backup</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Network management</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Security Management</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                          </svg>
                          <strong   className="text-danger font-weight-light mb-2"> L3 Support</strong></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Defects Fixing</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Minor Enhancements</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Testing Services</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-caret-right-square" viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M5.795 12.456A.5.5 0 0 1 5.5 12V4a.5.5 0 0 1 .832-.374l4.5 4a.5.5 0 0 1 0 .748l-4.5 4a.5.5 0 0 1-.537.082z"/>
                          </svg>
                          <strong   className="text-danger font-weight-light mb-2"> Support Hours</strong></li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1"><strong>24x7</strong> (Out of office support <strong>P1 & P2</strong> incidents)</span>
                        </li>
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                               className="feather feather-check text-success mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-secondary ml-1">Dedicated Full time resources</span>
                        </li>
                      </ul>
                    </div>
                    {/*<div className="card-footer justify-content-center p-3">*/}
                    {/*  <button className="btn btn-outline-danger">SUBSCRIBE PLAN</button>*/}
                    {/*</div>*/}
                  </div>
                </div>
              </div>

            </div>
          </div>
            </section>
          <Divider/>
          <div>
            {/*<Footer style={{textAlign: 'center',backgroundColor:"rgb(14 82 113)"}}> <p style={{color:"rgb(247 123 17)",fontSize:14}}>Copyright © 2021 MST-Pulse. Version: 1.0.0</p></Footer>*/}
            <Footer/>

          </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    pulse: state.pulse,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Offers);
