import{a as e,c as t,d as n,i as r,l as i,m as a,n as o,o as s,p as c,r as l,s as u,t as d,u as f}from"./mainLogic-Dzjr-o7S.js";a(),c(),f(),t();var p=new URLSearchParams(window.location.search);window.urlParams=p;var m=p.get(`userId`);window.id=m,e(),h(),g();function h(){i(!0),n.get(`${d}/users/${m}`).then(e=>{let t=e.data.data;document.getElementById(`main-info-email`).innerHTML=t.email,document.getElementById(`main-info-name`).innerHTML=t.name,document.getElementById(`main-info-username`).innerHTML=t.username,document.getElementById(`posts-count`).innerHTML=t.posts_count,document.getElementById(`comments-count`).innerHTML=t.comments_count,document.getElementById(`header-image`).src=l(t.profile_image),document.getElementById(`name-posts`).innerHTML=`${t.name}'s Posts`}).catch(e=>{if(e.response){let t=e.response.data.message;s(`postErrorToast`,t)}}).finally(()=>{i(!1)})}window.getUser=h;function g(){i(!0),n.get(`${d}/users/${m}/posts`).then(e=>{let t=e.data.data;document.getElementById(`user-posts`).innerHTML=``;for(let e of t){let t=u(),n=t!=null&&t.id==e.author.id,i=``;n&&(i=`
                <div style="position: absolute;right: 10px;top: 10px; class="edit-btn-show" ">
                    <button class="btn" onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(e))}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>     
                    </button>
                    <button class="btn text-danger" onclick="deletePostBtnClicked('${encodeURIComponent(JSON.stringify(e))}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>    
                    </button>
                </div>
                `);let a=`
            <div id="post" >
                <div class="card shadow">
                    <div class="card-header d-flex align-items-start">
                        <img class="rounded-circle border border-2" src="${l(e.author.profile_image)}" alt="" style="width: 40px;height: 40px;" >
                        <div class="mx-2">
                            <h4 class="d-inline mb-1 fw-semibold">${e.author.username}</h4>
                            <div class="text-secondary mx-1" style="font-size: 10px;">${e.created_at}</div>
                            ${i}
                        </div>
                    </div>
                    <div class="card-body mx-1" onclick="postClicked(${e.id})" style="cursor: pointer;">
                        <img class="w-100 rounded" src="${o(e.image)}" alt="" >
                        <h5 class="mt-2">${r(e.title)}</h5>
                        <p>
                            ${e.body}
                        </p>
                        <hr>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                            </svg>
                            <span>
                                (${e.comments_count}) Comments
                                <span id="post-tags-${e.id}" class="mx-2">
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            `;document.getElementById(`user-posts`).innerHTML+=a;let s=`post-tags-${e.id}`;document.getElementById(s).innerHTML=``;for(let t of e.tags){let e=`
                <button  class="btn btn-sm rounded-5 " style="background-color:gray;color:white;">
                    ${t.name}
                </button>
                `;document.getElementById(s).innerHTML+=e}}}).catch(e=>{if(e.response){let t=e.response.data.message;s(`postErrorToast`,t)}}).finally(()=>{i(!1)})}window.getPosts=g,t();