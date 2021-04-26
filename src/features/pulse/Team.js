import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Layout, Card, Col, Avatar, Rate, Row, Divider, Tooltip, Button, Carousel, Skeleton, Menu} from 'antd';
import {Link} from 'react-router-dom';
import axios from "axios";
import {DownCircleFilled, MenuOutlined} from '@ant-design/icons';
import Footer from "./Footer";
import Background5 from "../../images/banner5.jpg";
var sectionStyle5 = {
    width: "100%",
    backgroundImage: "url(" + Background5 + ")"
};
const { Header, Content } = Layout;
const { Meta } = Card;

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
export class Team extends Component {
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
      <div className="pulse-team">
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
          {/*<Content  className="home1" style={{backgroundColor:'rgb(180 183 183 / 67%)'}}>*/}
          <Content  className="home1" style={{backgroundColor:'#ffffff'}}>

                <section >

                    <div className="main-body">
                        <div className="container">
                            <nav aria-label="breadcrumb" className="main-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Team</li>
                                </ol>
                                <center>
                                    <div style={{backgroundColor:'rgb(53 137 175)'}} >
                                        <h1  className="font-heading" style={{fontWeight:850,color:'rgb(250,250,250)',fontSize:26,padding:10}}>Meet the Team
                                        </h1>
                                    </div>
                                </center>
                            </nav>

