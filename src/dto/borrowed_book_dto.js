const ListOfBorrowedBooks = (data) => {
    return data.map((borrowed) => {
        return {
            id: borrowed._id,
            borrower: borrowed.borrowerId || [],
            book: borrowed.bookId || [],
            bookEdition: borrowed.bookEditionId || [],
            quantity: borrowed.quantity,
            borrowedAt: borrowed.borrowedAt,
            expectedReturnAt: borrowed.expectedReturnAt,
            returnedAt: borrowed.returnedAt,
            penalties: borrowed.penalties || 0
        }
    })
}

const DetailBorrowedBook = (data) => {
    return {
        id: data._id,
        borrower: data.borrowerId || [],
        book: data.bookId || [],
        bookEdition: data.bookEditionId || [],
        quantity: data.quantity,
        borrowedAt: data.borrowedAt,
        expectedReturnAt: data.expectedReturnAt,
        returnedAt: data.returnedAt,
        penalties: data.penalties || 0
    }
}


module.exports = {
    ListOfBorrowedBooks,
    DetailBorrowedBook
}