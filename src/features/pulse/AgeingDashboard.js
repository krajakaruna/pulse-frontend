import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {DeleteTwoTone, EyeTwoTone, MailTwoTone, SafetyCertificateTwoTone, SearchOutlined} from "@ant-design/icons";
import {
    Row,
    Input,
    Col,
    Button,
    Select,
    DatePicker,
    Table,
    Modal,
    Space,
    Statistic,
    Card,
    Skeleton,
    Tag,
    message,
    Typography,
    Popconfirm,
    Divider,
    Empty
} from "antd";
import axios from "axios";
import moment from 'moment';
// import { PieChart } from 'bizcharts';
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  PieChart,
  Coordinate,
  Interaction,
  getTheme,

} from 'bizcharts';
import TextLoop from "react-text-loop";

const CardStylebackground= {backgroundColor:'rgb(229 238 247)',marginLeft:50,marginRight:50};

const { Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const { Option } = Select;
export class AgeingDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllOpenTickets:[],
      AllClosedTickets:[],
      selectedDateRange:[],
      selectedProject:[],
      selectedStatus:[],
      SelectAgeName:[],
      SelectAgeingIssueType:[],
      ProjectList:JSON.parse(localStorage.getItem("projectList")),
      TicketStatusList:[],
      AgeingNameList:[],
      AgeingTypeIssueList:[],
      SearchedData:[],
      startDate:moment(new Date(), dateFormat).subtract(30,'days'),
      endDate:moment(new Date(), dateFormat),
      All_Close:[],
      All_Issues:[],
      All_Open:[],
      GetDashboardData:[],
      Open_P1:[],
      Total_All_Issues:[],
      Total_Open_P1:[],
      Total_All_Open:[],
      Total_All_Close:[],
      PD:[],
      SearchPDData:[],
      GetProjectWise:[],
      GetPriority:[],
    AgeTableDate:[],
      loading: false,
      visible: false,
      AgeReportID:[],
      AgeReportData:[],
      PieChartData:[],
      ProjectWiseCount:[],
    }

  }

  static propTypes = {
    pulse: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    // this.getAllOpenTicketLast();
    // this.getAllClosedTicketLast();
    //  this.getProjectList();
    this.getDashboardProjectDataDefault();
    this.getTicketStatusList();
    this.getGetAgeingNameList();
    this.getGetAgeingIssueTypeList();
this.submitSearchData();

  }

  getDashboardProjectDataDefault(){

    var P_name=[];
    P_name.push( JSON.parse(localStorage.getItem("projectList")).map((x)=>x.projectName));

    var Data={
      "selectedStatus":[],
      "selectedProject":P_name[0],
      "selectedDateRange":[moment(this.state.startDate).format(dateFormat),moment(this.state.endDate).format(dateFormat)]
    };
    //console.log("xxx=",Data)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem("token")
    };
    this.setState({
      loading:true
    });
    axios.post(`/api/ticket/get-default`,  Data ,{headers})
        .then(res => {
          const allData = res.data;
          // console.log("all dashboard def data allData=",allData.data)
          if(allData.status){
            // console.log("GetPriority===",allData.data.GetPriority)
            // var r_active=allData.data.SearchPDData[0][1]
            // var p_active=allData.data.SearchPDData[1][1]
            // var total=p_active+r_active
            // var r_persentage =(r_active/total);
            // var p_persentage =(p_active/total);
            // var DP_List = [{item:"Reactive", count:allData.data.SearchPDData[0][1], percent:r_persentage},
            //     {item:"Proactive", count:allData.data.SearchPDData[1][1], percent:p_persentage},
            // ];
            if(allData.data.SearchPDData.length>1){
              var r_active=allData.data.SearchPDData[0][1]
              var p_active=allData.data.SearchPDData[1][1]
              var total=p_active+r_active
              var r_persentage =(r_active/total);
              var p_persentage =(p_active/total);
              var DP_List = [{item:"Reactive", count:allData.data.SearchPDData[0][1], percent:r_persentage},
                {item:"Proactive", count:allData.data.SearchPDData[1][1], percent:p_persentage},
              ];
            }else if(allData.data.SearchPDData.length==1 && allData.data.SearchPDData[0].length>=1){
              var r_active=allData.data.SearchPDData[0][1]

              var total=r_active
              var r_persentage =(r_active/total);
              var DP_List = [{item:allData.data.SearchPDData[0][0], count:allData.data.SearchPDData[0][1], percent:r_persentage},
              ];
            }

            var data= allData.data.GetProjectWise;
            var dataGetPriority= allData.data.GetPriority;
            var jsonGetPriority = dataGetPriority.map(function (value, key) {
              return {
                "type": value[0],
                "name": value[1],
                "Priority": value[2],
                "value": value[3],
              }
            });

            var jsonGetProjectWise = data.map(function (value, key) {
              return {
                "Name": value[0],
                "Total": value[1]
              }
            });

            this.setState({
              All_Close:allData.data.All_Close,
              All_Issues:allData.data.All_Issues,
              All_Open:allData.data.All_Open,
              GetDashboardData:allData.data.GetDefaultDashboardData,
              Open_P1:allData.data.Open_P1,
              Total_All_Issues:allData.data.Total_All_Issues,
              Total_Open_P1:allData.data.Total_Open_P1,
              Total_All_Open:allData.data.Total_All_Open,
              Total_All_Close:allData.data.Total_All_Close,
              PD:DP_List,
              SearchPDData:allData.data.SearchPDData,
              GetProjectWise:jsonGetProjectWise,
              GetPriority:jsonGetPriority,
              loading:false

            })

          }
        })
  }

  getTicketStatusList(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem("token")
    };
    axios.get( `/api/ticket/get-ticket-status`,{headers})
        .then(res => {
          const allData = res;

          if(res.status){
            if( allData.data.data.length>=1){
              //    console.log("get all the project status ==", allData.data)
              this.setState({
                TicketStatusList:allData.data.data
              })
            }

          }
        });
  }

  getGetAgeingNameList(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem("token")
    };
    axios.get( `/api/ageing/get-ageing-name`,{headers})
        .then(res => {
          const allData = res;
          if(res.status){
            if( allData.data.data.length>=1){
              //    console.log("get all the project status ==", allData.data)
              this.setState({
                AgeingNameList:allData.data.data
              })
            }

          }
        });
  }

  getGetAgeingIssueTypeList(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem("token")
    };
    axios.get( `/api/ageing/get-ageing-issue-type`,{headers})
        .then(res => {
          const allData = res;
          console.log('ageing date==',allData)
          if(res.status){
            if( allData.data.data.length>=1){
              //    console.log("get all the project status ==", allData.data)
              this.setState({
                AgeingTypeIssueList:allData.data.data
              })
            }

          }
        });
  }

  disabledDate=(current)=> {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  };

  getDateChange=(date, dateString)=> {
    this.setState({
      selectedDateRange:dateString
    })
  };
  handleSelectProjectChange=(value)=> {
    // console.log(`selected proj ${value}`);
    this.setState({
      selectedProject:value
    })
  };
  handleSelectStatusChange=(value)=> {
    //  console.log("selected ststus=",value);
    this.setState({
      selectedStatus:value
    })
  };
  handleSelectAgeNameChange=(value)=> {
    //  console.log("selected ststus=",value);
    this.setState({
      SelectAgeName:value
    })
  };
  handleSelectAgeingIssueTypeChange=(value)=> {
    //  console.log("selected ststus=",value);
    this.setState({
      SelectAgeingIssueType:value
    })
  };
  submitSearchData=()=>{
    var selectDate=null;
    if(this.state.selectedDateRange.length>0){
      selectDate=this.state.selectedDateRange
    }else {
      selectDate=[moment(this.state.startDate).format(dateFormat),moment(this.state.endDate).format(dateFormat)]
    }
    var P_name=[];
    P_name.push( JSON.parse(localStorage.getItem("projectList")).map((x)=>x.projectName));
    console.log(localStorage.getItem("role"))
    if(this.state.selectedProject.length>0) {
      var Data = {
        "selectedStatus": this.state.selectedStatus,
        "selectedProject": this.state.selectedProject,
        "selectedDateRange": selectDate,
        "selectedAge": this.state.SelectAgeName,
        "selectedIssueType": this.state.SelectAgeingIssueType,
      }
    }else if(localStorage.getItem("role")=="client") {
      var Data = {
        "selectedStatus": this.state.selectedStatus,
        "selectedProject":P_name[0],
        "selectedDateRange": selectDate,
        "selectedAge": this.state.SelectAgeName,
        "selectedIssueType": this.state.SelectAgeingIssueType,
      }
    }else if(localStorage.getItem("role")=="admin"){
      var Data = {
        "selectedStatus": this.state.selectedStatus,
        "selectedProject":[],
        "selectedDateRange": selectDate,
        "selectedAge": this.state.SelectAgeName,
        "selectedIssueType": this.state.SelectAgeingIssueType,
      }
    }

    this.setState({
      loading:true
    });


    const headers = {
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem("token")
    };        axios.post(`/api/ageing/get-Search-data`,Data,{headers} )
        .then(res => {
          const allData = res.data;
          console.log("all age data===",allData.data);
          console.log("AgeSearchData===",allData.data.AgeSearchData);
       let val=allData.data.AgeSearchData;
          const groups = val.reduce((groups, item) => {
            const group = (groups[item[17]] || []);
            group.push(item);
            groups[item[17]] = group;
            return groups;
          }, {});

          console.log(groups);

          var lookup = {};
          var items = val;
          var result = [];
          var k=0;
          for (var item, i = 0; item = items[i++];) {
            var name = item[17];
            var Data = [];
            if (!(name in lookup)) {
              lookup[name] = 1;
              for (var item2, j = 0; item2 = items[j++];) {
                var name2 = item2[17];
                if ((name2 === name)) {
                  Data.push(item2);
                }
              }
              let ProjectAge = {};
              Data.forEach(el => {
                ProjectAge[el[13].replace(/ /g, '')] = (ProjectAge[el[13].replace(/ /g, '')] || 0) + 1;
              });
              k++;
              result.push({
                "id": k,
                "TicketAge": name,
                "Data": Data,
                "ProjectAge": ProjectAge,
              });
            }
          }
          var finalResult=[];
          result.forEach(function (x) {
            //console.log("find names vale ",{...x, ...x.ProjectAge});
            finalResult.push({...x, ...x.ProjectAge})
          });
          var PieChartData =[];
          finalResult.forEach(function (val) {
            PieChartData.push({"TicketAge":val.TicketAge,"AgeCount":val.Data.length})
          });


          var ProjectWiseCount =[];
          this.state.ProjectList.forEach(function (val) {
           // console.log("ProjectList",val.projectName.split(/\s/).join(''))
            var Pname=val.projectName.split(/\s/).join('');

            var sum = finalResult.reduce((sum,a)=>{
           //   console.log("ProjectList sum==",sum)
             // console.log("ProjectList a==",a[Pname])
              var K=0;
              if (a[Pname]!=undefined){
                K=a[Pname];
              }else {
                K=0;
              }
              return sum + K;
            },0);
          //  console.log(sum);
            ProjectWiseCount.push({"count":sum,"project":Pname})
           // console.log("ProjectList ProjectWiseCount==",ProjectWiseCount)

          });

          this.setState({
            AgeTableDate:finalResult,
            PieChartData:PieChartData,
            loading:false,
            ProjectWiseCount:ProjectWiseCount
          });
          // console.log("ProjectList ProjectWiseCount==",ProjectWiseCount)

        })
  };
  showModal = (id,Data) => {
      console.log("id=",id)
    console.log("Data=",Data)

    this.setState({
      // showViewModal: true,
      AgeReportID:id,
      AgeReportData:Data,
      visible:true,
    });
   // this.props.actions.showAgeModal();
   //  this.props.actions.showCreatModal();
  };
  handleCancel = () => {
      this.setState({
        visible:false,
      })
  };

  render() {
    const columns2 = []

    columns2.push({
          title: 'Ticket Age',
          dataIndex: 'TicketAge',
          key: 'TicketAge',
          fixed: 'left',
          width: 100,
            render: (record) =>
                <>
                <p style={{fontWeight:550}}> {record}</p>
                </>
    },
        );



    if(this.state.AgeTableDate.length>0){
    this.state.ProjectList.forEach(function(x){
      columns2.push(
          {
            title: x.projectName.split(/\s/).join(''),
            dataIndex: x.projectName.split(/\s/).join(''),
            key: x.projectName.split(/\s/).join(''),
            width: 200,
              render: (record) =>
                  <>

                      {record !=undefined?
                      <p style={{fontWeight:550,color:'#ff9800'}}> {record}</p>
                          :
                          <p style={{fontWeight:550,color:'#ff9800'}}>---</p>}
                  </>
          }
      )
    })}
    columns2.push(
        {
          title: 'Action',
          key: 'action',
          width:150,
          align:'center',
          fixed: 'right',

          render: (record) =>
              <>
                  <Button type="link" icon={<EyeTwoTone />}    style={{fontSize: '6px', border: 'none'}}
                          onClick={() =>this.showModal(
                              record.id,
                              record.Data,
                          )}
                  />
              </>
        },

    );
    const ViewColumns = [

      {
        title: 'Project',
        dataIndex: 'Project',
        key: 'Project',
        fixed: 'left',
        width: 150,
        render: (text, row) => <a  style={{fontWeight:550,color:'#009688'}}> {row[13]} </a>
      },
      {
        title: 'Key',
        dataIndex: 'key',
        key: 'key',
        width: 100,
        render: (text, row) => <a> {row[0]} </a>
      },
      {
        title: 'CreatedMonthYear',
        dataIndex: 'created_month_year',
        key: 'created_month_year',
        width: 170,
        render: (text, row) => <a> {row[1]} </a>
      },{
        title: 'CreatedDate',
        dataIndex: 'created_date',
        key: 'created_date',
        width: 175,
        render: (text, row) => <a> { moment(row[2]).format('MM-DD-YYYY HH:mm:ss')} </a>
      },{
        title: 'CreatedDay',
        dataIndex: 'created_day',
        key: 'created_day',
        width: 120,
        render: (text, row) => <a> {row[3]} </a>
      },{
        title: 'onShift/Call',
        dataIndex: 'onShift/call',
        key: 'onShift/call',
        width: 150,
        render: (text, row) => <a>
            {row[4] === "ON_CALL" ?
                <Tag color="magenta">  {row[4]} </Tag>
                :
                <Tag color="gold">  {row[4]} </Tag>
            }

        </a>
      },{
        title: 'CreatedTime',
        dataIndex: 'CreatedTime',
        key: 'CreatedTime',
        width: 150,
        render: (text, row) => <a> {row[5]} </a>
      },{
        title: 'CreatorName',
        dataIndex: 'CreatorName',
        key: 'CreatorName',
        width: 175,
            render: (text, row) => <a>
                {row[6] === "PagerDuty" ?
                    <Tag color="green">  {row[6]} </Tag>
                    :
                    <a> {row[6]} </a>
                }

            </a>
      },{
        title: 'CreatorName2',
        dataIndex: 'CreatorName2',
        key: 'CreatorName2',
        width: 150,
            render: (text, row) => <a>
                {row[7] === "Proactive" ?
                    <Tag color="purple">  {row[7]} </Tag>
                    :
                    <Tag color="orange">  {row[7]} </Tag>
                }

            </a>
      },{
        title: 'CurrentAssigneeName',
        dataIndex: 'CurrentAssigneeName',
        key: 'CurrentAssigneeName',
        width: 200,
        render: (text, row) => <a> {row[8]} </a>
      },{
        title: 'CurrentStatus',
        dataIndex: 'CurrentStatus',
        key: 'CurrentStatus',
        width: 150,
        render: (text, row) => <a> {row[9]} </a>
      },{
        title: 'IssueType',
        dataIndex: 'IssueType',
        key: 'IssueType',
        width: 150,
            render: (text, row) => <a>
                {row[10] === "Incident" ?
                    <Tag color="red">  {row[10]} </Tag>
                    :
                    row[10] === "Change" ?
                    <Tag color="cyan">  {row[10]} </Tag>
                        :
                        <Tag color="geekblue">  {row[10]} </Tag>
                }

            </a>
      },{
        title: 'Priority',
        dataIndex: 'Priority',
        key: 'Priority',
        width: 150,
        render: (text, row) => <a> {row[11]} </a>
      },{
        title: 'Priority2',
        dataIndex: 'Priority2',
        key: 'Priority2',
        width: 150,
        render: (text, row) => <a> {row[12]} </a>
      },{
        title: 'Summary',
        dataIndex: 'Summary',
        key: 'Summary',
        width: 250,
        render: (text, row) => <a> {row[14]} </a>
      },{
        title: 'Updated',
        dataIndex: 'Updated',
        key: 'Updated',
        width: 175,
        render: (text, row) => <a> { moment(row[15]).format('MM-DD-YYYY HH:mm:ss')} </a>
      },{
        title: 'CreatedAge',
        dataIndex: 'CreatedAge',
        key: 'CreatedAge',
        width: 150,
        render: (text, row) => <a> {row[17]} </a>
      },{
        title: 'UpdatedAge',
        dataIndex: 'UpdatedAge',
        key: 'UpdatedAge',
        width: 150,
        render: (text, row) => <a> {row[18]} </a>

      },
    ];


    return (
      <div className="pulse-ageing-dashboard">
        <Card bordered={false} style={{backgroundColor: 'rgb(179 208 236)'}}>
          <div className="ant-row">
            <div className="ant-col ant-col-xs-24 ant-col-xl-4 ">
              <Select
                  mode="multiple"
                  style={{ width: '98%' }}
                  placeholder="Select Project"
                  defaultValue={[]}
                  onChange={this.handleSelectProjectChange}
              >
                {this.state.ProjectList.map((x)=> <Option value={x.projectName}>{x.projectName}</Option>)}
              </Select>
            </div>
            <div className="ant-col ant-col-xs-24 ant-col-xl-4">
              <RangePicker style={{ width: '98%' }} disabledDate={this.disabledDate} defaultValue={[this.state.startDate, this.state.endDate]} onChange={this.getDateChange}/>
            </div>
            <div className="ant-col ant-col-xs-24 ant-col-xl-4">
              <Select
                  mode="multiple"
                  style={{ width: '98%' }}
                  placeholder="Select Status"
                  defaultValue={[]}
                  onChange={this.handleSelectStatusChange}
              >
                {this.state.TicketStatusList.map((x)=> <Option value={x.ticketStatus}>{x.ticketStatus}</Option>)}

              </Select>
            </div>
            <div className="ant-col ant-col-xs-24 ant-col-xl-4">
              <Select
                  mode="multiple"
                  style={{ width: '98%' }}
                  placeholder="Select Age"
                  defaultValue={[]}
                  onChange={this.handleSelectAgeNameChange}
              >
                {this.state.AgeingNameList.map((x)=> <Option value={x.ageName}>{x.ageName}</Option>)}

              </Select>
            </div>
            <div className="ant-col ant-col-xs-24 ant-col-xl-4">
              <Select
                  mode="multiple"
                  style={{ width: '98%' }}
                  placeholder="Select Issue Type"
                  defaultValue={[]}
                  onChange={this.handleSelectAgeingIssueTypeChange}
              >
                {this.state.AgeingTypeIssueList.map((x)=> <Option value={x.issueName}>{x.issueName}</Option>)}

              </Select>
            </div>
            <div className="ant-col ant-col-xs-24 ant-col-xl-4">
              {window.innerWidth > 768 ?
                  <Button loading={this.state.loading} type="primary" icon={<SearchOutlined/>}
                          onClick={this.submitSearchData}>
                    Search
                  </Button> :

                  <Button   style={{ marginTop: 10 }} loading={this.state.loading} type="primary" icon={<SearchOutlined/>}
                            onClick={this.submitSearchData}>
                    Search
                  </Button>
              }


            </div>
          </div>
        </Card>
        <Divider/>
        <div>
          <Skeleton loading={this.state.loading} active paragraph={{ rows: 5 } }>
            <Card style={CardStylebackground}  hoverable={true} bordered={true}>
                {this.state.AgeTableDate.length>0?
          <Table columns={columns2} dataSource={this.state.AgeTableDate} bordered  size="small" scroll={{ x: 1500,}}/>
          :<Empty/>}
            </Card>
          </Skeleton>
          <Divider/>


          <div>

            <Row>
              <Skeleton loading={this.state.loading} active paragraph={{ rows: 5 } }>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Card style={CardStylebackground}  hoverable={true} bordered={true}>
                  <TextLoop mask >
                    <div style={{fontWeight:850,color: '#353535'}}>Age wise Count</div>
                    <div style={{fontWeight:850,color: '#353535'}}>Age wise Count </div>
                  </TextLoop>
                {this.state.PieChartData.length>0?
                    <PieChart
                        height={400}
                        data={this.state.PieChartData}
                        radius={0.8}
                        angleField='AgeCount'
                        colorField='TicketAge'
                        label={{
                          visible: true,
                          type: 'outer',
                          offset: 20,
                        }}
                    />:<Empty/>}
                </Card>
              </Col>
              </Skeleton>
              <Skeleton loading={this.state.loading} active paragraph={{ rows: 5 } }>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>

                <Card style={CardStylebackground}  hoverable={true} bordered={true} >
                  <TextLoop mask >
                    <div style={{fontWeight:850,color: '#353535'}}>Project wise Count</div>
                    <div style={{fontWeight:850,color: '#353535'}}>Project wise Count </div>
                  </TextLoop>
                  {this.state.AgeTableDate.length>0?
                <Chart height={400} data={this.state.ProjectWiseCount} autoFit

                >
                  <Coordinate transpose />
                  <Interval position="project*count" />
                </Chart>:<Empty/>}
                </Card>
              </Col>
              </Skeleton>
            </Row>
          </div>
              <Modal
                  title="View Ageing Details"
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  width={'80%'}
                  footer={null}
              >
                <Table dataSource={this.state.AgeReportData} columns={ViewColumns} scroll={{ x: 1500,}} pagination={{ pageSize: 50 }}/>

              </Modal>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgeingDashboard);
