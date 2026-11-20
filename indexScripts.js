// 1. استيراد ملفات التنسيق (CSS) لضمان عمل التصميمات والألوان
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. استيراد كامل مكتبة الجافاسكربت الخاصة ببوتستراب ووضعها في متغير
import * as bootstrap from 'bootstrap';
import axios from 'axios';

import {BaseUrl,currentPage,lastPage,SetupUI,LoginBtnClicked,LogoutUI,registerBtnClicked,postClicked,createNewPostClicked,editPostBtnClicked,addBtnClicked,deletePostBtnClicked,userClicked,profileClicked,ShowAlert,getCurrentUser,CheckIfNoProfilePic,CheckIfNoPostImage,CheckIfValueIsNull,confirmPostDelete,toggleLoader} from './mainLogic.js';

// ======== Infinte Scroll ========= //
window.addEventListener("scroll",()=>{
    const endOfPage=window.innerHeight+window.pageYOffset>=document.body.scrollHeight-5;
    if(endOfPage&&window.currentPage<window.lastPage){
        window.currentPage++;
        getPosts(false,window.currentPage);
    }
})
// ======== // Infinte Scroll // ========= //

SetupUI();
getPosts();
function getPosts(reload=true,page=1)
{
    toggleLoader(true);
    axios.get(`${BaseUrl}/posts?limit=10&page=${page}`)
    .then((response)=>{
        let posts = response.data.data;
        window.lastPage=response.data.meta.last_page;
        if(reload){
        document.getElementById("posts").innerHTML = "";
        }
        for(let post of posts)
        {
            //Show or hide edit button
            let user = getCurrentUser();
            let isMyPost = user != null && user.id == post.author.id;
            let editBtnContent=``;
            if(isMyPost){
                editBtnContent=`
                <div style="position: absolute;right: 10px;top: 10px; class="edit-btn-show" ">
                    <button class="btn" onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>     
                    </button>
                    <button class="btn text-danger" onclick="deletePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>    
                    </button>
                </div>
                `
            }
            let content = `
            <div id="post" >
                <div class="card shadow">
                    <div class="card-header d-flex align-items-start"  onclick="userClicked(${post.author.id})" style="cursor: pointer;">
                        <img class="rounded-circle border border-2" src="${CheckIfNoProfilePic(post.author.profile_image)}" alt="" style="width: 40px;height: 40px;">
                        <div class="mx-2">
                            <h4 class="d-inline mb-1 fw-semibold">${post.author.username}</h4>
                            <div class="text-secondary mx-1" style="font-size: 10px;">${post.created_at}</div>
                        </div>
                    </div>
                    <div>
                        ${editBtnContent}
                    </div>
                    <div class="card-body mx-1" onclick="postClicked(${post.id})" style="cursor: pointer;">
                        <img class="w-100 rounded" src="${CheckIfNoPostImage(post.image)}" alt="" >
                        <h5 class="mt-2">${CheckIfValueIsNull(post.title)}</h5>
                        <p>
                            ${post.body}
                        </p>
                        <hr>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                            </svg>
                            <span>
                                (${post.comments_count}) Comments
                                <span id="post-tags-${post.id}" class="mx-2">
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            `
            document.getElementById("posts").innerHTML += content
            const currentPostTagsId=`post-tags-${post.id}`
            document.getElementById(currentPostTagsId).innerHTML=""
            for(let tag of post.tags)
            {
                let tagsContent =`
                <button  class="btn btn-sm rounded-5 " style="background-color:gray;color:white;">
                    ${tag.name}
                </button>
                `
                document.getElementById(currentPostTagsId).innerHTML+=tagsContent
            }

        }
        
    }).catch((error)=>{
        if(error.response){
        const message=error.response.data.message;
        ShowAlert("postErrorToast",message);
        }
        
    }).finally(()=>{
        toggleLoader(false); 
    })
}
window.getPosts = getPosts;



