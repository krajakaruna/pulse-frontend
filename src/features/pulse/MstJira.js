import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Alert,Spin,Button,message,Card,Breadcrumb, Col, Tabs ,Result}  from 'antd';
import axios from "axios";
import moment from "moment";
const { TabPane } = Tabs;

export class MstJira extends Component {


  constructor(props) {
    super(props);
    this.state = {
      lastUpdateOpen:[],
      lastUpdateClosed:[],
      loadings1: false,
      loadings2: false,
      ResultStatus:[]
    }
  }
  static propTypes = {
    pulse: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  componentWillMount() {
    this.getTicketLastUpdate();
    //
    // if(localStorage.getItem('userName')==="MST" && localStorage.getItem('password')==="mst@123" ){
    //   this.props.history.push('/report/jira');
    //
    // }else {
    //   this.props.history.push('/login-page');
    //   localStorage.clear();
    //   this.setState({loginValidate: false});
    // }
  }

  getTicketLastUpdate(){
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+localStorage.getItem("token")
      };
    axios.get( `/api/audit/getLastDetails`,{headers})
        .then(res => {
          const allData = res;

          // console.log("res open ==", allData.data)
          if(res.status=="200"){
            if( allData.data.length>=1){

              this.setState({
                lastUpdateOpen:allData.data[0],
                lastUpdateClosed:allData.data[1]
              })
            }

          }
        });
  }
  getOpenTicket(){
    this.setState({loading1:true})
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+localStorage.getItem("token")
      };
    axios.get( `/api/ticket/open`,{headers})
        .then(res => {
          const allData = res;

          if(res.status=="200"){
            this.setState({loading1:false})
            message.success(allData.data.message);
            this.getTicketLastUpdate();
          }else {
            this.setState({loading1:false})
            message.error(allData.data.message);
          }

        });
  }
  getClosedTicket(){
    this.setState({loading2:true})
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+localStorage.getItem("token")
      };
    axios.get( `/api/ticket/closed`,{headers})
        .then(res => {
          const allData = res;

         // console.log("res closed ==", allData)
          if(res.status=="200"){
            this.setState({loading2:false})
            message.success(allData.data.message);
            this.getTicketLastUpdate();
          }else {
            this.setState({loading2:false})
            message.error(allData.data.message);
          }

        });
  }

  render() {
    return (
      <div className="pulse-mst-jira">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Report</Breadcrumb.Item>
          <Breadcrumb.Item>MST Jira</Breadcrumb.Item>

        </Breadcrumb>

          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="MST Open Tickets " key="1">
              <Result
                  status="success"
                  title="Successfully Updated jira Open ticket to Pulse database!"
                  subTitle={"Last updated "+ moment(this.state.lastUpdateOpen.jobEnd).format('MMMM Do YYYY, h:mm:ss a')  + " and status is "+ this.state.lastUpdateOpen.status }
                  extra={[
                    <Button type="primary"  loading={this.state.loading1} onClick={this.getOpenTicket.bind(this)}>Update Open Ticket</Button>,
                  ]}
              />
            </TabPane>
            <TabPane tab="MST Closed Tickets" key="2">
              <Result
                  status="success"
                  title="Successfully Updated jira Closed ticket to Pulse database!"
                  subTitle={"Last updated "+ moment(this.state.lastUpdateClosed.jobEnd).format('MMMM Do YYYY, h:mm:ss a')  + " and status is "+ this.state.lastUpdateClosed.status }
                  extra={[
                    <Button type="primary"    loading={this.state.loading2} onClick={this.getClosedTicket.bind(this)}>Update Closed Ticket</Button>,
                  ]}
              />
            </TabPane>
          </Tabs>



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
)(MstJira);
