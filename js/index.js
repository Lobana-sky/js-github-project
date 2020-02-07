//-------------    first step   -----------//
let searchInput=document.querySelector("[name='search']");
let submitInput=document.querySelector("[name='submit']");
//display info

submitInput.addEventListener('submit',getInfo);


function getInfo(searchInput) {
	 searchInput.preventDefault();
	fetch(`https://api.github.com/search/users?q=${searchInput.value}`, 
	 {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/vnd.github.v3+json"
  }
})
  .then(function(response) {
    return response.json();
  })
  ///come back with all the details
  .then(function(object) {
    console.log(object);
    let list=document.getElementById("user-list");
    //add all elements to the user-list
    for(let element of object){
   let liParent=document.createElement("li");
   let p=document.createElement("p");
   p.innerText=element.login;
   let img=document.createElement("img");
   img.src=element.avatar_url;
   let a=document.createElement("a");
   a.href=element.url;
   liParent.appendChild(p,img,a);
   list.appendChild(liParent);
   //---------for thist section---------//
   liParent.addEventListener('click',(e) => {
   	gInfo(e)});

    }//end for
  })
  .catch(function(error) {
    console.error(error.message);
  });
}
//-------------    Second step   -----------//
function gInfo(user1) {
	
	fetch(`https://api.github.com/users/${user1.target.login}/repos`, 
	 {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/vnd.github.v3+json"
  }
})
  .then(function(response) {
    return response.json();
  })
  ///come back with all the details
  .then(function(object) {
    console.log(object);
    let listRepo=document.getElementById("repos-list");
    //add all elements to the repo-list
    for(let element of object){
   let liParentRepo=document.createElement("li");
   let p=document.createElement("p");
   p.innerText=element.name;
   
   let a=document.createElement("a");
   a.href=element.repos_url;
   liParentRepo.appendChild(p,a);
   listRepo.appendChild(liParentRepo);

    }//end for
  })
  .catch(function(error) {
    console.error(error.message);
  });

}
