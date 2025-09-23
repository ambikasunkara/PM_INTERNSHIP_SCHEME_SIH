import puppeteer from "puppeteer";

// Fetch internships from Unstop dynamically
export const fetchUnstop = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto("https://unstop.com/internships", { waitUntil: "networkidle2" });
    
    // Wait for internship cards to load
    await page.waitForSelector(".internship-card"); // change selector as per site
    
    // Extract internship details
    const internships = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll(".internship-card"));
      return cards.map(card => ({
        title: card.querySelector(".internship-title")?.innerText || "N/A",
        company: card.querySelector(".company-name")?.innerText || "N/A",
        location: card.querySelector(".location")?.innerText || "N/A",
        skills: card.querySelector(".skills")?.innerText.split(",").map(s => s.trim()) || [],
        url: card.querySelector("a")?.href || "#",
        capacity: 10,
        appliedCount: 0
      }));
    });

    await browser.close();
    return internships;

  } catch (err) {
    console.log("Unstop fetch error:", err.message);
    return [];
  }
};
