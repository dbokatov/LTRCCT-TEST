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

!!! Note
    The input in the images that follow are only examples. They do not reflect the input you need to use in the lab exercises. In some cases, the input in the images may not follow the same attendee or pod ID from previous images. They are for representation only


### Enhancing the caller experience: The foundation of call routing techniques
Imagine you’re calling into your contact center, eager for quick, personalized assistance. Behind the scenes, a sophisticated flow is in motion, designed to seamlessly route your call based on your preferences and needs. In this lab, we'll step into the role of a flow designer, configuring key elements that ensure each caller’s journey is smooth and efficient.

We’ll start by exploring Flow Templates for rapid setup, then dive into routing configurations, using conditions like language preference to enhance customer experience. You’ll also learn how subflows can simplify complex processes by breaking them into manageable parts. By the end, you’ll have the skills to create a foundational flow setup, ready to handle real-world scenarios."


### Why Flow Templates?
Flow Templates in Webex Contact Center are an essential feature for flow developers, offering a range of benefits that streamline the development process and enhance the efficiency and consistency of flow creation. Here’s what they bring to the table:

  - Consistency and Standards: Templates ensure that flows adhere to best practices, creating consistent experiences across multiple projects.

  - Time Savings: Pre-built structures reduce the need to start from scratch, enabling faster setup and allowing more focus on customization.

  - Reduced Errors: Using tested templates lowers the risk of mistakes and minimizes troubleshooting.

  - Easy Onboarding: New developers or partners can learn quickly by using templates as guides.

  - Scalability: Templates allow developers to replicate and adapt solutions efficiently across different flows or deployments.

  - Innovation: Developers can spend more time on unique features and integrations rather than reconfiguring basics.

Flow Templates are designed to empower developers, speed up the development lifecycle, and maintain high-quality standards across flows, making them a core asset in Webex Contact Center flow design.

### Configuration
