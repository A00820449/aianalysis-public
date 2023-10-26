export const jsonFetcherGet = url => fetch(url, {
    method: "GET"
  }).then(r => r.json())
  
export const jsonFetcherDelete = (url) => fetch(url, {
method: "DELETE"
}).then(r => r.json())

export const jsonFetcherPost = (url, data) => fetch(url, {
method: "POST",
headers: {
    "Content-Type": "application/json",
},
body: JSON.stringify(data)
}).then(r => r.json())