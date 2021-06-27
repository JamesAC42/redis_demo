console.log("test");

const socket = io("http://localhost:3002/");

socket.on("ping", (info) => {
    console.log(info);
})

fetch('http://localhost:3002/', {
  method: 'GET'
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});