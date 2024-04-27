function handleFormSubmit(event){
    event.preventDefault();
     const title = document.getElementById("title").value
     const amount = document.getElementById("amount").value
     document.getElementById("title").value = ""
     document.getElementById("amount").value = ""
     
      axios.post("http://localhost:9897/sharpner/addexpense",{
        title : title,
        amount : amount
     })
     .then((res) =>{
       handleOnLoad();
     })
     .catch((err)=>{
        console.log(err);
     })
    
}
function handleOnLoad(){
    axios.get("http://localhost:9897/sharpner/getexpense")
    .then((res) =>{
        const siteList = document.querySelector("ul");
            siteList.innerHTML = ""; 
            res.data.forEach((item) => {
                displayList(item, siteList);
            });
    })
    .catch((err) =>{
        console.log(err)
    })

    function displayList(list,siteList){
        const listItem = document.createElement("li");
        listItem.appendChild( document.createTextNode(`${list.title} > ${list.amount}`))

        const deleteBtn = document.createElement("button");
        deleteBtn.appendChild(document.createTextNode("Delete"));
        listItem.appendChild(deleteBtn);
        deleteBtn.addEventListener("click",()=>{
               deleteSite(list.id)
        })
        const editBtn = document.createElement("button");
        editBtn.appendChild(document.createTextNode("Edit"));
        listItem.appendChild(editBtn);
        editBtn.addEventListener("click",()=>{
             editSite(list);
        })

        
        siteList.appendChild(listItem);
    }
}

function deleteSite(id){
    debugger;
    axios.delete(`http://localhost:9897/sharpner/delete/${id}`)
    .then(() =>{
       handleOnLoad();
    })
    .catch((err)=>{
        console.log(err)
    })
}

function editSite(list){
     document.getElementById("title").value = list.title
     document.getElementById("amount").value = list.amount;
    const form = document.querySelector("form");
    form.onsubmit = (event) =>{ updateSite(event,list.id)}
}

async function updateSite(event,id){


    try{
        event.preventDefault();
        const updatetitle = document.getElementById("title").value
        const updatepass = document.getElementById("amount").value 
       
        document.getElementById("title").value = ""
         document.getElementById("amount").value = ""
       let result = await axios.put(`https://crudcrud.com/api/e46e118a6e914744990b2f3894b4440d/passwords/${id}`,{
            title : updatetitle,
            pass : updatepass
        })

        //let result = await res;
       // debugger;
         
            handleOnLoad();
        
        
        
    }catch(err){
        console.log(err);
    }

}

function searchPassword(serachText){
    const list = document.querySelector("ul");
    const passwords = list.getElementsByTagName("li");

   for(let pass of passwords){
    const title = pass.textContent.split(":")[0];
    if (title.toLowerCase().includes(serachText.toLowerCase())) {
        pass.style.display = "block"; 
    } else {
        pass.style.display = "none"; 
    }
   }
}

window.onload = handleOnLoad();
