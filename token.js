var jwt=require("jsonwebtoken");
//生成token
function generateToken(audience,signed){
    var token=jwt.sign({
        iss:"supange",
        aud:audience
    },
    "spg_is_handsome",
    {
        expiresIn:signed?"30days":"3days"
    });
    return token;
}
function verifyToken(token,obj){
    var result=jwt.verify(token,"spg_is_handsome",obj,
        function(err,decode){
            if(err){
                return {"err":err,"decode":decode};
            }
            return decode;
    });
    return result;
}
module.exports={
    generateToken:generateToken,
    verifyToken:verifyToken
}