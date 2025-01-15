---
#icon: material/folder-open-outline
icon: material/medal
---



# Mission 1: Callback on Global Error

## Story 


> !!! Note
      This task relies on completing Mission 3 of Fundamental Labs. Ensure that mission is completed to have a fully functional callback feature in your flow.


## Build

Integrate the tenant with Webex CC API
Create the Outdial Queue, activate Outbound Campaign toggle and select the teamCreate a FLOW 
Create the Outdial Flow
Create the Outdial Channel (EP), add Flow and Queue and save the EP ID for the API request
Update the Desktop Profile for the specific agent
Update the main FLOW and add the HTTP Request activity with the CALLBACK API. Example:

{
  "destination": "+18447727524",
  "entryPointId": "caa1a19a-1ef4-4b9a-abbb-14b083251797",
  "attributes": {"Message":"tester","To Queue":"sales"},
  "outboundType": "CALLBACK",
  "mediaType": "telephony",
  "callback": {
    "callbackOrigin": "web",
    "callbackType": "immediate"
  }
} 


## Testing
   

**Congratulations on completing another mission.**
