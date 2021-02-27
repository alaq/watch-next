const fs = require("fs");

const scraperObject = {
    url:
        "https://www.icheckmovies.com/lists/1001+movies+you+must+see+before+you+die/?user=soviel&sort=officialtoplists",
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        await page.waitForSelector(".container");

        let urls = await page.$$eval(".container ol > li.unchecked", (links) => {
            // Extract the links from the data
            links = links.map((el) => {
                const link = el.querySelector("h2 a");
                if (link) {
                    return link.href;
                }
            });
            return links;
        });

        // Loop through each of those links, open a new page instance and get the relevant data from them
        let pagePromise = (link) => new Promise(async(resolve, reject) => {
            let dataObj = {};
            let newPage = await browser.newPage();
            await newPage.goto(link);
            dataObj['title'] = await newPage.$eval('#movie h1', text => text.textContent);
            dataObj['year'] = await newPage.$eval('.floated dd', text => text.textContent);
            dataObj['imdb'] = await newPage.$eval('.span-7 > a', text => text.href);
            resolve(dataObj);
            await newPage.close();
        });

        urls = urls.slice(0,3);

        const movies = [];
        for(link in urls){
            let currentPageData = await pagePromise(urls[link]);
            movies.push(currentPageData);
        }
        return fs.promises.writeFile("./data/movies.json", JSON.stringify(movies));
    },
};

module.exports = scraperObject;
