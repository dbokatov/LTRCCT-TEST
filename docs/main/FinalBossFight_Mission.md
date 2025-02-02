---
#icon: material/folder-open-outline
icon: material/bullseye-arrow
---

## Welcome Final Boss Fight Mission!

## Story
In this short troubleshooting task you're are going to play a technical engineer who got a request from end customer regarding broken production flow. You as an engineer must fix the reported issue before contact center opens in just 20 mins. </br>
So <span style="color: red;">**NO PRESSURE HERE AT ALL!!!**</span>

## Problem Description
A customer reports a critical issue with their call flow: callers cannot land in the queue and are being redirected to the TAC Service number, which is not an intended outcome. Initially, the problem seemed to be related to the queue configuration, but after the customer attempted some adjustments, the situation worsened. Now, callers cannot even reach the queue node, and it seems like the HTTP request has been broken completely.


## Mission Details
Your task is to identify and fix the issues causing this behavior. Specifically:

1. The flow should correctly execute the HTTP request and retrieve the expected value of Queue_140 ID.</br>
2. The condition node should correctly validate the 200 status code and proceed to queueing logic.</br>
3. The queue node should reference the queue dynamically using a variable, ensuring that calls are directed to Queue_140.</br>
4. Calls should land in the intended queue instead of being redirected to the TAC Service number.</br>
5. The phone in the middle of the room should ring, signaling a successful fix.</br>

## Flow Overview
The call flow includes an HTTP request node that:

1. Uses an unauthenticated API GET request.</br>
2. Parses the JSON response to extract a specific value of Queue_140 ID using a JSON path.</br>
3. Utilizes a condition node to verify that the HTTP status code is 200 before proceeding to the queue node.</br>
4. If the HTTP request fails or the status code is not as intended, the flow will loop back to the HTTP request node and retry up to three attempts. If all attempts fail, the call will be 
redirected to the TAC Service number.</br>
5. If the HTTP request is successful, a condition node checks whether the parsed queue value matches the intended Queue_140 ID. If it does not match, a message will play informing the caller that the flow has not been fixed, followed by a call drop.</br>

## Before you start

1. Assign **<span class="attendee-id-container">FinalBoss_Flow_<span class="attendee-id-placeholder" data-prefix="FinalBoss_Flow_">Your_Attendee_ID</span><span class="copy" title="Click to copy!"></span></span>** to your **<span class="attendee-id-container"><span class="attendee-id-placeholder" data-suffix="_Channel">Your_Attendee_ID</span>_Channel<span class="copy" title="Click to copy!"></span></span>**.

[GIF]

2. Open the **<span class="attendee-id-container">FinalBoss_Flow_<span class="attendee-id-placeholder" data-prefix="FinalBoss_Flow_">Your_Attendee_ID</span><span class="copy" title="Click to copy!"></span></span>** and you're ready to start troubleshooting.

3. Use the following URL for unauthenticated API requests: ***https://674481b1b4e2e04abea27c6e.mockapi.io/flowdesigner/Lab/DynVars?dn={{NewPhoneContact.DNIS | slice(2) }}***<span class="copy-static" data-copy-text="https://674481b1b4e2e04abea27c6e.mockapi.io/flowdesigner/Lab/DynVars?dn={{NewPhoneContact.DNIS | slice(2) }}"><span class="copy" title="Click to copy!"></span></span>


## Competition & Rewards
A real IP phone is placed in the middle of the room and and an agent logged into Webex Desktop with using that phone as a telephony option. Once the call flow is successfully fixed, the phone will ring and agent accepts the call.</br>
The first three participants who successfully make the phone ring will win a prize. This encourages fast and accurate troubleshooting, making the exercise more engaging and competitive.

---
This exercise will help attendees practice debugging and resolving common Webex Contact Center API integration issues. Ensure they document their troubleshooting steps to reinforce learning.


<script src='../template_assets/load.js'><script>