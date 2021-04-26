import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import  {Modal, Button, Form, Input, Divider, message} from 'antd';
import {Link} from "react-router-dom";
import {LeftOutlined} from "@ant-design/icons";
import axios from "axios";
const tailLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};
export class UserPasswordChange extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      confirmLoading: false,

    };
  }

  static propTypes = {
    pulse: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  handleCancel = () => {
    this.formRef.current.resetFields();
    this.props.actions.hideViewModal();

  };
  onFinish = (values: any) => {
    // console.log("ID------=",this.props.id)
    // console.log("password------=",values.password)
    // console.log("newPassword------=",values.newPassword)
    const payload={
      "userId": this.props.id,
      "password":values.password,
      "newPassword":values.newPassword,
      "modifiedUserId":localStorage.getItem("userId")

    }
    this.setState({
      loading:true
    })
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem("token")
    };
    axios.post(`/user/change -password-ById`,  payload ,{headers})
        .then(res => {
          const allData = res.data;

          if(allData.status){
           // console.log("eefefe==",allData.data===localStorage.getItem('userName'))
            if(allData.data===localStorage.getItem('userName')) {
           //   console.log("data==", allData.data)
              message.success(" Password has been changed successfully", 3);
              this.handleCancel();
               window.location.reload(true);
              localStorage.clear()
            }else {
              message.success(" Password has been changed successfully", 3);
              this.handleCancel();
              window.location.reload(true);
            }
          }else {
            this.setState({
              loading:false
            })
            message.error("Password changing  failed.please contact the administrator ", 3);
          }
        })



  };
  // componentDidMount() {
  //   this.formRef.current.resetFields();
  // }
  render() {
    // {console.log("id------=",this.props.id)}
    // {console.log("id------=",this.props.userId)}
    const {showViewModal} = this.props.pulse;

    return (
      <div className="pulse-user-password-change">

        <Modal title="Change/Reset Password" visible={showViewModal}
               footer={null}
               width={600}
               onCancel={this.handleCancel}
        >
          <div style={{marginTop: 0}}>
            <Form
                {...tailLayout}
                name="control-ref"
                ref={this.formRef}
               initialValues={{ remember: true }}
                onFinish={this.onFinish}
                 onFinishFailed={this.onFinishFailed}
                  style={{width:500,}}
            >

              {this.props.userId==this.props.id?
              <Form.Item
                  label="Current Password"
                  name="password"

                  rules={
                    [{required: true,},{ max: 15, message: 'You can only add 15 character' },
                      { min: 5, message: 'You can not  add below 5 character' }]
                  }
              >
                <Input.Password maxLength={15} min={5} placeholder="current password" />
              </Form.Item>:null}
              {this.props.userId==this.props.id?
              <Form.Item
                  label="New Password"
                  name="newPassword"

                  // rules={
                  //   [{ required: true, message: 'Please input your new password!' }]
                  // }
                  rules={
                    [{required: true,},{ max: 15, message: 'You can only add 15 character' },
                      { min: 5, message: 'You can not  add below 5 character' }]
                  }

              >
                <Input.Password maxLength={16} placeholder="new Password"/>
              </Form.Item>:null}
              {this.props.userId!=this.props.id?
                  <Form.Item
                      label="Reset Password"
                      name="newPassword"

                      rules={
                        [{required: true,},{ max: 15, message: 'You can only add 15 character' },
                          { min: 5, message: 'You can not  add below 5 character' }]
                      }
                  >
                    <Input.Password placeholder="Reset Password" />
                  </Form.Item>:null}
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

          </div>
        </Modal>
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
)(UserPasswordChange);
