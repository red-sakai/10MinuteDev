// async is a keyword used to define a function that always returns a promise
// inside an async function you can use the await keyword to pause the function execution until a promise is resolved
async function myDisplay() {
  let myPromise = new Promise(function(resolve) {
    resolve("I love You !!");
  });
  document.getElementById("demo").innerHTML = await myPromise;
}

myDisplay();