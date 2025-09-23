import { fetchUnstop } from "../scrapers/unstopScraper.js";
import { fetchNaukri } from "../scrapers/naukriScraper.js";

export const getInternships = async (req, res) => {
  try {
    const unstop = await fetchUnstop();
    const naukri = await fetchNaukri();

    const allInternships = [...unstop, ...naukri];
    res.json(allInternships);

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch internships", error: err.message });
  }
};
