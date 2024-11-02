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
    "title": "string",
    "description": "string",
    "summary": "string",
    "author_id": "string"
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

### Add New Book

- **Method**: `POST`
- **Endpoint**: `/book`
- **Description**: Untuk menambahkan data buku baru

### Update Book

- **Method**: `PUT`
- **Endpoint**: `/book/:id`
- **Description**: Untuk mengupdate buku

### Delete Book

- **Method**: `DELETE`
- **Endpoint**: `/book/:id`
- **Description**: Untuk menghapus buku

### Upload Book Cover

- **Method**: `POST`
- **Endpoint**: `/book/upload`
- **Description**: Untuk mengupload sampul buku

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
    "message": "string",
    "data": {
      "_id": "string",
      "name": "string",
      "created_at": timestamp,
      "updated_at": timestamp
    }
  }
  ```
  - **400 Not Found**

### Get Author Details

- **Method**: `GET`
- **Endpoint**: `/author/:id`
- **Description**: Untuk mendapatkan detail author

### Add New Author

- **Method**: `POST`
- **Endpoint**: `/author`
- **Description**: Untuk menambahkan data author baru

### Update Author

- **Method**: `PUT`
- **Endpoint**: `/author/:id`
- **Description**: Untuk mengupdate author

### Delete Author

- **Method**: `DELETE`
- **Endpoint**: `/author/:id`
- **Description**: Untuk menghapus author

### Upload Author Photo

- **Method**: `POST`
- **Endpoint**: `/author/upload`
- **Description**: Untuk mengupload foto author
- **Request**:

  - _Body_

  ```form-data
  {
    // form-data

    "_id": "string",
    "image": "file"
  }
  ```

- **Response**
  - **200 OK**
  ```json
  {
    "message": "string",
    "data": {
      "_id": "string",
      "image_url": "string"
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

### Get Category Details

- **Method**: `GET`
- **Endpoint**: `/category/:id`
- **Description**: Untuk mendapatkan detail kategori

### Add New Category

- **Method**: `POST`
- **Endpoint**: `/category`
- **Description**: Untuk menambahkan data kategori baru

### Update Category

- **Method**: `PUT`
- **Endpoint**: `/category/:id`
- **Description**: Untuk mengupdate kategori

### Delete Category

- **Method**: `DELETE`
- **Endpoint**: `/category/:id`
- **Description**: Untuk menghapus kategori

---

## Borrower

### Get List of Borrowers

- **Method**: `GET`
- **Endpoint**: `/borrowers`
- **Description**: Untuk mendapatkan list peminjam

### Get Borrower Details

- **Method**: `GET`
- **Endpoint**: `/borrower/:id`
- **Description**: Untuk mendapatkan detail peminjam

### Add New Borrower

- **Method**: `POST`
- **Endpoint**: `/borrower`
- **Description**: Untuk menambahkan data peminjam baru

### Update Borrower

- **Method**: `PUT`
- **Endpoint**: `/borrower/:id`
- **Description**: Untuk mengupdate peminjam

### Delete Borrower

- **Method**: `DELETE`
- **Endpoint**: `/borrower/:id`
- **Description**: Untuk menghapus peminjam

---

## Borrow Book

### Borrow Book

- **Method**: `POST`
- **Endpoint**: `/borrow/book`
- **Description**: Untuk menambahkan data peminjam buku

### Get List of Active Borrowed Books

- **Method**: `GET`
- **Endpoint**: `/borrow/book/list`
- **Description**: Untuk mendapatkan list data peminjam buku yang masih aktif

### Return Book

- **Method**: `POST`
- **Endpoint**: `/borrow/book/return`
- **Description**: Untuk menambahkan data pengembalian buku
