module.exports = (req) => {
  let objSearch = {
    keyword: "",
  };
  if (req.query.keyword) {
    objSearch.keyword = req.query.keyword;
    const regex = new RegExp(objSearch.keyword, "i");
    objSearch.regex = regex;
  }
  return objSearch;
};
