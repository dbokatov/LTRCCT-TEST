---
#icon: material/folder-open-outline
icon: material/bullseye-arrow
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


 Please **`submit the form below with your Attendee ID`**. All configuration entries in the lab guide will be renamed to include your Attendee ID.
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



## Learning Objectives
1. Ensure that you have access to the email with instructions and credentials to access your lab. It is an email with the subject line - WebexCC: Cisco Live Lab Access. If you do not, please ask your lab proctor now.
2. Understand your configuration instructions
3. Familiarize yourself how we will use Google Chrome profiles to simulate the situations for this lab

### Know before you start

1. We will be simulating situations in a **shared lab tenant**
2. The majority of the configuration in Control Hub is already set up, allowing you to focus primarily on Flow Design. Of course, there may still be some elements to adjust, but these should be minimal, letting you concentrate on building and refining the flow logic rather than spending time on initial setup.
3. The Agents have been configured for you. You will be performing the rest of the configurations to route voice calls
4. All your configurations should contain your attendee ID so the lab users don't step over each other's configurations
5. Each of you has been provided with the phone number to dial (Entry point DN), 1 agents, 1 Supervisor and 1 admin.
6. We are going to use built-in Cisco Text to Speech for playing all messages in the lab.
Please ask for help when you need it

---

### Predefined configuration

> Entry Point/Channels:  <copy>**<w class = "attendee_out">attendeeID</w>_Channel**</copy>

> Queue:  <copy>**<w class = "attendee_out">attendeeID</w>_Queue**</copy>

> Agent:   <copy>**wxcclabs+agent_ID<w class = "attendee_out">attendeeID</w>@gmail.com**</copy>

> Supervisor:   <copy>**wxcclabs+supvr_ID<w class = "attendee_out">attendeeID</w>@gmail.com**</copy>

> Business Hours: <copy>**<w class = "attendee_out">attendeeID</w>_Bussiness_Hours**</copy>

> Webex App has been pre-installed on your Lab PC

> Assigned Inbound Channel Number: <copy><w class="EPDN">Provided by proctor</w></copy>

More pre-configured entities will be mentioned during the lab missions if they have any.

---

### Testing

All call to Webex Contact center should be done from Webex App which has been pre-installed for you as well as pre-logined to it.
To make a test just open Webex App and dial provided Support Number assigned to you.

   ![profiles](../graphics/Lab1/WxApp_Test.gif)

!!! Note
    International dialing is not allowed so you won't be able to dial your cell phones unless you have a US number.

---

### Browser Setup [TO BE REMOVED as we are going to pre-configure workstations prior the lab]

Since we will be using the same Chrome browser for different roles we will use the **Chrome Browser profiles** to allow multiple logins into the different components of the Webex contact center. For the control hub, use the Administrator profile created for you in the Chrome browser. Always offer Chrome to **remember your credentials and password** for this lab. We will create the user profiles below - Admin, Agent 1, Agent 2 and Supervisor

![profiles](../graphics/overview/17.png)
![profiles](../graphics/overview/18.png)

---

### Creating Chrome user profiles

Open the Windows Terminal (Windows key and type **Powershell**). Paste and run the following code. You will see 4 new Chrome shortcut icons on the desktop

```
$DesktopPath = [Environment]::GetFolderPath("Desktop")
$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut("$DesktopPath\WxCC Admin.lnk")
$shortcut.TargetPath = "%PROGRAMFILES%\Google\Chrome\Application\chrome.exe"
$Shortcut.Arguments = "--user-data-dir=%USERPROFILE%\chromeProfiles\admin"
$Shortcut.Save()
$shortcut = $shell.CreateShortcut("$DesktopPath\WxCC Supervisor.lnk")
$shortcut.TargetPath = "%PROGRAMFILES%\Google\Chrome\Application\chrome.exe"
$Shortcut.Arguments = "--user-data-dir=%USERPROFILE%\chromeProfiles\Supervisor"
$Shortcut.Save()
$shortcut = $shell.CreateShortcut("$DesktopPath\WxCC Agent1.lnk")
$shortcut.TargetPath = "%PROGRAMFILES%\Google\Chrome\Application\chrome.exe"
$Shortcut.Arguments = "--user-data-dir=%USERPROFILE%\chromeProfiles\Agent1"
$Shortcut.Save()
```

![profiles](../graphics/overview/term_1.png)

Check the desktop of your lab PC. You should find 3 Chrome shortcuts created - WxCC Admin, **WxCC Agent1 and WxCC Supervisor**

When you click on the links 

![profiles](../graphics/overview/term_2.png)

You can customize each profile to be easily identifiable with a name and/or icon of your choice

![profiles](../graphics/overview/term_3.png)

We will use the **Admin** profile first in the next section.

<script src='../template_assets/load.js'><script>