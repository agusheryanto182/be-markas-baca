# API Contract

## Books

### Get List of Books

- **Method**: `GET`
- **Endpoint**: `/books`
- **Description**: Untuk mendapatkan list buku
- **Request**:
  - _Body_
  ```json
  {
    "authorId": "67261c5dfc0babfeca7fbc4f",
    "title": "Life after end II",
    "summary": "Something that can't imaginating with human",
    "description": "This book is a secret book, just some unique people can borrow this book",
    "bookEditions": [
      {
        "isbn": "987-9-24-01-40",
        "quantity": 100,
        "isAvailable": true
      },
      {
        "isbn": "987-9-24-01-41",
        "quantity": 100,
        "isAvailable": true
      }
    ],
    "categories": [
      {
        "_id": "67296b3937c4dda4b9364516"
      },
      {
        "_id": "67296b6037c4dda4b936451a"
      }
    ]
  }
  ```
- **Response**
  - **200 OK**
  ```json
  {
    "message": "string",
    "data": {
      "_id": "string",
      "title": "string",
      "description": "string",
      "summary": "string",
      "author_id": "string"
    }
  }
  ```
  - **400 Bad Request**
  - **500 Internal Server Error**

### Get Book Details

- **Method**: `GET`
- **Endpoint**: `/book/:id`
- **Description**: Untuk mendapatkan detail buku
- **Response**
  - **200 OK**
  ```json
  {
    "status": "success",
    "message": "successfully fetched",
    "data": {
      "book": [
        {
          "id": "67289c01f3f5223815cbfe1b",
          "author": {
            "_id": "6725f9bd0e841e43991553e2",
            "name": "Prof. Agus Heryanto M.kom, PH.d",
            "imageUrl": "uploads/authors/ai-385e74a7-b93c-4eae-9ded-ea850bd9decb.png",
            "createdAt": "2024-11-02T10:06:53.007Z",
            "updatedAt": "2024-11-04T15:05:51.743Z"
          },
          "title": "Life after end I",
          "summary": "Something that can't imaginating with human",
          "description": "This book is a secret book, just some unique people can borrow this book",
          "categories": [
            {
              "_id": "67262182635e0d0fff93f952",
              "name": "Adventure",
              "createdAt": "2024-11-02T12:56:34.229Z",
              "updatedAt": "2024-11-02T12:56:34.229Z"
            },
            {
              "_id": "6726217c635e0d0fff93f950",
              "name": "Fiction (UPDATED)",
              "createdAt": "2024-11-02T12:56:28.565Z",
              "updatedAt": "2024-11-04T15:30:44.048Z"
            }
          ],
          "bookEditions": [
            {
              "_id": "67289c01f3f5223815cbfe22",
              "bookId": "67289c01f3f5223815cbfe1b",
              "isbn": "987-9-24-01-1",
              "quantity": 100,
              "isAvailable": true,
              "createdAt": "2024-11-04T10:03:45.131Z",
              "updatedAt": "2024-11-04T10:03:45.131Z"
            }
          ]
        },
        {
          "id": "67289c43f3f5223815cbfe25",
          "author": {
            "_id": "6725f9bd0e841e43991553e2",
            "name": "Prof. Agus Heryanto M.kom, PH.d",
            "imageUrl": "uploads/authors/ai-385e74a7-b93c-4eae-9ded-ea850bd9decb.png",
            "createdAt": "2024-11-02T10:06:53.007Z",
            "updatedAt": "2024-11-04T15:05:51.743Z"
          },
          "title": "Life after end II",
          "summary": "Something that can't imaginating with human",
          "description": "This book is a secret book, just some unique people can borrow this book",
          "categories": [
            {
              "_id": "67262182635e0d0fff93f952",
              "name": "Adventure",
              "createdAt": "2024-11-02T12:56:34.229Z",
              "updatedAt": "2024-11-02T12:56:34.229Z"
            },
            {
              "_id": "6726217c635e0d0fff93f950",
              "name": "Fiction (UPDATED)",
              "createdAt": "2024-11-02T12:56:28.565Z",
              "updatedAt": "2024-11-04T15:30:44.048Z"
            }
          ],
          "bookEditions": [
            {
              "_id": "67289c43f3f5223815cbfe2b",
              "bookId": "67289c43f3f5223815cbfe25",
              "isbn": "987-9-24-01-3",
              "quantity": 100,
              "isAvailable": true,
              "createdAt": "2024-11-04T10:04:51.822Z",
              "updatedAt": "2024-11-04T10:04:51.822Z"
            },
            {
              "_id": "67289c43f3f5223815cbfe2c",
              "bookId": "67289c43f3f5223815cbfe25",
              "isbn": "987-9-24-01-4",
              "quantity": 100,
              "isAvailable": true,
              "createdAt": "2024-11-04T10:04:51.822Z",
              "updatedAt": "2024-11-04T10:04:51.822Z"
            }
          ]
        },
        {
          "id": "67289db746eca0aef5b1fced",
          "author": {
            "_id": "6725f9bd0e841e43991553e2",
            "name": "Prof. Agus Heryanto M.kom, PH.d",
            "imageUrl": "uploads/authors/ai-385e74a7-b93c-4eae-9ded-ea850bd9decb.png",
            "createdAt": "2024-11-02T10:06:53.007Z",
            "updatedAt": "2024-11-04T15:05:51.743Z"
          },
          "title": "Life after end II (UPDATED)",
          "summary": "Something that can't imaginating with human (UPDATED)",
          "description": "This book is a secret book, just some unique people can borrow this book (UPDATED)",
          "categories": [
            {
              "_id": "67262182635e0d0fff93f952",
              "name": "Adventure",
              "createdAt": "2024-11-02T12:56:34.229Z",
              "updatedAt": "2024-11-02T12:56:34.229Z"
            },
            {
              "_id": "6726217c635e0d0fff93f950",
              "name": "Fiction (UPDATED)",
              "createdAt": "2024-11-02T12:56:28.565Z",
              "updatedAt": "2024-11-04T15:30:44.048Z"
            }
          ],
          "bookEditions": [
            {
              "_id": "67289db746eca0aef5b1fcf3",
              "bookId": "67289db746eca0aef5b1fced",
              "isbn": "987-9-24-01-99",
              "quantity": 80,
              "isAvailable": false,
              "createdAt": "2024-11-04T10:11:03.416Z",
              "updatedAt": "2024-11-04T11:13:38.236Z"
            },
            {
              "_id": "67289db746eca0aef5b1fcf4",
              "bookId": "67289db746eca0aef5b1fced",
              "isbn": "987-9-24-01-6",
              "quantity": 70,
              "isAvailable": true,
              "createdAt": "2024-11-04T10:11:03.416Z",
              "updatedAt": "2024-11-04T11:13:38.241Z"
            }
          ]
        }
      ]
    }
  }
  ```
  - **404 Not Found**

