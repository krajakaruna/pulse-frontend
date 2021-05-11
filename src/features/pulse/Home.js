import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Layout, Card, Col, Avatar, Rate, Row, Divider, Tooltip, Button, Carousel, Skeleton, Menu, Typography, Statistic} from 'antd';
import axios from "axios";
import {CheckCircleOutlined, DownCircleFilled, MenuOutlined} from '@ant-design/icons';
import Footer from "./Footer";
import Background2 from "../../images/banner2.jpg"
import Background3 from "../../images/banner3.jpg"
import Background4 from "../../images/banner4.jpg"
import Background5 from "../../images/banner5.jpg"
import Carousel2 from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const { Header, Content } = Layout;
const { Meta } = Card;
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 10
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
var sectionStyle5 = {
    width: "100%",

    backgroundImage: "url(" + Background5 + ")"
};
var sectionStyle2 = {
    width: "100%",
    backgroundImage: "url(" + Background2 + ")"
};
var sectionStyle3 = {
    width: "100%",
    backgroundImage: "url(" + Background3 + ")"
};
export class Home extends Component {
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
        componentWillMount() {
            this.GetFeedbackData();
            const storedToken = localStorage.getItem("token");

            if( storedToken===null ||storedToken === undefined){
                localStorage.clear();
                this.props.history.push("/");
            }
        }

