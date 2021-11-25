const vomit = async (req, res) => res.json({
  body: req.body,
  params: req.params,
  query: req.query,
});

module.exports = vomit;