### Add New Book

- **Method**: `POST`
- **Endpoint**: `/book`
- **Description**: Untuk menambahkan data buku baru
- **Request**:
  - _Body_
  ```json
  {
    "authorId": "67261c5dfc0babfeca7fbc4f",
    "title": "Life after end II",
    "summary": "Something that can't imaginating with human",
    "description": "This book is a secret book, just some unique people can borrow this book",
    "bookEditions": [
      {
        "isbn": "987-9-24-01-40",
        "quantity": 100,
        "isAvailable": true
      },
      {
        "isbn": "987-9-24-01-41",
        "quantity": 100,
        "isAvailable": true
      }
    ],
    "categories": [
      {
        "_id": "67296b3937c4dda4b9364516"
      },
      {
        "_id": "67296b6037c4dda4b936451a"
      }
    ]
  }
  ```
- **Response**
  - **201 OK**
  ```json
  {
    "status": "success",
    "message": "successfully created",
    "data": {
      "book": {
        "id": "6728e8e611f6e47093241227",
        "author": {
          "_id": "672625baf940ce24f2cc0c35",
          "name": "Prof. Agus Heryanto M.kom, PH.d",
          "imageUrl": "uploads/authors/ai-f0ad6fe6-c041-417d-aa3b-47fc27b9a3cf.png",
          "createdAt": "2024-11-02T13:14:34.715Z",
          "updatedAt": "2024-11-04T15:10:47.490Z"
        },
        "title": "Life after end II",
        "summary": "Something that can't imaginating with human",
        "description": "This book is a secret book, just some unique people can borrow this book",
        "categories": [
          {
            "_id": "67262182635e0d0fff93f952",
            "name": "Adventure",
            "createdAt": "2024-11-02T12:56:34.229Z",
            "updatedAt": "2024-11-02T12:56:34.229Z"
          },
          {
            "_id": "6726217c635e0d0fff93f950",
            "name": "Fiction (UPDATED)",
            "createdAt": "2024-11-02T12:56:28.565Z",
            "updatedAt": "2024-11-04T15:30:44.048Z"
          }
        ],
        "bookEditions": [
          {
            "_id": "6728e8e611f6e4709324122d",
            "bookId": "6728e8e611f6e47093241227",
            "isbn": "987-9-24-01-30",
            "quantity": 100,
            "isAvailable": true,
            "createdAt": "2024-11-04T15:31:50.177Z",
            "updatedAt": "2024-11-04T15:31:50.177Z"
          },
          {
            "_id": "6728e8e611f6e4709324122e",
            "bookId": "6728e8e611f6e47093241227",
            "isbn": "987-9-24-01-31",
            "quantity": 100,
            "isAvailable": true,
            "createdAt": "2024-11-04T15:31:50.177Z",
            "updatedAt": "2024-11-04T15:31:50.177Z"
          }
        ],
        "createdAt": "2024-11-04T15:31:50.166Z",
        "updatedAt": "2024-11-04T15:31:50.181Z"
      }
    }
  }
  ```
  - **400 Bad Request**
  - **409 Conflict**

