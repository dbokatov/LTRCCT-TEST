# Welcome to MkDocs

For full documentation visit [mkdocs.org](https://www.mkdocs.org).

### Codeblock
Some `code` goes here

A codeblock
```
Some code here
// some comment
```

Python example
``` py linenums="1"
def create_jira_task_with_attachment(jira_token, attachment_dict, responses_dict, responseID, webex_token):
    # Jira REST API endpoint to create an issue
    jira_url = "https://jira-eng-sjc12.cisco.com/jira"
    #project_key = "22652" WxCC Masterdata Project
    project_key = "21051"  # VOICE Project

    # Body
    summary = f"{responses_dict['Voice Channel']} - {responses_dict['Tenant Name']} - {responses_dict['App Center']}"
    data = {}
    description = ""
    for keys, values in responses_dict.items():
        description = f'{description} *{keys}* : {values}\n'
```

``` py hl_lines="3 8"
def create_jira_task_with_attachment(jira_token, attachment_dict, responses_dict, responseID, webex_token):
    # Jira REST API endpoint to create an issue
    jira_url = "https://jira-eng-sjc12.cisco.com/jira"
    #project_key = "22652" WxCC Masterdata Project
    project_key = "21051"  # VOICE Project

    # Body
    summary = f"{responses_dict['Voice Channel']} - {responses_dict['Tenant Name']} - {responses_dict['App Center']}"
    data = {}
    description = ""
    for keys, values in responses_dict.items():
        description = f'{description} *{keys}* : {values}\n'
```

## Icons and Emojs

:smile:
:fontawesome-regular-face-laugh-wink:

:fontawesome-brands-youtube:{ .youtube }

