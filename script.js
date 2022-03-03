const startButton=document.getElementById("startcv")
const stage1=document.querySelector(".stage1")
const message=document.querySelector(".message")
const opacityMore=document.querySelector(".opacity-more")
const stage2=document.querySelector(".stage2")
const stage3=document.querySelector(".stage3")
const previous=document.getElementById("previous")
const next=document.getElementById("next")
const stage4=document.querySelector(".stage4")
const jobToggle=document.querySelector(".toggle")
const forms=document.querySelectorAll("form")
const personal_information=document.querySelector(".personal-information")
var permissionForNextStage=0
const cancel_1=document.getElementById("cancel-1")
const form_2=document.getElementById("form2")
const submit_1=document.getElementById("submit-1")
const cancel_2=document.getElementById("cancel-2")
const form_3=document.getElementById("form3")
const submit_2=document.getElementById("submit-2")
const file_button=document.getElementById("file")
const image=document.querySelector(".image")
// Values
var user_name=""
var user_surname=""
var date_of_birth=""
var user_gender=""
var email_addresses=[]
var phone_numbers=[]
var address_line1=""
var address_line2=""
var postal_code=""
var city=""
var country=""
var my_address_array=[]
var addresses=""
var education=[]
var job=[]
var language=[]
var user_qualification=[]
var about_yourself=""

let stageCounter=1
function hidePrevious(){
    if(stageCounter<=2){
        previous.disabled=true
        previous.style.cursor="default"
    }
    else if(stageCounter==4){
        next.disabled=true
        next.style.cursor="default"
    }
    else{
        previous.disabled=false
        previous.style.cursor="pointer"
    }
}
function hideNext2(){
    if(submit_1.disabled==false){
        next.disabled=true
        next.style.cursor="default"
    }
    else{
        next.disabled=false
        next.style.cursor="pointer"
    }
}
function hideNext3(){
    if(submit_2.disabled==false){
        next.disabled=true
        next.style.cursor="default"
        cancel_2.disabled=true
    }
    else{
        next.disabled=false
        next.style.cursor="pointer"
        cancel_2.disabled=false
    }
}
function stage2Comes(){
    permissionForNextStage++
    stageCounter++
    stage1Done()
    hidePrevious()
    cancel_1.disabled=true
    stage2.style.display=""
    stage3.style.display="none"
    stage4.style.display="none"
    hideNext2()
    stage1.style.height="0"
    opacityMore.style.animation="upstage1 2s"
    message.style.animation="upmessage 1s"
    stage2.style.animation="appear .5s 1.5s forwards"
}
function stage3Comes(){
    hideNext3()
    stage2.style.animation="disappear .3s forwards linear"
    stage3.style.animation="appear .5s .1s forwards"
}
function stage4Comes(){
    stage3.style.animation="disappear .3s forwards linear"
    stage4.style.animation="appear .5s .1s forwards"
}
function stage2Returns(){
    hideNext2()
    stage3.style.animation="goes .3s forwards linear"
    stage2.style.animation="return .5s .1s forwards"
}
function stage3Returns(){
    hideNext3()
    stage4.style.animation="goes .3s forwards linear"
    stage3.style.animation="return .5s .1s forwards"
}
startButton.addEventListener("click",stage2Comes)
next.addEventListener("click",function(){
    stageCounter++
    // hideNext2()
    hidePrevious()
    if(stageCounter==3){
        stage2Done()
        stage3.style.display=""
        stage3Comes()
        setTimeout(function(){
            stage2.style.display="none"
            stage4.style.display="none"
        },300)
        if(stage3.style.display=="none"){
            stage3.style.display=""
        }
    }
    else if(stageCounter==4){
        stage3Done()
        stage4.style.display=""
        stage4Comes()
        setTimeout(function(){
            stage2.style.display="none"
            stage3.style.display="none"
        },300)
        if(stage4.style.display=="none"){
            stage4.style.display=""
        }
    }
})
previous.addEventListener("click",function(){
    stageCounter--
    hidePrevious()
    if(stageCounter==2){
        stage2Cancelled()
        stage2.style.display=""
        stage2Returns()
        setTimeout(function(){
            stage3.style.display="none"
            stage4.style.display="none"
        },300)
    }
    else if(stageCounter==3){
        stage3Cancelled()
        stage3.style.display=""
        stage3Returns()
        setTimeout(function(){
            stage2.style.display="none"
            stage4.style.display="none"
        },300)
    }
})
// upload image
function previewImage(){
    const file=this.files[0]
    if(file){
        const reader=new FileReader()
        reader.addEventListener("load",function(){
            image.setAttribute("src",this.result)
        })
        reader.readAsDataURL(file)
    }
}

file_button.addEventListener("change",previewImage)