### Update Book

- **Method**: `PUT`
- **Endpoint**: `/book/:id`
- **Description**: Untuk mengupdate buku
- **Request**:
  ```json
  {
    "authorId": "6725f9bd0e841e43991553e2",
    "title": "Life after end II (UPDATED)",
    "summary": "Something that can't imaginating with human (UPDATED)",
    "description": "This book is a secret book, just some unique people can borrow this book (UPDATED)",
    "bookEditions": [
      {
        "isbn": "987-9-24-01-40",
        "quantity": 80,
        "isAvailable": false
      },
      {
        "isbn": "987-9-24-01-41",
        "quantity": 70,
        "isAvailable": true
      }
    ],
    "categories": [
      {
        "_id": "67262182635e0d0fff93f952"
      },
      {
        "_id": "6726217c635e0d0fff93f950"
      }
    ]
  }
  ```
- **Response**

```json
{
  "status": "success",
  "message": "successfully updated",
  "data": {
    "book": {
      "_id": "6728e8e611f6e47093241227",
      "authorId": {
        "_id": "6725f9bd0e841e43991553e2",
        "name": "Prof. Agus Heryanto M.kom, PH.d",
        "imageUrl": "uploads/authors/ai-385e74a7-b93c-4eae-9ded-ea850bd9decb.png",
        "createdAt": "2024-11-02T10:06:53.007Z",
        "updatedAt": "2024-11-04T15:05:51.743Z"
      },
      "title": "Life after end II (UPDATED)",
      "summary": "Something that can't imaginating with human (UPDATED)",
      "description": "This book is a secret book, just some unique people can borrow this book (UPDATED)",
      "bookEditions": [
        {
          "_id": "6728e8e611f6e4709324122d",
          "bookId": "6728e8e611f6e47093241227",
          "isbn": "987-9-24-01-40",
          "quantity": 80,
          "isAvailable": false,
          "createdAt": "2024-11-04T15:31:50.177Z",
          "updatedAt": "2024-11-04T15:34:06.231Z"
        },
        {
          "_id": "6728e8e611f6e4709324122e",
          "bookId": "6728e8e611f6e47093241227",
          "isbn": "987-9-24-01-41",
          "quantity": 70,
          "isAvailable": true,
          "createdAt": "2024-11-04T15:31:50.177Z",
          "updatedAt": "2024-11-04T15:34:06.242Z"
        }
      ],
      "categories": [
        {
          "_id": "67262182635e0d0fff93f952",
          "name": "Adventure",
          "createdAt": "2024-11-02T12:56:34.229Z",
          "updatedAt": "2024-11-02T12:56:34.229Z"
        },
        {
          "_id": "6726217c635e0d0fff93f950",
          "name": "Fiction (UPDATED)",
          "createdAt": "2024-11-02T12:56:28.565Z",
          "updatedAt": "2024-11-04T15:30:44.048Z"
        }
      ],
      "createdAt": "2024-11-04T15:31:50.166Z",
      "updatedAt": "2024-11-04T15:34:06.251Z"
    }
  }
}
```

### Delete Book

- **Method**: `DELETE`
- **Endpoint**: `/book/:id`
- **Description**: Untuk menghapus buku
- **Response**
  - **200 OK**
  ```json
  {
    "status": "success",
    "message": "successfully deleted",
    "data": {
      "book": {
        "_id": "6728e8e611f6e47093241227",
        "authorId": "6725f9bd0e841e43991553e2",
        "title": "Life after end II (UPDATED)",
        "summary": "Something that can't imaginating with human (UPDATED)",
        "description": "This book is a secret book, just some unique people can borrow this book (UPDATED)",
        "imageUrl": "uploads/books/ai-59d0963f-8834-466b-b7fd-ff0d2605f4a4.png",
        "bookEditions": [
          "6728e8e611f6e4709324122d",
          "6728e8e611f6e4709324122e"
        ],
        "categories": ["67262182635e0d0fff93f952", "6726217c635e0d0fff93f950"],
        "createdAt": "2024-11-04T15:31:50.166Z",
        "updatedAt": "2024-11-04T15:36:10.117Z"
      }
    }
  }
  ```
  - **404 Not Found**

### Upload Book Cover

- **Method**: `POST`
- **Endpoint**: `/book/upload`
- **Description**: Untuk mengupload sampul buku
- **Request**:

  - form-data\_

  ```json
  {
    "image" : "image.png" // file
    "bookId" : "6728e8e611f6e47093241227"
  }
  ```

