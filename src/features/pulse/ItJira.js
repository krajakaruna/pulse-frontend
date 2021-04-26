import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Alert, Spin, Button, message, Card, Breadcrumb, Col, Row, Tabs, Result} from 'antd';
import axios from "axios";
import moment from "moment";
const { TabPane } = Tabs;
export class ItJira extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdateAllTicket:[],

      loading: false
    }
  }
  static propTypes = {
    pulse: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  componentWillMount() {
    this.getTicketLastUpdate();

    // if(localStorage.getItem('userName')==="MST" && localStorage.getItem('password')==="mst@123" ){
    //   this.props.history.push('/report/it-jira');
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
                lastUpdateAllTicket:allData.data[2]
              })
            }

          }
        });
  }

  getAllITOpenTicket(){
    this.setState({loading:true})
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+localStorage.getItem("token")
      };
    axios.get( `/api/it/ticket/open`,{headers})
        .then(res => {
          const allData = res;

          if(res.status=="200"){
            this.setState({loading:false})
            message.success(allData.data.message);
            this.getTicketLastUpdate()

          }else {
            this.setState({loading:false})
            message.error(allData.data.message);
          }

        });
  }
  render() {
    return (
      <div className="pulse-it-jira">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="All IT Tickets " key="1">
            <Result
                status="success"
                title="Successfully Updated all IT jira tickets to Pulse database!"
                subTitle={"Last updated "+ moment(this.state.lastUpdateAllTicket.jobEnd).format('MMMM Do YYYY, h:mm:ss a')  + " and status is "+ this.state.lastUpdateAllTicket.status }
                extra={[
                  <Button type="primary"  loading={this.state.loading} onClick={this.getAllITOpenTicket.bind(this)}>Update IT Tickets</Button>
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
)(ItJira);
