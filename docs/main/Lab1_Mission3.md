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

### Overview

In this lab, you will complete a mission to enhance customer feedback collection by integrating a survey into the Webex Contact Center call flow. The lab is designed to be simple yet practical, focusing on minimal configuration within the Flow Designer, while leveraging a preconfigured survey template.

### Mission Details

Your mission is to:
1. Integrate a preconfigured survey into the call flow using the Flow Designer.
2. Configure basic logic to determine when to route customers to the survey (e.g., after a call ends).
3. Understand how Webex Contact Center supports various survey question types, including CSAT, CES, and NPS.

The survey is prebuilt and includes key questions designed to gather actionable insights from customers. Your task is to focus on configuring the flow and ensuring the survey is triggered seamlessly during the customer journey.

### Section to expand/collapse
> **<details><summary>Good to Know <span style="color: orange;">[Optional]</span></summary>**
Supported Survey Question Types in Webex Contact Center
1. Customer Satisfaction (CSAT):
    - Purpose: Measure satisfaction with a specific interaction or service.
    - Example Question: "On a scale of 1 to 5, how satisfied are you with the service you received today?"
    - Use Case: Assess overall satisfaction at the end of a call or interaction.
2. Customer Effort Score (CES):
    - Purpose: Evaluate the ease of resolving a customer's issue or completing a task.
    - Example Question: "On a scale of 1 to 5, how easy was it to complete your task today?"
    - Use Case: Identify pain points in the customer journey or process efficiency.
3. Net Promoter Score (NPS):
    - Purpose: Measure customer loyalty and the likelihood of recommending the service.
    - Example Question: "On a scale of 0 to 10, how likely are you to recommend our service to a friend or colleague?"
    - Use Case: Gauge long-term customer loyalty and brand advocacy.
</details>

### Pre-configured entities:
    
> Survey: **CiscoLive2025_PCS**
>
> System defined GlobalVariable: **Global_FeedbackSurveyOptIn**. 
>

<span style="color: orange;">[Optional]</span>
    In case you don't want to use pre-configured Survey you can configure your own. Expand below section to create your own Survey otherwise proceed to Configuration section
> **<details><summary>Good to Know <span style="color: orange;">[Optional]</span></summary>**
... To Add Survey creation steps...
</details>

### Configuration
1. Explore preconfigured Survey 
2. Open you <copy>**Main_Flow_<w class = "attendee_out">attendeeID</w>**</copy> and add Set Variable node:

> Activity Name: **FeedbackSet**
> Variable: **Global_FeedbackSurveyOptIn**
> Set Value: true
> 
> Delete connection between **NewPhoneContact** and **SetVariable** on which we configured Language while doing the Main Lab.
> Connect **NewPhoneContact** to the front of the **NewNumber** node
> Connect **FeedbackSet** to the front of the **SetVariable** node
        
3. Open Event tab and delete **EndFlow_xkf** to which **HTTPRequest** is connected to.
4. Drag **FeedbackV2**, **PlayMessage** and **DisconnectCall**
    **FeedbacV2**
    > SurveyMethod -> VoiceBased:  **CiscoLive2025_PCS**
    >        
    > Connect **HTTPRequest** to **FeedbackV2** node
    >
    > Connect **FeedbackV2** node to **Disconnect** node
    >
    > Connect **FeedbackV2** Undefined Error to **DisconnectCall** node
            
    **PlayMessage**
    
    > Enable Text-To-Speech
    >
    > Select the Connector: Cisco Cloud Text-to-Speech
    >
    > Click the Add Text-to-Speech Message button and paste text: ***Something went wrong on Feedback node. Please call later.***
    >
    > Delete the Selection for Audio File
    >
    > Connect **PlayMessage** created to **DisconnectCall** node
    >       
            
5. Validate the flow by clicking **Validate**, **Publish** and select the **Latest** version of the flow


### Testing
1. Open [Agent Desktop](https://desktop.wxcc-us1.cisco.com/){:target="_blank"} and login with agent credentials you have been provided **wxcclabs+admin_ID<w class = "attendee_out">attendeeID</w>@gmail.com** and become Available 
2. Make a test call and accept the call by Agent.
3. Finish the call by Agent so the caller could stay on the line. 
4. Now the caller should hear prompts configured in **CiscoLive2025_PCS**. Complete the survey.
5. To check Survey responses got to ***Control Hub -> Contact Center -> Surveys***. For **CiscoLive2025_PCS** click on Download and select Survey response period get a CSV file with provided answers.
    
    !!! Note
        If you create your own Survey as described in Optional section of this mission you might not see Survey response as it has delay in edited surveys
        
**Congratulations on completing another mission where we have learnt how Post Call Survey can be implemented.**