- **Response**

  - **200 OK**

  ```json
  {
    "status": "success",
    "message": "successfully uploaded",
    "data": {
      "book": {
        "_id": "6728e8e611f6e47093241227",
        "authorId": {
          "_id": "6725f9bd0e841e43991553e2",
          "name": "Prof. Agus Heryanto M.kom, PH.d",
          "imageUrl": "uploads/authors/ai-385e74a7-b93c-4eae-9ded-ea850bd9decb.png",
          "createdAt": "2024-11-02T10:06:53.007Z",
          "updatedAt": "2024-11-04T15:05:51.743Z"
        },
        "title": "Life after end II (UPDATED)",
        "summary": "Something that can't imaginating with human (UPDATED)",
        "description": "This book is a secret book, just some unique people can borrow this book (UPDATED)",
        "imageUrl": "uploads/books/ai-59d0963f-8834-466b-b7fd-ff0d2605f4a4.png",
        "bookEditions": [
          {
            "_id": "6728e8e611f6e4709324122d",
            "bookId": "6728e8e611f6e47093241227",
            "isbn": "987-9-24-01-40",
            "quantity": 80,
            "isAvailable": false,
            "createdAt": "2024-11-04T15:31:50.177Z",
            "updatedAt": "2024-11-04T15:34:06.231Z"
          },
          {
            "_id": "6728e8e611f6e4709324122e",
            "bookId": "6728e8e611f6e47093241227",
            "isbn": "987-9-24-01-41",
            "quantity": 70,
            "isAvailable": true,
            "createdAt": "2024-11-04T15:31:50.177Z",
            "updatedAt": "2024-11-04T15:34:06.242Z"
          }
        ],
        "categories": [
          {
            "_id": "67262182635e0d0fff93f952",
            "name": "Adventure",
            "createdAt": "2024-11-02T12:56:34.229Z",
            "updatedAt": "2024-11-02T12:56:34.229Z"
          },
          {
            "_id": "6726217c635e0d0fff93f950",
            "name": "Fiction (UPDATED)",
            "createdAt": "2024-11-02T12:56:28.565Z",
            "updatedAt": "2024-11-04T15:30:44.048Z"
          }
        ],
        "createdAt": "2024-11-04T15:31:50.166Z",
        "updatedAt": "2024-11-04T15:35:50.386Z"
      }
    }
  }
  ```

- **400 Bad Request**

### Delete Book Editions

- **Method**: `DELETE`
- **Endpoint**: `/book/book-editions/:id`
- **Description**: Untuk menghapus edisi buku

- **Response**

  - **200 OK**

  ```json
  {
    "status": "success",
    "message": "successfully deleted",
    "data": {
      "book": {
        "_id": "6728e8e611f6e47093241227",
        "authorId": "6725f9bd0e841e43991553e2",
        "title": "Life after end II (UPDATED)",
        "summary": "Something that can't imaginating with human (UPDATED)",
        "description": "This book is a secret book, just some unique people can borrow this book (UPDATED)",
        "imageUrl": "uploads/books/ai-59d0963f-8834-466b-b7fd-ff0d2605f4a4.png",
        "bookEditions": [
          "6728e8e611f6e4709324122d",
          "6728e8e611f6e4709324122e"
        ],
        "categories": ["67262182635e0d0fff93f952", "6726217c635e0d0fff93f950"],
        "createdAt": "2024-11-04T15:31:50.166Z",
        "updatedAt": "2024-11-04T15:36:10.117Z"
      }
    }
  }
  ```

  - **404 Not Found**

---

## Author

### Get List of Authors

- **Method**: `GET`
- **Endpoint**: `/authors`
- **Description**: Untuk mendapatkan list author
- **Response**

  - **200 OK**

  ```json
  {
    "status": "success",
    "message": "successfully fetched",
    "data": {
      "author": [
        {
          "_id": "67261c5dfc0babfeca7fbc4f",
          "name": "Agus Testing",
          "createdAt": "2024-11-02T12:34:37.502Z",
          "updatedAt": "2024-11-02T12:34:37.502Z"
        },
        {
          "_id": "6726210d635e0d0fff93f94c",
          "name": "Agus Testing",
          "createdAt": "2024-11-02T12:54:37.386Z",
          "updatedAt": "2024-11-02T12:54:37.386Z"
        }
      ]
    }
  }
  ```

- **400 Not Found**

### Get Author Details

- **Method**: `GET`
- **Endpoint**: `/author/:id`
- **Description**: Untuk mendapatkan detail author
- **Response**

  - **200 OK**

  ```json
  {
    "status": "success",
    "message": "successfully fetched",
    "data": {
      "author": {
        "_id": "6725f9bd0e841e43991553e2",
        "name": "Prof. Agus Heryanto M.kom, PH.d",
        "imageUrl": "uploads/authors/ai-385e74a7-b93c-4eae-9ded-ea850bd9decb.png",
        "createdAt": "2024-11-02T10:06:53.007Z",
        "updatedAt": "2024-11-03T06:24:34.000Z"
      }
    }
  }
  ```

