import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Divider, Form, Input, Modal, Radio, Rate, Skeleton} from "antd";
const { TextArea } = Input;
export class FeedbackView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }

  }

  static propTypes = {
    pulse: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  handleCancel = () => {
    this.props.actions.hideCreatModal();

  };
  render() {
    const {showCreatModal} = this.props.pulse;
    const rate=this.props.rate
    const feedback=this.props.feedback
    return (
      <div className="pulse-feedback-view">
        <Modal
            title="View Client Feedback"
            visible={showCreatModal}
            //onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={800}
            footer={null}
        >
              <Form
                  name="basic"
                  layout="vertical"
                  //initialValues={{ remember: true }}
                //  onFinish={this.onFinish}
                  //onFinishFailed={this.onFinishFailed}
                  //   initialValues={this.state.ViewData}
                  //   initialValues={{
                  //     q1:this.props.ViewData.q1,
                  //     q2:this.props.ViewData.q2,
                  //     q3:this.props.ViewData.q3,
                  //   }}

              >
                <Skeleton loading={this.state.loading} active paragraph={{ rows: 10 } }>
                  <Form.Item
                      label="How satisfied are you with the Mitra team's understanding of your strategic objectives (project, organization) "
                      //name="q1"
                  >
                    <Radio.Group disabled
                        // defaultValue={this.props.ViewData.q1}
                                 value={parseInt(this.props.ViewData.q1)}
                    >

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
                     // name="q2"

                  >
                    <Radio.Group
                        value={parseInt(this.props.ViewData.q2)}
                        disabled>

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
                    //  name="q3"

                  >
                    <Radio.Group
                        value={parseInt(this.props.ViewData.q3)}
                        disabled>

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
                   //   name="q4"

                  >
                    <Radio.Group
                        value={parseInt(this.props.ViewData.q4)}
                        disabled>

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
                  //    name="q5"
                  >
                    <Radio.Group
                        value={parseInt(this.props.ViewData.q5)}
                        disabled>
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
                   //   name="q6"

                  >
                    <Radio.Group
                        value={parseInt(this.props.ViewData.q6)}
                        disabled>

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
                   //   name="q7"

                  >

                    <Radio.Group  disabled
                                  value={parseInt(this.props.ViewData.q7)}
                    >

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
                      //name="feedback"
                  >
                    <TextArea
                        // onChange={this.onChangeText}
                        // value={this.value}
                        //placeholder="Feedback and suggestions? "
                        //autoSize={{ minRows: 1, maxRows: 2 }}
                        //maxLength={200}
                        disabled
                        value={feedback}
                    />

                  </Form.Item>
                  <Divider />
                  <Form.Item
                      label="Rate"
                     // name="rate"
                  >
                    <Rate allowHalf
                          value={rate}
                          disabled />
                  </Form.Item>
                  <Divider />

                </Skeleton>

              </Form>
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
)(FeedbackView);
