import json
import requests


allProbs = requests.get("https://leetcode.com/api/problems/all/")

allProbs = json.loads(allProbs.text)

detailProbs = []

# print(allProbs)

allProbs = allProbs['stat_status_pairs']

probData = []

count = 0
for prob in allProbs:
    #    print(prob['stat']['question_id'])
    #    print(prob['difficulty']['level'])
    #    aProb = requests.get("https://leetcode.com/problems/" +
    #                         prob['stat']['question__title_slug'] + "/")
    #    print(aProb.text)

    url = "https://leetcode.com/graphql"
    query = """query getQuestionDetail($titleSlug: String!) {
                     question(titleSlug: $titleSlug) {
                         questionId
                         title
                         difficulty
                         likes
                         dislikes
                         isLiked
                         isPaidOnly
                         stats
                         status
                         content
                         topicTags {
                             name
                         }
                     }
                 }"""
    r = requests.post(url, json={'query': query, 'variables': {
                      'titleSlug': prob['stat']['question__title_slug']}})
    #print(r.status_code)
    #print(json.loads(r.text))
    if r.status_code == 200:
        problemJson = json.loads(r.text)
        problemObj = {
            'id': problemJson['data']['question']['questionId'],
            'name': problemJson['data']['question']['title'],
            'url': "https://leetcode.com/problems/" + prob['stat']['question__title_slug'] + "/",
            'complete': 0,
            'review': 0,
            'comment': "",
            'pattern': problemJson['data']['question']['topicTags'],
            'difficulty': problemJson['data']['question']['difficulty'],
            'premium': problemJson['data']['question']['isPaidOnly'],
            'companies': [],
        }
        probData.append(problemObj)


    count += 1

    #Only loads first 10 problems
    if count > 10:
        break

print(probData)

