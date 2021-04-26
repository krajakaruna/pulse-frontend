import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import axios from "axios";
import {
  Button,
  Form,
  Popconfirm,
  Skeleton,
  Table,
  Tag,
  Tooltip,
  Modal,
  Radio,
  Divider,
  Rate,
  Card,
  Input,
  message
} from "antd";
import {
  DeleteTwoTone,
  EyeTwoTone,
  SwapOutlined,
  MailTwoTone,
  UnlockOutlined,
  SafetyCertificateTwoTone
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import FeedbackView from "./FeedbackView";
import UserCreat from "./UserCreat";
const { TextArea } = Input;

export class ManageFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TableDate:[],
      ViewData:[],
      rate:[],
      feedback:[],
      loading: false,
      visible:false,
      filteredInfo: null,
      sortedInfo: null,
      projectList:[]
    }

  }

  static propTypes = {
    pulse: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.getFeedbackDetails();
    var result = JSON.parse(localStorage.getItem("projectList")).map(person => ({ value: person.projectName, text: person.projectName }));
   // console.log(result)


   // console.log(result)
    this.setState({
      projectList:result
    })
  }

  getFeedbackDetails(){
    this.setState({
      loading:true
    });
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem("token")
    };
   // console.log("token seelan=","Bearer "+localStorage.getItem("token"))

    axios.get(`/user/get-all-feedback` ,{headers})
        .then(res => {
          const allData = res.data;
         // console.log("get feedback==",allData)
          if(allData.status){
              this.setState({
                TableDate:allData.data,
                loading:false

              })
            }

    })
  }


  showModal = (feedbackId) => {
   // console.log("feedbackId=",feedbackId)
    const payload={
      "feedbackId": feedbackId,
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem("token")
    };
    axios.post(`/user/get-feedback-id`,payload,{headers} )
        .then(res => {
          const allData = res.data;
       //   console.log("get feedback id==",allData)
          if(allData.status){
            this.setState({
              ViewData:allData.data.Questions,

              feedback:allData.data.feedback,
              rate:allData.data.rate,

            })
            this.props.actions.showCreatModal();
          }

  })
  }

  InActiveFeedback = (feedbackId) => {
   // console.log("feedbackId id="+feedbackId)
    //console.log("userName ="+localStorage.getItem("userId"))
    this.setState({
     loading:true
    });


      const payload={
        "userId":localStorage.getItem("userId"),
        "feedbackId":feedbackId
  };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem("token")
    };
      axios.post(`/user/delete-feedback-id`,  payload,{headers})
          .then(res => {
            const allData = res.data;
         //   console.log("üser delete=====",allData)
            if(allData.status){
              this.setState({
                loading:false
              })
              this.getFeedbackDetails();

            }
          })

  };

  IsApproveFeedBack = (feedbackId) => {
   // console.log("feedbackId id="+feedbackId)
  //  console.log("userName ="+localStorage.getItem("userId"))
    this.setState({
     loading:true
    })

      const payload={
        "userId":localStorage.getItem("userId"),
        "feedbackId":feedbackId
      };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem("token")
    };
      axios.post(`/user/approved-feedback-id`,  payload,{headers} )
          .then(res => {
            const allData = res.data;
         //   console.log("üser delete=====",allData)
            if(allData.status){
              message.success('Client feedback has been approved and email has been sent successfully');
              this.setState({
                loading:false
              })
              this.getFeedbackDetails();

            }
          })

  };


  handleCancel = e => {
   // console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleChange = (pagination, filters, sorter) => {
   // console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  render() {


    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: '#',
        dataIndex: 'no',
        key: 'no',
        width: 50,
        fixed: 'left',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        fixed: 'left',

        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
        ellipsis: true
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 200,
        // ...this.getColumnSearchProps('email')
        filteredValue: filteredInfo.email || null,
        onFilter: (value, record) => record.email.includes(value),
        sorter: (a, b) => a.email.length - b.email.length,
        sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
        ellipsis: true
      },

      {
        title: 'Designation',
        dataIndex: 'designation',
        key: 'designation',
        width: 200,
        filteredValue: filteredInfo.designation || null,
        onFilter: (value, record) => record.designation.includes(value),
        sorter: (a, b) => a.designation.length - b.designation.length,
        sortOrder: sortedInfo.columnKey === "designation" && sortedInfo.order,
        ellipsis: true
      }, {
        title: 'FeedbackDate',
        dataIndex: 'date',
        key: 'date',
        filteredValue: filteredInfo.date || null,
        onFilter: (value, record) => record.date.toString().includes(value),
        sorter: (a, b) => a.date.toString() - b.date.toString(),
        sortOrder: sortedInfo.columnKey === "date" && sortedInfo.order,
        ellipsis: true
      },
      {
        title: 'Role',
        key: 'role',
        dataIndex: 'role',
        filteredValue: filteredInfo.role || null,
        onFilter: (value, record) => record.role.includes(value),
        sorter: (a, b) => a.role.length - b.role.length,
        sortOrder: sortedInfo.columnKey === "role" && sortedInfo.order,
        ellipsis: true
      },

      {
        title: 'Project',
        dataIndex: 'projectName',
        key: 'projectName',
        filters: this.state.projectList,
        filteredValue: filteredInfo.projectName || null,
        onFilter: (value, record) => record.projectName.includes(value),
        sorter: (a, b) => a.projectName.length - b.projectName.length,
        sortOrder: sortedInfo.columnKey === "projectName" && sortedInfo.order,
        ellipsis: true


      },

      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        filters: [

          { text: 'Active', value: "1" },
          { text: 'Inactive', value: "0" }
        ],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.toString().includes(value),
        sorter: (a, b) => a.status.toString() - b.status.toString(),
        sortOrder: sortedInfo.columnKey === "status" && sortedInfo.order,
        ellipsis: true,
        render: status => {
          let statusColor, statusName;
          if (status === 1) {
            statusName = 'Active';
            statusColor = '#87d068';
          } else {
            statusName = 'Inactive';
            statusColor = '#f50';
          }
          return <Tag color={statusColor}>{statusName}</Tag>;

        },

      },
      {
        title: 'IsApproved',
        dataIndex: 'IsApproved',
        key: 'IsApproved',
        filters: [

          { text: 'Yes', value: "1" },
          { text: 'No', value: "0" }
        ],
        filteredValue: filteredInfo.IsApproved || null,
        onFilter: (value, record) => record.IsApproved.toString().includes(value),
        sorter: (a, b) => a.IsApproved.toString() - b.IsApproved.toString(),
        sortOrder: sortedInfo.columnKey === "IsApproved" && sortedInfo.order,
        ellipsis: true,
        render: status => {
          let statusColor, statusName;
          if (status === 1) {
            statusName = 'Yes';
            statusColor = '#87d068';
          } else {
            statusName = 'No';
            statusColor = '#f50';
          }
          return <Tag color={statusColor}>{statusName}</Tag>;

        },
      }, {
        title: 'ModifiedDate',
        dataIndex: 'modifiedDate',
        key: 'modifiedDate',


      }, {
        title: 'ModifiedBy',
        dataIndex: 'modifiedBy',
        key: 'modifiedBy',
      },
      {
        title: 'Action',
        key: 'action',
        width:150,
        align:'center',
        fixed: 'right',

        render: (record) =>

            <>
              {localStorage.getItem("features").includes("FeedBack_View") ?
                  <Tooltip title='View'>
                    <Button type="link" icon={<EyeTwoTone />}    style={{fontSize: 16, border: 'none'}} onClick={() =>this.showModal(
                        record.feedbackId
                    )}
                    />

                  </Tooltip>:null}

              {localStorage.getItem("features").includes("FeedBack_Approve") ?
              record.IsApproved == 0 ?

                      <Tooltip title="IsApprove?">
                        <Popconfirm title="Do you want to approve and send an approved feedback email to client?"
                                   onConfirm={() => this.IsApproveFeedBack(record.feedbackId)}
                                    placement="topRight"

                                    okText="Yes"
                                    cancelText="No"
                        >
                          <MailTwoTone />
                          {/*<Button type="link" icon={<DeleteTwoTone/>}   ghost style={{fontSize: 16, border: 'none'}} onClick={() => this.InActiveUser(record.id)}*/}


                        </Popconfirm>
                      </Tooltip> :null:null}
              &nbsp;&nbsp;
              {localStorage.getItem("features").includes("FeedBack_Delete") ?

              record.status == 1 ?
              <Tooltip title="InActivate">
                <Popconfirm title="Do you want to InActivate this feedback?"
                            onConfirm={() => this.InActiveFeedback(record.feedbackId)}
                            placement="topRight"

                            okText="Yes"
                            cancelText="No"
                >
                  <DeleteTwoTone/>
                  {/*<Button type="link" icon={<DeleteTwoTone/>}   ghost style={{fontSize: 16, border: 'none'}} onClick={() => this.InActiveUser(record.id)}*/}


                </Popconfirm>
              </Tooltip> :
              <Tooltip title="Activate">
                <Popconfirm title="Do you want to Activate this feedback?"
                            onConfirm={() => this.InActiveFeedback(record.feedbackId)}
                            placement="topRight"

                            okText="Yes"
                            cancelText="No"
                >
                  <SafetyCertificateTwoTone />
                  {/*<Button type="link" icon={<DeleteTwoTone/>}   ghost style={{fontSize: 16, border: 'none'}} onClick={() => this.InActiveUser(record.id)}*/}


                </Popconfirm>
              </Tooltip>
             :null }


            </>

      },
    ];
    return (
      <div className="pulse-manage-feedback">
        <Skeleton loading={this.state.loading} active paragraph={{ rows: 5 } }>

          <Table dataSource={this.state.TableDate} columns={columns} pagination={{ pageSize: 10 }} size="small" onChange={this.handleChange} scroll={{ x: 1500,}}/>
        </Skeleton>

        <FeedbackView
            visible={this.state.visible}
            ViewData={this.state.ViewData}
            rate={this.state.rate}
            feedback={this.state.feedback}
          />
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
)(ManageFeedback);