jobToggle.addEventListener("click",function(e){
    jobToggle.querySelector(".circle").classList.toggle("active")
    if(jobToggle.querySelector(".circle").className.includes("active")){
        Array.from(document.querySelectorAll(".new-job-wrapper")).forEach(el=>{
            el.remove()
        })
        document.getElementById("job").disabled=true
        document.getElementById("job").value=""
        document.getElementById("organization-job").disabled=true
        document.getElementById("organization-job").value=""
        document.querySelector(".organization-job label").style.userSelect="none"
        document.querySelector(".organization-job label").style.opacity=".5"
        document.getElementById("experience").disabled=true
        document.querySelector(".experience label").style.userSelect="none"
        document.querySelector(".experience label").style.opacity=".5"
        document.getElementById("experience").value="Select"
        document.querySelector(".add-job").style.pointerEvents="none"
        document.querySelector(".add-job").style.opacity=".5"
        document.querySelector(".job label").style.userSelect="none"
        document.querySelector(".job label").style.opacity=".5"
    }
    else{
        document.querySelector(".organization-job label").style.userSelect=""
        document.querySelector(".organization-job label").style.opacity=""
        document.querySelector(".experience label").style.userSelect=""
        document.querySelector(".experience label").style.opacity=""
        document.querySelector(".job label").style.userSelect=""
        document.querySelector(".job label").style.opacity=""
        document.getElementById("job").disabled=false
        document.getElementById("organization-job").disabled=false
        document.getElementById("experience").disabled=false
        document.querySelector(".add-job").style.pointerEvents=""
        document.querySelector(".add-job").style.opacity=""
    }
})
window.addEventListener("resize",function(){
    stage2.style.height=String(window.innerHeight*76.9/100)+"px"
    stage3.style.height=String(window.innerHeight*76.9/100)+"px"
    stage4.style.height=String(window.innerHeight*76.9/100)+"px"
})
// progress color codes
const circle4=document.querySelector(".template-circle")
const circle3=document.querySelector(".background-circle")
const circle2=document.querySelector(".personal-info-circle")
const circle1=document.querySelector(".start-circle")
const svgCheck='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="check"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></svg>'
function stage4Done(){
    circle4.removeChild(document.getElementById("svg-4"))
    circle4.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></svg>'
}
function stage4Cancelled(){

}
function stage3Done(){
    circle3.removeChild(document.getElementById("svg-3"))
    circle3.innerHTML=svgCheck
    const svgCheckImg=circle3.querySelector("#check")
    svgCheckImg.style.fill="#00FF00"
    document.querySelector(".background").querySelectorAll(".line").forEach(e=>{
        e.style.background="#00FF00"
    })
    circle3.style.border="#00FF00"
}
function stage3Cancelled(){
    circle3.removeChild(circle3.firstChild)
    circle3.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="svg-3"><path d="M45.63 79.75L52 81.25v58.5C45 143.9 40 151.3 40 160c0 8.375 4.625 15.38 11.12 19.75L35.5 242C33.75 248.9 37.63 256 43.13 256h41.75c5.5 0 9.375-7.125 7.625-13.1L76.88 179.8C83.38 175.4 88 168.4 88 160c0-8.75-5-16.12-12-20.25V87.13L128 99.63l.001 60.37c0 70.75 57.25 128 128 128s127.1-57.25 127.1-128L384 99.62l82.25-19.87c18.25-4.375 18.25-27 0-31.5l-190.4-46c-13-3-26.62-3-39.63 0l-190.6 46C27.5 52.63 27.5 75.38 45.63 79.75zM359.2 312.8l-103.2 103.2l-103.2-103.2c-69.93 22.3-120.8 87.2-120.8 164.5C32 496.5 47.53 512 66.67 512h378.7C464.5 512 480 496.5 480 477.3C480 400 429.1 335.1 359.2 312.8z"/></svg>'
    document.querySelector(".background").querySelectorAll(".line").forEach(e=>{
        e.style.background=""
    })
}
function stage2Done(){
    circle2.removeChild(document.getElementById("svg-2"))
    circle2.innerHTML=svgCheck
    const svgCheckImg=circle2.querySelector("#check")
    svgCheckImg.style.fill="#00FF00"
    document.querySelector(".personal-info").querySelectorAll(".line").forEach(e=>{
        e.style.background="#00FF00"
    })
    circle2.style.border="#00FF00"
}
function stage2Cancelled(){
    circle2.removeChild(circle2.firstChild)
    circle2.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" id="svg-2"><path d="M160 448h-32V224c0-17.69-14.33-32-32-32L32 192c-17.67 0-32 14.31-32 32s14.33 31.1 32 31.1h32v192H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32S177.7 448 160 448zM96 128c26.51 0 48-21.49 48-48S122.5 32.01 96 32.01s-48 21.49-48 48S69.49 128 96 128z"/></svg>'
    document.querySelector(".personal-info").querySelectorAll(".line").forEach(e=>{
        e.style.background=""
    })
}
function stage1Done(){
    circle1.removeChild(document.getElementById("svg-1"))
    circle1.innerHTML=svgCheck
    const svgCheckImg=circle1.querySelector("#check")
    svgCheckImg.style.fill="#00FF00"
    document.querySelector(".start").querySelector(".line").style.background="#00FF00"
    circle1.style.border="#00FF00"
}
// add buttons

