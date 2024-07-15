import Book from "../models/books.model.js";

export const getBookList = async(req, res, next) => {
    const books = await Book.find({deleted:  null});
    res.send({status: 'success', books})
}

export const addBook = async(req, res, next) => {

    try {
        const isLoggedIn = true;
        // if not authenticated
        if(!isLoggedIn){
            const err = new Error('Please login first');
            err.status = 401;
            throw err;
        }
        const newBook = await Book.create({
            title: req.body.title,
            price: req.body.price,
            authors: req.body.authors
        });
        res.json({status: 'success', newBook})
        
    } catch (error) {
        next(error)
    }
}

export const updateBook = (req, res, next) => {
    res.send('update book')
}


export const deleteBook = async(req, res, next) => {
    try {
        const {bid} = req.params;
        const result = await Book.findByIdAndUpdate(
            bid, {deleted: Date.now()}, {new: true, runValidators: true});
        res.json({status: 'success', result})
    
    } catch (error) {
        next(error)
    }
}

// to execute fetch() after one month
// setTimeout(1000*60*60*24*30, ()=>{fetch()}