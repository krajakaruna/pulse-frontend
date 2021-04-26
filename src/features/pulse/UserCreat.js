import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Button, Divider, Form, Input, message, Modal, Select} from "antd";
import axios from "axios";
const tailLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const { Option } = Select;

export class UserCreat extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
     //  form:Form.useForm(),
      UserIdData:[],
      selectedProjectArray:[],
      selectRoleArray:[],

    }

  }

  static propTypes = {
    pulse: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleSelectProjectChange=(value)=> {
  //  console.log(`selected proj ${value}`);
    this.setState({
      selectedProjectArray:value
    })

  }

  handleSelectRoleChange=(value)=> {
   // console.log(`selected role ${value}`);
    this.setState({
      selectRoleArray:value,
      selectedProjectArray:[]
    })
  }
  handleCancel = () => {
    this.formRef.current.resetFields();
    this.props.actions.hideCreatModal();

  };
  // componentDidMount() {
  //   this.formRef.current.resetFields();
  // }
  onFinish = (values: any) => {

   //console.log("project list------=",values.project.toString())
    // console.log("newPassword------=",values.newPassword)
    const payload={
      "designation":values.designation,
      "userId":this.props.id,
      "username":values.userName,
      "projectList":values.project.toString(),
      "roleId":values.roleId,
      "email":values.email,
      "newPassword":values.password,
      "modifiedUserId":localStorage.getItem("userId")
    }
    this.setState({
     loading:true
    })
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem("token")
    };
    axios.post(`/user/edit-userby-id`,  payload,{headers} )
        .then(res => {
          const allData = res.data;
        //console.log(allData)
          if(allData.status){
            message.success(allData.message, 5);

            this.handleCancel();
            window.location.reload(true);

          }else {
            message.error(allData.message, 5);
          }
        })



  };
  render() {
    const {showCreatModal} = this.props.pulse;
    // {console.log("ProjectList= props=",this.props.ProjectList)}
    // {console.log("RoleList= props==",this.props.id)}
    // {console.log("UserIdData= props==",this.props.UserIdData)}

    return (
      <div className="pulse-user-creat">

        {this.props.id==null && this.props.UserIdData==null?
        <Modal title="Create New User" visible={showCreatModal}
               footer={null}
               width={800}
               onCancel={this.handleCancel}
        >
          <Form
              {...tailLayout}
              name="control-ref"
              ref={this.formRef}
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              style={{width:750,}}
          >
            <Form.Item
                label="Name"
                name="userName"
                rules={[{ required: true, message: 'Please input user name!' },
                  {
                    pattern: /^[A-Z][a-z0-9_-]{5,15}$/,
                    message: 'user name should be start with Capital character and could be contain alphabetic, digits, dash and underscore only.',
                  },{ min: 5, message: 'You can not  add below 5 character' }
                ]}
            >
              <Input placeholder="user name" maxLength="25" />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: "email", message: 'Please input user email!' }]}
            >
              <Input placeholder="user email"/>

            </Form.Item>
            <Form.Item
                label="Designation"
                name="designation"
                rules={[{ required: true, message: 'Please input user designation!' }]}
            >
              <Input placeholder="user designation"/>

            </Form.Item>

            <Form.Item
                label="Role"
                name="roleId"
                rules={[{ required: true, message: 'Please select user role!' }]}
            >
              <Select
                  // mode="multiple"
                  // style={{ width: '75%' }}
                  placeholder="Select Role"
                  defaultValue={[]}
                  onChange={this.handleSelectRoleChange}
              >
                {this.props.RoleList.map((x)=> <Option value={x.id}>{x.roleName}</Option>)}
              </Select>

            </Form.Item>

            {this.state.selectRoleArray.length!=0?
            <Form.Item
                label="Project"
                name="project"
                rules={[{ required: true, message: 'Please select user project!' }]}
            >
              <Select
                  onChange={this.handleSelectProjectChange}

                  mode="multiple"
                 // style={{ width: '75%' }}
                  placeholder="Select Project"

                  allowClear={true}
                  onClear={this.clearValue}
              >
                {this.props.ProjectList.map((x)=> <Option
                    disabled={
                      this.state.selectRoleArray !=1 && this.state.selectedProjectArray.length>= 1?
                         true:false
                    }
                    value={x.id}>{x.projectName}
                </Option>)}
              </Select>

            </Form.Item>
                :null}

                <Form.Item
                    label="Password"
                    name="password"

                    rules={
                      [{required: true,},{ max: 15, message: 'You can only add 15 character' },
                        { min: 5, message: 'You can not  add below 5 character' }]
                    }
                >
                  <Input.Password maxLength={15} min={5} placeholder="user Password"/>
                </Form.Item>

            <Divider/>
            <Form.Item {...tailLayout}>
              <Button type="primary" onClick={this.handleCancel}>
                Close
              </Button>&nbsp;&nbsp;
              <Button type="primary" htmlType="submit" >
                Submit
              </Button >
            </Form.Item>

          </Form>
        </Modal>:null}

        {this.props.id!=null && this.props.UserIdData!=null?
            <Modal title="Edit User" visible={showCreatModal}
                   footer={null}
                   width={800}
                   onCancel={this.handleCancel}
            >
              <Form
                  {...tailLayout}
                  name="control-ref"
                  ref={this.formRef}
                //  initialValues={this.props.UserIdData}
                  initialValues={{
                    userName: this.props.UserIdData.userName,
                    email: this.props.UserIdData.email,
                    status: this.props.UserIdData.status,
                    roleId: this.props.UserIdData.roleId,
                    designation: this.props.UserIdData.designation,

                  }}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                  style={{width:750,}}
              >
                <Form.Item
                    label="Name"
                    name="userName"
                >
                  <Input placeholder="user name" maxLength="25" disabled />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: "email", message: 'Please input user email!' }]}
                >
                  <Input placeholder="user email"/>

                </Form.Item>
                <Form.Item
                    label="Designation"
                    name="designation"

                    rules={[{ required: true, message: 'Please input user designation!' }]}
                >
                  <Input placeholder="user designation"/>

                </Form.Item>
                <Form.Item
                    label="Role"
                    name="roleId"
                    rules={[{ required: true, message: 'Please select user role!' }]}
                >
                  <Select
                      // mode="multiple"
                      // style={{ width: '75%' }}
                      placeholder="Select Role"
                      defaultValue={[]}
                      //   onChange={this.handleSelectProjectChange}
                  >
                    {this.props.RoleList.map((x)=> <Option value={x.id}>{x.roleName}</Option>)}
                  </Select>

                </Form.Item>
                <Form.Item
                    label="Project"
                    name="project"
                    //initialValue: this.state.Data.Name,

                    rules={[{ required: true, message: 'Please select user project!' }]}
                >
                  <Select
                      mode="multiple"
                      // style={{ width: '75%' }}
                      placeholder="Select Project"
                      defaultValue={[]}
                      //   onChange={this.handleSelectProjectChange}
                  >
                    {this.props.ProjectList.map((x)=> <Option value={x.id}>{x.projectName}</Option>)}
                  </Select>

                </Form.Item>

                {/*<Form.Item*/}
                {/*    label="Password"*/}
                {/*    name="password"*/}

                {/*    rules={*/}
                {/*      [{required: true,},{ max: 15, message: 'You can only add 15 character' },*/}
                {/*        { min: 5, message: 'You can not  add below 5 character' }]*/}
                {/*    }*/}
                {/*>*/}
                {/*  <Input.Password maxLength={15} min={5} placeholder="user Password"/>*/}
                {/*</Form.Item>*/}

                <Divider/>
                <Form.Item {...tailLayout}>
                  <Button type="primary" onClick={this.handleCancel}>
                    Close
                  </Button>&nbsp;&nbsp;
                  <Button type="primary" htmlType="submit" >
                    Submit
                  </Button >
                </Form.Item>

              </Form>
            </Modal>:null}
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
)(UserCreat);
