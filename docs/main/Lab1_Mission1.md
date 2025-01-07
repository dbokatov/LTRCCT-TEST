---
#icon: material/folder-open-outline
icon: material/medal
---
<script>
    // Function to initialize and handle form submission
    function setupAttendeeForm() {
        const form = document.getElementById('attendee-form');
        const displayAttendee = document.getElementById('display-attendee');
        const attendeeInput = document.getElementById('attendee');

        // Load stored Attendee ID on page load
        const storedAttendeeID = localStorage.getItem('attendeeID');
        if (storedAttendeeID) {
            attendeeInput.value = storedAttendeeID;
            displayAttendee.textContent = storedAttendeeID;
        }

        // Restrict input to only allow three digits
        attendeeInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 3);
        });

        // Handle form submission
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const attendeeIDInput = attendeeInput.value;

            if (attendeeIDInput && attendeeIDInput.length === 3) {
                // Store the Attendee ID in local storage
                localStorage.setItem('attendeeID', attendeeIDInput);

                // Update the displayed Attendee ID
                displayAttendee.textContent = attendeeIDInput;
            } else {
                alert('Please enter exactly 3 digits.');
            }
        });
    }

    // Wait for the DOM content to be fully loaded
    document.addEventListener('DOMContentLoaded', setupAttendeeForm);
</script>

<style>
    /* Style for the button */
    button {
        background-color: black;
        color: white;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
    }

    /* Style for the input element */
    input[type="text"] {
        border: 2px solid black;
        padding: 5px;
    }
</style>

<!-- Markdown content with embedded HTML -->
<div>
    <h2>Please submit the form below with your Attendee ID</h2>
    <form id="attendee-form">
        <label for="attendee">Attendee ID:</label>
        <input type="text" id="attendee" name="attendee" placeholder="Enter 3 digits" required>
        <button type="submit">Save</button>
    </form>

    <br>

    <p>Your stored Attendee ID is: <span id="display-attendee">No ID stored</span></p>
</div>



## Using Business Hours in Your Flow to add flexibility

Business Hours allows you to configure the operational hours of the contact center, offering an enhanced experience in routing strategy configuration and simplifying the routing flow for improved efficiency and customer satisfaction. 

Test 1:
<span class="copy" data-copy-text="admin_ID">
  <span id="display-attendee">You attendeeID</span>
</span>



Test 2:
<span id="display-attendee">You attendeeID</span>_Bussiness_Hours
**<w class = "attendee_out">attendeeID</w>_Bussiness_Hours**

Test 3:
<span class="copy copy-icon" data-copy-text="wxcclabs+admin_ID<w class = "attendee_out">attendeeID</w>@gmail.com">


### **Step Objective:**
  - We continue to use same flow we created in previous section

  - Business Hours entity **<w class = "attendee_out">attendeeID</w>_Bussiness_Hours** has been configured for you and contains the following settings:
    
    ○ **Working Hours** - Define time during which contact center will be operational. Each working hours contains one or more shifts. We can configure different schedules for different time zones
    
    ○ **Holidays** - Define specific day or day range which is declared is holiday. Entire 24 hours of the day selected is marked non-operational​.
    
    ○ **Overrides** - Configure working hours for special cases like Emergency or Christmas when contact center is working for additional hours​.


#### Build

1. Go and check your preconfigured Business Hours Entity. For that in **Control Hub** navigate to **Business Hours** under Customer Experience section

    ![profiles](../graphics/Lab1/8-BH_Entity.gif)

2. Open your flow **Main_Flow_<w class = "attendee_out">attendeeID</w>** and change the mode from Read-only to Edit-on mode
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

5. Click on **Business Hours** node and select preconfigured Business Hours Entity **<w class = "attendee_out">attendeeID</w>_Bussiness_Hours**.

6. Configure **PlayMessage** node as follows:

    > Enable Text-To-Speech
    >
    > Select the Connector: Cisco Cloud Text-to-Speech
    >
    > Click the Add Text-to-Speech Message button and paste text: ***It's not working hours currently. Please call later. Goodbye.***
    >
    > Delete the Selection for Audio File

7. Validate the flow by clicking **Validate**, **Publish** and select the Latest version of the flow
     
     !!! Note
        We haven't changed the flow behavior yet as Working hours covers the current time. You can make a call and accept it on agent desktop to verify.

    ![profiles](../graphics/Lab1/11-BH_Play_Config.gif)

   
8. We are going to use **Override** option to change the logic. Overrides as well as Business hours have been preconfigured for you. Now we need to apply it on your **<w class = "attendee_out">attendeeID</w>_Bussiness_Hours** entity. Open **<w class = "attendee_out">attendeeID</w>_Bussiness_Hours** in **Control Hub**, scroll down to **Additional Settings** and select **Overrides_Hours** from Override dropdown list. Then click **Save**.

    !!! Note
        Override Hours entity was configured to overwrite Working Hours and set to duration of current Cisco Live lab 

    ![profiles](../graphics/Lab1/12-Overrides_Config.gif)

### Testing

1. Open your Webex App and dial the Support Number provided to you, which is configured in your **<w class = "attendee_out">attendeeID</w>_Channel** configuration. Make sure you hear the message we set in ***Step 6***.


### Post Testin steps

1. <span style="color: red;">**[IMPORTANT]**</span> Now we need to revert the configuration we made in ***Step 8*** as we are going to use same flow in upcoming tasks. Open **<w class = "attendee_out">attendeeID</w>_Bussiness_Hours** in **Control Hub**, scroll down to Additional Settings and select **None** from **Override** dropdown list. Then click **Save**.

     ![profiles](../graphics/Lab1/13-Revert_Overrides_Config.gif) 

11. Make one more call from Webex App to make sure you hear the original Welcome message you set on first steps of Main Mission of Fundamental Lab.

**Congratulations on completing another mission.**