- **404 Not Found**

### Add New Author

- **Method**: `POST`
- **Endpoint**: `/author`
- **Description**: Untuk menambahkan data author baru
- **Request**:

  ```json
  {
    "name": "Agus Heryanto"
  }
  ```

- **Response**
  - **201 OK**
  ```json
  {
    "status": "success",
    "message": "successfully created",
    "data": {
      "author": {
        "name": "Agus Heryanto",
        "_id": "6728e04417dc7862f21710a9",
        "createdAt": "2024-11-04T14:55:00.297Z",
        "updatedAt": "2024-11-04T14:55:00.297Z"
      }
    }
  }
  ```

### Update Author

- **Method**: `PUT`
- **Endpoint**: `/author/:id`
- **Description**: Untuk mengupdate author

- **Request**

  ```json
  {
    "name": "Prof. Agus Heryanto M.kom, PH.d"
  }
  ```

- **Response**

  - **200 OK**

  ```json
  {
    "status": "success",
    "message": "successfully updated",
    "data": {
      "author": {
        "_id": "6725f9bd0e841e43991553e2",
        "name": "Prof. Agus Heryanto M.kom, PH.d",
        "imageUrl": "uploads/authors/ai-385e74a7-b93c-4eae-9ded-ea850bd9decb.png",
        "createdAt": "2024-11-02T10:06:53.007Z",
        "updatedAt": "2024-11-04T15:04:36.832Z"
      }
    }
  }
  ```

- **404 Not Found**
- **400 Bad Request**

### Delete Author

- **Method**: `DELETE`
- **Endpoint**: `/author/:id`
- **Description**: Untuk menghapus author

- **Response**

  - **200 OK**

  ```json
  {
    "status": "success",
    "message": "successfully deleted",
    "data": {
      "author": {
        "_id": "6725f9bd0e841e43991553e2",
        "name": "Prof. Agus Heryanto M.kom, PH.d",
        "imageUrl": "uploads/authors/ai-385e74a7-b93c-4eae-9ded-ea850bd9decb.png",
        "createdAt": "2024-11-02T10:06:53.007Z",
        "updatedAt": "2024-11-04T15:05:51.743Z"
      }
    }
  }
  ```

- **404 Not Found**

### Upload Author Photo

- **Method**: `POST`
- **Endpoint**: `/author/upload`
- **Description**: Untuk mengupload foto author
- **Request**:

  - _Body_

  ```form-data
  {
    // form-data

    "authorId": "string",
    "image": "file"
  }
  ```

- **Response**
  - **200 OK**
  ```json
  {
    "status": "success",
    "message": "successfully uploaded",
    "data": {
      "author": {
        "_id": "672625baf940ce24f2cc0c35",
        "name": "Prof. Agus Heryanto M.kom, PH.d",
        "imageUrl": "uploads/authors/ai-f0ad6fe6-c041-417d-aa3b-47fc27b9a3cf.png",
        "createdAt": "2024-11-02T13:14:34.715Z",
        "updatedAt": "2024-11-04T15:10:47.490Z"
      }
    }
  }
  ```
  - **400 Bad Request**
  - **500 Internal Server Error**

---

## Category

### Get List of Categories

- **Method**: `GET`
- **Endpoint**: `/categories`
- **Description**: Untuk mendapatkan list kategori
- **Response**

  - **200 OK**

  ```json
  {
    "status": "success",
    "message": "successfully fetched",
    "data": {
      "category": [
        {
          "_id": "67262190635e0d0fff93f956",
          "name": "Mystery",
          "createdAt": "2024-11-02T12:56:48.266Z",
          "updatedAt": "2024-11-02T12:56:48.266Z"
        },
        {
          "_id": "6728e5e5c04bff2c91566ba1",
          "name": "Drama",
          "createdAt": "2024-11-04T15:19:01.105Z",
          "updatedAt": "2024-11-04T15:19:01.105Z"
        }
      ]
    }
  }
  ```

### Get Category Details

- **Method**: `GET`
- **Endpoint**: `/category/:id`
- **Description**: Untuk mendapatkan detail kategori

- **Response**

  - **200 OK**

  ```json
  {
    "status": "success",
    "message": "successfully fetched",
    "data": {
      "category": [
        {
          "_id": "6726217c635e0d0fff93f950",
          "name": "Fiction",
          "createdAt": "2024-11-02T12:56:28.565Z",
          "updatedAt": "2024-11-02T12:56:28.565Z"
        }
      ]
    }
  }
  ```

- **404 Not Found**

### Add New Category

- **Method**: `POST`
- **Endpoint**: `/category`
- **Description**: Untuk menambahkan data kategori baru

- **Request**

  ```json
  {
    "name": "Fiction"
  }
  ```

