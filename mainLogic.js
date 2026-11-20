// 1. استيراد ملفات التنسيق (CSS) لضمان عمل التصميمات والألوان
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. استيراد كامل مكتبة الجافاسكربت الخاصة ببوتستراب ووضعها في متغير
import * as bootstrap from 'bootstrap';
import axios from 'axios';

export const BaseUrl="https://tarmeezacademy.com/api/v1";
window.BaseUrl = BaseUrl;

export let currentPage=1;
window.currentPage = currentPage;

export let lastPage=1;
window.lastPage = lastPage;
// UI Functions



export function SetupUI()
{
    const token=localStorage.getItem("token");
    const LoginDiv=document.getElementById("login-nav-div");
    const LogoutDiv=document.getElementById("logout-nav-div");
    const AddPostDiv=document.getElementById("add-post-div")
    if(token == null)
    {//for guest (not logged in)
        if(AddPostDiv != null){
            AddPostDiv.style.setProperty("display","none","important");
        }
        LoginDiv.style.setProperty("display","flex","important");
        LogoutDiv.style.setProperty("display","none","important");
    }else{//for logged in user
        if(AddPostDiv != null){
            AddPostDiv.style.setProperty("display","block","important");
        }
        LoginDiv.style.setProperty("display","none","important");
        LogoutDiv.style.setProperty("display","flex","important");
        const user=getCurrentUser();
        document.getElementById("nav-username").innerHTML=user.username;
        document.getElementById("profile-nav-pic").src=CheckIfNoProfilePic(user.profile_image);
    }
}
window.SetupUI = SetupUI;
// Onclick Functions
export function LoginBtnClicked()
{
    const UserName=document.getElementById("username-input").value;
    const Password=document.getElementById("password-input").value;
    const Params={
        "username":UserName,
        "password":Password
    };
    toggleLoader(true);
    axios.post(`${BaseUrl}/login`,Params)
    .then((response)=>{
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("user",JSON.stringify(response.data.user));
        const modal=document.getElementById("login-modal");
        const ModalInstance=bootstrap.Modal.getInstance(modal);
        ModalInstance.hide();
        SetupUI();
        ShowAlert("loginToast");
    }).catch((error)=>{
        if(error.response){
            const message=error.response.data.message;
            ShowAlert("loginErrorToast",message);
        }
    }).finally(()=>{
        toggleLoader(false); 
    })
}
window.LoginBtnClicked = LoginBtnClicked;
export function LogoutUI()
{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    SetupUI();
    ShowAlert("logoutToast");
}
window.LogoutUI = LogoutUI;

export function registerBtnClicked()
{
    const Name=document.getElementById("register-name-input").value;
    const UserName=document.getElementById("register-username-input").value;
    const Email=document.getElementById("register-email-input").value;
    const Password=document.getElementById("register-password-input").value;
    const ProfilePic=document.getElementById("register-pic-input").files[0];
    
    let formData=new FormData();
    formData.append("name",Name)
    formData.append("username",UserName)
    formData.append("email",Email)
    formData.append("password",Password)
    formData.append("image",ProfilePic)
    const headers={
        "Content-Type":"multipart/form-data"
    }
    toggleLoader(true);
    axios.post(`${BaseUrl}/register`,formData,{
        headers:headers
    })
    .then((response)=>{
        toggleLoader(false);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("user",JSON.stringify(response.data.user));
        const modal=document.getElementById("register-modal");
        const ModalInstance=bootstrap.Modal.getInstance(modal);
        ModalInstance.hide();
        SetupUI();
        ShowAlert("registerToast");
    }).catch((error)=>{
        if(error.response){
            toggleLoader(false);
            const message=error.response.data.message;
            ShowAlert("registerErrorToast",message);
        }
    })
}
window.registerBtnClicked = registerBtnClicked;

export function postClicked(postId)
{
    window.location=`postDetails.html?postId=${postId}`;
}
window.postClicked = postClicked;

export function createNewPostClicked()
{
    let postId = document.getElementById("post-id-input").value;
    let isCreate=postId == null ||postId == "";
    const title=document.getElementById("post-title-input").value;
    const body=document.getElementById("post-body-input").value;
    const image=document.getElementById("post-image-input").files[0];

    let formData=new FormData();
    formData.append("body",body)
    formData.append("title",title)
    formData.append("image",image)

    const token=localStorage.getItem("token");
    const headers={
        // "Content-Type":"multipart/form-data",
        "authorization":`Bearer ${token}`
    };
    let url=``;
    if(isCreate){
        url=`${BaseUrl}/posts`
    }else{
        formData.append("_method","put");
        url=`${BaseUrl}/posts/${postId}`;
    }
    toggleLoader(true);
    axios.post(url,formData,{
        headers:headers
    })
    .then((response)=>{
        ShowAlert("postToast");
        const modal=document.getElementById("post-modal");
        const ModalInstance=bootstrap.Modal.getInstance(modal);
        ModalInstance.hide();
        getPosts();
    }).catch((error)=>{
        if(error.response){
            const message=error.response.data.message;
            ShowAlert("postErrorToast",message);
        }
    }).finally(()=>{
        toggleLoader(false); 
    })

}
window.createNewPostClicked = createNewPostClicked;


