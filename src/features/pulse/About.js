import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Card, Carousel, Col, Divider, Layout, Menu, Row} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import Background5 from "../../images/banner5.jpg";
import Footer from "./Footer";

const { Header, Content } = Layout;
const { Meta } = Card;
var sectionStyle5 = {
  width: "100%",
  backgroundImage: "url(" + Background5 + ")"
};
export class About extends Component {
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
      <div className="pulse-about">
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
          <Content  className="home11" style={{backgroundColor:'#ffffff'}}>

            <section22 style={sectionStyle5} id="features" className="section-padding">

              <div className="container">
                <nav aria-label="breadcrumb" className="main-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">About</li>
                  </ol>

                </nav>
                <div className="section-header text-center">
                  <center>
                    <div style={{backgroundColor:'rgb(53 137 175)'}} >
                      <h1  className="font-heading" style={{fontWeight:850,color:'rgb(250,250,250)',fontSize:26,padding:10}}>We are a Small Team who can make a big impact</h1>
                    </div>
                  </center>
                  <div className="shape wow fadeInDown"></div>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                    <div className="content-left">
                      <div className="box-item animated wow fadeInLeft">
                            <span className="icon">
                         <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
                            </span>
                        <div className="text">
                          <h4>Complementary out of office coverage</h4>
                          <p>All mission critical tickets will be looked at during out of office hours with no extra charge as a value add to all client.</p>
                        </div>
                      </div>
                      <div className="box-item animated wow fadeInLeft" data-wow-delay="0.6s">
                            <span className="icon">
                           <i className="fa fa-fast-forward" aria-hidden="true"></i>
                            </span>
                        <div className="text">
                          <h4>2x Faster Service Transition</h4>
                          <p>A specialized team experienced in transition allows for a much faster & smoother transition.</p>
                        </div>
                      </div>
                      <div className="box-item animated wow fadeInLeft" data-wow-delay="0.9s">
                            <span className="icon">
                            <i className="fa fa-tint" aria-hidden="true"></i>
                              </span>
                        <div className="text">
                          <h4>No Knowledge Leak</h4>
                          <p>60% of knowledge is typically leaked during service transition. We ensure this is not the case with our unique transition program.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                    <div className="show-box animated wow fadeInUp">
                      <h1 className="font-heading" style={{fontWeight:850,color:'rgba(30,41,14,0.95)',fontSize:30,padding:0}}>Why</h1>
                      <img src={require('../../images/Mitra.png')} style={{height:50,width:170}}/>
                      <h1  className="font-heading" style={{fontWeight:850,color:'rgba(30,41,14,0.95)',fontSize:36,padding:0}}>Managed services?</h1>
                    </div>
                    <div className="content-right">
                      <div className="box-item animated wow fadeInRight">
                            <span className="icon">
                            <i className="fa fa-eye-slash" aria-hidden="true"></i>
                              </span>
                        <div className="text">
                          <h4>No Hidden Costs</h4>
                          <p>We will set up monitoring / alerting, Jira ticketing tools, dashboards all with no added cost.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                    <div className="content-right">
                      <div className="box-item animated wow fadeInRight">
                            <span className="icon">
                       <i className="fa fa-cogs" aria-hidden="true"></i>
                        </span>
                        <div className="text">
                          <h4>70% of issues cought proactively</h4>
                          <p>Automated proactive monitoring uncovers 70% of all incidents without an end user ever even knowing.</p>
                        </div>
                      </div>
                      <div className="box-item animated wow fadeInRight" data-wow-delay="0.6s">
                            <span className="icon">
                    <i className="fa fa-long-arrow-down" aria-hidden="true"></i>
                    </span>
                        <div className="text">
                          <h4>10% user incident reduction YoY</h4>
                          <p>Across our existing clients we have reduced reactive tickets by 10% YoY .</p>
                        </div>
                      </div>
                      <div className="box-item animated wow fadeInRight" data-wow-delay="0.9s">
                            <span className="icon">
                        <i className="fa fa-search" aria-hidden="true"></i>
                          </span>
                        <div className="text">
                          <h4>Complete Transparency</h4>
                          <p>Dashboards that provide real time information on service performance & application health to Clients.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             <Divider/>
              <div className="main-body">
                <div className="container">

                  <center>
                    <div style={{backgroundColor:'rgb(53 137 175)'}} >
                      <h1  className="font-heading" style={{fontWeight:850,color:'rgb(250,250,250)',fontSize:26,padding:10}}>A Host of Mitra Solutions at your Disposal to Help Save you Time & Costs
                      </h1>
                    </div>
                  </center>

                  <div className="row gutters-sm">
                    <div className="row">
                      <div className="col-md-4 col-sm-6">
                        <div className="serviceBox1">
                          <div className="service-icon">
                            <i className="fa fa-tachometer"></i>
                          </div>
                          <div className="service-content">