    GetFeedbackData(){
            this.setState({
                loading:true
            })
            // const headers = {
            //     'Content-Type': 'application/json',
            //     'Authorization': "Bearer "+localStorage.getItem("token")
            // };
            axios.get(`/user/get-feedback`, )
                .then(res => {
                    const allData = res.data;
                    if(allData.status){
                 //       console.log('get-feedback ===========',allData.data);
                        this.setState({
                            loading:false,
                            feedbackData:allData.data,

                        })
                        if(allData.data.length>6){

                        //   console.log('get-feedback ===========',allData.data);
                            const size = this.state.feedbackDataLoad.length+6
                            const items = allData.data.slice(0, size)
                       //     console.log('get-items ===========',items);

                            this.setState({
                                loading:false,
                                feedbackDataLoad:items
                            })
                        }else {
                            //const  n=allData.data.length
                            this.setState({
                                loading:false,
                                feedbackDataLoad:allData.data
                            })
                        }

                    }
                })
        }
    onClickMore=()=>{
     //   console.log('get-feedback ===========clieck',this.state.feedbackData);
        if(this.state.feedbackDataLoad.length>0){
            const size = this.state.feedbackDataLoad.length+6
            const items = this.state.feedbackData.slice(0, size)
           // console.log('get-items ===========',items);
            this.setState({
                loading:false,
                feedbackDataLoad:items
            })
        }
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
      <div className="pulse-home" >

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

          <Content  className="homepage" >

              <div  style={{marginTop:20}}>
                  <div className="row">
                      <div className="col-md-12">
                          <div id="carousel-example-generic" className="carousel slide" data-ride="carousel" >
                              <ol className="carousel-indicators">
                                  <li data-target="#carousel-example-generic" data-slide-to="0" className="active "/>
                                  <li data-target="#carousel-example-generic" data-slide-to="1"/>
                                  <li data-target="#carousel-example-generic" data-slide-to="2"/>
                              </ol>
                              <div className="carousel-inner " >
                                  <div className="item active " style={{backgroundImage: "url(" + Background2 + ")",height:520,width:'100%',backgroundSize:'cover'}}>
                                      <h1 className="font-heading" style={{color:'rgb(236 174 58)',textAlign: "center",paddingTop:75,textShadow:'1px 1px #041d25'}}>
                                          Welcome to Mitra MST Pulse Portal</h1>
                                      <h2 className="font-heading2" style={{color:'rgb(255 254 255)',textAlign: "left",textShadow:'rgb(4 29 37) 9px 0px 19px',paddingLeft:20,paddingTop:20}}>
                                          From coders and designers to supply-chain experts, the team is packed <br/>with super talented,
                                          hungry problem solvers ready for the next challenge.<br/> get to know us.
                                      </h2>

                                          <div className="carousel-caption ">
                                              <h2>
                                                  Development & Dev Ops</h2>
                                              <p style={{color:'rgb(86 83 66)'}}>
                                                  Level 3 Development support that extend beyond basic customization changes .
                                              </p>
                                          </div>
                                  </div>
                                  <div className="item" style={{ backgroundImage: "url(" + Background3 + ")",height:520,width:'100%',backgroundSize:'cover'}}>
                                      <h1 className="font-heading" style={{color:'rgb(236 174 58)',textAlign: "center",paddingTop:75,textShadow:'1px 1px #041d25'}}>
                                          Welcome to Mitra MST Pulse Portal</h1>
                                      <h2 className="font-heading2" style={{color:'rgb(106 170 216)',textAlign: "left",paddingLeft:20,paddingTop:20}}>
                                          From coders and designers to supply-chain experts, the team is packed <br/>with super talented,
                                          hungry problem solvers ready for the next challenge.<br/> get to know us.
                                      </h2>

                                          <div className="carousel-caption">
                                              <h2>
                                                  Cloud & Onprem Infrastructure Support</h2>
                                              <p style={{color:'rgb(86 83 66)'}}>
                                                  Expertise on cloud platforms and on prem Data Warehouse management.</p>
                                          </div>
                                  </div>
                                  <div className="item" style={{backgroundImage: "url(" + Background4 + ")",height:520,width:'100%',backgroundSize:'cover'}}>
                                      <h1 className="font-heading" style={{color:'rgb(236 174 58)',textAlign: "center",paddingTop:75,textShadow:'1px 1px #041d25'}}>
                                          Welcome to Mitra MST Pulse Portal</h1>
                                      <h2 className="font-heading2" style={{color:'rgb(106 170 216)',textAlign: "left",paddingLeft:20,paddingTop:20}}>
                                          From coders and designers to supply-chain experts, the team is packed <br/>with super talented,
                                          hungry problem solvers ready for the next challenge.<br/> get to know us.
                                      </h2>
                                          <div className="carousel-caption">
                                              <h2>
                                                  Network & Security Management</h2>
                                              <p style={{color:'rgb(179 178 166)'}}>
                                                  While our teams manage network monitoring & security,
                                                  we also offer our proprietary network monitoring solutions.</p>
                                          </div>
                                  </div>
                              </div>
                              <a className="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                                  <span className="glyphicon glyphicon-chevron-left"/></a><a
                              className="right carousel-control"
                              href="#carousel-example-generic" data-slide="next"><span
                              className="glyphicon glyphicon-chevron-right">
                        </span></a>
                          </div>

                      </div>
                  </div>
              </div>
              {this.state.feedbackDataLoad.length>0?
            <div style={{backgroundColor:'#ffffff',marginTop:'0'}}>
            <br/>
                <Skeleton loading={this.state.loading} active paragraph={{ rows: 3 } }>
                    <center>
                        <h2 className="font-heading" style={{fontWeight:850,color:'rgb(0 55 96)',textAlign: "center",paddingTop:20}}>Client Feedback
                        </h2>
                    </center>
                <Row type="flex"  align="center">
                    {this.state.feedbackDataLoad.map(data=>

                        <Row >
                            {window.innerWidth > 425 ?
                                <Card hoverable style={{
                                    width: 500,
                                    height: 170,
                                    margin: 10,
                                    //backgroundColor: 'rgb(0 61 88)',
                                    backgroundColor: 'rgb(235 249 250 / 86%)',
                                    borderRadius: 15,
                                    fontSize: 12
                                }} size={10} bordered={false}>
                                    <Meta
                                        className="fontclasss"
                                        avatar={
                                            //<Avatar src={require('../../images/'+data.profile)}/>
                                            data.projectName == "Buzz Bingo" ?
                                                <Avatar src={require('../../images/' + 'bb.jpg')}/>
                                                : data.projectName == "ieDigital" ?
                                                <Avatar src={require('../../images/' + 'ie.jpg')}/>
                                                : data.projectName == "Diaverum" ?
                                                    <Avatar src={require('../../images/' + 'Diaverum.png')}/>
                                                    : data.projectName == "IARD" ?
                                                        <Avatar src={require('../../images/' + 'IARD.jpg')}/>
                                                        : data.projectName == "The Appointment Group" ?
                                                            <Avatar src={require('../../images/' + 'TAG.png')}/>
                                                            : data.projectName == "The Appointment Group" ?
                                                                <Avatar src={require('../../images/' + 'TAG.png')}/>
                                                                : data.projectName == "Christiespaces" ?
                                                                    <Avatar src={require('../../images/' + 'cs.png')}/>
                                                                    : data.projectName == "Infix" ?
                                                                        <Avatar
                                                                            src={require('../../images/' + 'Infix.jpg')}/>
                                                                        : null
                                        }
                                        title={[<div>
                                            <Rate disabled allowHalf defaultValue={data.rate}/>
                                        </div>]}
                                        description={[
                                            <div>
                                                <p style={{color: 'rgb(0 55 96)'}}>{"''" + data.feedback + " " + " '' " + "- " + data.date + " "}</p>
                                                <p style={{color: 'rgb(225 152 11)'}}>{data.name + " (" + data.designation + ") " + " - " + data.projectName}</p>

                                            </div>
                                        ]}
                                    />
                                </Card>
                                :
                                <Card hoverable style={{
                                    width: 320,
                                    height: 120,
                                    margin: 10,
                                    backgroundColor: 'rgb(235 249 250 / 86%)',
                                    borderRadius: 15,
                                    fontSize: 10
                                }} size={10} bordered={false}>
                                    <Meta
                                        className="fontclasss"
                                        avatar={
                                            //<Avatar src={require('../../images/'+data.profile)}/>
                                            data.projectName == "Buzz Bingo" ?
                                                <Avatar src={require('../../images/' + 'bb.jpg')}/>
                                                : data.projectName == "ieDigital" ?
                                                <Avatar src={require('../../images/' + 'ie.jpg')}/>
                                                : data.projectName == "Diaverum" ?
                                                    <Avatar src={require('../../images/' + 'Diaverum.png')}/>
                                                    : data.projectName == "IARD" ?
                                                        <Avatar src={require('../../images/' + 'IARD.jpg')}/>
                                                        : data.projectName == "The Appointment Group" ?
                                                            <Avatar src={require('../../images/' + 'TAG.png')}/>
                                                            : data.projectName == "The Appointment Group" ?
                                                                <Avatar src={require('../../images/' + 'TAG.png')}/>
                                                                : data.projectName == "Christiespaces" ?
                                                                    <Avatar src={require('../../images/' + 'cs.png')}/>
                                                                    : data.projectName == "Infix" ?
                                                                        <Avatar
                                                                            src={require('../../images/' + 'Infix.jpg')}/>
                                                                        : null
                                        }
                                        title={[<di>
                                            <Rate disabled allowHalf defaultValue={data.rate}/>
                                        </di>]}
                                        description={[
                                            <div>
                                                <p style={{color: 'rgb(0 55 96)'}}>{"''" + data.feedback + " " + " '' " + "- " + data.date + " "}</p>
                                                <p style={{color: 'rgb(225 152 11)'}}>{data.name + " (" + data.designation + ") " + " - " + data.projectName}</p>
                                            </div>
                                        ]}
                                    />
                                </Card>
                            }
                        </Row>
                    )}
                </Row>
                    <Row>
                        <Col span={24}>
                            <center>
                                { this.state.feedbackDataLoad.length!= this.state.feedbackData.length?
                                <Tooltip title="View More">
                                    <Button type="primary" shape="circle" icon={<DownCircleFilled />} size="large" onClick={this.onClickMore}/>
                                </Tooltip>
                                    :null}
                            </center>
                        </Col>
                    </Row>
                </Skeleton>
              <div>
              </div>
            </div>
                  :null}
           <Divider/>

              <section style={sectionStyle5}>
                  <h1 className="font-heading" style={{fontWeight:850,color:'rgb(0 55 96)',textAlign: "center",paddingTop:10}}>How we engage with our clients</h1>
                  <Divider/>
                  <h3  style={{fontWeight:850,color:'rgb(0 55 96)',textAlign: "center",marginLeft:20}}>We follow a ground up approach to assess, plan, enable and improve systems with availability, security, automation, process and cost from day one of discovery, all the way till operations &bbeyond.</h3>
                  <Divider/>
                  <div className="container">
                      <div className="row">
                          <div className="col-md-4 col-sm-6">
                              <div className="serviceBox">
                                  <div className="service-icon">
                                      <span><i className="fa fa-globe"></i></span>
                                  </div>
                                  <h3 className="title">DISCOVERY & SERVICE DESIGN</h3>
                                  <p className="description">From day one, our focus is to assess the current state of Availability, Security, Automation, Process & Cost to design a service approach to elevate to the desired state .</p>
                              </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                              <div className="serviceBox blue">
                                  <div className="service-icon">
                                      <span><i className="fa fa-cogs"></i></span>
                                  </div>
                                  <h3 className="title">SERVICE TRANSITION</h3>
                                  <p className="description">A SWAT team specializing in transitions will work as a conduit between the teams transitioning in and out to enable faster, effective and a hassle free handover .</p>
                              </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                              <div className="serviceBox red">
                                  <div className="service-icon">
                                      <span><i className="fa fa-handshake-o"></i></span>
                                  </div>
                                  <h3 className="title">SERVICE MANAGEMENT</h3>
                                  <p className="description">We follow a multi layered process to service management through real time operational dashboards to both internal teams and Client .</p>
                              </div>
                          </div>


                      </div>
                      <div className="row">
                          <div className="col-md-4 col-sm-6">
                              <div className="serviceBox purple">
                                  <div className="service-icon">
                                      <span><i className="fa fa-flag"></i></span>
                                  </div>
                                  <h3 className="title">SERVICE OPERATION</h3>
                                  <p className="description">Our L2 & L3 support comes with zero touch monitoring & self healing solutions, while we are also capable of adding DevOps & testing to our service offering .</p>
                              </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                              <div className="serviceBox red">

                              </div>
                          </div>
                          <div className="col-md-4 col-sm-6">
                              <div className="serviceBox yellow">
                                  <div className="service-icon">
                                      <span><i className="fa fa-bar-chart"></i></span>
                                  </div>
                                  <h3 className="title">SERVICE IMPROVEMENTS</h3>
                                  <p className="description">Our process that feeds in best practices and focuses on continuous improvement has allowed us to bring to our clients an average of 10% incident reduction YoY .</p>
                              </div>
                          </div>


                      </div>
                  </div>
                  <Divider/>
              </section>

            <Divider/>
              <section  style={{paddingLeft:0}}>
                  <h2 className="font-heading2" style={{fontWeight:850,color:'rgb(0 55 96)',backgroundColor:'rgb(217 224 233)',textAlign: "center",padding:5}}>Our Clients
                  </h2>
                  <Carousel2
                     additionalTransfrom={100}
                      arrows
                      autoPlay
                      autoPlaySpeed={10}
                      centerMode={false}
                      className=""
                      containerClass="container-with-dots"
                      customTransition="all 1s linear"
                      dotListClass=""
                      draggable
                      focusOnSelect={false}
                      infinite
                      itemClass=""
                      keyBoardControl
                      minimumTouchDrag={80}
                      renderButtonGroupOutside={false}
                      renderDotsOutside={false}
                      responsive={responsive}
                      showDots={false}
                      sliderClass=""
                      slidesToSlide={1}
                      swipeable
                      transitionDuration={5000}
                  >
                      <div>

                          <Card  hoverable={true} style={{   borderRadius: 15,backgroundColor:'#efebeb00',width:200,height: 175,marginLeft:50,marginTop:0}} bordered={true}>
                              <center>
                              <h4 style={{ color: '#8f959f',textAlign: "center"}}>Diaverum</h4>
                              <img src={require('../../images/' + 'Diaverum.png')} style={{height:100,width:150}}/>
                              </center>
                          </Card>
                      </div>
                      <div>
                          <Card  hoverable={true} style={{   borderRadius: 15,backgroundColor:'#efebeb00',width:200,marginLeft:50,height: 175,marginTop:0}} bordered={true}>

                              <center>
                                  <h4 style={{ color: '#8f959f',textAlign: "center"}}>Buzzbingo</h4>
                                  <img src={require('../../images/bb.jpg')} style={{height:110,width:110}}/>

                              </center>
                          </Card>
                      </div>
                      <div>
                          <Card  hoverable={true} style={{   borderRadius: 15,backgroundColor:'#efebeb00',width:200,marginLeft:50,height: 175,marginTop:0}} bordered={true}>

                              <center>
                                  <h4 style={{ color: '#8f959f',textAlign: "center"}}>ieDigital</h4>
                                  <img src={require('../../images/ie.jpg')} style={{height:110,width:110}}/>

                              </center>
                          </Card>
                      </div>
                      <div>
                          <Card  hoverable={true} style={{   borderRadius: 15,backgroundColor:'#efebeb00',width:200,marginLeft:50,height: 175,marginTop:0}} bordered={true}>

                              <center>
                                  <h4 style={{ color: '#8f959f',textAlign: "center"}}>IARD</h4>
                                  <img src={require('../../images/IARD.jpg')} style={{height:110,width:110}}/>

                              </center>
                          </Card>
                      </div>
                      <div>
                          <Card  hoverable={true} style={{   borderRadius: 15,backgroundColor:'#efebeb00',width:200,marginLeft:50,height: 175,marginTop:0}} bordered={true}>

                              <center>
                                  <h4 style={{ color: '#8f959f',textAlign: "center"}}>TAG</h4>
                                  <img src={require('../../images/TAG.png')} style={{height:110,width:110}}/>

                              </center>
                          </Card>
                      </div>
                      <div>
                          <Card  hoverable={true} style={{   borderRadius: 15,backgroundColor:'#efebeb00',width:200,marginLeft:50,height: 175,marginTop:0}} bordered={true}>

                              <center>
                                  <h4 style={{ color: '#8f959f',textAlign: "center"}}>LeapIn</h4>
                                  <img src={require('../../images/LeapIn.png')} style={{height:110,width:110}}/>

                              </center>
                          </Card>
                      </div>
                      <div>
                          <Card  hoverable={true} style={{   borderRadius: 15,backgroundColor:'#efebeb00',width:200,marginLeft:50,height: 175,marginTop:0}} bordered={true}>

                              <center>
                                  <h4 style={{ color: '#8f959f',textAlign: "center"}}>Christiespaces</h4>
                                  <img src={require('../../images/cs.png')} style={{height:110,width:110}}/>

                              </center>
                          </Card>
                      </div>
                      <div>
                          <Card  hoverable={true} style={{   borderRadius: 15,backgroundColor:'#efebeb00',width:200,marginLeft:50,height: 175,marginTop:0}} bordered={true}>

                              <center>
                                  <h4 style={{ color: '#8f959f',textAlign: "center"}}>Infix</h4>
                                  <img src={require('../../images/Infix.jpg')} style={{height:110,width:110}}/>

                              </center>
                          </Card>
                      </div>
                      <div>
                          <Card  hoverable={true} style={{   borderRadius: 15,backgroundColor:'#efebeb00',width:200,marginLeft:50,height: 175,marginTop:0}} bordered={true}>

                              <center>
                                  <h4 style={{ color: '#8f959f',textAlign: "center"}}>PlumbHouse</h4>
                                  <img src={require('../../images/plumbHouse.png')} style={{height:110,width:110}}/>

                              </center>
                          </Card>
                      </div>
                  </Carousel2>
                  <Divider/>
              </section>

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
)(Home);