export function editPostBtnClicked(postObject)
{
    let post = JSON.parse(decodeURIComponent(postObject));
    document.getElementById('post-id-input').value = post.id;
    document.getElementById('post-modal-title').innerHTML="Edit Post";
    document.getElementById('post-title-input').value = post.title;
    document.getElementById('post-body-input').value = post.body;
    document.getElementById('post-modal-submit-btn').innerHTML = "Update";
    let editPostModal = new bootstrap.Modal(document.getElementById('post-modal'),{});
    editPostModal.toggle();
    getPosts();

}
window.editPostBtnClicked = editPostBtnClicked;


export function addBtnClicked()
{
    document.getElementById('post-id-input').value = "";
    document.getElementById('post-modal-title').innerHTML="Create A New Post";
    document.getElementById('post-modal-submit-btn').innerHTML = "Create";
    document.getElementById('post-title-input').value = "";
    document.getElementById('post-body-input').value = "";
    document.getElementById('post-image-input').value = "";
    let createPostModal = new bootstrap.Modal(document.getElementById('post-modal'),{});
    createPostModal.toggle();
}
window.addBtnClicked = addBtnClicked;


export function deletePostBtnClicked(postObject)
{
    let post = JSON.parse(decodeURIComponent(postObject));
    document.getElementById('delete-post-id-input').value = post.id;
    let deletePostModal = new bootstrap.Modal(document.getElementById('delete-post-modal'),{});
    deletePostModal.toggle();
}
window.deletePostBtnClicked = deletePostBtnClicked;

export function userClicked(userId)
{
    window.location=`profile.html?userId=${userId}`;
}
window.userClicked = userClicked;



export function profileClicked()
{
    const user = getCurrentUser();
    const userId=user.id;
    window.location=`profile.html?userId=${userId}`;
}
window.profileClicked = profileClicked;

// Alert Functions
export function ShowAlert(id,errorText="") {
    const toastElement = document.getElementById(id);
    const toast = new bootstrap.Toast(toastElement, {
        autohide: true,
        delay: 2500
    });
    if(errorText!=""){
        document.getElementById(`${id}Message`).innerHTML=`❌${errorText}`;
        // alert(errorText)
    }
    toast.show();
}
window.ShowAlert = ShowAlert;


export function getCurrentUser()
{
    let user=null;
    const storageUser=localStorage.getItem("user");
    if(storageUser!=null)
    {
        user=JSON.parse(storageUser);
    }
    return user;
}
window.getCurrentUser = getCurrentUser;


// Validation Functions
export function CheckIfNoProfilePic(Pic)
{
    return (typeof Pic == 'string' )? Pic : './profile-pics/male.jpeg'
}
window.CheckIfNoProfilePic = CheckIfNoProfilePic;

export function CheckIfNoPostImage(image)
{
    return (typeof image == 'string' )? image : './post-images/Load.jpg'
}
window.CheckIfNoPostImage = CheckIfNoPostImage;

export function CheckIfValueIsNull(Value)
{
    if(Value!=null)
        return Value
    else
        return ""
}
window.CheckIfValueIsNull = CheckIfValueIsNull;




// Post Functions
export function confirmPostDelete()
{
    const postId = document.getElementById('delete-post-id-input').value;
    const token=localStorage.getItem("token");
    const headers={
        // "Content-Type":"multipart/form-data",
        "authorization":`Bearer ${token}`
    };
    toggleLoader(true);
    axios.delete(`${BaseUrl}/posts/${postId}`,{
        headers:headers
    })
    .then((response)=>{
        const modal=document.getElementById("delete-post-modal");
        const ModalInstance=bootstrap.Modal.getInstance(modal);
        ModalInstance.hide();
        SetupUI();
        getPosts();
        ShowAlert("DeletePostToast");
    }).catch((error)=>{
        if(error.response){
            const message=error.response.data.error_message;
            ShowAlert("postErrorToast",message);
        }
    }).finally(()=>{
        toggleLoader(false); 
    })
}
window.confirmPostDelete = confirmPostDelete;



// Toggle Functions
export function toggleLoader(show=true)
{
    if(show){
        document.getElementById("loader").style.visibility="visible";
    }else{
        document.getElementById("loader").style.visibility="hidden";
    }
}
window.toggleLoader = toggleLoader;



