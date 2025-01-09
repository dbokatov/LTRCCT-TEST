---
#icon: material/folder-open-outline
icon: material/medal
---

## Using Business Hours in Your Flow to add flexibility

Business Hours allows you to configure the operational hours of the contact center, offering an enhanced experience in routing strategy configuration and simplifying the routing flow for improved efficiency and customer satisfaction. 

### **Step Objective**
  - We continue to use same flow we created in previous Mission 1 of the Fundamental Lab

  - Business Hours entity **<span class="attendee-id-placeholder">Your_Attendee_ID</span>_Bussiness_Hours** has been configured for you and contains the following settings:
    
    ○ **Working Hours** - Define time during which contact center will be operational. Each working hours contains one or more shifts. We can configure different schedules for different time zones
    
    ○ **Holidays** - Define specific day or day range which is declared is holiday. Entire 24 hours of the day selected is marked non-operational​.
    
    ○ **Overrides** - Configure working hours for special cases like Emergency or Christmas when contact center is working for additional hours​.

  - <span class="copy copy-icon" data-copy-text="TEXT"></span>

  - <span class="copy" title="Click to copy!">📋</span>

  - <span class="attendee-id-container">TEXT<span class="copy" title="Click to copy!" data-copy-text="TEXT"></span></span>

#### Build

1. Go and check your preconfigured Business Hours Entity. For that in **Control Hub** navigate to **Business Hours** under Customer Experience section

    ![profiles](../graphics/Lab1/8-BH_Entity.gif)

2. Open your flow **Main_Flow_<span class="attendee-id-placeholder">Your_Attendee_ID</span>** and switch **Read-only** to **Edit: ON** mode
3. Drag and drop following nodes to the canvas:

    > - **Business Hours**
    >
    > - **Play Message**
    >
    > - **Disconnect Contact**

    ![profiles](../graphics/Lab1/9-Drag_BH_Play_Disc.gif)

4. Connect **Business Hours** node exits as follow:

    > - **Working Hours** connect to **WelcomePrompt** node
    >
    > - **Holidays**, **Overrides** and **Default** connect to new added **PlayMessage** node.
    >
    > - New added **PlayMessage** connect to **Disconnect** contact

    ![profiles](../graphics/Lab1/10-BH_node_connection.gif)

5. Click on **Business Hours** node and select preconfigured Business Hours Entity **<span class="attendee-id-placeholder">Your_Attendee_ID</span>_Bussiness_Hours** .

6. Configure **PlayMessage** node as follows:

    > Enable Text-To-Speech
    >
    > Select the Connector: Cisco Cloud Text-to-Speech
    >
    > Click the Add Text-to-Speech Message button and paste text: ***It's not working hours currently. Please call later. Goodbye.*** <span class="copy copy-icon" data-copy-text="It's not working hours currently. Please call later. Goodbye."></span>
    >
    > Delete the Selection for Audio File

7. Validate the flow by clicking **Validate**, **Publish** and select the Latest version of the flow
     
    !!! Note
        We haven't changed the flow behavior yet as Working hours covers the current time. You can make a call and accept it on agent desktop to verify.

    ![profiles](../graphics/Lab1/11-BH_Play_Config.gif)

   
8. We are going to use **Override** option to change the logic. Overrides as well as Business hours have been preconfigured for you. Now we need to apply it on your **<span class="attendee-id-placeholder">Your_Attendee_ID</span>_Bussiness_Hours** entity. Open **<span class="attendee-id-placeholder">Your_Attendee_ID</span>_Bussiness_Hours** in **Control Hub**, scroll down to **Additional Settings** and select **Overrides_Hours** from Override dropdown list. Then click **Save**.

    !!! Note
        Override Hours entity was configured to overwrite Working Hours and set to duration of current Cisco Live lab 

    ![profiles](../graphics/Lab1/12-Overrides_Config.gif)

### Testing

1. Open your Webex App and dial the Support Number provided to you, which is configured in your **<span class="attendee-id-placeholder">Your_Attendee_ID</span>_Channel** configuration. Make sure you hear the message we set in ***Step 6***.


### Post Testing steps

1. <span style="color: red;">**[IMPORTANT]**</span> Now we need to revert the configuration we made in ***Step 8*** as we are going to use same flow in upcoming tasks. Open **<span class="attendee-id-placeholder">Your_Attendee_ID</span>_Bussiness_Hours** in **Control Hub**, scroll down to Additional Settings and select **None** from **Override** dropdown list. Then click **Save**.

     ![profiles](../graphics/Lab1/13-Revert_Overrides_Config.gif) 

11. Make one more call from Webex App to make sure you hear the original Welcome message you set on first steps of Main Mission of Fundamental Lab.

**Congratulations on completing another mission.**



  - <span class="copy"></span>
  
  - **<span class="attendee-id-container">Main_Flow<span data-prefix="Main_Flow_"></span><span class="copy"></span></span>**

  - **<span class="attendee-id-container">Main_Flow<span class="copy"></span></span>**

  -                                       Main_Flow_<span class="attendee-id-placeholder">Your_Attendee_ID</span>

  - **<span class="attendee-id-container">wxcclabs+supvr_ID<span class="attendee-id-placeholder" data-prefix="wxcclabs+supvr_ID" data-suffix="@gmail.com">Your_Attendee_ID</span>@gmail.com<span class="copy"></span></span>**

  - **<span class="attendee-id-container">wxcclabs+supvr_ID<span class="attendee-id-placeholder" data-prefix="wxcclabs+supvr_ID" data-suffix="@gmail.com">Your_Attendee_ID</span>@gmail.com<span class="copy"></span></span>**

  - **<span class="static-text-copy">This is the static text to copy.</span>**

  - blablabla **<span class="static-text-copy">blablabla</span>**