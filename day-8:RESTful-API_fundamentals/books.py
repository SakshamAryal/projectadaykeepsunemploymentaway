from fastapi import FastAPI, Body
from typing import Union, Optional
from starlette.responses import RedirectResponse

app = FastAPI()

BOOKS = [
    {"title": "A Thousand Splendid Suns", "author": "Khaled Hosseini", "genre": ["fiction", "novel"]},
    {"title": "One Hundered Years of Soltitude", "author": "Gabriel García Márquez", "genre": ["fiction", "novel",
                                                                                               "magical realism",
                                                                                               "family saga"]},
    {"title": "Frankenstein", "author": "Mary Shelley", "genre": ["fiction", "horror", "sci-fi", "novel"]},
    {"title": "The Kite Runner", "author": "Khaled Hosseini", "genre": ["novel", "fiction"]},
    {"title": "The Diary of a Young Girl", "author": "Anne Frank", "genre": ["Biography", "Autobiography",
                                                                             "Personal narrative", "Jewish literature"]}
]
@app.get("/")
def redirect_to_books():
    return RedirectResponse("/books")
@app.get("/books")
async def book_details() -> list[dict]:
    return BOOKS

@app.get("/books/{title}")
async def books_by_title(title: str) -> Union[str, dict[str, Union[str, list[str]]]]:
    for book in BOOKS:
        if book['title'].casefold() == title.casefold():
            return book
    return "Book not found"

@app.get("/books/{genre}/")
async def books_by_genre_and_author(genre: str, author:str) -> list[Optional[dict[str, Union[str, list[str]]]]]:
    books = []
    for book in BOOKS:
        if genre in book['genre'] and author == book['author']:
            books.append(book)
    return books

@app.post("/books/add_book")
async def add_new_book(book = Body()) -> None:
    BOOKS.append(book)

@app.put("/books/update_book")
async def update_book(updating_book = Body()) -> None:
    for book in BOOKS:
        if book['title'] == updating_book['title']:
            book['genre'] = ["novel"]

@app.delete("/books/delete_book/{title")
async def delete_book(title) -> None:
    for i in range(len(BOOKS)):
        if BOOKS[i]['title'] == title:
            BOOKS.pop(i)
            break
