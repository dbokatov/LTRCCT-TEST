---
#icon: material/folder-open-outline
icon: material/bullseye-arrow
---

## Solution Guidance for Final Boss Fight Mission!


1. Authentication Issue: Ensure the HTTP request node is configured as unauthenticated and has URL configured.</br>
2. JSON Path Issue: The correct JSON path must match the structure of the API response. Attendees should compare the API response format with the path used in the node.</br>
3. Condition Issue: The HTTP status check should be looking for 200, not 201. Adjust the condition logic accordingly.</br>
4. Queue Configuration Issue: Ensure the queue node dynamically references the required queue name instead of using a static value.</br>

## Validation & Success Criteria

1. The flow should correctly execute the HTTP request and retrieve the expected value.</br>
2. The condition node should correctly validate the 200 status code and proceed to queueing logic.</br>
3. The queue node should reference the queue dynamically using a variable, ensuring that calls are directed to **Queue_140**.</br>
4. Calls should land in the intended queue instead of being redirected to the TAC Service number.</br>
5. If the queue value is incorrect, the flow should play an error message and drop the call.</br>
6. The phone in the middle of the room should ring, signaling a successful fix.</br>

<script src='../template_assets/load.js'><script>