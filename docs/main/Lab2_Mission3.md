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

    > Name: **callbackStatus**
    >
    > Type: **String**
    >
    > Default Value: **empty**
    > ---
    >
    > Name: **callbackConnectTime**
    >
    > Type: **String**
    >
    > Default Value: **empty**
    > ---
    >
    > Name: **searchresult**
    >
    > Type: **String**
    >
    > Default Value: **empty**

5. Add an HTTP Request node for our query
    > Connect the output node edge from the Play Message node to this node
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
```JSON
{"query":"query($from: Long!, $to: Long!)\n{\n  taskDetails(\n      from: $from\n      to: $to\n    filter: {\n      and: [\n       { callbackData: { equals: { callbackNumber: \"14085267209\" } } }\n       { lastEntryPoint: { name: { equals: \"140_Channel\" } } }\n      ]\n    }\n  ) {\n    tasks {\n      callbackData {\n        callbackRequestTime\n        callbackConnectTime\n        callbackNumber\n        callbackStatus\n        callbackOrigin\n        callbackType\n      }\n       lastEntryPoint {\n        id\n        name\n      }\n    }\n  }\n}","variables":{"from":"{{now() | epoch(inMillis=true) - 15000000}}","to":"{{now() | epoch(inMillis=true)}}"}}
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
       { callbackData: { equals: { callbackNumber: "14085267209" } } }
       { lastEntryPoint: { name: { equals: "140_Channel" } } }
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
> Content Type: JSON
>
> - Output Variable: `callbackStatus`
> - Path Expression: <copy>`$.data.taskDetails.tasks[0].callbackData.callbackStatus`</copy>
>
> - Output Variable: `callbackConnectTime`
> - Path Expression: <copy>`$.data.taskDetails.tasks[0].callbackData.callbackConnectTime`</copy>
>
---

Add a Condition node
> Connect the output node edge from teh HTTP Request node to this node
> 
> Expression: <copy>`{{ callbackConnectTime == "-1" ? (callbackStatus == "Not Processed" ? (HTTPRequest_g1g.httpStatusCode == 200 ? "true" : "false") : "false") : "false" }}`</copy>
>
> Connect the False node in a existing **Callback** node step.
>
> We will connect the True node in a future step.
>