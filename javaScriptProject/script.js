
const getGithubData = (username)=>{
       return fetch(`https://api.github.com/users/${username}`)
        .then(data => data.json())
        .catch(error => {console.log("error in geting data ", error)})
}

const updateProfile = (data)=>{
    console.log(data)
    const profileImg = document.getElementById('profile-img')
    const following = document.getElementById('following')
    const followers = document.getElementById('followers')
    profileImg.setAttribute("src", `${data.avatar_url}`)
    followers.innerHTML = `${data.followers}`
    following.innerHTML = `${data.following}`
}


const handelSubmit = (e)=>{
    e.preventDefault();
    const username = document.getElementById('username').value;
    // console.log('submit is caller ',username)
    getGithubData(username)
    .then(data=> {updateProfile(data)})
}