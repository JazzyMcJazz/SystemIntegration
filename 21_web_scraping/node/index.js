// Download page
// import fs from 'fs';
// import path from 'path';
// const response = await fetch('https://www.proshop.dk/Baerbar-computer');
// const data = await response.text();
// fs.writeFileSync(path.join(process.cwd(), 'data', 'data.html'), data);

import { load } from 'cheerio';
import fs from 'fs';
import path from 'path';

const page = fs.readFileSync(path.join(process.cwd(), 'data', 'data.html'), 'utf-8');
const $ = load(page);

$('#products [product]').each((i, el) => {
    const name = $(el).find("[product-display-name]").text();
    const price = $(el).find(".site-currency-lg").text();
    console.log(name, "  -  ", price);
    
});