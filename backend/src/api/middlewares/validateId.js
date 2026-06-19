export function validateID (req, res, next){
    const idNum = Number(req.params.id);

    if(!Number.isInteger(idNum) || idNum <= 0){
        return  res.status(400).json({error: "El id debe ser un número entero positivo"});
    }

    req.id = idNum;

    next();
}