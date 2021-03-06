import * as types from '../constants/actionTypes';
import $ from 'jquery';
import API from '../components/api'
import history from '../history';
import { getUserToken } from '../components/auth';

export const fetchLoginData = (params) => {
    return (dispatch) => {
        dispatch(fetchPageLoading(true));
        var settings = {
            "url": API.Login,
            "method": "POST",
            "headers": {
              "Content-Type": "application/json",
            },
            "data": "{\n\t\"userName\": \""+params.username+"\",\n    \"password\": \""+params.password+"\"\n\n}"
        }
        $.ajax(settings).done(function (response) {
        })
        .then(response => {
            dispatch(fetchPageLoading(false));
            window.localStorage.setItem('tek_AuthUserName', response.claims.UserName);
            window.localStorage.setItem('imperson_flag', "");
            window.localStorage.setItem('tek_auth', response.token);
            window.localStorage.setItem('tek_userID', response.claims.UserId);
            window.localStorage.setItem('tek_role', response.claims.Role);
            window.localStorage.setItem('tek_UserName', response.claims.UserName);
            dispatch(fetchLoginDataSuccess(response.claims));
            history.push('/dashboard')
        })
        .catch(err => {
            dispatch(fetchPageLoading(false));
            dispatch(fetchLoginDataFail());
        });
    };
}

export const fetchPageLoading = (data) => {
    
    return {
        type: types.FETCH_PAGE_LOADING,
        loading:data
    }
}

//login fail
export const fetchLoginDataFail = () => {
    return {
        type: types.FETCH_LOGIN_FAIL,
        error:"Username or Password invalid"
    }
}

//login success
export const fetchLoginDataSuccess = (data) => {
    
    return {
        type: types.FETCH_LOGIN_SUCCESS,
        UserName:data.UserName,
        UserEmail:data.Email,
        Role:data.Role
    }
}
export const fetchLoginAsData = (params) => {
    return (dispatch) => {
        var settings = {
            "url": API.LoginAs+params,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+getUserToken(),
        }
        }
        $.ajax(settings).done(function (response) {
        })
        .then(response => {
            console.log('123123', response.claims)
            window.localStorage.setItem('imperson_flag', true);
            window.localStorage.setItem('tek_impersonauth', response.token);
            window.localStorage.setItem('tek_userID', response.claims.UserId);
            window.localStorage.setItem('tek_role', response.claims.Role);
            window.localStorage.setItem('tek_UserName', response.claims.UserName);
            history.push('/dashboard')
            dispatch(fetchLoginAs("success"));
        });
    };
}
export const fetchLoginAs = (params) => {
    return{
        type: types.FETCH_LOGINAS,
        loginas:params
    }
}
export const fetchgoUserAdmin = (params) => {
    return (dispatch) => {
        var settings = {
            "url": API.LoginAs+params,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+getUserToken(),
        }
        }
        $.ajax(settings).done(function (response) {
        })
        .then(response => {
            window.localStorage.setItem('imperson_flag', '');
            window.localStorage.setItem('tek_userID', response.claims.UserId);
            window.localStorage.setItem('tek_role', response.claims.Role);
            window.localStorage.setItem('tek_UserName', response.claims.UserName);
            history.push('/user')
            dispatch(fetchGoAuthUser("success"));
        });
    };
}
export const fetchGoAuthUser = (params) => {
    return{
        type: types.FETCH_GO_AUTH_USER,
        authUser:params
    }
}
export const dataServerFail = (params) => {
    return (dispatch) => {
        dispatch(fetchDataServerFail(params));
    };
}
//error
export const fetchDataServerFail = (params) => {
    return{
        type: types.FETCH_SERVER_FAIL,
        error:params
    }
}
export const blankdispatch = () => {
    return (dispatch) => {
        dispatch(fetchBlankData());
    };
}
//error
export const fetchBlankData = () => {
    return{
        type: types.FETCH_BlANK_DATA,
        error:""
    }
}
//change lan
export const changeLan = (params) => {
    return (dispatch) => {
        window.localStorage.setItem('tekwoods_lang',  params.value);
        window.localStorage.setItem('tekwoods_label',  params.label);
        dispatch(fetchChangeLan(params.value));
    };
}

export const fetchChangeLan = (value) => {
    return{
        type: types.FETCH_LANGUAGE_DATA,
        lang:value
    }
}


