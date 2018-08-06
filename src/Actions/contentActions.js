import { FETCH_CONTENTS, NEW_CONTENT, FETCH_CONTENT, EDIT_CONTENT, DELETE_CONTENT } from './types';
import $ from 'jquery';

export const fetchContents = pid => dispatch => {
    
    $.ajax({
        url: global.base_url + "projects/" + pid + "/contents",
        contentType: 'application/json',
        dataType: 'json',
        success: function(contents, statusText, xhr){
            dispatch({
                type: FETCH_CONTENTS,
                payload: contents["data"]
            })
        },
        error: function(xhr, statusText, err){
            console.log(err);
            switch (xhr.status) {
                case 401:
                    alert("Woah There! You are not authorized! Naughty!");
                    break;
                case 403:
                    alert("STOP! You were DENIED!");
                    break;
                case 404:
                    alert("Uh oh! Something seems to have misplaced!");
                    break;
            
                default:
                    break;
            }
        } 
    });
}

export const createContent = (projectId, contentData) => dispatch => {
    let token = "Bearer " + localStorage.getItem("jwt")
    $.ajax({
        url: global.base_url + "projects/" + projectId + "/contents",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(contentData),
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', token)
        },
        success: function(content, statusText, xhr){
            dispatch({
                type: NEW_CONTENT,
                payload: content["data"]
            })
        },
        error: function(xhr, statusText, error){
            console.log(error);
            switch (xhr.status) {
                case 401:
                    alert("Woah There! You are not authorized! Naughty!");
                    break;
                case 403:
                    alert("STOP! You were DENIED!");
                    break;
                case 404:
                    alert("Uh oh! Something seems to have misplaced!");
                    break;
            
                default:
                    break;
            }
        }
    });
}

export const fetchContent = (pid, cid) => dispatch => {
    $.ajax({
        url: global.base_url + "projects/" + pid + "/contents/" + cid,
        contentType: 'application/json',
        dataType: 'json',
        method: 'GET',
        success: function(content, statusText, xhr){
            dispatch({
                type: FETCH_CONTENT,
                payload: content["data"]
            })
        },
        error: function(xhr, statusText, err){
            console.log(err);
            switch (xhr.status) {
                case 401:
                    alert("Woah There! You are not authorized! Naughty!");
                    break;
                case 403:
                    alert("STOP! You were DENIED!");
                    break;
                case 404:
                    alert("Uh oh! Something seems to have misplaced!");
                    break;
            
                default:
                    break;
            }
        } 
    });
}

export const editContent = (pid, cid, post) => dispatch => {
    let token = "Bearer " + localStorage.getItem("jwt")
    $.ajax({
        url: global.base_url + "projects/" + pid + "/contents/" + cid,
        contentType: 'application/json',
        dataType: 'json',
        method: 'PUT',
        data: JSON.stringify(post),
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', token)
        },
        success: function(content, statusText, xhr){
            dispatch({
                type: EDIT_CONTENT,
                payload: content["data"]
            })
        },
        error: function(xhr, statusText, err){
            console.log(err);
            switch (xhr.status) {
                case 401:
                    alert("Woah There! You are not authorized! Naughty!");
                    break;
                case 403:
                    alert("STOP! You were DENIED!");
                    break;
                case 404:
                    alert("Uh oh! Something seems to have misplaced!");
                    break;
            
                default:
                    break;
            }
        } 
    });
}

export const deleteContent = (pid, cid) => dispatch => {
    let token = "Bearer " + localStorage.getItem("jwt")
    $.ajax({
        url: global.base_url + "projects/" + pid + "/contents/" + cid,
        contentType: 'application/json',
        dataType: 'json',
        method: 'DELETE',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', token)
        },
        success: function(content, statusText, xhr){
            alert("Deleted");
            dispatch({
                type: DELETE_CONTENT,
                payload: xhr.status
            })
        },
        error: function(xhr, statusText, err){
            console.log(err);
            switch (xhr.status) {
                case 401:
                    alert("Woah There! You are not authorized! Naughty!");
                    break;
                case 403:
                    alert("STOP! You were DENIED!");
                    break;
                case 404:
                    alert("Uh oh! Something seems to have misplaced!");
                    break;
            
                default:
                    break;
            }
        } 
    });
}