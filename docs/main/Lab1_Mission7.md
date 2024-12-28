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

# Mission 7: AI in Action (Autonomous Agent)

## AI Autonomous Agent Overview

The Autonomous AI Agent for performing actions can handle various tasks, including:

  - Natural Language Processing (NLP)—Understand and respond to human language in a natural and conversational manner.
  - Decision making—Make informed choices based on available information and predefined rules.
  - Automation—Automate repetitive or time-consuming tasks.

## Mission overview

In current mission you will have an options to create a knowledge bases (KB). KB might contain information from different sources. It can be one or all from the following list. It is up to you. 

1. KB that will be used in AI agent to provide answers about Amsterdam: places to visit, restaurants, night clubs and how to get there from current RAI Amsterdam Convention Center, aka **Amsterdam Tourist Guide**.

2. KB that can provide you information about current Cisco Live 2025 event: Schedules, session, rooms as well as how to get help and support.

3. You can use any source of information you like. Just Google it to find FAQ you like and save it as on of supported file formats: *pdf, docx, doc, txt, xlsx, xls, csv*. Each file cannot exceed **20MB** in size.

---

## Build

### Creating a Knowldge Base

1. <span style="color: red;">[IMPORTANT]</span> [Download](https://drive.google.com/file/d/1h2C-dQawsP-kIXSaxiJD4_oTODW4SVe6/view?usp=sharing) source files from shared folder. Choose either any or all files from the following list:
    
    > 
    > **Amsterdam_Tourist_Guide.txt**
    >
    > **Cisco-Live-2025-Amsterdam.pdf**

2. Login into [Webex Control Hub](https://admin.webex.com){:target="_blank"} by using your Admin profile **wxcclabs+admin_ID<w class = "attendee_out">attendeeID</w>@gmail.com**. You will see another login screen with OKTA on it where you may need to enter the email address again and the password provided to you.

3. Go to Contact Center from the left side navigation panel, and under Quick Links, click on **Webex AI Agent**

    ![Profiles](../graphics/Lab1/L1M6_OpenWebexAI.gif)  

4. In AI Agent Builder navigate to **Knowledge** from left hand side menu panel. 

5. Click **Create Knowledge Base**, provide Knowledge base name as **<w class = "attendee_out">attendeeID</w>_AI_KB**, then click **Create**.

    ![Profiles](../graphics/Lab1/L1M7_AIKBCreate.gif)

6. Click Add File or drag and drop one or both of the following files:

    - **Amsterdam Tourist Guide** - TXT file information for tourists: places to visit, restaurants, pubs etc. and how to reach those places from RAI Amsterdam Convention Center 
    - **Cisco Live 2025 Amsterdam FAQ** - bunch of PDF files about Cisco Live 2025 Amsterdam event.
    - Your file or files if you decide to use them. If you face chalenges with this please call your instructor.

    ![Profiles](../graphics/Lab1/L1M7_AIKBFileUpload.gif)

7. Navigate to **Dashboard** from the right-hand side menu panel and click **Create Agent**
8. Select **Create from Scratch** and click **Next**
9. On **Define agent** page select the following, then click next:
    
    > 
    > What type of agent are you building?: **Autonoous**
    >
    > What's your agent's main function?: **Answer questions**

10. On **Set up profile** provide te following information, then click **Create**:

    > Agent Name: **<w class = "attendee_out">attendeeID</w>_AutoAI_Lab**
    >
    > System ID is created automatically
    >
    > AI engine: **Nova**
    >
    > Knowledge base: **<w class = "attendee_out">attendeeID</w>_AI_KB**
    > 
    > Agent's goal: <copy>***You are a helpful, polite agent who will help the user with their Amsterdam related queries such as restaurant, pubs, places to visit and what transport can be used to get there. In addition, you as an agent can provide comprehensive information about Cisco Live 2025 Amsterdam event such as schedule, registration information, session catalog and general help information.***</copy>
    > 

    ![Profiles](../graphics/Lab1/L1M7_AIAgentCreate.gif)

11. Toggle **Allow agent handover** setting on **AI agent settings** page and click **Save Changes**. This will allow you to handoff calls to human agent on request while talking to your Virtual Agent.

    ![Profiles](../graphics/Lab1/L1M7_AIAgentAllowHandoff.png)

12. Click on **Preview** to test your AI Agent and ask the following: <copy>**"I'm looking for an Italian restaurant close to RAI."**</copy>

    ![Profiles](../graphics/Lab1/L1M7_AIAgentPreview.png)

---

## Integrating the Bot with Flow for Voice Calls

1. In Control Hub navigate to **Flows**, click on **Manage Flows** dropdown list and select **Create Flows**

2. Select Start Fresh and name the new flow <copy>**AutonomousAI_Flow_<w class = "attendee_out">attendeeID</w>**</copy>.

    ![Profiles](../graphics/Lab1/L1M7_AutonomousAI_Flow_CreateFlow.gif)  

3. Make sure the Edit button at the top is set to "ON". Then, drag and drop the **Virtual Agent V2** and **DisconnectContact** activities from the left panel onto the canvas.

    !!! Note
        Please make sure to use **VirtualAgentV2** activity and <span style="color: red;">**NOT**</span> **VirtualAgent** also present on the Activity Library for Backward Compatability.

    > Connect the **New Phone Contact** output node edge to this **VirtualAgentV2** node
    >
    > Connect the Handled outputs to **DisconnectContact** 
    >
    > Connect the Errored outputs to **DisconnectContact** 
    >
    > Set **Static Contact Center AI Config**
    >
    > Contact Center AI Config: **Webex AI Agent (Autonomous)**
    >
    > Virtual Agent: **<w class = "attendee_out">attendeeID</w>_AutoAI_Lab**

    ![Profiles](../graphics/Lab1/L1M7_AutonomousAI_Flow_AddVAv2.gif)  

4. Drag and drop following nodes:

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
  
5. **Validate** and **Publish** Flow. In popped up window click on dropdown menu to select **Latest** label, then click **Publish**  

    ![Profiles](../graphics/Lab1/L1M7_AutonomousAI_Flow_AddQueue.gif)  

6. Assign the Flow to your **Channel (Entry Point)** - Do this by first going to **Channel** > Search for your channel **<w class = "attendee_out">attendeeID</w>_Channel**.
7. Click on **<w class = "attendee_out">attendeeID</w>_Channel**
8. In **Entry Point** Settings section change the following:

    > Routing Flow: **AutonomousAI_Flow_<w class = "attendee_out">attendeeID</w>**

    > Version Label: **Latest**

    ![Profiles](../graphics/Lab1/L1M7_AutonomousAI_FlowtoEP.gif)  

9. Dial Support Number assigned to your **<w class = "attendee_out">attendeeID</w>_Channel** to test the Autonomous Virtual Agent over a voice call.


## Testing

1. Open [Agent Desktop](https://desktop.wxcc-us1.cisco.com/){:target="_blank"} and login with agent credentials you have been provided <copy>**wxcclabs+agent_ID<w class = "attendee_out">attendeeID</w>@gmail.com**</copy>. You will see another login screen with OKTA on it where you may need to enter the email address again and the password provided to you. 
2. Select **Desktop** as a ***Telephony Option*** and Team <copy>**<w class = "attendee_out">attendeeID</w>_Team**</copy>. Click **Submit**. Allow browser to access Microphone by clicking **Allow** on ever visit.
3. Make your agent ***Available*** and you're ready to make a call.

    ![profiles](../graphics/Lab1/5-Agent_Login.gif)

4. Dial the support number assigned to your **<w class = "attendee_out">attendeeID</w>_Channel** channel and during the conversation with the virtual Agent ask something about restaurants in Amsterdam or places where you can go and watch historical.

5. Any time during conversation request to connect you with a live agent. The call will be transferred to your agent.

<p style="text-align:center"><strong>Congratulations, you have officially completed the Autonomous Virtual Agent mission! 🎉🎉 </strong></p>