const add_email=document.querySelector(".add-email")
const add_phone=document.querySelector(".add-phone")
const add_degree=document.querySelector(".add-degree")
const add_job=document.querySelector(".add-job")
const add_language=document.querySelector(".add-language")
const add_qualification=document.querySelector(".add-qualification")
var email_div=document.querySelector(".email-div")
const phone_div=document.querySelector(".phone-div")
const degree_wrapper=document.querySelector(".degree-wrapper")
const job_wrapper=document.querySelector(".job-wrapper")
const language_skill=document.querySelector(".language-skill")
const language_skill_wrapper=document.querySelector(".language-skill-wrapper")
const qualification=document.querySelector(".qualification")

// add email addresses

add_email.addEventListener("click",add_removeEmail)
function add_removeEmail(){
    const div_wrapper=document.createElement("div")
    const new_email_div=document.createElement("div")
    const label=document.createElement("label")
    const del_button=document.createElement("span")
    const input=document.createElement("input")
    input.setAttribute("type","email")
    // input.setAttribute("id","email")
    email_div.appendChild(div_wrapper)
    div_wrapper.appendChild(label)
    div_wrapper.appendChild(new_email_div)
    new_email_div.appendChild(input)
    new_email_div.appendChild(del_button)
    new_email_div.classList.add("new-div")
    del_button.classList.add("del-button")
    label.innerText="Email Address"
    del_button.innerText="delete"
    div_wrapper.style.display="flex"
    div_wrapper.style.flexDirection="column"
    div_wrapper.style.gap="3px"
    del_button.addEventListener("click",function(e){
        div_wrapper.remove()
    })
}
add_phone.addEventListener("click",add_removePhone)
function add_removePhone(){
    const div_wrapper=document.createElement("div")
    const new_phone_div=document.createElement("div")
    const label=document.createElement("label")
    const del_button=document.createElement("span")
    const input=document.createElement("input")
    input.setAttribute("type","tel")
    phone_div.appendChild(div_wrapper)
    div_wrapper.appendChild(label)
    div_wrapper.appendChild(new_phone_div)
    new_phone_div.appendChild(input)
    new_phone_div.appendChild(del_button)
    new_phone_div.classList.add("new-div")
    del_button.classList.add("del-button")
    label.innerText="Phone Number"
    del_button.innerText="delete"
    div_wrapper.style.display="flex"
    div_wrapper.style.flexDirection="column"
    div_wrapper.style.gap="3px"
    del_button.addEventListener("click",function(e){
        div_wrapper.className="delete"
    })
}
add_degree.addEventListener("click",add_removeDegree)
function add_removeDegree(){
    const new_degree_wrapper=document.createElement("div")
    const degree=document.createElement("div")
    const major=document.createElement("div")
    const organization_degree=document.createElement("div")
    const degree_label=document.createElement("label")
    const major_label=document.createElement("label")
    const organization_label=document.createElement("label")
    var degree_options=["Select","High School","Bachelor","Master","Phd"]
    const degree_input=document.createElement("select")
    const major_input=document.createElement("input")
    const organization_input=document.createElement("input")
    const delete_new_degree_wrapper=document.createElement("span")
    for(let i=0;i<degree_options.length;i++){
        var option=document.createElement("option")
        option.value=degree_options[i]
        option.innerText=degree_options[i]
        degree_input.appendChild(option)
    }
    degree_input.className="select-degree"
    major_input.type="text"
    organization_input.type="text"
    delete_new_degree_wrapper.innerText="X"
    delete_new_degree_wrapper.className="delete-new-degree-wrapper"
    degree_wrapper.appendChild(new_degree_wrapper)
    new_degree_wrapper.className="new-degree-wrapper"
    new_degree_wrapper.appendChild(degree)
    new_degree_wrapper.appendChild(major)
    new_degree_wrapper.appendChild(organization_degree)
    new_degree_wrapper.appendChild(delete_new_degree_wrapper)
    degree_label.innerText="The degree you have"
    degree.appendChild(degree_label)
    degree.appendChild(degree_input)
    major_label.innerText="Specify your major"
    major.appendChild(major_label)
    major.appendChild(major_input)
    organization_label.innerText="Organization providing education"
    organization_degree.appendChild(organization_label)
    organization_degree.appendChild(organization_input)
    degree.classList.add("degree")
    major.classList.add("major")
    organization_degree.classList.add("organization-degree")
    delete_new_degree_wrapper.addEventListener("click",function(e){
        new_degree_wrapper.remove()
    })
}
const toggle_degree=document.querySelector(".select-degree")
toggle_degree.addEventListener("change",function(option){
    if(option.target.value=="Don't have a degree"){
        document.getElementById("major").disabled=true
        document.getElementById("major").value=""
        document.getElementById("organization-degree").disabled=true
        document.getElementById("organization-degree").value=""
        document.querySelector(".major label").style.userSelect="none"
        document.querySelector(".major label").style.opacity=".5"
        document.querySelector(".organization-degree label").style.userSelect="none"
        document.querySelector(".organization-degree label").style.opacity=".5"
        add_degree.style.pointerEvents="none"
        add_degree.style.opacity=".5"
        Array.from(document.getElementsByClassName("new-degree-wrapper")).forEach(el=>{
            el.remove()
        })
    }
    else{
        document.getElementById("major").disabled=false
        document.getElementById("organization-degree").disabled=false
        document.querySelector(".major label").style.userSelect=""
        document.querySelector(".major label").style.opacity=""
        document.querySelector(".organization-degree label").style.userSelect=""
        document.querySelector(".organization-degree label").style.opacity=""
        add_degree.style.pointerEvents=""
        add_degree.style.opacity=""
    }
})
// add_remove job

