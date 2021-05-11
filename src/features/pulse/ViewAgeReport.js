import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Button, Divider, Form, Input, Modal, Radio, Rate, Select, Skeleton} from "antd";

export class ViewAgeReport extends Component {
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
    // this.formRef.current.resetFields();
    //this.props.actions.hideAgeModal();
    this.props.actions.hideCreatModal();
  };
  render() {
    //const {showAgeModal} = this.props.pulse;
    // console.log('showCreatModal=',showAgeModal)
    const {showCreatModal} = this.props.pulse;
    return (
      <div className="pulse-view-age-report">
        <Modal
            title="View Client Feedback"
            visible={showCreatModal}
            //onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={800}
            footer={null}
        >

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
)(ViewAgeReport);
