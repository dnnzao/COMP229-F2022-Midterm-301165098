/**
 * Author: Denio Barbosa Junior
 * Date: 29/10/2022
 *
 */

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the book model
let book = require("../models/books");

/* GET books List page. READ */
router.get("/", (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(books);
      res.render("books/index", {
        title: "Books",
        books: books,
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
  res.render("books/details", {
    title: "Details",
    books: null,
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  new book(req.body).save((err) => {
    if (err) return next(err);
    res.redirect("/books");
  });
});

// GET the Book Details page in order to edit an existing Book
router.get("/:id", (req, res, next) => {
  book.findById(req.params.id, (err, bookInstance) => {
    if (err) return next(err);
    res.render("books/details.ejs", {
      title: `Details: ${bookInstance.Title}`,
      books: bookInstance,
    });
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  book.findByIdAndUpdate(req.params.id, req.body, (err) => {
    if (err) return next(err);
    res.redirect("/books");
  });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  book.findByIdAndDelete(req.params.id, (err) => {
    if (err) return next(err);
    res.redirect("/books");
  });
});

module.exports = router;
