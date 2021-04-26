import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import {Alert, Button, Card, Divider, Form,Popconfirm, Input, message, Radio, Rate, Skeleton} from "antd";
import axios from "axios";
import swal from "sweetalert";
import { withRouter } from "react-router";
const { TextArea } = Input;

export class Feedback extends Component {
    formRef = React.createRef();

    constructor(props) {
    super(props);

    this.state = {
      setValue:[],
      questionList: [],
      loading: false
    }

  }

  static propTypes = {
    pulse: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  onFinish = (values: any) => {
   // console.log("client form ==",values)
    const data={
      "username": localStorage.getItem("userName"),
      //  "designation":values.designation,
      "feedback":values.feedback,
      // "organization":values.organization,
      "rate":values.rate,
      "q1":values.q1,
      "q2":values.q2,
      "q3":values.q3,
      "q4":values.q4,
      "q5":values.q5,
      "q6":values.q6,
      "q7":values.q7,
    }
    this.setState({
      loading:true
    })
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem("token")
    };
    axios.post(`/user/feedback`,data ,{headers})
        .then(res => {
          const allData = res.data;
         // console.log('resposdse ===========',allData);
          if(allData.status){
            message.success('Your feedback  successfully updated in our home page - Thank you !', 8);
            this.setState({
              loading:false
            })
            this.logout();

          }else {
            this.setState({
              loading:false
            })
          }
        })
  };
  logout=()=> {
    //  const thisProp =this;
    //  thisProp.setState({ visiblePopOver:false });
    swal(  "Do you want to logout and view the feedback?", {
      icon: "info",
      buttons: ["Cancel", "Ok"],
      type: 'info',
    }).then((value) => {
      if (value) {
        // thisProp.setState({loginValidate: false, visible: false,});
        localStorage.clear()
        // window.location.reload();
        this.props.history.push('/');
        // window.location.reload();

      }
    });

  };
  onFinishFailed = (errorInfo: any) => {
   // console.log('Failed:', errorInfo);
  };

