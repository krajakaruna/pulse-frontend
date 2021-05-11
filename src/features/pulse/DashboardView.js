import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Row, Input, Col, Button, Select, DatePicker, Empty, Divider, Alert, Statistic, Card, Skeleton, Tag, message, Form} from "antd";
import {Chart, Interval, Axis, Tooltip, Coordinate, Legend, View, Annotation, DonutChart, Interaction, getTheme, Point,} from "bizcharts";
import { AudioOutlined ,SearchOutlined,IssuesCloseOutlined, ClockCircleOutlined,UnorderedListOutlined ,ArrowDownOutlined,CheckCircleOutlined    } from '@ant-design/icons';
import { DataView } from '@antv/data-set';

import DataSet from "@antv/data-set";
import axios from "axios";
import moment from 'moment';
import TextLoop from 'react-text-loop';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const { Option } = Select;
const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

const CardStylebackground= {backgroundColor:'rgb(229 238 247)'};


export class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllOpenTickets:[],
      AllClosedTickets:[],
      selectedDateRange:[],
      selectedProject:[],
      selectedStatus:[],
      ProjectList:JSON.parse(localStorage.getItem("projectList")),
      TicketStatusList:[],
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

        loading: false
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

    disabledDate=(current)=> {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }

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
    submitSearchData=()=>{
      var selectDate=null
      if(this.state.selectedDateRange.length>0){
          selectDate=this.state.selectedDateRange
      }else {
          selectDate=[moment(this.state.startDate).format(dateFormat),moment(this.state.endDate).format(dateFormat)]
      }
        var P_name=[]
        P_name.push( JSON.parse(localStorage.getItem("projectList")).map((x)=>x.projectName));
      if(this.state.selectedProject.length>0) {
          var Data = {
              "selectedStatus": this.state.selectedStatus,
              "selectedProject": this.state.selectedProject,
              "selectedDateRange": selectDate,
          }
      }else {
          var Data = {
              "selectedStatus": this.state.selectedStatus,
              "selectedProject": P_name[0],
              "selectedDateRange": selectDate,
          }
      }

        this.setState({
            loading:true
        });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+localStorage.getItem("token")
        };        axios.post(`/api/ticket/get-all`,Data,{headers} )
            .then(res => {
                const allData = res.data;

                if(allData.status){
                //    console.log("GetProjectWise===",allData.data.GetProjectWise)
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

                    // console.log("searrch data Total_All_Issues=",allData.data.Total_All_Issues)
                    // console.log("searrch data Total_Open_P1=",allData.data.Total_Open_P1)
                    // console.log("searrch data Total_All_Open=",allData.data.Total_All_Open)
                    // console.log("searrch data Total_All_Close=",allData.data.Total_All_Close)

                    this.setState({
                        All_Close:allData.data.All_Close,
                        All_Issues:allData.data.All_Issues,
                        All_Open:allData.data.All_Open,
                        Open_P1:allData.data.Open_P1,
                        PD:DP_List,
                        SearchPDData:allData.data.SearchPDData,
                        GetProjectWise:jsonGetProjectWise,
                        GetPriority:jsonGetPriority,
                        loading:false,
                        Total_All_Issues:allData.data.Total_All_Issues,
                        Total_Open_P1:allData.data.Total_Open_P1,
                        Total_All_Open:allData.data.Total_All_Open,
                        Total_All_Close:allData.data.Total_All_Close,

                    });
                    message.success("Dashboard updated ", 3);
                }else {
                    message.error("Something went wrong ", 3);

                    this.setState({
                        loading:false
                    })
                }
            })
    };
    render() {


    const cols = {
      percent: {
        formatter: val => {
          return (val * 100).toFixed(2) + "%";
        }
      },
      value: {
        formatter: val => {
          return (val * 100).toFixed(2) + "%";
        }
      }
    };

        const dv = new DataView();
        dv.source(this.state.GetPriority).transform({
            type: 'percent',
            field: 'value',
            dimension: 'type',
            as: 'percent',
        });

        const dv1 = new DataView();
        dv1.source(this.state.GetPriority).transform({
            type: 'percent',
            field: 'value',
            dimension: 'name',
            as: 'percent',
        });


    return (
      <div className="pulse-dashboard-view " style={{backgroundColor:'#ffffff'}}>
          <Card bordered={false} style={{backgroundColor: 'rgb(179 208 236)'}}>
          <div className="ant-row">
              <div className="ant-col ant-col-xs-24 ant-col-xl-6 ">
                  <Select
                      mode="multiple"
                      style={{ width: '75%' }}
                      placeholder="Select Project"
                      defaultValue={[]}
                      onChange={this.handleSelectProjectChange}
                  >
                      {this.state.ProjectList.map((x)=> <Option value={x.projectName}>{x.projectName}</Option>)}
                  </Select>
              </div>
              <div className="ant-col ant-col-xs-24 ant-col-xl-6">
                  <RangePicker style={{ width: '75%' }} disabledDate={this.disabledDate} defaultValue={[this.state.startDate, this.state.endDate]} onChange={this.getDateChange}/>
              </div>
              <div className="ant-col ant-col-xs-24 ant-col-xl-6">
                  <Select
                      mode="multiple"
                      style={{ width: '75%' }}
                      placeholder="Select Status"
                      defaultValue={[]}
                      onChange={this.handleSelectStatusChange}
                  >
                       {this.state.TicketStatusList.map((x)=> <Option value={x.ticketStatus}>{x.ticketStatus}</Option>)}

                  </Select>
              </div>
              <div className="ant-col ant-col-xs-24 ant-col-xl-6">
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
          {/*<Divider />*/}
          <Card bordered={false} style={{backgroundColor:'#ffffff'}}>
          <div className="ant-row">
              <div className="ant-col ant-col-xs-24 ant-col-xl-14">

                  <TextLoop mask >
                      <div style={{fontWeight:850,color: '#353535'}}> Selected Time Range Stats </div>
                      <div style={{fontWeight:850,color: '#353535'}}>Selected Time Range Stats </div>
                  </TextLoop>
                  <br/>
                  <br/>
                  <Skeleton loading={this.state.loading} active paragraph={{ rows: 3 } }>

                      <Row gutter={16}>
                          <Col span={6}>
                              <Card style={CardStylebackground} hoverable={true} bordered={true}>
                                  <Statistic
                                      title={<h4 style={{ color: 'rgb(150 127 127)'}}>Total Issues</h4>}
                                      value={this.state.All_Issues[0]}
                                      //   precision={2}
                                      valueStyle={{ color: 'rgb(150 127 127)' }}
                                      prefix={<ClockCircleOutlined />}
                                      //suffix="%"

                                  />
                              </Card>
                          </Col>
                          <Col span={6}>

                              <Card style={CardStylebackground} hoverable={true} bordered={true}>
                                  <Statistic
                                      title={<h4 style={{ color: '#089f08'}}>Closed</h4>}
                                      value={this.state.All_Close[0]}
                                      //    precision={2}
                                      valueStyle={{ color: '#089f08' }}
                                      prefix={<CheckCircleOutlined  />}
                                      // suffix="%"
                                  />
                              </Card>
                          </Col>
                          <Col span={6}>
                              <Card style={CardStylebackground} hoverable={true} bordered={true}>
                                  <Statistic
                                      title={<h4 style={{ color: '#f3a011'}}>Open</h4>}

                                      value={this.state.All_Open[0]}
                                      //   precision={2}
                                      valueStyle={{ color: '#f3a011' }}
                                      prefix={<UnorderedListOutlined /> }
                                      //  suffix="%"
                                  />
                              </Card>
                          </Col>
                          <Col span={6}>
                              <Card style={CardStylebackground} hoverable={true} bordered={true}>
                                  <Statistic
                                      title={<h4 style={{ color: '#ca181b'}}>Open P1</h4>}
                                      value={this.state.Open_P1[0]}
                                      //   precision={2}
                                      valueStyle={{ color: '#ca181b' }}
                                      prefix={<IssuesCloseOutlined />}
                                      //  suffix="%"
                                  />
                              </Card>
                          </Col>
                      </Row>
                  </Skeleton>
                  <Divider/>

                          <TextLoop mask>
                              <div style={{fontWeight:850,color: '#353535'}}>Life Time Stats </div>
                              <div style={{fontWeight:850,color: '#353535'}}>Life Time Stats </div>
                          </TextLoop>

                  <br/>
                  <br/>
                  <Skeleton loading={this.state.loading} active paragraph={{ rows: 3 } }>
                  <Row gutter={16}>
                      <Col span={6}>
                          <Card style={CardStylebackground}  hoverable={true} bordered={true}>
                              <Statistic
                                  title={<h4 style={{ color: 'rgb(150 127 127)'}}>Total Issues</h4>}
                                  value={this.state.Total_All_Issues[0]}

                                  //   precision={2}
                                  valueStyle={{ color: 'rgb(150 127 127)' }}
                                 prefix={<ClockCircleOutlined />}
                                  //suffix="%"

                              />
                          </Card>
                      </Col>
                      <Col span={6}>
                          <Card style={CardStylebackground} hoverable={true} bordered={true}>
                              <Statistic
                                  title={<h4 style={{ color: '#089f08'}}>Closed</h4>}
                                  value={this.state.Total_All_Close[0]}
                              //    precision={2}
                                  valueStyle={{ color: '#089f08' }}
                                 prefix={<CheckCircleOutlined  />}
                                 // suffix="%"
                              />
                          </Card>
                      </Col>
                      <Col span={6}>
                          <Card style={CardStylebackground} hoverable={true} bordered={true}>
                              <Statistic
                                  title={<h4 style={{ color: '#f3a011'}}>Open</h4>}
                                  value={this.state.Total_All_Open[0]}
                               //   precision={2}
                                  valueStyle={{ color: '#f3a011', }}
                                 prefix={<UnorderedListOutlined /> }
                                //  suffix="%"


                                  />

                          </Card>
                      </Col>
                      <Col span={6}>
                          <Card style={CardStylebackground} hoverable={true} bordered={true}>
                              <Statistic
                                  title={<h4 style={{ color: '#ca181b'}}>Open P1</h4>}
                                  value={this.state.Total_Open_P1[0]}

                                  //   precision={2}
                                  valueStyle={{ color: '#ca181b' }}
                                  prefix={<IssuesCloseOutlined />}
                                //  suffix="%"
                              />
                          </Card>
                      </Col>
                  </Row>
                  </Skeleton>

              </div>
              <div className="ant-col ant-col-xs-24 ant-col-xl-10">
                  <center>
                              <TextLoop mask>
                                  <div style={{fontWeight:850,color: '#353535'}}>Reactive Vs Proactive</div>
                                  <div style={{fontWeight:850,color: '#353535'}}>Reactive Vs Proactive</div>
                              </TextLoop>
                      <br/>
                      <br/>
                  </center>

                  <Skeleton loading={this.state.loading} active paragraph={{ rows: 3 } }>
                    <Card style={{marginLeft:50,marginRight:50,...CardStylebackground}} hoverable={true} bordered={true}>
                        {this.state.SearchPDData.length>0 ?
                            <center>
                                <Chart padding="auto" height={275} data={this.state.PD} scale={cols} autoFit>
                                    <Coordinate type="theta" radius={0.75} />
                                    <Tooltip showTitle={false} />
                                    <Axis visible={false} />
                                    <Interval
                                        position="percent"
                                        adjust="stack"
                                        //   color="item"
                                        color={['item', ['#089cb0', '#1fe711', '#7b2cbf',
                                            '#59a5d8', '#86d03c','#ffd400','#c6d2ed',
                                            '#73877b','#d84727']]}
                                        style={{
                                            lineWidth: 2,
                                            stroke: '#fff',

                                        }}

                                        label={['*', {
                                            content: (data) => {
                                                return `${data.item}: ${data.percent.toFixed(1) * 100}%`;
                                            },style: {
                                                fill: "#46554c",
                                            },
                                        }]}
                                    />
                                </Chart>
                            </center>:
                            <div>
                                <Empty />
                            </div>
                        }
                    </Card>

                  </Skeleton>
              </div>
          </div>

          </Card>


              <div className="ant-row">
                  <div className="ant-col ant-col-xs-24 ant-col-xl-12">
                      <center>

                                  <TextLoop mask>
                                      <div  style={{fontWeight:850,color: '#353535'}}>Project Wise Ticket For The Current Month</div>
                                      <div  style={{fontWeight:850,color: '#353535'}}>Project Wise Ticket For The Current Month</div>
                                  </TextLoop>

                          <br/>
                          <br/>
                      </center>
                      <Skeleton loading={this.state.loading} active paragraph={{ rows: 5 } }>
                          <Card bordered={false}  style={{...CardStylebackground,marginLeft:50,marginRight:50}} hoverable={true} bordered={true}>
                          {this.state.GetPriority.length>0?
                              <Chart
                                  height={400}
                                  data={dv.rows}
                                  autoFit
                                  scale={{
                                      percent: {
                                          formatter: (val) => {
                                              val = (val * 100).toFixed(2) + '%';
                                              return val;
                                          },
                                      }
                                  }}
                              >
                                  <Coordinate type="theta" radius={0.5} />
                                  <Axis visible={false} />
                                  <Legend visible={false} />
                                  <Tooltip showTitle={false} />
                                  <Interval
                                      position="percent"
                                      adjust="stack"
                                   //   color="type"
                                      color={['type', [ '#00a896',
                                          '#02c39a', '#86d03c','#ffd400']]}
                                      element-highlight
                                      style={{
                                          lineWidth: 1,
                                          stroke: '#fff',
                                      }}
                                      label={['type', {
                                          offset: -10,
                                      },{style: {
                                              fill: "#f5f3f3",

                                          },}]}
                                  />
                                  <View data={dv1.rows}>
                                      <Coordinate type="theta" radius={0.75} innerRadius={0.5 / 0.75} />
                                      <Interval
                                          position="percent"
                                          adjust="stack"
                                          color={['name', ['#007200', '#e37718', '#7b2cbf',
                                              '#59a5d8', '#86d03c','#ffd400','#46554c',
                                              '#73877b','#d84727']]}                                          element-highlight
                                          style={{
                                              lineWidth: 2,
                                              stroke: '#fff',
                                          }}

                                          label={['name', {
                                              offset: -10,
                                          },{style: {
                                                  fill: "#46554c",

                                              },}]}
                                      />
                                  </View>
                              </Chart>:<Empty/>}
                          </Card>
                      </Skeleton>
                  </div>
                  <div className="ant-col ant-col-xs-24 ant-col-xl-12">
                      <center>

                                  <TextLoop mask>
                                      <div style={{fontWeight:850,color: '#353535'}}>Priority Wise Ticket For The Current Month</div>
                                      <div  style={{fontWeight:850,color: '#353535'}}>Priority Wise Ticket For The Current Month</div>
                                  </TextLoop>

                          <br/>
                          <br/>
                      </center>
                      <Skeleton loading={this.state.loading} active paragraph={{ rows: 5 } }>
                          <Card bordered={false}  style={{...CardStylebackground,marginLeft:50,marginRight:50}} hoverable={true} bordered={true}>
                          {this.state.GetPriority.length>0?



                              <Chart height={400} padding="auto" data={this.state.GetPriority} autoFit filter={[
                                  ['value', val => val != null] // 图表将会只渲染过滤后的数据
                              ]}>
                                  <Interval
                                      adjust={[
                                          {
                                              type: 'dodge',
                                              marginRatio: 0,

                                          },
                                      ]}
                                      color={['name', ['#007200', '#0496ff', '#ec058e', '#7b2cbf',
                                          '#640d14', '#86d03c','#ffd400','#f35b04',
                                          '#c1121f']]}
                                      position="Priority*value"
                                      size={20}

                                  />
                                  <Tooltip shared />
                                  <Interaction type="active-region" />
                              </Chart>:<Empty/>}
                              </Card>
                      </Skeleton>
                  </div>
              </div>

          <Divider />
          {/*<Card bordered={false}  style={{...CardStylebackground,marginLeft:50,marginRight:50}} hoverable={true} bordered={true}>*/}
          {/*<div className="ant-row">*/}
          {/*        <div className="ant-col ant-col-xs-24 ant-col-xl-24">*/}
          {/*            <center>*/}
          {/*                    <TextLoop mask>*/}
          {/*                        <div style={{fontWeight:850,color: '#353535'}}>Project Wise</div>*/}
          {/*                        <div style={{fontWeight:850,color: '#353535'}}>Project Wise</div>*/}
          {/*                    </TextLoop>*/}

          {/*            <br/>*/}
          {/*            <br/>*/}
          {/*                <Skeleton loading={this.state.loading} active paragraph={{ rows: 5 } }>*/}
          {/*                    {this.state.GetProjectWise.length>0?*/}
          {/*                        <Chart height={500} padding="auto" data={this.state.GetProjectWise}  autoFit filter={[*/}
          {/*                            ['Total', val => val != null]*/}
          {/*                        ]}>*/}
          {/*                            <Interval*/}
          {/*                                adjust={[*/}
          {/*                                    {*/}
          {/*                                        type: 'dodge',*/}
          {/*                                        marginRatio: 0,*/}
          {/*                                    },*/}
          {/*                                ]}*/}
          {/*                                // color="Name"*/}
          {/*                                color={['Name', ['#17f517', '#0496ff', '#ec058e', '#7b2cbf',*/}
          {/*                                    '#640d14', '#86d03c','#ffd400','#f35b04',*/}
          {/*                                    '#c1121f']]}*/}

          {/*                                position="Name*Total"*/}
          {/*                                size={50}*/}
          {/*                                label={['Name', {style: {*/}
          {/*                                        fill: "#46554c",*/}

          {/*                                    },}]}*/}
          {/*                            />*/}
          {/*                            <Tooltip shared />*/}
          {/*                            <Interaction type="active-region" />*/}
          {/*                        </Chart>*/}
          {/*                        :*/}
          {/*                        <center>*/}
          {/*                            <Empty/>*/}
          {/*                        </center>*/}

          {/*                    }*/}
          {/*                </Skeleton>*/}
          {/*            </center>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*</Card>*/}

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
)(DashboardView);