- **Response**

  - **201 OK**

  ```json
  {
    "status": "success",
    "message": "successfully created",
    "data": {
      "category": {
        "name": "Classic",
        "_id": "67296b6037c4dda4b936451a",
        "createdAt": "2024-11-05T00:48:32.031Z",
        "updatedAt": "2024-11-05T00:48:32.031Z"
      }
    }
  }
  ```

- **400 Bad Request**

### Update Category

- **Method**: `PUT`
- **Endpoint**: `/category/:id`
- **Description**: Untuk mengupdate kategori

- **Request**

  ```json
  {
    "name": "Fiction (UPDATED)"
  }
  ```

- **Response**

  - **200 OK**

  ```json
  {
    "status": "success",
    "message": "successfully updated",
    "data": {
      "category": {
        "_id": "6726217c635e0d0fff93f950",
        "name": "Fiction (UPDATED)",
        "createdAt": "2024-11-02T12:56:28.565Z",
        "updatedAt": "2024-11-04T15:30:17.876Z"
      }
    }
  }
  ```

- **404 Not Found**

### Delete Category

- **Method**: `DELETE`
- **Endpoint**: `/category/:id`
- **Description**: Untuk menghapus kategori

- **Response**

  - **200 OK**

  ```json
  {
    "status": "success",
    "message": "successfully deleted",
    "data": {
      "category": {
        "_id": "6726217c635e0d0fff93f950",
        "name": "Fiction (UPDATED)",
        "createdAt": "2024-11-02T12:56:28.565Z",
        "updatedAt": "2024-11-04T15:30:44.048Z"
      }
    }
  }
  ```

- **404 Not Found**

---

## Borrower

### Get List of Borrowers

- **Method**: `GET`
- **Endpoint**: `/borrowers`
- **Description**: Untuk mendapatkan list peminjam

- **Response**

  - **200 OK**

  ```json
  {
    "status": "success",
    "message": "successfully fetched",
    "data": {
      "borrower": [
        {
          "_id": "67272718f0db9eab5398d934",
          "name": "Suga",
          "joinedAt": "2024-11-03T07:32:25.117Z",
          "createdAt": "2024-11-03T07:32:40.372Z",
          "updatedAt": "2024-11-03T07:32:40.372Z"
        },
        {
          "_id": "6728ea2b3dc46c8d7a011792",
          "name": "Ir Agus Heryanto",
          "joinedAt": "2024-11-04T15:35:48.537Z",
          "createdAt": "2024-11-04T15:37:15.045Z",
          "updatedAt": "2024-11-04T15:37:15.045Z"
        }
      ]
    }
  }
  ```

- **404 Bad Request**

### Get Borrower Details

- **Method**: `GET`
- **Endpoint**: `/borrower/:id`
- **Description**: Untuk mendapatkan detail peminjam

- **Response**

  - **200 OK**

  ```json
  {
    "status": "success",
    "message": "successfully fetched",
    "data": {
      "borrower": [
        {
          "_id": "6728ea2b3dc46c8d7a011792",
          "name": "Ir Agus Heryanto",
          "joinedAt": "2024-11-04T15:35:48.537Z",
          "createdAt": "2024-11-04T15:37:15.045Z",
          "updatedAt": "2024-11-04T15:37:15.045Z"
        }
      ]
    }
  }
  ```

- **404 Not Found**

### Add New Borrower

- **Method**: `POST`
- **Endpoint**: `/borrower`
- **Description**: Untuk menambahkan data peminjam baru

- **Request**

  ```json
  {
    "name": "Suga Borrower"
  }
  ```

- **Response**

  - **201 OK**

  ```json
  {
    "status": "success",
    "message": "successfully created",
    "data": {
      "borrower": {
        "name": "Ir Agus Heryanto",
        "joinedAt": "2024-11-04T15:35:48.537Z",
        "_id": "6728ea2b3dc46c8d7a011792",
        "createdAt": "2024-11-04T15:37:15.045Z",
        "updatedAt": "2024-11-04T15:37:15.045Z"
      }
    }
  }
  ```

- **400 Bad Request**

### Update Borrower

- **Method**: `PUT`
- **Endpoint**: `/borrower/:id`
- **Description**: Untuk mengupdate peminjam

- **Request**

  ```json
  {
    "name": "Prof Drs Ir H Agus Heryanto M.Kom PH.d"
  }
  ```

- **Response**

  - **200 OK**

  ```json
  {
    "status": "success",
    "message": "successfully updated",
    "data": {
      "borrower": {
        "_id": "6728ea2b3dc46c8d7a011792",
        "name": "Prof Drs Ir H Agus Heryanto M.Kom PH.d",
        "joinedAt": "2024-11-04T15:35:48.537Z",
        "createdAt": "2024-11-04T15:37:15.045Z",
        "updatedAt": "2024-11-04T15:38:49.127Z"
      }
    }
  }
  ```