add_job.addEventListener("click",add_removeJob)

function add_removeJob(){
    const new_job_wrapper=document.createElement("div")
    const job=document.createElement("div")
    const organization_job=document.createElement("div")
    const experience=document.createElement("div")
    const job_label=document.createElement("label")
    const job_input=document.createElement("input")
    const organization_job_label=document.createElement("label")
    const organization_job_input=document.createElement("input")
    const experience_label=document.createElement("label")
    const experience_input=document.createElement("select")
    const del_new_job_wrapper=document.createElement("span")
    var experience_options=["Select","1","2","3","4","5","5+"]
    for(let i=0;i<experience_options.length;i++){
        var option=document.createElement("option")
        option.value=experience_options[i]
        option.innerText=experience_options[i]
        experience_input.appendChild(option)
    }
    job_wrapper.appendChild(new_job_wrapper)
    new_job_wrapper.appendChild(job)
    new_job_wrapper.appendChild(organization_job)
    new_job_wrapper.appendChild(experience)
    new_job_wrapper.appendChild(del_new_job_wrapper)
    job.appendChild(job_label)
    job.appendChild(job_input)
    organization_job.appendChild(organization_job_label)
    organization_job.appendChild(organization_job_input)
    experience.appendChild(experience_label)
    experience.appendChild(experience_input)
    job_input.type="text"
    organization_job_input.type="text"
    new_job_wrapper.className="new-job-wrapper"
    job_label.innerText="Job title"
    organization_job_label.innerText="The organization you worked in"
    experience_label.innerText="Work Experience(with years)"
    job.className="job"
    organization_job.className="organization-job"
    experience.className="experience"
    del_new_job_wrapper.innerText="X"
    del_new_job_wrapper.className="del-new-job-wrapper"
    del_new_job_wrapper.addEventListener("click",function(e){
        new_job_wrapper.remove()
    })
}

// add-remove language

add_language.addEventListener("click",add_removeLanguage)

function add_removeLanguage(){
    const new_language_skill=document.createElement("div")
    const language=document.createElement("select")
    const lang=document.createElement("input")
    const del_new_language_skill=document.createElement("span")
    var language_options=["Select","Azerbaijani","English","Russian","Spanish","Turkish"]
    for(let i=0;i<language_options.length;i++){
        var option=document.createElement("option")
        option.value=language_options[i]
        option.innerText=language_options[i]
        language.appendChild(option)
    }
    lang.type="range"
    lang.setAttribute("value","0")
    lang.min="0"
    lang.max="10"
    lang.step="1"
    language_skill_wrapper.appendChild(new_language_skill)
    new_language_skill.appendChild(language)
    new_language_skill.appendChild(lang)
    new_language_skill.appendChild(del_new_language_skill)
    del_new_language_skill.innerText="delete"
    del_new_language_skill.className="del-new-language-skill"
    new_language_skill.className="new-language-skill"
    del_new_language_skill.addEventListener("click",function(e){
        new_language_skill.remove()
    })
}
add_qualification.addEventListener("click",add_removeQualification)

