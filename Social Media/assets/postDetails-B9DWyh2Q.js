import{a as e,c as t,d as n,i as r,l as i,m as a,n as o,o as s,p as c,r as l,t as u,u as d}from"./mainLogic-Dzjr-o7S.js";a(),c(),d(),t();var f=new URLSearchParams(window.location.search);window.urlParams=f;var p=f.get(`postId`);window.id=p,e(),m();function m(){i(!0),n.get(`${u}/posts/${p}`).then(e=>{let t=e.data.data,n=t.comments,i=t.author;document.getElementById(`username-span`).innerHTML=`${i.username}'s Post`;let a=``;for(let e of n)a+=`
            <!-- Comment -->
                <div class="p-3" style="background-color: #f8f9fa;">
                    <!-- ProfilePic + Username -->
                    <div class="mt-3">
                        <img src="${l(e.author.profile_image)}" class="rounded-circle" style="width: 30px; height: 30px;" alt="">
                        <b>${e.author.username}</b>
                    </div>
                    <!--// ProfilePic + Username //-->
                    <!-- Comment's Body -->
                    <div class="mx-5">
                        ${e.body}
                    </div>
                    <!--// Comment Body //-->
                    
                </div>
            <!--// Comment //-->
            `;let s=`
        <div id="post">
            <div class="card shadow">
                <div class="card-header d-flex align-items-start">
                    <img class="rounded-circle border border-2" src="${l(i.profile_image)}" alt="" style="width: 40px;height: 40px;" >
                    <div class="mx-2">
                        <h4 class="d-inline mb-1 fw-semibold">${i.username}</h4>
                        <div class="text-secondary mx-1" style="font-size: 10px;">${t.created_at}</div>
                    </div>
                </div>
                <div class="card-body mx-1">
                    <img class="w-100 rounded" src="${o(t.image)}" alt="" >
                    <h5 class="mt-2">${r(t.title)}</h5>
                    <p>${t.body}</p>
                    <hr>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                        </svg>
                        <span class="text-secondary">
                        (${t.comments_count}) Comments
                        </span>
                    </div>
                </div>
                <div id="comments">
                    ${a}
                </div>
                <div class="input-group mb-3" id="add-comment-div">
                    <input type="text" class="form-control" placeholder="Add a comment..." id="comment-input">
                    <button class="btn btn-dark" type="button" id="add-comment-btn" onclick="addComment(${t.id})">Add</button>

                </div>
            </div>
        </div>
        `;document.getElementById(`posts`).innerHTML=s}).catch(e=>{if(e.response){let t=e.response.data.message;s(`postErrorToast`,t)}}).finally(()=>{i(!1)})}window.getPost=m;function h(){let e={body:document.getElementById(`comment-input`).value},t=localStorage.getItem(`token`),r=`${u}/posts/${p}/comments`;i(!0),n.post(r,e,{headers:{authorization:`Bearer ${t}`}}).then(e=>{m()}).catch(e=>{if(e.response){let t=e.response.data.message;s(`postErrorToast`,t)}}).finally(()=>{i(!1)})}window.addComment=h,t();