- **404 Not Found**
- **400 Bad Request**

### Delete Borrower

- **Method**: `DELETE`
- **Endpoint**: `/borrower/:id`
- **Description**: Untuk menghapus peminjam

- **Response**

  - **200 OK**

  ```json
  {
    "status": "success",
    "message": "successfully deleted",
    "data": {
      "borrower": {
        "_id": "6728ea2b3dc46c8d7a011792",
        "name": "Prof Drs Ir H Agus Heryanto M.Kom PH.d",
        "joinedAt": "2024-11-04T15:35:48.537Z",
        "createdAt": "2024-11-04T15:37:15.045Z",
        "updatedAt": "2024-11-04T15:39:48.720Z"
      }
    }
  }
  ```

- **404 Not Found**

---

## Borrowed Book

### Borrow Book

- **Method**: `POST`
- **Endpoint**: `/borrow/book`
- **Description**: Untuk menambahkan data peminjam buku

- **Request**

  ```json
  {
    "borrowerId": "67272718f0db9eab5398d934",
    "bookId": "6728ecfcb08f865f29f2ac2f",
    "bookEditionId": "6728ecfcb08f865f29f2ac36",
    "quantity": 1,

    // yyyy-mm-dd
    "expectedReturnAt": "2024-11-06"
  }
  ```

- **Response**

  - **201 OK**

  ```json
  {
    "status": "success",
    "message": "successfully created",
    "data": {
      "borrowedBook": {
        "id": "6729d06d96812aba4d66b6dd",
        "borrower": {
          "_id": "67272718f0db9eab5398d934",
          "name": "Suga",
          "joinedAt": "2024-11-03T07:32:25.117Z",
          "createdAt": "2024-11-03T07:32:40.372Z",
          "updatedAt": "2024-11-03T07:32:40.372Z"
        },
        "book": {
          "_id": "6728ecfcb08f865f29f2ac2f",
          "authorId": "672625baf940ce24f2cc0c35",
          "title": "Life after end II",
          "summary": "Something that can't imaginating with human",
          "description": "This book is a secret book, just some unique people can borrow this book",
          "bookEditions": ["6728ecfcb08f865f29f2ac36"],
          "categories": ["6726217c635e0d0fff93f950"],
          "createdAt": "2024-11-04T15:49:16.868Z",
          "updatedAt": "2024-11-04T16:21:50.620Z"
        },
        "bookEdition": {
          "_id": "6728ecfcb08f865f29f2ac36",
          "bookId": "6728ecfcb08f865f29f2ac2f",
          "isbn": "987-9-24-01-31",
          "quantity": 54,
          "isAvailable": true,
          "createdAt": "2024-11-04T15:49:16.876Z",
          "updatedAt": "2024-11-05T07:57:17.546Z"
        },
        "quantity": 1,
        "borrowedAt": "2024-11-05T07:59:41.025Z",
        "expectedReturnAt": "2024-11-06T00:00:00.000Z",
        "returnedAt": null,
        "penalties": 0
      }
    }
  }
  ```

- **400 Bad Request**

- **404 Not Found**

### Get List of Active Borrowed Books

- **Method**: `GET`
- **Endpoint**: `/borrow/book/list`
- **Description**: Untuk mendapatkan list data peminjam buku yang masih aktif

