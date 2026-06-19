from typing import Optional

from fastapi import FastAPI, Path, Query, HTTPException
from pydantic import BaseModel, Field
from starlette import status

app = FastAPI()


class Book:
    id: int
    title: str
    author: str
    description: str
    rating: float
    published_date: int

    def __init__(self, id, title, author, description, rating, published_date):
        self.id = id
        self.title = title
        self.author = author
        self.description = description
        self.rating = rating
        self.published_date = published_date

class BookValidation(BaseModel):
    id: Optional[int] = Field(description="id is not a required input",default=None)
    title: str = Field(min_length = 1)
    author: str = Field(min_length = 1)
    description: str = Field(min_length = 15, max_length = 200)
    rating: float = Field(ge=0, le = 5)
    published_date: int = Field(ge = 0, le = 2026)

    model_config = {
        "json_schema_extra": {
            "example": {
                "title": "Book",
                "author": "Author",
                "description": "Description",
                "rating": 5,
                "published_date": 2000,
            }
        }

    }
BOOKS = [
    Book(1, 'A Thousand Splendid Suns', 'Khaled Hosseini', 'A Thousand Splendid Suns by Khaled'
                                                           ' Hosseini is a historical fiction novel set in Afghanistan',
                                                            4.5, 2007),
    Book(2, 'One Hundred Years of Solitude', 'Gabriel García Márquez', '100 Years of Solitude'
                                                                       ' is an epic, magical-realist novel by Gabriel '
                                                                       'García Márquez that follows seven generations '
                                                                       'of the Buendía family in the isolated, '
                                                                       'mythical town of Macondo',
                                                                        4.1, 1967),
    Book(3, 'Frankenstein', 'Mary Shelley', 'Frankenstein is a seminal Gothic horror and '
                                            'science fiction novel. It tells the tragic story of Victor Frankenstein.',
                                    3.9, 1818),
    Book(4, 'The Kite Runner', 'Khaled Hosseini', 'The Kite Runner by Khaled Hosseini is a '
                                                  'powerful, coming-of-age story about guilt, betrayal, '
                                                  'and redemption.', 4.4, 2003),
    Book(5, 'The Diary of a Young Girl', 'Anne Frank', 'The Diary of a Young Girl by Anne '
                                                       'Frank is a profoundly moving, essential historical document. '
                                                       'It blends the universal struggles of adolescence with the '
                                                       'unimaginable horrors of the Holocaust. ',
                                            3, 2027),
]


@app.get("/books", status_code=status.HTTP_200_OK)
async def get_books():
    return BOOKS

@app.post("/create_book", status_code=status.HTTP_201_CREATED)
async def create_book(book: BookValidation):
    assign_book_id(book)
    BOOKS.append(Book(**book.model_dump()))

@app.get("/books/{search_id}",status_code=status.HTTP_200_OK)
async def get_book(search_id: int = Path(gt = 0)):
    for book in BOOKS:
        if book.id == search_id:
            return book
    raise HTTPException(status_code=404, detail="Book not found")

@app.get("/books/", status_code=status.HTTP_200_OK)
async def get_books_above_rating(min_rating: float = Query(ge = 0, le = 5)):
    books = []
    for book in BOOKS:
        if book.rating >= min_rating:
            books.append(book)
    return books

def assign_book_id(book):
    book.id = 1 if len(BOOKS) == 0 else BOOKS[-1].id + 1

@app.put("/update_book", status_code=status.HTTP_204_NO_CONTENT)
async def update_book(updated_book: BookValidation):
    book_found = False
    for i in range(len(BOOKS)):
        if BOOKS[i].id ==  updated_book.id:
            BOOKS[i] = updated_book
            # can also write BOOKS[i] = Book(**updated_book.model_dump())
            book_found = True
    if not book_found:
        raise HTTPException(status_code=404, detail="Book not found")


@app.delete("/books/delete_book/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_book(id: int):
    book_found = False
    for i in range(len(BOOKS)):
        if BOOKS[i].id == id:
            BOOKS.pop(i)
            book_found = True
            break
    if not book_found:
        raise HTTPException(status_code=404, detail="Book not found")

@app.get("/books/published/", status_code=status.HTTP_200_OK)
async def get_books_published(after_date: int = Query(ge = 0, le = 2026)):
    books = []
    for book in BOOKS:
        if book.published_date >= after_date:
            books.append(book)
    return books