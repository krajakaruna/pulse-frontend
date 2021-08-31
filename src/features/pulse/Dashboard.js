import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './redux/actions';
import {Form, Input, Col, Skeleton, Layout, Menu, Row, Card, Button, Rate, Radio, message, Divider, Alert} from 'antd';

import {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    PoweroffOutlined,
    UserOutlined,
    InfoCircleOutlined, MenuOutlined
} from '@ant-design/icons';
import swal from 'sweetalert';

import MstJira from "./MstJira";
import ItJira from "./ItJira";
import DashboardView from "./DashboardView";
import Users from "./Users";
import Role from "./Role";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Feedback from "./Feedback";
import ManageFeedback from "./ManageFeedback";
import {AgeingDashboard} from "./AgeingDashboard";
import {Ortom8Jira} from "./Ortom8Jira";


const { TextArea } = Input;
const { SubMenu } = Menu;
const {Header, Footer, Content} = Layout;



export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            setValue: [],
            current: 'dashboard',
            questionList: [],
            loading: false,
            current2:''
        }

    }


    handleFindMenuClick = e => {
        // console.log('click ', e);

        this.setState({current2: ''});
         if(e.key==="Logout"){
           //  console.log('logout click ', e.key);
             this.setState({current: this.state.current});
             this.logout()
         }else {
             this.setState({current: e.key});

         }
    };

    static propTypes = {
        pulse: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };
    onChangeRadio = e => {
        /// console.log('radio checked', e.target.value);
        var arr = []
        arr.push(e.target.value)
       // console.log("arr=", arr)
        this.setState({setValue: e.target.value});
    };


    onChangeText(value) {
        // console.log(`selected ${value}`);
    }

    onChange(value) {
        // console.log(`selected ${value}`);
    }

    onBlur() {
        // console.log('blur');
    }

    onFocus() {
        // console.log('focus');
    }

    onSearch(val) {
        // console.log('search:', val);
    }
        componentWillMount() {
            const storedToken = localStorage.getItem("token");

           // console.log('storedToken===',storedToken)
                if( storedToken===null ||storedToken === undefined){
                    localStorage.clear();
                    this.props.history.push("/login");
                }else {
                    setInterval(() => this.checkAuthentication(), 300000);
                }


            window.history.pushState(null, null, window.location.href);
            window.history.back();
            window.onpopstate = () => window.history.forward();
        }
   checkAuthentication(){
       // console.log("Decoded token 11", token);
       let token = localStorage.getItem("token");
       let decodedToken = jwt_decode(token);
       // console.log("Decoded Token22", decodedToken);
       // console.log("Decoded Token33", decodedToken.exp);
       // console.log("Decoded Token33", decodedToken.sub);
      // console.log("Decoded 444444", decodedToken.exp < Date.now() / 1000);

       if (decodedToken.exp < Date.now() / 1000){
           this.props.history.push("/login");
           localStorage.clear()
       }else {
           if(((localStorage.getItem('isLogin') ===true) && (decodedToken.sub===localStorage.getItem("userName"))) || localStorage.getItem('isLogin') !=null){
               this.props.history.push("/pulse-dashboard")

           }else {
               this.props.history.push("/login")
               localStorage.clear()
           }
       }

   }
    logout = () => {
        //  const thisProp =this;
        //  thisProp.setState({ visiblePopOver:false });
        swal("Are you sure  You will be logged out  ?", {
            icon: "info",
            buttons: ["Cancel", "Ok"],
            type: 'info',
        }).then((value) => {
            if (value) {
                // thisProp.setState({loginValidate: false, visible: false,});
                this.props.history.push('/');
                localStorage.clear();

                // window.location.reload();
                // window.location.reload();

            }
        });

    };

    goFeedback=()=>{
       // console.log("working===",)
        this.setState({current2:"goFeedback"});
    };

    render() {

        return (
            <div className="pulse-dashboard">
                <div className="pulse-home">
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
                                           // onClick={() => this.gotoPage("Pulse")}
                                        >
                                            <img src={require('../../images/pulse.png')} className="app-logo" alt="logo" /> MST-Pulse
                                        </Menu.Item>
                                    </Menu>
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={4} xs={4}>
                                    <Menu onClick={this.handleFindMenuClick} selectedKeys={[this.state.current]}
                                          mode="horizontal"  style={{textAlign:'right',backgroundColor:'#003760',color:'#ffa500',fontWeight:800}}
                                    >

                                        {/*{localStorage.getItem("token")!=null && localStorage.getItem("features").includes("Dashboard") ?*/}
                                        {/*    <Menu.Item key="dashboard" icon={<AppstoreOutlined/>}>*/}
                                        {/*        Dashboard*/}
                                        {/*    </Menu.Item> : null}*/}
                                        {/*    */}

                                        {localStorage.getItem("token")!=null && localStorage.getItem("features").includes("Dashboard") ?
                                        <SubMenu key="dashboard" icon={<MailOutlined/>} title="Dashboard">
                                            <Menu.Item key="ReviewTicket">
                                                 Ticket Review
                                            </Menu.Item>
                                            <Menu.Item key="Ageing">
                                                Ageing Report
                                            </Menu.Item>
                                        </SubMenu>
                                            :null}

                                        {localStorage.getItem("token")!=null && localStorage.getItem("features").includes("FeedBack_Menu") ?
                                            <SubMenu key="feedback" icon={<MailOutlined/>} title="Feedback">
                                                {localStorage.getItem("token")!=null && localStorage.getItem("features").includes("Client_Feedback") ?
                                                    <Menu.Item key="ClientFeedback">
                                                        Client Feedback
                                                    </Menu.Item>
                                                    :null}
                                                {localStorage.getItem("token")!=null && localStorage.getItem("features").includes("FeedBack_Management") ?
                                                    <Menu.Item key="ManageFeedback" >
                                                        Manage Feedback
                                                    </Menu.Item>
                                                    :null}
                                            </SubMenu>
                                            : null}

                                        {/*{localStorage.getItem("features").includes("Reports") ?*/}
                                        {/*    <SubMenu key="report" icon={<LineChartOutlined/>} title="Report">*/}
                                        {/*        {localStorage.getItem("features").includes("Report_Jira_MST") ?*/}
                                        {/*            <Menu.Item key="mst-jira"> MST Jira </Menu.Item>*/}
                                        {/*            :null}*/}
                                        {/*        {localStorage.getItem("features").includes("Report_Jira_IT") ?*/}
                                        {/*            <Menu.Item key="it-jira">IT Jira</Menu.Item>*/}
                                        {/*            :null}*/}
                                        {/*    </SubMenu> : null}*/}
                                        {/*{console.log("get all privilage ====",localStorage.getItem("features"))}*/}
                                        {localStorage.getItem("token")!=null && localStorage.getItem("features").includes("Setting") ?
                                            <SubMenu key="Setting" icon={<SettingOutlined/>} title="Setting">
                                                {localStorage.getItem("token")!=null && localStorage.getItem("features").includes("User_Management") ?
                                                    <Menu.Item key="user">Users</Menu.Item>
                                                    :null}
                                                {localStorage.getItem("token")!=null && localStorage.getItem("features").includes("Role_Management") ?
                                                    <Menu.Item key="role">Role</Menu.Item>:null}
                                                {localStorage.getItem("token")!=null && localStorage.getItem("features").includes("Report_Jira_MST") ?
                                                    <Menu.Item key="mst-jira"> MST Jira </Menu.Item>
                                                    :null}
                                                {localStorage.getItem("token")!=null && localStorage.getItem("features").includes("Report_Jira_ortom8") ?
                                                    <Menu.Item key="ortom8-jira">Ortom8 Jira</Menu.Item>
                                                    :null}
                                                {localStorage.getItem("token")!=null && localStorage.getItem("features").includes("Report_Jira_IT") ?
                                                    <Menu.Item key="it-jira">IT Jira</Menu.Item>
                                                    :null}

                                            </SubMenu>
                                            : null}

                                        <Menu.Item key="Logout"  icon={<PoweroffOutlined/>} >
                                            Logout
                                        </Menu.Item>
                                    </Menu>

                                </Col>
                            </Row>
                        </Header>
                        {/*<Header className="header ">*/}
                        {/*    <Row >*/}
                        {/*        <Col span={8}>*/}
                        {/*            <p style={{color: 'rgb(254 165 0)', fontWeight: 900, fontSize: '100%'}}><img*/}
                        {/*                src={require('../../images/pulse.png')} className="app-logo"*/}
                        {/*                alt="logo"/> MST-Pulse</p>*/}
                        {/*        </Col>*/}
                        {/*        <Col span={8} offset={8} style={{textAlign: 'right'}}>*/}
                        {/*            <Button type="primary" onClick={this.logout} style={{*/}
                        {/*                width: 80,*/}
                        {/*                backgroundColor: '#d75000',*/}
                        {/*                borderColor: '#d75000',*/}
                        {/*                fontSize: 10,*/}
                        {/*                height: 25*/}
                        {/*            }}>*/}
                        {/*                Logout*/}
                        {/*            </Button>*/}
                        {/*            /!*<p style={{color:'rgb(254 165 0)',fontWeight:900,fontSize:14}} onClick={this.logout}>  Logout</p>*!/*/}
                        {/*        </Col>*/}
                        {/*    </Row>*/}

                        {/*</Header>*/}

                        {/*<Content style={{height:'100vh'}} >*/}
                        {/*<div style={{height:'90%'}}>*/}
                        <Content>
                            <br/>
                            <br/>
                            <br/>
                            {localStorage.getItem("token")!=null && (localStorage.getItem('isLogin') ===true || localStorage.getItem('isLogin') !=null)?

                            <div className="site-card-wrapper " >

                                {this.state.current2=="goFeedback"?
                                    <Feedback/>
                              :null}

                                {this.state.current == "dashboard" ?
                                    <div>
                                        <center>
                                            {this.state.current2!=null?
                                                <Button style={{fontWeight:800}} type="link" className="blinking" onClick={this.goFeedback}>
                                                    Thank you for using Pulse. We would appreciate if you share us about your experience in this 30 second survey.
                                                </Button>:null}
                                        </center>
                                        <Card hoverable={true} bordered={true} style={{marginRight:20,marginLeft:20,height:'auto',marginTop:20}} title="Ticket Review  " >

                                        <DashboardView/>
                                        </Card>
                                    </div>

                                    : null
                                }

                                {this.state.current === "ReviewTicket" ?
                                    <div>
                                        <center>
                                            {this.state.current2!=null?
                                                <Button style={{fontWeight:800}} type="link" className="blinking" onClick={this.goFeedback}>
                                                    Thank you for using Pulse. We would appreciate if you share us about your experience in this 30 second survey.
                                                </Button>:null}
                                        </center>
                                        <Card hoverable={true} bordered={true} style={{marginRight:20,marginLeft:20,height:'auto',marginTop:20}} title="Ticket Review  " >

                                        <DashboardView/>
                                        </Card>
                                    </div>
                                    : null}

                                {this.state.current === "Ageing" ?
                                    <div>
                                        <center>
                                            {this.state.current2!=null?
                                                <Button style={{fontWeight:800}} type="link" className="blinking" onClick={this.goFeedback}>
                                                    Thank you for using Pulse. We would appreciate if you share us about your experience in this 30 second survey.
                                                </Button>:null}
                                        </center>
                                        <Card hoverable={true} bordered={true} style={{marginRight:20,marginLeft:20,height:'auto',marginTop:20}} title="Ageing Report  " >

                                        <AgeingDashboard/>
                                        </Card>
                                    </div>
                                    : null}

                                {this.state.current === "ClientFeedback" ?
                                    <Feedback/>

                                    : null}
                                {this.state.current === "ManageFeedback" ?


                                    <Card hoverable={true} bordered={true} style={{marginRight:20,marginLeft:20,height:'auto',marginTop:20}} title="MST - Manage Client Feedback  " >
                                        <ManageFeedback/>
                                    </Card>
                                    : null}

                  {this.state.current=="mst-jira"?
                      <Card hoverable={true} bordered={true} style={{marginRight:20,marginLeft:20,height:'auto',marginTop:20}} title="MST - Reports MST Jira " >
                        <MstJira/>
                      </Card>
                      :null}
                  {this.state.current=="it-jira"?
                      <Card hoverable={true} bordered={true} style={{marginRight:20,marginLeft:20,height:'auto',marginTop:20}} title="MST - Reports IT Jira " >
                        <ItJira/>
                      </Card>
                      :null}
                       {this.state.current=="ortom8-jira"?
                           <Card hoverable={true} bordered={true} style={{marginRight:20,marginLeft:20,height:'auto',marginTop:20}} title="MST - Reports Ortom8 Jira " >
                              <Ortom8Jira/>
                          </Card>
                            :null}

                  {this.state.current=="user"?
                      <Card hoverable={true} bordered={true} style={{marginRight:20,marginLeft:20,height:'auto',marginTop:20}} title="MST - Users Management " >

                        <Users/>
                      </Card>
                      :null}
                  {this.state.current=="role"?

                      <Card hoverable={true} bordered={true} style={{marginRight:20,marginLeft:20,height:'auto',marginTop:20}} title="MST - Role Management " >
                        <Role/>
                      </Card>
                      :null}
                            </div>
                        :null}



              <br/>
              <br/>
              <br/>
              <div>
                <Footer style={{textAlign: 'center',backgroundColor:"rgb(14 82 113)"}}> <p style={{color:"rgb(247 123 17)",fontSize:14}}>Copyright © 2021 MST-Pulse. Version: 1.0.0</p></Footer>

                            </div>

                        </Content>


                    </Layout>
                </div>
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
        actions: bindActionCreators({...actions}, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
