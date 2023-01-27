
if(typeof String.prototype.reverse !== "function") {
    String.prototype.reverse = function() {
      if (this === null) throw new TypeError;
      return this.split("").reverse().join("");
    };
  }
  
process.stdin.on("data", data=>{
    console.log(data.toString())
    process.stdout.write(`\n\n\ ${data.toString().reverse()} \n\n`)
})