function add_removeQualification(){
    const new_qualification=document.createElement("div")
    const qualification_label=document.createElement("label")
    const qualification_input=document.createElement("input")
    const del_new_qualification=document.createElement("span")
    qualification_input.setAttribute("type","text")
    qualification_label.innerText="Enter your qualification"
    new_qualification.className="new-qualification"
    del_new_qualification.innerText="delete"
    del_new_qualification.className="del-new-qualification"
    qualification.appendChild(new_qualification)
    new_qualification.appendChild(qualification_label)
    new_qualification.appendChild(qualification_input)
    new_qualification.appendChild(del_new_qualification)
    del_new_qualification.addEventListener("click",function(e){
        new_qualification.remove()
    })
}
// CV
// stage-2 buttons

const name=document.getElementById("name")
const surname=document.getElementById("surname")
const date=document.getElementById("date")
const email_inputs=email_div.querySelectorAll("input")
const phone_inputs=phone_div.querySelectorAll("input")
const stage2_inputs=stage2.querySelectorAll("input")
const stage3_inputs=stage3.querySelectorAll("input")
submit_1.addEventListener("click",function(e){
    e.preventDefault()
    surname.reportValidity()
    name.reportValidity()
    if(name.checkValidity()==false || surname.checkValidity()==false){
        return
    }
    submit1_disableInputs()
    hideNext2()
    cancel_1.disabled=false
})
cancel_1.addEventListener("click",function(e){
    e.preventDefault()
    submit1_enableInputs()
    hideNext2()
    cancel_1.disabled=true
})
function hideShowCancel_save1(){
    if(cancel_1.disabled==true){
        cancel_1.style.opacity=""
        submit_1.style.opacity=".5"
        submit_1.disabled=false
    }
    else{
        cancel_1.style.opacity=".5"
        submit_1.style.opacity=""
        submit_1.disabled=true
    }
}
function submit1_disableInputs(){
    hideShowCancel_save1()
    Array.from(stage2_inputs).forEach(input=>{
        input.disabled=true
    })
    add_email.style.pointerEvents="none"
    add_email.style.opacity=".5"
    add_phone.style.pointerEvents="none"
    add_phone.style.opacity=".5"
    Array.from(document.querySelector(".email-div").querySelectorAll("input")).forEach(input=>{
        if(input.id=="email"){
            input.disabled=true
        }
        else{
            if(input.value==""){
                input.parentElement.parentElement.remove()
            }
            else{
                input.disabled=true
                input.nextElementSibling.style.pointerEvents="none"
                input.nextElementSibling.style.opacity=".6"
            }
        }
    })
    Array.from(document.querySelector(".phone-div").querySelectorAll("input")).forEach(input=>{
        if(input.id=="phone"){
            input.disabled=true
        }
        else{
            if(input.value==""){
                input.parentElement.parentElement.remove()
            }
            else{
                input.disabled=true
                input.nextElementSibling.style.pointerEvents="none"
                input.nextElementSibling.style.opacity=".6"
            }
        }
    })
}
function submit1_enableInputs(){
    hideShowCancel_save1()
    Array.from(stage2_inputs).forEach(input=>{
        input.disabled=false
    })
    add_email.style.pointerEvents=""
    add_email.style.opacity=""
    add_phone.style.pointerEvents=""
    add_phone.style.opacity=""
    Array.from(document.querySelector(".email-div").getElementsByTagName("input")).forEach(input=>{
        input.disabled=false
        if(input.id=="email"){
            return
        }
        else{
            input.nextElementSibling.style.pointerEvents=""
            input.nextElementSibling.style.opacity=""
        }
    })
    Array.from(document.querySelector(".phone-div").getElementsByTagName("input")).forEach(input=>{
        input.disabled=false
        if(input.id=="phone"){
            return
        }
        else{
            input.nextElementSibling.style.pointerEvents=""
            input.nextElementSibling.style.opacity=""
        }
    })
}



// CV
// stage-3 buttons

