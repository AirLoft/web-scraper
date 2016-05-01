run `npm install` to install dependent modules, then run `nodemon <filename>` to start listening port 3000.

## Support media source
douban(豆瓣), cnode

## Main idea

run nodejs script on rented server whenever pull request reaches, then scrape **curated** tech news link and brief description from media and return back in JSON.

## Challenges

- How "curated"? use tagging and classfify the article by keywords, natural language processing!
- How "briefly summerize an article"? use given description as much as possible, while try to abstract "key sentences" from articles? Should I go this way?
- How to handle "pull request"? Run the scripts on server restlessly? Nope! But only running when received request will give a long reaction time. Use pointer! Avoid direct object comparison but use pointer comparison!
