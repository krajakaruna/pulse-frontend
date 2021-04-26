import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Row, Col, Form, Input, Button, Typography, Select, Checkbox, Space, Tag, message} from 'antd';
import {containsChildrenSubArray} from "enzyme/src/Utils";

const {TextArea} = Input;
const {Title} = Typography;
const{Option} = Select;



export class Role extends Component {
  static propTypes = {
    pulse: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      submitActivated: false,
      role:{
        id:Number,
        name: String,
        description:String,
        feature:[]
      },
      features:[
        {id:1, featureName:'add user'},
        {id:2 , featureName: 'delete user'},
        {id:3, featureName: 'edit user'},
        {id:4, featureName: 'test'},
        {id:5, featureName: 'test2'}
      ],
       roles :[
        {id:1, name:'Super admin', feature:[2]},
        {id:2, name:'admin', feature:[]},
        {id:3, name:'user', feature:[]}
      ],

    }
  }

 

  onFinish = (value) => {
   // console.log('Success:', value);
    message.info('Role created successful')
  };

  onAssignFeature=(values: any)=>{
   // console.log(values.feature)
  }
  
  handleRoleChange=(value)=>{
    const user = this.roles.filter(role=>role.id===value)
   // console.log(user)
    
  }

  renderFeatureChecklist=(features)=>{
    const checkbox= Object.keys(features).map((key)=>

         <Col span={8} key={features[key].id}><Checkbox value={features[key].id}>{features[key].featureName} </Checkbox></Col>
    )
    return checkbox;
  }


  render() {
    const style={
      padding: '0 40px 40px 0',
    }
    const layout={
      labelCol:{ span:8},
      wrapperCol:{span:16}
    }

    const onFeatureChange=(checkedValues)=>{
      if (checkedValues.length===0){
        this.setState({submitActivated: false})
      }else if(checkedValues.length>0){
        this.setState({submitActivated:true})
      }
    }
  
    return (
      <div className="pulse-role">
        <Title level={5}>Add Role</Title>
        <Row gutter={12}>
          <Col className="gutter-row" span={12} key={1}>
          <Form {...layout} name='crate-role'  onFinish={this.onFinish}>
            <Form.Item name='role' label='Role Name' ><Input placeholder='Role name'/> </Form.Item>
            <Form.Item name='desc' label='Description'><TextArea placeholder='Description' autoSize={{minRows:1, maxRows:3}}/></Form.Item>
            <Form.Item name='features' label='Features' valuePropName='checked'><Checkbox.Group onChange={onFeatureChange}><Row>{this.renderFeatureChecklist(this.state.features)}</Row> </Checkbox.Group></Form.Item>
            <Form.Item><Button type='primary' htmlType='submit' disabled={!this.state.submitActivated}>Submit</Button></Form.Item>
          </Form>
          </Col>
          <Col span={12} ></Col>
        </Row>

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
)(Role);
