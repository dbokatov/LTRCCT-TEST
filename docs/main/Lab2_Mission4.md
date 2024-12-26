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

# Mission 4: Seamless AI to Human Agent Handoffs

## Objectives

This lab is designed to explore how to pass contextual intelligence from AI Agents to Webex Contact Center agents. It involves leveraging AI Summaries for Webex AI  agent conversational transcripts . By completing this lab, you will gain practical skills and knowledge on how to provide the right context to agents to better handle customer queries.

By the end of this lab, you will:

  - Understand how to effectively transfer and hand off to Human Agents.
  - Learn how to provide the relevant call context to Human Agents.

## Build

### Transfer to Human Agent

1. Before you start this lab, please make sure the webex contact center **<w class = "attendee_out">attendeeID</w>_Channel** is set your **TaskBot_Flow_<w class = "attendee_out">attendeeID</w>**

    ![Profiles](../graphics/Lab1/L1M6_TaskBot_FlowtoEP.gif)  

2. In **Control Hub** select **Contact Center** from the left panel and then navigate to Flows from the left panel. Search and open your flow **TaskBot_Flow_<w class = "attendee_out">attendeeID</w>**. 

3. Switch the Edit button to on to enable Edit mode in the flow builder then drag and drop following nodes:

    - **DisconnetConnect**
    - **Queue Contact** activity onto the Flow from the left side panel

      >
      > Connect the **Escalated** path from the **Virtual Agent V2** activity to the **Queue Contact** activity.
      >
      > Connect the **Queue Contact** activity to the **Play Music** activity
      >
      > Connect the **Failure** path from the **Queue Contact** activity to the **Disconnect Contact** activity.
      > 
      > Queue name: <copy>**<w class = "attendee_out">attendeeID</w>_Queue**</copy>
      > 

    - **Play Music**

      >
      > Create a loop by connecting the Play Music activity back to itself - to create a music loop, following the diagram provided.
      >
      > Connect the **Failure** path from the **Play Music** activity to the **Disconnect Contact** activity.
      > 
      > Music File: **defaultmusic_on_hold.wav**
      >
  
4. **Validate** and **Publish** Flow. In popped up window click on dropdown menu to select **Latest** label, then click **Publish**  

### Test 1:


1. Open [Agent Desktop](https://desktop.wxcc-us1.cisco.com/){:target="_blank"} and login with agent credentials you have been provided <copy>**wxcclabs+agent_ID<w class = "attendee_out">attendeeID</w>@gmail.com**</copy>. You will see another login screen with OKTA on it where you may need to enter the email address again and the password provided to you. 
2. Select **Desktop** as a ***Telephony Option*** and Team <copy>**<w class = "attendee_out">attendeeID</w>_Team**</copy>. Click **Submit**. Allow browser to access Microphone by clicking **Allow** on ever visit.
3. Make your agent ***Available*** and you're ready to make a call.

    ![profiles](../graphics/Lab1/5-Agent_Login.gif)

4. Dial the support number assigned to your **<w class = "attendee_out">attendeeID</w>_Channel** channel and during the conversation with the virtual Agent, say, **"Please transfer me to an Agent."** Answer the call on the agent desktop when you receive a ring notification and verify the trasciption is passed to Agent Desktop.

5. Once the call is answered, disconnect the call by clicking on the **End** button.

### Disable Virtual Agent Transcript

1. Open your flow **TaskBot_Flow_<w class = "attendee_out">attendeeID</w>** and change Edit mode to **On** if it's not.
2. Select the **Virtual Agent v2** activity and, in the right side panel, scroll down and notice the option for **Enable Conversation Transcript**.
3. Disable the **Virtual Agent v2** transcript by unchecking **Enable Conversation Transcript** option.
    GIF
4. **Validate** and **Publish** Flow. In popped up window click on dropdown menu to select **Latest** label, then click **Publish** .

### Test 2:
1. Make sure your agent is **Available** and if not, login to you Desktop as explained in previous Quick Test (see above)
2. Dial into the same support and observe that the conversation transcript is **Not available** on the Agent Desktop when **Enable Conversation Transcript** is unchecked.

    GIF

### Routing Based on Last Intent

1. <span style="color: red;">**[IMPORTANT]**</span> Please make sure to Enable the Virtual Agent transcript by checking **Enable Conversation Transcript** option for the **Virtual Agent V2** activity. Select the **Virtual Agent V2** activity and, in the right side panel, scroll down and notice the option for **Enable Conversation Transcript**. 

2. Enable the **Virtual Agent v2** transcript by unchecking **Enable Conversation Transcript** option.

3. Add new flow variable: 
    
    >
    > Name: **last_intent**
    >
    > Type: **String**
    >
    > Default Value: **empty**

4. Drag and drop the **Parse** activity to the flow

    >
    > Connect the **Escalated** output from the **Virtual Agent V2** activity to the **Parse** activity.
    >
    > Output variable: **VirtualAgentV2.MetaData**
    > Content Type: **JSON**
    > Output Variable: **last_intent**
    > Path Expression: **$.previous-intent.name**

5. Drag and drop the **Condition** activity to the flow

    >
    > Connect the **Parse** activity to the **Condition** activity.
    >
    > Connect the **False** output from the **Condition** activity to the **Queue Contact** activity
    > 
    > Condition : **{{ last_intent == "Book appointment" }}**

6. Add **PlayMessage**: 
    
    > Enable Text-To-Speech
    >
    > Select the Connector: **Cisco Cloud Text-to-Speech**
    >
    > Click the Add Text-to-Speech Message button and paste text: **Routing to an agent skilled at booking an appointment.**
    >
    > Delete the Selection for Audio File
    >
    > Connect **True** exit path of **Condition** node created in **Step 5** to this **PlayMessage** node
    > 

7. **Validate** and **Publish** Flow. In popped up window click on dropdown menu to select **Latest** label, then click **Publish** 

## Test 3
    
1. Make sure your agent is **Available** and if not, login to you Desktop as explained in previous Quick Test (see above)
2. Make a call to your test number. During your interaction with the Virtual Agent, request a transfer by saying, **"Please transfer me to an Agent."** If the last intent was "Book appointment", you will hear the Text-to-Speech message: **"Routing to an agent skilled at booking an appointment."** Answer the call on the agent desktop when it rings.

## Test 4
1. Click on the AI assistant icon located on the top left navigation panel.

  ![profiles](../graphics/Lab2/L2M4_checkAIIcon.gif)

2. Dial the support number assigned to your **<w class = "attendee_out">attendeeID</w>_Channel** and initiate a conversation with below

<!-- md:option type:note -->

!!! note "Sample Conversation"

    "I would like to Book  an appointment"

     What date are you considering for your visit 

     "Nov 20th"

     Could tell us preferred time for your visit 

     "3PM"

     Which doctor you want appointment with
  
     "Dr John"

     What is name of the  patience 

     "Peter<any name>"

     Could you tell us patience Date of Birth

     "Please transfer me to an agent "

3. During the interaction with the virtual Agent, request a transfer by saying, **"Please transfer me to an Agent."** Answer the call on the agent desktop upon receiving the ring notification.

4. Observe that, after answering the call, a summary of the Virtual Agent interaction is now displayed on the agent desktop

  ![profiles](../graphics/Lab2/L2M4_ValidateAgentSummary.gif)

<p style="text-align:center"><strong>Congratulations, you have officially completed the Intelligent Virtual Agent Handoffs mission! 🎉🎉 </strong></p>

