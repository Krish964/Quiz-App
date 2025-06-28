console.log("hey script start")

const intervalid = setInterval(() => {
    console.log(Math.random());
} , 1000)

console.log("script end!!")

clearInterval(intervalid);