import React, {Component} from 'react'
import * as authAction  from '../actions/authAction';
import '../assets/css/style.min.css';
import '../assets/css/selectric.css';
import { Dropdown, Button } from 'react-bootstrap';
import Select from 'react-select';
import history from '../history';
import { removeAuth } from '../components/auth';
import { connect } from 'react-redux';
import { trls } from '../components/translate';
import * as Auth from './auth';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const mapStateToProps = state => ({ 
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    changeLan: (params) =>
        dispatch(authAction.changeLan(params)),
    goUserAdmin: (params) =>
        dispatch(authAction.fetchgoUserAdmin(params)),
});
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            roles:[{"value":"en_US","label":"En"},{"value":"nl_BE","label":"Nl"}],
            selectrolvalue:window.localStorage.getItem('lang'),
            selectrollabel:window.localStorage.getItem('label'),
        };
    }
    logOut = () => {
        var removeFlag = removeAuth();
        if(removeFlag){
            history.push('/login')
        }
    }
    changeLangauge = (val) => {
        this.setState({selectrolvalue:val.value, selectrollabel: val.label});
        this.props.changeLan(val)
    }
    backAdminUser = () => {
        confirmAlert({
            title: trls("Confirm"),
            message: trls("Are_you_sure"),
            buttons: [
              {
                label: trls("OK"),
                onClick: () => {
                    this.props.goUserAdmin(Auth.getAuthUserName());
                }
              },
              {
                label: trls("Cancel"),
                onClick: () => {}
              }
            ]
          });
    }
    render () {
      return (
        <div>
                <header className="header">
                    <div className="header__burger-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <a href="/" className="header__logo-mob">
                        <img src={require("../assets/images/appmakerz.svg")} alt="logo"/>
                    </a>
                    <div className="header__controls">
                    <Select
                                name="lan"
                                options={this.state.roles}
                                className="select-lang-class"
                                value={{"label":this.state.selectrollabel,"value":this.state.selectrolvalue}}
                                onChange={val => this.changeLangauge(val)}
                            />
                            {Auth.getImpersonFlag()&&(
                                <Button variant="success" onClick={this.backAdminUser}>{trls('Back_To_Admin')}</Button> 
                            )}
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{color:"#000000"}}>
                                    {Auth.getUserName()}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                <Dropdown.Item onClick={this.logOut}>{trls("LogOut")}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                    </div>
                    <div className="header__user">
                        <span className="header__user-name">
                        </span>
                        <img src={require("../assets/images/avatar.jpg")} alt="User avatar" className="header__user-img"/>
                    </div>
            </header>
        </div>
      )
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Header);
