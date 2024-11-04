class BookInputDTO {
    constructor(data) {
        this.authorId = data.authorId
        this.title = data.title
        this.summary = data.summary
        this.description = data.description
        // this.stock = data.stock
        this.categories = data.categories
        this.bookEditions = data.bookEditions || []
        this.listBookIdEditions = data.listBookIdEditions || []
    }
}

class BookUpdateDTO {
    constructor(data) {
        this.authorId = data.authorId
        this.title = data.title
        this.summary = data.summary
        this.description = data.description
        this.categories = data.categories
    }
}


const ListOfBooks = (data) => {
    return data.map((book) => {
        return {
            id: book._id,
            author: book.authorId || [],
            title: book.title,
            summary: book.summary,
            description: book.description,
            // stock: listOfStocks(book.bookEditions) || [],
            categories: book.categories || [],
            bookEditions: book.bookEditions || [],
            createdAt: book.createdAt,
            updatedAt: book.updatedAt
        }
    })
}

const DetailBook = (data) => {
    return {
        id: data._id,
        author: data.authorId || [],
        title: data.title,
        summary: data.summary,
        description: data.description,
        categories: data.categories || [],
        bookEditions: data.bookEditions || [],
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    }
}

// const listOfStocks = (data) => {
//     if (!data) return [];

//     return data.map((stock) => {
//         return {
//             isbn: stock.isbn,
//             quantity: stock.quantity,
//             isAvailable: stock.isAvailable
//         }
//     });
// }


module.exports = {
    BookInputDTO,
    ListOfBooks,
    DetailBook,
    BookUpdateDTO
}