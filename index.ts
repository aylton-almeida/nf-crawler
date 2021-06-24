import puppeteer from "https://deno.land/x/puppeteer@9.0.1/mod.ts";
import { config } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";

const env = config({ safe: true });

const escapeXpathString = (str: string) => {
  const splitedQuotes = str.replace(/'/g, `', "'", '`);
  return `concat('${splitedQuotes}', '')`;
};

const browser = await puppeteer.launch({
  executablePath:
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
});
const page = await browser.newPage();
await page.goto("https://saojoaodelrei.nfiss.com.br/");

// fill login form
console.log("Logging in...");
await page.focus("#login");
await page.keyboard.type(env["LOGIN"]);
await page.focus("#senha");
await page.keyboard.type(env["PASS"]);
await page.click("#entrar");

// wait for login to be done
console.log("Waiting for login to end...");
await page.waitForSelector('[href="/?Meio=NovaNFE"]');
await page.click('a[href="/?Meio=NovaNFE"]');

// wait for zapt option
await page.waitForSelector(
  'a[href="/?Meio=NovaNFE2&INT_TOMA=VDFSRmVrNXFRWG89"]'
);
const [button] = await page.$x(
  `//a[contains(text(), ${escapeXpathString("ZAPT TECNOLOGIA LTDA")})]`
);
if (button) {
  console.log("found");
  await button.click();
}

await page.screenshot({ path: "example.png" });

await browser.close();