submit_2.addEventListener("click",function(e){
    e.preventDefault()
    submit2_disableInputs()
    hideNext3()
    cancel_2.disabled=false
})
cancel_2.addEventListener("click",function(e){
    e.preventDefault()
    submit2_enableInputs()
    hideNext3()
    cancel_2.disabled=true
})
function hideShowCancel_save2(){
    if(cancel_2.disabled==true){
        cancel_2.style.opacity=""
        submit_2.style.opacity=".5"
        submit_2.disabled=false
    }
    else{
        cancel_2.style.opacity=".5"
        submit_2.style.opacity=""
        submit_2.disabled=true
    }
}
function submit2_disableInputs(){
    hideShowCancel_save2()
    Array.from(stage3_inputs).forEach(input=>{
        input.disabled=true
    })
    document.querySelector(".toggle").style.pointerEvents="none"
    document.querySelector(".toggle").style.opacity=".5"
    document.querySelector(".toggle").style.transition="0s"
    add_degree.style.pointerEvents="none"
    add_degree.style.opacity=".5"
    add_job.style.pointerEvents="none"
    add_job.style.opacity=".5"
    add_language.style.pointerEvents="none"
    add_language.style.opacity=".5"
    add_qualification.style.pointerEvents="none"
    add_qualification.style.opacity=".5"
    document.getElementById("degree").disabled=true
    Array.from(document.querySelector(".degree-wrapper").querySelectorAll(".new-degree-wrapper")).forEach(new_degree_wrapper=>{
        if(new_degree_wrapper.querySelector(".select-degree").value=="Select" && new_degree_wrapper.querySelector(".major input").value=="" && new_degree_wrapper.querySelector(".organization-degree input").value==""){
            new_degree_wrapper.remove()
        }
        else{
            new_degree_wrapper.querySelector(".select-degree").disabled=true
            new_degree_wrapper.querySelector(".major input").disabled=true
            new_degree_wrapper.querySelector(".organization-degree input").disabled=true
            new_degree_wrapper.querySelector(".delete-new-degree-wrapper").style.pointerEvents="none"
            new_degree_wrapper.querySelector(".delete-new-degree-wrapper").style.opacity=".5"
        }
    })
    document.getElementById("experience").disabled=true
    Array.from(document.querySelector(".job-wrapper").querySelectorAll(".new-job-wrapper")).forEach(new_job_wrapper=>{
        if(new_job_wrapper.querySelector(".job input").value=="" && new_job_wrapper.querySelector(".organization-job input").value=="" && new_job_wrapper.querySelector(".experience select").value=="Select"){
            new_job_wrapper.remove()
        }
        else{
            new_job_wrapper.querySelector(".job input").disabled=true
            new_job_wrapper.querySelector(".organization-job input").disabled=true
            new_job_wrapper.querySelector(".experience select").disabled=true
            new_job_wrapper.querySelector(".del-new-job-wrapper").style.pointerEvents="none"
            new_job_wrapper.querySelector(".del-new-job-wrapper").style.opacity=".5"
        }
    })
    document.querySelector(".language-skill").querySelector("select").disabled=true
    Array.from(document.querySelector(".language-skill-wrapper").querySelectorAll(".new-language-skill")).forEach(new_language_skill=>{
        if(new_language_skill.querySelector("select").value=="Select"){
            new_language_skill.remove()
        }
        else{
            new_language_skill.querySelector("select").disabled=true
            new_language_skill.querySelector("input").disabled=true
            new_language_skill.querySelector(".del-new-language-skill").style.pointerEvents="none"
            new_language_skill.querySelector(".del-new-language-skill").style.opacity=".5"
        }
    })
    Array.from(document.querySelector(".qualification").querySelectorAll(".new-qualification")).forEach(new_qualification=>{
        if(new_qualification.querySelector("input").value==""){
            new_qualification.remove()
        }
        else{
            new_qualification.querySelector("input").disabled=true
            new_qualification.querySelector(".del-new-qualification").style.pointerEvents="none"
            new_qualification.querySelector(".del-new-qualification").style.opacity=".5"
        }
    })
    document.getElementById("about").disabled=true
}
function submit2_enableInputs(){
    hideShowCancel_save2()
    Array.from(stage3_inputs).forEach(input=>{
        input.disabled=false
    })
    if(document.getElementById("degree").value=="Don't have a degree"){
        document.getElementById("major").disabled=true
        document.getElementById("organization-degree").disabled=true
    }
    document.querySelector(".toggle").style.pointerEvents=""
    document.querySelector(".toggle").style.opacity=""
    document.querySelector(".toggle").style.transition="0s"
    add_degree.style.pointerEvents=""
    add_degree.style.opacity=""
    add_job.style.pointerEvents=""
    add_job.style.opacity=""
    add_language.style.pointerEvents=""
    add_language.style.opacity=""
    add_qualification.style.pointerEvents=""
    add_qualification.style.opacity=""
    document.getElementById("degree").disabled=false
    Array.from(document.querySelector(".degree-wrapper").querySelectorAll(".new-degree-wrapper")).forEach(new_degree_wrapper=>{
        new_degree_wrapper.querySelector(".select-degree").disabled=false
        new_degree_wrapper.querySelector(".major input").disabled=false
        new_degree_wrapper.querySelector(".organization-degree input").disabled=false
        new_degree_wrapper.querySelector(".delete-new-degree-wrapper").style.pointerEvents=""
        new_degree_wrapper.querySelector(".delete-new-degree-wrapper").style.opacity=""
    })
    document.getElementById("experience").disabled=false
    if(jobToggle.querySelector(".circle").className.includes("active")){
        Array.from(job_wrapper.querySelectorAll("input")).forEach(input=>{
            input.disabled=true
            add_job.style.pointerEvents="none"
            add_job.style.opacity=".5"
        })
        document.getElementById("experience").disabled=true
    }
    Array.from(document.querySelector(".job-wrapper").querySelectorAll(".new-job-wrapper")).forEach(new_job_wrapper=>{
        new_job_wrapper.querySelector(".job input").disabled=false
        new_job_wrapper.querySelector(".organization-job input").disabled=false
        new_job_wrapper.querySelector(".experience select").disabled=false
        new_job_wrapper.querySelector(".del-new-job-wrapper").style.pointerEvents=""
        new_job_wrapper.querySelector(".del-new-job-wrapper").style.opacity=""
    })
    document.querySelector(".language-skill").querySelector("select").disabled=false
    Array.from(document.querySelector(".language-skill-wrapper").querySelectorAll(".new-language-skill")).forEach(new_language_skill=>{
        new_language_skill.querySelector("select").disabled=false
        new_language_skill.querySelector("input").disabled=false
        new_language_skill.querySelector(".del-new-language-skill").style.pointerEvents=""
        new_language_skill.querySelector(".del-new-language-skill").style.opacity=""
    })
    Array.from(document.querySelector(".qualification").querySelectorAll(".new-qualification")).forEach(new_qualification=>{
        new_qualification.querySelector("input").disabled=false
        new_qualification.querySelector(".del-new-qualification").style.pointerEvents=""
        new_qualification.querySelector(".del-new-qualification").style.opacity=""
    })
    document.getElementById("about").disabled=false
}
// get values
function getValues(){
    my_user_name=document.getElementById("name").value
    my_user_surname=document.getElementById("surname").value
    date_of_birth=document.getElementById("date").value
    //user_gender
    document.querySelector('input[name="gender"]:checked')==null?user_gender="":user_gender=document.querySelector('input[name="gender"]:checked').value
    Array.from(document.querySelectorAll(".email-div input")).forEach(input=>{
        email_addresses.push(input.value)
    })
    Array.from(document.querySelectorAll(".phone-div input")).forEach(input=>{
        phone_numbers.push(input.value)
    })
    address_line1=document.getElementById("address1").value
    address_line2=document.getElementById("address2").value
    postal_code=document.getElementById("postal-code").value
    city=document.getElementById("city").value
    country=document.getElementById("country").value
    my_address_array.push(address_line1,address_line2,postal_code,city,country)
    // filtering
    //username-surname
    user_name=my_user_name.split("").map((letter,index)=>{
        if(index==0){
            return letter.toUpperCase()
        }
        return letter.toLowerCase()
    }).join("")
    user_surname=my_user_surname.split("").map((letter,index)=>{
        if(index==0){
            return letter.toUpperCase()
        }
        return letter.toLowerCase()
    }).join("")
    // addresses
    addresses=my_address_array.filter(el=>el!="").map((el,index,our_array)=>{
        if(index!=our_array.length-1){
            return el+", "
        }
        return el
    }).join("")
    //education
    education.push({degree:document.querySelector(".degree-wrapper .degree select").value,
                    major:document.querySelector(".degree-wrapper .major input").value,
                    organization:document.querySelector(".degree-wrapper .organization-degree input").value})
    Array.from(document.querySelectorAll(".degree-wrapper .new-degree-wrapper")).forEach(new_degree_wrapper=>{
        education.push({degree:new_degree_wrapper.querySelector(".degree select").value,
                        major:new_degree_wrapper.querySelector(".major input").value,
                        organization:new_degree_wrapper.querySelector(".organization-degree input").value})
    })
    education.forEach(obj=>{
        if((obj.degree=="Select" || obj.degree=="Don't have a degree") && obj.major=="" && obj.organization==""){
            education.splice(education.indexOf(obj),1)
        }
        else{
            if(obj.degree=="Select"){
                delete obj.degree
            }
            if(obj.major==""){
                delete obj.major
            }
            if(obj.organization==""){
                delete obj.organization
            }
        }
    })
    // job
    job.push({title:document.getElementById("job").value,
             organization:document.getElementById("organization-job").value,
             experience:document.getElementById("experience").value})
    Array.from(document.querySelectorAll(".job-wrapper .new-job-wrapper")).forEach(new_job_wrapper=>{
        job.push({title:new_job_wrapper.querySelector(".job input").value,
                 organization:new_job_wrapper.querySelector(".organization-job input").value,
                 experience:new_job_wrapper.querySelector(".experience select").value})
    })
    job.forEach(obj=>{
        if(obj.experience=="Select" && obj.title=="" && obj.organization==""){
            job.splice(job.indexOf(obj),1)
        }
        else{
            if(obj.experience=="Select"){
                delete obj.experience
            }
            if(obj.title==""){
                delete obj.title
            }
            if(obj.organization==""){
                delete obj.organization
            }
        }
    })
    // language
    language.push(`${document.getElementById("language").value} - ${document.getElementById("lang").value}/10`)
    Array.from(document.querySelectorAll(".new-language-skill")).forEach(new_language_skill=>{
        language.push(`${new_language_skill.querySelector("select").value} - ${new_language_skill.querySelector("input").value}/10`)
    })
    language=language.filter(el=>!el.includes("Select"))
    // qualification
    Array.from(document.querySelectorAll(".qualification input")).forEach(input=>{
        user_qualification.push(input.value)
    })
    user_qualification=user_qualification.filter(el=>el!="")
    // about_yourself
    about_yourself=document.getElementById("about").value
    pasteValues()
    function pasteValues(){
        // user-name

        document.querySelector(".user-name1").innerText=`${user_name} ${user_surname}`
        // user-gender
        if(user_gender!=""){
            const li=document.createElement("li")
            document.querySelector(".inlines1 ul").appendChild(li)
            li.innerText="Gender: " + user_gender
        }
        // user date of birth
        if(date_of_birth!=""){
            const li=document.createElement("li")
            li.innerText="Date of birth: "+date_of_birth
            document.querySelector(".inlines1 ul").appendChild(li)
        }
        // email addresses
        email_addresses.forEach(email=>{
            if(email!=""){
                const li=document.createElement("li")
                li.innerText=email
                li.style.color="#004494"
                document.querySelector(".inlines1 ul").appendChild(li)
            }
        })
        // phone numbers
        phone_numbers.forEach(number=>{
            if(number!=""){
                const li=document.createElement("li")
                li.innerText=number
                li.style.color="#004494"
                document.querySelector(".inlines1 ul").appendChild(li)
            }
        })
        // addresses
        if(addresses!=""){
            const li=document.createElement("li")
            li.innerText=addresses
            document.querySelector(".inlines1 ul").appendChild(li)
        }
        // education
        if(education.length>0){
            document.querySelector(".education1").style.display="flex"
            education.forEach(obj=>{
                const edu_div=document.createElement("div")
                Object.entries(obj).forEach(pair=>{
                    const edu_stages1=document.createElement("span")
                    edu_stages1.className="edu_stages1"
                    const b=document.createElement("b")
                    const span=document.createElement("span")
                    pair[0]=="organization"?pair[0]="organization(University, School, etc...)":pair[0]
                    b.innerText=`•${pair[0]}`
                    edu_stages1.appendChild(b)
                    span.innerText=`-${pair[1]}`
                    edu_stages1.appendChild(span)
                    edu_div.appendChild(edu_stages1)
                    document.querySelector(".education-info1").appendChild(edu_div)
                })
            })
        }
        // job
        if(job.length>0){
            document.querySelector(".work1").style.display="flex"
            job.forEach(obj=>{
                const job_div=document.createElement("div")
                Object.entries(obj).forEach(pair=>{
                    const job_stages1=document.createElement("span")
                    job_stages1.className="job_stages1"
                    const b=document.createElement("b")
                    const span=document.createElement("span")
                    pair[0]=="title"?pair[0]="job title":pair[0]=="experience"?pair[0]="experience(with years)":pair[0]
                    b.innerText=`•${pair[0]}`
                    job_stages1.appendChild(b)
                    span.innerText=`-${pair[1]}`
                    job_stages1.appendChild(span)
                    job_div.appendChild(job_stages1)
                    document.querySelector(".job-info1").appendChild(job_div)
                })
            })
        }
        // language
        if(language.length>0){
            document.querySelector(".language1").style.display="flex"
            language.forEach(lang=>{
                const div=document.createElement("div")
                div.innerText=lang
                document.querySelector(".language-info1").appendChild(div)
            })
        }
        // qualification
        if(user_qualification.length>0){
            document.querySelector(".qualification1").style.display="flex"
            user_qualification.forEach(q=>{
                const div=document.createElement("div")
                div.innerText=q
                document.querySelector(".qualification-info1").appendChild(div)
            })
        }
        // about yourself
        if(about_yourself!=""){
            console.log("hello")
            document.querySelector(".about-me1").style.display="flex"
            const span=document.createElement("span")
            const p=document.createElement("p")
            span.innerText="About me:"
            p.innerText=about_yourself
            document.querySelector(".about-me1").appendChild(span)
            document.querySelector(".about-me1").appendChild(p)
        }
    }
}
document.getElementById("generate").addEventListener("click",function(e){
    document.querySelector(".main-page1").style.display="flex"
    document.querySelector(".container").style.display="none"
    document.body.style.display="flex"
    document.body.style.flexDirection="column"
    document.body.style.alignItems="center"
    document.querySelector(".user-img1").src=image.src
    getValues()
})
