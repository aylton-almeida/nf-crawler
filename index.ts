import puppeteer from "https://deno.land/x/puppeteer@9.0.1/mod.ts";
import { config } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";

const env = config({ safe: true });

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
await page.waitForNavigation();
await page.click('a[href="/?Meio=NovaNFE"]');

// wait for zapt option and click it
await page.waitForXPath(`//a[contains(text(), "ZAPT TECNOLOGIA LTDA")]`);
const [button] = await page.$x(`//a[contains(text(), "ZAPT TECNOLOGIA LTDA")]`);
if (button) {
  console.log("Found Zapt option");
  await button.evaluate((e) => e.click());
}

// wait for form
await page.waitForNavigation();
// Select activity
await page.select(
  "#INT_ATVD",
  "13570 - TREINAMENTO EM INFORMATICA CURSOS DE INFORMATICA"
);
// add description
await page.focus("#DESC_NF");
await page.keyboard.type("Consultoria em desenvolvimento de software");
// add value
await page.focus("#VR_SRV");
await page.keyboard.type("1000000");
// click button
await page.click("#btn_vzlz");

// await page.waitForNavigation();
await page.screenshot({ path: "example.png" });

await browser.close();
