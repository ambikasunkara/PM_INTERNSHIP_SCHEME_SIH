import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

RAPIDAPI_KEY = "YOUR_RAPIDAPI_KEY"
RAPIDAPI_HOST = "linkedin-jobs.p.rapidapi.com"

@app.route("/internships", methods=["GET"])
def get_internships():
    skill = request.args.get("skill", "")
    location = request.args.get("location", "India")
    past_participation = int(request.args.get("past", 0))

    # LinkedIn API call
    url = "https://linkedin-jobs.p.rapidapi.com/"
    querystring = {"keywords": f"{skill} internship", "location": location}
    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST
    }
    response = requests.get(url, headers=headers, params=querystring)
    jobs = response.json().get("jobs", [])

    # Calculate score based on skills and past participation
    for job in jobs:
        job_skills = job.get("skills", [])
        match_count = len(set(skill.lower().split(",")).intersection([s.lower() for s in job_skills]))
        job["score"] = max(0, match_count*20 - past_participation*10)  # Example scoring

    # Sort top 3 by score
    top_jobs = sorted(jobs, key=lambda x: x["score"], reverse=True)[:3]

    return jsonify(top_jobs)

if __name__ == "__main__":
    app.run(port=5000, debug=True)