import { FETCH_PROJECTS, NEW_PROJECT } from './types';
import $ from 'jquery';

export const fetchProjects = () => dispatch => {
        $.ajax({
            url: global.base_url + "projects",
            contentType: 'application/json',
            dataType: 'json',
            cache: false,
            success: function(projects, statusText, xhr){
                dispatch({
                    type: FETCH_PROJECTS,
                    payload: projects["data"]
                })
            },
            error: function(xhr, statusText, err){
              console.log(xhr.status);
            }
          });
}

export const createProject = (projectData) => dispatch => {
    let token = "Bearer " + localStorage.getItem("jwt")
    $.ajax({
        url: global.base_url + "projects",
        method: 'POST',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', token)
        },
        contentType: 'application/json',
        data: JSON.stringify(projectData),
        success: function(project, statusText, xhr){
            dispatch({
                type: NEW_PROJECT,
                payload: project["data"]
            })
        },
        error: function(xhr, statusText, error){
            console.log(statusText);
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
                    console.log('Uh Oh');
                    break;
            }
        }
    });
}