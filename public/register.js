const emaildom = document.getElementById("email");
const submitdom = document.querySelector(".form");
const passdom = document.getElementById("password");
const namedom = document.getElementById("name");
submitdom.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const name_val = namedom.value;
    const email_val = emaildom.value;
    const pass_val = passdom.value;
    try {
        const response = await axios.post('/api/login',{ email:email_val,password: pass_val,request:"register"});
        const {success,msg} = response.data;
        console.log(response.data);
        if(success == "false"){
            document.querySelector('.message').innerHTML = `<p class="failed">${msg}</p>`;
            setTimeout(()=>{document.querySelector('.message').innerHTML = ``},3000);
        }
        else{
            document.querySelector('.message').innerHTML = `<p class="success">Registration Success! Redirecting to Login</p>`;
            setTimeout(()=>{document.querySelector('.message').innerHTML = ``},3000)
            setTimeout(()=>{window.location.href = "/index.html";
            },2000);
        }
    } catch (error) {
        console.log(error);
    }
    console.log(email_val);
})