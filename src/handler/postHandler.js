const { response } = require("express");

const postHandler = {}

const urlPost = "https://jsonplaceholder.typicode.com/posts";
const urlComment = "https://jsonplaceholder.typicode.com/comments";
const urlMerge = [].concat(urlComment,urlPost);

postHandler.getAllPost = (req,res) => {
    fetch(urlPost)
        .then((response) => {
            if (!response) {
                throw new Error("http error");
            }
            return response.json();
        })
        .then((data) => {
            res.end(JSON.stringify(data));
        })
}

postHandler.getAllComment = (req,res) => {
    fetch(urlComment)
        .then((response) => {
            if (!response) {
                throw new Error("http error");
            }
            return response.json();
        })
        .then((data) => {
            res.end(JSON.stringify(data));
        })
}

// postHandler.getAllPostComment = (req,res) => {
//     fetch(urlPost)
//         .then(response => {
//             return response.json()
//             })
//         .then(data1 => {
//             return fetch(`https://jsonplaceholder.typicode.com/comments?data=${data1}`)
//         })
//         .then(response => {
//             return response.json()
//         })
//         .then(data2 => {
//             res.end(JSON.stringify(data2));
//         })
//         .catch(error => {
//             console.error(error);
//         })
// }

postHandler.getAllPostComment = (req,res) => {
    const req1 = fetch(urlPost).then(response => response.json())
    const req2 = fetch(urlComment).then(response => response.json())

    Promise.all([req1, req2])
        .then(([data1, data2]) => {
            res.end(JSON.stringify(data1,data2));
            //console.log(data1,data2);
        })
        .catch(error => {
            console.error(error);
        })
}

module.exports = postHandler