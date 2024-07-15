import {Schema, model} from 'mongoose';


const authorSchema = new Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    email:{
        type: String,
    }
})

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'book title is a required field'],
        unique: [true, 'book title should be unique'],
        minLength: 5
    },
    price: {
        type: Number,
        min: 0,
    },
    authors: [authorSchema],
    deleted: { 
        type: Date,
        default: null
    }
});

const Book = model('Book', bookSchema);
export default Book;