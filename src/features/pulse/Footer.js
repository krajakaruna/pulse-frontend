import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Divider} from "antd";

export class Footer extends Component {
  static propTypes = {
    pulse: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="pulse-footer">
        <section id="footer">
          <div className="container">
            <div className="row text-center text-xs-center text-sm-left text-md-left">
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h4>Managed Services</h4>
                <ul className="list-unstyled quick-links">
                  <center>
                    <img src={require('../../images/Mitra.png')} style={{height:50,width:150}}/>
                  </center>

                </ul>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h5>Pulse</h5>
                <ul className="list-unstyled quick-links">
                  <li><a href="/"><i
    className="fa fa-angle-double-right"/>Home</a></li>
                  <li><a href="/offers"><i
    className="fa fa-angle-double-right"/>Offers</a></li>
                  <li><a href="/team"><i
    className="fa fa-angle-double-right"/>Team</a></li>
                  <li><a href="/about"><i
    className="fa fa-angle-double-right"/>About</a></li>

                </ul>

              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h5>Contact</h5>
                <ul className="list-unstyled quick-links">
                  <li><a ><i
    className="fa fa-angle-double-right"/> Mitra Innovation – Headquarters
                    New Broad Street House
                    35 New Broad Street
                    London
                    EC2M 1NH</a>
                  </li>

                  <li><a ><i
    className="fa fa-angle-double-right"/> T:+44 (0) 203 908 1977</a>
                  </li>
                  <li><a ><i
    className="fa fa-angle-double-right"/> E: innovate@mitrai.com</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
                <ul className="list-unstyled list-inline social text-center">
                  <li className="list-inline-item"><a ><i
    className="fa fa-facebook"/></a></li>
                  <li className="list-inline-item"><a ><i
    className="fa fa-twitter"/></a></li>
                  <li className="list-inline-item"><a><i
    className="fa fa-instagram"/></a></li>
                  <li className="list-inline-item"><a ><i
    className="fa fa-google-plus"/></a></li>
                  <li className="list-inline-item"><a target="_blank"><i className="fa fa-envelope"></i></a>
                  </li>
                </ul>
              </div>
        <Divider/>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                <p style={{color:'rgb(255 165 0 / 57%)'}}>Copyright © 2021 MST-Pulse. Version: 1.0.0</p>

              </div>

            </div>
          </div>
        </section>
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
)(Footer);
