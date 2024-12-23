---
#icon: material/folder-open-outline
icon: material/medal
---

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

## Story 

In this task, you will enhance the functionality of the main flow 140 by introducing an advanced feature to check if a callback already exists for a specific tested number. 

> !!! Note
      This task relies on completing Mission 2 of the Main Labs. Ensure that mission is completed to have a fully functional callback feature in your flow.


## Build:

1. Open your flow **Main_Flow_<w class = "attendee_out">attendeeID</w>** and change Edit mode to On

2. Add 3 new flow variables: 

  - Callback Status variable:
    >
    > Name: **callbackStatus**
    >
    > Type: **String**
    >
    > Default Value: **empty**
    
  - Callback Connect Time variable:
    >
    > Name: **callbackConnectTime**
    >
    > Type: **String**
    >
    > Default Value: **empty**
    
  - Search Result variable:
    >
    > Name: **searchresult**
    >
    > Type: **String**
    >
    > Default Value: **empty**

5. Add an HTTP Request node for our query
    >
    > Connect VeriNumber Option 1 to this HTTP node
    >
    > We will connct HTTP node in next step
    >
    > Activity Label: HTTPRequest_CallBackSearch
    >
    > Select Use Authenticated Endpoint
    >
    > Connector: WxCC_API
    > 
    > Path: /search
    > 
    > Method: POST
    > 
    > Content Type: Application/JSON
    >
    > Copy this GraphQL query into the request body:
    >
    ```JSON
    {"query":"query($from: Long!, $to: Long!)\n{\n  taskDetails(\n      from: $from\n      to: $to\n    filter: {\n      and: [\n       { callbackData: { equals: { callbackNumber: \"{{NewNumber.DigitsEntered}}\" } } }\n       { lastEntryPoint: { id: { equals: \"{{NewPhoneContact.EntryPointId}}\" } } }\n      ]\n    }\n  ) {\n    tasks {\n      callbackData {\n        callbackRequestTime\n        callbackConnectTime\n        callbackNumber\n        callbackStatus\n        callbackOrigin\n        callbackType\n      }\n       lastEntryPoint {\n        id\n        name\n      }\n    }\n  }\n}","variables":{"from":"{{now() | epoch(inMillis=true) - 15000000}}","to":"{{now() | epoch(inMillis=true)}}"}}
    ```
    > <details><summary>Expanded Query For Understanding (optional)</summary>
    ```GraphQL
    query($from: Long!, $to: Long!)
    {
      taskDetails(
          from: $from
          to: $to
        filter: {
          and: [
           { callbackData: { equals: { callbackNumber: "{{NewNumber.DigitsEntered}}" } } }
           { lastEntryPoint: { id: { equals: "{{NewPhoneContact.EntryPointId}}" } } }
          ]
        }
      ) {
        tasks {
          callbackData {
            callbackRequestTime
            callbackConnectTime
            callbackNumber
            callbackStatus
            callbackOrigin
           callbackType
          }
           lastEntryPoint {
            id
            name
          }
        }
      }
    }
    ```
    </details>

    > Parse Settings:
    >
    > - Content Type: JSON
    > - Output Variable: `callbackStatus`
    > - Path Expression: <copy>`$.data.taskDetails.tasks[0].callbackData.callbackStatus`</copy>
    > - Output Variable: `callbackConnectTime`
    > - Path Expression: <copy>`$.data.taskDetails.tasks[0].callbackData.callbackConnectTime`</copy>
    >
---

6. Add **Set Veriable** node
    >
    > Connect **HTTPRequest_CallBackSearch** to this node
    >
    > We will connct Set Variable node in next step
    >
    > Variable: **searchresult**
    >
    > Set To Variable: **HTTPRequest_CallBackSearch**
    >

 7. Add a Condition node
    
    > 
    > Connect Set Variable created in previous step to this node
    >
    > Connect **False** exit path to existing CallBack node
    > 
    > We will connect **True** exit path in next step
    >
    > Expression: <copy>`{{ callbackConnectTime == "-1" ? (callbackStatus == "Not Processed" ? (HTTPRequest_CallBackSearch.httpStatusCode == 200 ? "true" : "false") : "false") : "false" }}`</copy>
    >
    !!! Note:
        Above expression uses nested ternary logic to combine the checks. This evaluates the first condition and then evaluates the second condition if the first is true and so on.

8. Add **PlayMessage** and **DisconnectContact** nodes:
    
    > Enable Text-To-Speech
    >
    > Select the Connector: Cisco Cloud Text-to-Speech
    >
    > Click the Add Text-to-Speech Message button and paste text: **The callback for provided number has been scheduled already. Please await for a callback once next agent becomes available. Thank you for your patience.**
    >
    > Delete the Selection for Audio File
    >
    > Connect **True** exit path of **Condition** node created in step 7 to **PlayMessage** node
    > Connect this **PlayMessage** to **DisconnectCall** node

9. Validate the flow by clicking **Validate**, **Publish** and select the Latest version of the flow.

## Testing
    
1. Make sure you're logged in as Agent and set status to **Not Available**. In this case call will not be assigned to an agent and callback will be proposed to a caller.
2. Make a call to your test number and if success you should hear configured messages and ask to provide a new number for a callback. Because in current lab we are having number limitations we are going to provide a wellknown Cisco Worldwide Support contact number **1 408 526 7209**
3. While keeping you agent **Not Available**, make another test call to your flow and request for a callback to the same number **1 408 526 7209**.
4. You should hear a message configured in Step 8 of the current mission.
5. Click on Analyze to visualy observe the call flow.

**Congratulations on completing another mission.**