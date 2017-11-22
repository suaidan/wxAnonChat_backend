var jwt=require("jsonwebtoken");
//生成token
function generateToken(audience,signed){
    var token=jwt.sign({
        iss:"supange",
        aud:audience,
        registered:signed
    },
    "spg_is_handsome",
    {
        expiresIn:signed?"30days":"3days"
    });
    return token;
}
function verifyToken(token){
    var result;
    jwt.verify(token,"spg_is_handsome",
        { issuer:"supange"},
        function(err,decode){
            if(err){
                result= {"err":err,"decode":decode};
                return;
            }
            result=decode;
    });
    return result;
}
module.exports={
    generateToken:generateToken,
    verifyToken:verifyToken
}