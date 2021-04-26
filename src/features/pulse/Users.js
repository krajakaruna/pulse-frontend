import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import {
    Tag,
    Table,
    Divider,
    Popconfirm,
    Modal,
    Button,
    Card, Avatar,
    Badge,
    Space,
    Tooltip,
    Form,
    Input,
    Select,

    Col,
    Row,
    Drawer, Checkbox, message, Skeleton, Menu
} from 'antd';
import {
    DeleteTwoTone,

    EditTwoTone, EyeTwoTone, LeftOutlined,
    PlusOutlined,
    SafetyCertificateTwoTone,
    UnlockOutlined,

} from '@ant-design/icons';
import axios from "axios";
import {Link} from "react-router-dom";
import UserPasswordChange from "./UserPasswordChange";
import UserCreat from "./UserCreat";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const { Meta } = Card;

export class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText:'',
            searchedColumn:'',
            statusColor:String,
            visible1: false,
            visible2: false,
            visible: false,
            id: [],
            TableData:[],
            ProjectList:[],
            RoleList:[],
            UserIdData:[],
            loading: false,
            showViewModal: false,
            ProjectListId: false,
            filteredInfo: null,
            sortedInfo: null,

        }

    }


    showChangePasswordModal = (id) => {

        this.props.actions.showViewModal();
        this.setState({
            id:id,

        });

    };
    CreatNew = (id) => {
        //  console.log("created id="+id)
        this.setState({
            id:id,
            UserIdData:null,

        });
          if(id!=null){
              const payload={
                  "userId":id,
              }
              const headers = {
                  'Content-Type': 'application/json',
                  'Authorization': "Bearer "+localStorage.getItem("token")
              };
              axios.post(`/user/get-user`,  payload,{headers})
                  .then(res => {
                      const allData = res.data;
                    //  console.log("üser data=====",allData)
                      if(allData.status){
                          this.setState({
                              UserIdData:allData.data[0],
                              loading:false
                          })
                         this.props.actions.showCreatModal();
                      }
                  })
          }else {
              this.props.actions.showCreatModal();
          }



    };

    InActiveUser = (id) => {
         // console.log("created id="+id)
        this.setState({
            loading:true
        })
          if(id!=null){
              const payload={
                  "userId":id,
                  "modifiedUserId":localStorage.getItem("userId")

              }
              const headers = {
                  'Content-Type': 'application/json',
                  'Authorization': "Bearer "+localStorage.getItem("token")
              };
              axios.post(`/user/delete-user`,  payload,{headers} )
                  .then(res => {
                      const allData = res.data;
                     // console.log("üser delete=====",allData)
                      if(allData.status){
                          this.getUserDetails();
                        //  this.getProjectRoleList();
                          message.success(allData.message, 5);
                          this.setState({
                              loading:false
                          })
                      }
                  })
          }
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onFinish = (values: any) => {
      //  console.log("sumbitdata",values)

    }

    showModal = (id,ProjectList) => {
     //   console.log("id=",id)
       // console.log("ProjectList=",ProjectList)
        this.setState({
            showViewModal: true,
            ProjectListId:ProjectList
        });
    };

    handleCancel = e => {
      //  console.log(e);
        this.setState({
            showViewModal: false,
        });
    };
    static propTypes = {
        pulse: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
      };
    componentWillMount() {
        this.getUserDetails();
        this.getProjectRoleList();
    }
    getUserDetails(){
      //  console.log("role==",localStorage.getItem("role"))
       // console.log("userName==",localStorage.getItem("userName"))
        const payload={
            "username": localStorage.getItem("userName"),
            "role":localStorage.getItem("role")
        }
        this.setState({
            loading:true
        })
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+localStorage.getItem("token")
        };
        axios.post(`/user/get-userby-id`,  payload,{headers} )
            .then(res => {
                const allData = res.data;
         //   console.log("üser data=====",allData)
                if(allData.status){
                    this.setState({
                        TableData:allData.data,
                        loading:false
                    })

                }else {
                    this.setState({
                        loading:false
                    })
                }
            })

    }

    getProjectRoleList(){
        const payload={
            "username": localStorage.getItem("userName"),
        };
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+localStorage.getItem("token")
        };
        axios.post(`/user/get-projectRole`,payload,{headers} )
            .then(res => {
                const allData = res.data;
              //  console.log(" hey allData=",allData)
                // console.log("res closed ==", allData)
                if(allData.status){
                    this.setState({
                        ProjectList:allData.data.ProjectList,
                        RoleList:allData.data.RoleList
                    })
                }else {
                }

            });

    }
    handleChange = (pagination, filters, sorter) => {
      //  console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    clearFilters = () => {
        this.setState({ filteredInfo: null });
    };
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
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
          ...this.getColumnSearchProps('name'),
          filteredValue: filteredInfo.name || null,
          onFilter: (value, record) => record.name.includes(value),
          sorter: (a, b) => a.name.length - b.name.length,
          sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
          ellipsis: true,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
          width: 200,
          filteredValue: filteredInfo.email || null,
          onFilter: (value, record) => record.email.includes(value),
          sorter: (a, b) => a.email.length - b.email.length,
          sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
          ellipsis: true,
      },
      {
        title: 'Designation',
        dataIndex: 'designation',
        key: 'designation',
          width: 200,
          filteredValue: filteredInfo.designation || null,
          onFilter: (value, record) => record.designation.includes(value),
          sorter: (a, b) => a.designation.length - b.designation.length,
          sortOrder: sortedInfo.columnKey === 'designation' && sortedInfo.order,
          ellipsis: true,
      },
       {
              title: 'CreatedBy',
              dataIndex: 'createBy',
              key: 'createBy',
           filteredValue: filteredInfo.createBy || null,
           onFilter: (value, record) => record.createBy.includes(value),
           sorter: (a, b) => a.createBy.length - b.createBy.length,
           sortOrder: sortedInfo.columnKey === 'createBy' && sortedInfo.order,
           ellipsis: true,
          },
       {
        title: 'CreatedDate',
        dataIndex: 'createdDate',
        key: 'createdDate',

      },
      {
        title: 'Role',
        key: 'role',
        dataIndex: 'role',
          filters: [
              { text: "admin", value: "admin" },
              { text: "client", value: "client" },
          ],
          filteredValue: filteredInfo.role || null,
          onFilter: (value, record) => record.role.includes(value),
          sorter: (a, b) => a.role.length - b.role.length,
          sortOrder: sortedInfo.columnKey === 'role' && sortedInfo.order,
          ellipsis: true,

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
              return <Tag color={statusColor}>{statusName}</Tag>;

          } else if(status === 0) {
            statusName = 'Inactive';
            statusColor = '#f50';
              return <Tag color={statusColor}>{statusName}</Tag>;
          }
        },

      },
       {
              title: 'ModifiedBy',
              dataIndex: 'modifiedBy',
              key: 'modifiedBy',
           filteredValue: filteredInfo.modifiedBy || null,
           onFilter: (value, record) => record.modifiedBy.includes(value),
           sorter: (a, b) => a.modifiedBy.length - b.modifiedBy.length,
           sortOrder: sortedInfo.columnKey === 'modifiedBy' && sortedInfo.order,
           ellipsis: true,

          },
       {
              title: 'ModifiedDate',
              dataIndex: 'modifiedDate',
              key: 'modifiedDate',


          },
      {
        title: 'Action',
        key: 'action',
         width:150,
          align:'center',
          fixed: 'right',
        render: (record) =>

            <>

                {localStorage.getItem("features").includes("User_DetailsView") ?

                <Tooltip title='View'>
                    <Button type="link" icon={<EyeTwoTone />}    style={{fontSize: 16, border: 'none'}} onClick={() =>this.showModal(
                        record.id,
                        record.ProjectList
                    )}
                    />

                </Tooltip>:null}
                {localStorage.getItem("features").includes("User_Password") ?

                <Tooltip title='Change Password'>
                    <Button type='link' icon={<UnlockOutlined />}
                           onClick={() => this.showChangePasswordModal(record.id)}    style={{fontSize: 16, border: 'none'}}/>
                </Tooltip>:null}
                {localStorage.getItem("features").includes("User_Edit") ?

           <Tooltip title='Edit'>
            <Button type="link" icon={<EditTwoTone/>}    style={{fontSize: 16, border: 'none'}} onClick={() =>this.CreatNew(record.id)}
               />

           </Tooltip>:null}
                {localStorage.getItem("features").includes("User_Delete") ?


                record.status == 1 ?
                    <Tooltip title="InActivate">
                        <Popconfirm title="Do you want to InActivate this user?"
                                    onConfirm={() => this.InActiveUser(record.id)}
                                    placement="topRight"

                                    okText="Yes"
                                    cancelText="No"
                        >
                            <DeleteTwoTone/>
                            {/*<Button type="link" icon={<DeleteTwoTone/>}   ghost style={{fontSize: 16, border: 'none'}} onClick={() => this.InActiveUser(record.id)}*/}


                        </Popconfirm>
                    </Tooltip> :
                    <Tooltip title="Activate">
                        <Popconfirm title="Do you want to Activate this user?"
                                    onConfirm={() => this.InActiveUser(record.id)}
                                    placement="topRight"

                                    okText="Yes"
                                    cancelText="No"
                        >
                            <SafetyCertificateTwoTone />
                            {/*<Button type="link" icon={<DeleteTwoTone/>}   ghost style={{fontSize: 16, border: 'none'}} onClick={() => this.InActiveUser(record.id)}*/}


                        </Popconfirm>
                    </Tooltip>

                :null}
           </>

      },
    ];

    return (
      <div>

          <Skeleton loading={this.state.loading} active paragraph={{ rows: 5 } }>
          {localStorage.getItem("features").includes("User_Create") ?
          <Button type="primary" onClick={() =>this.CreatNew(null)} style={{ marginBottom: 16 }}>
              <PlusOutlined /> New User
          </Button>:null}



              {localStorage.getItem('role') == "client" ?
                  <center>

                      <Card
                          style={{width: 800, backgroundColor: 'rgb(220 227 232)'}}

                          actions={[
                              <Tooltip title={null}>
                                  <h5 style={{color: '#ffffff'}}>Change Password</h5>  <Button type='link' icon={<UnlockOutlined style={{fontSize: '32px', color: '#ffffff'}}/>}
                                          onClick={() => this.showChangePasswordModal(this.state.TableData[0].id)}
                                          style={{fontSize: 16, border: 'none'}}/>
                              </Tooltip>

                          ]}
                      >

                          {this.state.TableData.map((x) => (
                              <div>
                                  <h4>User Name : {x.name}</h4>
                                  <h4>Designation : {x.designation}</h4>
                                  <h4>Created Date : {x.createdDate}</h4>
                                  <h4>Email : {x.email}</h4>
                                  <h4>Project : {x.ProjectList[0].projectName}</h4>

                              </div>

                          ))}


                      </Card>
                      <div>

                      </div>
                  </center>

                  :
                  <Table dataSource={this.state.TableData} columns={columns} pagination={{ pageSize: 10 }} size="small" onChange={this.handleChange} scroll={{ x: 1500,}}/>

              }
          </Skeleton>
          <UserPasswordChange  id={this.state.id} userId={localStorage.getItem('userId')} visible={this.state.visible} />
          <UserCreat  id={this.state.id}
                      userId={localStorage.getItem('userId')}
                      visible={this.state.visible}
                      ProjectList={this.state.ProjectList}
                      RoleList={this.state.RoleList}
                      id={this.state.id}
                      UserIdData={this.state.UserIdData}
          />
          <Modal
              title="View User Details"
              visible={this.state.showViewModal}
             // onOk={this.handleOk}
              onCancel={this.handleCancel}
              width={600}
              footer={null}
          >
              <Row>
                  <Col span={6}>
                      Project List :
                  </Col>
                  { this.state.ProjectListId.length>0?
                  <Col span={18}>
                      {this.state.ProjectListId.map((project) =>(
                       <Tag color="gold">{project.projectName}</Tag>
                      ))}
                  </Col>:null}
                   <Divider/>

              </Row>

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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
