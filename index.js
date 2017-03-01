var https = require('https');
var cheerio = require('cheerio');

var url = 'https://movie.douban.com/top250';

// 过滤电影名称
function filterMovies(html) {
  var $ = cheerio.load(html);
  var movies = $('.grid_view');
  
  var moviesData = [];

  movies.each(function(item) {
    var movie = $(this);
    var movieTitle = movie.find('.title').text();
    console.log(movieTitle);
  });
}

// 得到分页的Url列表
function getUrls() {
  var pageUrls = [];

  for (var i = 0; i <= 225; i += 25) {
    pageUrls.push(`https://movie.douban.com/top250?start=${i}&filter=`);
  }
  return pageUrls;
}

// 异步发送请求 获取每一页的数据利用循环和setTimeout进行调用请求

// Server
https.get(url, function (res) {
  var html = '';

  res.on('data', function (data) {
    html += data;
  });

  res.on('end', function () {
    filterMovies(html);
    pageUrls();
  });
}).on('error', function () {
  console.log('获取数据出错！');
});