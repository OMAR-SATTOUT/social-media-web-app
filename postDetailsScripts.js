// 1. استيراد ملفات التنسيق (CSS) لضمان عمل التصميمات والألوان
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. استيراد كامل مكتبة الجافاسكربت الخاصة ببوتستراب ووضعها في متغير
import * as bootstrap from 'bootstrap';
import axios from 'axios';

import {BaseUrl,currentPage,lastPage,SetupUI,LoginBtnClicked,LogoutUI,registerBtnClicked,postClicked,createNewPostClicked,editPostBtnClicked,addBtnClicked,deletePostBtnClicked,userClicked,profileClicked,ShowAlert,getCurrentUser,CheckIfNoProfilePic,CheckIfNoPostImage,CheckIfValueIsNull,confirmPostDelete,toggleLoader} from './mainLogic.js';

export const urlParams=new URLSearchParams(window.location.search);
window.urlParams=urlParams;
export const id=urlParams.get("postId");
window.id=id;

SetupUI();
getPost();
function getPost()
{
    toggleLoader(true);
    axios.get(`${BaseUrl}/posts/${id}`)
    .then((response)=>{
        const post = response.data.data;
        const comments = post.comments;
        const author=post.author;
        document.getElementById("username-span").innerHTML=`${author.username}'s Post`;
        let commentsContent=``;
        for(let comment of comments){
            commentsContent+=`
            <!-- Comment -->
                <div class="p-3" style="background-color: #f8f9fa;">
                    <!-- ProfilePic + Username -->
                    <div class="mt-3">
                        <img src="${CheckIfNoProfilePic(comment.author.profile_image)}" class="rounded-circle" style="width: 30px; height: 30px;" alt="">
                        <b>${comment.author.username}</b>
                    </div>
                    <!--// ProfilePic + Username //-->
                    <!-- Comment's Body -->
                    <div class="mx-5">
                        ${comment.body}
                    </div>
                    <!--// Comment Body //-->
                    
                </div>
            <!--// Comment //-->
            `
        }
        let content=`
        <div id="post">
            <div class="card shadow">
                <div class="card-header d-flex align-items-start">
                    <img class="rounded-circle border border-2" src="${CheckIfNoProfilePic(author.profile_image)}" alt="" style="width: 40px;height: 40px;" >
                    <div class="mx-2">
                        <h4 class="d-inline mb-1 fw-semibold">${author.username}</h4>
                        <div class="text-secondary mx-1" style="font-size: 10px;">${post.created_at}</div>
                    </div>
                </div>
                <div class="card-body mx-1">
                    <img class="w-100 rounded" src="${CheckIfNoPostImage(post.image)}" alt="" >
                    <h5 class="mt-2">${CheckIfValueIsNull(post.title)}</h5>
                    <p>${post.body}</p>
                    <hr>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                        </svg>
                        <span class="text-secondary">
                        (${post.comments_count}) Comments
                        </span>
                    </div>
                </div>
                <div id="comments">
                    ${commentsContent}
                </div>
                <div class="input-group mb-3" id="add-comment-div">
                    <input type="text" class="form-control" placeholder="Add a comment..." id="comment-input">
                    <button class="btn btn-dark" type="button" id="add-comment-btn" onclick="addComment(${post.id})">Add</button>

                </div>
            </div>
        </div>
        `
        document.getElementById("posts").innerHTML=content;
    }).catch((error)=>{
        if(error.response){
            const message=error.response.data.message;
            ShowAlert("postErrorToast",message);
        }
        
    }).finally(()=>{
        toggleLoader(false); 
    })
}
window.getPost = getPost;

export function addComment()
{
    let commentBody=document.getElementById("comment-input").value;
    let params={
        "body":commentBody
    }
    let token=localStorage.getItem("token");
    let url=`${BaseUrl}/posts/${id}/comments`;
    toggleLoader(true);
    axios.post(url,params,{
        headers:{
            "authorization":`Bearer ${token}`
        }
    })
    .then((response)=>{
        getPost();
    }).catch((error)=>{
        if(error.response){
            let errorMessage=error.response.data.message;
            ShowAlert("postErrorToast",errorMessage);
        }
    }).finally(()=>{
        toggleLoader(false); 
    })
}
window.addComment = addComment;



