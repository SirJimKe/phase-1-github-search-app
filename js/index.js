document.addEventListener("DOMContentLoaded", ()=>{
    searchUsers();
})


function searchUsers(){
    const search = document.querySelector("#github-form");
    const searchInput = document.querySelector("#search");


    search.addEventListener("submit", (event)=>{
    event.preventDefault();
    fetch(`https://api.github.com/search/users?q=${searchInput.value}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        data.items.forEach(user => {
            const userList = document.querySelector('#user-list');

            const li = document.createElement('li');
            const p = document.createElement('p');
            const a = document.createElement("a")
            const img = document.createElement('img');

            p.innerText = user.login;
            a.textContent = user.html_url;
            img.src = user.avatar_url;


            li.addEventListener("click", ()=>{
                fetch(`https://api.github.com/users/${user.login}/repos`)
                .then(res=>res.json())
                .then(repo=>{
                    console.log(repo);
                    repo.forEach((repos)=>{
                        const repoList = document.createElement("li")

                        repoList.textContent = repos.name;
                        p.appendChild(repoList);

                    })

                })
            })


            li.append(p, a, img);
            userList.appendChild(li)
        })
    })
    search.reset();
    })
}


