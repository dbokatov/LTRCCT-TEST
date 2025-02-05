---
#icon: material/folder-open-outline
icon: material/medal
---



# Using Webex Contact Center Developer Portal <span style="color: red;">[Building new mission]</span></summary>

## Story

Webex Contact Center APIs enable automation, customization, and integration with external applications. By leveraging these APIs, administrators can streamline processes, enhance agent efficiency, and improve customer interactions. In this lab, we will explore how to interact with the Developer Portal and execute API calls to manage Address Books.


## Mission Details
In this mission, attendees will learn how to interact with Webex Contact Center APIs by performing API calls via the  [**Developer Portal**](https://developer.webex-cx.com/){:target="_blank"}. Specifically, we will work with the Address Book feature.

**<details><summary>Good to Know <span style="color: orange;">[Optional]</span></summary>**

**Understanding API Calls with Real-Life Comparisons**

APIs (Application Programming Interfaces) allow different systems to communicate by sending and receiving structured requests. Here are the most common API call types, explained with real-world analogies:

1. **GET – Retrieving Information**</br>
**Analogy**: Checking your bank balance at an ATM. You request information, and the system provides it without making any changes.</br>
**Example Use Case**: Retrieving a customer’s interaction history in Webex Contact Center before routing their call.</br>

2. **POST – Creating New Data**</br>
**Analogy**: Ordering a new item online. You submit details, and a new order (or record) is created in the system.</br>
**Example Use Case**: Creating a new customer support ticket when an issue is reported during a call.</br>

3. **PUT – Updating Existing Data**</br>
**Analogy**: Changing your home address in an online banking system. Instead of adding a new address, the existing one is replaced.</br>
**Example Use Case**: Updating a customer’s preferred contact method in a CRM system.</br>

4. **PATCH – Modifying Partial Data**</br>
**Analogy**: Updating your phone number on a social media profile without changing other details like your name or email.</br>
**Example Use Case**: Changing only the priority level of an existing support ticket.</br>

5. **DELETE – Removing Data**</br>
**Analogy**: Canceling a hotel reservation. The record is removed, preventing further use.</br>
**Example Use Case**: Deleting a scheduled callback request if the customer no longer needs assistance.</br>

6. **Webhooks – Automated Notifications**</br>
**Analogy**: Receiving an SMS alert when your package is out for delivery. Instead of requesting updates repeatedly, you get notified when something happens.</br>
**Example Use Case**: Notifying an agent when a VIP customer joins the queue.</br>

7. **SEARCH API (GraphQL Queries) – Retrieving Specific Data Efficiently**</br>
**Analogy**: Using a restaurant menu app to filter only "vegan dishes under $10" instead of browsing the entire menu. Unlike traditional GET requests that return all data, GraphQL allows users to request exactly what they need.</br>
**Example Use Case**: Searching for all unresolved support tickets assigned to a specific agent without loading unnecessary ticket details.</br>

APIs streamline operations by automating tasks, integrating systems, and enhancing customer experiences. Understanding these core calls helps optimize workflows in platforms like Webex Contact Center.
</details>

---

## Build

### Create a New Address Book entity by using POST

1. Open [**Developer Portal**](https://developer.webex-cx.com/){:target="_blank"} and click on **Sign In**. 
   Your login will be of the format **<span class="attendee-id-container">wxcclabs+admin_ID<span class="attendee-id-placeholder" data-prefix="wxcclabs+admin_ID" data-suffix="@gmail.com">Your_Attendee_ID</span>@gmail.com<span class="copy" title="Click to copy!"></span></span>**. You will see another login screen with OKTA on it where you may need to enter the email address again and the password provided to you.

2. Click on **Documentation** which is on top right corner of the portal page.

    ![profiles](../graphics/Lab2/DevPortalLogin.gif)

3. On Menu pannel on the left, scroll down to **API Reference** section and click on **Adress Book**. Observe available API calls

    !!!Note
        **Address Book Overview**</br>
        Address Book is available in the Webex Contact Center Agent Desktop. Agents can make outbound calls using Address Books, selecting numbers from pre-configured lists instead of entering them manually in the 'Start a New Call' field. Administrators can configure and manage Address Books via the Webex Contact Center APIs.

4. Scroll down and click on **Create a new Address Book**, then click on **Try Out**.

    ![profiles](../graphics/Lab2/DevPortal_TryOut.gif)

5. Clear **Request Body** content and paste the following body

    > 
    > Request Body:
    ``` JSON
    {
        "name": "AddressBook_<Your_Attendee_ID>",
        "parentType": "ORGANIZATION"
    }
    ```

    ``` JSON
    
    Expected Response: 201 Response

    {
      "organizationId": "e56f00d4-98d8-4b62-a165-d05a41243d98",
      "id": "4aa50a6b-a520-4221-bc9d-a050c111061f",
      "version": 0,
      "name": "AddressBook_140",
      "parentType": "ORGANIZATION",
      "createdTime": 1738585491913,
      "lastUpdatedTime": 1738585491913
    }

    ```

  ![profiles](../graphics/Lab2/DevPortal_AddressBookCreate.gif)

6. Switch to [Webex Control Hub](https://admin.webex.com){:target="_blank"} and navigate to **Address Book**. Locate your new created **<span class="attendee-id-container">AddressBook_<span class="attendee-id-placeholder" data-prefix="AddressBook_">Your_Attendee_ID</span><span class="copy" title="Click to copy!"></span></span>**

7. You should see your new created **<span class="attendee-id-container">AddressBook_<span class="attendee-id-placeholder" data-prefix="AddressBook_">Your_Attendee_ID</span><span class="copy" title="Click to copy!"></span></span>**. There are still no Address Book entries os let's add them.

8. On the same **Address Book** configuration page, copy the **AddressBook_<span class="attendee-id-placeholder">AddressBook_</span>** ID into notepad.

  ![profiles](../graphics/Lab2/DevPortal_VerifyAB.gif)

9. Switch to **Developer Portal** and select **Address Book** again from left menu pane.

  ![profiles](../graphics/Lab2/DevPortal_gotoABEntry.gif)

10. Click on **Create a new Address Book Entry**, then switch to **Try Out** tab within the same page. 

11. In the **Parameters** section paste ID you copied on **Step 8** of the current mission.

12. Clear **Request Body** content and paste the following body


    > 
    > Request Body:
    ``` JSON
    {
      "name": "TAC Number",
      "number": "+14085267209"
    }
    ```

    ``` JSON
    
    Expected Response: 201 Response

    {
      "organizationId": "e56f00d4-98d8-4b62-a165-d05a41243d98",
      "id": "133ec7d9-7873-40b6-be40-43e071430268",
      "version": 0,
      "name": "TAC Number",
      "number": "+14085267209",
      "createdTime": 1738773041509,
      "lastUpdatedTime": 1738773041509
    }
    ```

  ![profiles](../graphics/Lab2/DevPortal_CreateABEntry.gif)

12. Switch to [Webex Control Hub](https://admin.webex.com){:target="_blank"}. You **Addres Book** configuration page should still be open. But if not, navigate to and open **Address Book**. Locate and open your **<span class="attendee-id-container">AddressBook_<span class="attendee-id-placeholder" data-prefix="AddressBook_">Your_Attendee_ID</span><span class="copy" title="Click to copy!"></span></span>**

13. You should see your new created **Entry List** with Name **Tac Number** and Contact Number **+14085267209**.

  ![profiles](../graphics/Lab2/DevPortal_VerifyABEntry.gif)

---

### Retrieve Address Book Entry by ID (GET)

We will retrieve information about your newly created address book using a GET API call.

1. Switch to **Developer Portal** and select **Address Book** again from left menu pane.

2. Locate and open **Get specific Address Book by ID**, then switch to **Try Out** tab.

 ![profiles](../graphics/Lab2/DevPortal_GET_Entry1.gif)

3. Paste the same **AddressBook_<span class="attendee-id-placeholder">AddressBook_</span>** ID into **id** cell of **Parameters** section. You can quickly copy it by switching back to Control Hub. Then click **Run**.

    Expected Response: 200 Response
    ``` JSON
    {
      "id": "115358d7-5c46-4988-9a50-e7f40c3b7daf",
      "name": "AddressBook_140",
      "description": "",
      "parentType": "ORGANIZATION",
      "createdTime": 1738771074000,
      "lastUpdatedTime": 1738773007000
    }
    ```
 ![profiles](../graphics/Lab2/DevPortal_GET_Entry2.gif)


### Update Address Book Description by using PUT

1. Switch to **Developer Portal** and select **Address Book** again from left menu pane.

2. Locate and open **Update specific Address Book by ID**, then switch to **Try Out** tab.

 ![profiles](../graphics/Lab2/DevPortal_PUT_ABNavigate.gif)

3. Paste the same **AddressBook_<span class="attendee-id-placeholder">AddressBook_</span>** ID into **id** cell of **Parameters** section. You can quickly copy it by switching back to Control Hub. 

4. Clear **Request Body** content and paste the following body. Then click **Run**.

Request Body:

    ``` JSON
    {
      "name": "YourAddressBook_Name",
      "id": "YouAddressBook_ID",
      "parentType": "ORGANIZATION",
      "description": "Testing PUT requests from Develeper Portal"
    }
    ```

    Expected Response: 200 Response

    ``` JSON
    {
      "organizationId": "e56f00d4-98d8-4b62-a165-d05a41243d98",
      "id": "115358d7-5c46-4988-9a50-e7f40c3b7daf",
      "version": 5,
      "name": "AddressBook_140",
      "description": "Testing PUT requests from Developer Portal",
      "parentType": "ORGANIZATION",
      "createdTime": 1738771074000,
      "lastUpdatedTime": 1738775594832
    }
    ```

 ![profiles](../graphics/Lab2/DevPortal_PUT_ABDescription.gif)

**To be Continued...**

### Update Address Book Description (PUT)

### Create a New Address Book Entry (POST)

### Retrieve Address Book Entry by ID (GET)

### Use Search API to retrieve data from Analyzer DB.

## Summary
This mission shows how to quickly change the behavior of your contact center logic in extreme situation without even login-in in to Control Hub.