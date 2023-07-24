import axios from 'axios';
import cheerio from 'cheerio';

import { newspapers } from '../contents/newspapers.js';

const articles = [];

export const news = (req, res) => {
    newspapers.forEach(newspaper => {
        axios.get(newspaper.address)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html);

                $('a:contains("climate")', html).each(function () {
                    const title = $(this).text();
                    const url = $(this).attr('href');
                    const source = newspaper.name;

                    articles.push({
                        title,
                        url: newspaper.base + url,
                        source
                    })
                })
            })
        })
    res.json(articles);
};

export const specificNews = (req, res) => {
    const newspaperId = req.params.newspaperId;
    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address;
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base;
    
    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const specificArticles = []
            $('a:contains("climate")', html).each(function () {
                const title = $(this).text();
                const url = $(this).attr('href');
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
            res.json(specificArticles);
        }).catch(err => console.log(err))
};