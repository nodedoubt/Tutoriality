var credentials = {
 oauth : {
   key : "KEY_HERE",
   secret : "SECRET_HERE",
 },
};

if(credentials.oauth.key === "KEY_HERE") {
 throw new Exception("Please set your oauth key");
}

module.exports = {
 credentials : credentials,
};
