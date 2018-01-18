let jwt=require("jsonwebtoken");
//生成token
function generateToken(audience,pwd,signed){
    return jwt.sign({
        iss:"supange",
        pwd:pwd,
        aud:audience,
        registered:signed
    },
    "spg_is_handsome");
}
function verifyToken(usr,token){
    let result;
    jwt.verify(token,"spg_is_handsome",
        { issuer:"supange",
        audience:usr},
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