                            <p>
                              Real Time Intelligence dashboards that tell our customers stats on demand (SLAs, System & Operational Health etc.)

                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6">
                        <div className="serviceBox1">
                          <div className="service-icon">
                            <i className="fa fa-wrench"></i>
                          </div>
                          <div className="service-content">

                            <p>
                              Immediate interaction at your  fingertips and playback historical events of your network like a movie with our easy to use graphical, real time network monitoring tool - “Cloud Patrol”
                              .
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6">
                        <div className="serviceBox1">
                          <div className="service-icon">
                            <i className="fa fa-gamepad"></i>
                          </div>
                          <div className="service-content">

                            <p>
                              Our teams are driven to be at the top of their game in ensuring your systems are available and secure with realtime gamified dashboards .
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 col-sm-6">
                        <div className="serviceBox1">
                          <div className="service-icon">
                            <i className="fa fa-reddit-alien"></i>
                          </div>
                          <div className="service-content">

                            <p>
                              We automate monitoring of your system 24x7 allowing proactive automatic escalation to our help desk for action .
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6">
                        <div className="serviceBox1">
                          <div className="service-icon">
                            <i className="fa fa-slideshare"></i>
                          </div>
                          <div className="service-content">

                            <p>
                              Our teams will not miss a beat with automated call outs are sent to our teams whenever a critical service or a website is down .
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6">
                        <div className="serviceBox1">
                          <div className="service-icon">
                            <i className="fa fa-ticket"></i>
                          </div>
                          <div className="service-content">

                            <p>
                              We offer Jira as a ticket management tool at no added cost to your package .
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <Divider/>
              </section22>
            <div className="container">
              <div className="row">
                <center>
                  <div style={{backgroundColor:'rgb(53 137 175)'}} >
                    <h1  className="font-heading" style={{fontWeight:850,color:'rgb(250,250,250)',fontSize:26,padding:10}}>Introducing Mitra Managed Services Forte</h1>
                  </div>
                </center>
                <div className="col-md-12">
                  <div className="vertical-tab" role="tabpanel">

                    <ul className="nav nav-tabs" role="tablist">
                      <li role="presentation" className="active"><a href="#Section1" aria-controls="home" role="tab"
                                                                    data-toggle="tab">Development & Dev Ops</a></li>
                      <li role="presentation"><a href="#Section2" aria-controls="profile" role="tab" data-toggle="tab">Cloud & Onprem Infrastructure Support</a></li>
                      <li role="presentation"><a href="#Section3" aria-controls="messages" role="tab" data-toggle="tab">Network & Security Management</a></li>
                      <li role="presentation"><a href="#Section4" aria-controls="messages" role="tab" data-toggle="tab">CRM Support</a></li>
                      <li role="presentation"><a href="#Section5" aria-controls="messages" role="tab" data-toggle="tab">CMS Support</a></li>
                      <li role="presentation"><a href="#Section6" aria-controls="messages" role="tab" data-toggle="tab">Other Types of Support</a></li>
                    </ul>

                    <div className="tab-content tabs">

                      <div role="tabpanel" className="tab-pane fade" id="Section1">
                        <h3>Development & Dev Ops</h3>
                        <p>Level 3 Development support that extends beyond basic configuration changes.</p>
                      </div>
                      <div role="tabpanel" className="tab-pane fade in active" id="Section2">
                        <h3>Cloud & Onprem Infrastructure Support</h3>
                        <p>Expertise on cloud platforms and on prem Data Base & Data Warehouse management.</p>
                      </div>
                      <div role="tabpanel" className="tab-pane fade" id="Section3">
                        <h3>Network & Security Management</h3>
                        <p>While our teams manage network monitoring & security,
                          we also offer our proprietary network monitoring solutions.</p>
                      </div>
                      <div role="tabpanel" className="tab-pane fade" id="Section4">
                        <h3>CRM Support</h3>
                        <p>We provide support for many CRM Solutions (eg. Creatio, Kentico, Zoho etc.).</p>
                      </div>

                      <div role="tabpanel" className="tab-pane fade" id="Section5">
                        <h3>CMS Support</h3>
                        <p>We manage your websites and content(eg. WordPress, Kentico).</p>
                      </div>
                      <div role="tabpanel" className="tab-pane fade" id="Section6">
                        <h3>Other Types of Support</h3>
                        <p>From Job & ETL Monitoring, Power BI support, We cover it all.</p>
                      </div>

                      <Divider/>
                      <center >
                        <div style={{textAlign:'right'}}>
                          <h4 className="font-heading" style={{fontWeight:850,color:'rgb(242 114 28)',fontSize:18,padding:0}}>We provide a full spectrum of support to our client’s infrastructure from managing websites to enterprise data warehouses
                          </h4>
                          <img src={require('../../images/Mitra.png')} style={{height:50,width:150}}/>
                          <h1  className="font-heading" style={{fontWeight:850,color:'rgb(13 86 191)',fontSize:18,padding:0}}>Managed services</h1>

                        </div>
                          </center>
                      <Divider/>

                    </div>
                  </div>
                </div>
              </div>
            </div>
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
)(About);