                            <div className="row gutters-sm">
                                <Carousel autoplay>
                                    <div>
                                        <div className="demo">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-6">
                                                        <div id="testimonial-slider" className="owl-carousel">
                                                            <div className="testimonial">
                                                                <div className="pic">
                                                                    <img
                                                                        src={require('../../images/janak-static.jpg')}/>
                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <h3 className="testimonial-title">Janak Gunasekera
                                                                        <small className="post">Senior Manager</small>
                                                                    </h3>
                                                                    <p className="description">
                                                                        "A professional with over 11 years of technical and leadership experience in the IT industry specializing in software support service management with ITIL certification.
                                                                        Service management leadership skills with excellent communication and self-motivation. Able to motivate team and drive assignments to completion successfully."
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div id="testimonial-slider" className="owl-carousel">
                                                            <div className="testimonial">
                                                                <div className="pic">
                                                                    <img
                                                                        src={require('../../images/shamil-static.jpg')}/>
                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <h3 className="testimonial-title">Shaamil Ashraff
                                                                        <small className="post">Architect - DBA</small>
                                                                    </h3>
                                                                    <p className="description">
                                                                        "I am Shaamil Ashraff , passionate about grooming team members and working on different Challenges.We are a family of six,  lives in Kadawatha (approx. 25 KM from the city). My Wife is Anne, who formerly worked as a Flight Attendant and a Secretary, currently enjoying the family being a teacher.About my kids :Two Boys and Two Girls. The entire family is very much musical minded and all 4 kids play the Piano and the Guitar.
                                                                        I like to watch Movies at leisure times with my Family or go to Cinema."
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-6">
                                                        <div id="testimonial-slider" className="owl-carousel">
                                                            <div className="testimonial">
                                                                <div className="pic">
                                                                    <img
                                                                        src={require('../../images/dinuka-static.jpg')}/>
                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <h3 className="testimonial-title">Dinuka Ramanayaka
                                                                        <small className="post">Team Lead</small>
                                                                    </h3>
                                                                    <p className="description">
                                                                        "As a tech lead, providing quick and accurate solutions to the client's most worried problems alway cheers me up. Also helping the team mates who need it most also makes me really happy.
                                                                        I spend a few hours a week with Gaming and 3D modeling, since those are my hobbies. I Love to check out New Techs and Gadgets during my leisure time too.
                                                                        Also I love to travel with my family when I have a couple of off days. "
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div id="testimonial-slider" className="owl-carousel">
                                                            <div className="testimonial">
                                                                <div className="pic">
                                                                    <img
                                                                        src={require('../../images/isuru-static.jpg')}/>
                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <h3 className="testimonial-title">Isuru Herath
                                                                        <small className="post">Team Lead</small>
                                                                    </h3>
                                                                    <p className="description">
                                                                        "A professional with more than 12 years of experience in the IT industry,
                                                                        specializing in L2 Technical support, MIS report Development and Leading IT Teams in the Telecommunications, Banking, and Retail domains.
                                                                        Experienced in stakeholder management, team management and leadership. These specifically include Service Level Agreement (SLA) adherence,
                                                                        Configuration Management and Release Management."
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-6">
                                                        <div id="testimonial-slider" className="owl-carousel">
                                                            <div className="testimonial">
                                                                <div className="pic">
                                                                    <img
                                                                        src={require('../../images/pubundu-static.jpg')}/>
                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <h3 className="testimonial-title">Pubudu Wijerathne
                                                                        <small className="post">Team Lead</small>
                                                                    </h3>
                                                                    <p className="description">
                                                                        "Challenging and evolving technologies, regular Data breaches and Hacks reported, are what motivates me as an Infrastructure Lead. Continuous learning and improvement are what I endeavor for both a personal and professional level.
                                                                        I strongly believe that gaining expertise in one area only leads to digging deep into another.
                                                                        During my leisure time, I have a passion for Wildlife and Photography, Music, Travelling, Astronomy, and it makes my downtime more precious and enjoyed."
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div id="testimonial-slider" className="owl-carousel">
                                                            <div className="testimonial">
                                                                <div className="pic">
                                                                    <img
                                                                        src={require('../../images/nath.jpg')}/>
                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <h3 className="testimonial-title">Nath Wijayagunasekara
                                                                        <small className="post">Senior Systems Support Engineer</small>
                                                                    </h3>
                                                                    <p className="description">
                                                                        "With two decades of experience in the IT industry working in Sri Lanka, Australia and USA, my core competencies lie in systems administration, managed services and IT team lead roles.
                                                                        I’m a customer focused problem solver and solutions creator who pays attention to detail and believes in providing a complete solution to the utmost satisfaction of the client.
                                                                        I truly enjoy working in operational and leading roles while mentoring and training team mates to achieve their best in turn proving true value to the customer utilizing both the hands-on
                                                                        technical skills and the soft skills that I possess."
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-6">
                                                        <div id="testimonial-slider" className="owl-carousel">
                                                            <div className="testimonial">
                                                                <div className="pic">
                                                                    <img
                                                                        src={require('../../images/seelan1.jpg')}/>
                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <h3 className="testimonial-title">G.Gnanaseelan
                                                                        <small className="post">Software Engineer</small>
                                                                    </h3>
                                                                    <p className="description">
                                                                        " I'm a full-stack developer with a background in JAVA, .NET, React JS, Spring boot, ELK Stack and etc.
                                                                        I have nearly three years of experience in full-stack development,
                                                                        cloud technologies such as AWS, AZURE, and Linux operating systems. In Mitra, I'm successfully handling L2, L3 support."
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div id="testimonial-slider" className="owl-carousel">
                                                            <div className="testimonial">
                                                                <div className="pic">
                                                                    <img
                                                                        src={require('../../images/kavinga-static.jpg')}/>
                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <h3 className="testimonial-title">Kavinga Bogahawatta
                                                                        <small className="post">Application Support Engineer</small>
                                                                    </h3>
                                                                    <p className="description">
                                                                        "An experienced professional Engineer in the Technical Support domain to improve skills and enhance the knowledge gained from working with Cloud Technologies, Database Technologies,
                                                                        Email Troubleshooting, L2 support & managing and supporting to customers over the years."
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="demo">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-6">
                                                        <div id="testimonial-slider" className="owl-carousel">
                                                            <div className="testimonial">
                                                                <div className="pic">
                                                                    <img
                                                                        src={require('../../images/kesia-static.jpg')}/>
                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <h3 className="testimonial-title">Keshia Onnellie
                                                                        <small className="post">Service Specialist</small>
                                                                    </h3>
                                                                    <p className="description">
                                                                        "I am an enthusiastic, dynamic and duty conscious individual with the ability to manage the time and resources. A quick learner with sound leadership and people skills.
                                                                        and 3 years of working experience as a L2 operator in the field of IT, mainly in the domain of Telco.
                                                                        Chocolates, soccer and kittens make me happy."
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div id="testimonial-slider" className="owl-carousel">
                                                            <div className="testimonial">
                                                                <div className="pic">
                                                                    <img
                                                                        src={require('../../images/Naditha-static.jpg')}/>
                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <h3 className="testimonial-title">Naditha Gallella
                                                                        <small className="post">Application Support Engineer</small>
                                                                    </h3>
                                                                    <p className="description">
                                                                        "I am an application support engineer with passion and dedication with nearly 3 years of industry experience,
                                                                        cloud technologies and Linux environment technologies fascinated me and half of my free time dedicates to it.
                                                                        and also I have a cybersecurity-related background and Malware analysis and Pentesting are my favourite areas.
                                                                        in my free time, I would like to play games, if you are interested in playing games with me such as Warthunder,
                                                                        Apex legends, GTA just pings me."
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-6">
                                                        <div id="testimonial-slider" className="owl-carousel">
                                                            <div className="testimonial">
                                                                <div className="pic">
                                                                    <img
                                                                        src={require('../../images/dilip-static.jpg')}/>
                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <h3 className="testimonial-title">Dilep Dev
                                                                        <small className="post">Associate Service Specialist</small>
                                                                    </h3>
                                                                    <p className="description">
                                                                        "I am an engineer passionate about learning new things and applying the things learnt.
                                                                        Interested in the cloud and cloud-native technologies.
                                                                        I always strive to improve myself at both personal and professional levels."
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div id="testimonial-slider" className="owl-carousel">
                                                            <div className="testimonial">
                                                                <div className="pic">
                                                                    <img
                                                                        src={require('../../images/pasindu-static.jpg')}/>
                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <h3 className="testimonial-title">Pasidu Hettarachchi
                                                                        <small className="post"> Support Engineer</small>
                                                                    </h3>
                                                                    <p className="description">
                                                                        "I’m working as an Intern support for Mitra Innovation. I’m a highly passionate with networked systems.
                                                                        I've worked with clients in Europe, Australia, working in complex projects using Azure,
                                                                        AWS and Creatio technologies with the Mitra Innovation managed-services team."
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-6">
                                                        <div id="testimonial-slider" className="owl-carousel">
                                                            <div className="testimonial">
                                                                <div className="pic">
                                                                    <img
                                                                        src={require('../../images/kavishka-static.jpg')}/>
                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <h3 className="testimonial-title">Kavishka Rajakaruna
                                                                        <small className="post">Support Engineer</small>
                                                                    </h3>
                                                                    <p className="description">
                                                                        "I'm a tech enthusiast & STEMUp volunteer. I thrive on challenges and always try to set goals for myself,
                                                                        so I have something to pursue every time. Believer in 'Curiocity helps to climb the ladder of success."
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div id="testimonial-slider" className="owl-carousel">
                                                            <div className="testimonial">
                                                                <div className="pic">
                                                                    <img
                                                                        src={require('../../images/madushika-static.jpg')}/>
                                                                </div>
                                                                <div className="testimonial-content">
                                                                    <h3 className="testimonial-title">Madushika Samarasekara
                                                                        <small className="post">Support Engineer</small>
                                                                    </h3>
                                                                    <p className="description">
                                                                        "I am energetic and passionate about my work. I like everything I do to be well-organized. As a graduate with four years and experience in IT,
                                                                        the management field, I improved the performance, operations, and productivity of work.
                                                                        I like socializing/hanging out with friends mostly traveling,
                                                                        trying with new recipes for cooking is my most interesting area."
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </Carousel>
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
)(Team);
