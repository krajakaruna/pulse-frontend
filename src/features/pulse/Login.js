import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {
    Form,
    Input,
    Col,
    Layout,
    Row,
    Card,
    Button,
    Checkbox,
    message,
    Menu,
    Carousel,
    Divider,
    Skeleton,
    Avatar, Rate, Tooltip
} from 'antd';
import {Link} from "react-router-dom";
import {DownCircleFilled, LeftOutlined, MenuOutlined} from '@ant-design/icons';
import { Select } from 'antd';
import axios from "axios";
const { Header, Footer, Content } = Layout;
const { Option } = Select;
const key = 'updatable';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RoleDetails:[],
            Features:[],
            loading: false
        }
    }

    static propTypes = {
    pulse: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

    componentWillMount(){
        const storedToken = localStorage.getItem("token");

        if( storedToken===null ||storedToken === undefined){
            localStorage.clear();
            this.props.history.push("/login");

        }
    }


    onFinish = (values: any) => {

       const JwtRequest={
           "username": values.name,
           "password":values.password
       }
          this.setState({
              loading:true
          })
          axios.post(`/user/login`,  JwtRequest )
              .then(res => {
                  const allData = res.data;

                  if(allData.status){
                      var rolef =[]
                      allData.data.AllFeature.map((item)=>
                          rolef.push(item.featureName)
                      )
                      this.setState({
                          RoleDetails:allData.data.RoleName,
                          Features:rolef,
                          loading:false
                      });
                      localStorage.setItem('features',rolef);
                      localStorage.setItem('role',allData.data.RoleName[0].roleName);
                      localStorage.setItem('isLogin',true);
                      localStorage.setItem('userName',allData.data.userName);
                      localStorage.setItem('userId',allData.data.userId);
                      localStorage.setItem('token',allData.data.token);
                      localStorage.setItem('RoleDetails',allData.data.RoleName);
                      localStorage.setItem('projectList',JSON.stringify(allData.data.ProjectDetails));
                    // console.log("token=",allData.data.token);

                      message.success(" User Login succeeded", 3);
                      this.props.history.push("/pulse-dashboard")
                  }else {
                      this.setState({
                          loading:false
                      });
                      message.error("User Login Failed", 3);
                  }
              })


      };

   onFinishFailed = (errorInfo: any) => {
    //console.log('Failed:', errorInfo);
  };

   onChange(value) {
  //  console.log(`selected ${value}`);
  }

   onBlur() {
   // console.log('blur');
  }

   onFocus() {
    //console.log('focus');
  }

   onSearch(val) {
   // console.log('search:', val);
  }
  render() {

    return (
      <div  className="loginPage11" >



          <Layout >

              <Content  className="loginPage1" >
                  <Row   >
                      <Col xs={2} sm={2} md={6} lg={6} xl={8}>

                      </Col>
                      <Col xs={20} sm={20} md={12} lg={10} xl={8}>

                          <Card style={{background: 'rgb(158 158 158 / 0%)',marginTop:100}} hoverable={false} bordered={false}>
                              <center>
                                  <p style={{color:'rgb(254 165 0)',fontWeight:900,fontSize:20}}> <img src={require('../../images/pulse.png')} className="app-logo" alt="logo" /> MST-Pulse</p>
                              </center>
                              <div style={{marginTop: 0}}>
                                  <Form
                                      {...layout}
                                      name="basic"
                                      initialValues={{ remember: true }}
                                      onFinish={this.onFinish}
                                      onFinishFailed={this.onFinishFailed}
                                      //  style={{width:500,}}
                                  >

                                      <Form.Item
                                          label={<label style={{ color: 'rgb(254 165 0)' }}>Name</label>}
                                          name="name"

                                          rules={[{ required: true, message: 'Please input your name!' }]}
                                      >
                                          <Input />
                                      </Form.Item>
                                      <Form.Item

                                          label={<label style={{ color: 'rgb(254 165 0)' }}>Password</label>}
                                          name="password"
                                          rules={[{ required: true, message: 'Please input your password!' }]}
                                      >
                                          <Input.Password />
                                      </Form.Item>
                                      {window.innerWidth > 425 ?
                                          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                                              <Checkbox style={{color:'#ffffff'}}>Remember me</Checkbox>
                                          </Form.Item> :
                                          <Form.Item  name="remember" valuePropName="checked">
                                              <Checkbox style={{color:'#ffffff'}}>Remember me</Checkbox>
                                          </Form.Item>}

                                      {window.innerWidth > 425 ?
                                          <Form.Item {...tailLayout}>
                                              <Link to="/"> <Button type="primary">
                                                  <LeftOutlined/>Back
                                              </Button></Link>&nbsp;&nbsp;

                                              <Button type="primary" htmlType="submit" loading={this.state.loading}>
                                                  Submit
                                              </Button>

                                          </Form.Item>
                                          :
                                          <center>
                                              <Form.Item >
                                                  <Link to="/"> <Button type="primary">
                                                      <LeftOutlined/>Back
                                                  </Button></Link>&nbsp;&nbsp;

                                                  <Button type="primary" htmlType="submit" loading={this.state.loading}>
                                                      Submit
                                                  </Button>

                                              </Form.Item>
                                          </center>

                                      }
                                  </Form>

                              </div>

                          </Card>

                          <br/>
                      </Col>
                      <Col xs={2} sm={2} md={6} lg={6} xl={8}>

                      </Col>

                  </Row>

              </Content>

              {/*<div>*/}
              {/*    <Footer style={{textAlign: 'center',backgroundColor:"rgb(14 82 113)"}}> <p style={{color:"rgb(247 123 17)",fontSize:14}}>Copyright © 2021 MST-Pulse. Version: 1.0.0</p></Footer>*/}

              {/*</div>*/}

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
)(Login);
