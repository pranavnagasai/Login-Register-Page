const emaildom = document.getElementById("email");
const submitdom = document.querySelector(".form");
const passdom = document.getElementById("password");
submitdom.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const email_val = emaildom.value;
    const pass_val = passdom.value;
    try {
        const response = await axios.post('/api/login',{ email:email_val,password: pass_val,request:"login" });
        const {success} = response.data;
        console.log(success);
        if(success == "false"){
            const {msg} = response.data
            document.querySelector('.message').innerHTML = `<p class="failed">${msg}</p>`;
            setTimeout(()=>{document.querySelector('.message').innerHTML = ``},2000)

        }
        else{
            document.querySelector('.message').innerHTML = `<p class="success">Login Success redirecting to Home</p>`;
            setTimeout(()=>{document.querySelector('.message').innerHTML = ``},3000)
            setTimeout(()=>{window.location.href = "/home.html";
            },2000);
        }
    } catch (error) {
        console.log(error);
    }
    console.log(email_val);
})

