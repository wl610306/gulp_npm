function env(){
    // console.log(this)
    // window.NODE_ENV = process.env.NODE_ENV
    return process.env.NODE_ENV
}

module.exports = env;