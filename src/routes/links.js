const express = require("express");
const router = express.Router();

const pool = require("../database");

router.get("/add", (req, res) => {
  res.render("links/add");
});

router.post("/add", async (req, res) => {
  const { title, url, description } = req.body;
  const newLink = { title, url, description, user_id: 1 };
  await pool.query("INSERT INTO links SET ?", [newLink]);
  req.flash("success", "New link saved successfully");
  res.redirect("/links");
});

router.get("/", async (req, res) => {
  const user_id = 1;
  const links = await pool.query("SELECT * FROM links WHERE user_id = ?", [
    user_id,
  ]);
  res.render("links/list", { links });
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM links WHERE id = ?", [id]);
  req.flash("success", "Link deleted successfully");
  res.redirect("/links");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const link = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
  res.render("links/edit", { link: link[0] });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, url, description } = req.body;
  const link = { title, url, description };
  await pool.query("UPDATE links SET ? WHERE id = ?", [link, id]);
  req.flash("success", "Link updated successfully");
  res.redirect("/links");
});

module.exports = router;