- **Response**

  - **200 OK**

  ```json
  {
    "status": "success",
    "message": "successfully fetched",
    "data": {
      "borrowedBook": [
        {
          "id": "6729d06d96812aba4d66b6dd",
          "borrower": {
            "_id": "67272718f0db9eab5398d934",
            "name": "Suga",
            "joinedAt": "2024-11-03T07:32:25.117Z",
            "createdAt": "2024-11-03T07:32:40.372Z",
            "updatedAt": "2024-11-03T07:32:40.372Z"
          },
          "book": {
            "_id": "6728ecfcb08f865f29f2ac2f",
            "authorId": "672625baf940ce24f2cc0c35",
            "title": "Life after end II",
            "summary": "Something that can't imaginating with human",
            "description": "This book is a secret book, just some unique people can borrow this book",
            "bookEditions": ["6728ecfcb08f865f29f2ac36"],
            "categories": ["6726217c635e0d0fff93f950"],
            "createdAt": "2024-11-04T15:49:16.868Z",
            "updatedAt": "2024-11-04T16:21:50.620Z"
          },
          "bookEdition": {
            "_id": "6728ecfcb08f865f29f2ac36",
            "bookId": "6728ecfcb08f865f29f2ac2f",
            "isbn": "987-9-24-01-31",
            "quantity": 52,
            "isAvailable": true,
            "createdAt": "2024-11-04T15:49:16.876Z",
            "updatedAt": "2024-11-05T08:29:34.860Z"
          },
          "quantity": 1,
          "borrowedAt": "2024-11-05T07:59:41.025Z",
          "expectedReturnAt": "2024-11-06T00:00:00.000Z",
          "returnedAt": null,
          "penalties": 0
        },
        {
          "id": "6729d76e96812aba4d66b6f0",
          "borrower": {
            "_id": "67272718f0db9eab5398d934",
            "name": "Suga",
            "joinedAt": "2024-11-03T07:32:25.117Z",
            "createdAt": "2024-11-03T07:32:40.372Z",
            "updatedAt": "2024-11-03T07:32:40.372Z"
          },
          "book": {
            "_id": "6728ecfcb08f865f29f2ac2f",
            "authorId": "672625baf940ce24f2cc0c35",
            "title": "Life after end II",
            "summary": "Something that can't imaginating with human",
            "description": "This book is a secret book, just some unique people can borrow this book",
            "bookEditions": ["6728ecfcb08f865f29f2ac36"],
            "categories": ["6726217c635e0d0fff93f950"],
            "createdAt": "2024-11-04T15:49:16.868Z",
            "updatedAt": "2024-11-04T16:21:50.620Z"
          },
          "bookEdition": {
            "_id": "6728ecfcb08f865f29f2ac36",
            "bookId": "6728ecfcb08f865f29f2ac2f",
            "isbn": "987-9-24-01-31",
            "quantity": 52,
            "isAvailable": true,
            "createdAt": "2024-11-04T15:49:16.876Z",
            "updatedAt": "2024-11-05T08:29:34.860Z"
          },
          "quantity": 1,
          "borrowedAt": "2024-11-05T08:29:34.848Z",
          "expectedReturnAt": "2024-11-06T00:00:00.000Z",
          "returnedAt": null,
          "penalties": 0
        }
      ]
    }
  }
  ```

### Return Book

- **Method**: `POST`
- **Endpoint**: `/borrow/book/return`
- **Description**: Untuk menambahkan data pengembalian buku

- **Request**

  ```json
  {
    "borrowedId": "6729cf74ef269cbec01ebde1"
  }
  ```

- **Response**

  ```json
  {
    "status": "success",
    "message": "successfully returned",
    "data": {
      "borrowedBook": {
        "id": "6729cf74ef269cbec01ebde1",
        "borrower": "67272718f0db9eab5398d934",
        "book": "6728ecfcb08f865f29f2ac2f",
        "bookEdition": "6728ecfcb08f865f29f2ac36",
        "quantity": 1,
        "borrowedAt": "2024-11-05T07:55:32.074Z",
        "expectedReturnAt": "2024-11-06T00:00:00.000Z",
        "returnedAt": "2024-11-05T07:57:17.543Z",
        "penalties": 0
      }
    }
  }
  ```

  - **404 Not Found**

### Get List Log of Borrowed Books

- **Method**: `POST`
- **Endpoint**: `/stock-log`
- **Description**: Untuk melihat stock log peminjaman buku

- **Response**

  ```json
  {
    "status": "success",
    "message": "successfully fetched",
    "data": {
      "bookStockLog": [
        {
          "_id": "6729cf74ef269cbec01ebdea",
          "borrowedBookId": {
            "_id": "6729cf74ef269cbec01ebde1",
            "borrowerId": "67272718f0db9eab5398d934",
            "bookId": "6728ecfcb08f865f29f2ac2f",
            "bookEditionId": "6728ecfcb08f865f29f2ac36",
            "quantity": 1,
            "borrowedAt": "2024-11-05T07:55:32.074Z",
            "expectedReturnAt": "2024-11-06T00:00:00.000Z",
            "returnedAt": "2024-11-05T07:57:17.543Z",
            "createdAt": "2024-11-05T07:55:32.085Z",
            "updatedAt": "2024-11-05T07:57:17.548Z"
          },
          "status": "returned",
          "createdAt": "2024-11-05T07:55:32.104Z",
          "updatedAt": "2024-11-05T07:57:17.549Z",
          "__v": 0
        },
        {
          "_id": "6729d06d96812aba4d66b6e6",
          "borrowedBookId": {
            "_id": "6729d06d96812aba4d66b6dd",
            "borrowerId": "67272718f0db9eab5398d934",
            "bookId": "6728ecfcb08f865f29f2ac2f",
            "bookEditionId": "6728ecfcb08f865f29f2ac36",
            "quantity": 1,
            "borrowedAt": "2024-11-05T07:59:41.025Z",
            "expectedReturnAt": "2024-11-06T00:00:00.000Z",
            "createdAt": "2024-11-05T07:59:41.038Z",
            "updatedAt": "2024-11-05T07:59:41.038Z"
          },
          "status": "borrowed",
          "createdAt": "2024-11-05T07:59:41.057Z",
          "updatedAt": "2024-11-05T07:59:41.057Z",
          "__v": 0
        }
      ]
    }
  }
  ```

  - **404 Not Found**
