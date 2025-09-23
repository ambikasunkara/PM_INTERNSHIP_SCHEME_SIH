import fetch from "node-fetch";
import * as cheerio from "cheerio";

// Fetch internships from Naukri
export const fetchNaukri = async () => {
  try {
    const response = await fetch("https://www.naukri.com/internship-jobs");
    const html = await response.text();
    const $ = cheerio.load(html);

    const internships = [];
    $(".jobTuple").each((i, el) => {
      internships.push({
        title: $(el).find(".title").text().trim(),
        company: $(el).find(".companyName").text().trim(),
        location: $(el).find(".location").text().trim(),
        skills: $(el).find(".tags").text().split(",").map(s => s.trim()) || [],
        url: $(el).find("a.title").attr("href"),
        capacity: 10,
        appliedCount: 0
      });
    });

    return internships;

  } catch (err) {
    console.log("Naukri fetch error:", err.message);
    return [];
  }
};
