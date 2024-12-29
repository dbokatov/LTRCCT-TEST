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


 Please **Please submit the form below with your Attendee ID in 3 digits long format (e.g. if your attendee ID is 51, please enter 051) and click Save. All configuration items in the lab guide will be renamed with that prefix.
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

## Using Business Hours in Your Flow to add flexibility

Business Hours allows you to configure the operational hours of the contact center, offering an enhanced experience in routing strategy configuration and simplifying the routing flow for improved efficiency and customer satisfaction. 

### **Step Objective:**
  - We continue to use same flow we created in previous section

  - Business Hours entity **<w class = "attendee_out">attendeeID</w>_Bussiness_Hours** has been configured for you and contains the following settings:
    
    ○ **Working Hours** - Define time during which contact center will be operational. Each working hours contains one or more shifts. We can configure different schedules for different time zones
    
    ○ **Holidays** - Define specific day or day range which is declared is holiday. Entire 24 hours of the day selected is marked non-operational​.
    
    ○ **Overrides** - Configure working hours for special cases like Emergency or Christmas when contact center is working for additional hours​.


#### Configuration

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

    > - **Working Hours** -> **WelcomePrompt** Node
    >
    > - **Holidays**, **Overrides** and **Default** -> New added **PlayMessage** node.
    >
    > - New added **PlayMessage** -> **Disconnect** contact

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

9. Make a new call and make sure you hear the message we set in ***Step 6***.

10. Now we need to revert the configuration we made in ***Step 8*** as we are going to use same flow in upcoming tasks. Open **<w class = "attendee_out">attendeeID</w>_Bussiness_Hours** in **Control Hub**, scroll down to Additional Settings and select **None** from Override dropdown list. Then click **Save**.

     ![profiles](../graphics/Lab1/13-Revert_Overrides_Config.gif) 

11. Make one more call to make sure you hear the original Welcome message of your vhoice you set on first steps of Main lab.

**Congratulations on completing another mission.**