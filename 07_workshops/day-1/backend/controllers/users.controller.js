
/* -------------- register users -------------- */
export const register = (req, res, next) => {
    try {
        res.json({msg:'register route executed!'})
    
    } catch (error) {
        next(error)
    }
}

/* ------------- login to the app ------------- */
export const login = (req, res, next) => {
    try {
        res.json({msg:'login route executed!'})
    
    } catch (error) {
        next(error)
    }
}