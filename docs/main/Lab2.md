<script>
 function update () {
    const form = document.forms['attendee-form'];
    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        const inputs = Array.from(form.querySelectorAll('input'));
        const values = inputs.reduce((acc, input) => {
          acc[input.id + '_out'] = input.value;
          return acc;
        }, {});

        Object.entries(values).forEach(([id, value]) => {
          const elements = document.getElementsByClassName(id);
          Array.from(elements).forEach(element => {

            console.log(element.innerHTML);
            if(Number(element.innerHTML) > 99 ){
               console.log(`Got a 99+ attendee: ${element.innerHTML}`);
               element.innerHTML = value;
             }
            else{
               console.log(`Got a sub 99 attendee: ${element.innerHTML}`);
               if(element.innerHTML.includes('gmail.com'))
               {
                element.innerHTML = `0${value}`;
                }
               else{
                element.innerHTML = value;
               }
                }
          });
        });
        const attendeeIDInput = form.elements['attendeeID'];
       if (attendeeIDInput && attendeeIDInput.value !== 'Your_Attendee_ID') {
          localStorage.setItem('attendeeID', attendeeIDInput.value);
        }
      });
    }
  };
</script>
<style>
  /* Style for the button */
  button {
    background-color: black; /* Set the background color to black */
    color: white; /* Set the text color to white */
    border: none; /* Remove the border */
    padding: 10px 20px; /* Add some padding for better appearance */
    cursor: pointer; /* Show a pointer cursor on hover */
  }

   /* Style for the input element */
  input[type="text"] {
    border: 2px solid black; /* Set the border thickness to 2px */
    padding: 5px; /* Add some padding for better appearance */

</style>


 Please **`submit the form below with your Attendee or pod ID`**. All configuration entries in the lab guide will be renamed to include your pod ID.
{: .block-warning }

<script>
document.forms["attendee-form"][1].value = localStorage.getItem("attendeeID") || "Your Attendee ID" 
</script>
<form id="attendee-form">
  <label for="attendee">Attendee ID:</label>
  <input type="text" id="attendee" name="attendee" onChange="update()"><br>
<br>
  <button onclick="update()">Save</button>
</form>

<br/>

Previously, it was not possible to make calls directly from a Flow to the WxCC API Gateway. Instead, a third-party application, such as WxConnect, was required to make an API call back to the WxCC API Gateway. The third-party application utilized the HTTP POST method to communicate with the WxCC API Gateway.
Now, this functionality is directly supported within the Flow, allowing API calls to be made to the WxCC API Gateway without the need for an intermediary application. This simplifies the configuration process and eliminates an additional potential point of failure.

### How it was

   ![profiles](../graphics/Lab2/HowItWas.png)

### How it is now

   ![profiles](../graphics/Lab2/HowItIsNow.png)


## Story
> When a customer calls back into the contact center within ten minutes of their last call ending, we can assume there was a dropped call, missed callback, or they need additional assistance from their last interaction.  We are going to prioritize their call in the queue so that they can finish their business.

### High Level Explanation
1. New call comes into the flow
2. Call the Search API to check if the ANI (caller's number) had a call which ended in the last 10 minutes
3. If the caller had a connected call which ended within the last 10 minutes, we will play a message and will queue the call with a higher priority so they will get assigned to the next available agent.
4. If the caller did not end a call with the contact center in the previous 10 minutes, we will queue the call normally

    !!! Note
        We are going to touch Subflow which is the feature that enables easier management of complex flows by breaking down commonly used and repeated portions into reusable subflows. This improves readability of flows, increases reusability of repeated functionality in the subflow, as well as improves development time since there is no redundant design of the same flows.

        Subflows also introduce the ability to share commonly used subroutines between developers, between customers and will help unlock a library of subflows available in the marketplace.

---

## Preconfigured Elements

1. Wait treatment Subflow which will provide Music in Queue and Queue Messages. 
2. Connector for calling Webex Contact Center APIs

---

## Build

1. Create a flow named <copy>**ReturningCaller_<w class = "attendee_out">attendeeID</w>**</copy> then create a flow variable 
    
    > Name: <copy>**previousID**</copy>
    >
    > Type: **String**
    >
    > Default Value: empty


2. Add a **Play Message** node for our welcome message

    > Connect the **New Phone Contact** output node edge to this **Play Message** node
    >
    > Enable Text-To-Speech
    >
    > Select the Connector: Cisco Cloud Text-to-Speech
    >
    > Click the Add Text-to-Speech Message button
    >
    > Delete the Selection for Audio File
    >
    > Text-to-Speech Message: <copy>**Welcome to the advanced routing and API integrations lab.**</copy>
    >


3. Add an **HTTP Request** node for our query

    > Connect the output node edge from the **Play message** node to this node
    > 
    > Select Use Authenticated Endpoint
    >
    > Connector: **WxCC_API**
    > 
    > Path: **/search**
    > 
    > Method: **POST**
    > 
    > Content Type: **Application/JSON**
    >
    > Copy this GraphQL query into the request body:
```JSON
{"query":"query lastTen($from:Long! $to:Long! $timeComparator:QueryTimeType $filter:TaskFilters){task(from:$from,to:$to,timeComparator:$timeComparator,filter:$filter){tasks{id status channelType createdTime endedTime origin destination direction terminationType isActive isCallback lastWrapupCodeName}}}","variables":{"from":"{{now() | epoch(inMillis=true) - 600000}}","to":"{{now() | epoch(inMillis=true)}}","timeComparator":"endedTime","filter":{"and":[{"status":{"equals":"ended"}},{"origin":{"equals":"{{NewPhoneContact.ANI}}"}},{"connectedCount":{"gte":1}}]}}}
```
    <details><summary>Expanded Query For Understanding (optional)</summary>
```GraphQL
query lastTen(
  $from: Long!
  $to: Long!
  $timeComparator: QueryTimeType
  $filter: TaskFilters
) {
  task(from: $from, to: $to, timeComparator: $timeComparator, filter: $filter) {
    tasks {
      id
      status
      channelType
      createdTime
      endedTime
      origin
      destination
      direction
      terminationType
      isActive
      isCallback
      lastWrapupCodeName
    }
  }
}
```
``` JSON
Variables:
{
  "from": "{{now() | epoch(inMillis=true) - 600000}}", # time now - 10 minutes represented in EPOCH time(ms)
  "to": "{{now() | epoch(inMillis=true)}}", # time now represented in EPOCH time(ms)
  "timeComparator": "endedTime",
  "filter": {
    "and": [
      {
        "status": {
          "equals": "ended"
        }
      },
      {
        "origin": {
          "equals": "{{NewPhoneContact.ANI}}" # ANI or caller phone number
        }
      },
      {
        "connectedCount": {
          "gte": 1
        }
      }
    ]
  } >
    > Output Variable: **`previousID`**
    >
    > Path Expression: <copy>**`$.data.task.tasks[0].id`**</copy>
   
}
```
</details>
     
   > Parse Settings:
    > 
    > Content Type: **JSON**
    >
    > Path Expression: <copy>`$.data.task.tasks[0].id`</copy>
   


4.  Add a Condition node
    > Connect the output from the **HTTP Request** node to this node
    >
    > Expression: <copy>**`{{previousID is empty}}`**</copy>
    >
    > We will connect the **True** node in a future step.
    >
    > Connect the **False** node edge to the **Play Message** node created in the next step.
    >

5. Add a **Play Message** node

    > Connect the **False** node edge from the previous step to this node
    >
    > Enable Text-To-Speech
    >
    > Select the Connector: **Cisco Cloud Text-to-Speech**
    >
    > Click the Add Text-to-Speech Message button
    >
    > Delete the Selection for Audio File
    >
    > Text-to-Speech Message: <copy>**It looks like you were just working with an agent and had to call back in.  We are prioritizing this call for the next available agent.**</copy>
    >

6.  Add a **Queue Contact** node

    >  Connect the output node edge from the **Play Message** node added in the last step to this node
    > 
    > Select Static Queue
    >
    > Queue: <copy>**<w class = "attendee_out">attendeeID</w>_Queue**</copy>
    >
    > Select Static Priority
    >
    > Static Priority Value: **P1**
    >

7.  Add a **Subflow** node

    > In the Activity Library pane on the left side of the screen, click Subflows
    >
    > Find the Subflow names **WaitTreatment** and drag it onto the flow canvas like you would any other node.
    >
    > Connect the output node edge from the **Queue Contact** node added in the previous step to this node.
    >
    > Subflow Label: **Latest**
    >
    > Enable automatic updates: **True**
    >
    > Subflow Input Variables: **None**
    >
    > Subflow Output Variables: **None**
    >
    > Connect the output node edge from this node to the **Disconnect Contact** node added in the next step.



8. Add a **Disconnect Contact** node


9. Add a **Queue Contact** node

    > Connect the **True** node edge from the **Condition** node to this node
    > 
    > Select Static Queue
    >
    > Queue: <copy>**<w class = "attendee_out">attendeeID</w>_Queue**</copy>
    >
    > Connect the **Output** node edge from this node to the **Subflow** node


    <details><summary>Check your flow</summary>![Profiles](../graphics/Lab2/lab2_ReturnAgentflow.png)</details>

10.  Publish your flow

    > Turn on Validation at the bottom right corner of the flow builder
    >
    > If there are no Flow Errors, Click **Publish**
    >
    > Add a publish note
    >
    > Add Version Label(s): **Latest** 
    >
    > Click **Publish** Flow

    !!! Note
      Remember to select "Return to Flow" after you publish your flow.


11. Map your flow to your inbound channel
    
    > Navigate to Control Hub > Contact Center > Channels
    >
    > Locate your Inbound Channel (you can use the search): <copy>**<w class = "attendee_out">attendeeID</w>_Channel**</copy>
    >
    > Select the Routing Flow: <copy>**ReturningCaller_<w class = "attendee_out">attendeeID</w>**</copy>
    >
    > Select the Version Label: Live
    >
    > Click Save in the lower right corner of the screen


## Testing

1. Launch the [Agent Desktop](https://desktop.wxcc-us1.cisco.com/){:target="_blank"} and log in selecting the Desktop option for your Voice connection.
2. On your Agent Desktop, make sure your status is not set to available
      1. Using Webex, place a call to your Inbound Channel number <copy>**<w class = "attendee_out">attendeeID</w>_Channel**</copy>
      2. After you hear the queue treatment start, you can abandon the call 
3. Using Webex, place another call to your Inbound Channel number <copy>**<w class = "attendee_out">attendeeID</w>_Channel**</copy>
4. On your Agent Desktop, set your status to available
      1. You should be offered a call, click on the accept button. (You may want to mute the mic on both Webex and the Agent Desktop)
      2. After a few moments end the call and select a wrapup code.
5. In your Flow:
      1. Open the Debugger
      2. Select the last interaction (at the top of the list)
      3. Trace the steps taken in the flow
6. Answer these questions:
      1. Was the call queued with priority?
         1. Why or why not?
7. Close the Debugger
8. Using Webex, place another call to your Inbound Channel number <copy>**<w class = "attendee_out">attendeeID</w>_Channel**</copy>
9. On your Agent Desktop, set your status to available
      1. You should be offered a call, click on the accept button. (You may want to mute the mic on both Webex and the Agent Desktop)
      2. After a few moments end the call and select a wrapup code.
10. In your Flow:
      1. Open the debugger
      2. Select the last interaction (at the top of the list)
      3. Trace the steps taken in the flow
11. Answer these questions:
      1. Was the call queued with priority?
         1. Why or why not?
      2. If you called another Inbound Channel number with the same flow logic, would your call be prioritized?
         1. How could you change this behavior? 


# Once you have completed the testing, let the instructor know.
---