    onReset = () => {
        this.formRef.current.resetFields();
    };
  render() {
    return (
      <div className="pulse-feedback"  style={{}}>
        <Divider/>
        <Card hoverable={true} bordered={true}  style={{marginRight:150,marginLeft:150}} title={"Mitra Managed Services - Customer Feedback Survey - Q3 "+new Date().getFullYear()} >



          <Divider />
          <Alert className="font-heading" style={{fontWeight:850}} message="Thank you for taking time to complete our customer satisfaction survey. We'd like to hear from you to continue to develop our service capabilities. With your valuable input, we hope to provide you a better service in the future. Please take a moment to complete this brief survey and let us know what you think (your answers will be anonymous)."
                 type="info" showIcon />

          <Divider />
          <Form
              name="control-ref"
              ref={this.formRef}
              layout="vertical"
              //initialValues={{ remember: true }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}


          >
            <Skeleton loading={this.state.loading} active paragraph={{ rows: 10 } }>

              <Form.Item
                  label="How satisfied are you with the Mitra team's understanding of your strategic objectives (project, organization) "
                  name="q1"
                  rules={[{ required: true, message: 'Please select a value' }]}
              >
                <Radio.Group onChange={this.onChangeRadio} value={this.value}>

                  <Radio value={1}>1</Radio>
                  <Radio value={2}>2</Radio>
                  <Radio value={3}>3</Radio>
                  <Radio value={4}>4</Radio>
                  <Radio value={5}>5</Radio>
                </Radio.Group>

              </Form.Item>
              <Divider />
              <Form.Item

                  label="How satisfied are you with the value additions provided by Mitra managed services team?"
                  name="q2"
                  rules={[{ required: true, message: 'Please select a value' }]}
              >
                <Radio.Group onChange={this.onChangeRadio} value={this.value}>

                  <Radio value={1}>1</Radio>
                  <Radio value={2}>2</Radio>
                  <Radio value={3}>3</Radio>
                  <Radio value={4}>4</Radio>
                  <Radio value={5}>5</Radio>
                </Radio.Group>

              </Form.Item>
              <Divider />
              <Form.Item

                  label="Does Mitra deliver on time with the expected quality for your service operations? and how proactive is Mitra in identifying and addressing issues?"
                  name="q3"
                  rules={[{ required: true, message: 'Please select a value' }]}
              >
                <Radio.Group onChange={this.onChangeRadio} value={this.value}>

                  <Radio value={1}>1</Radio>
                  <Radio value={2}>2</Radio>
                  <Radio value={3}>3</Radio>
                  <Radio value={4}>4</Radio>
                  <Radio value={5}>5</Radio>
                </Radio.Group>

              </Form.Item>
              <Divider />
              <Form.Item

                  label="Does Mitra meet the agreed and expected quality standards?"
                  name="q4"
                  rules={[{ required: true, message: 'Please select a value' }]}
              >
                <Radio.Group onChange={this.onChangeRadio} value={this.value}>

                  <Radio value={1}>1</Radio>
                  <Radio value={2}>2</Radio>
                  <Radio value={3}>3</Radio>
                  <Radio value={4}>4</Radio>
                  <Radio value={5}>5</Radio>
                </Radio.Group>

              </Form.Item>
              <Divider />
              <Form.Item

                  label="How well did Mitra manage the engagement in terms of coordination, communication, and managing stakeholders' expectations?"
                  name="q5"
                  rules={[{ required: true, message: 'Please select a value' }]}
              >
                <Radio.Group onChange={this.onChangeRadio} value={this.value}>
                  <Radio value={1}>1</Radio>
                  <Radio value={2}>2</Radio>
                  <Radio value={3}>3</Radio>
                  <Radio value={4}>4</Radio>
                  <Radio value={5}>5</Radio>
                </Radio.Group>

              </Form.Item>
              <Divider />
              <Form.Item

                  label="How do you rate the technical capabilities of Mitra teams related to service operations?"
                  name="q6"
                  rules={[{ required: true, message: 'Please select a value' }]}
              >
                <Radio.Group onChange={this.onChangeRadio} value={this.value}>

                  <Radio value={1}>1</Radio>
                  <Radio value={2}>2</Radio>
                  <Radio value={3}>3</Radio>
                  <Radio value={4}>4</Radio>
                  <Radio value={5}>5</Radio>
                </Radio.Group>

              </Form.Item>
              <Divider />
              <Form.Item

                  label="How likely would you be to recommend Mitra to another customer or a colleague?"
                  name="q7"
                  rules={[{ required: true, message: 'Please select a value' }]}
              >
                <Radio.Group onChange={this.onChangeRadio} value={this.value}>

                  <Radio value={1}>1</Radio>
                  <Radio value={2}>2</Radio>
                  <Radio value={3}>3</Radio>
                  <Radio value={4}>4</Radio>
                  <Radio value={5}>5</Radio>
                </Radio.Group>

              </Form.Item>
              <Divider />
              <Form.Item

                  label="Feedback "
                  name="feedback"
                  rules={[{ required: true, message: 'Please give us your valuable feedback' }]}
              >
                <TextArea
                    // onChange={this.onChangeText}
                    // value={this.value}
                    placeholder="Feedback and suggestions? "
                    autoSize={{ minRows: 1, maxRows: 2 }}
                    maxLength={200}
                />

              </Form.Item>
              <Divider />
              <Form.Item
                  label="Rate"
                  name="rate"
                  rules={[{ required: true, message: 'Please give us your rate' }]}
              >
                <Rate allowHalf defaultValue={3} />
              </Form.Item>
              <Divider />
              {/*<Form.Item*/}

              {/*    label="Designation "*/}
              {/*    name="designation"*/}
              {/*    rules={[{ required: true, message: 'Please input your Designation' }]}*/}


              {/*>*/}
              {/*    /!*<TextArea rows={4} onChange={this.onChange} value={this.value} />*!/*/}
              {/*    <Input   placeholder="Designation "/>*/}
              {/*</Form.Item>*/}
              {/*<Divider />*/}
              {/*<Form.Item*/}

              {/*    label="Organization "*/}
              {/*    name="organization"*/}
              {/*    rules={[{ required: true, message: 'Please input your Organization' }]}*/}

              {/*>*/}
              {/*    /!*<TextArea rows={4} onChange={this.onChange} value={this.value} />*!/*/}
              {/*    <Input   placeholder="Organization Name "/>*/}
              {/*</Form.Item>*/}
              {/*<Divider />*/}
            </Skeleton>
            <Form.Item >
                <Button htmlType="button" type="dashed" onClick={this.onReset}>
                    Reset
                </Button>&nbsp;&nbsp;

              {localStorage.getItem('role') == "client" ?
                  <Button type="primary" htmlType="submit" loading={this.state.loading}>
                    Submit
                  </Button> :
                  <Button type="dashed" htmlType="submit" loading={this.state.loading} disabled>
                    Submit
                  </Button>
              }

            </Form.Item>
          </Form>

          <Divider />

        </Card>
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

export default withRouter (connect(
  mapStateToProps,
  mapDispatchToProps
)(Feedback));


