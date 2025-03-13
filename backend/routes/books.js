const { isAdmin } = require("../controller/admin");
const bookcontroller = require("../controller/bookcontroller");
const { upload } = require("../helpers/fileupload");

const Router = require("express").Router;

const router = Router();

router.get("/books", bookcontroller.getBook);

router.post("/add", upload.single("image"), bookcontroller.addNewBook);

router.put("/update/:id", upload.single("image"), bookcontroller.updateBook);

router.delete("/delete/:id", bookcontroller.deleteBook);

module.exports = router;
