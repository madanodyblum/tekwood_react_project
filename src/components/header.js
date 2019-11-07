import React, {Component} from 'react'
import * as authAction  from '../actions/authAction';
import '../assets/css/style.min.css';
import '../assets/css/selectric.css';
import { Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import history from '../history';
import { removeAuth } from '../components/auth';
import { connect } from 'react-redux';
const mapStateToProps = state => ({ 
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    changeLan: (params) =>
        dispatch(authAction.changeLan(params)),
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
                <div className="header__user">
                    <Select
                        name="lan"
                        options={this.state.roles}
                        value={{"label":this.state.selectrollabel,"value":this.state.selectrolvalue}}
                        onChange={val => this.changeLangauge(val)}
                    />
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{color:"#000000"}}>
                            Johan Boerema
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.logOut}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <img src={require("../assets/images/avatar.jpg")} alt="User avatar" className="header__user-img"/>
                </div>
            </header>
        </div>
      )
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Header);
